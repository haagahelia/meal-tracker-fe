import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    fullWidth?: boolean;
};

export function Input({ className, fullWidth = true, ...props }: InputProps) {
    return (
        <input
            className={cn(
                "w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-base sm:text-sm",
                "focus:outline-none focus:ring-2 focus:ring-slate-300",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                className
            )}
            {...props}
        />
    );
}