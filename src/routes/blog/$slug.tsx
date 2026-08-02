import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Reveal, RevealWords } from "@/components/Reveal";
import { MagneticLink } from "@/components/Magnetic";
import { posts } from "@/lib/site-data";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ params, loaderData }) => {
    const title = loaderData ? `${loaderData.title} — ZUARAK` : "Article — ZUARAK";
    const description = loaderData?.excerpt ?? "An article from the ZUARAK journal.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
      scripts: loaderData
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: loaderData.title,
                datePublished: loaderData.date,
                author: { "@type": "Organization", name: "ZUARAK" },
              }),
            },
          ]
        : [],
    };
  },
  component: PostPage,
  notFoundComponent: () => (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-black px-6 text-center text-white">
      <h1 className="text-4xl font-normal tracking-tight">Article not found</h1>
      <div className="mt-8">
        <MagneticLink to="/blog">Back to Journal</MagneticLink>
      </div>
    </div>
  ),
  errorComponent: () => (
    <div className="flex min-h-dvh items-center justify-center bg-black px-6 text-white">
      <h1 className="text-4xl font-normal tracking-tight">This article failed to load</h1>
    </div>
  ),
});

function PostPage() {
  const post = Route.useLoaderData();
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="bg-black text-white w-full">
      <article>
        {/* BANNER */}
        <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-16 md:pt-48 md:pb-32 text-center min-h-[50vh] md:min-h-[60vh]">
          <div className="grid-lines absolute inset-0 opacity-40" aria-hidden />
          <div className="relative z-10 mx-auto w-full max-w-4xl flex flex-col items-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-white/40 uppercase hover:text-white transition-colors mb-8 md:mb-12"
            >
              <ArrowLeft className="size-4" /> Journal
            </Link>
            <p className="font-mono text-xs tracking-widest text-white/40 uppercase mb-6 md:mb-8">
              {post.category} <span className="mx-2">·</span>{" "}
              {new Date(post.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              <span className="mx-2">·</span> {post.readingTime}
            </p>
            <h1 className="text-[2.5rem] leading-[1.1] md:text-5xl lg:text-[5rem] font-normal tracking-tight text-balance text-white">
              <RevealWords text={post.title} />
            </h1>
          </div>
        </section>

        {/* FEATURED IMAGE */}
        <section className="px-6 md:px-10 pb-20 md:pb-28">
          <Reveal className="mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
              <img
                src={post.image}
                alt={post.title}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[50vh] md:max-h-[70vh] object-cover opacity-90"
              />
            </div>
          </Reveal>
        </section>

        {/* CONTENT */}
        <section className="px-6 pb-24 md:px-10 md:pb-40">
          <div className="mx-auto max-w-3xl space-y-8 md:space-y-12">
            {post.body.map((para: string) => (
              <Reveal key={para.slice(0, 24)}>
                <p className="text-lg md:text-[22px] font-light leading-relaxed text-white/70">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </section>
      </article>

      {/* RELATED POSTS */}
      <section className="border-t border-white/10 bg-black px-6 py-16 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="font-mono text-sm uppercase tracking-widest text-white/40 mb-8 md:mb-12">
            Related posts
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {related.map((p) => (
              <Reveal key={p.slug}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group block relative rounded-[2.5rem] border border-white/10 bg-white/5 p-6 md:p-10 transition-colors hover:border-white/30 hover:bg-white/10"
                >
                  <div className="flex flex-col gap-4">
                    <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-white/40">
                      {p.category} <span className="mx-2">·</span> {p.readingTime}
                    </p>
                    <div className="flex items-start justify-between gap-4 mt-2 mb-4">
                      <h3 className="text-2xl md:text-3xl font-normal tracking-tight text-white leading-snug">
                        {p.title}
                      </h3>
                      <ArrowUpRight className="size-6 shrink-0 text-white/40 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
                    </div>
                    <p className="text-sm md:text-base font-light leading-relaxed text-white/70 line-clamp-2">
                      {p.excerpt}
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
