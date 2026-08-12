import { STATUS_LABEL, type Status } from "@/lib/feasibility";

const TONE: Record<Status, string> = {
  feasible: "bg-success-soft text-success-foreground border-success-border",
  tight: "bg-warning-soft text-warning-foreground border-warning-border",
  infeasible: "bg-danger-soft text-danger-foreground border-danger-border",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold ${TONE[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
