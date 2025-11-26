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
      const beforeLength = content.length;
      content = content.replace(/(\s+flex-direction:\s*row;)\s*\n\s*flex-direction:\s*row;/g, '$1');
      content = content.replace(/(\s+flex-direction:\s*column;)\s*\n\s*flex-direction:\s*column;/g, '$1');
      if (content.length !== beforeLength) modified = true;

      // Desktop/Tablet: flex-direction: row 정리 (중괄호 닫기 전에 있으면 정리)
      if (file.includes('Desktop.css') || file.includes('Tablet.css')) {
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

