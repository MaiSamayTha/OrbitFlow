import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function Avatar(props: HTMLAttributes<HTMLDivElement>) {
    const { className, children, ...otherprops } = props;
    return (
        <div
            className={twMerge(
                "size-20 overflow-hidden rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur",
                className
            )}
            {...otherprops}
        >
            {children}
        </div>
    );
}
