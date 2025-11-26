/**
 * Figma 디자인을 완전히 처리하는 통합 스크립트
 * 
 * 이 스크립트는:
 * 1. 모든 Figma 디자인의 이름을 가져와서
 * 2. 작품별로 Desktop/Tablet/Mobile 버전을 매칭하고
 * 3. 반응형 컴포넌트를 생성합니다
 * 
 * 주의: 실제 실행 시 MCP Figma 도구를 사용해야 합니다.
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { convertTailwindClassesToCSS } from './convert-tailwind-to-css.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

/**
 * 디자인 이름에서 작품 정보 추출
 */
function parseDesignName(name) {
  const deviceMatch = name.match(/(Mobile|Tablet|Desktop)$/);
  const device = deviceMatch ? deviceMatch[1] : null;
  
  const parts = name.replace(/_?(Mobile|Tablet|Desktop)$/, '').split('_');
  
  if (parts.length >= 3) {
    return {
      designer: parts[0],
      type: parts[1],
      work: parts.slice(2).join('_'),
      device: device || 'Unknown',
      fullName: name
    };
  }
  
  return {
    designer: parts[0] || 'Unknown',
    type: parts[1] || 'Unknown',
    work: parts.slice(2).join('_') || 'Unknown',
    device: device || 'Unknown',
    fullName: name
  };
}

/**
 * 작품 ID 생성
 */
function generateWorkId(designer, work) {
  const designerSlug = designer.toLowerCase().replace(/\s+/g, '-');
  const workSlug = work.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return `${designerSlug}-${work}`;
}

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
 * 반응형 래퍼 컴포넌트 생성
 */
function generateResponsiveWrapper(workInfo, deviceVersions) {
  const componentName = toPascalCase(workInfo.workId);
  const fileName = toKebabCase(workInfo.workId);
  
  const hasDesktop = deviceVersions.Desktop;
  const hasTablet = deviceVersions.Tablet;
  const hasMobile = deviceVersions.Mobile;
  
  const imports = [
    "import React from 'react';",
    "import { useBreakpoint } from '../../../hooks/useBreakpoint';",
    `import './styles/works/${fileName}.css';`
  ];
  
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
  
  ${hasMobile ? `if (isMobile) {
    return <${componentName}Mobile work={work} designer={designer} badgeSrc={badgeSrc} badgeAlt={badgeAlt} ctas={ctas} />;
  }` : ''}
  
  ${hasTablet ? `if (isTablet) {
    return <${componentName}Tablet work={work} designer={designer} badgeSrc={badgeSrc} badgeAlt={badgeAlt} ctas={ctas} />;
  }` : ''}
  
  ${hasDesktop ? `if (isDesktop) {
    return <${componentName}Desktop work={work} designer={designer} badgeSrc={badgeSrc} badgeAlt={badgeAlt} ctas={ctas} />;
  }` : ''}
  
  // 기본값
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
  console.error('   먼저 fetch-figma-names-batch.mjs를 실행하세요.');
  process.exit(1);
}

console.log(`작품 컴포넌트 생성 시작...\n`);

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
const workDetailContentUpdates = [];

// 작품별로 반응형 래퍼 컴포넌트 생성
Object.entries(analysis.works).forEach(([workKey, workInfo]) => {
  // Unknown 작품은 건너뛰기
  if (workInfo.designer === 'Design' && workInfo.work === 'Unknown') {
    return;
  }
  
  const wrapper = generateResponsiveWrapper(workInfo, workInfo.devices);
  
  // 메인 컴포넌트 파일 생성
  const componentPath = join(componentsDir, `${wrapper.componentName}.jsx`);
  if (!fs.existsSync(componentPath)) {
    fs.writeFileSync(componentPath, wrapper.code, 'utf-8');
  }
  
  // CSS 파일 생성 (빈 파일)
  const cssPath = join(stylesDir, `${wrapper.fileName}.css`);
  if (!fs.existsSync(cssPath)) {
    fs.writeFileSync(cssPath, `/* ${workInfo.designer} - ${workInfo.work} 스타일 */\n`, 'utf-8');
  }
  
  generatedComponents.push({
    componentName: wrapper.componentName,
    fileName: wrapper.fileName,
    workKey: workKey,
    workInfo: workInfo,
    workId: workInfo.workId
  });
  
  // WorkDetailContent.jsx 업데이트 정보
  workDetailContentUpdates.push({
    workId: workInfo.workId,
    componentName: wrapper.componentName,
    condition: `work.id === '${workInfo.workId}' || work.layout === '${workInfo.workId}'`
  });
  
  console.log(`✅ ${wrapper.componentName} 생성 완료`);
  console.log(`   - 파일: ${wrapper.componentName}.jsx`);
  console.log(`   - 디바이스: ${Object.keys(workInfo.devices).join(', ')}`);
});

console.log(`\n✅ 총 ${generatedComponents.length}개의 반응형 컴포넌트 생성 완료`);

// 생성된 컴포넌트 목록 저장
fs.writeFileSync(
  join(projectRoot, 'generated-components.json'),
  JSON.stringify(generatedComponents, null, 2),
  'utf-8'
);

// WorkDetailContent.jsx 업데이트 정보 저장
fs.writeFileSync(
  join(projectRoot, 'work-detail-content-updates.json'),
  JSON.stringify(workDetailContentUpdates, null, 2),
  'utf-8'
);

console.log('\n📝 다음 단계:');
console.log('   1. 각 디바이스 버전 컴포넌트 생성 (Desktop/Tablet/Mobile)');
console.log('   2. Figma 디자인을 기반으로 JSX 및 CSS 생성');
console.log('   3. WorkDetailContent.jsx에 컴포넌트 등록 (work-detail-content-updates.json 참고)');

