import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import KimJinaCaravanDesktop from './KimJinaCaravanDesktop';
import KimJinaCaravanTablet from './KimJinaCaravanTablet';
import KimJinaCaravanMobile from './KimJinaCaravanMobile';

/**
 * 김지나 - Caravan
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const KimJinaCaravan = ({ work, designer, ctas }) => {
  const { isMobile, isTablet } = useBreakpoint();
  
  if (!work || !designer) {
    return null;
  }
  
  // Mobile 버전 렌더링
  if (isMobile) {
    return (
      <KimJinaCaravanMobile
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }
  
  // Tablet 버전 렌더링
  if (isTablet) {
    return (
      <KimJinaCaravanTablet
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }
  
  // Desktop 버전 렌더링
  return (
    <KimJinaCaravanDesktop
      work={work}
      designer={designer}

      ctas={ctas}
    />
  );
};

export default KimJinaCaravan;

