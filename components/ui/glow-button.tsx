"use client";
import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "red" | "purple" | "gradient" | "outline";
  size?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
  asChild?: boolean;
}

const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, variant = "gradient", size = "lg", children, asChild = false, ...props }, ref) => {
    const baseClasses = "relative inline-flex items-center justify-center rounded-xl font-bold tracking-wide transition-all duration-300 overflow-hidden group";
    
    const variants = {
      red: "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white border-0",
      purple: "bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white border-0",
      gradient: "bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white border-0",
      outline: "border border-red-500/50 hover:border-red-400 hover:bg-red-950/30 text-white"
    };

    const sizes = {
      sm: "px-6 py-2 text-sm",
      md: "px-8 py-3 text-base",
      lg: "px-10 py-4 text-lg",
      xl: "px-16 py-8 text-xl"
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          "hover:scale-105 hover:shadow-2xl hover:shadow-red-500/30",
          className
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        {...(props as any)}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }
);

GlowButton.displayName = "GlowButton";

export { GlowButton };
