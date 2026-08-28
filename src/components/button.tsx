import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium leading-none whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:bg-accent-hover shadow-[0_1px_0_rgba(255,255,255,0.25)_inset]",
  secondary:
    "bg-bg-elevated text-text border border-border-strong hover:border-accent/60",
  ghost: "text-text-muted hover:text-text",
};

export function Button({
  href,
  variant = "primary",
  showArrow = true,
  className = "",
  children,
  ...props
}: {
  href: string;
  variant?: Variant;
  showArrow?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href">) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
      {showArrow && (
        <ArrowRight
          weight="bold"
          className="size-[15px] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5"
        />
      )}
    </Link>
  );
}
