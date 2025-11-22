/**
 * CSS Import Guard
 * 
 * CSS 파일이 제대로 로드되었는지 확인하고,
 * 개발 모드에서 CSS 누락을 감지하여 경고를 표시합니다.
 * 
 * 사용법:
 * import { ensureCSSLoaded } from '../../shared/cssImportGuard';
 * ensureCSSLoaded('DesignerShowcase.css');
 */

/**
 * CSS 파일이 로드되었는지 확인
 * @param {string} cssFileName - 확인할 CSS 파일명 (예: 'DesignerShowcase.css')
 * @param {string} className - CSS 파일에 포함되어 있어야 하는 클래스명 (예: 'designer-showcase')
 * @returns {boolean} CSS가 로드되었는지 여부
 */
export const isCSSLoaded = (cssFileName, className) => {
  if (typeof document === 'undefined') return true; // SSR 환경에서는 항상 true
  
  // 스타일시트 목록에서 해당 CSS 파일 찾기
  const stylesheets = Array.from(document.styleSheets);
  
  for (const sheet of stylesheets) {
    try {
      // CSS 파일 경로 확인
      if (sheet.href && sheet.href.includes(cssFileName)) {
        // 특정 클래스가 정의되어 있는지 확인
        if (className) {
          try {
            const rules = Array.from(sheet.cssRules || []);
            const hasClass = rules.some(rule => {
              if (rule.selectorText) {
                return rule.selectorText.includes(className);
              }
              return false;
            });
            if (hasClass) return true;
          } catch {
            // CORS 문제 등으로 접근 불가능한 경우
            // href만으로 확인
            return true;
          }
        } else {
          return true;
        }
      }
    } catch {
      // CORS 문제로 접근 불가능한 경우 무시
      continue;
    }
  }
  
  return false;
};

/**
 * CSS 파일이 로드되었는지 확인하고, 로드되지 않았으면 경고 표시
 * @param {string} cssFileName - 확인할 CSS 파일명
 * @param {string} className - CSS 파일에 포함되어 있어야 하는 클래스명
 * @param {string} componentName - 컴포넌트 이름 (경고 메시지용)
 */
export const ensureCSSLoaded = (cssFileName, className, componentName = 'Component') => {
  // 프로덕션 모드에서는 체크하지 않음 (성능 최적화)
  if (import.meta.env.PROD) return;
  
  // 개발 모드에서만 체크
  if (import.meta.env.DEV) {
    // 약간의 지연 후 체크 (CSS가 로드될 시간을 줌)
    setTimeout(() => {
      const isLoaded = isCSSLoaded(cssFileName, className);
      
      if (!isLoaded) {
        console.warn(
          `[CSS Import Guard] ${componentName}: CSS 파일 "${cssFileName}"이 로드되지 않았습니다.\n` +
          `다음 사항을 확인하세요:\n` +
          `1. CSS 파일이 올바른 경로에 있는지 확인\n` +
          `2. CSS import 문이 컴포넌트 상단에 있는지 확인\n` +
          `3. CSS 파일이 빌드에 포함되었는지 확인\n` +
          `4. 브라우저 개발자 도구에서 네트워크 탭을 확인하여 CSS 파일이 로드되었는지 확인`
        );
        
        // 추가 정보 제공
        console.info(
          `[CSS Import Guard] 현재 로드된 스타일시트:\n`,
          Array.from(document.styleSheets)
            .map(sheet => sheet.href || 'inline')
            .filter(Boolean)
        );
      }
    }, 100);
  }
};

/**
 * CSS import를 강제로 보장하는 헬퍼 함수
 * 개발 모드에서 CSS 파일이 import되었는지 확인
 * 
 * @param {string} cssPath - CSS 파일 경로 (예: './DesignerShowcase.css')
 * @param {string} className - CSS 파일에 포함되어 있어야 하는 클래스명
 * @param {string} componentName - 컴포넌트 이름
 */
export const guardCSSImport = (cssPath, className, componentName) => {
  // CSS import는 이미 상단에서 수행되어야 함
  // 이 함수는 개발 모드에서만 체크를 수행
  if (import.meta.env.DEV) {
    const cssFileName = cssPath.split('/').pop();
    ensureCSSLoaded(cssFileName, className, componentName);
  }
};


