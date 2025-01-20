"use client";

import { useState } from "react";
import { Github, Twitter } from "lucide-react";
import { AnimatedModal } from "../ui/animated-modal";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { Loading } from "../ui/loading";
import { Toast } from "../ui/toast";

type ToastType = "success" | "error" | "info";

export const Navbar = () => {
  const [isGithubModalOpen, setIsGithubModalOpen] = useState(false);
  const [isTwitterModalOpen, setIsTwitterModalOpen] = useState(false);
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastState, setToastState] = useState<{
    open: boolean;
    title: string;
    type: ToastType;
  }>({
    open: false,
    title: "",
    type: "info",
  });

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get("email") as string;

    if (!email) {
      setToastState({
        open: true,
        title: "Please enter your email",
        type: "error",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("Subscription failed");

      setToastState({
        open: true,
        title: "Successfully subscribed!",
        type: "success",
      });
      setIsNewsletterModalOpen(false);
      form.reset();
    } catch (error) {
      setToastState({
        open: true,
        title: "Failed to subscribe",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <a href="https://github.com/sahaib" target="_blank" rel="noopener noreferrer">
            <svg className="w-6 h-6 text-neutral-400 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="https://twitter.com/imsahaib" target="_blank" rel="noopener noreferrer">
            <svg className="w-6 h-6 text-neutral-400 hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
        </div>
      </nav>
    </header>
  );
}; 