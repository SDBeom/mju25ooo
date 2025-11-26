/**
 * Figma 분석 결과를 업데이트하는 스크립트
 */

import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

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

// 기존 분석 데이터 로드
let analysis;
try {
  analysis = JSON.parse(
    fs.readFileSync(join(projectRoot, 'figma-analysis.json'), 'utf-8')
  );
} catch (error) {
  analysis = {
    total: 123,
    fileKey: 'dfELgNmLU5F1rOd0OiSJzJ',
    works: {},
    designs: [],
    pending: []
  };
}

// 새로 가져온 디자인 이름들 (배치 4 완료, 배치 5 시작)
const newDesigns = {
  '1175:17815': '허지훈_모션디자인_작품2_Desktop'
};

// designs 데이터 로드
const designsData = JSON.parse(
  fs.readFileSync(join(projectRoot, 'figma-designs.json'), 'utf-8')
);

// 각 디자인 처리
Object.entries(newDesigns).forEach(([nodeId, name]) => {
  const design = designsData.designs.find(d => d.nodeId === nodeId);
  if (!design) return;
  
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
  
  if (!analysis.works[workKey].nodeIds.includes(nodeId)) {
    analysis.works[workKey].nodeIds.push(nodeId);
  }
  
  analysis.works[workKey].devices[parsed.device] = {
    nodeId: nodeId,
    url: design.url,
    name: name
  };
  
  // designs 배열 업데이트
  const designIndex = analysis.designs.findIndex(d => d.nodeId === nodeId);
  if (designIndex >= 0) {
    analysis.designs[designIndex] = {
      id: designIndex + 1,
      nodeId: nodeId,
      url: design.url,
      name: name,
      parsed: parsed,
      workKey: workKey,
      status: 'processed'
    };
  } else {
    analysis.designs.push({
      id: analysis.designs.length + 1,
      nodeId: nodeId,
      url: design.url,
      name: name,
      parsed: parsed,
      workKey: workKey,
      status: 'processed'
    });
  }
});

// pending 배열 업데이트
analysis.pending = analysis.designs
  .filter(d => d.status === 'pending')
  .map(d => ({
    id: d.id,
    nodeId: d.nodeId,
    url: d.url,
    status: 'pending'
  }));

// 결과 저장
fs.writeFileSync(
  join(projectRoot, 'figma-analysis.json'),
  JSON.stringify(analysis, null, 2),
  'utf-8'
);

console.log(`✅ 분석 업데이트 완료:`);
console.log(`   - 총 디자인: ${analysis.total}개`);
console.log(`   - 처리된 디자인: ${analysis.designs.filter(d => d.status === 'processed').length}개`);
console.log(`   - 대기 중인 디자인: ${analysis.pending.length}개`);
console.log(`   - 작품 그룹: ${Object.keys(analysis.works).length}개\n`);

console.log('작품별 디바이스 버전:');
Object.entries(analysis.works).forEach(([key, work]) => {
  const devices = Object.keys(work.devices).join(', ') || 'None';
  console.log(`   - ${work.designer} / ${work.work}: ${devices}`);
});

