import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, dirname, extname, basename } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const assetsDir = join(__dirname, '../src/assets/서동범');

async function convertPngToWebp(dir) {
  try {
    const files = await readdir(dir);
    
    for (const file of files) {
      const filePath = join(dir, file);
      const fileStat = await stat(filePath);
      
      if (fileStat.isDirectory()) {
        // 하위 디렉토리도 처리
        await convertPngToWebp(filePath);
      } else if (file.toLowerCase().endsWith('.png')) {
        const webpPath = filePath.replace(/\.png$/i, '.webp');
        
        try {
          console.log(`변환 중: ${file} → ${basename(webpPath)}`);
          
          await sharp(filePath)
            .webp({ quality: 85, effort: 6 })
            .toFile(webpPath);
          
          const originalSize = fileStat.size;
          const webpStat = await stat(webpPath);
          const webpSize = webpStat.size;
          const reduction = ((1 - webpSize / originalSize) * 100).toFixed(1);
          
          console.log(`✅ 완료: ${file} (${(originalSize / 1024).toFixed(1)}KB → ${(webpSize / 1024).toFixed(1)}KB, ${reduction}% 감소)`);
        } catch (error) {
          console.error(`❌ 오류: ${file}`, error.message);
        }
      }
    }
  } catch (error) {
    console.error('디렉토리 읽기 오류:', error.message);
  }
}

console.log('서동범 PNG → WebP 변환 시작...\n');
await convertPngToWebp(assetsDir);
console.log('\n✅ 변환 완료!');

