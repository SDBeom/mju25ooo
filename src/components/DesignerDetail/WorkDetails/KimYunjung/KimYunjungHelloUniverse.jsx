import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import KimYunjungHelloUniverseDesktop from './KimYunjungHelloUniverseDesktop';
import KimYunjungHelloUniverseTablet from './KimYunjungHelloUniverseTablet';
import KimYunjungHelloUniverseMobile from './KimYunjungHelloUniverseMobile';

/**
 * 김윤정 - Hello Universe
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const KimYunjungHelloUniverse = ({ work, designer, ctas }) => {
  const { isMobile, isTablet } = useBreakpoint();
  
  if (!work || !designer) {
    return null;
  }
  
  // Mobile 버전 렌더링
  if (isMobile) {
    return (
      <KimYunjungHelloUniverseMobile
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }
  
  // Tablet 버전 렌더링
  if (isTablet) {
    return (
      <KimYunjungHelloUniverseTablet
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }
  
  // Desktop 버전 렌더링
  return (
    <KimYunjungHelloUniverseDesktop
      work={work}
      designer={designer}

      ctas={ctas}
    />
  );
};

export default KimYunjungHelloUniverse;

