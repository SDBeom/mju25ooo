import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import Navigation from './Navigation';
import './MobileMenu.css';

const MobileMenu = ({ isOpen, onClose, items }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // 메뉴가 열려있을 때 body 스크롤 막기
      document.body.style.overflow = 'hidden';
      // main-window는 숨기지 않고 그대로 보이도록 유지
    } else {
      // 메뉴가 닫혔을 때 원래대로 복원
      document.body.style.overflow = '';
    }

    return () => {
      // cleanup
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // 메뉴 애니메이션 variants - 버튼 위치(오른쪽 상단)에서 시작해서 전체 화면으로 확장
  // 헤더 높이를 존중하여 헤더 아래에서 시작
  const menuVariants = {
    closed: {
      width: '36px',
      height: '36px',
      top: '12px', // 헤더 내부 버튼 위치 (헤더 높이 60px, 버튼 높이 36px, 중앙 정렬: (60-36)/2 = 12px)
      right: 'var(--header-horizontal-padding, 16px)', // 헤더 패딩 (오른쪽)
      left: 'auto', // 명시적으로 auto 설정
      bottom: 'auto',
      borderRadius: '18px',
      opacity: 0,
      pointerEvents: 'none',
      transformOrigin: 'top right',
      transition: { 
        duration: 0.75, 
        delay: 0.35, 
        type: "tween", 
        ease: [0.76, 0, 0.24, 1] 
      }
    },
    open: {
      width: '100vw',
      height: 'calc(100vh - var(--header-height))',
      top: 'var(--header-height)',
      right: 0,
      left: 'auto', // 항상 auto로 유지하여 오른쪽 기준으로만 동작
      bottom: 0,
      borderRadius: 0,
      opacity: 1,
      pointerEvents: 'auto',
      transformOrigin: 'top right',
      transition: { 
        duration: 0.75, 
        type: "tween", 
        ease: [0.76, 0, 0.24, 1] 
      }
    }
  };

  return (
    <motion.div 
      ref={menuRef}
      className="mobile-menu" 
      variants={menuVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      onClick={(e) => {
        // 메뉴 외부 클릭 시 닫기
        if (e.target === e.currentTarget && isOpen) {
          onClose();
        }
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Navigation items={items} mobile onItemClick={onClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MobileMenu;

