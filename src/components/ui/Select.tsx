import type { SelectHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/lib/cn";

type SelectProps = PropsWithChildren<
    SelectHTMLAttributes<HTMLSelectElement> & {
        fullWidth?: boolean;
    }
>;

export function Select({
    className,
    children,
    fullWidth = true,
    ...props
}: SelectProps) {
    return (
        <select
            className={cn(
                "rounded-xl border border-slate-300 bg-white px-3 py-2 text-base sm:text-sm",
                "focus:outline-none focus:ring-2 focus:ring-slate-300",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                fullWidth && "w-full",
                className
            )}
            {...props}
        >
            {children}
        </select>
    );
}