/**
 * 안전한 브라우저 저장소 접근 유틸리티
 * 
 * 브라우저의 개인정보 보호 설정으로 인한 저장소 접근 차단을 안전하게 처리합니다.
 * 쿠키 차단, 시크릿 모드, iframe 환경 등에서도 안정적으로 동작합니다.
 */

/**
 * 브라우저 저장소 접근 가능성 확인
 * @returns {boolean} 저장소 접근 가능 여부
 */
export const isStorageAvailable = () => {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * 안전한 localStorage 접근
 * @param {string} key - 키
 * @param {string} value - 값 (옵션, 설정 시 사용)
 * @returns {string|null} 저장된 값 또는 null
 */
export const safeLocalStorage = (key, value = null) => {
  try {
    if (value !== null) {
      localStorage.setItem(key, value);
      return value;
    } else {
      return localStorage.getItem(key);
    }
  } catch (e) {
    console.warn(`localStorage ${value !== null ? 'set' : 'get'} failed for key "${key}":`, e.message);
    return null;
  }
};

/**
 * 안전한 sessionStorage 접근
 * @param {string} key - 키
 * @param {string} value - 값 (옵션, 설정 시 사용)
 * @returns {string|null} 저장된 값 또는 null
 */
export const safeSessionStorage = (key, value = null) => {
  try {
    if (value !== null) {
      sessionStorage.setItem(key, value);
      return value;
    } else {
      return sessionStorage.getItem(key);
    }
  } catch (e) {
    console.warn(`sessionStorage ${value !== null ? 'set' : 'get'} failed for key "${key}":`, e.message);
    return null;
  }
};

/**
 * 안전한 쿠키 접근
 * @param {string} name - 쿠키 이름
 * @param {string} value - 값 (옵션, 설정 시 사용)
 * @param {number} days - 만료일 (옵션)
 * @returns {string|null} 쿠키 값 또는 null
 */
export const safeCookie = (name, value = null, days = 30) => {
  try {
    if (value !== null) {
      const expires = new Date();
      expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
      return value;
    } else {
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    }
  } catch (e) {
    console.warn(`Cookie ${value !== null ? 'set' : 'get'} failed for name "${name}":`, e.message);
    return null;
  }
};

/**
 * 저장소 접근 실패 시 대체 데이터 저장소 (메모리 기반)
 */
class MemoryStorage {
  constructor() {
    this.data = new Map();
  }

  setItem(key, value) {
    this.data.set(key, value);
  }

  getItem(key) {
    return this.data.get(key) || null;
  }

  removeItem(key) {
    this.data.delete(key);
  }

  clear() {
    this.data.clear();
  }
}

// 메모리 기반 대체 저장소 인스턴스
const memoryStorage = new MemoryStorage();

/**
 * 저장소 접근 실패 시 메모리 저장소로 폴백
 * @param {string} key - 키
 * @param {string} value - 값 (옵션, 설정 시 사용)
 * @returns {string|null} 저장된 값 또는 null
 */
export const safeStorageWithFallback = (key, value = null) => {
  // localStorage 시도
  const result = safeLocalStorage(key, value);
  if (result !== null || value === null) {
    return result;
  }

  // localStorage 실패 시 메모리 저장소 사용
  try {
    if (value !== null) {
      memoryStorage.setItem(key, value);
      return value;
    } else {
      return memoryStorage.getItem(key);
    }
  } catch (e) {
    console.warn(`Memory storage fallback failed for key "${key}":`, e.message);
    return null;
  }
};

/**
 * 저장소 접근 가능성 확인 및 사용자 알림
 * @returns {boolean} 저장소 접근 가능 여부
 */
export const checkStorageAvailability = () => {
  const isAvailable = isStorageAvailable();
  
  if (!isAvailable) {
    console.warn(
      '브라우저 저장소 접근이 차단되었습니다.\n' +
      '가능한 원인:\n' +
      '1. 쿠키 차단 설정\n' +
      '2. 시크릿 모드 사용\n' +
      '3. 광고 차단기 또는 보안 확장 프로그램\n' +
      '4. iframe 환경에서의 서드 파티 정책\n' +
      '\n일부 기능이 제한될 수 있습니다.'
    );
  }
  
  return isAvailable;
};

/**
 * 저장소 접근 오류 처리
 * @param {Error} error - 오류 객체
 * @param {string} operation - 작업 유형 (get, set, remove)
 * @param {string} key - 키
 * @returns {Object} 오류 정보
 */
export const handleStorageError = (error, operation, key) => {
  const errorInfo = {
    type: 'STORAGE_ERROR',
    operation,
    key,
    message: error.message,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    isIncognito: !isStorageAvailable(),
    url: window.location.href
  };

  console.warn(`Storage ${operation} failed for key "${key}":`, errorInfo);
  
  return errorInfo;
};
