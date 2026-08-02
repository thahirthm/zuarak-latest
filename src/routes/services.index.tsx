import { createFileRoute } from "@tanstack/react-router";
import { RevealWords } from "@/components/Reveal";
import { ServicesShowcase } from "@/components/sections/ServicesShowcase";
import { Process } from "@/components/sections/Process";
import { FAQ } from "@/components/sections/FAQ";
import { services } from "@/lib/site-data";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import srvImg from "@/assets/abt2.png";

const title = "Services — Software, AI, Web, Mobile & Cloud | ZUARAK";
const description =
  "Thirteen engineering and design services: custom software, web and mobile apps, AI, cloud, ERP, CRM, automation and long-term support.";

export const Route = createFileRoute("/services/")({
  component: ServicesIndex,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/services" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: s.title,
            url: `/services/${s.slug}`,
          })),
        }),
      },
    ],
  }),
});

function ServicesIndex() {
  const imgRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(imgRef, { once: true, amount: 0.2 });

  return (
    <div className="bg-black text-white w-full">
      <section className="relative flex flex-col items-center justify-start overflow-hidden px-6 pt-28 pb-0 md:pt-48 md:pb-0 text-center min-h-[70vh] md:min-h-screen">
        <div className="grid-lines absolute inset-0 opacity-40" aria-hidden />

        <div className="relative z-10 mx-auto w-full max-w-[1400px] flex flex-col items-center">
          <p className="font-mono text-sm uppercase tracking-widest text-white/40 mb-6">Our Services</p>
          <h1 className="text-[3rem] leading-[1.1] md:text-5xl lg:text-[6rem] font-normal tracking-tight max-w-5xl text-balance text-white">
            <RevealWords text="Design, engineering and everything after launch." />
          </h1>
          <p className="text-base md:text-lg lg:text-xl font-light text-white/70 leading-relaxed mt-6 md:mt-10 max-w-2xl text-balance">
            {services.length} disciplines delivered by one senior team. Choose a service to see scope, deliverables and the stack we build it on.
          </p>

          <motion.div
            ref={imgRef}
            className="relative mt-12 md:mt-16 w-full flex justify-center"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={srvImg}
              alt="Services Overview"
              className="w-full max-w-5xl h-auto md:h-[500px] lg:h-[800px] object-contain opacity-90 rounded-t-[2rem] md:rounded-t-[3rem] mb-10"
            />
          </motion.div>
        </div>
      </section>

      <ServicesShowcase />
      <Process />
      <FAQ />
    </div>
  );
}
