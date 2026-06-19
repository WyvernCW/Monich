import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import modelUrl from "../../MacMiniModel/mac_mini_m4.glb?url";

const smoothstep = (edge0, edge1, value) => {
  const x = Math.min(Math.max((value - edge0) / (edge1 - edge0), 0), 1);
  return x * x * (3 - 2 * x);
};

function fitModelToStage(model, targetSize = 2.6) {
  const box = new THREE.Box3().setFromObject(model);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);

  const maxAxis = Math.max(size.x, size.y, size.z) || 1;
  model.scale.setScalar(targetSize / maxAxis);
  model.position.sub(center.multiplyScalar(targetSize / maxAxis));

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

function getMacPartOffset(name, index, spread) {
  const lower = name.toLowerCase();
  const row = Math.floor(index / 5);
  const slot = index % 5;
  const rowX = (slot - 2) * 0.28;
  const rowY = 0.42 - row * 0.13;
  const rowZ = 0.48 + (row % 2) * 0.08;

  if (lower.includes("usb") || lower.includes("jack") || lower.includes("connector")) {
    return new THREE.Vector3(rowX, rowY, rowZ).multiplyScalar(spread);
  }

  if (lower.includes("copper") || lower.includes("ouro") || lower.includes("metal")) {
    return new THREE.Vector3(rowX * 0.75, 0.28 + (slot % 2) * 0.1, 0.62).multiplyScalar(spread);
  }

  if (lower.includes("alum") || lower.includes("circle") || lower.includes("curve")) {
    return new THREE.Vector3(rowX * 0.48, -0.34, -0.36 - (slot % 2) * 0.08).multiplyScalar(spread);
  }

  return new THREE.Vector3(rowX * 0.62, 0.12 - (slot % 3) * 0.1, -0.42).multiplyScalar(spread);
}

function isMacShellPart(name) {
  const lower = name.toLowerCase();
  return (
    lower.includes("alum") ||
    lower.includes("circle") ||
    lower.includes("curve") ||
    lower.includes("cube_material")
  );
}

function prepareMaterialForReveal(mesh, isShell) {
  const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
  const clonedMaterials = materials.map((material) => {
    const clone = material.clone();
    clone.transparent = isShell;
    clone.depthWrite = !isShell;
    clone.needsUpdate = true;
    return clone;
  });

  mesh.material = Array.isArray(mesh.material) ? clonedMaterials : clonedMaterials[0];
  return clonedMaterials.map((material) => material.opacity ?? 1);
}

function setPartOpacity(part, opacity) {
  const materials = Array.isArray(part.mesh.material) ? part.mesh.material : [part.mesh.material];
  materials.forEach((material, index) => {
    material.opacity = Math.min(part.originalOpacity[index] ?? 1, opacity);
  });
}

function createPartAssembly(model, spread = 1) {
  const parts = [];

  model.traverse((object) => {
    if (!object.isMesh) return;

    const offset = getMacPartOffset(object.name, parts.length, spread);
    const sideBias = parts.length % 2 === 0 ? 1 : -1;
    const shell = isMacShellPart(object.name);

    parts.push({
      mesh: object,
      isShell: shell,
      originalOpacity: prepareMaterialForReveal(object, shell),
      assembledPosition: object.position.clone(),
      assembledRotation: object.rotation.clone(),
      explodedPosition: object.position.clone().add(offset),
      explodedRotation: new THREE.Euler(
        object.rotation.x + sideBias * 0.1,
        object.rotation.y + offset.x * 0.16,
        object.rotation.z + sideBias * 0.08
      )
    });
  });

  return parts;
}

function updatePartAssembly(parts, progress) {
  const attach = smoothstep(0.08, 0.72, progress);
  const inspect = smoothstep(0.46, 0.62, progress) * (1 - smoothstep(0.72, 0.86, progress));

  parts.forEach((part) => {
    part.mesh.position.lerpVectors(part.explodedPosition, part.assembledPosition, attach);
    part.mesh.rotation.set(
      THREE.MathUtils.lerp(part.explodedRotation.x, part.assembledRotation.x, attach),
      THREE.MathUtils.lerp(part.explodedRotation.y, part.assembledRotation.y, attach),
      THREE.MathUtils.lerp(part.explodedRotation.z, part.assembledRotation.z, attach)
    );

    if (part.isShell) {
      setPartOpacity(part, THREE.MathUtils.lerp(1, 0.4, inspect));
    }
  });
}

function ThreeAppModel({ progressValue }) {
  const mountRef = useRef(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const unsubscribe = progressValue.on("change", (value) => {
      progressRef.current = value;
    });
    return () => unsubscribe();
  }, [progressValue]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0.48, mount.clientWidth < 640 ? 6.2 : 5.2);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.HemisphereLight(0xfff5e8, 0x6c5a46, 2.4));

    const key = new THREE.DirectionalLight(0xfff2dd, 3.8);
    key.position.set(-4, 5, 4.5);
    key.castShadow = true;
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xffffff, 1.4);
    rim.position.set(4, 2, -3);
    scene.add(rim);

    const modelRoot = new THREE.Group();
    scene.add(modelRoot);

    let disposed = false;
    let loadedModel = null;
    let modelParts = [];
    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        if (disposed) return;
        loadedModel = gltf.scene;
        fitModelToStage(loadedModel, mount.clientWidth < 640 ? 2.45 : 2.85);
        modelParts = createPartAssembly(loadedModel, mount.clientWidth < 640 ? 0.72 : 0.86);
        updatePartAssembly(modelParts, progressRef.current);
        modelRoot.add(loadedModel);
      },
      undefined,
      (error) => {
        console.error("Failed to load Mac Mini GLB", error);
      }
    );

    let frameId = 0;
    const clock = new THREE.Clock();
    const render = () => {
      const elapsed = clock.getElapsedTime();
      const progress = progressRef.current;
      const settle = smoothstep(0.12, 0.82, progress);

      updatePartAssembly(modelParts, progress);
      modelRoot.rotation.y = THREE.MathUtils.lerp(-0.72, 0.62 - Math.PI, progress) + Math.sin(elapsed * 0.22) * 0.025;
      modelRoot.rotation.x = THREE.MathUtils.lerp(0.22, -0.08, settle);
      modelRoot.position.y = THREE.MathUtils.lerp(0.34, -0.05, settle);
      modelRoot.scale.setScalar(THREE.MathUtils.lerp(0.92, 1.08, settle));

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    const handleResize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.position.z = width < 640 ? 6.2 : 5.2;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      if (loadedModel) {
        loadedModel.scale.setScalar(1);
        loadedModel.position.set(0, 0, 0);
        fitModelToStage(loadedModel, width < 640 ? 2.45 : 2.85);
        modelParts = createPartAssembly(loadedModel, width < 640 ? 0.72 : 0.86);
        updatePartAssembly(modelParts, progressRef.current);
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
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
          else object.material.dispose();
        }
      });
    };
  }, []);

  return <div className="three-canvas" ref={mountRef} aria-hidden="true" />;
}

export default ThreeAppModel;
