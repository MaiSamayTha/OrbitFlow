import { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const buttonStyles = cva(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300/80 disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            variant: {
                primary:
                    "h-12 px-6 bg-gradient-to-r from-accent-400 via-brand-400 to-brand-500 text-slate-950 shadow-glass hover:from-accent-500 hover:via-brand-400 hover:to-brand-500",
                secondary:
                    "h-12 px-6 border border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10",
                ghost: "h-12 px-6 bg-transparent text-white hover:bg-white/10",
            },
            size: {
                sm: "h-10 px-5 text-sm",
                lg: "h-14 px-8 text-base",
            },
        },
        defaultVariants: {
            variant: "primary",
        },
    }
);

type ButtonProps = VariantProps<typeof buttonStyles> & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(props: ButtonProps) {
    const { variant, size, className, ...otherProps } = props;

    return <button className={twMerge(buttonStyles({ variant, size }), className)} {...otherProps} />;
}
