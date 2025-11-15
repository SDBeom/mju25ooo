import React, { useEffect, useState } from 'react';
import './App.css';
import { BreakpointProvider } from './contexts/BreakpointContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import DraggableGrid from './components/DraggableGrid/DraggableGrid';
import ComingSoonV2 from './components/ComingSoon/ComingSoonV2';
import ArchivePage from './components/Archive/ArchivePage';
import Works from './components/Works/Works';
import DesignerDetail from './components/DesignerDetail/DesignerDetail';
import Designer from './components/Designer/Designer';

const ROUTES = {
  '/main': {
    Component: DraggableGrid,
    headerMode: 'mainPage',
    containerVariant: 'grid',
    windowVariant: 'grid',
  },
  '/about': {
    Component: ComingSoonV2,
    headerMode: 'comingsoon',
    containerVariant: 'full',
    windowVariant: 'content',
  },
  '/works': {
    Component: Works,
    headerMode: 'works',
    containerVariant: 'content',
    windowVariant: 'content',
  },
  '/designer': {
    Component: Designer,
    headerMode: 'designer',
    containerVariant: 'content',
    windowVariant: 'content',
  },
  '/designer/detail': {
    Component: DesignerDetail,
    headerMode: 'designer',
    containerVariant: 'full',
    windowVariant: 'content',
  },
  '/archive': {
    Component: ArchivePage,
    headerMode: 'comingsoon',
    containerVariant: 'full',
    windowVariant: 'content',
  },
};

const resolvePath = (path) => {
  if (path === '/') {
    return '/main';
  }

  if (ROUTES[path]) {
    return path;
  }

  if (path.startsWith('/designer/') && path !== '/designer/') {
    return path;
  }

  return '/main';
};

function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    const initialPath = resolvePath(window.location.pathname);
    if (initialPath !== window.location.pathname) {
      window.history.replaceState({}, '', initialPath);
    }
    return initialPath;
  });

  useEffect(() => {
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
  }, []);

  const normalizedPath = ROUTES[currentPath]
    ? currentPath
    : currentPath.startsWith('/designer/') && currentPath !== '/designer'
      ? '/designer/detail'
      : '/main';

  const { Component: PageComponent, headerMode, containerVariant, windowVariant } =
    ROUTES[normalizedPath] || ROUTES['/main'];

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
          <main className={mainClasses.join(' ')}>
            <Header currentPage={headerMode} />
            <section className={mainWindowClasses.join(' ')} aria-labelledby="main-gallery-title">
              <div className={containerClasses.join(' ')}>
                <PageComponent key={currentPath} />
              </div>
            </section>
            <Footer />
          </main>
        </div>
      </ErrorBoundary>
    </BreakpointProvider>
  );
}

export default App;
