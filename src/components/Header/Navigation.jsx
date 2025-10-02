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

  const handleNavigationClick = (e, href) => {
    e.preventDefault();
    // TODO: Implement actual navigation logic
    console.log('Navigation clicked:', href);
  };

  return (
    <nav className={`nav-menu ${mobile ? 'nav-mobile' : ''}`}>
      {items.map((item) => (
        <a
          key={item.id}
          href={item.href}
          className="nav-link"
          onClick={(e) => handleNavigationClick(e, item.href)}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
};

export default Navigation;
