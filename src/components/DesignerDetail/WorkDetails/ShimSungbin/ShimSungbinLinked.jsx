import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import ShimSungbinLinkedDesktop from './ShimSungbinLinkedDesktop';
import ShimSungbinLinkedTablet from './ShimSungbinLinkedTablet';
import ShimSungbinLinkedMobile from './ShimSungbinLinkedMobile';

/**
 * 심성빈 - Linked (작품1)
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const ShimSungbinLinked = ({ work, designer, ctas }) => {
  const { isMobile, isTablet } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Mobile 버전 렌더링
  if (isMobile) {
    return (
      <ShimSungbinLinkedMobile
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }

  // Tablet 버전 렌더링
  if (isTablet) {
    return (
      <ShimSungbinLinkedTablet
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }

  // Desktop 버전 렌더링 (기본값)
  return (
    <ShimSungbinLinkedDesktop
      work={work}
      designer={designer}

      ctas={ctas}
    />
  );
};

export default ShimSungbinLinked;

