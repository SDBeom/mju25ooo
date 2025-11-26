import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import ParkJinaRemainDesktop from './ParkJinaRemainDesktop';
import ParkJinaRemainTablet from './ParkJinaRemainTablet';
import ParkJinaRemainMobile from './ParkJinaRemainMobile';
import DefaultWorkLayout from '../DefaultWorkLayout';

/**
 * 박진아 - REMAIN
 * 반응형 래퍼 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const ParkJinaRemain = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Desktop 버전 렌더링
  if (isDesktop) {
    return (
      <ParkJinaRemainDesktop
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
      <ParkJinaRemainTablet
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
    <ParkJinaRemainMobile
      work={work}
      designer={designer}
      badgeSrc={badgeSrc}
      badgeAlt={badgeAlt}
      ctas={ctas}
    />
  );
};

export default ParkJinaRemain;
