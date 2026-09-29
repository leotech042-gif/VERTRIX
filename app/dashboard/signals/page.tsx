"use client";

import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Brain,
} from "lucide-react";
import { useNotifications } from "@/hooks/useNotifications";

type Signal = {
  id: string;
  symbol: string;
  bias: "Bullish" | "Bearish";
  confidence: number;
  timeframe: string;
  concepts: string[];
  zoneWhy: string;
  entry: string;
  stop: string;
  target: string;
  status: "Active" | "Watching";
};

/** Educational structure-based setups — not guaranteed outcomes */
const SIGNALS: Signal[] = [
  {
    id: "1",
    symbol: "XAU/USD",
    bias: "Bullish",
    confidence: 72,
    timeframe: "15M / 1H",
    concepts: ["Order block", "Break & retest", "Liquidity sweep"],
    zoneWhy:
      "Price swept equal lows (liquidity), displaced higher, and is retesting a bullish order block that aligns with 1H structure. Zone chosen at the last opposing candle body before displacement — not a random level.",
    entry: "Demand OB retest",
    stop: "Below OB low",
    target: "Prior high / imbalance fill",
    status: "Active",
  },
  {
    id: "2",
    symbol: "EUR/USD",
    bias: "Bearish",
    confidence: 68,
    timeframe: "1H",
    concepts: ["Breaker block", "Inducement", "BOS"],
    zoneWhy:
      "Inducement above a short-term high trapped longs; break of structure down turned the old order block into a breaker. Short interest is the retest of that breaker from below.",
    entry: "Breaker retest",
    stop: "Above breaker high",
    target: "External range liquidity",
    status: "Watching",
  },
  {
    id: "3",
    symbol: "BTC/USD",
    bias: "Bullish",
    confidence: 65,
    timeframe: "4H",
    concepts: ["V-shape recovery", "FVG", "BOS"],
    zoneWhy:
      "Sharp V-recovery after a sell-side liquidity run; fair value gap left on the way up. Long only if 4H close holds above the break of structure candle.",
    entry: "FVG / structure hold",
    stop: "Below sweep low",
    target: "Range high",
    status: "Active",
  },
  {
    id: "4",
    symbol: "GBP/USD",
    bias: "Bearish",
    confidence: 61,
    timeframe: "1H",
    concepts: ["Head & shoulders", "Break & retest"],
    zoneWhy:
      "Head and shoulders neckline broken and retested as resistance. Bias is short while price respects the neckline from below; invalidated on decisive reclaim.",
    entry: "Neckline retest",
    stop: "Above right shoulder",
    target: "Measured move",
    status: "Watching",
  },
];

export default function SignalsPage() {
  const { permission, request, notify } = useNotifications();
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    // Demo: one notification when page opens if allowed
    if (permission === "granted") {
      // silent — user triggered pages only
    }
  }, [permission]);

  const visible = SIGNALS.filter((s) => {
    if (filter === "All") return true;
    if (filter === "Bullish" || filter === "Bearish") return s.bias === filter;
    return s.status === filter;
  });

  function alertSignal(s: Signal) {
    notify(
      `Signal · ${s.symbol} ${s.bias}`,
      `${s.confidence}% context · ${s.concepts.slice(0, 2).join(", ")}`,
    );
  }

  return (
    <main className="min-h-screen px-4 py-7 sm:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs text-[var(--muted)]">Workspace / Signals</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">Signals</h1>
            <p className="mt-1 max-w-xl text-sm text-[var(--muted)]">
              Structure-based ideas with explicit reasoning. Confidence is context quality —{" "}
              <strong className="text-[var(--foreground)]">not a win-rate promise</strong>.
            </p>
          </div>

          <button
            type="button"
            onClick={() => request()}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-[var(--border)] px-3 text-xs hover:border-[var(--accent-border)]"
          >
            <Bell size={14} />
            {permission === "granted" ? "Notifications on" : "Enable notifications"}
          </button>
        </header>

        <div className="rounded-xl border border-[var(--warning)]/30 bg-[var(--warning)]/5 px-4 py-3 text-xs text-[var(--muted-strong)]">
          No system can deliver “95% sure” signals. These setups use price action concepts
          (order blocks, breakers, liquidity, H&S, V-shape, break & retest). You still decide risk.
        </div>

        <div className="flex flex-wrap gap-2">
          {["All", "Active", "Watching", "Bullish", "Bearish"].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-lg border px-3 py-1.5 text-xs transition ${
                filter === f
                  ? "border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent)]"
                  : "border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid gap-4">
          {visible.map((s) => (
            <article
              key={s.id}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[var(--accent-border)]"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold">{s.symbol}</h2>
                    <span
                      className={`inline-flex items-center gap-0.5 rounded-md px-2 py-0.5 text-[10px] font-medium ${
                        s.bias === "Bullish"
                          ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                          : "bg-[var(--danger)]/10 text-[var(--danger)]"
                      }`}
                    >
                      {s.bias === "Bullish" ? (
                        <ArrowUpRight size={11} />
                      ) : (
                        <ArrowDownRight size={11} />
                      )}
                      {s.bias}
                    </span>
                    <span className="text-[10px] text-[var(--muted)]">
                      {s.timeframe} · {s.status}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-semibold">{s.confidence}</p>
                  <p className="text-[10px] text-[var(--muted)]">context score</p>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {s.concepts.map((c) => (
                  <span
                    key={c}
                    className="rounded-md border border-[var(--border)] px-2 py-0.5 text-[10px] text-[var(--muted-strong)]"
                  >
                    {c}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex gap-2 rounded-xl border border-[var(--border)] bg-[var(--background)] p-3">
                <Brain size={14} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                <p className="text-[12px] leading-5 text-[var(--muted-strong)]">{s.zoneWhy}</p>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                {[
                  ["Entry idea", s.entry],
                  ["Invalidation", s.stop],
                  ["Objective", s.target],
                ].map(([l, v]) => (
                  <div
                    key={l}
                    className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-2.5"
                  >
                    <p className="text-[9px] text-[var(--muted)]">{l}</p>
                    <p className="mt-1 text-[11px] font-medium">{v}</p>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => alertSignal(s)}
                className="mt-3 text-xs text-[var(--accent)] hover:underline"
              >
                Send test notification
              </button>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
