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
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
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
