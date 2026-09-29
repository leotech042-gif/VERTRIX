import Link from "next/link";
import { ArrowRight, BarChart3, ShieldCheck, Sparkles } from "lucide-react";
import { FAQ } from "@/components/landing/FAQ";
import { ProductShowcase } from "@/components/landing/showcase/ProductShowcase";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

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
  return (
    <main className="min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      {/* Navigation */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--accent-border)] bg-[var(--accent-soft)]">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_18px_var(--accent)]" />
            </span>

            <span className="text-lg font-semibold tracking-[-0.03em]">
              Veytrix
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="#platform"
              className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              Platform
            </Link>

            <Link
              href="#features"
              className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              Features
            </Link>

            <Link
              href="#intelligence"
              className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              Intelligence
            </Link>

            <Link
              href="#faq"
              className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              FAQ
            </Link>
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
              className="group flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[#050607] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_35px_rgba(181,255,85,0.18)]"
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
      <section className="relative flex min-h-screen items-center pt-24">
        <div className="absolute inset-0 -z-10 grid-background opacity-40" />

        <div className="absolute left-1/2 top-0 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-[0.045] blur-[140px]" />

        <div className="mx-auto w-full max-w-7xl px-6 pb-24 pt-20 lg:px-8 lg:pb-32">
          <div className="mx-auto max-w-4xl text-center">
            {/* Eyebrow */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-xs font-medium text-[var(--muted-strong)] shadow-[0_10px_40px_rgba(0,0,0,0.12)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" />
              AI-powered trading intelligence
            </div>

            {/* Heading */}
            <h1 className="text-balance text-5xl font-semibold tracking-[-0.055em] sm:text-6xl lg:text-8xl">
              Trade with{" "}
              <span className="text-[var(--accent)]">intelligence.</span>
            </h1>

            {/* Description */}
            <p className="text-pretty mx-auto mt-7 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">
              Veytrix combines market structure, price action and AI-powered
              analysis into one intelligent trading environment.
            </p>

            {/* Actions */}
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
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

              <Link
                href="#platform"
                className="flex h-12 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-6 text-sm font-medium text-[var(--foreground)] transition-all duration-300 hover:border-[var(--accent-border)] hover:bg-[var(--surface-elevated)]"
              >
                Explore Veytrix
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Platform Showcase */}
      <ProductShowcase />

      {/* Features */}
      <section id="features" className="border-t border-[var(--border)] py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              Built for serious traders
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Everything you need to understand the market.
            </h2>

            <p className="mt-5 text-base leading-7 text-[var(--muted)]">
              Veytrix is designed around the actual trading workflow — from
              market analysis to execution planning and risk management.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-border)] hover:bg-[var(--surface-elevated)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Icon size={20} strokeWidth={1.7} />
                  </div>

                  <h3 className="mt-6 text-lg font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Intelligence */}
      <section
        id="intelligence"
        className="border-t border-[var(--border)] py-28"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                Veytrix intelligence
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
                From raw price data to a structured trading plan.
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-[var(--muted)]">
                Instead of throwing random indicators at a chart, Veytrix is
                built around structure, liquidity, price action and disciplined
                risk management.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Multi-timeframe market analysis",
                  "Structured AI trade reasoning",
                  "Entry, stop-loss and target planning",
                  "Risk-aware position analysis",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                      ✓
                    </span>

                    <span className="text-sm text-[var(--muted-strong)]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.2)]">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[var(--muted)]">
                      AI trade analysis
                    </p>

                    <p className="mt-1 text-lg font-semibold">XAU/USD</p>
                  </div>

                  <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[10px] font-medium text-[var(--accent)]">
                    ACTIVE
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-[var(--border)] p-4">
                    <p className="text-[10px] uppercase tracking-wider text-[var(--muted)]">
                      Bias
                    </p>

                    <p className="mt-2 text-sm font-semibold text-[var(--accent)]">
                      Bullish
                    </p>
                  </div>

                  <div className="rounded-xl border border-[var(--border)] p-4">
                    <p className="text-[10px] uppercase tracking-wider text-[var(--muted)]">
                      Confidence
                    </p>

                    <p className="mt-2 text-sm font-semibold">92%</p>
                  </div>
                </div>

                <div className="mt-3 rounded-xl border border-[var(--border)] p-4">
                  <p className="text-[10px] uppercase tracking-wider text-[var(--muted)]">
                    Setup
                  </p>

                  <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p className="text-[9px] text-[var(--muted)]">Entry</p>
                      <p className="mt-1 text-xs font-medium">2,648.20</p>
                    </div>

                    <div>
                      <p className="text-[9px] text-[var(--muted)]">SL</p>
                      <p className="mt-1 text-xs font-medium">2,640.80</p>
                    </div>

                    <div>
                      <p className="text-[9px] text-[var(--muted)]">TP</p>
                      <p className="mt-1 text-xs font-medium text-[var(--accent)]">
                        2,685.20
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* Footer */}
      <footer className="border-t border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
            {/* Brand */}
            <div>
              <Link href="/" className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--accent-border)] bg-[var(--accent-soft)]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_18px_var(--accent)]" />
                </span>

                <span className="text-lg font-semibold tracking-[-0.03em]">
                  Veytrix
                </span>
              </Link>

              <p className="mt-5 max-w-sm text-sm leading-6 text-[var(--muted)]">
                AI-powered trading intelligence for traders who want a clearer,
                more structured way to understand the markets.
              </p>

              {/* Socials */}
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <a
                  href="#"
                  aria-label="Veytrix on X"
                  className="flex h-9 items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 text-[11px] text-[var(--muted)] transition-all hover:border-[var(--accent-border)] hover:text-[var(--foreground)]"
                >
                  X
                </a>

                <a
                  href="#"
                  aria-label="Veytrix on Instagram"
                  className="flex h-9 items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 text-[11px] text-[var(--muted)] transition-all hover:border-[var(--accent-border)] hover:text-[var(--foreground)]"
                >
                  Instagram
                </a>

                <a
                  href="#"
                  aria-label="Veytrix on LinkedIn"
                  className="flex h-9 items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 text-[11px] text-[var(--muted)] transition-all hover:border-[var(--accent-border)] hover:text-[var(--foreground)]"
                >
                  LinkedIn
                </a>

                <a
                  href="#"
                  aria-label="Veytrix on GitHub"
                  className="flex h-9 items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 text-[11px] text-[var(--muted)] transition-all hover:border-[var(--accent-border)] hover:text-[var(--foreground)]"
                >
                  GitHub
                </a>
              </div>
            </div>

            {/* Platform */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em]">
                Platform
              </p>

              <div className="mt-5 space-y-3 text-sm text-[var(--muted)]">
                <Link
                  className="block transition-colors hover:text-[var(--foreground)]"
                  href="/dashboard"
                >
                  Dashboard
                </Link>

                <Link
                  className="block transition-colors hover:text-[var(--foreground)]"
                  href="/dashboard/markets"
                >
                  Markets
                </Link>

                <Link
                  className="block transition-colors hover:text-[var(--foreground)]"
                  href="/dashboard/signals"
                >
                  AI Signals
                </Link>

                <Link
                  className="block transition-colors hover:text-[var(--foreground)]"
                  href="/dashboard/terminal"
                >
                  Trading Terminal
                </Link>

                <Link
                  className="block transition-colors hover:text-[var(--foreground)]"
                  href="/dashboard/risk-engine"
                >
                  Risk Engine
                </Link>
              </div>
            </div>

            {/* Company */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em]">
                Company
              </p>

              <div className="mt-5 space-y-3 text-sm text-[var(--muted)]">
                <Link
                  className="block transition-colors hover:text-[var(--foreground)]"
                  href="#features"
                >
                  Features
                </Link>

                <Link
                  className="block transition-colors hover:text-[var(--foreground)]"
                  href="#faq"
                >
                  FAQ
                </Link>

                <Link
                  className="block transition-colors hover:text-[var(--foreground)]"
                  href="/login"
                >
                  Sign in
                </Link>

                <Link
                  className="block transition-colors hover:text-[var(--foreground)]"
                  href="/signup"
                >
                  Create account
                </Link>
              </div>
            </div>

            {/* Legal */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em]">
                Legal
              </p>

              <div className="mt-5 space-y-3 text-sm text-[var(--muted)]">
                <a
                  href="#"
                  className="block transition-colors hover:text-[var(--foreground)]"
                >
                  Privacy
                </a>

                <a
                  href="#"
                  className="block transition-colors hover:text-[var(--foreground)]"
                >
                  Terms
                </a>

                <a
                  href="#"
                  className="block transition-colors hover:text-[var(--foreground)]"
                >
                  Risk Disclosure
                </a>
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-[var(--border)] pt-6 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Veytrix. All rights reserved.</p>

            <p>
              Trading involves risk. Veytrix provides technology and analysis
              tools, not financial advice.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
