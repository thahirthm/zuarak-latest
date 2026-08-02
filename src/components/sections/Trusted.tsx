import { clients } from "@/lib/site-data";

export function Trusted() {
  const row = [...clients, ...clients];

  return (
    <section aria-label="Trusted by" className="border-y border-border bg-surface py-10">
      <div className="group relative overflow-hidden">
        <div className="marquee-track flex w-max items-center gap-16 group-hover:[animation-play-state:paused] md:gap-24">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="text-lg font-extrabold tracking-[0.18em] whitespace-nowrap text-muted-foreground/40 uppercase transition-colors duration-500 hover:text-foreground md:text-2xl"
            >
              {name}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-surface to-transparent md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-surface to-transparent md:w-40" />
      </div>
    </section>
  );
}
