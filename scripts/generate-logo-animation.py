#!/usr/bin/env python3
"""Generates src/app/logo-anim.css: the animated Latchpoint mark (<Logomark animated />).

The motion is the same sequence as the animated email-signature GIF
(public/email/latchpoint-mark-v2.gif): the ember square winds up and flies off
spinning, the outline un-draws then draws itself back on with an ember spark
riding the tip, the square swoops back along an arc and lands with a squash,
then a glow, two shockwave rings, an outline jiggle, and a light glint sweep
across, before resting.

It is sampled from the choreography below into plain CSS keyframes (no
JavaScript at runtime), so the GIF and the site can't drift apart: change a
curve here and re-run

    python3 scripts/generate-logo-animation.py

All coordinates are the logomark SVG's own user units (viewBox 2.5 1.2 20.3 20.3).
"""
import math
import os

HOLD_START = 1500      # ms the finished logo is shown before the motion begins
T_END = 2900           # ms of motion
TAIL = 300             # ms resting at the end
LOOP = HOLD_START + T_END + TAIL
STEP = 40              # sampling interval, ms (CSS interpolates linearly between samples)

CHIP_C = (18.8, 5.2)
OFF = (7.4, -6.2)      # where the chip flies off to / in from (a touch shorter than the
                       # GIF's, so it clears the wordmark sitting beside the logo)


def lerp(a, b, t): return a + (b - a) * t
def clamp01(t): return max(0.0, min(1.0, t))
def seg(t, a, b): return clamp01((t - a) / (b - a))
def ease_in_cubic(t): return t ** 3
def ease_out_cubic(t): return 1 - (1 - t) ** 3
def ease_in_out_cubic(t): return 4 * t ** 3 if t < 0.5 else 1 - ((-2 * t + 2) ** 3) / 2


def bezier(p0, p1, p2, t):
    a = (1 - t) ** 2, 2 * (1 - t) * t, t * t
    return (a[0] * p0[0] + a[1] * p1[0] + a[2] * p2[0], a[0] * p0[1] + a[1] * p1[1] + a[2] * p2[1])


# ---- ring path (centreline), clockwise from just left of the chip -------------
def ring_points():
    x0, y0, x1, y1, r = 3.5, 3.5, 20.5, 20.5, 6.0
    pts = []

    def arc(cx, cy, a0, a1, n=24):
        for i in range(n + 1):
            a = math.radians(lerp(a0, a1, i / n))
            pts.append((cx + r * math.cos(a), cy + r * math.sin(a)))

    pts.append((x1 - r, y0))
    arc(x1 - r, y0 + r, -90, 0)
    pts.append((x1, y1 - r))
    arc(x1 - r, y1 - r, 0, 90)
    pts.append((x0 + r, y1))
    arc(x0 + r, y1 - r, 90, 180)
    pts.append((x0, y0 + r))
    arc(x0 + r, y0 + r, 180, 270)
    pts.append((x1 - r, y0))
    dist = [0.0]
    for (ax, ay), (bx, by) in zip(pts, pts[1:]):
        dist.append(dist[-1] + math.hypot(bx - ax, by - ay))
    return pts, dist


RING, RING_D = ring_points()


def ring_tip(p):
    target = RING_D[-1] * p
    for i in range(1, len(RING)):
        if RING_D[i] >= target:
            f = (target - RING_D[i - 1]) / (RING_D[i] - RING_D[i - 1] or 1)
            return (lerp(RING[i - 1][0], RING[i][0], f), lerp(RING[i - 1][1], RING[i][1], f))
    return RING[-1]


# ---- the choreography (identical to the GIF) ------------------------------------
def chip_state(t):
    """(dx, dy, rotation deg, sx, sy) or None while the chip is away."""
    if t < 120:
        k = ease_in_out_cubic(seg(t, 0, 120))
        return (-0.5 * k, 0.35 * k, -4 * k, 1 + 0.05 * k, 1 - 0.05 * k)
    if t < 470:
        k = ease_in_cubic(seg(t, 120, 470))
        x, y = bezier((-0.5, 0.35), (3.8, -4.4), OFF, k)
        return (x, y, lerp(-4, 34, k), lerp(1.05, 0.7, k), lerp(0.95, 0.7, k))
    if t < 1180:
        return None
    if t < 1700:
        k = ease_out_cubic(seg(t, 1180, 1700))
        x, y = bezier(OFF, (9.4, -0.2), (0, 0), k)
        return (x, y, lerp(-40, 0, k), lerp(0.7, 1.0, k), lerp(0.7, 1.0, k))
    s = (t - 1700) / 1000.0
    amp = math.exp(-s * 9) * math.cos(s * 26)
    return (0, 0, 0, 1 + 0.26 * amp, 1 - 0.22 * amp)


def ring_progress(t):
    if t < 300: return 1.0
    if t < 760: return 1 - ease_in_out_cubic(seg(t, 300, 760))
    if t < 1400: return ease_in_out_cubic(seg(t, 760, 1400))
    return 1.0


def ring_scale(t):
    if t < 1700: return 1.0
    s = (t - 1700) / 1000.0
    return 1 + 0.07 * math.exp(-s * 8) * math.sin(s * 30 + 0.6)


# ---- keyframe emission ------------------------------------------------------------
def pct(t_ms):
    return (HOLD_START + t_ms) / LOOP * 100.0


def fmt(v):
    s = f"{v:.3f}".rstrip("0").rstrip(".")
    return s if s not in ("", "-0") else "0"


def emit(name, sample, rest, ease="linear"):
    """sample(t) -> dict of css props (or None for 'use rest'). Collapses redundant stops."""
    stops = [(0.0, rest)]
    t = 0
    while t <= T_END:
        v = sample(t)
        stops.append((pct(t), v if v is not None else rest))
        t += STEP
    stops.append((100.0, rest))

    # drop stops that sit between two identical neighbours
    keep = []
    for i, (p, v) in enumerate(stops):
        if 0 < i < len(stops) - 1 and stops[i - 1][1] == v == stops[i + 1][1]:
            continue
        keep.append((p, v))
    body = []
    for p, v in keep:
        props = ";".join(f"{k}:{val}" for k, val in v.items())
        body.append(f"{fmt(p)}%{{{props}}}")
    return f"@keyframes {name}{{{''.join(body)}}}\n"


def chip_css(t):
    st = chip_state(t)
    if st is None:
        return {"opacity": "0", "transform": "translate(0px,0px) rotate(0deg) scale(1,1)"}
    dx, dy, rot, sx, sy = st
    return {"opacity": "1", "transform": f"translate({fmt(dx)}px,{fmt(dy)}px) rotate({fmt(rot)}deg) scale({fmt(sx)},{fmt(sy)})"}


CHIP_REST = {"opacity": "1", "transform": "translate(0px,0px) rotate(0deg) scale(1,1)"}


def ring_css(t):
    return {"stroke-dashoffset": fmt(1 - ring_progress(t)), "transform": f"scale({fmt(ring_scale(t))})"}


RING_REST = {"stroke-dashoffset": "0", "transform": "scale(1)"}


def spark_css(t):
    if 760 <= t <= 1400:
        x, y = ring_tip(ring_progress(t))
        return {"opacity": "1", "transform": f"translate({fmt(x)}px,{fmt(y)}px)"}
    return {"opacity": "0", "transform": "translate(14.5px,3.5px)"}


SPARK_REST = {"opacity": "0", "transform": "translate(14.5px,3.5px)"}


def shock_css(delay):
    def f(t):
        k = seg(t, 1700 + delay, 2350 + delay)
        if 0 < k < 1:
            s = (4.1 + k * 7.0) / 4.1
            return {"opacity": fmt((1 - k) ** 1.5 * 0.9), "transform": f"scale({fmt(s)})"}
        return {"opacity": "0", "transform": "scale(1)"}
    return f


SHOCK_REST = {"opacity": "0", "transform": "scale(1)"}


def glow_css(t):
    k = seg(t, 1700, 2150)
    if 0 < k < 1:
        return {"opacity": fmt((1 - k) ** 1.8 * 0.75), "transform": f"scale({fmt(0.7 + k)})"}
    return {"opacity": "0", "transform": "scale(0.7)"}


GLOW_REST = {"opacity": "0", "transform": "scale(0.7)"}


def glint_css(t):
    k = seg(t, 2000, 2750)
    if 0 < k < 1:
        return {"opacity": "1", "transform": f"translateX({fmt(lerp(-14, 16, ease_in_out_cubic(k)))}px)"}
    return {"opacity": "0", "transform": "translateX(-14px)"}


GLINT_REST = {"opacity": "0", "transform": "translateX(-14px)"}


def main():
    css = [
        "/* GENERATED by scripts/generate-logo-animation.py -- do not edit by hand. */\n",
        "/* Animated Latchpoint mark (<Logomark animated />). Same sequence as the animated email-signature GIF.\n"
        "   Only runs when the visitor hasn't asked for reduced motion; otherwise the mark simply stays put. */\n",
        "@media (prefers-reduced-motion:no-preference){\n",
        f".lp-logo-anim *{{animation-duration:{LOOP}ms;animation-iteration-count:infinite;animation-timing-function:linear}}\n"
        ".lp-logo-anim .lp-chip,.lp-logo-anim .lp-ring,.lp-logo-anim .lp-shock,.lp-logo-anim .lp-glow{transform-box:fill-box;transform-origin:center}\n"
        ".lp-logo-anim .lp-chip{animation-name:lp-chip}\n"
        ".lp-logo-anim .lp-ring{animation-name:lp-ring}\n"
        ".lp-logo-anim .lp-spark{animation-name:lp-spark}\n"
        ".lp-logo-anim .lp-shock-1{animation-name:lp-shock-1}\n"
        ".lp-logo-anim .lp-shock-2{animation-name:lp-shock-2}\n"
        ".lp-logo-anim .lp-glow{animation-name:lp-glow}\n"
        ".lp-logo-anim .lp-glint{animation-name:lp-glint}\n",
        "}\n",
        # resting state of the extras, whether or not motion is allowed
        ".lp-logo-anim .lp-spark,.lp-logo-anim .lp-shock,.lp-logo-anim .lp-glow,.lp-logo-anim .lp-glint{opacity:0}\n",
        "@media (prefers-reduced-motion:no-preference){\n",
        emit("lp-chip", chip_css, CHIP_REST),
        emit("lp-ring", ring_css, RING_REST),
        emit("lp-spark", spark_css, SPARK_REST),
        emit("lp-shock-1", shock_css(0), SHOCK_REST),
        emit("lp-shock-2", shock_css(130), SHOCK_REST),
        emit("lp-glow", glow_css, GLOW_REST),
        emit("lp-glint", glint_css, GLINT_REST),
        "}\n",
    ]
    out = os.path.join(os.path.dirname(__file__), "..", "src", "app", "logo-anim.css")
    with open(out, "w") as f:
        f.write("".join(css))
    print("wrote", os.path.normpath(out), os.path.getsize(out), "bytes; loop", LOOP, "ms")


if __name__ == "__main__":
    main()
