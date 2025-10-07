import { useState, useEffect } from 'react';

// Breakpoint 정의
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
};

export const DEVICE_TYPES = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP: 'desktop',
};

// 화면 크기에 따른 디바이스 타입 결정
const getDeviceType = (width) => {
  if (width < BREAKPOINTS.MOBILE) {
    return DEVICE_TYPES.MOBILE;
  } else if (width < BREAKPOINTS.TABLET) {
    return DEVICE_TYPES.TABLET;
  } else {
    return DEVICE_TYPES.DESKTOP;
  }
};

// Debounce 함수
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Custom Hook
export const useBreakpoint = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  
  const [deviceType, setDeviceType] = useState(
    getDeviceType(typeof window !== 'undefined' ? window.innerWidth : 1200)
  );

  useEffect(() => {
    // Debounced resize handler
    const handleResize = debounce(() => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setDeviceType(getDeviceType(width));
    }, 150); // 150ms debounce

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    windowWidth,
    deviceType,
    isMobile: deviceType === DEVICE_TYPES.MOBILE,
    isTablet: deviceType === DEVICE_TYPES.TABLET,
    isDesktop: deviceType === DEVICE_TYPES.DESKTOP,
  };
};

export default useBreakpoint;

