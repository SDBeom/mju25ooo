import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import ParkHaeinChrome4SeasonsDesktop from './ParkHaeinChrome4SeasonsDesktop';
import ParkHaeinChrome4SeasonsTablet from './ParkHaeinChrome4SeasonsTablet';
import ParkHaeinChrome4SeasonsMobile from './ParkHaeinChrome4SeasonsMobile';

/**
 * 박해인 - Chrome 4: Seasons
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const ParkHaeinChrome4Seasons = ({ work, designer, ctas }) => {
  const { isMobile, isTablet } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Mobile 버전 렌더링
  if (isMobile) {
    return (
      <ParkHaeinChrome4SeasonsMobile
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }

  // Tablet 버전 렌더링
  if (isTablet) {
    return (
      <ParkHaeinChrome4SeasonsTablet
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }

  // Desktop 버전 렌더링 (기본값)
  return (
    <ParkHaeinChrome4SeasonsDesktop
      work={work}
      designer={designer}

      ctas={ctas}
    />
  );
};

export default ParkHaeinChrome4Seasons;
