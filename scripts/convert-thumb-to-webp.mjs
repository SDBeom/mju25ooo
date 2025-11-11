import path from 'path';
import { promises as fs } from 'fs';
import sharp from 'sharp';

const THUMB_DIR = path.resolve('src/assets/Thumb');
const QUALITY = 65;

async function collectPngFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectPngFiles(fullPath)));
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.png')) {
      files.push(fullPath);
    }
  }

  return files;
}

async function convertFile(filePath) {
  const dir = path.dirname(filePath);
  const base = path.basename(filePath, path.extname(filePath));
  const webpPath = path.join(dir, `${base}.webp`);

  await sharp(filePath).webp({ quality: QUALITY }).toFile(webpPath);
  await fs.unlink(filePath);

  return webpPath;
}

async function main() {
  try {
    await fs.access(THUMB_DIR);
  } catch {
    console.error(`Thumb directory not found: ${THUMB_DIR}`);
    process.exit(1);
  }

  const pngFiles = await collectPngFiles(THUMB_DIR);

  if (pngFiles.length === 0) {
    console.log('No PNG files found to convert.');
    return;
  }

  console.log(`Converting ${pngFiles.length} PNG file(s) to WebP...`);

  for (const file of pngFiles) {
    await convertFile(file);
    console.log(`→ ${file}`);
  }

  console.log('Conversion complete.');
}

main().catch((error) => {
  console.error('Failed to convert PNG files:', error);
  process.exit(1);
});

