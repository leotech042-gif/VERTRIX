"use client";

import { motion } from "motion/react";

type PageHeaderProps = {
  crumb?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
};

export function PageHeader({
  crumb,
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
    >
      <div>
        {crumb && (
          <p className="mb-2 text-xs text-[var(--muted)]">{crumb}</p>
        )}
        <h1 className="text-3xl font-semibold tracking-[-0.04em]">{title}</h1>
        {description && (
          <p className="mt-1.5 text-sm text-[var(--muted)]">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </motion.header>
  );
}
