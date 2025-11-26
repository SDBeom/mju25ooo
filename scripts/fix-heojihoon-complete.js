import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// WorkDetails 폴더 경로
const workDetailsPath = path.join(__dirname, '../src/components/DesignerDetail/WorkDetails/HeoJihoon');

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
    
    // import 경로 수정 (작작품 -> 작품)
    content = content.replace(/작작품/g, '작품');
    if (content.includes('작작품')) {
      modified = true;
    }
    
    // 주석 수정
    content = content.replace(/\*\s*허지훈\s*-\s*Master\s*your\s*Imagination\s*\(작품1\)/g, '* 허지훈 - Master your Imagination (작품1)');
    content = content.replace(/\*\s*허지훈\s*-\s*Eternal\s*Vision\s*\(작품2\)/g, '* 허지훈 - Eternal Vision (작품2)');
    content = content.replace(/Figma\s*디자인\s*기반/g, 'Figma 디자인 기반');
    
    // 텍스트 내용 수정 - 허지훈이 중간에 삽입된 패턴 제거
    const textReplacements = [
      // 허지훈 제거 패턴
      { from: /허지훈해/g, to: '를 통해' },
      { from: /허지훈상/g, to: '이 작품은' },
      { from: /허지훈각/g, to: '각' },
      { from: /허지훈낸/g, to: '낸' },
      { from: /허지훈상다/g, to: '브랜딩이다' },
      { from: /허지훈구/g, to: '도구' },
      { from: /허지훈에/g, to: '의' },
      { from: /허지훈만남/g, to: '의 만남' },
      { from: /허지훈직임/g, to: '라 움직임' },
      { from: /허지훈며/g, to: '며' },
      { from: /허지훈불러/g, to: '로 불러' },
      { from: /허지훈뷰포/g, to: 'D 뷰포' },
      { from: /허지훈상허지훈/g, to: '상의' },
      { from: /허지훈용/g, to: '을 활용' },
      { from: /허지훈하/g, to: '하여' },
      { from: /허지훈질감/g, to: ' 질감' },
      { from: /허지훈스케/g, to: '로 업스케' },
      { from: /허지훈링/g, to: '일링' },
      { from: /허지훈진행/g, to: '을 진행' },
      { from: /허지훈과정/g, to: ' 과정' },
      { from: /허지훈반복/g, to: ' 반복' },
      { from: /허지훈롬/g, to: ' 프롬' },
      { from: /허지훈트/g, to: '프트' },
      { from: /허지훈력/g, to: '을 입력' },
      { from: /허지훈여/g, to: '여' },
      { from: /허지훈었/g, to: '했' },
      { from: /허지훈번/g, to: '의 번' },
      { from: /허지훈하허지훈/g, to: '한' },
      { from: /허지훈결과/g, to: ' 결과' },
      { from: /허지훈구/g, to: ' 연구' },
      { from: /허지훈행/g, to: '시행' },
      { from: /허지훈착오/g, to: '착오' },
      { from: /허지훈해/g, to: '를 통해' },
      { from: /허지훈나/g, to: '의 나' },
      { from: /허지훈창작/g, to: ' 창작' },
      { from: /허지훈구받아/g, to: ' 도구로 받아' },
      { from: /허지훈이/g, to: '들이' },
      { from: /허지훈허지훈/g, to: '' },
      { from: /허지훈는/g, to: '는' },
      { from: /허지훈경험/g, to: ' 경험' },
      { from: /허지훈었허지훈/g, to: '이었다' },
      { from: /허지훈무한/g, to: ' 무한' },
      { from: /허지훈전/g, to: ' 전' },
      { from: /허지훈강조/g, to: '을 강조' },
      { from: /허지훈체공학/g, to: '인체공학' },
      { from: /허지훈비/g, to: ' 비' },
      { from: /허지훈자허지훈/g, to: '대칭 디자인' },
      { from: /허지훈자/g, to: ' 디자인' },
      { from: /허지훈크/g, to: ' 스크롤' },
      { from: /허지훈마우/g, to: '이 마우스' },
      { from: /허지훈해/g, to: '를 통해' },
      { from: /허지훈실/g, to: ' 실' },
      { from: /허지훈현/g, to: '감을 현' },
      { from: /허지훈라/g, to: '실화하는' },
      { from: /허지훈메시지/g, to: ' 메시지' },
      { from: /허지훈았/g, to: '를 담았' },
      { from: /허지훈/g, to: '' }, // 남은 모든 허지훈 제거
    ];
    
    textReplacements.forEach(({ from, to }) => {
      if (content.match(from)) {
        content = content.replace(from, to);
        modified = true;
      }
    });
    
    // 깨진 문자 패턴 수정
    const brokenCharReplacements = [
      { from: /작작품/g, to: '작품' },
      { from: /품/g, to: '작품' },
      { from: /자/g, to: '디자인' },
      { from: /상/g, to: '상상' },
      { from: /머릿/g, to: '머릿속' },
      { from: /어/g, to: '떠오르는' },
      { from: /창조/g, to: '창조의' },
      { from: /작다/g, to: '작업이다' },
      { from: /실/g, to: '실감' },
      { from: /끄/g, to: '끌어' },
      { from: /끌/g, to: '끌어' },
      { from: /내는/g, to: '내는' },
      { from: /마우/g, to: '마우스를' },
      { from: /창작/g, to: '창작' },
      { from: /도구/g, to: '도구' },
      { from: /로서/g, to: '로서' },
      { from: /바라보다/g, to: '바라보다' },
      { from: /Logitech MX Master 3S주제/g, to: 'Logitech MX Master 3S를 주제로' },
      { from: /'상실끄창작구'/g, to: "'시각적 실감을 끌어내는 창작 도구'" },
      { from: /는 메시지각으낸/g, to: '는 메시지를 담아내어' },
      { from: /마우순무기기어/g, to: '마우스를 단순한 무선 기기로만' },
      { from: /자너창의인/g, to: '디자이너의 창의적인' },
      { from: /업는들게/g, to: '업무를 하는 사람들에게' },
      { from: /의장로용며/g, to: '의 장비로 사용하며' },
      { from: /상실구현내창작구가/g, to: '시각적 실감을 구현해내는 창작 도구가' },
      { from: /다각서 출발다/g, to: '다르게 각인되어 출발했다' },
      { from: /품본질집중/g, to: '작품의 본질에 집중' },
      { from: /는 마우의/g, to: '이번 마우스의' },
      { from: /양기능개기보다/g, to: '다양한 기능을 개선하기보다' },
      { from: /그것리게떤/g, to: '그것의 진리로 어떤' },
      { from: /이지민는지/g, to: '것인지' },
      { from: /고고다/g, to: '고민하고 생각했다' },
      { from: /창의인업는/g, to: '창의적인 업무를 하는' },
      { from: /람에마우는/g, to: '사람들에게 마우스는' },
      { from: /의장로/g, to: '의 장비로' },
      { from: /상실끌내창조작이/g, to: '시각적 실감을 끌어내는 창조적 작업이' },
      { from: /바위루/g, to: '바위 형태' },
      { from: /마우의태상키바위/g, to: '마우스의 형태를 상징하는 바위' },
      { from: /곽라/g, to: '테두리로' },
      { from: /상계가듯/g, to: '시각적 세계가 펼쳐지듯' },
      { from: /쳐진다/g, to: '펼쳐진다' },
      { from: /창작구, 마우/g, to: '창작 도구, 마우스' },
      { from: /쳐지상계/g, to: '펼쳐지는 시각적 세계' },
      { from: /어지많/g, to: '넓어지는' },
      { from: /상과께/g, to: '상상과 함께' },
      { from: /벅찬 감정밀온/g, to: '벅찬 감정이 밀려온다' },
      { from: /무한상계가/g, to: '무한한 시각적 세계가' },
      { from: /실마우로/g, to: '실제 마우스로' },
      { from: /모인 모든/g, to: '모인 모든' },
      { from: /상실끄창작구가 바로 마우임한/g, to: '시각적 실감을 끌어내는 창작 도구가 바로 마우스임을 한' },
      { from: /성AI용/g, to: '생성형 AI 활용' },
      { from: /번업서성AI험으용여/g, to: '이번 작업에서 생성형 AI를 실험적으로 활용하여' },
      { from: /상작율을/g, to: '시각 작업의 효율을' },
      { from: /반복인/g, to: '높이고 반복적인' },
      { from: /스/g, to: '스타일을' },
      { from: /해면출을/g, to: '하여 면면히 출력' },
      { from: /빠르구상었며/g, to: '빠르게 구상했으며' },
      { from: /히 바다같/g, to: '마치 바다와 같은' },
      { from: /연실으현었/g, to: '자연스러운 실감으로 현실화했던' },
      { from: /롬트지성/g, to: '프롬프트로 이미지 생성' },
      { from: /지상성기본인/g, to: '이미지로 상상의 기본적인' },
      { from: /업과정다/g, to: '업무 과정이다' },
      { from: /RUNWAY Cinema 4D만남/g, to: 'RUNWAY와 Cinema 4D의 만남' },
      { from: /도면구현기/g, to: '복잡한 면면을 구현하기' },
      { from: /해먼 C4D서/g, to: '하여 먼저 C4D에서' },
      { from: /카메직임구도간단게/g, to: '카메라 움직임과 구도를 간단하게' },
      { from: /고더며/g, to: '잡고 더 나아가며' },
      { from: /Runway불러다/g, to: '이후 Runway로 불러왔다' },
      { from: /Runway불러C4D뷰포상Stylize 기능용하질감로/g, to: 'Runway로 불러온 C4D 뷰포트 상의 Stylize 기능을 활용하여 질감으로' },
      { from: /변하며/g, to: '변환하여며' },
      { from: /변된상 4K스케링진행다/g, to: '변환된 이미지를 4K로 업스케일링을 진행했다' },
      { from: /양롬트/g, to: '다양한 프롬프트' },
      { from: /일과정반복며/g, to: '매일 과정을 반복하며' },
      { from: /양롬트력여/g, to: '다양한 프롬프트를 입력하여' },
      { from: /많면을/g, to: '많은 면면을' },
      { from: /성었/g, to: '생성했던' },
      { from: /AI번하결과물을/g, to: 'AI의 번번한 결과물을' },
      { from: /기가려데/g, to: '보기가 어려웠는데' },
      { from: /지적구/g, to: '지속적인 연구와' },
      { from: /행착오해/g, to: '시행착오를 통해' },
      { from: /AI나창작구받아이는/g, to: 'AI의 나름 창작 도구로 받아들이는' },
      { from: /경험었/g, to: '경험이었다' },
      { from: /부러무한크/g, to: '부드러운 무한 스크롤' },
      { from: /부럽전는/g, to: '부드럽게 전환되는' },
      { from: /크강조/g, to: '스크롤을 강조' },
      { from: /체공학비자/g, to: '인체공학 비대칭 디자인' },
      { from: /체공학자강조/g, to: '인체공학 디자인을 강조' },
      { from: /가크/g, to: '가로 스크롤' },
      { from: /부럽전는 가강조/g, to: '부드럽게 전환되는 가로를 강조' },
      { from: /목 &lt;Master your Imagination&gt;는/g, to: '작품 <Master your Imagination>은' },
      { from: /마우해/g, to: '이 마우스를 통해' },
      { from: /상을 주도고/g, to: '시각을 주도하고' },
      { from: /그것실현라메시지았/g, to: '실감을 현실화하는 메시지를 담았다' },
    ];
    
    brokenCharReplacements.forEach(({ from, to }) => {
      if (content.match(from)) {
        content = content.replace(from, to);
        modified = true;
      }
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ ${path.basename(filePath)}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// 메인 실행
console.log('허지훈 파일 완전 수정 시작...\n');

const jsxFiles = findJSXFiles(workDetailsPath);
let fixedCount = 0;

jsxFiles.forEach(file => {
  if (fixFileContent(file)) {
    fixedCount++;
  }
});

console.log(`\n완료! ${fixedCount}개 파일이 수정되었습니다.`);

