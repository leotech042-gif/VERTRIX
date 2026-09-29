"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
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
    title: "Live markets & charts",
    text: "Real public market data and charts you can use for your own analysis.",
  },
  {
    icon: Brain,
    title: "Structure-based signals",
    text: "Ideas labeled with order blocks, breakers, liquidity, H&S, break & retest — with reasons.",
  },
  {
    icon: Zap,
    title: "Terminal",
    text: "Plan entry, stop and target next to the chart.",
  },
  {
    icon: Shield,
    title: "Risk engine (0.2%)",
    text: "Size lots from account balance with a default 0.2% risk per idea.",
  },
  {
    icon: BookOpen,
    title: "Journal & performance",
    text: "Log trades and review last week, month, year, or all-time.",
  },
  {
    icon: FlaskConical,
    title: "Backtesting",
    text: "Educational simulations to stress-test a style before you size up.",
  },
];

const faqs = [
  {
    q: "Is market data real?",
    a: "Crypto uses public Binance data. FX and metals use public chart endpoints. If a feed is down, the UI falls back cleanly.",
  },
  {
    q: "Do signals guarantee profits?",
    a: "No. Signals are structure-based ideas with reasoning. You still manage risk and decisions.",
  },
  {
    q: "Is this financial advice?",
    a: "No. Trading involves risk of loss. Use the tools as process support only.",
  },
];

export default function HomePage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Veytrix
          </Link>
          <nav className="hidden gap-8 text-sm text-[var(--muted)] md:flex">
            <a href="#product" className="hover:text-[var(--foreground)]">
              Product
            </a>
            <a href="#features" className="hover:text-[var(--foreground)]">
              Features
            </a>
            <a href="#faq" className="hover:text-[var(--foreground)]">
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/dashboard"
              className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[var(--accent)] px-4 text-sm font-semibold text-[#050607] hover:opacity-90"
            >
              Open app <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden px-5 pb-16 pt-20">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
        <div className="relative mx-auto max-w-3xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl"
          >
            Trade with process.
            <span className="mt-2 block text-[var(--accent)]">Not promises.</span>
          </motion.h1>
          <p className="mx-auto mt-6 max-w-xl text-[var(--muted)]">
            Live data, structure analysis, 0.2% risk sizing, journal analytics and
            charts — open the workspace with no login required.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/dashboard"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-[var(--accent)] px-7 text-sm font-semibold text-[#050607] hover:opacity-90"
            >
              Launch workspace <ArrowRight size={16} />
            </Link>
            <a
              href="#product"
              className="inline-flex h-12 items-center rounded-full border border-[var(--border-strong)] px-7 text-sm hover:border-[var(--accent-border)]"
            >
              See product
            </a>
          </div>
        </div>
      </section>

      <section id="product" className="border-t border-[var(--border)] py-16">
        <div className="mx-auto max-w-5xl px-5">
          <h2 className="text-center text-3xl font-semibold">Product tour</h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-[var(--muted)]">
            Interactive previews of markets, signals, terminal and risk.
          </p>
          <div className="mt-10">
            <ProductDemo />
          </div>
        </div>
      </section>

      <section id="features" className="border-t border-[var(--border)] py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl font-semibold">What you get</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:-translate-y-1 hover:border-[var(--accent-border)]"
              >
                <Icon size={18} className="text-[var(--accent)]" />
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="border-t border-[var(--border)] py-16">
        <div className="mx-auto max-w-2xl px-5">
          <h2 className="text-center text-3xl font-semibold">FAQ</h2>
          <div className="mt-8 space-y-3">
            {faqs.map((item, i) => {
              const open = faqOpen === i;
              return (
                <div
                  key={item.q}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
                >
                  <button
                    type="button"
                    onClick={() => setFaqOpen(open ? null : i)}
                    className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-sm font-medium"
                  >
                    {item.q}
                    <ChevronDown
                      size={16}
                      className={`text-[var(--muted)] transition ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="border-t border-[var(--border)] px-5 pb-4 pt-3 text-sm text-[var(--muted)]">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--border)] py-8 text-center text-xs text-[var(--muted)]">
        © {new Date().getFullYear()} Veytrix · Trading involves risk · Not
        financial advice
      </footer>
    </div>
  );
}
