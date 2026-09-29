"use client";

import { motion } from "motion/react";
import {
  formatChange,
  formatPrice,
  useLiveTickers,
} from "@/hooks/useLiveTickers";

const DISPLAY = ["XAU/USD", "BTC/USD", "ETH/USD", "EUR/USD", "GBP/USD", "US100"];

export function LiveTickerBar() {
  const { tickers, loading } = useLiveTickers(25_000);

  return (
    <div className="border-y border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto px-6 py-3 lg:px-8">
        <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
          Live
        </span>

        {DISPLAY.map((symbol, i) => {
          const t = tickers[symbol];
          const positive = (t?.changePercent ?? 0) >= 0;

          return (
            <motion.div
              key={symbol}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex shrink-0 items-center gap-2.5"
            >
              <span className="text-xs font-medium text-[var(--muted-strong)]">
                {symbol}
              </span>
              <span className="text-xs font-semibold tabular-nums">
                {loading && t?.price == null
                  ? "…"
                  : formatPrice(t?.price, symbol)}
              </span>
              <span
                className={`text-[10px] font-medium tabular-nums ${
                  positive ? "text-[var(--accent)]" : "text-[var(--danger)]"
                }`}
              >
                {formatChange(t?.changePercent)}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
