import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { CutoffSlider } from "@/components/dashboard/CutoffSlider";
import { RadialZoneMap } from "@/components/dashboard/RadialZoneMap";
import { FeasibilityTable } from "@/components/dashboard/FeasibilityTable";
import { computeKpis, computeRows } from "@/lib/feasibility";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "D0 Delivery Feasibility Planner — Delhi Same-Day Simulation" },
      {
        name: "description",
        content:
          "Plan same-day (D0) delivery across 28 Delhi pincodes from an Okhla fulfillment center. Adjust the order cutoff and see feasibility, cost and capacity update live.",
      },
      { property: "og:title", content: "D0 Delivery Feasibility Planner" },
      {
        property: "og:description",
        content:
          "Interactive same-day delivery feasibility planner for 28 Delhi pincodes, driven by order cutoff time.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [cutoff, setCutoff] = useState(12 * 60);
  const rows = useMemo(() => computeRows(cutoff), [cutoff]);
  const kpis = useMemo(() => computeKpis(rows), [rows]);

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <header className="border-b border-border pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-deep">
            Same-day delivery planning
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            D0 Delivery Feasibility Planner
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Fulfillment Center: Okhla, South Delhi | Live Planning Simulation
          </p>
        </header>

        <div className="mt-8 space-y-8">
          <KpiCards kpis={kpis} />
          <CutoffSlider value={cutoff} onChange={setCutoff} />
          <RadialZoneMap rows={rows} />
          <FeasibilityTable rows={rows} />
        </div>

        <footer className="mt-10 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">
            Assumptions: 1.5hr FC processing time, 20 min transit per 10km, 9 PM delivery window
            close, ₹40 base + ₹4/km delivery cost.
          </p>
        </footer>
      </div>
    </main>
  );
}
