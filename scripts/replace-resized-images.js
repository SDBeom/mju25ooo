import { readdir, rename, unlink } from 'fs/promises';
import { join, extname, basename } from 'path';

const achieveDir = './src/assets/achieve';

async function replaceResizedImages() {
  try {
    const files = await readdir(achieveDir);
    const resizedFiles = files.filter((file) => file.includes('_resized.webp'));

    console.log(`Found ${resizedFiles.length} resized files to replace...\n`);

    for (const resizedFile of resizedFiles) {
      const resizedPath = join(achieveDir, resizedFile);
      // _resized.webp를 제거하여 원본 이름으로 복원
      const originalName = resizedFile.replace('_resized.webp', '.webp');
      const originalPath = join(achieveDir, originalName);

      try {
        // 원본 파일 삭제
        try {
          await unlink(originalPath);
          console.log(`Deleted original: ${originalName}`);
        } catch (error) {
          // 원본이 없으면 무시
          if (error.code !== 'ENOENT') throw error;
        }

        // 리사이징된 파일을 원본 이름으로 변경
        await rename(resizedPath, originalPath);
        console.log(`✓ Replaced: ${resizedFile} → ${originalName}\n`);
      } catch (error) {
        console.error(`✗ Failed to replace ${resizedFile}:`, error.message);
      }
    }

    console.log('Replacement complete!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

replaceResizedImages();

