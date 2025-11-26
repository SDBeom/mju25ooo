/**
 * Figma 디자인을 기반으로 React 컴포넌트를 자동 생성하는 스크립트
 * 
 * 사용 방법:
 * 1. figma-analysis.json 파일이 있어야 함 (디자인 이름이 파싱된 상태)
 * 2. 각 디자인의 Figma 코드를 가져와서 변환
 * 3. React 컴포넌트와 CSS 파일 생성
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { convertTailwindClassesToCSS } from './convert-tailwind-to-css.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

/**
 * 컴포넌트 이름 생성
 */
function toPascalCase(str) {
  return str
    .split(/[-_\s]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

/**
 * 파일 이름 생성
 */
function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * React 컴포넌트 템플릿 생성
 */
function generateComponentCode(workInfo, deviceType, deviceNodeId) {
  const componentName = `${toPascalCase(workInfo.workId)}${deviceType}`;
  const fileName = `${toKebabCase(workInfo.workId)}-${deviceType.toLowerCase()}`;
  
  // 기본 컴포넌트 템플릿
  const componentCode = `import React from 'react';
import { handleImageError } from '../../../shared/imageUtils';
import './styles/works/${fileName}.css';

/**
 * ${workInfo.designer} - ${workInfo.work} (${deviceType})
 * Figma 디자인 기반 구현
 */
const ${componentName} = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--${toKebabCase(workInfo.workId)}-${deviceType.toLowerCase()}">
      {/* TODO: Figma 디자인 코드를 여기에 추가 */}
      {/* Node ID: ${deviceNodeId} */}
      <section className="work-detail__section work-detail__hero">
        <div className="work-detail__hero-content">
          <h2 className="work-detail__title">{work.title || '${workInfo.work}'}</h2>
          <p className="work-detail__lead">{work.summary || ''}</p>
        </div>
      </section>
    </div>
  );
};

export default ${componentName};
`;
  
  return {
    componentName,
    fileName,
    code: componentCode
  };
}

/**
 * CSS 파일 템플릿 생성
 */
function generateCSSCode(workInfo, deviceType) {
  const fileName = `${toKebabCase(workInfo.workId)}-${deviceType.toLowerCase()}`;
  
  const cssCode = `/* ${workInfo.designer} - ${workInfo.work} (${deviceType}) 스타일 */
/* Figma 디자인 기반 구현 */

.work-detail--${toKebabCase(workInfo.workId)}-${deviceType.toLowerCase()} {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
  background: #ffffff;
}

/* TODO: Figma 디자인에서 추출한 CSS를 여기에 추가 */
`;
  
  return cssCode;
}

// 분석 데이터 로드
let analysis;
try {
  analysis = JSON.parse(
    fs.readFileSync(join(projectRoot, 'figma-analysis.json'), 'utf-8')
  );
} catch (error) {
  console.error('❌ figma-analysis.json 파일을 찾을 수 없습니다.');
  console.error('   먼저 fetch-figma-names.mjs를 실행하세요.');
  process.exit(1);
}

console.log(`컴포넌트 생성 시작...\n`);

// 디렉토리 생성
const componentsDir = join(projectRoot, 'src/components/DesignerDetail/WorkDetails');
const stylesDir = join(projectRoot, 'src/components/DesignerDetail/styles/works');

if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir, { recursive: true });
}
if (!fs.existsSync(stylesDir)) {
  fs.mkdirSync(stylesDir, { recursive: true });
}

const generatedComponents = [];

// 작품별로 컴포넌트 생성
Object.entries(analysis.works).forEach(([workKey, workInfo]) => {
  // Unknown 작품은 건너뛰기
  if (workInfo.designer === 'Design' && workInfo.work === 'Unknown') {
    return;
  }
  
  // 각 디바이스 버전별로 컴포넌트 생성
  Object.entries(workInfo.devices).forEach(([deviceType, deviceInfo]) => {
    if (deviceType === 'Unknown') return;
    
    const component = generateComponentCode(workInfo, deviceType, deviceInfo.nodeId);
    const css = generateCSSCode(workInfo, deviceType);
    
    // 컴포넌트 파일 생성
    const componentPath = join(componentsDir, `${component.componentName}.jsx`);
    if (!fs.existsSync(componentPath)) {
      fs.writeFileSync(componentPath, component.code, 'utf-8');
    }
    
    // CSS 파일 생성
    const cssPath = join(stylesDir, `${component.fileName}.css`);
    if (!fs.existsSync(cssPath)) {
      fs.writeFileSync(cssPath, css, 'utf-8');
    }
    
    generatedComponents.push({
      componentName: component.componentName,
      fileName: component.fileName,
      workKey: workKey,
      workInfo: workInfo,
      deviceType: deviceType,
      nodeId: deviceInfo.nodeId
    });
    
    console.log(`✅ ${component.componentName} 생성 완료`);
  });
});

console.log(`\n✅ 총 ${generatedComponents.length}개의 컴포넌트 생성 완료`);

// 생성된 컴포넌트 목록 저장
fs.writeFileSync(
  join(projectRoot, 'generated-components.json'),
  JSON.stringify(generatedComponents, null, 2),
  'utf-8'
);

console.log('\n📝 다음 단계:');
console.log('   1. 각 컴포넌트에 Figma 디자인 코드 추가');
console.log('   2. Tailwind CSS를 프로젝트 CSS로 변환');
console.log('   3. 이미지 경로 설정');
console.log('   4. WorkDetailContent.jsx에 자동 등록');

