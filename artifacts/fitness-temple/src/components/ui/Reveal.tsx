import React from "react";
import { motion, useInView, Variants } from "framer-motion";

/* ─── Reveal ────────────────────────────────────────────────────────────── */
interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none" | "scale" | "blur";
  className?: string;
}

export function Reveal({
  children,
  width = "100%",
  delay = 0,
  direction = "up",
  className,
}: RevealProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const variants: Record<string, Variants> = {
    up:    { hidden: { opacity: 0, y: 60 },        visible: { opacity: 1, y: 0 } },
    down:  { hidden: { opacity: 0, y: -60 },       visible: { opacity: 1, y: 0 } },
    left:  { hidden: { opacity: 0, x: 60 },        visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: -60 },       visible: { opacity: 1, x: 0 } },
    none:  { hidden: { opacity: 0 },               visible: { opacity: 1 } },
    scale: {
      hidden: { opacity: 0, scale: 0.85 },
      visible: { opacity: 1, scale: 1 },
    },
    blur: {
      hidden: { opacity: 0, filter: "blur(12px)", y: 20 },
      visible: { opacity: 1, filter: "blur(0px)", y: 0 },
    },
  };

  return (
    <div ref={ref} style={{ width }} className={className}>
      <motion.div
        variants={variants[direction]}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{
          duration: 0.75,
          delay,
          ease: [0.16, 1, 0.3, 1], // expo out — snappy & premium
        }}
        style={{ width: "100%", height: "100%" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── TextReveal (word-by-word) ─────────────────────────────────────────── */
interface TextRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export function TextReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.08,
  as: Tag = "h1",
}: TextRevealProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const wordVariant: Variants = {
    hidden: { opacity: 0, y: "110%", rotate: 3 },
    visible: {
      opacity: 1,
      y: "0%",
      rotate: 0,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <Tag className={className}>
      <motion.span
        ref={ref}
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="inline"
      >
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden align-bottom leading-[1.1]"
          >
            <motion.span
              variants={wordVariant}
              className={`inline-block ${wordClassName ?? ""}`}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && "\u00A0"}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/* ─── StaggerContainer ──────────────────────────────────────────────────── */
interface StaggerProps {
  children: React.ReactNode;
  delayOffset?: number;
  className?: string;
}

export function StaggerContainer({
  children,
  delayOffset = 0.12,
  className,
}: StaggerProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ staggerChildren: delayOffset }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── StaggerItem ───────────────────────────────────────────────────────── */
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const variants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}
