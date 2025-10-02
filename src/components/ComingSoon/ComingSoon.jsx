import React, { useState, useEffect } from 'react';
import './ComingSoon.css';
import signatureLogo from '../../assets/Signature_logo.svg';
import instagramLogo from '../../assets/instagram.svg';
import behanceLogo from '../../assets/behance.svg';
import youtubeLogo from '../../assets/youtube.svg';

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2024-11-12T00:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
          
          <div className="countdown-timer">
            <div className="countdown-item">
              <div className="countdown-number">{timeLeft.days}</div>
              <div className="countdown-label">Days</div>
            </div>
            <div className="countdown-separator">:</div>
            <div className="countdown-item">
              <div className="countdown-number">{timeLeft.hours}</div>
              <div className="countdown-label">Hours</div>
            </div>
            <div className="countdown-separator">:</div>
            <div className="countdown-item">
              <div className="countdown-number">{timeLeft.minutes}</div>
              <div className="countdown-label">Minutes</div>
            </div>
            <div className="countdown-separator">:</div>
            <div className="countdown-item">
              <div className="countdown-number">{timeLeft.seconds}</div>
              <div className="countdown-label">Seconds</div>
            </div>
          </div>
          
          <div className="social-links">
            <a href="https://www.instagram.com/mju_mcd_2025/" target="_blank" rel="noopener noreferrer" className="social-link">
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

