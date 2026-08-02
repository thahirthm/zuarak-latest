import { Link } from "@tanstack/react-router";
import { services } from "@/lib/site-data";
import { motion, AnimatePresence, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import {
  Code2,
  Globe,
  LayoutGrid,
  Smartphone,
  Sparkles,
  Bot,
  Cloud,
  Cog,
  Boxes,
  Users,
  Plug,
  Repeat,
  LifeBuoy,
} from "lucide-react";

const icons = [
  Code2,
  Globe,
  LayoutGrid,
  Smartphone,
  Sparkles,
  Bot,
  Cloud,
  Cog,
  Boxes,
  Users,
  Plug,
  Repeat,
  LifeBuoy,
];

function RightSideItem({ service, index, onInView }: { service: any, index: number, onInView: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  // Trigger when item is near the vertical center
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (isInView) {
      onInView(index);
    }
  }, [isInView, index, onInView]);

  return (
    <div ref={ref} className="min-h-[50vh] lg:h-screen lg:min-h-0 w-full flex flex-col justify-center px-6 py-12 md:p-16 lg:p-24 bg-black lg:border-l border-white/10 relative z-10">
      <div className="max-w-2xl mx-auto w-full">
        <h3 className="hidden lg:block text-2xl lg:text-4xl font-normal mb-4 lg:mb-6 leading-tight">
          {service.title}
        </h3>
        <p className="text-base lg:text-xl font-light text-white/70 leading-relaxed mb-10 lg:mb-12 max-w-lg">
          {service.description}
        </p>

        <p className="font-mono text-xs lg:text-sm uppercase tracking-widest text-white/40 mb-4 lg:mb-6">
          Our Core Capabilities
        </p>
        <ul className="flex flex-col border-b border-white/10">
          {service.deliverables.map((item: string, i: number) => (
            <li key={i} className="py-4 lg:py-5 border-t border-white/10 text-base lg:text-lg font-light text-white/90">
              {item}
            </li>
          ))}
        </ul>
        
        <div className="mt-8 lg:mt-12 pb-10 lg:pb-0">
          <Link
            to="/services/$slug"
            params={{ slug: service.slug }}
            className="inline-flex items-center gap-4 text-xs lg:text-sm tracking-widest text-white hover:text-primary transition-colors uppercase border border-white/20 hover:border-primary px-6 py-3 lg:px-8 lg:py-4 rounded-full"
          >
            Explore full service
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ServicesShowcase() {
  const total = services.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex];
  const ActiveIcon = icons[activeIndex % icons.length];

  return (
    <div className="bg-black w-full flex flex-col lg:flex-row relative">
      
      {/* DESKTOP LEFT COLUMN: Pinned / Sticky */}
      <div className="hidden lg:flex w-1/2 sticky top-0 h-screen flex-col items-center justify-center overflow-hidden bg-black z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center p-20"
          >
            <div className="absolute top-8 left-8 text-white/40 font-mono text-sm tracking-widest uppercase">
              {String(activeIndex + 1).padStart(2, '0')} / {total}
            </div>
            
            <div className="relative flex flex-col items-center justify-center text-center w-full">
              <ActiveIcon className="w-32 h-32 text-white/90 opacity-80 mb-12" strokeWidth={1} />
              <h2 className="text-[4rem] font-light tracking-tight text-center max-w-lg text-balance leading-none">
                {activeService.title}
              </h2>
            </div>
            
            <div className="absolute bottom-8 left-8 text-white/40 font-mono text-xs tracking-widest uppercase">
              ZUARAK / Core Service
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* DESKTOP RIGHT COLUMN: Scrolling */}
      <div className="hidden lg:flex w-1/2 flex-col relative z-10">
        {services.map((service, index) => (
          <RightSideItem 
            key={service.slug} 
            service={service} 
            index={index} 
            onInView={setActiveIndex} 
          />
        ))}
      </div>

      {/* MOBILE LAYOUT: Normal Stack */}
      <div className="lg:hidden flex flex-col w-full">
        {services.map((service, index) => {
          const Icon = icons[index % icons.length];
          return (
            <div key={service.slug} className="w-full flex flex-col border-t border-white/10 first:border-t-0">
              <div className="w-full flex flex-col items-center justify-center px-6 pt-12 pb-6 relative bg-black">
                 <div className="text-white/40 font-mono text-[10px] md:text-xs tracking-widest uppercase mb-4 md:mb-6">
                    {String(index + 1).padStart(2, '0')} / {total}
                 </div>
                 <Icon className="w-12 h-12 md:w-16 md:h-16 text-white/90 opacity-80 mb-4 md:mb-6" strokeWidth={1} />
                 <h2 className="text-[2.5rem] md:text-5xl font-light tracking-tight text-center max-w-md text-balance leading-none">
                   {service.title}
                 </h2>
              </div>
              <RightSideItem 
                service={service} 
                index={index} 
                onInView={() => {}} 
              />
            </div>
          );
        })}
      </div>

    </div>
  );
}
