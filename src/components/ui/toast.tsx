"use client";

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ToastProps {
  title: string;
  description?: string;
  type?: "success" | "error" | "info";
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const Toast: React.FC<ToastProps> = ({
  title,
  description,
  type = "info",
  open,
  onOpenChange,
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-600";
      case "error":
        return "bg-red-600";
      default:
        return "bg-violet-600";
    }
  };

  return (
    <ToastPrimitives.Provider>
      <ToastPrimitives.Root
        open={open}
        onOpenChange={onOpenChange}
        asChild
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={cn(
            "fixed bottom-4 right-4 z-50 rounded-lg p-4 shadow-lg",
            getTypeStyles()
          )}
        >
          <ToastPrimitives.Title className="text-sm font-medium text-white">
            {title}
          </ToastPrimitives.Title>
          {description && (
            <ToastPrimitives.Description className="mt-1 text-sm text-white/80">
              {description}
            </ToastPrimitives.Description>
          )}
        </motion.div>
      </ToastPrimitives.Root>
      <ToastPrimitives.Viewport />
    </ToastPrimitives.Provider>
  );
}; 