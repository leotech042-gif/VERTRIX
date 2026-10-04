import Link from "next/link";

const cards = [
  { href: "/app/markets", title: "Markets", desc: "Symbols, prices, feed status" },
  { href: "/app/terminal", title: "Terminal", desc: "Charts, drawings, planning" },
  { href: "/app/analysis", title: "AI Analysis", desc: "Multi-timeframe structure" },
  { href: "/app/signals", title: "AI Signals", desc: "Validated setups + lifecycle" },
  { href: "/app/risk", title: "Risk Engine", desc: "0.2% default position sizing" },
  { href: "/app/journal", title: "Journal", desc: "Plans vs outcomes" },
];

export default function OverviewPage() {
  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Workspace status. Connect the Python API for live market data.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[var(--accent-border)]"
          >
            <p className="font-medium">{c.title}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{c.desc}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm text-[var(--muted)]">
        <p className="font-medium text-[var(--fg)]">Phase 1 foundation</p>
        <p className="mt-2">
          Frontend shell and FastAPI market/risk endpoints are in place. Custom
          canvas charting, full SMC engine, paper trading and subscriptions ship
          in later phases per the product specification.
        </p>
      </div>
    </div>
  );
}
