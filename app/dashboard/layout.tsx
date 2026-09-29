"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  Brain,
  ChartCandlestick,
  LayoutDashboard,
  LogOut,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/markets", label: "Markets", icon: ChartCandlestick },
  { href: "/dashboard/signals", label: "AI Signals", icon: Brain },
  { href: "/dashboard/terminal", label: "Terminal", icon: Terminal },
  { href: "/dashboard/risk-engine", label: "Risk Engine", icon: ShieldCheck },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-[var(--border)] bg-[var(--surface)]">
        <div className="flex h-16 items-center gap-2.5 border-b border-[var(--border)] px-5">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--accent-border)] bg-[var(--accent-soft)]">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent)]" />
            </span>
            <span className="text-base font-semibold tracking-[-0.03em]">
              Veytrix
            </span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive =
              href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                  isActive
                    ? "bg-[var(--accent-soft)] font-medium text-[var(--accent)]"
                    : "text-[var(--muted)] hover:bg-[var(--surface-elevated)] hover:text-[var(--foreground)]"
                }`}
              >
                <Icon size={17} strokeWidth={1.7} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-[var(--border)] p-3">
          <div className="mb-3 flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <Activity size={14} className="text-[var(--warning)]" />
              <span className="text-[10px] text-[var(--muted)]">
                Feed offline
              </span>
            </div>
            <ThemeToggle />
          </div>

          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[var(--muted)] transition hover:bg-[var(--surface-elevated)] hover:text-[var(--foreground)]"
          >
            <LogOut size={17} strokeWidth={1.7} />
            Back to site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="ml-60 flex-1">{children}</div>
    </div>
  );
}
