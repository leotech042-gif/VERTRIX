"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import { clearSession, getSession, type Session } from "@/lib/auth";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/markets", label: "Markets", icon: ChartCandlestick },
  { href: "/dashboard/signals", label: "Signals", icon: Brain },
  { href: "/dashboard/terminal", label: "Terminal", icon: Terminal },
  { href: "/dashboard/positions", label: "Positions", icon: Briefcase },
  { href: "/dashboard/risk-engine", label: "Risk", icon: ShieldCheck },
  { href: "/dashboard/journal", label: "Journal", icon: BookOpen },
  { href: "/dashboard/backtesting", label: "Backtesting", icon: FlaskConical },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSess] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const s = getSession();
    if (!s) {
      router.replace("/signup");
      return;
    }
    if (!s.verified) {
      router.replace("/verify-email");
      return;
    }
    setSess(s);
    setChecking(false);
  }, [router]);

  function logout() {
    clearSession();
    router.push("/");
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)] text-[var(--muted)]">
        Loading workspace…
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <aside className="fixed inset-y-0 left-0 z-40 flex w-56 flex-col border-r border-[var(--border)] bg-[var(--surface)] sm:w-60">
        <div className="border-b border-[var(--border)] px-4 py-3">
          <Link href="/" className="text-sm font-semibold">
            Veytrix
          </Link>
          {session && (
            <p className="mt-1 truncate text-[10px] text-[var(--muted)]">
              {session.name || session.email}
            </p>
          )}
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
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-[var(--border)] p-2">
          <Link
            href="/settings"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[var(--muted)] hover:bg-[var(--surface-elevated)] hover:text-[var(--foreground)]"
          >
            <Settings size={16} />
            Settings
          </Link>
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-[10px] text-[var(--muted)]">Theme</span>
            <ThemeToggle />
          </div>
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[var(--muted)] hover:bg-[var(--surface-elevated)] hover:text-[var(--foreground)]"
          >
            <LogOut size={16} />
            Log out
          </button>
        </div>
      </aside>

      <div className="ml-56 flex-1 sm:ml-60">{children}</div>
    </div>
  );
}
