import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import img1 from "@/assets/work-taj.jpg";
import img2 from "@/assets/blog-design.jpg";

export function AboutCulture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax for the marquees
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);

  const stats = [
    { value: "3+", label: "Years Experience" },
    { value: "100%", label: "In-house Craft" },
    { value: "100%", label: "Client Satisfaction" },
    { value: "10+", label: "Projects Delivered" },
  ];

  return (
    <section ref={containerRef} className="relative bg-black text-white pt-8 md:pt-12 pb-24 md:pb-32 overflow-hidden">
      
      {/* Infinite Scrolling Marquees */}
      <div className="flex flex-col gap-2 md:gap-6 opacity-20 pointer-events-none select-none overflow-hidden whitespace-nowrap mt-4">
        <motion.div style={{ x: x1 }} className="flex gap-12 text-[12vw] md:text-[9vw] font-bold uppercase leading-none tracking-tighter">
          <span>Obsessive Craft</span> <span>•</span> <span>Relentless Execution</span> <span>•</span> <span>Absolute Ownership</span> <span>•</span>
          <span>Obsessive Craft</span> <span>•</span> <span>Relentless Execution</span> <span>•</span> <span>Absolute Ownership</span>
        </motion.div>
        <motion.div 
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.8)", x: x2 }} 
          className="flex gap-12 text-[12vw] md:text-[9vw] font-bold uppercase leading-none tracking-tighter text-transparent"
        >
          <span>Artificial Intelligence</span> <span>•</span> <span>System Design</span> <span>•</span> <span>Product Engineering</span> <span>•</span>
          <span>Artificial Intelligence</span> <span>•</span> <span>System Design</span> <span>•</span> <span>Product Engineering</span>
        </motion.div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 md:px-10 mt-12 md:mt-20 relative z-10">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-y-20 border-y border-white/10 py-16 md:py-24">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="flex flex-col items-center text-center group"
            >
              <h4 className="text-4xl md:text-7xl lg:text-[7rem] font-light tracking-tighter mb-4 group-hover:scale-105 transition-transform duration-500">
                {stat.value}
              </h4>
              <p className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] text-white/50">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
