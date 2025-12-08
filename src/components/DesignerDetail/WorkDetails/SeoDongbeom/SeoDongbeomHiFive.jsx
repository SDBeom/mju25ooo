import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import SeoDongbeomHiFiveDesktop from './SeoDongbeomHiFiveDesktop';
import SeoDongbeomHiFiveTablet from './SeoDongbeomHiFiveTablet';
import SeoDongbeomHiFiveMobile from './SeoDongbeomHiFiveMobile';

/**
 * 서동범 - HiFive
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const SeoDongbeomHiFive = ({ work, designer, ctas }) => {
  const { isMobile, isTablet } = useBreakpoint();
  
  if (!work || !designer) {
    return null;
  }
  
  // Mobile 버전 렌더링
  if (isMobile) {
    return (
      <SeoDongbeomHiFiveMobile
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }
  
  // Tablet 버전 렌더링
  if (isTablet) {
    return (
      <SeoDongbeomHiFiveTablet
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }
  
  // Desktop 버전 렌더링
  return (
    <SeoDongbeomHiFiveDesktop
      work={work}
      designer={designer}

      ctas={ctas}
    />
  );
};

export default SeoDongbeomHiFive;

