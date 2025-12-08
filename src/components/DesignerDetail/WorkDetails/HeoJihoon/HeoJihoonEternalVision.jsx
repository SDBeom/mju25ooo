import React from 'react';
import { useBreakpoint } from '../../../../hooks/useBreakpoint';
import HeoJihoonEternalVisionMobile from './HeoJihoonEternalVisionMobile';
import HeoJihoonEternalVisionTablet from './HeoJihoonEternalVisionTablet';
import HeoJihoonEternalVisionDesktop from './HeoJihoonEternalVisionDesktop';

/**
 * 허지훈 - Eternal Vision (작품2)
 * 반응형 작품 상세 컴포넌트
 * Mobile: < 800px
 * Tablet: 800px ~ 1279px
 * Desktop: >= 1280px
 */
const HeoJihoonEternalVision = ({ work, designer, ctas }) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  
  if (!work || !designer) {
    return null;
  }
  
  // Mobile 버전 렌더링
  if (isMobile) {
    return (
      <HeoJihoonEternalVisionMobile 
        work={work} 
        designer={designer} 

        ctas={ctas} 
      />
    );
  }
  
  // Tablet 버전 렌더링
  if (isTablet) {
    return (
      <HeoJihoonEternalVisionTablet 
        work={work} 
        designer={designer} 

        ctas={ctas} 
      />
    );
  }
  
  // Desktop 버전 렌더링
  if (isDesktop) {
    return (
      <HeoJihoonEternalVisionDesktop 
        work={work} 
        designer={designer} 

        ctas={ctas} 
      />
    );
  }
  
  // 기본값 (Desktop)
  return (
    <HeoJihoonEternalVisionDesktop 
      work={work} 
      designer={designer} 

      ctas={ctas} 
    />
  );
};

export default HeoJihoonEternalVision;
