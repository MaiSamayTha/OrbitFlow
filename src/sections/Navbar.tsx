"use client";

import Image from "next/image";
import Button from "@/components/Button";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";
import newLogo from "@/assets/images/newlogo.png";

const navLinks = [
    { label: "Overview", href: "#" },
    { label: "Platform", href: "#features" },
    { label: "Integrations", href: "#integrations" },
    { label: "Pricing", href: "#cta" },
    { label: "Support", href: "#faqs" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <section className="fixed top-0 z-50 w-full py-5 lg:py-8">
                <div className="container max-w-6xl">
                    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
                        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-2 md:px-6">
                            <div className="flex items-center gap-3">
                                <Image
                                    src={newLogo}
                                    alt="OrbitFlow logo"
                                    width={38}
                                    height={38}
                                    className="h-9 w-auto"
                                    priority
                                />
                                <div className="hidden flex-col leading-tight sm:flex">
                                    <span className="font-display text-lg font-semibold text-white">OrbitFlow</span>
                                    <span className="text-xs uppercase tracking-[0.3em] text-white/50">Design Ops</span>
                                </div>
                                <div className="flex items-center gap-2 rounded-full border border-brand-500/40 bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-200">
                                    <span className="inline-flex h-2 w-2 rounded-full bg-accent-400" />
                                    Beta access open
                                </div>
                            </div>
                            <div className="hidden justify-center lg:flex">
                                <nav className="flex gap-7 text-sm font-medium text-white/70">
                                    {navLinks.map((link) => (
                                        <a
                                            href={link.href}
                                            key={link.label}
                                            className="transition hover:text-white"
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                            <div className="flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    className="rounded-full border border-white/20 bg-white/5 p-3 text-white/80 transition hover:border-white/40 hover:text-white md:hidden"
                                    onClick={() => {
                                        setIsOpen(!isOpen);
                                    }}
                                    aria-label="Toggle navigation menu"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="feather feather-menu"
                                    >
                                        <line
                                            x1="4"
                                            y1="6"
                                            x2="20"
                                            y2="6"
                                            className={twMerge(
                                                "origin-left transition",
                                                isOpen && "translate-y-2 rotate-45"
                                            )}
                                        />
                                        <line
                                            x1="4"
                                            y1="12"
                                            x2="20"
                                            y2="12"
                                            className={twMerge("transition", isOpen && "opacity-0")}
                                        />
                                        <line
                                            x1="4"
                                            y1="18"
                                            x2="20"
                                            y2="18"
                                            className={twMerge(
                                                "origin-left transition",
                                                isOpen && "-translate-y-2 -rotate-45"
                                            )}
                                        />
                                    </svg>
                                </button>
                                <div className="hidden items-center gap-3 md:flex">
                                    <Button variant="secondary" className="text-sm">
                                        Log in
                                    </Button>
                                    <Button className="text-sm">Start trial</Button>
                                </div>
                            </div>
                        </div>
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden border-t border-white/10"
                                >
                                    <div className="flex flex-col items-center gap-4 px-6 py-6 text-sm text-white/70">
                                        {navLinks.map((link) => (
                                            <a
                                                href={link.href}
                                                key={link.label}
                                                className="w-full rounded-full border border-white/10 bg-white/5 py-2 text-center font-medium text-white transition hover:border-white/30"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {link.label}
                                            </a>
                                        ))}
                                        <div className="flex w-full flex-col gap-3 pt-2">
                                            <Button variant="secondary" className="w-full justify-center">
                                                Log in
                                            </Button>
                                            <Button className="w-full justify-center">Start trial</Button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>
            <div className="pb-[90px] md:pb-[120px]" />
        </>
    );
}
