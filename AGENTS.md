# AGENT.md - Règles de développement

> **📋 Contexte du projet** : Pour comprendre le contexte complet, les objectifs et les requirements du projet, consultez le fichier `PRD.md`.

---

## 🎯 Principes fondamentaux

### Setup commands

- Install deps: `pnpm install`
- Start dev server: `pnpm dev`
- Build: `pnpm build`
- Start production server: `pnpm start`

### Code sans commentaires

- **INTERDICTION ABSOLUE** : Aucun commentaire dans le code produit
- Le code doit être auto-documenté via des noms explicites
- Utiliser des noms de variables, fonctions et composants descriptifs
- Si le code nécessite un commentaire, il doit être refactoré

### Philosophie du code

- **Minimaliste** : Écrire le minimum de code nécessaire
- **Explicite** : Préférer la clarté à la concision excessive
- **DRY** : Don't Repeat Yourself - factoriser systématiquement
- **KISS** : Keep It Simple, Stupid - éviter la sur-ingénierie
- **YAGNI** : You Aren't Gonna Need It - ne pas anticiper les besoins futurs

---

## 📐 Standards TypeScript

### Typage strict

```typescript
// tsconfig.json doit avoir
{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks": true,
  "strictFunctionTypes": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true
}
```

### Règles de typage

**OBLIGATOIRE** :

- Typer toutes les fonctions (paramètres et retour)
- Typer toutes les props de composants
- Typer tous les états (useState, useReducer)
- Typer toutes les réponses API
- Utiliser des interfaces pour les objets complexes
- Utiliser des types pour les unions et intersections

**INTERDIT** :

- `any` (sauf cas exceptionnel justifié)
- `@ts-ignore` ou `@ts-expect-error`
- Typage implicite
- Type casting non justifié (`as`)

**EXEMPLES** :

```typescript
interface ButtonProps {
  variant: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant,
  size = "md",
  onClick,
  disabled = false,
  children,
}: ButtonProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={getButtonClasses(variant, size)}
    >
      {children}
    </button>
  );
}
```

### Types vs Interfaces

- **Interface** : Pour les props de composants et objets extensibles
- **Type** : Pour les unions, intersections, utilitaires

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

type UserRole = "admin" | "user" | "guest";
type UserWithRole = User & { role: UserRole };
```

---

## ⚛️ Standards React / Next.js

### Structure des composants

**OBLIGATOIRE** :

- Composants fonctionnels uniquement (pas de classes)
- Un composant = un fichier
- Nommage PascalCase pour les composants
- Export nommé pour les composants réutilisables
- Export par défaut pour les pages Next.js
- Utiliser `export default function` pour tous les composants (sauf les pages Next.js qui sont déjà exportées par défaut).

**ORDRE DANS LE COMPOSANT** :

1. Imports
2. Types/Interfaces
3. Constantes du composant
4. Composant principal
5. Sous-composants (si petits et locaux)
6. Exports

```typescript
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ContactFormProps {
  onSubmit: (data: FormData) => Promise<void>;
}

interface FormData {
  name: string;
  email: string;
}

export function ContactForm({ onSubmit }: ContactFormProps): JSX.Element {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    await onSubmit({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
    });

    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" required />
      <input type="email" name="email" required />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Envoi..." : "Envoyer"}
      </Button>
    </form>
  );
}
```

### Hooks

**RÈGLES** :

- Hooks en début de composant (après les déclarations)
- Hooks conditionnels interdits
- Créer des hooks custom pour logique réutilisable
- Préfixer les hooks custom par `use`

```typescript
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    return () => observer.disconnect();
  }, []);

  return isVisible;
}
```

### Server vs Client Components (Next.js App Router)

**SERVER COMPONENTS (par défaut)** :

- Pas d'interactivité
- Pas de hooks (useState, useEffect, etc.)
- Accès direct à la base de données / API
- Meilleure performance

**CLIENT COMPONENTS** :

- Directive `'use client'` en première ligne
- Interactivité requise
- Hooks React
- Event handlers

```typescript
"use client";

import { useState } from "react";

export function Counter(): JSX.Element {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

---

## 🎨 Standards Tailwind CSS

### Principes

**OBLIGATOIRE** :

- Utiliser uniquement les classes utilitaires Tailwind
- Pas de CSS custom sauf cas exceptionnels
- Responsive-first (mobile d'abord)
- Grouper les classes par catégorie

**ORDRE DES CLASSES** :

1. Layout (flex, grid, display)
2. Spacing (p-, m-)
3. Sizing (w-, h-)
4. Typography (text-, font-)
5. Colors (bg-, text-)
6. Borders (border-, rounded-)
7. Effects (shadow-, opacity-)
8. Transitions/Animations
9. Responsive variants (md:, lg:)
10. States (hover:, focus:)

```typescript
<button
  className="
    flex items-center justify-center
    px-6 py-3
    w-full
    text-base font-semibold
    bg-blue-600 text-white
    rounded-lg
    shadow-md
    transition-all duration-300
    hover:bg-blue-700 hover:shadow-lg
    focus:outline-none focus:ring-2 focus:ring-blue-500
    disabled:opacity-50 disabled:cursor-not-allowed
    md:w-auto
  "
>
  Click me
</button>
```

### Responsive design

**BREAKPOINTS** :

- Mobile first : styles par défaut = mobile
- `sm:` (640px) : Small tablets
- `md:` (768px) : Tablets
- `lg:` (1024px) : Desktop
- `xl:` (1280px) : Large desktop

```typescript
<div className="
  grid grid-cols-1 gap-4
  md:grid-cols-2 md:gap-6
  lg:grid-cols-3 lg:gap-8
">
```

### Utilisation de clsx / cn

**OBLIGATOIRE** : Utiliser la fonction `cn` (de lib/utils) pour les classes conditionnelles

```typescript
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant: "primary" | "secondary";
  isActive?: boolean;
}

function Button({ variant, isActive }: ButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-lg transition-colors",
        variant === "primary" && "bg-blue-600 text-white hover:bg-blue-700",
        variant === "secondary" &&
          "bg-gray-200 text-gray-900 hover:bg-gray-300",
        isActive && "ring-2 ring-blue-500"
      )}
    />
  );
}
```

---

## 🛡️ Sécurité

### Validation des données

**OBLIGATOIRE** :

- Valider toutes les entrées utilisateur
- Valider côté client ET serveur
- Utiliser Zod pour les schémas de validation
- Sanitiser les données avant affichage

```typescript
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^[0-9]{10}$/),
  message: z.string().min(10).max(1000),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export async function validateContactForm(
  data: unknown
): Promise<ContactFormData> {
  return contactFormSchema.parse(data);
}
```

### Protection XSS

**OBLIGATOIRE** :

- Ne jamais utiliser `dangerouslySetInnerHTML` sauf cas justifié
- Échapper les données utilisateur
- Utiliser des composants React (échappement automatique)

**INTERDIT** :

```typescript
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

**AUTORISÉ** :

```typescript
<div>{userInput}</div>
```

### API Routes

**OBLIGATOIRE** :

- Valider les méthodes HTTP
- Valider et sanitiser les données
- Rate limiting
- CORS approprié
- Gestion des erreurs sécurisée (pas de stack traces en prod)

```typescript
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const requestSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const validatedData = requestSchema.parse(body);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
```

### Variables d'environnement

**OBLIGATOIRE** :

- Préfixer les variables publiques par `NEXT_PUBLIC_`
- Ne JAMAIS exposer de secrets côté client
- Valider les variables au démarrage

```typescript
const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  DATABASE_URL: z.string(),
  API_SECRET: z.string().min(32),
});

const env = envSchema.parse(process.env);

export default env;
```

---

## 📊 Performance

### Images

**OBLIGATOIRE** :

- Utiliser `next/image` pour toutes les images
- Définir `width` et `height` ou `fill`
- Utiliser `priority` pour images above-the-fold
- Format WebP avec fallback
- Lazy loading par défaut

```typescript
import Image from "next/image";

<Image
  src="/team-photo.jpg"
  alt="Notre équipe d'électriciens"
  width={1200}
  height={800}
  quality={85}
  priority
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>;
```

### Code splitting

**OBLIGATOIRE** :

- Dynamic imports pour composants lourds
- Lazy loading des routes
- Suspense boundaries

```typescript
import dynamic from "next/dynamic";
import { Suspense } from "react";

const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <LoadingSpinner />,
  ssr: false,
});

function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### Optimisations React

**OBLIGATOIRE** :

- `useMemo` pour calculs coûteux
- `useCallback` pour fonctions passées en props
- `React.memo` pour composants purs et lourds
- Éviter les re-renders inutiles

```typescript
import { useMemo, useCallback, memo } from "react";

interface ListProps {
  items: Item[];
  onItemClick: (id: string) => void;
}

export const List = memo(function List({ items, onItemClick }: ListProps) {
  const sortedItems = useMemo(
    () => items.sort((a, b) => a.name.localeCompare(b.name)),
    [items]
  );

  const handleClick = useCallback(
    (id: string) => onItemClick(id),
    [onItemClick]
  );

  return (
    <ul>
      {sortedItems.map((item) => (
        <li key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
});
```

### Fonts

**OBLIGATOIRE** :

- Utiliser `next/font` pour l'optimisation
- Précharger les fonts critiques
- Utiliser `font-display: swap`

```typescript
import { Inter } from "next/font/inter";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

---

## 🎬 Animations

### Framer Motion

**RÈGLES** :

- Utiliser pour animations React déclaratives
- Préférer `motion` components
- Variants pour animations complexes
- `layoutId` pour shared layout animations

```typescript
import { motion } from "framer-motion";

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function Card() {
  return (
    <motion.div
      variants={fadeInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="bg-white p-6 rounded-lg"
    >
      Content
    </motion.div>
  );
}
```

### GSAP

**RÈGLES** :

- Utiliser pour animations complexes et scroll-based
- ScrollTrigger pour animations au scroll
- Cleanup dans useEffect return
- GPU acceleration (`force3D: true`)

```typescript
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function AnimatedSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      <div className="card">Card 1</div>
      <div className="card">Card 2</div>
    </div>
  );
}
```

### Lenis

**RÈGLES** :

- Initialiser une seule fois dans layout
- Smooth scroll sur toute la page
- Intégrer avec GSAP ScrollTrigger

```typescript
"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, []);

  return <>{children}</>;
}
```

### Performance des animations

**OBLIGATOIRE** :

- Animer uniquement `transform` et `opacity`
- Éviter animations sur `width`, `height`, `top`, `left`
- `will-change` avec parcimonie
- Respecter `prefers-reduced-motion`

```typescript
import { motion } from "framer-motion";

export function AccessibleAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      style={{
        "@media (prefers-reduced-motion: reduce)": {
          animation: "none",
          transition: "none",
        },
      }}
    >
      Content
    </motion.div>
  );
}
```

---

## 🧩 Architecture et organisation

### Structure de dossiers

```
/src
├── /app
│   ├── layout.tsx
│   ├── page.tsx
│   ├── /prestations
│   │   └── page.tsx
│   └── /api
│       └── /contact
│           └── route.ts
├── /components
│   ├── /ui (ShadcN components)
│   ├── /layout (Header, Footer, etc.)
│   ├── /sections (Hero, Services, etc.)
│   └── /forms
├── /lib
│   ├── utils.ts
│   ├── validations.ts
│   └── constants.ts
├── /hooks
│   ├── useSmoothScroll.ts
│   └── useScrollAnimation.ts
└── /types
    └── index.ts
```

### Nommage

**FICHIERS** :

- Composants : PascalCase (`ContactForm.tsx`)
- Utilitaires : camelCase (`formatPhone.ts`)
- Constantes : camelCase (`constants.ts`)
- Types : camelCase (`types.ts`)

**VARIABLES/FONCTIONS** :

- camelCase pour tout
- Descriptif et explicite
- Verbe pour les fonctions (`handleClick`, `fetchUser`)
- Booléens préfixés (`isLoading`, `hasError`, `canSubmit`)

```typescript
const isFormValid = true;
const userList = [];
const maxRetries = 3;

function calculateTotal(items: Item[]): number {}
function handleSubmit(e: FormEvent): void {}
```

### Constantes

**OBLIGATOIRE** :

- Extraire les valeurs magiques
- Grouper par domaine
- UPPER_SNAKE_CASE pour constantes primitives
- camelCase pour objets de configuration

```typescript
export const PHONE_NUMBER = "0412345678";
export const EMERGENCY_NUMBER = "0698765432";
export const MAX_MESSAGE_LENGTH = 1000;

export const serviceTypes = [
  { value: "depannage", label: "Dépannage" },
  { value: "installation", label: "Installation" },
  { value: "mise-aux-normes", label: "Mise aux normes" },
] as const;

export const interventionZone = {
  center: "Marseille",
  radius: 50,
  cities: ["Marseille", "Aix-en-Provence", "Aubagne"],
} as const;
```

---

## ♿ Accessibilité

### Standards WCAG 2.1 AA

**OBLIGATOIRE** :

- Contraste minimum 4.5:1 (texte normal)
- Contraste minimum 3:1 (texte large)
- Navigation au clavier complète
- Focus visible
- Labels sur tous les inputs
- Alt text sur toutes les images
- Attributs ARIA appropriés

### Implémentation

```typescript
<button
  type="button"
  onClick={handleClick}
  aria-label="Ouvrir le menu"
  aria-expanded={isOpen}
  aria-controls="mobile-menu"
  className="focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <MenuIcon aria-hidden="true" />
</button>

<input
  type="email"
  id="email"
  name="email"
  aria-label="Adresse email"
  aria-required="true"
  aria-invalid={hasError}
  aria-describedby={hasError ? 'email-error' : undefined}
/>
{hasError && (
  <span id="email-error" role="alert">
    Email invalide
  </span>
)}
```

### Reduced motion

```typescript
"use client";

import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}
```

---

## 🧪 Gestion d'erreur

### Principes

**OBLIGATOIRE** :

- Try-catch pour code asynchrone
- Error boundaries pour erreurs React
- Messages d'erreur utilisateur-friendly
- Logging des erreurs (pas de console.log en prod)

### Implémentation

```typescript
async function fetchData(): Promise<Data> {
  try {
    const response = await fetch("/api/data");

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Fetch error:", error.message);
    }
    throw new Error("Unable to fetch data");
  }
}
```

### Error Boundary

```typescript
"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    console.error("Error boundary caught:", error);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-8 text-center">
            <h2 className="text-xl font-bold mb-4">Une erreur est survenue</h2>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Réessayer
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
```

---

## 📝 Formulaires

### React Hook Form + Zod

**OBLIGATOIRE** :

- React Hook Form pour gestion d'état
- Zod pour validation
- Messages d'erreur français
- Disabled pendant soumission

```typescript
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().regex(/^[0-9]{10}$/, "Numéro de téléphone invalide"),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères"),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: FormData): Promise<void> {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Submission failed");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register("name")}
          type="text"
          placeholder="Nom"
          className="w-full px-4 py-2 border rounded"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {isSubmitting ? "Envoi..." : "Envoyer"}
      </button>
    </form>
  );
}
```

---

## 🔍 SEO

### Metadata (Next.js 14+)

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Électricien Marseille | 15 ans d'expérience | Urgence 24/7",
  description:
    "Entreprise d'électricité à Marseille. Dépannage, installation, mise aux normes. 4 électriciens qualifiés. Intervention rapide.",
  keywords: [
    "électricien Marseille",
    "dépannage électrique",
    "urgence électricien",
  ],
  authors: [{ name: "Votre Entreprise" }],
  openGraph: {
    title: "Électricien Marseille",
    description: "Dépannage et installation électrique à Marseille",
    url: "https://votresite.fr",
    siteName: "Votre Entreprise",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};
```

### JSON-LD

```typescript
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Votre Entreprise Électricité",
    description: "Entreprise d'électricité à Marseille",
    telephone: "+33412345678",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Votre adresse",
      addressLocality: "Marseille",
      postalCode: "13000",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.296482,
      longitude: 5.36978,
    },
    openingHours: "Mo-Fr 08:00-18:00",
    priceRange: "€€",
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 43.296482,
        longitude: 5.36978,
      },
      geoRadius: "50000",
    },
  };
}
```
