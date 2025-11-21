import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useBreakpointContext } from '../../contexts/BreakpointContext';
import './ArchivePage.css';

// Achieve 폴더의 이미지들을 동적으로 import (Vite 방식) - webp만 사용
const imageModules = import.meta.glob('../../assets/achieve/*.webp', { eager: true });
const achieveImages = Object.values(imageModules).map((module) => module.default);

const ArchivePage = () => {
  const { isMobile } = useBreakpointContext();
  const containerRef = useRef(null);
  const trailerRef = useRef(null);
  const galleryRef = useRef(null);
  const currentImageIndexRef = useRef(0);
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

    const movementThreshold = 150; // minimum pixels mouse must move before creating a new image (100 → 150)
    const delayBetween = 100; // minimum time (ms) between creating new images (70 → 100)
    const maxActiveImages = 15; // 동시에 존재할 수 있는 최대 이미지 수

    const createImageTrail = (e) => {
      // Calculate distance from last spawned image
      const dx = e.clientX - lastMousePosRef.current.x;
      const dy = e.clientY - lastMousePosRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Don't spawn a new image if mouse hasn't moved far enough
      if (distance < movementThreshold) return;

      // Don't spawn a new image if not enough time has passed
      const now = Date.now();
      if (now - lastImageTimeRef.current < delayBetween) return;

      // 🚀 성능 방어: 화면에 이미지가 너무 많으면(15개) 강제로 가장 오래된 것 삭제
      // DOM에 노드가 너무 많이 쌓이는 것을 방지
      if (trailer.children.length > maxActiveImages) {
        const oldestImage = trailer.firstChild;
        if (oldestImage) {
          // GSAP 애니메이션 중지하고 즉시 제거
          gsap.killTweensOf(oldestImage);
          oldestImage.remove();
        }
      }

      // Clone one of the gallery images
      const image = images[currentImageIndexRef.current].cloneNode(true);

      // Update index to use the next image next time (loops around)
      currentImageIndexRef.current = (currentImageIndexRef.current + 1) % images.length;

      // Position the image centered on the cursor (원형이므로 150px씩 빼기)
      image.style.left = `${e.clientX - 150}px`;
      image.style.top = `${e.clientY - 150}px`;

      // Add the cloned image to the trailer container
      trailer.appendChild(image);

      // Animate the image appearing: scale from 0 → 1, no opacity change
      gsap.fromTo(
        image,
        {
          opacity: 1, // set to 0 if you want fade in
          scale: 0, // start scaled down
          rotation: gsap.utils.random(-20, 20), // small random tilt
        },
        {
          opacity: 1, // remain fully visible
          scale: 1, // grow to full size
          duration: 0.6, // animation duration
          ease: 'back.out(2)', // bouncy entrance
        }
      );

      // Animate the image shrinking out (scale → 0), opacity stays 1
      gsap.to(image, {
        opacity: 1, // set to 0 if you want the fade out animation
        scale: 0, // shrink to nothing
        duration: 0.6, // animation duration
        delay: 0.6, // wait before starting shrink
        ease: 'power2.in', // smooth shrinking
        onComplete: () => {
          // 애니메이션 끝나면 삭제 (방어 코드: 부모가 있을 때만 삭제)
          if (image.parentNode) {
            image.remove();
          }
        },
      });

      // Save current mouse position & time for next calculation
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
      lastImageTimeRef.current = now;
    };

    // Listen for mouse movement and trigger the trail function
    document.addEventListener('mousemove', createImageTrail);

    return () => {
      document.removeEventListener('mousemove', createImageTrail);
    };
  }, [achieveImages.length]);

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
    <div className="about-page archive-page" ref={containerRef}>
      {/* Container for the images that follow the mouse */}
      <div className="image-trailer" ref={trailerRef}></div>

      {/* Hidden gallery with images that will be cloned */}
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


