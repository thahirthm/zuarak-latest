import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { toast } from "sonner";
import { Reveal, RevealWords } from "@/components/Reveal";
import { MagneticButton } from "@/components/Magnetic";
import { company } from "@/lib/site-data";
import contImg from "@/assets/c.png";

const title = "Contact ZUARAK — Start Your Software Project";
const description =
  "Talk to ZUARAK about software, AI, web and mobile products. Kozhikode, Kerala, India. info@zuarak.com · +91 8714419511.";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

const fieldClass =
  "w-full rounded-2xl border border-white/20 bg-white/5 px-6 py-5 text-[15px] text-white placeholder:text-white/40 focus:border-white/50 focus:outline-none transition-colors";

function ContactPage() {
  const [sending, setSending] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(imgRef, { once: true, amount: 0.2 });

  return (
    <div className="bg-black text-white w-full">
      {/* BANNER */}
      <section className="relative flex flex-col items-center justify-start overflow-hidden px-6 pt-28 pb-0 md:pt-48 md:pb-0 text-center min-h-[70vh] md:min-h-screen">
        <div className="grid-lines absolute inset-0 opacity-40" aria-hidden />
        <div className="relative z-10 mx-auto w-full max-w-[1400px] flex flex-col items-center">
          <Reveal>
            <p className="font-mono text-sm uppercase tracking-widest text-white/40 mb-6">Contact</p>
          </Reveal>
          <h1 className="text-[3rem] leading-[1.1] md:text-5xl lg:text-[6rem] font-normal tracking-tight max-w-5xl text-balance text-white">
            <RevealWords text="Let's Talk" />
          </h1>
          <p className="text-base md:text-lg lg:text-xl font-light text-white/70 leading-relaxed mt-6 md:mt-10 max-w-2xl text-balance">
            Share a brief, a rough idea or an existing product that needs rescuing. We reply within one working day.
          </p>

          <motion.div
            ref={imgRef}
            className="relative mt-12 md:mt-24 w-full flex justify-center"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={contImg}
              alt="ZUARAK Office"
              className="w-full max-w-5xl h-auto md:h-[500px] object-contain opacity-90 mb-10"
            />
          </motion.div>
        </div>
      </section>

      {/* FULL WIDTH FORM */}
      <section className="px-0 md:px-10 pb-16 md:pb-32 pt-12 md:pt-32">
        <Reveal className="mx-auto max-w-4xl">
          <form
            className="grid gap-6 md:gap-8 rounded-none md:rounded-[2rem] border-y md:border border-white/10 bg-white/5 px-6 py-10 md:p-14 lg:p-16"
            onSubmit={(e) => {
              e.preventDefault();
              setSending(true);
              window.setTimeout(() => {
                setSending(false);
                toast.success("Thank you. We'll be in touch within one working day.");
                (e.target as HTMLFormElement).reset();
              }, 900);
            }}
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="font-mono text-xs uppercase tracking-widest text-white/40">
                  Name
                </label>
                <input id="name" name="name" required placeholder="Your name" className={`mt-4 ${fieldClass}`} />
              </div>
              <div>
                <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-white/40">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className={`mt-4 ${fieldClass}`}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="company" className="font-mono text-xs uppercase tracking-widest text-white/40">
                Company
              </label>
              <input id="company" name="company" placeholder="Optional" className={`mt-4 ${fieldClass}`} />
            </div>

            <div>
              <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest text-white/40">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="Tell us what you're building…"
                className={`mt-4 resize-none ${fieldClass}`}
              />
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={sending}
                className="rounded-full bg-white px-10 py-5 text-sm font-semibold uppercase tracking-widest text-black transition-transform hover:scale-105 disabled:opacity-50"
              >
                {sending ? "Sending…" : "Send Enquiry"}
              </button>
            </div>
          </form>
        </Reveal>
      </section>

      {/* INFO & MAP SPLIT ROW */}
      <section className="px-0 md:px-10 pb-16 md:pb-40 border-t border-white/10 pt-16 md:pt-24 bg-black">
        <div className="mx-auto grid max-w-[1400px] gap-0 md:gap-8 lg:grid-cols-2">
          
          {/* INFO CARD */}
          <Reveal>
            <div className="flex h-full flex-col justify-center rounded-none md:rounded-[2rem] border-b md:border border-white/10 bg-white/5 px-6 py-12 md:p-14 lg:p-16 space-y-12">
              {[
                { Icon: Mail, label: "Email", value: company.email, href: `mailto:${company.email}` },
                {
                  Icon: Phone,
                  label: "Phone",
                  value: company.phone,
                  href: `tel:${company.phone.replace(/\s/g, "")}`,
                },
              ].map(({ Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-6 border-b border-white/10 pb-12 last:border-0 last:pb-0">
                  <Icon className="mt-1 size-5 text-white/40 shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-white/40">{label}</p>
                    <a href={href} className="mt-3 block text-xl md:text-2xl font-normal text-white hover:text-white/70 transition-colors">
                      {value}
                    </a>
                  </div>
                </div>
              ))}

              <div className="flex items-start gap-6">
                <MapPin className="mt-1 size-5 text-white/40 shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-white/40">Studio</p>
                  <address className="mt-3 text-lg md:text-xl font-light leading-relaxed text-white/70 not-italic">
                    {company.addressLines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </address>
                </div>
              </div>
            </div>
          </Reveal>

          {/* MAP CARD */}
          <Reveal delay={0.1}>
            <div className="h-full min-h-[400px] overflow-hidden rounded-none md:rounded-[2rem] border-b md:border border-white/10 bg-white/5">
              <iframe
                title="ZUARAK studio location on Google Maps"
                src={`https://www.google.com/maps?q=${company.mapQuery}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="size-full min-h-[400px] grayscale opacity-80"
              />
            </div>
          </Reveal>
          
        </div>
      </section>
    </div>
  );
}
