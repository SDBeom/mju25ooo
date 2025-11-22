/**
 * 글로벌 저장소 접근 가드
 * 
 * 애플리케이션 시작 시 모든 저장소 접근을 안전하게 처리하도록 설정합니다.
 * 확장 프로그램, iframe, 시크릿 모드 등 모든 환경에서 안전하게 동작합니다.
 */

/**
 * 원본 저장소 메서드들을 백업
 */
const originalLocalStorage = {
  setItem: localStorage.setItem,
  getItem: localStorage.getItem,
  removeItem: localStorage.removeItem,
  clear: localStorage.clear,
  key: localStorage.key,
  length: localStorage.length
};

const originalSessionStorage = {
  setItem: sessionStorage.setItem,
  getItem: sessionStorage.getItem,
  removeItem: sessionStorage.removeItem,
  clear: sessionStorage.clear,
  key: sessionStorage.key,
  length: sessionStorage.length
};

/**
 * 확장 프로그램 컨텍스트 감지
 */
const isExtensionContext = () => {
  try {
    return (
      // eslint-disable-next-line no-undef
      (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id) ||
      // eslint-disable-next-line no-undef
      (typeof browser !== 'undefined' && browser.runtime && browser.runtime.id) ||
      window.location.protocol === 'chrome-extension:' ||
      window.location.protocol === 'moz-extension:' ||
      document.documentElement.hasAttribute('data-extension-context') ||
      navigator.userAgent.includes('Extension') ||
      window.location.href.includes('extension://') ||
      window.location.href.includes('moz-extension://') ||
      (typeof window !== 'undefined' && window.chrome && window.chrome.runtime) ||
      typeof __WEBPACK_EXTERNAL_MODULE__chrome_runtime__ !== 'undefined' ||
      // content.js 파일에서 실행되는 경우 감지
      (typeof window !== 'undefined' && window.location && 
       window.location.href.includes('content.js'))
    );
  } catch {
    return false;
  }
};

/**
 * 안전한 저장소 접근 함수
 */
const safeStorageAccess = (storage, method, ...args) => {
  try {
    // 확장 프로그램 컨텍스트에서는 접근 차단
    if (isExtensionContext()) {
      // 조용히 처리 (콘솔에 출력하지 않음)
      return method === 'getItem' ? null : undefined;
    }
    
    // 저장소 접근 가능 여부 확인
    try {
      const testKey = '__storage_test__';
      storage.setItem(testKey, 'test');
      storage.removeItem(testKey);
    } catch {
      // 저장소 접근 불가능
      return method === 'getItem' ? null : undefined;
    }
    
    return storage[method](...args);
  } catch (e) {
    // 에러 메시지에 "storage is not allowed"가 포함된 경우 조용히 처리
    if (e.message && e.message.includes('storage is not allowed')) {
      return method === 'getItem' ? null : undefined;
    }
    // 다른 에러는 조용히 처리 (콘솔에 출력하지 않음)
    return method === 'getItem' ? null : undefined;
  }
};

/**
 * 저장소 가드 설정 (DRY 원칙 적용 - 중복 제거)
 * @param {Storage} storage - localStorage 또는 sessionStorage
 * @param {string} storageName - 저장소 이름 (에러 메시지용)
 */
const setupStorageGuard = (storage, storageName) => {
  if (!storage) {
    console.warn(`Cannot setup guard for ${storageName}: storage not available`);
    return;
  }

  const storageMethods = ['setItem', 'getItem', 'removeItem', 'clear'];
  
  try {
    storageMethods.forEach((method) => {
      Object.defineProperty(storage, method, {
        value: function(...args) {
          return safeStorageAccess(this, method, ...args);
        },
        writable: false,
        configurable: false
      });
    });
  } catch (e) {
    console.warn(`Failed to setup ${storageName} guard:`, e.message);
  }
};

/**
 * localStorage 가드 설정
 */
const setupLocalStorageGuard = () => {
  setupStorageGuard(localStorage, 'localStorage');
};

/**
 * sessionStorage 가드 설정
 */
const setupSessionStorageGuard = () => {
  setupStorageGuard(sessionStorage, 'sessionStorage');
};

/**
 * 쿠키 접근 가드 설정
 */
const setupCookieGuard = () => {
  try {
    const originalCookieDescriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie') ||
                                   Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie');

    if (originalCookieDescriptor && originalCookieDescriptor.set) {
      Object.defineProperty(document, 'cookie', {
        get: originalCookieDescriptor.get,
        set: function(value) {
          try {
            if (isExtensionContext()) {
              console.warn('Cookie set blocked in extension context');
              return;
            }
            originalCookieDescriptor.set.call(this, value);
          } catch (e) {
            console.warn('Cookie set failed:', e.message);
          }
        },
        configurable: true
      });
    }
  } catch (e) {
    console.warn('Failed to setup cookie guard:', e.message);
  }
};

/**
 * 글로벌 오류 핸들러 설정
 */
const setupGlobalErrorHandler = () => {
  // 저장소 접근 오류를 전역적으로 캐치
  window.addEventListener('error', (event) => {
    // 확장 프로그램 관련 오류 무시
    const message = event.message || '';
    if (message && (
        message.includes('storage is not allowed') ||
        message.includes('Access to storage') ||
        message.includes('extension port') ||
        message.includes('message channel is closed') ||
        message.includes('back/forward cache') ||
        message.includes('content.js')
    )) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }, true); // capture phase에서 처리

  // Promise rejection 오류 캐치
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    const message = reason instanceof Error ? reason.message : 
                   typeof reason === 'string' ? reason : 
                   reason?.message || '';
    
    if (message && (
        message.includes('storage is not allowed') ||
        message.includes('Access to storage') ||
        message.includes('extension port') ||
        message.includes('message channel is closed') ||
        message.includes('back/forward cache') ||
        message.includes('content.js')
    )) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }, true); // capture phase에서 처리
};

/**
 * 저장소 가드 초기화
 */
export const initStorageGuard = () => {
  try {
    setupGlobalErrorHandler();
    setupLocalStorageGuard();
    setupSessionStorageGuard();
    setupCookieGuard();
    
    console.log('Storage guard initialized successfully');
  } catch (e) {
    console.warn('Failed to initialize storage guard:', e.message);
  }
};

/**
 * 저장소 가드 비활성화 (필요시)
 */
export const disableStorageGuard = () => {
  try {
    // 원본 메서드들로 복원
    Object.defineProperty(localStorage, 'setItem', {
      value: originalLocalStorage.setItem,
      writable: false,
      configurable: false
    });
    
    Object.defineProperty(localStorage, 'getItem', {
      value: originalLocalStorage.getItem,
      writable: false,
      configurable: false
    });
    
    Object.defineProperty(localStorage, 'removeItem', {
      value: originalLocalStorage.removeItem,
      writable: false,
      configurable: false
    });
    
    Object.defineProperty(localStorage, 'clear', {
      value: originalLocalStorage.clear,
      writable: false,
      configurable: false
    });
    
    // sessionStorage도 복원
    Object.defineProperty(sessionStorage, 'setItem', {
      value: originalSessionStorage.setItem,
      writable: false,
      configurable: false
    });
    
    Object.defineProperty(sessionStorage, 'getItem', {
      value: originalSessionStorage.getItem,
      writable: false,
      configurable: false
    });
    
    Object.defineProperty(sessionStorage, 'removeItem', {
      value: originalSessionStorage.removeItem,
      writable: false,
      configurable: false
    });
    
    Object.defineProperty(sessionStorage, 'clear', {
      value: originalSessionStorage.clear,
      writable: false,
      configurable: false
    });
    
    console.log('Storage guard disabled');
  } catch (e) {
    console.warn('Failed to disable storage guard:', e.message);
  }
};

// 자동 초기화
if (typeof window !== 'undefined') {
  initStorageGuard();
}
