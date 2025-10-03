/**
 * GooeyBackground.jsx
 * 
 * 구이 효과(Gooey Effect)를 구현하는 React 컴포넌트
 * SVG 필터를 사용하여 액체처럼 연결되는 애니메이션 효과를 생성
 * 
 * 주요 기능:
 * - 반응형 디자인 (데스크톱/태블릿/모바일별 최적화)
 * - GPU 가속을 통한 부드러운 애니메이션
 * - 메모리 효율적인 요소 재사용
 * - 성능 최적화 (iOS 30fps, 기타 60fps)
 */

import React, { useEffect, useRef } from 'react';
import './GooeyBackground.css';

// iOS 디바이스 감지 (성능 최적화를 위해 30fps로 제한)
const IS_IOS = typeof navigator !== 'undefined' && /iP(hone|od|ad)/.test(navigator.platform) || /Macintosh/.test(navigator.userAgent) && 'ontouchend' in document;

// 프레임 레이트 설정 (iOS는 30fps, 기타는 60fps)
const TARGET_FPS = IS_IOS ? 30 : 60;
const FRAME_TIME = 1000 / 60; // 60fps 기준 프레임 시간
const TICK_INTERVAL = 1000 / TARGET_FPS;  // iOS: 33ms, 기타: 16.67ms

// 반응형 설정: 화면 크기별 구이 원의 개수와 크기 조정
const CONFIG_BASE = {
  desktop: { count: 12, radiusMin: 120, radiusMax: 150, speedMin: 1.4, speedMax: 3.0 }, // 데스크톱: 많은 원, 큰 크기
  tablet:  { count: 6,  radiusMin: 90,  radiusMax: 110, speedMin: 1.0, speedMax: 2.2 }, // 태블릿: 중간
  mobile:  { count: 3,  radiusMin: 60,  radiusMax: 80,  speedMin: 0.4, speedMax: 1.0 }  // 모바일: 적은 원, 작은 크기
};

// 구이 원의 생명주기 설정
const LIFE_DURATION = { min: 9000, max: 16000 };  // 원이 살아있는 시간 (9-16초)
const FADE_DURATION = { min: 900, max: 1300 };    // 페이드 인/아웃 시간 (0.9-1.3초)
const MAX_DELTA = 1000 / 12;                      // 최대 델타 시간 제한 (83ms)
const SCALE_MIN = 0.35;                           // 최소 스케일
const SCALE_MAX = 1;                              // 최대 스케일
const SCALE_FADE_OUT = 0.75;                      // 페이드 아웃 시 스케일

/**
 * 화면 너비에 따른 구이 설정 반환
 * @param {number} width - 화면 너비
 * @returns {object} 구이 설정 객체
 */
const getConfigForWidth = (width) => {
  if (width <= 480) return CONFIG_BASE.mobile;    // 모바일: 480px 이하
  if (width <= 900) return CONFIG_BASE.tablet;    // 태블릿: 481-900px
  return CONFIG_BASE.desktop;                     // 데스크톱: 901px 이상
};

/**
 * GooeyBackground 컴포넌트
 * 구이 효과를 구현하는 메인 컴포넌트
 */
const GooeyBackground = () => {
  const gooLayerRef = useRef(null);        // 구이 원들을 담는 컨테이너 DOM 참조
  const animationRef = useRef(null);       // requestAnimationFrame ID 참조
  const gooElementsRef = useRef([]);       // 구이 원 객체들의 배열 참조

  useEffect(() => {
    const gooLayer = gooLayerRef.current;
    if (!gooLayer) return undefined;

    // 뷰포트 크기 및 설정 초기화
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;
    let config = getConfigForWidth(viewportWidth);  // 화면 크기에 맞는 설정 선택
    let lastTimestamp = 0;                          // 마지막 애니메이션 프레임 시간
    let acc = 0;                                    // 프레임 스로틀링용 누적 시간
    let running = true;                             // 애니메이션 실행 상태

    /**
     * 새로운 구이 원 생성
     * @returns {object} 구이 원 객체 (DOM 요소, 위치, 속도, 생명주기 정보 포함)
     */
    const createNewCircle = () => {
      // 원의 반지름과 크기 설정
      const radius = config.radiusMin + Math.random() * (config.radiusMax - config.radiusMin);
      const diameter = radius * 2;
      
      // 이동 방향과 속도 설정 (랜덤한 방향으로 이동)
      const heading = Math.random() * Math.PI * 2;  // 0~2π 랜덤 각도
      const speed = config.speedMin + Math.random() * (config.speedMax - config.speedMin);
      const vx = Math.cos(heading) * speed;         // X축 이동 속도
      const vy = Math.sin(heading) * speed;         // Y축 이동 속도
      
      // 초기 위치 설정 (화면 내 랜덤 위치)
      const x = Math.random() * viewportWidth;
      const y = Math.random() * viewportHeight;

      // DOM 요소 생성 및 스타일 설정
      const el = document.createElement('div');
      el.className = 'gooey-circle';
      gooLayer.appendChild(el);

      // 스타일 설정 (GPU 가속을 위한 transform3d 사용)
      const style = el.style;
      style.width = `${diameter}px`;
      style.height = `${diameter}px`;
      style.left = '0px';    // 절대 위치 기준점
      style.top = '0px';
      style.opacity = '0';   // 초기 투명도 (페이드 인으로 시작)
      style.transform = `translate3d(${x - radius}px, ${y - radius}px, 0) scale(${SCALE_MIN})`;
      style.webkitTransform = style.transform;  // WebKit 브라우저 호환성

      // 생명주기 설정 (랜덤 값으로 다양성 확보)
      const lifeDuration = LIFE_DURATION.min + Math.random() * (LIFE_DURATION.max - LIFE_DURATION.min);
      const fadeInDuration = FADE_DURATION.min + Math.random() * (FADE_DURATION.max - FADE_DURATION.min);
      const fadeOutDuration = FADE_DURATION.min + Math.random() * (FADE_DURATION.max - FADE_DURATION.min);

      // 구이 원 객체 반환 (DOM 요소와 상태 정보 포함)
      return {
        el,                // DOM 요소
        style,             // 스타일 객체 (빠른 접근용)
        x,                 // 현재 X 위치
        y,                 // 현재 Y 위치
        vx,                // X축 이동 속도
        vy,                // Y축 이동 속도
        r: radius,         // 반지름
        lifeTime: 0,       // 생존 시간
        lifeDuration,      // 전체 생존 시간
        fadeInDuration,    // 페이드 인 시간
        fadeOutDuration    // 페이드 아웃 시간
      };
    };

    /**
     * 구이 애니메이션 초기화
     * 기존 원들을 모두 제거하고 새로운 원들로 교체
     */
    const initializeGooey = () => {
      gooLayer.innerHTML = '';              // 기존 DOM 요소 모두 제거
      gooElementsRef.current = [];          // 참조 배열 초기화
      
      // 설정된 개수만큼 구이 원 생성
      for (let i = 0; i < config.count; i += 1) {
        gooElementsRef.current.push(createNewCircle());
      }
    };

    /**
     * 구이 원의 생명주기 업데이트
     * 위치, 스케일, 투명도, 생존시간 등을 계산하여 업데이트
     * @param {object} circle - 구이 원 객체
     * @param {number} index - 배열 내 인덱스
     * @param {number} delta - 시간 변화량 (ms)
     */
    const updateCircleLifecycle = (circle, index, delta) => {
      // 델타 시간 제한 (성능 최적화)
      const effectiveDelta = delta > 0 ? Math.min(delta, MAX_DELTA) : FRAME_TIME;
      const deltaRatio = effectiveDelta / FRAME_TIME;  // 60fps 기준 정규화

      // 생존시간 증가
      circle.lifeTime += effectiveDelta;

      // 속도가 너무 느려지면 새로운 방향과 속도로 재설정
      const speed = Math.hypot(circle.vx, circle.vy);
      if (speed < config.speedMin) {
        const newHeading = Math.random() * Math.PI * 2;
        const newSpeed = config.speedMin + Math.random() * (config.speedMax - config.speedMin);
        circle.vx = Math.cos(newHeading) * newSpeed;
        circle.vy = Math.sin(newHeading) * newSpeed;
      }

      // 위치 업데이트 (속도에 따른 이동)
      circle.x += circle.vx * deltaRatio;
      circle.y += circle.vy * deltaRatio;

      // 화면 경계 체크 및 반사 처리
      const margin = circle.r * 2;  // 원의 지름만큼 여백 확보
      
      // X축 경계 처리 (왼쪽/오른쪽 벽에 부딪히면 방향 반전)
      if (circle.x < -margin || circle.x > viewportWidth + margin) {
        circle.vx *= -1;  // X축 속도 반전
        circle.x = Math.max(-margin, Math.min(viewportWidth + margin, circle.x));
      }
      
      // Y축 경계 처리 (위/아래 벽에 부딪히면 방향 반전)
      if (circle.y < -margin || circle.y > viewportHeight + margin) {
        circle.vy *= -1;  // Y축 속도 반전
        circle.y = Math.max(-margin, Math.min(viewportHeight + margin, circle.y));
      }

      // 생존시간 만료 시 새로운 원으로 교체
      if (circle.lifeTime >= circle.lifeDuration) {
        if (circle.el && circle.el.parentNode) {
          circle.el.parentNode.removeChild(circle.el);  // 기존 DOM 요소 제거
        }
        gooElementsRef.current[index] = createNewCircle();  // 새로운 원 생성
        return;  // 이번 프레임에서는 더 이상 처리하지 않음
      }

      // 스케일 계산 (페이드 인/아웃 효과)
      let scale = SCALE_MAX;  // 기본 스케일

      // 페이드 인 구간: 작은 크기에서 시작해서 점점 커짐
      if (circle.lifeTime < circle.fadeInDuration) {
        const fadeProgress = circle.lifeTime / circle.fadeInDuration;
        scale = SCALE_MIN + fadeProgress * (SCALE_MAX - SCALE_MIN);
      } 
      // 페이드 아웃 구간: 생명주기 끝나기 전에 점점 작아짐
      else if (circle.lifeTime > circle.lifeDuration - circle.fadeOutDuration) {
        const fadeProgress = (circle.lifeDuration - circle.lifeTime) / circle.fadeOutDuration;
        const clampedProgress = Math.max(0, Math.min(1, fadeProgress));
        scale = SCALE_FADE_OUT + clampedProgress * (SCALE_MAX - SCALE_FADE_OUT);
      }

      // transform 값 계산 (중심점 기준으로 위치 조정)
      const translateX = circle.x - circle.r;
      const translateY = circle.y - circle.r;

      // GPU 가속을 위한 transform3d 사용
      const nextTransform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
      
      // transform 값이 변경된 경우에만 DOM 업데이트 (성능 최적화)
      if (circle.style.transform !== nextTransform) {
        circle.style.transform = nextTransform;
        circle.style.webkitTransform = nextTransform;  // WebKit 호환성
        circle.style.willChange = 'transform';         // GPU 레이어 강제 생성
      }

      // 투명도 계산 (페이드 인/아웃 효과)
      let nextOpacity;
      
      // 페이드 인 구간: 0에서 1로 점점 나타남
      if (circle.lifeTime < circle.fadeInDuration) {
        const p = circle.lifeTime / circle.fadeInDuration;
        nextOpacity = p;
      } 
      // 페이드 아웃 구간: 1에서 0으로 점점 사라짐
      else if (circle.lifeTime > circle.lifeDuration - circle.fadeOutDuration) {
        const p = Math.max(0, Math.min(1, (circle.lifeDuration - circle.lifeTime) / circle.fadeOutDuration));
        nextOpacity = p;
      } 
      // 정상 구간: 완전히 불투명
      else {
        nextOpacity = 1;
      }
      
      // 투명도 값이 변경된 경우에만 DOM 업데이트 (성능 최적화)
      if (circle.style.opacity !== String(nextOpacity)) {
        circle.style.opacity = String(nextOpacity);
      }
    };

    // 페이지 가시성 변화 감지 (백그라운드에서 애니메이션 정지)
    const visHandler = () => { 
      running = document.visibilityState === 'visible'; 
    };
    document.addEventListener('visibilitychange', visHandler);

    // IntersectionObserver로 뷰포트 내 가시성 감지 (성능 최적화)
    let intersectionObserver;
    try {
      intersectionObserver = new IntersectionObserver(entries => {
        for (const e of entries) {
          // 화면에 보이지 않거나 페이지가 백그라운드에 있으면 애니메이션 정지
          running = e.isIntersecting && document.visibilityState === 'visible';
        }
      });
      intersectionObserver.observe(gooLayer);
    } catch { 
      /* 구형 브라우저에서는 IntersectionObserver 미지원으로 무시 */ 
    }

    /**
     * 메인 애니메이션 루프
     * requestAnimationFrame을 사용하여 부드러운 애니메이션 구현
     * @param {number} timestamp - 현재 시간 (ms)
     */
    const animate = (timestamp) => {
      // 애니메이션이 정지된 상태면 다음 프레임만 예약하고 종료
      if (!running) { 
        animationRef.current = requestAnimationFrame(animate); 
        return; 
      }

      // 첫 프레임이거나 시간 계산
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      // 프레임 스로틀링 (iOS: 30fps, 기타: 60fps)
      acc += delta;
      if (acc < TICK_INTERVAL) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      // 누적된 시간을 여러 프레임으로 분할 처리
      const steps = Math.max(1, Math.floor(acc / TICK_INTERVAL));
      acc -= steps * TICK_INTERVAL;
      const effectiveDelta = Math.min(steps * TICK_INTERVAL, 1000/12); // 최대 83ms 제한

      // 모든 구이 원의 생명주기 업데이트
      gooElementsRef.current.forEach((circle, index) => {
        updateCircleLifecycle(circle, index, effectiveDelta);
      });

      // 다음 프레임 예약
      animationRef.current = requestAnimationFrame(animate);
    };

    /**
     * 애니메이션 시작
     * 기존 애니메이션을 정지하고 새로운 애니메이션 루프 시작
     */
    const startAnimation = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);  // 기존 애니메이션 정지
      }
      lastTimestamp = 0;                             // 시간 초기화
      animationRef.current = requestAnimationFrame(animate);  // 새 애니메이션 시작
    };

    // 구이 애니메이션 초기화 및 시작
    initializeGooey();
    startAnimation();

    // 화면 크기 변화 감지 및 처리 (디바운싱 적용)
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);  // 이전 타이머 취소
      resizeTimeout = setTimeout(() => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;

        // 화면 크기 티어 변화 체크 (모바일/태블릿/데스크톱)
        const prevTier = getConfigForWidth(viewportWidth);
        const nextTier = getConfigForWidth(newWidth);
        
        // 티어가 같고 크기 변화가 작으면 무시 (불필요한 재초기화 방지)
        if (prevTier === nextTier && 
            Math.abs(newWidth - viewportWidth) < 80 && 
            Math.abs(newHeight - viewportHeight) < 80) {
          return; // 사소한 변화 무시
        }

        // 뷰포트 크기 및 설정 업데이트
        viewportWidth = newWidth;
        viewportHeight = newHeight;
        config = getConfigForWidth(newWidth);

        // 새로운 설정으로 구이 애니메이션 재초기화
        initializeGooey();
        startAnimation();
      }, 250);  // 250ms 디바운싱
    };

    // 리사이즈 이벤트 리스너 등록 (passive: true로 성능 최적화)
    window.addEventListener('resize', handleResize, { passive: true });

    // 컴포넌트 언마운트 시 정리 작업
    return () => {
      // 애니메이션 정지
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // 상태 초기화
      lastTimestamp = 0;
      gooLayer.innerHTML = '';  // DOM 요소 제거
      
      // 타이머 정리
      clearTimeout(resizeTimeout);
      
      // 이벤트 리스너 제거
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', visHandler);
      
      // IntersectionObserver 정리
      if (intersectionObserver) {
        intersectionObserver.disconnect();
      }
    };
  }, []);  // 빈 의존성 배열로 마운트 시 한 번만 실행

  return (
    <>
      {/* SVG 필터 정의 (구이 효과의 핵심) */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
        <defs>
          <filter id="goo" filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
            {/* 가우시안 블러: 원들을 부드럽게 연결 (iOS에서는 강도 낮춤) */}
            <feGaussianBlur in="SourceGraphic" stdDeviation={IS_IOS ? "3" : "6"} result="blur" />
            
            {/* 컬러 매트릭스: 알파 채널 증폭으로 구이 효과 강화 */}
            <feColorMatrix in="blur" type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -10" result="goo" />
            
            {/* 컴포지트: 원본과 구이 효과 합성 */}
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* 구이 원들을 담는 컨테이너 */}
      <div ref={gooLayerRef} className="gooey-bg" />
    </>
  );
};

export default GooeyBackground;
