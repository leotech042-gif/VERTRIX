"use client";

import { useEffect, useState } from "react";

const KEY = "veytrix-watchlist";
const DEFAULT = ["XAU/USD", "EUR/USD", "BTC/USD"];

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<string[]>(DEFAULT);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setWatchlist(parsed);
      }
    } catch {
      // ignore
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(watchlist));
    } catch {
      // ignore
    }
  }, [watchlist, ready]);

  function toggle(symbol: string) {
    setWatchlist((current) =>
      current.includes(symbol)
        ? current.filter((s) => s !== symbol)
        : [...current, symbol],
    );
  }

  function isSaved(symbol: string) {
    return watchlist.includes(symbol);
  }

  return { watchlist, toggle, isSaved, ready };
}
