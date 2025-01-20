"use client";

import { cn } from "@/lib/utils";
import { Terminal } from "lucide-react";
import Link from "next/link";
import { Typewriter } from "../ui/typewriter";

export const Navbar = () => {
  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2",
      "backdrop-blur-md bg-black/50"
    )}>
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-blue-500/10">
          <Terminal className="w-6 h-6 text-blue-500" />
        </div>
        <Link href="/" className={cn("text-white text-xl font-bold")}>
          <Typewriter text="minitools.dev" className="text-xl font-bold" />
        </Link>
      </div>
      
      <div className={cn("flex items-center gap-4")}>
        <Link
          href="https://x.com/imsahaib"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "text-neutral-300 hover:text-white transition-colors"
          )}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </Link>
      </div>
    </nav>
  );
}; 