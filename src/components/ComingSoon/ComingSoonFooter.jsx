import React from 'react';
import { useBreakpointContext } from '../../contexts/BreakpointContext';
import './ComingSoonFooter.css';
import MJULogo from '../../assets/MJU_Signature_logo_Horizontal.svg';
import OOOLOGO from '../../assets/ooo_Signture_logo_Horizontal.svg';
import { EXHIBITION_INFO } from '../../shared/constants';

// React.forwardRef로 컴포넌트를 감싸고, ref를 전달받습니다.
const ComingSoonFooter = React.forwardRef((props, ref) => {
  const { isMobile } = useBreakpointContext();

  return (
    <footer className="coming-soon-footer" ref={ref}>
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
    </footer>
  );
});

// displayName 설정 (디버깅 시 유용)
ComingSoonFooter.displayName = 'ComingSoonFooter';

export default ComingSoonFooter;
