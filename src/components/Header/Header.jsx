import React, { useState } from 'react';
import { NAVIGATION_ITEMS } from '../../shared/constants';
import { Container, Typography } from '../DesignSystem';
import Logo from './Logo';
import Navigation from './Navigation';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <Container maxWidth="large" padding="medium">
        <div className="header-content">
          <Logo />
          <Navigation items={NAVIGATION_ITEMS} />
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <Navigation items={NAVIGATION_ITEMS} mobile />
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
