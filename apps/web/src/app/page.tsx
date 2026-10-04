import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <header className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <span className="text-lg font-semibold tracking-tight">Veytrix</span>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/app"
            className="inline-flex h-10 items-center gap-1.5 rounded-full bg-[var(--accent)] px-4 text-sm font-semibold text-[#060708] hover:opacity-90"
          >
            Open terminal <ArrowRight size={14} />
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-5 pb-24 pt-20 text-center">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
          Trading workspace
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Analyze markets.
          <span className="mt-2 block text-[var(--accent)]">Manage risk.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-[var(--muted)]">
          Custom charting, structure analysis, signals with evidence, paper
          execution and journaling — built as a real platform, not a demo of
          fake prices.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/app"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-[var(--accent)] px-6 text-sm font-semibold text-[#060708] hover:opacity-90"
          >
            Launch app <ArrowRight size={16} />
          </Link>
          <Link
            href="/app/terminal"
            className="inline-flex h-12 items-center rounded-full border border-[var(--border-strong)] px-6 text-sm hover:border-[var(--accent-border)]"
          >
            Chart terminal
          </Link>
        </div>
        <p className="mt-10 text-xs text-[var(--muted)]">
          No buy/sell signals on this page. Trading involves risk. Not financial
          advice.
        </p>
      </section>
    </div>
  );
}
