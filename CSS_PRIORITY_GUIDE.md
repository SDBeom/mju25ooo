# CSS 우선순위 & 충돌 가이드

## 🎯 핵심: 충돌하지 않는 이유

### 1. CSS Cascade (폭포) 원리

CSS는 위에서 아래로 흐릅니다:

```css
/* 1번 */
.box {
  color: red;
}

/* 2번 */
.box {
  color: blue;  /* ← 이게 적용됨 (나중에 나와서) */
}
```

**결과**: blue (나중에 나온 게 덮어씀)

---

### 2. Media Query는 조건부

```css
/* 항상 적용 */
.box {
  color: red;
}

/* 768px 이상일 때만 */
@media (min-width: 768px) {
  .box {
    color: blue;
  }
}

/* 1024px 이상일 때만 */
@media (min-width: 1024px) {
  .box {
    color: green;
  }
}
```

**결과**:
- 500px 화면: red (조건 안 맞음)
- 800px 화면: blue (768px 조건 맞음)
- 1200px 화면: green (1024px 조건 맞음)

**충돌 없음!** ✅ 조건이 다르기 때문

---

### 3. Specificity (구체성)

```css
/* Specificity: 10점 */
.box {
  color: red;
}

/* Specificity: 20점 (더 구체적!) */
.container .box {
  color: blue;  /* ← 이게 적용됨 */
}

/* Specificity: 30점 (가장 구체적!) */
.wrapper .container .box {
  color: green;  /* ← 이게 적용됨 */
}
```

**충돌 없음!** ✅ 더 구체적인 선택자가 우선

---

## 📊 Specificity 계산표

| 선택자 | 점수 | 예시 |
|-------|-----|-----|
| Element | 1점 | `div`, `p` |
| Class | 10점 | `.box` |
| ID | 100점 | `#header` |
| Inline | 1000점 | `style="..."` |
| !important | 10000점 | `color: red !important` |

### 계산 예시

```css
/* 1점 */
div { }

/* 10점 */
.box { }

/* 11점 */
div.box { }

/* 20점 */
.container .box { }

/* 21점 */
.container div.box { }

/* 110점 */
#header .box { }
```

---

## ✅ 우리 프로젝트의 올바른 방식

### 방법 1: Media Query (권장 ⭐)

```css
/* About.css - 하나의 파일 */

/* Mobile (기본) */
.about-content {
  grid-template-columns: 1fr;
  gap: 2rem;
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .about-content {
    gap: 3rem;  /* 조건이 다름 → 충돌 없음 ✅ */
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .about-content {
    grid-template-columns: 1fr 1fr;  /* 조건이 다름 → 충돌 없음 ✅ */
    gap: 4rem;
  }
}
```

**충돌 없음!** 조건부로 적용됨

---

### 방법 2: 클래스 분기

```css
/* About.css - 하나의 파일 */

/* 공통 (10점) */
.about-content {
  gap: 2rem;
}

/* Desktop (20점 - 더 구체적!) */
.about--desktop .about-content {
  gap: 4rem;  /* Specificity 높음 → 충돌 없음 ✅ */
}

/* Tablet (20점 - 더 구체적!) */
.about--tablet .about-content {
  gap: 3rem;  /* Specificity 높음 → 충돌 없음 ✅ */
}
```

**충돌 없음!** Specificity가 다름

---

## ❌ 잘못된 방식 (충돌 발생!)

### 안 좋은 예시 1: 같은 선택자 중복

```css
/* 이렇게 하면 안 됨! */
.about-content {
  gap: 2rem;  /* Mobile */
}

.about-content {
  gap: 3rem;  /* Tablet - 위를 덮어씀 */
}

.about-content {
  gap: 4rem;  /* Desktop - 위를 덮어씀 */
}

/* 결과: 항상 4rem만 적용됨 (충돌!) ❌ */
```

### 안 좋은 예시 2: CSS 파일 3개

```
❌ About.css          (gap: 2rem)
❌ AboutTablet.css    (gap: 3rem)
❌ AboutDesktop.css   (gap: 4rem)
```

**문제점**:
- 3개 파일 모두 로드되면 충돌 가능
- 관리 어려움
- 불필요한 중복

---

## 🎨 실전 예시

### 현재 화면 크기에 따른 적용

```css
/* About.css - 하나의 파일로 충분! */

/* ============================================
   Mobile First 접근 (권장)
   ============================================ */

/* 기본 (Mobile) */
.about {
  padding: 3rem 0;
}

.about-content {
  grid-template-columns: 1fr;
  gap: 2rem;
}

/* Tablet 이상 */
@media (min-width: 768px) {
  .about {
    padding: 4rem 0;
  }
  
  .about-content {
    gap: 3rem;
  }
}

/* Desktop 이상 */
@media (min-width: 1024px) {
  .about {
    padding: 6rem 0;
  }
  
  .about-content {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
}
```

**화면 크기별 적용**:

| 화면 크기 | 적용되는 스타일 | 결과 |
|----------|---------------|------|
| 400px | Mobile만 | `padding: 3rem`, `gap: 2rem` |
| 900px | Mobile + Tablet | `padding: 4rem`, `gap: 3rem` |
| 1200px | Mobile + Tablet + Desktop | `padding: 6rem`, `gap: 4rem`, `2열 그리드` |

---

## 💡 핵심 정리

### ✅ 충돌하지 않는 이유:

1. **Media Query**: 조건이 다름
2. **클래스 분기**: Specificity가 다름
3. **Cascade**: 규칙에 따라 순서대로 적용

### 📁 권장 파일 구조:

```
components/
└── About/
    ├── About.jsx        ← 1개
    └── About.css        ← 1개 (Media Query로 분기)
```

### 🎯 결론:

**JSX 파일 1개 + CSS 파일 1개 = 충돌 없음!** ✅

Media Query나 클래스로 분기하면 안전하게 처리됩니다.

