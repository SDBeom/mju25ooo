import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import KimJinaCellestialDesktop from './KimJinaCellestialDesktop';
import KimJinaCellestialTablet from './KimJinaCellestialTablet';
import KimJinaCellestialMobile from './KimJinaCellestialMobile';

/**
 * 김지허지훈- Cellestial
 * 반응허지훈�작품 �세 컴포�트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const KimJinaCellestial = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  
  if (!work || !designer) {
    return null;
  }
  
  // Mobile 버전 �더�
  if (isMobile) {
    return (
      <KimJinaCellestialMobile
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
      <KimJinaCellestialTablet
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
    <KimJinaCellestialDesktop
      work={work}
      designer={designer}
      badgeSrc={badgeSrc}
      badgeAlt={badgeAlt}
      ctas={ctas}
    />
  );
};

export default KimJinaCellestial;

