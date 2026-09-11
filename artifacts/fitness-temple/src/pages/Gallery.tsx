import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Reveal } from "@/components/ui/Reveal";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

import ext1 from "@assets/gym-hero-exterior-night-pundri.webp";
import ext2 from "@assets/gym_images/gym-exterior-modern-front.webp";
import int1 from "@assets/gym_images/strength-training-equipment-fitline.webp";
import int2 from "@assets/gym_images/dark-aesthetic-training-floor.webp";
import int3 from "@assets/gym_images/you-vs-you-mural-wall.webp";
import mem1 from "@assets/gym-member-transformation.webp";
import tr1 from "@assets/trainer-vikas-saini-hero.webp";

const images = [
  { src: ext1, alt: "Fitness Temple Gym Pundri - Premium Fitness Center Exterior at Night", span: "md:col-span-2 md:row-span-2" },
  { src: int1, alt: "Fitness Temple Gym - Premium Fitline Strength Training Equipment in Pundri", span: "col-span-1" },
  { src: int3, alt: "Fitness Temple Gym - Motivational You vs You Mural Wall Art in Pundri", span: "col-span-1" },
  { src: ext2, alt: "Fitness Temple Gym - Modern Exterior View of Pundri's Best Fitness Center", span: "md:col-span-2" },
  { src: mem1, alt: "Fitness Temple Member - Real Transformation Results from Pundri Gym", span: "col-span-1" },
  { src: int2, alt: "Fitness Temple Gym Interior - Dark Aesthetic Training Floor in Pundri", span: "col-span-1" },
  { src: tr1, alt: "Vikas Saini - Head Trainer at Fitness Temple Gym Pundri", span: "md:col-span-2" }
];

export default function Gallery() {
  useSEO({
    title: "Gym Gallery - Photos & Interior | Fitness Temple Pundri",
    description: "Take a virtual tour of Fitness Temple Gym Pundri. See our premium Fitline equipment, dark aesthetic interior, and elite training atmosphere.",
    keywords: "gym interior Pundri, fitness center photos, gym equipment images, Fitline machines, gym gallery Haryana, fitness temple photos",
    canonical: "https://fitnesstemple.in/gallery",
    ogTitle: "Gym Gallery - Photos & Interior | Fitness Temple Pundri",
    ogDescription: "Virtual tour of Fitness Temple Gym. Premium Fitline equipment, dark aesthetic interior, and elite training atmosphere in Pundri.",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Gallery", path: "/gallery" },
    ],
  });

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="w-full flex flex-col min-h-[100dvh] pt-24 bg-[#0a0a0a]">
      {/* HEADER */}
      <section className="py-16 text-center">
        <Reveal>
          <h1 className="font-heading text-6xl md:text-7xl font-bold uppercase text-white mb-4">
            The <span className="text-primary">Gallery</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Take a look inside the Temple. Professional equipment, elite atmosphere. Ready to experience it live? <Link href="/membership" className="text-primary hover:text-white transition-colors underline underline-offset-4">View membership plans</Link>.
          </p>
        </Reveal>
      </section>

      {/* MASONRY GRID */}
      <section className="py-10 pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[160px] md:auto-rows-[250px]">
            {images.map((img, i) => (
              <motion.figure
                key={i}
                className={`relative overflow-hidden rounded-sm cursor-pointer group m-0 ${img.span}`}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.02 }}
                onClick={() => openLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <motion.div
                  className="absolute inset-0 bg-primary/20 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <ZoomIn className="w-6 h-6 text-white" />
                  </motion.div>
                </motion.div>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/96 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Close */}
            <motion.button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/50 hover:text-white z-50 p-2"
              whileHover={{ scale: 1.15, rotate: 90 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <X className="w-8 h-8" />
            </motion.button>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={lightboxIndex}
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                className="max-h-[88vh] max-w-[88vw] object-contain shadow-2xl rounded-sm"
                initial={{ opacity: 0, scale: 0.92, x: 40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.92, x: -40 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </AnimatePresence>

            {/* Prev / Next buttons */}
            <motion.button
              className="absolute left-4 md:left-8 p-3 rounded-full bg-white/10 hover:bg-primary text-white backdrop-blur-sm"
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
              onClick={() => setLightboxIndex(prev => (prev! === 0 ? images.length - 1 : prev! - 1))}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              className="absolute right-4 md:right-8 p-3 rounded-full bg-white/10 hover:bg-primary text-white backdrop-blur-sm"
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
              onClick={() => setLightboxIndex(prev => (prev! === images.length - 1 ? 0 : prev! + 1))}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            {/* Counter */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === lightboxIndex ? "bg-primary w-6" : "bg-white/30 hover:bg-white/60"}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
