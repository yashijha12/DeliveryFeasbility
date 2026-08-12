import { useState } from "react";
import { ZONE_BEARING } from "@/data/pincodes";
import { STATUS_LABEL, type ComputedRow, type Status } from "@/lib/feasibility";

const SIZE = 640;
const CENTER = SIZE / 2;
const MAX_KM = 30;
const RADIUS = SIZE / 2 - 40;

const STATUS_FILL: Record<Status, string> = {
  feasible: "fill-success",
  tight: "fill-warning",
  infeasible: "fill-danger",
};

const STATUS_STROKE: Record<Status, string> = {
  feasible: "stroke-success-border",
  tight: "stroke-warning-border",
  infeasible: "stroke-danger-border",
};

function position(row: ComputedRow, index: number) {
  const base = ZONE_BEARING[row.zone] ?? 0;
  // fan pincodes that share a zone so dots don't overlap
  const spread = ((index % 5) - 2) * 9;
  const angleDeg = base + spread;
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  const r = (Math.min(row.distanceKm, MAX_KM) / MAX_KM) * RADIUS;
  const round = (n: number) => Math.round(n * 100) / 100;
  return { x: round(CENTER + r * Math.cos(rad)), y: round(CENTER + r * Math.sin(rad)) };
}

export function RadialZoneMap({ rows }: { rows: ComputedRow[] }) {
  const [hovered, setHovered] = useState<ComputedRow | null>(null);

  const byZone = new Map<string, number>();
  const points = rows.map((row) => {
    const idx = byZone.get(row.zone) ?? 0;
    byZone.set(row.zone, idx + 1);
    return { row, ...position(row, idx) };
  });

  const hoveredPoint = points.find((p) => p.row.pincode === hovered?.pincode);

  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-card-foreground">
            Delivery Reach Map
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Distance from the Okhla fulfillment center. Dot size reflects daily order volume.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-success" /> Feasible
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-warning" /> Tight
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-danger" /> Next-day
          </span>
        </div>
      </div>

      <div className="relative mx-auto mt-4 w-full max-w-2xl">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full" role="img" aria-label="Radial map of delivery feasibility by distance">
          {[5, 10, 15, 20, 25].map((km) => (
            <g key={km}>
              <circle
                cx={CENTER}
                cy={CENTER}
                r={(km / MAX_KM) * RADIUS}
                className="fill-none stroke-border"
                strokeDasharray="4 6"
              />
              <text
                x={CENTER + 4}
                y={CENTER - (km / MAX_KM) * RADIUS - 5}
                className="fill-muted-foreground text-[11px]"
              >
                {km} km
              </text>
            </g>
          ))}

          <circle cx={CENTER} cy={CENTER} r={18} className="fill-primary" />
          <circle cx={CENTER} cy={CENTER} r={26} className="fill-none stroke-primary-deep" />
          <text
            x={CENTER}
            y={CENTER + 4}
            textAnchor="middle"
            className="fill-primary-foreground text-[11px] font-semibold"
          >
            FC
          </text>

          {points.map(({ row, x, y }) => {
            const r = 6 + (row.volume / 200) * 12;
            const active = hovered?.pincode === row.pincode;
            return (
              <circle
                key={row.pincode}
                cx={x}
                cy={y}
                r={active ? r + 3 : r}
                className={`${STATUS_FILL[row.status]} ${STATUS_STROKE[row.status]} cursor-pointer transition-all duration-300`}
                fillOpacity={active ? 1 : 0.85}
                strokeWidth={2}
                onMouseEnter={() => setHovered(row)}
                onMouseLeave={() => setHovered(null)}
              />
            );
          })}
        </svg>

        {hovered && hoveredPoint && (
          <div
            className="pointer-events-none absolute z-10 w-52 -translate-x-1/2 -translate-y-full rounded-xl border border-border bg-popover p-3 text-left shadow-[var(--shadow-float)]"
            style={{
              left: `${(hoveredPoint.x / SIZE) * 100}%`,
              top: `${(hoveredPoint.y / SIZE) * 100 - 3}%`,
            }}
          >
            <p className="text-sm font-semibold text-popover-foreground">
              {hovered.area} · {hovered.pincode}
            </p>
            <dl className="mt-2 space-y-1 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <dt>Distance</dt>
                <dd className="font-medium text-popover-foreground">{hovered.distanceKm} km</dd>
              </div>
              <div className="flex justify-between">
                <dt>Daily volume</dt>
                <dd className="font-medium text-popover-foreground">{hovered.volume}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Cost / delivery</dt>
                <dd className="font-medium text-popover-foreground">₹{hovered.cost}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Status</dt>
                <dd className="font-medium text-popover-foreground">
                  {STATUS_LABEL[hovered.status]}
                </dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </section>
  );
}
