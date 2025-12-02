import React, { useState, useEffect, useRef } from 'react';
import { useBreakpointContext } from '../../contexts/BreakpointContext';
import { NAVIGATION_ITEMS } from '../../shared/constants';
import Logo from './Logo';
import Navigation from './Navigation';
import MobileMenu from './MobileMenu';
import './Header.css';

const Header = ({ currentPage = 'mainPage' }) => {
  const { deviceType, isMobile, isTablet, isDesktop } = useBreakpointContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lastScrollYRef = useRef(0);

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

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      // 모달이 열려있으면 스크롤 이벤트 무시
      if (isModalOpen) {
        return;
      }

      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;
      const scrollingDown = currentScrollY > lastScrollY;
      const threshold = 8;

      if (isMobileMenuOpen) {
        setIsHidden(false);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      if (scrollingDown && currentScrollY > 80) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY - threshold || currentScrollY <= 80) {
        setIsHidden(false);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen, isModalOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    setIsHidden(false);
  }, [isMobileMenuOpen]);

  // 모달이 열렸을 때 헤더 숨기기
  useEffect(() => {
    const checkModalOpen = () => {
      const modalOpen = document.body.classList.contains('is-modal-open');
      setIsModalOpen(modalOpen);
      if (modalOpen) {
        setIsHidden(true);
      } else {
        // 모달이 닫혔을 때 헤더 다시 표시
        setIsHidden(false);
      }
    };

    // 초기 확인
    checkModalOpen();

    // MutationObserver로 body 클래스 변경 감지
    const observer = new MutationObserver(checkModalOpen);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // 모드별 클래스명 결정
  const getHeaderMode = () => {
    switch (currentPage) {
      case 'mainPage':
        return 'header-default-mode'; // 메인페이지도 기본 모드 사용
      case 'designer':
      case 'designerDetail':
        return 'header-design-mode'; // 디자이너 모드
      case 'works':
        return 'header-works-mode'; // 작품 모드
      case 'about':
        return 'header-about-mode'; // About 모드
      default:
        return 'header-default-mode'; // 기본 모드
    }
  };

  const deviceClassName = deviceType ? `header--${deviceType}` : '';

  return (
    <header className={`header ${getHeaderMode()} ${deviceClassName} ${isHidden ? 'header--hidden' : ''}`}>
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
              className={`mobile-menu-toggle ${isMobileMenuOpen ? 'mobile-menu-toggle--active' : ''}`}
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

      {showMobileToggle && (
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          onClose={closeMobileMenu} 
          items={NAVIGATION_ITEMS} 
        />
      )}
    </header>
  );
};

export default Header;
