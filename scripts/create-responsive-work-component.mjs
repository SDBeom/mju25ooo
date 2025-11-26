/**
 * Figma 디자인을 기반으로 반응형 작품 컴포넌트를 생성하는 스크립트
 * 
 * 이 스크립트는:
 * 1. Figma 디자인 정보를 읽어서
 * 2. 작품별로 Desktop/Tablet/Mobile 버전을 매칭하고
 * 3. 반응형 컴포넌트를 생성합니다
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

/**
 * 컴포넌트 이름 생성 (PascalCase)
 */
function toPascalCase(str) {
  return str
    .split(/[-_\s]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

/**
 * 파일 이름 생성 (kebab-case)
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
function generateComponentTemplate(workInfo, deviceVersions) {
  const componentName = toPascalCase(workInfo.workId);
  const fileName = toKebabCase(workInfo.workId);
  
  // Desktop, Tablet, Mobile 버전 확인
  const hasDesktop = deviceVersions.Desktop;
  const hasTablet = deviceVersions.Tablet;
  const hasMobile = deviceVersions.Mobile;
  
  // 컴포넌트 코드 생성
  const imports = [
    "import React from 'react';",
    "import { useBreakpoint } from '../../../hooks/useBreakpoint';",
    `import './styles/works/${fileName}.css';`
  ];
  
  // 각 디바이스 버전 컴포넌트 import
  if (hasDesktop) {
    imports.push(`import ${componentName}Desktop from './${componentName}Desktop';`);
  }
  if (hasTablet) {
    imports.push(`import ${componentName}Tablet from './${componentName}Tablet';`);
  }
  if (hasMobile) {
    imports.push(`import ${componentName}Mobile from './${componentName}Mobile';`);
  }
  
  const componentCode = `
${imports.join('\n')}

/**
 * ${workInfo.designer} - ${workInfo.work}
 * 반응형 작품 상세 컴포넌트
 */
const ${componentName} = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  
  if (!work || !designer) {
    return null;
  }
  
  // 화면 크기에 따라 적절한 버전 렌더링
  ${hasMobile ? `if (isMobile) {
    return <${componentName}Mobile work={work} designer={designer} badgeSrc={badgeSrc} badgeAlt={badgeAlt} ctas={ctas} />;
  }` : ''}
  
  ${hasTablet ? `if (isTablet) {
    return <${componentName}Tablet work={work} designer={designer} badgeSrc={badgeSrc} badgeAlt={badgeAlt} ctas={ctas} />;
  }` : ''}
  
  ${hasDesktop ? `if (isDesktop) {
    return <${componentName}Desktop work={work} designer={designer} badgeSrc={badgeSrc} badgeAlt={badgeAlt} ctas={ctas} />;
  }` : ''}
  
  // 기본값 (가장 큰 화면 버전)
  ${hasDesktop ? `return <${componentName}Desktop work={work} designer={designer} badgeSrc={badgeSrc} badgeAlt={badgeAlt} ctas={ctas} />;` : 
    hasTablet ? `return <${componentName}Tablet work={work} designer={designer} badgeSrc={badgeSrc} badgeAlt={badgeAlt} ctas={ctas} />;` :
    hasMobile ? `return <${componentName}Mobile work={work} designer={designer} badgeSrc={badgeSrc} badgeAlt={badgeAlt} ctas={ctas} />;` :
    `return null;`}
};

export default ${componentName};
`;
  
  return {
    componentName,
    fileName,
    code: componentCode.trim()
  };
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

console.log(`작품 컴포넌트 생성 시작...\n`);

// 작품별로 컴포넌트 생성
const componentsDir = join(projectRoot, 'src/components/DesignerDetail/WorkDetails');
const stylesDir = join(projectRoot, 'src/components/DesignerDetail/styles/works');

// 디렉토리 생성
if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir, { recursive: true });
}
if (!fs.existsSync(stylesDir)) {
  fs.mkdirSync(stylesDir, { recursive: true });
}

const generatedComponents = [];

Object.entries(analysis.works).forEach(([workKey, workInfo]) => {
  // Unknown 작품은 건너뛰기
  if (workInfo.designer === 'Design' && workInfo.work === 'Unknown') {
    return;
  }
  
  const component = generateComponentTemplate(workInfo, workInfo.devices);
  
  // 메인 컴포넌트 파일 생성
  const componentPath = join(componentsDir, `${component.componentName}.jsx`);
  fs.writeFileSync(componentPath, component.code, 'utf-8');
  
  // CSS 파일 생성 (빈 파일)
  const cssPath = join(stylesDir, `${component.fileName}.css`);
  if (!fs.existsSync(cssPath)) {
    fs.writeFileSync(cssPath, `/* ${workInfo.designer} - ${workInfo.work} 스타일 */\n`, 'utf-8');
  }
  
  generatedComponents.push({
    componentName: component.componentName,
    fileName: component.fileName,
    workKey: workKey,
    workInfo: workInfo
  });
  
  console.log(`✅ ${component.componentName} 생성 완료`);
  console.log(`   - 파일: ${component.componentName}.jsx`);
  console.log(`   - 디바이스: ${Object.keys(workInfo.devices).join(', ')}`);
});

console.log(`\n✅ 총 ${generatedComponents.length}개의 컴포넌트 생성 완료`);

// 생성된 컴포넌트 목록 저장
fs.writeFileSync(
  join(projectRoot, 'generated-components.json'),
  JSON.stringify(generatedComponents, null, 2),
  'utf-8'
);

console.log('\n📝 다음 단계:');
console.log('   1. 각 디바이스 버전 컴포넌트 생성 (Desktop/Tablet/Mobile)');
console.log('   2. Figma 디자인을 기반으로 JSX 및 CSS 생성');
console.log('   3. WorkDetailContent.jsx에 컴포넌트 등록');

