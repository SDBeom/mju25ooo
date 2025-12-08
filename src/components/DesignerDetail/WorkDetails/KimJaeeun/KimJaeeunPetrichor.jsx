import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import KimJaeeunPetrichorDesktop from './KimJaeeunPetrichorDesktop';
import KimJaeeunPetrichorTablet from './KimJaeeunPetrichorTablet';
import KimJaeeunPetrichorMobile from './KimJaeeunPetrichorMobile';

/**
 * 김재은 - Petrichor
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const KimJaeeunPetrichor = ({ work, designer, ctas }) => {
  const { isMobile, isTablet } = useBreakpoint();
  
  if (!work || !designer) {
    return null;
  }
  
  // Mobile 버전 렌더링
  if (isMobile) {
    return (
      <KimJaeeunPetrichorMobile
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }
  
  // Tablet 버전 렌더링
  if (isTablet) {
    return (
      <KimJaeeunPetrichorTablet
        work={work}
        designer={designer}

        ctas={ctas}
      />
    );
  }
  
  // Desktop 버전 렌더링
  return (
    <KimJaeeunPetrichorDesktop
      work={work}
      designer={designer}

      ctas={ctas}
    />
  );
};

export default KimJaeeunPetrichor;

