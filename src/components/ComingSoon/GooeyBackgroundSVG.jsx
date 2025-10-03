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

// 통합 설정: 모든 기기에서 동일한 구이 효과
const cfg = { 
  desktop: { n: 12, r: [120, 150], s: [1.4, 3.0] },  // 모든 기기에서 동일
  tablet: { n: 12, r: [120, 150], s: [1.4, 3.0] },  // 모든 기기에서 동일
  mobile: { n: 12, r: [120, 150], s: [1.4, 3.0] }   // 모든 기기에서 동일
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
    const t = cfg[tier(window.innerWidth)];       // 화면 크기에 맞는 설정
    const ns = 'http://www.w3.org/2000/svg';     // SVG 네임스페이스

    // defs 전역 1회만 생성 (중복 방지)
    let defs = document.getElementById('goo-defs');
    if (!defs) {
      const defsNode = document.createElementNS(ns, 'defs');
      defsNode.id = 'goo-defs';
      
      const filter = document.createElementNS(ns, 'filter');
      filter.setAttribute('id', 'goo');
      filter.setAttribute('filterUnits', 'userSpaceOnUse');
      filter.setAttribute('x', '-50%');
      filter.setAttribute('y', '-50%');
      filter.setAttribute('width', '200%');
      filter.setAttribute('height', '200%');

      const blur = document.createElementNS(ns, 'feGaussianBlur');
      blur.setAttribute('in', 'SourceGraphic');
      // 모든 기기에서 동일한 블러 강도
      blur.setAttribute('stdDeviation', '6');
      blur.setAttribute('result', 'b');

      const cm = document.createElementNS(ns, 'feColorMatrix');
      cm.setAttribute('in', 'b');
      cm.setAttribute('type', 'matrix');
      cm.setAttribute('values', '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -10');
      cm.setAttribute('result', 'g');

      const comp = document.createElementNS(ns, 'feComposite');
      comp.setAttribute('in', 'SourceGraphic');
      comp.setAttribute('in2', 'g');
      comp.setAttribute('operator', 'atop');

      filter.append(blur, cm, comp);
      defsNode.append(filter);
      svg.append(defsNode);
    }

    // 그룹에 필터 적용
    svg.innerHTML += ''; // 크롬 버그 회피용 no-op
    let g = document.createElementNS(ns, 'g');
    g.setAttribute('filter', 'url(#goo)');
    svg.appendChild(g);

    const rand = (a, b) => a + Math.random() * (b - a);
    const balls = Array.from({ length: t.n }).map(() => {
      const r = rand(t.r[0], t.r[1]);
      const cx = rand(0, W);
      const cy = rand(0, H);
      const sp = rand(t.s[0], t.s[1]);
      const ang = rand(0, Math.PI * 2);
      const vx = Math.cos(ang) * sp;
      const vy = Math.sin(ang) * sp;

      const c = document.createElementNS(ns, 'circle');
      c.setAttribute('r', String(r));
      c.setAttribute('cx', String(cx));
      c.setAttribute('cy', String(cy));
      c.setAttribute('fill', '#67C5FF');
      c.setAttribute('opacity', '0.9');
      g.appendChild(c);

      return {
        el: c,
        r,
        x: cx,
        y: cy,
        vx,
        vy,
        life: 0,
        lifeDur: rand(9000, 16000),
        fadeIn: rand(900, 1300),
        fadeOut: rand(900, 1300)
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

        const m = b.r * 2;
        if (b.x < -m || b.x > W + m) { 
          b.vx *= -1; 
          b.x = Math.max(-m, Math.min(W + m, b.x)); 
        }
        if (b.y < -m || b.y > H + m) { 
          b.vy *= -1; 
          b.y = Math.max(-m, Math.min(H + m, b.y)); 
        }

        if (b.life >= b.lifeDur) {
          // 재생성
          const r = rand(t.r[0], t.r[1]);
          const cx = rand(0, W);
          const cy = rand(0, H);
          const sp = rand(t.s[0], t.s[1]);
          const ang = rand(0, Math.PI * 2);
          b.r = r;
          b.x = cx;
          b.y = cy;
          b.vx = Math.cos(ang) * sp;
          b.vy = Math.sin(ang) * sp;
          b.life = 0;
          b.lifeDur = rand(9000, 16000);
          b.fadeIn = rand(900, 1300);
          b.fadeOut = rand(900, 1300);
          b.el.setAttribute('r', String(r));
        }

        // 페이드
        let op = 1;
        if (b.life < b.fadeIn) {
          op = b.life / b.fadeIn;
        } else if (b.life > b.lifeDur - b.fadeOut) {
          op = Math.max(0, (b.lifeDur - b.life) / b.fadeOut);
        }
        if (b.el.getAttribute('opacity') !== String(op)) {
          b.el.setAttribute('opacity', String(op));
        }

        // 위치
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
