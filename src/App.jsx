import React, { useEffect, useState } from 'react';
import './App.css';
import { BreakpointProvider } from './contexts/BreakpointContext';
import { ROUTE_PATHS, ROUTE_CONFIG } from './shared/constants';
import { resolvePath, safeWindowAccess } from './shared/utils';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import DraggableGrid from './components/DraggableGrid/DraggableGrid';
import About from './components/About/About';
import ArchivePage from './components/Archive/ArchivePage';
import Works from './components/Works/Works';
import DesignerDetail from './components/DesignerDetail/DesignerDetail';
import Designer from './components/Designer/Designer';

// Component mapping - routes with components (One Source of Truth: config from constants)
const ROUTES = {
  [ROUTE_PATHS.MAIN]: {
    Component: DraggableGrid,
    ...ROUTE_CONFIG[ROUTE_PATHS.MAIN],
  },
  [ROUTE_PATHS.ABOUT]: {
    Component: About,
    ...ROUTE_CONFIG[ROUTE_PATHS.ABOUT],
  },
  [ROUTE_PATHS.WORKS]: {
    Component: Works,
    ...ROUTE_CONFIG[ROUTE_PATHS.WORKS],
  },
  [ROUTE_PATHS.DESIGNER]: {
    Component: Designer,
    ...ROUTE_CONFIG[ROUTE_PATHS.DESIGNER],
  },
  [ROUTE_PATHS.DESIGNER_DETAIL]: {
    Component: DesignerDetail,
    ...ROUTE_CONFIG[ROUTE_PATHS.DESIGNER_DETAIL],
  },
  [ROUTE_PATHS.ARCHIVE]: {
    Component: ArchivePage,
    ...ROUTE_CONFIG[ROUTE_PATHS.ARCHIVE],
  },
};

function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    return safeWindowAccess(
      (window) => {
    const initialPath = resolvePath(window.location.pathname);
    if (initialPath !== window.location.pathname) {
      window.history.replaceState({}, '', initialPath);
    }
    return initialPath;
      },
      ROUTE_PATHS.MAIN
    );
  });

  useEffect(() => {
    return safeWindowAccess((window) => {
    const handlePopState = () => {
      const nextPath = resolvePath(window.location.pathname);
      if (nextPath !== window.location.pathname) {
        window.history.replaceState({}, '', nextPath);
      }
      setCurrentPath(nextPath);
    };

    // popstate와 커스텀 locationchange 이벤트 모두 처리
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('locationchange', handlePopState);
    
    // Navigation 컴포넌트에서 경로 변경 시 호출할 수 있도록 전역 함수 등록
    window.__navigate = (path) => {
      window.history.pushState({}, '', path);
      handlePopState();
    };
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('locationchange', handlePopState);
      delete window.__navigate;
    };
    });
  }, []);

  // 페이지 전환 시 스크롤 위치 관리 및 레이아웃 재계산
  useEffect(() => {
    if (!safeWindowAccess(() => true, false)) return;
    
    // 스크롤 위치 저장/복원을 위한 키
    const SCROLL_POSITION_KEY = 'designer-list-scroll-position';
    const previousPath = safeWindowAccess(() => sessionStorage.getItem('previous-path'), '');
    
    // 디자이너 목록 페이지로 돌아올 때는 스크롤 위치 복원
    if (currentPath === ROUTE_PATHS.DESIGNER && previousPath?.startsWith('/designer/')) {
      const savedScrollPosition = safeWindowAccess(() => {
        const saved = sessionStorage.getItem(SCROLL_POSITION_KEY);
        return saved ? parseInt(saved, 10) : null;
      }, null);
      
      if (savedScrollPosition !== null) {
        // 약간의 지연을 두고 스크롤 위치 복원 (DOM이 렌더링된 후)
        setTimeout(() => {
          safeWindowAccess((window) => {
            window.scrollTo({ top: savedScrollPosition, left: 0, behavior: 'instant' });
            document.documentElement.scrollTop = savedScrollPosition;
            document.body.scrollTop = savedScrollPosition;
          });
          // 복원 후 저장된 위치 삭제
          safeWindowAccess(() => sessionStorage.removeItem(SCROLL_POSITION_KEY), null);
        }, 50);
      }
    } else if (currentPath?.startsWith('/designer/')) {
      // 디자이너 상세 페이지로 진입할 때 현재 스크롤 위치 저장
      safeWindowAccess((window) => {
        const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
        sessionStorage.setItem(SCROLL_POSITION_KEY, scrollPosition.toString());
        // 스크롤을 맨 위로 이동
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });
    } else {
      // 다른 페이지로 이동할 때는 스크롤을 맨 위로 이동
      safeWindowAccess((window) => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });
    }
    
    // 현재 경로를 이전 경로로 저장
    safeWindowAccess(() => sessionStorage.setItem('previous-path', currentPath), null);

    // main-page의 높이를 자동으로 재설정
    const mainPage = document.querySelector('.main-page');
    if (mainPage instanceof HTMLElement) {
      // 인라인 스타일로 설정된 높이 제거
      mainPage.style.height = '';
      mainPage.style.minHeight = '';
    }

    // 레이아웃 재계산을 위해 약간의 지연 후 실행
    const timeoutId = setTimeout(() => {
      // 컨테이너 높이 재계산 강제 (리플로우 발생)
      const containers = document.querySelectorAll('.main-window__container, .main-window, .main-page, .app-layout');
      containers.forEach((container) => {
        if (container instanceof HTMLElement) {
          // 인라인 스타일로 설정된 높이 제거 (main-page 제외)
          if (!container.classList.contains('main-page')) {
            container.style.height = '';
            container.style.minHeight = '';
          }
          // 강제로 리플로우 발생시켜 레이아웃 재계산
          void container.offsetHeight;
        }
      });

      // 푸터 위치도 재계산
      const footer = document.querySelector('footer');
      if (footer) {
        footer.style.height = '';
        footer.style.minHeight = '';
        void footer.offsetHeight;
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [currentPath]);

  const normalizedPath = ROUTES[currentPath]
    ? currentPath
    : currentPath.startsWith('/designer/') && currentPath !== ROUTE_PATHS.DESIGNER
      ? ROUTE_PATHS.DESIGNER_DETAIL
      : ROUTE_PATHS.MAIN;

  const { Component: PageComponent, headerMode, containerVariant, windowVariant } =
    ROUTES[normalizedPath] || ROUTES[ROUTE_PATHS.MAIN];

  const mainWindowClasses = ['main-window'];
  if (windowVariant === 'grid') {
    mainWindowClasses.push('main-window--grid');
  } else {
    mainWindowClasses.push('main-window--content');
  }

  const containerClasses = ['main-window__container'];
  if (containerVariant === 'grid') {
    containerClasses.push('main-window__container--grid');
  } else if (containerVariant === 'full') {
    containerClasses.push('main-window__container--full');
  } else {
    containerClasses.push('main-window__container--content');
  }

  const mainClasses = ['main-page'];
  if (windowVariant === 'grid') {
    mainClasses.push('main-page--grid');
  }
  return (
    <BreakpointProvider>
      <ErrorBoundary>
        <div className="app-layout">
          <Header currentPage={headerMode} />
          <main className={mainClasses.join(' ')}>
            <section className={mainWindowClasses.join(' ')} aria-labelledby="main-gallery-title">
              <div className={containerClasses.join(' ')}>
                <PageComponent key={currentPath} />
              </div>
            </section>
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    </BreakpointProvider>
  );
}

export default App;
