import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Reveal";
import { Check, Dumbbell } from "lucide-react";

const plans = [
  {
    name: "Monthly",
    price: "₹1,500",
    period: "/month",
    description: "Perfect for short-term commitment and trying out the Temple.",
    features: [
      "Access to all strength equipment",
      "Cardio section access",
      "General trainer guidance",
      "Locker room access",
      "Valid for 30 days"
    ],
    recommended: false,
  },
  {
    name: "Quarterly",
    price: "₹4,000",
    period: "/3 months",
    description: "Our most popular plan. Commit to a 90-day transformation.",
    features: [
      "Access to all equipment",
      "Cardio section access",
      "Personalized workout chart",
      "Basic diet consultation",
      "Save ₹500 compared to monthly"
    ],
    recommended: true,
  },
  {
    name: "Annual",
    price: "₹12,000",
    period: "/year",
    description: "For the truly dedicated. Make fitness a permanent lifestyle.",
    features: [
      "Unrestricted gym access",
      "Advanced diet & nutrition plan",
      "Priority equipment usage",
      "2 guest passes per month",
      "Save ₹6,000 compared to monthly",
      "Free Fitness Temple T-Shirt"
    ],
    recommended: false,
  }
];

export default function Membership() {
  return (
    <div className="w-full flex flex-col min-h-[100dvh] pt-24 bg-[#0a0a0a]">
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <Reveal className="text-center mb-20">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-7xl font-bold uppercase text-white mb-6">
              Choose Your <span className="text-primary">Plan</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              No hidden fees. No complicated contracts. Just straightforward pricing for serious fitness.
            </p>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {plans.map((plan, i) => (
              <StaggerItem key={i}>
              <motion.div
                className={`relative flex flex-col p-8 rounded-sm transition-colors duration-300 h-full ${plan.recommended ? 'bg-[#111] border-2 border-primary transform md:-translate-y-4 shadow-[0_0_30px_rgba(229,57,53,0.2)]' : 'bg-[#050505] border border-white/10 hover:border-white/30'}`}
                whileHover={{ y: plan.recommended ? -6 : -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              >
                
                {plan.recommended && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-black font-heading tracking-widest text-sm uppercase px-4 py-1 font-bold">
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="font-heading text-3xl font-bold text-white mb-2 uppercase">{plan.name}</h3>
                  <p className="text-gray-400 text-sm min-h-[40px]">{plan.description}</p>
                </div>

                <div className="mb-8 flex items-baseline">
                  <span className="font-heading text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-500 ml-2">{plan.period}</span>
                </div>

                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  href="/contact" 
                  className={`w-full py-4 font-heading tracking-widest uppercase text-center transition-colors ${plan.recommended ? 'bg-primary text-black hover:bg-white' : 'bg-white/10 text-white hover:bg-primary hover:text-black'}`}
                >
                  Get Started
                </Link>
              </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* PT Addon */}
          <Reveal delay={0.4} className="mt-20">
            <div className="bg-gradient-to-r from-[#111] to-[#050505] border border-primary/30 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 rounded-sm">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                  <Dumbbell className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-3xl font-bold uppercase text-white mb-2">Personal Training</h3>
                  <p className="text-gray-400">Want faster results? Add 1-on-1 coaching with Vikas Saini.</p>
                </div>
              </div>
              <Link href="/contact" className="shrink-0 px-8 py-3 border border-white text-white font-heading uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                Enquire Now
              </Link>
            </div>
          </Reveal>

        </div>
      </section>
    </div>
  );
}
