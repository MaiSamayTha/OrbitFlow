import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function Tag(props: HTMLAttributes<HTMLDivElement>) {
    const { className, children, ...otherProps } = props;

    return (
        <div
            className={twMerge(
                "inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 uppercase tracking-[0.22em] text-[11px] text-white/70 ring-1 ring-inset ring-white/15 backdrop-blur",
                className
            )}
            {...otherProps}
        >
            <span className="inline-flex h-2 w-2 rounded-full bg-accent-400" />
            <span className="font-semibold">{children}</span>
        </div>
    );
}
