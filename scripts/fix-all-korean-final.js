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
    
    // import 경로 복구 (허지훈 파일)
    if (filePath.includes('HeoJihoon')) {
      content = content.replace(/assets\/\/_모션디디자인인_작작품/g, 'assets/허지훈/허지훈_모션디자인_작품');
      if (content.includes('assets//_모션디디자인인_작작품')) {
        modified = true;
      }
    }
    
    // 깨진 텍스트 패턴 수정
    const replacements = [
      // 주석 부분
      { pattern: /\*\s*-\s*Master\s*your\s*Imagination\s*\(작작품1\)/g, replacement: '* 허지훈 - Master your Imagination (작품1)' },
      { pattern: /\*\s*-\s*Eternal\s*Vision\s*\(작작품2\)/g, replacement: '* 허지훈 - Eternal Vision (작품2)' },
      { pattern: /\*\s*-\s*The\s*Gothic\s*\(작품1\)/g, replacement: '* 정지민 - The Gothic (작품1)' },
      { pattern: /\*\s*-\s*The\s*Weapon\s*\(작품2\)/g, replacement: '* 정지민 - The Weapon (작품2)' },
      { pattern: /\*\s*-\s*RAVEN-X\s*\(작품1\)/g, replacement: '* 서린 - RAVEN-X (작품1)' },
      { pattern: /\*\s*-\s*KARON\s*\(작품2\)/g, replacement: '* 서린 - KARON (작품2)' },
      { pattern: /\*\s*조하늘\s*-\s*\(작품1\)/g, replacement: '* 조하늘 - Youth Dream (작품1)' },
      { pattern: /\*\s*조하늘\s*-\s*The\s*Reason\s*that\s*I\s*Live\s*\(작품2\)/g, replacement: '* 조하늘 - The Reason that I Live (작품2)' },
      
      // Figma 관련
      { pattern: /Figma\s*디디자인인\s*기반/g, replacement: 'Figma 디자인 기반' },
      { pattern: /Figma\s*디자인\s*기반/g, replacement: 'Figma 디자인 기반' },
      
      // 일반 패턴
      { pattern: /작작품/g, replacement: '작품' },
      { pattern: /디디자인인/g, replacement: '디자인' },
      
      // 허지훈 관련 텍스트
      { pattern: /MX Master 3S해/g, replacement: 'MX Master 3S를 통해' },
      { pattern: /신상상실감끌어내는/g, replacement: '시각적 실감을 끌어내는' },
      { pattern: /메시지/g, replacement: '메시지를 담은' },
      { pattern: /시네마틱/g, replacement: '시네마틱' },
      { pattern: /브랜상상/g, replacement: '브랜딩' },
      { pattern: /브랜상상\./g, replacement: '브랜딩이다.' },
      
      // 인용구
      { pattern: /"상상\s*머릿속에<br\s*\/>/g, replacement: '"상상의 머릿속에<br />' },
      { pattern: /떠오르는<br\s*\/>/g, replacement: '떠오르는<br />' },
      { pattern: /창조의에<br\s*\/>/g, replacement: '창조의<br />' },
      { pattern: /작다\."/g, replacement: '작업이다."' },
      
      // 제목 및 텍스트
      { pattern: /상상실감끌어어\s*창작구/g, replacement: '시각적 실감을 끌어내는 창작 도구' },
      { pattern: /마우스타일을를\s*창작<br\s*\/>/g, replacement: '마우스를 창작<br />' },
      { pattern: /상상\s*Logitech MX Master 3S주제/g, replacement: '이 작품은 Logitech MX Master 3S를 주제로' },
      { pattern: /'상상실감끌어어\s*창작구'/g, replacement: "'시각적 실감을 끌어내는 창작 도구'" },
      { pattern: /는\s*메시지각으낸/g, replacement: '는 메시지를 담아내어' },
      { pattern: /마우스타일을를\s*순무기기떠오르는/g, replacement: '마우스를 단순한 무선 기기로만' },
      { pattern: /디자인너\s*창의인/g, replacement: '디자이너의 창의적인' },
      { pattern: /업는\s*들게/g, replacement: '업무를 하는 사람들에게' },
      { pattern: /의\s*장로\s*용며/g, replacement: '의 장비로 사용하며' },
      { pattern: /상상실감구현내\s*창작구가/g, replacement: '시각적 실감을 구현해내는 창작 도구가' },
      { pattern: /다각서\s*출발다/g, replacement: '다르게 각인되어 출발했다' },
      
      // 카드 제목 및 설명
      { pattern: /작작품의\s*본질에\s*집중/g, replacement: '작품의 본질에 집중' },
      { pattern: /는\s*마우스타일을를의/g, replacement: '이번 마우스의' },
      { pattern: /양기능개기보다/g, replacement: '다양한 기능을 개선하기보다' },
      { pattern: /그것리게\s*떤/g, replacement: '그것의 진리로 어떤' },
      { pattern: /이지민는지/g, replacement: '것인지' },
      { pattern: /고고다/g, replacement: '고민하고 생각했다' },
      { pattern: /창의인\s*업는/g, replacement: '창의적인 업무를 하는' },
      { pattern: /람에마우스타일을를는/g, replacement: '사람들에게 마우스는' },
      { pattern: /의\s*장로/g, replacement: '의 장비로' },
      { pattern: /상상실감끌어내창조의작이/g, replacement: '시각적 실감을 끌어내는 창조적 작업이' },
      
      // 바위 관련
      { pattern: /바위\s*루/g, replacement: '바위 형태' },
      { pattern: /마우스타일을를의\s*태상상키바위/g, replacement: '마우스의 형태를 상징하는 바위' },
      { pattern: /곽라/g, replacement: '테두리로' },
      { pattern: /상상계가\s*듯/g, replacement: '시각적 세계가 펼쳐지듯' },
      { pattern: /펼펼쳐진다/g, replacement: '펼쳐진다' },
      
      // 창작 도구 관련
      { pattern: /창작구,\s*마우/g, replacement: '창작 도구, 마우스' },
      { pattern: /쳐지상상계/g, replacement: '펼쳐지는 시각적 세계' },
      { pattern: /떠오르는지많/g, replacement: '넓어지는' },
      { pattern: /상상과\s*께/g, replacement: '상상과 함께' },
      { pattern: /벅찬\s*감정밀온/g, replacement: '벅찬 감정이 밀려온다' },
      { pattern: /무한상상계가/g, replacement: '무한한 시각적 세계가' },
      { pattern: /실감이\s*마우스타일을를스타일을로/g, replacement: '실제 마우스로' },
      { pattern: /모인\s*모든/g, replacement: '모인 모든' },
      { pattern: /상상실감끌어어\s*창작구가\s*바로\s*마우스타일을를임한/g, replacement: '시각적 실감을 끌어내는 창작 도구가 바로 마우스임을 한' },
      
      // AI 관련
      { pattern: /성AI\s*용/g, replacement: '생성형 AI 활용' },
      { pattern: /번\s*업서성AI험으용여/g, replacement: '이번 작업에서 생성형 AI를 실험적으로 활용하여' },
      { pattern: /상상\s*작율을/g, replacement: '시각 작업의 효율을' },
      { pattern: /반복인/g, replacement: '높이고 반복적인' },
      { pattern: /스타일을타일을/g, replacement: '스타일을' },
      { pattern: /해\s*면출을/g, replacement: '하여 면면히 출력' },
      { pattern: /빠르구상상었며/g, replacement: '빠르게 구상했으며' },
      { pattern: /히\s*바다\s*같/g, replacement: '마치 바다와 같은' },
      { pattern: /연실감으현었/g, replacement: '자연스러운 실감으로 현실화했던' },
      { pattern: /롬트지\s*성/g, replacement: '프롬프트로 이미지 생성' },
      { pattern: /지상상\s*성기본인/g, replacement: '이미지로 상상의 기본적인' },
      { pattern: /업\s*과정다/g, replacement: '업무 과정이다' },
      
      // RUNWAY 관련
      { pattern: /RUNWAY\s*Cinema\s*4D만남/g, replacement: 'RUNWAY와 Cinema 4D의 만남' },
      { pattern: /도면구현기/g, replacement: '복잡한 면면을 구현하기' },
      { pattern: /해\s*먼\s*C4D서/g, replacement: '하여 먼저 C4D에서' },
      { pattern: /카메직임구도간단게/g, replacement: '카메라 움직임과 구도를 간단하게' },
      { pattern: /고더며/g, replacement: '잡고 더 나아가며' },
      { pattern: /Runway불러다/g, replacement: '이후 Runway로 불러왔다' },
      { pattern: /Runway불러C4DD\s*뷰포상상Stylize\s*기능용하\s*질감로/g, replacement: 'Runway로 불러온 C4D 뷰포트 상의 Stylize 기능을 활용하여 질감으로' },
      { pattern: /변하며/g, replacement: '변환하여며' },
      { pattern: /변된\s*상상\s*4K스타일을타일을케링을\s*진행다/g, replacement: '변환된 이미지를 4K로 업스케일링을 진행했다' },
      
      // 갤러리 관련
      { pattern: /양롬트/g, replacement: '다양한 프롬프트' },
      { pattern: /일과정반복며/g, replacement: '매일 과정을 반복하며' },
      { pattern: /양롬트력여/g, replacement: '다양한 프롬프트를 입력하여' },
      { pattern: /많\s*면을/g, replacement: '많은 면면을' },
      { pattern: /성었/g, replacement: '생성했던' },
      { pattern: /AI번하결과물을/g, replacement: 'AI의 번번한 결과물을' },
      { pattern: /기가\s*려데/g, replacement: '보기가 어려웠는데' },
      { pattern: /지적구/g, replacement: '지속적인 연구와' },
      { pattern: /행착오해/g, replacement: '시행착오를 통해' },
      { pattern: /AI나창작\s*구받아이는/g, replacement: 'AI의 나름 창작 도구로 받아들이는' },
      { pattern: /경험었/g, replacement: '경험이었다' },
      
      // 카드 관련
      { pattern: /부러무한\s*크/g, replacement: '부드러운 무한 스크롤' },
      { pattern: /부럽전는/g, replacement: '부드럽게 전환되는' },
      { pattern: /크강조/g, replacement: '스크롤을 강조' },
      { pattern: /체공학\s*비디자인/g, replacement: '인체공학 비대칭 디자인' },
      { pattern: /체공학디자인을\s*강조/g, replacement: '인체공학 디자인을 강조' },
      { pattern: /가크/g, replacement: '가로 스크롤' },
      { pattern: /부럽전는\s*가강조/g, replacement: '부드럽게 전환되는 가로를 강조' },
      
      // 마지막 문장
      { pattern: /목\s*&lt;Master\s*your\s*Imagination&gt;는/g, replacement: '작품 <Master your Imagination>은' },
      { pattern: /이\s*마우스타일을를스타일을해/g, replacement: '이 마우스를 통해' },
      { pattern: /상상을\s*주도고/g, replacement: '시각을 주도하고' },
      { pattern: /그것실감현라\s*메시지았/g, replacement: '실감을 현실화하는 메시지를 담았다' },
      
      // 깨진 문자 제거
      { pattern: /스타일을를/g, replacement: '스' },
      { pattern: /상상/g, replacement: '상' },
    ];
    
    replacements.forEach(({ pattern, replacement }) => {
      try {
        if (content.match(pattern)) {
          content = content.replace(pattern, replacement);
          modified = true;
        }
      } catch (e) {
        // 정규식 오류 무시
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
console.log('모든 파일의 깨진 한글 텍스트 최종 수정 시작...\n');

const jsxFiles = findJSXFiles(workDetailsPath);
let fixedCount = 0;

jsxFiles.forEach(file => {
  if (fixFileContent(file)) {
    fixedCount++;
  }
});

console.log(`\n완료! ${fixedCount}개 파일이 수정되었습니다.`);

