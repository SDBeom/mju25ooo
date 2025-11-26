import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import JungJiminTheGothicDesktop from './JungJiminTheGothicDesktop';
import JungJiminTheGothicTablet from './JungJiminTheGothicTablet';
import JungJiminTheGothicMobile from './JungJiminTheGothicMobile';

/**
 * ���- The Gothic (�작품1)
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const JungJiminTheGothic = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Mobile 버전 �더�
  if (isMobile) {
    return (
      <JungJiminTheGothicMobile
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
      <JungJiminTheGothicTablet
        work={work}
        designer={designer}
        badgeSrc={badgeSrc}
        badgeAlt={badgeAlt}
        ctas={ctas}
      />
    );
  }

  // Desktop 버전 �더�(기본�
  return (
    <JungJiminTheGothicDesktop
      work={work}
      designer={designer}
      badgeSrc={badgeSrc}
      badgeAlt={badgeAlt}
      ctas={ctas}
    />
  );
};

export default JungJiminTheGothic;

