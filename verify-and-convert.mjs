import sharp from 'sharp';
import { existsSync, readdir, stat } from 'fs';
import { readdir as readdirAsync, stat as statAsync } from 'fs/promises';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function getAllPngFiles(dir, fileList = []) {
  const files = await readdirAsync(dir);
  
  for (const file of files) {
    const filePath = join(dir, file);
    const fileStat = await statAsync(filePath);
    
    if (fileStat.isDirectory()) {
      await getAllPngFiles(filePath, fileList);
    } else if (extname(file) === '.png') {
      fileList.push(filePath);
    }
  }
  
  return fileList;
}

async function convertPngToWebp(pngPath) {
  try {
    const webpPath = pngPath.replace(/\.png$/i, '.webp');
    
    if (existsSync(webpPath)) {
      return { converted: false, skipped: true, path: pngPath };
    }
    
    await sharp(pngPath)
      .webp({ quality: 85 })
      .toFile(webpPath);
    
    return { converted: true, skipped: false, path: pngPath, webpPath };
  } catch (error) {
    return { converted: false, skipped: false, error: error.message, path: pngPath };
  }
}

async function main() {
  const assetsDir = join(__dirname, 'src', 'assets');
  console.log('Finding all PNG files...');
  
  const pngFiles = await getAllPngFiles(assetsDir);
  console.log(`Found ${pngFiles.length} PNG files\n`);
  
  console.log('Converting to WebP...');
  let converted = 0;
  let skipped = 0;
  let errors = 0;
  
  for (const pngFile of pngFiles) {
    const result = await convertPngToWebp(pngFile);
    if (result.converted) {
      converted++;
      console.log(`✓ Converted: ${pngFile}`);
    } else if (result.skipped) {
      skipped++;
    } else {
      errors++;
      console.error(`✗ Error: ${pngFile} - ${result.error}`);
    }
  }
  
  console.log(`\nComplete!`);
  console.log(`Converted: ${converted}`);
  console.log(`Skipped (already exists): ${skipped}`);
  console.log(`Errors: ${errors}`);
}

main().catch(console.error);

