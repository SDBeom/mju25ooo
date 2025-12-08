const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '../src/assets/허지훈');

// 파일명 변경 계획:
// 1. 작품1_19 → work1_02 (임시로 work1_19_temp로 먼저 변경)
// 2. work1_18 → work1_19
// 3. work1_17 → work1_18
// ... (역순으로 진행)
// 19. work1_02 → work1_03
// 20. work1_19_temp → work1_02

console.log('허지훈 작품1 이미지 파일명 변경 시작...');

try {
  // 1단계: 작품1_19를 임시 파일명으로 변경
  const oldFile19 = path.join(assetsDir, '허지훈_모션디자인_작품1_19.webp');
  const tempFile = path.join(assetsDir, 'heojihoon_motiondesign_work1_19_temp.webp');
  
  if (fs.existsSync(oldFile19)) {
    fs.renameSync(oldFile19, tempFile);
    console.log('✓ 작품1_19 → work1_19_temp (임시)');
  } else {
    console.log('⚠ 작품1_19 파일을 찾을 수 없습니다.');
  }

  // 2단계: 역순으로 파일명 변경 (18 → 19, 17 → 18, ... 02 → 03)
  for (let i = 18; i >= 2; i--) {
    const oldFile = path.join(assetsDir, `heojihoon_motiondesign_work1_${String(i).padStart(2, '0')}.webp`);
    const newFile = path.join(assetsDir, `heojihoon_motiondesign_work1_${String(i + 1).padStart(2, '0')}.webp`);
    
    if (fs.existsSync(oldFile)) {
      fs.renameSync(oldFile, newFile);
      console.log(`✓ work1_${String(i).padStart(2, '0')} → work1_${String(i + 1).padStart(2, '0')}`);
    } else {
      console.log(`⚠ work1_${String(i).padStart(2, '0')} 파일을 찾을 수 없습니다.`);
    }
  }

  // 3단계: 임시 파일을 work1_02로 변경
  if (fs.existsSync(tempFile)) {
    const finalFile = path.join(assetsDir, 'heojihoon_motiondesign_work1_02.webp');
    // work1_02가 이미 존재하면 백업
    if (fs.existsSync(finalFile)) {
      const backupFile = path.join(assetsDir, 'heojihoon_motiondesign_work1_02_backup.webp');
      fs.renameSync(finalFile, backupFile);
      console.log('✓ 기존 work1_02를 백업했습니다.');
    }
    fs.renameSync(tempFile, finalFile);
    console.log('✓ work1_19_temp → work1_02');
  }

  console.log('\n✅ 모든 파일명 변경이 완료되었습니다!');
} catch (error) {
  console.error('❌ 오류 발생:', error.message);
  process.exit(1);
}

