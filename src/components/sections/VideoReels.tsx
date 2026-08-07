import { Reveal, RevealWords } from "@/components/Reveal";
import { Play, ArrowUpRight } from "lucide-react";
import v1 from "@/assets/v1.png";
import v2 from "@/assets/v2.png";
import v3 from "@/assets/v3.png";
import v4 from "@/assets/v4.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const mediaItems = [
  {
    id: 1,
    title: "Brand Film",
    description: "Telling the Zuarak story through motion.",
    src: v1,
    icon: Play,
  },
  {
    id: 2,
    title: "Product Design",
    description: "Crafting intuitive experiences that engage.",
    src: v2,
    icon: ArrowUpRight,
  },
  {
    id: 3,
    title: "3D & Motion",
    description: "Bringing ideas to life with depth and movement.",
    src: v3,
    icon: Play,
  },
  {
    id: 4,
    title: "Campaign Film",
    description: "Visual narratives that inspire action.",
    src: v4,
    icon: Play,
  },
];

function MediaCard({ item }: { item: typeof mediaItems[0] }) {
  const Icon = item.icon;

  return (
    <div className="group relative w-full overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-colors h-[28rem] md:h-[34rem] xl:h-[40rem] cursor-pointer hover:border-white/20">
      
      {/* Background Image */}
      <img
        src={item.src}
        alt={item.title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />

      {/* Content Overlay */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col p-6 text-left md:p-8">
        {/* Icon */}
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-black/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/10">
          <Icon className="h-5 w-5 text-white" strokeWidth={1.5} />
        </div>
        
        <h3 className="text-xl font-normal text-white">
          {item.title}
        </h3>
        
        <p className="mt-1.5 text-sm font-light text-white/70 leading-snug">
          {item.description}
        </p>
      </div>
    </div>
  );
}

export function VideoReels() {
  return (
    <section id="reels" className="bg-[#09090b] px-6 pt-12 pb-28 text-white md:px-10 md:pt-16 md:pb-40">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <Reveal>
          <p className="text-[10px] font-semibold tracking-[0.3em] text-white/70 uppercase md:text-xs">
            Our Gallery
          </p>
        </Reveal>
        <h2 className="mt-8 max-w-4xl text-4xl font-normal leading-[0.9] tracking-tighter md:text-6xl lg:text-[5.5rem]">
          <RevealWords text="Visual Stories." />
        </h2>

        {/* Desktop Grid Container */}
        <div className="mt-16 hidden md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {mediaItems.map((item) => (
            <MediaCard 
              key={item.id} 
              item={item} 
            />
          ))}
        </div>

        {/* Mobile Swiper Container */}
        <div className="mt-12 block md:hidden w-full">
          <Swiper
            slidesPerView={1}
            spaceBetween={16}
            className="w-full"
          >
            {mediaItems.map((item) => (
              <SwiperSlide key={item.id}>
                <MediaCard item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
