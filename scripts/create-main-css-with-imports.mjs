import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseCssPath = path.join(__dirname, '../src/components/DesignerDetail/DesignerShowcase.base.css');
const worksDir = path.join(__dirname, '../src/components/DesignerDetail/styles/works');
const outputCssPath = path.join(__dirname, '../src/components/DesignerDetail/DesignerShowcase.css');

// 작품별 CSS 파일 목록 가져오기
const workFiles = fs.readdirSync(worksDir)
  .filter(file => file.endsWith('.css'))
  .sort();

// 기본 CSS 읽기
const baseCss = fs.readFileSync(baseCssPath, 'utf-8');

// @import 문 생성
const imports = workFiles.map(file => `@import './styles/works/${file}';`).join('\n');

// 최종 CSS 생성
const finalCss = `/* ============================================
   DesignerShowcase 메인 CSS 진입점
   ============================================ */

/* 작품별 스타일 import */
${imports}

/* ============================================
   기본 스타일
   ============================================ */
${baseCss}
`;

// 메인 CSS 파일에 쓰기
fs.writeFileSync(outputCssPath, finalCss, 'utf-8');

console.log(`✅ Created DesignerShowcase.css with ${workFiles.length} work imports`);
console.log(`   Base styles: ${baseCss.split('\n').length} lines`);
console.log(`   Work files: ${workFiles.length} files`);

