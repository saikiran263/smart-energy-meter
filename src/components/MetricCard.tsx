import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { AnimatedNumber } from "./AnimatedNumber";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: number;
  unit: string;
  decimals?: number;
  icon: LucideIcon;
  accent?: "primary" | "secondary" | "warning";
  max?: number;
  delay?: number;
}

const accentMap = {
  primary: "from-primary/30 to-primary/0 text-primary",
  secondary: "from-secondary/30 to-secondary/0 text-secondary",
  warning: "from-[hsl(var(--warning))]/30 to-transparent text-[hsl(var(--warning))]",
};

export const MetricCard = ({ label, value, unit, decimals = 0, icon: Icon, accent = "primary", max = 100, delay = 0 }: Props) => {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-card relative overflow-hidden p-6 group"
    >
      <div className={cn("absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-radial blur-3xl opacity-60 bg-gradient-to-br", accentMap[accent])} />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">{label}</p>
          <div className="mt-3 flex items-baseline gap-1.5">
            <AnimatedNumber value={value} decimals={decimals} className="text-4xl font-semibold tracking-tight tabular-nums" />
            <span className="text-sm font-medium text-muted-foreground">{unit}</span>
          </div>
        </div>
        <div className={cn("h-11 w-11 rounded-xl border border-border/60 flex items-center justify-center bg-muted/30", accentMap[accent].split(" ").pop())}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {/* Gauge bar */}
      <div className="relative mt-6">
        <div className="h-1.5 w-full rounded-full bg-muted/50 overflow-hidden">
          <motion.div
            className={cn("h-full rounded-full", accent === "primary" && "bg-primary", accent === "secondary" && "bg-secondary", accent === "warning" && "bg-[hsl(var(--warning))]")}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ boxShadow: `0 0 12px hsl(var(--${accent === "primary" ? "primary" : accent === "secondary" ? "secondary" : "warning"}))` }}
          />
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
          <span>0</span>
          <span>{max} {unit}</span>
        </div>
      </div>
    </motion.div>
  );
};
