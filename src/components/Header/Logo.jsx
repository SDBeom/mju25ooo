import React from 'react';
import SignatureLogo from '../../assets/Signature_logo.svg';
import './Logo.css';

const Logo = () => {
  return (
    <div className="logo-container">
      <img 
        src={SignatureLogo} 
        alt="2025 명지대학교 졸업전시 영상애니메이션 전공 시그니처 로고"
      />
    </div>
  );
};

export default Logo;
