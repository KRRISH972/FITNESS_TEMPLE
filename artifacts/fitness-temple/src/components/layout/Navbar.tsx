import React from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import logoImg from "@assets/image_1784656770555.png";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Programs", path: "/programs" },
    { name: "About & Trainer", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Membership", path: "/membership" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b",
        isScrolled
           ? "bg-background/95 backdrop-blur-md border-primary/40 py-2.5 md:py-3 shadow-lg shadow-primary/5"
           : "bg-black/60 backdrop-blur-sm border-white/15 py-3 md:py-4"
      )}
    >
        <div className="container mx-auto px-4 sm:px-5 md:px-6 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group" aria-label="Fitness Temple home">
            <img
              src={logoImg}
              alt="Fitness Temple Gym"
             className="h-8 sm:h-9 md:h-11 w-auto object-contain transition-all duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_10px_rgba(229,57,53,0.55)]"
            />
             <span className="relative font-heading text-[0.78rem] sm:text-lg md:text-2xl font-bold uppercase tracking-[0.06em] sm:tracking-[0.12em] text-white leading-none">
              Fitness <span className="text-primary">Temple</span>
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
            </span>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: 0.08 * (index + 1),
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href={link.path}
                className={cn(
                  "text-sm font-semibold uppercase tracking-widest transition-colors hover:text-primary relative group py-2",
                  location === link.path ? "text-primary" : "text-gray-300"
                )}
              >
                {link.name}
                <span
                  className={cn(
                    "absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300",
                    location === link.path && "scale-x-100"
                  )}
                />
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
          >
            <Link
              href="/membership"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-sm font-heading tracking-widest text-lg uppercase transition-all shadow-[0_0_15px_rgba(229,57,53,0.4)] hover:shadow-[0_0_25px_rgba(229,57,53,0.6)]"
            >
              Join Now
            </Link>
          </motion.div>
        </nav>

        {/* Mobile Toggle */}
        <motion.button
           className="md:hidden text-white p-2 -mr-2 rounded-sm hover:bg-white/10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.86, rotate: mobileMenuOpen ? -8 : 8 }}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -12 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
             className="md:hidden absolute top-full left-0 w-full overflow-hidden bg-[#0a0a0a]/98 backdrop-blur-md border-b border-white/10 shadow-xl py-3 px-4"
          >
             <div className="flex flex-col gap-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index, duration: 0.25 }}
                >
                  <Link
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                       "block text-lg font-heading tracking-wider py-3 border-b border-white/5",
                      location === link.path ? "text-primary" : "text-gray-300"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/membership"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-sm font-heading tracking-widest text-xl uppercase text-center mt-2 shadow-[0_0_15px_rgba(229,57,53,0.3)] transition-transform active:scale-95"
              >
                Join Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
