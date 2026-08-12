import { Clock } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { formatTime } from "@/lib/feasibility";

export const MIN_CUTOFF = 9 * 60;
export const MAX_CUTOFF = 21 * 60; // 9:00 PM

export function CutoffSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:gap-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
            <Clock className="size-3.5" />
            Order Cutoff Time
          </span>
          <span className="text-4xl font-semibold tabular-nums tracking-tight text-foreground transition-all duration-200 sm:text-5xl">
            {formatTime(value)}
          </span>
        </div>

        <div className="w-full">
          <Slider
            value={[value]}
            min={MIN_CUTOFF}
            max={MAX_CUTOFF}
            step={15}
            onValueChange={(v) => onChange(v[0] ?? MIN_CUTOFF)}
            aria-label="Order cutoff time"
          />
          <div className="mt-3 flex justify-between text-xs font-medium text-muted-foreground">
            <span>9:00 AM</span>
            <span className="hidden sm:inline">12:00 PM</span>
            <span className="hidden sm:inline">3:00 PM</span>
            <span className="hidden sm:inline">6:00 PM</span>
            <span>9:00 PM</span>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Move the cutoff to see how many Delhi pincodes stay within the 9 PM
          same-day window — anything past it rolls to next-day delivery.
        </p>
      </div>
    </section>
  );
}
