import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function getAllPngFiles(dir, fileList = []) {
  const files = await readdir(dir);
  
  for (const file of files) {
    const filePath = join(dir, file);
    const fileStat = await stat(filePath);
    
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
    
    // 이미 webp 파일이 존재하면 스킵
    try {
      await stat(webpPath);
      console.log(`Skipping ${pngPath} (webp already exists)`);
      return;
    } catch {
      // webp 파일이 없으면 변환 진행
    }
    
    await sharp(pngPath)
      .webp({ quality: 85 })
      .toFile(webpPath);
    
    console.log(`Converted: ${pngPath} -> ${webpPath}`);
  } catch (error) {
    console.error(`Error converting ${pngPath}:`, error.message);
  }
}

async function main() {
  const assetsDir = join(__dirname, 'src', 'assets');
  console.log('Finding all PNG files...');
  
  const pngFiles = await getAllPngFiles(assetsDir);
  console.log(`Found ${pngFiles.length} PNG files`);
  
  console.log('Converting to WebP...');
  for (const pngFile of pngFiles) {
    await convertPngToWebp(pngFile);
  }
  
  console.log('Conversion complete!');
}

main().catch(console.error);

