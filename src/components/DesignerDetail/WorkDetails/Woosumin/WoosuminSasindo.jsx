import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import WoosuminSasindoDesktop from './WoosuminSasindoDesktop';
import WoosuminSasindoTablet from './WoosuminSasindoTablet';
import WoosuminSasindoMobile from './WoosuminSasindoMobile';

/**
 * 우수민 - 사신도 (작품1)
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const WoosuminSasindo = ({ work, designer, ctas }) => {
  const { isMobile, isTablet } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Mobile 버전 렌더링
  if (isMobile) {
    return (
      <WoosuminSasindoMobile
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }

  // Tablet 버전 렌더링
  if (isTablet) {
    return (
      <WoosuminSasindoTablet
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }

  // Desktop 버전 렌더링 (기본값)
  return (
    <WoosuminSasindoDesktop
      work={work}
      designer={designer}

      ctas={ctas}
    />
  );
};

export default WoosuminSasindo;

