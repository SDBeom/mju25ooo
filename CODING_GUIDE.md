# 코딩 가이드 (Coding Guide)

이 문서는 프로젝트의 코드 작성 규칙과 컨벤션을 정의합니다. 코드 수정 시 반드시 이 가이드를 따르세요.

## 📋 목차

1. [CSS 작성 규칙](#css-작성-규칙)
2. [컴포넌트 구조](#컴포넌트-구조)
3. [반응형 디자인](#반응형-디자인)
4. [모달 시스템](#모달-시스템)
5. [클래스명 규칙](#클래스명-규칙)
6. [파일 구조](#파일-구조)

---

## CSS 작성 규칙

### ❌ 금지 사항

1. **`!important` 사용 금지**
   - `!important`는 CSS 우선순위를 강제하므로 유지보수가 어렵습니다
   - 대신 CSS 선택자 특이성(specificity)을 활용하거나 구조를 개선하세요
   - 예외: 정말 필요한 경우에만 사용 (예: 외부 라이브러리 오버라이드)

2. **인라인 스타일 사용 금지**
   - JSX의 `style` 속성 사용 지양
   - CSS 클래스를 사용하세요

### ✅ 권장 사항

1. **Mobile First 접근**
   ```css
   /* 기본 스타일은 모바일용 */
   .component {
     padding: 16px;
   }
   
   /* 데스크탑은 미디어 쿼리로 확장 */
   @media (min-width: 1280px) {
     .component {
       padding: 40px;
     }
   }
   ```

2. **CSS 변수 활용**
   ```css
   /* index.css에 정의된 변수 사용 */
   z-index: var(--z-modal, 1000);
   color: var(--color-text-primary);
   ```

3. **의미 있는 클래스명**
   - BEM 방법론 권장: `block__element--modifier`
   - 예: `modal-overlay`, `work-card__title`, `designer-showcase__header`

---

## 반응형 디자인

### Breakpoint 정의

```css
/* Mobile: ~799px */
@media (max-width: 799px) { }

/* Tablet: 800px ~ 1279px */
@media (min-width: 800px) and (max-width: 1279px) { }

/* Desktop: 1280px 이상 */
@media (min-width: 1280px) { }
```

### 모바일 모달 너비

- **800px 미만**: 모든 모바일 기기에서 모달 너비 **375px 고정**
- 특정 픽셀 값(예: 375px)에 대한 별도 미디어 쿼리 금지
- 모든 모바일 기기에서 동일한 레이아웃 유지

```css
/* ✅ 올바른 방법 */
@media (max-width: 799px) {
  .modal-wrapper {
    width: 375px;
    max-width: 375px;
  }
}

/* ❌ 잘못된 방법 - 특정 픽셀 값에 대한 미디어 쿼리 */
@media (max-width: 375px) {
  .modal-wrapper {
    width: 375px;
  }
}
```

---

## 모달 시스템

### 모달 컴포넌트 구조

```
Modal.jsx
├── modal-overlay (배경 오버레이)
├── modal-wrapper (모달 컨테이너)
│   ├── modal-topbar (상단바)
│   │   ├── modal-topbar__name
│   │   └── modal-topbar__close
│   └── modal-content (콘텐츠 영역)
```

### 모달 스타일 파일

- **`Modal.css`**: 모달의 기본 스타일 정의
  - 반드시 존재해야 함 (빈 파일 금지)
  - `.modal-overlay`, `.modal-wrapper`, `.modal-content` 기본 스타일 포함

### 모달 클래스명

- **기본 클래스**: `modal-overlay`, `modal-wrapper`, `modal-content`
- **작품별 추가 클래스**: `modal-content`에 작품별 클래스가 추가됨
  - 예: `modal-content kimyunjung-love-modal`
  - 모든 작품별 클래스는 `constants.js`의 `MODAL.WORK_MODAL_CLASSES`에서 관리
  - 레거시 클래스 (`kim-love-modal`, `kim-work2-modal`) 사용 금지
- **레거시 클래스**: `kim-modal-overlay`, `kim-modal-wrapper` (사용하지 않음)
- 새로운 모달 관련 스타일은 `Modal.css`에 작성

---

## 컴포넌트 구조

### 컴포넌트 파일 구조

```
ComponentName/
├── ComponentName.jsx      # 메인 컴포넌트
├── ComponentName.css      # 스타일 파일
└── SubComponent.jsx        # 하위 컴포넌트 (필요시)
```

### 컴포넌트 작성 규칙

1. **재사용 가능한 컴포넌트 우선**
   - 중복 코드 제거
   - Props를 통한 커스터마이징

2. **단일 책임 원칙**
   - 하나의 컴포넌트는 하나의 역할만 수행

3. **데이터 중심 설계**
   - 하드코딩 지양
   - `designerDetailsData.js` 같은 중앙 데이터 소스 활용

---

## 클래스명 규칙

### BEM 방법론

```css
/* Block */
.designer-showcase { }

/* Element */
.designer-showcase__header { }
.designer-showcase__title { }
.work-card__thumb { }

/* Modifier */
.work-card--featured { }
.work-detail__cta--primary { }
.work-detail__cta--secondary { }
```

### 클래스명 일반화

- ❌ 디자이너 이름을 클래스명에 포함하지 않음
  - 예: `kim-detail`, `kim-modal` (사용 금지)
- ✅ 일반적인 의미의 클래스명 사용
  - 예: `designer-showcase`, `work-card`, `modal-overlay`

---

## 파일 구조

### 주요 디렉토리

```
src/
├── components/
│   ├── Modal/              # 모달 컴포넌트
│   │   ├── Modal.jsx
│   │   └── Modal.css        # 반드시 기본 스타일 포함
│   ├── DesignerDetail/      # 디자이너 상세 페이지
│   │   ├── DesignerShowcase.jsx
│   │   ├── DesignerShowcase.css
│   │   └── WorkDetails/     # 작품별 상세 컴포넌트
│   └── ...
├── data/
│   └── designerDetailsData.js  # 중앙 데이터 소스
└── shared/
    ├── constants.js         # 상수 정의
    └── utils.js             # 유틸리티 함수
```

---

## 코드 수정 체크리스트

코드를 수정할 때 다음을 확인하세요:

### CSS 수정 시
- [ ] `!important` 사용하지 않았는가?
- [ ] 모바일 미디어 쿼리는 `max-width: 799px`를 사용하는가?
- [ ] 특정 픽셀 값(375px)에 대한 별도 미디어 쿼리를 만들지 않았는가?
- [ ] CSS 변수(`var(--z-modal)`)를 활용했는가?
- [ ] 클래스명이 일반화되어 있는가?

### 컴포넌트 수정 시
- [ ] 중복 코드를 제거했는가?
- [ ] Props를 통한 커스터마이징이 가능한가?
- [ ] 데이터는 중앙 데이터 소스에서 가져오는가?

### 모달 관련 수정 시
- [ ] `Modal.css` 파일이 비어있지 않은가?
- [ ] 기본 스타일(`display: flex`, `position: fixed` 등)이 포함되어 있는가?
- [ ] 모바일에서 375px 너비가 올바르게 적용되는가?

---

## 주의사항

### 자주 발생하는 실수

1. **Modal.css 파일을 비우는 실수**
   - 모달이 DOM에 있지만 보이지 않는 문제 발생
   - 항상 기본 스타일을 포함해야 함

2. **특정 픽셀 값에 대한 미디어 쿼리 생성**
   - `@media (max-width: 375px)` 같은 코드는 불필요
   - 모든 모바일은 `max-width: 799px`로 통일

3. **레거시 클래스명 사용**
   - `kim-modal-overlay` 같은 클래스는 사용하지 않음
   - 현재는 `modal-overlay` 사용

---

## 참고 자료

- [BEM 방법론](http://getbem.com/)
- [CSS 변수 사용법](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Mobile First Design](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Responsive/Mobile_first)

---

**마지막 업데이트**: 2024년

