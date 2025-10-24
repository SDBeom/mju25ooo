import React, { useState } from 'react';
import { useBreakpointContext } from '../../contexts/BreakpointContext';
import { NAVIGATION_ITEMS } from '../../shared/constants';
import Logo from './Logo';
import Navigation from './Navigation';
import './Header.css';

const Header = ({ currentPage = 'mainPage' }) => {
  const { isDesktop } = useBreakpointContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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

  return (
    <header className={`header ${getHeaderMode()}`}>
      <div className="header-content">
        <Logo />
        
        {/* Desktop: 항상 표시 */}
        {isDesktop && <Navigation items={NAVIGATION_ITEMS} />}
        
        {/* Mobile/Tablet: 햄버거 메뉴 */}
        {!isDesktop && (
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
      
      {/* Mobile/Tablet 메뉴 */}
      {!isDesktop && isMobileMenuOpen && (
        <div className="mobile-menu">
          <Navigation items={NAVIGATION_ITEMS} mobile />
        </div>
      )}
    </header>
  );
};

export default Header;
