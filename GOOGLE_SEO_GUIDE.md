# 구글 검색 상위 노출 가이드

## 🎯 1단계: Google Search Console 등록 (필수)

### Step 1: Google Search Console 접속
1. https://search.google.com/search-console/ 접속
2. Google 계정으로 로그인
3. "속성 추가" 클릭

### Step 2: 도메인 등록 방법 선택
**방법 1: URL 접두어 (권장)**
- https://mju25ooo.github.io 입력
- 소유권 확인 필요

**방법 2: 도메인 (고급)**
- mju25ooo.github.io 입력
- DNS 레코드로 소유권 확인

### Step 3: 소유권 확인
**HTML 파일 업로드 (가장 쉬운 방법)**
1. Google에서 제공하는 HTML 파일 다운로드
2. `public/` 폴더에 업로드
3. GitHub Pages에 배포
4. 확인 버튼 클릭

**HTML 메타 태그 (대안)**
1. Google에서 제공하는 메타 태그를 `index.html`에 추가
2. 페이지 배포 후 확인

### Step 4: 사이트맵 제출
1. Search Console → 색인 → 사이트맵
2. `https://mju25ooo.github.io/sitemap.xml` 제출
3. 상태 확인 (보통 몇 시간 소요)

---

## 📊 2단계: Google Analytics 4 설정

### Step 1: GA4 속성 생성
1. https://analytics.google.com/ 접속
2. "측정 시작" 클릭
3. 속성 이름: "MJU MCD 2025 졸업전시"
4. 보고 시간대: 한국 시간
5. 통화: 원(KRW)

### Step 2: 데이터 스트림 추가
1. 웹 → 웹사이트 URL: https://mju25ooo.github.io
2. 스트림 이름: "MJU MCD 졸업전시 웹사이트"

### Step 3: 추적 코드 설치
1. GA4 추적 ID 복사 (G-XXXXXXXXXX)
2. 아래 코드를 `index.html`에 추가:

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## ⚡ 3단계: 페이지 속도 최적화

### PageSpeed Insights 테스트
1. https://pagespeed.web.dev/ 접속
2. https://mju25ooo.github.io 입력
3. 모바일/데스크톱 점수 확인

### 목표 점수
- **모바일**: 90점 이상
- **데스크톱**: 95점 이상

### 개선 포인트
✅ **이미 완료된 최적화**
- Vite 빌드 최적화
- 이미지 압축
- CSS/JS 최적화
- 프리로드 설정

---

## 🔗 4단계: 백링크 획득 전략

### 고품질 백링크 소스
1. **대학교 공식 채널**
   - 명지대학교 공식 홈페이지
   - 학과 공식 블로그/소셜미디어

2. **교육 관련 사이트**
   - 대학생 커뮤니티 (에브리타임, 디시인사이드)
   - 디자인 관련 커뮤니티

3. **디자인 포트폴리오 사이트**
   - 비핸스 (Behance)
   - 드리블 (Dribbble)
   - 인스타그램

4. **지역 커뮤니티**
   - 서대문구 관련 사이트
   - 서울시 대학생 관련 채널

### 백링크 텍스트 최적화
```
✅ 좋은 예시:
- "명지대학교 MCD 졸업전시"
- "2025년 졸업작품전"
- "영상 애니메이션 디자인 전공"

❌ 나쁜 예시:
- "여기 클릭"
- "더 보기"
- "링크"
```

---

## 📍 5단계: 지역 SEO 최적화

### Google My Business 등록
1. https://business.google.com/ 접속
2. "비즈니스 추가" 클릭
3. 비즈니스 정보 입력:
   - 이름: "명지대학교 MCD 졸업전시"
   - 주소: "경기도 용인시 처인구 명지로 116"
   - 카테고리: "대학교"
   - 전화번호: (학교 전화번호)

### 타겟 키워드 최적화 (수도권 대학생)
```
메인 키워드:
- "졸업전시"
- "영상"
- "애니메이션 디자인"
- "졸업"

롱테일 키워드:
- "졸업전시 2025"
- "영상 애니메이션 디자인 졸업작품"
- "졸업작품 전시회"
- "수도권 대학 졸업전시"
- "영상디자인 졸업작품"
- "애니메이션 졸업전시"
```

---

## 📱 6단계: 모바일 최적화

### 모바일 친화성 테스트
1. https://search.google.com/test/mobile-friendly 접속
2. URL 입력 후 테스트

### 개선 포인트
✅ **이미 완료된 항목**
- 반응형 디자인
- 터치 친화적 버튼
- 빠른 로딩 속도

---

## 🎨 7단계: 콘텐츠 마케팅

### 블로그 콘텐츠 제안
1. **작품 제작 과정**
   - "졸업작품 아이디어 구상 과정"
   - "디자인 툴 활용법"

2. **전공 소개**
   - "MCD 전공이란?"
   - "미디어커뮤니케이션디자인의 미래"

3. **포트폴리오 팁**
   - "디자인 포트폴리오 완성하기"
   - "졸업 후 진로 가이드"

### SEO 최적화된 콘텐츠 작성법
```
제목: "명지대학교 MCD 졸업전시 2025 - 디자인 포트폴리오 완성 가이드"

구조:
H1: 메인 제목
H2: 섹션 제목
H3: 하위 섹션

키워드 밀도: 2-3% (자연스럽게)
```

---

## 📈 8단계: 성과 측정 및 개선

### 주요 지표 추적
1. **검색 순위**
   - 타겟 키워드 순위 모니터링
   - 월간 순위 변화 추적

2. **트래픽 분석**
   - 유기적 검색 트래픽
   - 방문자 행동 분석
   - 체류 시간

3. **전환율**
   - 소셜미디어 팔로우 증가
   - 포트폴리오 조회수
   - 연락처 문의

### 개선 사이클
1. **분석** (매월)
2. **개선** (문제점 해결)
3. **측정** (성과 확인)
4. **반복** (지속적 개선)

---

## 🚀 즉시 실행 가능한 액션 아이템

### 이번 주 (우선순위 높음)
1. ✅ Google Search Console 등록
2. ✅ 사이트맵 제출
3. ✅ Google Analytics 설정

### 다음 주 (우선순위 중간)
1. 🔄 PageSpeed Insights 점수 확인
2. 🔄 모바일 친화성 테스트
3. 🔄 백링크 요청 시작

### 이번 달 (우선순위 낮음)
1. 📝 콘텐츠 마케팅 계획 수립
2. 📝 소셜미디어 SEO 연동
3. 📝 지역 SEO 최적화

---

## 💡 추가 팁

### 검색 순위 향상을 위한 체크리스트
- [ ] 고유하고 유용한 콘텐츠 제공
- [ ] 빠른 로딩 속도 (3초 이내)
- [ ] 모바일 친화적 디자인
- [ ] HTTPS 보안 프로토콜
- [ ] 명확한 사이트 구조
- [ ] 내부 링크 최적화
- [ ] 이미지 alt 태그 작성
- [ ] 소셜미디어 연동
- [ ] 정기적인 콘텐츠 업데이트
- [ ] 사용자 경험 개선

### 주의사항
- ❌ 키워드 스팸 방지
- ❌ 클o킹 (사용자와 검색엔진에 다른 내용 표시)
- ❌ 복사된 콘텐츠
- ❌ 과도한 광고
- ❌ 느린 로딩 속도

---

## 📞 지원 및 문의

### Google 도움말
- Search Console: https://support.google.com/webmasters
- Analytics: https://support.google.com/analytics
- PageSpeed: https://developers.google.com/speed

### 추가 학습 자료
- Google SEO 가이드: https://developers.google.com/search/docs
- 웹마스터 가이드: https://support.google.com/webmasters/answer/35769
