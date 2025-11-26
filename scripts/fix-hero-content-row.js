import { readFileSync, writeFileSync } from 'fs';
import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const stylesDir = join(__dirname, '../src/components/DesignerDetail/styles/works');

function fixHeroContent() {
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

      // hero-content에서 잘못 추가된 flex-direction: row 제거
      // hero-content는 항상 flex-direction: column이어야 함
      content = content.replace(
        /(\.work-detail[^{]*\.work-detail__hero-content[^{]*\{[^}]*flex-direction:\s*column[^}]*)\n\s+flex-direction:\s*row;/g,
        '$1'
      );

      // 중괄호 닫기 전에 있는 flex-direction: row 제거
      content = content.replace(
        /(\.work-detail[^{]*\.work-detail__hero-content[^{]*\{[^}]*)\n\s+flex-direction:\s*row;(\})/g,
        (match, before, after) => {
          if (!before.includes('flex-direction: column')) {
            // flex-direction이 없으면 column 추가
            modified = true;
            return before + '\n  flex-direction: column;' + after;
          }
          modified = true;
          return before + after;
        }
      );

      // hero 섹션에서 중복된 flex-direction: row 제거
      content = content.replace(
        /(\n\s+flex-direction:\s*row;)\s*\n\s+flex-direction:\s*row;/g,
        '$1'
      );

      if (modified) {
        writeFileSync(filePath, content, 'utf8');
        console.log(`✓ Fixed: ${file}`);
        fixedFiles++;
      }
    });
  });

  console.log(`\nFixed ${fixedFiles} files`);
}

fixHeroContent();

