import React, { useState, useEffect } from 'react';
import './App.css';
import { BreakpointProvider } from './contexts/BreakpointContext';
import ComingSoon from './components/ComingSoon/ComingSoon';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import DialRotation from './components/DialRotation/DialRotation';
import Designer from './components/Designer/Designer';
import DesignerDetail from './components/DesignerDetail/DesignerDetail';
import Works from './components/Works/Works';

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
        {/* 디자이너 페이지 표시 */}
        {currentPage === 'designer' && <Designer />}

        {/* 디자이너 상세 페이지 표시 */}
        {currentPage === 'designerDetail' && <DesignerDetail />}

        {/* 작품 페이지 표시 */}
        {currentPage === 'works' && <Works />}

        {/* 커밍순 페이지 표시 (루트 경로에서 표시) */}
        {currentPage === 'comingsoon' && (
          <ComingSoon />
        )}

        {/* 메인화면 표시 (/main 경로일 때) - 회전 다이얼 포함 */}
        {currentPage === 'mainPage' && (
          <div className="app-wrapper">
            <Header />
            <main className="main-screen">
              <div className="main-content">
                <DialRotation />
              </div>
            </main>
          </div>
        )}

        {/* 전역 Footer - 모든 페이지에서 공통으로 사용 */}
        <Footer />
      </ErrorBoundary>
    </BreakpointProvider>
  );
}

export default App;
