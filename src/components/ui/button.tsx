import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Base glassmorphism styles inspired by Apple interfaces
const baseButtonStyles = [
  "inline-flex items-center justify-center gap-2 whitespace-nowrap",
  "rounded-3xl text-sm font-medium",
  "disabled:pointer-events-none disabled:opacity-50",
  // Smooth transitions
  "transition-all duration-300 ease-out",
  // Backdrop blur and translucent background
  "backdrop-blur-md bg-white/15 dark:bg-white/10",
  // Subtle inner/outer shadows to create a glass look
  "[box-shadow:inset_0_1px_0_rgba(255,255,255,0.35),_0_4px_12px_rgba(0,0,0,0.08)]",
  // Border with soft translucency
  "border border-white/30 dark:border-white/20",
  // Text color that stays legible on translucent background
  "text-white dark:text-white",
  // Focus ring
  "outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-0",
].join(" ");

const buttonVariants = cva(baseButtonStyles, {
  variants: {
    variant: {
      // Default is the glass button
      glass: [
        // Hover/active states increase opacity and depth
        "hover:bg-white/25 dark:hover:bg-white/15",
        "active:bg-white/30 active:[box-shadow:inset_0_1px_0_rgba(255,255,255,0.3),_0_6px_14px_rgba(0,0,0,0.12)]",
      ].join(" "),
      // Optional alternatives if needed elsewhere in the app
      ghost: "bg-transparent hover:bg-white/10 dark:hover:bg-white/5 border-transparent text-inherit",
      link: "bg-transparent border-transparent underline-offset-4 text-white hover:underline",
    },
    size: {
      default: "h-11 px-5",
      sm: "h-8 px-3 rounded-2xl",
      lg: "h-12 px-6",
      icon: "size-10 rounded-full p-0",
    },
  },
  defaultVariants: {
    variant: "glass",
    size: "default",
  },
});

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {props.children}
    </Comp>
  );
}

export { Button, buttonVariants };
