import React, { createContext, useContext } from 'react';
import { useBreakpoint } from '../hooks/useBreakpoint';

// Context 생성
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

