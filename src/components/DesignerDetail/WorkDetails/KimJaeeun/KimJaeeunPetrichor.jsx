import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import KimJaeeunPetrichorDesktop from './KimJaeeunPetrichorDesktop';
import KimJaeeunPetrichorTablet from './KimJaeeunPetrichorTablet';
import KimJaeeunPetrichorMobile from './KimJaeeunPetrichorMobile';

/**
 * 김�� - Petrichor
 * 반응허지훈�작품 �세 컴포�트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const KimJaeeunPetrichor = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  
  if (!work || !designer) {
    return null;
  }
  
  // Mobile 버전 �더�
  if (isMobile) {
    return (
      <KimJaeeunPetrichorMobile
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
      <KimJaeeunPetrichorTablet
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
    <KimJaeeunPetrichorDesktop
      work={work}
      designer={designer}
      badgeSrc={badgeSrc}
      badgeAlt={badgeAlt}
      ctas={ctas}
    />
  );
};

export default KimJaeeunPetrichor;

