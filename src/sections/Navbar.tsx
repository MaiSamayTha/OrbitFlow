"use client";

import Image from "next/image";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
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
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsLoginOpen(false);
            }
        };

        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    useEffect(() => {
        if (typeof document === "undefined") {
            return;
        }

        document.body.style.overflow = isLoginOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isLoginOpen]);

    const openLogin = () => {
        setIsLoginOpen(true);
    };

    const closeLogin = () => {
        setIsLoginOpen(false);
    };

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
                                        setIsMenuOpen(!isMenuOpen);
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
                                                isMenuOpen && "translate-y-2 rotate-45"
                                            )}
                                        />
                                        <line
                                            x1="4"
                                            y1="12"
                                            x2="20"
                                            y2="12"
                                            className={twMerge("transition", isMenuOpen && "opacity-0")}
                                        />
                                        <line
                                            x1="4"
                                            y1="18"
                                            x2="20"
                                            y2="18"
                                            className={twMerge(
                                                "origin-left transition",
                                                isMenuOpen && "-translate-y-2 -rotate-45"
                                            )}
                                        />
                                    </svg>
                                </button>
                                <div className="hidden items-center gap-3 md:flex">
                                    <Button variant="secondary" className="text-sm" onClick={openLogin}>
                                        Log in
                                    </Button>
                                    <Button className="text-sm">Start trial</Button>
                                </div>
                            </div>
                        </div>
                        <AnimatePresence>
                            {isMenuOpen && (
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
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                {link.label}
                                            </a>
                                        ))}
                                        <div className="flex w-full flex-col gap-3 pt-2">
                                            <Button
                                                variant="secondary"
                                                className="w-full justify-center"
                                                onClick={() => {
                                                    setIsMenuOpen(false);
                                                    openLogin();
                                                }}
                                            >
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
            <AnimatePresence>
                {isLoginOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur"
                        onClick={closeLogin}
                    >
                        <motion.div
                            initial={{ y: 30, opacity: 0, scale: 0.96 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 20, opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.28, ease: "easeOut" }}
                            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-white/12 via-white/8 to-white/5 p-6 text-white shadow-[0_35px_120px_rgba(12,23,54,0.45)] backdrop-blur-2xl"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className="absolute -right-40 -top-40 h-72 w-72 rounded-full bg-brand-500/30 blur-3xl" />
                            <div className="absolute -left-20 bottom-10 h-52 w-52 rounded-full bg-accent-500/20 blur-3xl" />

                            <div className="relative z-10 flex items-center justify-between">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">Member access</p>
                                    <h3 className="mt-2 text-2xl font-semibold text-white">Welcome back</h3>
                                </div>
                                <button
                                    type="button"
                                    onClick={closeLogin}
                                    className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition hover:border-white/30 hover:text-white"
                                    aria-label="Close login dialog"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4"
                                    >
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>

                            <p className="relative z-10 mt-4 text-sm text-white/70">
                                Sign in to keep orchestrating your design operations without missing a beat.
                            </p>

                            <form className="relative z-10 mt-6 space-y-4">
                                <label className="block text-sm text-white/70">
                                    <span className="mb-1 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/40">
                                        <span className="inline-flex h-2 w-2 rounded-full bg-accent-400" />
                                        Work Email
                                    </span>
                                    <input
                                        type="email"
                                        placeholder="you@studio.com"
                                        className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/80 outline-none transition focus:border-brand-400/70 focus:text-white"
                                        autoComplete="email"
                                        required
                                    />
                                </label>
                                <label className="block text-sm text-white/70">
                                    <span className="mb-1 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/40">
                                        <span className="inline-flex h-2 w-2 rounded-full bg-brand-400" />
                                        Password
                                    </span>
                                    <input
                                        type="password"
                                        placeholder="********"
                                        className="mt-1 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/80 outline-none transition focus:border-brand-400/70 focus:text-white"
                                        autoComplete="current-password"
                                        required
                                    />
                                </label>
                                <div className="flex items-center justify-between text-xs text-white/50">
                                    <label className="inline-flex items-center gap-2">
                                        <input type="checkbox" className="h-4 w-4 rounded border border-white/20 bg-black/30 text-brand-400 focus:ring-brand-400" />
                                        Keep me signed in
                                    </label>
                                    <a href="#" className="text-brand-200 transition hover:text-brand-100">
                                        Forgot password?
                                    </a>
                                </div>
                                <Button type="submit" className="w-full justify-center">
                                    Continue to OrbitFlow
                                </Button>
                            </form>

                            <div className="relative z-10 mt-6 flex items-center gap-3 text-xs text-white/40">
                                <span className="h-px flex-1 bg-white/10" />
                                or start with federation
                                <span className="h-px flex-1 bg-white/10" />
                            </div>

                            <div className="relative z-10 mt-4 flex flex-wrap gap-2">
                                {[
                                    "Continue with Google",
                                    "Continue with Figma",
                                    "Continue with Slack",
                                ].map((provider) => (
                                    <button
                                        type="button"
                                        key={provider}
                                        className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition hover:border-white/20 hover:text-white"
                                    >
                                        {provider}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="pb-[90px] md:pb-[120px]" />
        </>
    );
}
