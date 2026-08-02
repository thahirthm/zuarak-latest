import { Reveal } from "@/components/Reveal";
import { MagneticLink } from "@/components/Magnetic";
import { company } from "@/lib/site-data";
import { NetworkCanvas } from "@/components/NetworkCanvas";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// Individual letter animation: 
// 1. Flies in from random directions on mount (when scrolled into view).
// 2. Bounces/shifts slightly when the mouse brushes over it.
function InteractiveLetter({ children, delay, isInView }: { children: React.ReactNode, delay: number, isInView: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Generate random starting positions for the "fly in from all sides" effect
  const [randomStart] = useState(() => ({
    x: (Math.random() - 0.5) * 400, // Random X offset between -200 and 200
    y: (Math.random() - 0.5) * 400, // Random Y offset between -200 and 200
    rotate: (Math.random() - 0.5) * 180, // Random initial rotation
    opacity: 0,
    scale: 0.5,
  }));

  // The resting state of the letter
  const settledState = {
    x: 0,
    y: 0,
    rotate: 0,
    opacity: 1,
    scale: 1,
    color: "#ffffff",
  };

  // The hover state of the letter
  const hoveredState = {
    x: 0,
    y: -15,
    rotate: Math.random() * 10 - 5,
    opacity: 1,
    scale: 1.15,
    color: "#d4d4d8", // light zinc
  };

  return (
    <motion.span
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={randomStart}
      animate={
        !isInView 
          ? randomStart 
          : isHovered 
            ? hoveredState 
            : settledState
      }
      transition={{ 
        type: "spring", 
        stiffness: isHovered ? 400 : 80, 
        damping: isHovered ? 10 : 12,
        delay: isInView && !isHovered ? delay : 0, // stagger the entrance
      }}
      className="inline-block cursor-default"
    >
      {children}
    </motion.span>
  );
}

// Helper to wrap each letter of a word in the InteractiveLetter component
function InteractiveWord({ word, baseDelay, isInView }: { word: string, baseDelay: number, isInView: boolean }) {
  return (
    <span className="inline-flex">
      {word.split("").map((letter, i) => (
        <InteractiveLetter key={i} delay={baseDelay + i * 0.03} isInView={isInView}>
          {letter}
        </InteractiveLetter>
      ))}
    </span>
  );
}

export function CTA() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  // Smooth out the mouse values with a spring
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Transform the mouse position into rotation angles (-15deg to 15deg)
  const rotateX = useTransform(springY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-15deg", "15deg"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to range [-0.5, 0.5]
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative overflow-hidden bg-[#09090b] px-6 py-32 md:px-10 md:py-48">
      {/* Spider-web Interactive Background */}
      <NetworkCanvas />

      {/* Subtle Glow Behind the text */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-1/2 z-0 h-[700px] opacity-60 blur-[130px]"
        style={{ background: "radial-gradient(circle at 50% 0%, oklch(1 0 0 / 10%), transparent 65%)" }}
      />

      <div className="relative z-10 mx-auto max-w-[1400px] text-center" style={{ perspective: "1000px" }}>
        <Reveal>
          <p className="text-[10px] font-semibold tracking-[0.3em] text-white/70 uppercase md:text-xs">
            Let's build
          </p>
        </Reveal>

        {/* 3D Interactive Typography */}
        <div className="mt-8" ref={containerRef}>
          <motion.h2 
            className="text-4xl font-normal leading-tight uppercase text-white md:text-7xl lg:text-[8rem]"
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
          >
            <InteractiveWord word="Start" baseDelay={0.1} isInView={isInView} />
            <br />
            <InteractiveWord word="Something" baseDelay={0.4} isInView={isInView} />
            <br />
            <InteractiveWord word="Exceptional" baseDelay={0.7} isInView={isInView} />
          </motion.h2>
        </div>

        <Reveal delay={1.2}>
          <p className="mx-auto mt-10 max-w-xl text-lg font-light text-white/80 md:text-xl">
            Tell us what you're building. You'll hear from a senior engineer, not a sales desk.
          </p>
        </Reveal>

        <Reveal delay={1.4}>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <MagneticLink to="/contact">Start Your Project</MagneticLink>
            <MagneticLink href={`mailto:${company.email}`} variant="ghost">
              {company.email}
            </MagneticLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
