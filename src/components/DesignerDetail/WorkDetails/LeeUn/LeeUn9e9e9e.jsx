import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import LeeUn9e9e9eDesktop from './LeeUn9e9e9eDesktop';
import LeeUn9e9e9eTablet from './LeeUn9e9e9eTablet';
import LeeUn9e9e9eMobile from './LeeUn9e9e9eMobile';

/**
 * 이운 - 9e9e9e
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const LeeUn9e9e9e = ({ work, designer, ctas }) => {
  const { isMobile, isTablet } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Mobile 버전 렌더링
  if (isMobile) {
    return (
      <LeeUn9e9e9eMobile
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }

  // Tablet 버전 렌더링
  if (isTablet) {
    return (
      <LeeUn9e9e9eTablet
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }

  // Desktop 버전 렌더링 (기본)
  return (
    <LeeUn9e9e9eDesktop
      work={work}
      designer={designer}

      ctas={ctas}
    />
  );
};

export default LeeUn9e9e9e;
