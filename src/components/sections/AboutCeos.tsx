import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import ceosImg from "@/assets/ceos.png";

export function AboutCeos() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"]
  });
  
  // Parallax for the founder message
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.3]);

  return (
    <section className="relative w-full bg-black text-white flex flex-col pt-10 md:pt-20">
      
      {/* Top Image Section */}
      <div className="relative w-full max-w-[1600px] mx-auto flex items-center justify-center overflow-hidden">
        {/* The full uncropped image */}
        <img 
          src={ceosImg} 
          alt="ZUARAK Leadership" 
          className="w-full h-auto max-h-[85vh] object-cover" 
        />
        
        {/* Centered Text OVER the image */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-6">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-7xl lg:text-[6.5rem] font-normal text-white tracking-tight text-center leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
          >
            Beyond Faces.<br />
            <span className="italic font-light">Beyond Titles.</span>
          </motion.h2>
        </div>
      </div>

      {/* Full width scrolling CEO message */}
      <div ref={containerRef} className="relative w-full min-h-[50vh] flex items-center justify-center px-6 md:px-10 overflow-hidden bg-black pt-16 pb-8 md:pt-24 md:pb-12">
        <motion.div 
          style={{ y, opacity }}
          className="max-w-6xl mx-auto text-center"
        >
          <p className="text-white/40 font-mono text-sm uppercase tracking-widest mb-10 md:mb-16">
            Founder's Message
          </p>
          <div className="flex flex-col gap-8 md:gap-10 max-w-5xl mx-auto">
            <p className="text-xl md:text-3xl lg:text-4xl font-light leading-normal text-balance text-white/90 italic">
              "We share one passion to build meaningful technology that creates lasting impact.
            </p>
            <p className="text-xl md:text-3xl lg:text-4xl font-light leading-normal text-balance text-white/90 italic">
              Every line of code, every design decision, and every solution we deliver is driven by dedication, creativity, and purpose. We believe trust is earned through consistency, transparency, and results.
            </p>
            <p className="text-xl md:text-3xl lg:text-4xl font-light leading-normal text-balance text-white/90 italic">
              As the founders of ZUARAK, we don't simply build digital products, we build relationships, embrace challenges, and turn ambitious ideas into reality. Together, we're committed to creating a future where innovation empowers every business we work with."
            </p>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
