import { useEffect, useMemo, useRef, useState } from "react";

// Smooth Scroll Slider — Originkit, ported from TS to plain JSX and extended:
//  - tiles keep each image's natural aspect ratio (uniform height, variable
//    width) laid out on a cumulative track instead of fixed-size slots;
//  - the strip drifts on its own at a slow, constant speed and loops forever;
//  - drag / horizontal wheel / arrows still nudge it on top of the drift.
// A vertical mouse wheel is left alone so the page keeps scrolling normally.

const PLACEHOLDER_COUNT = 8;
const MAX_SCALE = 2.5;
const MIN_SCALE = 0.1;
const DEFAULT_ASPECT = 1.4; // used until an image reports its real ratio

function wrap(value, span) {
  return ((value % span) + span) % span;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function resolveSrc(value) {
  if (!value) return null;
  if (typeof value === "string") return value || null;
  const src = value.src;
  return typeof src === "string" && src ? src : null;
}

function imageOf(item) {
  if (item && typeof item === "object" && "image" in item) return resolveSrc(item.image);
  return resolveSrc(item);
}

function offsetOf(item) {
  if (item && typeof item === "object" && "offsetY" in item) {
    const offset = item.offsetY;
    return typeof offset === "number" && isFinite(offset) ? offset : 0;
  }
  return 0;
}

function placeholderFill(index) {
  const hue = (index * 47 + 210) % 360;
  return `linear-gradient(150deg, hsl(${hue} 42% 34%), hsl(${(hue + 45) % 360} 55% 10%))`;
}

export default function SmoothScrollSlider({
  images = [],
  slideHeight = 400,
  spacing = 2,
  direction = "right",
  smoothness = 10,
  radius = 16,
  dim = 10,
  background = "transparent",
  sensitivity = 5,
  autoSpeed = 18, // px/sec of constant drift
  loop = true,
  style,
}) {
  const containerRef = useRef(null);
  const nodes = useRef([]);
  const target = useRef(0);
  const current = useRef(0);
  const [width, setWidth] = useState(0);
  const [aspects, setAspects] = useState({}); // src -> naturalWidth / naturalHeight

  const source = useMemo(() => {
    const resolved = [];
    for (const item of images ?? []) {
      const src = imageOf(item);
      if (src) resolved.push({ src, offsetY: offsetOf(item) });
    }
    return resolved.length
      ? resolved
      : Array.from({ length: PLACEHOLDER_COUNT }, () => ({ src: null, offsetY: 0 }));
  }, [images]);

  // Measure each image once so its tile can match its real aspect ratio.
  useEffect(() => {
    let alive = true;
    for (const { src } of source) {
      if (!src || aspects[src]) continue;
      const img = new Image();
      img.onload = () => {
        if (!alive || !img.naturalHeight) return;
        setAspects((a) => (a[src] ? a : { ...a, [src]: img.naturalWidth / img.naturalHeight }));
      };
      img.src = src;
    }
    return () => {
      alive = false;
    };
  }, [source, aspects]);

  const gap = clamp(spacing, 0, 10) * 20;
  const minW = slideHeight * 0.55;
  const maxW = slideHeight * 2.0;
  const widthFor = (src) => clamp(slideHeight * (aspects[src] || DEFAULT_ASPECT), minW, maxW);

  const ease = 0.15 - (clamp(smoothness, 0, 10) / 10) * 0.13;
  const dimAmount = (clamp(dim, 0, 10) / 10) * 0.85;
  const wheelMultiplier = 0.4 + (clamp(sensitivity, 0, 10) / 10) * 1.2;
  const dragMultiplier = 0.6 + (clamp(sensitivity, 0, 10) / 10) * 1.8;

  const flip = direction === "left";

  // Enough copies of the source so the looping track always overflows the
  // viewport with headroom for the widest tile.
  const repeats = useMemo(() => {
    const est = source.length * (slideHeight * DEFAULT_ASPECT + gap);
    if (!loop || width <= 0 || est <= 0) return 1;
    return Math.max(2, Math.ceil((width + maxW * 2) / est));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loop, width, source.length, slideHeight, gap]);

  const slides = useMemo(() => {
    const out = [];
    for (let r = 0; r < repeats; r += 1) out.push(...source);
    return out;
  }, [source, repeats]);

  // Cumulative geometry: each tile's start x and its own width.
  const geo = useMemo(() => {
    const items = [];
    let acc = 0;
    for (const slide of slides) {
      const w = widthFor(slide.src);
      items.push({ start: acc, width: w });
      acc += w + gap;
    }
    return { items, total: acc, avgStep: slides.length ? acc / slides.length : 0 };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides, aspects, slideHeight, gap]);

  const frame = useRef({});
  frame.current = {
    items: geo.items,
    total: geo.total,
    avgStep: geo.avgStep,
    width,
    ease,
    maxScale: MAX_SCALE,
    minScale: MIN_SCALE,
    maxWidth: maxW,
    pad: (width - (geo.items[0]?.width || slideHeight)) / 2,
    dim: dimAmount,
    loop,
    flip,
    autoStep: (flip ? -1 : 1) * autoSpeed,
  };

  const input = useRef({ wheelMultiplier, dragMultiplier, flip });
  input.current = { wheelMultiplier, dragMultiplier, flip };

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    observer.observe(node);
    setWidth(node.getBoundingClientRect().width);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    nodes.current.length = slides.length;
  }, [slides.length]);

  useEffect(() => {
    let raf = 0;
    let last = 0;

    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      const c = frame.current;
      const delta = last ? Math.min((now - last) / 1000, 0.1) : 1 / 60;
      last = now;
      if (!c.items || !c.items.length || c.total <= 0 || c.width <= 0) return;

      // Constant slow drift.
      target.current += c.autoStep * delta;

      const span = c.total;
      if (c.loop) {
        if (current.current > span || current.current < -span) {
          const shift = Math.trunc(current.current / span) * span;
          current.current -= shift;
          target.current -= shift;
        }
      } else {
        target.current = clamp(target.current, 0, Math.max(0, c.total - c.width));
      }

      const k = 1 - Math.pow(1 - c.ease, delta * 60);
      current.current += (target.current - current.current) * k;

      const half = c.width / 2;
      const buffer = c.maxWidth;

      for (let i = 0; i < c.items.length; i += 1) {
        const node = nodes.current[i];
        if (!node) continue;
        const it = c.items[i];

        const raw = it.start - current.current + c.pad;
        const x = c.loop ? wrap(raw + buffer, span) - buffer : raw;

        const distance = x + it.width / 2 - half;
        let scale;
        let push;
        if (distance > 0) {
          scale = Math.min(c.maxScale, 1 + distance / c.width);
          push = (scale - 1) * it.width * 0.75;
        } else {
          scale = Math.max(c.minScale, 1 + distance / c.width);
          push = 0;
        }

        const left = c.flip ? c.width - it.width - (x + push) : x + push;
        node.style.transform = `translate3d(${left}px, -50%, 0) scale(${scale})`;

        if (c.dim > 0 && scale < 1) {
          const t = (1 - scale) / Math.max(0.001, 1 - c.minScale);
          node.style.filter = `brightness(${1 - t * c.dim})`;
        } else {
          node.style.filter = "none";
        }
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const onWheel = (event) => {
      // Only take over the wheel for horizontal intent; leave vertical wheels
      // to scroll the page so the gallery never traps it.
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      target.current += event.deltaX * input.current.wheelMultiplier;
    };
    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    let pointer = null;
    let lastX = 0;

    const onDown = (event) => {
      if (pointer !== null) return;
      pointer = event.pointerId;
      lastX = event.clientX;
      node.setPointerCapture(event.pointerId);
    };
    const onMove = (event) => {
      if (pointer !== event.pointerId) return;
      const dx = event.clientX - lastX;
      lastX = event.clientX;
      target.current += (input.current.flip ? dx : -dx) * input.current.dragMultiplier;
    };
    const onUp = (event) => {
      if (pointer !== event.pointerId) return;
      pointer = null;
      if (node.hasPointerCapture(event.pointerId)) node.releasePointerCapture(event.pointerId);
    };

    node.addEventListener("pointerdown", onDown);
    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerup", onUp);
    node.addEventListener("pointercancel", onUp);
    return () => {
      node.removeEventListener("pointerdown", onDown);
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerup", onUp);
      node.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const nudge = (dir) => {
    target.current += (flip ? -dir : dir) * (frame.current.avgStep || slideHeight);
  };

  return (
    <div className="slider-shell">
      <div
        ref={containerRef}
        className="smooth-slider"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background,
          cursor: "grab",
          touchAction: "pan-y",
          opacity: width > 0 ? 1 : 0,
          transition: "opacity 0.35s ease",
          ...style,
        }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            ref={(el) => {
              nodes.current[i] = el;
            }}
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              width: widthFor(slide.src),
              height: slideHeight,
              borderRadius: radius,
              overflow: "hidden",
              background: slide.src ? "#111" : placeholderFill(i),
              willChange: "transform, filter",
              transform: "translate3d(0, -50%, 0)",
              pointerEvents: "none",
            }}
          >
            {slide.src ? (
              <img
                src={slide.src}
                alt=""
                draggable={false}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: `50% calc(50% + ${slide.offsetY}px)`,
                  display: "block",
                  userSelect: "none",
                }}
              />
            ) : null}
          </div>
        ))}
      </div>
      <button type="button" className="cg-arrow cg-arrow--prev" aria-label="Previous image" onClick={() => nudge(-1)}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      <button type="button" className="cg-arrow cg-arrow--next" aria-label="Next image" onClick={() => nudge(1)}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </div>
  );
}
