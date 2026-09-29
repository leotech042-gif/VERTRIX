"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  LineChart,
  Shield,
  Zap,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const features = [
  {
    icon: LineChart,
    title: "Live markets",
    text: "Real-time prices and candlestick charts across forex, metals, crypto and indices.",
  },
  {
    icon: Brain,
    title: "AI signals",
    text: "Structured trade ideas with bias, confidence, entry zones and risk levels.",
  },
  {
    icon: Shield,
    title: "Risk engine",
    text: "Size positions from account equity and stop distance before you enter.",
  },
  {
    icon: BookOpen,
    title: "Trade journal",
    text: "Log setups, outcomes and notes so you can review performance over time.",
  },
  {
    icon: BarChart3,
    title: "Backtesting",
    text: "Test ideas against historical structure before risking live capital.",
  },
  {
    icon: Zap,
    title: "Trading terminal",
    text: "Plan entries, stops and targets next to the chart in one workspace.",
  },
];

const faqs = [
  {
    q: "What is Veytrix?",
    a: "Veytrix is a trading workspace that combines live market data, charts, signal analysis, risk tools, journaling and backtesting in one product.",
  },
  {
    q: "Is the market data real?",
    a: "Yes. Crypto feeds use Binance public data. Forex, metals and indices use public market chart endpoints. Feeds can fall back if a provider is temporarily unavailable.",
  },
  {
    q: "Does Veytrix place trades for me?",
    a: "Not yet. The terminal is for planning and education. Broker execution can be added later when you connect an account provider.",
  },
  {
    q: "Is this financial advice?",
    a: "No. Veytrix is a technology and analysis tool. You remain responsible for every trading decision and for your own risk.",
  },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)]">
              <span className="h-2 w-2 rounded-full bg-[#050607]" />
            </span>
            <span className="text-lg font-semibold tracking-tight">Veytrix</span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-[var(--muted)] md:flex">
            <a href="#features" className="hover:text-[var(--foreground)]">
              Features
            </a>
            <a href="#how" className="hover:text-[var(--foreground)]">
              How it works
            </a>
            <a href="#faq" className="hover:text-[var(--foreground)]">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {mounted && <ThemeToggle />}
            <Link
              href="/login"
              className="hidden text-sm font-medium text-[var(--muted-strong)] hover:text-[var(--foreground)] sm:inline"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[var(--accent)] px-4 text-sm font-semibold text-[#050607] hover:opacity-90"
            >
              Get started
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(181,255,85,0.08),transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs text-[var(--muted-strong)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              Trading workspace for serious preparation
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              See the market clearly.
              <span className="mt-2 block text-[var(--accent)]">
                Trade with discipline.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Veytrix brings live data, charts, signals, risk tools, journaling and
              backtesting into one professional workspace — built for process, not
              noise.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-[#050607] hover:opacity-90 sm:w-auto"
              >
                Create free account
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex h-12 w-full items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-6 text-sm font-medium hover:border-[var(--accent-border)] sm:w-auto"
              >
                Open dashboard
              </Link>
            </div>
          </div>

          {/* Product preview cards */}
          <div className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-3">
            {[
              { label: "Markets", value: "Live feeds", sub: "FX · Metals · Crypto" },
              { label: "Workspace", value: "6 modules", sub: "Signals to journal" },
              { label: "Risk first", value: "Sized trades", sub: "Before you enter" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 text-left"
              >
                <p className="text-xs text-[var(--muted)]">{item.label}</p>
                <p className="mt-2 text-xl font-semibold">{item.value}</p>
                <p className="mt-1 text-xs text-[var(--muted)]">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-[var(--border)] py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
              Platform
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything in one place
            </h2>
            <p className="mt-4 text-[var(--muted)]">
              Stop jumping between charts, notes and calculators. Veytrix is built
              as a full trading desk in the browser.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--accent-border)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Icon size={18} />
                </div>
                <h3 className="mt-4 text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-[var(--border)] py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
              Workflow
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              A clearer path from idea to risk
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Read the market",
                text: "Open Markets, pick an instrument, and review live structure on the chart.",
              },
              {
                step: "02",
                title: "Plan the trade",
                text: "Use signals and the terminal to define bias, entry, stop and target.",
              },
              {
                step: "03",
                title: "Size and review",
                text: "Run the risk engine, then log the trade in your journal for later review.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
              >
                <p className="text-sm font-semibold text-[var(--accent)]">
                  {item.step}
                </p>
                <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/dashboard"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--accent)] px-5 text-sm font-semibold text-[#050607] hover:opacity-90"
            >
              Enter workspace
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-[var(--border)] py-20">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="text-center text-3xl font-semibold tracking-tight">
            Frequently asked questions
          </h2>
          <div className="mt-10 space-y-3">
            {faqs.map((item, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={item.q}
                  className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium"
                  >
                    {item.q}
                    <span className="text-[var(--muted)]">{open ? "−" : "+"}</span>
                  </button>
                  {open && (
                    <div className="border-t border-[var(--border)] px-5 pb-4 pt-3 text-sm leading-relaxed text-[var(--muted)]">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--border)] py-16">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Ready to build a better process?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-[var(--muted)]">
            Create an account and open the dashboard in under a minute.
          </p>
          <Link
            href="/signup"
            className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-[#050607] hover:opacity-90"
          >
            Get started free
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Veytrix. All rights reserved.</p>
          <p>Trading involves risk. Not financial advice.</p>
        </div>
      </footer>
    </div>
  );
}
