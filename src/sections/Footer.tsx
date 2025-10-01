import Image from "next/image";
import newLogo from "@/assets/images/newlogo.png";

const footerLinks = [
    {
        href: "mailto:hello@orbitflow.app",
        label: "Contact",
    },
    {
        href: "https://swamimalode.online",
        label: "Security",
        target: "_blank",
        rel: "noopener noreferrer",
    },
    {
        href: "https://swamimalode.online",
        label: "Status",
        target: "_blank",
        rel: "noopener noreferrer",
    },
];

export default function Footer() {
    return (
        <section className="py-16">
            <div className="container">
                <div className="flex flex-col items-center gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur md:flex-row md:items-start md:justify-between md:text-left">
                    <div className="max-w-sm space-y-3">
                        <Image src={newLogo} alt="OrbitFlow logo" width={42} height={42} className="h-10 w-auto" />
                        <h3 className="font-display text-3xl font-semibold text-white">Design intelligence for product teams</h3>
                        <p className="text-sm text-white/60">
                            Automate rituals, choreograph collaboration, and deliver jaw-dropping experiences without burning out your team.
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-4 md:items-end">
                        <nav className="flex gap-6 text-sm text-white/60">
                            {footerLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    target={link.target || "_self"}
                                    rel={link.rel || undefined}
                                    className="transition hover:text-white"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                        <span className="text-xs uppercase tracking-[0.3em] text-white/30">
                            {"\u00A9"} {new Date().getFullYear()} OrbitFlow Collective
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
