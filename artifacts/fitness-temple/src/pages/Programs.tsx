import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Reveal";
import { Check, Clock, ArrowRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

import strengthImg from "@assets/gym_images/strength-training-equipment-fitline.webp";
import crossfitImg from "@assets/generated_images/fitness-temple-crossfit.webp";
import zumbaImg from "@assets/generated_images/fitness-temple-dance.webp";
import headerImg from "@assets/gym_images/you-vs-you-mural-wall.webp";

const programs = [
  {
    title: "Strength Training",
    description: "Build muscle, increase raw power, and sculpt your physique with our comprehensive range of free weights and Fitline machines.",
    image: strengthImg,
    imageAlt: "Strength training equipment and Fitline machines at Fitness Temple Gym Pundri",
    eyebrow: "01 / Foundation",
    features: ["Heavy dumbbells up to 50kg", "Squat racks & Smith machines", "Isolation machines", "Custom lifting platforms"],
    schedule: "Everyday: 5AM - 10PM"
  },
  {
    title: "CrossFit / Functional",
    description: "High-intensity functional movements designed to improve overall fitness, endurance, and agility. Not for the faint of heart.",
    image: crossfitImg,
    imageAlt: "CrossFit functional training with kettlebells and battle ropes at Fitness Temple Gym Pundri",
    eyebrow: "02 / Intensity",
    features: ["Kettlebells & Plyo boxes", "Battle ropes", "Tire flips & Sleds", "HIIT circuits"],
    schedule: "Mon/Wed/Fri: 6PM - 8PM"
  },
  {
    title: "Zumba & Dance",
    description: "Burn calories and have fun. Our dynamic group classes combine energetic music with infectious dance movements.",
    image: zumbaImg,
    imageAlt: "Zumba and dance group class studio at Fitness Temple Gym Pundri",
    eyebrow: "03 / Rhythm",
    features: ["High energy instructors", "Spacious wooden floor studio", "Surround sound system", "Beginner friendly"],
    schedule: "Tue/Thu/Sat: 6PM - 7PM"
  },
  {
    title: "Cardio Focus",
    description: "Melt away fat and improve heart health with our dedicated cardio section featuring state-of-the-art treadmills and ellipticals.",
    image: strengthImg,
    imageAlt: "Strength and cardio training area at Fitness Temple Gym Pundri",
    eyebrow: "04 / Endurance",
    features: ["Treadmills with inclines", "Ellipticals & Stairmasters", "Stationary bikes", "Rowing machines"],
    schedule: "Everyday: 5AM - 10PM"
  },
  {
    title: "Personal Training",
    description: "1-on-1 coaching with Vikas Saini and expert trainers. Get a customized plan tailored exactly to your body type and goals.",
    image: strengthImg,
    imageAlt: "Personal training session with expert coach at Fitness Temple Gym Pundri",
    eyebrow: "05 / Precision",
    features: ["Customized diet plans", "Form correction", "Accountability & Motivation", "Progress tracking"],
    schedule: "By Appointment"
  }
];

export default function Programs() {
  useSEO({
    title: "Gym Programs - Strength, CrossFit & Zumba | Fitness Temple",
    description: "Explore gym programs at Fitness Temple Pundri: Strength Training, CrossFit, Zumba & Dance, Cardio, and Personal Training. Premium Fitline equipment. Join now!",
    keywords: "strength training Pundri, CrossFit classes Pundri, Zumba classes Haryana, gym programs Pundri, personal training Pundri, cardio gym Haryana, Fitline equipment",
    canonical: "https://fitnesstemple.in/programs",
    ogTitle: "Gym Programs - Strength, CrossFit & Zumba | Fitness Temple",
    ogDescription: "Explore gym programs: Strength Training, CrossFit, Zumba & Dance, Cardio, and Personal Training. Premium Fitline equipment in Pundri, Haryana.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Programs", path: "/programs" },
    ],
    faqItems: [
      { question: "What gym programs does Fitness Temple Pundri offer?", answer: "Fitness Temple offers Strength Training, CrossFit/Functional Training, Zumba & Dance classes, Cardio Focus, and Personal Training with head trainer Vikas Saini." },
      { question: "What are the CrossFit class timings at Fitness Temple?", answer: "CrossFit/Functional Training classes run Monday, Wednesday, and Friday from 6PM to 8PM at Fitness Temple Pundri." },
      { question: "Is there a Zumba class at Fitness Temple Pundri?", answer: "Yes! Zumba & Dance classes are held Tuesday, Thursday, and Saturday from 6PM to 7PM. They are beginner-friendly with a spacious wooden floor studio." },
    ],
  });

  return (
    <div className="w-full flex flex-col min-h-[100dvh] pt-24 bg-[#0a0a0a]">
      {/* HEADER */}
      <section className="py-20 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 opacity-10 scale-110 animate-[slowPan_24s_ease-in-out_infinite_alternate]">
          <img src={headerImg} alt="" aria-hidden="true" className="w-full h-full object-cover" fetchPriority="low" decoding="async" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        <motion.div
          className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <Reveal>
            <motion.span
              className="mb-4 block text-xs font-bold uppercase tracking-[0.45em] text-primary"
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, letterSpacing: "0.45em" }}
              transition={{ duration: 1, delay: 0.15 }}
            >
              Train with intention
            </motion.span>
            <h1 className="font-heading text-4xl sm:text-6xl md:text-8xl font-bold uppercase text-white mb-4">
              Our <span className="text-primary">Programs</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Find your discipline. Master your body.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PROGRAMS LIST */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="space-y-12 md:space-y-24">
            {programs.map((prog, index) => (
              <Reveal key={index} direction={index % 2 === 0 ? "right" : "left"}>
                <article className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center`}>
                  
                  {/* Image Side */}
                  <div className="w-full md:w-1/2">
                    <motion.div
                      className="group relative aspect-square overflow-hidden rounded-sm border border-white/10 bg-[#111] shadow-2xl shadow-black/40 md:aspect-[4/3]"
                      whileHover={{ y: -8 }}
                      transition={{ type: "spring", stiffness: 220, damping: 24 }}
                    >
                      <motion.img
                        src={prog.image}
                        alt={prog.imageAlt}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/10 to-primary/20 transition-opacity duration-700 group-hover:opacity-60" />
                      <div className="absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-700 group-hover:opacity-100 bg-[linear-gradient(115deg,transparent_20%,rgba(255,255,255,0.18)_45%,transparent_70%)] bg-[length:220%_100%] group-hover:animate-[shimmer_1.3s_ease-in-out]" />
                      <div className="absolute inset-4 border border-white/20 transition-all duration-700 group-hover:inset-3 group-hover:border-primary/70" />
                      <div className="absolute left-7 top-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-white/70">
                        <span className="h-px w-8 bg-primary" />
                        <span>{prog.eyebrow}</span>
                      </div>
                      <motion.div
                        className="absolute bottom-7 left-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-white/80"
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                      >
                        <span className="h-2 w-2 animate-pulse rounded-full bg-primary shadow-[0_0_14px_rgba(229,57,53,0.9)]" />
                        Fitness Temple
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Content Side */}
                  <div className="w-full md:w-1/2 flex flex-col justify-center">
                    <motion.div
                      className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.35em] text-primary"
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                    >
                      <span className="h-px w-10 bg-primary" />
                      <span>{prog.eyebrow}</span>
                    </motion.div>
                    <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl font-bold uppercase text-white mb-6 transition-colors duration-500 hover:text-primary">
                      {prog.title}
                    </h2>
                    <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                      {prog.description}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      {prog.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center gap-3 text-gray-400"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.08 * i, duration: 0.45 }}
                        >
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-primary/25">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-sm">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10">
                      <div className="flex items-center gap-2 text-primary font-heading tracking-widest uppercase">
                        <Clock className="w-5 h-5" />
                        <span>{prog.schedule}</span>
                      </div>
                      <motion.div whileHover={{ x: 4 }} className="ml-auto">
                        <Link href="/membership" className="group/join inline-flex items-center gap-2 bg-white text-black px-6 py-2 uppercase font-heading tracking-widest hover:bg-primary hover:text-white transition-all hover:shadow-[0_0_24px_rgba(229,57,53,0.4)]">
                          Join Class <ArrowRight className="w-4 h-4" />
                        </Link>
                      </motion.div>
                    </div>
                  </div>

                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-primary text-black text-center" aria-label="Get started with Fitness Temple">
        <Reveal>
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase mb-6">
            Not sure where to start?
          </h2>
          <p className="text-lg md:text-xl font-medium mb-8 max-w-2xl mx-auto opacity-90">
            Visit us for a consultation. We'll assess your fitness level and recommend the perfect path forward.
          </p>
          <Link href="/contact" className="inline-block px-10 py-4 bg-black text-white font-heading text-xl tracking-widest uppercase hover:bg-white hover:text-black transition-colors shadow-2xl">
            Contact Us
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
