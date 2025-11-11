import React, { useState, useEffect } from 'react';
import { useBreakpointContext } from '../../contexts/BreakpointContext';
import { NAVIGATION_ITEMS } from '../../shared/constants';
import Logo from './Logo';
import Navigation from './Navigation';
import './Header.css';

const Header = ({ currentPage = 'mainPage' }) => {
  const { deviceType, isMobile, isTablet, isDesktop } = useBreakpointContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const showInlineNavigation = isDesktop || isTablet;
  const showMobileToggle = isMobile;

  useEffect(() => {
    if (!showMobileToggle && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [showMobileToggle, isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // 모드별 클래스명 결정
  const getHeaderMode = () => {
    switch (currentPage) {
      case 'mainPage':
        return 'header-grid-mode'; // DraggableGrid 모드
      case 'designer':
      case 'designerDetail':
        return 'header-design-mode'; // 디자이너 모드
      case 'works':
        return 'header-works-mode'; // 작품 모드
      case 'comingsoon':
        return 'header-comingsoon-mode'; // 커밍순 모드
      default:
        return 'header-default-mode'; // 기본 모드
    }
  };

  const deviceClassName = deviceType ? `header--${deviceType}` : '';

  return (
    <header className={`header ${getHeaderMode()} ${deviceClassName}`}>
      <div className="header-content">
        <div className="header-section header-section--left">
          <Logo />
        </div>

        <div className="header-section header-section--center">
          {showInlineNavigation && <Navigation items={NAVIGATION_ITEMS} />}
        </div>

        <div className="header-section header-section--right">
          {showMobileToggle && (
            <button
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          )}
        </div>
      </div>

      {showMobileToggle && isMobileMenuOpen && (
        <div className="mobile-menu">
          <Navigation items={NAVIGATION_ITEMS} mobile />
        </div>
      )}
    </header>
  );
};

export default Header;
