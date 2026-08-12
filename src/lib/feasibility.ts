import { PINCODES, type Pincode } from "@/data/pincodes";

export const PROCESSING_MINUTES = 90;
export const TRANSIT_MIN_PER_10KM = 20;
export const WINDOW_CLOSE_MIN = 21 * 60; // 9:00 PM
export const BASE_COST = 40;
export const COST_PER_KM = 4;
export const ROUTE_CAPACITY = 150;

export type Status = "feasible" | "tight" | "infeasible";

export type ComputedRow = Pincode & {
  etaMinutes: number;
  etaLabel: string;
  cost: number;
  utilization: number;
  status: Status;
};

export function formatTime(totalMinutes: number): string {
  const wrapped = ((totalMinutes % 1440) + 1440) % 1440;
  const h24 = Math.floor(wrapped / 60);
  const m = Math.round(wrapped % 60);
  const suffix = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function computeRow(p: Pincode, cutoffMinutes: number): ComputedRow {
  const transit = (p.distanceKm / 10) * TRANSIT_MIN_PER_10KM;
  const etaMinutes = cutoffMinutes + PROCESSING_MINUTES + transit;
  const status: Status =
    etaMinutes <= WINDOW_CLOSE_MIN - 60
      ? "feasible"
      : etaMinutes <= WINDOW_CLOSE_MIN
        ? "tight"
        : "infeasible";

  return {
    ...p,
    etaMinutes,
    etaLabel: formatTime(etaMinutes),
    cost: BASE_COST + COST_PER_KM * p.distanceKm,
    utilization: Math.min(1, p.volume / ROUTE_CAPACITY),
    status,
  };
}

export function computeRows(cutoffMinutes: number): ComputedRow[] {
  return PINCODES.map((p) => computeRow(p, cutoffMinutes));
}

export type Kpis = {
  feasibleCount: number;
  atRiskCount: number;
  nextDayCount: number;
  avgCost: number;
  addressableOrders: number;
  nextDayOrders: number;
  total: number;
};

export function computeKpis(rows: ComputedRow[]): Kpis {
  const servable = rows.filter((r) => r.status !== "infeasible");
  const nextDay = rows.filter((r) => r.status === "infeasible");
  const avgCost = servable.length
    ? servable.reduce((s, r) => s + r.cost, 0) / servable.length
    : 0;
  return {
    feasibleCount: rows.filter((r) => r.status === "feasible").length,
    atRiskCount: rows.filter((r) => r.status === "tight").length,
    nextDayCount: nextDay.length,
    avgCost,
    addressableOrders: servable.reduce((s, r) => s + r.volume, 0),
    nextDayOrders: nextDay.reduce((s, r) => s + r.volume, 0),
    total: rows.length,
  };
}

export const STATUS_LABEL: Record<Status, string> = {
  feasible: "Feasible",
  tight: "Feasible but tight",
  infeasible: "Next-day delivery",
};
