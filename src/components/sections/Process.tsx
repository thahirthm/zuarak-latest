import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal, RevealWords } from "@/components/Reveal";
import { process } from "@/lib/site-data";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 80%"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="relative scroll-mt-24 px-6 py-28 md:px-10 md:py-40 bg-black text-white border-t border-white/10">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="font-mono text-sm uppercase tracking-widest text-white/40 mb-6">Process</p>
        </Reveal>
        <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-normal tracking-tight leading-none max-w-4xl text-white">
          <RevealWords text="A rhythm that removes surprises." />
        </h2>

        <div ref={ref} className="relative mt-24 md:mt-32 pl-10 md:pl-24">
          <div aria-hidden className="absolute top-0 bottom-0 left-0 w-px bg-white/10 md:left-8">
            <motion.div style={{ height }} className="w-px bg-white/70" />
          </div>

          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.05}>
              <div className="group relative border-b border-white/10 py-10 md:py-16">
                <span
                  aria-hidden
                  className="absolute top-[3.25rem] -left-10 size-2 -translate-x-[3.5px] rounded-full bg-white/10 transition-colors duration-500 group-hover:bg-white md:-left-16 md:top-[4.5rem]"
                />
                <div className="grid gap-6 md:grid-cols-[100px_1fr_1fr] md:items-center md:gap-16">
                  <span className="font-mono text-sm tracking-widest text-white/40 self-start pt-2 md:pt-0">{p.step}</span>
                  <h3 className="text-3xl md:text-5xl font-light tracking-tight text-white transition-transform duration-700 ease-out group-hover:translate-x-6">
                    {p.title}
                  </h3>
                  <p className="text-lg md:text-xl font-light text-white/70 leading-relaxed max-w-lg">
                    {p.copy}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
