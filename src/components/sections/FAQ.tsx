import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal, RevealWords } from "@/components/Reveal";
import { faqs } from "@/lib/site-data";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Reveal>
            <p className="eyebrow">FAQ</p>
          </Reveal>
          <h2 className="mt-8 text-4xl font-normal leading-[0.9] tracking-tighter md:text-6xl lg:text-[5.5rem]">
            <RevealWords text="Questions, Answered." />
          </h2>
        </div>

        <div className="border-t border-border">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.04} blur={false}>
                <div className="border-b border-border">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 py-7 text-left"
                    >
                      <span className="text-lg font-normal tracking-tight md:text-2xl">{f.q}</span>
                      <Plus
                        className={`size-5 shrink-0 transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}
                      />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="body-lg max-w-2xl pb-8">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
