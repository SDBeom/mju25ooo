import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// WorkDetails 폴더 경로
const workDetailsPath = path.join(__dirname, '../src/components/DesignerDetail/WorkDetails/HeoJihoon');

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
    
    // 구문 오류 수정
    const replacements = [
      // 삼항 연산자 수정
      { pattern: /variant === 'secondary'\s+'secondary'/g, replacement: "variant === 'secondary' ? 'secondary'" },
      
      // 닫히지 않은 태그 수정
      { pattern: /<h5[^>]*>([^<]*)\/h5>/g, replacement: '<h5>$1</h5>' },
      { pattern: /alt="([^"]*)"\s*className=/g, replacement: 'alt="$1"\n              className=' },
      
      // br 태그 수정
      { pattern: /허지훈br\s*\/>/g, replacement: '<br />' },
      { pattern: /허지훈br\s*\/>/g, replacement: '<br />' },
      
      // 깨진 텍스트 수정
      { pattern: /"상\s*머릿에/g, replacement: '"상상의 머릿속에' },
      { pattern: /어<br\s*\/>/g, replacement: '떠오르는<br />' },
      { pattern: /창조허지훈에허지훈<br\s*\/>/g, replacement: '창조의<br />' },
      { pattern: /작다\."/g, replacement: '작업이다."' },
      
      // 마우스 관련
      { pattern: /마우\s*창작허지훈<br\s*\/>/g, replacement: '마우스를 창작<br />' },
      { pattern: /구로서/g, replacement: '도구로서' },
    ];
    
    replacements.forEach(({ pattern, replacement }) => {
      if (content.match(pattern)) {
        content = content.replace(pattern, replacement);
        modified = true;
      }
    });
    
    // 줄바꿈이 없는 alt 속성 수정
    const lines = content.split('\n');
    const newLines = [];
    
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      // alt="로 시작하고 다음 줄이 className으로 시작하는 경우 줄바꿈 추가
      if (line.includes('alt="') && !line.includes('className') && i < lines.length - 1) {
        const nextLine = lines[i + 1];
        if (nextLine && nextLine.trim().startsWith('className=')) {
          // alt 속성에 닫는 따옴표가 없으면 추가
          if (!line.trim().endsWith('"')) {
            line = line.trim() + '"';
          }
          newLines.push(line);
          modified = true;
          continue;
        }
      }
      newLines.push(line);
    }
    
    if (modified) {
      fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
      console.log(`✓ ${path.basename(filePath)}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// 메인 실행
console.log('허지훈 파일 구문 오류 수정 시작...\n');

const jsxFiles = findJSXFiles(workDetailsPath);
let fixedCount = 0;

jsxFiles.forEach(file => {
  if (fixFileContent(file)) {
    fixedCount++;
  }
});

console.log(`\n완료! ${fixedCount}개 파일이 수정되었습니다.`);

