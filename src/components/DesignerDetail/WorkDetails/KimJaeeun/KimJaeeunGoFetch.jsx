import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import KimJaeeunGoFetchDesktop from './KimJaeeunGoFetchDesktop';
import KimJaeeunGoFetchTablet from './KimJaeeunGoFetchTablet';
import KimJaeeunGoFetchMobile from './KimJaeeunGoFetchMobile';

/**
 * 김�� - Go Fetch
 * 반응허지훈�작품 �세 컴포�트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const KimJaeeunGoFetch = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  
  if (!work || !designer) {
    return null;
  }
  
  // Mobile 버전 �더�
  if (isMobile) {
    return (
      <KimJaeeunGoFetchMobile
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
      <KimJaeeunGoFetchTablet
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
    <KimJaeeunGoFetchDesktop
      work={work}
      designer={designer}
      badgeSrc={badgeSrc}
      badgeAlt={badgeAlt}
      ctas={ctas}
    />
  );
};

export default KimJaeeunGoFetch;

