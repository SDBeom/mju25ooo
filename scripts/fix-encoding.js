import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// WorkDetails 폴더 경로
const workDetailsPath = path.join(__dirname, '../src/components/DesignerDetail/WorkDetails');

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

// 파일을 UTF-8로 변환
function convertToUTF8(filePath) {
  try {
    // 파일을 바이너리로 읽기
    const buffer = fs.readFileSync(filePath);
    
    // UTF-8로 디코딩 시도
    let content = buffer.toString('utf8');
    
    // 깨진 문자가 있는지 확인 (한글이 ?로 변환되었는지 확인)
    const hasBrokenChars = content.includes('') || 
                          content.match(/[가-힣].*[?]/) ||
                          content.match(/[?].*[가-힣]/) ||
                          (content.match(/[가-힣]/) && content.match(/[?]/) && content.length > 100);
    
    if (!hasBrokenChars) {
      // 이미 정상적인 UTF-8이면 스킵
      return false;
    }
    
    // 다른 인코딩으로 시도
    const encodings = ['euc-kr', 'cp949', 'latin1'];
    let converted = false;
    
    for (const encoding of encodings) {
      try {
        const testContent = buffer.toString(encoding);
        // 한글이 제대로 있는지 확인
        const hasKorean = /[가-힣]/.test(testContent);
        const hasBroken = testContent.includes('') || testContent.match(/[가-힣].*[?]/);
        
        if (hasKorean && !hasBroken) {
          content = testContent;
          console.log(`✓ ${path.relative(workDetailsPath, filePath)}: ${encoding} → UTF-8`);
          converted = true;
          break;
        }
      } catch (e) {
        // 다음 인코딩 시도
      }
    }
    
    if (converted) {
      // UTF-8로 저장
      fs.writeFileSync(filePath, content, 'utf8');
      return true;
    } else {
      console.log(`⚠ ${path.relative(workDetailsPath, filePath)}: 변환 실패 (이미 UTF-8이거나 다른 문제)`);
      return false;
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// 메인 실행
console.log('인코딩 변환 시작...\n');
console.log('WorkDetails 폴더의 모든 .jsx 파일을 UTF-8로 변환합니다.\n');

const jsxFiles = findJSXFiles(workDetailsPath);
let convertedCount = 0;

jsxFiles.forEach(file => {
  if (convertToUTF8(file)) {
    convertedCount++;
  }
});

console.log(`\n완료! ${convertedCount}개 파일이 변환되었습니다.`);
console.log(`총 ${jsxFiles.length}개 파일 중 ${jsxFiles.length - convertedCount}개는 이미 UTF-8입니다.`);
