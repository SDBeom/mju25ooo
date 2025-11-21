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
  
  // Text clip mask on scroll effect
  const maskContainerRef = useRef(null);
  const stickyMaskRef = useRef(null);
  const initialMaskSize = useRef(0.8);
  const targetMaskSize = useRef(30);
  const easing = useRef(0.15);
  const easedScrollProgress = useRef(0);

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

  // Text clip mask on scroll effect
  useEffect(() => {
    if (!maskContainerRef.current || !stickyMaskRef.current) {
      return;
    }

    const getScrollProgress = () => {
      if (!stickyMaskRef.current || !maskContainerRef.current) return 0;
      
      const containerHeight = maskContainerRef.current.getBoundingClientRect().height;
      const scrollProgress = stickyMaskRef.current.offsetTop / (containerHeight - window.innerHeight);
      const delta = scrollProgress - easedScrollProgress.current;
      easedScrollProgress.current += delta * easing.current;
      return easedScrollProgress.current;
    };

    const animate = () => {
      if (!stickyMaskRef.current) return;
      
      const maskSizeProgress = targetMaskSize.current * getScrollProgress();
      stickyMaskRef.current.style.webkitMaskSize = (initialMaskSize.current + maskSizeProgress) * 100 + "%";
      stickyMaskRef.current.style.maskSize = (initialMaskSize.current + maskSizeProgress) * 100 + "%";
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
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
    <div className="about-page archive-page" ref={containerRef}>
      {/* Container for the images that follow the mouse */}
      <div className="image-trailer" ref={trailerRef}></div>

      {/* Text Clip Mask on Scroll Effect */}
      <div ref={maskContainerRef} className="archive-page__mask-container">
        <div ref={stickyMaskRef} className="archive-page__sticky-mask">
          <div className="archive-page__mask-content">
            <h1 className="archive-page__title">
              졸전 1년, 멋짐 뒤에 숨겨진<br />
              우리들의 '찐' 비하인드
            </h1>
            <p className="archive-page__description">
              완벽한 졸업전시를 위해 우리가 흘린 땀과 눈물,<br />
              그리고 갤러리 밖에서의 '웃픈' 에피소드 대방출!<br />
              앨범 속에만 두기 아까운 그날의 생생한 현장을 공개합니다.
            </p>
            <a 
              href="https://knowing-cricket-66a.notion.site/276f20db80ad81f9b351ee21fec61c3e#276f20db80ad81988447fffb99a2b69b"
              target="_blank"
              rel="noopener noreferrer"
              className="archive-page__button"
            >
              아래 버튼을 눌러 우리들의 진짜 이야기를 만나보세요.
            </a>
          </div>
        </div>
      </div>

      {/* Content Section (fallback for non-supported browsers) */}
      <div className="archive-page__overlay">
        <div className="archive-page__content">
          <h1 className="archive-page__title">
            졸전 1년, 멋짐 뒤에 숨겨진<br />
            우리들의 '찐' 비하인드
          </h1>
          <p className="archive-page__description">
            완벽한 졸업전시를 위해 우리가 흘린 땀과 눈물,<br />
            그리고 갤러리 밖에서의 '웃픈' 에피소드 대방출!<br />
            앨범 속에만 두기 아까운 그날의 생생한 현장을 공개합니다.
          </p>
          <a 
            href="https://knowing-cricket-66a.notion.site/276f20db80ad81f9b351ee21fec61c3e#276f20db80ad81988447fffb99a2b69b"
            target="_blank"
            rel="noopener noreferrer"
            className="archive-page__button"
          >
            아래 버튼을 눌러 우리들의 진짜 이야기를 만나보세요.
          </a>
        </div>
      </div>

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


