import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import LeeUnLayeredDesktop from './LeeUnLayeredDesktop';
import LeeUnLayeredTablet from './LeeUnLayeredTablet';
import LeeUnLayeredMobile from './LeeUnLayeredMobile';

/**
 * 이운 - Layered
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const LeeUnLayered = ({ work, designer, ctas }) => {
  const { isMobile, isTablet } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Mobile 버전 렌더링
  if (isMobile) {
    return (
      <LeeUnLayeredMobile
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }

  // Tablet 버전 렌더링
  if (isTablet) {
    return (
      <LeeUnLayeredTablet
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }

  // Desktop 버전 렌더링 (기본)
  return (
    <LeeUnLayeredDesktop
      work={work}
      designer={designer}

      ctas={ctas}
    />
  );
};

export default LeeUnLayered;
