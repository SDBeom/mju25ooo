/**
 * 모든 Figma 디자인의 이름을 가져오는 스크립트
 * 
 * 주의: 이 스크립트는 MCP Figma 도구를 사용하여 실행해야 합니다.
 * 실제로는 각 nodeId에 대해 get_metadata를 호출하여 이름을 가져와야 합니다.
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

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

// 분석 결과
const analysis = {
  total: designsData.designs.length,
  fileKey: designsData.fileKey,
  works: {},
  designs: [],
  pending: [] // 이름을 가져와야 하는 디자인들
};

console.log(`총 ${designsData.designs.length}개의 디자인 분석 중...\n`);

// 각 디자인 분석
designsData.designs.forEach((design, index) => {
  // 실제 이름은 Figma API에서 가져와야 함
  // 여기서는 구조만 준비
  analysis.pending.push({
    id: index + 1,
    nodeId: design.nodeId,
    url: design.url
  });
});

// 결과 저장
fs.writeFileSync(
  join(projectRoot, 'figma-pending-names.json'),
  JSON.stringify(analysis, null, 2),
  'utf-8'
);

console.log(`✅ 분석 완료:`);
console.log(`   - 총 디자인: ${analysis.total}개`);
console.log(`   - 이름 가져올 디자인: ${analysis.pending.length}개\n`);

console.log('처음 10개 디자인:');
analysis.pending.slice(0, 10).forEach((design, i) => {
  console.log(`  ${i + 1}. Node ID: ${design.nodeId}`);
});

console.log('\n✅ figma-pending-names.json 파일 생성 완료');
console.log('\n📝 다음 단계:');
console.log('   MCP Figma 도구를 사용하여 각 디자인의 이름을 가져와야 합니다.');
console.log('   스크립트: process-figma-batch.mjs를 실행하세요.');

