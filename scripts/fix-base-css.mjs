import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseCssPath = path.join(__dirname, '../src/components/DesignerDetail/DesignerShowcase.base.css');
const cssContent = fs.readFileSync(baseCssPath, 'utf-8');
const lines = cssContent.split('\n');

// 불완전한 스타일 블록 제거 (선택자가 없는 스타일)
const cleanedLines = [];
let i = 0;

while (i < lines.length) {
  const line = lines[i];
  const trimmedLine = line.trim();
  
  // 선택자가 없는 스타일 블록 시작 감지 (중괄호만 있는 라인)
  if (trimmedLine === '{' || trimmedLine === '}') {
    // 이전 라인이 선택자가 아닌 경우 (빈 라인, 주석, 또는 속성만 있는 경우)
    if (i > 0) {
      const prevLine = lines[i - 1].trim();
      // 이전 라인이 선택자가 아니면 이 블록은 건너뛰기
      if (prevLine === '' || prevLine.startsWith('/*') || prevLine.startsWith('*') || 
          (!prevLine.includes('.') && !prevLine.includes('#') && !prevLine.includes('@'))) {
        // 중괄호 블록 건너뛰기
        let braceCount = 0;
        if (trimmedLine === '{') braceCount = 1;
        if (trimmedLine === '}') braceCount = -1;
        
        i++;
        while (i < lines.length && braceCount !== 0) {
          const currentLine = lines[i];
          braceCount += (currentLine.match(/\{/g) || []).length;
          braceCount -= (currentLine.match(/\}/g) || []).length;
          i++;
        }
        continue;
      }
    }
  }
  
  // "Caravan layout styles" 같은 주석 이후의 불완전한 블록 제거
  if (trimmedLine.includes('Caravan layout styles') || 
      trimmedLine.includes('work-detail--love-at-rust-sight 모바일 스타일')) {
    // 주석 이후의 불완전한 블록 건너뛰기
    i++;
    let braceCount = 0;
    while (i < lines.length) {
      const currentLine = lines[i];
      const currentTrimmed = currentLine.trim();
      
      // 다음 주석이나 선택자를 만나면 중단
      if (currentTrimmed.startsWith('/*') && !currentTrimmed.includes('work-detail--')) {
        break;
      }
      
      // 선택자를 만나면 중단
      if (currentTrimmed && (currentTrimmed.startsWith('.') || currentTrimmed.startsWith('@'))) {
        break;
      }
      
      braceCount += (currentLine.match(/\{/g) || []).length;
      braceCount -= (currentLine.match(/\}/g) || []).length;
      
      if (braceCount === 0 && currentTrimmed === '}') {
        i++;
        break;
      }
      
      i++;
    }
    continue;
  }
  
  cleanedLines.push(line);
  i++;
}

// 정리된 기본 CSS 저장
const cleanedCss = cleanedLines.join('\n');
fs.writeFileSync(baseCssPath, cleanedCss, 'utf-8');

console.log(`✅ Fixed base CSS: ${lines.length} → ${cleanedLines.length} lines`);
console.log(`   Removed: ${lines.length - cleanedLines.length} lines`);

