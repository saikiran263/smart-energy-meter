import { SidebarTrigger } from "@/components/ui/sidebar";
import { LiveIndicator } from "./LiveIndicator";
import { Wifi } from "lucide-react";

export const TopBar = ({ lastUpdate }: { lastUpdate: number }) => {
  const ago = Math.max(0, Math.round((Date.now() - lastUpdate) / 1000));
  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-border/60 bg-background/60 backdrop-blur-xl sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <div>
          <h1 className="text-base font-semibold leading-tight">Smart Energy Monitor</h1>
          <p className="text-[11px] text-muted-foreground">Real-time IoT dashboard · ESP32 · Firebase RTDB</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
          <Wifi className="h-3.5 w-3.5 text-primary" />
          <span>Updated {ago}s ago</span>
        </div>
        <LiveIndicator />
      </div>
    </header>
  );
};
