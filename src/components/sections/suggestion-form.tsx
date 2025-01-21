"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { ShimmerButton } from "../ui/shimmer-button";

export const SuggestionForm = () => {
  const [email, setEmail] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", content: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", content: "" });

    try {
      const response = await fetch("/api/suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, suggestion }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setMessage({ type: "success", content: "Thank you for your suggestion!" });
      setEmail("");
      setSuggestion("");
    } catch (error) {
      setMessage({ 
        type: "error", 
        content: error instanceof Error ? error.message : "Failed to submit suggestion" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="px-4 py-16 relative">
      <motion.div
        className="mx-auto max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-indigo-500">
            Suggest a Tool
          </h2>
          <p className="mt-4 text-neutral-400">
            Have an idea for a tool? Let us know what you&apos;d like to see next!
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-violet-500 to-indigo-500 transform scale-[0.80] blur-3xl opacity-30" />
          <div className="relative shadow-xl bg-neutral-900/90 border border-neutral-800 backdrop-blur-sm p-8 rounded-3xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-200 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-2xl bg-neutral-800/50 border border-neutral-700",
                    "text-white placeholder-neutral-400",
                    "focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent",
                    "transition-all duration-200"
                  )}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="suggestion" className="block text-sm font-medium text-neutral-200 mb-2">
                  Your Suggestion
                </label>
                <textarea
                  id="suggestion"
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  required
                  rows={4}
                  className={cn(
                    "w-full px-4 py-3 rounded-2xl bg-neutral-800/50 border border-neutral-700",
                    "text-white placeholder-neutral-400",
                    "focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent",
                    "transition-all duration-200"
                  )}
                  placeholder="Describe the tool you'd like to see..."
                />
              </div>

              <ShimmerButton
                type="submit"
                disabled={isLoading}
                shimmerColor="rgba(99, 102, 241, 0.4)"
                background="rgba(99, 102, 241, 0.1)"
                className={cn(
                  "w-full",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "flex items-center justify-center gap-2"
                )}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Submit Suggestion
                  </>
                )}
              </ShimmerButton>

              {message.content && (
                <div
                  className={cn(
                    "p-4 rounded-2xl text-sm",
                    message.type === "success" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
                  )}
                >
                  {message.content}
                </div>
              )}
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  );
}; 