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
  
  // 페이지와 푸터 간의 상호작용 로직 (휠 이벤트 - 태블릿/데스크탑만)
  useEffect(() => {
    // 모바일에서만 휠 이벤트 비활성화
    if (isMobile) {
      return;
    }
    
    const footerElement = footerRef.current;
    if (!footerElement) return;

    let wheelDelta = 0;
    const maxDelta = 800;
    
    const handleWheel = (e) => {
      // 실제 스크롤 가능한 영역 체크
      const hasScroll = document.documentElement.scrollHeight > window.innerHeight;
      
      // 스크롤이 있으면 일반 스크롤 허용
      if (hasScroll) {
        return;
      }
      
      e.preventDefault();
      
      wheelDelta += e.deltaY;
      wheelDelta = Math.max(0, Math.min(wheelDelta, maxDelta));
      
      const progress = wheelDelta / maxDelta;
      const translateY = 100 - (progress * 100);
      
      footerElement.style.transform = `translateY(${translateY}%)`;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
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
