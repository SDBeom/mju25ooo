import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import ShimSungbinBoomDesktop from './ShimSungbinBoomDesktop';
import ShimSungbinBoomTablet from './ShimSungbinBoomTablet';
import ShimSungbinBoomMobile from './ShimSungbinBoomMobile';

/**
 * 심성빈 - BOOM (작품2)
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const ShimSungbinBoom = ({ work, designer, ctas }) => {
  const { isMobile, isTablet } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Mobile 버전 렌더링
  if (isMobile) {
    return (
      <ShimSungbinBoomMobile
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }

  // Tablet 버전 렌더링
  if (isTablet) {
    return (
      <ShimSungbinBoomTablet
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }

  // Desktop 버전 렌더링 (기본값)
  return (
    <ShimSungbinBoomDesktop
      work={work}
      designer={designer}

      ctas={ctas}
    />
  );
};

export default ShimSungbinBoom;

