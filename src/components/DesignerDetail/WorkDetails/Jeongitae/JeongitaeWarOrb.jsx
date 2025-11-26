import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import JeongitaeWarOrbDesktop from './JeongitaeWarOrbDesktop';
import JeongitaeWarOrbTablet from './JeongitaeWarOrbTablet';
import JeongitaeWarOrbMobile from './JeongitaeWarOrbMobile';

/**
 * 전기태 - War Orb (작품2)
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const JeongitaeWarOrb = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Mobile 버전 렌더링
  if (isMobile) {
    return (
      <JeongitaeWarOrbMobile
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
      <JeongitaeWarOrbTablet
        work={work}
        designer={designer}
        badgeSrc={badgeSrc}
        badgeAlt={badgeAlt}
        ctas={ctas}
      />
    );
  }

  // Desktop 버전 렌더링
  return (
    <JeongitaeWarOrbDesktop
      work={work}
      designer={designer}
      badgeSrc={badgeSrc}
      badgeAlt={badgeAlt}
      ctas={ctas}
    />
  );
};

export default JeongitaeWarOrb;

