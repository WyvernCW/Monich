import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import modelUrl from "../../RTX5090model/nvidiaRTX5090.glb?url";
import connectorTextureUrl from "../../RTX5090model/pcie connector.png_0.png?url";

const ease = (value) => {
  const x = Math.min(Math.max(value, 0), 1);
  return x * x * (3 - 2 * x);
};

function fitModelToStage(model, targetSize = 4.4) {
  const box = new THREE.Box3().setFromObject(model);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);

  const maxAxis = Math.max(size.x, size.y, size.z) || 1;
  const scale = targetSize / maxAxis;
  model.scale.setScalar(scale);
  model.position.sub(center.multiplyScalar(scale));

  model.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
      object.receiveShadow = true;
      if (object.material) {
        object.material.needsUpdate = true;
      }
    }
  });
}

function getSemanticOffset(name, index) {
  const lower = name.toLowerCase();
  const boltSlot = index % 6;
  const boltX = (boltSlot - 2.5) * 0.34;

  if (lower.includes("fan hub")) return new THREE.Vector3(index % 2 === 0 ? -0.78 : 0.78, 0.58, 1.04);
  if (lower.includes("blade holder") || lower === "blade") return new THREE.Vector3(index % 2 === 0 ? -0.52 : 0.52, 0.82, 1.16);
  if (lower.includes("fan cover")) return new THREE.Vector3(index % 2 === 0 ? -0.9 : 0.9, 0.38, 0.92);
  if (lower.includes("fins")) return new THREE.Vector3(0, 1.02, -0.5);
  if (lower.includes("main frame")) return new THREE.Vector3(0, -0.14, -0.9);
  if (lower.includes("bottom cover")) return new THREE.Vector3(0, -0.72, -0.42);
  if (lower.includes("up cover")) return new THREE.Vector3(0, 0.72, -0.22);
  if (lower.includes("pcie")) return new THREE.Vector3(0.42, -1.02, 0.48);
  if (lower.includes("io plate") || lower.includes("ports")) return new THREE.Vector3(-1.22, -0.06, 0.42);
  if (lower.includes("power")) return new THREE.Vector3(1.16, 0.28, 0.48);
  if (lower.includes("grill")) return new THREE.Vector3(0.8, -0.36, 0.64);
  if (lower.includes("bolt")) return new THREE.Vector3(boltX, 0.34 + (index % 2) * 0.18, 1.22);
  if (lower.includes("light")) return new THREE.Vector3(0, 0.08, 1.36);

  return new THREE.Vector3((index % 4 - 1.5) * 0.46, 0.26, 0.86);
}

function createPartAssembly(model, spread = 1) {
  const parts = [];

  model.traverse((object) => {
    if (!object.isMesh) return;

    const sideBias = parts.length % 2 === 0 ? 1 : -1;
    const semanticOffset = getSemanticOffset(object.name, parts.length).multiplyScalar(spread);

    parts.push({
      mesh: object,
      assembledPosition: object.position.clone(),
      assembledRotation: object.rotation.clone(),
      explodedPosition: object.position.clone().add(semanticOffset),
      explodedRotation: new THREE.Euler(
        object.rotation.x + sideBias * 0.2,
        object.rotation.y + semanticOffset.x * 0.28,
        object.rotation.z + sideBias * (0.16 + (parts.length % 4) * 0.03)
      )
    });
  });

  return parts;
}

function updatePartAssembly(parts, progress) {
  const attach = ease(THREE.MathUtils.mapLinear(progress, 0.04, 0.82, 0, 1));

  parts.forEach((part) => {
    part.mesh.position.lerpVectors(part.explodedPosition, part.assembledPosition, attach);
    part.mesh.rotation.set(
      THREE.MathUtils.lerp(part.explodedRotation.x, part.assembledRotation.x, attach),
      THREE.MathUtils.lerp(part.explodedRotation.y, part.assembledRotation.y, attach),
      THREE.MathUtils.lerp(part.explodedRotation.z, part.assembledRotation.z, attach)
    );
  });
}

function ThreeHardwareModel({ progressRef }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0.32, mount.clientWidth < 640 ? 8.6 : 7.1);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.HemisphereLight(0xfff2df, 0x5f4b38, 2.15));

    const key = new THREE.DirectionalLight(0xfff0dc, 3.8);
    key.position.set(-4, 5, 4.5);
    key.castShadow = true;
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xffffff, 1.6);
    rim.position.set(4, 2.5, -3);
    scene.add(rim);

    const modelRoot = new THREE.Group();
    scene.add(modelRoot);

    const textureLoader = new THREE.TextureLoader();
    const connectorTexture = textureLoader.load(connectorTextureUrl);
    connectorTexture.colorSpace = THREE.SRGBColorSpace;

    const connectorPreview = new THREE.Mesh(
      new THREE.PlaneGeometry(0.9, 0.24),
      new THREE.MeshBasicMaterial({ map: connectorTexture, transparent: true, opacity: 0.95 })
    );
    connectorPreview.position.set(1.65, -0.94, 0.5);
    connectorPreview.rotation.x = -0.25;
    modelRoot.add(connectorPreview);

    let disposed = false;
    let loadedModel = null;
    let modelParts = [];
    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        if (disposed) return;
        loadedModel = gltf.scene;
        fitModelToStage(loadedModel, mount.clientWidth < 640 ? 3.65 : 4.55);
        modelParts = createPartAssembly(loadedModel, mount.clientWidth < 640 ? 0.82 : 1.08);
        updatePartAssembly(modelParts, progressRef.current.value);
        modelRoot.add(loadedModel);
      },
      undefined,
      (error) => {
        console.error("Failed to load RTX 5090 GLB", error);
      }
    );

    let frameId = 0;
    const clock = new THREE.Clock();
    const render = () => {
      const elapsed = clock.getElapsedTime();
      const attach = ease(progressRef.current.value);

      updatePartAssembly(modelParts, progressRef.current.value);
      modelRoot.rotation.y = THREE.MathUtils.lerp(-0.62, 0.42, attach) + Math.sin(elapsed * 0.23) * 0.024;
      modelRoot.rotation.x = THREE.MathUtils.lerp(0.18, -0.06, attach);
      modelRoot.position.y = THREE.MathUtils.lerp(0.4, -0.05, attach);
      modelRoot.scale.setScalar(THREE.MathUtils.lerp(0.92, 1.07, attach));
      connectorPreview.material.opacity = THREE.MathUtils.lerp(0.45, 0.95, attach);

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    const handleResize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.position.z = width < 640 ? 8.6 : 7.1;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      if (loadedModel) {
        loadedModel.scale.setScalar(1);
        loadedModel.position.set(0, 0, 0);
        fitModelToStage(loadedModel, width < 640 ? 3.65 : 4.55);
        modelParts = createPartAssembly(loadedModel, width < 640 ? 0.82 : 1.08);
        updatePartAssembly(modelParts, progressRef.current.value);
      }
    };

    window.addEventListener("resize", handleResize);
    render();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      connectorTexture.dispose();
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
          else object.material.dispose();
        }
      });
    };
  }, [progressRef]);

  return <div className="three-hardware-canvas" ref={mountRef} aria-hidden="true" />;
}

export default ThreeHardwareModel;
