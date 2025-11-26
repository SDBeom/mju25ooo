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

// 깨진 문자 패턴 확인
function hasBrokenChars(content) {
  // 한글과 ?가 함께 있는 패턴
  if (content.match(/[가-힣].*[?]/) || content.match(/[?].*[가-힣]/)) {
    return true;
  }
  // 알 수 없는 문자 패턴
  if (content.includes('') || content.includes('')) {
    return true;
  }
  // 한글이 있는데 ?도 많이 있는 경우
  const koreanCount = (content.match(/[가-힣]/g) || []).length;
  const questionCount = (content.match(/[?]/g) || []).length;
  if (koreanCount > 0 && questionCount > 10 && questionCount / koreanCount > 0.3) {
    return true;
  }
  return false;
}

// 파일을 UTF-8로 변환
function convertToUTF8(filePath) {
  try {
    // 파일을 바이너리로 읽기
    const buffer = fs.readFileSync(filePath);
    
    // UTF-8로 디코딩
    let content = buffer.toString('utf8');
    
    // 깨진 문자가 있는지 확인
    if (!hasBrokenChars(content)) {
      return false; // 이미 정상
    }
    
    // 다른 인코딩으로 시도
    const encodings = ['euc-kr', 'cp949', 'latin1'];
    let bestContent = null;
    let bestEncoding = null;
    let bestScore = 0;
    
    for (const encoding of encodings) {
      try {
        const testContent = buffer.toString(encoding);
        const koreanCount = (testContent.match(/[가-힣]/g) || []).length;
        const brokenCount = (testContent.match(/[?]/g) || []).length;
        const score = koreanCount - brokenCount * 2; // 한글은 +1, ?는 -2
        
        if (score > bestScore && koreanCount > 0) {
          bestContent = testContent;
          bestEncoding = encoding;
          bestScore = score;
        }
      } catch (e) {
        // 다음 인코딩 시도
      }
    }
    
    if (bestContent && bestEncoding) {
      // UTF-8로 저장
      fs.writeFileSync(filePath, bestContent, 'utf8');
      console.log(`✓ ${path.relative(workDetailsPath, filePath)}: ${bestEncoding} → UTF-8`);
      return true;
    } else {
      console.log(`⚠ ${path.relative(workDetailsPath, filePath)}: 변환 실패`);
      return false;
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// 메인 실행
console.log('인코딩 변환 시작 (고급 모드)...\n');
console.log('WorkDetails 폴더의 모든 .jsx 파일을 UTF-8로 변환합니다.\n');

const jsxFiles = findJSXFiles(workDetailsPath);
let convertedCount = 0;

jsxFiles.forEach(file => {
  if (convertToUTF8(file)) {
    convertedCount++;
  }
});

console.log(`\n완료! ${convertedCount}개 파일이 변환되었습니다.`);
console.log(`총 ${jsxFiles.length}개 파일 중 ${jsxFiles.length - convertedCount}개는 이미 정상입니다.`);

