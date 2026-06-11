import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export const InsightCard = ({ icon: Icon, label, value, sub, delay = 0 }: { icon: LucideIcon; label: string; value: string; sub?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="glass-card p-5 flex items-center gap-4"
  >
    <div className="h-11 w-11 rounded-xl bg-muted/40 border border-border/60 flex items-center justify-center text-primary">
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="text-lg font-semibold tabular-nums">{value}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  </motion.div>
);
