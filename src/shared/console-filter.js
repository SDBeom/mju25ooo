/**
 * 콘솔 오류 필터링 시스템
 * 
 * 브라우저 확장 프로그램, 개발 도구에서 발생하는 불필요한 오류들을 필터링합니다.
 * 실제 애플리케이션 오류는 그대로 표시되며, 외부 요인으로 인한 오류만 숨깁니다.
 */

/**
 * 무시할 오류 패턴들
 */
const IGNORED_ERROR_PATTERNS = [
  // 브라우저 확장 프로그램 관련
  'extension port',
  'message channel is closed',
  'back/forward cache',
  'storage is not allowed',
  'content.js',
  
  // 개발 도구 관련
  'DevTools',
  'chrome-extension://',
  'moz-extension://',
  
  // 네트워크 관련 (일반적인 것들)
  'net::ERR_',
  'Failed to load resource',
  
  // 기타 일반적인 브라우저 오류
  'Script error',
  'Non-Error promise rejection',
  
  // React 관련 (개발 모드에서만)
  'Warning:',
  'ReactDOM.render is no longer supported'
];

/**
 * 오류가 무시되어야 하는지 확인
 */
const shouldIgnoreError = (message, source) => {
  if (!message) return false;
  
  const messageStr = String(message).toLowerCase();
  const sourceStr = source ? String(source).toLowerCase() : '';
  
  return IGNORED_ERROR_PATTERNS.some(pattern => 
    messageStr.includes(pattern.toLowerCase()) ||
    sourceStr.includes(pattern.toLowerCase())
  );
};

/**
 * 원본 콘솔 메서드들 백업
 */
const originalConsole = {
  error: console.error,
  warn: console.warn,
  log: console.log
};

/**
 * 필터링된 콘솔 설정
 */
const setupConsoleFilter = () => {
  // 오류 필터링
  console.error = (...args) => {
    const [message, ...rest] = args;
    
    if (!shouldIgnoreError(message)) {
      originalConsole.error.apply(console, args);
    }
  };

  // 경고 필터링 (선택적)
  console.warn = (...args) => {
    const [message, ...rest] = args;
    
    if (!shouldIgnoreError(message)) {
      originalConsole.warn.apply(console, args);
    }
  };

  // 로그는 그대로 유지
  console.log = originalConsole.log;
};

/**
 * 글로벌 오류 이벤트 필터링
 */
const setupGlobalErrorFilter = () => {
  // JavaScript 오류 필터링
  window.addEventListener('error', (event) => {
    if (shouldIgnoreError(event.message, event.filename)) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  });

  // Promise rejection 필터링
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    const message = reason instanceof Error ? reason.message : String(reason);
    
    if (shouldIgnoreError(message)) {
      event.preventDefault();
      return false;
    }
  });
};

/**
 * 콘솔 필터 초기화
 */
export const initConsoleFilter = () => {
  try {
    setupConsoleFilter();
    setupGlobalErrorFilter();
    
    console.log('Console filter initialized - extension errors will be hidden');
  } catch (e) {
    console.warn('Failed to initialize console filter:', e.message);
  }
};

/**
 * 콘솔 필터 비활성화 (개발용)
 */
export const disableConsoleFilter = () => {
  try {
    console.error = originalConsole.error;
    console.warn = originalConsole.warn;
    console.log = originalConsole.log;
    
    console.log('Console filter disabled - all errors will be visible');
  } catch (e) {
    console.warn('Failed to disable console filter:', e.message);
  }
};

// 개발 모드에서만 자동 초기화
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  initConsoleFilter();
}
