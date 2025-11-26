import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import AhnSeonminDotDotDotDesktop from './AhnSeonminDotDotDotDesktop';
import AhnSeonminDotDotDotTablet from './AhnSeonminDotDotDotTablet';
import AhnSeonminDotDotDotMobile from './AhnSeonminDotDotDotMobile';

/**
 * 안선민 - 점점점 (작품1)
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const AhnSeonminDotDotDot = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Mobile 버전 렌더링
  if (isMobile) {
    return (
      <AhnSeonminDotDotDotMobile
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
      <AhnSeonminDotDotDotTablet
        work={work}
        designer={designer}
        badgeSrc={badgeSrc}
        badgeAlt={badgeAlt}
        ctas={ctas}
      />
    );
  }

  // Desktop 버전 렌더링 (기본값)
  return (
    <AhnSeonminDotDotDotDesktop
      work={work}
      designer={designer}
      badgeSrc={badgeSrc}
      badgeAlt={badgeAlt}
      ctas={ctas}
    />
  );
};

export default AhnSeonminDotDotDot;

