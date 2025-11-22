# 디자이너 상세페이지 CSS 관리 가이드

## 문제 해결

### CSS가 사라지는 문제 해결

이 디렉토리의 CSS 파일들이 제대로 로드되지 않는 문제를 방지하기 위해 다음 조치를 취했습니다:

1. **CSS Import Guard 시스템**
   - `cssImportGuard.js`를 통해 개발 모드에서 CSS 로드 여부를 자동으로 확인
   - CSS가 로드되지 않으면 콘솔에 경고 메시지 표시

2. **CSS 우선순위 보장**
   - `.designer-showcase` 클래스에 더 구체적인 선택자 사용
   - 전역 스타일에 의해 덮어씌워지지 않도록 보장

3. **CSS Import 순서 보장**
   - 모든 컴포넌트에서 CSS import를 파일 상단에 배치
   - `guardCSSImport` 함수를 통해 import 보장

## 파일 구조

```
DesignerDetail/
├── DesignerDetail.jsx          # 메인 컴포넌트 (DesignerDetail.css import)
├── DesignerDetail.css          # 디자이너 상세페이지 기본 스타일
├── DesignerShowcase.jsx        # 작품 목록 컴포넌트 (DesignerShowcase.css import)
├── DesignerShowcase.css        # 작품 목록 및 모달 스타일 (매우 큰 파일)
└── WorkDetails/
    ├── WorkDetailContent.jsx   # 작품 상세 콘텐츠 라우터
    ├── DefaultWorkLayout.jsx   # 기본 작품 레이아웃
    └── ... (기타 작품별 컴포넌트들)
```

## CSS Import 규칙

### 필수 규칙

1. **CSS import는 항상 파일 상단에 위치**
   ```javascript
   import './DesignerShowcase.css';
   import { guardCSSImport } from '../../shared/cssImportGuard';
   guardCSSImport('./DesignerShowcase.css', 'designer-showcase', 'ComponentName');
   ```

2. **CSS 파일 경로는 상대 경로 사용**
   - 같은 디렉토리: `'./DesignerShowcase.css'`
   - 상위 디렉토리: `'../DesignerShowcase.css'`

3. **CSS 클래스명은 일관성 유지**
   - BEM 방법론 사용: `.block__element--modifier`
   - 예: `.designer-showcase__inner`, `.work-card__title`

## 문제 발생 시 확인 사항

1. **CSS 파일이 존재하는지 확인**
   ```bash
   # Windows
   dir src\components\DesignerDetail\*.css
   
   # Mac/Linux
   ls src/components/DesignerDetail/*.css
   ```

2. **브라우저 개발자 도구 확인**
   - Network 탭에서 CSS 파일이 로드되었는지 확인
   - Elements 탭에서 스타일이 적용되었는지 확인
   - Console 탭에서 CSS 관련 경고 메시지 확인

3. **빌드 확인**
   ```bash
   npm run build
   # dist 폴더에 CSS 파일이 포함되었는지 확인
   ```

4. **캐시 문제**
   - 브라우저 캐시 삭제 (Ctrl+Shift+Delete)
   - 개발 서버 재시작
   - `node_modules/.vite` 폴더 삭제 후 재시작

## CSS 우선순위

CSS가 다른 스타일에 의해 덮어씌워지지 않도록 다음 우선순위를 사용합니다:

1. **가장 구체적인 선택자 사용**
   ```css
   /* 좋은 예 */
   body .designer-showcase,
   #root .designer-showcase {
     /* 스타일 */
   }
   
   /* 나쁜 예 */
   .designer-showcase {
     /* 스타일 */
   }
   ```

2. **중요한 스타일은 더 구체적인 선택자로 보호**
   ```css
   .main-window__container--full .designer-showcase {
     background: #f8f6f4; /* 전역 스타일 덮어쓰기 */
   }
   ```

## 향후 개선 사항

1. CSS 파일 크기 최적화 (현재 DesignerShowcase.css가 매우 큼)
2. CSS 모듈화 (작품별 CSS 분리)
3. CSS-in-JS 도입 검토
4. 빌드 시 CSS 번들링 최적화


