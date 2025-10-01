"use client";

import { type IntegrationsType } from "@/sections/Integrations";

import { motion } from "framer-motion";
import Image from "next/image";
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";

export default function Integrationscolumn(props: {
    integrations: IntegrationsType;
    className?: string;
    reverse?: boolean;
}) {
    const { integrations, className, reverse } = props;

    return (
        <motion.div
            initial={{ y: reverse ? "-50%" : "0%" }}
            animate={{ y: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
            transition={{ duration: 24, ease: "linear", repeat: Infinity, repeatType: "loop" }}
            className={twMerge("flex flex-col gap-4 pb-4", className)}
            style={{ willChange: "transform" }}
        >
            {Array.from({ length: 2 }).map((_, i) => (
                <Fragment key={i}>
                    {integrations.map((integration) => (
                        <div
                            key={`${integration.name}-${i}`}
                            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 text-center shadow-card transition duration-500 hover:border-brand-400/60 hover:bg-white/8"
                        >
                            <div className="absolute inset-0 -z-10 opacity-0 transition duration-500 hover:opacity-100">
                                <div className="absolute inset-0 bg-gradient-to-b from-brand-500/10 via-transparent to-accent-400/10" />
                            </div>
                            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl border border-white/10 bg-black/20 backdrop-blur">
                                <Image src={integration.icon} alt={integration.name} className="h-12 w-12" />
                            </div>
                            <h3 className="mt-6 font-display text-2xl font-semibold text-white">
                                {integration.name}
                            </h3>
                            <p className="mt-3 text-sm text-white/60">{integration.description}</p>
                        </div>
                    ))}
                </Fragment>
            ))}
        </motion.div>
    );
}
