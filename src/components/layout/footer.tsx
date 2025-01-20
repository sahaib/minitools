"use client";

import { useState } from "react";
import { ShimmerButton } from "../ui/shimmer-button";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSubscribe = async () => {
    if (!email) return;
    
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error();

      setEmail("");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    } catch (error) {
      console.error("Failed to subscribe:", error);
    }
  };

  return (
    <footer className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="flex flex-col items-center justify-center gap-6 p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center max-w-2xl">
            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-indigo-500">
              Stay in the Loop
            </h3>
            <p className="mt-4 text-neutral-400">
              Subscribe to our newsletter for updates on new tools, features, and developer resources
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-neutral-800/50 border border-neutral-700 text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500"
            />
            <ShimmerButton
              onClick={handleSubscribe}
              shimmerColor="rgba(99, 102, 241, 0.4)"
              background="rgba(99, 102, 241, 0.1)"
            >
              Subscribe
            </ShimmerButton>
          </div>
        </motion.div>

        <div className="mt-8 text-center text-neutral-500">
          <p>© {new Date().getFullYear()} Mini Tools. All rights reserved.</p>
        </div>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 flex items-center gap-2 bg-green-500/20 text-green-500 px-4 py-2 rounded-lg border border-green-500/20 shadow-lg backdrop-blur-sm"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Successfully subscribed to newsletter!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}; 