import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import SongDaheeACardOfLoveDesktop from './SongDaheeACardOfLoveDesktop';
import SongDaheeACardOfLoveTablet from './SongDaheeACardOfLoveTablet';
import SongDaheeACardOfLoveMobile from './SongDaheeACardOfLoveMobile';

/**
 * 송다희 - A Card of Love (작품1)
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const SongDaheeACardOfLove = ({ work, designer, ctas }) => {
  const { isMobile, isTablet } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Mobile 버전 렌더링
  if (isMobile) {
    return (
      <SongDaheeACardOfLoveMobile
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }

  // Tablet 버전 렌더링
  if (isTablet) {
    return (
      <SongDaheeACardOfLoveTablet
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }

  // Desktop 버전 렌더링 (기본값)
  return (
    <SongDaheeACardOfLoveDesktop
      work={work}
      designer={designer}

      ctas={ctas}
    />
  );
};

export default SongDaheeACardOfLove;

