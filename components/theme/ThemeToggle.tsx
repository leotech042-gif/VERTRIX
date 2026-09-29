"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function toggleTheme() {
    const current = resolvedTheme ?? theme ?? "dark";
    setTheme(current === "light" ? "dark" : "light");
  }

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="theme-toggle relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)]"
      />
    );
  }

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="theme-toggle group relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--foreground)] transition-all duration-300 hover:border-[var(--accent-border)] hover:bg-[var(--surface-elevated)]"
    >
      <Sun
        size={17}
        strokeWidth={2}
        className="theme-sun absolute transition-all duration-300"
      />
      <Moon
        size={17}
        strokeWidth={2}
        className="theme-moon absolute transition-all duration-300"
      />
    </button>
  );
}
