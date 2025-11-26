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

// 작품 클래스명 찾기 (모든 .work-detail--로 시작하는 클래스)
const workClasses = new Set();
const workClassPattern = /\.work-detail--([a-z-]+)/g;
let match;
const fullContent = lines.join('\n');
while ((match = workClassPattern.exec(fullContent)) !== null) {
  workClasses.add(match[1]);
}

console.log(`Found ${workClasses.size} unique work classes:`, Array.from(workClasses).sort());

// 작품 클래스명 -> 파일명 매핑
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
  'fate-boardgame': 'FateBoardgame',
  'cyber-jesasang': 'CyberJesasang',
  'parkjina-cross-cooty': 'ParkjinaCrossCooty',
  'parkjina-remains': 'ParkjinaRemains',
  'anseonmin-dots': 'AnseonminDots',
  'dotianhong-animated': 'DotianhongAnimated',
  'dotianhong-isometric': 'DotianhongIsometric',
  'see-tinh-animated': 'SeeTinhAnimated',
  'see-tinh-isometric': 'SeeTinhIsometric',
  'jeongitae-dolor-saga': 'JeongitaeDolorSaga',
  'jeongitae-war-orb': 'JeongitaeWarOrb',
  'jeonseorin-karon': 'JeonseorinKaron',
  'jeonseorin-raven-x': 'JeonseorinRavenX',
  'johaneul-the-reason': 'JohaneulTheReason',
  'johaneul-youth-dream': 'JohaneulYouthDream',
  'jungjimin-the-gothic': 'JungjiminTheGothic',
  'jungjimin-the-weapon': 'JungjiminTheWeapon',
  'leedayoung-plotting-room': 'LeedayoungPlottingRoom',
  'leedayoung-ready-to-merry': 'LeedayoungReadyToMerry',
  'leegabi-abyss-racing': 'LeegabiAbyssRacing',
  'leegabi-overcooked': 'LeegabiOvercooked',
  'leeun-layered': 'LeeunLayered',
  'linked': 'Linked',
  'parkhaein-chrome4': 'ParkhaeinChrome',
  'parkheechan-animation-reel': 'ParkheechanAnimationReel',
  'parkheechan-pledge': 'ParkheechanPledge',
  'peony': 'Peony',
  'pledge': 'Pledge',
  'simseongbin-boom': 'SimseongbinBoom',
  'simseongbin-linked': 'SimseongbinLinked',
  'songdahee-card-of-love': 'SongdaheeCardOfLove',
  'songdahee-peony': 'SongdaheePeony',
  'woosumin-liminal': 'WoosuminLiminal',
  'woosumin-sasindo': 'WoosuminSasindo',
};

// 각 작품별로 CSS 규칙 추출
const workStylesMap = new Map();

for (const workClass of workClasses) {
  const fileName = workClassToFileName[workClass] || 
    workClass.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
  
  // 해당 작품 클래스가 포함된 모든 라인 찾기
  const workStyles = [];
  const pattern = new RegExp(`\\.work-detail--${workClass.replace(/-/g, '\\-')}[\\s\\.,\\{]`, 'g');
  
  let inWorkBlock = false;
  let currentBlock = [];
  let braceCount = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    // 작품 클래스가 포함된 라인인지 확인
    if (pattern.test(line) || (inWorkBlock && braceCount > 0)) {
      if (!inWorkBlock) {
        // 새 블록 시작
        inWorkBlock = true;
        currentBlock = [line];
        braceCount = 0;
      } else {
        currentBlock.push(line);
      }
      
      // 중괄호 카운트
      braceCount += (line.match(/\{/g) || []).length;
      braceCount -= (line.match(/\}/g) || []).length;
      
      // 블록 종료
      if (braceCount === 0 && inWorkBlock) {
        workStyles.push(...currentBlock);
        currentBlock = [];
        inWorkBlock = false;
      }
    } else if (inWorkBlock && braceCount > 0) {
      // 블록 내부 계속
      currentBlock.push(line);
      braceCount += (line.match(/\{/g) || []).length;
      braceCount -= (line.match(/\}/g) || []).length;
      
      if (braceCount === 0) {
        workStyles.push(...currentBlock);
        currentBlock = [];
        inWorkBlock = false;
      }
    }
  }
  
  if (workStyles.length > 0) {
    workStylesMap.set(workClass, { fileName, styles: workStyles });
  }
}

// 작품별 CSS 파일 생성
for (const [workClass, { fileName, styles }] of workStylesMap.entries()) {
  const filePath = path.join(outputDir, `${fileName}.css`);
  const content = styles.join('\n');
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Created: ${fileName}.css (${styles.length} lines)`);
}

// 기본 스타일 추출 (작품별 스타일 제외)
const baseStyles = [];
const allWorkPatterns = Array.from(workClasses).map(wc => 
  new RegExp(`\\.work-detail--${wc.replace(/-/g, '\\-')}`, 'g')
);

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const isWorkStyle = allWorkPatterns.some(pattern => {
    pattern.lastIndex = 0; // Reset regex
    return pattern.test(line);
  });
  
  if (!isWorkStyle) {
    baseStyles.push(line);
  }
}

// 기본 스타일 저장
const baseStylesContent = baseStyles.join('\n');
const baseFilePath = path.join(__dirname, '../src/components/DesignerDetail/DesignerShowcase.base.css');
fs.writeFileSync(baseFilePath, baseStylesContent, 'utf-8');
console.log(`\nCreated: DesignerShowcase.base.css (${baseStyles.length} lines)`);

console.log(`\nTotal works extracted: ${workStylesMap.size}`);

