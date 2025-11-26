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
    
    // 정확한 텍스트 교체
    const replacements = [
      // 주석
      { from: /\*\s*-\s*Master\s*your\s*Imagination\s*\(작품1\)/g, to: '* 허지훈 - Master your Imagination (작품1)' },
      { from: /\*\s*-\s*Eternal\s*Vision\s*\(작품2\)/g, to: '* 허지훈 - Eternal Vision (작품2)' },
      { from: /Figma\s*디자인\s*기반/g, to: 'Figma 디자인 기반' },
      
      // 주요 텍스트
      { from: /'MX Master 3S해\s*신상실감끌어내는\s*메시지를\s*담은시네마틱\s*브랜상\.'/g, to: "'MX Master 3S를 통해 시각적 실감을 끌어내는 메시지를 담은 시네마틱 브랜딩.'" },
      { from: /"상\s*머릿속에<br\s*\/>/g, to: '"상상의 머릿속에<br />' },
      { from: /떠오르는<br\s*\/>/g, to: '떠오르는<br />' },
      { from: /창조의에<br\s*\/>/g, to: '창조의<br />' },
      { from: /작다\."/g, to: '작업이다."' },
      { from: /상실감끌어어\s*창작구/g, to: '시각적 실감을 끌어내는 창작 도구' },
      { from: /마우스\s*창작<br\s*\/>/g, to: '마우스를 창작<br />' },
      { from: /상\s*Logitech MX Master 3S주제/g, to: '이 작품은 Logitech MX Master 3S를 주제로' },
      { from: /'상실감끌어어\s*창작구'/g, to: "'시각적 실감을 끌어내는 창작 도구'" },
      { from: /는\s*메시지를\s*담은각으낸\s*브랜상다/g, to: '는 메시지를 담아내어 브랜딩이다' },
      { from: /마우스\s*순무기기떠오르는/g, to: '마우스를 단순한 무선 기기로만' },
      { from: /디자인너\s*창의인업는들게/g, to: '디자이너의 창의적인 업무를 하는 사람들에게' },
      { from: /의장로용며/g, to: '의 장비로 사용하며' },
      { from: /상실감구현내\s*창작구가/g, to: '시각적 실감을 구현해내는 창작 도구가' },
      { from: /다각서\s*출발다/g, to: '다르게 각인되어 출발했다' },
      { from: /작품의\s*본질에\s*집중/g, to: '작품의 본질에 집중' },
      { from: /는\s*마우스의/g, to: '이번 마우스의' },
      { from: /양기능개기보다/g, to: '다양한 기능을 개선하기보다' },
      { from: /그것리게\s*떤/g, to: '그것의 진리로 어떤' },
      { from: /이지민는지/g, to: '것인지' },
      { from: /고고다/g, to: '고민하고 생각했다' },
      { from: /창의인업는/g, to: '창의적인 업무를 하는' },
      { from: /람에마우스는/g, to: '사람들에게 마우스는' },
      { from: /의장로/g, to: '의 장비로' },
      { from: /상실감끌어내창조의작이/g, to: '시각적 실감을 끌어내는 창조적 작업이' },
      { from: /바위\s*루/g, to: '바위 형태' },
      { from: /마우스의\s*태상키바위/g, to: '마우스의 형태를 상징하는 바위' },
      { from: /곽라/g, to: '테두리로' },
      { from: /상계가\s*듯/g, to: '시각적 세계가 펼쳐지듯' },
      { from: /펼쳐진다/g, to: '펼쳐진다' },
      { from: /창작구,\s*마우스/g, to: '창작 도구, 마우스' },
      { from: /쳐지상계/g, to: '펼쳐지는 시각적 세계' },
      { from: /떠오르는지많/g, to: '넓어지는' },
      { from: /상과\s*께/g, to: '상상과 함께' },
      { from: /벅찬\s*감정밀온/g, to: '벅찬 감정이 밀려온다' },
      { from: /무한상계가/g, to: '무한한 시각적 세계가' },
      { from: /실감이\s*마우스스타일을로/g, to: '실제 마우스로' },
      { from: /모인\s*모든/g, to: '모인 모든' },
      { from: /상실감끌어어\s*창작구가\s*바로\s*마우스임한/g, to: '시각적 실감을 끌어내는 창작 도구가 바로 마우스임을 한' },
      { from: /성AI\s*용/g, to: '생성형 AI 활용' },
      { from: /번\s*업서성AI험으용여/g, to: '이번 작업에서 생성형 AI를 실험적으로 활용하여' },
      { from: /상\s*작율을/g, to: '시각 작업의 효율을' },
      { from: /반복인/g, to: '높이고 반복적인' },
      { from: /스타일을/g, to: '스타일을' },
      { from: /해\s*면출을/g, to: '하여 면면히 출력' },
      { from: /빠르구상었며/g, to: '빠르게 구상했으며' },
      { from: /히\s*바다\s*같/g, to: '마치 바다와 같은' },
      { from: /연실감으현었/g, to: '자연스러운 실감으로 현실화했던' },
      { from: /롬트지\s*성/g, to: '프롬프트로 이미지 생성' },
      { from: /지상\s*성기본인/g, to: '이미지로 상상의 기본적인' },
      { from: /업\s*과정다/g, to: '업무 과정이다' },
      { from: /RUNWAY\s*Cinema\s*4D만남/g, to: 'RUNWAY와 Cinema 4D의 만남' },
      { from: /도면구현기/g, to: '복잡한 면면을 구현하기' },
      { from: /해\s*먼\s*C4D서/g, to: '하여 먼저 C4D에서' },
      { from: /카메직임구도간단게/g, to: '카메라 움직임과 구도를 간단하게' },
      { from: /고더며/g, to: '잡고 더 나아가며' },
      { from: /Runway불러다/g, to: '이후 Runway로 불러왔다' },
      { from: /Runway불러C4DD\s*뷰포상Stylize\s*기능용하\s*질감로/g, to: 'Runway로 불러온 C4D 뷰포트 상의 Stylize 기능을 활용하여 질감으로' },
      { from: /변하며/g, to: '변환하여며' },
      { from: /변된\s*상\s*4K스타일을케링을\s*진행다/g, to: '변환된 이미지를 4K로 업스케일링을 진행했다' },
      { from: /양롬트/g, to: '다양한 프롬프트' },
      { from: /일\s*과정\s*반복며/g, to: '매일 과정을 반복하며' },
      { from: /양롬트력여/g, to: '다양한 프롬프트를 입력하여' },
      { from: /많\s*면을/g, to: '많은 면면을' },
      { from: /성었/g, to: '생성했던' },
      { from: /AI번하\s*결과물을/g, to: 'AI의 번번한 결과물을' },
      { from: /기가\s*려데/g, to: '보기가 어려웠는데' },
      { from: /지적구/g, to: '지속적인 연구와' },
      { from: /행착오해/g, to: '시행착오를 통해' },
      { from: /AI나\s*창작\s*구받아이는/g, to: 'AI의 나름 창작 도구로 받아들이는' },
      { from: /경험었/g, to: '경험이었다' },
      { from: /부러\s*무한\s*크/g, to: '부드러운 무한 스크롤' },
      { from: /부럽전는/g, to: '부드럽게 전환되는' },
      { from: /크을\s*강조/g, to: '스크롤을 강조' },
      { from: /체공학디자인을\s*강조/g, to: '인체공학 디자인을 강조' },
      { from: /가을\s*강조/g, to: '가로를 강조' },
      { from: /목\s*&lt;Master\s*your\s*Imagination&gt;는/g, to: '작품 <Master your Imagination>은' },
      { from: /이\s*마우스스타일을해/g, to: '이 마우스를 통해' },
      { from: /상을\s*주도고/g, to: '시각을 주도하고' },
      { from: /그것실감현라\s*메시지를\s*담은았/g, to: '실감을 현실화하는 메시지를 담았다' },
      
      // 특수문자 제거
      { from: /스타일을를/g, to: '스' },
    ];
    
    replacements.forEach(({ from, to }) => {
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
console.log('허지훈 파일의 깨진 텍스트 최종 수정 시작...\n');

const jsxFiles = findJSXFiles(workDetailsPath);
let fixedCount = 0;

jsxFiles.forEach(file => {
  if (fixFileContent(file)) {
    fixedCount++;
  }
});

console.log(`\n완료! ${fixedCount}개 파일이 수정되었습니다.`);



