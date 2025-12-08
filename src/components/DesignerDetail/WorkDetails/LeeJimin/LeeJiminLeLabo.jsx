import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import LeeJiminLeLaboDesktop from './LeeJiminLeLaboDesktop';
import LeeJiminLeLaboTablet from './LeeJiminLeLaboTablet';
import LeeJiminLeLaboMobile from './LeeJiminLeLaboMobile';

/**
 * 이지민 - LE LABO-CITY EXCLUSIVE
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const LeeJiminLeLabo = ({ work, designer, ctas }) => {
  const { isMobile, isTablet } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Mobile 버전 렌더링
  if (isMobile) {
    return (
      <LeeJiminLeLaboMobile
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }

  // Tablet 버전 렌더링
  if (isTablet) {
    return (
      <LeeJiminLeLaboTablet
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }

  // Desktop 버전 렌더링 (기본)
  return (
    <LeeJiminLeLaboDesktop
      work={work}
      designer={designer}

      ctas={ctas}
    />
  );
};

export default LeeJiminLeLabo;
