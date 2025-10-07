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
  
  // body/html 스크롤 비활성화 (ComingSoon 페이지일 때만)
  useEffect(() => {
    // body와 html의 overflow를 hidden으로 설정
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    
    return () => {
      // 컴포넌트 언마운트 시 원래대로 복원
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, []);
  
  // 모바일 pull-to-refresh 방지
  useEffect(() => {
    if (!isMobile) return;
    
    let touchStartY = 0;
    
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchMove = (e) => {
      const container = containerRef.current;
      if (!container) return;
      
      const touchY = e.touches[0].clientY;
      const touchDelta = touchY - touchStartY;
      
      // 스크롤이 맨 위에 있고, 아래로 당기는 동작(touchDelta > 0)일 때만 방지
      if (container.scrollTop === 0 && touchDelta > 0) {
        e.preventDefault();
      }
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
    }
    
    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
      }
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
