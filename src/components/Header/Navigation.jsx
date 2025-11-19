import React from 'react';
import { motion } from 'framer-motion';
import { ERROR_MESSAGES } from '../../shared/constants';
import './Navigation.css';

const Navigation = ({ items = [], mobile = false, onItemClick }) => {
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
    e.stopPropagation();
    
    // 각 네비게이션 아이템에 따른 페이지 이동
    let targetPath = item.href;
    
    switch (item.id) {
      case 'home':
        targetPath = '/main';
        break;
      case 'about':
        targetPath = '/about';
        break;
      case 'works':
        targetPath = '/works';
        break;
      case 'designer':
        targetPath = '/designer';
        break;
      case 'archive':
        targetPath = '/archive';
        break;
      default:
        if (!targetPath) {
          console.warn(ERROR_MESSAGES.NAVIGATION_FAILED);
          return;
        }
    }
    
    // 페이지 이동 실행
    navigateTo(targetPath);
    
    // 모바일 메뉴에서 아이템 클릭 시 메뉴 닫기 (약간의 지연을 두어 네비게이션이 완료되도록)
    if (mobile && onItemClick) {
      setTimeout(() => {
        onItemClick();
      }, 100);
    }
  };

  // 모바일 메뉴 애니메이션 variants
  const perspectiveVariants = {
    initial: {
      opacity: 0,
      rotateX: 90,
      translateY: 40,
      translateX: -10,
    },
    enter: (i) => ({
      opacity: 1,
      rotateX: 0,
      translateY: 0,
      translateX: 0,
      transition: {
        duration: 0.6,
        delay: 0.3 + (i * 0.1),
        ease: [0.215, 0.61, 0.355, 1],
        opacity: { duration: 0.4 }
      }
    }),
    exit: {
      opacity: 0,
      transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
    }
  };

  return (
    <nav className={`nav-menu ${mobile ? 'nav-mobile' : ''}`}>
      {items.map((item, i) => (
        mobile ? (
          <motion.div
            key={item.id}
            className="nav-link-container"
            custom={i}
            variants={perspectiveVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <a
              href={item.href}
              className="nav-link"
              onClick={(e) => handleNavigationClick(e, item)}
            >
              {item.label}
            </a>
          </motion.div>
        ) : (
          <a
            key={item.id}
            href={item.href}
            className="nav-link"
            onClick={(e) => handleNavigationClick(e, item)}
          >
            {item.label}
          </a>
        )
      ))}
    </nav>
  );
};

export default Navigation;
