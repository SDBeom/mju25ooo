import React, { useEffect, useRef } from 'react';
import { useBreakpointContext } from '../../contexts/BreakpointContext';
import './ComingSoon.css';

// ✨ 컴포넌트들을 조립
import ComingSoonContent from './ComingSoonContent';
import GooeyBackgroundSVG from './GooeyBackgroundSVG';

const ComingSoon = () => {
  const { isMobile } = useBreakpointContext();
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
  

  return (
    <div className="coming-soon" ref={containerRef}>
      <GooeyBackgroundSVG />
      
      {/* ✨ 블록 조립하듯 간단하게 구성 */}
      <ComingSoonContent />
    </div>
  );
};

export default ComingSoon;
