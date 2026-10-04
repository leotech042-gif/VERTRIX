"""Position sizing — default risk 0.2% of equity."""

from __future__ import annotations


def position_size(
    *,
    balance: float,
    risk_percent: float = 0.2,
    entry: float,
    stop: float,
    point_value: float = 1.0,
) -> dict:
    risk_amount = balance * (risk_percent / 100.0)
    stop_distance = abs(entry - stop)
    if stop_distance <= 0 or point_value <= 0:
        lots = 0.0
    else:
        lots = risk_amount / (stop_distance * point_value)

    return {
        "risk_percent": risk_percent,
        "risk_amount": round(risk_amount, 2),
        "stop_distance": round(stop_distance, 5),
        "lots": round(lots, 2),
        "point_value": point_value,
        "note": "Verify contract specs with your broker before live use.",
    }
