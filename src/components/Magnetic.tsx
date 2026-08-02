import { Link } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "ghost";

function useMagnet(strength = 0.35) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };
  return { sx, sy, onMove, onLeave };
}

const base =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-500 will-change-transform";

const styles: Record<Variant, string> = {
  solid: "bg-primary text-primary-foreground hover:shadow-[var(--glow-strong)]",
  ghost: "border border-border-strong text-foreground hover:bg-secondary",
};

function Inner({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
      <span className="pointer-events-none absolute inset-0 z-0 translate-y-full bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-[.is-solid]:hidden" />
    </>
  );
}

export function MagneticLink({
  to,
  href,
  children,
  variant = "solid",
  className,
  ...rest
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  target?: string;
  rel?: string;
}) {
  const { sx, sy, onMove, onLeave } = useMagnet();
  const classes = cn(base, styles[variant], variant === "solid" && "is-solid", className);

  if (to) {
    return (
      <motion.span style={{ x: sx, y: sy }} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block">
        <Link to={to} className={classes} data-cursor="hover" {...rest}>
          <Inner>{children}</Inner>
        </Link>
      </motion.span>
    );
  }

  return (
    <motion.span style={{ x: sx, y: sy }} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block">
      <a href={href} className={classes} data-cursor="hover" {...rest}>
        <Inner>{children}</Inner>
      </a>
    </motion.span>
  );
}

export function MagneticButton({
  children,
  variant = "solid",
  className,
  type = "button",
  disabled,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const { sx, sy, onMove, onLeave } = useMagnet();
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <motion.span style={{ x: sx, y: sy }} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block">
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        data-cursor="hover"
        className={cn(base, styles[variant], variant === "solid" && "is-solid", "disabled:opacity-50", className)}
      >
        <Inner>{children}</Inner>
      </button>
    </motion.span>
  );
}
