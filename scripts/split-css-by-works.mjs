import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cssFilePath = path.join(__dirname, '../src/components/DesignerDetail/DesignerShowcase.css');
const outputDir = path.join(__dirname, '../src/components/DesignerDetail/styles/works');

// 출력 디렉토리 생성
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// CSS 파일 읽기
const cssContent = fs.readFileSync(cssFilePath, 'utf-8');
const lines = cssContent.split('\n');

// 기본 스타일과 작품별 스타일 분리
let baseStyles = [];
let currentWork = null;
let currentWorkStyles = [];
let inWorkBlock = false;
let braceCount = 0;

// 작품별 스타일 맵
const workStylesMap = new Map();

// 작품 클래스명 매핑 (CSS 클래스명 -> 파일명)
const workClassToFileName = {
  'caravan': 'Caravan',
  'cellestial': 'Cellestial',
  'gofetch': 'Gofetch',
  'petrichor': 'Petrichor',
  'love-at-rust-sight': 'LoveAtRustSight',
  'goodbye-universe': 'GoodbyeUniverse',
  'hello-universe': 'HelloUniverse',
  'leejimin-veneti': 'LeejiminVeneti',
  'leejimin-lelabo': 'LeejiminLelabo',
  'heo-jihoon-master-imagination': 'HeoJihoonMasterImagination',
  'heo-jihoon-eternal-vision': 'HeoJihoonEternalVision',
  'hifive': 'Hifive',
  // 추가 작품들...
};

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // 작품별 스타일 블록 시작 감지
  const workMatch = line.match(/^\.work-detail--([a-z-]+)\s*\{/);
  if (workMatch) {
    // 이전 작품 스타일 저장
    if (currentWork && currentWorkStyles.length > 0) {
      workStylesMap.set(currentWork, [...currentWorkStyles]);
      currentWorkStyles = [];
    }
    
    currentWork = workMatch[1];
    inWorkBlock = true;
    braceCount = 1;
    currentWorkStyles.push(line);
    continue;
  }
  
  if (inWorkBlock) {
    currentWorkStyles.push(line);
    
    // 중괄호 카운트
    braceCount += (line.match(/\{/g) || []).length;
    braceCount -= (line.match(/\}/g) || []).length;
    
    // 블록 종료
    if (braceCount === 0) {
      if (currentWork) {
        workStylesMap.set(currentWork, [...currentWorkStyles]);
        currentWorkStyles = [];
      }
      currentWork = null;
      inWorkBlock = false;
    }
  } else {
    // 기본 스타일
    baseStyles.push(line);
  }
}

// 마지막 작품 스타일 저장
if (currentWork && currentWorkStyles.length > 0) {
  workStylesMap.set(currentWork, [...currentWorkStyles]);
}

// 작품별 CSS 파일 생성
for (const [workClass, styles] of workStylesMap.entries()) {
  const fileName = workClassToFileName[workClass] || workClass.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
  const filePath = path.join(outputDir, `${fileName}.css`);
  
  fs.writeFileSync(filePath, styles.join('\n'), 'utf-8');
  console.log(`Created: ${fileName}.css (${styles.length} lines)`);
}

// 기본 스타일 저장 (작품별 스타일 제외)
const baseStylesContent = baseStyles.join('\n');
const baseFilePath = path.join(__dirname, '../src/components/DesignerDetail/DesignerShowcase.base.css');
fs.writeFileSync(baseFilePath, baseStylesContent, 'utf-8');
console.log(`Created: DesignerShowcase.base.css (${baseStyles.length} lines)`);

console.log(`\nTotal works extracted: ${workStylesMap.size}`);

