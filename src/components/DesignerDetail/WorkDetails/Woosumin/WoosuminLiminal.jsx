import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import WoosuminLiminalDesktop from './WoosuminLiminalDesktop';
import WoosuminLiminalTablet from './WoosuminLiminalTablet';
import WoosuminLiminalMobile from './WoosuminLiminalMobile';

/**
 * 우수민 - Liminal Guide
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const WoosuminLiminal = ({ work, designer, ctas }) => {
  const { isMobile, isTablet } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Mobile 버전 렌더링
  if (isMobile) {
    return (
      <WoosuminLiminalMobile
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }

  // Tablet 버전 렌더링
  if (isTablet) {
    return (
      <WoosuminLiminalTablet
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }

  // Desktop 버전 렌더링 (기본값)
  return (
    <WoosuminLiminalDesktop
      work={work}
      designer={designer}

      ctas={ctas}
    />
  );
};

export default WoosuminLiminal;
