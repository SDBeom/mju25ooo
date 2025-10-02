# Shared 폴더 가이드

이 폴더는 프로젝트 전반에서 재사용되는 공통 기능들을 관리합니다.

## 파일 구조

### constants.js
- **목적**: One Source of Truth 원칙 적용
- **내용**: 
  - 네비게이션 아이템
  - 원 패턴 설정
  - 로고 설정
  - 에러 메시지
- **사용법**: `import { NAVIGATION_ITEMS, CIRCLE_COLORS } from '../shared/constants'`

### utils.js
- **목적**: 재사용 가능한 유틸리티 함수들
- **내용**:
  - 배열 유효성 검사
  - 안전한 함수 실행
  - React 키 생성
  - Props 유효성 검사
  - 디바운스 함수
- **사용법**: `import { isValidArray, safeExecute } from '../shared/utils'`

### errorHandler.js
- **목적**: 일관된 에러 처리
- **내용**:
  - 커스텀 에러 클래스
  - 컴포넌트 에러 핸들러
  - 에러 바운더리 헬퍼
  - 안전한 에러 메시지 추출
- **사용법**: `import { handleComponentError, AppError } from '../shared/errorHandler'`

## 개발 가이드라인

1. **새로운 상수 추가 시**: `constants.js`에 추가
2. **새로운 유틸리티 함수 추가 시**: `utils.js`에 추가
3. **에러 처리 로직 추가 시**: `errorHandler.js`에 추가
4. **모든 공유 기능은 이 폴더에서 관리**

## 패턴 준수 사항

- ✅ One Source of Truth: 모든 상수는 여기서 관리
- ✅ Single Responsibility: 각 파일은 명확한 역할
- ✅ 에러 처리: 일관된 에러 처리 방식
- ✅ 재사용성: 다른 컴포넌트에서 쉽게 사용 가능
