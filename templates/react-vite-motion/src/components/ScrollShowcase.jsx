import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import ThreeAppModel from "./ThreeAppModel.jsx";

const phases = [
  ["01", "Shell aligns", "The aluminum body and dark underside vent close around the internal board."],
  ["02", "Ports seat", "Rear IO, ethernet, display, USB-style ports, and power socket slide into the back plate."],
  ["03", "Details lock", "Cooling fan, copper chips, front LED, and top mark finish the compact desktop silhouette."],
];

const soundSteps = [0.18, 0.34, 0.5, 0.66, 0.76];

function getAudioContext(audioContextRef) {
  if (audioContextRef.current) return audioContextRef.current;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  audioContextRef.current = new AudioContext();
  return audioContextRef.current;
}

function createAssemblySound(audioContext, stepIndex) {
  const now = audioContext.currentTime;
  const master = audioContext.createGain();
  master.gain.setValueAtTime(0.28, now);
  master.connect(audioContext.destination);

  const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.055, audioContext.sampleRate);
  const noiseData = noiseBuffer.getChannelData(0);
  for (let i = 0; i < noiseData.length; i += 1) {
    noiseData[i] = (Math.random() * 2 - 1) * (1 - i / noiseData.length);
  }

  const snap = audioContext.createBufferSource();
  const snapFilter = audioContext.createBiquadFilter();
  const snapGain = audioContext.createGain();
  snap.buffer = noiseBuffer;
  snapFilter.type = "bandpass";
  snapFilter.frequency.setValueAtTime(1400 + stepIndex * 190, now);
  snapFilter.Q.setValueAtTime(7.5, now);
  snapGain.gain.setValueAtTime(0.0001, now);
  snapGain.gain.exponentialRampToValueAtTime(0.32, now + 0.006);
  snapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.075);
  snap.connect(snapFilter);
  snapFilter.connect(snapGain);
  snapGain.connect(master);
  snap.start(now);

  const thud = audioContext.createOscillator();
  const thudGain = audioContext.createGain();
  thud.type = "sine";
  thud.frequency.setValueAtTime(92 + stepIndex * 9, now);
  thud.frequency.exponentialRampToValueAtTime(48 + stepIndex * 5, now + 0.11);
  thudGain.gain.setValueAtTime(0.0001, now);
  thudGain.gain.exponentialRampToValueAtTime(stepIndex === soundSteps.length - 1 ? 0.18 : 0.12, now + 0.012);
  thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
  thud.connect(thudGain);
  thudGain.connect(master);
  thud.start(now);
  thud.stop(now + 0.18);

  const ping = audioContext.createOscillator();
  const pingGain = audioContext.createGain();
  ping.type = "triangle";
  ping.frequency.setValueAtTime(580 + stepIndex * 72, now + 0.018);
  pingGain.gain.setValueAtTime(0.0001, now + 0.018);
  pingGain.gain.exponentialRampToValueAtTime(0.045, now + 0.026);
  pingGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
  ping.connect(pingGain);
  pingGain.connect(master);
  ping.start(now + 0.018);
  ping.stop(now + 0.15);
}

function ScrollShowcase() {
  const ref = useRef(null);
  const audioContextRef = useRef(null);
  const triggeredStepsRef = useRef(new Set());
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const labelY = useTransform(scrollYProgress, [0, 0.24, 0.78, 1], [70, 0, 0, -70]);
  const labelOpacity = useTransform(scrollYProgress, [0, 0.12, 0.82, 1], [0, 1, 1, 0]);
  const floorY = useTransform(scrollYProgress, [0, 1], ["-4%", "7%"]);
  const specOpacity = useTransform(scrollYProgress, [0.38, 0.56, 0.95], [0, 1, 1]);
  const specY = useTransform(scrollYProgress, [0.38, 0.66], [48, 0]);

  useEffect(() => {
    if (!soundEnabled) return undefined;

    const unsubscribe = scrollYProgress.on("change", (progress) => {
      if (!audioContextRef.current || audioContextRef.current.state !== "running") return;

      if (progress < 0.08) {
        triggeredStepsRef.current.clear();
      }

      soundSteps.forEach((step, index) => {
        if (progress >= step && !triggeredStepsRef.current.has(index)) {
          triggeredStepsRef.current.add(index);
          createAssemblySound(audioContextRef.current, index);
        }

        if (progress < step - 0.1) {
          triggeredStepsRef.current.delete(index);
        }
      });
    });

    return () => unsubscribe();
  }, [scrollYProgress, soundEnabled]);

  useEffect(() => {
    if (!soundEnabled) return undefined;

    const unlockAudio = async () => {
      const audioContext = getAudioContext(audioContextRef);
      if (!audioContext) return;
      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }
    };

    window.addEventListener("pointerdown", unlockAudio, { once: true });
    window.addEventListener("keydown", unlockAudio, { once: true });
    window.addEventListener("touchstart", unlockAudio, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };
  }, [soundEnabled]);

  const toggleSound = async () => {
    const audioContext = getAudioContext(audioContextRef);
    if (!audioContext) return;

    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }

    if (!soundEnabled) {
      createAssemblySound(audioContext, 0);
    }

    setSoundEnabled((enabled) => !enabled);
  };

  return (
    <section className="scroll-wrapper" id="showcase" ref={ref} aria-labelledby="showcase-title">
      <div className="sticky-scene">
        <motion.div className="scene-floor" style={{ y: floorY }} aria-hidden="true" />

        <button
          className="sound-toggle"
          type="button"
          onClick={toggleSound}
          aria-pressed={soundEnabled}
          aria-label={soundEnabled ? "Turn assembly sound off" : "Turn assembly sound on"}
        >
          {soundEnabled ? "Sound on" : "Sound off"}
        </button>

        <motion.div className="scene-title" style={{ y: labelY, opacity: labelOpacity }}>
          <p className="eyebrow">Exploded furniture assembly</p>
          <h2 id="showcase-title">A compact desktop becomes whole as you scroll.</h2>
        </motion.div>

        <div className="model-stage" data-three-model="motion-compact-desktop">
          <ThreeAppModel progressValue={scrollYProgress} />
        </div>

        <motion.div className="spec-stack" style={{ opacity: specOpacity, y: specY }}>
          {phases.map(([step, title, text]) => (
            <article className="spec-card" key={title}>
              <span>{step}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default ScrollShowcase;
