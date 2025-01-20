"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypewriterProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  className?: string;
  cursor?: boolean;
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenLoops?: number;
}

export const Typewriter = React.forwardRef<HTMLDivElement, TypewriterProps>(
  ({ 
    text, 
    className, 
    cursor = true, 
    typingSpeed = 100,
    deletingSpeed = 50,
    delayBetweenLoops = 2000,
    ...props 
  }, ref) => {
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
      let timeout: NodeJS.Timeout;

      if (!isDeleting) {
        if (displayText.length < text.length) {
          timeout = setTimeout(() => {
            setDisplayText(text.slice(0, displayText.length + 1));
          }, typingSpeed);
        } else {
          timeout = setTimeout(() => {
            setIsDeleting(true);
          }, delayBetweenLoops);
        }
      }

      if (isDeleting) {
        if (displayText.length > 0) {
          timeout = setTimeout(() => {
            setDisplayText(text.slice(0, displayText.length - 1));
          }, deletingSpeed);
        } else {
          setIsDeleting(false);
        }
      }

      return () => clearTimeout(timeout);
    }, [displayText, isDeleting, text, typingSpeed, deletingSpeed, delayBetweenLoops]);

    return (
      <div 
        ref={ref} 
        className={cn("font-mono", className)} 
        {...props}
      >
        {displayText}
        {cursor && (
          <span className="animate-pulse">_</span>
        )}
      </div>
    );
  }
);

Typewriter.displayName = "Typewriter"; 