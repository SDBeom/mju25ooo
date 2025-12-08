import sharp from 'sharp';
import { readdir, stat, unlink } from 'fs/promises';
import { join, dirname, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { readFile, writeFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const assetsDir = join(__dirname, '../src/assets');
const srcDir = join(__dirname, '../src');

// 변환된 파일 목록 저장
const convertedFiles = new Map();

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
          
          // 변환 정보 저장 (상대 경로 기준)
          const relativePngPath = filePath.replace(srcDir + '\\', '').replace(/\\/g, '/');
          const relativeWebpPath = webpPath.replace(srcDir + '\\', '').replace(/\\/g, '/');
          convertedFiles.set(relativePngPath, relativeWebpPath);
          
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

async function updateCodeReferences() {
  console.log('\n코드에서 PNG 참조를 WebP로 변경 중...\n');
  
  const jsFiles = [
    join(srcDir, 'components/ComingSoon/ComingSoonContent.jsx'),
    join(srcDir, 'data/designerDetailsData.js'),
    join(srcDir, 'utils/resolveThumbSrc.js'),
  ];
  
  for (const filePath of jsFiles) {
    try {
      let content = await readFile(filePath, 'utf-8');
      let modified = false;
      
      // 변환된 파일들의 참조 업데이트
      for (const [pngPath, webpPath] of convertedFiles) {
        // 다양한 import 패턴 처리
        const patterns = [
          new RegExp(`(['"\`])${pngPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(['"\`])`, 'g'),
          new RegExp(`(['"\`])\.\.?/[^'"]*${basename(pngPath).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(['"\`])`, 'g'),
        ];
        
        for (const pattern of patterns) {
          if (pattern.test(content)) {
            content = content.replace(pattern, (match, quote1, quote2) => {
              return match.replace(/\.png/gi, '.webp');
            });
            modified = true;
          }
        }
      }
      
      // 일반적인 .png → .webp 변경
      const pngImportPattern = /from\s+['"]([^'"]+\.png)['"]/gi;
      if (pngImportPattern.test(content)) {
        content = content.replace(pngImportPattern, (match, path) => {
          return match.replace(/\.png/gi, '.webp');
        });
        modified = true;
      }
      
      if (modified) {
        await writeFile(filePath, content, 'utf-8');
        console.log(`✅ 업데이트: ${filePath.replace(srcDir + '\\', '')}`);
      }
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error(`❌ 파일 업데이트 오류: ${filePath}`, error.message);
      }
    }
  }
}

async function deletePngFiles(dir) {
  try {
    const files = await readdir(dir);
    
    for (const file of files) {
      const filePath = join(dir, file);
      const fileStat = await stat(filePath);
      
      if (fileStat.isDirectory()) {
        await deletePngFiles(filePath);
      } else if (file.toLowerCase().endsWith('.png')) {
        try {
          await unlink(filePath);
          console.log(`🗑️  삭제: ${file}`);
        } catch (error) {
          console.error(`❌ 삭제 실패: ${file}`, error.message);
        }
      }
    }
  } catch (error) {
    console.error('디렉토리 읽기 오류:', error.message);
  }
}

async function main() {
  console.log('=== PNG → WebP 변환 시작 ===\n');
  
  // 1. 변환
  await convertPngToWebp(assetsDir);
  
  // 2. 코드 업데이트
  await updateCodeReferences();
  
  // 3. PNG 파일 삭제
  console.log('\n=== PNG 파일 삭제 시작 ===\n');
  await deletePngFiles(assetsDir);
  
  console.log('\n✅ 모든 작업 완료!');
}

main().catch((error) => {
  console.error('오류 발생:', error);
  process.exit(1);
});


















