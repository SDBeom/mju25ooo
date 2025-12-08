import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import KimJinaCellestialDesktop from './KimJinaCellestialDesktop';
import KimJinaCellestialTablet from './KimJinaCellestialTablet';
import KimJinaCellestialMobile from './KimJinaCellestialMobile';

/**
 * 김지나 - Cellestial
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const KimJinaCellestial = ({ work, designer, ctas }) => {
  const { isMobile, isTablet } = useBreakpoint();
  
  if (!work || !designer) {
    return null;
  }
  
  // Mobile 버전 렌더링
  if (isMobile) {
    return (
      <KimJinaCellestialMobile
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }
  
  // Tablet 버전 렌더링
  if (isTablet) {
    return (
      <KimJinaCellestialTablet
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }
  
  // Desktop 버전 렌더링
  return (
    <KimJinaCellestialDesktop
      work={work}
      designer={designer}

      ctas={ctas}
    />
  );
};

export default KimJinaCellestial;

