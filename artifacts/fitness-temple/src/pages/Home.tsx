import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Star, Users, Trophy, ChevronRight, Dumbbell, Quote } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem, TextReveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";

import heroBg from "@assets/image_1784655757325.png";
import interiorImg from "@assets/gym_images/eb71bb4d-dd3a-476a-8e7f-a0fb887be971.jpeg";
import muralImg from "@assets/gym_images/8e4d3b55-eef9-44b2-a267-80ab668e9556.jpeg";
import trainerImg from "@assets/Screenshot_20260721-111941_Instagram_1784655465460.jpg";

export default function Home() {
  return (
    <div className="w-full flex flex-col min-h-[100dvh]">
      {/* HERO SECTION */}
      <section className="relative min-h-[100svh] h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105 animate-[slowPan_20s_ease-in-out_infinite_alternate]"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/80 via-black/50 to-[#050505]" />
        <div className="absolute inset-0 z-10 bg-black/40" />

        {/* Floating red orbs */}
        <motion.div
          className="absolute z-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none"
          style={{ top: "15%", left: "8%" }}
          animate={{ y: [0, -28, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute z-10 w-48 h-48 rounded-full bg-primary/8 blur-3xl pointer-events-none"
          style={{ bottom: "20%", right: "10%" }}
          animate={{ y: [0, 20, 0], scale: [1, 0.9, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute z-10 w-32 h-32 rounded-full bg-red-700/15 blur-2xl pointer-events-none"
          style={{ top: "40%", right: "25%" }}
          animate={{ y: [0, -16, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <div className="container relative z-20 mx-auto px-5 sm:px-4 pt-10 md:pt-0 text-center flex flex-col items-center">
          <motion.span
            className="text-primary font-bold uppercase tracking-[0.22em] sm:tracking-[0.3em] mb-4 block text-xs sm:text-sm md:text-base"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Welcome to the Arena
          </motion.span>

          <div className="font-heading text-[2.65rem] sm:text-6xl md:text-8xl lg:text-9xl font-bold uppercase text-white mb-5 sm:mb-6 leading-[0.92] tracking-tight">
            <TextReveal text="Unleash Your" delay={0.1} stagger={0.1} as="span" className="block" />
            <TextReveal
              text="Inner Power"
              delay={0.25}
              stagger={0.1}
              as="span"
              className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-red-400 to-white drop-shadow-[0_0_15px_rgba(229,57,53,0.8)]"
            />
          </div>

          <motion.p
            className="text-gray-300 max-w-2xl mx-auto text-base sm:text-lg md:text-xl leading-relaxed mb-7 sm:mb-10 font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            Premium equipment, high-voltage energy, and Pundri's strongest community.
            Step into the darkness and forge your best self.
          </motion.p>

          <motion.div
            className="w-full max-w-sm flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/membership"
              className="group relative inline-flex items-center justify-center px-5 py-4 font-heading text-lg sm:text-xl tracking-[0.12em] sm:tracking-widest uppercase text-white bg-primary overflow-hidden transition-all hover:scale-105 animate-[pulse-glow_3s_ease-in-out_infinite]"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10" />
              <span className="relative">Join The Temple</span>
            </Link>
            <Link
              href="/programs"
              className="group inline-flex items-center justify-center px-5 py-4 font-heading text-lg sm:text-xl tracking-[0.12em] sm:tracking-widest uppercase text-white border-2 border-white/20 hover:border-primary hover:text-primary transition-all"
            >
              Explore Programs
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-5 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <span className="text-xs uppercase tracking-widest mb-2 font-heading">Scroll</span>
          <motion.div
             className="w-[1px] h-8 sm:h-12 bg-gradient-to-b from-primary to-transparent"
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* STATS SECTION */}
      <section className="py-12 bg-[#050505] border-y border-white/5 relative z-20">
        <div className="container mx-auto px-4">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 md:divide-x md:divide-white/10">
            <StaggerItem className="text-center px-4">
              <div className="flex items-center justify-center gap-1 text-primary mb-2">
                <Star className="w-5 h-5 fill-primary" />
                <Star className="w-5 h-5 fill-primary" />
                <Star className="w-5 h-5 fill-primary" />
                <Star className="w-5 h-5 fill-primary" />
                <Star className="w-5 h-5 fill-primary" />
              </div>
              <div className="font-heading text-4xl md:text-5xl font-bold text-white mb-1">
                <CountUp end={4.7} decimals={1} duration={2} />
              </div>
              <div className="text-xs md:text-sm uppercase tracking-widest text-gray-400">Google Rating</div>
            </StaggerItem>

            <StaggerItem className="text-center px-4">
              <div className="flex items-center justify-center text-primary mb-2">
                <Users className="w-5 h-5" />
              </div>
              <div className="font-heading text-4xl md:text-5xl font-bold text-white mb-1">
                <CountUp end={500} suffix="+" duration={2.2} />
              </div>
              <div className="text-xs md:text-sm uppercase tracking-widest text-gray-400">Happy Members</div>
            </StaggerItem>

            <StaggerItem className="text-center px-4">
              <div className="flex items-center justify-center text-primary mb-2">
                <Trophy className="w-5 h-5" />
              </div>
              <div className="font-heading text-4xl md:text-5xl font-bold text-white mb-1">
                <CountUp end={5} suffix="+" duration={1.8} />
              </div>
              <div className="text-xs md:text-sm uppercase tracking-widest text-gray-400">Years Active</div>
            </StaggerItem>

            <StaggerItem className="text-center px-4">
              <div className="flex items-center justify-center text-primary mb-2">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div className="font-heading text-4xl md:text-5xl font-bold text-white mb-1">Pro</div>
              <div className="text-xs md:text-sm uppercase tracking-widest text-gray-400">Fitline Equip</div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* PROGRAMS TEASER */}
      <section className="py-14 md:py-24 bg-[#0a0a0a]">
        <div className="container mx-auto px-4">
          <Reveal className="mb-16">
            <h2 className="font-heading text-3xl sm:text-5xl md:text-7xl font-bold uppercase text-center">
              Our <span className="text-primary">Disciplines</span>
            </h2>
            <p className="text-center text-gray-400 max-w-2xl mx-auto mt-4 text-lg">
              Choose your weapon. From heavy lifting to high-intensity cardio, we have the programs to forge your physique.
            </p>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Strength Training", img: interiorImg, desc: "Build raw power with premium free weights and machines." },
              { title: "CrossFit", img: heroBg, desc: "High-intensity functional training to shatter your limits." },
              { title: "Zumba & Dance", img: muralImg, desc: "Burn calories and feel the rhythm in our dynamic group classes." }
            ].map((prog, i) => (
              <StaggerItem key={i}>
                <Link href="/programs" className="group block relative h-80 overflow-hidden rounded-sm bg-black">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40" style={{ backgroundImage: `url(${prog.img})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                    <h3 className="font-heading text-3xl font-bold uppercase text-white mb-2 group-hover:text-primary transition-colors">{prog.title}</h3>
                    <p className="text-gray-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{prog.desc}</p>
                    <div className="flex items-center text-primary text-sm font-bold uppercase tracking-widest">
                      Explore <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="mt-12 text-center">
            <Link href="/programs" className="inline-flex items-center gap-2 text-white hover:text-primary transition-colors font-heading tracking-widest uppercase text-xl">
              View All Programs <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* TRAINER PREVIEW */}
      <section className="py-0">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 min-h-[300px] md:min-h-[500px] bg-cover bg-top relative" style={{ backgroundImage: `url(${trainerImg})` }}>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 md:from-black/0 via-black/40 to-black" />
          </div>
          <div className="w-full md:w-1/2 bg-[#050505] p-6 sm:p-10 md:p-20 flex flex-col justify-center">
            <Reveal direction="left">
              <h4 className="text-primary font-bold uppercase tracking-[0.2em] mb-2 text-sm">Head Trainer & Owner</h4>
              <h2 className="font-heading text-3xl sm:text-5xl md:text-7xl font-bold uppercase text-white mb-6">
                Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Vikas Saini</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                With years of professional experience and a relentless passion for fitness, Vikas isn't just a trainer — he's the architect of the Temple. He believes that sweat is fat crying, and there are no shortcuts to greatness.
              </p>
              
              <Link href="/about" className="inline-flex items-center gap-4 bg-white text-black hover:bg-primary hover:text-white transition-colors px-8 py-4 rounded-sm font-heading tracking-widest text-lg uppercase group">
                Read His Story
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-16 md:py-24 bg-[#050505] overflow-hidden">
        {/* Header */}
        <div className="container mx-auto px-4 mb-10 md:mb-14">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <span className="text-primary font-bold uppercase tracking-[0.3em] text-sm block mb-3">Straight From The Members</span>
                <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold uppercase text-white">
                  What They <span className="text-primary">Say</span>
                </h2>
              </div>

              {/* Google Rating Badge */}
              <a
                href="https://g.co/kgs/fitness-temple-pundri"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/30 transition-all px-5 py-4 rounded-sm shrink-0 group"
              >
                <svg viewBox="0 0 48 48" className="w-7 h-7 shrink-0" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  <path fill="none" d="M0 0h48v48H0z"/>
                </svg>
                <div className="h-8 w-[1px] bg-white/15" />
                <div>
                  <div className="flex items-center gap-0.5 mb-0.5">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i <= 4 ? "fill-yellow-400 text-yellow-400" : "fill-yellow-400/60 text-yellow-400/60"}`} />
                    ))}
                  </div>
                  <p className="text-white font-heading font-bold text-base leading-none">
                    4.7 <span className="text-gray-400 text-xs font-normal">/ 130+ Google Reviews</span>
                  </p>
                </div>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Infinite scrolling row 1 */}
        <div className="relative mb-4">
          <div className="absolute left-0 top-0 w-16 md:w-32 h-full bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-16 md:w-32 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="flex w-max gap-4 [animation:marquee_35s_linear_infinite]">
            {[
              { name: "Rahul Sharma", duration: "8 months", rating: 5, review: "Fitness Temple ne meri life badal di. 8 mahine mein 20kg lose kiya. Vikas sir ki training ekdum personal aur effective hai. Pundri ka best gym!" },
              { name: "Priya Rani", duration: "1 year", rating: 5, review: "Best gym in Pundri! Equipment top class hai aur Vikas sir hamesha motivate karte hain. Zumba classes bahut entertaining hain. Highly recommend!" },
              { name: "Amit Saroha", duration: "8 months", rating: 5, review: "Pehle bohot gyms try kiye but Fitness Temple ka atmosphere alag hi hai. Dark vibe, heavy music, serious log — exactly what I needed. 5 stars!" },
              { name: "Deepak Kumar", duration: "10 months", rating: 5, review: "CrossFit classes are intense and addictive. Vikas sir personally checks your form every session. Best investment I've made in myself." },
              { name: "Sunita Devi", duration: "4 months", rating: 5, review: "Sirf 4 mahine mein mera weight 15kg kam hua. Staff bahut cooperative hai aur environment bohot clean hai. Bilkul paisa vasool!" },
              { name: "Anjali Bishnoi", duration: "7 months", rating: 5, review: "Ye gym sirf gym nahi, ek community hai. Sabke saath mil ke train karna motivation double kar deta hai. Vikas sir are the best!" },
            ].concat([
              { name: "Rahul Sharma", duration: "8 months", rating: 5, review: "Fitness Temple ne meri life badal di. 8 mahine mein 20kg lose kiya. Vikas sir ki training ekdum personal aur effective hai. Pundri ka best gym!" },
              { name: "Priya Rani", duration: "1 year", rating: 5, review: "Best gym in Pundri! Equipment top class hai aur Vikas sir hamesha motivate karte hain. Zumba classes bahut entertaining hain. Highly recommend!" },
              { name: "Amit Saroha", duration: "8 months", rating: 5, review: "Pehle bohot gyms try kiye but Fitness Temple ka atmosphere alag hi hai. Dark vibe, heavy music, serious log — exactly what I needed. 5 stars!" },
              { name: "Deepak Kumar", duration: "10 months", rating: 5, review: "CrossFit classes are intense and addictive. Vikas sir personally checks your form every session. Best investment I've made in myself." },
              { name: "Sunita Devi", duration: "4 months", rating: 5, review: "Sirf 4 mahine mein mera weight 15kg kam hua. Staff bahut cooperative hai aur environment bohot clean hai. Bilkul paisa vasool!" },
              { name: "Anjali Bishnoi", duration: "7 months", rating: 5, review: "Ye gym sirf gym nahi, ek community hai. Sabke saath mil ke train karna motivation double kar deta hai. Vikas sir are the best!" },
            ]).map((t, i) => (
              <div key={i} className="w-[280px] sm:w-[320px] shrink-0 bg-[#111] border border-white/8 p-6 rounded-sm hover:border-primary/25 transition-colors">
                <Quote className="w-6 h-6 text-primary/40 mb-3" />
                <p className="text-gray-300 text-sm leading-relaxed mb-5">"{t.review}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center font-heading font-bold text-primary text-sm shrink-0">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm leading-tight">{t.name}</p>
                      <p className="text-gray-500 text-xs">{t.duration} member</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — slightly slower, reversed feel via offset */}
        <div className="relative">
          <div className="absolute left-0 top-0 w-16 md:w-32 h-full bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-16 md:w-32 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="flex w-max gap-4 [animation:marquee_45s_linear_infinite_reverse]">
            {[
              { name: "Vishal Nain", duration: "6 months", rating: 5, review: "Strength training equipment ekdum premium hai. Fitline machines ka koi jawab nahi. Vikas sir ka diet plan bhi bahut helpful raha mujhe." },
              { name: "Kavita Singh", duration: "5 months", rating: 5, review: "Pehle gym join karna dar lagta tha, but Fitness Temple ka friendly environment ne mujhe comfortable feel karaya. Ab roz aana hota hai!" },
              { name: "Rohit Yadav", duration: "1 year", rating: 5, review: "One year completed at Fitness Temple. 15kg muscle gained, confidence doubled. This gym is a lifestyle, not just a workout place." },
              { name: "Manish Hooda", duration: "3 months", rating: 5, review: "3 mahine mein 12kg weight loss. Cardio section aur personal training ka combination kamaal ka hai. Worth every penny spent here!" },
              { name: "Ritu Malik", duration: "9 months", rating: 5, review: "Zumba aur strength dono classes join ki. Energy aur results dono amazing hain. Vikas sir ki expertise pe pura trust hai mujhe." },
              { name: "Suresh Tanwar", duration: "11 months", rating: 5, review: "Best gym atmosphere in entire Haryana. The motivation from trainers is unmatched. My fitness journey truly started here at the Temple." },
            ].concat([
              { name: "Vishal Nain", duration: "6 months", rating: 5, review: "Strength training equipment ekdum premium hai. Fitline machines ka koi jawab nahi. Vikas sir ka diet plan bhi bahut helpful raha mujhe." },
              { name: "Kavita Singh", duration: "5 months", rating: 5, review: "Pehle gym join karna dar lagta tha, but Fitness Temple ka friendly environment ne mujhe comfortable feel karaya. Ab roz aana hota hai!" },
              { name: "Rohit Yadav", duration: "1 year", rating: 5, review: "One year completed at Fitness Temple. 15kg muscle gained, confidence doubled. This gym is a lifestyle, not just a workout place." },
              { name: "Manish Hooda", duration: "3 months", rating: 5, review: "3 mahine mein 12kg weight loss. Cardio section aur personal training ka combination kamaal ka hai. Worth every penny spent here!" },
              { name: "Ritu Malik", duration: "9 months", rating: 5, review: "Zumba aur strength dono classes join ki. Energy aur results dono amazing hain. Vikas sir ki expertise pe pura trust hai mujhe." },
              { name: "Suresh Tanwar", duration: "11 months", rating: 5, review: "Best gym atmosphere in entire Haryana. The motivation from trainers is unmatched. My fitness journey truly started here at the Temple." },
            ]).map((t, i) => (
              <div key={i} className="w-[280px] sm:w-[320px] shrink-0 bg-[#0e0e0e] border border-white/8 p-6 rounded-sm hover:border-primary/25 transition-colors">
                <Quote className="w-6 h-6 text-primary/40 mb-3" />
                <p className="text-gray-300 text-sm leading-relaxed mb-5">"{t.review}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center font-heading font-bold text-primary text-sm shrink-0">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm leading-tight">{t.name}</p>
                      <p className="text-gray-500 text-xs">{t.duration} member</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${muralImg})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-black/80 to-[#050505]" />
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <Reveal>
            <h2 className="font-heading text-4xl sm:text-6xl md:text-8xl font-bold uppercase text-white mb-6">
              Ready to <span className="text-primary">Commit?</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
              Stop making excuses. Start making progress. Join Fitness Temple today and become part of the strongest community in Pundri.
            </p>
            <Link href="/membership" className="inline-block px-12 py-5 font-heading text-2xl tracking-widest uppercase text-black bg-primary transition-all hover:scale-105 shadow-[0_0_30px_rgba(229,57,53,0.5)]">
              Start Your Journey
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
