import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import KimJaeeunGoFetchDesktop from './KimJaeeunGoFetchDesktop';
import KimJaeeunGoFetchTablet from './KimJaeeunGoFetchTablet';
import KimJaeeunGoFetchMobile from './KimJaeeunGoFetchMobile';

/**
 * 김재은 - Go Fetch
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const KimJaeeunGoFetch = ({ work, designer, ctas }) => {
  const { isMobile, isTablet } = useBreakpoint();
  
  if (!work || !designer) {
    return null;
  }
  
  // Mobile 버전 렌더링
  if (isMobile) {
    return (
      <KimJaeeunGoFetchMobile
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }
  
  // Tablet 버전 렌더링
  if (isTablet) {
    return (
      <KimJaeeunGoFetchTablet
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }
  
  // Desktop 버전 렌더링
  return (
    <KimJaeeunGoFetchDesktop
      work={work}
      designer={designer}

      ctas={ctas}
    />
  );
};

export default KimJaeeunGoFetch;

