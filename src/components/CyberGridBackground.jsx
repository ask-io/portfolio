import { useEffect, useRef } from 'react';

/**
 * Reactive lattice.
 *
 * A grid of square nodes joined by thin lines, simulated as springs.
 *
 * - The cursor pushes nodes away, and fast movement drags a wake through
 *   the grid; nodes swirl in the direction you pass over them
 * - Nodes grow, glow and shift slate -> emerald -> mint -> cyan with energy
 * - The lines between nodes light up and bend with them, like a net
 * - Click / tap sends a shockwave that shoves the lattice outward
 * - A faint spotlight follows the cursor; a slow ambient pulse keeps the
 *   grid alive when nothing is touching it
 * - Retina-sharp, frame-rate independent, respects reduced motion
 */

// ---- Tuning ---------------------------------------------------------------
const CELL = 44; // grid pitch in px
const BASE_SIZE = 4; // resting node size
const MAX_SIZE = 20; // node size at full energy
const RADIUS = 190; // cursor influence radius
const REPEL = 2.2; // push away from cursor
const WAKE = 0.1; // how much cursor velocity drags nodes along
const TORQUE = 0.00005; // swirl strength when sweeping across nodes
const SPRING = 0.07; // pull back to home position
const DAMPING = 0.9; // velocity kept per frame (lower = less wobble)
const MAX_OFFSET = CELL * 0.8; // nodes never leave their neighbourhood
const ATTACK = 0.35; // how fast energy rises
const DECAY = 0.045; // how slowly it fades (lower = longer trail)
const RIPPLE_SPEED = 14; // px per frame
const RIPPLE_BAND = 60; // ring thickness
const RIPPLE_FORCE = 3.2; // ring shove strength
const SPOTLIGHT = 0.045; // cursor glow alpha (0 to disable)
const DIM = 0.5; // master dimmer for the whole background (0 to 1)
// Color stops by energy: [energy, r, g, b]
const STOPS = [
  [0.0, 51, 65, 85], // slate-700
  [0.35, 5, 150, 105], // emerald-600
  [0.7, 52, 211, 153], // emerald-400
  [1.0, 103, 232, 249], // cyan-300
];
// ---------------------------------------------------------------------------

const colorAt = (t) => {
  for (let i = 1; i < STOPS.length; i++) {
    if (t <= STOPS[i][0]) {
      const [t0, r0, g0, b0] = STOPS[i - 1];
      const [t1, r1, g1, b1] = STOPS[i];
      const k = (t - t0) / (t1 - t0);
      return [r0 + (r1 - r0) * k, g0 + (g1 - g0) * k, b0 + (b1 - b0) * k];
    }
  }
  const l = STOPS[STOPS.length - 1];
  return [l[1], l[2], l[3]];
};

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);

export default function CyberGridBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    let ox = 0;
    let oy = 0;
    let offX, offY, velX, velY, rot, angVel, energy;
    let rafId = 0;
    let lastTime = performance.now();

    const mouse = {
      x: 0, y: 0, tx: 0, ty: 0,
      mvx: 0, mvy: 0,
      active: false,
      presence: 0,
    };
    const ripples = [];

    // ---- Sizing -----------------------------------------------------------
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(w / CELL) + 1;
      rows = Math.ceil(h / CELL) + 1;
      ox = (w - (cols - 1) * CELL) / 2;
      oy = (h - (rows - 1) * CELL) / 2;

      const n = cols * rows;
      offX = new Float32Array(n);
      offY = new Float32Array(n);
      velX = new Float32Array(n);
      velY = new Float32Array(n);
      rot = new Float32Array(n);
      angVel = new Float32Array(n);
      energy = new Float32Array(n);
      draw(performance.now());
    };

    // ---- Rendering --------------------------------------------------------
    const draw = (now) => {
      ctx.clearRect(0, 0, w, h);

      // Cursor spotlight
      if (SPOTLIGHT > 0 && mouse.presence > 0.01) {
        const a = SPOTLIGHT * mouse.presence;
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 340);
        g.addColorStop(0, `rgba(16, 185, 129, ${a})`);
        g.addColorStop(1, 'rgba(16, 185, 129, 0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      // Lines between neighbouring nodes
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(51, 65, 85, ${0.2 * DIM})`;
      ctx.beginPath();
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const idx = j * cols + i;
          const x = ox + i * CELL + offX[idx];
          const y = oy + j * CELL + offY[idx];
          if (i < cols - 1) {
            ctx.moveTo(x, y);
            ctx.lineTo(ox + (i + 1) * CELL + offX[idx + 1], oy + j * CELL + offY[idx + 1]);
          }
          if (j < rows - 1) {
            ctx.moveTo(x, y);
            ctx.lineTo(ox + i * CELL + offX[idx + cols], oy + (j + 1) * CELL + offY[idx + cols]);
          }
        }
      }
      ctx.stroke();

      // Energised lines on top
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const idx = j * cols + i;
          const x = ox + i * CELL + offX[idx];
          const y = oy + j * CELL + offY[idx];
          if (i < cols - 1) {
            const e = Math.max(energy[idx], energy[idx + 1]);
            if (e > 0.05) {
              const [r, g, b] = colorAt(e);
              ctx.strokeStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${(0.1 + e * 0.5) * DIM})`;
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(ox + (i + 1) * CELL + offX[idx + 1], oy + j * CELL + offY[idx + 1]);
              ctx.stroke();
            }
          }
          if (j < rows - 1) {
            const e = Math.max(energy[idx], energy[idx + cols]);
            if (e > 0.05) {
              const [r, g, b] = colorAt(e);
              ctx.strokeStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${(0.1 + e * 0.5) * DIM})`;
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(ox + i * CELL + offX[idx + cols], oy + (j + 1) * CELL + offY[idx + cols]);
              ctx.stroke();
            }
          }
        }
      }

      // Nodes
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const idx = j * cols + i;
          const t = energy[idx];
          const e = t * t * (3 - 2 * t);
          const ambient = 0.5 + 0.5 * Math.sin(now * 0.0009 + i * 0.4 + j * 0.25);
          const s = BASE_SIZE + (MAX_SIZE - BASE_SIZE) * e + ambient * 1.2;
          const cx = ox + i * CELL + offX[idx];
          const cy = oy + j * CELL + offY[idx];
          const [r, g, b] = colorAt(t);
          const fill = (0.3 + ambient * 0.08 + e * 0.3) * DIM;

          const hot = t > 0.75;
          if (hot) {
            ctx.shadowColor = `rgb(${r | 0}, ${g | 0}, ${b | 0})`;
            ctx.shadowBlur = 8;
          }

          const angle = rot[idx];
          const rotated = Math.abs(angle) > 0.01;
          if (rotated) {
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(angle);
          }
          const px = rotated ? -s / 2 : cx - s / 2;
          const py = rotated ? -s / 2 : cy - s / 2;

          ctx.fillStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${fill})`;
          ctx.fillRect(px, py, s, s);
          if (t > 0.04) {
            ctx.strokeStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${(0.2 + e * 0.7) * DIM})`;
            ctx.strokeRect(px + 0.5, py + 0.5, s - 1, s - 1);
          }

          if (rotated) ctx.restore();
          if (hot) ctx.shadowBlur = 0;
        }
      }
    };

    // ---- Simulation -------------------------------------------------------
    const step = (dt, now) => {
      // Smooth cursor and derive its velocity (px per frame)
      if (mouse.active) {
        const px = mouse.x;
        const py = mouse.y;
        const ease = Math.min(0.35 * dt, 1);
        mouse.x += (mouse.tx - mouse.x) * ease;
        mouse.y += (mouse.ty - mouse.y) * ease;
        const k = Math.min(0.3 * dt, 1);
        mouse.mvx += (clamp((mouse.x - px) / dt, -40, 40) - mouse.mvx) * k;
        mouse.mvy += (clamp((mouse.y - py) / dt, -40, 40) - mouse.mvy) * k;
      } else {
        mouse.mvx *= 0.8;
        mouse.mvy *= 0.8;
      }
      mouse.presence += ((mouse.active ? 1 : 0) - mouse.presence) * Math.min(0.08 * dt, 1);

      for (let r = ripples.length - 1; r >= 0; r--) {
        ripples[r].r += RIPPLE_SPEED * dt;
        if (ripples[r].r > ripples[r].max) ripples.splice(r, 1);
      }

      const damp = Math.pow(DAMPING, dt);
      const R2 = RADIUS * RADIUS;

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const idx = j * cols + i;
          const hx = ox + i * CELL;
          const hy = oy + j * CELL;
          let fx = 0;
          let fy = 0;
          let torque = 0;
          let target = 0;

          if (mouse.active) {
            const dx = hx - mouse.x;
            const dy = hy - mouse.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < R2) {
              const d = Math.sqrt(d2) || 1;
              const f = 1 - d / RADIUS;
              const f2 = f * f;
              fx += (dx / d) * f2 * REPEL + mouse.mvx * f * WAKE;
              fy += (dy / d) * f2 * REPEL + mouse.mvy * f * WAKE;
              torque += (dx * mouse.mvy - dy * mouse.mvx) * f * TORQUE;
              target = f2;
            }
          }

          for (let r = 0; r < ripples.length; r++) {
            const rp = ripples[r];
            const dx = hx - rp.x;
            const dy = hy - rp.y;
            const d = Math.hypot(dx, dy) || 1;
            const band = Math.abs(d - rp.r);
            if (band < RIPPLE_BAND) {
              const k = (1 - band / RIPPLE_BAND) * (1 - rp.r / rp.max);
              if (k > 0) {
                fx += (dx / d) * k * RIPPLE_FORCE;
                fy += (dy / d) * k * RIPPLE_FORCE;
                target = Math.max(target, k);
              }
            }
          }

          // Position spring
          velX[idx] = (velX[idx] + (-SPRING * offX[idx] + fx) * dt) * damp;
          velY[idx] = (velY[idx] + (-SPRING * offY[idx] + fy) * dt) * damp;
          offX[idx] = clamp(offX[idx] + velX[idx] * dt, -MAX_OFFSET, MAX_OFFSET);
          offY[idx] = clamp(offY[idx] + velY[idx] * dt, -MAX_OFFSET, MAX_OFFSET);

          // Rotation spring
          angVel[idx] = (angVel[idx] + (-0.06 * rot[idx] + torque) * dt) * damp;
          rot[idx] = clamp(rot[idx] + angVel[idx] * dt, -1.2, 1.2);

          // Moving nodes glow, so the wake stays lit
          const speed = Math.hypot(velX[idx], velY[idx]);
          target = Math.max(target, Math.min(1, speed * 0.2));

          const cur = energy[idx];
          const rate = target > cur ? ATTACK : DECAY;
          let nxt = cur + (target - cur) * Math.min(rate * dt, 1);
          if (nxt < 0.001) nxt = 0;
          energy[idx] = nxt;
        }
      }

      draw(now);
    };

    const frame = (now) => {
      const dt = Math.min((now - lastTime) / 16.667, 3);
      lastTime = now;
      step(dt, now);
      rafId = requestAnimationFrame(frame);
    };

    // ---- Input ------------------------------------------------------------
    const onPointerMove = (e) => {
      if (!mouse.active) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.mvx = 0;
        mouse.mvy = 0;
        mouse.active = true;
      }
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
    };

    const onPointerDown = (e) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        r: 0,
        max: Math.min(Math.hypot(w, h) * 0.6, 900),
      });
    };

    const deactivate = () => {
      mouse.active = false;
    };

    const onPointerUp = (e) => {
      if (e.pointerType === 'touch') deactivate();
    };

    resize();
    window.addEventListener('resize', resize);

    if (!reduceMotion) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('pointerdown', onPointerDown, { passive: true });
      window.addEventListener('pointerup', onPointerUp, { passive: true });
      document.documentElement.addEventListener('pointerleave', deactivate);
      rafId = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      document.documentElement.removeEventListener('pointerleave', deactivate);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}