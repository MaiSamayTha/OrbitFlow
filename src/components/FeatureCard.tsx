import { twMerge } from "tailwind-merge";

export default function FeatureCard(props: {
    title: string;
    description: string;
    children?: React.ReactNode;
    className?: string;
}) {
    const { title, description, children, className } = props;

    return (
        <div
            className={twMerge(
                "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-card transition duration-500 hover:border-brand-400/60 hover:shadow-xl",
                className
            )}
        >
            <div className="absolute inset-0 -z-10 opacity-0 transition duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/15 via-transparent to-accent-400/15" />
            </div>
            <div className="aspect-video flex items-center justify-center rounded-2xl border border-white/5 bg-black/30 backdrop-blur-sm">
                {children}
            </div>
            <div>
                <h3 className="mt-6 font-display text-3xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm text-white/60 md:text-base">{description}</p>
            </div>
        </div>
    );
}
