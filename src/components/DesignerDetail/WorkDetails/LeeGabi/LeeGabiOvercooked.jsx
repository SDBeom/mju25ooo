import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import LeeGabiOvercookedDesktop from './LeeGabiOvercookedDesktop';
import LeeGabiOvercookedTablet from './LeeGabiOvercookedTablet';
import LeeGabiOvercookedMobile from './LeeGabiOvercookedMobile';

/**
 * 이가비 - OVERCOOKED: 카페 대소동 (작품1)
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const LeeGabiOvercooked = ({ work, designer, ctas }) => {
  const { isMobile, isTablet } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Mobile 버전 렌더링
  if (isMobile) {
    return (
      <LeeGabiOvercookedMobile
        work={work}
        designer={designer}
        ctas={ctas}
      />
    );
  }

  // Tablet 버전 렌더링
  if (isTablet) {
    return (
      <LeeGabiOvercookedTablet
        work={work}
        designer={designer}
        ctas={ctas}
      />
    );
  }

  // Desktop 버전 렌더링 (기본값)
  return (
    <LeeGabiOvercookedDesktop
      work={work}
      designer={designer}
      ctas={ctas}
    />
  );
};

export default LeeGabiOvercooked;

