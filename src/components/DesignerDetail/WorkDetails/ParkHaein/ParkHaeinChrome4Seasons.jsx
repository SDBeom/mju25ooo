import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import ParkHaeinChrome4SeasonsDesktop from './ParkHaeinChrome4SeasonsDesktop';
import ParkHaeinChrome4SeasonsTablet from './ParkHaeinChrome4SeasonsTablet';
import ParkHaeinChrome4SeasonsMobile from './ParkHaeinChrome4SeasonsMobile';

/**
 * 박해허지훈- Chrome 4: Seasons
 * 반응허지훈�작품 �세 컴포�트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const ParkHaeinChrome4Seasons = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Mobile 버전 �더�
  if (isMobile) {
    return (
      <ParkHaeinChrome4SeasonsMobile
        work={work}
        designer={designer}
        badgeSrc={badgeSrc}
        badgeAlt={badgeAlt}
        ctas={ctas}
      />
    );
  }

  // Tablet 버전 �더�
  if (isTablet) {
    return (
      <ParkHaeinChrome4SeasonsTablet
        work={work}
        designer={designer}
        badgeSrc={badgeSrc}
        badgeAlt={badgeAlt}
        ctas={ctas}
      />
    );
  }

  // Desktop 버전 �더�(기본�
  return (
    <ParkHaeinChrome4SeasonsDesktop
      work={work}
      designer={designer}
      badgeSrc={badgeSrc}
      badgeAlt={badgeAlt}
      ctas={ctas}
    />
  );
};

export default ParkHaeinChrome4Seasons;
