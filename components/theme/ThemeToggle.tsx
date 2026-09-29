"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

function getTheme(): "dark" | "light" {
  if (typeof document === "undefined") return "dark";
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  try {
    const stored = localStorage.getItem("veytrix-theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // ignore
  }
  return "dark";
}

function applyTheme(theme: "dark" | "light") {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("veytrix-theme", theme);
  } catch {
    // ignore
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = getTheme();
    applyTheme(t);
    setTheme(t);
    setReady(true);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
  }

  if (!ready) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)]"
      />
    );
  }

  return (
    <button
      type="button"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--foreground)] transition-all duration-200 hover:border-[var(--accent-border)] hover:bg-[var(--surface-elevated)] hover:scale-105 active:scale-95"
    >
      {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
