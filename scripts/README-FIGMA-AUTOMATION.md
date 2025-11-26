# Figma 디자인 자동화 처리 가이드

이 디렉토리에는 123개의 Figma 디자인을 자동으로 처리하는 스크립트들이 포함되어 있습니다.

## 📋 처리 단계

### 1단계: 디자인 정보 추출
```bash
node scripts/fetch-figma-names-batch.mjs
```
- `figma-designs.json`에서 디자인 정보를 읽어옵니다
- 이미 알려진 디자인 이름을 파싱하여 작품별로 그룹화합니다
- 결과: `figma-analysis.json`

### 2단계: 모든 디자인 이름 가져오기 (MCP Figma 도구 필요)
```bash
# 각 디자인의 이름을 Figma API에서 가져와야 합니다
# MCP Figma 도구를 사용하여 각 nodeId에 대해 get_metadata 호출
```

**배치 처리 방법:**
- `figma-batch-plan.json`을 참고하여 10개씩 배치로 처리
- 각 배치의 디자인 이름을 가져와서 `figma-analysis.json`에 업데이트

### 3단계: 반응형 컴포넌트 생성
```bash
node scripts/process-figma-complete.mjs
```
- 작품별로 Desktop/Tablet/Mobile 버전을 매칭합니다
- 반응형 래퍼 컴포넌트를 생성합니다
- 결과: `generated-components.json`, `work-detail-content-updates.json`

### 4단계: 각 디바이스 버전 컴포넌트 생성
각 디바이스 버전에 대해:
1. Figma API에서 디자인 코드 가져오기 (`get_design_context`)
2. Tailwind CSS를 프로젝트 CSS로 변환
3. React 컴포넌트 생성
4. CSS 파일 생성

### 5단계: WorkDetailContent.jsx에 등록
`work-detail-content-updates.json`을 참고하여 각 작품을 `WorkDetailContent.jsx`에 등록합니다.

## 🛠️ 주요 스크립트

### `convert-tailwind-to-css.mjs`
Tailwind CSS 클래스를 일반 CSS로 변환합니다.

**사용 예:**
```javascript
import { convertTailwindClassesToCSS } from './convert-tailwind-to-css.mjs';
const css = convertTailwindClassesToCSS('flex flex-col items-center gap-[32px]');
```

### `fetch-figma-names-batch.mjs`
Figma 디자인의 이름을 분석하고 작품별로 그룹화합니다.

### `process-figma-complete.mjs`
작품별로 반응형 래퍼 컴포넌트를 생성합니다.

### `generate-figma-components.mjs`
각 디바이스 버전의 컴포넌트 템플릿을 생성합니다.

## 📁 생성되는 파일

### 컴포넌트 파일
- `src/components/DesignerDetail/WorkDetails/{작품명}.jsx` - 반응형 래퍼
- `src/components/DesignerDetail/WorkDetails/{작품명}{Device}.jsx` - 디바이스별 컴포넌트

### CSS 파일
- `src/components/DesignerDetail/styles/works/{작품명}.css` - 공통 스타일
- `src/components/DesignerDetail/styles/works/{작품명}-{device}.css` - 디바이스별 스타일

### 데이터 파일
- `figma-analysis.json` - 디자인 분석 결과
- `generated-components.json` - 생성된 컴포넌트 목록
- `work-detail-content-updates.json` - WorkDetailContent.jsx 업데이트 정보

## ⚠️ 주의사항

1. **MCP Figma 도구 필요**: 실제 디자인 코드를 가져오려면 MCP Figma 도구를 사용해야 합니다.
2. **API 제한**: Figma API 호출 시 제한이 있을 수 있으므로 배치로 처리하는 것을 권장합니다.
3. **이미지 경로**: Figma에서 가져온 이미지 URL은 임시이며, 실제 assets 폴더의 이미지로 교체해야 합니다.
4. **수동 검토**: 자동 생성된 컴포넌트는 수동으로 검토하고 필요한 경우 수정해야 합니다.

## 🚀 빠른 시작

1. **디자인 정보 확인**
   ```bash
   node scripts/fetch-figma-names-batch.mjs
   ```

2. **샘플 디자인 처리** (이미 완료됨)
   - 허지훈_모션디자인_작품2_Mobile
   - 김윤정_비디오콘텐츠_Love at Rust Sight_Desktop
   - 허지훈_모션디자인_작품1_Tablet

3. **나머지 디자인 처리**
   - MCP Figma 도구를 사용하여 각 디자인의 이름 가져오기
   - `figma-analysis.json` 업데이트
   - `process-figma-complete.mjs` 실행

## 📝 다음 단계

1. 모든 디자인의 이름을 Figma API에서 가져오기
2. 작품별로 Desktop/Tablet/Mobile 버전 매칭
3. 각 디바이스 버전의 React 컴포넌트 생성
4. Tailwind CSS를 프로젝트 CSS로 변환
5. 이미지 경로 설정
6. WorkDetailContent.jsx에 자동 등록

