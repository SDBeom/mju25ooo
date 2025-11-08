import React, { useState, useEffect, useCallback } from 'react';
import './ComingSoonContent.css';
import signatureLogo from '../../assets/Signature_logo.svg';
import instagramLogo from '../../assets/instagram.svg';

const ComingSoonContent = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const TARGET_DATE = new Date('2025-11-12T00:00:00').getTime();
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const MS_PER_HOUR = 1000 * 60 * 60;
  const MS_PER_MINUTE = 1000 * 60;

  const updateTimer = useCallback(() => {
    const now = Date.now();
    const difference = TARGET_DATE - now;

    if (difference > 0) {
      const days = Math.floor(difference / MS_PER_DAY);
      const hours = Math.floor((difference % MS_PER_DAY) / MS_PER_HOUR);
      const minutes = Math.floor((difference % MS_PER_HOUR) / MS_PER_MINUTE);
      const seconds = Math.floor((difference % MS_PER_MINUTE) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    } else {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  }, [TARGET_DATE, MS_PER_DAY, MS_PER_HOUR, MS_PER_MINUTE]);

  useEffect(() => {
    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [updateTimer]);

  const handleImageError = useCallback((e) => {
    console.warn('Image failed to load:', e.target.src);
    e.target.style.display = 'none';
  }, []);

  return (
    <div className="coming-soon-main-content">
      <div className="coming-soon-left-section">
        <h1 className="coming-soon-title">
          Coming Soon!
        </h1>
        
        <div className="logo-section">
          <img 
            src={signatureLogo} 
            alt="2025 명지대학교 졸업전시 영상 애니메이션 디자인 전공 로고" 
            className="signature-logo"
            onError={handleImageError}
          />
        </div>
        
        <p className="coming-soon-description">
          점점점...점점.. 점들이<br />
          모이는 중<br />
          졸업작품이 곧 공개됩니다!
        </p>
      </div>
      
      <div className="coming-soon-right-section">
        <div className="countdown-timer">
          <div className="countdown-container">
            {[
              { value: timeLeft.days, label: 'Days' },
              { value: timeLeft.hours, label: 'Hours' },
              { value: timeLeft.minutes, label: 'Minutes' },
              { value: timeLeft.seconds, label: 'Seconds' }
            ].map((item, index) => (
              <React.Fragment key={item.label}>
                <div className="countdown-item">
                  <div className="countdown-number">{item.value.toString().padStart(2, '0')}</div>
                  <div className="countdown-label">{item.label}</div>
                </div>
                {index < 3 && <div className="countdown-separator">:</div>}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <div className="social-links">
          <a 
            href="https://www.instagram.com/mju_mcd_2025/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link" 
            aria-label="2025 명지대학교 졸업전시 인스타그램 - 영상 애니메이션 디자인 전공"
          >
            <img src={instagramLogo} alt="2025 명지대학교 졸업전시 인스타그램" className="social-logo" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonContent;

