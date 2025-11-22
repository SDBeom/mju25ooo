/**
 * 디바운싱 및 스로틀링 유틸리티
 * 중복 요청 방지 및 성능 최적화
 */

/**
 * 디바운스 함수
 * @param {Function} func - 실행할 함수
 * @param {number} wait - 대기 시간 (ms)
 * @param {boolean} immediate - 즉시 실행 여부
 * @returns {Function} 디바운스된 함수
 */
export const debounce = (func, wait = 300, immediate = false) => {
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }
  
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    
    const callNow = immediate && !timeout;
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func(...args);
  };
};

/**
 * 스로틀 함수
 * @param {Function} func - 실행할 함수
 * @param {number} limit - 제한 시간 (ms)
 * @returns {Function} 스로틀된 함수
 */
export const throttle = (func, limit = 300) => {
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }
  
  let inThrottle;
  
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

// React 훅은 별도 파일에서 관리하거나 컴포넌트 내에서 직접 구현
// 이 파일은 순수 유틸리티 함수만 제공

