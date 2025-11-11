import path from 'path';
import { promises as fs } from 'fs';
import sharp from 'sharp';

const THUMB_DIR = path.resolve('src/assets/Thumb');
const OUTPUT_QUALITY = 45;
const MAX_WIDTH = 720;
const MAX_HEIGHT = 720;

async function collectWebpFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectWebpFiles(fullPath)));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.webp')) {
      files.push(fullPath);
    }
  }

  return files;
}

async function optimizeWebp(filePath) {
  const original = await fs.readFile(filePath);
  const originalSize = original.length;

  const image = sharp(original, { sequentialRead: true });
  const metadata = await image.metadata();

  const targetWidth =
    metadata.width && metadata.width > MAX_WIDTH ? MAX_WIDTH : metadata.width;
  const targetHeight =
    metadata.height && metadata.height > MAX_HEIGHT ? MAX_HEIGHT : metadata.height;

  const optimizedBuffer = await image
    .resize({
      width: targetWidth,
      height: targetHeight,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({
      quality: OUTPUT_QUALITY,
      effort: 6,
      smartSubsample: true,
    })
    .toBuffer();

  await fs.writeFile(filePath, optimizedBuffer);

  return { originalSize, optimizedSize: optimizedBuffer.length };
}

async function main() {
  try {
    await fs.access(THUMB_DIR);
  } catch {
    console.error(`Thumb directory not found: ${THUMB_DIR}`);
    process.exit(1);
  }

  const webpFiles = await collectWebpFiles(THUMB_DIR);

  if (webpFiles.length === 0) {
    console.log('No WebP files found to optimize.');
    return;
  }

  console.log(`Optimizing ${webpFiles.length} WebP file(s)...`);

  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const file of webpFiles) {
    try {
      const { originalSize, optimizedSize } = await optimizeWebp(file);
      totalOriginal += originalSize;
      totalOptimized += optimizedSize;

      const reduction = originalSize ? ((originalSize - optimizedSize) / originalSize) * 100 : 0;
      console.log(
        `→ ${file}\n   ${formatBytes(originalSize)} → ${formatBytes(optimizedSize)} (${reduction.toFixed(
          1
        )}% saved)`
      );
    } catch (error) {
      console.error(`Failed to optimize ${file}:`, error.message);
    }
  }

  const totalReduction = totalOriginal
    ? ((totalOriginal - totalOptimized) / totalOriginal) * 100
    : 0;

  console.log('\nOptimization summary:');
  console.log(`- Original total:  ${formatBytes(totalOriginal)}`);
  console.log(`- Optimized total: ${formatBytes(totalOptimized)}`);
  console.log(`- Reduction:       ${totalReduction.toFixed(1)}%`);
}

function formatBytes(bytes) {
  if (bytes === 0 || typeof bytes !== 'number') return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** exponent;
  return `${value.toFixed(value >= 10 || exponent === 0 ? 0 : 1)} ${units[exponent]}`;
}

main().catch((error) => {
  console.error('Failed to optimize WebP files:', error);
  process.exit(1);
});


