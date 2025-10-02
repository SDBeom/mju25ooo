import React from 'react';
import './ComingSoon.css';

const ComingSoon = () => {
  return (
    <div className="coming-soon">
      <div className="coming-soon-container">
        <div className="coming-soon-content">
          <div className="logo-section">
            <div className="logo-circle">
              <span className="logo-text">SD</span>
            </div>
          </div>
          
          <h1 className="coming-soon-title">
            Coming Soon
          </h1>
          
          <p className="coming-soon-description">
            새로운 웹사이트를 준비하고 있습니다.<br />
            곧 만나보실 수 있습니다.
          </p>
          
          <div className="coming-soon-features">
            <div className="feature-item">
              <div className="feature-icon">🎨</div>
              <span>Modern Design</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">⚡</div>
              <span>Fast Performance</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📱</div>
              <span>Responsive</span>
            </div>
          </div>
          
          <div className="coming-soon-footer">
            <p>© 2024 SD Portfolio. All rights reserved.</p>
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
