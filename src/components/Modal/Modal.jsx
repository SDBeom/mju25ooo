import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useBreakpointContext } from '../../contexts/BreakpointContext';
import { MODAL } from '../../shared/constants';
import { applyModalOpenState, removeModalOpenState, safeExecute } from '../../shared/utils';
import './Modal.css';

const Modal = ({ isOpen, onClose, designerName, modalClass, children }) => {
  const { deviceType } = useBreakpointContext();

  // 에러 처리: onClose가 없으면 경고
  if (!onClose) {
    console.warn('Modal: onClose prop is required');
  }

  // 키보드 이벤트 핸들러 (ESC 키로 닫기)
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === MODAL.KEYS.ESCAPE && isOpen && onClose) {
        safeExecute(() => onClose(), null);
      }
    },
    [isOpen, onClose]
  );

  // 모달 열릴 때 스크롤 잠금 및 헤더/푸터 숨김 처리
  useEffect(() => {
    if (!isOpen) {
      // 모달이 닫혀있을 때는 아무것도 하지 않음 (클린업 함수에서 처리)
      return;
    }

    // 모달이 열릴 때
    console.log('Modal is opening:', { isOpen, designerName, modalClass, hasChildren: !!children });
    const scrollY = window.scrollY;
    applyModalOpenState(scrollY);

    // 키보드 이벤트 리스너 추가
    window.addEventListener('keydown', handleKeyDown);

    // 클린업 함수 - 모달이 닫힐 때 스크롤 위치 복원
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // 모달이 닫힐 때 스크롤 위치 복원 (isOpen이 false로 변경될 때)
      removeModalOpenState();
    };
  }, [isOpen, handleKeyDown, designerName, modalClass, children]);

  // 오버레이 클릭 시 모달 닫기
  const handleOverlayClick = useCallback(
    (event) => {
      if (event.target === event.currentTarget && onClose) {
        safeExecute(() => onClose(), null);
      }
    },
    [onClose]
  );

  // Wrapper 클릭 이벤트 (모달 내용 클릭 시 닫히지 않도록)
  const handleWrapperClick = useCallback(
    (event) => {
      event.stopPropagation();
    },
    []
  );

  if (!isOpen) return null;

  return createPortal(
    <div
      className={`modal-overlay modal-overlay--${deviceType}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={handleOverlayClick}
      style={{ zIndex: 'var(--z-modal-overlay, 9999)' }} // 강제로 z-index 설정
    >
      <div className="modal-wrapper" onClick={handleWrapperClick}>
        {/* Topbar: 디자이너 이름과 X버튼 */}
        <div className="modal-topbar">
          <span className="modal-topbar__name" id="modal-title">
            {designerName || MODAL.DEFAULTS.DESIGNER_NAME}
          </span>
          <button
            className="modal-topbar__close"
            onClick={() => safeExecute(() => onClose?.(), null)}
            aria-label="모달 닫기"
            type="button"
          >
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Modal Content: 빈 흰 화면 (children으로 내용 추가) */}
        <div className={`${MODAL.CLASS_NAMES.MODAL_CONTENT} ${modalClass || ''}`.trim()}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;

