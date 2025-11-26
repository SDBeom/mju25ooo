import { readFileSync, writeFileSync } from 'fs';
import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const stylesDir = join(__dirname, '../src/components/DesignerDetail/styles/works');

function fixHeroResponsive() {
  const dirs = readdirSync(stylesDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  let fixedFiles = 0;

  dirs.forEach(dir => {
    const dirPath = join(stylesDir, dir);
    const files = readdirSync(dirPath);

    files.forEach(file => {
      const filePath = join(dirPath, file);
      let content = readFileSync(filePath, 'utf8');
      let modified = false;

      // 중복 제거: flex-direction이 중복되어 있으면 하나만 남김
      content = content.replace(/(\s+flex-direction:\s*row;)\s*\n\s*flex-direction:\s*row;/g, '$1');
      content = content.replace(/(\s+flex-direction:\s*column;)\s*\n\s*flex-direction:\s*column;/g, '$1');

      // Desktop/Tablet: flex-direction: row 정리
      if (file.includes('Desktop.css') || file.includes('Tablet.css')) {
        // 히어로 섹션에서 flex-direction: row가 중괄호 닫기 전에 있으면 정리
        content = content.replace(
          /(\.work-detail[^{]*\.work-detail__hero[^{]*\{[^}]*display:\s*flex[^}]*align-items[^}]*justify-content[^}]*)\n\s+flex-direction:\s*row;\s*\n\s*(\})/g,
          (match, before, after) => {
            if (!before.includes('flex-direction')) {
              modified = true;
              return before + '\n  flex-direction: row;' + after;
            }
            return match;
          }
        );
      }

      // Mobile: hero-image-wrapper에서 불필요한 display: flex 제거
      if (file.includes('Mobile.css')) {
        // hero-image-wrapper에서 display: flex와 flex-direction: column 제거 (이미지 wrapper는 flex container가 아님)
        content = content.replace(
          /(\.work-detail[^{]*\.work-detail__hero-image-wrapper[^{]*\{[^}]*)(\n\s+display:\s*flex;\s*\n\s+flex-direction:\s*column;)/g,
          (match, before) => {
            modified = true;
            return before;
          }
        );

        // 히어로 섹션에 display: flex와 flex-direction: column이 없으면 추가
        content = content.replace(
          /(\.work-detail[^{]*\.work-detail__hero[^{]*\{)([^}]*max-width[^}]*margin[^}]*)(\})/g,
          (match, before, middle, after) => {
            if (!middle.includes('display:') && !middle.includes('flex-direction:')) {
              modified = true;
              return before + middle + '\n  display: flex;\n  flex-direction: column;' + after;
            }
            return match;
          }
        );
      }

      if (modified) {
        writeFileSync(filePath, content, 'utf8');
        console.log(`✓ Fixed: ${file}`);
        fixedFiles++;
      }
    });
  });

  console.log(`\nFixed ${fixedFiles} files`);
}

fixHeroResponsive();

