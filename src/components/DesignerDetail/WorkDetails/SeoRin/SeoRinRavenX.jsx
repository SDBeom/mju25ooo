import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import SeoRinRavenXDesktop from './SeoRinRavenXDesktop';
import SeoRinRavenXTablet from './SeoRinRavenXTablet';
import SeoRinRavenXMobile from './SeoRinRavenXMobile';

/**
 * �서�- RAVEN-X (�작품1)
 * 반응허지훈�작품 �세 컴포�트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const SeoRinRavenX = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Mobile 버전 �더�
  if (isMobile) {
    return (
      <SeoRinRavenXMobile
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
      <SeoRinRavenXTablet
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
    <SeoRinRavenXDesktop
      work={work}
      designer={designer}
      badgeSrc={badgeSrc}
      badgeAlt={badgeAlt}
      ctas={ctas}
    />
  );
};

export default SeoRinRavenX;

