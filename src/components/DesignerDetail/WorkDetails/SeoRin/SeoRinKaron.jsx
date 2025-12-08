import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import SeoRinKaronDesktop from './SeoRinKaronDesktop';
import SeoRinKaronTablet from './SeoRinKaronTablet';
import SeoRinKaronMobile from './SeoRinKaronMobile';

/**
 * 전서린 - KARON
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const SeoRinKaron = ({ work, designer, ctas }) => {
  const { isMobile, isTablet } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Mobile 버전 렌더링
  if (isMobile) {
    return (
      <SeoRinKaronMobile
        work={work}
        designer={designer}
        ctas={ctas}
      />
    );
  }

  // Tablet 버전 렌더링
  if (isTablet) {
    return (
      <SeoRinKaronTablet
        work={work}
        designer={designer}
        ctas={ctas}
      />
    );
  }

  // Desktop 버전 렌더링
  return (
    <SeoRinKaronDesktop
      work={work}
      designer={designer}
      ctas={ctas}
    />
  );
};

export default SeoRinKaron;
