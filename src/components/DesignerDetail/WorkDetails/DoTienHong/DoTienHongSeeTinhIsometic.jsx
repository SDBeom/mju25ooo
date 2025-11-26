import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import DoTienHongSeeTinhIsometicDesktop from './DoTienHongSeeTinhIsometicDesktop';
import DoTienHongSeeTinhIsometicTablet from './DoTienHongSeeTinhIsometicTablet';
import DoTienHongSeeTinhIsometicMobile from './DoTienHongSeeTinhIsometicMobile';
import DefaultWorkLayout from '../DefaultWorkLayout';

/**
 * 도티안홍 - "SEE TINH" ISOMETIC
 * 반응형 래퍼 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const DoTienHongSeeTinhIsometic = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Desktop 버전 렌더링
  if (isDesktop) {
    return (
      <DoTienHongSeeTinhIsometicDesktop
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
      <DoTienHongSeeTinhIsometicTablet
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
      <DoTienHongSeeTinhIsometicMobile
        work={work}
        designer={designer}
        badgeSrc={badgeSrc}
        badgeAlt={badgeAlt}
        ctas={ctas}
      />
    );
  }

  // Fallback for any other case (should ideally be covered by above)
  return (
    <DefaultWorkLayout
      work={work}
      designer={designer}
      badgeSrc={badgeSrc}
      badgeAlt={badgeAlt}
      ctas={ctas}
    />
  );
};

export default DoTienHongSeeTinhIsometic;

