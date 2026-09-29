"use client";

import { useEffect } from "react";

/** Applies saved theme before paint to avoid flash */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    try {
      const stored = localStorage.getItem("veytrix-theme");
      const theme = stored === "light" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", theme);
    } catch {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  return <>{children}</>;
}
