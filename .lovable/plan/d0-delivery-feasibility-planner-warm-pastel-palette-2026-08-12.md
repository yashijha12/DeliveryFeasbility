# D0 Delivery Feasibility Planner — warm pastel palette

Same dashboard as approved, rebuilt on a warm pastel palette instead of the blue/teal direction. Data, logic, layout, and sections stay exactly as planned.

## Palette changes

- Background: warm cream (#FFF9F0 range), cards white/cream with pastel-tinted borders.
- Primary accent: pastel mustard (#F4D35E / #E8C468) — headers, active slider track and thumb, primary buttons, FC center marker.
- Secondary accent: pastel pink (#F7C6C7) — soft card highlights, hover states, tinted shadows.
- Status colors, warm family only:
  - Feasible: soft sage green (#B8D8BA family), darker sage text/border for contrast.
  - At risk: soft amber/warm yellow, visually distinct from the mustard primary (deeper, more orange).
  - Not feasible: dusty rose / soft coral, no harsh red.
- Text: warm charcoal (#3A3A3A) with a warm muted grey-brown for secondary text.
- Shadows: pink/yellow tinted rather than grey.
- Feel: warm, human, still professional. No playful fonts, emoji, or illustrations — warmth comes only from color. Badges use a slightly darker pastel border and dark warm text so nothing is pastel-on-pastel.

## Remaining build (unchanged in structure)

- `src/styles.css`: replace the teal token set with the warm pastel tokens above, in oklch, for light and dark, plus `success`/`warning`/`danger` and tinted shadow tokens.
- Components under `src/components/dashboard/`: KPI cards (done, restyled by tokens), cutoff slider, radial SVG zone map with concentric 5/10/15/20/25 km guides and hover tooltips, sortable data table with capacity progress bars and status badges.
- `src/routes/index.tsx`: rewritten as the dashboard, holds cutoff state, derives rows via `useMemo`, includes header, KPI row, slider, map, table, assumptions footer, and route-level `head()` metadata.
- Fully client-side, responsive, instant recalculation on slider move.
