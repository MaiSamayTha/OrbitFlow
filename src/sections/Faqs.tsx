"use client";

import Tag from "@/components/Tag";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { motion, AnimatePresence } from "framer-motion";
const faqs = [
    {
        question: "How is OrbitFlow different from traditional design suites?",
        answer:
            "OrbitFlow focuses on orchestration rather than pixel pushing. Automations manage briefs, approvals, and handoffs so designers can stay in their creative flow while stakeholders stay aligned.",
    },
    {
        question: "Do we need to migrate our design system?",
        answer:
            "No migration day required. OrbitFlow ingests existing tokens, components, and documentation, then keeps them synchronised through bi-directional integrations.",
    },
    {
        question: "Can OrbitFlow work across time zones?",
        answer:
            "Absolutely. Async rituals, playback summaries, and smart reminders mean every contributor catches up in minutes, no matter where they log in.",
    },
    {
        question: "How secure is the workspace?",
        answer:
            "Every workspace is encrypted at rest and in transit, with granular roles, SSO, SCIM, and audit logging available from day one.",
    },
    {
        question: "What does onboarding look like?",
        answer:
            "A dedicated success partner helps configure spaces, automations, and governance. Most teams launch their first project in under a week.",
    },
];

export default function Faqs() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <section className="container" id="faqs">
            <div className="flex justify-center">
                <Tag>Answers</Tag>
            </div>
            <h2 className="mt-6 text-center font-display text-5xl font-semibold text-white md:text-6xl">
                Clarity for every stakeholder
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-white/60">
                The most common questions from product leaders, answered. Still curious? Ping us and we will set up a
                sandbox for your team.
            </p>
            <div className="mt-12 flex max-w-2xl flex-col gap-6 self-center">
                {faqs.map((faq, faqIndex) => (
                    <div
                        key={faq.question}
                        className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-brand-400/50"
                    >
                        <button
                            type="button"
                            className="flex w-full items-center justify-between gap-4 text-left"
                            onClick={() => {
                                setSelectedIndex(faqIndex);
                            }}
                        >
                            <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={twMerge(
                                    "feather feather-plus flex-shrink-0 text-brand-200 transition duration-300",
                                    selectedIndex === faqIndex && "rotate-45"
                                )}
                            >
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                        </button>

                        <AnimatePresence>
                            {selectedIndex === faqIndex && (
                                <motion.div
                                    initial={{
                                        height: 0,
                                        marginTop: 0,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        height: "auto",
                                        marginTop: 20,
                                        opacity: 1,
                                    }}
                                    exit={{
                                        height: 0,
                                        marginTop: 0,
                                        opacity: 0,
                                    }}
                                    className="overflow-hidden text-sm text-white/60"
                                >
                                    <p>{faq.answer}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
}
