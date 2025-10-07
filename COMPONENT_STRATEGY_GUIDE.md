# 컴포넌트 분리 전략 가이드

## 🤔 언제 어떤 방식을 사용할까?

### 방법 1: CSS만 분리 (권장 ⭐)
**사용 시기**: 내용은 같고 **디자인/레이아웃만** 다를 때

```jsx
// ✅ 하나의 컴포넌트
const About = () => {
  const { deviceType } = useBreakpointContext();
  
  return (
    <section className={`about about--${deviceType}`}>
      {/* 동일한 내용 */}
    </section>
  );
};
```

```css
/* ✅ CSS로 분기 */
.about--desktop { /* Desktop 스타일 */ }
.about--tablet { /* Tablet 스타일 */ }
.about--mobile { /* Mobile 스타일 */ }
```

**장점**:
- ✅ 코드 중복 없음
- ✅ 유지보수 쉬움
- ✅ 내용 수정 시 한 곳만 변경
- ✅ 번들 사이즈 작음

**단점**:
- ❌ CSS가 복잡해질 수 있음

---

### 방법 2: 컴포넌트 분리
**사용 시기**: 구조가 **완전히 다를** 때

```jsx
// Desktop: 그리드 레이아웃
const AboutDesktop = () => (
  <div className="grid-layout">
    <Image />
    <Content />
  </div>
);

// Mobile: 캐러셀
const AboutMobile = () => (
  <Carousel>
    <Image />
    <Content />
  </Carousel>
);
```

**장점**:
- ✅ 각 디바이스에 최적화된 완전히 다른 UX 제공
- ✅ 조건부 로직 없이 깔끔한 코드

**단점**:
- ❌ 코드 중복
- ❌ 내용 수정 시 3개 파일 모두 수정 필요
- ❌ 번들 사이즈 증가

---

### 방법 3: 하이브리드 (최적 💡)
**사용 시기**: 대부분은 같지만 **일부만** 다를 때

```jsx
const About = () => {
  const { isMobile } = useBreakpointContext();
  
  return (
    <section className={`about about--${deviceType}`}>
      <Content />
      
      {/* 모바일에서만 다른 부분 */}
      {isMobile ? (
        <MobileOnlyComponent />
      ) : (
        <DesktopTabletComponent />
      )}
    </section>
  );
};
```

**장점**:
- ✅ 필요한 부분만 분리
- ✅ 코드 중복 최소화
- ✅ 유지보수와 최적화의 균형

---

## 📋 프로젝트별 권장 방식

### 현재 프로젝트 분석

| 컴포넌트 | 현재 방식 | 권장 방식 | 이유 |
|---------|----------|----------|------|
| About | 컴포넌트 분리 | **CSS만** | 내용 동일, 레이아웃만 다름 |
| Hero | 컴포넌트 분리 | **CSS만** | 내용 동일, 크기만 다름 |
| Works | 컴포넌트 분리 | **CSS만** | 내용 동일, 그리드만 다름 |
| Header | 컴포넌트 분리 | **하이브리드** | 모바일 메뉴는 다름 |
| Footer | 컴포넌트 분리 | **CSS만** | 내용 동일, 레이아웃만 다름 |
| Designer | 컴포넌트 분리 | **CSS만** | 검색/카드 레이아웃만 다름 |

---

## 🔄 리팩토링 예시

### Before (비효율적)
```jsx
// AboutDesktop.jsx - 102 줄
const AboutDesktop = () => { /* 동일한 내용 */ };

// AboutTablet.jsx - 102 줄  
const AboutTablet = () => { /* 동일한 내용 */ };

// AboutMobile.jsx - 102 줄
const AboutMobile = () => { /* 동일한 내용 */ };

// About.jsx
const About = () => (
  <ResponsiveComponent
    desktop={AboutDesktop}
    tablet={AboutTablet}
    mobile={AboutMobile}
  />
);
```
**총 코드**: ~400 줄 (중복 많음)

### After (효율적)
```jsx
// About.jsx - 120 줄
const About = () => {
  const { deviceType } = useBreakpointContext();
  
  return (
    <section className={`about about--${deviceType}`}>
      {/* 한 번만 작성 */}
    </section>
  );
};
```

```css
/* About.css - 150 줄 */
.about--desktop { /* Desktop 스타일 */ }
.about--tablet { /* Tablet 스타일 */ }
.about--mobile { /* Mobile 스타일 */ }
```
**총 코드**: ~270 줄 (40% 감소!)

---

## 🎯 결론 및 권장사항

### 당신의 프로젝트에서는:

**대부분의 컴포넌트가 "내용은 같고 디자인만 다름"** 

→ **CSS 방식으로 리팩토링 권장** ⭐

### 리팩토링 우선순위:

1. **Footer** - 가장 간단함
2. **About** - 내용 완전히 동일
3. **Works** - 그리드 레이아웃만 다름
4. **Hero** - 크기/배치만 다름
5. **Header** - 모바일 메뉴만 다름 (하이브리드)

### 다음 단계:

```bash
# 1단계: 하나씩 리팩토링
git checkout -b refactor/css-based-responsive

# 2단계: Footer부터 시작 (가장 쉬움)
# 3단계: 테스트
# 4단계: 다음 컴포넌트로
```

---

## 💡 핵심 질문

리팩토링 전에 스스로 물어보세요:

1. ❓ **내용이 다른가?** → 컴포넌트 분리
2. ❓ **레이아웃/구조가 다른가?** → 컴포넌트 분리  
3. ❓ **스타일만 다른가?** → CSS로 처리
4. ❓ **일부만 다른가?** → 하이브리드

**당신의 경우**: 대부분 3번 → **CSS로 충분!** ✅

