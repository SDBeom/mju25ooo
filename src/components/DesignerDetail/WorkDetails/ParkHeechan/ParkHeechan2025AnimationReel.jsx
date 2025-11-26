import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import ParkHeechan2025AnimationReelDesktop from './ParkHeechan2025AnimationReelDesktop';
import ParkHeechan2025AnimationReelTablet from './ParkHeechan2025AnimationReelTablet';
import ParkHeechan2025AnimationReelMobile from './ParkHeechan2025AnimationReelMobile';

/**
 * 박희찬 - 2025 Animation reel
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const ParkHeechan2025AnimationReel = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  
  if (!work || !designer) {
    return null;
  }
  
  // Desktop 버전 렌더링
  if (isDesktop) {
    return (
      <ParkHeechan2025AnimationReelDesktop
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
      <ParkHeechan2025AnimationReelTablet
        work={work}
        designer={designer}
        badgeSrc={badgeSrc}
        badgeAlt={badgeAlt}
        ctas={ctas}
      />
    );
  }
  
  // Mobile 버전 렌더링
  return (
    <ParkHeechan2025AnimationReelMobile
      work={work}
      designer={designer}
      badgeSrc={badgeSrc}
      badgeAlt={badgeAlt}
      ctas={ctas}
    />
  );
};

export default ParkHeechan2025AnimationReel;

