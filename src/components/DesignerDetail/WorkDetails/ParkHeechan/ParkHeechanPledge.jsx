import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import ParkHeechanPledgeDesktop from './ParkHeechanPledgeDesktop';
import ParkHeechanPledgeTablet from './ParkHeechanPledgeTablet';
import ParkHeechanPledgeMobile from './ParkHeechanPledgeMobile';

/**
 * 박희찬 - PLEDGE
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const ParkHeechanPledge = ({ work, designer, ctas }) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  
  if (!work || !designer) {
    return null;
  }
  
  // Desktop 버전 렌더링
  if (isDesktop) {
    return (
      <ParkHeechanPledgeDesktop
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }
  
  // Tablet 버전 렌더링
  if (isTablet) {
    return (
      <ParkHeechanPledgeTablet
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }
  
  // Mobile 버전 렌더링
  return (
    <ParkHeechanPledgeMobile
      work={work}
      designer={designer}

      ctas={ctas}
    />
  );
};

export default ParkHeechanPledge;

