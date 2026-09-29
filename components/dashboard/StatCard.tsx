"use client";

import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type StatCardProps = {
  label: string;
  value: string;
  note?: string;
  positive?: boolean;
  icon: LucideIcon;
  delay?: number;
};

export function StatCard({
  label,
  value,
  note,
  positive = true,
  icon: Icon,
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
    >
      <div className="flex items-center justify-between">
        <p className="text-xs text-[var(--muted)]">{label}</p>
        <Icon size={16} className="text-[var(--accent)]" />
      </div>
      <p className="mt-3 truncate text-2xl font-semibold tracking-tight tabular-nums">
        {value}
      </p>
      {note && (
        <p
          className={cn(
            "mt-1 text-xs",
            positive ? "text-[var(--accent)]" : "text-[var(--danger)]",
          )}
        >
          {note}
        </p>
      )}
    </motion.div>
  );
}
