/**
 * Figma 디자인의 이름을 배치로 가져오는 스크립트
 * 
 * 이 스크립트는 MCP Figma 도구를 사용하여 각 디자인의 이름을 가져옵니다.
 * 배치 크기: 10개씩 처리
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
  designs: [],
  pending: []
};

console.log(`총 ${designsData.designs.length}개의 디자인 분석 중...\n`);

// 각 디자인 분석
designsData.designs.forEach((design, index) => {
  // 실제 이름이 있으면 사용, 없으면 pending에 추가
  const name = knownNames[design.nodeId] || null;
  
  if (name) {
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
      workKey: workKey,
      status: 'processed'
    });
  } else {
    analysis.pending.push({
      id: index + 1,
      nodeId: design.nodeId,
      url: design.url,
      status: 'pending'
    });
    
    analysis.designs.push({
      id: index + 1,
      nodeId: design.nodeId,
      url: design.url,
      name: null,
      parsed: null,
      workKey: null,
      status: 'pending'
    });
  }
});

// 결과 저장
fs.writeFileSync(
  join(projectRoot, 'figma-analysis.json'),
  JSON.stringify(analysis, null, 2),
  'utf-8'
);

console.log(`✅ 분석 완료:`);
console.log(`   - 총 디자인: ${analysis.total}개`);
console.log(`   - 처리된 디자인: ${analysis.designs.filter(d => d.status === 'processed').length}개`);
console.log(`   - 대기 중인 디자인: ${analysis.pending.length}개`);
console.log(`   - 작품 그룹: ${Object.keys(analysis.works).length}개\n`);

if (Object.keys(analysis.works).length > 0) {
  console.log('작품별 디바이스 버전 (처리된 것):');
  Object.entries(analysis.works).forEach(([key, work]) => {
    const devices = Object.keys(work.devices).join(', ') || 'None';
    console.log(`   - ${work.designer} / ${work.work}: ${devices}`);
  });
}

if (analysis.pending.length > 0) {
  console.log(`\n대기 중인 디자인 (처음 10개):`);
  analysis.pending.slice(0, 10).forEach((design, i) => {
    console.log(`   ${i + 1}. Node ID: ${design.nodeId}`);
  });
}

console.log('\n✅ figma-analysis.json 파일 생성 완료');
console.log('\n📝 다음 단계:');
console.log('   MCP Figma 도구를 사용하여 대기 중인 디자인의 이름을 가져와야 합니다.');
console.log('   스크립트: process-figma-complete.mjs를 실행하세요.');

