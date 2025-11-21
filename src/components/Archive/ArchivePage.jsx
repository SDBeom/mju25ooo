import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useBreakpointContext } from '../../contexts/BreakpointContext';
import notionIcon from '../../assets/icons8-개념-96.svg';
import './ArchivePage.css';

// Achieve 폴더의 이미지들을 동적으로 import (Vite 방식) - webp만 사용
const imageModules = import.meta.glob('../../assets/achieve/*.webp', { eager: true });
const achieveImages = Object.values(imageModules).map((module) => module.default);

const ArchivePage = () => {
  const { isMobile, deviceType } = useBreakpointContext();
  const containerRef = useRef(null);
  const trailerRef = useRef(null);
  const galleryRef = useRef(null);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const lastImageTimeRef = useRef(Date.now());

  // GitHub Gist 스크립트 로드
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://gist.github.com/SDBeom/c15f93615e1dfbe4c8d0ad36d1da4e14.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // GSAP Cursor Trailer Effect
  useEffect(() => {
    if (!trailerRef.current || !galleryRef.current || achieveImages.length === 0) {
      return;
    }

    const trailer = trailerRef.current;
    const images = galleryRef.current.querySelectorAll('.image-item');
    
    if (images.length === 0) {
      return;
    }

    const movementThreshold = 150;
    const delayBetween = 100;
    const maxActiveImages = 15;

    const createImageTrail = (e) => {
      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < movementThreshold) return;

      const now = Date.now();
      if (now - lastImageTimeRef.current < delayBetween) return;

      if (trailer.children.length > maxActiveImages) {
        const oldestImage = trailer.firstChild;
        if (oldestImage) {
          gsap.killTweensOf(oldestImage);
          oldestImage.remove();
        }
      }

      // 랜덤으로 이미지 선택
      const randomIndex = Math.floor(Math.random() * images.length);
      const image = images[randomIndex].cloneNode(true);

      image.style.left = `${e.clientX - 150}px`;
      image.style.top = `${e.clientY - 150}px`;

      trailer.appendChild(image);

      gsap.fromTo(
        image,
        {
          opacity: 1,
          scale: 0,
          rotation: gsap.utils.random(-20, 20),
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(2)',
        }
      );

      gsap.to(image, {
        opacity: 1,
        scale: 0,
        duration: 0.6,
        delay: 0.6,
        ease: 'power2.in',
        onComplete: () => {
          if (image.parentNode) {
            image.remove();
          }
        },
      });

      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
      lastImageTimeRef.current = now;
    };

    document.addEventListener('mousemove', createImageTrail);

    return () => {
      document.removeEventListener('mousemove', createImageTrail);
    };
  }, []);

  useEffect(() => {
    if (!isMobile) {
      return;
    }

    const preventPullToRefresh = (event) => {
      const container = containerRef.current;
      if (!container || container.scrollTop !== 0 || !event.touches) {
        return;
      }

      const startY = event.touches[0].clientY;

      const handleTouchMove = (moveEvent) => {
        const moveTouch = moveEvent.touches[0];
        const deltaY = moveTouch.clientY - startY;

        if (deltaY > 0 && container.scrollTop === 0) {
          moveEvent.preventDefault();
        }
      };

      document.addEventListener('touchmove', handleTouchMove, { passive: false });

      const cleanup = () => {
        document.removeEventListener('touchmove', handleTouchMove);
      };

      document.addEventListener('touchend', cleanup, { once: true });
      document.addEventListener('touchcancel', cleanup, { once: true });
    };

    document.addEventListener('touchstart', preventPullToRefresh, { passive: true });

    return () => {
      document.removeEventListener('touchstart', preventPullToRefresh);
    };
  }, [isMobile]);

  return (
    <div 
      className="about-page archive-page" 
      ref={containerRef}
    >
      {/* Container for the images that follow the mouse (Cursor Trailer) */}
      <div className="image-trailer" ref={trailerRef}></div>

      {/* Content Section - 텍스트만 표시 (박스 스타일 없음) */}
      <div className="archive-page__overlay">
        <div className="archive-page__content">
          <h1 className="archive-page__title">
            졸전 1년, 멋짐 뒤에 숨겨진<br />
            우리들의 '찐' 비하인드
          </h1>
          <p className="archive-page__instruction">
            {deviceType === 'desktop' 
              ? '마우스를 움직이면 이미지가 보여요!'
              : '화면을 터치하면 이미지가 보여요!'
            }
          </p>
          <a 
            href="https://knowing-cricket-66a.notion.site/276f20db80ad81f9b351ee21fec61c3e#276f20db80ad81988447fffb99a2b69b"
            target="_blank"
            rel="noopener noreferrer"
            className="archive-page__button"
          >
            <img src={notionIcon} alt="Notion" className="archive-page__button-icon" />
          </a>
        </div>
      </div>

      {/* Hidden gallery with images that will be cloned for cursor trailer */}
      <div className="image-gallery" ref={galleryRef}>
        {achieveImages.map((imagePath, index) => (
          <img
            key={index}
            src={imagePath}
            className="image-item"
            alt={`Archive image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ArchivePage;


