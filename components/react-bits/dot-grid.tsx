"use client";

import {useCallback, useEffect, useMemo, useRef} from "react";
import {gsap} from "gsap";
import {InertiaPlugin} from "gsap/InertiaPlugin";

gsap.registerPlugin(InertiaPlugin);

const throttle = <T extends unknown[]>(func: (...args: T) => void, limit: number) => {
  let lastCall = 0;

  return (...args: T) => {
    const now = performance.now();

    if (now - lastCall >= limit) {
      lastCall = now;
      func(...args);
    }
  };
};

interface Dot {
  cx: number;
  cy: number;
  xOffset: number;
  yOffset: number;
  _inertiaApplied: boolean;
}

export type DotGridProps = {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  speedTrigger?: number;
  shockRadius?: number;
  shockStrength?: number;
  maxSpeed?: number;
  resistance?: number;
  returnDuration?: number;
  className?: string;
  style?: React.CSSProperties;
};

function hexToRgb(hex: string) {
  const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);

  if (!match) return {r: 0, g: 0, b: 0};

  return {
    r: Number.parseInt(match[1], 16),
    g: Number.parseInt(match[2], 16),
    b: Number.parseInt(match[3], 16),
  };
}

export default function DotGrid({
  dotSize = 16,
  gap = 32,
  baseColor = "#5227FF",
  activeColor = "#5227FF",
  proximity = 150,
  speedTrigger = 100,
  shockRadius = 250,
  shockStrength = 5,
  maxSpeed = 5000,
  resistance = 750,
  returnDuration = 1.5,
  className = "",
  style,
}: DotGridProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const pointerRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0,
  });

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const circlePath = useMemo(() => {
    if (typeof window === "undefined" || !window.Path2D) return null;

    const path = new Path2D();
    path.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
    return path;
  }, [dotSize]);

  const buildGrid = useCallback(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;

    if (!wrapper || !canvas) return;

    const {width, height} = wrapper.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const context = canvas.getContext("2d");

    if (context) context.scale(dpr, dpr);

    const cols = Math.floor((width + gap) / (dotSize + gap));
    const rows = Math.floor((height + gap) / (dotSize + gap));
    const cell = dotSize + gap;

    const gridWidth = cell * cols - gap;
    const gridHeight = cell * rows - gap;

    const startX = (width - gridWidth) / 2 + dotSize / 2;
    const startY = (height - gridHeight) / 2 + dotSize / 2;

    const dots: Dot[] = [];

    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        dots.push({
          cx: startX + x * cell,
          cy: startY + y * cell,
          xOffset: 0,
          yOffset: 0,
          _inertiaApplied: false,
        });
      }
    }

    dotsRef.current = dots;
  }, [dotSize, gap]);

  useEffect(() => {
    if (!circlePath) return;

    let frameId = 0;
    const proximitySquared = proximity * proximity;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d");
      if (!context) return;

      context.clearRect(0, 0, canvas.width, canvas.height);

      const {x: pointerX, y: pointerY} = pointerRef.current;

      for (const dot of dotsRef.current) {
        const offsetX = dot.cx + dot.xOffset;
        const offsetY = dot.cy + dot.yOffset;
        const dx = dot.cx - pointerX;
        const dy = dot.cy - pointerY;
        const distanceSquared = dx * dx + dy * dy;

        let fill = baseColor;

        if (distanceSquared <= proximitySquared) {
          const distance = Math.sqrt(distanceSquared);
          const ratio = 1 - distance / proximity;
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * ratio);
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * ratio);
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * ratio);
          fill = `rgb(${r},${g},${b})`;
        }

        context.save();
        context.translate(offsetX, offsetY);
        context.fillStyle = fill;
        context.fill(circlePath);
        context.restore();
      }

      frameId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(frameId);
  }, [activeRgb, baseColor, baseRgb, circlePath, proximity]);

  useEffect(() => {
    buildGrid();

    let observer: ResizeObserver | null = null;

    if ("ResizeObserver" in window) {
      observer = new ResizeObserver(buildGrid);
      if (wrapperRef.current) observer.observe(wrapperRef.current);
    }

    window.addEventListener("resize", buildGrid);

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("resize", buildGrid);
    };
  }, [buildGrid]);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const now = performance.now();
      const pointer = pointerRef.current;
      const deltaTime = pointer.lastTime ? now - pointer.lastTime : 16;
      const deltaX = event.clientX - pointer.lastX;
      const deltaY = event.clientY - pointer.lastY;

      let velocityX = (deltaX / deltaTime) * 1000;
      let velocityY = (deltaY / deltaTime) * 1000;
      let speed = Math.hypot(velocityX, velocityY);

      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        velocityX *= scale;
        velocityY *= scale;
        speed = maxSpeed;
      }

      pointer.lastTime = now;
      pointer.lastX = event.clientX;
      pointer.lastY = event.clientY;
      pointer.vx = velocityX;
      pointer.vy = velocityY;
      pointer.speed = speed;

      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;

      for (const dot of dotsRef.current) {
        const distance = Math.hypot(dot.cx - pointer.x, dot.cy - pointer.y);

        if (speed > speedTrigger && distance < proximity && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);

          const pushX = dot.cx - pointer.x + velocityX * 0.005;
          const pushY = dot.cy - pointer.y + velocityY * 0.005;

          gsap.to(dot, {
            inertia: {xOffset: pushX, yOffset: pushY, resistance},
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: "elastic.out(1,0.75)",
              });

              dot._inertiaApplied = false;
            },
          });
        }
      }
    };

    const handleClick = (event: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;

      for (const dot of dotsRef.current) {
        const distance = Math.hypot(dot.cx - clickX, dot.cy - clickY);

        if (distance < shockRadius && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);

          const falloff = Math.max(0, 1 - distance / shockRadius);
          const pushX = (dot.cx - clickX) * shockStrength * falloff;
          const pushY = (dot.cy - clickY) * shockStrength * falloff;

          gsap.to(dot, {
            inertia: {xOffset: pushX, yOffset: pushY, resistance},
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: "elastic.out(1,0.75)",
              });

              dot._inertiaApplied = false;
            },
          });
        }
      }
    };

    const throttledMove = throttle(handleMove, 50);

    window.addEventListener("mousemove", throttledMove, {passive: true});
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", throttledMove);
      window.removeEventListener("click", handleClick);
    };
  }, [
    maxSpeed,
    proximity,
    resistance,
    returnDuration,
    shockRadius,
    shockStrength,
    speedTrigger,
  ]);

  return (
    <section className={`relative h-full w-full ${className}`} style={style}>
      <div ref={wrapperRef} className="relative h-full w-full">
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full"
        />
      </div>
    </section>
  );
}
