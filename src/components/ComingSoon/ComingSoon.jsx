import React, { useState, useEffect, useCallback } from 'react';
import './ComingSoon.css';
import signatureLogo from '../../assets/Signature_logo.svg';
import instagramLogo from '../../assets/instagram.svg';
import behanceLogo from '../../assets/behance.svg';
import youtubeLogo from '../../assets/youtube.svg';
import GooeyBackgroundSVG from './GooeyBackgroundSVG';

const ComingSoon = () => {
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
  }, []);

  useEffect(() => {
    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [updateTimer]);

  const handleImageError = useCallback((e) => {
    e.target.style.display = 'none';
  }, []);

  return (
    <div className="coming-soon">
      {/* 배경 레이어를 컨테이너 바깥이 아니라 바로 아래 첫 자식으로 */}
      <GooeyBackgroundSVG />
      
      <div className="coming-soon-container">
        <div className="main-content">
          <div className="left-section">
            <div className="logo-section">
              <img 
                src={signatureLogo} 
                alt="명지대학교 졸업전시 2025 로고 - 미디어커뮤니케이션디자인전공 영상 애니메이션 졸업작품전" 
                className="signature-logo"
                onError={handleImageError}
              />
            </div>
            
            <h1 className="coming-soon-title">
              Coming Soon!
            </h1>
            
            <p className="coming-soon-description">
              점점점...점점.. 점들이<br />
              모이는 중<br />
              졸업작품이 곧 공개됩니다!
            </p>
          </div>
          
          <div className="right-section">
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
              {[
                { href: 'https://www.instagram.com/mju_mcd_2025/', src: instagramLogo, alt: '명지대학교 졸업전시 인스타그램 - 미디어커뮤니케이션디자인전공 영상 애니메이션 졸업작품' },
                { href: 'https://behance.net', src: behanceLogo, alt: '명지대학교 졸업전시 비핸스 - 미디어커뮤니케이션디자인전공 영상 애니메이션 포트폴리오' },
                { href: 'https://youtube.com', src: youtubeLogo, alt: '명지대학교 졸업전시 유튜브 - 미디어커뮤니케이션디자인전공 졸업작품 소개 영상' }
              ].map(({ href, src, alt }) => (
                <a key={alt} href={href} target="_blank" rel="noopener noreferrer" className="social-link" aria-label={`${alt}로 이동`}>
                  <img src={src} alt={alt} className="social-logo" />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <footer className="coming-soon-footer">
          <p>© 2025 명지대학교 미디어커뮤니케이션디자인전공. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default ComingSoon;

