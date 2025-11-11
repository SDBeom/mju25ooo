import React from 'react';
import MJULogo from '../../assets/MJU_Signature_logo_Horizontal.webp';
import OOOLogo from '../../assets/ooo_Signture_logo_Horizontal.webp';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <div className="footer-headlines-row">
            <div className="footer-headlines">
              <p className="headline-ko">
                {'2025 명지대학교 디자인학부\n영상애니메이션디자인전공 제 24회 졸업전시'}
              </p>
              <p className="headline-ko title">
                <span className="title-segment title-primary">「점점점 : 점(에서)</span>
                <span className="title-segment title-tablet-up"> 점(으로)</span>
                <br className="title-break title-break-mobile" />
                <span className="title-segment title-mobile">점(으로) </span>
                <br className="title-break title-break-tablet" />
                <span className="title-segment title-closing">점(점)」</span>
              </p>
            </div>
          </div>

          <div className="footer-meta-branding">
            <div className="footer-meta">
              <div className="meta-group">
                <span className="meta-label">기간 · 관람</span>
                <span className="meta-value">
                  2025년 11월 12일 ~ 11월 17일,
                  <br />
                  {' '}
                  매일 11:00 AM ~ 6:00 PM
                </span>
              </div>
              <div className="meta-group">
                <span className="meta-label">오프닝</span>
                <span className="meta-value">2025년 11월 12일(수) 18:00</span>
              </div>
              <div className="meta-group">
                <span className="meta-label">장소</span>
                <span className="meta-value">
                  인사동 마루아트센터 특별관
                  <br />
                  {' '}
                  서울 종로구 인사동길 35-4
                  <br />
                  {' '}
                  (35-4, Insadong-gil, Jongno-gu)
                </span>
              </div>
              <div className="meta-group">
                <span className="meta-label">Instagram</span>
                <span className="meta-value">
                  <a
                    href="https://www.instagram.com/mju_mcd_2025/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @mju_mcd_2025
                  </a>
                </span>
              </div>
            </div>

            <div className="footer-branding">
              <div className="footer-logos">
                <img src={MJULogo} alt="명지대학교 로고" className="footer-logo mju-logo" />
                <img src={OOOLogo} alt="OOO Signature Logo" className="footer-logo ooo-logo" />
              </div>
              <p className="exhibition-copy">
                {'© 2025 Myongji University\nMedia Communication & Animation Design'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;