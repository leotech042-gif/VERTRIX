"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { FAQ } from "@/components/landing/FAQ";
import { LiveTickerBar } from "@/components/landing/LiveTickerBar";
import { ProductShowcase } from "@/components/landing/showcase/ProductShowcase";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { PriceChart } from "@/components/charts/price-chart";
import {
  formatChange,
  formatPrice,
  useLiveTickers,
} from "@/hooks/useLiveTickers";

const features = [
  {
    icon: BarChart3,
    title: "Market Intelligence",
    description:
      "Read structure, momentum and price action across the markets you trade.",
  },
  {
    icon: Sparkles,
    title: "AI Trade Analysis",
    description:
      "Turn market conditions into structured trade ideas with clear reasoning.",
  },
  {
    icon: ShieldCheck,
    title: "Risk Intelligence",
    description:
      "Plan entries, stops and position risk before capital reaches the market.",
  },
];

export default function Home() {
  const { tickers } = useLiveTickers(30_000);
  const xau = tickers["XAU/USD"];

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      {/* Navigation */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)]/60 bg-[var(--background)]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--accent-border)] bg-[var(--accent-soft)]">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_14px_var(--accent)]" />
            </span>
            <span className="text-base font-semibold tracking-[-0.03em]">
              Veytrix
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            <a
              href="#platform"
              className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              Platform
            </a>
            <a
              href="#features"
              className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              Features
            </a>
            <a
              href="#intelligence"
              className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              Intelligence
            </a>
            <a
              href="#faq"
              className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/login"
              className="hidden text-sm font-medium text-[var(--muted-strong)] transition-colors hover:text-[var(--foreground)] sm:block"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="group flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[#050607] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_35px_rgba(181,255,85,0.18)]"
            >
              Get started
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-[88vh] items-center pt-20">
        <div className="absolute inset-0 -z-10 grid-background opacity-40" />
        <div className="absolute left-1/2 top-0 -z-10 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-[0.05] blur-[130px]" />

        <div className="mx-auto w-full max-w-7xl px-6 pb-16 pt-16 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-xs font-medium text-[var(--muted-strong)]"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" />
              Live market data connected
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="text-balance text-5xl font-semibold tracking-[-0.055em] sm:text-6xl lg:text-7xl"
            >
              Trade with{" "}
              <span className="text-[var(--accent)]">intelligence.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg"
            >
              Veytrix combines live market data, structure analysis and AI-powered
              trade planning into one focused trading environment.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <Link
                href="/signup"
                className="group flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-[#050607] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(181,255,85,0.2)]"
              >
                Start trading smarter
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <a
                href="#platform"
                className="flex h-12 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-6 text-sm font-medium transition-all duration-300 hover:border-[var(--accent-border)] hover:bg-[var(--surface-elevated)]"
              >
                Explore platform
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live prices strip */}
      <LiveTickerBar />

      {/* Platform showcase */}
      <div id="platform">
        <ProductShowcase />
      </div>

      {/* Features */}
      <section id="features" className="border-t border-[var(--border)] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              Built for serious traders
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Everything you need to understand the market.
            </h2>
            <p className="mt-5 text-base leading-7 text-[var(--muted)]">
              From live prices to structured analysis and risk planning — one
              workspace for the full trading process.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-border)] hover:bg-[var(--surface-elevated)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Icon size={20} strokeWidth={1.7} />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Intelligence — real chart */}
      <section
        id="intelligence"
        className="border-t border-[var(--border)] py-24"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                Live market intelligence
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Real prices. Real charts. Clear structure.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-[var(--muted)]">
                Charts pull from live market sources. No fake videos or generated
                media — only price data you can actually trade around.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  "Live forex, metals, crypto and indices",
                  "Candlestick charts with real OHLC data",
                  "Watchlist and instrument explorer",
                  "Risk calculator before you size a trade",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[10px] text-[var(--accent)]">
                      ✓
                    </span>
                    <span className="text-sm text-[var(--muted-strong)]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="/dashboard/markets"
                className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-[var(--accent)] px-5 text-sm font-semibold text-[#050607] transition hover:opacity-90"
              >
                Open markets
                <ArrowRight size={15} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.18)] sm:p-5"
            >
              <div className="mb-3 flex items-center justify-between px-1">
                <div>
                  <p className="text-xs text-[var(--muted)]">XAU/USD</p>
                  <p className="mt-0.5 text-lg font-semibold tabular-nums">
                    {formatPrice(xau?.price, "XAU/USD")}
                  </p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${
                    (xau?.changePercent ?? 0) >= 0
                      ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                      : "bg-[var(--danger)]/10 text-[var(--danger)]"
                  }`}
                >
                  {formatChange(xau?.changePercent)}
                </span>
              </div>
              <PriceChart symbol="XAU/USD" height={280} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* Footer */}
      <footer className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <Link href="/" className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--accent-border)] bg-[var(--accent-soft)]">
                  <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                </span>
                <span className="text-base font-semibold">Veytrix</span>
              </Link>
              <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--muted)]">
                Live market data and structured analysis for traders who want
                clarity before they risk capital.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em]">
                Platform
              </p>
              <div className="mt-4 space-y-2.5 text-sm text-[var(--muted)]">
                <Link className="block hover:text-[var(--foreground)]" href="/dashboard">
                  Dashboard
                </Link>
                <Link className="block hover:text-[var(--foreground)]" href="/dashboard/markets">
                  Markets
                </Link>
                <Link className="block hover:text-[var(--foreground)]" href="/dashboard/signals">
                  AI Signals
                </Link>
                <Link className="block hover:text-[var(--foreground)]" href="/dashboard/terminal">
                  Terminal
                </Link>
                <Link className="block hover:text-[var(--foreground)]" href="/dashboard/risk-engine">
                  Risk Engine
                </Link>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em]">
                Account
              </p>
              <div className="mt-4 space-y-2.5 text-sm text-[var(--muted)]">
                <Link className="block hover:text-[var(--foreground)]" href="/login">
                  Sign in
                </Link>
                <Link className="block hover:text-[var(--foreground)]" href="/signup">
                  Create account
                </Link>
                <a className="block hover:text-[var(--foreground)]" href="#faq">
                  FAQ
                </a>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em]">
                Legal
              </p>
              <div className="mt-4 space-y-2.5 text-sm text-[var(--muted)]">
                <span className="block">Privacy</span>
                <span className="block">Terms</span>
                <span className="block">Risk Disclosure</span>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-[var(--border)] pt-6 text-xs text-[var(--muted)] sm:flex-row sm:justify-between">
            <p>© 2026 Veytrix. All rights reserved.</p>
            <p>
              Trading involves risk. Veytrix provides tools and analysis — not
              financial advice.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
