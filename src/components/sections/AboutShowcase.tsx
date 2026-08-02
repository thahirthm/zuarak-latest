import { motion } from "motion/react";

const topDescription = "A senior product studio from Kozhikode, building software for founders and enterprises across 14 countries.";

const sections = [
  {
    title: "Our Mission",
    content: "To make world-class engineering and design accessible to ambitious businesses, wherever they operate.",
  },
  {
    title: "Our Vision",
    content: "A future where every company runs on software that feels considered, fast and genuinely human.",
  },
  {
    title: "Why ZUARAK",
    content: "Small senior teams, weekly demos, obsessive craft and total ownership of what we ship.",
  },
];

export function AboutShowcase() {
  return (
    <section className="relative bg-black text-white pt-24 pb-20 md:pt-56 md:pb-40 px-6 md:px-10">
      <div className="mx-auto max-w-[1400px] flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
        
        {/* Left Side: Sticky Header */}
        <div className="lg:w-1/3 lg:sticky lg:top-40">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-7xl font-normal tracking-tight"
          >
            Who We Are
          </motion.h2>
        </div>

        {/* Right Side: Scrolling Content */}
        <div className="lg:w-2/3 flex flex-col">
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl font-light text-neutral-400 mb-10 md:mb-16 max-w-2xl leading-relaxed"
          >
            {topDescription}
          </motion.p>

          {/* List of items in a card-like container matching the reference */}
          <div className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.02]">
            {sections.map((section, index) => (
              <motion.div 
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row p-6 md:p-12 gap-3 md:gap-12 transition-colors hover:bg-white/[0.04] ${
                  index !== sections.length - 1 ? "border-b border-white/10" : ""
                }`}
              >
                <div className="md:w-5/12">
                  <h3 className="text-xl md:text-3xl font-normal">
                    {section.title}
                  </h3>
                </div>
                <div className="md:w-7/12 mt-1 md:mt-0">
                  <p className="text-neutral-400 text-base md:text-xl font-light leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
