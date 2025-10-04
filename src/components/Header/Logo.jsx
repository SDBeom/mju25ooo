import React from 'react';
import SignatureLogo from '../../assets/Signature_logo.svg';
import './Logo.css';

const Logo = () => {
  return (
    <div className="logo-container">
      <img 
        src={SignatureLogo} 
        alt="명지대학교 졸업전시 시그니처 로고 - 미디어커뮤니케이션디자인전공"
      />
    </div>
  );
};

export default Logo;
