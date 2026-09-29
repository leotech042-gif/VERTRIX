"use client";

import { useEffect, useRef, useState } from "react";
import {
  createChart,
  ColorType,
  type IChartApi,
  type ISeriesApi,
  type CandlestickData,
  type Time,
} from "lightweight-charts";
import { motion } from "motion/react";

type PriceChartProps = {
  symbol?: string;
  interval?: string;
  height?: number;
  className?: string;
};

type CandlePayload = {
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
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const [status, setStatus] = useState<"loading" | "live" | "fallback" | "error">(
    "loading",
  );
  const [source, setSource] = useState<string>("");

  useEffect(() => {
    if (!containerRef.current) return;

    const isDark =
      document.documentElement.getAttribute("data-theme") !== "light";

    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: isDark ? "#8c938c" : "#687067",
        fontFamily: "inherit",
      },
      grid: {
        vertLines: {
          color: isDark ? "rgba(255,255,255,0.04)" : "rgba(17,21,16,0.06)",
        },
        horzLines: {
          color: isDark ? "rgba(255,255,255,0.04)" : "rgba(17,21,16,0.06)",
        },
      },
      crosshair: {
        mode: 0,
        vertLine: {
          color: isDark ? "rgba(181,255,85,0.35)" : "rgba(112,184,45,0.4)",
          width: 1,
          style: 2,
          labelBackgroundColor: isDark ? "#101410" : "#f0f3ed",
        },
        horzLine: {
          color: isDark ? "rgba(181,255,85,0.35)" : "rgba(112,184,45,0.4)",
          width: 1,
          style: 2,
          labelBackgroundColor: isDark ? "#101410" : "#f0f3ed",
        },
      },
      rightPriceScale: {
        borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(17,21,16,0.09)",
        scaleMargins: { top: 0.1, bottom: 0.1 },
      },
      timeScale: {
        borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(17,21,16,0.09)",
        timeVisible: true,
        secondsVisible: false,
      },
      handleScroll: { vertTouchDrag: false },
    });

    const series = chart.addCandlestickSeries({
      upColor: "#b5ff55",
      downColor: "#ff5f67",
      borderUpColor: "#b5ff55",
      borderDownColor: "#ff5f67",
      wickUpColor: "#b5ff55",
      wickDownColor: "#ff5f67",
    });

    chartRef.current = chart;
    seriesRef.current = series;

    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: containerRef.current.clientWidth,
        });
      }
    });

    resizeObserver.observe(containerRef.current);

    let cancelled = false;

    async function loadData() {
      setStatus("loading");
      try {
        const res = await fetch(
          `/api/market/klines?symbol=${encodeURIComponent(symbol)}&interval=${interval}`,
        );
        const json = await res.json();

        if (cancelled) return;

        const candles: CandlePayload[] = json.candles ?? [];
        const mapped: CandlestickData<Time>[] = candles.map((c) => ({
          time: c.time as Time,
          open: c.open,
          high: c.high,
          low: c.low,
          close: c.close,
        }));

        if (mapped.length > 0 && seriesRef.current) {
          seriesRef.current.setData(mapped);
          chartRef.current?.timeScale().fitContent();
        }

        setSource(json.source ?? "unknown");
        setStatus(json.source === "fallback" ? "fallback" : "live");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    loadData();

    // Refresh every 45 seconds for near-live feel
    const timer = setInterval(loadData, 45_000);

    return () => {
      cancelled = true;
      clearInterval(timer);
      resizeObserver.disconnect();
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, [height, symbol, interval]);

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div ref={containerRef} style={{ height }} className="w-full" />

      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="pointer-events-none absolute left-3 top-3 flex items-center gap-2"
      >
        <span className="rounded-md border border-[var(--border)] bg-[var(--surface)]/85 px-2.5 py-1 text-[10px] text-[var(--muted)] backdrop-blur-sm">
          {symbol} · {interval}
        </span>

        {status === "loading" && (
          <span className="rounded-md border border-[var(--border)] bg-[var(--surface)]/85 px-2 py-1 text-[10px] text-[var(--muted)] backdrop-blur-sm">
            Loading…
          </span>
        )}

        {status === "live" && (
          <span className="flex items-center gap-1.5 rounded-md border border-[var(--accent-border)] bg-[var(--accent-soft)] px-2 py-1 text-[10px] font-medium text-[var(--accent)] backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
            Live · {source}
          </span>
        )}

        {status === "fallback" && (
          <span className="rounded-md border border-[var(--warning)]/40 bg-[var(--warning)]/10 px-2 py-1 text-[10px] text-[var(--warning)] backdrop-blur-sm">
            Offline mode
          </span>
        )}

        {status === "error" && (
          <span className="rounded-md border border-[var(--danger)]/40 bg-[var(--danger)]/10 px-2 py-1 text-[10px] text-[var(--danger)] backdrop-blur-sm">
            Data error
          </span>
        )}
      </motion.div>
    </div>
  );
}
