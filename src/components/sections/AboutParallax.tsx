import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { useRef } from "react";

const text = "We are a premium digital studio. We blend cutting-edge AI, flawless design, and robust engineering to build solutions that redefine what's possible for your business.";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [12, 0]);
  
  return (
    <motion.span style={{ opacity, y }} className="inline-block transition-colors">
      {children}
    </motion.span>
  );
}

export function AboutParallax() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 45%"],
  });

  const words = text.split(" ");

  return (
    <section id="about" ref={ref} className="relative border-y border-border bg-surface py-32 px-6 md:py-48 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <p className="eyebrow mb-12">About Us</p>
        <h2 className="display-md font-normal flex flex-wrap gap-x-3 gap-y-2 md:gap-x-5 md:gap-y-4 max-w-[1200px]">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </h2>
      </div>
    </section>
  );
}
