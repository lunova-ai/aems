export type TimePoint = { value: number; timestamp?: string };

export function getEnergyTrendSeries() {
  return {
    unit: "%",
    history: [{ value: 50 }, { value: 54 }, { value: 52 }],
    forecast: [{ value: 56 }, { value: 58 }, { value: 60 }],
  };
}
