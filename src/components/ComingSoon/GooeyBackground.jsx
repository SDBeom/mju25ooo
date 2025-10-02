import React, { useEffect, useRef, useCallback } from 'react';
import './GooeyBackground.css';

// 상수들을 컴포넌트 외부로 이동하여 성능 최적화
const CONFIG_BASE = {
  desktop: { count: 24, radiusMin: 140, radiusMax: 160 },
  tablet: { count: 12, radiusMin: 100, radiusMax: 120 },
  mobile: { count: 8, radiusMin: 70, radiusMax: 90 }
};

const SPEED_CONFIG = { min: 1.6, max: 4.0 };
const LIFE_DURATION = { min: 8000, max: 15000 };
const FADE_DURATION = { min: 800, max: 1200 };

const getConfig = (width) => {
  if (width <= 480) return CONFIG_BASE.mobile;
  if (width <= 768) return CONFIG_BASE.tablet;
  return CONFIG_BASE.desktop;
};

const GooeyBackground = () => {
  const gooLayerRef = useRef(null);
  const animationRef = useRef(null);
  const gooElementsRef = useRef([]);

  useEffect(() => {
    const gooLayer = gooLayerRef.current;
    const W = window.innerWidth;
    const H = window.innerHeight;
    
    const config = {
      ...getConfig(W),
      speed: SPEED_CONFIG,
      radius: { min: getConfig(W).radiusMin, max: getConfig(W).radiusMax }
    };

    // 새로운 원 생성 함수
    const createNewCircle = () => {
      const el = document.createElement('div');
      el.className = 'gooey-circle';
      gooLayer.appendChild(el);

      const r = config.radius.min + Math.random() * (config.radius.max - config.radius.min);
      const heading = Math.random() * Math.PI * 2;
      const spd = Math.max(1.0, config.speed.min + Math.random() * (config.speed.max - config.speed.min));

      const lifeDuration = LIFE_DURATION.min + Math.random() * (LIFE_DURATION.max - LIFE_DURATION.min);
      const fadeInDuration = FADE_DURATION.min + Math.random() * (FADE_DURATION.max - FADE_DURATION.min);
      const fadeOutDuration = FADE_DURATION.min + Math.random() * (FADE_DURATION.max - FADE_DURATION.min);

      // 초기 진입 애니메이션
      const startScale = 0.15 + Math.random() * 0.35;
      const delay = Math.random() * 600;
      const duration = 600 + Math.random() * 500;
      el.style.setProperty('--goo-start-scale', String(startScale));
      el.style.animation = `goo-grow ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms both`;

      return {
        el,
        x: Math.random() * W, // 화면 내 랜덤 위치
        y: Math.random() * H,
        vx: Math.cos(heading) * spd,
        vy: Math.sin(heading) * spd,
        r,
        lifeTime: 0,
        lifeDuration,
        fadeInDuration,
        fadeOutDuration,
        isVisible: true
      };
    };

    // 초기 구이 원들 생성
    const createGooey = () => {
      if (!gooLayer) return;

      gooLayer.innerHTML = ''; // 기존 원들 제거
      gooElementsRef.current = [];
      
      for (let i = 0; i < config.count; i++) {
        gooElementsRef.current.push(createNewCircle());
      }
    };

    // 개별 원 생명주기 관리 시스템
    const updateCircleLifecycle = (circle, index) => {
      // 생명주기 업데이트
      circle.lifeTime += 16; // 대략 60fps 기준

      // 속도가 너무 느린 경우 재설정 (자연스러운 움직임 유지)
      const speed = Math.sqrt(circle.vx * circle.vx + circle.vy * circle.vy);
      if (speed < 1.0) {
        const newHeading = Math.random() * Math.PI * 2;
        const newSpd = Math.max(1.0, config.speed.min + Math.random() * (config.speed.max - config.speed.min));
        circle.vx = Math.cos(newHeading) * newSpd;
        circle.vy = Math.sin(newHeading) * newSpd;
      }

      // 위치 업데이트
      circle.x += circle.vx;
      circle.y += circle.vy;

      // 화면 경계 처리 - 자연스러운 반사
      const margin = circle.r * 2;
      if (circle.x < -margin || circle.x > W + margin) {
        circle.vx *= -1;
        circle.x = Math.max(-margin, Math.min(W + margin, circle.x));
      }
      if (circle.y < -margin || circle.y > H + margin) {
        circle.vy *= -1;
        circle.y = Math.max(-margin, Math.min(H + margin, circle.y));
      }

      // 생명주기 종료 체크
      if (circle.lifeTime >= circle.lifeDuration) {
        // 기존 DOM 요소 제거하고 새로운 원으로 교체
        if (circle.el && circle.el.parentNode) {
          circle.el.parentNode.removeChild(circle.el);
        }
        
        // 새로운 원으로 교체
        gooElementsRef.current[index] = createNewCircle();
        return true; // 새로운 원은 계속 업데이트
      }

      // 부드러운 페이드 효과 계산
      let opacity = 1;
      let scale = 1;
      
      if (circle.lifeTime < circle.fadeInDuration) {
        // 페이드 인 + 스케일 인
        const fadeProgress = circle.lifeTime / circle.fadeInDuration;
        opacity = fadeProgress;
        scale = 0.3 + (fadeProgress * 0.7); // 0.3에서 1.0으로 스케일
      } else if (circle.lifeTime > circle.lifeDuration - circle.fadeOutDuration) {
        // 페이드 아웃 + 스케일 아웃
        const fadeProgress = (circle.lifeDuration - circle.lifeTime) / circle.fadeOutDuration;
        opacity = fadeProgress;
        scale = 0.7 + (fadeProgress * 0.3); // 1.0에서 0.7로 스케일
      }

      // Update element style
      const d = circle.r * 2;
      circle.el.style.width = `${d}px`;
      circle.el.style.height = `${d}px`;
      circle.el.style.left = `${circle.x - circle.r}px`;
      circle.el.style.top = `${circle.y - circle.r}px`;
      circle.el.style.opacity = opacity;
      circle.el.style.transform = `scale(${scale})`;

      return true; // 이 원은 계속 업데이트
    };

    // Animation loop - 개별 생명주기 시스템
    const animate = () => {
      gooElementsRef.current.forEach((circle, index) => {
        updateCircleLifecycle(circle, index);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    createGooey();
    animate();

    // 디바운스된 리사이즈 핸들러
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newW = window.innerWidth;
        const newH = window.innerHeight;
        
        // 화면 크기가 실제로 변경되었는지 확인
        if (Math.abs(newW - W) < 50 && Math.abs(newH - H) < 50) {
          return; // 크게 변경되지 않았으면 무시
        }
        
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        if (gooLayer) {
          gooLayer.innerHTML = '';
        }
        
        const newConfig = {
          ...getConfig(newW),
          speed: SPEED_CONFIG,
          radius: { min: getConfig(newW).radiusMin, max: getConfig(newW).radiusMax }
        };
        
        // 새로운 설정으로 구이 효과 재생성 (생명주기 시스템 사용)
        gooElementsRef.current = [];
        
        // 임시로 config를 업데이트하여 createNewCircle이 새로운 설정을 사용하도록 함
        const originalConfig = { ...config };
        Object.assign(config, newConfig);
        
        for (let i = 0; i < newConfig.count; i++) {
          gooElementsRef.current.push(createNewCircle());
        }
        
        // config 복원
        Object.assign(config, originalConfig);
        animate();
      }, 300); // 300ms 디바운스
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (gooLayer) {
        gooLayer.innerHTML = '';
      }
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* SVG Filter for Gooey Effect */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
            <feColorMatrix in="blur" mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo"/>
            <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
          </filter>
        </defs>
      </svg>
      
      {/* Gooey Background Layer */}
      <div ref={gooLayerRef} className="gooey-bg" />
    </>
  );
};

export default GooeyBackground;
