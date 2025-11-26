import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import WoosuminPierreHuygheDesktop from './WoosuminPierreHuygheDesktop';
import WoosuminPierreHuygheTablet from './WoosuminPierreHuygheTablet';
import WoosuminPierreHuygheMobile from './WoosuminPierreHuygheMobile';

/**
 * 우수민 - Pierre Huyghe: Liminal 가이드앱 UXUI (작품2)
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const WoosuminPierreHuyghe = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Mobile 버전 렌더링
  if (isMobile) {
    return (
      <WoosuminPierreHuygheMobile
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
      <WoosuminPierreHuygheTablet
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
    <WoosuminPierreHuygheDesktop
      work={work}
      designer={designer}
      badgeSrc={badgeSrc}
      badgeAlt={badgeAlt}
      ctas={ctas}
    />
  );
};

export default WoosuminPierreHuyghe;

