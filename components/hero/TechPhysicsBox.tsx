'use client';

import { useEffect, useMemo, useRef } from 'react';
import {
  Bodies,
  Body,
  Composite,
  Engine,
  Events,
  IEvent,
  Mouse,
  MouseConstraint,
  World,
} from 'matter-js';

type ChipShape = 'square' | 'rectangle';

interface TechToken {
  label: string;
  color: string;
  shape: ChipShape;
  width: number;
  height: number;
}

interface ChipMeta {
  label: string;
  color: string;
  width: number;
  height: number;
  radius: number;
}

const PARTICLE_COUNT = 36;
const WALL_THICKNESS = 120;
const THROW_HISTORY_MS = 90;
const MAX_THROW_SPEED = 26;

const techTokens: TechToken[] = [
  { label: 'UI', color: '#00e5ff', shape: 'square', width: 52, height: 52 },
  { label: 'JS', color: '#00a8ff', shape: 'square', width: 50, height: 50 },
  { label: 'API', color: '#a855f7', shape: 'rectangle', width: 70, height: 44 },
  { label: 'Go', color: '#00add8', shape: 'rectangle', width: 66, height: 42 },
  { label: 'DB', color: '#67e8f9', shape: 'rectangle', width: 74, height: 40 },
  { label: 'CI', color: '#38bdf8', shape: 'square', width: 48, height: 48 },
  { label: 'AWS', color: '#fb923c', shape: 'rectangle', width: 84, height: 42 },
  { label: 'Py', color: '#4ade80', shape: 'rectangle', width: 72, height: 44 },
  { label: 'SQL', color: '#60a5fa', shape: 'rectangle', width: 82, height: 42 },
  { label: 'ML', color: '#f472b6', shape: 'rectangle', width: 76, height: 42 },
  { label: 'Git', color: '#f97316', shape: 'rectangle', width: 68, height: 44 },
  { label: '</>', color: '#3b82f6', shape: 'square', width: 52, height: 52 },
  { label: 'TS', color: '#00d4ff', shape: 'square', width: 52, height: 52 },
  { label: 'K8', color: '#60a5fa', shape: 'square', width: 50, height: 50 },
];

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function randomInRange(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace('#', '');
  const expanded =
    normalized.length === 3
      ? normalized
          .split('')
          .map((c) => `${c}${c}`)
          .join('')
      : normalized;
  const n = Number.parseInt(expanded, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function roundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  const r = Math.min(radius, width * 0.5, height * 0.5);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function isChipBody(body: Body): body is Body & { plugin: { chipMeta: ChipMeta } } {
  return Boolean((body.plugin as { chipMeta?: ChipMeta })?.chipMeta);
}

export default function TechPhysicsBox() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const mouseConstraintRef = useRef<MouseConstraint | null>(null);
  const particleBodiesRef = useRef<Body[]>([]);
  const wallBodiesRef = useRef<Body[]>([]);
  const throwTrailRef = useRef<Array<{ x: number; y: number; t: number }>>([]);
  const rafRef = useRef<number>(0);
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

    const engine = Engine.create({
      gravity: { x: 0, y: 1.12 },
      enableSleeping: true,
    });
    engine.positionIterations = 10;
    engine.velocityIterations = 8;
    engine.constraintIterations = 4;
    engineRef.current = engine;

    const mouse = Mouse.create(canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.16,
        damping: 0.12,
        render: { visible: false },
      },
    });
    // Allow page scroll while hovering the canvas.
    const mouseWithWheel = mouse as Mouse & { mousewheel?: EventListener };
    if (mouseWithWheel.mousewheel) {
      mouse.element.removeEventListener('wheel', mouseWithWheel.mousewheel);
      mouse.element.removeEventListener('mousewheel', mouseWithWheel.mousewheel);
      mouse.element.removeEventListener('DOMMouseScroll', mouseWithWheel.mousewheel);
    }
    mouseConstraintRef.current = mouseConstraint;
    World.add(engine.world, mouseConstraint);

    const createBoundaries = (width: number, height: number) => {
      const t = WALL_THICKNESS;
      return [
        Bodies.rectangle(width * 0.5, -t * 0.5, width + t * 2, t, {
          isStatic: true,
          friction: 0.72,
          restitution: 0.3,
          render: { visible: false },
        }),
        Bodies.rectangle(width * 0.5, height + t * 0.5, width + t * 2, t, {
          isStatic: true,
          friction: 0.8,
          restitution: 0.4,
          render: { visible: false },
        }),
        Bodies.rectangle(-t * 0.5, height * 0.5, t, height + t * 2, {
          isStatic: true,
          friction: 0.72,
          restitution: 0.3,
          render: { visible: false },
        }),
        Bodies.rectangle(width + t * 0.5, height * 0.5, t, height + t * 2, {
          isStatic: true,
          friction: 0.72,
          restitution: 0.3,
          render: { visible: false },
        }),
      ];
    };

    const createParticles = (width: number, height: number) => {
      const particles: Body[] = [];

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const token = techTokens[i % techTokens.length];
        const scale = randomInRange(0.88, 1.16);
        const bodyW = token.width * scale;
        const bodyH = token.height * scale;
        const radius = Math.min(12, Math.min(bodyW, bodyH) * 0.24);

        const body = Bodies.rectangle(
          randomInRange(bodyW * 0.5 + 8, width - bodyW * 0.5 - 8),
          randomInRange(bodyH * 0.5 + 8, Math.max(bodyH * 0.5 + 8, height * 0.42)),
          bodyW,
          bodyH,
          {
            chamfer: { radius },
            friction: 0.38,
            frictionStatic: 0.72,
            frictionAir: 0.006,
            restitution: 0.42,
            density: token.shape === 'square' ? 0.0011 : 0.001,
            slop: 0.01,
            sleepThreshold: 22,
            collisionFilter: {
              group: 0,
              category: 0x0001,
              mask: 0xffff,
            },
          }
        );

        (body.plugin as { chipMeta?: ChipMeta }).chipMeta = {
          label: token.label,
          color: token.color,
          width: bodyW,
          height: bodyH,
          radius,
        };

        Body.setVelocity(body, {
          x: randomInRange(-1.6, 1.6),
          y: randomInRange(0, 1.6),
        });
        Body.setAngularVelocity(body, randomInRange(-0.045, 0.045));
        particles.push(body);
      }

      return particles;
    };

    const resetScene = () => {
      const { width, height } = sizeRef.current;
      const world = engine.world;

      for (const body of particleBodiesRef.current) {
        Composite.remove(world, body);
      }
      for (const wall of wallBodiesRef.current) {
        Composite.remove(world, wall);
      }

      const walls = createBoundaries(width, height);
      const particles = createParticles(width, height);
      wallBodiesRef.current = walls;
      particleBodiesRef.current = particles;
      World.add(world, [...walls, ...particles]);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      sizeRef.current = { width: rect.width, height: rect.height, dpr };
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mouse.pixelRatio = dpr;
      resetScene();
    };

    const draw = () => {
      const { width, height } = sizeRef.current;

      ctx.clearRect(0, 0, width, height);

      const bg = ctx.createLinearGradient(0, 0, 0, height);
      bg.addColorStop(0, 'rgba(0, 168, 255, 0.18)');
      bg.addColorStop(0.5, 'rgba(8, 20, 42, 0.16)');
      bg.addColorStop(1, 'rgba(2, 6, 14, 0.3)');
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

      const sortedBodies = [...particleBodiesRef.current].sort((a, b) => a.position.y - b.position.y);

      for (const body of sortedBodies) {
        if (!isChipBody(body)) continue;
        const meta = body.plugin.chipMeta;
        const x = -meta.width * 0.5;
        const y = -meta.height * 0.5;

        ctx.save();
        ctx.translate(body.position.x, body.position.y);
        ctx.rotate(body.angle);

        ctx.shadowBlur = 26;
        ctx.shadowColor = hexToRgba(meta.color, 0.7);
        ctx.fillStyle = hexToRgba(meta.color, 0.4);
        ctx.strokeStyle = hexToRgba(meta.color, 0.95);
        ctx.lineWidth = 1.6;
        roundedRectPath(ctx, x, y, meta.width, meta.height, meta.radius);
        ctx.fill();
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.fillStyle = '#04121e';
        ctx.font = `600 ${Math.max(12, meta.height * 0.35)}px "JetBrains Mono", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(meta.label, 0, 1);
        ctx.restore();
      }
    };

    const handleBeforeUpdate = () => {
      const position = mouse.position;
      const now = performance.now();
      const trail = throwTrailRef.current;
      trail.push({ x: position.x, y: position.y, t: now });
      while (trail.length > 2 && now - trail[0].t > THROW_HISTORY_MS) {
        trail.shift();
      }

    };

    const handleEndDrag = (event: IEvent<MouseConstraint>) => {
      const body = (event as IEvent<MouseConstraint> & { body: Body | null }).body;
      if (!body) return;
      const trail = throwTrailRef.current;
      if (trail.length < 2) return;

      const first = trail[0];
      const last = trail[trail.length - 1];
      const dtMs = Math.max(1, last.t - first.t);
      const vx = clamp(((last.x - first.x) / dtMs) * (1000 / 60), -MAX_THROW_SPEED, MAX_THROW_SPEED);
      const vy = clamp(((last.y - first.y) / dtMs) * (1000 / 60), -MAX_THROW_SPEED, MAX_THROW_SPEED);

      Body.setVelocity(body, { x: vx, y: vy });
      Body.setAngularVelocity(body, clamp(body.angularVelocity + vx * 0.015, -0.32, 0.32));
    };

    Events.on(engine, 'beforeUpdate', handleBeforeUpdate);
    Events.on(mouseConstraint, 'enddrag', handleEndDrag);

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const tick = (time: number) => {
      const delta = lastTimeRef.current ? Math.min(1000 / 30, time - lastTimeRef.current) : 1000 / 60;
      lastTimeRef.current = time;
      Engine.update(engine, delta);
      draw();
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      Events.off(engine, 'beforeUpdate', handleBeforeUpdate);
      Events.off(mouseConstraint, 'enddrag', handleEndDrag);
      Composite.clear(engine.world, false, true);
      Engine.clear(engine);
      particleBodiesRef.current = [];
      wallBodiesRef.current = [];
      throwTrailRef.current = [];
      mouseConstraintRef.current = null;
      engineRef.current = null;
      lastTimeRef.current = 0;
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
          // Keep vertical page scrolling on touch devices.
          touchAction: 'pan-y',
          cursor: 'grab',
        }}
      />
    </div>
  );
}
