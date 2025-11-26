import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import ParkJinaCrossCootyDesktop from './ParkJinaCrossCootyDesktop';
import ParkJinaCrossCootyTablet from './ParkJinaCrossCootyTablet';
import ParkJinaCrossCootyMobile from './ParkJinaCrossCootyMobile';
import DefaultWorkLayout from '../DefaultWorkLayout';

/**
 * 박진아 - Cross Cooty
 * 반응형 래퍼 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const ParkJinaCrossCooty = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Desktop 버전 렌더링
  if (isDesktop) {
    return (
      <ParkJinaCrossCootyDesktop
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
      <ParkJinaCrossCootyTablet
        work={work}
        designer={designer}
        badgeSrc={badgeSrc}
        badgeAlt={badgeAlt}
        ctas={ctas}
      />
    );
  }

  // Mobile 버전 렌더링
  if (isMobile) {
    return (
      <ParkJinaCrossCootyMobile
        work={work}
        designer={designer}
        badgeSrc={badgeSrc}
        badgeAlt={badgeAlt}
        ctas={ctas}
      />
    );
  }

  // 기본값 (Mobile)
  return (
    <ParkJinaCrossCootyMobile
      work={work}
      designer={designer}
      badgeSrc={badgeSrc}
      badgeAlt={badgeAlt}
      ctas={ctas}
    />
  );
};

export default ParkJinaCrossCooty;

