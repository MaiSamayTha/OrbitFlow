import { twMerge } from "tailwind-merge";

type PointerProps = {
    name: string;
    color: "red" | "blue";
};

export default function Pointer(props: PointerProps) {
    const { name, color } = props;

    return (
        <div className="relative">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6 text-white drop-shadow-[0_6px_25px_rgba(99,102,241,0.35)]"
            >
                <path d="M12 8l14 40 7-15 15-7z" />
                <path d="M26 48l7-15 15-7" />
            </svg>

            <div className="absolute top-full left-full mt-2">
                <div
                    className={twMerge(
                        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-slate-950",
                        color === "blue" && "bg-brand-400",
                        color === "red" && "bg-accent-400"
                    )}
                >
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-black/40" />
                    {name}
                </div>
            </div>
        </div>
    );
}
