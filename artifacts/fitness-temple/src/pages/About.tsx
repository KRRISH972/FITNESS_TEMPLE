import React from "react";
import { motion } from "framer-motion";
import { Reveal, TextReveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { Link } from "wouter";

import trainerHero from "@assets/Screenshot_20260721-112303_Instagram~2_1784655440204.jpg";
import trainerFlex from "@assets/Screenshot_20260721-111941_Instagram_1784655465460.jpg";
import trainerTank from "@assets/Screenshot_20260721-111914_Instagram_1784655475849.jpg";

export default function About() {
  return (
    <div className="w-full flex flex-col min-h-[100dvh] bg-[#0a0a0a]">
      {/* HERO */}
      <section className="relative h-[55vh] min-h-[380px] w-full flex items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 bg-cover bg-top" style={{ backgroundImage: `url(${trainerHero})` }} />
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
                <div className="aspect-[3/4] relative z-10 bg-cover bg-center rounded-sm border-l-4 border-b-4 border-primary shadow-[20px_20px_0px_rgba(229,57,53,0.15)]" style={{ backgroundImage: `url(${trainerFlex})` }} />
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
                  As the head trainer, my goal isn't just to make you look good—it's to make you undeniably strong, both physically and mentally. When you step into my gym, you leave your excuses at the door.
                </p>

                <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-xl text-white font-serif">
                  "Sweat is just fat crying. Push harder today so you can be stronger tomorrow."
                </blockquote>

                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
                  <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
                    <h4 className="font-heading text-3xl font-bold text-primary mb-1">
                      <CountUp end={10} suffix="+" duration={2} />
                    </h4>
                    <p className="text-xs uppercase tracking-widest text-gray-400">Years Experience</p>
                  </motion.div>
                  <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300 }}>
                    <h4 className="font-heading text-3xl font-bold text-primary mb-1">
                      <CountUp end={500} suffix="+" duration={2.2} />
                    </h4>
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
              <div className="aspect-square relative bg-cover bg-center rounded-full overflow-hidden border-4 border-white/5" style={{ backgroundImage: `url(${trainerTank})` }} />
            </Reveal>

          </div>
        </div>
      </section>
    </div>
  );
}
