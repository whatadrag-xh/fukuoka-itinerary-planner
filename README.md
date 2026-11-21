# Fukuoka Itinerary Planner · 福岡旅プランナー

A single-page trip planner for Fukuoka and the rest of Kyushu. Pick the hotel you are
actually staying in, choose your interests and any day trips, and it builds every day
around breakfast, lunch, a tea break and dinner. Every stop can then be dragged,
retimed or stretched by hand.

## Files

| File | What it is |
| --- | --- |
| `index.html` | Page markup only |
| `styles.css` | All styling (calm dark interface, neon skyline backdrop, liquid-glass popups; Cormorant + Jost) |
| `data.js` | Places, hotels, day-trip fares, fare tables, route ordering |
| `app.js` | Planner engine, rendering, drag-and-drop, editing, live place search |
| `img/` | 100 photographs from Wikimedia Commons, plus the neon skyline backdrop and placeholder |
| `skyline-drawing.py` | The script that draws the original vector skyline (kept for provenance) |

No build step: open `index.html` with the folder next to it. Plain scripts, so `file://`
works too.

## What it does

- **Hotel-based planning.** 16 real hotels across Hakata, Tenjin, Nakasu and Momochi,
  searchable by name or area; every journey time starts from that building.
- **Live place search.** Both search boxes also query OpenStreetMap (via the free,
  keyless Photon API), so any hotel, restaurant, shop, mall or attraction in Fukuoka can
  be found and used as a base or added to a day, not just the places in our lists.
- **More than the shortlist.** 84 curated places, and the add-a-stop sheet also asks
  Wikipedia's free geosearch API what is written up around the day you are planning, so
  the list of options never ends at the edge of our own data.
- **Meal-anchored days.** Breakfast, lunch, a tea break and dinner are fixed points;
  stops are placed around them and can be moved between those blocks. On a day trip the
  meals move with you: a Hiroshima day recommends okonomiyaki in Hiroshima, not ramen in
  Tenjin.
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
search: Photon (photon.komoot.io) over OpenStreetMap data, free and keyless. More sights:
Wikipedia's geosearch API, also free and keyless (CC BY-SA). The curated list is
cross-checked against the Fukuoka City and Fukuoka Prefecture tourist guides, Japan Guide
and Wikivoyage. Photographs: Wikimedia Commons, freely licensed.

## Look

The neon glow belongs to the background only. A fixed, full-page backdrop of the Fukuoka
line art, recoloured from the cyberpunk palette of
[omarchy-neon-glow](https://github.com/erikrjohansson/omarchy-neon-glow-theme) (MIT) —
deep `#061214`, cyan `#0acde9`, pink `#e37cbf` — carries the night-city glow, while the
interface on top stays calm: flat dark surfaces, quiet borders, no halos on type, buttons
or cards. The map is the one deliberate exception; its tiles are inverted so the street
labels sit on a dark surface and the labels themselves keep a soft glow.

Every popup — the place detail sheet, the add-a-stop sheet and the time picker — opens in
the centre of the screen and is liquid glass in the spirit of
[liquid-glass-js](https://github.com/dashersw/liquid-glass-js) (MIT): a tinted, blurred
backdrop with a refracting rim and a specular sheen. It is rebuilt in plain CSS rather
than WebGL so the sheets stay scrollable, selectable and fast, and it falls back to opaque
panels where `backdrop-filter` is unavailable. Dropdowns are rounded pills with the same
chevron, never the operating system's square menu.

## Artwork

The backdrop is the line-art Fukuoka illustration supplied for the project, kept whole
and recoloured to glowing lines in `img/skyline-neon.webp`. `skyline-drawing.py` still
draws the original, self-authored vector skyline; the stock licence for the supplied
illustration rests with its owner.
