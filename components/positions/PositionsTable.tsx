"use client";

type Row = {
  id: string;
  symbol: string;
  side: string;
  size: string;
  entry: string;
  status: string;
};

export function PositionsTable({
  rows,
  onClose,
  onRemove,
}: {
  rows: Row[];
  onClose?: (id: string) => void;
  onRemove?: (id: string) => void;
}) {
  if (rows.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-[var(--muted)]">
        No positions to show.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[480px] text-left text-sm">
        <thead>
          <tr className="border-b border-[var(--border)] text-[10px] uppercase tracking-wider text-[var(--muted)]">
            <th className="px-3 py-2 font-medium">Symbol</th>
            <th className="px-3 py-2 font-medium">Side</th>
            <th className="px-3 py-2 font-medium">Size</th>
            <th className="px-3 py-2 font-medium">Entry</th>
            <th className="px-3 py-2 font-medium">Status</th>
            <th className="px-3 py-2 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-[var(--border)]">
              <td className="px-3 py-3 font-medium">{r.symbol}</td>
              <td className="px-3 py-3">{r.side}</td>
              <td className="px-3 py-3">{r.size}</td>
              <td className="px-3 py-3">{r.entry}</td>
              <td className="px-3 py-3">{r.status}</td>
              <td className="px-3 py-3 text-right">
                {r.status === "Open" && onClose && (
                  <button
                    type="button"
                    onClick={() => onClose(r.id)}
                    className="mr-2 text-xs text-[var(--accent)]"
                  >
                    Close
                  </button>
                )}
                {onRemove && (
                  <button
                    type="button"
                    onClick={() => onRemove(r.id)}
                    className="text-xs text-[var(--danger)]"
                  >
                    Remove
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
