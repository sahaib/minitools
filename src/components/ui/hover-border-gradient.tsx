"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface HoverBorderGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  containerClassName?: string;
  as?: React.ElementType;
  children: React.ReactNode;
}

export const HoverBorderGradient = React.forwardRef<HTMLDivElement, HoverBorderGradientProps>(
  ({ className, containerClassName, as: Component = "div", children, ...props }, ref) => {
    return (
      <div className={cn("group relative rounded-lg p-[1px] hover:cursor-pointer", containerClassName)}>
        <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 opacity-0 blur transition duration-500 group-hover:opacity-75" />
        <Component
          ref={ref}
          className={cn("relative rounded-lg bg-black px-8 py-4", className)}
          {...props}
        >
          {children}
        </Component>
      </div>
    );
  }
);

HoverBorderGradient.displayName = "HoverBorderGradient";