import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import LeeGabiAbyssRacingDesktop from './LeeGabiAbyssRacingDesktop';
import LeeGabiAbyssRacingTablet from './LeeGabiAbyssRacingTablet';
import LeeGabiAbyssRacingMobile from './LeeGabiAbyssRacingMobile';

/**
 * 이가비 - Abyss Racing: 세이렌의 보물 (작품2)
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const LeeGabiAbyssRacing = ({ work, designer, ctas }) => {
  const { isMobile, isTablet } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Mobile 버전 렌더링
  if (isMobile) {
    return (
      <LeeGabiAbyssRacingMobile
        work={work}
        designer={designer}
        ctas={ctas}
      />
    );
  }

  // Tablet 버전 렌더링
  if (isTablet) {
    return (
      <LeeGabiAbyssRacingTablet
        work={work}
        designer={designer}
        ctas={ctas}
      />
    );
  }

  // Desktop 버전 렌더링 (기본값)
  return (
    <LeeGabiAbyssRacingDesktop
      work={work}
      designer={designer}
      ctas={ctas}
    />
  );
};

export default LeeGabiAbyssRacing;

