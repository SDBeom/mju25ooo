import React, { useEffect, useRef } from 'react';
import './GooeyBackground.css';

const IS_IOS = typeof navigator !== 'undefined' && /iP(hone|od|ad)/.test(navigator.platform) || /Macintosh/.test(navigator.userAgent) && 'ontouchend' in document;
const TARGET_FPS = IS_IOS ? 30 : 60;
const FRAME_TIME = 1000 / 60;
const TICK_INTERVAL = 1000 / TARGET_FPS;  // 33ms on iOS

const CONFIG_BASE = {
  desktop: { count: 18, radiusMin: 120, radiusMax: 150, speedMin: 1.4, speedMax: 3.0 },
  tablet:  { count: 10, radiusMin: 90,  radiusMax: 110, speedMin: 1.0, speedMax: 2.2 },
  mobile:  { count: 4,  radiusMin: 60,  radiusMax: 80,  speedMin: 0.6, speedMax: 1.4 } // ↓↓↓
};

const LIFE_DURATION = { min: 9000, max: 16000 };
const FADE_DURATION = { min: 900, max: 1300 };
const MAX_DELTA = 1000 / 12;
const SCALE_MIN = 0.35;
const SCALE_MAX = 1;
const SCALE_FADE_OUT = 0.75;

const getConfigForWidth = (width) => {
  if (width <= 480) return CONFIG_BASE.mobile;
  if (width <= 900) return CONFIG_BASE.tablet;
  return CONFIG_BASE.desktop;
};

const GooeyBackground = () => {
  const gooLayerRef = useRef(null);
  const animationRef = useRef(null);
  const gooElementsRef = useRef([]);

  useEffect(() => {
    const gooLayer = gooLayerRef.current;
    if (!gooLayer) return undefined;

    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;
    let config = getConfigForWidth(viewportWidth);
    let lastTimestamp = 0;
    let acc = 0;
    let running = true;

    const createNewCircle = () => {
      const radius = config.radiusMin + Math.random() * (config.radiusMax - config.radiusMin);
      const diameter = radius * 2;
      const heading = Math.random() * Math.PI * 2;
      const speed = config.speedMin + Math.random() * (config.speedMax - config.speedMin);
      const vx = Math.cos(heading) * speed;
      const vy = Math.sin(heading) * speed;
      const x = Math.random() * viewportWidth;
      const y = Math.random() * viewportHeight;

      const el = document.createElement('div');
      el.className = 'gooey-circle';
      gooLayer.appendChild(el);

      const style = el.style;
      style.width = `${diameter}px`;
      style.height = `${diameter}px`;
      style.left = '0px';
      style.top = '0px';
      style.opacity = '0';
      style.transform = `translate3d(${x - radius}px, ${y - radius}px, 0) scale(${SCALE_MIN})`;
      style.webkitTransform = style.transform;

      const lifeDuration = LIFE_DURATION.min + Math.random() * (LIFE_DURATION.max - LIFE_DURATION.min);
      const fadeInDuration = FADE_DURATION.min + Math.random() * (FADE_DURATION.max - FADE_DURATION.min);
      const fadeOutDuration = FADE_DURATION.min + Math.random() * (FADE_DURATION.max - FADE_DURATION.min);

      return {
        el,
        style,
        x,
        y,
        vx,
        vy,
        r: radius,
        lifeTime: 0,
        lifeDuration,
        fadeInDuration,
        fadeOutDuration
      };
    };

    const initializeGooey = () => {
      gooLayer.innerHTML = '';
      gooElementsRef.current = [];
      for (let i = 0; i < config.count; i += 1) {
        gooElementsRef.current.push(createNewCircle());
      }
    };

    const updateCircleLifecycle = (circle, index, delta) => {
      const effectiveDelta = delta > 0 ? Math.min(delta, MAX_DELTA) : FRAME_TIME;
      const deltaRatio = effectiveDelta / FRAME_TIME;

      circle.lifeTime += effectiveDelta;

      const speed = Math.hypot(circle.vx, circle.vy);
      if (speed < config.speedMin) {
        const newHeading = Math.random() * Math.PI * 2;
        const newSpeed = config.speedMin + Math.random() * (config.speedMax - config.speedMin);
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

      let scale = SCALE_MAX;

      if (circle.lifeTime < circle.fadeInDuration) {
        const fadeProgress = circle.lifeTime / circle.fadeInDuration;
        scale = SCALE_MIN + fadeProgress * (SCALE_MAX - SCALE_MIN);
      } else if (circle.lifeTime > circle.lifeDuration - circle.fadeOutDuration) {
        const fadeProgress = (circle.lifeDuration - circle.lifeTime) / circle.fadeOutDuration;
        const clampedProgress = Math.max(0, Math.min(1, fadeProgress));
        scale = SCALE_FADE_OUT + clampedProgress * (SCALE_MAX - SCALE_FADE_OUT);
      }

      const translateX = circle.x - circle.r;
      const translateY = circle.y - circle.r;

      const nextTransform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
      if (circle.style.transform !== nextTransform) {
        circle.style.transform = nextTransform;
        circle.style.webkitTransform = nextTransform;
      }

      // opacity는 페이드 구간에서만 변경
      let nextOpacity;
      if (circle.lifeTime < circle.fadeInDuration) {
        const p = circle.lifeTime / circle.fadeInDuration;
        nextOpacity = p;
      } else if (circle.lifeTime > circle.lifeDuration - circle.fadeOutDuration) {
        const p = Math.max(0, Math.min(1, (circle.lifeDuration - circle.lifeTime) / circle.fadeOutDuration));
        nextOpacity = p;
      } else {
        nextOpacity = 1;
      }
      if (circle.style.opacity !== String(nextOpacity)) {
        circle.style.opacity = String(nextOpacity);
      }
    };

    // 가시성/뷰포트 밖이면 정지
    const visHandler = () => { running = document.visibilityState === 'visible'; };
    document.addEventListener('visibilitychange', visHandler);

    let intersectionObserver;
    try {
      intersectionObserver = new IntersectionObserver(entries => {
        for (const e of entries) {
          running = e.isIntersecting && document.visibilityState === 'visible';
        }
      });
      intersectionObserver.observe(gooLayer);
    } catch { /* 구형 브라우저 무시 */ }

    const animate = (timestamp) => {
      if (!running) { animationRef.current = requestAnimationFrame(animate); return; }

      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      // 30fps 스로틀
      acc += delta;
      if (acc < TICK_INTERVAL) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      const steps = Math.max(1, Math.floor(acc / TICK_INTERVAL));
      acc -= steps * TICK_INTERVAL;
      const effectiveDelta = Math.min(steps * TICK_INTERVAL, 1000/12); // 83ms 캡

      gooElementsRef.current.forEach((circle, index) => {
        updateCircleLifecycle(circle, index, effectiveDelta);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      lastTimestamp = 0;
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

        const prevTier = getConfigForWidth(viewportWidth);
        const nextTier = getConfigForWidth(newWidth);
        if (prevTier === nextTier && Math.abs(newWidth - viewportWidth) < 80 && Math.abs(newHeight - viewportHeight) < 80) {
          return; // 사소한 변화 무시
        }

        viewportWidth = newWidth;
        viewportHeight = newHeight;
        config = getConfigForWidth(newWidth);

        initializeGooey();
        startAnimation();
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      lastTimestamp = 0;
      gooLayer.innerHTML = '';
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', visHandler);
      if (intersectionObserver) {
        intersectionObserver.disconnect();
      }
    };
  }, []);

  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
        <defs>
          <filter id="goo" filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
            {/* 모바일에선 stdDeviation을 낮춤 */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -10" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div ref={gooLayerRef} className="gooey-bg" />
    </>
  );
};

export default GooeyBackground;
