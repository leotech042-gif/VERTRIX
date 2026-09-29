"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const screens = [
  {
    id: "markets",
    title: "Markets",
    subtitle: "Live prices & charts",
  },
  {
    id: "signals",
    title: "AI Signals",
    subtitle: "Structured trade ideas",
  },
  {
    id: "terminal",
    title: "Terminal",
    subtitle: "Plan entry · SL · TP",
  },
  {
    id: "risk",
    title: "Risk Engine",
    subtitle: "Position sizing",
  },
] as const;

export function ProductDemo() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % screens.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const screen = screens[active];

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {screens.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setActive(i)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
              active === i
                ? "border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent)] scale-105"
                : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--border-strong)] hover:text-[var(--foreground)]"
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_40px_80px_rgba(0,0,0,0.35)]">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-[11px] text-[var(--muted)]">
            {screen.title} · {screen.subtitle}
          </span>
        </div>

        <div className="relative min-h-[320px] p-4 sm:min-h-[380px] sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={screen.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              {screen.id === "markets" && <MarketsMock />}
              {screen.id === "signals" && <SignalsMock />}
              {screen.id === "terminal" && <TerminalMock />}
              {screen.id === "risk" && <RiskMock />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function MarketsMock() {
  const rows = [
    ["XAU/USD", "2,651.40", "+0.82%", true],
    ["BTC/USD", "94,210", "+1.24%", true],
    ["EUR/USD", "1.0852", "−0.14%", false],
    ["ETH/USD", "3,420", "+0.56%", true],
  ] as const;

  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">XAU/USD</p>
            <p className="text-[10px] text-[var(--muted)]">Gold · 15M</p>
          </div>
          <span className="text-sm font-semibold text-[var(--accent)]">+0.82%</span>
        </div>
        <svg viewBox="0 0 400 140" className="h-36 w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 110 C40 100 60 95 90 85 C120 75 140 90 170 70 C200 50 220 55 250 40 C280 28 300 35 330 22 C360 12 380 18 400 10 L400 140 L0 140 Z"
            fill="url(#g1)"
          />
          <path
            d="M0 110 C40 100 60 95 90 85 C120 75 140 90 170 70 C200 50 220 55 250 40 C280 28 300 35 330 22 C360 12 380 18 400 10"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
          />
        </svg>
      </div>
      <div className="space-y-2">
        {rows.map(([sym, price, ch, up]) => (
          <div
            key={sym}
            className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 transition hover:border-[var(--accent-border)]"
          >
            <span className="text-xs font-medium">{sym}</span>
            <div className="text-right">
              <p className="text-xs font-semibold tabular-nums">{price}</p>
              <p className={`text-[10px] ${up ? "text-[var(--accent)]" : "text-[var(--danger)]"}`}>
                {ch}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SignalsMock() {
  const items = [
    { s: "XAU/USD", b: "Bullish", c: 92 },
    { s: "EUR/USD", b: "Bullish", c: 78 },
    { s: "GBP/USD", b: "Bearish", c: 71 },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.s}
          className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 transition hover:border-[var(--accent-border)] hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">{item.s}</span>
            <span
              className={`rounded-md px-2 py-0.5 text-[10px] font-medium ${
                item.b === "Bullish"
                  ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                  : "bg-[var(--danger)]/10 text-[var(--danger)]"
              }`}
            >
              {item.b}
            </span>
          </div>
          <p className="mt-4 text-2xl font-semibold">{item.c}%</p>
          <p className="text-[10px] text-[var(--muted)]">confidence</p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[var(--surface-elevated)]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${item.c}%` }}
              transition={{ duration: 0.8 }}
              className="h-full rounded-full bg-[var(--accent)]"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function TerminalMock() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
        <p className="text-sm font-semibold">XAU/USD · Terminal</p>
        <svg viewBox="0 0 400 120" className="mt-3 h-28 w-full">
          <path
            d="M0 80 C50 70 80 90 120 60 C160 30 200 50 240 35 C280 20 320 40 360 25 L400 20"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
        <p className="text-[10px] uppercase tracking-wider text-[var(--muted)]">Order ticket</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button type="button" className="h-9 rounded-lg bg-[var(--accent)] text-xs font-semibold text-[#050607]">
            Buy
          </button>
          <button type="button" className="h-9 rounded-lg border border-[var(--border)] text-xs text-[var(--muted)]">
            Sell
          </button>
        </div>
        {["Entry 2651.40", "Stop 2644.20", "Target 2672.00"].map((r) => (
          <div key={r} className="mt-2 flex justify-between rounded-lg border border-[var(--border)] px-3 py-2 text-[11px]">
            <span className="text-[var(--muted)]">{r.split(" ")[0]}</span>
            <span className="font-medium">{r.split(" ")[1]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RiskMock() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-3 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
        <p className="text-sm font-semibold">Calculator</p>
        {["Balance $10,000", "Risk 1%", "Stop 7.2 pts"].map((l) => (
          <div key={l} className="rounded-lg border border-[var(--border)] px-3 py-2.5 text-xs text-[var(--muted-strong)]">
            {l}
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-[var(--accent-border)] bg-[var(--accent-soft)] p-4">
        <p className="text-[10px] uppercase tracking-wider text-[var(--accent)]">Suggested size</p>
        <p className="mt-2 text-3xl font-semibold">0.14 lots</p>
        <p className="mt-2 text-xs text-[var(--muted-strong)]">Max loss ≈ $100.00</p>
      </div>
    </div>
  );
}
