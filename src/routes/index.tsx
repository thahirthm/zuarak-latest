import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { AboutParallax } from "@/components/sections/AboutParallax";
import { Services } from "@/components/sections/Services";
import { Works } from "@/components/sections/Works";
import { Clients } from "@/components/sections/Clients";
import { VideoReels } from "@/components/sections/VideoReels";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { CTA } from "@/components/sections/CTA";
import { faqs } from "@/lib/site-data";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import aiIcon from "@/assets/ai.png";

const title = "ZUARAK — Premium Software, AI & Digital Product Studio";
const description =
  "ZUARAK builds premium software, AI products, web and mobile applications for ambitious companies worldwide. Based in Kozhikode, India.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
});

function Index() {


  return (
    <>
      <Hero />
      <AboutParallax />
      <Services limit={6} />
      <Works />
      <Testimonials />
      <Clients />
      <VideoReels />
      <FAQ />
      <BlogPreview />
      <CTA />
    </>
  );
}
