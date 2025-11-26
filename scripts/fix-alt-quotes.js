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
    
    // 닫히지 않은 alt 속성 찾기 및 수정
    // 패턴: alt="... 다음 줄에 className이 오는 경우
    const lines = content.split('\n');
    const newLines = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const nextLine = i < lines.length - 1 ? lines[i + 1] : '';
      
      // alt="로 시작하고 닫는 따옴표가 없고, 다음 줄이 className으로 시작하는 경우
      if (line.includes('alt="') && !line.includes('alt=""') && !line.trim().endsWith('"') && 
          nextLine.trim().startsWith('className=')) {
        // alt 속성에 닫는 따옴표 추가
        const fixedLine = line.trim() + '"';
        newLines.push(fixedLine);
        modified = true;
        console.log(`  ✓ ${path.relative(workDetailsPath, filePath)}:${i + 1} - 닫는 따옴표 추가`);
      } else {
        newLines.push(line);
      }
    }
    
    if (modified) {
      fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// 메인 실행
console.log('닫히지 않은 alt 속성 수정 시작...\n');

const jsxFiles = findJSXFiles(workDetailsPath);
let fixedCount = 0;

jsxFiles.forEach(file => {
  if (fixFileContent(file)) {
    fixedCount++;
  }
});

console.log(`\n완료! ${fixedCount}개 파일이 수정되었습니다.`);

