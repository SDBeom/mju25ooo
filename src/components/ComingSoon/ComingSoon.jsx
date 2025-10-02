import React from 'react';
import './ComingSoon.css';
import signatureLogo from '../../assets/Signature_logo.svg';
import instagramLogo from '../../assets/instagram.svg';
import behanceLogo from '../../assets/behance.svg';
import youtubeLogo from '../../assets/youtube.svg';

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
          
          <div className="social-links">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <img src={instagramLogo} alt="Instagram" className="social-logo" />
            </a>
            <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="social-link">
              <img src={behanceLogo} alt="Behance" className="social-logo" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <img src={youtubeLogo} alt="YouTube" className="social-logo" />
            </a>
          </div>
          
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

