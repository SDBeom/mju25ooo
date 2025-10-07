import React from 'react';
import { useBreakpointContext } from '../../contexts/BreakpointContext';

/**
 * 반응형 컴포넌트 래퍼
 * Desktop, Tablet, Mobile 버전을 props로 받아 현재 breakpoint에 맞는 컴포넌트를 렌더링
 */
const ResponsiveComponent = ({ 
  desktop: DesktopComponent, 
  tablet: TabletComponent, 
  mobile: MobileComponent,
  ...props 
}) => {
  const { isDesktop, isTablet, isMobile } = useBreakpointContext();

  if (isMobile && MobileComponent) {
    return <MobileComponent {...props} />;
  }
  
  if (isTablet && TabletComponent) {
    return <TabletComponent {...props} />;
  }
  
  if (isDesktop && DesktopComponent) {
    return <DesktopComponent {...props} />;
  }

  // Fallback to Desktop if no matching component
  return DesktopComponent ? <DesktopComponent {...props} /> : null;
};

export default ResponsiveComponent;

