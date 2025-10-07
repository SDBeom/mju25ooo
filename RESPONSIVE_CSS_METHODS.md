# CSS 반응형 처리 방법 비교

## 방법 1: 클래스명 분기 (동적 클래스)

### JSX
```jsx
const About = () => {
  const { deviceType } = useBreakpointContext(); // 'mobile' | 'tablet' | 'desktop'
  
  return (
    <section className={`about about--${deviceType}`}>
      {/* deviceType에 따라 클래스가 변함:
          about--mobile
          about--tablet
          about--desktop
      */}
    </section>
  );
};
```

### CSS (하나의 파일)
```css
/* About.css */

/* 공통 스타일 */
.about {
  padding: 6rem 0;
  background: #2A2A2A;
}

/* Desktop 전용 (1024px 이상) */
.about--desktop .about-content {
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

/* Tablet 전용 (768px ~ 1024px) */
.about--tablet .about-content {
  grid-template-columns: 1fr;
  gap: 3rem;
}

/* Mobile 전용 (768px 미만) */
.about--mobile .about-content {
  grid-template-columns: 1fr;
  gap: 2rem;
}
```

**장점**: 
- ✅ JavaScript에서 디바이스 타입 확인 가능
- ✅ 조건부 렌더링과 함께 사용 가능
- ✅ 명확한 분리

**단점**:
- ❌ 클래스 전환 시 약간의 JavaScript 오버헤드

---

## 방법 2: Media Query (전통적)

### JSX
```jsx
const About = () => {
  // deviceType 불필요!
  
  return (
    <section className="about">
      {/* 클래스명 하나만 */}
    </section>
  );
};
```

### CSS (하나의 파일)
```css
/* About.css */

/* 공통 스타일 (Mobile First) */
.about {
  padding: 3rem 0;
}

.about-content {
  grid-template-columns: 1fr;
  gap: 2rem;
}

/* Tablet (768px 이상) */
@media (min-width: 768px) {
  .about {
    padding: 4rem 0;
  }
  
  .about-content {
    gap: 3rem;
  }
}

/* Desktop (1024px 이상) */
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

**장점**:
- ✅ 순수 CSS (JavaScript 불필요)
- ✅ 성능 최고 (브라우저 네이티브)
- ✅ SSR/SSG에서도 완벽 작동
- ✅ 표준 방식

**단점**:
- ❌ JavaScript에서 현재 디바이스 확인 어려움

---

## 🎯 권장: 하이브리드 방식

두 가지 장점을 모두!

### JSX
```jsx
const About = () => {
  const { isMobile, deviceType } = useBreakpointContext();
  
  return (
    <section className={`about about--${deviceType}`}>
      {/* CSS는 Media Query로 대부분 처리 */}
      
      {/* JavaScript 조건부 렌더링이 필요한 부분만 */}
      {isMobile ? (
        <MobileOnlyComponent />
      ) : (
        <DesktopComponent />
      )}
    </section>
  );
};
```

### CSS
```css
/* Media Query로 대부분 처리 (성능 최고) */
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }

/* 특수한 경우만 클래스로 */
.about--mobile .special-mobile-only { }
```

---

## 📊 비교표

| 특징 | 클래스 분기 | Media Query | 하이브리드 |
|-----|-----------|------------|-----------|
| **파일 수** | JSX 1개 + CSS 1개 | JSX 1개 + CSS 1개 | JSX 1개 + CSS 1개 |
| **성능** | 좋음 | 최고 ⭐ | 최고 |
| **유지보수** | 쉬움 | 쉬움 | 쉬움 |
| **JS 조건부** | 가능 ✅ | 어려움 | 가능 ✅ |
| **SSR/SSG** | 약간 복잡 | 완벽 ✅ | 완벽 ✅ |

---

## 🎨 실제 예시

### 현재 프로젝트에 적용

```
components/
├── About/
│   ├── About.jsx                    ← 1개
│   └── About.css                    ← 1개 (Media Query)
├── Hero/
│   ├── Hero.jsx                     ← 1개
│   └── Hero.css                     ← 1개 (Media Query)
└── Works/
    ├── Works.jsx                    ← 1개
    └── Works.css                    ← 1개 (Media Query)
```

**NOT**:
```
❌ About.css
❌ AboutDesktop.css
❌ AboutTablet.css
❌ AboutMobile.css
```

---

## 💡 핵심

**CSS 파일은 1개!**
- 그 안에 Media Query나 클래스로 분기
- JSX도 1개!

**총 파일 수**: 2개 (JSX 1개 + CSS 1개)

