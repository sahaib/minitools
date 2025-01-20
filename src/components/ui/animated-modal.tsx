"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const AnimatedModal: React.FC<AnimatedModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
}) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
              }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.95, 
              y: 20,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
              }
            }}
            className="fixed left-[50%] top-[50%] z-50 w-[95vw] max-w-md translate-x-[-50%] translate-y-[-50%]"
          >
            <motion.div
              className={cn(
                "overflow-hidden rounded-2xl border border-white/[0.2] bg-black/[0.8] p-8 shadow-xl backdrop-blur-xl backdrop-saturate-150",
                "before:absolute before:inset-0 before:-translate-y-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/[0.07] before:to-transparent",
                className
              )}
            >
              {children}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}; 