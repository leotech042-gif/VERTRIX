"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Brain,
  ChartCandlestick,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { PriceChart } from "@/components/charts/price-chart";

const stats = [
  {
    label: "Portfolio value",
    value: "$12,840.20",
    change: "+8.42%",
    positive: true,
    icon: TrendingUp,
  },
  {
    label: "Active setups",
    value: "07",
    change: "+2 today",
    positive: true,
    icon: Target,
  },
  {
    label: "AI confidence",
    value: "92%",
    change: "High",
    positive: true,
    icon: Brain,
  },
  {
    label: "Risk score",
    value: "Low",
    change: "Within limits",
    positive: true,
    icon: ShieldCheck,
  },
];

const recentSignals = [
  {
    symbol: "XAU/USD",
    bias: "Bullish",
    confidence: 92,
    entry: "2,648.20",
    timeframe: "15M",
  },
  {
    symbol: "EUR/USD",
    bias: "Bullish",
    confidence: 78,
    entry: "1.1742",
    timeframe: "1H",
  },
  {
    symbol: "BTC/USD",
    bias: "Bullish",
    confidence: 85,
    entry: "112,840",
    timeframe: "4H",
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen px-5 py-7 sm:px-8">
      <div className="mx-auto max-w-[1400px] space-y-7">
        {/* Header */}
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs text-[var(--muted)]">Workspace</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-[-0.04em]">
              Overview
            </h1>
            <p className="mt-1.5 text-sm text-[var(--muted)]">
              Your trading command center
            </p>
          </div>

          <div className="flex gap-2">
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
        </header>

        {/* Stats */}
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, change, positive, icon: Icon }) => (
            <div
              key={label}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs text-[var(--muted)]">{label}</p>
                <Icon size={16} className="text-[var(--accent)]" />
              </div>
              <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
              <p
                className={`mt-1 text-xs ${
                  positive ? "text-[var(--accent)]" : "text-[var(--danger)]"
                }`}
              >
                {change}
              </p>
            </div>
          ))}
        </section>

        {/* Chart + Signals */}
        <section className="grid gap-5 xl:grid-cols-[1.6fr_0.9fr]">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">XAU/USD</p>
                <p className="mt-0.5 text-[10px] text-[var(--muted)]">
                  15M · Gold / US Dollar
                </p>
              </div>
              <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-[10px] font-medium text-[var(--accent)]">
                +1.42%
              </span>
            </div>
            <PriceChart symbol="XAU/USD" height={320} />
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
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
              {recentSignals.map((signal) => (
                <div
                  key={signal.symbol}
                  className="rounded-xl border border-[var(--border)] p-3.5 transition hover:border-[var(--accent-border)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{signal.symbol}</span>
                    <span className="rounded-md bg-[var(--accent-soft)] px-2 py-0.5 text-[10px] font-medium text-[var(--accent)]">
                      {signal.bias}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-[var(--muted)]">
                    <span>Entry {signal.entry}</span>
                    <span>{signal.confidence}% · {signal.timeframe}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-[var(--accent-border)] bg-[var(--accent-soft)] p-4">
              <p className="text-[10px] uppercase tracking-wider text-[var(--accent)]">
                Top setup
              </p>
              <p className="mt-1.5 text-sm font-semibold">XAU/USD Long</p>
              <p className="mt-1 text-[10px] leading-4 text-[var(--muted-strong)]">
                Structure + liquidity aligned. Entry 2,648.20 · SL 2,640.80 · TP
                2,685.20
              </p>
              <Link
                href="/dashboard/terminal"
                className="mt-3 flex h-9 items-center justify-center gap-1.5 rounded-lg bg-[var(--accent)] text-[10px] font-semibold text-[#050607]"
              >
                Open in terminal
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
