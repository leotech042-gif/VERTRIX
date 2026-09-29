/** Risk 0.2% of account by default */
export const DEFAULT_RISK_PCT = 0.2;

export function positionSize(params: {
  balance: number;
  riskPercent?: number;
  entry: number;
  stop: number;
  /** $ per point for 1.0 lot (simplified) */
  pointValue?: number;
}) {
  const riskPct = params.riskPercent ?? DEFAULT_RISK_PCT;
  const riskAmount = params.balance * (riskPct / 100);
  const stopDistance = Math.abs(params.entry - params.stop);
  const pointValue = params.pointValue ?? 1;

  if (stopDistance <= 0 || pointValue <= 0) {
    return { riskAmount, lots: 0, stopDistance };
  }

  const lots = riskAmount / (stopDistance * pointValue);
  return {
    riskAmount: +riskAmount.toFixed(2),
    lots: +lots.toFixed(2),
    stopDistance: +stopDistance.toFixed(5),
  };
}
