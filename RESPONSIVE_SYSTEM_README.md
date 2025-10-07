# 반응형 시스템 가이드

## 📱 개요

이 프로젝트는 **중앙화된 Breakpoint 관리 시스템**을 사용하여 화면 크기에 따라 자동으로 Desktop/Tablet/Mobile 버전을 불러옵니다.

## 🎯 주요 특징

### 1. **전역 Breakpoint 관리**
- Context API를 사용한 중앙화된 상태 관리
- 모든 컴포넌트에서 동일한 breakpoint 정보 공유
- 불필요한 중복 코드 제거

### 2. **성능 최적화**
- **Debounce**: 150ms 딜레이로 resize 이벤트 최적화
- **단일 이벤트 리스너**: 앱 전체에서 하나의 resize 리스너만 사용
- **메모이제이션**: 불필요한 재렌더링 방지

### 3. **Breakpoint 정의**
```javascript
Mobile:  < 768px
Tablet:  768px ~ 1024px  
Desktop: > 1024px
```

## 📁 파일 구조

```
src/
├── hooks/
│   └── useBreakpoint.js          # Custom Hook - breakpoint 감지
├── contexts/
│   └── BreakpointContext.jsx     # Context Provider
├── components/
│   ├── ResponsiveComponent/
│   │   └── ResponsiveComponent.jsx  # 반응형 래퍼 컴포넌트
│   ├── About/
│   │   ├── About.jsx              # 메인 컴포넌트
│   │   ├── AboutDesktop.jsx       # Desktop 버전
│   │   ├── AboutTablet.jsx        # Tablet 버전
│   │   └── AboutMobile.jsx        # Mobile 버전
│   └── ... (다른 컴포넌트들도 동일한 구조)
└── App.jsx                        # BreakpointProvider로 앱 감싸기
```

## 🔧 사용 방법

### 1. **새로운 반응형 컴포넌트 만들기**

#### Step 1: Desktop/Tablet/Mobile 버전 생성

```jsx
// MyComponentDesktop.jsx
const MyComponentDesktop = () => {
  return <div>Desktop Version</div>;
};

// MyComponentTablet.jsx
const MyComponentTablet = () => {
  return <div>Tablet Version</div>;
};

// MyComponentMobile.jsx
const MyComponentMobile = () => {
  return <div>Mobile Version</div>;
};
```

#### Step 2: 메인 컴포넌트에서 통합

```jsx
// MyComponent.jsx
import React from 'react';
import ResponsiveComponent from '../ResponsiveComponent/ResponsiveComponent';
import MyComponentDesktop from './MyComponentDesktop';
import MyComponentTablet from './MyComponentTablet';
import MyComponentMobile from './MyComponentMobile';

const MyComponent = () => {
  return (
    <ResponsiveComponent
      desktop={MyComponentDesktop}
      tablet={MyComponentTablet}
      mobile={MyComponentMobile}
    />
  );
};

export default MyComponent;
```

### 2. **Props 전달하기**

Props는 자동으로 각 버전 컴포넌트에 전달됩니다:

```jsx
// Props가 있는 컴포넌트
const MyComponent = ({ title, data }) => {
  return (
    <ResponsiveComponent
      desktop={MyComponentDesktop}
      tablet={MyComponentTablet}
      mobile={MyComponentMobile}
      title={title}      // ← 자동으로 전달됨
      data={data}        // ← 자동으로 전달됨
    />
  );
};
```

### 3. **Breakpoint 정보 직접 사용하기**

Context Hook을 사용하여 직접 breakpoint 정보에 접근:

```jsx
import { useBreakpointContext } from '../../contexts/BreakpointContext';

const MyComponent = () => {
  const { isMobile, isTablet, isDesktop, windowWidth } = useBreakpointContext();

  return (
    <div>
      {isMobile && <p>Mobile View (width: {windowWidth}px)</p>}
      {isTablet && <p>Tablet View (width: {windowWidth}px)</p>}
      {isDesktop && <p>Desktop View (width: {windowWidth}px)</p>}
    </div>
  );
};
```

## ⚙️ 설정 변경

### Breakpoint 값 수정

`src/hooks/useBreakpoint.js` 파일에서 수정:

```javascript
export const BREAKPOINTS = {
  MOBILE: 768,   // ← 원하는 값으로 변경
  TABLET: 1024,  // ← 원하는 값으로 변경
};
```

### Debounce 시간 조정

```javascript
const handleResize = debounce(() => {
  // ...
}, 150); // ← 원하는 ms 값으로 변경 (기본값: 150ms)
```

## 🎨 스타일링 권장사항

각 버전별 컴포넌트에 클래스명 추가:

```jsx
// Desktop
<div className="my-component my-component-desktop">
  ...
</div>

// Tablet
<div className="my-component my-component-tablet">
  ...
</div>

// Mobile
<div className="my-component my-component-mobile">
  ...
</div>
```

CSS에서:

```css
/* 공통 스타일 */
.my-component {
  /* ... */
}

/* Desktop 전용 */
.my-component-desktop {
  /* ... */
}

/* Tablet 전용 */
.my-component-tablet {
  /* ... */
}

/* Mobile 전용 */
.my-component-mobile {
  /* ... */
}
```

## ✅ 장점

1. **중앙화된 관리**: 모든 breakpoint 로직이 한 곳에서 관리됨
2. **성능 최적화**: Debounce와 단일 이벤트 리스너로 성능 향상
3. **코드 재사용**: 중복 코드 제거
4. **유지보수 용이**: Breakpoint 변경 시 한 곳만 수정
5. **타입 안전성**: 명확한 디바이스 타입 정의
6. **확장성**: 새로운 breakpoint 추가 용이

## 🚀 적용된 컴포넌트

- ✅ About
- ✅ Hero
- ✅ Works
- ✅ Header
- ✅ Footer
- ✅ MainContent
- ✅ CirclePattern
- ✅ Designer
- ✅ DesignerDetail

## 📝 예시: 실제 사용 사례

```jsx
// App.jsx에서
import { BreakpointProvider } from './contexts/BreakpointContext';

function App() {
  return (
    <BreakpointProvider>  {/* ← 전체 앱을 감싸기 */}
      <YourApp />
    </BreakpointProvider>
  );
}
```

이제 화면 크기가 변경되면 자동으로 해당 사이즈에 맞는 컴포넌트가 로드됩니다! 🎉

