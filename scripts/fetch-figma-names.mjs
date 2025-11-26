/**
 * Figma API를 사용하여 모든 디자인의 이름을 가져오는 스크립트
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
    .replace(/[^a-z0-9-]/g, '');
  return `${designerSlug}-${work}`;
}

// 이미 확인한 디자인 이름들 (샘플)
const knownNames = {
  '365:711': '허지훈_모션디자인_작품2_Mobile',
  '1175:14767': '김윤정_비디오콘텐츠_Love at Rust Sight_Desktop',
  '365:1085': '허지훈_모션디자인_작품1_Tablet'
};

// 분석 결과
const analysis = {
  total: designsData.designs.length,
  fileKey: designsData.fileKey,
  works: {},
  designs: []
};

console.log(`총 ${designsData.designs.length}개의 디자인 분석 중...\n`);

// 각 디자인 분석
designsData.designs.forEach((design, index) => {
  // 실제 이름이 있으면 사용, 없으면 임시 이름
  const name = knownNames[design.nodeId] || `Design_${index + 1}`;
  const parsed = parseDesignName(name);
  
  const workKey = `${parsed.designer}_${parsed.work}`;
  
  if (!analysis.works[workKey]) {
    analysis.works[workKey] = {
      designer: parsed.designer,
      type: parsed.type,
      work: parsed.work,
      workId: generateWorkId(parsed.designer, parsed.work),
      devices: {},
      nodeIds: []
    };
  }
  
  analysis.works[workKey].nodeIds.push(design.nodeId);
  analysis.works[workKey].devices[parsed.device] = {
    nodeId: design.nodeId,
    url: design.url,
    name: name
  };
  
  analysis.designs.push({
    id: index + 1,
    nodeId: design.nodeId,
    url: design.url,
    name: name,
    parsed: parsed,
    workKey: workKey
  });
});

// 결과 저장
fs.writeFileSync(
  join(projectRoot, 'figma-analysis.json'),
  JSON.stringify(analysis, null, 2),
  'utf-8'
);

console.log(`✅ 분석 완료:`);
console.log(`   - 총 디자인: ${analysis.total}개`);
console.log(`   - 작품 그룹: ${Object.keys(analysis.works).length}개\n`);

console.log('작품별 디바이스 버전 (확인된 것만):');
Object.entries(analysis.works).forEach(([key, work]) => {
  const devices = Object.keys(work.devices).join(', ') || 'None';
  if (devices !== 'None') {
    console.log(`   - ${work.designer} / ${work.work}: ${devices}`);
  }
});

console.log('\n✅ figma-analysis.json 파일 생성 완료');
console.log('\n📝 다음 단계:');
console.log('   1. 모든 디자인의 이름을 Figma API에서 가져오기');
console.log('   2. 작품별로 Desktop/Tablet/Mobile 버전 매칭');
console.log('   3. 반응형 컴포넌트 생성');

