"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  Brain,
  ChartCandlestick,
  LayoutDashboard,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { PriceChart } from "@/components/charts/price-chart";
import {
  formatChange,
  formatPrice,
  useLiveTickers,
} from "@/hooks/useLiveTickers";

const slides = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "markets", label: "Markets", icon: ChartCandlestick },
  { id: "signals", label: "AI Signals", icon: Brain },
  { id: "terminal", label: "Terminal", icon: Terminal },
  { id: "risk", label: "Risk", icon: ShieldCheck },
] as const;

type SlideId = (typeof slides)[number]["id"];

export function ProductShowcase() {
  const [active, setActive] = useState<SlideId>("overview");
  const { tickers } = useLiveTickers(30_000);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => {
        const idx = slides.findIndex((s) => s.id === current);
        return slides[(idx + 1) % slides.length].id;
      });
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const xau = tickers["XAU/USD"];
  const btc = tickers["BTC/USD"];
  const eur = tickers["EUR/USD"];

  return (
    <section className="border-t border-[var(--border)] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            Platform
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
            One workspace for the full process.
          </h2>
          <p className="mt-4 text-sm leading-6 text-[var(--muted)] sm:text-base">
            Live prices, charts, signals, terminal and risk tools — no fake media,
            only real market data where available.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex justify-center gap-2 overflow-x-auto pb-1">
          {slides.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActive(id)}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition ${
                active === id
                  ? "border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent)]"
                  : "border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6">
          <AnimatePresence mode="wait">
            {active === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    ["XAU/USD", xau],
                    ["BTC/USD", btc],
                    ["EUR/USD", eur],
                  ].map(([symbol, t]) => {
                    const ticker = t as
                      | { price: number | null; changePercent: number | null }
                      | undefined;
                    const positive = (ticker?.changePercent ?? 0) >= 0;
                    return (
                      <div
                        key={String(symbol)}
                        className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4"
                      >
                        <p className="text-[10px] text-[var(--muted)]">
                          {String(symbol)}
                        </p>
                        <p className="mt-2 text-lg font-semibold tabular-nums">
                          {formatPrice(ticker?.price, String(symbol))}
                        </p>
                        <p
                          className={`mt-1 text-[10px] font-medium ${
                            positive
                              ? "text-[var(--accent)]"
                              : "text-[var(--danger)]"
                          }`}
                        >
                          {formatChange(ticker?.changePercent)}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <PriceChart symbol="XAU/USD" height={260} />
              </motion.div>
            )}

            {active === "markets" && (
              <motion.div
                key="markets"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">Markets workspace</p>
                    <p className="text-[10px] text-[var(--muted)]">
                      Live instrument explorer + chart
                    </p>
                  </div>
                  <Link
                    href="/dashboard/markets"
                    className="flex items-center gap-1 text-[10px] text-[var(--accent)] hover:underline"
                  >
                    Open markets <ArrowUpRight size={12} />
                  </Link>
                </div>
                <PriceChart symbol="BTC/USD" height={280} />
              </motion.div>
            )}

            {active === "signals" && (
              <motion.div
                key="signals"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="grid gap-3 sm:grid-cols-2"
              >
                {[
                  {
                    symbol: "XAU/USD",
                    bias: "Bullish",
                    conf: 92,
                    note: "Structure + demand zone alignment",
                  },
                  {
                    symbol: "EUR/USD",
                    bias: "Bullish",
                    conf: 78,
                    note: "Break of structure with retest",
                  },
                  {
                    symbol: "BTC/USD",
                    bias: "Bullish",
                    conf: 85,
                    note: "Liquidity sweep continuation",
                  },
                  {
                    symbol: "GBP/USD",
                    bias: "Bearish",
                    conf: 71,
                    note: "Rejection from supply zone",
                  },
                ].map((s) => (
                  <div
                    key={s.symbol}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">{s.symbol}</span>
                      <span className="rounded-md bg-[var(--accent-soft)] px-2 py-0.5 text-[10px] text-[var(--accent)]">
                        {s.bias}
                      </span>
                    </div>
                    <p className="mt-2 text-[10px] text-[var(--muted)]">
                      {s.note}
                    </p>
                    <p className="mt-2 text-xs font-medium">{s.conf}% confidence</p>
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <Link
                    href="/dashboard/signals"
                    className="flex h-10 items-center justify-center gap-1 rounded-xl border border-[var(--border)] text-xs transition hover:border-[var(--accent-border)] hover:text-[var(--accent)]"
                  >
                    View all signals <ArrowUpRight size={13} />
                  </Link>
                </div>
              </motion.div>
            )}

            {active === "terminal" && (
              <motion.div
                key="terminal"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">Trading terminal</p>
                    <p className="text-[10px] text-[var(--muted)]">
                      Chart + order planning
                    </p>
                  </div>
                  <Link
                    href="/dashboard/terminal"
                    className="flex items-center gap-1 text-[10px] text-[var(--accent)] hover:underline"
                  >
                    Open terminal <ArrowUpRight size={12} />
                  </Link>
                </div>
                <PriceChart symbol="XAU/USD" height={280} />
              </motion.div>
            )}

            {active === "risk" && (
              <motion.div
                key="risk"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    ["Risk per trade", "1.0%"],
                    ["Suggested size", "0.25 lots"],
                    ["Max loss", "$100.00"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4"
                    >
                      <p className="text-[10px] text-[var(--muted)]">{label}</p>
                      <p className="mt-2 text-lg font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm leading-6 text-[var(--muted)]">
                  Size positions from account equity and stop distance before you
                  enter. Open the Risk Engine for full calculation.
                </p>
                <Link
                  href="/dashboard/risk-engine"
                  className="inline-flex h-10 items-center gap-1 rounded-xl bg-[var(--accent)] px-4 text-xs font-semibold text-[#050607]"
                >
                  Open Risk Engine <ArrowUpRight size={13} />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
