"use client";
import { useEffect, useRef } from "react";

type Dot = { x: number; y: number; vx: number; vy: number };

export default function ConstellationBG({
  className="",
  density = 1.4,          // ↑ more dots (1.0 = previous baseline)
  speed = 1.7,            // ↑ faster drifting
  connectDistance = 160,  // ↑ longer links (in px)
  dotRadius = 1.8,        // ↑ larger dots
  lineWidth = 0.9,        // ↑ thicker lines
}: {
  className?: string;
  density?: number;
  speed?: number;
  connectDistance?: number;
  dotRadius?: number;
  lineWidth?: number;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let w = 0, h = 0, rAF = 0, dots: Dot[] = [];
    let pointer = { x: -9999, y: -9999 };
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const css = () => getComputedStyle(wrap);
    const dotColor  = () => css().getPropertyValue("--dot-color").trim();
    const lineColor = () => css().getPropertyValue("--line-color").trim();

    const clamp = (min: number, max: number, v: number) => Math.max(min, Math.min(max, v));

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      w = Math.floor(rect.width);
      h = Math.floor(rect.height);
      canvas.width = Math.floor(w * DPR);
      canvas.height = Math.floor(h * DPR);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      // denser field: divide by smaller number and clamp higher
      const area = w * h;
      const base = Math.floor((area / 8000) * density); // was /9000
      const target = clamp(70, 190, base);
      dots = new Array(target).fill(0).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * (0.32 * speed),  // was ~0.2
        vy: (Math.random() - 0.5) * (0.32 * speed),
      }));
    };

    const dist2 = (a: Dot, b: { x: number; y: number }) => {
      const dx = a.x - b.x, dy = a.y - b.y;
      return dx * dx + dy * dy;
    };

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const maxDist2 = connectDistance * connectDistance;

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      // move dots + slight wander
      for (const d of dots) {
        d.vx += (Math.random() - 0.5) * 0.002; // micro wander
        d.vy += (Math.random() - 0.5) * 0.002;

        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
      }

      // lines
      ctx.strokeStyle = lineColor();
      ctx.lineWidth = lineWidth;
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i], b = dots[j];
          const d2 = dist2(a, b);
          if (d2 < maxDist2) {
            const alpha = 1 - d2 / maxDist2;
            ctx.globalAlpha = 0.55 * alpha; // was 0.35
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;

      // dots (+ slightly stronger attraction to pointer)
      ctx.fillStyle = dotColor();
      for (const d of dots) {
        const p2 = dist2(d, pointer);
        if (p2 < 170 * 170) {
          d.vx += (pointer.x - d.x) * 0.00002;
          d.vy += (pointer.y - d.y) * 0.00002;
        }
        ctx.beginPath();
        ctx.arc(d.x, d.y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!prefersReduced) rAF = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => (pointer = { x: -9999, y: -9999 });

    resize();
    window.addEventListener("resize", resize);
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);

    if (!prefersReduced) rAF = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rAF);
      window.removeEventListener("resize", resize);
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, [connectDistance, density, dotRadius, lineWidth, speed]);

  return (
    <div ref={wrapRef} className={`hero-constellation absolute inset-0 -z-10 ${className}`} aria-hidden>
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* soften bottom vignette (lighter in light mode, a bit stronger in dark) */}
      <div className="pointer-events-none absolute inset-0
                bg-gradient-to-b from-transparent via-transparent to-white/0
                dark:to-neutral-950/35" />

    </div>
  );
}
