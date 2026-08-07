import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealWords } from "@/components/Reveal";
import { posts } from "@/lib/site-data";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function BlogCard({ post }: { post: typeof posts[0] }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[32px] border border-white/5 bg-[#111] transition-transform duration-500 hover:-translate-y-2 hover:border-white/20"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-full bg-black/60 px-4 py-1.5 text-[10px] font-semibold tracking-widest text-white uppercase backdrop-blur-md">
          {post.category}
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
        <div>
          <div className="mb-4 flex items-center gap-4 text-xs font-medium tracking-wide text-white/50">
            <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>{post.readingTime}</span>
          </div>
          <h3 className="text-2xl font-medium leading-tight tracking-tight text-white md:text-3xl">
            {post.title}
          </h3>
          <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-white/60">
            {post.excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
}

export function BlogPreview() {
  return (
    <section id="blog" className="bg-[#09090b] px-6 py-28 text-white md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="text-[10px] font-semibold tracking-[0.3em] text-white/70 uppercase md:text-xs">
                OUR BLOG
              </p>
            </Reveal>
            <h2 className="mt-8 max-w-4xl text-4xl font-normal leading-[0.9] tracking-tighter md:text-6xl lg:text-[5.5rem]">
              <RevealWords text="Latest Insights." />
            </h2>
          </div>
          <Reveal>
            <Link
              to="/blog"
              className="group flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-xs font-semibold tracking-widest uppercase transition-all hover:bg-white hover:text-black"
            >
              View All Articles
              <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>

        {/* Desktop Grid */}
        <div className="mt-16 hidden md:grid md:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.1}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>

        {/* Mobile Swiper Container */}
        <div className="mt-12 block md:hidden w-full">
          <Swiper
            slidesPerView={1}
            spaceBetween={16}
            className="w-full"
          >
            {posts.slice(0, 3).map((post) => (
              <SwiperSlide key={post.slug}>
                <BlogCard post={post} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
