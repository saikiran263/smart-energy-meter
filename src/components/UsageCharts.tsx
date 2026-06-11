import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";
import type { HistoryPoint } from "@/lib/energy";

const tooltipStyle = {
  backgroundColor: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 12,
  fontSize: 12,
  padding: "8px 12px",
  boxShadow: "var(--shadow-elegant)",
};

export const HourlyAreaChart = ({ data }: { data: HistoryPoint[] }) => (
  <ResponsiveContainer width="100%" height={260}>
    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
      <defs>
        <linearGradient id="powerGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.55} />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 6" vertical={false} />
      <XAxis dataKey="label" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} interval={2} />
      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
      <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "hsl(var(--primary))", strokeOpacity: 0.3 }} formatter={(v: number) => [`${v} W`, "Power"]} />
      <Area type="monotone" dataKey="power" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#powerGrad)" />
    </AreaChart>
  </ResponsiveContainer>
);

export const DailyBarChart = ({ data }: { data: HistoryPoint[] }) => (
  <ResponsiveContainer width="100%" height={260}>
    <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
      <defs>
        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity={1} />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.7} />
        </linearGradient>
      </defs>
      <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 6" vertical={false} />
      <XAxis dataKey="label" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} interval={2} />
      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
      <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "hsl(var(--muted) / 0.4)" }} formatter={(v: number) => [`${v} kWh`, "Usage"]} />
      <Bar dataKey="kwh" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

export const ChartCard = ({ title, subtitle, children, action }: { title: string; subtitle?: string; children: React.ReactNode; action?: React.ReactNode }) => (
  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="glass-card p-6">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-base font-semibold">{title}</h3>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
    {children}
  </motion.div>
);
