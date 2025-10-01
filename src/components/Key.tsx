import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function Key(props: HTMLAttributes<HTMLDivElement>) {
    const { className, children, ...otherprops } = props;
    return (
        <div
            className={twMerge(
                "inline-flex size-14 items-center justify-center rounded-2xl border border-white/40 bg-white text-xl font-semibold text-slate-900 shadow-[0_10px_35px_-20px_rgba(59,130,246,0.65)]",
                className
            )}
            {...otherprops}
        >
            {children}
        </div>
    );
}
