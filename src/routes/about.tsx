import { createFileRoute } from "@tanstack/react-router";
import { RevealWords } from "@/components/Reveal";
import { AboutShowcase } from "@/components/sections/AboutShowcase";
import { AboutCeos } from "@/components/sections/AboutCeos";
import { AboutCulture } from "@/components/sections/AboutCulture";
import abtImg from "@/assets/abt4.png";
import aiIcon from "@/assets/ai.png";
import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";

const title = "About ZUARAK — A Senior Software & Design Studio in Kozhikode";
const description =
  "ZUARAK is a senior product studio engineering software, AI and digital products for companies in 14 countries. Meet the team, process and principles.";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

function AboutPage() {
  const imgRef = useRef<HTMLDivElement>(null);
  const nextSectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(imgRef, { once: true, amount: 0.2 });

  const [spokenText, setSpokenText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Clean up speech synthesis if component unmounts
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      if (isSpeaking) return;

      window.speechSynthesis.cancel();
      setIsSpeaking(true);
      setSpokenText("[ INITIALIZING CONNECTION... ]");

      const playConnectSound = () => {
        try {
          const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
          const ctx = new AudioContext();

          // --- 1. Background Static ---
          const bufferSize = ctx.sampleRate * 2.0; // 2 seconds total
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
          }
          const noise = ctx.createBufferSource();
          noise.buffer = buffer;

          const filter = ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.value = 1000;

          const noiseGain = ctx.createGain();
          noiseGain.gain.setValueAtTime(0, ctx.currentTime);
          noiseGain.gain.linearRampToValueAtTime(0.8, ctx.currentTime + 0.1);
          noiseGain.gain.setValueAtTime(0.8, ctx.currentTime + 0.8);
          noiseGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 1.2);
          noiseGain.gain.setValueAtTime(0.2, ctx.currentTime + 1.6);
          noiseGain.gain.linearRampToValueAtTime(0.8, ctx.currentTime + 1.8);
          noiseGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2.0);

          noise.connect(filter);
          filter.connect(noiseGain);
          noiseGain.connect(ctx.destination);
          noise.start();


        } catch (e) { }
      };

      const playDisconnectSound = () => {
        try {
          const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
          const ctx = new AudioContext();

          // 1.5 seconds of static to simulate disconnecting
          const bufferSize = ctx.sampleRate * 1.5;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
          }
          const noise = ctx.createBufferSource();
          noise.buffer = buffer;

          const filter = ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.value = 1000;

          const noiseGain = ctx.createGain();
          noiseGain.gain.setValueAtTime(0, ctx.currentTime);
          noiseGain.gain.linearRampToValueAtTime(0.8, ctx.currentTime + 0.1);
          noiseGain.gain.setValueAtTime(0.8, ctx.currentTime + 1.0);
          noiseGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);

          noise.connect(filter);
          filter.connect(noiseGain);
          noiseGain.connect(ctx.destination);
          noise.start();
        } catch (e) { }
      };

      playConnectSound();

      const text = "Hi! Welcome to ZUARAK. We're glad you're here. Take a moment to explore our world of innovation, creativity, and technology. Every experience is designed to inspire what's possible. Thank you for visiting, and enjoy exploring the world of ZUARAK.";
      const utterance = new SpeechSynthesisUtterance(text);

      utterance.onboundary = (e) => {
        setSpokenText(text.slice(0, e.charIndex));
      };

      utterance.onend = () => {
        setSpokenText("[ CONNECTION TERMINATED ]");
        playDisconnectSound();

        // Auto-scroll accurately to the next section
        setTimeout(() => {
          if (nextSectionRef.current) {
            nextSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          setIsSpeaking(false);
          setSpokenText("");
        }, 1500);
      };

      const voices = window.speechSynthesis.getVoices();
      const maleVoice = voices.find(voice =>
        voice.name.includes('Male') ||
        voice.name.includes('Alex') ||
        voice.name.includes('Daniel') ||
        voice.name.includes('Fred') ||
        voice.name.includes('David')
      );

      if (maleVoice) {
        utterance.voice = maleVoice;
      }

      // Extremely low pitch for maximum bass/robotic feel
      utterance.pitch = 0.01;
      utterance.rate = 0.75;
      utterance.volume = 1;

      // 2-second delay to perfectly sync with the audio sequence
      setTimeout(() => {
        setSpokenText("");
        window.speechSynthesis.speak(utterance);
      }, 2000);
    }
  };



  return (
    <>
      <section className="relative flex flex-col items-center justify-start overflow-hidden px-6 pt-32 md:pt-48 text-center min-h-screen">
        <div className="grid-lines absolute inset-0 opacity-40" aria-hidden />

        <div className="relative z-10 mx-auto w-full max-w-[1400px] flex flex-col items-center">
          <h1 className="display-lg normal-case max-w-[95vw] md:max-w-5xl font-normal leading-[1.05] md:leading-none tracking-tight text-balance">
            <RevealWords text="We design and engineer software that carries a company's ambition." />
          </h1>

          <motion.div
            ref={imgRef}
            className="relative mt-2 md:mt-4 w-full flex justify-center group cursor-pointer"
            initial={{ opacity: 0, scale: 0.2, y: 100 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.2, y: 100 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            onClick={speak}
            title="Click to initiate connection"
          >
            {/* Subtitles Overlay */}
            {isSpeaking && spokenText && (
              <div className="fixed inset-x-0 bottom-10 z-[200] flex justify-center pointer-events-none px-4">
                <div className="bg-white/70 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-md shadow-xl max-w-3xl w-fit text-center border border-black/10">
                  <p className="font-mono text-[9px] md:text-[10px] text-black uppercase leading-relaxed tracking-widest font-semibold break-words">
                    {spokenText}
                    <span className="inline-block w-1 h-2 ml-1.5 bg-black animate-pulse align-middle" />
                  </p>
                </div>
              </div>
            )}

            {/* Minimal Play Text moved to Top Left */}
            <div className={`absolute top-4 left-4 md:top-12 md:left-12 z-20 transition-all duration-500 ${isSpeaking ? 'opacity-10' : 'opacity-40 group-hover:opacity-100 group-hover:-translate-y-1'}`}>
              <div className="flex items-center gap-2 text-foreground font-mono text-[10px] tracking-widest uppercase">
                {!isSpeaking && <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="6 3 20 12 6 21 6 3" /></svg>}
                {isSpeaking ? '[ CONNECTED ]' : '[ Hear Core ]'}
              </div>
            </div>

            <img
              src={abtImg}
              alt="About ZUARAK"
              className="max-w-full max-h-[50vh] md:max-h-[900px] object-contain transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </motion.div>
        </div>
      </section>

      <div ref={nextSectionRef}>
        <AboutShowcase />
      </div>

      <AboutCeos />

      <AboutCulture />

    </>
  );
}
