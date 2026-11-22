# Fukuoka Itinerary Planner · 福岡旅プランナー

A single-page trip planner for Fukuoka and the rest of Kyushu. Pick the hotel you are
actually staying in, choose your interests and any day trips, and it builds every day
around breakfast, lunch, a tea break and dinner. Every stop can then be dragged,
retimed or stretched by hand.

## Files

| File | What it is |
| --- | --- |
| `index.html` | Page markup only |
| `styles.css` | All styling (paper-white interface in ink and cornflower blue, neon skyline band behind the opening screen, liquid-glass popups; Cormorant + Jost) |
| `data.js` | Places, hotels, day-trip fares, fare tables, route ordering |
| `app.js` | Planner engine, rendering, drag-and-drop, editing, live place search |
| `img/` | 100+ photographs from Wikimedia Commons, plus the neon skyline backdrop and placeholder |
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
- **1–10 days** day trips across Kyushu, cost estimate, transit-pass comparison, route map and printable export.
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

The interface is paper: warm white surfaces, ink-black type and a cornflower
blue (`#6495ED`) accent. Nothing in the interface glows. The one glowing thing
on the page is the artwork behind the opening screen.

That artwork is the supplied Fukuoka line drawing, recoloured with a vertical
gradient through the three neon colours — deep violet `#1E0427`, pale
`#EAF2FF` and cyan `#16E6FF` — with a bloom on every line. It is fixed behind
the whole page, not just the opening screen, under a light paper wash that
keeps it a background rather than a foreground. Section headings ride on small
paper labels so ink type stays crisp wherever the city glows through, and the
planner itself is opaque paper cards.

The hero photograph is mounted whole: it is never cropped, zoomed or scaled on
hover, so the tower and the bay read exactly as taken.

Every popup — the place detail sheet, the add-a-stop sheet, the time picker and
the Day 1 / Day 2 menu — opens in the centre of the screen and is liquid glass
in the spirit of [liquid-glass-js](https://github.com/dashersw/liquid-glass-js)
(MIT): a tinted, blurred backdrop with a refracting rim and a specular sheen.
It is rebuilt in plain CSS rather than WebGL so the sheets stay scrollable,
selectable and fast, and it falls back to opaque panels where
`backdrop-filter` is unavailable. Every menu is rounded — including the
move-to-another-day menu, which is a glass popover rather than the operating
system's square list.
