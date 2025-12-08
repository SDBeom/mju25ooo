const fs = require('fs');
const path = require('path');

// 파일 경로
const tabletFile = path.join(__dirname, '../src/components/DesignerDetail/WorkDetails/HeoJihoon/HeoJihoonMasterImaginationTablet.jsx');
const desktopFile = path.join(__dirname, '../src/components/DesignerDetail/WorkDetails/HeoJihoon/HeoJihoonMasterImaginationDesktop.jsx');

// 변경 매핑: 기존 → 새로운
const replacements = [
  // work1_19 → work1_02 (2곳)
  { old: 'heoJiHoonWork1_19', new: 'heoJiHoonWork1_02', count: 2 },
  // work1_02 → work1_03
  { old: 'heoJiHoonWork1_02', new: 'heoJiHoonWork1_03' },
  // work1_03 → work1_04
  { old: 'heoJiHoonWork1_03', new: 'heoJiHoonWork1_04' },
  // work1_04 → work1_05
  { old: 'heoJiHoonWork1_04', new: 'heoJiHoonWork1_05' },
  // work1_05 → work1_06
  { old: 'heoJiHoonWork1_05', new: 'heoJiHoonWork1_06' },
  // work1_06 → work1_07
  { old: 'heoJiHoonWork1_06', new: 'heoJiHoonWork1_07' },
  // work1_07 → work1_08
  { old: 'heoJiHoonWork1_07', new: 'heoJiHoonWork1_08' },
  // work1_09 → work1_10
  { old: 'heoJiHoonWork1_09', new: 'heoJiHoonWork1_10' },
  // work1_10 → work1_11
  { old: 'heoJiHoonWork1_10', new: 'heoJiHoonWork1_11' },
  // work1_11 → work1_12
  { old: 'heoJiHoonWork1_11', new: 'heoJiHoonWork1_12' },
  // work1_12 → work1_13
  { old: 'heoJiHoonWork1_12', new: 'heoJiHoonWork1_13' },
  // work1_13 → work1_14
  { old: 'heoJiHoonWork1_13', new: 'heoJiHoonWork1_14' },
  // work1_14 → work1_15
  { old: 'heoJiHoonWork1_14', new: 'heoJiHoonWork1_15' },
  // work1_15 → work1_16
  { old: 'heoJiHoonWork1_15', new: 'heoJiHoonWork1_16' },
  // work1_16 → work1_17
  { old: 'heoJiHoonWork1_16', new: 'heoJiHoonWork1_17' },
  // work1_17 → work1_18
  { old: 'heoJiHoonWork1_17', new: 'heoJiHoonWork1_18' },
  // work1_18 → work1_19
  { old: 'heoJiHoonWork1_18', new: 'heoJiHoonWork1_19' },
];

// Desktop 파일 특별 처리: 허지훈_모션디자인_작품1_19.webp → heojihoon_motiondesign_work1_02.webp
const desktopSpecialReplacements = [
  { old: "허지훈_모션디자인_작품1_19.webp", new: "heojihoon_motiondesign_work1_02.webp" },
  { old: "from '../../../../assets/허지훈/허지훈_모션디자인_작품1_19.webp'", new: "from '../../../../assets/허지훈/heojihoon_motiondesign_work1_02.webp'" },
];

function updateFile(filePath, isDesktop = false) {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠ 파일을 찾을 수 없습니다: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  if (isDesktop) {
    // Desktop 특별 처리
    for (const replacement of desktopSpecialReplacements) {
      if (content.includes(replacement.old)) {
        content = content.replace(new RegExp(replacement.old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement.new);
        changed = true;
        console.log(`✓ ${path.basename(filePath)}: ${replacement.old} → ${replacement.new}`);
      }
    }
  }

  // 역순으로 처리 (19 → 02, 18 → 19, ... 02 → 03)
  // work1_19는 이미 처리했으므로 제외
  for (let i = replacements.length - 1; i >= 0; i--) {
    const replacement = replacements[i];
    if (replacement.old === 'heoJiHoonWork1_19' && !isDesktop) {
      // Tablet/Mobile: work1_19 → work1_02 (2곳만)
      const regex = new RegExp(replacement.old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      const matches = content.match(regex);
      if (matches && matches.length > 0) {
        // 첫 2개만 교체
        let count = 0;
        content = content.replace(regex, (match) => {
          count++;
          return count <= 2 ? replacement.new : match;
        });
        changed = true;
        console.log(`✓ ${path.basename(filePath)}: ${replacement.old} → ${replacement.new} (2곳)`);
      }
    } else if (replacement.old !== 'heoJiHoonWork1_19') {
      const regex = new RegExp(replacement.old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      if (content.includes(replacement.old)) {
        content = content.replace(regex, replacement.new);
        changed = true;
        console.log(`✓ ${path.basename(filePath)}: ${replacement.old} → ${replacement.new}`);
      }
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${path.basename(filePath)} 업데이트 완료\n`);
  } else {
    console.log(`ℹ ${path.basename(filePath)} 변경사항 없음\n`);
  }
}

console.log('허지훈 작품1 이미지 import 경로 업데이트 시작...\n');

// Tablet 파일 업데이트
updateFile(tabletFile, false);

// Desktop 파일 업데이트
updateFile(desktopFile, true);

console.log('✅ 모든 파일 업데이트 완료!');

