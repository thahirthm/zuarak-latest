import { createFileRoute } from "@tanstack/react-router";
import { RevealWords, Reveal } from "@/components/Reveal";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Testimonials } from "@/components/sections/Testimonials";
import { projects } from "@/lib/site-data";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import worksImg from "@/assets/w.png";

const title = "Works — ZUARAK Case Studies & Live Products";
const description =
  "Selected ZUARAK projects in production: industrial, hospitality and restaurant platforms engineered for speed, clarity and conversion.";

export const Route = createFileRoute("/works/")({
  component: WorksIndex,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/works" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/works" }],
  }),
});

function WorksIndex() {
  const imgRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(imgRef, { once: true, amount: 0.2 });

  return (
    <div className="bg-black text-white w-full">
      {/* BANNER */}
      <section className="relative flex flex-col items-center justify-start overflow-hidden px-6 pt-40 pb-0 md:pt-48 md:pb-0 text-center min-h-screen">
        <div className="grid-lines absolute inset-0 opacity-40" aria-hidden />

        <div className="relative z-10 mx-auto w-full max-w-[1400px] flex flex-col items-center">
          <p className="font-mono text-sm uppercase tracking-widest text-white/40 mb-6">Works</p>
          <h1 className="text-4xl md:text-5xl lg:text-[5rem] font-normal tracking-tight leading-none max-w-4xl text-balance text-white">
            <RevealWords text="Live products, real screenshots." />
          </h1>
          <p className="text-lg lg:text-xl font-light text-white/70 leading-relaxed mt-10 max-w-2xl text-balance">
            {projects.length} projects currently running in production, each captured directly from the live environments.
          </p>

          <motion.div
            ref={imgRef}
            className="relative mt-16 md:mt-24 w-full flex justify-center"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={worksImg}
              alt="Works Overview"
              className="max-w-full w-full h-auto max-h-[900px] object-contain"
            />
          </motion.div>
        </div>
      </section>

      {/* WORKS GRID */}
      <section className="px-6 py-24 md:px-10 md:py-32 bg-black border-t border-white/10">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {projects.map((p) => (
              <Reveal key={p.slug}>
                <Link
                  to="/works/$slug"
                  params={{ slug: p.slug }}
                  className="group block relative rounded-[2.5rem] border border-white/10 bg-white/5 p-6 md:p-10 transition-colors hover:border-white/30 hover:bg-white/10"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] border border-white/10 mb-8 bg-black/50">
                    <img 
                      src={p.image} 
                      alt={p.title} 
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-3xl font-normal tracking-tight text-white">{p.title}</h3>
                      <ArrowUpRight className="size-6 text-white/40 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
                    </div>
                    <p className="text-lg font-light leading-relaxed text-white/70 line-clamp-2 max-w-xl">
                      {p.summary}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </div>
  );
}
