import React from "react";
import { motion } from "framer-motion";
import { Reveal, TextReveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { Link } from "wouter";
import { useSEO } from "@/hooks/useSEO";

import trainerHero from "@assets/trainer-vikas-saini-hero.webp";
import trainerFlex from "@assets/trainer-vikas-saini-flexing.webp";
import trainerTank from "@assets/trainer-vikas-saini-tank-top.webp";

export default function About() {
  useSEO({
    title: "About Vikas Saini - Head Trainer | Fitness Temple Pundri",
    description: "Meet Vikas Saini, head trainer at Fitness Temple Gym Pundri. 10+ years experience, 500+ transformations. His philosophy: Sweat is just fat crying.",
    keywords: "Vikas Saini trainer, gym owner Pundri, personal trainer Haryana, fitness coach Pundri, gym trainer experience, best trainer Haryana",
    canonical: "https://fitnesstemple.in/about",
    ogTitle: "About Vikas Saini - Head Trainer | Fitness Temple Pundri",
    ogDescription: "Meet Vikas Saini, head trainer at Fitness Temple Gym Pundri. 10+ years experience. 500+ successful transformations.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ],
    faqItems: [
      { question: "Who is the owner and head trainer of Fitness Temple?", answer: "Vikas Saini is the founder, owner, and head trainer of Fitness Temple Gym in Pundri, Haryana. He has over 10 years of professional fitness experience and has guided 500+ successful body transformations." },
      { question: "What is Vikas Saini's training philosophy?", answer: "Vikas Saini believes that 'sweat is just fat crying' and that the body achieves what the mind believes. He focuses on discipline, grit, and personalized training for every member." },
    ],
  });
  return (
    <div className="w-full flex flex-col min-h-[100dvh] bg-[#0a0a0a]">
      {/* HERO */}
      <section className="relative h-[55vh] min-h-[380px] w-full flex items-center justify-center border-b border-white/10">
        <div className="absolute inset-0">
          <img src={trainerHero} alt="Vikas Saini, head trainer of Fitness Temple Gym in Pundri, Haryana" fetchPriority="high" decoding="async" className="w-full h-full object-cover object-top" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/60 to-black/30" />
        
        <div className="container relative z-10 mx-auto px-4 text-center mt-20">
          <Reveal>
            <span className="text-primary font-bold uppercase tracking-[0.3em] mb-4 block text-sm md:text-base">
              The Architect
            </span>
            <h1 className="font-heading text-4xl sm:text-6xl md:text-8xl font-bold uppercase text-white mb-6">
              Vikas <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Saini</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* ABOUT TEXT */}
      <section className="py-12 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            <Reveal direction="right">
              <div className="relative">
                <img src={trainerFlex} alt="Vikas Saini flexing in the gym - head trainer at Fitness Temple Pundri" loading="lazy" decoding="async" className="aspect-[3/4] w-full h-full object-cover relative z-10 rounded-sm border-l-4 border-b-4 border-primary shadow-[20px_20px_0px_rgba(229,57,53,0.15)]" />
                {/* Decorative text behind */}
                <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[150px] font-bold text-white/5 whitespace-nowrap z-0">
                  HEAD TRAINER
                </div>
              </div>
            </Reveal>

            <Reveal direction="left">
              <div className="space-y-6">
                <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white mb-8">
                  The <span className="text-primary">Philosophy</span>
                </h2>
                
                <p className="text-gray-300 text-lg leading-relaxed">
                  Fitness Temple wasn't built on shortcuts. It was built on grit, discipline, and the belief that the body achieves what the mind believes. I started this gym in Pundri because our community needed a place for serious fitness.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  As the head trainer, my goal isn't just to make you look good—it's to make you undeniably strong, both physically and mentally. When you step into my <Link href="/programs" className="text-primary hover:text-white transition-colors underline underline-offset-4">gym</Link>, you leave your excuses at the door.
                </p>

                <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-xl text-white font-serif">
                  "Sweat is just fat crying. Push harder today so you can be stronger tomorrow."
                </blockquote>

                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
                  <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
                    <span className="font-heading text-3xl font-bold text-primary mb-1">
                      <CountUp end={10} suffix="+" duration={2} />
                    </span>
                    <p className="text-xs uppercase tracking-widest text-gray-400">Years Experience</p>
                  </motion.div>
                  <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
                    <span className="font-heading text-3xl font-bold text-primary mb-1">
                      <CountUp end={500} suffix="+" duration={2.2} />
                    </span>
                    <p className="text-xs uppercase tracking-widest text-gray-400">Transformations</p>
                  </motion.div>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* THE GYM STORY */}
      <section className="py-12 md:py-24 bg-[#050505] border-t border-white/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center flex-col-reverse md:flex-row">
            
            <Reveal direction="right" className="order-2 md:order-1">
              <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white mb-6">
                The <span className="text-primary">Temple</span> Story
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Established over 5 years ago, Fitness Temple was designed to break the mold of commercial, cookie-cutter gyms. We invested in premium Fitline equipment because our members deserve the best biomechanics available.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                From the dark aesthetic that sharpens focus to the neon blue lighting that sets the energy, every detail of the Temple is curated to get you in the zone. It's 'You vs You' here.
              </p>
              <Link href="/gallery" className="inline-block px-8 py-4 border border-primary text-primary font-heading tracking-widest uppercase hover:bg-primary hover:text-white transition-colors">
                Tour The Gym
              </Link>
            </Reveal>

            <Reveal direction="left" className="order-1 md:order-2">
              <img src={trainerTank} alt="Vikas Saini in tank top - owner and head trainer at Fitness Temple Gym Pundri" loading="lazy" decoding="async" className="aspect-square w-full h-full object-cover rounded-full overflow-hidden border-4 border-white/5" />
            </Reveal>

          </div>
        </div>
      </section>
    </div>
  );
}
