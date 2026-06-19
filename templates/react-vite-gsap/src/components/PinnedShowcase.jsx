import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ThreeHardwareModel from "./ThreeHardwareModel.jsx";

gsap.registerPlugin(ScrollTrigger);

const soundSteps = [0.14, 0.3, 0.48, 0.68, 0.88];

function getAudioContext(audioContextRef) {
  if (audioContextRef.current) return audioContextRef.current;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  audioContextRef.current = new AudioContext();
  return audioContextRef.current;
}

function createHardwareSound(audioContext, stepIndex) {
  const now = audioContext.currentTime;
  const master = audioContext.createGain();
  master.gain.setValueAtTime(0.26, now);
  master.connect(audioContext.destination);

  const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.07, audioContext.sampleRate);
  const noiseData = noiseBuffer.getChannelData(0);
  for (let i = 0; i < noiseData.length; i += 1) {
    noiseData[i] = (Math.random() * 2 - 1) * (1 - i / noiseData.length);
  }

  const latch = audioContext.createBufferSource();
  const latchFilter = audioContext.createBiquadFilter();
  const latchGain = audioContext.createGain();
  latch.buffer = noiseBuffer;
  latchFilter.type = "bandpass";
  latchFilter.frequency.setValueAtTime(1050 + stepIndex * 230, now);
  latchFilter.Q.setValueAtTime(9, now);
  latchGain.gain.setValueAtTime(0.0001, now);
  latchGain.gain.exponentialRampToValueAtTime(0.34, now + 0.007);
  latchGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.085);
  latch.connect(latchFilter);
  latchFilter.connect(latchGain);
  latchGain.connect(master);
  latch.start(now);

  const motor = audioContext.createOscillator();
  const motorGain = audioContext.createGain();
  motor.type = "sawtooth";
  motor.frequency.setValueAtTime(82 + stepIndex * 14, now);
  motor.frequency.exponentialRampToValueAtTime(44 + stepIndex * 8, now + 0.16);
  motorGain.gain.setValueAtTime(0.0001, now);
  motorGain.gain.exponentialRampToValueAtTime(stepIndex === soundSteps.length - 1 ? 0.13 : 0.09, now + 0.018);
  motorGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
  motor.connect(motorGain);
  motorGain.connect(master);
  motor.start(now);
  motor.stop(now + 0.22);

  const metal = audioContext.createOscillator();
  const metalGain = audioContext.createGain();
  metal.type = "square";
  metal.frequency.setValueAtTime(420 + stepIndex * 95, now + 0.018);
  metalGain.gain.setValueAtTime(0.0001, now + 0.018);
  metalGain.gain.exponentialRampToValueAtTime(0.026, now + 0.027);
  metalGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);
  metal.connect(metalGain);
  metalGain.connect(master);
  metal.start(now + 0.018);
  metal.stop(now + 0.15);
}

function PinnedShowcase() {
  const sectionRef = useRef(null);
  const assemblyRef = useRef({ value: 0 });
  const audioContextRef = useRef(null);
  const triggeredStepsRef = useRef(new Set());
  const soundEnabledRef = useRef(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const playForProgress = (progress) => {
    if (!soundEnabledRef.current || !audioContextRef.current || audioContextRef.current.state !== "running") return;

    if (progress < 0.06) {
      triggeredStepsRef.current.clear();
    }

    soundSteps.forEach((step, index) => {
      if (progress >= step && !triggeredStepsRef.current.has(index)) {
        triggeredStepsRef.current.add(index);
        createHardwareSound(audioContextRef.current, index);
      }

      if (progress < step - 0.1) {
        triggeredStepsRef.current.delete(index);
      }
    });
  };

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

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
      createHardwareSound(audioContext, 0);
    }

    setSoundEnabled((enabled) => !enabled);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3400",
          scrub: true,
          pin: true,
          onUpdate: (self) => playForProgress(self.progress),
        },
      });

      timeline
        .fromTo(".pin-headline", { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 })
        .to(".wall-rule", { scaleX: 1, duration: 0.45 }, "<")
        .to(assemblyRef.current, { value: 0.32, duration: 0.8 }, ">")
        .to(".pin-headline", { y: -78, opacity: 0, duration: 0.42 }, "<0.2")
        .fromTo(".stage-note", { x: -34, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.12, duration: 0.62 }, "<")
        .to(".wall-panel", { yPercent: -5, duration: 0.75 }, "<")
        .to(assemblyRef.current, { value: 0.78, duration: 1.1 }, ">")
        .fromTo(".spec-panel", { y: 62, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.14, duration: 0.7 }, "<0.12")
        .to(assemblyRef.current, { value: 1, duration: 0.72 }, ">")
        .fromTo(".final-lockup", { y: 38, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, "<0.15");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="pinned-showcase" id="pin" ref={sectionRef} aria-labelledby="pin-title">
      <div className="wall-panel" aria-hidden="true" />
      <div className="wall-rule" aria-hidden="true" />

      <button
        className="sound-toggle"
        type="button"
        onClick={toggleSound}
        aria-pressed={soundEnabled}
        aria-label={soundEnabled ? "Turn hardware sound off" : "Turn hardware sound on"}
      >
        {soundEnabled ? "Sound on" : "Sound off"}
      </button>

      <div className="pin-headline">
        <p className="kicker">GPU parts in suspension</p>
        <h2 id="pin-title">The PCB rises, the fans seat, the 5090 shroud locks.</h2>
      </div>

      <div className="hardware-stage" data-three-model="gsap-5090-gpu">
        <ThreeHardwareModel progressRef={assemblyRef} />
      </div>

      <div className="stage-notes" aria-label="Assembly notes">
        <span className="stage-note">01 PCB + edge teeth</span>
        <span className="stage-note">02 heatsink + fans</span>
        <span className="stage-note">03 shroud + power</span>
      </div>

      <div className="spec-panels" aria-label="Object panels">
        <article className="spec-panel">
          <span>Cooler</span>
          <strong>dual axial fans</strong>
        </article>
        <article className="spec-panel">
          <span>Details</span>
          <strong>PCIe + IO bracket</strong>
        </article>
        <article className="spec-panel">
          <span>Model</span>
          <strong>5090-class GPU</strong>
        </article>
      </div>

      <div className="final-lockup">
        <span>GPU assembled</span>
        <a className="small-cta" href="#specs">View craft</a>
      </div>
    </section>
  );
}

export default PinnedShowcase;
