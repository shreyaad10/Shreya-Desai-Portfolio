/* ============================================================
   main.js — Shreya Desai Portfolio
   ============================================================ */

'use strict';

/* ============================================================
   1. CURSOR — Morphing blob that reacts to mouse speed & hovers
   ============================================================
   The cursor is drawn on a full-page canvas. It renders as a
   soft, organic blob (rounded polygon) that:
   - Follows the mouse with inertia
   - Morphs its shape based on speed (fast → elongated / squished)
   - Breathes slowly when idle
   - Expands with a violet glow on hover over interactive elements
   - Emits small floating sparks when clicking
   ============================================================ */

const canvas = document.getElementById('cursor-canvas');
const ctx    = canvas.getContext('2d');

// ── State
let W = window.innerWidth,
    H = window.innerHeight;

canvas.width  = W;
canvas.height = H;

window.addEventListener('resize', () => {
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width  = W;
  canvas.height = H;
});

// Mouse target (instant)
const mouse = { x: W / 2, y: H / 2 };
// Cursor position (lagged)
const pos   = { x: W / 2, y: H / 2 };
// Previous position for velocity
const prev  = { x: W / 2, y: H / 2 };
// Velocity
const vel   = { x: 0, y: 0 };

let isHovering   = false;   // over interactive element
let clickPulse   = 0;       // 0-1 burst on click
let breathPhase  = 0;       // idle breathing
let frameCount   = 0;

// Blob config
const NUM_POINTS  = 8;      // polygon vertices
const BASE_RADIUS = 14;
const HOVER_RADIUS = 28;

// Colour palette cycling
const PALETTE = [
  [139, 124, 246],   // violet
  [180, 150, 255],   // lavender
  [110, 180, 255],   // sky
];
let palIdx = 0, palT = 0;

// ── Sparks on click
const sparks = [];

function spawnSparks(x, y) {
  const count = 10 + Math.floor(Math.random() * 6);
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1.5 + Math.random() * 3;
    sparks.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      size: 1.5 + Math.random() * 2.5,
      decay: 0.03 + Math.random() * 0.04,
    });
  }
}

document.addEventListener('click', e => {
  clickPulse = 1;
  spawnSparks(pos.x, pos.y);
  // advance palette
  palIdx = (palIdx + 1) % PALETTE.length;
  palT   = 0;
});

// ── Mouse move
document.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// ── Hover detection
const INTERACTIVE = 'a, button, .skill-card, .project-card, .exp-card, input, textarea, .interests-list li, .badge, .social-link, .cert-card';

document.querySelectorAll(INTERACTIVE).forEach(el => {
  el.addEventListener('mouseenter', () => { isHovering = true;  });
  el.addEventListener('mouseleave', () => { isHovering = false; });
});

// ── Interpolate colour between palette entries
function lerpColour(a, b, t) {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

// ── Draw a blob via rounded polygon
function drawBlob(cx, cy, radius, stretch, angle, color, alpha) {
  const pts = [];
  const wobble = breathPhase; // 0..2π slow sine

  for (let i = 0; i < NUM_POINTS; i++) {
    const a = (i / NUM_POINTS) * Math.PI * 2;
    // Organic wobble per vertex (different frequency per vertex)
    const noise = 1 + 0.18 * Math.sin(wobble * 1.3 + i * 1.7)
                    + 0.08 * Math.sin(wobble * 2.1 + i * 3.1);

    // Stretch along velocity direction
    const sr = stretch * Math.cos(a - angle);
    const r  = radius * noise * (1 + 0.35 * sr);

    pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
  }

  // Draw smooth closed curve through points
  ctx.beginPath();
  for (let i = 0; i < pts.length; i++) {
    const curr = pts[i];
    const next = pts[(i + 1) % pts.length];
    const mx   = (curr.x + next.x) / 2;
    const my   = (curr.y + next.y) / 2;
    if (i === 0) ctx.moveTo(mx, my);
    else         ctx.quadraticCurveTo(curr.x, curr.y, mx, my);
  }
  ctx.closePath();

  const [r, g, b] = color;
  ctx.fillStyle = `rgba(${r|0},${g|0},${b|0},${alpha})`;
  ctx.fill();
}

// ── Main render loop
function renderCursor() {
  frameCount++;
  ctx.clearRect(0, 0, W, H);

  // Lag / lerp position
  const lerpSpeed = isHovering ? 0.18 : 0.14;
  pos.x += (mouse.x - pos.x) * lerpSpeed;
  pos.y += (mouse.y - pos.y) * lerpSpeed;

  // Velocity
  vel.x  = pos.x - prev.x;
  vel.y  = pos.y - prev.y;
  prev.x = pos.x;
  prev.y = pos.y;

  const speed   = Math.sqrt(vel.x * vel.x + vel.y * vel.y);
  const stretch = Math.min(speed * 0.06, 0.6);
  const velAngle = Math.atan2(vel.y, vel.x);

  // Breathing
  breathPhase += 0.025;

  // Click pulse decay
  if (clickPulse > 0) clickPulse -= 0.06;

  // Colour lerp
  palT += 0.04;
  if (palT > 1) palT = 0;
  const colorA = PALETTE[palIdx];
  const colorB = PALETTE[(palIdx + 1) % PALETTE.length];
  const color  = lerpColour(colorA, colorB, palT);

  // ── Outer glow (hover only)
  if (isHovering) {
    const glowR = HOVER_RADIUS * 2.5 + 5 * Math.sin(breathPhase);
    const grad  = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, glowR);
    const [r,g,b] = color;
    grad.addColorStop(0,   `rgba(${r|0},${g|0},${b|0},0.18)`);
    grad.addColorStop(0.5, `rgba(${r|0},${g|0},${b|0},0.06)`);
    grad.addColorStop(1,   `rgba(${r|0},${g|0},${b|0},0)`);
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, glowR, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }

  // ── Click pulse ring
  if (clickPulse > 0) {
    const pulseR = BASE_RADIUS + (1 - clickPulse) * 60;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, pulseR, 0, Math.PI * 2);
    const [r,g,b] = color;
    ctx.strokeStyle = `rgba(${r|0},${g|0},${b|0},${clickPulse * 0.6})`;
    ctx.lineWidth   = 1.5;
    ctx.stroke();
  }

  // ── Blob shadow / halo
  const targetR = isHovering
    ? HOVER_RADIUS + 4 * Math.sin(breathPhase)
    : BASE_RADIUS  + 2 * Math.sin(breathPhase);

  drawBlob(pos.x, pos.y, targetR * 1.6, stretch * 0.5, velAngle, color, 0.12);

  // ── Core blob
  drawBlob(pos.x, pos.y, targetR, stretch, velAngle, color, isHovering ? 0.9 : 0.75);

  // ── Inner highlight dot
  ctx.beginPath();
  ctx.arc(pos.x - targetR * 0.2, pos.y - targetR * 0.2, targetR * 0.18, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  ctx.fill();

  // ── Sparks
  for (let i = sparks.length - 1; i >= 0; i--) {
    const s = sparks[i];
    s.x    += s.vx;
    s.y    += s.vy;
    s.vy   += 0.08;  // gravity
    s.vx   *= 0.97;
    s.life -= s.decay;
    if (s.life <= 0) { sparks.splice(i, 1); continue; }

    const [r,g,b] = color;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r|0},${g|0},${b|0},${s.life})`;
    ctx.fill();
  }

  requestAnimationFrame(renderCursor);
}

renderCursor();


/* ============================================================
   2. SCROLL PROGRESS BAR
   ============================================================ */
const progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = pct + '%';
}, { passive: true });


/* ============================================================
   3. SCROLL REVEAL
   ============================================================ */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ============================================================
   4. HAMBURGER / MOBILE NAV
   ============================================================ */
const ham      = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

ham.addEventListener('click', () => {
  ham.classList.toggle('open');
  navLinks.classList.toggle('open');
});

function closeMenu() {
  ham.classList.remove('open');
  navLinks.classList.remove('open');
}

// Close when clicking outside
document.addEventListener('click', e => {
  if (!ham.contains(e.target) && !navLinks.contains(e.target)) closeMenu();
});


/* ============================================================
   5. CONTACT FORM
   ============================================================ */
const submitBtn  = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');

submitBtn.addEventListener('click', handleSubmit);

function handleSubmit() {
  const name  = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const msg   = document.getElementById('message').value.trim();

  if (!name || !email || !msg) {
    alert('Please fill in all fields.');
    return;
  }

  submitBtn.textContent = 'Sending…';
  submitBtn.disabled    = true;

  // Simulate async send
  setTimeout(() => {
    formStatus.classList.add('success');
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled    = false;
    document.getElementById('name').value    = '';
    document.getElementById('email').value   = '';
    document.getElementById('message').value = '';
  }, 1200);
}
