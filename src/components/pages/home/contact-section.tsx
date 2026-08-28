"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, Clock3, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { CONTACT_EMAIL } from "@/lib/site";

const formSchema = z.object({
  firstname: z.string().min(2, "Le prénom est requis"),
  lastname: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type ContactFormData = z.infer<typeof formSchema>;

interface ContactFieldProps {
  error?: string;
  id: "firstname" | "lastname" | "email";
  label: string;
  registration: UseFormRegisterReturn;
  type?: "email" | "text";
}

function ContactField({ error, id, label, registration, type = "text" }: ContactFieldProps): JSX.Element {
  const fieldErrorId = `${id}-error`;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-[#1e1e1e]">
        {label}
      </label>
      <input
        {...registration}
        id={id}
        type={type}
        aria-describedby={error ? fieldErrorId : undefined}
        aria-invalid={Boolean(error)}
        className="h-12 w-full border-b border-[#1e1e1e]/30 bg-transparent px-0 text-base text-[#1e1e1e] outline-none transition-colors placeholder:text-[#1e1e1e]/55 focus:border-[#4E6471]"
      />
      {error && <p id={fieldErrorId} role="alert" className="text-sm text-red-700">{error}</p>}
    </div>
  );
}

export default function ContactSection(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({ resolver: zodResolver(formSchema) });

  async function onSubmit(data: ContactFormData): Promise<void> {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result: { error?: string } = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Erreur lors de l'envoi");
      }

      toast.success("Message envoyé avec succès !", { description: "Je vous répondrai sous 24 heures." });
      reset();
    } catch (error: unknown) {
      console.error(error);
      toast.error("Une erreur est survenue.", {
        description: "Veuillez réessayer plus tard ou me contacter directement par email.",
      });
    }
  }

  return (
    <section id="contact" className="w-full bg-transparent py-24 text-[#1e1e1e] md:py-32">
      <div className="mx-auto w-full max-w-[1800px] px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="border-b border-[#1e1e1e]/25 pb-10 md:pb-14"
        >
          <p className="text-sm font-medium text-[#4E6471]">Prise de contact</p>
          <div className="mt-5 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-5xl font-medium leading-[0.9] tracking-[-0.035em] text-balance md:text-7xl lg:text-8xl">
                Alors <span className="font-serif font-light italic text-[#4E6471]">convaincu&nbsp;?</span>
              </h2>
              <p className="mt-5 text-2xl leading-tight tracking-[-0.02em] md:text-4xl">
                Et si on travaillait <span className="font-serif font-light italic">ensemble&nbsp;?</span>
              </p>
            </div>
            <div className="flex flex-col gap-3 text-sm text-[#1e1e1e]/80 lg:items-end">
              <div className="flex items-center gap-2">
                <Clock3 className="size-4 text-[#4E6471]" aria-hidden="true" />
                <span>Réponse sous 24 heures.</span>
              </div>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 border-b border-[#4E6471]/50 pb-1 font-medium text-[#1e1e1e] transition-colors hover:border-[#1e1e1e] hover:text-[#4E6471] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4E6471]"
              >
                <Mail className="size-4" aria-hidden="true" />
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-14 max-w-5xl space-y-10 md:mt-20 md:space-y-12">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <ContactField id="firstname" label="Prénom" registration={register("firstname")} error={errors.firstname?.message} />
            <ContactField id="lastname" label="Nom" registration={register("lastname")} error={errors.lastname?.message} />
          </div>
          <ContactField id="email" label="Adresse email" type="email" registration={register("email")} error={errors.email?.message} />
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium text-[#1e1e1e]">Votre message</label>
            <textarea
              {...register("message")}
              id="message"
              rows={5}
              aria-describedby={errors.message ? "message-error" : undefined}
              aria-invalid={Boolean(errors.message)}
              className="w-full resize-y border-b border-[#1e1e1e]/30 bg-transparent px-0 py-3 text-base leading-relaxed text-[#1e1e1e] outline-none transition-colors placeholder:text-[#1e1e1e]/55 focus:border-[#4E6471]"
            />
            {errors.message && <p id="message-error" role="alert" className="text-sm text-red-700">{errors.message.message}</p>}
          </div>
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#4E6471] px-6 text-sm font-medium text-white transition-colors hover:bg-[#3f535e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1e1e1e] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Envoi en cours…" : "Envoyer mon message"}
              {!isSubmitting && <ArrowUpRight className="size-4" aria-hidden="true" />}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
