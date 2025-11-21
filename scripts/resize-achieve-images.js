import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join, extname, basename } from 'path';
import { existsSync } from 'fs';

const achieveDir = './src/assets/achieve';
const targetWidth = 400; // 실제 표시 크기(200px)의 2배
const targetHeight = 600; // 실제 표시 크기(300px)의 2배

async function resizeImages() {
  try {
    const files = await readdir(achieveDir);
    const webpFiles = files.filter((file) => extname(file).toLowerCase() === '.webp');

    console.log(`Found ${webpFiles.length} webp files to resize...`);
    console.log(`Target size: ${targetWidth}x${targetHeight}px (2x display size for retina)\n`);

    for (const file of webpFiles) {
      const inputPath = join(achieveDir, file);
      const outputPath = join(achieveDir, `${basename(file, extname(file))}_resized.webp`);

      try {
        const metadata = await sharp(inputPath).metadata();
        console.log(`Processing: ${file} (${metadata.width}x${metadata.height})`);

        // 이미지 리사이징 (비율 유지하면서 최대 크기 제한)
        await sharp(inputPath)
          .resize(targetWidth, targetHeight, {
            fit: 'inside', // 비율 유지하면서 지정된 크기 안에 맞춤
            withoutEnlargement: true, // 원본보다 크게 만들지 않음
          })
          .webp({ quality: 80 })
          .toFile(outputPath);

        const resizedMetadata = await sharp(outputPath).metadata();
        console.log(`✓ Resized: ${file} → ${basename(outputPath)} (${resizedMetadata.width}x${resizedMetadata.height})\n`);
      } catch (error) {
        console.error(`✗ Failed to resize ${file}:`, error.message);
      }
    }

    console.log('Resizing complete!');
    console.log('\n⚠️  Next steps:');
    console.log('1. Check the resized images (_resized.webp files)');
    console.log('2. If they look good, replace the original webp files');
    console.log('3. Or update the import path to use _resized.webp files');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

resizeImages();

