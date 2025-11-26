import sharp from 'sharp';
import { readdir, stat, unlink } from 'fs/promises';
import { join, extname, basename } from 'path';
import { existsSync } from 'fs';

const seodongbeomDir = './src/assets/서동범';

async function convertToWebp() {
  try {
    const files = await readdir(seodongbeomDir);
    const pngFiles = files.filter(
      (file) => extname(file).toLowerCase() === '.png'
    );

    console.log(`Found ${pngFiles.length} PNG files to convert...`);

    for (const file of pngFiles) {
      const inputPath = join(seodongbeomDir, file);
      const outputPath = join(seodongbeomDir, `${basename(file, extname(file))}.webp`);

      try {
        // PNG를 WebP로 변환
        await sharp(inputPath)
          .webp({ quality: 85 })
          .toFile(outputPath);
        console.log(`✓ Converted: ${file} → ${basename(outputPath)}`);

        // PNG 파일 삭제
        await unlink(inputPath);
        console.log(`✓ Deleted: ${file}`);
      } catch (error) {
        console.error(`✗ Failed to convert ${file}:`, error.message);
      }
    }

    console.log('\nConversion complete!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

convertToWebp();

