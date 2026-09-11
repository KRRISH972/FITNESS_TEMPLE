import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Reveal } from "@/components/ui/Reveal";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";
import { useSEO } from "@/hooks/useSEO";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  interest: z.string().min(1, "Please select an interest"),
  message: z.string().max(5000, "Message must be 5,000 characters or fewer").optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  useSEO({
    title: "Contact Fitness Temple Gym - Phone & Location | Pundri",
    description: "Contact Fitness Temple Gym Pundri: 7206060744. Near Bus Stand, Pundri, Haryana. Open Mon-Sat 5AM-10PM. Send us a message or visit today!",
    keywords: "contact gym Pundri, gym phone number, gym location Pundri, fitness temple address, gym hours Pundri, gym contact Haryana",
    canonical: "https://fitnesstemple.in/contact",
    ogTitle: "Contact Fitness Temple Gym - Phone & Location | Pundri",
    ogDescription: "Contact Fitness Temple Gym Pundri. Phone: 7206060744. Open Mon-Sat 5AM-10PM. Join our fitness community today!",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ],
    faqItems: [
      { question: "Where is Fitness Temple Gym located?", answer: "Fitness Temple is located near the Bus Stand, Main Market, Pundri, Haryana 136026, India." },
      { question: "What are the gym opening hours?", answer: "Fitness Temple is open Monday to Saturday from 5:00 AM to 10:00 PM. It is closed on Sundays." },
      { question: "How do I contact Fitness Temple Gym?", answer: "Call 7206060744, email krrishai0916@gmail.com, or use the contact form on our website at fitnesstemple.in/contact." },
    ],
  });

  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = (await response.json()) as { message?: string };
      if (!response.ok) {
        throw new Error(result.message ?? "We could not send your message.");
      }

      toast({
        title: "Message Sent",
        description: result.message ?? "We'll get back to you shortly to start your journey.",
      });
      reset();
    } catch (error) {
      toast({
        title: "Message Not Sent",
        description: error instanceof Error ? error.message : "Please try again shortly.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full flex flex-col min-h-[100dvh] pt-24 bg-[#0a0a0a]">
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <Reveal className="mb-16 text-center">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-7xl font-bold uppercase text-white mb-4">
              Get In <span className="text-primary">Touch</span>
            </h1>
            <p className="text-lg text-gray-400">
              Ready to join or have a question? Drop us a line or visit the Temple.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            
            {/* Contact Info */}
            <Reveal direction="right">
              <div className="space-y-12">
                <div>
                  <h2 className="font-heading text-3xl font-bold uppercase text-white mb-6 border-b border-white/10 pb-4">
                    Contact Details
                  </h2>
                  <address className="not-italic space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-heading uppercase tracking-widest text-white mb-1">Location</p>
                        <p className="text-gray-400">Near Bus Stand, Main Market, Pundri, Haryana 136026, India</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-heading uppercase tracking-widest text-white mb-1">Phone</p>
                        <a href="tel:+917206060744" className="text-gray-400 text-lg hover:text-primary transition-colors">7206060744</a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-heading uppercase tracking-widest text-white mb-1">Email</p>
                        <a href="mailto:krrishai0916@gmail.com" className="text-gray-400 break-all hover:text-primary transition-colors">krrishai0916@gmail.com</a>
                      </div>
                    </div>
                  </address>
                </div>

                <div>
                  <h2 className="font-heading text-3xl font-bold uppercase text-white mb-6 border-b border-white/10 pb-4">
                    Gym Hours
                  </h2>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="flex justify-between w-48 max-w-full mb-2">
                        <span className="text-gray-400">Mon - Sat</span>
                        <span className="text-white font-medium">5:00 AM - 10:00 PM</span>
                      </div>
                      <div className="flex justify-between w-48 max-w-full">
                        <span className="text-gray-400">Sunday</span>
                        <span className="text-primary font-medium">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal direction="left">
              <div className="bg-[#111] p-8 md:p-10 border border-white/5">
                <h2 className="font-heading text-3xl font-bold uppercase text-white mb-8">
                  Send a Message
                </h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-heading">Your Name</label>
                    <input 
                      id="contact-name"
                      {...register("name")}
                      className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
                      placeholder="John Doe"
                      autoComplete="name"
                    />
                    {errors.name && <span className="text-destructive text-sm mt-1 block" role="alert">{errors.name.message}</span>}
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-heading">Phone Number</label>
                    <input 
                      id="contact-phone"
                      {...register("phone")}
                      type="tel"
                      className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
                      placeholder="7206060744"
                      autoComplete="tel"
                    />
                    {errors.phone && <span className="text-destructive text-sm mt-1 block" role="alert">{errors.phone.message}</span>}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-heading">Email Address</label>
                    <input
                      id="contact-email"
                      type="email"
                      {...register("email")}
                      className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors"
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                    {errors.email && <span className="text-destructive text-sm mt-1 block" role="alert">{errors.email.message}</span>}
                  </div>

                  <div>
                    <label htmlFor="contact-interest" className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-heading">I'm interested in</label>
                    <select 
                      id="contact-interest"
                      {...register("interest")}
                      className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors appearance-none"
                    >
                      <option value="">Select an option</option>
                      <option value="membership">General Membership</option>
                      <option value="pt">Personal Training</option>
                      <option value="crossfit">CrossFit</option>
                      <option value="zumba">Zumba &amp; Dance</option>
                    </select>
                    {errors.interest && <span className="text-destructive text-sm mt-1 block" role="alert">{errors.interest.message}</span>}
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs uppercase tracking-widest text-gray-500 mb-2 font-heading">Message (Optional)</label>
                    <textarea 
                      id="contact-message"
                      {...register("message")}
                      rows={4}
                      className="w-full bg-[#0a0a0a] border border-white/10 px-4 py-3 text-white focus:border-primary focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your fitness goals..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-black font-heading text-xl uppercase tracking-widest py-4 flex items-center justify-center gap-2 hover:bg-white transition-colors disabled:opacity-70"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {isSubmitting ? "Sending..." : (
                      <>Send Message <Send className="w-5 h-5" /></>
                    )}
                  </motion.button>
                </form>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* Map Embed */}
      <section className="h-[400px] w-full mt-10 border-t border-white/10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3465.0!2d76.5411!3d29.7571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390e0c001c233c09%3A0xc0fb1b635f7eb80a!2sPundri%2C+Haryana+136026!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Map showing Fitness Temple Gym location in Pundri, Haryana"
        />
      </section>
    </div>
  );
}
