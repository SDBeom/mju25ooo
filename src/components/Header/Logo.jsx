import React from 'react';
import { LOGO_CONFIG, COLORS } from '../../shared/constants';
import './Logo.css';

const Logo = () => {
  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < LOGO_CONFIG.DOT_COUNT; i++) {
      dots.push(<div key={i} className="dot"></div>);
    }
    return dots;
  };

  return (
    <div className="logo-container">
      <div className="ks-logo">
        <div className="dots">
          {renderDots()}
        </div>
        <div className="ks-text">{LOGO_CONFIG.TEXT}</div>
      </div>
    </div>
  );
};

export default Logo;
