/**
 * Figma 디자인을 배치로 처리하는 스크립트
 * 
 * 이 스크립트는:
 * 1. Figma API에서 디자인 정보를 가져와서
 * 2. React 컴포넌트와 CSS를 생성하고
 * 3. 프로젝트에 통합합니다
 * 
 * 배치 크기: 10개씩 처리 (API 제한 고려)
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { convertTailwindClassesToCSS } from './convert-tailwind-to-css.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Figma 디자인 정보 로드
const designsData = JSON.parse(
  fs.readFileSync(join(projectRoot, 'figma-designs.json'), 'utf-8')
);

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

// 처리 계획 생성
const batchSize = 10;
const batches = [];

for (let i = 0; i < designsData.designs.length; i += batchSize) {
  batches.push(designsData.designs.slice(i, i + batchSize));
}

console.log(`총 ${designsData.designs.length}개의 디자인을 ${batches.length}개 배치로 나눔\n`);

// 배치 정보 저장
const batchPlan = {
  total: designsData.designs.length,
  batchSize: batchSize,
  batches: batches.map((batch, index) => ({
    batchNumber: index + 1,
    designs: batch.map((design, i) => ({
      id: index * batchSize + i + 1,
      nodeId: design.nodeId,
      url: design.url
    }))
  }))
};

fs.writeFileSync(
  join(projectRoot, 'figma-batch-plan.json'),
  JSON.stringify(batchPlan, null, 2),
  'utf-8'
);

console.log('배치 계획:');
batchPlan.batches.forEach((batch, i) => {
  console.log(`  배치 ${i + 1}: ${batch.designs.length}개 디자인`);
});

console.log('\n✅ figma-batch-plan.json 파일 생성 완료');
console.log('\n📝 다음 단계:');
console.log('   1. 각 배치의 디자인 이름을 Figma API에서 가져오기');
console.log('   2. 작품별로 Desktop/Tablet/Mobile 버전 매칭');
console.log('   3. React 컴포넌트 및 CSS 생성');
console.log('   4. WorkDetailContent.jsx에 자동 등록');

