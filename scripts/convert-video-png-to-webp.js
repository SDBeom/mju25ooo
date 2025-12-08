import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputPath = join(__dirname, '../src/assets/branding_logo/Video.png');
const outputPath = join(__dirname, '../src/assets/branding_logo/Video.webp');
const oldWebpPath = join(__dirname, '../src/assets/branding_logo/Video.webp');

try {
  // PNG를 WEBP로 변환
  if (fs.existsSync(inputPath)) {
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(outputPath);
    
    console.log('✅ Video.png를 Video.webp로 변환 완료');
    
    // 기존 Video.webp 삭제 (새로 만든 파일이므로)
    if (fs.existsSync(oldWebpPath) && oldWebpPath !== outputPath) {
      fs.unlinkSync(oldWebpPath);
      console.log('✅ 기존 Video.webp 삭제 완료');
    }
    
    // Video.png 삭제
    fs.unlinkSync(inputPath);
    console.log('✅ Video.png 삭제 완료');
    
    console.log('✅ 모든 작업 완료!');
  } else {
    console.error('❌ Video.png 파일을 찾을 수 없습니다.');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ 변환 중 오류 발생:', error);
  process.exit(1);
}

