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
 * 예: "허지훈_모션디자인_작품2_Mobile" -> { designer: "허지훈", type: "모션디자인", work: "작품2", device: "Mobile" }
 */
function parseDesignName(name) {
  // Mobile, Tablet, Desktop 구분
  const deviceMatch = name.match(/(Mobile|Tablet|Desktop)$/);
  const device = deviceMatch ? deviceMatch[1] : null;
  
  // 디자이너_타입_작품명_Device 형식 파싱
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
 * 작품 ID 생성 (URL-friendly)
 */
function generateWorkId(designer, work) {
  const designerSlug = designer.toLowerCase().replace(/\s+/g, '-');
  const workSlug = work.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
  return `${designerSlug}-${workSlug}`;
}

// 분석 결과 저장
const analysis = {
  total: designsData.designs.length,
  fileKey: designsData.fileKey,
  works: {},
  designs: []
};

console.log(`총 ${designsData.designs.length}개의 디자인 분석 시작...\n`);

// 각 디자인 분석 (실제로는 Figma API에서 이름을 가져와야 하지만, 여기서는 구조만 준비)
designsData.designs.forEach((design, index) => {
  // 임시로 nodeId를 기반으로 추정 (실제로는 Figma API에서 이름을 가져와야 함)
  const tempName = `Design_${index + 1}`;
  const parsed = parseDesignName(tempName);
  
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
  analysis.works[workKey].devices[parsed.device] = design.nodeId;
  
  analysis.designs.push({
    id: index + 1,
    nodeId: design.nodeId,
    url: design.url,
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

console.log('작품별 디바이스 버전:');
Object.entries(analysis.works).slice(0, 5).forEach(([key, work]) => {
  const devices = Object.keys(work.devices).join(', ') || 'None';
  console.log(`   - ${work.designer} / ${work.work}: ${devices}`);
});

console.log('\n✅ figma-analysis.json 파일 생성 완료');
console.log('\n⚠️  주의: 실제 디자인 이름은 Figma API에서 가져와야 합니다.');
console.log('   이 스크립트는 구조만 준비했습니다.');

