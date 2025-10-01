"use client";
import Image from "next/image";
import React, { Fragment } from "react";
import { motion } from "framer-motion";

const logos = [
    { name: "Velora", image: "/images/quantum.svg" },
    { name: "Northwind", image: "/images/acme-corp.svg" },
    { name: "Helio Labs", image: "/images/echo-valley.svg" },
    { name: "Pulse", image: "/images/pulse.svg" },
    { name: "Outside", image: "/images/outside.svg" },
    { name: "Apex", image: "/images/apex.svg" },
    { name: "Celestial", image: "/images/celestial.svg" },
    { name: "Twice", image: "/images/twice.svg" },
];

export default function LogoTicker() {
    return (
        <section className="overflow-x-clip py-24">
            <div className="container">
                <div className="flex flex-col items-center gap-4">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/50">
                        trusted by design-led teams
                    </span>
                    <h3 className="text-center font-display text-3xl font-semibold text-white md:text-4xl">
                        1,400+ product squads scale with OrbitFlow
                    </h3>
                    <p className="max-w-2xl text-center text-sm text-white/60 md:text-base">
                        From early-stage founders to global platforms, OrbitFlow keeps alignment, feedback, and
                        delivery in motion without compromising craft.
                    </p>
                </div>
                <div className="mt-12 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
                    <motion.div
                        animate={{
                            x: "-50%",
                        }}
                        transition={{
                            duration: 22,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                        className="flex flex-none gap-24 pr-24"
                    >
                        {Array.from({ length: 2 }).map((_, i) => (
                            <Fragment key={i}>
                                {logos.map((logo) => (
                                    <Image
                                        src={logo.image}
                                        key={logo.name}
                                        alt={logo.name}
                                        loading="lazy"
                                        width={200}
                                        height={100}
                                        className="h-12 w-auto opacity-70 transition hover:opacity-100"
                                    />
                                ))}
                            </Fragment>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
