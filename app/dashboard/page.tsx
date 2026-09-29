"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Brain,
  ChartCandlestick,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Wifi,
  WifiOff,
} from "lucide-react";
import { PriceChart } from "@/components/charts/price-chart";
import {
  formatChange,
  formatPrice,
  useLiveTickers,
} from "@/hooks/useLiveTickers";

const recentSignals = [
  {
    symbol: "XAU/USD",
    bias: "Bullish",
    confidence: 92,
    entry: "Structure + demand",
    timeframe: "15M",
  },
  {
    symbol: "EUR/USD",
    bias: "Bullish",
    confidence: 78,
    entry: "Break & retest",
    timeframe: "1H",
  },
  {
    symbol: "BTC/USD",
    bias: "Bullish",
    confidence: 85,
    entry: "Liquidity sweep",
    timeframe: "4H",
  },
];

export default function DashboardPage() {
  const { tickers, loading, error } = useLiveTickers(25_000);

  const xau = tickers["XAU/USD"];
  const btc = tickers["BTC/USD"];
  const eur = tickers["EUR/USD"];
  const liveCount = Object.values(tickers).filter((t) => t.price != null).length;

  const stats = [
    {
      label: "Gold (XAU/USD)",
      value: formatPrice(xau?.price, "XAU/USD"),
      change: formatChange(xau?.changePercent),
      positive: (xau?.changePercent ?? 0) >= 0,
      icon: TrendingUp,
    },
    {
      label: "Bitcoin",
      value: formatPrice(btc?.price, "BTC/USD"),
      change: formatChange(btc?.changePercent),
      positive: (btc?.changePercent ?? 0) >= 0,
      icon: Target,
    },
    {
      label: "EUR/USD",
      value: formatPrice(eur?.price, "EUR/USD"),
      change: formatChange(eur?.changePercent),
      positive: (eur?.changePercent ?? 0) >= 0,
      icon: Brain,
    },
    {
      label: "Live feeds",
      value: liveCount.toString().padStart(2, "0"),
      change: loading ? "Connecting…" : error ? "Degraded" : "Connected",
      positive: !error && liveCount > 0,
      icon: ShieldCheck,
    },
  ];

  return (
    <main className="min-h-screen px-5 py-7 sm:px-8">
      <div className="mx-auto max-w-[1400px] space-y-7">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
        >
          <div>
            <p className="text-xs text-[var(--muted)]">Workspace</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-[-0.04em]">
              Overview
            </h1>
            <p className="mt-1.5 text-sm text-[var(--muted)]">
              Live market snapshot and AI setups
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2">
              {error || liveCount === 0 ? (
                <WifiOff size={14} className="text-[var(--warning)]" />
              ) : (
                <Wifi size={14} className="text-[var(--accent)]" />
              )}
              <span className="text-[10px] text-[var(--muted-strong)]">
                {loading
                  ? "Connecting…"
                  : error
                    ? "Feed degraded"
                    : `${liveCount} live`}
              </span>
            </div>

            <Link
              href="/dashboard/markets"
              className="flex h-10 items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 text-xs font-medium transition hover:border-[var(--accent-border)]"
            >
              <ChartCandlestick size={15} />
              Markets
            </Link>
            <Link
              href="/dashboard/signals"
              className="flex h-10 items-center gap-2 rounded-xl bg-[var(--accent)] px-4 text-xs font-semibold text-[#050607] transition hover:opacity-90"
            >
              <Sparkles size={15} />
              View signals
            </Link>
          </div>
        </motion.header>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, change, positive, icon: Icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs text-[var(--muted)]">{label}</p>
                <Icon size={16} className="text-[var(--accent)]" />
              </div>
              <p className="mt-3 text-2xl font-semibold tracking-tight tabular-nums">
                {value}
              </p>
              <p
                className={`mt-1 text-xs ${
                  positive ? "text-[var(--accent)]" : "text-[var(--danger)]"
                }`}
              >
                {change}
              </p>
            </motion.div>
          ))}
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.6fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">XAU/USD</p>
                <p className="mt-0.5 text-[10px] text-[var(--muted)]">
                  15M · Gold / US Dollar
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold tabular-nums">
                  {formatPrice(xau?.price, "XAU/USD")}
                </p>
                <p
                  className={`text-[10px] font-medium ${
                    (xau?.changePercent ?? 0) >= 0
                      ? "text-[var(--accent)]"
                      : "text-[var(--danger)]"
                  }`}
                >
                  {formatChange(xau?.changePercent)}
                </p>
              </div>
            </div>
            <PriceChart symbol="XAU/USD" height={320} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain size={16} className="text-[var(--accent)]" />
                <p className="text-sm font-semibold">Recent AI signals</p>
              </div>
              <Link
                href="/dashboard/signals"
                className="text-[10px] text-[var(--muted)] hover:text-[var(--accent)]"
              >
                View all
              </Link>
            </div>

            <div className="mt-4 space-y-2">
              {recentSignals.map((signal, i) => (
                <motion.div
                  key={signal.symbol}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.05 }}
                  className="rounded-xl border border-[var(--border)] p-3.5 transition hover:border-[var(--accent-border)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{signal.symbol}</span>
                    <span className="rounded-md bg-[var(--accent-soft)] px-2 py-0.5 text-[10px] font-medium text-[var(--accent)]">
                      {signal.bias}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-[var(--muted)]">
                    <span>{signal.entry}</span>
                    <span>
                      {signal.confidence}% · {signal.timeframe}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-[var(--accent-border)] bg-[var(--accent-soft)] p-4">
              <p className="text-[10px] uppercase tracking-wider text-[var(--accent)]">
                Top setup
              </p>
              <p className="mt-1.5 text-sm font-semibold">XAU/USD Long bias</p>
              <p className="mt-1 text-[10px] leading-4 text-[var(--muted-strong)]">
                Structure and liquidity currently aligned on the lower timeframe.
                Review levels in the terminal before any decision.
              </p>
              <Link
                href="/dashboard/terminal"
                className="mt-3 flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[var(--accent)] text-[10px] font-semibold text-[#050607]"
              >
                Open in terminal
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
