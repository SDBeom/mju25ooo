import React, { createContext, useContext } from 'react';
import { useBreakpoint } from '../hooks/useBreakpoint';

// Context 생성 - React가 제대로 로드되었는지 확인
if (typeof React === 'undefined' || typeof createContext === 'undefined') {
  throw new Error('React is not properly loaded. createContext is undefined.');
}
const BreakpointContext = createContext(null);

// Provider 컴포넌트
export const BreakpointProvider = ({ children }) => {
  const breakpoint = useBreakpoint();

  return (
    <BreakpointContext.Provider value={breakpoint}>
      {children}
    </BreakpointContext.Provider>
  );
};

// Custom Hook for using the context
export const useBreakpointContext = () => {
  const context = useContext(BreakpointContext);
  
  if (context === null) {
    throw new Error('useBreakpointContext must be used within a BreakpointProvider');
  }
  
  return context;
};

export default BreakpointContext;

