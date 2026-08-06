import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logoEnglish from "@/assets/white-z.png";
import { MagneticLink } from "@/components/Magnetic";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", to: "/", hash: undefined },
  { label: "About", to: "/about", hash: undefined },
  { label: "Services", to: "/services", hash: undefined },
  { label: "Works", to: "/works", hash: undefined },
  { label: "Blog", to: "/blog", hash: undefined },
  { label: "Contact", to: "/contact", hash: undefined },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
    const previous = scrollY.getPrevious() ?? 0;
    // Hide header if scrolling down past 150px. Show if scrolling up.
    if (latest > previous && latest > 150 && !open) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[80] px-4 pt-4 md:px-8 md:pt-6"
      >
        <nav
          aria-label="Primary"
          className={cn(
            "mx-auto flex max-w-[1400px] items-center justify-between rounded-2xl  py-3 transition-all duration-700 md:rounded-full md:px-6",
            scrolled
              ? "border border-border bg-surface/70 backdrop-blur-xl"
              : "border border-transparent bg-transparent",
          )}
        >
          <Link to="/" aria-label="ZUARAK home" className="shrink-0">
            <img src={logoEnglish} alt="ZUARAK" className="h-6 w-auto md:h-9" />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  hash={l.hash}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-300",
                    pathname === l.to && !l.hash
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <MagneticLink href="https://wa.me/918714419511" target="_blank" rel="noopener noreferrer" className="px-6 py-3">
                Let's Talk
              </MagneticLink>
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid size-11 shrink-0 place-items-center rounded-full border border-border text-foreground lg:hidden"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[99] bg-black text-white px-6 py-6 lg:hidden flex flex-col"
          >
            <div className="flex items-center justify-between">
              <img src={logoEnglish} alt="ZUARAK" className="h-6 w-auto" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid size-11 place-items-center rounded-full border border-white/20 text-white transition-colors active:bg-white/10"
              >
                <X className="size-5" />
              </button>
            </div>

            <ul className="mt-10 space-y-0 flex-1 overflow-y-auto">
              {links.map((l, i) => (
                <motion.li
                  key={l.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={l.to}
                    hash={l.hash}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/10 py-5 text-2xl leading-none font-light tracking-tight text-white hover:text-white/70 transition-colors"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 mb-6">
              <a
                href="https://wa.me/918714419511"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center rounded-full bg-white px-8 py-5 text-sm font-semibold uppercase tracking-widest text-black transition-transform active:scale-95"
              >
                Let's Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
