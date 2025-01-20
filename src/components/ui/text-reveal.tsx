"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation, Variants } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

const textVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    rotateX: 90,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
  },
};

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  className,
  delay = 0,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <div ref={ref} className={className} style={{ perspective: "1000px" }}>
      <motion.div
        variants={textVariants}
        initial="hidden"
        animate={controls}
        transition={{
          duration: 1,
          delay,
          ease: [0.2, 0.65, 0.3, 0.9],
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {text}
      </motion.div>
    </div>
  );
}; 