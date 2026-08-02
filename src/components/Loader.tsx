import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import wordmark from "@/assets/white-z.png";

export function Loader() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("zuarak-loaded")) {
      setDone(true);
      return;
    }
    let value = 0;
    const tick = window.setInterval(() => {
      value = Math.min(100, value + Math.random() * 18 + 6);
      setProgress(Math.round(value));
      if (value >= 100) {
        window.clearInterval(tick);
        window.setTimeout(() => {
          sessionStorage.setItem("zuarak-loaded", "1");
          setDone(true);
        }, 420);
      }
    }, 140);
    return () => window.clearInterval(tick);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          aria-hidden
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          <motion.img
            src={wordmark}
            alt="ZUARAK"
            width={160}
            height={40}
            initial={{ opacity: 0, filter: "blur(14px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-[200px] md:w-[280px]"
          />
          <div className="mt-10 h-px w-[200px] overflow-hidden bg-border md:w-[280px]">
            <motion.div className="h-full bg-primary" animate={{ width: `${progress}%` }} />
          </div>
          <span className="mt-4 font-mono text-[11px] tracking-[0.3em] text-muted-foreground">
            {String(progress).padStart(3, "0")}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
