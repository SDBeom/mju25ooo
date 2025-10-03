/**
 * GooeyBackgroundSVG.jsx
 * 
 * SVG 기반 구이 효과(Gooey Effect)를 구현하는 React 컴포넌트
 * DOM 기반 버전과 달리 SVG circle 요소를 직접 조작하여 구이 효과 생성
 * 
 * 주요 기능:
 * - SVG 필터를 이용한 구이 효과
 * - 반응형 디자인 (데스크톱/태블릿/모바일별 최적화)
 * - 성능 최적화 (iOS 30fps, 기타 60fps)
 * - 메모리 효율적인 요소 재사용
 */

import React, { useEffect, useRef } from 'react';

// 기기별 구이 설정: 성능과 화면에 맞춰 개수, 반경, 속도를 조절
const cfg = {
  desktop: {
    n: 14,
    r: [110, 170],
    s: [0.7, 1.6],
    blur: 6,
    opacity: 0.9,
    spawnPadding: 120,
    overscan: 220
  },
  tablet: {
    n: 12,
    r: [95, 140],
    s: [0.7, 1.8],
    blur: 5,
    opacity: 0.85,
    spawnPadding: 100,
    overscan: 200
  },
  mobile: {
    n: 10,
    r: [70, 110],
    s: [0.5, 1.3],
    blur: 4.2,
    opacity: 0.82,
    spawnPadding: 90,
    overscan: 180,
    life: [7000, 12000],
    fadeIn: [650, 1000],
    fadeOut: [650, 1000]
  }
};

/**
 * 화면 너비에 따른 구이 설정 티어 반환
 * @param {number} w - 화면 너비
 * @returns {string} 'mobile' | 'tablet' | 'desktop'
 */
const tier = (w) => w <= 480 ? 'mobile' : w <= 900 ? 'tablet' : 'desktop';

// iOS 디바이스 감지 (성능 최적화를 위해 30fps로 제한)
const IS_IOS = typeof navigator !== 'undefined' && /iP(hone|od|ad)/.test(navigator.platform) || /Macintosh/.test(navigator.userAgent) && 'ontouchend' in document;

// 프레임 레이트 설정 (iOS: 30fps, 기타: 60fps)
const TICK_INTERVAL = IS_IOS ? 33 : 16.67; // iOS: 33ms, 기타: 16.67ms

/**
 * GooeyBackgroundSVG 컴포넌트
 * SVG 기반 구이 효과를 구현하는 메인 컴포넌트
 */
export default function GooeyBackgroundSVG() {
  const svgRef = useRef(null);    // SVG DOM 요소 참조
  const animRef = useRef();       // requestAnimationFrame ID 참조

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // SVG 크기 및 설정 초기화
    const W = svg.clientWidth;                    // SVG 너비
    const H = svg.clientHeight;                   // SVG 높이
    const t = cfg[tier(window.innerWidth)] || cfg.desktop;       // 화면 크기에 맞는 설정
    const ns = 'http://www.w3.org/2000/svg';     // SVG 네임스페이스
    const maxRadius = t.r[1];
    const blurValue = t.blur ?? 6;
    const spawnPadding = t.spawnPadding ?? Math.max(maxRadius * 0.5, 60);
    const overscan = t.overscan ?? Math.max(maxRadius * 1.5, 120);
    const minX = -overscan;
    const maxX = W + overscan;
    const minY = -overscan;
    const maxY = H + overscan;
    const lifeRange = t.life ?? [9000, 16000];
    const fadeInRange = t.fadeIn ?? [900, 1300];
    const fadeOutRange = t.fadeOut ?? [900, 1300];
    const baseOpacity = t.opacity ?? 0.9;
    const fillColor = t.color ?? '#67C5FF';

    // defs 전역 1회만 생성 (중복 방지)
    let defs = document.getElementById('goo-defs');
    let filter;
    let blurNode;
    if (!defs) {
      defs = document.createElementNS(ns, 'defs');
      defs.id = 'goo-defs';
      
      filter = document.createElementNS(ns, 'filter');
      filter.setAttribute('id', 'goo');
      filter.setAttribute('filterUnits', 'userSpaceOnUse');
      filter.setAttribute('x', '-50%');
      filter.setAttribute('y', '-50%');
      filter.setAttribute('width', '200%');
      filter.setAttribute('height', '200%');

      blurNode = document.createElementNS(ns, 'feGaussianBlur');
      blurNode.setAttribute('in', 'SourceGraphic');
      blurNode.setAttribute('result', 'b');

      const cm = document.createElementNS(ns, 'feColorMatrix');
      cm.setAttribute('in', 'b');
      cm.setAttribute('type', 'matrix');
      cm.setAttribute('values', '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -10');
      cm.setAttribute('result', 'g');

      const comp = document.createElementNS(ns, 'feComposite');
      comp.setAttribute('in', 'SourceGraphic');
      comp.setAttribute('in2', 'g');
      comp.setAttribute('operator', 'atop');

      filter.append(blurNode, cm, comp);
      defs.append(filter);
      svg.append(defs);
    } else {
      filter = defs.querySelector('#goo');
      if (filter) {
        blurNode = filter.querySelector('feGaussianBlur');
      }
    }

    if (blurNode) {
      blurNode.setAttribute('stdDeviation', String(blurValue));
    }


    // 그룹에 필터 적용
    svg.innerHTML += ''; // 크롬 버그 회피용 no-op
    let g = document.createElementNS(ns, 'g');
    g.setAttribute('filter', 'url(#goo)');
    svg.appendChild(g);

    const rand = (a, b) => a + Math.random() * (b - a);
    const spawnX = () => rand(-spawnPadding, W + spawnPadding);
    const spawnY = () => rand(-spawnPadding, H + spawnPadding);
    const balls = Array.from({ length: t.n }).map(() => {
      const r = rand(t.r[0], t.r[1]);
      const cx = spawnX();
      const cy = spawnY();
      const sp = rand(t.s[0], t.s[1]);
      const ang = rand(0, Math.PI * 2);
      const vx = Math.cos(ang) * sp;
      const vy = Math.sin(ang) * sp;

      const c = document.createElementNS(ns, 'circle');
      c.setAttribute('r', String(r));
      c.setAttribute('cx', String(cx));
      c.setAttribute('cy', String(cy));
      c.setAttribute('fill', fillColor);
      c.setAttribute('opacity', '0');
      g.appendChild(c);

      return {
        el: c,
        r,
        x: cx,
        y: cy,
        vx,
        vy,
        life: 0,
        lifeDur: rand(lifeRange[0], lifeRange[1]),
        fadeIn: rand(fadeInRange[0], fadeInRange[1]),
        fadeOut: rand(fadeOutRange[0], fadeOutRange[1])
      };
    });

    let last = 0;
    let acc = 0;
    let running = true;

    const onVis = () => { 
      running = document.visibilityState === 'visible'; 
    };
    document.addEventListener('visibilitychange', onVis);

    // IntersectionObserver 추가
    let intersectionObserver;
    try {
      intersectionObserver = new IntersectionObserver(entries => {
        for (const e of entries) {
          running = e.isIntersecting && document.visibilityState === 'visible';
        }
      });
      intersectionObserver.observe(svg);
    } catch { /* 구형 브라우저 무시 */ }

    const step = (ts) => {
      if (!running) { 
        animRef.current = requestAnimationFrame(step); 
        return; 
      }

      if (!last) last = ts;
      const delta = ts - last;
      last = ts;
      acc += delta;

      // 30fps 스로틀 (iOS)
      if (acc < TICK_INTERVAL) { 
        animRef.current = requestAnimationFrame(step); 
        return; 
      }

      const dt = Math.min(acc, 80);
      acc = 0;

      for (let i = 0; i < balls.length; i++) {
        const b = balls[i];
        b.life += dt;
        b.x += b.vx * dt / 16.67;
        b.y += b.vy * dt / 16.67;

        if (b.x < minX || b.x > maxX) {
          b.vx *= -1;
          b.x = Math.max(minX, Math.min(maxX, b.x));
        }
        if (b.y < minY || b.y > maxY) {
          b.vy *= -1;
          b.y = Math.max(minY, Math.min(maxY, b.y));
        }
        if (b.life >= b.lifeDur) {
          const r = rand(t.r[0], t.r[1]);
          const cx = spawnX();
          const cy = spawnY();
          const sp = rand(t.s[0], t.s[1]);
          const ang = rand(0, Math.PI * 2);
          b.r = r;
          b.x = cx;
          b.y = cy;
          b.vx = Math.cos(ang) * sp;
          b.vy = Math.sin(ang) * sp;
          b.life = 0;
          b.lifeDur = rand(lifeRange[0], lifeRange[1]);
          b.fadeIn = rand(fadeInRange[0], fadeInRange[1]);
          b.fadeOut = rand(fadeOutRange[0], fadeOutRange[1]);
          b.el.setAttribute('r', String(r));
          b.el.setAttribute('opacity', '0');
        }

        let op = 1;
        if (b.life < b.fadeIn) {
          op = b.life / b.fadeIn;
        } else if (b.life > b.lifeDur - b.fadeOut) {
          op = Math.max(0, (b.lifeDur - b.life) / b.fadeOut);
        }
        const nextOpacity = Math.max(0, Math.min(1, op * baseOpacity));
        const nextOpacityStr = nextOpacity.toFixed(3);
        if (b.el.getAttribute('opacity') !== nextOpacityStr) {
          b.el.setAttribute('opacity', nextOpacityStr);
        }

        b.el.setAttribute('cx', String(b.x));
        b.el.setAttribute('cy', String(b.y));
      }
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);

    let resizeTimeout;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        
        if (Math.abs(newWidth - W) + Math.abs(newHeight - H) < 80) return;
        
        cancelAnimationFrame(animRef.current);
        while (g.firstChild) g.removeChild(g.firstChild);
        if (svg.contains(g)) svg.removeChild(g);
        // 컴포넌트 재렌더링으로 초기화
        window.location.reload();
      }, 250);
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
      if (intersectionObserver) {
        intersectionObserver.disconnect();
      }
      while (g.firstChild) g.removeChild(g.firstChild);
      if (svg.contains(g)) svg.removeChild(g);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <svg 
      ref={svgRef} 
      className="gooey-bg" 
      preserveAspectRatio="none"
      style={{ 
        position: 'absolute', 
        inset: 0, 
        width: '100%', 
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
}
