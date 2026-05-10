"use client";
import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "red" | "purple" | "gradient";
  glow?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, variant = "red", glow = true, ...props }, ref) => {
    const variants = {
      red: "border-red-500/20",
      purple: "border-purple-500/20", 
      gradient: "border-gradient-to-r from-red-500/20 to-purple-600/20"
    };

    const glowVariants = {
      red: "from-red-500/20 to-transparent",
      purple: "from-purple-500/20 to-transparent",
      gradient: "from-red-500/20 via-purple-600/20 to-transparent"
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative bg-black/80 backdrop-blur-sm border rounded-2xl p-8 transition-all duration-300 hover:scale-105",
          variants[variant],
          className
        )}
        whileHover={{ scale: 1.02 }}
        {...(props as any)}
      >
        {glow && (
          <div className={`absolute -inset-1 bg-gradient-to-r ${glowVariants[variant]} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`} />
        )}
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
