"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BookOpen,
  Brain,
  Briefcase,
  ChartCandlestick,
  CreditCard,
  FlaskConical,
  History,
  LayoutDashboard,
  LineChart,
  Settings,
  Shield,
  Sparkles,
  Terminal,
  Wallet,
  Wrench,
  Bell,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/app", label: "Overview", icon: LayoutDashboard },
  { href: "/app/markets", label: "Markets", icon: ChartCandlestick },
  { href: "/app/analysis", label: "AI Analysis", icon: Brain },
  { href: "/app/signals", label: "AI Signals", icon: Sparkles },
  { href: "/app/terminal", label: "Terminal", icon: Terminal },
  { href: "/app/positions", label: "Positions", icon: Briefcase },
  { href: "/app/history", label: "Trade History", icon: History },
  { href: "/app/backtesting", label: "Backtesting", icon: FlaskConical },
  { href: "/app/strategies", label: "Strategy Builder", icon: Wrench },
  { href: "/app/journal", label: "Journal", icon: BookOpen },
  { href: "/app/risk", label: "Risk Engine", icon: Shield },
  { href: "/app/portfolio", label: "Portfolio", icon: Wallet },
  { href: "/app/notifications", label: "Notifications", icon: Bell },
  { href: "/app/subscription", label: "Subscription", icon: CreditCard },
  { href: "/app/settings", label: "Settings", icon: Settings },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <aside className="fixed inset-y-0 left-0 z-40 flex w-56 flex-col border-r border-[var(--border)] bg-[var(--surface)]">
        <div className="flex h-14 items-center gap-2 border-b border-[var(--border)] px-4">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--accent)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#060708]" />
          </span>
          <Link href="/" className="text-sm font-semibold tracking-tight">
            Veytrix
          </Link>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-3">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/app" ? pathname === "/app" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] transition",
                  active
                    ? "bg-[var(--accent-soft)] font-medium text-[var(--accent)]"
                    : "text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--fg)]",
                )}
              >
                <Icon size={15} strokeWidth={1.75} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-[var(--border)] p-3">
          <div className="mb-2 flex items-center gap-2 px-1 text-[10px] text-[var(--muted)]">
            <Activity size={12} className="text-[var(--warning)]" />
            API · configure providers
          </div>
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] text-[var(--muted)]">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </aside>

      <main className="ml-56 flex-1 min-h-screen">{children}</main>
    </div>
  );
}
