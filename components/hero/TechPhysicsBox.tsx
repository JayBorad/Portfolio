'use client';

import { useEffect, useMemo, useRef } from 'react';

type ChipShape = 'rounded' | 'square' | 'landscape';

interface TechChip {
  id: number;
  label: string;
  shape: ChipShape;
  color: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  halfW: number;
  halfH: number;
  collisionRadius: number;
  mass: number;
}

const GRAVITY = 920;
const AIR_DRAG = 0.996;
const BOUNCE = 0.74;
const FRICTION = 0.992;

const techTokens = [
  { label: '</>', color: '#3b82f6', shape: 'square' as const },
  { label: '{}', color: '#facc15', shape: 'rounded' as const },
  { label: 'N', color: '#e8f0fe', shape: 'square' as const },
  { label: 'TS', color: '#00d4ff', shape: 'rounded' as const },
  { label: 'JS', color: '#00a8ff', shape: 'square' as const },
  { label: 'Go', color: '#00add8', shape: 'rounded' as const },
  { label: 'Py', color: '#4ade80', shape: 'landscape' as const },
  { label: 'SQL', color: '#60a5fa', shape: 'landscape' as const },
  { label: 'AWS', color: '#fb923c', shape: 'landscape' as const },
  { label: 'Git', color: '#f97316', shape: 'rounded' as const },
  { label: 'API', color: '#a855f7', shape: 'rounded' as const },
  { label: 'UI', color: '#00e5ff', shape: 'square' as const },
  { label: 'DB', color: '#67e8f9', shape: 'landscape' as const },
  { label: '⚙', color: '#c084fc', shape: 'square' as const },
  { label: 'λ', color: '#22d3ee', shape: 'rounded' as const },
  { label: 'CI', color: '#38bdf8', shape: 'rounded' as const },
  { label: 'ML', color: '#f472b6', shape: 'landscape' as const },
  { label: 'K8', color: '#60a5fa', shape: 'square' as const },
  { label: '↯', color: '#2dd4bf', shape: 'rounded' as const },
  { label: '::', color: '#93c5fd', shape: 'landscape' as const },
];

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function createChip(index: number, width: number, height: number): TechChip {
  const token = techTokens[index % techTokens.length];
  const radius = 24 + Math.random() * 10;
  const squareSize = radius * 1.75;
  const landscapeW = radius * 2.6;
  const landscapeH = radius * 1.35;
  const halfW = token.shape === 'landscape' ? landscapeW / 2 : squareSize / 2;
  const halfH = token.shape === 'landscape' ? landscapeH / 2 : squareSize / 2;
  const collisionRadius = Math.max(halfW, halfH);
  const x = radius + Math.random() * Math.max(40, width - radius * 2);
  const y = -Math.random() * (height * 0.85) - radius * 2;

  return {
    id: index,
    label: token.label,
    shape: token.shape,
    color: token.color,
    x,
    y,
    vx: (Math.random() - 0.5) * 140,
    vy: Math.random() * 50,
    radius,
    halfW,
    halfH,
    collisionRadius,
    mass: collisionRadius * collisionRadius,
  };
}

function makeInitialChips(width: number, height: number): TechChip[] {
  return Array.from({ length: 26 }, (_, i) => createChip(i, width, height));
}

function drawChip(ctx: CanvasRenderingContext2D, chip: TechChip) {
  const size = chip.radius * 2;
  const square = chip.radius * 1.75;
  const landscapeW = chip.radius * 2.6;
  const landscapeH = chip.radius * 1.35;

  ctx.save();
  ctx.translate(chip.x, chip.y);
  ctx.shadowBlur = 20;
  ctx.shadowColor = `${chip.color}88`;
  ctx.fillStyle = `${chip.color}66`;
  ctx.strokeStyle = `${chip.color}`;
  ctx.lineWidth = 1.6;

  if (chip.shape === 'square') {
    const half = square / 2;
    ctx.beginPath();
    ctx.rect(-half, -half, square, square);
    ctx.fill();
    ctx.stroke();
  } else if (chip.shape === 'rounded') {
    const half = size / 2;
    ctx.beginPath();
    ctx.roundRect(-half, -half, size, size, 12);
    ctx.fill();
    ctx.stroke();
  } else {
    const x = -landscapeW / 2;
    const y = -landscapeH / 2;
    ctx.beginPath();
    ctx.rect(x, y, landscapeW, landscapeH);
    ctx.fill();
    ctx.stroke();
  }

  ctx.shadowBlur = 0;
  ctx.fillStyle = '#06121f';
  ctx.font = `600 ${Math.max(12, chip.radius * 0.48)}px "JetBrains Mono", monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(chip.label, 0, 1);
  ctx.restore();
}

export default function TechPhysicsBox() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chipsRef = useRef<TechChip[]>([]);
  const dragRef = useRef<{
    id: number;
    px: number;
    py: number;
    time: number;
    vx: number;
    vy: number;
  } | null>(null);
  const lastTimeRef = useRef<number>(0);
  const sizeRef = useRef({ width: 560, height: 420, dpr: 1 });

  const containerStyle = useMemo(
    () => ({
      width: '100%',
      maxWidth: 'none',
      height: '100%',
      borderRadius: 0,
      border: '1px solid rgba(0, 168, 255, 0.32)',
      background:
        'linear-gradient(160deg, rgba(2, 16, 34, 0.95), rgba(3, 10, 22, 0.97) 55%, rgba(7, 11, 28, 0.98))',
      boxShadow: 'inset 0 0 0 1px rgba(0, 229, 255, 0.08)',
      position: 'relative' as const,
      overflow: 'hidden' as const,
    }),
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      sizeRef.current = { width: rect.width, height: rect.height, dpr };
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      chipsRef.current = makeInitialChips(rect.width, rect.height);
    };

    updateCanvasSize();
    const resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(canvas);

    const pointInChip = (chip: TechChip, x: number, y: number) => {
      const dx = x - chip.x;
      const dy = y - chip.y;
      if (chip.shape === 'rounded') {
        // Rounded-square hit area with slight tolerance for better touch behavior.
        const tolerance = 4;
        return Math.abs(dx) <= chip.halfW + tolerance && Math.abs(dy) <= chip.halfH + tolerance;
      }
      return Math.abs(dx) <= chip.halfW && Math.abs(dy) <= chip.halfH;
    };

    const findChipAt = (x: number, y: number) => {
      // Check top-most first so overlapped chips behave naturally.
      for (let i = chipsRef.current.length - 1; i >= 0; i--) {
        const chip = chipsRef.current[i];
        if (pointInChip(chip, x, y)) return chip;
      }
      return null;
    };

    const toLocal = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onPointerDown = (e: PointerEvent) => {
      const { x, y } = toLocal(e);
      const hit = findChipAt(x, y);
      if (!hit) return;
      canvas.setPointerCapture(e.pointerId);
      dragRef.current = {
        id: hit.id,
        px: x,
        py: y,
        time: performance.now(),
        vx: hit.vx,
        vy: hit.vy,
      };
      hit.vx = 0;
      hit.vy = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragRef.current) return;
      const { x, y } = toLocal(e);
      const drag = dragRef.current;
      const chip = chipsRef.current.find((c) => c.id === drag.id);
      if (!chip) return;

      const now = performance.now();
      const dt = Math.max(0.008, (now - drag.time) / 1000);
      const clampedX = clamp(x, chip.halfW, sizeRef.current.width - chip.halfW);
      const clampedY = clamp(y, chip.halfH, sizeRef.current.height - chip.halfH);

      const instantVx = (clampedX - drag.px) / dt;
      const instantVy = (clampedY - drag.py) / dt;
      const smoothVx = drag.vx * 0.45 + instantVx * 0.55;
      const smoothVy = drag.vy * 0.45 + instantVy * 0.55;
      chip.vx = smoothVx;
      chip.vy = smoothVy;
      chip.x = clampedX;
      chip.y = clampedY;
      dragRef.current = {
        id: drag.id,
        px: clampedX,
        py: clampedY,
        time: now,
        vx: smoothVx,
        vy: smoothVy,
      };
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!dragRef.current) return;
      canvas.releasePointerCapture(e.pointerId);
      const chip = chipsRef.current.find((c) => c.id === dragRef.current?.id);
      if (chip) {
        const throwVx = dragRef.current.vx * 1.2;
        const throwVy = dragRef.current.vy * 1.05;
        const maxSpeed = 1400;
        const speed = Math.hypot(throwVx, throwVy);
        if (speed > maxSpeed) {
          const scale = maxSpeed / speed;
          chip.vx = throwVx * scale;
          chip.vy = throwVy * scale;
        } else {
          chip.vx = throwVx;
          chip.vy = throwVy;
        }
      }
      dragRef.current = null;
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    let rafId = 0;
    let disposed = false;

    const step = (t: number) => {
      if (disposed) return;
      const { width, height } = sizeRef.current;
      const chips = chipsRef.current;

      if (!lastTimeRef.current) lastTimeRef.current = t;
      const dt = Math.min((t - lastTimeRef.current) / 1000, 1 / 30);
      lastTimeRef.current = t;

      for (const chip of chips) {
        if (dragRef.current?.id === chip.id) continue;

        chip.vy += GRAVITY * dt;
        chip.vx *= AIR_DRAG;
        chip.vy *= AIR_DRAG;
        chip.x += chip.vx * dt;
        chip.y += chip.vy * dt;

        if (chip.x - chip.halfW < 0) {
          chip.x = chip.halfW;
          chip.vx = Math.abs(chip.vx) * BOUNCE;
        } else if (chip.x + chip.halfW > width) {
          chip.x = width - chip.halfW;
          chip.vx = -Math.abs(chip.vx) * BOUNCE;
        }

        if (chip.y - chip.halfH < 0) {
          chip.y = chip.halfH;
          chip.vy = Math.abs(chip.vy) * BOUNCE;
        } else if (chip.y + chip.halfH > height) {
          chip.y = height - chip.halfH;
          chip.vy = -Math.abs(chip.vy) * BOUNCE;
          chip.vx *= FRICTION;
        }
      }

      for (let pass = 0; pass < 2; pass++) {
        for (let i = 0; i < chips.length; i++) {
          for (let j = i + 1; j < chips.length; j++) {
            const a = chips[i];
            const b = chips[j];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const distSq = dx * dx + dy * dy;
            const minDist = a.collisionRadius + b.collisionRadius;
            if (distSq === 0 || distSq >= minDist * minDist) continue;

            const dist = Math.sqrt(distSq);
            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = minDist - dist;

            const invMassA = 1 / a.mass;
            const invMassB = 1 / b.mass;
            const massSum = invMassA + invMassB;

            a.x -= nx * overlap * (invMassA / massSum);
            a.y -= ny * overlap * (invMassA / massSum);
            b.x += nx * overlap * (invMassB / massSum);
            b.y += ny * overlap * (invMassB / massSum);

            const rvx = b.vx - a.vx;
            const rvy = b.vy - a.vy;
            const velAlongNormal = rvx * nx + rvy * ny;
            if (velAlongNormal > 0) continue;

            const restitution = 0.74;
            const impulse = (-(1 + restitution) * velAlongNormal) / massSum;
            const ix = impulse * nx;
            const iy = impulse * ny;

            a.vx -= ix * invMassA;
            a.vy -= iy * invMassA;
            b.vx += ix * invMassB;
            b.vy += iy * invMassB;
          }
        }
      }

      ctx.clearRect(0, 0, width, height);

      const bg = ctx.createLinearGradient(0, 0, 0, height);
      bg.addColorStop(0, 'rgba(0, 168, 255, 0.2)');
      bg.addColorStop(0.5, 'rgba(8, 20, 42, 0.18)');
      bg.addColorStop(1, 'rgba(2, 6, 14, 0.34)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = 'rgba(0, 229, 255, 0.12)';
      ctx.lineWidth = 1;
      for (let gx = 24; gx < width; gx += 32) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, height);
        ctx.stroke();
      }

      for (const chip of chips) drawChip(ctx, chip);

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  }, []);

  return (
    <div style={containerStyle}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          touchAction: 'none',
          cursor: 'grab',
        }}
      />
    </div>
  );
}
