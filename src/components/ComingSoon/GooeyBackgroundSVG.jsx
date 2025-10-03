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
    overscan: 220,
    life: [9000, 16000],
    fadeIn: [900, 1300],
    fadeOut: [900, 1300],
    useFilter: true,
    smoothing: 0.3,
    positionThreshold: 0.05,
    opacityThreshold: 0.016,
    thresholdGain: 0.0015
  },
  tablet: {
    n: 12,
    r: [95, 140],
    s: [0.7, 1.8],
    blur: 5,
    opacity: 0.85,
    spawnPadding: 100,
    overscan: 200,
    life: [8000, 14000],
    fadeIn: [850, 1200],
    fadeOut: [900, 1250],
    useFilter: true,
    smoothing: 0.27,
    positionThreshold: 0.07,
    opacityThreshold: 0.02,
    thresholdGain: 0.0022
  },
  mobile: {
    n: 6,  // 요소 수 대폭 감소
    r: [60, 90],  // 크기 축소
    s: [0.5, 1.2],
    blur: 2.5,  // 블러 강도 감소
    opacity: 0.86,
    spawnPadding: 80,
    overscan: 150,
    life: [7500, 13500],
    fadeIn: [750, 1050],
    fadeOut: [750, 1100],
    useFilter: false,  // 모바일에서 필터 완전 비활성화
    smoothing: 0.24,
    positionThreshold: 0.06,  // 업데이트 빈도 감소
    opacityThreshold: 0.03,
    thresholdGain: 0.0025
  },
  mobileLite: {
    n: 4,  // 요소 수 더 감소
    r: [50, 80],  // 크기 더 축소
    s: [0.35, 1.05],
    blur: 2.0,  // 블러 강도 더 감소
    opacity: 0.78,
    spawnPadding: 70,
    overscan: 160,
    life: [6200, 11000],
    fadeIn: [650, 950],
    fadeOut: [650, 950],
    useFilter: false,  // 모바일라이트에서도 필터 비활성화
    color: '#5FB6F5',
    smoothing: 0.18,
    positionThreshold: 0.08,  // 더 보수적으로
    opacityThreshold: 0.04,
    thresholdGain: 0.002
  }
};

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

/**
 * 현재 화면 너비에 맞는 구이 설정 티어 반환 (레거시 호환)
 * @param {number} w - 화면 너비
 * @returns {string} 'mobile' | 'tablet' | 'desktop'
 */
const tier = (w) => w <= 480 ? 'mobile' : w <= 900 ? 'tablet' : 'desktop';

// 논리 좌표계 설정 (고정 그리드)
const LOGICAL_SIZE = 1000; // 1000x1000 고정 그리드

const IS_IOS = typeof navigator !== 'undefined' && /iP(hone|od|ad)/.test(navigator.platform) || /Macintosh/.test(navigator.userAgent) && 'ontouchend' in document;

// 프레임 레이트 설정 (iOS: 30fps, 기타: 60fps)
const TICK_INTERVAL = IS_IOS ? 33 : 16.67; // iOS: 33ms, 기타: 16.67ms

// 동적 품질 거버너 변수
let overBudgetFrames = 0;
let quality = 1.0; // 1.0 = 풀, 0.6 = 세이프
let prevTs = 0;
const detectLowPowerProfile = () => {
  if (typeof navigator === 'undefined') return false;
  const cores = navigator.hardwareConcurrency || 4;
  const deviceMemory = navigator.deviceMemory || 4;
  const ua = navigator.userAgent || '';
  const isAndroid = /Android/i.test(ua);
  const lowCore = cores <= 3;
  const lowMemory = deviceMemory && deviceMemory <= 2;

  if (lowCore || lowMemory) return true;
  if (IS_IOS && (cores <= 4 || lowMemory)) return true;
  if (isAndroid && cores <= 4 && lowMemory) return true;

  return false;
};

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
    const smoothing = 0.28;

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

      // 동적 품질 거버너: 프레임 시간 모니터링
      const frameTime = ts - (prevTs || ts);
      prevTs = ts;

      // 타깃 16.7ms, 여유 22ms
      if (frameTime > 22) overBudgetFrames++; else overBudgetFrames = Math.max(0, overBudgetFrames - 1);

      if (overBudgetFrames >= 3 && quality > 0.6) {
        quality = Math.max(0.6, quality - 0.1);
        const newProf = applyQuality(quality);
        // 동적으로 설정 업데이트
        if (newProf) {
          Object.assign(prof, newProf.prof);
          thresh = newProf.thresh;
        }
        overBudgetFrames = 0;
      } else if (overBudgetFrames === 0 && quality < 1) {
        // 회복은 느리게
        quality = Math.min(1, quality + 0.02);
        const newProf = applyQuality(quality);
        if (newProf) {
          Object.assign(prof, newProf.prof);
          thresh = newProf.thresh;
        }
      }

      // 30fps 스로틀 (iOS)
      if (acc < TICK_INTERVAL) { 
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

        if (Math.abs(nextOpacity - b.opacityValue) > opacityThreshold) {
          b.opacityValue = nextOpacity;
          b.style.opacity = nextOpacity <= 0.001 ? '0' : nextOpacity >= 0.999 ? '1' : nextOpacity.toFixed(3);
        }

        b.displayX += (b.x - b.displayX) * smoothing;
        b.displayY += (b.y - b.displayY) * smoothing;

        const speed = Math.hypot(b.vx, b.vy);
        const dynamicThreshold = Math.min(positionThreshold + speed * thresholdGain, positionThreshold * 3 + 0.08);

        // 논리 좌표계 기반 미세 변화 건너뛰기
        const dx = b.displayX - (b.cxBase ? b.cxBase.value : parseFloat(b.el.getAttribute('cx') || '0'));
        const dy = b.displayY - (b.cyBase ? b.cyBase.value : parseFloat(b.el.getAttribute('cy') || '0'));
        
        if (dx * dx + dy * dy > (thresh * LOGICAL_SIZE) ** 2) {
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

