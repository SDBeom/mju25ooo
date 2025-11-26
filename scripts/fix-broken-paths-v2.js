import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// WorkDetails 폴더 경로
const workDetailsPath = path.join(__dirname, '../src/components/DesignerDetail/WorkDetails');
const assetsPath = path.join(__dirname, '../src/assets');

// 디자이너 이름 매핑 (컴포넌트 폴더명 → assets 폴더명)
const designerNameMap = {
  'HeoJihoon': '허지훈',
  'JungJimin': '정지민',
  'SeoRin': '전서린',
  'ChoHaneul': '조하늘',
  'LeeJimin': '이지민',
  'LeeUn': '이운',
  'LeeDayoung': '이다영',
  'ParkJina': '박진아',
  'ParkHaein': '박해인',
  'ParkHeechan': '박희찬',
  'KimYunjung': '김윤정',
  'KimJaeeun': '김재은',
  'KimJina': '김지나',
  'KimChaeYoung': '김채영',
  'DoTienHong': '도티안홍',
  'Jeongitae': '전기태',
  'SeoDongbeom': '서동범',
  'SongDahee': '송다희',
  'ShimSungbin': '심성빈',
  'AhnSeonmin': '안선민',
  'Woosumin': '우수민',
  'LeeGabi': '이가비',
};

// 재귀적으로 모든 .jsx 파일 찾기
function findJSXFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findJSXFiles(filePath, fileList);
    } else if (file.endsWith('.jsx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// 파일 경로에서 디자이너 이름 추출
function getDesignerFromPath(filePath) {
  const parts = filePath.split(path.sep);
  const designerIndex = parts.findIndex(p => designerNameMap[p]);
  if (designerIndex !== -1) {
    return {
      componentName: parts[designerIndex],
      koreanName: designerNameMap[parts[designerIndex]]
    };
  }
  return null;
}

// 실제 assets 파일 목록 가져오기 (디자이너별로 그룹화)
function getAssetFilesByDesigner() {
  const assetMap = {};
  
  function scanDir(dir, basePath = '') {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      const relativePath = path.join(basePath, file).replace(/\\/g, '/');
      
      if (stat.isDirectory()) {
        scanDir(filePath, relativePath);
      } else if (file.endsWith('.webp') || file.endsWith('.png') || file.endsWith('.jpg')) {
        // 디자이너 폴더명 추출
        const folderName = basePath.split(path.sep)[0];
        if (!assetMap[folderName]) {
          assetMap[folderName] = [];
        }
        assetMap[folderName].push(relativePath);
      }
    });
  }
  
  scanDir(assetsPath);
  return assetMap;
}

// 파일 내용 수정
function fixFileContent(filePath, assetMap) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    const originalContent = content;
    
    // 디자이너 정보 추출
    const designer = getDesignerFromPath(filePath);
    if (!designer) {
      return false;
    }
    
    // 해당 디자이너의 assets 파일 목록
    const designerAssets = assetMap[designer.koreanName] || [];
    
    // 깨진 경로 패턴 찾기 (assets 경로에 ?가 포함된 경우)
    const brokenPathPattern = /from\s+['"]([^'"]*assets\/[^'"]*[?][^'"]*)['"]/g;
    let match;
    const matches = [];
    
    while ((match = brokenPathPattern.exec(originalContent)) !== null) {
      matches.push(match);
    }
    
    matches.forEach(match => {
      const brokenPath = match[1];
      const brokenFileName = brokenPath.split('/').pop();
      
      // 파일명에서 숫자 추출
      const numbers = brokenFileName.match(/(\d+)/g);
      
      if (numbers && numbers.length >= 2) {
        // 작품 번호와 파일 번호 추출
        const workNum = numbers[0];
        const fileNum = numbers[1];
        
        // 디자이너의 assets에서 매칭되는 파일 찾기
        const foundFile = designerAssets.find(asset => {
          const assetName = asset.split('/').pop();
          // 작품 번호와 파일 번호가 일치하는지 확인
          const assetNumbers = assetName.match(/(\d+)/g);
          if (assetNumbers && assetNumbers.length >= 2) {
            return assetNumbers[0] === workNum && assetNumbers[1] === fileNum;
          }
          return false;
        });
        
        if (foundFile) {
          const newPath = `'../../../../assets/${foundFile}'`;
          content = content.replace(match[0], `from ${newPath}`);
          console.log(`  ✓ ${path.relative(workDetailsPath, filePath)}: ${brokenFileName} → ${foundFile.split('/').pop()}`);
          modified = true;
        }
      }
    });
    
    // 텍스트 내용 수정 (주석, 문자열 등)
    const replacements = [
      { pattern: /[?]{2,4}/g, replacement: designer.koreanName },
      { pattern: /[?]자[?]/g, replacement: '디자인' },
      { pattern: /[?]품/g, replacement: '작품' },
      { pattern: /게임콘텐[?]/g, replacement: '게임콘텐츠' },
      { pattern: /[?]더[?]/g, replacement: '렌더링' },
      { pattern: /[?]세/g, replacement: '상세' },
      { pattern: /[?]운/g, replacement: '이운' },
      { pattern: /[?]다[?][?]/g, replacement: '이다영' },
      { pattern: /[?]지[?]/g, replacement: '이지민' },
      { pattern: /[?]서[?]/g, replacement: '서린' },
      { pattern: /모션[?]자[?]/g, replacement: '모션디자인' },
    ];
    
    replacements.forEach(({ pattern, replacement }) => {
      if (content.match(pattern)) {
        content = content.replace(pattern, replacement);
        modified = true;
      }
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// 메인 실행
console.log('깨진 경로 및 텍스트 수정 시작 (v2)...\n');

const assetMap = getAssetFilesByDesigner();
console.log(`총 ${Object.keys(assetMap).length}명의 디자이너 assets를 찾았습니다.\n`);

const jsxFiles = findJSXFiles(workDetailsPath);
let fixedCount = 0;

jsxFiles.forEach(file => {
  if (fixFileContent(file, assetMap)) {
    fixedCount++;
  }
});

console.log(`\n완료! ${fixedCount}개 파일이 수정되었습니다.`);

