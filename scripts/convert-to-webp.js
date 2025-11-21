import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { existsSync } from 'fs';

const achieveDir = './src/assets/achieve';

async function convertToWebp() {
  try {
    const files = await readdir(achieveDir);
    const imageFiles = files.filter(
      (file) => ['.jpg', '.jpeg', '.png'].includes(extname(file).toLowerCase())
    );

    console.log(`Found ${imageFiles.length} image files to convert...`);

    for (const file of imageFiles) {
      const inputPath = join(achieveDir, file);
      const outputPath = join(achieveDir, `${basename(file, extname(file))}.webp`);

      // 이미 webp 파일이 있으면 스킵
      if (existsSync(outputPath)) {
        console.log(`Skipping ${file} (webp already exists)`);
        continue;
      }

      try {
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
        console.log(`✓ Converted: ${file} → ${basename(outputPath)}`);
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

