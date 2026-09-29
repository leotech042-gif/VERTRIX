"use client";

import { useCallback, useEffect, useState } from "react";

export type LiveTicker = {
  uiSymbol: string;
  price: number | null;
  changePercent: number | null;
  source?: string;
};

export function useLiveTickers(refreshMs = 20_000) {
  const [tickers, setTickers] = useState<Record<string, LiveTicker>>({});
  const [loading, setLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState<number | null>(null);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/market/tickers");
      if (!res.ok) throw new Error("Failed");
      const json = await res.json();

      const map: Record<string, LiveTicker> = {};
      for (const t of json.tickers ?? []) {
        if (t?.uiSymbol) {
          map[t.uiSymbol] = {
            uiSymbol: t.uiSymbol,
            price: t.price,
            changePercent: t.changePercent,
            source: t.source,
          };
        }
      }

      setTickers(map);
      setUpdatedAt(json.updatedAt ?? Date.now());
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, refreshMs);
    return () => clearInterval(id);
  }, [load, refreshMs]);

  return { tickers, loading, updatedAt, error, refresh: load };
}

export function formatPrice(price: number | null | undefined, symbol?: string) {
  if (price == null || Number.isNaN(price)) return "—";

  if (symbol?.includes("JPY") || symbol === "US100" || symbol === "US500") {
    return price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  if (symbol?.includes("BTC") || symbol?.includes("ETH")) {
    return price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  if (symbol?.includes("XAU") || symbol?.includes("XAG") || symbol === "USOIL") {
    return price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  // Forex majors
  return price.toLocaleString(undefined, {
    minimumFractionDigits: 4,
    maximumFractionDigits: 5,
  });
}

export function formatChange(change: number | null | undefined) {
  if (change == null || Number.isNaN(change)) return "—";
  const sign = change > 0 ? "+" : "";
  return `${sign}${change.toFixed(2)}%`;
}
