import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import ChoHaneulYouthDreamDesktop from './ChoHaneulYouthDreamDesktop';
import ChoHaneulYouthDreamTablet from './ChoHaneulYouthDreamTablet';
import ChoHaneulYouthDreamMobile from './ChoHaneulYouthDreamMobile';

/**
 * 조하늘 - 청춘몽 (작품1)
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const ChoHaneulYouthDream = ({ work, designer, ctas }) => {
  const { isMobile, isTablet } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Mobile 버전 렌더링
  if (isMobile) {
    return (
      <ChoHaneulYouthDreamMobile
        work={work}
        designer={designer}
        ctas={ctas}
      />
    );
  }

  // Tablet 버전 렌더링
  if (isTablet) {
    return (
      <ChoHaneulYouthDreamTablet
        work={work}
        designer={designer}
        ctas={ctas}
      />
    );
  }

  // Desktop 버전 렌더링 (기본값)
  return (
    <ChoHaneulYouthDreamDesktop
      work={work}
      designer={designer}
      ctas={ctas}
    />
  );
};

export default ChoHaneulYouthDream;
