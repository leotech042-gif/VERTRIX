"use client";

import { useEffect, useRef, useState } from "react";

type PriceChartProps = {
  symbol?: string;
  interval?: string;
  height?: number;
  className?: string;
};

type Candle = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
};

export function PriceChart({
  symbol = "XAU/USD",
  interval = "15m",
  height = 360,
  className = "",
}: PriceChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "live" | "fallback" | "error">(
    "loading",
  );
  const [source, setSource] = useState("");

  useEffect(() => {
    let disposed = false;
    let chart: { remove: () => void } | null = null;
    let resizeObserver: ResizeObserver | null = null;

    async function init() {
      if (!containerRef.current) return;

      try {
        const lc = await import("lightweight-charts");
        const { createChart, ColorType, CandlestickSeries } = lc;

        const isDark =
          document.documentElement.getAttribute("data-theme") !== "light";

        const instance = createChart(containerRef.current, {
          width: containerRef.current.clientWidth,
          height,
          layout: {
            background: { type: ColorType.Solid, color: "transparent" },
            textColor: isDark ? "#8c938c" : "#687067",
            fontFamily: "inherit",
          },
          grid: {
            vertLines: {
              color: isDark
                ? "rgba(255,255,255,0.04)"
                : "rgba(17,21,16,0.06)",
            },
            horzLines: {
              color: isDark
                ? "rgba(255,255,255,0.04)"
                : "rgba(17,21,16,0.06)",
            },
          },
          rightPriceScale: {
            borderColor: isDark
              ? "rgba(255,255,255,0.08)"
              : "rgba(17,21,16,0.09)",
          },
          timeScale: {
            borderColor: isDark
              ? "rgba(255,255,255,0.08)"
              : "rgba(17,21,16,0.09)",
            timeVisible: true,
            secondsVisible: false,
          },
        });

        chart = instance;

        const series = instance.addSeries(CandlestickSeries, {
          upColor: "#b5ff55",
          downColor: "#ff5f67",
          borderUpColor: "#b5ff55",
          borderDownColor: "#ff5f67",
          wickUpColor: "#b5ff55",
          wickDownColor: "#ff5f67",
        });

        resizeObserver = new ResizeObserver(() => {
          if (containerRef.current && chart) {
            instance.applyOptions({ width: containerRef.current.clientWidth });
          }
        });
        resizeObserver.observe(containerRef.current);

        setStatus("loading");
        const res = await fetch(
          `/api/market/klines?symbol=${encodeURIComponent(symbol)}&interval=${interval}`,
        );
        const json = await res.json();
        if (disposed) return;

        const candles: Candle[] = json.candles ?? [];
        if (candles.length > 0) {
          series.setData(
            candles.map((c) => ({
              time: c.time as lc.Time,
              open: c.open,
              high: c.high,
              low: c.low,
              close: c.close,
            })),
          );
          instance.timeScale().fitContent();
        }

        setSource(json.source ?? "");
        setStatus(json.source === "fallback" ? "fallback" : "live");
      } catch (err) {
        console.error("Chart error:", err);
        if (!disposed) setStatus("error");
      }
    }

    init();

    return () => {
      disposed = true;
      resizeObserver?.disconnect();
      try {
        chart?.remove();
      } catch {
        // ignore
      }
    };
  }, [symbol, interval, height]);

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div ref={containerRef} style={{ height }} className="w-full" />
      <div className="pointer-events-none absolute left-3 top-3 flex gap-2">
        <span className="rounded-md border border-[var(--border)] bg-[var(--surface)]/90 px-2 py-1 text-[10px] text-[var(--muted)]">
          {symbol}
        </span>
        {status === "live" && (
          <span className="rounded-md border border-[var(--accent-border)] bg-[var(--accent-soft)] px-2 py-1 text-[10px] text-[var(--accent)]">
            Live {source && `· ${source}`}
          </span>
        )}
        {status === "loading" && (
          <span className="rounded-md border border-[var(--border)] bg-[var(--surface)]/90 px-2 py-1 text-[10px] text-[var(--muted)]">
            Loading…
          </span>
        )}
        {status === "error" && (
          <span className="rounded-md border border-[var(--danger)]/30 bg-[var(--danger)]/10 px-2 py-1 text-[10px] text-[var(--danger)]">
            Chart unavailable
          </span>
        )}
        {status === "fallback" && (
          <span className="rounded-md border border-[var(--warning)]/30 bg-[var(--warning)]/10 px-2 py-1 text-[10px] text-[var(--warning)]">
            Offline data
          </span>
        )}
      </div>
    </div>
  );
}
