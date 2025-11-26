import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import ChoHaneulTheReasonThatILiveDesktop from './ChoHaneulTheReasonThatILiveDesktop';
import ChoHaneulTheReasonThatILiveTablet from './ChoHaneulTheReasonThatILiveTablet';
import ChoHaneulTheReasonThatILiveMobile from './ChoHaneulTheReasonThatILiveMobile';

/**
 * 조하늘 - The Reason that I Live (�작품2)
 * 반응허지훈�작품 �세 컴포�트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const ChoHaneulTheReasonThatILive = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Mobile 버전 �더�
  if (isMobile) {
    return (
      <ChoHaneulTheReasonThatILiveMobile
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
      <ChoHaneulTheReasonThatILiveTablet
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
    <ChoHaneulTheReasonThatILiveDesktop
      work={work}
      designer={designer}
      badgeSrc={badgeSrc}
      badgeAlt={badgeAlt}
      ctas={ctas}
    />
  );
};

export default ChoHaneulTheReasonThatILive;

