import { readFileSync, writeFileSync } from 'fs';
import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const stylesDir = join(__dirname, '../src/components/DesignerDetail/styles/works');

function removeDuplicateFlexDirection() {
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
      content = content.replace(
        /(\n\s+flex-direction:\s*column;[^}]*)\n\s+flex-direction:\s*row;(\})/g,
        '$1$2'
      );

      // hero 섹션에서 중복된 flex-direction: row 제거
      content = content.replace(
        /(\n\s+flex-direction:\s*row;[^}]*)\n\s+flex-direction:\s*row;(\})/g,
        '$1$2'
      );

      // 중괄호 닫기 전에 있는 불필요한 flex-direction 제거
      content = content.replace(
        /(\n\s+)\n\s+flex-direction:\s*row;(\})/g,
        '$1$2'
      );

      if (content !== readFileSync(filePath, 'utf8')) {
        modified = true;
        writeFileSync(filePath, content, 'utf8');
        console.log(`✓ Fixed: ${file}`);
        fixedFiles++;
      }
    });
  });

  console.log(`\nFixed ${fixedFiles} files`);
}

removeDuplicateFlexDirection();

