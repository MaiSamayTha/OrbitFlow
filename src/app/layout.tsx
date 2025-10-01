import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
    variable: "--font-manrope",
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
    variable: "--font-space-grotesk",
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "OrbitFlow — Design Intelligence Platform",
    description:
        "OrbitFlow accelerates product teams with collaborative design workflows, smart automation, and thoughtful integrations.",
    icons: {
        icon: "/newlogo.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${manrope.variable} ${spaceGrotesk.variable} font-sans antialiased bg-transparent text-slate-100 selection:bg-brand-500/40 selection:text-white`}
            >
                <div className="relative isolate min-h-screen">
                    <div className="pointer-events-none fixed inset-0 -z-10 opacity-90">
                        <div className="absolute inset-0 bg-soft-spot" />
                        <div className="absolute inset-x-0 top-0 h-60 bg-gradient-to-b from-[#090d1c] via-transparent to-transparent" />
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                    </div>
                    {children}
                </div>
                <a
                    href="#"
                    className="fixed bottom-4 left-4 z-50 inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-lg transition hover:bg-white/20"
                    aria-label="Portfolio shortcut"
                >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/15 text-sm font-semibold text-white">
                        SS
                    </span>
                    <span className="hidden sm:inline-flex">Portfolio</span>
                </a>
            </body>
        </html>
    );
}
