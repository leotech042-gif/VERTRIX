"use client";

import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Brain,
  Filter,
  Sparkles,
} from "lucide-react";

type Signal = {
  id: string;
  symbol: string;
  bias: "Bullish" | "Bearish";
  confidence: number;
  timeframe: string;
  entry: string;
  stop: string;
  target: string;
  rr: string;
  reason: string;
  status: "Active" | "Watching" | "Expired";
};

const signals: Signal[] = [
  {
    id: "1",
    symbol: "XAU/USD",
    bias: "Bullish",
    confidence: 92,
    timeframe: "15M",
    entry: "2,648.20",
    stop: "2,640.80",
    target: "2,685.20",
    rr: "1 : 5",
    reason:
      "Higher-timeframe structure aligned. Demand zone held with strong momentum.",
    status: "Active",
  },
  {
    id: "2",
    symbol: "EUR/USD",
    bias: "Bullish",
    confidence: 78,
    timeframe: "1H",
    entry: "1.1742",
    stop: "1.1698",
    target: "1.1850",
    rr: "1 : 2.5",
    reason: "Break of structure with retest of previous resistance as support.",
    status: "Active",
  },
  {
    id: "3",
    symbol: "BTC/USD",
    bias: "Bullish",
    confidence: 85,
    timeframe: "4H",
    entry: "112,840",
    stop: "110,200",
    target: "118,500",
    rr: "1 : 2.1",
    reason: "Strong continuation after liquidity sweep below prior swing low.",
    status: "Watching",
  },
  {
    id: "4",
    symbol: "GBP/USD",
    bias: "Bearish",
    confidence: 71,
    timeframe: "1H",
    entry: "1.3125",
    stop: "1.3180",
    target: "1.3010",
    rr: "1 : 2.1",
    reason: "Rejection from supply zone with bearish engulfing confirmation.",
    status: "Active",
  },
  {
    id: "5",
    symbol: "USD/JPY",
    bias: "Bullish",
    confidence: 68,
    timeframe: "15M",
    entry: "149.85",
    stop: "149.40",
    target: "150.60",
    rr: "1 : 1.7",
    reason: "Range breakout with volume expansion. Watching for pullback entry.",
    status: "Watching",
  },
];

const filters = ["All", "Active", "Watching", "Bullish", "Bearish"] as const;

export default function SignalsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const visible = signals.filter((s) => {
    if (filter === "All") return true;
    if (filter === "Active" || filter === "Watching") return s.status === filter;
    return s.bias === filter;
  });

  return (
    <main className="min-h-screen px-5 py-7 sm:px-8">
      <div className="mx-auto max-w-[1200px] space-y-7">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs text-[var(--muted)]">
              <span>Workspace</span>
              <span>/</span>
              <span className="text-[var(--foreground)]">AI Signals</span>
            </div>
            <h1 className="text-3xl font-semibold tracking-[-0.04em]">
              AI Signals
            </h1>
            <p className="mt-1.5 text-sm text-[var(--muted)]">
              Structured trade ideas with reasoning and risk parameters
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2">
            <Sparkles size={14} className="text-[var(--accent)]" />
            <span className="text-xs text-[var(--muted-strong)]">
              {signals.filter((s) => s.status === "Active").length} active
            </span>
          </div>
        </header>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`shrink-0 rounded-lg border px-3 py-2 text-xs transition ${
                filter === f
                  ? "border-[var(--accent-border)] bg-[var(--accent-soft)] font-medium text-[var(--accent)]"
                  : "border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Signal cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {visible.map((signal) => (
            <article
              key={signal.id}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[var(--accent-border)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold">{signal.symbol}</h2>
                    <span
                      className={`rounded-md px-2 py-0.5 text-[10px] font-medium ${
                        signal.bias === "Bullish"
                          ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                          : "bg-red-500/10 text-[var(--danger)]"
                      }`}
                    >
                      {signal.bias === "Bullish" ? (
                        <span className="flex items-center gap-0.5">
                          <ArrowUpRight size={11} /> Bullish
                        </span>
                      ) : (
                        <span className="flex items-center gap-0.5">
                          <ArrowDownRight size={11} /> Bearish
                        </span>
                      )}
                    </span>
                  </div>
                  <p className="mt-1 text-[10px] text-[var(--muted)]">
                    {signal.timeframe} · {signal.status}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xl font-semibold">{signal.confidence}%</p>
                  <p className="text-[10px] text-[var(--muted)]">confidence</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-2">
                {[
                  ["Entry", signal.entry],
                  ["Stop", signal.stop],
                  ["Target", signal.target],
                  ["R:R", signal.rr],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-2.5 text-center"
                  >
                    <p className="text-[9px] text-[var(--muted)]">{label}</p>
                    <p className="mt-1 text-xs font-semibold">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-start gap-2 rounded-xl border border-[var(--border)] bg-[var(--background)] p-3">
                <Brain size={14} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                <p className="text-[11px] leading-4 text-[var(--muted-strong)]">
                  {signal.reason}
                </p>
              </div>
            </article>
          ))}
        </div>

        {visible.length === 0 && (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] py-16 text-center">
            <Filter size={22} className="mx-auto text-[var(--muted)]" />
            <p className="mt-3 text-sm font-medium">No signals match this filter</p>
          </div>
        )}
      </div>
    </main>
  );
}
