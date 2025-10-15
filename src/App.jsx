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
          case '/main':
          case '/main/':
            console.log('Setting page to main'); // 디버깅용
            setCurrentPage('main');
            break;
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




  // BreakpointProvider로 전체 앱 감싸기
  return (
    <BreakpointProvider>
      <ErrorBoundary>
        {/* 디자이너 페이지 표시 */}
        {currentPage === 'designer' && <Designer />}

        {/* 디자이너 상세 페이지 표시 */}
        {currentPage === 'designerDetail' && <DesignerDetail />}

        {/* 작품 페이지 표시 */}
        {currentPage === 'works' && <Works />}

        {/* 커밍순 페이지 표시 (메인 페이지일 때) */}
        {(currentPage === 'main' || !['designer', 'designerDetail', 'works'].includes(currentPage)) && (
          <ComingSoon />
        )}
      </ErrorBoundary>
    </BreakpointProvider>
  );
}

export default App;
