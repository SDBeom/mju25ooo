import React, { useEffect, useRef } from 'react';
import { useBreakpointContext } from '../../contexts/BreakpointContext';
import MJULogo from '../../assets/MJU_Signature_logo_Horizontal.svg';
import OOOLogo from '../../assets/ooo_Signture_logo_Horizontal.svg';
import './Footer.css';

const Footer = () => {
  const { isMobile } = useBreakpointContext();
  const footerRef = useRef(null);

  // 데스크톱/태블릿에서 마우스 호버 효과
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
    <footer className="footer" ref={footerRef}>
      <div className="footer-content">
        <div className="exhibition-info">
          <div className="exhibition-detail">
            <div className="exhibition-title">명지대학교 영상애니메이션 전공 졸업전시</div>
            <div className="exhibition-date">2025.11.12 - 11.17</div>
            <div className="exhibition-copyright">© 2025 MJU MCD</div>
          </div>
        </div>
        <div className="footer-logos">
          <img 
            src={MJULogo} 
            alt="MJU Signature Logo" 
            className="footer-logo mju-logo"
          />
          <img 
            src={OOOLogo} 
            alt="OOO Signature Logo" 
            className="footer-logo ooo-logo"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;