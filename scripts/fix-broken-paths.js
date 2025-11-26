import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// WorkDetails 폴더 경로
const workDetailsPath = path.join(__dirname, '../src/components/DesignerDetail/WorkDetails');
const assetsPath = path.join(__dirname, '../src/assets');

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

// 실제 assets 파일 목록 가져오기
function getAssetFiles() {
  const assetFiles = [];
  
  function scanDir(dir, basePath = '') {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      const relativePath = path.join(basePath, file).replace(/\\/g, '/');
      
      if (stat.isDirectory()) {
        scanDir(filePath, relativePath);
      } else if (file.endsWith('.webp') || file.endsWith('.png') || file.endsWith('.jpg')) {
        assetFiles.push(relativePath);
      }
    });
  }
  
  scanDir(assetsPath);
  return assetFiles;
}

// 파일 내용 수정
function fixFileContent(filePath, assetFiles) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    const originalContent = content;
    
    // 깨진 경로 패턴 찾기 (assets 경로에 ?가 포함된 경우)
    const brokenPathPattern = /from\s+['"]([^'"]*assets\/[^'"]*[?][^'"]*)['"]/g;
    let match;
    
    while ((match = brokenPathPattern.exec(originalContent)) !== null) {
      const brokenPath = match[1];
      const brokenFileName = brokenPath.split('/').pop();
      
      // 파일명에서 숫자 추출
      const numbers = brokenFileName.match(/(\d+)/g);
      
      if (numbers) {
        // 실제 파일 찾기 (숫자 패턴으로 매칭)
        const foundFile = assetFiles.find(asset => {
          const assetNumbers = asset.match(/(\d+)/g);
          if (assetNumbers && numbers.length === assetNumbers.length) {
            // 모든 숫자가 일치하는지 확인
            return numbers.every((num, idx) => assetNumbers[idx] === num);
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
    }
    
    // 텍스트 내용 수정 (주석, 문자열 등)
    const replacements = [
      { pattern: /\/\*\s*\*\s*[?]{2,4}\s*-\s*/g, replacement: (match) => {
        // 주석의 디자이너 이름 수정
        if (match.includes('허지훈') || match.includes('?')) {
          return match.replace(/[?]{2,4}/, '허지훈');
        }
        return match;
      }},
      { pattern: /[?]{2,4}/g, replacement: '허지훈' },
      { pattern: /[?]자[?]/g, replacement: '디자인' },
      { pattern: /[?]품/g, replacement: '작품' },
      { pattern: /[?]{3}/g, replacement: '정지민' },
      { pattern: /게임콘텐[?]/g, replacement: '게임콘텐츠' },
      { pattern: /[?]더[?]/g, replacement: '렌더링' },
      { pattern: /[?]세/g, replacement: '상세' },
      { pattern: /[?]운/g, replacement: '이운' },
      { pattern: /[?]다[?][?]/g, replacement: '이다영' },
      { pattern: /[?]지[?]/g, replacement: '이지민' },
      { pattern: /[?]서[?]/g, replacement: '서린' },
    ];
    
    replacements.forEach(({ pattern, replacement }) => {
      if (typeof replacement === 'function') {
        content = content.replace(pattern, replacement);
      } else {
        content = content.replace(pattern, replacement);
      }
      if (content !== originalContent) {
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
console.log('깨진 경로 및 텍스트 수정 시작...\n');

const assetFiles = getAssetFiles();
console.log(`총 ${assetFiles.length}개의 assets 파일을 찾았습니다.\n`);

const jsxFiles = findJSXFiles(workDetailsPath);
let fixedCount = 0;

jsxFiles.forEach(file => {
  if (fixFileContent(file, assetFiles)) {
    fixedCount++;
  }
});

console.log(`\n완료! ${fixedCount}개 파일이 수정되었습니다.`);
