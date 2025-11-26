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

  let fixedDesktop = 0;
  let fixedTablet = 0;
  let fixedMobile = 0;

  dirs.forEach(dir => {
    const dirPath = join(stylesDir, dir);
    const files = readdirSync(dirPath);

    files.forEach(file => {
      const filePath = join(dirPath, file);
      let content = readFileSync(filePath, 'utf8');
      let modified = false;

      // 포맷 정리: 중괄호 닫기 전에 있는 속성들을 정리
      content = content.replace(/\n\s+(\w+:\s*[^;]+;)\}/g, '\n  $1\n}');

      // Desktop/Tablet: flex-direction: row 추가 및 포맷 정리
      if (file.includes('Desktop.css') || file.includes('Tablet.css')) {
        // 히어로 섹션에 flex-direction: row가 없으면 추가
        content = content.replace(
          /(\.work-detail[^{]*\.work-detail__hero[^{]*\{[^}]*display:\s*flex[^}]*)(?!.*flex-direction)([^}]*)(\})/g,
          (match, before, middle, after) => {
            if (!middle.includes('flex-direction')) {
              modified = true;
              // align-items나 justify-content 앞에 flex-direction 추가
              if (middle.includes('align-items')) {
                return before + '\n  flex-direction: row;' + middle + after;
              }
              return before + '\n  flex-direction: row;' + middle + after;
            }
            return match;
          }
        );

        // 포맷 정리: flex-direction이 중괄호 닫기 전에 있으면 정리
        content = content.replace(
          /(\n\s+)(flex-direction:\s*row;)(\n\s*\})/g,
          '$1$2$3'
        );

        if (modified) {
          if (file.includes('Desktop.css')) fixedDesktop++;
          else fixedTablet++;
        }
      }

      // Mobile: display: flex와 flex-direction: column 추가
      if (file.includes('Mobile.css')) {
        // 히어로 섹션에 display: flex가 없으면 추가하고 flex-direction: column도 추가
        content = content.replace(
          /(\.work-detail[^{]*\.work-detail__hero[^{]*\{)([^}]*)(\})/g,
          (match, before, middle, after) => {
            if (!middle.includes('display:') && !middle.includes('flex-direction:')) {
              modified = true;
              // max-width나 width 다음에 display: flex와 flex-direction: column 추가
              if (middle.includes('max-width') || middle.includes('width')) {
                return before + middle + '\n  display: flex;\n  flex-direction: column;' + after;
              }
              return before + middle + '\n  display: flex;\n  flex-direction: column;' + after;
            } else if (middle.includes('display:') && !middle.includes('flex-direction:')) {
              modified = true;
              // display: flex 다음에 flex-direction: column 추가
              return before + middle.replace(/(display:\s*flex;)/, '$1\n  flex-direction: column;') + after;
            }
            return match;
          }
        );

        // 포맷 정리: order가 중괄호 닫기 전에 있으면 정리
        content = content.replace(
          /(\n\s+)(order:\s*-?1;)(\n\s*\})/g,
          '$1$2$3'
        );

        if (modified) fixedMobile++;
      }

      if (modified) {
        writeFileSync(filePath, content, 'utf8');
        console.log(`✓ Fixed: ${file}`);
      }
    });
  });

  console.log(`\nFixed ${fixedDesktop} Desktop files, ${fixedTablet} Tablet files, ${fixedMobile} Mobile files`);
}

fixHeroResponsive();

