import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import DoTienHongSeeTinhAnimatedMvDesktop from './DoTienHongSeeTinhAnimatedMvDesktop';
import DoTienHongSeeTinhAnimatedMvTablet from './DoTienHongSeeTinhAnimatedMvTablet';
import DoTienHongSeeTinhAnimatedMvMobile from './DoTienHongSeeTinhAnimatedMvMobile';

/**
 * 도티안홍 - "SEE TINH" ANIMATED MV
 * 반응형 래퍼 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const DoTienHongSeeTinhAnimatedMv = ({ work, designer, ctas }) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Desktop 버전 렌더링
  if (isDesktop) {
    return (
      <DoTienHongSeeTinhAnimatedMvDesktop
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }

  // Tablet 버전 렌더링
  if (isTablet) {
    return (
      <DoTienHongSeeTinhAnimatedMvTablet
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }

  // Mobile 버전 렌더링
  if (isMobile) {
    return (
      <DoTienHongSeeTinhAnimatedMvMobile
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }

  // Fallback for any other case (should ideally be covered by above)
  return null;
};

export default DoTienHongSeeTinhAnimatedMv;

