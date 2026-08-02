import { motion, useInView, useScroll, useTransform, animate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import aboutStudio from "@/assets/about-studio.jpg";
import { Reveal, RevealWords } from "@/components/Reveal";
import { stats } from "@/lib/site-data";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="display-md tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

const pillars = [
  {
    title: "Who We Are",
    copy: "A senior product studio from Kozhikode, building software for founders and enterprises across 14 countries.",
  },
  {
    title: "Our Mission",
    copy: "To make world-class engineering and design accessible to ambitious businesses, wherever they operate.",
  },
  {
    title: "Our Vision",
    copy: "A future where every company runs on software that feels considered, fast and genuinely human.",
  },
  {
    title: "Why ZUARAK",
    copy: "Small senior teams, weekly demos, obsessive craft and total ownership of what we ship.",
  },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section id="about" className="relative scroll-mt-24 px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="eyebrow">About ZUARAK</p>
        </Reveal>
        <h2 className="display-lg mt-8 max-w-5xl">
          <RevealWords text="We design and engineer software that carries a company's ambition." />
        </h2>

        <div ref={ref} className="mt-20 grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="relative overflow-hidden rounded-3xl border border-border">
            <motion.img
              src={aboutStudio}
              alt="ZUARAK engineers working in a dark studio at night"
              width={1200}
              height={1504}
              loading="lazy"
              style={{ y: imageY, scale }}
              className="h-[420px] w-full object-cover md:h-[620px]"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/70 to-transparent" />
          </div>

          <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} className="bg-background p-8 md:p-10">
                <h3 className="text-sm font-semibold tracking-[0.18em] uppercase">{p.title}</h3>
                <p className="body-lg mt-4 text-base">{p.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="bg-surface p-8 md:p-10">
              <Counter value={s.value} suffix={s.suffix} />
              <p className="mt-4 text-xs tracking-[0.2em] text-muted-foreground uppercase">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
