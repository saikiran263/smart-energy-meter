import { useMemo } from "react";
import { Activity, Zap, Bolt, TrendingUp, TrendingDown, Gauge, CalendarRange } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopBar } from "@/components/TopBar";
import { MetricCard } from "@/components/MetricCard";
import { ChartCard, DailyBarChart, HourlyAreaChart } from "@/components/UsageCharts";
import { BillEstimator } from "@/components/BillEstimator";
import { InsightCard } from "@/components/InsightCard";
import { useLiveMeter } from "@/hooks/useLiveMeter";
import { useHistory } from "@/hooks/usehistory";

const Index = () => {
  const { reading } = useLiveMeter();
  const { hourly, daily } = usehistory();
  const monthlyKwh = useMemo(() => +daily.reduce((s, d) => s + d.kwh, 0).toFixed(2), [daily]);
  const weeklyKwh = useMemo(() => +daily.slice(-7).reduce((s, d) => s + d.kwh, 0).toFixed(2), [daily]);
  const todayKwh = daily[daily.length - 1]?.kwh ?? 0;

  const peak = hourly.length
? hourly.reduce((a,b)=>(b.power>a.power?b:a))
: {power:0,label:"--"};

const low = hourly.length
? hourly.reduce((a,b)=>(b.power<a.power?b:a))
: {power:0,label:"--"};

const avg = hourly.length
? +(hourly.reduce((s,h)=>s+h.power,0)/hourly.length).toFixed(0)
: 0;

//const peak = useMemo(() => hourly.reduce((a, b) => (b.power > a.power ? b : a), hourly[0]), [hourly]);
  //const low = useMemo(() => hourly.reduce((a, b) => (b.power < a.power ? b : a), hourly[0]), [hourly]);
  //const avg = useMemo(() => +(hourly.reduce((s, h) => s + h.power, 0) / hourly.length).toFixed(0), [hourly]);
const liveMonthlyKwh =
  (reading.power * 24 * 30) / 1000;
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background relative">
        <div className="absolute inset-0 bg-grid pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-[500px] bg-[var(--gradient-glow)] pointer-events-none" />

        <AppSidebar />

        <div className="flex-1 flex flex-col relative">
          <TopBar lastUpdate={reading.timestamp} />

          <main className="flex-1 p-4 md:p-8 space-y-8">
            {/* Hero metrics */}
            <section>
              <div className="flex items-end justify-between mb-5">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">Live Readings</h2>
                  <p className="text-sm text-muted-foreground">Streaming directly from /meter on Firebase RTDB</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <MetricCard label="Voltage" value={reading.voltage} unit="V" decimals={1} icon={Bolt} accent="secondary" max={250} />
                <MetricCard label="Current" value={reading.current} unit="A" decimals={2} icon={Activity} accent="primary" max={15} delay={0.05} />
                <MetricCard label="Power" value={reading.power} unit="W" decimals={0} icon={Zap} accent="warning" max={3000} delay={0.1} />
              </div>
            </section>

            {/* Charts */}
            <section className="grid grid-cols-1 xl:grid-cols-3 gap-5">
              <div className="xl:col-span-2 space-y-5">
                <ChartCard title="Power Profile · Today" subtitle="Watts drawn over the last 24 hours">
                  <HourlyAreaChart data={hourly} />
                </ChartCard>
                <ChartCard title="Daily Consumption · Last 30 days" subtitle="Energy used per day in kWh">
                  <DailyBarChart data={daily} />
                </ChartCard>
              </div>
              <div className="space-y-5">
                <BillEstimator unitsKwh={liveMonthlyKwh} />
                <div className="glass-card p-6">
                  <h3 className="text-base font-semibold mb-4">Consumption Summary</h3>
                  <div className="space-y-3">
                    <SummaryRow icon={CalendarRange} label="Today" value={`${todayKwh.toFixed(2)} kWh`} />
                    <SummaryRow icon={CalendarRange} label="This Week" value={`${weeklyKwh.toFixed(2)} kWh`} />
                    <SummaryRow icon={CalendarRange} label="This Month" value={`${monthlyKwh.toFixed(2)} kWh`} highlight />
                  </div>
                </div>
              </div>
            </section>

            {/* Insights */} 
            <section>
              <h2 className="text-2xl font-semibold tracking-tight mb-5">Usage Insights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <InsightCard icon={TrendingUp} label="Peak Usage" value={`${peak.power} W`} sub={`at ${peak.label}`} />
                <InsightCard icon={TrendingDown} label="Lowest Usage" value={`${low.power} W`} sub={`at ${low.label}`} delay={0.05} />
                <InsightCard icon={Gauge} label="Average Power" value={`${avg} W`} sub="across 24 hours" delay={0.1} />
              </div>
            </section>

            <footer className="pt-4 pb-2 text-center text-xs text-muted-foreground">
              Smart E Meter · ESP32 → Firebase Realtime Database · {new Date().getFullYear()}
            </footer>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

const SummaryRow = ({ icon: Icon, label, value, highlight }: any) => (
  <div className={`flex items-center justify-between rounded-lg border px-4 py-3 ${highlight ? "border-primary/40 bg-primary/5" : "border-border/60 bg-muted/20"}`}>
    <div className="flex items-center gap-2.5">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm">{label}</span>
    </div>
    <span className={`font-semibold tabular-nums ${highlight ? "text-primary" : ""}`}>{value}</span>
  </div>
);

export default Index;
