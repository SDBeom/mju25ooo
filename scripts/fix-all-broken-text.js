import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// WorkDetails 폴더 경로
const workDetailsPath = path.join(__dirname, '../src/components/DesignerDetail/WorkDetails');

// 재귀적으로 모든 .jsx 파일 찾기
function findJSXFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findJSXFiles(filePath, fileList);
    } else if (file.endsWith('.jsx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// 파일 내용 수정
function fixFileContent(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // 공통 깨진 텍스트 패턴 수정
    const replacements = [
      // 주석 부분 - 디자이너 이름
      { pattern: /\*\s*\?{2,4}정지민\s*-\s*/g, replacement: '* 정지민 - ' },
      { pattern: /\*\s*\?{2,4}서린\s*-\s*/g, replacement: '* 서린 - ' },
      { pattern: /\*\s*조하늘\s*-\s*\??\s*\(\?품1\)/g, replacement: '* 조하늘 - Youth Dream (작품1)' },
      { pattern: /\*\s*조하늘\s*-\s*The\s*Reason\s*that\s*I\s*Live\s*\(\?품2\)/g, replacement: '* 조하늘 - The Reason that I Live (작품2)' },
      
      // 일반 패턴
      { pattern: /\?품/g, replacement: '작품' },
      { pattern: /\?자허지훈기반/g, replacement: '디자인 기반' },
      { pattern: /\?자\?기반/g, replacement: '디자인 기반' },
      { pattern: /Figma\s*\?자허지훈기반/g, replacement: 'Figma 디자인 기반' },
      { pattern: /Figma\s*\?자\?기반/g, replacement: 'Figma 디자인 기반' },
      
      // 정지민 관련
      { pattern: /\?{2,4}정지민/g, replacement: '정지민' },
      
      // 서린 관련
      { pattern: /\?서\?/g, replacement: '서린' },
      { pattern: /\?{2}서린/g, replacement: '서린' },
      
      // 조하늘 관련
      { pattern: /\??/g, replacement: 'Youth Dream' },
      
      // 허지훈 관련 (남아있는 것들)
      { pattern: /허지훈허지훈/g, replacement: '허지훈' },
      { pattern: /\?허지훈/g, replacement: '허지훈' },
      { pattern: /허지훈\?/g, replacement: '허지훈' },
      
      // 일반적인 깨진 문자 패턴
      { pattern: /\?{2,4}/g, replacement: '' }, // 연속된 물음표 제거
      { pattern: /\?자\?/g, replacement: '디자인' },
      { pattern: /게임콘텐\?/g, replacement: '게임콘텐츠' },
      { pattern: /모션\?자\?/g, replacement: '모션디자인' },
    ];
    
    replacements.forEach(({ pattern, replacement }) => {
      if (content.match(pattern)) {
        content = content.replace(pattern, replacement);
        modified = true;
      }
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ ${path.relative(workDetailsPath, filePath)}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// 메인 실행
console.log('모든 파일의 깨진 텍스트 수정 시작...\n');

const jsxFiles = findJSXFiles(workDetailsPath);
let fixedCount = 0;

jsxFiles.forEach(file => {
  if (fixFileContent(file)) {
    fixedCount++;
  }
});

console.log(`\n완료! ${fixedCount}개 파일이 수정되었습니다.`);

