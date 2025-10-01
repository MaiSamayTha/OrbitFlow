import Tag from "@/components/Tag";
import FeatureCard from "@/components/FeatureCard";
import avatar1 from "@/assets/images/avatar-ashwin-santiago.jpg";
import avatar2 from "@/assets/images/avatar-lula-meyers.jpg";
import avatar3 from "@/assets/images/avatar-florence-shaw.jpg";
import avatar4 from "@/assets/images/avatar-owen-garcia.jpg";
import Image from "next/image";
import Avatar from "@/components/Avatar";
import Key from "@/components/Key";

const features = [
    "Live Co-Creation",
    "Automated Handoffs",
    "Focus Mode",
    "Insight Pulse",
    "Journey Mapping",
    "Modular Tokens",
    "Scenario Planner",
];

export default function Features() {
    return (
        <section className="py-24" id="features">
            <div className="container">
                <div className="flex justify-center">
                    <Tag>Platform Highlights</Tag>
                </div>
                <h2 className="mt-6 text-center font-display text-5xl font-semibold text-white md:text-6xl">
                    Workflows that feel effortless, outputs that feel inevitable
                </h2>

                <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-3">
                    <FeatureCard
                        title="Live co-creation rooms"
                        description="Stakeholders edit in-sync with designers, while OrbitFlow resolves conflicts in the background."
                        className="md:col-span-2 lg:col-span-1"
                    >
                        <div className="flex items-center justify-center gap-3">
                            <Avatar className="z-40">
                                <Image src={avatar1} className="rounded-full" alt="Product design lead" />
                            </Avatar>
                            <Avatar className="-ml-6 border-brand-500/60 z-30">
                                <Image src={avatar2} className="rounded-full" alt="Product manager" />
                            </Avatar>
                            <Avatar className="-ml-6 border-accent-500/60 z-20">
                                <Image src={avatar3} className="rounded-full" alt="Engineer" />
                            </Avatar>
                            <Avatar className="-ml-6 border-transparent">
                                <div className="relative inline-flex size-full items-center justify-center rounded-full bg-brand-500/20 text-sm uppercase tracking-[0.3em] text-brand-100">
                                    <Image
                                        src={avatar4}
                                        alt="Research lead"
                                        className="absolute size-full rounded-full opacity-0 transition duration-500 hover:opacity-100"
                                    />
                                    ai
                                </div>
                            </Avatar>
                        </div>
                    </FeatureCard>

                    <FeatureCard
                        title="Insight-rich prototypes"
                        description="Inject live product data and generative motion cues so reviews feel like the real thing."
                        className="md:col-span-2 lg:col-span-1"
                    >
                        <div className="relative flex aspect-video items-center justify-center">
                            <p className="text-center text-4xl font-semibold text-white/20 transition duration-500 group-hover:text-white/40">
                                prototypes with {" "}
                                <span className="relative inline-block">
                                    <span className="relative z-20 bg-gradient-to-r from-accent-200 to-brand-400 bg-clip-text text-transparent">
                                        signal
                                    </span>
                                    <video
                                        src="/images/gif-incredible.mp4"
                                        autoPlay
                                        loop
                                        playsInline
                                        muted
                                        className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 h-28 w-44 -translate-x-1/2 rounded-2xl shadow-xl opacity-0 transition duration-500 group-hover:opacity-100"
                                    ></video>
                                </span>
                            </p>
                        </div>
                    </FeatureCard>

                    <FeatureCard
                        title="Command palette on steroids"
                        description="Summon flows, pair tokens, or trigger audits in seconds with layered shortcuts."
                        className="md:col-span-2 md:col-start-2 lg:col-span-1 lg:col-start-auto"
                    >
                        <div className="flex aspect-video items-center justify-center gap-4">
                            <Key className="w-28 border border-transparent outline outline-2 outline-offset-4 outline-transparent transition duration-500 group-hover:-translate-y-1 group-hover:outline-accent-400/60">
                                shift
                            </Key>
                            <Key className="border border-transparent outline outline-2 outline-offset-4 outline-transparent transition duration-500 group-hover:-translate-y-1 group-hover:outline-brand-400/60 delay-150">
                                cmd
                            </Key>
                            <Key className="border border-transparent outline outline-2 outline-offset-4 outline-transparent transition duration-500 group-hover:-translate-y-1 group-hover:outline-brand-400/60 delay-300">
                                K
                            </Key>
                        </div>
                    </FeatureCard>
                </div>
                <div className="mt-10 flex flex-wrap justify-center gap-3">
                    {features.map((feature) => (
                        <div
                            key={feature}
                            className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-brand-400/60 hover:bg-brand-500/10 hover:text-white"
                        >
                            <span className="inline-flex h-2 w-2 rounded-full bg-accent-400 transition group-hover:scale-125" />
                            <span>{feature}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
