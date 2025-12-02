import React, { useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import './DesignerShowcase.css';

const WorkModal = ({ isOpen, onClose, designerName, children, modalClassName = 'kim-love-modal' }) => {
  const overlayRef = useRef(null);
  
  // CSS 변수에서 z-index 값 가져오기
  const getZIndex = (varName, fallback) => {
    if (typeof window === 'undefined') return fallback;
    const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    return value || fallback;
  };
  
  // onClose를 래핑하여 모달 닫을 때 즉시 오버레이 제거 및 헤더 복원
  const handleClose = useCallback(() => {
    // ref를 통한 오버레이 제거
    if (overlayRef.current) {
      overlayRef.current.style.pointerEvents = 'none';
      overlayRef.current.style.display = 'none';
      overlayRef.current.style.zIndex = '-1';
      overlayRef.current.style.visibility = 'hidden';
    }
    
    // 모든 오버레이 제거 (안전장치)
    const overlays = document.querySelectorAll('.kim-modal-overlay');
    overlays.forEach(overlay => {
      overlay.style.pointerEvents = 'none';
      overlay.style.display = 'none';
      overlay.style.zIndex = '-1';
      overlay.style.visibility = 'hidden';
    });
    
    // 헤더 즉시 복원 및 z-index 상향 (모바일 메뉴 버튼 클릭 가능하도록)
    const header = document.querySelector('.header');
    if (header) {
      header.style.pointerEvents = 'auto';
      header.style.zIndex = getZIndex('--z-header-above-modal', '10001');
      header.style.position = 'fixed'; // z-index가 작동하도록
      header.classList.remove('header--hidden');
      
      // 헤더 내부의 모든 버튼도 클릭 가능하도록
      const buttons = header.querySelectorAll('button');
      const buttonZIndex = getZIndex('--z-header-button', '10002');
      buttons.forEach(button => {
        button.style.pointerEvents = 'auto';
        button.style.zIndex = buttonZIndex;
        button.style.position = 'relative';
      });
      
      // 모바일 메뉴 버튼 특별 처리
      const mobileMenuToggle = header.querySelector('.mobile-menu-toggle');
      if (mobileMenuToggle) {
        mobileMenuToggle.style.pointerEvents = 'auto';
        mobileMenuToggle.style.zIndex = buttonZIndex;
        mobileMenuToggle.style.position = 'relative';
        mobileMenuToggle.style.cursor = 'pointer';
      }
    }
    
    // body 스타일 복원
    document.body.style.top = '';
    document.body.style.position = '';
    document.body.style.inset = '';
    document.body.style.width = '';
    
    // 원본 onClose 호출
    onClose();
  }, [onClose]);

  // 모달이 닫힐 때 즉시 오버레이 비활성화 및 헤더 복원
  useEffect(() => {
    if (!isOpen) {
      // 모달이 닫혔을 때 즉시 처리 (모바일에서도 확실히)
      const overlays = document.querySelectorAll('.kim-modal-overlay');
      overlays.forEach(overlay => {
        overlay.style.pointerEvents = 'none';
        overlay.style.display = 'none';
        overlay.style.zIndex = '-1';
        if (overlay.parentNode) {
          overlay.remove();
        }
      });
      
      // 헤더 즉시 복원 (모바일 메뉴 버튼 클릭 가능하도록)
      const header = document.querySelector('.header');
      if (header) {
        header.style.pointerEvents = 'auto';
        header.style.zIndex = '';
        header.classList.remove('header--hidden');
        
        const buttons = header.querySelectorAll('button');
        buttons.forEach(button => {
          button.style.pointerEvents = 'auto';
          button.style.zIndex = '';
          button.style.position = 'relative';
        });
        
        // 모바일 메뉴 버튼 특별 처리
        const mobileMenuToggle = header.querySelector('.mobile-menu-toggle');
        if (mobileMenuToggle) {
          mobileMenuToggle.style.pointerEvents = 'auto';
          mobileMenuToggle.style.zIndex = getZIndex('--z-header-button', '10002');
          mobileMenuToggle.style.position = 'relative';
        }
      }
      
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    const scrollY = window.scrollY;
    const html = document.documentElement;
    const root = document.getElementById('root');

    document.body.dataset.modalScrollY = String(scrollY);
    document.body.style.top = `-${scrollY}px`;

    document.body.classList.add('is-modal-open');
    html.classList.add('is-modal-open');
    root?.classList.add('is-modal-open');

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('visibilitychange', handleClose);
    
    const handleMouseMove = (event) => {
      const modal = document.querySelector(`.${modalClassName}`);
      if (!modal) return;
      const rect = modal.getBoundingClientRect();
      const isInside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      if (isInside) {
        document.body.classList.remove('kim-modal-cursor-cross');
      } else {
        document.body.classList.add('kim-modal-cursor-cross');
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleClose);
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.classList.remove('kim-modal-cursor-cross');

      document.body.classList.remove('is-modal-open');
      html.classList.remove('is-modal-open');
      root?.classList.remove('is-modal-open');

      // body 스타일 완전히 복원
      document.body.style.top = '';
      document.body.style.position = '';
      document.body.style.inset = '';
      document.body.style.width = '';

      const previousScrollY = Number(document.body.dataset.modalScrollY || '0');
      window.scrollTo(0, previousScrollY);
      delete document.body.dataset.modalScrollY;

      // 오버레이 완전히 제거 (모바일에서도 확실히)
      const overlays = document.querySelectorAll('.kim-modal-overlay');
      overlays.forEach(overlay => {
        overlay.style.pointerEvents = 'none';
        overlay.style.display = 'none';
        overlay.style.zIndex = '-1';
        if (overlay.parentNode) {
          overlay.remove();
        }
      });
      
      // 헤더 즉시 복원 (모바일 메뉴 버튼 클릭 가능하도록)
      const header = document.querySelector('.header');
      if (header) {
        header.style.pointerEvents = 'auto';
        header.style.zIndex = '';
        header.classList.remove('header--hidden');
        
        const buttons = header.querySelectorAll('button');
        buttons.forEach(button => {
          button.style.pointerEvents = 'auto';
          button.style.zIndex = '';
          button.style.position = 'relative';
        });
        
        // 모바일 메뉴 버튼 특별 처리
        const mobileMenuToggle = header.querySelector('.mobile-menu-toggle');
        if (mobileMenuToggle) {
          mobileMenuToggle.style.pointerEvents = 'auto';
          mobileMenuToggle.style.zIndex = getZIndex('--z-header-button', '10002');
          mobileMenuToggle.style.position = 'relative';
        }
      }
      
      // 추가 안전장치: 약간의 지연 후 다시 한번 확인 (모바일에서도)
      setTimeout(() => {
        const remainingOverlays = document.querySelectorAll('.kim-modal-overlay');
        remainingOverlays.forEach(overlay => {
          overlay.style.pointerEvents = 'none';
          overlay.style.display = 'none';
          overlay.style.zIndex = '-1';
          if (overlay.parentNode) {
            overlay.remove();
          }
        });
        
        const headerCheck = document.querySelector('.header');
        if (headerCheck) {
          headerCheck.style.pointerEvents = 'auto';
          headerCheck.style.zIndex = '';
          
          const mobileMenuToggle = headerCheck.querySelector('.mobile-menu-toggle');
          if (mobileMenuToggle) {
            mobileMenuToggle.style.pointerEvents = 'auto';
            mobileMenuToggle.style.zIndex = getZIndex('--z-header-button', '10002');
            mobileMenuToggle.style.position = 'relative';
          }
        }
      }, 200);
    };
  }, [isOpen, onClose, modalClassName, handleClose]);

  const handleWrapperClick = (event) => {
    if (!isOpen) {
      return;
    }

    // 버튼이나 클릭 가능한 요소를 클릭한 경우 이벤트 전파 허용
    const target = event.target;
    if (
      target.tagName === 'BUTTON' ||
      target.tagName === 'A' ||
      target.closest('button') ||
      target.closest('a') ||
      target.closest('[role="button"]')
    ) {
      return;
    }

    // 모달 내부 클릭 시 닫지 않음
    event.stopPropagation();
  };

  if (!isOpen) return null;

  return createPortal(
    <div 
      ref={overlayRef}
      className="kim-modal-overlay" 
      role="dialog" 
      aria-modal="true" 
      onClick={handleClose}
      style={{ zIndex: isOpen ? getZIndex('--z-modal-overlay', '9999') : -1 }}
    >
      <div className="kim-modal-wrapper" onClick={handleWrapperClick}>
        <div className="kim-modal__topbar">
          <span className="kim-modal__topbar-name">{designerName}</span>
          <button
            className="kim-modal__close"
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            aria-label="모달 닫기"
          >
            <span></span>
            <span></span>
          </button>
        </div>
        <div className={modalClassName}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default WorkModal;


