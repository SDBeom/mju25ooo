import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import JeongitaeDolorSagaDesktop from './JeongitaeDolorSagaDesktop';
import JeongitaeDolorSagaTablet from './JeongitaeDolorSagaTablet';
import JeongitaeDolorSagaMobile from './JeongitaeDolorSagaMobile';

/**
 * 전기태 - Dolor Saga (작품1)
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const JeongitaeDolorSaga = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  if (!work || !designer) {
    return null;
  }

  // Mobile 버전 렌더링
  if (isMobile) {
    return (
      <JeongitaeDolorSagaMobile
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
      <JeongitaeDolorSagaTablet
        work={work}
        designer={designer}
        badgeSrc={badgeSrc}
        badgeAlt={badgeAlt}
        ctas={ctas}
      />
    );
  }

  // Desktop 버전 렌더링
  return (
    <JeongitaeDolorSagaDesktop
      work={work}
      designer={designer}
      badgeSrc={badgeSrc}
      badgeAlt={badgeAlt}
      ctas={ctas}
    />
  );
};

export default JeongitaeDolorSaga;

