import { useState } from "react";
import { motion } from "framer-motion";
import { IndianRupee, Receipt } from "lucide-react";
import { Input } from "@/components/ui/input"; 

export const BillEstimator = ({ unitsKwh }: { unitsKwh: number }) => {
  const [rate, setRate] = useState(8);
  const total = unitsKwh * rate;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="glass-card p-6 relative overflow-hidden">
      <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-secondary/20 blur-3xl" />
      <div className="relative">
        <div className="flex items-center gap-2 mb-1">
          <Receipt className="h-4 w-4 text-secondary" />
          <h3 className="text-base font-semibold">Bill Estimator</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-5">Projected this month</p>

        <div className="flex items-baseline gap-1">
          <IndianRupee className="h-6 w-6 text-foreground" />
          <span className="text-5xl font-semibold tracking-tight tabular-nums">{total.toFixed(2)}</span>
        </div>

        <div className="mt-6 space-y-3">
          <div>
            <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Rate (₹ per kWh)</label>
            <Input
              type="number"
              value={rate}
              step={0.5}
              min={0}
              onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
              className="mt-1.5 bg-muted/30 border-border/60 font-mono"
            />
          </div>

          <div className="rounded-lg border border-border/60 bg-muted/20 div
          ide-y divide-border/60 text-sm">
            <Row label="Units consumed" value={`${unitsKwh.toFixed(2)} kWh`} />
            <Row label="Cost per unit" value={`₹ ${rate.toFixed(2)}`} />
            <Row label="Estimated total" value={`₹ ${total.toFixed(2)}`} bold />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Row = ({ label, value, bold }: { label: string; value: string; bold?: boolean }) => (
  <div className="flex justify-between px-4 py-2.5">
    <span className="text-muted-foreground">{label}</span>
    <span className={bold ? "font-semibold text-primary" : "font-medium"}>{value}</span>
  </div>
);
