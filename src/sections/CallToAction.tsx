"use client";
import { motion, useAnimate, AnimationPlaybackControls } from "framer-motion";
import { useEffect, useState } from "react";

export default function CallToAction() {
  const [isHovered, setIsHovered] = useState(false);
  const [scope, animate] = useAnimate();

  const [animation, setAnimation] = useState<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    const startAnimation = async () => {
      const controls = await animate(
        scope.current,
        { x: "-50%" },
        { duration: 28, ease: "linear", repeat: Infinity }
      );
      setAnimation(controls);
    };
    startAnimation();
  }, [animate, scope]);

  useEffect(() => {
    if (animation) {
      animation.speed = isHovered ? 0.35 : 1;
    }
  }, [isHovered, animation]);

  return (
    <section className="py-24" id="cta">
      <div className="flex overflow-x-clip p-4">
        <motion.div
          ref={scope}
          className="flex flex-none gap-16 pr-16 font-display text-6xl font-semibold uppercase tracking-tight text-white md:text-7xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-center gap-10">
              <span className="text-5xl text-accent-400 md:text-6xl">*</span>
              <span className="transition duration-300 hover:text-accent-200">Launch your OrbitFlow control room</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
