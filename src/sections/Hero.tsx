"use client";
import Button from "@/components/Button";
import designExample1Image from "@/assets/images/design-example-1.png";
import designExample2Image from "@/assets/images/design-example-2.png";
import Image from "next/image";
import Pointer from "@/components/Pointer";
import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";
import cursorYouImage from "@/assets/images/cursor-you.svg";

export default function Hero() {
    const [leftDesignScope, leftDesignAnimate] = useAnimate();
    const [leftPointerScope, leftPointerAnimate] = useAnimate();
    const [rightDesignScope, rightDesignAnimate] = useAnimate();
    const [rightPointerScope, rightPointerAnimate] = useAnimate();

    useEffect(() => {
        leftDesignAnimate([
            [leftDesignScope.current, { opacity: [0, 1] }, { duration: 0.5 }],
            [leftDesignScope.current, { y: 0, x: 0 }, { duration: 0.5 }],
        ]);

        leftPointerAnimate([
            [leftPointerScope.current, { opacity: 1 }, { duration: 0.5 }],
            [leftPointerScope.current, { y: 0, x: -120 }, { duration: 0.5 }],
            [leftPointerScope.current, { x: 0, y: [0, 18, 0] }, { duration: 0.6, ease: "easeInOut" }],
        ]);

        rightDesignAnimate([
            [rightDesignScope.current, { opacity: 1 }, { duration: 0.5, delay: 1.2 }],
            [rightDesignScope.current, { y: 0, x: 0 }, { duration: 0.5 }],
        ]);

        rightPointerAnimate([
            [rightPointerScope.current, { opacity: 1 }, { duration: 0.5, delay: 1.2 }],
            [rightPointerScope.current, { x: 160, y: 0 }, { duration: 0.5 }],
            [rightPointerScope.current, { x: 0, y: [0, 22, 0] }, { duration: 0.6 }],
        ]);
    }, [
        leftPointerAnimate,
        rightPointerAnimate,
        leftPointerScope,
        rightPointerScope,
        leftDesignAnimate,
        leftDesignScope,
        rightDesignAnimate,
        rightDesignScope,
    ]);

    return (
        <section
            className="relative overflow-x-clip pb-24 pt-20 md:pt-28"
            style={{
                cursor: `url(${cursorYouImage.src}),auto`,
            }}
        >
            <div className="container relative">
                <motion.div
                    ref={leftDesignScope}
                    initial={{ opacity: 0, y: 80, x: -120 }}
                    drag
                    className="absolute -left-36 top-16 hidden lg:block"
                >
                    <Image src={designExample1Image} alt="OrbitFlow dashboard mockup" draggable="false" />
                </motion.div>
                <motion.div
                    ref={leftPointerScope}
                    initial={{ opacity: 0, y: 120, x: -220 }}
                    className="absolute left-40 top-96 hidden lg:block"
                >
                    <Pointer name="nova" color="blue" />
                </motion.div>
                <motion.div
                    ref={rightDesignScope}
                    initial={{ opacity: 0, x: 160, y: 120 }}
                    drag
                    className="absolute -right-64 -top-10 hidden lg:block"
                >
                    <Image src={designExample2Image} alt="Team collaboration preview" draggable="false" />
                </motion.div>
                <motion.div
                    ref={rightPointerScope}
                    initial={{ opacity: 0, x: 220, y: 120 }}
                    className="absolute right-72 top-0 hidden lg:block"
                >
                    <Pointer name="atlas" color="red" />
                </motion.div>
                <div className="flex justify-center">
                    <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70 shadow-glass backdrop-blur">
                        <span className="inline-flex h-2 w-2 rounded-full bg-accent-400" />
                        OrbitFlow oversubscribed pre-Series A
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/60">
                            $9.1M raised
                        </span>
                    </div>
                </div>
                <h1 className="mt-8 text-center font-display text-5xl font-semibold leading-[1.08] tracking-tight text-white md:text-6xl lg:text-7xl">
                    Orchestrate your design operations with an autonomous co-pilot
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-white/65 md:text-xl">
                    OrbitFlow syncs strategy, collaboration, and delivery into a single canvas so your product
                    team can ship purposeful experiences days faster without the busywork.
                </p>
                <form className="mx-auto mt-10 flex w-full max-w-xl flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-sm shadow-card backdrop-blur lg:flex-row lg:items-center">
                    <div className="flex-1 rounded-xl border border-white/0 bg-black/20 px-4 py-3 text-base text-white/80 focus-within:border-brand-400/60">
                        <label htmlFor="hero-email" className="sr-only">
                            Work email
                        </label>
                        <input
                            id="hero-email"
                            type="email"
                            placeholder="Work email"
                            className="w-full bg-transparent text-base text-white placeholder:text-white/40 focus:outline-none"
                        />
                    </div>
                    <Button type="submit" className="w-full justify-center lg:w-auto">
                        Join the beta
                    </Button>
                </form>
                <div className="mt-12 grid gap-6 text-left sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur">
                        <span className="text-xs uppercase tracking-[0.3em] text-white/40">mean time saved</span>
                        <p className="mt-2 font-display text-3xl font-semibold text-white">42%</p>
                        <p className="mt-2 text-sm text-white/60">
                            Teams reclaim strategy time with automated handoffs and smart briefs.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur">
                        <span className="text-xs uppercase tracking-[0.3em] text-white/40">design system coverage</span>
                        <p className="mt-2 font-display text-3xl font-semibold text-white">4x</p>
                        <p className="mt-2 text-sm text-white/60">
                            OrbitFlow maps tokens, variants, and flows into one adaptive source of truth.
                        </p>
                    </div>
                    <div className="rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur">
                        <span className="text-xs uppercase tracking-[0.3em] text-white/40">customer love</span>
                        <p className="mt-2 font-display text-3xl font-semibold text-white">98%</p>
                        <p className="mt-2 text-sm text-white/60">
                            Product squads across 32 countries rely on OrbitFlow every sprint.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
