import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { MagneticLink } from "@/components/Magnetic";
import { useSoundStore } from "@/lib/useSoundStore";

const LINES = ["Building", "World Class", "Digital", "Products"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const { isSoundEnabled, toggleSound } = useSoundStore();

  // Auto-pause audio when banner is out of view
  useEffect(() => {
    if (audioCtxRef.current) {
      if (isInView && isSoundEnabled) {
        audioCtxRef.current.resume();
      } else {
        audioCtxRef.current.suspend();
      }
    }
  }, [isInView, isSoundEnabled]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const numStars = 2000;
    let stars: { x: number; y: number; z: number; pz: number }[] = [];
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    let animationFrameId: number;

    // AUDIO CONTEXT SETUP
    let audioCtx: AudioContext | null = null;
    let noiseNode: AudioBufferSourceNode | null = null;
    let biquadFilter: BiquadFilterNode | null = null;
    let gainNode: GainNode | null = null;

    if (isSoundEnabled) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioCtxRef.current = audioCtx;

      // Create brown noise buffer for a much smoother, softer ambient sound
      const bufferSize = audioCtx.sampleRate * 2;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        const brown = (lastOut + (0.02 * white)) / 1.02;
        lastOut = brown;
        data[i] = brown * 3.5; // brown noise compensation
      }

      noiseNode = audioCtx.createBufferSource();
      noiseNode.buffer = buffer;
      noiseNode.loop = true;

      // Filter to make it sound incredibly smooth and distant
      biquadFilter = audioCtx.createBiquadFilter();
      biquadFilter.type = "lowpass";
      biquadFilter.frequency.value = 150; // much lower base frequency
      biquadFilter.Q.value = 0.5; // softer resonance

      // Gain (volume) - Start extremely quiet
      gainNode = audioCtx.createGain();
      gainNode.gain.value = 0.005;

      noiseNode.connect(biquadFilter);
      biquadFilter.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      noiseNode.start();
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cx = canvas.width / 2;
      cy = canvas.height / 2;
      mouse.x = cx;
      mouse.y = cy;
      initStars();
    };

    const initStars = () => {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        const z = Math.random() * canvas.width;
        stars.push({
          x: Math.random() * canvas.width * 2 - canvas.width,
          y: Math.random() * canvas.height * 2 - canvas.height,
          z: z,
          pz: z,
        });
      }
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onLeave = () => {
      mouse.x = canvas.width / 2;
      mouse.y = canvas.height / 2;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    document.body.addEventListener("pointerleave", onLeave);

    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Center smoothly follows mouse
      cx += (mouse.x - cx) * 0.05;
      cy += (mouse.y - cy) * 0.05;

      // Speed increases slightly when mouse moves away from center
      const dxCenter = mouse.x - canvas.width / 2;
      const dyCenter = mouse.y - canvas.height / 2;
      const distCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
      const speed = 2 + (distCenter / canvas.width) * 15;

      // UPDATE DYNAMIC AUDIO based on speed
      if (isSoundEnabled && biquadFilter && gainNode && audioCtx) {
        // Frequency stays very low (100Hz to ~350Hz max) for that smooth deep ambient feel
        const targetFreq = 100 + speed * 15;
        // Volume stays very subtle (0.01 to ~0.08 max)
        const targetGain = 0.01 + (speed / 17) * 0.07;

        // Smoothly ramp parameters to prevent clicking
        biquadFilter.frequency.setTargetAtTime(targetFreq, audioCtx.currentTime, 0.2);
        gainNode.gain.setTargetAtTime(targetGain, audioCtx.currentTime, 0.2);
      }

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        star.pz = star.z;
        star.z -= speed;

        if (star.z < 1) {
          star.z = canvas.width;
          star.pz = star.z;
          star.x = Math.random() * canvas.width * 2 - canvas.width;
          star.y = Math.random() * canvas.height * 2 - canvas.height;
        }

        const sx = (star.x / star.z) * canvas.width + cx;
        const sy = (star.y / star.z) * canvas.height + cy;

        const px = (star.x / star.pz) * canvas.width + cx;
        const py = (star.y / star.pz) * canvas.height + cy;

        const size = Math.max(0.8, (1 - star.z / canvas.width) * 4.5);
        const alpha = Math.min(1, Math.max(0.1, 1.2 - star.z / canvas.width));

        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = size;
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.body.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(animationFrameId);

      // Cleanup audio context when toggled off or component unmounts
      if (audioCtx) {
        audioCtx.close();
      }
    };
  }, [isSoundEnabled]);

  return (
    <section
      ref={ref}
      className="noise relative flex min-h-dvh flex-col justify-end overflow-hidden px-6 pt-50 pb-24 md:px-10 md:pb-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 size-full" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 0%, transparent 20%, oklch(0 0 0 / 70%) 70%, oklch(0 0 0) 100%)",
          }}
        />
      </div>

      <motion.div style={{ y, opacity }} className="relative mx-auto w-full max-w-[1400px]">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="eyebrow"
        >
          Software · AI · Digital Transformation
        </motion.p>

        <h1 className="display-lg mt-8 font-normal">
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "108%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 0.45 + i * 0.1, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-12 grid gap-10  pt-10 lg:grid-cols-[1.1fr_auto] lg:items-end">
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 1, duration: 1 }}
            className="body-lg max-w-xl"
          >
            We create premium software, AI-powered products, mobile applications and digital experiences
            for businesses around the world.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.8 }}
            className="flex flex-wrap gap-3"
          >
            <MagneticLink to="/contact">Start Your Project</MagneticLink>
            <MagneticLink href="#works" variant="ghost">
              View Our Works
            </MagneticLink>

            <button
              onClick={toggleSound}
              className="ml-2 grid size-12 place-items-center rounded-full border border-border/50 text-foreground transition-colors hover:bg-white/10"
              aria-label="Toggle sound"
            >
              {isSoundEnabled ? <Volume2 className="size-5" /> : <VolumeX className="size-5 opacity-50" />}
            </button>

          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
