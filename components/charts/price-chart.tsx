"use client";

import { useEffect, useRef } from "react";
import {
  createChart,
  ColorType,
  type IChartApi,
  type ISeriesApi,
  type CandlestickData,
  type Time,
} from "lightweight-charts";

type PriceChartProps = {
  symbol?: string;
  height?: number;
  className?: string;
};

/** Generate realistic-looking mock OHLC data for demo purposes */
function generateMockCandles(count = 120): CandlestickData<Time>[] {
  const candles: CandlestickData<Time>[] = [];
  let price = 2640 + Math.random() * 20;
  const now = Math.floor(Date.now() / 1000);
  const interval = 15 * 60; // 15m

  for (let i = count; i >= 0; i--) {
    const time = (now - i * interval) as Time;
    const open = price;
    const volatility = 1.5 + Math.random() * 3;
    const change = (Math.random() - 0.48) * volatility;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * 1.8;
    const low = Math.min(open, close) - Math.random() * 1.8;

    candles.push({
      time,
      open: +open.toFixed(2),
      high: +high.toFixed(2),
      low: +low.toFixed(2),
      close: +close.toFixed(2),
    });

    price = close;
  }

  return candles;
}

export function PriceChart({
  symbol = "XAU/USD",
  height = 360,
  className = "",
}: PriceChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

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
        scaleMargins: { top: 0.12, bottom: 0.12 },
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

    const data = generateMockCandles(150);
    series.setData(data);
    chart.timeScale().fitContent();

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

    return () => {
      resizeObserver.disconnect();
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, [height, symbol]);

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div ref={containerRef} style={{ height }} className="w-full" />
      <div className="pointer-events-none absolute left-3 top-3 rounded-md border border-[var(--border)] bg-[var(--surface)]/80 px-2.5 py-1 text-[10px] text-[var(--muted)] backdrop-blur-sm">
        {symbol} · Demo data
      </div>
    </div>
  );
}
