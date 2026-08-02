import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Reveal, RevealWords } from "@/components/Reveal";
import { MagneticLink } from "@/components/Magnetic";
import { services, process as steps } from "@/lib/site-data";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return service;
  },
  head: ({ params, loaderData }) => {
    const title = loaderData ? `${loaderData.title} — ZUARAK` : "Service — ZUARAK";
    const description = loaderData?.description ?? "A ZUARAK service.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `/services/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/services/${params.slug}` }],
    };
  },
  component: ServicePage,
  notFoundComponent: () => (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <h1 className="display-md">Service not found</h1>
      <div className="mt-8">
        <MagneticLink to="/services">All Services</MagneticLink>
      </div>
    </div>
  ),
  errorComponent: () => (
    <div className="flex min-h-dvh items-center justify-center px-6">
      <h1 className="display-md">This service failed to load</h1>
    </div>
  ),
});

function ServicePage() {
  const service = Route.useLoaderData();
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 4);

  return (
    <div className="bg-black text-white w-full">
      {/* BANNER */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 pt-40 pb-20 md:pt-56 md:pb-32 text-center min-h-[70vh]">
        <div className="grid-lines absolute inset-0 opacity-40" aria-hidden />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] flex flex-col items-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-white/40 uppercase hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="size-4" /> All services
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-[5rem] font-normal tracking-tight leading-none max-w-5xl text-balance text-white">
            <RevealWords text={service.title} />
          </h1>
          <p className="text-lg lg:text-xl font-light text-white/70 leading-relaxed mt-10 max-w-2xl text-balance">
            {service.description}
          </p>
          <div className="mt-12">
            <Link
               to="/contact"
               className="inline-flex items-center gap-4 text-xs lg:text-sm tracking-widest text-white hover:text-primary transition-colors uppercase border border-white/20 hover:border-primary px-8 py-4 rounded-full"
            >
              Discuss This Service <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* DETAILS */}
      <section className="border-t border-white/10 px-6 py-24 md:px-10 md:py-32 bg-black">
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <div className="space-y-8">
            <Reveal>
              <p className="font-mono text-sm uppercase tracking-widest text-white/40">Overview</p>
            </Reveal>
            {service.overview.map((para: string) => (
              <Reveal key={para.slice(0, 24)}>
                <p className="text-lg md:text-xl font-light leading-relaxed text-white/70">{para}</p>
              </Reveal>
            ))}
            <Reveal>
              <ul className="flex flex-wrap gap-3 pt-6">
                {service.stack.map((t: string) => (
                  <li
                    key={t}
                    className="rounded-full border border-white/20 px-4 py-2 font-mono text-[11px] tracking-widest text-white/60 uppercase"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-10 md:p-14 backdrop-blur-xl">
              <p className="font-mono text-sm uppercase tracking-widest text-white/40">What you get</p>
              <ul className="mt-10 flex flex-col border-b border-white/10">
                {service.deliverables.map((d: string) => (
                  <li key={d} className="flex gap-6 py-5 border-t border-white/10">
                    <Check className="mt-1 size-5 shrink-0 text-primary" strokeWidth={1.5} />
                    <span className="text-lg font-light text-white/90">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HOW WE DELIVER & RELATED */}
      <section className="border-t border-white/10 bg-black px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <p className="font-mono text-sm uppercase tracking-widest text-white/40">How we deliver</p>
          </Reveal>
          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.slice(0, 4).map((s, i) => (
              <Reveal key={s.step} delay={i * 0.07} className="bg-black p-10 md:p-12 transition-colors hover:bg-white/5">
                <span className="font-mono text-sm tracking-widest text-white/40">{s.step}</span>
                <h3 className="mt-8 text-2xl font-normal tracking-tight text-white">{s.title}</h3>
                <p className="mt-4 text-base font-light leading-relaxed text-white/70">{s.copy}</p>
              </Reveal>
            ))}
          </div>

          <h2 className="font-mono text-sm uppercase tracking-widest text-white/40 mt-32 mb-10">Related services</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s) => (
              <Reveal key={s.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="block h-full rounded-[2rem] border border-white/10 bg-white/5 p-10 transition-colors hover:border-white/30 hover:bg-white/10"
                >
                  <h3 className="text-2xl font-normal tracking-tight text-white">{s.title}</h3>
                  <p className="mt-4 text-base font-light leading-relaxed text-white/70">{s.description}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
