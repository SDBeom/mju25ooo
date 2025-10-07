# 🔍 ComingSoonFooter CSS 충돌 분석 결과

## ⚠️ 발견된 문제점

### 1. 중복 스타일 (충돌 위험)

#### `.exhibition-detail`와 `.copyright-text`
```jsx
// JSX에서 두 클래스를 함께 사용
<div className="exhibition-detail copyright-text">
  {EXHIBITION_INFO.COPYRIGHT}
</div>
```

```css
/* 중복 1: 색상 */
.exhibition-detail {
  color: rgba(255, 255, 255, 0.8);  ← 중복
  font-size: 0.85rem;                ← 중복
  font-weight: 400;                  ← 중복
}

.copyright-text {
  color: rgba(255, 255, 255, 0.8);  ← 중복
  font-size: 0.85rem;                ← 중복
  font-weight: 400;                  ← 중복
}
```

**문제**: 같은 속성을 두 번 정의 → 불필요한 중복

---

### 2. Specificity 확인

```css
/* Specificity: 10점 */
.exhibition-detail { }

/* Specificity: 10점 */
.copyright-text { }

/* 요소에 두 클래스가 함께 있으면? */
/* 마지막에 정의된 것이 우선 (CSS 순서에 따라) */
```

**현재**: `.copyright-text`가 나중에 정의되어 있어도 속성이 같아서 문제없음
**하지만**: 나중에 속성 변경 시 혼란 가능

---

## ✅ 권장 해결 방법

### 방법 1: `.copyright-text` 제거 (가장 간단)

```jsx
// JSX
<div className="exhibition-detail">
  {EXHIBITION_INFO.COPYRIGHT}
</div>
```

```css
/* CSS - .copyright-text 삭제 */
.exhibition-detail {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
  font-weight: 400;
}

/* .copyright-text 제거! */
```

---

### 방법 2: `.copyright-text`만 사용

```jsx
// JSX
<div className="copyright-text">
  {EXHIBITION_INFO.COPYRIGHT}
</div>
```

```css
/* CSS */
.exhibition-detail {
  /* 일반 전시 정보 */
}

.copyright-text {
  /* 저작권 정보 (독립적) */
  color: rgba(255, 255, 255, 0.6);  /* 약간 흐리게 */
  font-size: 0.75rem;                /* 약간 작게 */
}
```

---

### 방법 3: 상속 구조 (권장 ⭐)

```css
/* 공통 스타일 */
.exhibition-info > * {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
  font-weight: 400;
  margin: 0;
  line-height: 1.5;
}

/* 특별한 경우만 오버라이드 */
.copyright-text {
  opacity: 0.7; /* 약간 흐리게 */
  font-size: 0.8rem; /* 약간 작게 */
}
```

---

## 🎯 충돌 요약

| 속성 | `.exhibition-detail` | `.copyright-text` | 충돌? |
|------|---------------------|-------------------|-------|
| `color` | `rgba(255,255,255,0.8)` | `rgba(255,255,255,0.8)` | ⚠️ 중복 |
| `font-size` | `0.85rem` | `0.85rem` | ⚠️ 중복 |
| `font-weight` | `400` | `400` | ⚠️ 중복 |
| `margin` | `0` | `0` | ⚠️ 중복 |

**결론**: 직접적인 충돌은 없지만, 불필요한 중복이 많음!

