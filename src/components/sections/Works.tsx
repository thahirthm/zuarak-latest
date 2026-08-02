import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { projects } from "@/lib/site-data";
import { ArrowUpRight } from "lucide-react";

export function Works({ limit }: { limit?: number } = {}) {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Background and Text color transitions (Dark -> Light Grey -> Dark)
  const backgroundColor = useTransform(
    scrollYProgress, 
    [0, 0.1, 0.9, 1], 
    ["#09090b", "#ffffff", "#ffffff", "#09090b"]
  );
  
  const ctaOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.85, 1], [40, 0]);
  
  const textColor = useTransform(
    scrollYProgress, 
    [0, 0.1, 0.9, 1], 
    ["#ffffff", "#000000", "#000000", "#ffffff"]
  );

  const displayProjects = limit ? projects.slice(0, limit) : projects;

  // Horizontal translation based on scroll
  // Start completely off-screen right (100vw), and scroll left based on number of items.
  const endX = `-${displayProjects.length * 45}vw`;
  const x = useTransform(scrollYProgress, [0, 1], ["100vw", endX]);

  return (
    <motion.section 
      ref={containerRef}
      id="works"
      style={{ backgroundColor }}
      className="relative h-[300vh] w-full"
    >
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        
        {/* Massive Background Typography */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.h2 
            style={{ color: textColor }}
            className="text-[12vw] font-normal leading-[0.8] tracking-tighter md:text-[10vw]"
          >
            SELECTED
          </motion.h2>
          <motion.p
            style={{ color: textColor }}
            className="mt-6 text-xs font-semibold tracking-[0.2em] uppercase opacity-80 md:mt-4 md:text-sm"
          >
            Showcasing our recent<br className="md:hidden" /> digital products.
          </motion.p>
          <motion.h2 
            style={{ color: textColor }}
            className="mt-4 text-[12vw] font-normal leading-[0.8] tracking-tighter md:mt-2 md:text-[10vw]"
          >
            WORKS
          </motion.h2>
        </div>

        {/* Horizontal Scroll Track */}
        <motion.div 
          style={{ x }}
          className="relative z-10 flex items-center gap-10 md:gap-16 lg:gap-24"
        >
          {displayProjects.map((p, i) => (
            <div 
              key={`${p.slug}-${i}`}
              className="flex w-[80vw] shrink-0 flex-col md:w-[45vw] lg:w-[30vw]"
            >
              <Link 
                to="/works/$slug" 
                params={{ slug: p.slug }}
                className="group block"
              >
                <motion.div 
                  style={{ color: textColor }}
                  className="relative flex w-full flex-col overflow-hidden rounded-[32px] border border-current/10 bg-current/5 p-4 backdrop-blur-xl transition-colors hover:bg-current/10 md:p-6"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px] border border-current/10">
                    <img 
                      src={p.image} 
                      alt={p.title} 
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Content Container */}
                  <div className="mt-6 flex flex-col gap-3">
                    <h3 className="text-2xl font-medium leading-tight tracking-tight md:text-3xl">
                      {p.title}
                    </h3>
                    <p className="line-clamp-2 max-w-xl text-sm opacity-70 md:text-base">
                      {p.summary}
                    </p>
                    
                    <div className="mt-3 flex items-center gap-2 text-[10px] font-semibold tracking-[0.2em] uppercase md:text-xs">
                      View Project
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </div>
          ))}
          {/* Spacer at the end to ensure the last card isn't cramped */}
          <div className="w-[10vw] shrink-0 md:w-[20vw]" />
        </motion.div>

        {/* Outro CTA */}
        <motion.div 
          style={{ opacity: ctaOpacity, y: ctaY, color: textColor }}
          className="absolute bottom-12 left-0 right-0 z-50 flex flex-col items-center justify-center gap-6 px-6 text-center md:bottom-24"
        >
          <p className="hidden max-w-2xl text-sm leading-relaxed md:block md:text-base">
            Every digital product we engineer is built on a foundation of rigorous design systems, modern technical stacks, and a commitment to measurable clarity.
          </p>
          <Link
            to="/works"
            className="group flex items-center gap-2 rounded-full border border-current px-6 py-3 text-xs font-semibold tracking-widest uppercase transition-all hover:bg-black hover:text-white"
          >
            View All Projects
            <ArrowUpRight className="size-4" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
