import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Reveal, RevealWords } from "@/components/Reveal";
import { MagneticLink } from "@/components/Magnetic";
import { projects } from "@/lib/site-data";
import { useState } from "react";

export const Route = createFileRoute("/works/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ params, loaderData }) => {
    const title = loaderData ? `${loaderData.title} — ZUARAK Case Study` : "Project — ZUARAK";
    const description = loaderData?.summary ?? "A ZUARAK project case study.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/works/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/works/${params.slug}` }],
    };
  },
  component: ProjectPage,
  notFoundComponent: () => (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <h1 className="display-md">Project not found</h1>
      <div className="mt-8">
        <MagneticLink to="/">Back to Home</MagneticLink>
      </div>
    </div>
  ),
  errorComponent: () => (
    <div className="flex min-h-dvh items-center justify-center px-6">
      <h1 className="display-md">This project failed to load</h1>
    </div>
  ),
});

function ProjectPage() {
  const project = Route.useLoaderData();
  const others = projects.filter((p) => p.slug !== project.slug);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="bg-black text-white w-full">
      {/* BANNER */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-16 md:pt-48 md:pb-32 text-center min-h-[60vh] md:min-h-[70vh]">
        <div className="grid-lines absolute inset-0 opacity-40" aria-hidden />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] flex flex-col items-center">
          <Link
            to="/works"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-white/40 uppercase hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="size-4" /> All works
          </Link>
          <p className="font-mono text-xs tracking-widest text-white/40 uppercase mb-8">
            {project.category} <span className="mx-2">·</span> {project.year}
          </p>
          <h1 className="text-[2.5rem] leading-[1.1] md:text-5xl lg:text-[5rem] font-normal tracking-tight max-w-5xl text-balance text-white">
            <RevealWords text={project.title} />
          </h1>
          <p className="text-base md:text-lg lg:text-xl font-light text-white/70 leading-relaxed mt-6 md:mt-10 max-w-2xl text-balance">
            {project.summary}
          </p>
          <div className="mt-8 md:mt-12">
            <Link
               to={project.url}
               target="_blank"
               rel="noreferrer noopener"
               className="inline-flex items-center gap-3 md:gap-4 text-[10px] md:text-xs lg:text-sm tracking-widest text-white hover:text-primary transition-colors uppercase border border-white/20 hover:border-primary px-6 py-3 md:px-8 md:py-4 rounded-full"
            >
              Visit Live Site <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SPLIT LAYOUT SHOWCASE */}
      <section className="bg-black border-t border-white/10 flex flex-col lg:flex-row w-full">
        
        {/* LEFT SIDE: Sticky Details */}
        <div className="w-full lg:w-[35%] lg:sticky lg:top-0 h-auto lg:h-screen p-6 md:p-10 lg:p-16 flex flex-col border-b lg:border-b-0 lg:border-r border-white/10 overflow-y-auto hide-scrollbar">
          
          <div className="space-y-12 md:space-y-16">
            {/* Services & Tech */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-6">Services</h3>
                <ul className="space-y-3">
                  {project.services.map((s: string) => (
                    <li key={s} className="text-sm font-light text-white/80 leading-snug">
                      - {s}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-white/40 mb-6">Tech Stack</h3>
                <ul className="space-y-3">
                  {project.tech.map((t: string) => (
                    <li key={t} className="text-sm font-light text-white/80 leading-snug">
                      - {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Overview / Challenge Tabs-like styling */}
            <div>
              <div className="flex flex-wrap items-center gap-4 md:gap-8 border-b border-white/10 pb-4 mb-6 md:mb-8">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`text-xs tracking-widest uppercase font-semibold transition-colors ${activeTab === "overview" ? "text-white" : "text-white/30 hover:text-white/70"}`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("approach")}
                  className={`text-xs tracking-widest uppercase font-semibold transition-colors ${activeTab === "approach" ? "text-white" : "text-white/30 hover:text-white/70"}`}
                >
                  Approach
                </button>
                <button
                  onClick={() => setActiveTab("outcome")}
                  className={`text-xs tracking-widest uppercase font-semibold transition-colors ${activeTab === "outcome" ? "text-white" : "text-white/30 hover:text-white/70"}`}
                >
                  Outcome
                </button>
              </div>
              
              <div className="space-y-6">
                {activeTab === "overview" && project.description.map((para: string, idx: number) => (
                  <p key={idx} className="text-[15px] font-light leading-relaxed text-white/70">
                    {para}
                  </p>
                ))}
                
                {activeTab === "approach" && (
                  <p className="text-[15px] font-light leading-relaxed text-white/70">
                    We adopted an iterative, design-led engineering approach. By prioritizing rapid prototyping and continuous user feedback loops, we ensured that the final platform was perfectly aligned with both business objectives and user expectations.
                  </p>
                )}
                
                {activeTab === "outcome" && (
                  <p className="text-[15px] font-light leading-relaxed text-white/70">
                    The resulting platform delivered a highly scalable and robust solution. Post-launch, the client experienced a significant increase in user engagement, a measurable boost in operational efficiency, and a drastic reduction in technical debt.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Links at bottom */}
          <div className="pt-16 mt-auto">
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-center justify-between border-b border-white/20 pb-4 text-xs uppercase tracking-widest text-white/70 hover:text-white transition-colors"
            >
              <span>Visit Live Site</span>
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>

        {/* RIGHT SIDE: Full Height Image */}
        <div className="w-full lg:w-[65%] min-h-[40vh] sm:min-h-[50vh] lg:min-h-screen bg-[#111] flex flex-col relative">
          <img
            src={project.image}
            alt={`${project.title} showcase`}
            className="w-full h-full object-cover lg:absolute lg:inset-0"
          />
        </div>
      </section>

      {/* NEXT PROJECTS */}
      <section className="border-t border-white/10 bg-black px-6 py-16 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="font-mono text-sm uppercase tracking-widest text-white/40 mb-8 md:mb-12">Next projects</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {others.map((p) => (
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
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90"
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
    </div>
  );
}
