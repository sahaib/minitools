"use client";

import { PinContainer } from "../ui/tool-pin";
import { motion } from "framer-motion";
import { Network, Database, Sparkles } from "lucide-react";

export const Tools = () => {
  return (
    <section id="tools" className="px-4 py-16">
      <motion.div 
        className="mx-auto max-w-7xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-indigo-500">
            Our Tools
          </h2>
          <p className="mt-4 text-neutral-400">
            A collection of developer tools to help streamline your workflow
          </p>
        </div>

        <div className="relative p-8 rounded-3xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="relative">
              <PinContainer
                title="IP Index"
                href="https://ipindex.sahaibsingh.com"
              >
                <div className="w-80">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-violet-500/10">
                      <Network className="w-6 h-6 text-violet-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">IP Index</h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-neutral-400">A comprehensive IP address lookup and analysis tool that provides detailed information about any IP address.</p>
                    <ul className="space-y-2 text-sm text-neutral-400">
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-violet-500"></span>
                        Geolocation data and mapping
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-violet-500"></span>
                        Network and security analysis
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-violet-500"></span>
                        Real-time threat detection
                      </li>
                    </ul>
                  </div>
                </div>
              </PinContainer>
            </div>

            <div className="relative">
              <PinContainer
                title="DNS Index"
                href="https://dns-index.sahaibsingh.com"
              >
                <div className="w-80">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-indigo-500/10">
                      <Database className="w-6 h-6 text-indigo-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">DNS Index</h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-neutral-400">DNS lookup and analysis tool for comprehensive domain name system insights.</p>
                    <ul className="space-y-2 text-sm text-neutral-400">
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-indigo-500"></span>
                        Complete DNS record analysis
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-indigo-500"></span>
                        Propagation checking tools
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-indigo-500"></span>
                        Domain health monitoring
                      </li>
                    </ul>
                  </div>
                </div>
              </PinContainer>
            </div>

            <div className="relative">
              <PinContainer
                title="Coming Soon"
                href=""
              >
                <div className="w-80">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-pink-500/10">
                      <Sparkles className="w-6 h-6 text-pink-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Coming Soon</h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-neutral-400">More exciting tools are on the way. Stay tuned for our upcoming releases!</p>
                    <ul className="space-y-2 text-sm text-neutral-400">
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-pink-500"></span>
                        Advanced monitoring tools
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-pink-500"></span>
                        Performance optimization
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-pink-500"></span>
                        Security enhancement suite
                      </li>
                    </ul>
                  </div>
                </div>
              </PinContainer>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}; 