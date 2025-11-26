import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const worksDir = path.join(__dirname, '../src/components/DesignerDetail/styles/works');
const outputFile = path.join(__dirname, '../src/components/DesignerDetail/styles/works-merged.css');

// 작품별 CSS 파일 목록 가져오기
const workFiles = fs.readdirSync(worksDir)
  .filter(file => file.endsWith('.css'))
  .sort();

console.log(`Merging ${workFiles.length} CSS files...`);

// 모든 CSS 파일 내용 합치기
let mergedContent = '/* 작품별 스타일 (병합됨) */\n\n';

for (const file of workFiles) {
  const filePath = path.join(worksDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  mergedContent += `/* ${file} */\n${content}\n\n`;
}

// 병합된 파일 저장
fs.writeFileSync(outputFile, mergedContent, 'utf-8');

console.log(`✅ Created merged CSS file: ${outputFile}`);
console.log(`   Total size: ${(mergedContent.length / 1024).toFixed(2)} KB`);

