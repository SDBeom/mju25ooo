import React, { useEffect, useRef } from 'react';
import { useBreakpointContext } from '../../contexts/BreakpointContext';
import HybridBackground from '../ComingSoon/HybridBackground';
import '../ComingSoon/ComingSoon.css';
import './ArchivePage.css';

const ArchivePage = () => {
  const { isMobile } = useBreakpointContext();
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isMobile) {
      return;
    }

    const preventPullToRefresh = (event) => {
      const container = containerRef.current;
      if (!container || container.scrollTop !== 0 || !event.touches) {
        return;
      }

      const startY = event.touches[0].clientY;

      const handleTouchMove = (moveEvent) => {
        const moveTouch = moveEvent.touches[0];
        const deltaY = moveTouch.clientY - startY;

        if (deltaY > 0 && container.scrollTop === 0) {
          moveEvent.preventDefault();
        }
      };

      document.addEventListener('touchmove', handleTouchMove, { passive: false });

      const cleanup = () => {
        document.removeEventListener('touchmove', handleTouchMove);
      };

      document.addEventListener('touchend', cleanup, { once: true });
      document.addEventListener('touchcancel', cleanup, { once: true });
    };

    document.addEventListener('touchstart', preventPullToRefresh, { passive: true });

    return () => {
      document.removeEventListener('touchstart', preventPullToRefresh);
    };
  }, [isMobile]);

  return (
    <div className="coming-soon archive-page" ref={containerRef}>
      <HybridBackground />
      <div className="archive-page__overlay">
        <section className="archive-page__content" aria-labelledby="archive-page-title">
          <span className="archive-page__label">Archive</span>
          <h1 id="archive-page-title" className="archive-page__title">
            우리의 1년간 여정의 기록은 이곳에 업로드됩니다.
          </h1>
          <p className="archive-page__description">
            본 아카이브는 졸업전시가 마무리된 후,
            <br />
            전시의 과정 속 이야기를 담아 업데이트될 예정입니다.
            <br />
            자료 준비 중이오니 잠시만 기다려주세요.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ArchivePage;


