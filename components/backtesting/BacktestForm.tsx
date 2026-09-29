"use client";

import { Play } from "lucide-react";

export function BacktestForm({
  symbol,
  setSymbol,
  strategy,
  setStrategy,
  risk,
  setRisk,
  trades,
  setTrades,
  onSubmit,
}: {
  symbol: string;
  setSymbol: (v: string) => void;
  strategy: string;
  setStrategy: (v: string) => void;
  risk: string;
  setRisk: (v: string) => void;
  trades: string;
  setTrades: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
    >
      <p className="text-sm font-semibold">Simulation setup</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <select
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="h-10 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm"
        >
          {["XAU/USD", "EUR/USD", "BTC/USD", "GBP/USD"].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={strategy}
          onChange={(e) => setStrategy(e.target.value)}
          className="h-10 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm"
        >
          <option value="breakout">Breakout</option>
          <option value="mean">Mean reversion</option>
          <option value="trend">Trend following</option>
        </select>
        <input
          type="number"
          value={risk}
          onChange={(e) => setRisk(e.target.value)}
          placeholder="Risk %"
          className="h-10 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--accent-border)]"
        />
        <input
          type="number"
          value={trades}
          onChange={(e) => setTrades(e.target.value)}
          placeholder="Sample trades"
          className="h-10 rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--accent-border)]"
        />
      </div>
      <button
        type="submit"
        className="mt-4 inline-flex h-10 items-center gap-2 rounded-xl bg-[var(--accent)] px-4 text-sm font-semibold text-[#050607]"
      >
        <Play size={15} />
        Run simulation
      </button>
    </form>
  );
}
