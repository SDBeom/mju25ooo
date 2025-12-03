import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import HeoJihoonMasterImaginationMobile from './HeoJihoonMasterImaginationMobile';
import HeoJihoonMasterImaginationTablet from './HeoJihoonMasterImaginationTablet';
import HeoJihoonMasterImaginationDesktop from './HeoJihoonMasterImaginationDesktop';

/**
 * 허지훈 - Master your Imagination (작품1)
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const HeoJihoonMasterImagination = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  const { isMobile, isTablet } = useBreakpoint();
  
  if (!work || !designer) {
    return null;
  }
  
  // Mobile 버전 렌더링
  if (isMobile) {
    return (
      <HeoJihoonMasterImaginationMobile
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
      <HeoJihoonMasterImaginationTablet 
        work={work} 
        designer={designer} 
        badgeSrc={badgeSrc} 
        badgeAlt={badgeAlt} 
        ctas={ctas} 
      />
    );
  }

  // Desktop 버전 렌더링 (기본)
  return (
    <HeoJihoonMasterImaginationDesktop
      work={work}
      designer={designer}
      badgeSrc={badgeSrc}
      badgeAlt={badgeAlt}
      ctas={ctas}
    />
  );
};

export default HeoJihoonMasterImagination;
