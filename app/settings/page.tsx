"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const KEY = "veytrix-settings";

type Settings = {
  displayName: string;
  defaultRisk: string;
  defaultSymbol: string;
};

const defaults: Settings = {
  displayName: "",
  defaultRisk: "1",
  defaultSymbol: "XAU/USD",
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaults);
  const [saved, setSaved] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSettings({ ...defaults, ...JSON.parse(raw) });
    } catch {
      // ignore
    }
    setReady(true);
  }, []);

  function save(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem(KEY, JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <main className="min-h-screen bg-[var(--background)] px-4 py-8 text-[var(--foreground)]">
      <div className="mx-auto max-w-lg space-y-6">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
            <p className="text-sm text-[var(--muted)]">
              Preferences stored in this browser
            </p>
          </div>
        </div>

        <form
          onSubmit={save}
          className="space-y-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
        >
          <div>
            <label className="mb-1.5 block text-xs text-[var(--muted)]">
              Display name
            </label>
            <input
              value={settings.displayName}
              onChange={(e) =>
                setSettings((s) => ({ ...s, displayName: e.target.value }))
              }
              placeholder="Trader"
              className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--accent-border)]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs text-[var(--muted)]">
              Default risk per trade (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={settings.defaultRisk}
              onChange={(e) =>
                setSettings((s) => ({ ...s, defaultRisk: e.target.value }))
              }
              className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--accent-border)]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs text-[var(--muted)]">
              Default symbol
            </label>
            <select
              value={settings.defaultSymbol}
              onChange={(e) =>
                setSettings((s) => ({ ...s, defaultSymbol: e.target.value }))
              }
              className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm"
            >
              {["XAU/USD", "EUR/USD", "BTC/USD", "GBP/USD", "USD/JPY"].map(
                (s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ),
              )}
            </select>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-[var(--border)] px-3 py-3">
            <div>
              <p className="text-sm font-medium">Theme</p>
              <p className="text-xs text-[var(--muted)]">Dark or light mode</p>
            </div>
            {ready && <ThemeToggle />}
          </div>

          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] text-sm font-semibold text-[#050607]"
          >
            <Save size={15} />
            {saved ? "Saved" : "Save settings"}
          </button>
        </form>
      </div>
    </main>
  );
}
