import Tag from "@/components/Tag";
import figmaLogo from "@/assets/images/figma-logo.svg";
import notionLogo from "@/assets/images/notion-logo.svg";
import slackLogo from "@/assets/images/slack-logo.svg";
import relumeLogo from "@/assets/images/relume-logo.svg";
import framerLogo from "@/assets/images/framer-logo.svg";
import githubLogo from "@/assets/images/github-logo.svg";
import Integrationscolumn from "@/components/Integrationscolumn";

const integrations = [
    { name: "Figma", icon: figmaLogo, description: "Sync frames, tokens, and variables directly into OrbitFlow design ops." },
    { name: "Notion", icon: notionLogo, description: "Pipe research insights and product docs into briefs without copy-paste." },
    { name: "Slack", icon: slackLogo, description: "Turn threads into structured decisions with automated follow-ups." },
    { name: "Relume", icon: relumeLogo, description: "Reuse libraries across marketing and product with two-way updates." },
    { name: "Framer", icon: framerLogo, description: "Publish prototype experiments and capture qualitative feedback instantly." },
    { name: "GitHub", icon: githubLogo, description: "Map design stories to code branches with smart release checklists." },
];

export type IntegrationsType = typeof integrations;

export default function Integrations() {
    return (
        <section className="overflow-hidden py-24" id="integrations">
            <div className="container text-center">
                <Tag>Connected Ecosystem</Tag>
                <h2 className="mt-6 font-display text-5xl font-semibold text-white md:text-6xl">
                    Plays beautifully with your favourite tools
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
                    OrbitFlow slides into your existing stack, orchestrating feedback, specs, and delivery without
                    forcing your team to relearn their rituals.
                </p>
                <div className="mt-10 grid h-[430px] overflow-hidden gap-4 md:grid-cols-2 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
                    <Integrationscolumn integrations={integrations} />
                    <Integrationscolumn integrations={integrations.slice().reverse()} reverse className="hidden md:flex" />
                </div>
            </div>
        </section>
    );
}
