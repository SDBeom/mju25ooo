import React, { createContext, useContext } from 'react';
import { useBreakpoint } from '../hooks/useBreakpoint';

// Context 생성 - React가 완전히 로드될 때까지 안전하게 처리
let BreakpointContext;

// React가 완전히 로드되었는지 확인하고 Context 생성
try {
  // createContext를 직접 import했지만, React가 아직 로드되지 않았을 수 있으므로
  // React.createContext를 사용하여 명시적으로 확인
  if (typeof React !== 'undefined' && React.createContext) {
    BreakpointContext = React.createContext(null);
  } else if (typeof createContext !== 'undefined') {
    // 대체 방법: createContext가 직접 사용 가능한 경우
    BreakpointContext = createContext(null);
  } else {
    // 최후의 수단: 지연 초기화
    BreakpointContext = null;
  }
} catch (error) {
  console.error('Error initializing BreakpointContext:', error);
  // 지연 초기화를 위한 플레이스홀더
  BreakpointContext = null;
}

// Context가 null인 경우 지연 초기화 함수
const ensureContext = () => {
  if (!BreakpointContext) {
    if (typeof React !== 'undefined' && React.createContext) {
      BreakpointContext = React.createContext(null);
    } else {
      throw new Error('React.createContext is not available. React may not be fully loaded yet.');
    }
  }
  return BreakpointContext;
};

// Provider 컴포넌트
export const BreakpointProvider = ({ children }) => {
  const breakpoint = useBreakpoint();
  
  // Context가 없으면 지연 초기화
  const Context = ensureContext();

  return (
    <Context.Provider value={breakpoint}>
      {children}
    </Context.Provider>
  );
};

// Custom Hook for using the context
export const useBreakpointContext = () => {
  // Context가 없으면 지연 초기화
  const context = ensureContext();
  const value = useContext(context);
  
  if (value === null) {
    throw new Error('useBreakpointContext must be used within a BreakpointProvider');
  }
  
  return value;
};

// Context가 초기화되었는지 확인
export default BreakpointContext || ensureContext();

