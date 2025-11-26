import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import KimYunjungHelloUniverseDesktop from './KimYunjungHelloUniverseDesktop';
import KimYunjungHelloUniverseTablet from './KimYunjungHelloUniverseTablet';
import KimYunjungHelloUniverseMobile from './KimYunjungHelloUniverseMobile';

/**
 * 김�정 - Hello Universe
 * 반응허지훈�작품 �세 컴포�트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const KimYunjungHelloUniverse = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  
  if (!work || !designer) {
    return null;
  }
  
  // Mobile 버전 �더�
  if (isMobile) {
    return (
      <KimYunjungHelloUniverseMobile
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
      <KimYunjungHelloUniverseTablet
        work={work}
        designer={designer}
        badgeSrc={badgeSrc}
        badgeAlt={badgeAlt}
        ctas={ctas}
      />
    );
  }
  
  // Desktop 버전 �더�
  return (
    <KimYunjungHelloUniverseDesktop
      work={work}
      designer={designer}
      badgeSrc={badgeSrc}
      badgeAlt={badgeAlt}
      ctas={ctas}
    />
  );
};

export default KimYunjungHelloUniverse;

