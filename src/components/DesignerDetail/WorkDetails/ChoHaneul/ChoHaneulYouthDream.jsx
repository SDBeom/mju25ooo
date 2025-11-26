import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import ChoHaneulYouthDreamDesktop from './ChoHaneulYouthDreamDesktop';
import ChoHaneulYouthDreamTablet from './ChoHaneulYouthDreamTablet';
import ChoHaneulYouthDreamMobile from './ChoHaneulYouthDreamMobile';
import DefaultWorkLayout from '../DefaultWorkLayout';

/**
 * 조하늘 - ����(�작품1)
 * 반응허지훈�작품 �세 컴포�트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const ChoHaneulYouthDream = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Mobile 버전 �더�
  if (isMobile) {
    return (
      <ChoHaneulYouthDreamMobile
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
      <ChoHaneulYouthDreamTablet
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
    <ChoHaneulYouthDreamDesktop
      work={work}
      designer={designer}
      badgeSrc={badgeSrc}
      badgeAlt={badgeAlt}
      ctas={ctas}
    />
  );
};

export default ChoHaneulYouthDream;

