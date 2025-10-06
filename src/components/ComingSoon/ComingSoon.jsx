import React, { useState, useEffect, useCallback } from 'react';
import './ComingSoon.css';
import '../Footer/Footer.css';
import signatureLogo from '../../assets/Signature_logo.svg';
import instagramLogo from '../../assets/instagram.svg';
import behanceLogo from '../../assets/behance.svg';
import youtubeLogo from '../../assets/youtube.svg';
import MJULogo from '../../assets/MJU_Signature_logo_Horizontal.svg';
import OOOLOGO from '../../assets/ooo_Signture_logo_Horizontal.svg';
import GooeyBackgroundSVG from './GooeyBackgroundSVG';
import { EXHIBITION_INFO } from '../../shared/constants';

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
  }, [TARGET_DATE, MS_PER_DAY, MS_PER_HOUR, MS_PER_MINUTE]);

  useEffect(() => {
    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [updateTimer]);

  // 휠 이벤트로 푸터가 서서히 올라오는 효과 (데스크톱/태블릿만)
  useEffect(() => {
    let wheelDelta = 0;
    const maxDelta = 800; // 휠을 800만큼 돌리면 푸터가 완전히 올라옴
    
    const handleWheel = (e) => {
      // 모바일에서는 휠 이벤트 비활성화
      if (window.innerWidth <= 768) {
        return;
      }
      
      e.preventDefault(); // 기본 스크롤 방지
      
      const footer = document.querySelector('.coming-soon-footer');
      if (footer) {
        // 휠 델타값 누적
        wheelDelta += e.deltaY;
        wheelDelta = Math.max(0, Math.min(wheelDelta, maxDelta)); // 0과 maxDelta 사이로 제한
        
        // 휠 델타값에 따라 푸터의 translateY 값을 계산
        const progress = wheelDelta / maxDelta;
        const translateY = 100 - (progress * 100); // 100%에서 0%로 변화
        
        footer.style.transform = `translateY(${translateY}%)`;
      }
    };

    // 휠 이벤트 리스너 추가
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleImageError = useCallback((e) => {
    console.warn('Image failed to load:', e.target.src);
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
                alt="2025 명지대학교 졸업전시 영상 애니메이션 다지안 전공 로고" 
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
                { href: 'https://www.instagram.com/mju_mcd_2025/', src: instagramLogo, alt: '2025 명지대학교 졸업전시 인스타그램 - 영상 애니메이션 다지안 전공' },
                { href: 'https://behance.net', src: behanceLogo, alt: '2025 명지대학교 졸업전시 비핸스 - 영상 애니메이션 다지안 전공 포트폴리오' },
                { href: 'https://youtube.com', src: youtubeLogo, alt: '2025 명지대학교 졸업전시 유튜브 - 영상 애니메이션 다지안 전공 졸업작품 소개 영상' }
              ].map(({ href, src, alt }) => (
                <a key={alt} href={href} target="_blank" rel="noopener noreferrer" className="social-link" aria-label={`${alt}로 이동`}>
                  <img src={src} alt={alt} className="social-logo" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <footer className="coming-soon-footer">
        <div className="footer-content">
          {/* 전시 정보 및 저작권 */}
          <div className="exhibition-info">
            <div className="exhibition-detail">
              {EXHIBITION_INFO.DATE} | {EXHIBITION_INFO.TIME}
            </div>
            <div className="exhibition-detail">
              {EXHIBITION_INFO.ADDRESS}
            </div>
            <div className="exhibition-detail copyright-text">
              {EXHIBITION_INFO.COPYRIGHT}
            </div>
          </div>

          {/* 로고 섹션 */}
          <div className="footer-logos">
            <img 
              src={MJULogo} 
              alt="명지대학교 로고" 
              className="footer-logo mju-logo"
            />
            <img 
              src={OOOLOGO} 
              alt="OOO 로고" 
              className="footer-logo ooo-logo"
            />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ComingSoon;

