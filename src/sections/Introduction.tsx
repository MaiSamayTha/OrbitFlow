"use client";
import Tag from "@/components/Tag";
import { useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const text = `Status updates, scattered feedback, and weekly asset hunts keep product teams stuck in the weeds. OrbitFlow untangles the chaos with automation that stays out of the way.`;
const words = text.split(" ");

export default function Introduction() {
    const scrollTarget = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: scrollTarget, offset: ["start end", "end end"] });

    const [currentWord, setCurrentWord] = useState(0);

    const wordIndex = useTransform(scrollYProgress, [0, 1], [0, words.length]);

    useEffect(() => {
        wordIndex.on("change", (latest) => {
            setCurrentWord(latest);
        });
    }, [wordIndex]);

    return (
        <section className="py-28 lg:py-40">
            <div className="container">
                <div className="sticky top-24 md:top-32">
                    <div className="flex justify-center">
                        <Tag>Why OrbitFlow</Tag>
                    </div>
                    <div className="mt-10 text-center font-display text-4xl font-semibold leading-tight text-white md:text-6xl lg:text-7xl">
                        <span className="block text-white/70">your team deserves better than busywork.</span>
                        <span className="mt-3 block">
                            {words.map((word, wordIndex) => (
                                <span
                                    className={twMerge(
                                        "transition duration-500 text-white/15",
                                        wordIndex < currentWord && "text-white"
                                    )}
                                    key={wordIndex}
                                >{`${word} `}</span>
                            ))}
                        </span>
                        <span className="mt-6 block text-base uppercase tracking-[0.35em] text-brand-200">
                            built for velocity, not vanity metrics
                        </span>
                    </div>
                </div>

                <div className="h-[150vh]" ref={scrollTarget}></div>
            </div>
        </section>
    );
}
