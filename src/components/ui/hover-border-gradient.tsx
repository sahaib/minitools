"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface HoverBorderGradientProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  gradientClassName?: string;
}

export const HoverBorderGradient = React.forwardRef<
  HTMLButtonElement,
  HoverBorderGradientProps
>(({ className, gradientClassName, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative rounded-lg p-px overflow-hidden transition-all duration-300 hover:scale-105",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 transition-all duration-300 group-hover:opacity-100 opacity-75",
          gradientClassName
        )}
      />
      <div className="relative rounded-lg bg-black px-4 py-2">
        {children}
      </div>
    </button>
  );
}); 