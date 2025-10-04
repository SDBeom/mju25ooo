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
      (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id) ||
      (typeof browser !== 'undefined' && browser.runtime && browser.runtime.id) ||
      window.location.protocol === 'chrome-extension:' ||
      window.location.protocol === 'moz-extension:' ||
      document.documentElement.hasAttribute('data-extension-context') ||
      navigator.userAgent.includes('Extension') ||
      window.location.href.includes('extension://') ||
      window.location.href.includes('moz-extension://') ||
      (typeof window !== 'undefined' && window.chrome && window.chrome.runtime) ||
      typeof __WEBPACK_EXTERNAL_MODULE__chrome_runtime__ !== 'undefined'
    );
  } catch (e) {
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
      console.warn(`Storage ${method} blocked in extension context`);
      return method === 'getItem' ? null : undefined;
    }
    
    return storage[method](...args);
  } catch (e) {
    console.warn(`Storage ${method} failed:`, e.message);
    return method === 'getItem' ? null : undefined;
  }
};

/**
 * localStorage 가드 설정
 */
const setupLocalStorageGuard = () => {
  try {
    Object.defineProperty(localStorage, 'setItem', {
      value: function(key, value) {
        return safeStorageAccess(this, 'setItem', key, value);
      },
      writable: false,
      configurable: false
    });

    Object.defineProperty(localStorage, 'getItem', {
      value: function(key) {
        return safeStorageAccess(this, 'getItem', key);
      },
      writable: false,
      configurable: false
    });

    Object.defineProperty(localStorage, 'removeItem', {
      value: function(key) {
        return safeStorageAccess(this, 'removeItem', key);
      },
      writable: false,
      configurable: false
    });

    Object.defineProperty(localStorage, 'clear', {
      value: function() {
        return safeStorageAccess(this, 'clear');
      },
      writable: false,
      configurable: false
    });
  } catch (e) {
    console.warn('Failed to setup localStorage guard:', e.message);
  }
};

/**
 * sessionStorage 가드 설정
 */
const setupSessionStorageGuard = () => {
  try {
    Object.defineProperty(sessionStorage, 'setItem', {
      value: function(key, value) {
        return safeStorageAccess(this, 'setItem', key, value);
      },
      writable: false,
      configurable: false
    });

    Object.defineProperty(sessionStorage, 'getItem', {
      value: function(key) {
        return safeStorageAccess(this, 'getItem', key);
      },
      writable: false,
      configurable: false
    });

    Object.defineProperty(sessionStorage, 'removeItem', {
      value: function(key) {
        return safeStorageAccess(this, 'removeItem', key);
      },
      writable: false,
      configurable: false
    });

    Object.defineProperty(sessionStorage, 'clear', {
      value: function() {
        return safeStorageAccess(this, 'clear');
      },
      writable: false,
      configurable: false
    });
  } catch (e) {
    console.warn('Failed to setup sessionStorage guard:', e.message);
  }
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
            return originalCookieDescriptor.set.call(this, value);
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
    if (event.message && event.message.includes('storage is not allowed')) {
      event.preventDefault();
      console.warn('Storage access blocked:', event.message);
      return false;
    }
  });

  // Promise rejection 오류 캐치
  window.addEventListener('unhandledrejection', (event) => {
    if (event.reason && event.reason.message && 
        event.reason.message.includes('storage is not allowed')) {
      event.preventDefault();
      console.warn('Storage access blocked in promise:', event.reason.message);
      return false;
    }
  });
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
    
    console.log('Storage guard disabled');
  } catch (e) {
    console.warn('Failed to disable storage guard:', e.message);
  }
};

// 자동 초기화
if (typeof window !== 'undefined') {
  initStorageGuard();
}
