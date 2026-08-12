# D0 Delivery Feasibility Planner

A single-page, fully client-side dashboard that simulates same-day delivery feasibility from the Okhla fulfillment center to 28 Delhi pincodes, driven by an order-cutoff-time slider.

## What gets built

**Page** — replaces the placeholder home page at `/`.

1. **Header** — "D0 Delivery Feasibility Planner" with subtitle "Fulfillment Center: Okhla, South Delhi | Live Planning Simulation".
2. **KPI row (4 cards)** — Feasible Zones (x/28), At Risk Zones, Avg Cost per Delivery across Green+Yellow, Total Addressable Orders across feasible zones. Values animate/transition as the slider moves.
3. **Cutoff slider** — 9:00 AM to 6:00 PM in 15-minute steps, default 12:00 PM, centered, with the selected time shown large beside it.
4. **Radial zone map** — stylized SVG, FC at center, faint concentric guides at 5/10/15/20/25 km, each pincode a dot at a radius proportional to distance and angle grouped by compass zone (North up, South down, etc.), dot size scaled to order volume, color by status. Hover tooltip: pincode, area, distance, volume, cost.
5. **Data table** — Pincode, Area, Zone, Distance, Order Volume, Est. Delivery Time, Cost per Delivery, Capacity Utilization (mini progress bar), Status badge. All columns sortable; default distance ascending.
6. **Footer note** — the assumptions line, verbatim.

## Calculation rules

- Processing 1.5 h fixed; transit 20 min per 10 km (linear, `distance / 10 * 20`).
- ETA = cutoff + processing + transit; window closes 21:00.
- Green if ETA <= 20:00, Yellow if 20:00 < ETA <= 21:00, Red if ETA > 21:00.
- Cost = 40 + 4 x distance (INR).
- Capacity utilization = volume / 150, capped at 100%.
- All 28 rows hardcoded exactly as given.

## Technical notes

- New files: `src/data/pincodes.ts` (dataset + types), `src/lib/feasibility.ts` (pure calc helpers, time formatting), `src/components/dashboard/*` (KpiCards, CutoffSlider, RadialZoneMap, FeasibilityTable), and a rewritten `src/routes/index.tsx` holding the single `cutoff` state and passing derived rows down via `useMemo`.
- No backend, no data fetching, no auth. Everything recomputes synchronously on slider change.
- Styling: Tailwind with new semantic tokens added to `src/styles.css` — deep teal primary, neutral surfaces, soft card shadows, plus `success`/`warning`/`danger` status tokens (light + dark values). No hardcoded color utilities in components. Clean sans-serif type, generous spacing, responsive down to mobile (KPIs stack, table scrolls horizontally).
- Route-level `head()` with a dashboard-specific title and description.
