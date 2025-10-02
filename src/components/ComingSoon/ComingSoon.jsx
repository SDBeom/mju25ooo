import React from 'react';
import './ComingSoon.css';
import signatureLogo from '../../assets/Signature_logo.svg';

const ComingSoon = () => {
  return (
    <div className="coming-soon">
      <div className="coming-soon-container">
        <div className="coming-soon-content">
          <div className="logo-section">
            <img 
              src={signatureLogo} 
              alt="SD Logo" 
              className="signature-logo"
              onError={(e) => {
                console.log('Image failed to load:', e.target.src);
                e.target.style.display = 'none';
              }}
            />
          </div>
          
          <h1 className="coming-soon-title">
            Coming Soon
          </h1>
          
          <p className="coming-soon-description">
            점점점... 점점.. 점들이 모이는 중<br />
            곧 만날 수 있어요!!
          </p>
          
          
          <div className="coming-soon-footer">
            <p>© 2025 MJU MCD. All rights reserved.</p>
          </div>
        </div>
        
        <div className="background-pattern">
          <div className="pattern-circle circle-1"></div>
          <div className="pattern-circle circle-2"></div>
          <div className="pattern-circle circle-3"></div>
          <div className="pattern-circle circle-4"></div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;

