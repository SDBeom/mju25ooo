import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import LeeDayoungPlottingRoomDesktop from './LeeDayoungPlottingRoomDesktop';
import LeeDayoungPlottingRoomTablet from './LeeDayoungPlottingRoomTablet';
import LeeDayoungPlottingRoomMobile from './LeeDayoungPlottingRoomMobile';

/**
 * 이다영 - 플롯팅룸
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const LeeDayoungPlottingRoom = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Mobile 버전 렌더링
  if (isMobile) {
    return (
      <LeeDayoungPlottingRoomMobile
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
      <LeeDayoungPlottingRoomTablet
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
    <LeeDayoungPlottingRoomDesktop
      work={work}
      designer={designer}
      badgeSrc={badgeSrc}
      badgeAlt={badgeAlt}
      ctas={ctas}
    />
  );
};

export default LeeDayoungPlottingRoom;
