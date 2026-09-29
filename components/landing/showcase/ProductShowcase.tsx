"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Brain,
  CircleDollarSign,
  ShieldCheck,
  Sparkles,
  Target,
  Zap,
  type LucideIcon,
} from "lucide-react";

const slides = [
  "overview",
  "markets",
  "analysis",
  "terminal",
  "risk",
  "positions",
] as const;

type Slide = (typeof slides)[number];

const markets = [
  ["XAU/USD", "2,648.20", "+1.42%", true],
  ["EUR/USD", "1.1742", "+0.38%", true],
  ["BTC/USD", "112,840", "+2.18%", true],
  ["ETH/USD", "4,210", "-0.24%", false],
] as const;

const slideNames: Record<Slide, string> = {
  overview: "Overview",
  markets: "Markets",
  analysis: "AI Analysis",
  terminal: "Trading Terminal",
  risk: "Risk Engine",
  positions: "Positions",
};

/* =========================================================
   CHART
   ========================================================= */

function Chart() {
  return (
    <div className="relative h-full min-h-[240px] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)]">
      <div className="absolute inset-0 grid-background opacity-40" />

      <div className="absolute left-0 right-0 top-1/4 h-px bg-[var(--border)]" />
      <div className="absolute left-0 right-0 top-1/2 h-px bg-[var(--border)]" />
      <div className="absolute left-0 right-0 top-3/4 h-px bg-[var(--border)]" />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 900 300"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="veytrix-chart-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.18" />

            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path
          d="
            M0 250
            C45 225 65 235 105 210
            C145 185 160 202 195 178
            C230 154 245 170 280 148
            C315 126 330 145 365 118
            C400 91 415 120 450 96
            C485 72 500 95 535 76
            C570 57 590 82 620 65
            C655 45 680 68 710 53
            C750 33 770 55 805 40
            C840 27 865 35 900 18
            L900 300
            L0 300
            Z
          "
          fill="url(#veytrix-chart-fill)"
        />

        <path
          d="
            M0 250
            C45 225 65 235 105 210
            C145 185 160 202 195 178
            C230 154 245 170 280 148
            C315 126 330 145 365 118
            C400 91 415 120 450 96
            C485 72 500 95 535 76
            C570 57 590 82 620 65
            C655 45 680 68 710 53
            C750 33 770 55 805 40
            C840 27 865 35 900 18
          "
          fill="none"
          stroke="var(--accent)"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="absolute left-[52%] right-0 top-[39%] border-t border-dashed border-[var(--accent)] opacity-70" />

      <div className="absolute left-[50%] top-[33%] rounded-md border border-[var(--accent-border)] bg-[var(--accent-soft)] px-2.5 py-1 text-[9px] font-medium text-[var(--accent)]">
        Entry 2,648.20
      </div>

      <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />

        <span className="text-[9px] text-[var(--muted)]">Live market data</span>
      </div>
    </div>
  );
}

/* =========================================================
   OVERVIEW
   ========================================================= */

function Overview() {
  const overviewStats: {
    label: string;
    value: string;
    change: string;
    Icon: LucideIcon;
  }[] = [
    {
      label: "Portfolio",
      value: "$12,840.20",
      change: "+8.42%",
      Icon: CircleDollarSign,
    },
    {
      label: "Active setups",
      value: "07",
      change: "+2 today",
      Icon: Target,
    },
    {
      label: "AI confidence",
      value: "92%",
      change: "High confidence",
      Icon: Brain,
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
            Overview
          </p>

          <h3 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">
            Your trading command center.
          </h3>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />

          <span className="text-[9px] text-[var(--muted-strong)]">
            Markets connected
          </span>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {overviewStats.map(({ label, value, change, Icon }) => (
          <div
            key={label}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-[9px] uppercase tracking-wider text-[var(--muted)]">
                {label}
              </p>

              <Icon
                size={16}
                strokeWidth={1.7}
                className="text-[var(--accent)]"
              />
            </div>

            <p className="mt-4 text-xl font-semibold">{value}</p>

            <p className="mt-1 text-[10px] text-[var(--accent)]">{change}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_0.8fr]">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold">XAU/USD</p>

              <p className="mt-1 text-[9px] text-[var(--muted)]">
                15M market structure
              </p>
            </div>

            <span className="text-xs font-semibold text-[var(--accent)]">
              +1.42%
            </span>
          </div>

          <div className="h-[240px]">
            <Chart />
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <div className="flex items-center gap-2">
            <Sparkles size={15} className="text-[var(--accent)]" />

            <p className="text-xs font-semibold">AI Intelligence</p>
          </div>

          <div className="mt-5 rounded-xl border border-[var(--accent-border)] bg-[var(--accent-soft)] p-4">
            <p className="text-[9px] uppercase tracking-wider text-[var(--accent)]">
              Current bias
            </p>

            <p className="mt-2 text-xl font-semibold">Bullish</p>

            <p className="mt-2 text-[10px] leading-5 text-[var(--muted-strong)]">
              Structure remains aligned with the higher-timeframe directional
              bias.
            </p>
          </div>

          <div className="mt-3 space-y-2">
            {[
              ["Structure", "Higher High"],
              ["Liquidity", "Demand zone"],
              ["Momentum", "Strong"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-xl border border-[var(--border)] px-3 py-3"
              >
                <span className="text-[10px] text-[var(--muted)]">{label}</span>

                <span className="text-[10px] font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MARKETS
   ========================================================= */

function Markets() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
            Markets
          </p>

          <h3 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">
            Market intelligence.
          </h3>
        </div>

        <span className="text-[9px] text-[var(--muted)]">
          24 instruments tracked
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {markets.map(([pair, price, change, positive]) => (
          <div
            key={pair}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold">{pair}</span>

              {positive ? (
                <ArrowUpRight size={14} className="text-[var(--accent)]" />
              ) : (
                <ArrowDownRight size={14} className="text-[var(--danger)]" />
              )}
            </div>

            <p className="mt-5 text-lg font-semibold">{price}</p>

            <p
              className={`mt-1 text-[10px] ${
                positive ? "text-[var(--accent)]" : "text-[var(--danger)]"
              }`}
            >
              {change}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_0.7fr]">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold">XAU/USD</p>

              <p className="mt-1 text-[9px] text-[var(--muted)]">
                Gold / US Dollar
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm font-semibold">2,648.20</p>

              <p className="text-[9px] text-[var(--accent)]">+1.42%</p>
            </div>
          </div>

          <div className="h-[270px]">
            <Chart />
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className="text-[10px] uppercase tracking-wider text-[var(--muted)]">
            Market scanner
          </p>

          <div className="mt-5 space-y-4">
            {[
              ["Bullish setups", "08"],
              ["Bearish setups", "03"],
              ["High momentum", "12"],
              ["AI alerts", "05"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between border-b border-[var(--border)] pb-3"
              >
                <span className="text-[10px] text-[var(--muted)]">{label}</span>

                <span className="text-sm font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   AI ANALYSIS
   ========================================================= */

function Analysis() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
            AI Intelligence
          </p>

          <h3 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">
            XAU/USD analysis.
          </h3>
        </div>

        <span className="w-fit rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-3 py-1.5 text-[9px] font-medium text-[var(--accent)]">
          92% confidence
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["Directional bias", "Bullish"],
          ["Market structure", "Higher High"],
          ["Momentum", "Strong"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <p className="text-[9px] uppercase tracking-wider text-[var(--muted)]">
              {label}
            </p>

            <p className="mt-3 text-sm font-semibold text-[var(--accent)]">
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_0.85fr]">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <div className="flex items-center gap-2">
            <Brain size={16} className="text-[var(--accent)]" />

            <p className="text-xs font-semibold">AI reasoning</p>
          </div>

          <div className="mt-6 space-y-5">
            {[
              ["Higher timeframe bias", "Aligned", 94],
              ["Market structure", "Bullish", 91],
              ["Liquidity conditions", "Favorable", 86],
              ["Entry quality", "Strong", 89],
            ].map(([label, value, width]) => (
              <div key={label}>
                <div className="flex justify-between text-[10px]">
                  <span className="text-[var(--muted)]">{label}</span>

                  <span>{value}</span>
                </div>

                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--surface-elevated)]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${width}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full rounded-full bg-[var(--accent)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--accent-border)] bg-[var(--accent-soft)] p-6">
          <Sparkles size={20} className="text-[var(--accent)]" />

          <p className="mt-5 text-lg font-semibold">Long opportunity</p>

          <p className="mt-2 text-[10px] leading-5 text-[var(--muted-strong)]">
            Structure, liquidity and momentum currently align with the
            directional thesis.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-2">
            {[
              ["Entry", "2648.20"],
              ["SL", "2640.80"],
              ["TP", "2685.20"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl border border-[var(--accent-border)] bg-[var(--background)] p-3"
              >
                <p className="text-[8px] text-[var(--muted)]">{label}</p>

                <p className="mt-1 text-[10px] font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   TRADING TERMINAL
   ========================================================= */

function Terminal() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
            Trading Terminal
          </p>

          <h3 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">
            Plan the trade.
          </h3>
        </div>

        <div className="flex gap-2">
          {["1H", "15M", "5M"].map((timeframe, index) => (
            <span
              key={timeframe}
              className={`rounded-lg border px-2.5 py-1.5 text-[8px] ${
                index === 1
                  ? "border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent)]"
                  : "border-[var(--border)] text-[var(--muted)]"
              }`}
            >
              {timeframe}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_0.7fr]">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[9px] text-[var(--muted)]">XAU/USD</p>

              <p className="mt-1 text-xl font-semibold">2,648.20</p>
            </div>

            <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-[8px] text-[var(--accent)]">
              BUY
            </span>
          </div>

          <div className="h-[285px]">
            <Chart />
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className="text-[10px] uppercase tracking-wider text-[var(--muted)]">
            Trade setup
          </p>

          <div className="mt-5 space-y-3">
            {[
              ["Entry", "2,648.20"],
              ["Stop Loss", "2,640.80"],
              ["Take Profit", "2,685.20"],
              ["Risk / Reward", "1 : 5"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-xl border border-[var(--border)] p-3"
              >
                <span className="text-[9px] text-[var(--muted)]">{label}</span>

                <span className="text-[10px] font-semibold">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex h-10 items-center justify-center gap-2 rounded-xl bg-[var(--accent)] text-[10px] font-semibold text-[#050607]">
            <Zap size={13} />
            Prepare trade
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   RISK ENGINE
   ========================================================= */

function Risk() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
          Risk Engine
        </p>

        <h3 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">
          Protect the account before execution.
        </h3>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Account", "$10,000"],
          ["Risk / Trade", "1.0%"],
          ["Risk Amount", "$100"],
          ["Position Size", "0.13"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <p className="text-[9px] uppercase tracking-wider text-[var(--muted)]">
              {label}
            </p>

            <p className="mt-3 text-lg font-semibold">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_0.7fr]">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold">Risk utilisation</p>

              <p className="mt-1 text-[9px] text-[var(--muted)]">
                Current exposure against configured limits
              </p>
            </div>

            <span className="text-xl font-semibold text-[var(--accent)]">
              31%
            </span>
          </div>

          <div className="mt-7 h-3 overflow-hidden rounded-full bg-[var(--surface-elevated)]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "31%" }}
              transition={{ duration: 1 }}
              className="h-full rounded-full bg-[var(--accent)]"
            />
          </div>

          <div className="mt-6 grid grid-cols-3 text-center">
            <div>
              <p className="text-[9px] text-[var(--muted)]">Used</p>

              <p className="mt-1 text-xs font-semibold">$31</p>
            </div>

            <div>
              <p className="text-[9px] text-[var(--muted)]">Remaining</p>

              <p className="mt-1 text-xs font-semibold">$69</p>
            </div>

            <div>
              <p className="text-[9px] text-[var(--muted)]">Maximum</p>

              <p className="mt-1 text-xs font-semibold">$100</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--accent-border)] bg-[var(--accent-soft)] p-6">
          <ShieldCheck
            size={22}
            className="text-[var(--accent)]"
            strokeWidth={1.7}
          />

          <p className="mt-5 text-lg font-semibold">Risk within limits</p>

          <p className="mt-2 text-[10px] leading-5 text-[var(--muted-strong)]">
            Position sizing and account exposure are currently within the
            configured risk parameters.
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   POSITIONS
   ========================================================= */

function Positions() {
  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
            Positions
          </p>

          <h3 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">
            Active trades.
          </h3>
        </div>

        <span className="text-[9px] text-[var(--muted)]">
          3 active positions
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
        <div className="hidden grid-cols-5 border-b border-[var(--border)] px-5 py-3 text-[9px] uppercase tracking-wider text-[var(--muted)] sm:grid">
          <span>Instrument</span>
          <span>Side</span>
          <span>Entry</span>
          <span>Current</span>
          <span className="text-right">P/L</span>
        </div>

        {[
          ["XAU/USD", "LONG", "2,648.20", "2,671.40", "+$231.40"],
          ["EUR/USD", "LONG", "1.1708", "1.1742", "+$68.00"],
          ["BTC/USD", "LONG", "110,420", "112,840", "+$242.00"],
        ].map(([instrument, side, entry, current, pnl]) => (
          <div
            key={instrument}
            className="grid gap-2 border-b border-[var(--border)] px-5 py-5 last:border-0 sm:grid-cols-5 sm:items-center"
          >
            <div>
              <p className="text-xs font-semibold">{instrument}</p>

              <p className="mt-1 text-[9px] text-[var(--muted)]">
                Live position
              </p>
            </div>

            <span className="w-fit rounded-md bg-[var(--accent-soft)] px-2 py-1 text-[8px] text-[var(--accent)]">
              {side}
            </span>

            <span className="text-[10px] text-[var(--muted-strong)]">
              {entry}
            </span>

            <span className="text-[10px] text-[var(--muted-strong)]">
              {current}
            </span>

            <span className="text-xs font-semibold text-[var(--accent)] sm:text-right">
              {pnl}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   SLIDE CONTENT
   ========================================================= */

function SlideContent({ slide }: { slide: Slide }) {
  switch (slide) {
    case "markets":
      return <Markets />;

    case "analysis":
      return <Analysis />;

    case "terminal":
      return <Terminal />;

    case "risk":
      return <Risk />;

    case "positions":
      return <Positions />;

    case "overview":
    default:
      return <Overview />;
  }
}

/* =========================================================
   PRODUCT SHOWCASE
   ========================================================= */

export function ProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 4500);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const activeSlide = slides[activeIndex];

  return (
    <section
      id="platform"
      className="border-y border-[var(--border)] py-24 sm:py-28"
    >
      <div className="mx-auto max-w-[1480px] px-5 sm:px-8 lg:px-10">
        {/* Section heading */}

        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            Inside Veytrix
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">
            Your entire trading workflow. One intelligent platform.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">
            Watch Veytrix move through the tools traders actually need —
            automatically.
          </p>
        </div>

        {/* Product window */}

        <div className="mt-14">
          <div className="overflow-hidden rounded-[28px] border border-[var(--border-strong)] bg-[var(--surface)] shadow-[0_35px_120px_rgba(0,0,0,0.22)]">
            {/* Browser bar */}

            <div className="flex h-12 items-center justify-between border-b border-[var(--border)] px-5">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--danger)] opacity-70" />

                <span className="h-2.5 w-2.5 rounded-full bg-[var(--warning)] opacity-70" />

                <span className="h-2.5 w-2.5 rounded-full bg-[var(--success)] opacity-70" />
              </div>

              <span className="rounded-md border border-[var(--border)] bg-[var(--background)] px-5 py-1.5 text-[9px] text-[var(--muted)]">
                app.veytrix.ai
              </span>

              <span className="w-10" />
            </div>

            {/* Product header */}

            <div className="flex h-14 items-center justify-between border-b border-[var(--border)] px-5 sm:px-7">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--accent-border)] bg-[var(--accent-soft)]">
                  <span className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent)]" />
                </div>

                <span className="text-xs font-semibold tracking-wide">
                  VEYTRIX
                </span>
              </div>

              <div className="hidden items-center gap-7 md:flex">
                {slides.map((slide, index) => (
                  <span
                    key={slide}
                    className={`text-[9px] transition-colors duration-300 ${
                      index === activeIndex
                        ? "text-[var(--accent)]"
                        : "text-[var(--muted)]"
                    }`}
                  >
                    {slideNames[slide]}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden text-[9px] text-[var(--muted)] sm:block">
                  Live
                </span>

                <span className="h-7 w-7 rounded-full bg-[var(--accent)]" />
              </div>
            </div>

            {/* Animated product content */}

            <div className="relative min-h-[650px] overflow-hidden sm:min-h-[620px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeSlide}
                  initial={{
                    opacity: 0,
                    x: 80,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -80,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-0 p-5 sm:p-7 lg:p-9"
                >
                  <SlideContent slide={activeSlide} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Automatic progress */}

            <div className="border-t border-[var(--border)] px-5 py-4">
              <div className="flex items-center gap-2">
                {slides.map((slide, index) => (
                  <div
                    key={slide}
                    className="relative h-1 flex-1 overflow-hidden rounded-full bg-[var(--surface-elevated)]"
                  >
                    {index < activeIndex && (
                      <span className="absolute inset-0 bg-[var(--accent)] opacity-40" />
                    )}

                    {index === activeIndex && (
                      <motion.span
                        key={activeSlide}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                          duration: 4.5,
                          ease: "linear",
                        }}
                        className="absolute inset-y-0 left-0 rounded-full bg-[var(--accent)]"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-center gap-2 text-[9px] text-[var(--muted)]">
                <Activity size={13} className="text-[var(--accent)]" />

                <span>{slideNames[activeSlide]}</span>

                <span>•</span>

                <span>Automatic preview</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
