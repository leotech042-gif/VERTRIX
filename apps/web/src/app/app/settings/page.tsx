"use client";

import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function SettingsPage() {
  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <div className="mt-6 flex max-w-md items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
        <div>
          <p className="text-sm font-medium">Theme</p>
          <p className="text-xs text-[var(--muted)]">Dark / light, persisted</p>
        </div>
        <ThemeToggle />
      </div>
      <p className="mt-4 text-sm text-[var(--muted)]">
        Auth, sessions and broker credentials arrive with secure backend auth
        (Phase 1–5 expansion).
      </p>
    </div>
  );
}
