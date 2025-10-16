import React from 'react';
import './Footer.css';
import MJULogo from '../../assets/MJU_Signature_logo_Horizontal.svg';
import OOOLOGO from '../../assets/ooo_Signture_logo_Horizontal.svg';
import { EXHIBITION_INFO } from '../../shared/constants';

const Footer = React.forwardRef((props, ref) => {
  // 간단한 모바일 감지
  const isMobile = window.innerWidth < 768;

  return (
    <footer className="footer" ref={ref}>
      <div className="footer-content">
        {/* 전시 정보 섹션 */}
        <div className="exhibition-info">
          <div className="exhibition-detail">
            {isMobile ? (
              <>
                {EXHIBITION_INFO.DATE}<br />
                {EXHIBITION_INFO.TIME}<br />
                {EXHIBITION_INFO.ADDRESS}<br />
                {EXHIBITION_INFO.COPYRIGHT}
              </>
            ) : (
              <>
                {EXHIBITION_INFO.DATE} | {EXHIBITION_INFO.TIME}<br />
                {EXHIBITION_INFO.ADDRESS}<br />
                {EXHIBITION_INFO.COPYRIGHT}
              </>
            )}
          </div>
        </div>

        {/* 로고 섹션 */}
        <div className="footer-logos">
          <img 
            src={MJULogo} 
            alt="명지대학교 로고" 
            className="footer-logo mju-logo"
          />
          <img 
            src={OOOLOGO} 
            alt="OOO 로고" 
            className="footer-logo ooo-logo"
          />
        </div>

      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;