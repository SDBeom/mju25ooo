import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import KimYunjungLoveAtRustSightDesktop from './KimYunjungLoveAtRustSightDesktop';
import KimYunjungLoveAtRustSightTablet from './KimYunjungLoveAtRustSightTablet';
import KimYunjungLoveAtRustSightMobile from './KimYunjungLoveAtRustSightMobile';

/**
 * 김�정 - Love at Rust Sight
 * 반응허지훈�작품 �세 컴포�트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const KimYunjungLoveAtRustSight = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  
  if (!work || !designer) {
    return null;
  }
  
  // Mobile 버전 �더�
  if (isMobile) {
    return (
      <KimYunjungLoveAtRustSightMobile
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
      <KimYunjungLoveAtRustSightTablet
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
    <KimYunjungLoveAtRustSightDesktop
      work={work}
      designer={designer}
      badgeSrc={badgeSrc}
      badgeAlt={badgeAlt}
      ctas={ctas}
    />
  );
};

export default KimYunjungLoveAtRustSight;

