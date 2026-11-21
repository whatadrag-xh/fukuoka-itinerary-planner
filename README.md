# Fukuoka Itinerary Planner · 福岡旅プランナー

A single-page trip planner for Fukuoka and the rest of Kyushu. Pick the hotel you are
actually staying in, choose your interests and any day trips, and it builds every day
around breakfast, lunch, a tea break and dinner. Every stop can then be dragged,
retimed or stretched by hand.

## Files

| File | What it is |
| --- | --- |
| `index.html` | Page markup only |
| `styles.css` | All styling (paper white, ink black, cornflower accents; Cormorant + Jost) |
| `data.js` | Places, hotels, day-trip fares, fare tables, route ordering |
| `app.js` | Planner engine, rendering, drag-and-drop, editing, live place search |
| `img/` | 97 photographs from Wikimedia Commons, plus the drawn skyline and placeholder |
| `skyline-drawing.py` | The script that draws the backdrop skyline as vectors |

No build step: open `index.html` with the folder next to it. Plain scripts, so `file://`
works too.

## What it does

- **Hotel-based planning.** 16 real hotels across Hakata, Tenjin, Nakasu and Momochi,
  searchable by name or area; every journey time starts from that building.
- **Live place search.** Both search boxes also query OpenStreetMap (via the free,
  keyless Photon API), so any hotel, restaurant, shop, mall or attraction in Fukuoka can
  be found and used as a base or added to a day, not just the places in our lists.
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

Map tiles and place names: OpenStreetMap contributors, rendered with Leaflet. Live place
search: Photon (photon.komoot.io) over OpenStreetMap data, free and keyless.
Photographs: Wikimedia Commons, freely licensed.

## Artwork

The skyline behind the page is drawn from scratch as an SVG by `skyline-drawing.py`:
buildings, the tower, the expressway and the hills are plain rectangles and paths, so it
carries no stock-image licence. It replaced an earlier stock illustration.
