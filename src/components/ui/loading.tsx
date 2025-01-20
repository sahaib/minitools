"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LoadingProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Loading: React.FC<LoadingProps> = ({
  className,
  size = "md",
}) => {
  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "h-4 w-4 border-2";
      case "lg":
        return "h-8 w-8 border-4";
      default:
        return "h-6 w-6 border-3";
    }
  };

  return (
    <motion.div
      className={cn(
        "relative flex items-center justify-center",
        className
      )}
    >
      <motion.div
        className={cn(
          "animate-spin rounded-full border-t-violet-600 border-r-transparent border-b-violet-600 border-l-transparent",
          getSizeClass()
        )}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}; 