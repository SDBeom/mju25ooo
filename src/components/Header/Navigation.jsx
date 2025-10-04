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

  const handleNavigationClick = (e, item) => {
    e.preventDefault();
    
    // 각 네비게이션 아이템에 따른 페이지 이동
    switch (item.id) {
      case 'home':
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
        break;
      case 'about':
        // About 페이지는 아직 구현되지 않음
        console.log('About page - coming soon');
        break;
      case 'works':
        window.history.pushState({}, '', '/works');
        window.dispatchEvent(new PopStateEvent('popstate'));
        break;
      case 'designer':
        window.history.pushState({}, '', '/designer');
        window.dispatchEvent(new PopStateEvent('popstate'));
        break;
      case 'archive':
        // Archive 페이지는 아직 구현되지 않음
        console.log('Archive page - coming soon');
        break;
      default:
        console.log('Navigation clicked:', item.href);
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
