export const LiveIndicator = ({ label = "LIVE" }: { label?: string }) => (
  <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[11px] font-semibold tracking-wider">
    <span className="live-dot" />
    {label}
  </span>
);
