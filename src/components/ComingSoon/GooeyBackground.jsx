import React, { useEffect, useRef } from 'react';
import './GooeyBackground.css';

const GooeyBackground = () => {
  const gooLayerRef = useRef(null);
  const animationRef = useRef(null);
  const gooElementsRef = useRef([]);

  useEffect(() => {
    const gooLayer = gooLayerRef.current;
    
    const W = window.innerWidth;
    const H = window.innerHeight;
    
    // 화면 크기에 따른 원 개수 및 크기 조절
    let circleCount = 24; // 기본값 (데스크톱)
    let radiusMin = 140;
    let radiusMax = 160;
    
    if (W <= 768) { // 태블릿
      circleCount = 12;
      radiusMin = 100;
      radiusMax = 120;
    }
    if (W <= 480) { // 모바일
      circleCount = 8;
      radiusMin = 70;
      radiusMax = 90;
    }
    
    const config = {
      count: circleCount,
      speed: { min: 1.6, max: 4.0 },
      radius: { min: radiusMin, max: radiusMax },
    };

    // 새로운 원 생성 함수
    const createNewCircle = () => {
      const el = document.createElement('div');
      el.className = 'gooey-circle';
      gooLayer.appendChild(el);

      const r = config.radius.min + Math.random() * (config.radius.max - config.radius.min);
      const heading = Math.random() * Math.PI * 2;
      const spd = Math.max(1.0, config.speed.min + Math.random() * (config.speed.max - config.speed.min));

      // 생명주기 설정 제거 - 계속 유지

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
        r
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

    // Animation loop
    const animate = () => {
      gooElementsRef.current.forEach((circle, index) => {
        // 속도가 너무 느린 경우 재설정
        const speed = Math.sqrt(circle.vx * circle.vx + circle.vy * circle.vy);
        if (speed < 1.0) {
          const newHeading = Math.random() * Math.PI * 2;
          const newSpd = Math.max(1.0, config.speed.min + Math.random() * (config.speed.max - config.speed.min));
          circle.vx = Math.cos(newHeading) * newSpd;
          circle.vy = Math.sin(newHeading) * newSpd;
        }

        // Update position (토러스 래핑 제거)
        circle.x = circle.x + circle.vx;
        circle.y = circle.y + circle.vy;

        // 화면 밖으로 나간 경우 초기화
        if (circle.x < -circle.r * 2 || circle.x > W + circle.r * 2 || 
            circle.y < -circle.r * 2 || circle.y > H + circle.r * 2) {
          
          // 기존 DOM 요소 제거
          if (circle.el && circle.el.parentNode) {
            circle.el.parentNode.removeChild(circle.el);
          }
          
          // 새로운 원으로 교체
          gooElementsRef.current[index] = createNewCircle();
          return;
        }

        // Update element style
        const d = circle.r * 2;
        circle.el.style.width = `${d}px`;
        circle.el.style.height = `${d}px`;
        circle.el.style.left = `${circle.x - circle.r}px`;
        circle.el.style.top = `${circle.y - circle.r}px`;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    createGooey();
    animate();

    // 화면 크기 변경 시 구이 효과 재생성
    const handleResize = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (gooLayer) {
        gooLayer.innerHTML = '';
      }
      
      // 새로운 화면 크기로 다시 시작
      const newW = window.innerWidth;
      const newH = window.innerHeight;
      
      let newCircleCount = 24;
      let newRadiusMin = 140;
      let newRadiusMax = 160;
      
      if (newW <= 768) { // 태블릿
        newCircleCount = 12;
        newRadiusMin = 100;
        newRadiusMax = 120;
      }
      if (newW <= 480) { // 모바일
        newCircleCount = 8;
        newRadiusMin = 70;
        newRadiusMax = 90;
      }
      
      const newConfig = {
        count: newCircleCount,
        speed: { min: 1.6, max: 4.0 },
        radius: { min: newRadiusMin, max: newRadiusMax },
      };
      
      // 새로운 설정으로 구이 효과 재생성
      gooElementsRef.current = [];
      for (let i = 0; i < newConfig.count; i++) {
        const el = document.createElement('div');
        el.className = 'gooey-circle';
        gooLayer.appendChild(el);

        const r = newConfig.radius.min + Math.random() * (newConfig.radius.max - newConfig.radius.min);
        const heading = Math.random() * Math.PI * 2;
        const spd = Math.max(1.0, newConfig.speed.min + Math.random() * (newConfig.speed.max - newConfig.speed.min));

        // 초기 진입 애니메이션
        const startScale = 0.15 + Math.random() * 0.35;
        const delay = Math.random() * 600;
        const duration = 600 + Math.random() * 500;
        el.style.setProperty('--goo-start-scale', String(startScale));
        el.style.animation = `goo-grow ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms both`;

        gooElementsRef.current.push({
          el,
          x: Math.random() * newW,
          y: Math.random() * newH,
          vx: Math.cos(heading) * spd,
          vy: Math.sin(heading) * spd,
          r
        });
      }
      animate();
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
