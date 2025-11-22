/**
 * DraggableGrid 컴포넌트 관련 상수
 * 매직 넘버와 하드코딩된 값을 중앙에서 관리
 */

// 그리드 레이아웃 설정
export const GRID_CONFIG = {
  DESKTOP: {
    COLUMNS: 5,
    ROWS: 8,
  },
  MOBILE: {
    COLUMNS: 4,
    ROWS: 10,
  },
};

// 반응형 브레이크포인트 (px)
export const BREAKPOINTS = {
  MOBILE: 799,
  TABLET: 1279,
  DESKTOP: 1280,
};

// 헤더 높이 (px)
export const HEADER_HEIGHTS = {
  MOBILE: 60,
  TABLET: 68,
  DESKTOP: 100,
};

// 애니메이션 타이밍 (ms)
export const ANIMATION_DURATION = {
  FAST: 300,
  NORMAL: 800,
  SLOW: 1200,
  DETAILS_OPEN: 800,
  DETAILS_CLOSE: 1200,
  PRODUCT_FLIP: 600,
  CROSS_APPEAR: 400,
  CROSS_DELAY: 500,
};

// 애니메이션 이징
export const EASING = {
  IN_OUT: 'power3.inOut',
  OUT: 'power2.out',
  IN: 'power3.in',
};

// 상세창 위치 (vw 단위)
export const DETAILS_POSITION = {
  DESKTOP: {
    WIDTH: 50,
    INITIAL_X: 50,
  },
  TABLET: {
    WIDTH: 60,
    INITIAL_X: 60,
  },
  MOBILE: {
    WIDTH: 100,
    INITIAL_X: 100,
  },
};

// 패딩 값 (px)
export const PADDING = {
  MOBILE: {
    TOP: 40,
    SIDE: 16,
    BOTTOM: 80,
  },
  TABLET: {
    TOP_OFFSET: 28,
    SIDE: 5,
    BOTTOM: 100,
  },
  DESKTOP: {
    TOP_OFFSET: 40,
    SIDE: 4,
    BOTTOM: 100,
  },
};

// 터치 이벤트 임계값 (px)
export const TOUCH_THRESHOLD = 15;

// 디바운스/스로틀링 지연 시간 (ms)
export const DEBOUNCE_DELAY = {
  RESIZE: 300,
  SCROLL_TO_GALLERY: 200,
  TOUCH_END: 50,
  TOUCH_RESET: 100,
};

// 툴팁 오프셋 (px)
export const TOOLTIP_OFFSET = {
  X: 15,
  Y: 15,
};

// 그리드 스케일
export const GRID_SCALE = {
  MIN: 0.5,
  MAX: 1,
};

// 상세창 초기 상태
export const DETAILS_INITIAL_STATE = {
  OPACITY: 0,
  DISPLAY: 'none',
  POINTER_EVENTS: 'none',
  VISIBILITY: 'hidden',
};

// 상세창 활성 상태
export const DETAILS_ACTIVE_STATE = {
  OPACITY: 1,
  DISPLAY: 'flex',
  POINTER_EVENTS: 'auto',
  VISIBILITY: 'visible',
};

