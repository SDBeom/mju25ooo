import React from 'react';
import { ERROR_MESSAGES } from '../../shared/constants';
import './Navigation.css';

const Navigation = ({ items = [], mobile = false }) => {
  if (!Array.isArray(items) || items.length === 0) {
    return (
      <nav className={`nav-menu ${mobile ? 'nav-mobile' : ''} nav-error`}>
        <span>Navigation unavailable</span>
      </nav>
    );
  }

  const navigateTo = (path) => {
    // 전역 navigate 함수가 있으면 사용, 없으면 기본 방식 사용
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

  const handleNavigationClick = (e, item) => {
    e.preventDefault();
    
    // 각 네비게이션 아이템에 따른 페이지 이동
    switch (item.id) {
      case 'home':
        navigateTo('/main');
        break;
      case 'about':
        navigateTo('/about');
        break;
      case 'works':
        navigateTo('/works');
        break;
      case 'designer':
        navigateTo('/designer');
        break;
      case 'archive':
        navigateTo('/archive');
        break;
      default:
        if (item.href) {
          navigateTo(item.href);
        } else {
          console.warn(ERROR_MESSAGES.NAVIGATION_FAILED);
        }
    }
  };

  return (
    <nav className={`nav-menu ${mobile ? 'nav-mobile' : ''}`}>
      {items.map((item) => (
        <a
          key={item.id}
          href={item.href}
          className="nav-link"
          onClick={(e) => handleNavigationClick(e, item)}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
};

export default Navigation;
