import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import KimChaeYoungDoYouBelieveInDestinyDesktop from './KimChaeYoungDoYouBelieveInDestinyDesktop';
import KimChaeYoungDoYouBelieveInDestinyTablet from './KimChaeYoungDoYouBelieveInDestinyTablet';
import KimChaeYoungDoYouBelieveInDestinyMobile from './KimChaeYoungDoYouBelieveInDestinyMobile';
import DefaultWorkLayout from '../DefaultWorkLayout';

/**
 * 김채영 - 운명을 믿으세요
 * 반응형 래퍼 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const KimChaeYoungDoYouBelieveInDestiny = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Desktop 버전 렌더링
  if (isDesktop) {
    return (
      <KimChaeYoungDoYouBelieveInDestinyDesktop
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
      <KimChaeYoungDoYouBelieveInDestinyTablet
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
      <KimChaeYoungDoYouBelieveInDestinyMobile
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

export default KimChaeYoungDoYouBelieveInDestiny;

