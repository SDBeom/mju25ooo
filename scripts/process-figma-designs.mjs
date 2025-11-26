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
 * 디자인들을 작품별로 그룹화
 */
function groupDesignsByWork(designs) {
  const grouped = {};
  
  designs.forEach(design => {
    // node 이름에서 정보 추출 (실제로는 Figma API에서 가져와야 함)
    // 임시로 nodeId를 기반으로 추정
    const key = `${design.nodeId}`;
    
    if (!grouped[key]) {
      grouped[key] = {
        nodeIds: [],
        devices: {}
      };
    }
    
    grouped[key].nodeIds.push(design.nodeId);
    // device 정보는 실제 Figma API에서 가져와야 함
  });
  
  return grouped;
}

// 디자인 정보 분석
console.log(`총 ${designsData.designs.length}개의 디자인 발견\n`);

// 디자인 그룹화 (실제로는 Figma API에서 이름을 가져와야 함)
const grouped = groupDesignsByWork(designsData.designs);

console.log(`작품 그룹: ${Object.keys(grouped).length}개\n`);

// 샘플 출력
console.log('처음 10개 디자인:');
designsData.designs.slice(0, 10).forEach((design, i) => {
  console.log(`  ${i + 1}. Node ID: ${design.nodeId}`);
});

// 처리 계획 저장
const processingPlan = {
  total: designsData.designs.length,
  fileKey: designsData.fileKey,
  designs: designsData.designs.map((d, i) => ({
    id: i + 1,
    nodeId: d.nodeId,
    url: d.url,
    status: 'pending',
    parsed: null // 나중에 Figma API에서 이름을 가져와서 파싱
  }))
};

fs.writeFileSync(
  join(projectRoot, 'figma-processing-plan.json'),
  JSON.stringify(processingPlan, null, 2),
  'utf-8'
);

console.log('\n✅ figma-processing-plan.json 파일 생성 완료');

