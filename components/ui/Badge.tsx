import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "default" | "accent" | "danger" | "warning";
};

export function Badge({
  className,
  tone = "default",
  children,
  ...props
}: BadgeProps) {
  const tones = {
    default: "border-[var(--border)] text-[var(--muted-strong)]",
    accent: "border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent)]",
    danger: "border-[var(--danger)]/30 bg-[var(--danger)]/10 text-[var(--danger)]",
    warning: "border-[var(--warning)]/30 bg-[var(--warning)]/10 text-[var(--warning)]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-medium",
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
