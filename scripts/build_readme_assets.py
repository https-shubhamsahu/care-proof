#!/usr/bin/env python3
"""Build the README SVGs in assets/readme/.

Run from the repo root:  python3 scripts/build_readme_assets.py

Colours are the app's own dark-theme tokens from src/index.css. The numbers in
carescore-flow.svg come from the rules in src/services/documentAnalysis.ts and the
recalculate_user_metrics() trigger in supabase/migrations/20260308_initial_schema.sql.
"""
import math
import os

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "assets", "readme")

BG = "#15110e"        # --background (dark)  hsl(20 20% 7%)
CARD = "#201b18"      # --card (dark)        hsl(20 15% 11%)
LINE = "#3a302a"
FG = "#eee8e2"        # --foreground (dark)  hsl(30 15% 90%)
MUTED = "#b4a79e"
TERRACOTTA = "#e0918a"  # --terracotta (dark) hsl(4 55% 72%)
GOLD = "#f0cb75"        # --gold (dark)       hsl(42 80% 70%)
SAGE = "#97c87e"        # --verified (dark)   hsl(100 40% 64%)

SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif"
MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Noto Sans Mono', monospace"


def arc(cx, cy, r, a0, a1):
    """SVG arc path from a0 to a1 degrees, measured clockwise from 12 o'clock."""
    def pt(a):
        t = math.radians(a)
        return cx + r * math.sin(t), cy - r * math.cos(t)
    x0, y0 = pt(a0)
    x1, y1 = pt(a1)
    large = 1 if (a1 - a0) > 180 else 0
    return f"M{x0:.2f} {y0:.2f} A{r} {r} 0 {large} 1 {x1:.2f} {y1:.2f}"


def hero():
    w, h = 1200, 460
    cx, cy, r = 800, 232, 116
    # CareScore caps from the trigger: responsibility 400, consistency 350, complexity 250.
    parts = [("Responsibility", 400, TERRACOTTA), ("Consistency", 350, GOLD), ("Complexity", 250, SAGE)]
    gap = 2.2
    arcs, legend = [], []
    start = 0.0
    for i, (name, cap, col) in enumerate(parts):
        span = cap / 1000 * 360
        arcs.append(f'<path d="{arc(cx, cy, r, start + gap, start + span - gap)}" stroke="{col}" stroke-width="26" fill="none"/>')
        y = 148 + i * 92
        legend.append(
            f'<text x="972" y="{y}" font-size="34" font-weight="700" fill="{col}">{cap}</text>'
            f'<text x="972" y="{y + 30}" font-size="20" fill="{FG}">{name}</text>'
        )
        start += span
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" aria-labelledby="t d">
  <title id="t">CareProof</title>
  <desc id="d">CareProof turns the paperwork of unpaid caregiving into a CareScore out of 1000, a rupee valuation and a portfolio. The ring shows how the 1000 points split: 400 for responsibility, 350 for consistency, 250 for complexity. Winner of the Lovable x Anthropic Buildathon, March 2026.</desc>
  <rect width="{w}" height="{h}" rx="24" fill="{BG}"/>
  <g font-family="{SANS}">
    <text x="64" y="150" font-size="88" font-weight="700" fill="{FG}" letter-spacing="-1.5">CareProof</text>
    <text x="66" y="214" font-size="25" fill="{FG}">Turns hospital notes, school reports and bills</text>
    <text x="66" y="250" font-size="25" fill="{FG}">into a CareScore out of 1000, a rupee value</text>
    <text x="66" y="286" font-size="25" fill="{FG}">and a portfolio for lenders and employers.</text>
    <line x1="66" y1="330" x2="600" y2="330" stroke="{LINE}" stroke-width="2"/>
    <circle cx="76" cy="370" r="7" fill="{GOLD}"/>
    <text x="94" y="377" font-size="21" fill="{FG}">Won the Lovable × Anthropic Buildathon, March 2026</text>
    <text x="66" y="414" font-size="18" fill="{MUTED}" font-family="{MONO}">React 18 · Supabase Postgres · care-proof.lovable.app</text>
  </g>
  <g id="ring">
    <circle cx="{cx}" cy="{cy}" r="{r}" stroke="{CARD}" stroke-width="40" fill="none"/>
    {''.join(arcs)}
    <g font-family="{SANS}" text-anchor="middle">
      <text x="{cx}" y="{cy + 8}" font-size="50" font-weight="700" fill="{FG}">1000</text>
      <text x="{cx}" y="{cy + 40}" font-size="18" fill="{MUTED}">CareScore points</text>
    </g>
  </g>
  <g font-family="{SANS}">{''.join(legend)}</g>
</svg>
"""


# Worked example. Filenames go through PATTERN_MAP in documentAnalysis.ts (first match wins):
#   discharge_summary.pdf  -> /hospital|discharge|.../  Medical & Hospital Care Coordination, 6 h
#   school_report_card.pdf -> /school|.../              Child Education Support, 3 h
#   electricity_bill.jpg   -> /bill|invoice|.../        Household Financial Management, 2 h
# Skills tagged: 3 + 3 + 3 = 9, distinct 8 ("Stakeholder communication" appears twice).
ROWS = [
    ("discharge_summary.pdf", "Medical & Hospital Care Coordination", 6, "Feb"),
    ("school_report_card.pdf", "Child Education Support", 3, "Mar"),
    ("electricity_bill.jpg", "Household Financial Management", 2, "Mar"),
]
HOURS = sum(r[2] for r in ROWS)            # 11
MONTHS = len({r[3] for r in ROWS})         # 2
SKILLS = 8
RESP = min(400, math.floor(HOURS * 1.8))   # 19
CONS = min(350, MONTHS * 45)               # 90
COMP = min(250, SKILLS * 20)               # 160
SCORE = RESP + CONS + COMP                 # 269
VALUE = HOURS * 450                        # 4950


def flow():
    w, h = 1200, 560
    px = 1.25  # px per CareScore point, so bar tracks are 400 / 350 / 250 long
    rows = []
    for i, (fname, activity, hrs, month) in enumerate(ROWS):
        y = 132 + i * 88
        rows.append(f"""
    <g class="r{i + 1}">
      <rect x="48" y="{y}" width="548" height="76" rx="14" fill="{CARD}" stroke="{LINE}"/>
      <text x="70" y="{y + 30}" font-size="18" fill="{MUTED}" font-family="{MONO}">{fname}</text>
      <text x="70" y="{y + 58}" font-size="20" fill="{FG}">{activity.replace('&', '&amp;')}</text>
      <text x="574" y="{y + 36}" font-size="24" font-weight="700" fill="{GOLD}" text-anchor="end">{hrs} h</text>
      <text x="574" y="{y + 60}" font-size="18" fill="{MUTED}" text-anchor="end">{month}</text>
    </g>""")
    comps = [
        ("Responsibility", RESP, 400, f"floor({HOURS} h × 1.8), cap 400", TERRACOTTA),
        ("Consistency", CONS, 350, f"{MONTHS} months × 45, cap 350", GOLD),
        ("Complexity", COMP, 250, f"{SKILLS} skills × 20, cap 250", SAGE),
    ]
    bars = []
    for i, (name, val, cap, formula, col) in enumerate(comps):
        y = 150 + i * 92
        bars.append(f"""
    <text x="652" y="{y}" font-size="21" font-weight="600" fill="{FG}">{name}</text>
    <text class="v" x="1152" y="{y}" font-size="22" font-weight="700" fill="{col}" text-anchor="end">{val}<tspan fill="{MUTED}" font-weight="400"> / {cap}</tspan></text>
    <rect x="652" y="{y + 14}" width="{cap * px:.1f}" height="12" rx="6" fill="{CARD}"/>
    <rect class="bar" x="652" y="{y + 14}" width="{max(val * px, 12):.1f}" height="12" rx="6" fill="{col}"/>
    <text x="652" y="{y + 54}" font-size="18" fill="{MUTED}" font-family="{MONO}">{formula}</text>""")
    return f"""<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" aria-labelledby="t d">
  <title id="t">How three uploads become a CareScore</title>
  <desc id="d">Worked example. Three files are classified into care entries: discharge_summary.pdf becomes Medical and Hospital Care Coordination, 6 hours, February. school_report_card.pdf becomes Child Education Support, 3 hours, March. electricity_bill.jpg becomes Household Financial Management, 2 hours, March. The Postgres trigger then computes responsibility {RESP} of 400, consistency {CONS} of 350 and complexity {COMP} of 250, a CareScore of {SCORE} out of 1000, and a value of 11 hours times 450 rupees, 4,950 rupees.</desc>
  <style>
    .r1,.r2,.r3,.note,.v,.total{{animation:6.5s cubic-bezier(.2,.7,.2,1) infinite}}
    .bar{{transform-box:fill-box;transform-origin:0 50%;animation:grow 6.5s cubic-bezier(.2,.7,.2,1) infinite}}
    .r1{{animation-name:r1}} .r2{{animation-name:r2}} .r3{{animation-name:r3}}
    .note{{animation-name:note}} .v{{animation-name:vals}} .total{{animation-name:total}}
    @keyframes r1{{0%,3%{{opacity:0;transform:translateX(-28px)}}13%,90%{{opacity:1;transform:none}}97%,100%{{opacity:0;transform:none}}}}
    @keyframes r2{{0%,11%{{opacity:0;transform:translateX(-28px)}}21%,90%{{opacity:1;transform:none}}97%,100%{{opacity:0;transform:none}}}}
    @keyframes r3{{0%,19%{{opacity:0;transform:translateX(-28px)}}29%,90%{{opacity:1;transform:none}}97%,100%{{opacity:0;transform:none}}}}
    @keyframes note{{0%,29%{{opacity:0}}35%,90%{{opacity:1}}97%,100%{{opacity:0}}}}
    @keyframes grow{{0%,35%{{transform:scaleX(0)}}52%,90%{{transform:scaleX(1)}}97%,100%{{transform:scaleX(0)}}}}
    @keyframes vals{{0%,44%{{opacity:0}}52%,90%{{opacity:1}}97%,100%{{opacity:0}}}}
    @keyframes total{{0%,52%{{opacity:0}}60%,90%{{opacity:1}}97%,100%{{opacity:0}}}}
    @media (prefers-reduced-motion:reduce){{*{{animation:none!important}}}}
  </style>
  <rect width="{w}" height="{h}" rx="24" fill="{BG}"/>
  <g font-family="{SANS}">
    <text x="48" y="64" font-size="22" fill="{FG}" font-weight="600">Example: three uploads</text>
    <text x="48" y="100" font-size="18" fill="{MUTED}" font-family="{MONO}">documentAnalysis.ts → care_entries</text>
    <text x="652" y="64" font-size="22" fill="{FG}" font-weight="600">What the trigger writes</text>
    <text x="652" y="100" font-size="18" fill="{MUTED}" font-family="{MONO}">recalculate_user_metrics()</text>
    {''.join(rows)}
    <text class="note" x="48" y="424" font-size="18" fill="{MUTED}">{HOURS} h across {MONTHS} months · 9 skills tagged, {SKILLS} distinct</text>
    <path d="M612 274 L636 274" stroke="{MUTED}" stroke-width="2"/>
    <path d="M630 268 L638 274 L630 280" stroke="{MUTED}" stroke-width="2" fill="none"/>
    {''.join(bars)}
    <line x1="48" y1="460" x2="1152" y2="460" stroke="{LINE}" stroke-width="2"/>
    <g class="total">
      <text x="48" y="516" font-size="22" fill="{FG}">CareScore</text>
      <text x="168" y="520" font-size="46" font-weight="700" fill="{TERRACOTTA}">{SCORE}</text>
      <text x="262" y="516" font-size="20" fill="{MUTED}">/ 1000</text>
      <text x="1152" y="520" font-size="46" font-weight="700" fill="{GOLD}" text-anchor="end">₹{VALUE:,}</text>
      <text x="930" y="516" font-size="20" fill="{MUTED}" text-anchor="end" font-family="{MONO}">{HOURS} h × ₹450 =</text>
    </g>
  </g>
</svg>
"""


def main():
    os.makedirs(OUT, exist_ok=True)
    for name, fn in [("hero.svg", hero), ("carescore-flow.svg", flow)]:
        with open(os.path.join(OUT, name), "w", encoding="utf-8") as f:
            f.write(fn())
        print("wrote", os.path.normpath(os.path.join(OUT, name)))


if __name__ == "__main__":
    main()
