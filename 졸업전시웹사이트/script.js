// ==============================
// Infinite World + Panning + Collisions
// - 드래그/휠 패닝
// - Gooey(느림)
// - 200px Frames(빠름) + 충돌
// - 더 가까운 배치(월드 축소, 초기 배치 뷰 근처, 음수 gap)
// ==============================
(() => {
  const CFG = {
    worldScale: 1.6,            // ↓ 2.5 → 1.6 : 더 밀집
    pan: { x: 0, y: 0 },
    drag: { active: false, startX: 0, startY: 0, panStartX: 0, panStartY: 0 },

    goo: {
      count: 24,
      speed: { min: 0.4, max: 1.1 },     // ↓ Gooey 느리게
      radius: { min: 140, max: 160 },      // 지름 ≈ 280~320px
    },

    frames: {
      total: 20,
      size: 200,
      speed: { min: 0.38, max: 0.95 },     // ↑ Frames 빠르게
      collide: {
        enabled: true,
        gap: -6,           // 음수로 아주 살짝 겹치게 → 더 가까워 보임
        stiffness: 0.55,
        maxCorrection: 3.0,
        normalDamping: 0.65
      }
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    setupMenuToggle();
    setupDarkToggle();

    if (document.body.classList.contains('home-page')) {
      initWorld();
      createGooey();
      // createFrames(); // 회색 프레임 오브젝트 제거
      loop();
      bindPanning();
      addEventListener('resize', onResize);
    }
  });

  // ---------------- World ----------------
  let W = innerWidth, H = innerHeight, WW = 0, WH = 0;
  function initWorld() {
    W = innerWidth; H = innerHeight;
    WW = W * CFG.worldScale;
    WH = H * CFG.worldScale;
  }
  function wrap(v, max) { v %= max; return (v + max) % max; }

  // ---------------- Menu / Dark Toggle ----------------
  function setupMenuToggle() {
    const btn  = document.querySelector('.menu-button');
    const menu = document.querySelector('.fullscreen-menu');
    const nav  = document.getElementById('fs-nav');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const open = !document.body.classList.contains('menu-open');
      document.body.classList.toggle('menu-open');
      btn.setAttribute('aria-expanded', String(open));
      if (menu) menu.setAttribute('aria-hidden', String(!open));
      if (nav)  nav.setAttribute('aria-hidden',  String(!open));
      btn.querySelector('.icon-menu')?.classList.toggle('hidden', open);
      btn.querySelector('.icon-close')?.classList.toggle('hidden', !open);
    });
  }

  function setupDarkToggle() {
    const toggle = document.querySelector('.dark-mode-toggle');
    if (!toggle) return;
    const thumb = toggle.querySelector('.thumb');
    const animate = (toDark) => {
      if (!thumb) return;
      thumb.style.animation = 'none';
      void thumb.offsetHeight;
      thumb.style.animation = `${toDark ? 'light-to-dark' : 'dark-to-light'} 0.7s cubic-bezier(0.83,0,0.17,1) forwards`;
    };
    const run = () => {
      const toDark = !document.body.classList.contains('dark-mode');
      document.body.classList.toggle('dark-mode');
      animate(toDark);
    };
    toggle.addEventListener('click', run);
    toggle.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); run(); }});
  }

  // ---------------- Gooey ----------------
  const gooLayer = document.createElement('div');
  const goo = [];
  function createGooey() {
    if (!document.querySelector('.gooey-bg')) {
      gooLayer.className = 'gooey-bg';
      document.body.prepend(gooLayer);
    }

    for (let i = 0; i < CFG.goo.count; i++) {
      const el = document.createElement('div');
      el.className = 'gooey-circle';
      gooLayer.appendChild(el);

      const r = CFG.goo.radius.min + Math.random() * (CFG.goo.radius.max - CFG.goo.radius.min);
      const heading = Math.random() * Math.PI * 2;
      const spd = CFG.goo.speed.min + Math.random() * (CFG.goo.speed.max - CFG.goo.speed.min);

      // 초기 진입 애니메이션: 랜덤 작은 스케일에서 커지기
      const startScale = 0.15 + Math.random() * 0.35; // 0.15 ~ 0.5
      const delay = Math.random() * 600;              // 0 ~ 600ms
      const duration = 600 + Math.random() * 500;     // 600 ~ 1100ms
      el.style.setProperty('--goo-start-scale', String(startScale));
      el.style.animation = `goo-grow ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms both`;

      goo.push({
        el,
        // 초기 배치: 뷰포트 근처에 더 많이 생성 (밀집감 ↑)
        x: wrap((Math.random() * W) + CFG.pan.x, WW),
        y: wrap((Math.random() * H) + CFG.pan.y, WH),
        vx: Math.cos(heading) * spd,
        vy: Math.sin(heading) * spd,
        r
      });
    }
  }

  // ---------------- Frames ----------------
  const framesLayer = document.createElement('div');
  const frames = [];
  function createFrames() {
    framesLayer.className = 'frames-wrap';
    document.body.appendChild(framesLayer);

    const FR = CFG.frames.size / 2;

    for (let i = 0; i < CFG.frames.total; i++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'frame-circle';
      btn.setAttribute('aria-label', `frame ${i + 1}`);
      framesLayer.appendChild(btn);

      const heading = Math.random() * Math.PI * 2;
      const spd = CFG.frames.speed.min + Math.random() * (CFG.frames.speed.max - CFG.frames.speed.min);

      frames.push({
        el: btn,
        // 초기 배치: 뷰포트 근처 (밀집)
        x: wrap((Math.random() * W) + CFG.pan.x, WW),
        y: wrap((Math.random() * H) + CFG.pan.y, WH),
        // 속도: 프레임은 좀 더 빠르게, 약간의 난수 가속 추가
        vx: Math.cos(heading) * spd + (Math.random() - 0.5) * 0.05,
        vy: Math.sin(heading) * spd + (Math.random() - 0.5) * 0.05,
        r: FR
      });

      btn.addEventListener('click', () => {
        console.log(`Frame ${i + 1} clicked`);
      });
    }
  }

  // ---------------- Panning ----------------
  function bindPanning() {
    const surface = document.querySelector('.pan-surface') || document.querySelector('main');

    surface.addEventListener('mousedown', (e) => {
      if (document.body.classList.contains('menu-open')) return;
      CFG.drag.active = true;
      CFG.drag.startX = e.clientX;
      CFG.drag.startY = e.clientY;
      CFG.drag.panStartX = CFG.pan.x;
      CFG.drag.panStartY = CFG.pan.y;
    });
    window.addEventListener('mousemove', (e) => {
      if (!CFG.drag.active) return;
      const dx = e.clientX - CFG.drag.startX;
      const dy = e.clientY - CFG.drag.startY;
      CFG.pan.x = wrap(CFG.drag.panStartX - dx, WW);
      CFG.pan.y = wrap(CFG.drag.panStartY - dy, WH);
    });
    window.addEventListener('mouseup', () => { CFG.drag.active = false; });

    surface.addEventListener('wheel', (e) => {
      if (document.body.classList.contains('menu-open')) return;
      e.preventDefault();
      // 필요하면 감도 조절: deltaX/Y * 1.2 등
      CFG.pan.x = wrap(CFG.pan.x + e.deltaX, WW);
      CFG.pan.y = wrap(CFG.pan.y + e.deltaY, WH);
    }, { passive: false });
  }

  // ---------------- Physics helpers ----------------
  function torusDelta(ax, ay, bx, by) {
    let dx = bx - ax, dy = by - ay;
    const halfW = WW / 2, halfH = WH / 2;
    if (dx >  halfW) dx -= WW; else if (dx < -halfW) dx += WW;
    if (dy >  halfH) dy -= WH; else if (dy < -halfH) dy += WH;
    return { dx, dy };
  }
  function capSpeed(p, min, max) {
    const s = Math.hypot(p.vx, p.vy) || 0;
    if (s > max) {
      p.vx = (p.vx / s) * max;
      p.vy = (p.vy / s) * max;
    } else if (s < min) {
      const dir = Math.atan2(p.vy, p.vx) || (Math.random() * Math.PI * 2);
      p.vx = Math.cos(dir) * min;
      p.vy = Math.sin(dir) * min;
    }
  }

  // ---------------- Main Loop ----------------
  function loop() {
    // 1) Gooey
    for (const c of goo) {
      c.x = wrap(c.x + c.vx, WW);
      c.y = wrap(c.y + c.vy, WH);

      const drawX = wrap(c.x - CFG.pan.x, WW);
      const drawY = wrap(c.y - CFG.pan.y, WH);
      let x = drawX;
      let y = drawY;

      // Torus wrapping logic - check if object is fully off-screen
      if (x - c.r > W) x -= WW;       // Right edge is off the right side
      else if (x + c.r < 0) x += WW;  // Left edge is off the left side
      if (y - c.r > H) y -= WH;       // Bottom edge is off the bottom side
      else if (y + c.r < 0) y += WH;  // Top edge is off the top side

      const d = c.r * 2;
      c.el.style.width = `${d}px`;
      c.el.style.height = `${d}px`;
      c.el.style.left = `${x - c.r}px`;
      c.el.style.top  = `${y - c.r}px`;
    }

    // 2) Frames collision - 회색 프레임 제거로 인해 비활성화
    // const F = CFG.frames;
    // if (F.collide.enabled) {
    //   for (let i = 0; i < frames.length; i++) {
    //     for (let j = i + 1; j < frames.length; j++) {
    //       const a = frames[i], b = frames[j];
    //       const { dx, dy } = torusDelta(a.x, a.y, b.x, b.y);
    //       const dist = Math.hypot(dx, dy);
    //       const want = a.r + b.r + F.collide.gap;
    //       if (!(dist > 0 && dist < want)) continue;

    //       const nx = dx / dist, ny = dy / dist;
    //       const overlap = want - dist;
    //       const push = Math.min(overlap * F.collide.stiffness, F.collide.maxCorrection);

    //       a.x = wrap(a.x - nx * (push * 0.5), WW);
    //       a.y = wrap(a.y - ny * (push * 0.5), WH);
    //       b.x = wrap(b.x + nx * (push * 0.5), WW);
    //       b.y = wrap(b.y + ny * (push * 0.5), WH);

    //       const rvx = b.vx - a.vx, rvy = b.vy - a.vy;
    //       const relN = rvx * nx + rvy * ny;
    //       if (relN < 0) {
    //         const j = relN * F.collide.normalDamping;
    //         a.vx += nx * j * 0.5; a.vy += ny * j * 0.5;
    //         b.vx -= nx * j * 0.5; b.vy -= ny * 0.5 * j;
    //         capSpeed(a, F.speed.min, F.speed.max);
    //         capSpeed(b, F.speed.min, F.speed.max);
    //       }
    //     }
    //   }
    // }

    // 3) Frames move + draw - 회색 프레임 제거로 인해 비활성화
    // for (const f of frames) {
    //   f.x = wrap(f.x + f.vx, WW);
    //   f.y = wrap(f.y + f.vy, WH);

    //   const drawX = wrap(f.x - CFG.pan.x, WW);
    //   const drawY = wrap(f.y - CFG.pan.y, WH);
    //   let x = drawX;
    //   let y = drawY;

    //   // Torus wrapping logic - check if object is fully off-screen
    //   if (x - f.r > W) x -= WW;
    //   else if (x + f.r < 0) x += WW;
    //   if (y - f.r > H) y -= WH;
    //   else if (y + f.r < 0) y += WH;

    //   f.el.style.width  = `${F.size}px`;
    //   f.el.style.height = `${F.size}px`;
    //   f.el.style.left   = `${x - f.r}px`;
    //   f.el.style.top    = `${y - f.r}px`;
    //   }

    requestAnimationFrame(loop);
  }

  // ---------------- Resize ----------------
  function onResize() {
    initWorld();
  }
})();
