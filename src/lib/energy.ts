export type LiveReading = {
  voltage: number; // V
  current: number; // A
  power: number;   // W
  timestamp: number;
};

export type HistoryPoint = {
  label: string;
  power: number; // W avg
  kwh: number;
};

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

export function generateReading(prev?: LiveReading): LiveReading {
  const voltage = prev ? Math.max(215, Math.min(240, prev.voltage + rand(-1.2, 1.2))) : rand(225, 235);
  const current = prev ? Math.max(0.4, Math.min(12, prev.current + rand(-0.4, 0.4))) : rand(2, 6);
  return {
    voltage: +voltage.toFixed(1),
    current: +current.toFixed(2),
    power: +(voltage * current).toFixed(1),
    timestamp: Date.now(),
  };
}

export function generateDaily(days = 30): HistoryPoint[] {
  const out: HistoryPoint[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const kwh = +(rand(6, 18)).toFixed(2);
    out.push({
      label: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      power: +(kwh * 1000 / 24).toFixed(0),
      kwh,
    });
  }
  return out;
}

export function generateHourly(): HistoryPoint[] {
  const out: HistoryPoint[] = [];
  for (let h = 0; h < 24; h++) {
    // realistic curve: low at night, peaks morning + evening
    const base = 200 + Math.sin((h - 6) / 24 * Math.PI * 2) * 150;
    const peakBoost = (h >= 18 && h <= 22) ? 600 : (h >= 7 && h <= 10) ? 350 : 0;
    const power = Math.max(80, base + peakBoost + rand(-80, 80));
    out.push({
      label: `${String(h).padStart(2, "0")}:00`,
      power: +power.toFixed(0),
      kwh: +(power / 1000).toFixed(3),
    });
  }
  return out;
}
