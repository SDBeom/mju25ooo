import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import SeoRinRavenXDesktop from './SeoRinRavenXDesktop';
import SeoRinRavenXTablet from './SeoRinRavenXTablet';
import SeoRinRavenXMobile from './SeoRinRavenXMobile';

/**
 * 전서린 - RAVEN-X (작품1)
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const SeoRinRavenX = ({ work, designer, ctas }) => {
  const { isMobile, isTablet } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Mobile 버전 렌더링
  if (isMobile) {
    return (
      <SeoRinRavenXMobile
        work={work}
        designer={designer}
        ctas={ctas}
      />
    );
  }

  // Tablet 버전 렌더링
  if (isTablet) {
    return (
      <SeoRinRavenXTablet
        work={work}
        designer={designer}
        ctas={ctas}
      />
    );
  }

  // Desktop 버전 렌더링
  return (
    <SeoRinRavenXDesktop
      work={work}
      designer={designer}
      ctas={ctas}
    />
  );
};

export default SeoRinRavenX;
