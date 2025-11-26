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
    const lines = content.split('\n');
    const newLines = [];
    
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      const nextLine = i < lines.length - 1 ? lines[i + 1] : '';
      
      // 삼항 연산자 수정
      if (line.includes("variant === 'secondary'  'secondary'")) {
        line = line.replace(/variant === 'secondary'\s+'secondary'/, "variant === 'secondary' ? 'secondary'");
        modified = true;
      }
      
      // alt 속성 앞에 줄바꿈이 없는 경우 수정
      if (line.trim().startsWith('alt="') && !line.includes('className') && nextLine.trim().startsWith('className=')) {
        // alt 속성에 닫는 따옴표가 없으면 추가
        if (!line.trim().endsWith('"')) {
          line = line.trim() + '"';
        }
        // 줄바꿈 추가
        const indent = line.match(/^(\s*)/)[1];
        line = indent + line.trim();
        modified = true;
      }
      
      // className 앞에 잘못된 들여쓰기 수정
      if (line.trim().startsWith('className=') && !line.match(/^\s{14,16}className=/)) {
        const prevLine = i > 0 ? lines[i - 1] : '';
        if (prevLine.includes('alt=')) {
          const indent = prevLine.match(/^(\s*)/)[1];
          line = indent + 'className=' + line.split('className=')[1];
          modified = true;
        }
      }
      
      // 닫히지 않은 h5 태그 수정
      if (line.includes('<h5') && !line.includes('</h5>') && line.includes('/h5>')) {
        line = line.replace(/\/h5>/, '</h5>');
        modified = true;
      }
      
      // className이 없는 h5 태그에 추가
      if (line.includes('<h5>') && !line.includes('className')) {
        line = line.replace(/<h5>/, '<h5 className="work-detail__card-title">');
        modified = true;
      }
      
      newLines.push(line);
    }
    
    if (modified) {
      fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
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
console.log('모든 파일의 구문 오류 수정 시작...\n');

const jsxFiles = findJSXFiles(workDetailsPath);
let fixedCount = 0;

jsxFiles.forEach(file => {
  if (fixFileContent(file)) {
    fixedCount++;
  }
});

console.log(`\n완료! ${fixedCount}개 파일이 수정되었습니다.`);

