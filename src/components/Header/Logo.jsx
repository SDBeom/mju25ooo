import React from 'react';
import SignatureLogo from '../../assets/Signature_logo.webp';
import { ROUTE_PATHS } from '../../shared/constants';
import './Logo.css';

const Logo = () => {
  const navigateTo = (path) => {
    // SSR 안전 체크 및 전역 navigate 함수가 있으면 사용, 없으면 기본 방식 사용
    if (typeof window === 'undefined') return;
    
    if (window.__navigate) {
      window.__navigate(path);
    } else {
      window.history.pushState({}, '', path);
      // 커스텀 이벤트를 발생시켜 App.jsx에서 라우팅 업데이트
      window.dispatchEvent(new PopStateEvent('popstate'));
      // 추가로 커스텀 이벤트도 발생시켜 확실하게 처리
      window.dispatchEvent(new Event('locationchange'));
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    navigateTo(ROUTE_PATHS.MAIN);
  };

  return (
    <div className="logo-container" onClick={handleLogoClick}>
      <img
        src={SignatureLogo}
        alt="2025 명지대학교 졸업전시 영상애니메이션 전공 시그니처 로고"
      />
    </div>
  );
};

export default Logo;
