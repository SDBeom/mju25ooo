import React, { useState, useEffect } from 'react';
import './App.css';
import { BreakpointProvider } from './contexts/BreakpointContext';
import ComingSoon from './components/ComingSoon/ComingSoon';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Designer from './components/Designer/Designer';
import DesignerDetail from './components/DesignerDetail/DesignerDetail';
import Works from './components/Works/Works';
import DraggableGrid from './components/DraggableGrid/DraggableGrid';

function App() {
  const [currentPage, setCurrentPage] = useState('mainPage');
  
  console.log('App rendered, currentPage:', currentPage);

  // URL 기반 페이지 라우팅
  useEffect(() => {
    const updatePageFromUrl = () => {
      const fullPath = window.location.href;
      const pathWithoutQuery = fullPath.split('?')[0];
      const path = pathWithoutQuery.replace(window.location.origin, '') || '/';
      
      console.log('Current path:', path);
      
      // www.mju25ooo.com 도메인에서는 항상 커밍순 페이지만 표시
      if (window.location.hostname === 'www.mju25ooo.com' || window.location.hostname === 'mju25ooo.com') {
        setCurrentPage('comingsoon');
        return;
      }
      
      if (path.startsWith('/designer/') && path !== '/designer/') {
        setCurrentPage('designerDetail');
      } else {
        switch (path) {
          case '/main':
          case '/main/':
            setCurrentPage('mainPage');
            break;
          case '/comingsoon':
          case '/comingsoon/':
            setCurrentPage('comingsoon');
            break;
          case '/designer':
          case '/designer/':
            setCurrentPage('designer');
            break;
          case '/works':
          case '/works/':
            setCurrentPage('works');
            break;
          case '/':
          default:
            setCurrentPage('comingsoon');
            break;
        }
      }
    };

    updatePageFromUrl();
    window.addEventListener('popstate', updatePageFromUrl);
    return () => window.removeEventListener('popstate', updatePageFromUrl);
  }, []);


  return (
    <BreakpointProvider>
      <ErrorBoundary>
        {/* 전역 Header - 커밍순 페이지가 아닐 때만 표시 */}
        {currentPage !== 'comingsoon' && <Header currentPage={currentPage} />}

        {/* 디자이너 페이지 표시 */}
        {currentPage === 'designer' && <Designer />}

        {/* 디자이너 상세 페이지 표시 */}
        {currentPage === 'designerDetail' && <DesignerDetail />}

        {/* 작품 페이지 표시 */}
        {currentPage === 'works' && <Works />}

        {/* 메인화면 표시 (/main 경로일 때) - 드래그 가능한 그리드 */}
        {currentPage === 'mainPage' && <DraggableGrid />}

        {/* 커밍순 페이지 표시 */}
        {currentPage === 'comingsoon' && (
          <ComingSoon />
        )}

        {/* 전역 Footer - 모든 페이지에서 공통으로 사용 */}
        <Footer />
      </ErrorBoundary>
    </BreakpointProvider>
  );
}

export default App;
