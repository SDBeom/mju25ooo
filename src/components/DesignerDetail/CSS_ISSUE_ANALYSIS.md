# 디자이너 페이지 CSS 사라짐 문제 분석 및 해결 방안

## 🔍 문제 원인 분석

### 1. **CSS 파일 중복 Import**
- **문제**: `DesignerShowcase.css`가 15개 이상의 컴포넌트에서 import됨
  - `DesignerShowcase.jsx`
  - `WorkDetailContent.jsx`
  - `DefaultWorkLayout.jsx`
  - `LeeJiminVeneti.jsx`
  - `LeeJiminLeLabo.jsx`
  - `LeeUn9e9e9e.jsx`
  - `LeeUnLayered.jsx`
  - `LeeDayoungReadyToMerry.jsx`
  - `Caravan.jsx`
  - `GoFetch.jsx`
  - `Petrichor.jsx`
  - `HelloUniverse.jsx`
  - `LoveAtRustSight.jsx`
  - `WorkModal.jsx`
  
- **영향**: Vite는 중복 import를 처리하지만, 동적 import나 조건부 렌더링 시 CSS가 제대로 로드되지 않을 수 있음

### 2. **CSS 파일 크기 문제**
- **문제**: `DesignerShowcase.css`가 **16,665줄**로 매우 큼
- **영향**: 
  - 빌드 시 CSS 최적화 과정에서 문제 발생 가능
  - 브라우저 파싱 시간 증가
  - 메모리 사용량 증가

### 3. **Vite CSS 최적화 설정**
- **문제**: `vite.config.js`에서 CSS 최적화 설정이 있지만, 큰 CSS 파일에 대한 특별한 처리가 없음
- **영향**: 빌드 시 CSS가 청크로 분할되거나 최적화 과정에서 일부 스타일이 누락될 수 있음

### 4. **동적 라우팅 시 CSS 재로드 문제**
- **문제**: SPA 라우팅을 사용하고 있어, 컴포넌트가 언마운트/마운트될 때 CSS가 다시 로드되지 않을 수 있음
- **영향**: 페이지 이동 시 CSS가 사라지는 것처럼 보일 수 있음

### 5. **CSS 특이성 충돌**
- **문제**: `App.css`와 `DesignerShowcase.css`에 같은 선택자가 있어 충돌 가능
  - `.main-window__container--full .designer-showcase`가 양쪽에 존재
- **영향**: 스타일이 덮어씌워지거나 예상치 못한 동작 발생

### 6. **브라우저 캐싱 문제**
- **문제**: 개발 서버의 캐싱 헤더 설정(`Cache-Control: public, max-age=31536000`)이 문제를 일으킬 수 있음
- **영향**: CSS 파일이 업데이트되어도 브라우저가 캐시된 버전을 사용할 수 있음

### 7. **CSS Import Guard의 한계**
- **문제**: `cssImportGuard.js`가 개발 모드에서만 작동하고, 실제 CSS 로드를 강제하지 않음
- **영향**: CSS가 로드되지 않았을 때 경고만 표시하고 실제로 로드하지 않음

## 🛠️ 해결 방안

### 방안 1: CSS 파일 중앙화 (권장)
- **목적**: CSS import를 한 곳으로 집중시켜 중복을 제거
- **방법**:
  1. `DesignerShowcase.jsx`에서만 `DesignerShowcase.css`를 import
  2. 다른 컴포넌트에서는 CSS import 제거
  3. Vite가 자동으로 CSS를 번들링

### 방안 2: CSS 파일 분할
- **목적**: 큰 CSS 파일을 작은 단위로 분할하여 관리
- **방법**:
  1. `DesignerShowcase.css`를 여러 파일로 분할
     - `DesignerShowcase.base.css` (기본 스타일)
     - `DesignerShowcase.works.css` (작품별 스타일)
     - `DesignerShowcase.modals.css` (모달 스타일)
  2. 각 파일을 필요한 컴포넌트에서만 import

### 방안 3: CSS Import 강제 보장
- **목적**: CSS가 반드시 로드되도록 보장
- **방법**:
  1. `DesignerShowcase.jsx`에서 CSS import를 최상단에 배치
  2. `useEffect`에서 CSS 로드를 확인하고, 없으면 강제로 로드
  3. 인라인 스타일을 fallback으로 사용

### 방안 4: Vite 설정 최적화
- **목적**: CSS 빌드 최적화 설정 개선
- **방법**:
  1. `vite.config.js`에서 CSS 최적화 설정 추가
  2. CSS 파일 크기 제한 설정
  3. CSS 청크 분할 전략 개선

### 방안 5: CSS 특이성 통일
- **목적**: CSS 충돌 방지
- **방법**:
  1. `App.css`에서 디자이너 페이지 관련 스타일 제거
  2. 모든 디자이너 페이지 스타일을 `DesignerShowcase.css`에 집중
  3. CSS 특이성 순서 통일

## 🎯 즉시 적용 가능한 해결책

### 1. CSS Import 중앙화
가장 간단하고 효과적인 방법입니다. 모든 WorkDetails 컴포넌트에서 CSS import를 제거하고, `DesignerShowcase.jsx`에서만 import하도록 변경합니다.

### 2. CSS 로드 강제 보장
`DesignerShowcase.jsx`에서 CSS가 로드되었는지 확인하고, 없으면 강제로 로드하는 로직을 추가합니다.

### 3. 인라인 스타일 Fallback
CSS가 로드되지 않았을 때를 대비해 인라인 스타일을 fallback으로 사용합니다.

## 📝 권장 사항

1. **단기**: CSS Import 중앙화 + CSS 로드 강제 보장
2. **중기**: CSS 파일 분할 (유지보수성 향상)
3. **장기**: CSS 아키텍처 재설계 (CSS-in-JS 또는 CSS Modules 고려)


