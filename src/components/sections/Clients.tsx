import { Reveal, RevealWords } from "@/components/Reveal";
import { projects } from "@/lib/site-data";

export function Clients() {
  // We extract the unique client/project titles from site-data.
  const clients = projects.map((p) => p.title);
  
  // Duplicate the list enough times so that it naturally fills the screen
  // and creates a seamless infinite loop.
  const duplicatedClients = [...clients, ...clients, ...clients, ...clients];

  return (
    <section id="clients" className="overflow-hidden bg-[#09090b] px-6 pb-12 pt-0 text-white md:px-10 md:pb-16 md:pt-0">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="text-[10px] font-semibold tracking-[0.3em] text-white/70 uppercase md:text-xs">
            Our Clients
          </p>
        </Reveal>
        <h2 className="mt-8 max-w-4xl text-4xl font-normal leading-[0.9] tracking-tighter md:text-6xl lg:text-[5.5rem]">
          <RevealWords text="Trusted Globally." />
        </h2>
      </div>

      <div className="relative mt-16 w-full overflow-hidden border-y border-white/10 bg-white/5 py-10 md:py-16 backdrop-blur-sm">
        {/* Fading Edges for the marquee */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#09090b] to-transparent md:w-64" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#09090b] to-transparent md:w-64" />

        <div className="flex w-max animate-[marquee_40s_linear_infinite]">
          {/* We render two identical blocks to ensure a smooth -50% loop */}
          {[1, 2].map((blockIndex) => (
            <div key={blockIndex} className="flex shrink-0 items-center gap-16 px-8 md:gap-32 md:px-16">
              {duplicatedClients.map((client, index) => (
                <div 
                  key={`${blockIndex}-${index}`}
                  className="flex items-center gap-4 text-3xl font-light tracking-tight text-white/60 transition-colors hover:text-white md:text-5xl lg:text-6xl"
                >
                  <span className="shrink-0">•</span>
                  <span className="shrink-0 whitespace-nowrap">{client}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
