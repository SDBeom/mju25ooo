import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// WorkDetails 폴더 경로
const workDetailsPath = path.join(__dirname, '../src/components/DesignerDetail/WorkDetails');

// 디자이너 이름 매핑 (컴포넌트 폴더명 → assets 폴더명)
const designerNameMap = {
  'HeoJihoon': '허지훈',
  'JungJimin': '정지민',
  'SeoRin': '전서린',
  'ChoHaneul': '조하늘',
  'LeeJimin': '이지민',
  'LeeUn': '이운',
  'LeeDayoung': '이다영',
  'ParkJina': '박진아',
  'ParkHaein': '박해인',
  'ParkHeechan': '박희찬',
  'KimYunjung': '김윤정',
  'KimJaeeun': '김재은',
  'KimJina': '김지나',
  'KimChaeYoung': '김채영',
  'DoTienHong': '도티안홍',
  'Jeongitae': '전기태',
  'SeoDongbeom': '서동범',
  'SongDahee': '송다희',
  'ShimSungbin': '심성빈',
  'AhnSeonmin': '안선민',
  'Woosumin': '우수민',
  'LeeGabi': '이가비',
};

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

// 파일 경로에서 디자이너 이름 추출
function getDesignerFromPath(filePath) {
  const parts = filePath.split(path.sep);
  const designerIndex = parts.findIndex(p => designerNameMap[p]);
  if (designerIndex !== -1) {
    return {
      componentName: parts[designerIndex],
      koreanName: designerNameMap[parts[designerIndex]]
    };
  }
  return null;
}

// 파일 내용 수정
function fixFileContent(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    const originalContent = content;
    
    // 디자이너 정보 추출
    const designer = getDesignerFromPath(filePath);
    if (!designer) {
      return false;
    }
    
    // 잘못된 경로 패턴 찾기 및 수정
    // HeoJihoon 컴포넌트에서 다른 디자이너의 파일을 사용하는 경우
    if (designer.componentName === 'HeoJihoon') {
      // 작품1 파일들
      content = content.replace(
        /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/assets\/김윤정\/김윤정_Video_작품1_(\d+)\.webp['"]/g,
        (match, num) => {
          modified = true;
          return `from '../../../../assets/허지훈/허지훈_모션디자인_작품1_${num.padStart(2, '0')}.webp'`;
        }
      );
      
      content = content.replace(
        /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/assets\/김재은\/김재은_Video_작품1_(\d+)\.webp['"]/g,
        (match, num) => {
          modified = true;
          return `from '../../../../assets/허지훈/허지훈_모션디자인_작품1_${num.padStart(2, '0')}.webp'`;
        }
      );
      
      content = content.replace(
        /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/assets\/이운\/이운_멀티미디어_작품1_(\d+)\.webp['"]/g,
        (match, num) => {
          modified = true;
          return `from '../../../../assets/허지훈/허지훈_모션디자인_작품1_${num.padStart(2, '0')}.webp'`;
        }
      );
      
      content = content.replace(
        /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/assets\/전서린\/전서린_게임콘텐츠_작품1_(\d+)\.webp['"]/g,
        (match, num) => {
          modified = true;
          return `from '../../../../assets/허지훈/허지훈_모션디자인_작품1_${num.padStart(2, '0')}.webp'`;
        }
      );
      
      content = content.replace(
        /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/assets\/전서린\/전서린_게임콘텐츠_작품1_(\d+)\.webp['"]/g,
        (match, num) => {
          modified = true;
          return `from '../../../../assets/허지훈/허지훈_모션디자인_작품1_${num.padStart(2, '0')}.png'`;
        }
      );
      
      // 작품2 파일들
      content = content.replace(
        /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/assets\/김윤정\/김윤정_Video_작품2_(\d+)\.webp['"]/g,
        (match, num) => {
          modified = true;
          return `from '../../../../assets/허지훈/허지훈_모션디자인_작품2_${num.padStart(2, '0')}.webp'`;
        }
      );
      
      content = content.replace(
        /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/assets\/김지나\/김지나_멀티미디어_작품2_(\d+)\.webp['"]/g,
        (match, num) => {
          modified = true;
          return `from '../../../../assets/허지훈/허지훈_모션디자인_작품2_${num.padStart(2, '0')}.webp'`;
        }
      );
      
      content = content.replace(
        /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/assets\/김채영\/김채영_멀티미디어_작품2_(\d+)\.webp['"]/g,
        (match, num) => {
          modified = true;
          return `from '../../../../assets/허지훈/허지훈_모션디자인_작품2_${num.padStart(2, '0')}.webp'`;
        }
      );
      
      content = content.replace(
        /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/assets\/박진아\/박진아_멀티미디어_작품2_(\d+)\.webp['"]/g,
        (match, num) => {
          modified = true;
          return `from '../../../../assets/허지훈/허지훈_모션디자인_작품2_${num.padStart(2, '0')}.webp'`;
        }
      );
      
      content = content.replace(
        /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/assets\/우수민\/우수민_멀티미디어_작품2_(\d+)\.webp['"]/g,
        (match, num) => {
          modified = true;
          return `from '../../../../assets/허지훈/허지훈_모션디자인_작품2_${num.padStart(2, '0')}.webp'`;
        }
      );
    }
    
    // JungJimin 컴포넌트
    if (designer.componentName === 'JungJimin') {
      // The Gothic (작품1)
      content = content.replace(
        /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/assets\/김윤정\/김윤정_Video_작품1_(\d+)\.webp['"]/g,
        (match, num) => {
          modified = true;
          return `from '../../../../assets/정지민/정지민_게임콘텐츠_작품1_The_gothic_Desktop_${num.padStart(2, '0')}.webp'`;
        }
      );
      
      content = content.replace(
        /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/assets\/김재은\/김재은_Video_작품1_(\d+)\.webp['"]/g,
        (match, num) => {
          modified = true;
          return `from '../../../../assets/정지민/정지민_게임콘텐츠_작품1_The_gothic_Desktop_${num.padStart(2, '0')}.webp'`;
        }
      );
      
      // The Weapon (작품2)
      content = content.replace(
        /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/assets\/김윤정\/김윤정_Video_작품2_(\d+)\.webp['"]/g,
        (match, num) => {
          modified = true;
          return `from '../../../../assets/정지민/정지민_게임콘텐츠_작품2_The_weapon_Desktop_${num.padStart(2, '0')}.webp'`;
        }
      );
      
      content = content.replace(
        /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/assets\/김지나\/김지나_멀티미디어_작품2_(\d+)\.webp['"]/g,
        (match, num) => {
          modified = true;
          return `from '../../../../assets/정지민/정지민_게임콘텐츠_작품2_The_weapon_Desktop_${num.padStart(2, '0')}.webp'`;
        }
      );
      
      content = content.replace(
        /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/assets\/김채영\/김채영_멀티미디어_작품2_(\d+)\.webp['"]/g,
        (match, num) => {
          modified = true;
          return `from '../../../../assets/정지민/정지민_게임콘텐츠_작품2_The_weapon_Desktop_${num.padStart(2, '0')}.webp'`;
        }
      );
      
      content = content.replace(
        /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/assets\/박진아\/박진아_멀티미디어_작품2_(\d+)\.webp['"]/g,
        (match, num) => {
          modified = true;
          return `from '../../../../assets/정지민/정지민_게임콘텐츠_작품2_The_weapon_Desktop_${num.padStart(2, '0')}.webp'`;
        }
      );
    }
    
    // SeoRin 컴포넌트
    if (designer.componentName === 'SeoRin') {
      // RavenX (작품1)
      content = content.replace(
        /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/assets\/김윤정\/김윤정_Video_작품1_(\d+)\.webp['"]/g,
        (match, num) => {
          modified = true;
          return `from '../../../../assets/전서린/전서린_게임콘텐츠_작품1_${num.padStart(2, '0')}.webp'`;
        }
      );
      
      content = content.replace(
        /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/assets\/김재은\/김재은_Video_작품1_(\d+)\.webp['"]/g,
        (match, num) => {
          modified = true;
          return `from '../../../../assets/전서린/전서린_게임콘텐츠_작품1_${num.padStart(2, '0')}.webp'`;
        }
      );
      
      content = content.replace(
        /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/assets\/이운\/이운_멀티미디어_작품1_(\d+)\.webp['"]/g,
        (match, num) => {
          modified = true;
          return `from '../../../../assets/전서린/전서린_게임콘텐츠_작품1_${num.padStart(2, '0')}.webp'`;
        }
      );
      
      // Karon (작품2)
      content = content.replace(
        /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/assets\/김윤정\/김윤정_Video_작품2_(\d+)\.webp['"]/g,
        (match, num) => {
          modified = true;
          return `from '../../../../assets/전서린/전서린_게임디자인_작품2_${num.padStart(2, '0')}.webp'`;
        }
      );
    }
    
    // ChoHaneul 컴포넌트
    if (designer.componentName === 'ChoHaneul') {
      // Youth Dream (작품1)
      content = content.replace(
        /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/assets\/김윤정\/김윤정_Video_작품1_(\d+)\.webp['"]/g,
        (match, num) => {
          modified = true;
          return `from '../../../../assets/조하늘/조하늘_모션디자인_작품1_${num.padStart(2, '0')}.webp'`;
        }
      );
      
      content = content.replace(
        /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/assets\/김재은\/김재은_Video_작품1_(\d+)\.webp['"]/g,
        (match, num) => {
          modified = true;
          return `from '../../../../assets/조하늘/조하늘_모션디자인_작품1_${num.padStart(2, '0')}.webp'`;
        }
      );
      
      // The Reason That I Live (작품2)
      content = content.replace(
        /from\s+['"]\.\.\/\.\.\/\.\.\/\.\.\/assets\/김윤정\/김윤정_Video_작품2_(\d+)\.webp['"]/g,
        (match, num) => {
          modified = true;
          return `from '../../../../assets/조하늘/조하늘_영상콘텐츠_작품2_${num.padStart(2, '0')}.webp'`;
        }
      );
    }
    
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
console.log('잘못된 경로 수정 시작...\n');

const jsxFiles = findJSXFiles(workDetailsPath);
let fixedCount = 0;

jsxFiles.forEach(file => {
  if (fixFileContent(file)) {
    fixedCount++;
  }
});

console.log(`\n완료! ${fixedCount}개 파일이 수정되었습니다.`);

