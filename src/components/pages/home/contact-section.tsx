"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const formSchema = z.object({
  firstname: z.string().min(2, "Le prénom est requis"),
  lastname: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    // Simulate form submission
    console.log("Form data:", data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    reset();
    alert("Message envoyé !");
  };

  return (
    <section className="w-full py-20" id="contact">
      <div className="w-full px-4 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column: Typography */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col select-none"
            >
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[0.8] text-foreground">
                Alors{" "}
                <span className="font-serif italic font-light text-[#008366] lowercase tracking-normal">
                  convaincu ?
                </span>
              </h2>
              <div className="mt-8 md:mt-12">
                <p className="text-3xl md:text-5xl lg:text-6xl font-normal leading-tight tracking-tight text-foreground">
                  et si on travaillait{" "}
                  <span className="font-serif italic font-light lowercase block md:inline mt-2 md:mt-0">
                    ensemble?
                  </span>
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Form */}
          <div className="flex flex-col justify-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-8 md:space-y-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <div className="relative group">
                  <label htmlFor="firstname" className="sr-only">
                    Prénom
                  </label>
                  <input
                    {...register("firstname")}
                    id="firstname"
                    type="text"
                    placeholder="PRENOM"
                    className="w-full bg-transparent border-b border-gray-400 py-4 text-lg outline-none focus:border-[#008366] transition-colors placeholder:text-xs placeholder:tracking-widest placeholder:text-gray-500 uppercase font-medium text-foreground"
                  />
                  {errors.firstname && (
                    <span className="absolute -bottom-6 left-0 text-xs text-red-500">
                      {errors.firstname.message}
                    </span>
                  )}
                </div>
                <div className="relative group">
                  <label htmlFor="lastname" className="sr-only">
                    Nom
                  </label>
                  <input
                    {...register("lastname")}
                    id="lastname"
                    type="text"
                    placeholder="NOM"
                    className="w-full bg-transparent border-b border-gray-400 py-4 text-lg outline-none focus:border-[#008366] transition-colors placeholder:text-xs placeholder:tracking-widest placeholder:text-gray-500 uppercase font-medium text-foreground"
                  />
                  {errors.lastname && (
                    <span className="absolute -bottom-6 left-0 text-xs text-red-500">
                      {errors.lastname.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="relative group">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="EMAIL"
                  className="w-full bg-transparent border-b border-gray-400 py-4 text-lg outline-none focus:border-[#008366] transition-colors placeholder:text-xs placeholder:tracking-widest placeholder:text-gray-500 uppercase font-medium text-foreground"
                />
                {errors.email && (
                  <span className="absolute -bottom-6 left-0 text-xs text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="relative group">
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  {...register("message")}
                  id="message"
                  placeholder="MESSAGE"
                  rows={4}
                  className="w-full bg-transparent border-b border-gray-400 py-4 text-lg outline-none focus:border-[#008366] transition-colors placeholder:text-xs placeholder:tracking-widest placeholder:text-gray-500 resize-none uppercase font-medium text-foreground"
                />
                {errors.message && (
                  <span className="absolute -bottom-6 left-0 text-xs text-red-500">
                    {errors.message.message}
                  </span>
                )}
              </div>

              <div className="pt-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "ENVOI..." : "ENVOYER"}
                  {!isSubmitting && (
                    <ArrowUpRight className="ml-2 size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
