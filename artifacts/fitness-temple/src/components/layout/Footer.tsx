import React from "react";
import { Link } from "wouter";
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";
import logoImg from "@assets/image_1784656770555.webp";

export function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-16 pb-8 text-gray-400">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          
           <div className="sm:col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex mb-6 group">
              <img src={logoImg} alt="Fitness Temple Gym" className="h-14 w-auto object-contain transition-opacity group-hover:opacity-80" />
            </Link>
            <p className="mb-6 leading-relaxed">
              Pundri's #1 premium gym. Where serious fitness meets community energy. Strength training, CrossFit, Zumba & personal training with expert coach Vikas Saini.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors group">
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors group">
                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-xl text-white tracking-widest mb-6 uppercase relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-1/2 h-[2px] bg-primary"></span>
            </h3>
            <ul className="space-y-3">
              <li><Link href="/" className="hover:text-primary transition-colors uppercase text-sm tracking-wider" aria-label="Home - Fitness Temple Gym Pundri">Home</Link></li>
              <li><Link href="/programs" className="hover:text-primary transition-colors uppercase text-sm tracking-wider" aria-label="Gym Programs - Strength Training, CrossFit, Zumba">Programs</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors uppercase text-sm tracking-wider" aria-label="About Vikas Saini - Head Trainer">About Trainer</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors uppercase text-sm tracking-wider" aria-label="Gym Gallery - Photos and Interior">Gallery</Link></li>
              <li><Link href="/membership" className="hover:text-primary transition-colors uppercase text-sm tracking-wider" aria-label="Gym Membership Plans and Pricing">Membership</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-xl text-white tracking-widest mb-6 uppercase relative inline-block">
              Programs
              <span className="absolute -bottom-2 left-0 w-1/2 h-[2px] bg-primary"></span>
            </h3>
            <ul className="space-y-3">
              <li><Link href="/programs" className="uppercase text-sm tracking-wider hover:text-primary transition-colors">Strength Training</Link></li>
              <li><Link href="/programs" className="uppercase text-sm tracking-wider hover:text-primary transition-colors">CrossFit</Link></li>
              <li><Link href="/programs" className="uppercase text-sm tracking-wider hover:text-primary transition-colors">Zumba & Dance</Link></li>
              <li><Link href="/programs" className="uppercase text-sm tracking-wider hover:text-primary transition-colors">Cardio</Link></li>
              <li><Link href="/programs" className="uppercase text-sm tracking-wider hover:text-primary transition-colors">Personal Training</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-xl text-white tracking-widest mb-6 uppercase relative inline-block">
              Contact
              <span className="absolute -bottom-2 left-0 w-1/2 h-[2px] bg-primary"></span>
            </h3>
            <address className="not-italic space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">Near Bus Stand, Main Market, Pundri, Haryana 136026, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+917206060744" className="text-sm hover:text-primary transition-colors no-underline">7206060744</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:krrishai0916@gmail.com" className="text-sm break-all hover:text-primary transition-colors no-underline">krrishai0916@gmail.com</a>
              </div>
            </address>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 text-center text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Fitness Temple - Best Gym in Pundri, Haryana. All rights reserved.</p>
          <p>
            Owned & Operated by <span className="text-white font-semibold">Vikas Saini</span> | <Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
