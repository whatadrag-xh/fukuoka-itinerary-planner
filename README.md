# Fukuoka Itinerary Planner · 福岡旅プランナー

A single-page trip planner for Fukuoka and the rest of Kyushu. Pick the hotel you are
actually staying in, choose your interests and any day trips, and it builds every day
around breakfast, lunch, a tea break and dinner. Every stop can then be dragged,
retimed or stretched by hand.

## Files

| File | What it is |
| --- | --- |
| `index.html` | Page markup only |
| `styles.css` | All styling (dark charcoal, gold hairlines, Cormorant + Jost) |
| `data.js` | Places, hotels, day-trip fares, fare tables, route ordering |
| `app.js` | Planner engine, rendering, drag-and-drop, editing |
| `img/` | 84 photographs, freely licensed from Wikimedia Commons |

No build step: open `index.html` with the folder next to it. Plain scripts, so `file://`
works too.

## What it does

- **Hotel-based planning.** 16 real hotels across Hakata, Tenjin, Nakasu and Momochi,
  searchable by name or area; every journey time starts from that building.
- **Meal-anchored days.** Breakfast, lunch, a tea break and dinner are fixed points;
  stops are placed around them and can be moved between those blocks.
- **Full editing.** Drag any row within a day or onto another day, set a stop's exact
  start time, change any duration in 15-minute steps, remove a stop, add another from a
  photo chooser, or reset a day to the automatic plan.
- **1–10 days**, 13 day trips across Kyushu (Dazaifu to Kagoshima, plus Hiroshima),
  cost estimate, transit-pass comparison, route map and printable export.
- **Readable type.** A / A− / A+ in the header sets the base size.

## Data

Fares follow published 2026 operator tables — Fukuoka City Subway zones, the Nishitetsu
¥150 central bus zone and the 1 April 2026 Nishitetsu revision, JR Kyushu fare bands and
shinkansen station-pair fares. Journey times are modelled for planning, not ticketing.
Hotel prices are typical guide rates, not live availability.

Map tiles and place names: OpenStreetMap contributors, rendered with Leaflet.
Photographs: Wikimedia Commons, freely licensed.
