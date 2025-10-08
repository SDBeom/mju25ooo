import React, { useEffect, useRef } from 'react';
import { useBreakpointContext } from '../../contexts/BreakpointContext';
import './ComingSoon.css';

// ✨ 컴포넌트들을 조립
import ComingSoonContent from './ComingSoonContent';
import ComingSoonFooter from './ComingSoonFooter';
import GooeyBackgroundSVG from './GooeyBackgroundSVG';

const ComingSoon = () => {
  const { isMobile } = useBreakpointContext();
  const footerRef = useRef(null);
  const containerRef = useRef(null);
  
  // 모바일에서 pull-to-refresh 방지
  useEffect(() => {
    if (!isMobile) return;

    const preventPullToRefresh = (e) => {
      // 스크롤이 맨 위에 있고 아래로 당기는 동작일 때만 방지
      const container = containerRef.current;
      if (container && container.scrollTop === 0 && e.touches) {
        const touch = e.touches[0];
        const startY = touch.clientY;
        
        const handleTouchMove = (moveEvent) => {
          const moveTouch = moveEvent.touches[0];
          const deltaY = moveTouch.clientY - startY;
          
          // 아래로 당기는 동작(deltaY > 0)이고 스크롤이 맨 위에 있을 때 방지
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
      }
    };

    document.addEventListener('touchstart', preventPullToRefresh, { passive: true });
    
    return () => {
      document.removeEventListener('touchstart', preventPullToRefresh);
    };
  }, [isMobile]);
  
  // 페이지와 푸터 간의 상호작용 로직 (마우스 커서 - 태블릿/데스크탑)
  useEffect(() => {
    // 모바일에서는 마우스 이벤트 비활성화
    if (isMobile) {
      return;
    }
    
    const footerElement = footerRef.current;
    if (!footerElement) return;

    const handleMouseMove = (e) => {
      // 화면 하단에서 100px 이내에 마우스가 있을 때
      const bottomThreshold = 100;
      const distanceFromBottom = window.innerHeight - e.clientY;
      
      if (distanceFromBottom <= bottomThreshold) {
        // 하단에 가까우면 푸터를 올림 (0% ~ 100%)
        const progress = Math.max(0, (bottomThreshold - distanceFromBottom) / bottomThreshold);
        const translateY = 100 - (progress * 100);
        
        // 부드러운 애니메이션을 위해 transition 적용
        footerElement.style.transition = 'transform 0.3s ease-out';
        footerElement.style.transform = `translateY(${translateY}%)`;
      } else {
        // 하단에서 멀어지면 푸터를 숨김
        footerElement.style.transition = 'transform 0.3s ease-out';
        footerElement.style.transform = 'translateY(100%)';
      }
    };

    // 마우스가 화면을 벗어날 때 푸터 숨김
    const handleMouseLeave = () => {
      if (footerElement) {
        footerElement.style.transition = 'transform 0.3s ease-out';
        footerElement.style.transform = 'translateY(100%)';
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isMobile]);

  return (
    <div className="coming-soon" ref={containerRef}>
      <GooeyBackgroundSVG />
      
      {/* ✨ 블록 조립하듯 간단하게 구성 */}
      <ComingSoonContent />
      <ComingSoonFooter ref={footerRef} />
    </div>
  );
};

export default ComingSoon;
