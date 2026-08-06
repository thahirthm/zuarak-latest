import { Reveal, RevealWords } from "@/components/Reveal";
import { Play, Pause } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import vid1 from "@/assets/IMG_8983.mov";
import vid2 from "@/assets/vid2.mp4";
import poster1 from "@/assets/poster1.jpg";
import poster2 from "@/assets/poster2.jpg";

// Mixed media data: first two are videos, last two are images
const mediaItems = [
  {
    id: 1,
    title: "Project launch day highlights.",
    category: "Behind the scenes",
    type: "video",
    src: vid1,
  },
  {
    id: 2,
    title: "Engineering team whiteboard session.",
    category: "Life at Zuarak",
    type: "video",
    src: vid2,
  },
  {
    id: 3,
    title: "Designing the new design system.",
    category: "Process",
    type: "image",
    src: poster1,
  },
  {
    id: 4,
    title: "Office views & late night shipping.",
    category: "Culture",
    type: "image",
    src: poster2,
  },
];

function MediaCard({ 
  item, 
  isPlaying, 
  onPlay, 
  onPause 
}: { 
  item: typeof mediaItems[0], 
  isPlaying: boolean,
  onPlay: () => void,
  onPause: () => void 
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Sync the HTML video element state with the React prop state (only for videos)
  useEffect(() => {
    if (item.type !== "video") return;
    if (isPlaying) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [isPlaying, item.type]);

  const togglePlay = () => {
    if (item.type !== "video") return;
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  };

  return (
    <div className="group flex w-full flex-col gap-4">
      {/* Media Container */}
      <div 
        className={`relative h-[24rem] w-full overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-colors md:h-[28rem] xl:h-[32rem] ${
          item.type === "video" ? "cursor-pointer hover:border-white/20" : ""
        }`}
        onClick={togglePlay}
      >
        {item.type === "video" ? (
          <>
            <video
              ref={videoRef}
              src={item.src}
              playsInline
              loop
              className="h-full w-full object-cover"
            />
            {/* Play/Pause Button Overlay for Videos */}
            <div 
              className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300 ${
                isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
              }`}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-md transition-transform hover:scale-110">
                {isPlaying ? (
                  <Pause className="h-6 w-6 fill-white text-white" />
                ) : (
                  <Play className="h-6 w-6 fill-white text-white" />
                )}
              </div>
            </div>
          </>
        ) : (
          <img
            src={item.src}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>

      {/* Minimalist Text Below */}
      <div className="px-1">
        <p className="text-[10px] font-semibold tracking-widest text-white/50 uppercase">
          {item.category}
        </p>
        <p className="mt-1.5 text-base font-light leading-snug text-white/90 md:text-lg">
          {item.title}
        </p>
      </div>
    </div>
  );
}

export function VideoReels() {
  const [activeVideoId, setActiveVideoId] = useState<number | null>(null);

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

        {/* 4-Column Grid Container */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {mediaItems.map((item) => (
            <MediaCard 
              key={item.id} 
              item={item} 
              isPlaying={activeVideoId === item.id}
              onPlay={() => setActiveVideoId(item.id)}
              onPause={() => setActiveVideoId(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
