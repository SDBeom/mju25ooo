import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import LeeDayoungReadyToMerryDesktop from './LeeDayoungReadyToMerryDesktop';
import LeeDayoungReadyToMerryTablet from './LeeDayoungReadyToMerryTablet';
import LeeDayoungReadyToMerryMobile from './LeeDayoungReadyToMerryMobile';

/**
 * 이다영 - Ready to Merry
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const LeeDayoungReadyToMerry = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Mobile 버전 렌더링
  if (isMobile) {
    return (
      <LeeDayoungReadyToMerryMobile
        work={work}
        designer={designer}
        badgeSrc={badgeSrc}
        badgeAlt={badgeAlt}
        ctas={ctas}
      />
    );
  }

  // Tablet 버전 렌더링
  if (isTablet) {
    return (
      <LeeDayoungReadyToMerryTablet
        work={work}
        designer={designer}
        badgeSrc={badgeSrc}
        badgeAlt={badgeAlt}
        ctas={ctas}
      />
    );
  }

  // Desktop 버전 렌더링 (기본)
  return (
    <LeeDayoungReadyToMerryDesktop
      work={work}
      designer={designer}
      badgeSrc={badgeSrc}
      badgeAlt={badgeAlt}
      ctas={ctas}
    />
  );
};

export default LeeDayoungReadyToMerry;
