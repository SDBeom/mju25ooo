import sharp from 'sharp';
import { existsSync } from 'fs';
import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';

async function convertPngToWebp(pngPath) {
  try {
    const webpPath = pngPath.replace(/\.png$/i, '.webp');
    
    if (!existsSync(pngPath)) {
      console.log(`PNG not found: ${pngPath}`);
      return;
    }
    
    if (existsSync(webpPath)) {
      console.log(`Skipping ${pngPath} (webp already exists)`);
      return;
    }
    
    await sharp(pngPath)
      .webp({ quality: 85 })
      .toFile(webpPath);
    
    console.log(`✓ Converted: ${pngPath} -> ${webpPath}`);
  } catch (error) {
    console.error(`✗ Error converting ${pngPath}:`, error.message);
  }
}

// 우선 변환할 파일들
const urgentFiles = [
  'src/assets/김재은/김재은_Video_작품1_02.png',
  'src/assets/김재은/김재은_Video_작품1_04.png',
  'src/assets/김재은/김재은_Video_작품1_05.png',
  'src/assets/김재은/김재은_Video_작품1_06.png',
];

console.log('Converting urgent files...');
for (const file of urgentFiles) {
  await convertPngToWebp(file);
}
console.log('Done!');


