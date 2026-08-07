import { Link } from "@tanstack/react-router";
import { company } from "@/lib/site-data";
import { motion } from "motion/react";
import { useRef, useState } from "react";

export function Footer() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastLineRef = useRef<number>(-1);

  const playPluck = (frequency: number) => {
    if (typeof window === "undefined") return;
    
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      audioCtxRef.current = new AudioContextClass();
    }
    
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") {
      ctx.resume();
    }
    
    // Create oscillators for a rich guitar-like tone
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    
    // Sawtooth for bright string harmonics, Triangle for warm body
    osc1.type = "sawtooth";
    osc2.type = "triangle";
    
    osc1.frequency.setValueAtTime(frequency, ctx.currentTime);
    // Slight detune on the second oscillator for a thicker, acoustic feel
    osc2.frequency.setValueAtTime(frequency * 1.002, ctx.currentTime);
    
    // Lowpass filter to simulate the 'pluck' (starts bright, instantly becomes duller)
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.Q.value = 1.5;
    // Smoother pluck: start at 2500Hz instead of 4000Hz
    filter.frequency.setValueAtTime(2500, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(Math.max(frequency * 1.2, 300), ctx.currentTime + 0.15);
    
    // Volume envelope
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    // Reduced maximum volume for a softer sound
    gainNode.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
    
    // Echo (Delay) setup
    const delayNode = ctx.createDelay(1.0);
    delayNode.delayTime.value = 0.25; // 250ms echo
    
    const feedbackGain = ctx.createGain();
    feedbackGain.gain.value = 0.35; // How much it echoes
    
    // Connect audio graph
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    
    // Dry signal
    gainNode.connect(ctx.destination);
    
    // Wet (Echo) signal
    gainNode.connect(delayNode);
    delayNode.connect(feedbackGain);
    feedbackGain.connect(delayNode); // Feedback loop
    delayNode.connect(ctx.destination);
    
    osc1.start(ctx.currentTime);
    osc2.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 1.6);
    osc2.stop(ctx.currentTime + 1.6);
  };

  const [hoveredCell, setHoveredCell] = useState<{ line: number, letter: number } | null>(null);
  
  // State to hold active music note particles
  const [particles, setParticles] = useState<{ id: number, x: number, y: number, note: string }[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const x = e.clientX - rect.left;
    
    // Spawn music notes randomly as the mouse moves over the text
    if (Math.random() > 0.4) {
      const notes = ["♪", "♫", "♬", "♩"];
      const randomNote = notes[Math.floor(Math.random() * notes.length)];
      setParticles(prev => [
        ...prev.slice(-20), // Keep max 20 particles at a time
        { id: Date.now() + Math.random(), x, y, note: randomNote }
      ]);
    }
    
    // 20 slices total now for huge gaps
    const sliceHeight = rect.height / 20;
    const currentLine = Math.floor(y / sliceHeight);
    
    // Approximate which letter is hovered (6 letters total)
    // This works perfectly if the flex container evenly distributes them or we just use relative width
    const currentLetter = Math.floor((x / rect.width) * 6);

    if (
      currentLine >= 0 && currentLine < 20 &&
      currentLetter >= 0 && currentLetter < 6
    ) {
      if (
        hoveredCell?.line !== currentLine ||
        hoveredCell?.letter !== currentLetter
      ) {
        setHoveredCell({ line: currentLine, letter: currentLetter });

        // Play sound if the *line* changes to prevent overlapping noise bursts
        if (hoveredCell?.line !== currentLine) {
          // D Major Pentatonic for a bright, magical chime sound
          const scale = [293.66, 329.63, 369.99, 440.00, 493.88];
          const octave = Math.floor(currentLine / scale.length);
          const noteIndex = currentLine % scale.length;
          const baseOctaveMultiplier = 1.5;
          const freq = scale[noteIndex] * Math.pow(2, octave) * baseOctaveMultiplier;
          playPluck(Math.min(freq, 3000));
        }
      }
    } else {
      setHoveredCell(null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredCell(null);
  };

  const text = "ZUARAK";
  const letters = text.split("");

  return (
    <footer className="relative overflow-hidden bg-[#030303] pt-24 pb-12 text-white">

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10">
        {/* Top Row */}
        <div className="flex flex-col justify-between gap-12 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] font-semibold tracking-widest text-white/60 uppercase md:text-xs">
              Let's build work that inspires.
            </p>
            <h2 className="mt-6 max-w-3xl text-5xl font-normal tracking-tight md:text-7xl lg:text-8xl">
              Ready to build<br />something bold?
            </h2>
          </div>

          <div className="pb-4">
            <Link
              to="/contact"
              className="group flex items-center gap-4 border-b border-white/30 pb-3 text-[10px] font-semibold tracking-[0.2em] uppercase transition-colors hover:border-white md:text-xs"
            >
              Start a collaboration
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* Middle Row */}
        <div className=" mt-10 md:mt-32 flex flex-col justify-between gap-16 md:flex-row">
          <div className="flex flex-col justify-between gap-8">
            <div className="space-y-2">
              <p className="text-[10px] font-semibold tracking-widest text-white/50 uppercase">
                ©ZUARAK 2026
              </p>
              <p className="text-[10px] font-semibold tracking-widest text-white/40 uppercase">
                Designed & Developed by ZUARAK
              </p>
            </div>
            <p className="text-[10px] font-semibold tracking-widest text-white/50 uppercase">
              SOUND ON 🎵 HOVER THE LINES.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-12 sm:gap-16 md:gap-32">
            <div>
              <p className="mb-4 md:mb-6 text-[10px] font-semibold tracking-widest text-white/40 uppercase">
                Business Enquiry
              </p>
              <div className="flex flex-col gap-4 text-sm font-medium tracking-wide">
                <p>
                  <span className="text-white/40 mr-1">E.</span>
                  <a href={`mailto:${company.email}`} className="hover:text-white/70 transition-colors inline-block">{company.email}</a>
                </p>
                <p>
                  <span className="text-white/40 mr-1">P.</span>
                  <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="hover:text-white/70 transition-colors inline-block">{company.phone}</a>
                </p>
              </div>
            </div>

            <div>
              <p className="mb-4 md:mb-6 text-[10px] font-semibold tracking-widest text-white/40 uppercase">
                Social
              </p>
              <div className="flex flex-col gap-4 text-sm font-medium tracking-wide">
                {company.socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer noopener" className="hover:text-white/70 transition-colors inline-block">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Massive Lined Text */}
        <div className="mt-10 md:mt-20 flex w-full justify-center overflow-hidden pb-8 md:pb-0">
          <div 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative flex gap-[2vw] cursor-crosshair select-none text-[21vw] font-medium leading-[1] md:leading-[0.8] md:gap-[3vw]"
          >
            {/* Render Music Note Particles */}
            {particles.map(p => (
              <motion.div
                key={p.id}
                initial={{ x: p.x, y: p.y, opacity: 1, scale: Math.random() * 0.5 + 0.5 }}
                animate={{ 
                  y: p.y - (Math.random() * 80 + 40), // Float upwards
                  x: p.x + (Math.random() - 0.5) * 50, // Drift side to side
                  opacity: 0,
                  rotate: Math.random() * 90 - 45 // Slight tilt
                }}
                transition={{ duration: Math.random() * 0.8 + 0.6, ease: "easeOut" }}
                className="pointer-events-none absolute left-0 top-0 z-50 text-[20px] text-white/70"
              >
                {p.note}
              </motion.div>
            ))}

            {letters.map((letter, letterIdx) => (
              <div key={letterIdx} className="relative">
                {/* Invisible base text to set the container size for each letter */}
                <span className="opacity-0">{letter}</span>

                {/* 20 individual slices to simulate lines with huge gaps */}
                {Array.from({ length: 20 }).map((_, lineIdx) => {
                  const isHovered = hoveredCell?.line === lineIdx && hoveredCell?.letter === letterIdx;

                  // Thinner lines (0.25%) and massive gaps (5% total stride)
                  const top = lineIdx * 5;
                  const bottom = 100 - (top + 0.25);

                  return (
                    <motion.span
                      key={lineIdx}
                      className="absolute left-0 top-0 w-full text-white/90 text-center"
                      style={{
                        clipPath: `inset(${top}% 0 ${bottom}% 0)`,
                      }}
                      animate={{
                        x: isHovered ? [0, -8, 8, -4, 4, 0] : 0,
                        scaleY: isHovered ? 2 : 1,
                        filter: isHovered ? "brightness(1.5) drop-shadow(0px 0px 8px white)" : "brightness(1)",
                        zIndex: isHovered ? 10 : 1,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                    >
                      {letter}
                    </motion.span>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
