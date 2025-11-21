/**
 * URL 관련 유틸리티 함수
 */

/**
 * URL에서 디자이너 이름 추출
 * @param {string} pathname - window.location.pathname
 * @returns {string|null} 디자이너 이름 또는 null
 */
export const extractDesignerNameFromUrl = (pathname) => {
  if (!pathname || typeof pathname !== 'string') {
    return null;
  }

  const match = pathname.match(/^\/designer\/(.+)$/);
  if (!match || !match[1]) {
    return null;
  }

  let designerName = match[1];
  
  // URL 디코딩 (여러 번 인코딩된 경우 대비)
  try {
    designerName = decodeURIComponent(designerName);
    // 한글이 깨진 경우 다시 시도
    if (designerName.includes('%')) {
      designerName = decodeURIComponent(designerName);
    }
  } catch (e) {
    // 디코딩 실패 시 원본 사용
    console.warn('Failed to decode designer name:', e);
  }

  return designerName;
};

/**
 * 디자이너 이름을 URL에 안전하게 인코딩
 * @param {string} designerName - 디자이너 이름
 * @returns {string} 인코딩된 디자이너 이름
 */
export const encodeDesignerNameForUrl = (designerName) => {
  if (!designerName || typeof designerName !== 'string') {
    return '';
  }
  return encodeURIComponent(designerName);
};

