import React from 'react';
import SignatureLogo from '../../assets/Signature_logo.svg';
import './Logo.css';

const Logo = () => {
  return (
    <div className="logo-container">
      <img 
        src={SignatureLogo} 
        alt="Signature Logo"
      />
    </div>
  );
};

export default Logo;
