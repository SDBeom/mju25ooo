import React from 'react';
import './ComingSoonContent.css';
import signatureLogo from '../../assets/Signature_logo.svg';

const ComingSoonContent = () => {
  return (
    <div className="coming-soon-main-content coming-soon-main-content--simple">
      <div className="coming-soon-left-section">
        <h1 className="coming-soon-title">
          <span>About 페이지는</span>
          <br />
          <span>준비 중입니다</span>
        </h1>

        <div className="logo-section">
          <img
            src={signatureLogo}
            alt="2025 명지대학교 졸업전시 영상애니메이션 전공 로고"
            className="signature-logo"
          />
        </div>
      </div>
    </div>
  );
};

export default ComingSoonContent;

