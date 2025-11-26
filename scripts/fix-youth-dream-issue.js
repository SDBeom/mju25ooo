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

// 파일 내용 수정
function fixFileContent(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Youth Dream으로 잘못 바뀐 것들을 원래대로 복구
    // 하지만 이건 복구가 어렵습니다. 대신 일반적인 패턴만 수정
    const replacements = [
      // 주석 부분 복구
      { pattern: /\*\s*Youth Dream\s*-\s*Master\s*your\s*Imagination\s*\(Youth Dream품1\)/g, replacement: '* 허지훈 - Master your Imagination (작품1)' },
      { pattern: /\*\s*Youth Dream\s*-\s*Eternal\s*Vision\s*\(Youth Dream품2\)/g, replacement: '* 허지훈 - Eternal Vision (작품2)' },
      { pattern: /\*\s*조하늘\s*-\s*Youth Dream\s*\(Youth Dream품1\)/g, replacement: '* 조하늘 - Youth Dream (작품1)' },
      { pattern: /\*\s*조하늘\s*-\s*The\s*Reason\s*that\s*I\s*Live\s*\(Youth Dream품2\)/g, replacement: '* 조하늘 - The Reason that I Live (작품2)' },
      { pattern: /\*\s*Youth Dream정지민\s*-\s*/g, replacement: '* 정지민 - ' },
      { pattern: /\*\s*Youth Dream서린\s*-\s*/g, replacement: '* 서린 - ' },
      
      // Figma 관련
      { pattern: /Figma\s*Youth Dream자Youth Dream기반/g, replacement: 'Figma 디자인 기반' },
      { pattern: /Figma\s*Youth Dream자\?기반/g, replacement: 'Figma 디자인 기반' },
      
      // 일반 패턴
      { pattern: /Youth Dream품/g, replacement: '작품' },
      { pattern: /Youth Dream자Youth Dream/g, replacement: '디자인' },
    ];
    
    replacements.forEach(({ pattern, replacement }) => {
      if (content.match(pattern)) {
        content = content.replace(pattern, replacement);
        modified = true;
      }
    });
    
    // import 문에서 Youth Dream이 들어간 경우 복구
    // 이건 매우 복잡하므로 일단 주석만 수정
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ ${path.relative(workDetailsPath, filePath)}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// 메인 실행
console.log('Youth Dream 문제 수정 시작...\n');

const jsxFiles = findJSXFiles(workDetailsPath);
let fixedCount = 0;

jsxFiles.forEach(file => {
  if (fixFileContent(file)) {
    fixedCount++;
  }
});

console.log(`\n완료! ${fixedCount}개 파일이 수정되었습니다.`);

