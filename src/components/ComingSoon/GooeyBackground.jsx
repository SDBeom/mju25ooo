import React, { useEffect, useRef } from 'react';
import './GooeyBackground.css';

// 화면 크기별 기본 설정
const CONFIG_BASE = {
  desktop: { count: 24, radiusMin: 140, radiusMax: 160 },
  tablet: { count: 12, radiusMin: 100, radiusMax: 120 },
  mobile: { count: 8, radiusMin: 70, radiusMax: 90 }
};

const SPEED_CONFIG = { min: 1.6, max: 4.0 };
const LIFE_DURATION = { min: 8000, max: 15000 };
const FADE_DURATION = { min: 800, max: 1200 };
const FRAME_TIME = 1000 / 60; // 60fps 기준 프레임 시간
const MAX_DELTA = 1000 / 10; // 탭 전환 후 급격한 점프 방지

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
    if (!gooLayer) return;

    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;

    const baseConfig = getConfig(viewportWidth);
    let config = {
      ...baseConfig,
      speed: SPEED_CONFIG,
      radius: { min: baseConfig.radiusMin, max: baseConfig.radiusMax }
    };

    let lastTimestamp = null;

    const createNewCircle = () => {
      const el = document.createElement('div');
      el.className = 'gooey-circle';
      gooLayer.appendChild(el);

      const radius = config.radius.min + Math.random() * (config.radius.max - config.radius.min);
      const heading = Math.random() * Math.PI * 2;
      const speed = Math.max(1.0, config.speed.min + Math.random() * (config.speed.max - config.speed.min));
      const vx = Math.cos(heading) * speed;
      const vy = Math.sin(heading) * speed;

      const lifeDuration = LIFE_DURATION.min + Math.random() * (LIFE_DURATION.max - LIFE_DURATION.min);
      const fadeInDuration = FADE_DURATION.min + Math.random() * (FADE_DURATION.max - FADE_DURATION.min);
      const fadeOutDuration = FADE_DURATION.min + Math.random() * (FADE_DURATION.max - FADE_DURATION.min);

      const startScale = 0.15 + Math.random() * 0.35;
      const delay = Math.random() * 600;
      const duration = 600 + Math.random() * 500;
      el.style.setProperty('--goo-start-scale', String(startScale));
      el.style.animation = `goo-grow ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms both`;

      return {
        el,
        x: Math.random() * viewportWidth,
        y: Math.random() * viewportHeight,
        vx,
        vy,
        r: radius,
        lifeTime: 0,
        lifeDuration,
        fadeInDuration,
        fadeOutDuration,
        isVisible: true
      };
    };

    const initializeGooey = () => {
      gooLayer.innerHTML = '';
      gooElementsRef.current = [];

      for (let i = 0; i < config.count; i++) {
        gooElementsRef.current.push(createNewCircle());
      }
    };

    const updateCircleLifecycle = (circle, index, delta) => {
      const effectiveDelta = delta > 0 ? Math.min(delta, MAX_DELTA) : FRAME_TIME;
      const deltaRatio = effectiveDelta / FRAME_TIME;

      circle.lifeTime += effectiveDelta;

      const speed = Math.sqrt(circle.vx * circle.vx + circle.vy * circle.vy);
      if (speed < 1.0) {
        const newHeading = Math.random() * Math.PI * 2;
        const newSpeed = Math.max(1.0, config.speed.min + Math.random() * (config.speed.max - config.speed.min));
        circle.vx = Math.cos(newHeading) * newSpeed;
        circle.vy = Math.sin(newHeading) * newSpeed;
      }

      circle.x += circle.vx * deltaRatio;
      circle.y += circle.vy * deltaRatio;

      const margin = circle.r * 2;
      if (circle.x < -margin || circle.x > viewportWidth + margin) {
        circle.vx *= -1;
        circle.x = Math.max(-margin, Math.min(viewportWidth + margin, circle.x));
      }
      if (circle.y < -margin || circle.y > viewportHeight + margin) {
        circle.vy *= -1;
        circle.y = Math.max(-margin, Math.min(viewportHeight + margin, circle.y));
      }

      if (circle.lifeTime >= circle.lifeDuration) {
        if (circle.el && circle.el.parentNode) {
          circle.el.parentNode.removeChild(circle.el);
        }
        gooElementsRef.current[index] = createNewCircle();
        return;
      }

      let opacity = 1;
      let scale = 1;

      if (circle.lifeTime < circle.fadeInDuration) {
        const fadeProgress = circle.lifeTime / circle.fadeInDuration;
        opacity = fadeProgress;
        scale = 0.3 + fadeProgress * 0.7;
      } else if (circle.lifeTime > circle.lifeDuration - circle.fadeOutDuration) {
        const fadeProgress = (circle.lifeDuration - circle.lifeTime) / circle.fadeOutDuration;
        opacity = fadeProgress;
        scale = 0.7 + fadeProgress * 0.3;
      }

      const diameter = circle.r * 2;
      circle.el.style.width = `${diameter}px`;
      circle.el.style.height = `${diameter}px`;
      circle.el.style.left = `${circle.x - circle.r}px`;
      circle.el.style.top = `${circle.y - circle.r}px`;
      circle.el.style.opacity = opacity;
      circle.el.style.transform = `scale(${scale})`;
    };

    const animate = (timestamp) => {
      if (lastTimestamp === null) {
        lastTimestamp = timestamp;
      }

      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      gooElementsRef.current.forEach((circle, index) => {
        updateCircleLifecycle(circle, index, delta);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      lastTimestamp = null;
      animationRef.current = requestAnimationFrame(animate);
    };

    initializeGooey();
    startAnimation();

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;

        if (Math.abs(newWidth - viewportWidth) < 50 && Math.abs(newHeight - viewportHeight) < 50) {
          return;
        }

        viewportWidth = newWidth;
        viewportHeight = newHeight;

        const nextBaseConfig = getConfig(newWidth);
        config = {
          ...nextBaseConfig,
          speed: SPEED_CONFIG,
          radius: { min: nextBaseConfig.radiusMin, max: nextBaseConfig.radiusMax }
        };

        initializeGooey();
        startAnimation();
      }, 300);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      lastTimestamp = null;
      gooLayer.innerHTML = '';
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
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Gooey Background Layer */}
      <div ref={gooLayerRef} className="gooey-bg" />
    </>
  );
};

export default GooeyBackground;
