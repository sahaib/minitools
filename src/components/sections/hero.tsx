"use client";

import { TextReveal } from "../ui/text-reveal";
import { ShimmerButton } from "../ui/shimmer-button";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        <TextReveal
          text="Mini Tools"
          className="text-6xl font-bold text-white sm:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-indigo-500"
        />
        <TextReveal
          text="Developer Tools That Make Life Easier"
          className="mt-4 text-xl text-neutral-200 sm:text-2xl"
          delay={0.2}
        />
        <TextReveal
          text="Streamline your workflow with our collection of powerful developer utilities"
          className="mt-4 text-lg text-neutral-400 max-w-2xl mx-auto"
          delay={0.4}
        />
        
        <motion.div 
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <ShimmerButton
            onClick={() => {
              const toolsSection = document.getElementById("tools");
              toolsSection?.scrollIntoView({ behavior: "smooth" });
            }}
            shimmerColor="rgba(99, 102, 241, 0.4)"
            background="rgba(99, 102, 241, 0.1)"
          >
            Explore Tools
          </ShimmerButton>
          
          <a 
            href="https://github.com/sahaib"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-300 hover:text-white transition-colors flex items-center gap-2"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" clipRule="evenodd" />
            </svg>
            View on GitHub
          </a>
        </motion.div>

        <motion.div
          className="mt-16 relative p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <motion.div 
              className="relative group"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/10 to-indigo-500/10 group-hover:opacity-100 opacity-0 transition-opacity" />
              <div className="relative space-y-2">
                <h4 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-indigo-500">2+</h4>
                <p className="text-sm text-neutral-400">Tools Available</p>
              </div>
            </motion.div>

            <motion.div 
              className="relative group"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/10 to-indigo-500/10 group-hover:opacity-100 opacity-0 transition-opacity" />
              <div className="relative space-y-2">
                <h4 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-indigo-500">100%</h4>
                <p className="text-sm text-neutral-400">Free & Open Source</p>
              </div>
            </motion.div>

            <motion.div 
              className="relative group"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/10 to-indigo-500/10 group-hover:opacity-100 opacity-0 transition-opacity" />
              <div className="relative space-y-2">
                <h4 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-indigo-500">24/7</h4>
                <p className="text-sm text-neutral-400">Availability</p>
              </div>
            </motion.div>

            <motion.div 
              className="relative group"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/10 to-indigo-500/10 group-hover:opacity-100 opacity-0 transition-opacity" />
              <div className="relative space-y-2">
                <h4 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-indigo-500">Fast</h4>
                <p className="text-sm text-neutral-400">Performance</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 