import { readFileSync, writeFileSync } from 'fs';
import { readdirSync, statSync } from 'fs';
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

      // Desktop/Tablet: flex-direction: row 추가
      if (file.includes('Desktop.css') || file.includes('Tablet.css')) {
        // 히어로 섹션에 flex-direction: row가 없으면 추가
        const heroPattern = /(\.work-detail[^{]*\.work-detail__hero[^{]*\{[^}]*display:\s*flex[^}]*)(?!.*flex-direction)/g;
        if (heroPattern.test(content)) {
          content = content.replace(
            /(\.work-detail[^{]*\.work-detail__hero[^{]*\{[^}]*display:\s*flex[^}]*)(\})/g,
            (match, before, after) => {
              if (!before.includes('flex-direction')) {
                modified = true;
                return before + '\n  flex-direction: row;' + after;
              }
              return match;
            }
          );
        }

        // 더 간단한 패턴: display: flex 다음에 flex-direction이 없으면 추가
        content = content.replace(
          /(\.work-detail[^{]*\.work-detail__hero[^{]*\{[^}]*display:\s*flex;)([^}]*)(\})/g,
          (match, before, middle, after) => {
            if (!middle.includes('flex-direction')) {
              modified = true;
              return before + '\n  flex-direction: row;' + middle + after;
            }
            return match;
          }
        );

        if (modified) {
          if (file.includes('Desktop.css')) fixedDesktop++;
          else fixedTablet++;
        }
      }

      // Mobile: flex-direction: column 및 order 추가
      if (file.includes('Mobile.css')) {
        // 히어로 섹션에 flex-direction: column이 없으면 추가
        content = content.replace(
          /(\.work-detail[^{]*\.work-detail__hero[^{]*\{[^}]*display:\s*flex;)([^}]*)(\})/g,
          (match, before, middle, after) => {
            if (!middle.includes('flex-direction')) {
              modified = true;
              return before + '\n  flex-direction: column;' + middle + after;
            }
            return match;
          }
        );

        // 이미지 wrapper에 order: -1 추가
        content = content.replace(
          /(\.work-detail[^{]*\.work-detail__hero-image-wrapper[^{]*\{[^}]*)(\})/g,
          (match, before, after) => {
            if (!before.includes('order')) {
              modified = true;
              return before + '\n  order: -1;' + after;
            }
            return match;
          }
        );

        // 콘텐츠에 order: 1 추가
        content = content.replace(
          /(\.work-detail[^{]*\.work-detail__hero-content[^{]*\{[^}]*)(\})/g,
          (match, before, after) => {
            if (!before.includes('order')) {
              modified = true;
              return before + '\n  order: 1;' + after;
            }
            return match;
          }
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

