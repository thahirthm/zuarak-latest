import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { Reveal, RevealWords } from "@/components/Reveal";
import { testimonials } from "@/lib/site-data";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const item = testimonials[index];

  const go = (step: number) => {
    setDir(step);
    setIndex((i) => (i + step + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="bg-[#09090b] px-6 py-28 text-white md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="text-[10px] font-semibold tracking-[0.3em] text-white/70 uppercase md:text-xs">
            TESTIMONIALS
          </p>
        </Reveal>
        <h2 className="mt-8 max-w-4xl text-4xl font-normal leading-[0.9] tracking-tighter md:text-6xl lg:text-[5.5rem]">
          <RevealWords text="What Partners Say." />
        </h2>

        <div className="relative mt-16 min-h-[380px] md:min-h-[320px]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={item.name}
              initial={{ opacity: 0, x: dir * 60, filter: "blur(12px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -dir * 60, filter: "blur(12px)" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="grid  gap-5 md:gap-10 rounded-[32px] border border-white/5 bg-[#111] p-8 md:grid-cols-[auto_1fr] md:p-14 lg:p-20"
            >
              <div
                aria-hidden
                className="order-2 md:order-1 grid size-16 md:size-32 shrink-0 place-items-center rounded-2xl bg-black text-xl md:text-4xl font-bold border border-white/10 text-white"
              >
                {item.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="order-1 md:order-2 min-w-0">

                <blockquote className="mt-6 text-xl font-normal leading-snug tracking-tight text-white md:text-3xl lg:text-4xl">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-8 text-sm text-white/50 md:text-base">
                  <span className="font-semibold text-white">{item.name}</span> — {item.role},{" "}
                  {item.company}
                </figcaption>
              </div>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="grid size-12 place-items-center rounded-full border border-white/20 transition-colors hover:bg-white/10"
          >
            <ArrowLeft className="size-4 text-white" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="grid size-12 place-items-center rounded-full border border-white/20 transition-colors hover:bg-white/10"
          >
            <ArrowRight className="size-4 text-white" />
          </button>
          <span className="ml-4 font-mono text-xs tracking-widest text-white/50">
            {String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
