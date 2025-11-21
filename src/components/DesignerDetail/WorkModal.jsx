import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './DesignerShowcase.css';

const WorkModal = ({ isOpen, onClose, designerName, children, modalClassName = 'kim-love-modal' }) => {
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
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
    document.addEventListener('visibilitychange', onClose);
    
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
      document.removeEventListener('visibilitychange', onClose);
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.classList.remove('kim-modal-cursor-cross');

      document.body.classList.remove('is-modal-open');
      html.classList.remove('is-modal-open');
      root?.classList.remove('is-modal-open');

      document.body.style.top = '';

      const previousScrollY = Number(document.body.dataset.modalScrollY || '0');
      window.scrollTo(0, previousScrollY);
      delete document.body.dataset.modalScrollY;
    };
  }, [isOpen, onClose, modalClassName]);

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
    <div className="kim-modal-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="kim-modal-wrapper" onClick={handleWrapperClick}>
        <div className="kim-modal__topbar">
          <span className="kim-modal__topbar-name">{designerName}</span>
          <button
            className="kim-modal__close"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
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


