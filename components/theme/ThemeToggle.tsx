"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");

    setTheme(currentTheme === "light" ? "dark" : "light");
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
