"use client";

import { useMemo, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { DEFAULT_RISK_PCT, positionSize } from "@/lib/risk";

export default function RiskEnginePage() {
  const [balance, setBalance] = useState("10000");
  const [riskPct, setRiskPct] = useState(String(DEFAULT_RISK_PCT));
  const [entry, setEntry] = useState("2650");
  const [stop, setStop] = useState("2643");
  const [pointValue, setPointValue] = useState("1");

  const result = useMemo(() => {
    return positionSize({
      balance: parseFloat(balance) || 0,
      riskPercent: parseFloat(riskPct) || DEFAULT_RISK_PCT,
      entry: parseFloat(entry) || 0,
      stop: parseFloat(stop) || 0,
      pointValue: parseFloat(pointValue) || 1,
    });
  }, [balance, riskPct, entry, stop, pointValue]);

  return (
    <main className="min-h-screen px-4 py-7 sm:px-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <header>
          <p className="text-xs text-[var(--muted)]">Workspace / Risk Engine</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Risk engine</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Default risk is <strong className="text-[var(--foreground)]">0.2%</strong> of account equity.
            Lot size is derived from stop distance — not emotion.
          </p>
        </header>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[var(--accent)]" />
              <p className="text-sm font-semibold">Inputs</p>
            </div>

            <div className="mt-4 space-y-3">
              <Field label="Account balance ($)" value={balance} onChange={setBalance} />
              <Field label="Risk %" value={riskPct} onChange={setRiskPct} />
              <div className="flex gap-2">
                {["0.2", "0.5", "1"].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setRiskPct(v)}
                    className={`rounded-lg border px-2.5 py-1 text-[10px] ${
                      riskPct === v
                        ? "border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent)]"
                        : "border-[var(--border)] text-[var(--muted)]"
                    }`}
                  >
                    {v}%
                  </button>
                ))}
              </div>
              <Field label="Entry" value={entry} onChange={setEntry} />
              <Field label="Stop loss" value={stop} onChange={setStop} />
              <Field
                label="$ per point (1.0 lot)"
                value={pointValue}
                onChange={setPointValue}
              />
              <p className="text-[10px] text-[var(--muted)]">
                Adjust point value to match your broker contract. This is a planning tool.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border border-[var(--accent-border)] bg-[var(--accent-soft)] p-5">
              <p className="text-[10px] uppercase tracking-wider text-[var(--accent)]">
                Suggested size
              </p>
              <p className="mt-2 text-3xl font-semibold">{result.lots} lots</p>
              <p className="mt-2 text-xs text-[var(--muted-strong)]">
                Risk amount ${result.riskAmount} · Stop {result.stopDistance} pts
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 text-xs leading-5 text-[var(--muted)]">
              <p className="font-medium text-[var(--foreground)]">Rules</p>
              <ul className="mt-2 list-disc space-y-1 pl-4">
                <li>Prefer ≤ 0.2%–0.5% risk per idea on a new system.</li>
                <li>Stop belongs at structure invalidation, not a random pip count.</li>
                <li>Never increase size to “make back” a loss.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs text-[var(--muted)]">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--accent-border)]"
      />
    </div>
  );
}
