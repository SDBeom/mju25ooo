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
  
  // 초기 스크롤 위치를 맨 위로 설정
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, []);
  
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
