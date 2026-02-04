"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

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
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de l'envoi");
      }

      toast.success("Message envoyé avec succès !", {
        description: "Je vous répondrai dans les plus brefs délais.",
      });
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue.", {
        description:
          "Veuillez réessayer plus tard ou me contacter directement par email.",
      });
    }
  };

  return (
    <section className="w-full py-16 md:py-24 bg-transparent text-black" id="contact">
      <div className="w-full px-6 md:px-12 lg:px-16">
        {/* Header Centré */}
        <div className="flex flex-col justify-center text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col select-none items-center"
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[0.9] md:leading-[0.8] text-black">
              Alors{" "}
              <span className="font-serif italic font-light text-[#008366] lowercase tracking-normal block md:inline">
                convaincu ?
              </span>
            </h2>
            <div className="mt-6 md:mt-12">
              <p className="text-2xl md:text-5xl lg:text-6xl font-normal leading-tight tracking-tight text-black">
                et si on travaillait{" "}
                <span className="font-serif italic font-light lowercase block md:inline mt-1 md:mt-0">
                  ensemble?
                </span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Formulaire Centré */}
        <div className="w-full max-w-4xl mx-auto">
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
                  className="w-full bg-transparent border-b border-gray-400 py-4 text-lg outline-none focus:border-[#008366] transition-colors placeholder:text-xs placeholder:tracking-widest placeholder:text-gray-500 uppercase font-medium text-black text-center"
                />
                {errors.firstname && (
                  <span className="absolute -bottom-6 left-0 right-0 text-center text-xs text-red-500">
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
                  className="w-full bg-transparent border-b border-gray-400 py-4 text-lg outline-none focus:border-[#008366] transition-colors placeholder:text-xs placeholder:tracking-widest placeholder:text-gray-500 uppercase font-medium text-black text-center"
                />
                {errors.lastname && (
                  <span className="absolute -bottom-6 left-0 right-0 text-center text-xs text-red-500">
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
                className="w-full bg-transparent border-b border-gray-400 py-4 text-lg outline-none focus:border-[#008366] transition-colors placeholder:text-xs placeholder:tracking-widest placeholder:text-gray-500 uppercase font-medium text-black text-center"
              />
              {errors.email && (
                <span className="absolute -bottom-6 left-0 right-0 text-center text-xs text-red-500">
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
                className="w-full bg-transparent border-b border-gray-400 py-4 text-lg outline-none focus:border-[#008366] transition-colors placeholder:text-xs placeholder:tracking-widest placeholder:text-gray-500 resize-none uppercase font-medium text-black text-center"
              />
              {errors.message && (
                <span className="absolute -bottom-6 left-0 right-0 text-center text-xs text-red-500">
                  {errors.message.message}
                </span>
              )}
            </div>

            <div className="pt-8 flex justify-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="rounded-full px-12 py-6 text-lg transition-colors"
              >
                {isSubmitting ? "ENVOI..." : "ENVOYER"}
                {!isSubmitting && (
                  <ArrowUpRight className="ml-2 size-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
