"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Brain,
  Briefcase,
  ChartCandlestick,
  FlaskConical,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/markets", label: "Markets", icon: ChartCandlestick },
  { href: "/dashboard/signals", label: "AI Signals", icon: Brain },
  { href: "/dashboard/terminal", label: "Terminal", icon: Terminal },
  { href: "/dashboard/positions", label: "Positions", icon: Briefcase },
  { href: "/dashboard/risk-engine", label: "Risk Engine", icon: ShieldCheck },
  { href: "/dashboard/journal", label: "Journal", icon: BookOpen },
  { href: "/dashboard/backtesting", label: "Backtesting", icon: FlaskConical },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <aside className="fixed inset-y-0 left-0 z-40 flex w-56 flex-col border-r border-[var(--border)] bg-[var(--surface)] sm:w-60">
        <div className="flex h-14 items-center gap-2 border-b border-[var(--border)] px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--accent)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#050607]" />
            </span>
            <span className="text-sm font-semibold">Veytrix</span>
          </Link>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-3">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition ${
                  active
                    ? "bg-[var(--accent-soft)] font-medium text-[var(--accent)]"
                    : "text-[var(--muted)] hover:bg-[var(--surface-elevated)] hover:text-[var(--foreground)]"
                }`}
              >
                <Icon size={16} strokeWidth={1.75} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-[var(--border)] p-2">
          <Link
            href="/settings"
            className={`mb-1 flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition ${
              pathname.startsWith("/settings")
                ? "bg-[var(--accent-soft)] font-medium text-[var(--accent)]"
                : "text-[var(--muted)] hover:bg-[var(--surface-elevated)] hover:text-[var(--foreground)]"
            }`}
          >
            <Settings size={16} />
            Settings
          </Link>
          <div className="mb-1 flex items-center justify-between px-3 py-2">
            <span className="text-[10px] text-[var(--muted)]">Theme</span>
            <ThemeToggle />
          </div>
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[var(--muted)] hover:bg-[var(--surface-elevated)] hover:text-[var(--foreground)]"
          >
            <LogOut size={16} />
            Exit
          </Link>
        </div>
      </aside>

      <div className="ml-56 flex-1 sm:ml-60">{children}</div>
    </div>
  );
}
