/**
 * Figma 디자인을 자동으로 처리하는 통합 스크립트
 * 
 * 이 스크립트는:
 * 1. Figma 디자인 정보를 읽어서
 * 2. 각 디자인의 이름을 가져와서
 * 3. 작품별로 그룹화하고
 * 4. 반응형 컴포넌트를 생성합니다
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

// Figma 디자인 정보 로드
const designsData = JSON.parse(
  fs.readFileSync(join(projectRoot, 'figma-designs.json'), 'utf-8')
);

// 처리 결과 저장
const processingResult = {
  total: designsData.designs.length,
  processed: 0,
  works: {},
  errors: []
};

console.log(`총 ${designsData.designs.length}개의 디자인 처리 시작...\n`);
console.log('⚠️  주의: 이 스크립트는 실제로는 MCP Figma 도구를 사용하여 실행해야 합니다.');
console.log('   현재는 구조만 준비했습니다.\n');

// 각 디자인 처리 (실제로는 Figma API 호출 필요)
designsData.designs.forEach((design, index) => {
  // 임시로 처리 (실제로는 Figma API에서 이름을 가져와야 함)
  const tempName = `Design_${index + 1}`;
  const parsed = parseDesignName(tempName);
  
  const workKey = `${parsed.designer}_${parsed.work}`;
  
  if (!processingResult.works[workKey]) {
    processingResult.works[workKey] = {
      designer: parsed.designer,
      type: parsed.type,
      work: parsed.work,
      workId: generateWorkId(parsed.designer, parsed.work),
      devices: {},
      nodeIds: []
    };
  }
  
  processingResult.works[workKey].nodeIds.push(design.nodeId);
  processingResult.works[workKey].devices[parsed.device] = {
    nodeId: design.nodeId,
    url: design.url
  };
  
  processingResult.processed++;
});

// 결과 저장
fs.writeFileSync(
  join(projectRoot, 'figma-processing-result.json'),
  JSON.stringify(processingResult, null, 2),
  'utf-8'
);

console.log(`✅ 처리 완료:`);
console.log(`   - 총 디자인: ${processingResult.total}개`);
console.log(`   - 처리된 디자인: ${processingResult.processed}개`);
console.log(`   - 작품 그룹: ${Object.keys(processingResult.works).length}개\n`);

console.log('작품별 디바이스 버전:');
Object.entries(processingResult.works).slice(0, 10).forEach(([key, work]) => {
  const devices = Object.keys(work.devices).join(', ') || 'None';
  console.log(`   - ${work.designer} / ${work.work}: ${devices}`);
});

console.log('\n✅ figma-processing-result.json 파일 생성 완료');
console.log('\n📝 실제 처리 방법:');
console.log('   1. MCP Figma 도구를 사용하여 각 디자인의 이름 가져오기');
console.log('   2. 이름을 파싱하여 작품별로 그룹화');
console.log('   3. 각 디바이스 버전의 React 컴포넌트 생성');
console.log('   4. Tailwind CSS를 프로젝트 CSS로 변환');
console.log('   5. WorkDetailContent.jsx에 자동 등록');

