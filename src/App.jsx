import React, { useState, useEffect } from 'react';
import './App.css';
import { BreakpointProvider } from './contexts/BreakpointContext';
import ComingSoonV2 from './components/ComingSoon/ComingSoonV2';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Designer from './components/Designer/Designer';
import DesignerDetail from './components/DesignerDetail/DesignerDetail';
import Works from './components/Works/Works';
import DraggableGrid from './components/DraggableGrid/DraggableGrid';

function App() {
  const [currentPage, setCurrentPage] = useState('comingsoon');
  const footerRef = useRef(null);
  
  console.log('App rendered, currentPage:', currentPage);

  // URL 기반 페이지 라우팅
  useEffect(() => {
    const updatePageFromUrl = () => {
      const fullPath = window.location.href;
      const pathWithoutQuery = fullPath.split('?')[0];
      const path = pathWithoutQuery.replace(window.location.origin, '') || '/';
      
      console.log('Current path:', path);
      
      // www.mju25ooo.com 도메인에서는 특정 경로만 허용
      if (window.location.hostname === 'www.mju25ooo.com' || window.location.hostname === 'mju25ooo.com') {
        // 디자이너 페이지는 미리보기 허용
        if (path.startsWith('/designer')) {
          if (path.startsWith('/designer/') && path !== '/designer/') {
            setCurrentPage('designerDetail');
          } else {
            setCurrentPage('designer');
          }
          return;
        }
        // 나머지는 모두 커밍순 페이지
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
          case '/invitation':
          case '/invitation/':
            setCurrentPage('invitation');
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

  // 전역 마우스 호버 효과 (데스크톱/태블릿에서만 작동)
  useEffect(() => {
    const footerElement = footerRef.current;
    if (!footerElement) return;

    // 모바일에서는 마우스 이벤트 비활성화
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      // 모바일에서는 푸터를 일반 문서 흐름에 따라 표시
      footerElement.style.transition = 'none';
      footerElement.style.transform = 'translateY(0%)';
      return;
    }

    const handleMouseMove = (e) => {
      // 마우스가 푸터 영역에 있을 때
      const footerRect = footerElement.getBoundingClientRect();
      const mouseY = e.clientY;
      
      // 푸터 영역과 마우스가 겹치거나, 화면 하단 50px 이내에 있을 때
      const isNearFooter = mouseY >= footerRect.top - 50 || mouseY >= window.innerHeight - 50;
      
      if (isNearFooter) {
        // 푸터를 100% 올림
        footerElement.style.transition = 'transform 0.3s ease-out';
        footerElement.style.transform = 'translateY(0%)';
      } else {
        // 푸터를 숨김
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
        {/* 전역 Header - 커밍순 페이지가 아닐 때만 표시 */}
        {currentPage !== 'comingsoon' && (
          <Header currentPage={currentPage} />
        )}

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
          <ComingSoonV2 />
        )}

        {/* 메인 페이지 표시 (/main 경로일 때) - DraggableGrid */}
        {currentPage === 'mainPage' && (
          <DraggableGrid />
        )}

        {/* 전역 Footer - 모든 페이지에서 공통으로 사용 */}
        <Footer />
      </ErrorBoundary>
    </BreakpointProvider>
  );
}

export default App;
