/**
 * GooeyBackgroundSVG.jsx
 *
 * Responsive gooey background rendered with configurable SVG circles.
 */

import React, { useEffect, useRef } from 'react';

const presets = {
  desktop: {
    count: 14,
    radius: [110, 170],
    speed: [0.55, 1.3],
    blur: 6,
    opacity: 0.9,
    life: [9000, 15000],
    fade: [900, 1200],
    color: '#67C5FF',
    useFilter: true
  },
  tablet: {
    count: 12,
    radius: [95, 140],
    speed: [0.55, 1.35],
    blur: 5,
    opacity: 0.86,
    life: [8200, 14000],
    fade: [850, 1150],
    color: '#67C5FF',
    useFilter: true
  },
  mobile: {
    count: 10,
    radius: [80, 140],
    speed: [0.5, 1.25],
    blur: 4.6,
    opacity: 0.84,
    life: [7800, 13500],
    fade: [780, 1080],
    color: '#67C5FF',
    useFilter: true
  },
  mobileLite: {
    count: 7,
    radius: [55, 100],
    speed: [0.45, 1.05],
    blur: 3.8,
    opacity: 0.72,
    life: [6200, 11000],
    fade: [650, 950],
    color: '#5FB6F5',
    useFilter: false
  }
};

const tier = (width) => (width <= 480 ? 'mobile' : width <= 900 ? 'tablet' : 'desktop');

const IS_IOS =
  (typeof navigator !== 'undefined' && /iP(hone|od|ad)/.test(navigator.platform)) ||
  (typeof navigator !== 'undefined' && /Macintosh/.test(navigator.userAgent) &&
    typeof document !== 'undefined' &&
    'ontouchend' in document);

const TICK_INTERVAL = IS_IOS ? 33 : 16.67; // iOS: ~30fps, others: ~60fps
const SPEED_NORMALIZER = 1 / 16.67;

const detectLowPowerProfile = () => {
  if (typeof navigator === 'undefined') return false;
  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigator.deviceMemory || 4;
  const ua = navigator.userAgent || '';
  const isAndroid = /Android/i.test(ua);

  if (cores <= 3 || (memory && memory <= 2)) return true;
  if (IS_IOS && cores <= 4) return true;
  if (isAndroid && cores <= 4 && memory <= 3) return true;
  return false;
};

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const rand = (min, max) => min + Math.random() * (max - min);

const ensureFilter = (svg, blur) => {
  const ns = 'http://www.w3.org/2000/svg';
  let defs = svg.querySelector('defs');
  if (!defs) {
    defs = document.createElementNS(ns, 'defs');
    svg.appendChild(defs);
  }

  let filter = defs.querySelector('#goo');
  if (!filter) {
    filter = document.createElementNS(ns, 'filter');
    filter.id = 'goo';
    filter.setAttribute('filterUnits', 'userSpaceOnUse');
    filter.setAttribute('x', '-50%');
    filter.setAttribute('y', '-50%');
    filter.setAttribute('width', '200%');
    filter.setAttribute('height', '200%');

    const blurNode = document.createElementNS(ns, 'feGaussianBlur');
    blurNode.setAttribute('in', 'SourceGraphic');
    blurNode.setAttribute('stdDeviation', String(blur));
    blurNode.setAttribute('result', 'blur');

    const cm = document.createElementNS(ns, 'feColorMatrix');
    cm.setAttribute('in', 'blur');
    cm.setAttribute('type', 'matrix');
    cm.setAttribute('values', '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -10');
    cm.setAttribute('result', 'goo');

    const comp = document.createElementNS(ns, 'feComposite');
    comp.setAttribute('in', 'SourceGraphic');
    comp.setAttribute('in2', 'goo');
    comp.setAttribute('operator', 'atop');

    filter.append(blurNode, cm, comp);
    defs.append(filter);
  } else {
    const blurNode = filter.querySelector('feGaussianBlur');
    if (blurNode) {
      blurNode.setAttribute('stdDeviation', String(blur));
    }
  }
};

export default function GooeyBackgroundSVG() {
  const svgRef = useRef(null);
  const animRef = useRef();

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const ns = 'http://www.w3.org/2000/svg';
    const viewportTier = tier(window.innerWidth);
    const lowPower = detectLowPowerProfile();
    const presetKey = lowPower && viewportTier === 'mobile' ? 'mobileLite' : viewportTier;
    const preset = presets[presetKey] || presets.desktop;

    if (preset.useFilter) {
      ensureFilter(svg, preset.blur);
      svg.style.filter = '';
      svg.style.webkitFilter = '';
    } else {
      svg.style.filter = 'none';
      svg.style.webkitFilter = 'none';
    }

    const group = document.createElementNS(ns, 'g');
    if (preset.useFilter) {
      group.setAttribute('filter', 'url(#goo)');
    }
    svg.appendChild(group);

    const W = svg.clientWidth || svg.viewBox?.baseVal?.width || 1;
    const H = svg.clientHeight || svg.viewBox?.baseVal?.height || 1;
    const spawnPadding = Math.max(preset.radius[1], 120);
    const overscan = spawnPadding * 0.75;
    const minX = -overscan;
    const maxX = W + overscan;
    const minY = -overscan;
    const maxY = H + overscan;

    const makeBall = () => {
      const r = rand(preset.radius[0], preset.radius[1]);
      const x = rand(-spawnPadding, W + spawnPadding);
      const y = rand(-spawnPadding, H + spawnPadding);
      const speed = rand(preset.speed[0], preset.speed[1]);
      const angle = rand(0, Math.PI * 2);
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const circle = document.createElementNS(ns, 'circle');
      circle.setAttribute('fill', preset.color);
      circle.setAttribute('opacity', '0');
      circle.setAttribute('r', r.toFixed(1));
      circle.style.willChange = 'opacity, transform';
      group.appendChild(circle);

      const cxBase = circle.cx.baseVal;
      const cyBase = circle.cy.baseVal;
      const rBase = circle.r.baseVal;
      cxBase.value = x;
      cyBase.value = y;
      rBase.value = r;

      return {
        el: circle,
        cxBase,
        cyBase,
        rBase,
        opacityValue: 0,
        x,
        y,
        vx,
        vy,
        r,
        life: 0,
        lifeDur: rand(preset.life[0], preset.life[1]),
        fadeIn: rand(preset.fade[0], preset.fade[1]),
        fadeOut: rand(preset.fade[0], preset.fade[1])
      };
    };

    const balls = Array.from({ length: preset.count }, makeBall);

    let lastTimestamp = 0;
    let accumulator = 0;
    let running = true;

    const onVisibility = () => {
      running = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', onVisibility);

    let intersectionObserver;
    try {
      intersectionObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          running = entry.isIntersecting && document.visibilityState === 'visible';
        }
      });
      intersectionObserver.observe(svg);
    } catch {
      /* ignore */
    }

    const step = (timestamp) => {
      if (!running) {
        animRef.current = requestAnimationFrame(step);
        return;
      }

      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      accumulator += delta;

      if (accumulator < TICK_INTERVAL) {
        animRef.current = requestAnimationFrame(step);
        return;
      }

      const dt = Math.min(accumulator, 80);
      accumulator = 0;
      const timeScale = dt * SPEED_NORMALIZER;

      for (let i = 0; i < balls.length; i += 1) {
        const ball = balls[i];
        ball.life += dt;
        ball.x += ball.vx * timeScale;
        ball.y += ball.vy * timeScale;

        if (ball.x < minX || ball.x > maxX) {
          ball.vx *= -1;
          ball.x = clamp(ball.x, minX, maxX);
        }
        if (ball.y < minY || ball.y > maxY) {
          ball.vy *= -1;
          ball.y = clamp(ball.y, minY, maxY);
        }

        if (ball.life >= ball.lifeDur) {
          const replacement = makeBall();
          balls[i] = replacement;
          group.replaceChild(replacement.el, ball.el);
          continue;
        }

        let opacity = preset.opacity;
        if (ball.life < ball.fadeIn) {
          opacity *= ball.life / ball.fadeIn;
        } else if (ball.life > ball.lifeDur - ball.fadeOut) {
          opacity *= Math.max(0, (ball.lifeDur - ball.life) / ball.fadeOut);
        }

        if (Math.abs(opacity - ball.opacityValue) > 0.01) {
          ball.opacityValue = opacity;
          ball.el.setAttribute('opacity', opacity.toFixed(3));
        }

        ball.cxBase.value = ball.x;
        ball.cyBase.value = ball.y;
      }

      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);

    const onResize = () => {
      window.location.reload();
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      if (intersectionObserver) intersectionObserver.disconnect();
      group.remove();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="gooey-bg"
      preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}
    />
  );
}

