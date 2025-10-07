import React, { useState } from 'react';
import { useBreakpointContext } from '../../contexts/BreakpointContext';
import { NAVIGATION_ITEMS } from '../../shared/constants';
import { Container } from '../DesignSystem';
import Logo from './Logo';
import Navigation from './Navigation';
import './Header.css';

const Header = () => {
  const { isDesktop } = useBreakpointContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <Container maxWidth="large" padding="medium">
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
      </Container>
    </header>
  );
};

export default Header;
