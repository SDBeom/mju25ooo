import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const worksDir = path.join(__dirname, '../src/components/DesignerDetail/styles/works');

function fixTabletTitleAlign(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  const lines = content.split('\n');
  const newLines = [];
  let inTitleBlock = false;
  let titleBlockStart = -1;
  let braceCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // title 블록 시작 확인
    if (line.includes('work-detail__title') && line.includes('tablet') && line.includes('{')) {
      inTitleBlock = true;
      titleBlockStart = i;
      braceCount = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
    } else if (inTitleBlock) {
      braceCount += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      
      // 블록 종료
      if (braceCount === 0 && line.includes('}')) {
        // text-align이 없으면 추가
        const blockContent = lines.slice(titleBlockStart, i + 1).join('\n');
        if (!blockContent.includes('text-align')) {
          // 마지막 줄 앞에 text-align: left 추가
          const lastLine = lines[i];
          const indent = lastLine.match(/^(\s*)/)[1];
          newLines.push(indent + '  text-align: left;');
          modified = true;
        }
        inTitleBlock = false;
        titleBlockStart = -1;
      }
    }
    
    newLines.push(line);
  }

  if (modified) {
    fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
    console.log(`Fixed: ${path.relative(process.cwd(), filePath)}`);
    return true;
  }
  return false;
}

// 모든 Tablet.css 파일 찾기
function findTabletFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findTabletFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('Tablet.css')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// 실행
const tabletFiles = findTabletFiles(worksDir);
let fixedCount = 0;

for (const file of tabletFiles) {
  if (fixTabletTitleAlign(file)) {
    fixedCount++;
  }
}

console.log(`\nTotal files processed: ${tabletFiles.length}`);
console.log(`Files modified: ${fixedCount}`);

