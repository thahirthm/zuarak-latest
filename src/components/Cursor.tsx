import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 30, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 400, damping: 30, mass: 0.3 });
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      setActive(Boolean(target?.closest('a, button, [data-cursor="hover"]')));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed top-0 left-0 z-[90] hidden md:block"
      >
        <motion.div
          animate={{ scale: active ? 2.6 : 1, opacity: active ? 0.35 : 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
          style={{ width: 12, height: 12 }}
        />
      </motion.div>
    </>
  );
}
