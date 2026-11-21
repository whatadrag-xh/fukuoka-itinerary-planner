#!/usr/bin/env python3
"""Draws an original line-art Fukuoka skyline (ink on paper) as SVG.

Nothing here is traced from any photograph: every building is a rectangle
placed by hand, with window grids drawn as SVG patterns.
"""
import random

random.seed(11)
W, H = 2000, 720
INK = "#16140F"
PAPER = "#FBF9F3"

out = []


def add(s):
    out.append(s)


# ---------------------------------------------------------------- helpers
def building(x, y, w, h, pat=None, lw=1.8, extra=""):
    """A block with a paper fill, an ink outline and an optional window grid."""
    add(
        f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" '
        f'fill="{"url(#%s)" % pat if pat else PAPER}" stroke="{INK}" '
        f'stroke-width="{lw}" {extra}/>'
    )


def line(x1, y1, x2, y2, lw=1.4, op=1.0):
    add(
        f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" '
        f'stroke="{INK}" stroke-width="{lw}" stroke-linecap="round" opacity="{op}"/>'
    )


def path(d, lw=1.5, op=1.0, fill="none", dash=None):
    add(
        f'<path d="{d}" fill="{fill}" stroke="{INK}" stroke-width="{lw}" '
        f'stroke-linejoin="round" stroke-linecap="round" opacity="{op}"'
        + (f' stroke-dasharray="{dash}"' if dash else "")
        + "/>"
    )


def roof(x, y, w, depth=7):
    """A thin cornice lip on top of a building."""
    line(x - depth * 0.4, y, x + w + depth * 0.4, y, 2.0)
    line(x, y + depth, x + w, y + depth, 1.1)


def antenna(x, y, h, arms=2):
    line(x, y, x, y - h, 1.3)
    for i in range(arms):
        yy = y - h * (0.45 + i * 0.28)
        lw = max(14, h * 0.3 * (1 - i * 0.4)) / 2
        line(x - lw, yy, x + lw, yy, 1.0)


def tank(x, y, w=16):
    building(x, y - 9, w, 9, None, 1.2)
    line(x + 3, y - 9, x + 3, y - 14, 1.0)
    line(x + w - 3, y - 9, x + w - 3, y - 14, 1.0)


def tree(cx, cy, rx, ry, seed=0):
    """A scribbled ink canopy: a wobbly closed outline plus two inner curls."""
    rnd = random.Random(seed)
    pts = []
    n = 13
    for i in range(n):
        a = i / n * 6.28318
        r = 0.82 + rnd.random() * 0.3
        pts.append((cx + rx * r * __import__("math").cos(a),
                    cy + ry * r * __import__("math").sin(a)))
    d = f"M{pts[0][0]:.1f},{pts[0][1]:.1f}"
    for i in range(1, n + 1):
        p = pts[i % n]
        q = pts[(i - 1) % n]
        mx, my = (p[0] + q[0]) / 2, (p[1] + q[1]) / 2
        d += f"Q{q[0]:.1f},{q[1]:.1f} {mx:.1f},{my:.1f}"
    d += "Z"
    path(d, 1.6)
    path(f"M{cx - rx * .5:.1f},{cy + ry * .2:.1f} q{rx * .3:.1f},{-ry * .5:.1f} {rx * .8:.1f},{-ry * .1:.1f}", 1.0)
    path(f"M{cx - rx * .4:.1f},{cy + ry * .55:.1f} q{rx * .45:.1f},{-ry * .2:.1f} {rx * .8:.1f},{ry * .05:.1f}", 1.0)


# ---------------------------------------------------------------- document
add(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" '
    f'width="{W}" height="{H}" role="img" '
    'aria-label="Line drawing of the Fukuoka skyline with Fukuoka Tower, '
    'city blocks, an elevated expressway and Hakata Bay">')

add("<defs>")
add(f'<pattern id="w1" width="13" height="15" patternUnits="userSpaceOnUse">'
    f'<rect width="13" height="15" fill="{PAPER}"/>'
    f'<rect x="2.4" y="3.4" width="8" height="8" fill="none" stroke="{INK}" stroke-width="1.05"/></pattern>')
add(f'<pattern id="w2" width="30" height="12" patternUnits="userSpaceOnUse">'
    f'<rect width="30" height="12" fill="{PAPER}"/>'
    f'<path d="M0 8.5H30" stroke="{INK}" stroke-width="1.15"/>'
    f'<path d="M6 8.5V12M18 8.5V12M27 8.5V12" stroke="{INK}" stroke-width="0.85"/></pattern>')
add(f'<pattern id="w3" width="10" height="22" patternUnits="userSpaceOnUse">'
    f'<rect width="10" height="22" fill="{PAPER}"/>'
    f'<path d="M5 0V22" stroke="{INK}" stroke-width="1.0"/>'
    f'<path d="M0 11H10" stroke="{INK}" stroke-width="0.6"/></pattern>')
add(f'<pattern id="bal" width="46" height="21" patternUnits="userSpaceOnUse">'
    f'<rect width="46" height="21" fill="{PAPER}"/>'
    f'<path d="M0 6H46M0 16H46" stroke="{INK}" stroke-width="1.05"/>'
    f'<path d="M23 6V21" stroke="{INK}" stroke-width="0.8"/>'
    f'<path d="M4 0V6M40 0V6" stroke="{INK}" stroke-width="0.6"/></pattern>')
add(f'<pattern id="rib" width="18" height="9" patternUnits="userSpaceOnUse">'
    f'<rect width="18" height="9" fill="{PAPER}"/>'
    f'<path d="M0 6H18" stroke="{INK}" stroke-width="0.9"/></pattern>')
add("</defs>")

# ---------------------------------------------------------------- hills
# three ridges, each a filled silhouette so the buildings in front stay clean
path("M0,332 L0,300 Q60,286 118,296 Q170,276 232,292 Q286,272 342,290 "
     "Q400,278 458,292 Q520,268 582,288 Q640,274 700,290 Q762,270 822,288 "
     "Q884,276 944,290 Q1004,266 1066,288 Q1126,274 1186,290 "
     "Q1246,270 1306,288 Q1368,276 1428,290 Q1488,268 1550,288 "
     "Q1610,276 1672,292 Q1732,272 1794,290 Q1854,280 1914,294 "
     "L2000,286 L2000,332 Z", 1.6, 0.75, PAPER)
path("M0,358 L0,338 Q74,322 146,334 Q214,318 284,332 Q356,314 428,330 "
     "Q500,316 572,330 Q644,312 716,330 Q788,318 860,332 Q932,314 1004,330 "
     "Q1076,318 1148,332 Q1220,314 1292,330 Q1364,318 1436,332 "
     "Q1508,314 1580,330 Q1652,318 1724,332 Q1796,318 1868,332 "
     "L2000,322 L2000,358 Z", 1.2, 0.5, PAPER)
path("M0,392 L0,372 Q90,364 180,372 Q270,356 360,372 Q450,364 540,374 "
     "Q630,358 720,374 Q810,364 900,374 Q990,358 1080,374 Q1170,364 1260,374 "
     "Q1350,358 1440,374 Q1530,364 1620,374 Q1710,358 1800,374 "
     "L2000,368 L2000,392 Z", 0.9, 0.3, PAPER)

# ---------------------------------------------------------------- bay, left
path("M0,432 C90,428 170,436 250,430 C300,426 330,432 356,428 "
     "C330,452 300,462 250,470 L0,470 Z", 1.4, 0.9, PAPER)
path("M0,466 C120,462 230,468 330,462", 0.9, 0.5)
path("M0,486 C140,482 260,488 380,482", 0.8, 0.4)
path("M0,508 C150,504 270,510 400,504", 0.8, 0.3)
# far island
path("M18,404 C40,398 70,396 96,399 C118,402 132,410 138,418 L18,420 Z", 1.2, 0.75, PAPER)
for bx, bw, bh in ((34, 12, 22), (52, 9, 30), (66, 14, 17), (88, 10, 25), (104, 12, 14)):
    building(bx, 418 - bh, bw, bh, "w3", 1.0)

# ---------------------------------------------------------------- far mid-ground blocks
far = [
    (150, 34, 402), (188, 26, 414), (218, 40, 396), (262, 22, 410),
    (470, 40, 404), (516, 34, 412), (836, 46, 400), (900, 30, 408),
    (1096, 42, 398), (1150, 34, 406), (1290, 46, 394), (1344, 30, 404),
    (1416, 40, 400), (1560, 34, 406), (1620, 46, 396), (1704, 34, 404),
    (1772, 42, 398), (1846, 36, 406), (1902, 44, 400), (1956, 40, 408),
]
for x, w, top in far:
    building(x, top, w, 474 - top, "w1" if w % 2 else "w3", 1.4)
    roof(x, top, w, 5)

# ---------------------------------------------------------------- scrub and low roofs along the base of the city
for sx in range(-20, 2020, 46):
    h = 10 + (sx * 7 % 13)
    path(f"M{sx:.0f},484 q10,-{h} 22,-{h // 2} q12,{h // 3} 24,-{h // 2} l0,{h} Z", 1.1, 0.65)
    path(f"M{sx + 14:.0f},492 q8,-{h - 4} 18,-{h // 3}", 0.7, 0.4)
line(-20, 492, 2020, 484, 0.9, 0.35)

# ---------------------------------------------------------------- mid-ground towers
# West: hotel slab and stepped neighbours (Hakata Station side)
building(238, 300, 54, 174, "w1")
roof(238, 300, 54, 9)
building(232, 309, 66, 26, "w2", 1.6)
tank(250, 291, 18)
building(300, 336, 28, 138, "w3")
roof(300, 336, 28, 6)
building(332, 318, 84, 156, "bal", 1.8)
roof(332, 318, 84, 8)
building(326, 326, 96, 30, "w2", 1.6)
antenna(374, 318, 20)
building(422, 372, 32, 102, "w1", 1.5)
roof(422, 372, 32, 6)

# Centre: Fukuoka Tower
TOWER_CX, TOWER_BASE, TOWER_TOP = 556, 474, 168
half_b, half_t = 46, 7
segments = 11
for i in range(segments + 1):
    t = i / segments
    y = TOWER_BASE + (TOWER_TOP - TOWER_BASE) * t
    half = half_b + (half_t - half_b) * t
    line(TOWER_CX - half, y, TOWER_CX + half, y, 1.15)
for i in range(segments):
    t0, t1 = i / segments, (i + 1) / segments
    y0 = TOWER_BASE + (TOWER_TOP - TOWER_BASE) * t0
    y1 = TOWER_BASE + (TOWER_TOP - TOWER_BASE) * t1
    h0 = half_b + (half_t - half_b) * t0
    h1 = half_b + (half_t - half_b) * t1
    line(TOWER_CX - h0, y0, TOWER_CX + h1, y1, 0.85)
    line(TOWER_CX + h0, y0, TOWER_CX - h1, y1, 0.85)
line(TOWER_CX - half_b, TOWER_BASE, TOWER_CX - half_t, TOWER_TOP, 1.9)
line(TOWER_CX + half_b, TOWER_BASE, TOWER_CX + half_t, TOWER_TOP, 1.9)
# observation deck
building(TOWER_CX - 30, 176, 60, 30, None, 1.8)
line(TOWER_CX - 34, 182, TOWER_CX + 34, 182, 1.1)
line(TOWER_CX - 34, 200, TOWER_CX + 34, 200, 1.1)
for k in range(7):
    line(TOWER_CX - 30 + k * 10, 176, TOWER_CX - 30 + k * 10, 206, 0.7)
# spire
line(TOWER_CX, 176, TOWER_CX, 62, 1.6)
line(TOWER_CX - 3.5, 168, TOWER_CX - 1.6, 76, 1.0)
line(TOWER_CX + 3.5, 168, TOWER_CX + 1.6, 76, 1.0)
for yy in (146, 130, 112, 96, 80):
    ww = 6 - (168 - yy) * 0.035
    line(TOWER_CX - ww, yy, TOWER_CX + ww, yy, 0.9)
line(TOWER_CX - 8, 158, TOWER_CX + 8, 158, 1.2)

# Tower base halls and the office slab beside it
building(492, 420, 64, 54, "w2", 1.6)
roof(492, 420, 64, 6)
building(604, 392, 96, 82, "w2", 1.7)
roof(604, 392, 96, 7)
line(600, 424, 704, 424, 1.2)
building(690, 412, 34, 62, "w1", 1.4)
roof(690, 412, 34, 5)

# East: the dense commercial cluster around Tenjin / ACROS
building(712, 300, 58, 174, "w2", 1.9)
roof(712, 300, 58, 8)
tank(722, 291, 16)
building(776, 262, 92, 212, "w2", 2.0)
roof(776, 262, 92, 9)
line(770, 330, 874, 330, 1.3)
line(770, 366, 874, 366, 1.1)
antenna(816, 262, 26)
building(874, 322, 62, 152, "w1", 1.7)
roof(874, 322, 62, 8)
building(942, 292, 78, 182, "w2", 1.8)
roof(942, 292, 78, 8)
building(1026, 336, 46, 138, "w3", 1.6)
roof(1026, 336, 46, 6)
# stepped roof garden — the ACROS terraces
for i in range(7):
    building(1078 + i * 9, 330 + i * 15, 96 - i * 8, 18, None, 1.3)
    line(1078 + i * 9 + 4, 336 + i * 15, 1078 + i * 9 + 86 - i * 8, 336 + i * 15, 0.8)
building(1078, 444, 96, 30, "w2", 1.6)
building(1180, 300, 54, 174, "w1", 1.7)
roof(1180, 300, 54, 7)
antenna(1207, 300, 24)
building(1240, 340, 44, 134, "w3", 1.5)
building(1290, 356, 66, 118, "w1", 1.6)
roof(1290, 356, 66, 6)
building(1362, 330, 40, 144, "w2", 1.6)
building(1408, 380, 96, 94, "w1", 1.7)
roof(1408, 380, 96, 7)
line(1408, 402, 1504, 402, 1.0)
building(1510, 342, 48, 132, "w3", 1.6)
roof(1510, 342, 48, 6)
building(1564, 366, 78, 108, "w1", 1.6)
building(1648, 392, 66, 82, "w2", 1.5)
building(1720, 372, 52, 102, "w1", 1.6)
roof(1720, 372, 52, 6)
building(1778, 398, 82, 76, "w3", 1.5)
building(1866, 382, 44, 92, "w1", 1.5)
building(1916, 404, 84, 70, "w2", 1.4)

# ---------------------------------------------------------------- low-roof city fabric
fabric = [
    (466, 34, 432), (566, 30, 438), (700, 30, 440), (1508, 22, 452),
    (1596, 26, 446), (1642, 24, 450), (1760, 26, 446), (1856, 26, 448),
    (1738, 20, 424), (1962, 24, 448), (922, 24, 452), (1168, 22, 452),
]
for x, w, top in fabric:
    building(x, top, w, 474 - top, "rib" if w > 24 else None, 1.2)

# ---------------------------------------------------------------- expressway
road_top = "M-40,556 C160,528 360,506 560,502 C820,497 1010,536 1200,566 " \
           "C1430,602 1700,640 2040,672"
road_bot = "M-40,586 C160,558 360,536 560,532 C820,527 1010,566 1200,596 " \
           "C1430,632 1700,670 2040,702"
path(road_top, 1.9)
path(road_bot, 1.9)
# guard rail ticks along the deck
import math


def bez(p0, p1, p2, p3, t):
    mt = 1 - t
    x = (mt ** 3) * p0[0] + 3 * (mt ** 2) * t * p1[0] + 3 * mt * (t ** 2) * p2[0] + (t ** 3) * p3[0]
    y = (mt ** 3) * p0[1] + 3 * (mt ** 2) * t * p1[1] + 3 * mt * (t ** 2) * p2[1] + (t ** 3) * p3[1]
    return x, y


segA = ((-40, 571), (160, 543), (360, 521), (560, 517))
segB = ((560, 517), (820, 512), (1010, 551), (1200, 581))
segC = ((1200, 581), (1430, 617), (1700, 655), (2040, 687))

for i in range(120):
    t = i / 120
    if i < 44:
        x, y = bez(*segA, t / (44 / 120) * 0.42)
    elif i < 74:
        x, y = bez(*segB, (i - 44) / 30)
    else:
        x, y = bez(*segC, (i - 74) / 46)
    line(x, y - 8, x + 1.2, y + 4, 0.7)
# deck edge shadow line
path("M-40,578 C160,550 360,528 560,524 C820,519 1010,558 1200,588 "
     "C1430,624 1700,662 2040,694", 0.9, 0.45)
# piers
for px, py in ((300, 516), (700, 512), (1040, 545), (1370, 600), (1720, 640)):
    top = py + 12
    building(px - 9, top, 18, 120, None, 1.5)
    line(px - 14, top + 6, px + 14, top + 6, 1.1)
    line(px - 13, top + 96, px - 6, top + 120, 1.0)
    line(px + 13, top + 96, px + 6, top + 120, 1.0)

# ---------------------------------------------------------------- foreground blocks
# left apartment slabs, seen close up
building(26, 556, 132, 164, "bal", 2.0)
roof(26, 556, 132, 9)
line(20, 560, 164, 560, 1.2)
tank(52, 547, 20)
antenna(120, 547, 30, 2)
building(166, 588, 96, 132, "bal", 1.9)
roof(166, 588, 96, 7)
building(268, 566, 118, 154, "bal", 2.0)
roof(268, 566, 118, 9)
tank(300, 557, 18)
line(262, 572, 392, 572, 1.1)
building(392, 600, 74, 120, "bal", 1.8)
roof(392, 600, 74, 6)
# tiny houses stepping down to the expressway
houses = [(300, 700, 52, 30), (356, 694, 40, 26), (400, 706, 60, 24),
          (466, 690, 44, 30), (516, 700, 56, 24)]
for hx, hy, hw, hh in houses:
    building(hx, hy, hw, hh, None, 1.4)
    path(f"M{hx - 3},{hy} L{hx + hw / 2},{hy - 12} L{hx + hw + 3},{hy}", 1.4)
    line(hx + hw * 0.62, hy + 8, hx + hw * 0.62, hy + hh - 4, 0.9)

# middle foreground: a low-rise neighbourhood filling the bottom of the frame
mid_low = [(556, 664, 64, 56), (628, 690, 48, 30), (684, 676, 58, 44),
           (750, 698, 52, 22), (810, 686, 66, 34), (886, 700, 44, 20),
           (938, 674, 60, 46), (1006, 692, 50, 28), (1064, 680, 58, 40),
           (1130, 696, 62, 24), (1200, 684, 46, 36)]
for hx, hy, hw, hh in mid_low:
    building(hx, hy, hw, hh, "w1" if hw > 56 else "rib", 1.5)
    roof(hx, hy, hw, 4)
    if hw > 56:
        path(f"M{hx + 4},{hy} L{hx + hw / 2},{hy - 11} L{hx + hw - 4},{hy}", 1.2)

# right foreground: low blocks and trees
building(1252, 646, 96, 74, "w1", 1.7)
roof(1252, 646, 96, 6)
building(1358, 662, 74, 58, "w1", 1.6)
building(1440, 636, 58, 84, "bal", 1.7)
roof(1440, 636, 58, 6)
building(1506, 664, 82, 56, "w3", 1.6)
for hx, hy, hw, hh in ((1600, 660, 54, 34), (1666, 672, 44, 28), (1716, 654, 60, 40),
                       (1788, 668, 48, 30), (1842, 656, 56, 36), (1908, 670, 52, 28)):
    building(hx, hy, hw, hh, None, 1.4)
    path(f"M{hx - 3},{hy} L{hx + hw / 2},{hy - 13} L{hx + hw + 3},{hy}", 1.4)
    line(hx + hw * 0.6, hy + 9, hx + hw * 0.6, hy + hh - 4, 0.9)

# ---------------------------------------------------------------- trees
tree(6, 660, 40, 34, 1)
tree(588, 720, 44, 30, 2)
tree(1218, 720, 34, 26, 3)
tree(1140, 690, 46, 38, 4)
tree(1200, 712, 34, 28, 5)
tree(1600, 716, 40, 30, 6)
tree(1880, 730, 52, 34, 7)
tree(1980, 706, 38, 32, 8)
tree(1080, 726, 42, 30, 9)

add("</svg>")

with open("img/fukuoka-skyline.svg", "w", encoding="utf-8") as fh:
    fh.write("\n".join(out) + "\n")
print("wrote img/fukuoka-skyline.svg", len("\n".join(out)), "bytes")
