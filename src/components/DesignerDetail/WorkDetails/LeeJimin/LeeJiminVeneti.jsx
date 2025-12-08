import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import LeeJiminVenetiDesktop from './LeeJiminVenetiDesktop';
import LeeJiminVenetiTablet from './LeeJiminVenetiTablet';
import LeeJiminVenetiMobile from './LeeJiminVenetiMobile';

/**
 * 이지민 - Veneti
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const LeeJiminVeneti = ({ work, designer, ctas }) => {
  const { isMobile, isTablet } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Mobile 버전 렌더링
  if (isMobile) {
    return (
      <LeeJiminVenetiMobile
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }

  // Tablet 버전 렌더링
  if (isTablet) {
    return (
      <LeeJiminVenetiTablet
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }

  // Desktop 버전 렌더링 (기본)
  return (
    <LeeJiminVenetiDesktop
      work={work}
      designer={designer}
      ctas={ctas}
    />
  );
};

export default LeeJiminVeneti;
