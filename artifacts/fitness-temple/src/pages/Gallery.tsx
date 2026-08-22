import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

import ext1 from "@assets/image_1784655757325.png";
import ext2 from "@assets/gym_images/2cc21956-08c5-4c98-9a86-81041692833b.jpeg";
import int1 from "@assets/gym_images/eb71bb4d-dd3a-476a-8e7f-a0fb887be971.jpeg";
import int2 from "@assets/gym_images/d6b27e32-9b1e-43bb-afb4-64d25134dc64.jpeg";
import int3 from "@assets/gym_images/8e4d3b55-eef9-44b2-a267-80ab668e9556.jpeg";
import mem1 from "@assets/Screenshot_20260721-112033_Instagram_1784655451111.jpg";
import tr1 from "@assets/Screenshot_20260721-112303_Instagram~2_1784655440204.jpg";

const images = [
  { src: ext1, alt: "Gym Exterior Night", span: "md:col-span-2 md:row-span-2" },
  { src: int1, alt: "Fitline Equipment", span: "col-span-1" },
  { src: int3, alt: "You vs You Mural", span: "col-span-1" },
  { src: ext2, alt: "Gym Exterior", span: "md:col-span-2" },
  { src: mem1, alt: "Member Result", span: "col-span-1" },
  { src: int2, alt: "Interior View", span: "col-span-1" },
  { src: tr1, alt: "Trainer at work", span: "md:col-span-2" }
];

export default function Gallery() {
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
            Take a look inside the Temple. Professional equipment, elite atmosphere.
          </p>
        </Reveal>
      </section>

      {/* MASONRY GRID */}
      <section className="py-10 pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[160px] md:auto-rows-[250px]">
            {images.map((img, i) => (
              <motion.div
                key={i}
                className={`relative overflow-hidden rounded-sm cursor-pointer group ${img.span}`}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.02 }}
                onClick={() => openLightbox(i)}
              >
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${img.src})` }}
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
              </motion.div>
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
