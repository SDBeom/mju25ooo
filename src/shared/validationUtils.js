/**
 * 입력값 검증 유틸리티 함수
 * XSS 방지 및 입력값 검증
 */

/**
 * 문자열이 안전한지 검증 (XSS 방지)
 * @param {string} str - 검증할 문자열
 * @returns {boolean} 안전한 문자열인지 여부
 */
export const isSafeString = (str) => {
  if (typeof str !== 'string') return false;
  
  // 위험한 패턴 검사
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i, // onclick, onerror 등
    /<iframe/i,
    /<object/i,
    /<embed/i,
  ];
  
  return !dangerousPatterns.some(pattern => pattern.test(str));
};

/**
 * HTML 이스케이프 처리 (XSS 방지)
 * @param {string} str - 이스케이프할 문자열
 * @returns {string} 이스케이프된 문자열
 */
export const escapeHtml = (str) => {
  if (typeof str !== 'string') return '';
  
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  
  return str.replace(/[&<>"']/g, (m) => map[m]);
};

/**
 * URL이 안전한지 검증
 * @param {string} url - 검증할 URL
 * @returns {boolean} 안전한 URL인지 여부
 */
export const isSafeUrl = (url) => {
  if (typeof url !== 'string') return false;
  
  try {
    const urlObj = new URL(url);
    // 허용된 프로토콜만
    const allowedProtocols = ['http:', 'https:', 'mailto:'];
    return allowedProtocols.includes(urlObj.protocol);
  } catch {
    // 상대 경로는 허용
    return url.startsWith('/') || !url.includes(':');
  }
};

/**
 * 숫자가 유효한 범위 내에 있는지 검증
 * @param {number} value - 검증할 숫자
 * @param {number} min - 최소값
 * @param {number} max - 최대값
 * @returns {boolean} 유효한 범위 내인지 여부
 */
export const isInRange = (value, min, max) => {
  if (typeof value !== 'number' || isNaN(value)) return false;
  return value >= min && value <= max;
};

/**
 * 배열이 유효한지 검증
 * @param {any} arr - 검증할 값
 * @returns {boolean} 유효한 배열인지 여부
 */
export const isValidArray = (arr) => {
  return Array.isArray(arr) && arr.length > 0;
};

/**
 * 객체가 유효한지 검증
 * @param {any} obj - 검증할 값
 * @returns {boolean} 유효한 객체인지 여부
 */
export const isValidObject = (obj) => {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj);
};

