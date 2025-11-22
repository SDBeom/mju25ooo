import sharp from 'sharp';
import { readdir, unlink } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const assetsDir = join(__dirname, '../src/assets/정지민');

async function convertPngToWebp() {
  try {
    const files = await readdir(assetsDir);
    const pngFiles = files.filter(file => file.endsWith('.png'));

    console.log(`Found ${pngFiles.length} PNG files to convert`);

    for (const pngFile of pngFiles) {
      const pngPath = join(assetsDir, pngFile);
      const webpFile = pngFile.replace(/\.png$/i, '.webp');
      const webpPath = join(assetsDir, webpFile);

      try {
        // PNG를 WebP로 변환
        await sharp(pngPath)
          .webp({ quality: 85 })
          .toFile(webpPath);

        console.log(`✓ Converted: ${pngFile} → ${webpFile}`);

        // PNG 파일 삭제
        await unlink(pngPath);
        console.log(`✓ Deleted: ${pngFile}`);
      } catch (error) {
        console.error(`✗ Error processing ${pngFile}:`, error.message);
      }
    }

    console.log('\n✅ Conversion complete!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

convertPngToWebp();

