import React from "react";
import { Link } from "wouter";
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";
import logoImg from "@assets/image_1784656770555.png";

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
              Where serious fitness meets community energy. A temple where bodies are forged and limits shattered.
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
              <li><Link href="/" className="hover:text-primary transition-colors uppercase text-sm tracking-wider">Home</Link></li>
              <li><Link href="/programs" className="hover:text-primary transition-colors uppercase text-sm tracking-wider">Programs</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors uppercase text-sm tracking-wider">About Trainer</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors uppercase text-sm tracking-wider">Gallery</Link></li>
              <li><Link href="/membership" className="hover:text-primary transition-colors uppercase text-sm tracking-wider">Membership</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-xl text-white tracking-widest mb-6 uppercase relative inline-block">
              Programs
              <span className="absolute -bottom-2 left-0 w-1/2 h-[2px] bg-primary"></span>
            </h3>
            <ul className="space-y-3">
              <li className="uppercase text-sm tracking-wider">Strength Training</li>
              <li className="uppercase text-sm tracking-wider">CrossFit</li>
              <li className="uppercase text-sm tracking-wider">Zumba & Dance</li>
              <li className="uppercase text-sm tracking-wider">Cardio</li>
              <li className="uppercase text-sm tracking-wider">Personal Training</li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-xl text-white tracking-widest mb-6 uppercase relative inline-block">
              Contact
              <span className="absolute -bottom-2 left-0 w-1/2 h-[2px] bg-primary"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">Pundri, Haryana<br />India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm">7206060744</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                 <span className="text-sm break-all">krrishai0916@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 text-center text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Fitness Temple The Gym. All rights reserved.</p>
          <p>
            Owned & Operated by <span className="text-white font-semibold">Vikas Saini</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
