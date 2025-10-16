import React, { useState, useEffect, useRef } from 'react';
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
  const footerRef = useRef(null);
  
  console.log('App rendered, currentPage:', currentPage);

  // URL 기반 페이지 라우팅
  useEffect(() => {
    const updatePageFromUrl = () => {
      // GitHub Pages SPA 리다이렉트 처리
      const redirectPath = sessionStorage.getItem('spa-redirect-path');
      if (redirectPath) {
        sessionStorage.removeItem('spa-redirect-path');
        window.history.replaceState(null, '', redirectPath);
      }
      
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

  // 전역 마우스 호버 효과 (모든 페이지에서 작동)
  useEffect(() => {
    const footerElement = footerRef.current;
    if (!footerElement) return;

    const handleMouseMove = (e) => {
      // 화면 하단에서 100px 이내에 마우스가 있을 때
      const bottomThreshold = 100;
      const distanceFromBottom = window.innerHeight - e.clientY;
      
      if (distanceFromBottom <= bottomThreshold) {
        // 하단에 가까우면 푸터를 올림 (0% ~ 100%)
        const progress = Math.max(0, (bottomThreshold - distanceFromBottom) / bottomThreshold);
        const translateY = 100 - (progress * 100);
        
        // 부드러운 애니메이션을 위해 transition 적용
        footerElement.style.transition = 'transform 0.3s ease-out';
        footerElement.style.transform = `translateY(${translateY}%)`;
      } else {
        // 하단에서 멀어지면 푸터를 숨김
        footerElement.style.transition = 'transform 0.3s ease-out';
        footerElement.style.transform = 'translateY(100%)';
      }
    };

    // 마우스가 화면을 벗어날 때 푸터 숨김
    const handleMouseLeave = () => {
      if (footerElement) {
        footerElement.style.transition = 'transform 0.3s ease-out';
        footerElement.style.transform = 'translateY(100%)';
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
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
        <Footer ref={footerRef} />
      </ErrorBoundary>
    </BreakpointProvider>
  );
}

export default App;
