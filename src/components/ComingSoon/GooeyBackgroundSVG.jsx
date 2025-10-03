import React, { useEffect, useRef } from 'react';

const cfg = { 
  desktop: { n: 12, r: [120, 150], s: [1.4, 3.0] },
  tablet: { n: 6, r: [90, 110], s: [1.0, 2.2] },
  mobile: { n: 3, r: [60, 80], s: [0.4, 1.0] } // 모바일에서 더 적고 느리게
};

const tier = (w) => w <= 480 ? 'mobile' : w <= 900 ? 'tablet' : 'desktop';

const IS_IOS = typeof navigator !== 'undefined' && /iP(hone|od|ad)/.test(navigator.platform) || /Macintosh/.test(navigator.userAgent) && 'ontouchend' in document;
const TICK_INTERVAL = IS_IOS ? 33 : 16.67; // 30fps on iOS, 60fps on others

export default function GooeyBackgroundSVG() {
  const svgRef = useRef(null);
  const animRef = useRef();

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const W = svg.clientWidth;
    const H = svg.clientHeight;
    const t = cfg[tier(window.innerWidth)];
    const ns = 'http://www.w3.org/2000/svg';

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
      // 모바일에서 블러 강도 낮춤
      blur.setAttribute('stdDeviation', IS_IOS ? '3' : '6');
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
