import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from "motion/react";
import { useEffect, useRef } from "react";
import {
  ArrowUpRight,
  Bot,
  Boxes,
  Cloud,
  Code2,
  Cog,
  Globe,
  LayoutGrid,
  LifeBuoy,
  Plug,
  Repeat,
  Smartphone,
  Sparkles,
  Users,
} from "lucide-react";
import { Reveal, RevealWords } from "@/components/Reveal";
import { services } from "@/lib/site-data";
import { MagneticLink } from "@/components/Magnetic";

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

function ServiceCard({
  index,
  slug,
  title,
  description,
}: {
  index: number;
  slug: string;
  title: string;
  description: string;
}) {
  const Icon = icons[index % icons.length];
  const isEven = index % 2 === 0;
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [200, 0]);
  const rotate = useTransform(scrollYProgress, [0, 1], [isEven ? -8 : 8, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [30, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isHovering = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div className="relative flex h-full w-full" style={{ perspective: 1200 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => isHovering.set(1)}
        onMouseLeave={() => isHovering.set(0)}
        style={{ scale, opacity, y, rotate, rotateX, transformOrigin: "bottom center" }}
        className="group relative flex h-full w-full flex-col overflow-hidden rounded-[2.5rem] p-[1px] shadow-2xl"
      >
        <div className="relative z-10 flex h-full w-full flex-col gap-5 overflow-hidden rounded-[calc(2.5rem-1px)] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl md:gap-6 md:p-10">
          {/* Inner Mouse Spotlight (Optimized) */}
          <motion.div
            className="pointer-events-none absolute -inset-px z-0 transition-opacity duration-300"
            style={{
              opacity: isHovering,
              background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.1), transparent 40%)`,
            }}
          />
          
          <div className="relative z-10 flex items-center justify-between">
            <Icon className="size-10 text-foreground/80 md:size-14" strokeWidth={1.5} />
            <span className="font-mono text-base text-muted-foreground/60 md:text-lg">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <h3 className="relative z-10 mt-4 text-3xl font-normal tracking-tight text-foreground md:mt-6 md:text-4xl lg:text-5xl">
            {title}
          </h3>
          <p className="relative z-10 max-w-xl text-base opacity-80 md:text-lg">{description}</p>

          <div className="relative z-10 mt-6 md:mt-8">
            <Link
              to="/services/$slug"
              params={{ slug }}
              className="group inline-flex items-center gap-3 text-sm tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              Explore Service
              <span className="grid size-10 place-items-center rounded-full border border-border transition-colors group-hover:bg-foreground group-hover:text-background">
                <ArrowUpRight className="size-4" />
              </span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Services({ limit }: { limit?: number } = {}) {
  const list = limit ? services.slice(0, limit) : services;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.min(70, (canvas.width * canvas.height) / 15000); // Optimized count
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          radius: Math.random() * 2 + 1, // larger dots
        });
      }
    };

    window.addEventListener("resize", resize);
    resize();

    // Track mouse within the canvas
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => {
      mouse = { x: -1000, y: -1000 };
    };
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.15)"; // Very subtle dots
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          if (Math.abs(dx) > 180) continue; // Fast fail
          
          const dy = p.y - p2.y;
          if (Math.abs(dy) > 180) continue; // Fast fail
          
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 - dist / 1500})`; // Very subtle web
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Connect to mouse
        const dxMouse = p.x - mouse.x;
        const dyMouse = p.y - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 250) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.18 - distMouse / 1380})`; // Very subtle mouse web
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="services" className="relative border-t border-border bg-surface px-6 py-28 md:px-10 md:py-40">

      {/* Sticky Spider Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="sticky top-0 h-screen w-full pointer-events-auto opacity-70">
          <canvas ref={canvasRef} className="absolute inset-0 size-full" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px]">
        {/* Heading layout */}
        <div className="mb-24 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow">Our Capabilities</p>
            </Reveal>
            <h2 className="mt-6 max-w-2xl text-3xl font-normal tracking-tight md:text-5xl lg:text-6xl">
              <RevealWords text="Everything required to design, build and scale." />
            </h2>
          </div>
          <Reveal delay={0.15}>
            <p className="body-lg max-w-sm md:text-right">
              Thirteen disciplines, one senior team. No hand-offs, no agencies stacked behind agencies.
            </p>
          </Reveal>
        </div>

        {/* Services Grid */}
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          {list.map((s, i) => (
            <ServiceCard
              key={s.slug}
              index={i}
              slug={s.slug}
              title={s.title}
              description={s.description}
            />
          ))}
        </div>

        {limit && (
          <Reveal className="mt-32 text-center">
            <MagneticLink to="/services" variant="ghost">
              All {services.length} Services
            </MagneticLink>
          </Reveal>
        )}
      </div>
    </section>
  );
}
