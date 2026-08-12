import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import type { ComputedRow } from "@/lib/feasibility";
import { StatusBadge } from "./StatusBadge";

type SortKey =
  | "pincode"
  | "area"
  | "zone"
  | "distanceKm"
  | "volume"
  | "etaMinutes"
  | "cost"
  | "utilization"
  | "status";

const STATUS_ORDER = { feasible: 0, tight: 1, infeasible: 2 } as const;

const COLUMNS: { key: SortKey; label: string; align?: "right" }[] = [
  { key: "pincode", label: "Pincode" },
  { key: "area", label: "Area" },
  { key: "zone", label: "Zone" },
  { key: "distanceKm", label: "Distance", align: "right" },
  { key: "volume", label: "Order Volume", align: "right" },
  { key: "etaMinutes", label: "Est. Delivery" },
  { key: "cost", label: "Cost / Delivery", align: "right" },
  { key: "utilization", label: "Capacity Utilization" },
  { key: "status", label: "Status" },
];

export function FeasibilityTable({ rows }: { rows: ComputedRow[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("distanceKm");
  const [asc, setAsc] = useState(true);

  const sorted = useMemo(() => {
    const copy = [...rows];
    copy.sort((a, b) => {
      let cmp: number;
      if (sortKey === "status") {
        cmp = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
      } else {
        const av = a[sortKey];
        const bv = b[sortKey];
        cmp =
          typeof av === "number" && typeof bv === "number"
            ? av - bv
            : String(av).localeCompare(String(bv));
      }
      return asc ? cmp : -cmp;
    });
    return copy;
  }, [rows, sortKey, asc]);

  const toggle = (key: SortKey) => {
    if (key === sortKey) setAsc((v) => !v);
    else {
      setSortKey(key);
      setAsc(true);
    }
  };

  return (
    <section className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
      <div className="border-b border-border p-5 sm:p-6">
        <h2 className="text-lg font-semibold tracking-tight text-card-foreground">
          Pincode Feasibility Detail
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          28 Delhi pincodes served from Okhla. Click any column header to sort.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead>
            <tr className="bg-muted/70">
              {COLUMNS.map((col) => {
                const active = sortKey === col.key;
                return (
                  <th
                    key={col.key}
                    scope="col"
                    className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground ${
                      col.align === "right" ? "text-right" : "text-left"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggle(col.key)}
                      className={`inline-flex items-center gap-1 rounded transition-colors hover:text-foreground ${
                        active ? "text-foreground" : ""
                      } ${col.align === "right" ? "flex-row-reverse" : ""}`}
                    >
                      {col.label}
                      {active ? (
                        asc ? (
                          <ArrowUp className="size-3.5" />
                        ) : (
                          <ArrowDown className="size-3.5" />
                        )
                      ) : (
                        <ChevronsUpDown className="size-3.5 opacity-40" />
                      )}
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => (
              <tr
                key={row.pincode}
                className="border-t border-border transition-colors hover:bg-accent/40"
              >
                <td className="px-4 py-3 font-medium tabular-nums text-foreground">
                  {row.pincode}
                </td>
                <td className="px-4 py-3 text-foreground">{row.area}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.zone}</td>
                <td className="px-4 py-3 text-right tabular-nums text-foreground">
                  {row.distanceKm} km
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-foreground">{row.volume}</td>
                <td className="px-4 py-3 tabular-nums text-foreground transition-all duration-300">
                  {row.status === "infeasible" ? (
                    <span className="font-medium text-danger-foreground">
                      Next day
                    </span>
                  ) : (
                    row.etaLabel
                  )}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-foreground">₹{row.cost}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary-deep transition-all duration-300"
                        style={{ width: `${row.utilization * 100}%` }}
                      />
                    </div>
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {Math.round(row.utilization * 100)}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
