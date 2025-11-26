import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const workDetailsPath = path.join(__dirname, '../src/components/DesignerDetail/WorkDetails');

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

function fixFileContent(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // 닫히지 않은 문자열 리터럴 수정
  const fixes = [
    // '무기 모델링' 관련
    { pattern: /'무기 모델[^']*$/gm, replacement: "'무기 모델링'" },
    { pattern: /'무기 모델[^']*}/g, replacement: "'무기 모델링'" },
    // 기타 닫히지 않은 문자열
    { pattern: /'([^']*)\?$/gm, replacement: "'$1'" },
    { pattern: /'([^']*)\}$/gm, replacement: "'$1'" },
  ];
  
  fixes.forEach(({ pattern, replacement }) => {
    if (content.match(pattern)) {
      content = content.replace(pattern, replacement);
      modified = true;
    }
  });
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ ${path.basename(filePath)}`);
    return true;
  }
  return false;
}

console.log('닫히지 않은 문자열 리터럴 수정 시작...\n');
const jsxFiles = findJSXFiles(workDetailsPath);
let fixedCount = 0;

jsxFiles.forEach(file => {
  if (fixFileContent(file)) {
    fixedCount++;
  }
});

console.log(`\n완료! ${fixedCount}개 파일이 수정되었습니다.`);

