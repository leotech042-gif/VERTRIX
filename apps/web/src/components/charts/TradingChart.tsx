"use client";

import { useEffect, useRef, useState } from "react";
import { API_URL } from "@/lib/utils";

type Props = {
  symbol: string;
  timeframe: string;
  height?: number;
};

export function TradingChart({ symbol, timeframe, height = 480 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "live" | "error">("loading");
  const [source, setSource] = useState("");
  const [delayed, setDelayed] = useState(false);

  useEffect(() => {
    let chart: { remove: () => void } | null = null;
    let disposed = false;
    let ro: ResizeObserver | null = null;

    async function boot() {
      if (!ref.current) return;
      setStatus("loading");
      try {
        const lc = await import("lightweight-charts");
        const { createChart, ColorType, CandlestickSeries } = lc;

        const isDark =
          document.documentElement.getAttribute("data-theme") !== "light";

        const instance = createChart(ref.current, {
          width: ref.current.clientWidth,
          height,
          layout: {
            background: { type: ColorType.Solid, color: "transparent" },
            textColor: isDark ? "#8a918a" : "#667066",
            fontFamily: "inherit",
          },
          grid: {
            vertLines: {
              color: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)",
            },
            horzLines: {
              color: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)",
            },
          },
          rightPriceScale: {
            borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)",
          },
          timeScale: {
            borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)",
            timeVisible: true,
            secondsVisible: false,
          },
          crosshair: { mode: 0 },
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

        ro = new ResizeObserver(() => {
          if (ref.current) {
            instance.applyOptions({ width: ref.current.clientWidth });
          }
        });
        ro.observe(ref.current);

        const res = await fetch(
          `${API_URL}/api/v1/market/klines?symbol=${encodeURIComponent(symbol)}&timeframe=${timeframe}&limit=250`,
        );
        if (!res.ok) throw new Error(`klines ${res.status}`);
        const json = await res.json();
        if (disposed) return;

        const candles = json.candles || [];
        series.setData(
          candles.map((c: { time: number; open: number; high: number; low: number; close: number }) => ({
            time: c.time as import("lightweight-charts").UTCTimestamp,
            open: c.open,
            high: c.high,
            low: c.low,
            close: c.close,
          })),
        );
        instance.timeScale().fitContent();
        setSource(json.source || "");
        setDelayed(Boolean(json.delayed));
        setStatus("live");
      } catch (e) {
        console.error(e);
        if (!disposed) setStatus("error");
      }
    }

    boot();
    return () => {
      disposed = true;
      ro?.disconnect();
      try {
        chart?.remove();
      } catch {
        /* ignore */
      }
    };
  }, [symbol, timeframe, height]);

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
      <div ref={ref} style={{ height }} className="w-full" />
      <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-2">
        <span className="rounded-md border border-[var(--border)] bg-[var(--bg)]/90 px-2 py-1 text-[10px] text-[var(--muted)]">
          {symbol} · {timeframe}
        </span>
        {status === "live" && (
          <span className="rounded-md border border-[var(--accent-border)] bg-[var(--accent-soft)] px-2 py-1 text-[10px] text-[var(--accent)]">
            {delayed ? "Delayed" : "Live"} · {source}
          </span>
        )}
        {status === "loading" && (
          <span className="rounded-md border border-[var(--border)] bg-[var(--bg)]/90 px-2 py-1 text-[10px] text-[var(--muted)]">
            Loading chart…
          </span>
        )}
        {status === "error" && (
          <span className="rounded-md border border-[var(--danger)]/30 bg-[var(--danger)]/10 px-2 py-1 text-[10px] text-[var(--danger)]">
            Chart error — is the API running?
          </span>
        )}
      </div>
    </div>
  );
}
