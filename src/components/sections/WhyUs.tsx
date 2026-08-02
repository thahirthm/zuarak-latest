import { useRef, useState, type MouseEvent } from "react";
import { Reveal, RevealWords } from "@/components/Reveal";
import { whyUs } from "@/lib/site-data";

function TiltCard({ title, copy, index }: { title: string; copy: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<{ transform?: string }>({});

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setStyle({ transform: `perspective(900px) rotateX(${-py * 7}deg) rotateY(${px * 7}deg) translateY(-6px)` });
  };

  return (
    <Reveal delay={(index % 4) * 0.06}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => setStyle({})}
        style={style}
        className="glass-card h-full p-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-border-strong hover:shadow-[var(--glow-soft)] md:p-10"
      >
        <span className="font-mono text-[11px] text-muted-foreground/60">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-10 text-xl font-extrabold tracking-tight md:text-2xl">{title}</h3>
        <p className="body-lg mt-3 text-base">{copy}</p>
      </div>
    </Reveal>
  );
}

export function WhyUs() {
  return (
    <section className="relative overflow-hidden px-6 py-28 md:px-10 md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[140px]"
        style={{ background: "radial-gradient(circle, oklch(1 0 0 / 7%), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-[1400px]">
        <Reveal>
          <p className="eyebrow">Why Choose Us</p>
        </Reveal>
        <h2 className="display-lg mt-8 max-w-4xl">
          <RevealWords text="Eight reasons teams stay with us for years." />
        </h2>

        <div className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((w, i) => (
            <TiltCard key={w.title} index={i} title={w.title} copy={w.copy} />
          ))}
        </div>
      </div>
    </section>
  );
}
