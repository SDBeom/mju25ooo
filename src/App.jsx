/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { BreakpointProvider } from './contexts/BreakpointContext';
import ComingSoon from './components/ComingSoon/ComingSoon';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainContent from './components/MainContent/MainContent';
import Designer from './components/Designer/Designer';
import DesignerDetail from './components/DesignerDetail/DesignerDetail';
import Works from './components/Works/Works';

const _resolveComingSoonState = () => {
  const preview = import.meta.env.VITE_PREVIEW_MODE;
  if (preview === 'main') return false;
  if (preview === 'comingsoon') return true;

  const envFlag = import.meta.env.VITE_ENABLE_COMING_SOON;
  if (typeof envFlag === 'string') {
    return envFlag.toLowerCase() === 'true';
  }

  // 메인 화면에서만 커밍순 페이지 표시
  return false;
};

function App() {
  const _showComingSoon = _resolveComingSoonState();
  const [currentPage, setCurrentPage] = useState('main');
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // URL 기반 페이지 라우팅
  useEffect(() => {
    try {
      const storedPath = sessionStorage.getItem('spa-redirect-path');
      if (storedPath) {
        sessionStorage.removeItem('spa-redirect-path');
        if (storedPath.startsWith('/')) {
          window.history.replaceState({}, '', storedPath);
        }
      }
    } catch {
      // ignore storage errors
    }

    const updatePageFromUrl = () => {
      // URL에서 경로만 추출 (쿼리 파라미터 제거)
      const fullPath = window.location.href;
      const pathWithoutQuery = fullPath.split('?')[0];
      const path = pathWithoutQuery.replace(window.location.origin, '') || '/';
      
      console.log('Current path:', path); // 디버깅용
      
      if (path.startsWith('/designer/') && path !== '/designer/') {
        console.log('Setting page to designerDetail'); // 디버깅용
        setCurrentPage('designerDetail');
      } else {
        switch (path) {
          case '/designer':
          case '/designer/':
            console.log('Setting page to designer'); // 디버깅용
            setCurrentPage('designer');
            break;
          case '/works':
          case '/works/':
            console.log('Setting page to works'); // 디버깅용
            setCurrentPage('works');
            break;
          case '/':
          default:
            console.log('Setting page to main'); // 디버깅용
            setCurrentPage('main');
            break;
        }
      }
    };

    // 초기 페이지 설정
    updatePageFromUrl();

    // 브라우저 뒤로가기/앞으로가기 처리
    const handlePopState = () => {
      updatePageFromUrl();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // 페이지 변경 시 URL 업데이트
  const navigateToPage = (page, id = null) => {
    setCurrentPage(page);
    if (page === 'designerDetail' && id) {
      window.history.pushState({}, '', `/designer/${id}`);
    } else {
      window.history.pushState({}, '', `/${page === 'main' ? '' : page}`);
    }
  };

  // 화면 크기 기반으로 드래그 범위 설정
  const getScreenBounds = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    return {
      minX: -screenWidth * 2, // 왼쪽으로 2배 화면 너비
      maxX: screenWidth * 2,  // 오른쪽으로 2배 화면 너비
      minY: -screenHeight * 2, // 위로 2배 화면 높이
      maxY: screenHeight * 2   // 아래로 2배 화면 높이
    };
  };

  // 좌표를 범위 내로 제한하고 무한 루프 처리
  const normalizePosition = useCallback((x, y) => {
    const bounds = getScreenBounds();

    // X 좌표 무한 루프 처리
    let normalizedX = x;
    if (x > bounds.maxX) {
      normalizedX = bounds.minX + (x - bounds.maxX);
    } else if (x < bounds.minX) {
      normalizedX = bounds.maxX - (bounds.minX - x);
    }

    // Y 좌표 무한 루프 처리
    let normalizedY = y;
    if (y > bounds.maxY) {
      normalizedY = bounds.minY + (y - bounds.maxY);
    } else if (y < bounds.minY) {
      normalizedY = bounds.maxY - (bounds.minY - y);
    }

    return { x: normalizedX, y: normalizedY };
  }, []);

  const handleMouseDown = (e) => {
    // 메인 페이지가 아닐 때는 드래그 비활성화
    if (currentPage !== 'main') {
      return;
    }

    // 헤더나 푸터 영역 클릭은 무시
    if (e.target.closest('.header') || e.target.closest('.footer')) {
      return;
    }
    
    // 링크나 버튼 클릭은 무시
    if (e.target.closest('a') || e.target.closest('button') || e.target.closest('nav')) {
      return;
    }

    // 스크롤 이벤트를 위한 예외 처리
    // 마우스 휠이나 스크롤바 영역에서 드래그 시작 방지
    if (e.target.closest('.position-indicator') || e.target.closest('.position-map')) {
      return;
    }
    
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;

    // 마우스 버튼이 눌려있지 않으면 드래그 해제
    if (!(e.buttons & 1)) {
      handleMouseUp();
      return;
    }

    const deltaX = (e.clientX - dragStart.x) * 2;
    const deltaY = (e.clientY - dragStart.y) * 2;

    const newX = position.x + deltaX;
    const newY = position.y + deltaY;

    // 드래그 중에도 무한 루프 처리
    const normalized = normalizePosition(newX, newY);
    
    setDragOffset({
      x: normalized.x - position.x,
      y: normalized.y - position.y
    });
  }, [isDragging, dragStart, position, normalizePosition]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;

    const newX = position.x + dragOffset.x;
    const newY = position.y + dragOffset.y;
    
    // 무한 루프 처리
    const normalized = normalizePosition(newX, newY);
    
    setPosition(normalized);
    setDragOffset({ x: 0, y: 0 });
    setIsDragging(false);
  }, [isDragging, position, dragOffset, normalizePosition]);

  const handleTouchStart = (e) => {
    // 메인 페이지가 아닐 때는 드래그 비활성화
    if (currentPage !== 'main') {
      return;
    }

    // 헤더나 푸터 영역 터치는 무시
    if (e.target.closest('.header') || e.target.closest('.footer')) {
      return;
    }

    // 링크나 버튼 터치는 무시
    if (e.target.closest('a') || e.target.closest('button') || e.target.closest('nav')) {
      return;
    }

    // 스크롤 이벤트를 위한 예외 처리
    // 위치 표시기 영역에서 터치 드래그 시작 방지
    if (e.target.closest('.position-indicator') || e.target.closest('.position-map')) {
      return;
    }

    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({
      x: touch.clientX,
      y: touch.clientY
    });
  };

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;

    // 터치가 없으면 드래그 해제
    if (e.touches.length === 0) {
      handleTouchEnd();
      return;
    }

    const touch = e.touches[0];
    const deltaX = (touch.clientX - dragStart.x) * 2;
    const deltaY = (touch.clientY - dragStart.y) * 2;

    const newX = position.x + deltaX;
    const newY = position.y + deltaY;

    // 드래그 중에도 무한 루프 처리
    const normalized = normalizePosition(newX, newY);
    
    setDragOffset({
      x: normalized.x - position.x,
      y: normalized.y - position.y
    });
  }, [isDragging, dragStart, position, normalizePosition]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;

    const newX = position.x + dragOffset.x;
    const newY = position.y + dragOffset.y;
    
    // 무한 루프 처리
    const normalized = normalizePosition(newX, newY);
    
    setPosition(normalized);
    setDragOffset({ x: 0, y: 0 });
    setIsDragging(false);
  }, [isDragging, position, dragOffset, normalizePosition]);

  // 강제 드래그 해제 함수
  const forceStopDragging = useCallback(() => {
    if (isDragging) {
      const newX = position.x + dragOffset.x;
      const newY = position.y + dragOffset.y;
      const normalized = normalizePosition(newX, newY);
      
      setPosition(normalized);
      setDragOffset({ x: 0, y: 0 });
      setIsDragging(false);
    }
  }, [isDragging, position, dragOffset, normalizePosition]);

  // 스크롤 이벤트 핸들러
  const handleWheel = useCallback(() => {
    // 드래그 중이어도 스크롤 허용
    if (isDragging) {
      // 드래그를 유지하면서 스크롤 허용
      return;
    }
  }, [isDragging]);

  const handleScroll = useCallback(() => {
    // 스크롤 이벤트 허용
    return;
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp, { passive: true });
      document.addEventListener('mouseleave', handleMouseUp, { passive: true });
      document.addEventListener('contextmenu', forceStopDragging, { passive: true });
      
      // 스크롤 이벤트 허용
      document.addEventListener('wheel', handleWheel, { passive: false });
      document.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseUp);
      document.removeEventListener('contextmenu', forceStopDragging);
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, forceStopDragging]);

  // ESC 키로 드래그 강제 해제
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isDragging) {
        forceStopDragging();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDragging, forceStopDragging]);

  const currentX = position.x + dragOffset.x;
  const currentY = position.y + dragOffset.y;

  // 현재 위치 계산 (정규화된 좌표)
  const normalizedCurrent = normalizePosition(currentX, currentY);
  const bounds = getScreenBounds();
  
  // 위치를 0-100% 범위로 변환
  const positionPercentX = ((normalizedCurrent.x - bounds.minX) / (bounds.maxX - bounds.minX)) * 100;
  const positionPercentY = ((normalizedCurrent.y - bounds.minY) / (bounds.maxY - bounds.minY)) * 100;

  // BreakpointProvider로 전체 앱 감싸기
  return (
    <BreakpointProvider>
      <ErrorBoundary>
        {/* 메인 페이지에서만 커밍순 페이지 표시 */}
        {currentPage === 'main' && <ComingSoon />}

        {/* 디자이너 페이지 표시 */}
        {currentPage === 'designer' && <Designer />}

        {/* 디자이너 상세 페이지 표시 */}
        {currentPage === 'designerDetail' && <DesignerDetail />}

        {/* 작품 페이지 표시 */}
        {currentPage === 'works' && <Works />}

        {/* 메인 페이지 표시 (currentPage가 다른 값일 때) */}
        {!['main', 'designer', 'designerDetail', 'works'].includes(currentPage) && (
          <div 
            className="app-wrapper"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
          >
            <Header />
            <MainContent position={normalizedCurrent} navigateToPage={navigateToPage} />
            <Footer />
            
            {/* 위치 표시기 */}
            <div className="position-indicator">
              <div className="position-info">
                <div className="coordinate">
                  <span className="label">X:</span>
                  <span className="value">{Math.round(normalizedCurrent.x)}px</span>
                  <span className="percent">({Math.round(positionPercentX)}%)</span>
                </div>
                <div className="coordinate">
                  <span className="label">Y:</span>
                  <span className="value">{Math.round(normalizedCurrent.y)}px</span>
                  <span className="percent">({Math.round(positionPercentY)}%)</span>
                </div>
              </div>
              <div className="position-map">
                <div
                  className="position-dot"
                  style={{
                    left: `${positionPercentX}%`,
                    top: `${positionPercentY}%`
                  }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </ErrorBoundary>
    </BreakpointProvider>
  );
}

export default App;
