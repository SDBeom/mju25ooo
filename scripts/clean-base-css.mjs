import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseCssPath = path.join(__dirname, '../src/components/DesignerDetail/DesignerShowcase.base.css');
const cssContent = fs.readFileSync(baseCssPath, 'utf-8');
const lines = cssContent.split('\n');

// 작품 클래스명 찾기
const workClasses = new Set();
const workClassPattern = /\.work-detail--([a-z-]+)/g;
let match;
while ((match = workClassPattern.exec(cssContent)) !== null) {
  workClasses.add(match[1]);
}

console.log(`Found ${workClasses.size} work classes in base CSS`);

// 작품 스타일이 포함된 라인 제거
const cleanedLines = [];
let skipLine = false;
let braceCount = 0;
let inWorkBlock = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmedLine = line.trim();
  
  // 작품 클래스가 포함된 라인인지 확인
  const hasWorkClass = Array.from(workClasses).some(wc => {
    const pattern = new RegExp(`\\.work-detail--${wc.replace(/-/g, '\\-')}`, 'g');
    pattern.lastIndex = 0;
    return pattern.test(line);
  });
  
  if (hasWorkClass) {
    // 작품 스타일 블록 시작
    inWorkBlock = true;
    braceCount = 0;
    skipLine = true;
  }
  
  if (inWorkBlock) {
    braceCount += (line.match(/\{/g) || []).length;
    braceCount -= (line.match(/\}/g) || []).length;
    
    if (braceCount === 0 && skipLine) {
      inWorkBlock = false;
      skipLine = false;
    }
    continue; // 작품 스타일 라인은 건너뛰기
  }
  
  cleanedLines.push(line);
}

// 정리된 기본 CSS 저장
const cleanedCss = cleanedLines.join('\n');
fs.writeFileSync(baseCssPath, cleanedCss, 'utf-8');

console.log(`✅ Cleaned base CSS: ${lines.length} → ${cleanedLines.length} lines`);
console.log(`   Removed: ${lines.length - cleanedLines.length} lines`);

