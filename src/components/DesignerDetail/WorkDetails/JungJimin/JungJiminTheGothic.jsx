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
const JungJiminTheGothic = ({ work, designer, ctas }) => {
  const { isMobile, isTablet } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Mobile 버전 �더�
  if (isMobile) {
    return (
      <JungJiminTheGothicMobile
        work={work}
        designer={designer}

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

        ctas={ctas}
      />
    );
  }

  // Desktop 버전 �더�(기본�
  return (
    <JungJiminTheGothicDesktop
      work={work}
      designer={designer}

      ctas={ctas}
    />
  );
};

export default JungJiminTheGothic;

