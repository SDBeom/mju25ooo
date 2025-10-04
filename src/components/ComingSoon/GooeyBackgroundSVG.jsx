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

// 레거시 설정 (논리 좌표계로 대체됨)
// const cfg = { ... }; // 더 이상 사용하지 않음

/**
 * 화면 너비에 따른 구이 설정 티어 반환
 * @param {number} w - 화면 너비
 * @returns {string} 'mobile' | 'tablet' | 'desktop'
 */
/**
 * 스케일과 DPR 계산 (논리 좌표계 기반)
 * @param {SVGElement} svgEl - SVG 요소
 * @returns {object} {s: scale, dpr: devicePixelRatio}
 */
const getScaleAndDpr = (svgEl) => {
  const { width, height } = svgEl.getBoundingClientRect();
  const s = Math.min(width, height) / LOGICAL_SIZE; // 화면→논리 스케일
  const dpr = Math.max(1, Math.min(3, window.devicePixelRatio || 1));
  return { s, dpr };
};

/**
 * 동적 프로필 계산 (시각적 일관성 보장)
 * @param {SVGElement} svgEl - SVG 요소
 * @param {number} q - 품질 계수 (0.6~1.0)
 * @returns {object} {n, rMin, rMax, stdDev, speedBase}
 */
const computeProfile = (svgEl, q = 1.0) => {
  const { s, dpr } = getScaleAndDpr(svgEl);

  // 시각적 밀도 일정: 면적 비례로 개수 계산, 상한/하한으로 안정화
  const areaNorm = (svgEl.clientWidth * svgEl.clientHeight) / (360 * 640); // 360x640 기준
  let n = Math.round(10 * areaNorm);            // 기본 10개를 기준 면적에 맞춤
  n = Math.max(6, Math.min(14, n));             // 가드레일
  n = Math.round(n * (0.7 + 0.3 * q));         // 품질 계수 적용

  // 반경은 논리좌표 비율로 정의
  const rMin = 0.07 * LOGICAL_SIZE;             // 7% of minDim
  const rMax = 0.11 * LOGICAL_SIZE;             // 11%

  // 블러: 논리 블러(px) * 화면스케일 * DPR 보정
  const baseBlur = 3.2;                          // 논리 기준
  let stdDev = baseBlur * s * Math.sqrt(dpr);     // 체감 균일, 과도한 증폭 방지
  stdDev = Math.max(1.6, stdDev * (0.6 + 0.4 * q)); // 품질 계수 적용

  // 속도: 화면 절대 이동을 동일하게 보이도록 논리 속도 * s 역보정
  const speedBase = 0.06 / s;                    // 스케일 커질수록 느리게, 작아질수록 빠르게

  return { n, rMin, rMax, stdDev, speedBase };
};

// 레거시 함수 (논리 좌표계로 대체됨)
// const tier = (w) => w <= 480 ? 'mobile' : w <= 900 ? 'tablet' : 'desktop';

// 논리 좌표계 설정 (고정 그리드)
const LOGICAL_SIZE = 1000; // 1000x1000 고정 그리드

const IS_IOS = typeof navigator !== 'undefined' && /iP(hone|od|ad)/.test(navigator.platform) || /Macintosh/.test(navigator.userAgent) && 'ontouchend' in document;

// 프레임 레이트 설정 (iOS: 30fps, 기타: 60fps)
const TICK_INTERVAL = IS_IOS ? 33 : 16.67; // iOS: 33ms, 기타: 16.67ms

// 동적 품질 거버너 변수
let overBudgetFrames = 0;
let quality = 1.0; // 1.0 = 풀, 0.6 = 세이프
let prevTs = 0;
// 레거시 함수 (논리 좌표계로 대체됨)
// const detectLowPowerProfile = () => { ... };

const SPEED_NORMALIZER = 1 / 16.67;

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));


/**
 * GooeyBackgroundSVG 컴포넌트
 * SVG 기반 구이 효과를 구현하는 메인 컴포넌트
 */
export default function GooeyBackgroundSVG() {
  const svgRef = useRef(null);    // SVG DOM 요소 참조
  const animRef = useRef();       // requestAnimationFrame ID 참조

  /**
   * 품질 계수 적용 (동적 거버너)
   * @param {number} q - 품질 계수 (0.6~1.0)
   */
  const applyQuality = (q) => {
    const svg = svgRef.current;
    if (!svg) return;
    
    const prof = computeProfile(svg, q);
    const thresh = 0.02 + (1 - q) * 0.05; // 업데이트 임계값 상향
    
    // 실제 원 개수 재배치/필터 stdDeviation 변경
    return { prof, thresh };
  };

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // 논리 좌표계 기반 초기화
    let prof = computeProfile(svg, quality);
    const { n, rMin, rMax, stdDev, speedBase } = prof;
    let { thresh } = applyQuality(quality);
    const ns = 'http://www.w3.org/2000/svg';     // SVG 네임스페이스
    
    // 논리 좌표계 경계 설정
    const overscan = Math.max(rMax * 0.3, 30);   // 논리 좌표 기준 오버스캔
    const minX = -overscan;
    const maxX = LOGICAL_SIZE + overscan;
    const minY = -overscan;
    const maxY = LOGICAL_SIZE + overscan;
    
    // 생명주기 및 페이드 설정 (논리 좌표계에 맞춤)
    const lifeRange = [9000, 16000];
    const fadeInRange = [900, 1300];
    const fadeOutRange = [900, 1300];
    const baseOpacity = 0.9;
    const fillColor = '#67C5FF';
    const isFilterEnabled = quality > 0.7; // 품질에 따라 필터 활성화
    const smoothing = 0.15; // 더 빠른 반응성

    // defs 전역 1회만 생성 (중복 방지)
    let defs;
    let filter;
    let blurNode;

    if (isFilterEnabled) {
      defs = document.getElementById('goo-defs');
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
        blurNode.setAttribute('stdDeviation', stdDev.toString());
      }

      svg.style.removeProperty('filter');
      svg.style.removeProperty('-webkit-filter');
    } else {
      svg.style.filter = 'none';
      svg.style.webkitFilter = 'none';
    }


    // 그룹에 필터 적용
    svg.innerHTML += ''; // 크롬 버그 회피용 no-op
    const g = document.createElementNS(ns, 'g');
    if (isFilterEnabled) {
      g.setAttribute('filter', 'url(#goo)');
    }
    svg.appendChild(g);

    const rand = (a, b) => a + Math.random() * (b - a);
    const spawnX = () => rand(minX, maxX);
    const spawnY = () => rand(minY, maxY);
    const balls = Array.from({ length: n }).map(() => {
      const r = rand(rMin, rMax);
      const cx = spawnX();
      const cy = spawnY();
      const sp = speedBase * (0.8 + Math.random() * 0.4); // 논리 속도 기반
      const ang = rand(0, Math.PI * 2);
      const vx = Math.cos(ang) * sp;
      const vy = Math.sin(ang) * sp;

      const circle = document.createElementNS(ns, 'circle');
      circle.setAttribute('r', String(r));
      circle.setAttribute('cx', String(cx));
      circle.setAttribute('cy', String(cy));
      circle.setAttribute('fill', fillColor);
      circle.style.opacity = '0';
      circle.style.willChange = 'opacity';
      const cxBase = circle.cx && circle.cx.baseVal ? circle.cx.baseVal : null;
      const cyBase = circle.cy && circle.cy.baseVal ? circle.cy.baseVal : null;
      const rBase = circle.r && circle.r.baseVal ? circle.r.baseVal : null;
      if (cxBase) cxBase.value = cx;
      if (cyBase) cyBase.value = cy;
      if (rBase) rBase.value = r;
      g.appendChild(circle);

      return {
        el: circle,
        r,
        x: cx,
        y: cy,
        vx,
        vy,
        life: 0,
        lifeDur: rand(lifeRange[0], lifeRange[1]),
        fadeIn: rand(fadeInRange[0], fadeInRange[1]),
        fadeOut: rand(fadeOutRange[0], fadeOutRange[1]),
        cxBase,
        cyBase,
        rBase,
        style: circle.style,
        opacityValue: 0,
        displayX: cx,
        displayY: cy
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

      // 동적 품질 거버너 간소화 (성능 우선)
      // 프레임 시간 모니터링은 일시적으로 비활성화하여 부드러운 애니메이션 우선

      // 프레임 레이트 제한 완화 (부드러운 애니메이션 우선)
      if (acc < 16.67) { // 모든 기기에서 60fps 목표
        animRef.current = requestAnimationFrame(step); 
        return; 
      }

      const deltaTime = Math.min(acc, 80);
      acc = 0;
      const timeScale = deltaTime * SPEED_NORMALIZER;

      for (let i = 0; i < balls.length; i++) {
        const b = balls[i];
        b.life += deltaTime;
        b.x += b.vx * timeScale;
        b.y += b.vy * timeScale;

        if (b.x < minX || b.x > maxX) {
          b.vx *= -1;
          b.x = clamp(b.x, minX, maxX);
        }
        if (b.y < minY || b.y > maxY) {
          b.vy *= -1;
          b.y = clamp(b.y, minY, maxY);
        }
        if (b.life >= b.lifeDur) {
          const r = rand(rMin, rMax);
          const cx = spawnX();
          const cy = spawnY();
          const sp = speedBase * (0.8 + Math.random() * 0.4);
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
          if (b.rBase) {
            b.rBase.value = r;
          } else {
            b.el.setAttribute('r', String(r));
          }
          b.opacityValue = 0;
          b.style.opacity = '0';
          b.displayX = cx;
          b.displayY = cy;
          if (b.cxBase) {
            b.cxBase.value = cx;
          } else {
            b.el.setAttribute('cx', String(cx));
          }
          if (b.cyBase) {
            b.cyBase.value = cy;
          } else {
            b.el.setAttribute('cy', String(cy));
          }
        }

        let op = 1;
        if (b.life < b.fadeIn) {
          op = b.life / b.fadeIn;
        } else if (b.life > b.lifeDur - b.fadeOut) {
          op = Math.max(0, (b.lifeDur - b.life) / b.fadeOut);
        }
        const nextOpacity = Math.max(0, Math.min(1, op * baseOpacity));

        if (Math.abs(nextOpacity - b.opacityValue) > 0.005) { // 더 민감한 투명도 업데이트
          b.opacityValue = nextOpacity;
          b.style.opacity = nextOpacity <= 0.001 ? '0' : nextOpacity >= 0.999 ? '1' : nextOpacity.toFixed(3);
        }

        b.displayX += (b.x - b.displayX) * smoothing;
        b.displayY += (b.y - b.displayY) * smoothing;

        // 속도 계산 (현재 미사용)

        // 부드러운 애니메이션을 위해 임계값 완화
        const dx = b.displayX - (b.cxBase ? b.cxBase.value : parseFloat(b.el.getAttribute('cx') || '0'));
        const dy = b.displayY - (b.cyBase ? b.cyBase.value : parseFloat(b.el.getAttribute('cy') || '0'));
        
        // 임계값을 크게 줄여서 더 자주 업데이트
        if (dx * dx + dy * dy > 1) {
          if (b.cxBase) {
            b.cxBase.value = b.displayX;
          } else {
            b.el.setAttribute('cx', b.displayX.toFixed(2));
          }
          if (b.cyBase) {
            b.cyBase.value = b.displayY;
          } else {
            b.el.setAttribute('cy', b.displayY.toFixed(2));
          }
        }
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
        
        if (Math.abs(newWidth - svg.clientWidth) + Math.abs(newHeight - svg.clientHeight) < 80) return;
        
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
      viewBox={`0 0 ${LOGICAL_SIZE} ${LOGICAL_SIZE}`}
      preserveAspectRatio="xMidYMid slice"
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

