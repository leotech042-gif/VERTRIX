"use client";

import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Brain,
  Zap,
} from "lucide-react";
import { PriceChart } from "@/components/charts/price-chart";

const timeframes = ["1M", "5M", "15M", "1H", "4H", "1D"] as const;

export default function TerminalPage() {
  const [timeframe, setTimeframe] = useState<(typeof timeframes)[number]>("15M");
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [lotSize, setLotSize] = useState("0.10");
  const [entry, setEntry] = useState("2648.20");
  const [stop, setStop] = useState("2640.80");
  const [target, setTarget] = useState("2685.20");

  const riskReward = (() => {
    const e = parseFloat(entry);
    const s = parseFloat(stop);
    const t = parseFloat(target);
    if (!e || !s || !t) return "—";
    const risk = Math.abs(e - s);
    const reward = Math.abs(t - e);
    if (risk === 0) return "—";
    return `1 : ${(reward / risk).toFixed(1)}`;
  })();

  return (
    <main className="min-h-screen px-5 py-7 sm:px-8">
      <div className="mx-auto max-w-[1500px] space-y-6">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs text-[var(--muted)]">
              <span>Workspace</span>
              <span>/</span>
              <span className="text-[var(--foreground)]">Trading Terminal</span>
            </div>
            <h1 className="text-3xl font-semibold tracking-[-0.04em]">
              Trading Terminal
            </h1>
            <p className="mt-1.5 text-sm text-[var(--muted)]">
              Plan entries, stops and targets with structure in view
            </p>
          </div>

          <div className="flex gap-1.5">
            {timeframes.map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className={`rounded-lg border px-2.5 py-1.5 text-[10px] font-medium transition ${
                  timeframe === tf
                    ? "border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent)]"
                    : "border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </header>

        <div className="grid gap-5 xl:grid-cols-[1.7fr_0.85fr]">
          {/* Chart */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">XAU/USD</p>
                <p className="mt-0.5 text-[10px] text-[var(--muted)]">
                  Gold / US Dollar · {timeframe}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">2,648.20</p>
                <p className="text-[10px] text-[var(--accent)]">+1.42%</p>
              </div>
            </div>
            <PriceChart symbol="XAU/USD" height={420} />
          </div>

          {/* Order panel */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                Order ticket
              </p>

              {/* Buy / Sell toggle */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSide("buy")}
                  className={`flex h-11 items-center justify-center gap-1.5 rounded-xl text-sm font-semibold transition ${
                    side === "buy"
                      ? "bg-[var(--accent)] text-[#050607]"
                      : "border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  <ArrowUpRight size={15} />
                  Buy
                </button>
                <button
                  type="button"
                  onClick={() => setSide("sell")}
                  className={`flex h-11 items-center justify-center gap-1.5 rounded-xl text-sm font-semibold transition ${
                    side === "sell"
                      ? "bg-[var(--danger)] text-white"
                      : "border border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  <ArrowDownRight size={15} />
                  Sell
                </button>
              </div>

              <div className="mt-4 space-y-3">
                <div>
                  <label className="mb-1 block text-[10px] text-[var(--muted)]">
                    Lot size
                  </label>
                  <input
                    value={lotSize}
                    onChange={(e) => setLotSize(e.target.value)}
                    className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--accent-border)]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[10px] text-[var(--muted)]">
                    Entry
                  </label>
                  <input
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                    className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--accent-border)]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-[10px] text-[var(--muted)]">
                      Stop loss
                    </label>
                    <input
                      value={stop}
                      onChange={(e) => setStop(e.target.value)}
                      className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--accent-border)]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[10px] text-[var(--muted)]">
                      Take profit
                    </label>
                    <input
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      className="h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 text-sm outline-none focus:border-[var(--accent-border)]"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--background)] px-3 py-2.5">
                <span className="text-[10px] text-[var(--muted)]">Risk / Reward</span>
                <span className="text-sm font-semibold">{riskReward}</span>
              </div>

              <button
                type="button"
                className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] text-sm font-semibold text-[#050607] transition hover:opacity-90"
              >
                <Zap size={15} />
                Prepare {side === "buy" ? "Buy" : "Sell"} order
              </button>

              <p className="mt-3 text-center text-[10px] text-[var(--muted)]">
                Demo mode — no real orders are sent
              </p>
            </div>

            {/* AI suggestion */}
            <div className="rounded-2xl border border-[var(--accent-border)] bg-[var(--accent-soft)] p-5">
              <div className="flex items-center gap-2">
                <Brain size={15} className="text-[var(--accent)]" />
                <p className="text-xs font-semibold">AI suggestion</p>
              </div>
              <p className="mt-3 text-[11px] leading-5 text-[var(--muted-strong)]">
                Current structure supports a long bias. Suggested entry near
                2,648.20 with stop below the demand zone at 2,640.80.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSide("buy");
                  setEntry("2648.20");
                  setStop("2640.80");
                  setTarget("2685.20");
                }}
                className="mt-3 text-[10px] font-medium text-[var(--accent)] hover:underline"
              >
                Apply suggested levels
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
