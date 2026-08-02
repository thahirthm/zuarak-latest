import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { Reveal, RevealWords } from "@/components/Reveal";
import { posts } from "@/lib/site-data";

const title = "Insights — ZUARAK Engineering & Design Journal";
const description =
  "Notes on AI in production, cloud architecture and design systems from the ZUARAK software team.";

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/blog" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
});

function BlogIndex() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = useMemo(() => ["All", ...new Set(posts.map((p) => p.category))], []);
  const [featured, ...rest] = posts;

  const filtered = useMemo(
    () =>
      posts.filter(
        (p) =>
          (category === "All" || p.category === category) &&
          (p.title + p.excerpt).toLowerCase().includes(query.toLowerCase()),
      ),
    [query, category],
  );

  const isFiltering = query !== "" || category !== "All";
  const list = isFiltering ? filtered : rest;

  return (
    <div className="bg-black text-white w-full">
      {/* BANNER */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-16 md:pt-48 md:pb-32 text-center min-h-[50vh] md:min-h-[60vh]">
        <div className="grid-lines absolute inset-0 opacity-40" aria-hidden />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] flex flex-col items-center">
          <p className="font-mono text-sm uppercase tracking-widest text-white/40 mb-6">Journal</p>
          <h1 className="text-[3rem] leading-[1.1] md:text-5xl lg:text-[6rem] font-normal tracking-tight max-w-5xl text-balance text-white">
            <RevealWords text="Latest Insights" />
          </h1>
          <p className="text-base md:text-lg lg:text-xl font-light text-white/70 leading-relaxed mt-6 md:mt-10 max-w-2xl text-balance">
            Notes on AI in production, cloud architecture, and design systems. Documenting our engineering craft, one deployment at a time.
          </p>
        </div>
      </section>

      {/* BLOG CONTENT */}
      <section className="px-6 pb-24 md:px-10 md:pb-40 bg-black border-t border-white/10 pt-16 md:pt-24">
        <div className="mx-auto max-w-[1400px]">
          
          {/* FILTER AND SEARCH */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between mb-16">
            <ul className="flex flex-wrap gap-3">
              {categories.map((c) => (
                <li key={c}>
                  <button
                    type="button"
                    onClick={() => setCategory(c)}
                    aria-pressed={category === c}
                    className={`rounded-full border px-5 py-2.5 font-mono text-[11px] tracking-widest uppercase transition-colors ${
                      category === c
                        ? "border-white bg-white text-black"
                        : "border-white/20 text-white/60 hover:text-white hover:border-white/40 bg-white/5"
                    }`}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
            <div className="relative w-full lg:w-80">
              <label htmlFor="blog-search" className="sr-only">
                Search articles
              </label>
              <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-white/40" />
              <input
                id="blog-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles"
                className="w-full rounded-full border border-white/20 bg-white/5 py-3 pr-4 pl-11 text-sm text-white placeholder:text-white/40 focus:border-white/50 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* FEATURED POST */}
          {!isFiltering && (
            <Reveal className="mb-16 md:mb-24">
              <Link
                to="/blog/$slug"
                params={{ slug: featured.slug }}
                className="group grid overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 lg:grid-cols-2 transition-colors hover:border-white/30 hover:bg-white/10"
              >
                <div className="aspect-[16/10] lg:aspect-auto overflow-hidden bg-black/50 border-b lg:border-b-0 lg:border-r border-white/10">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    width={1200}
                    height={800}
                    className="size-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 md:p-14 lg:p-20">
                  <p className="font-mono text-xs uppercase tracking-widest text-white/40 mb-6">
                    Featured <span className="mx-2">·</span> {featured.category} <span className="mx-2">·</span> {featured.readingTime}
                  </p>
                  <h2 className="text-3xl md:text-5xl font-normal tracking-tight leading-tight text-white mb-6">
                    {featured.title}
                  </h2>
                  <p className="text-lg font-light leading-relaxed text-white/70 line-clamp-3">
                    {featured.excerpt}
                  </p>
                  <div className="mt-10 inline-flex items-center gap-3 font-mono text-xs font-semibold tracking-[0.2em] uppercase text-white/80 group-hover:text-white">
                    Read article
                    <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          {/* POSTS GRID */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 transition-colors hover:border-white/30 hover:bg-white/10"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-black/50 border-b border-white/10">
                    <img
                      src={p.image}
                      alt={p.title}
                      width={1200}
                      height={800}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-8 md:p-10">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-4">
                      {p.category} <span className="mx-2">·</span> {p.readingTime}
                    </p>
                    <h2 className="text-2xl font-normal tracking-tight leading-snug text-white mb-4">
                      {p.title}
                    </h2>
                    <p className="text-[15px] font-light leading-relaxed text-white/70 line-clamp-3 mt-auto">
                      {p.excerpt}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {list.length === 0 && (
            <p className="text-lg font-light text-white/50 mt-16 text-center">No articles match that search yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
