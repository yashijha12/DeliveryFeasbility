import { CircleCheck, TriangleAlert, IndianRupee, PackageCheck, CalendarClock } from "lucide-react";
import type { Kpis } from "@/lib/feasibility";

function Card({
  label,
  value,
  sub,
  icon,
  tone,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  tone: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-float)]">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <span className={`rounded-lg p-2 ${tone}`}>{icon}</span>
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-card-foreground tabular-nums transition-all duration-300">
        {value}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}

export function KpiCards({ kpis }: { kpis: Kpis }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      <Card
        label="Feasible Zones"
        value={`${kpis.feasibleCount} / ${kpis.total}`}
        sub="Delivered with an hour to spare"
        icon={<CircleCheck className="size-4 text-success" />}
        tone="bg-success-soft"
      />
      <Card
        label="At Risk Zones"
        value={String(kpis.atRiskCount)}
        sub="Arriving within the final hour"
        icon={<TriangleAlert className="size-4 text-warning" />}
        tone="bg-warning-soft"
      />
      <Card
        label="Avg Cost per Delivery"
        value={`₹${kpis.avgCost.toFixed(1)}`}
        sub="Across all servable zones"
        icon={<IndianRupee className="size-4 text-primary" />}
        tone="bg-accent"
      />
      <Card
        label="Next-day Delivery"
        value={`${kpis.nextDayCount} / ${kpis.total}`}
        sub={`${kpis.nextDayOrders.toLocaleString("en-IN")} orders roll over`}
        icon={<CalendarClock className="size-4 text-danger" />}
        tone="bg-danger-soft"
      />
      <Card
        label="Total Addressable Orders"
        value={kpis.addressableOrders.toLocaleString("en-IN")}
        sub="Daily volume within D0 reach"
        icon={<PackageCheck className="size-4 text-primary" />}
        tone="bg-accent"
      />
    </div>
  );
}
