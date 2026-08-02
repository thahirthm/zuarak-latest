import { Reveal, RevealWords } from "@/components/Reveal";
import { technologies } from "@/lib/site-data";

export function Technologies() {
  return (
    <section className="border-y border-border bg-surface px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Reveal>
              <p className="eyebrow">Technologies</p>
            </Reveal>
            <h2 className="display-lg mt-8 max-w-3xl">
              <RevealWords text="A stack chosen for longevity." />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <p className="body-lg max-w-sm">
              Proven, boring where it should be, modern where it matters.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-5">
          {technologies.map((tech, i) => (
            <Reveal key={tech} delay={(i % 5) * 0.05} blur={false}>
              <div className="group relative flex h-32 items-center justify-center bg-background px-4 transition-colors duration-500 hover:bg-surface-2 md:h-40">
                <span className="text-sm font-semibold tracking-[0.12em] text-muted-foreground uppercase transition-all duration-500 group-hover:scale-110 group-hover:text-foreground md:text-base">
                  {tech}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
