import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import ChoHaneulTheReasonThatILiveDesktop from './ChoHaneulTheReasonThatILiveDesktop';
import ChoHaneulTheReasonThatILiveTablet from './ChoHaneulTheReasonThatILiveTablet';
import ChoHaneulTheReasonThatILiveMobile from './ChoHaneulTheReasonThatILiveMobile';

/**
 * 조하늘 - The Reason that I Live (작품2)
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const ChoHaneulTheReasonThatILive = ({ work, designer, ctas }) => {
  const { isMobile, isTablet } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Mobile 버전 렌더링
  if (isMobile) {
    return (
      <ChoHaneulTheReasonThatILiveMobile
        work={work}
        designer={designer}
        ctas={ctas}
      />
    );
  }

  // Tablet 버전 렌더링
  if (isTablet) {
    return (
      <ChoHaneulTheReasonThatILiveTablet
        work={work}
        designer={designer}
        ctas={ctas}
      />
    );
  }

  // Desktop 버전 렌더링 (기본값)
  return (
    <ChoHaneulTheReasonThatILiveDesktop
      work={work}
      designer={designer}
      ctas={ctas}
    />
  );
};

export default ChoHaneulTheReasonThatILive;
