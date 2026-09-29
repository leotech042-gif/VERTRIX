"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  ChevronDown,
  FlaskConical,
  LineChart,
  Shield,
  Zap,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { ProductDemo } from "@/components/landing/ProductDemo";

const features = [
  {
    icon: LineChart,
    title: "Live markets",
    text: "Watch prices and structure across forex, metals, crypto and indices in one screen.",
  },
  {
    icon: Brain,
    title: "AI signals",
    text: "Get structured ideas with bias, confidence and clear invalidation levels.",
  },
  {
    icon: Zap,
    title: "Trading terminal",
    text: "Plan buy or sell with entry, stop and target beside the chart.",
  },
  {
    icon: Shield,
    title: "Risk engine",
    text: "Size every trade from account equity and stop distance before you risk capital.",
  },
  {
    icon: BookOpen,
    title: "Trade journal",
    text: "Log setups and outcomes so you can review what actually works.",
  },
  {
    icon: FlaskConical,
    title: "Backtesting",
    text: "Stress-test a style with sample trades before you take it live.",
  },
];

const steps = [
  {
    n: "01",
    title: "Scan the market",
    text: "Open Markets, pick an instrument, and read the live chart.",
  },
  {
    n: "02",
    title: "Form a plan",
    text: "Use signals and the terminal to define bias, entry and risk.",
  },
  {
    n: "03",
    title: "Size & review",
    text: "Run the risk engine, then journal the trade for later review.",
  },
];

const faqs = [
  {
    q: "What is Veytrix?",
    a: "Veytrix is a browser-based trading workspace. It combines live market views, signals, a planning terminal, risk sizing, a journal and simple backtesting — so your process lives in one place.",
  },
  {
    q: "Is market data real?",
    a: "Crypto uses public Binance data. Forex, metals and indices use public chart endpoints. If a feed is down, the app falls back gracefully instead of breaking the UI.",
  },
  {
    q: "Does it place trades at a broker?",
    a: "Not in this version. The terminal is for planning and education. Broker execution can be connected later when you choose a provider.",
  },
  {
    q: "Is this financial advice?",
    a: "No. Veytrix is a tool for analysis and process. You are responsible for every decision and for managing your own risk.",
  },
];

export default function HomePage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)] transition-transform duration-200 group-hover:scale-105">
              <span className="h-2 w-2 rounded-full bg-[#050607]" />
            </span>
            <span className="text-lg font-semibold tracking-tight">Veytrix</span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-[var(--muted)] md:flex">
            <a href="#product" className="transition-colors hover:text-[var(--foreground)]">
              Product
            </a>
            <a href="#features" className="transition-colors hover:text-[var(--foreground)]">
              Features
            </a>
            <a href="#workflow" className="transition-colors hover:text-[var(--foreground)]">
              Workflow
            </a>
            <a href="#faq" className="transition-colors hover:text-[var(--foreground)]">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Link
              href="/dashboard"
              className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[var(--accent)] px-4 text-sm font-semibold text-[#050607] transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
            >
              Open app
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-[0.07] blur-[120px]" />

        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-16 sm:pt-24">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-1.5 text-xs text-[var(--muted-strong)] shadow-sm">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              Trading workspace · Built for process
            </p>

            <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
              The desk where
              <span className="mt-1 block text-[var(--accent)]">
                preparation happens.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Markets, signals, terminal, risk, journal and backtesting — one
              focused environment so you stop juggling five tabs before every trade.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-7 text-sm font-semibold text-[#050607] transition-all duration-200 hover:opacity-90 hover:shadow-[0_12px_40px_rgba(181,255,85,0.25)] hover:-translate-y-0.5 active:translate-y-0 sm:w-auto"
              >
                Launch workspace
                <ArrowRight size={16} />
              </Link>
              <a
                href="#product"
                className="inline-flex h-12 w-full items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-7 text-sm font-medium transition-all duration-200 hover:border-[var(--accent-border)] hover:bg-[var(--surface-elevated)] sm:w-auto"
              >
                See the product
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Animated product demo */}
      <section id="product" className="border-t border-[var(--border)] py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
            className="mb-10 text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              Product tour
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              How Veytrix looks in use
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-[var(--muted)]">
              Interactive previews of the core screens — markets, signals, terminal and risk.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="float-y"
          >
            <ProductDemo />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-[var(--border)] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="max-w-2xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              Features
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Built around how traders actually work
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, text }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-border)] hover:bg-[var(--surface-elevated)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent)] transition-transform duration-300 group-hover:scale-110">
                  <Icon size={18} strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="border-t border-[var(--border)] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              Workflow
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Three steps. Less chaos.
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:border-[var(--accent-border)]"
              >
                <p className="text-sm font-semibold text-[var(--accent)]">{step.n}</p>
                <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/dashboard"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[var(--accent)] px-5 text-sm font-semibold text-[#050607] transition-all hover:opacity-90 hover:scale-[1.02]"
            >
              Open workspace
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-[var(--border)] py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-5">
          <h2 className="text-center text-3xl font-semibold tracking-tight">
            Questions, answered
          </h2>

          <div className="mt-10 space-y-3">
            {faqs.map((item, i) => {
              const open = faqOpen === i;
              return (
                <motion.div
                  key={item.q}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-colors hover:border-[var(--border-strong)]"
                >
                  <button
                    type="button"
                    onClick={() => setFaqOpen(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium transition-colors hover:text-[var(--accent)]"
                    aria-expanded={open}
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-[var(--muted)] transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                      >
                        <div className="border-t border-[var(--border)] px-5 pb-4 pt-3 text-sm leading-relaxed text-[var(--muted)]">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--border)] py-16">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Open the workspace and try the flow
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-[var(--muted)]">
            No account required for this demo build. Jump straight into the desk.
          </p>
          <Link
            href="/dashboard"
            className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-[var(--accent)] px-7 text-sm font-semibold text-[#050607] transition-all hover:opacity-90 hover:shadow-[0_12px_40px_rgba(181,255,85,0.22)] hover:-translate-y-0.5"
          >
            Launch Veytrix
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-[var(--border)] py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Veytrix</p>
          <p>Trading involves risk. Not financial advice.</p>
        </div>
      </footer>
    </div>
  );
}
