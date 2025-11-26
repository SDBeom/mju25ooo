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
    
    // 깨진 텍스트 패턴 수정
    const replacements = [
      // 주석 부분
      { pattern: /\*\s*허지훈\s*-\s*Master\s*your\s*Imagination\s*\(품1\)/g, replacement: '* 허지훈 - Master your Imagination (작품1)' },
      { pattern: /\*\s*허지훈\s*-\s*Eternal\s*Vision\s*\(품2\)/g, replacement: '* 허지훈 - Eternal Vision (작품2)' },
      
      // 일반 패턴
      { pattern: /품/g, replacement: '작품' },
      { pattern: /자허지훈기반/g, replacement: '디자인 기반' },
      { pattern: /자\?기반/g, replacement: '디자인 기반' },
      { pattern: /게임콘텐/g, replacement: '게임콘텐츠' },
      { pattern: /모션자\?/g, replacement: '모션디자인' },
      
      // 허지훈 관련 텍스트
      { pattern: /MX Master 3S허지훈해/g, replacement: 'MX Master 3S를 통해' },
      { pattern: /신허지훈상허지훈실허지훈끌내는/g, replacement: '시각적 실감을 끌어내는' },
      { pattern: /메시지허지훈/g, replacement: '메시지를 담은' },
      { pattern: /네마틱/g, replacement: '시네마틱' },
      { pattern: /브랜허지훈상/g, replacement: '브랜딩' },
      { pattern: /브랜허지훈상\./g, replacement: '브랜딩이다.' },
      
      // 인용구
      { pattern: /"상\s*머릿에<br\s*\/>/g, replacement: '"상상의 머릿속에<br />' },
      { pattern: /어<br\s*\/>/g, replacement: '떠오르는<br />' },
      { pattern: /창조허지훈에<br\s*\/>/g, replacement: '창조의<br />' },
      { pattern: /작다\."/g, replacement: '작업이다."' },
      
      // 제목 및 텍스트
      { pattern: /상허지훈실허지훈끄허지훈창작허지훈구/g, replacement: '시각적 실감을 끌어내는 창작 도구' },
      { pattern: /마우\s*창작<br\s*\/>/g, replacement: '마우스를 창작<br />' },
      { pattern: /허지훈상\s*Logitech MX Master 3S주제/g, replacement: '이 작품은 Logitech MX Master 3S를 주제로' },
      { pattern: /'상허지훈실허지훈끄허지훈창작허지훈구'/g, replacement: "'시각적 실감을 끌어내는 창작 도구'" },
      { pattern: /는\s*메시지허지훈각으허지훈낸/g, replacement: '는 메시지를 담아내어' },
      { pattern: /마우\s*순허지훈무허지훈기기허지훈어/g, replacement: '마우스를 단순한 무선 기기로만' },
      { pattern: /자너\s*허지훈창의인/g, replacement: '디자이너의 창의적인' },
      { pattern: /업허지훈는\s*들게/g, replacement: '업무를 하는 사람들에게' },
      { pattern: /의\s*장로\s*용며/g, replacement: '의 장비로 사용하며' },
      { pattern: /상허지훈실구현내허지훈창작허지훈구가/g, replacement: '시각적 실감을 구현해내는 창작 도구가' },
      { pattern: /다허지훈각서\s*출발다/g, replacement: '다르게 각인되어 출발했다' },
      
      // 카드 제목 및 설명
      { pattern: /품허지훈본질허지훈집중/g, replacement: '작품의 본질에 집중' },
      { pattern: /는\s*마우의/g, replacement: '이번 마우스의' },
      { pattern: /양허지훈기능허지훈개기보다/g, replacement: '다양한 기능을 개선하기보다' },
      { pattern: /그것허지훈리게\s*떤/g, replacement: '그것의 진리로 어떤' },
      { pattern: /이지민는지/g, replacement: '것인지' },
      { pattern: /고허지훈고허지훈다/g, replacement: '고민하고 생각했다' },
      { pattern: /창의인\s*업허지훈는/g, replacement: '창의적인 업무를 하는' },
      { pattern: /람에마우는/g, replacement: '사람들에게 마우스는' },
      { pattern: /의\s*장로허지훈/g, replacement: '의 장비로' },
      { pattern: /상허지훈실허지훈끌내허지훈창조허지훈작이허지훈/g, replacement: '시각적 실감을 끌어내는 창조적 작업이' },
      
      // 바위 관련
      { pattern: /바위\s*루허지훈/g, replacement: '바위 형태' },
      { pattern: /바위\s*루/g, replacement: '바위 형태' },
      { pattern: /마우의\s*태허지훈상키허지훈바위/g, replacement: '마우스의 형태를 상징하는 바위' },
      { pattern: /허지훈곽허지훈라/g, replacement: '테두리로' },
      { pattern: /상허지훈계가\s*허지훈듯/g, replacement: '시각적 세계가 펼쳐지듯' },
      { pattern: /쳐진다/g, replacement: '펼쳐진다' },
      
      // 창작 도구 관련
      { pattern: /창작허지훈구,\s*마우허지훈/g, replacement: '창작 도구, 마우스' },
      { pattern: /창작허지훈구,\s*마우/g, replacement: '창작 도구, 마우스' },
      { pattern: /쳐지허지훈상허지훈계/g, replacement: '펼쳐지는 시각적 세계' },
      { pattern: /어지허지훈많/g, replacement: '넓어지는' },
      { pattern: /상과\s*께/g, replacement: '상상과 함께' },
      { pattern: /벅찬\s*감정허지훈밀온허지훈/g, replacement: '벅찬 감정이 밀려온다' },
      { pattern: /무한허지훈상허지훈계가/g, replacement: '무한한 시각적 세계가' },
      { pattern: /실허지훈마우로/g, replacement: '실제 마우스로' },
      { pattern: /모인\s*모든/g, replacement: '모인 모든' },
      { pattern: /상허지훈실허지훈끄허지훈창작허지훈구가\s*바로\s*마우임허지훈한허지훈/g, replacement: '시각적 실감을 끌어내는 창작 도구가 바로 마우스임을 한' },
      
      // AI 관련
      { pattern: /성허지훈AI\s*용/g, replacement: '생성형 AI 활용' },
      { pattern: /번\s*업서허지훈성허지훈AI허지훈험으허지훈용여/g, replacement: '이번 작업에서 생성형 AI를 실험적으로 활용하여' },
      { pattern: /상\s*작허지훈율을/g, replacement: '시각 작업의 효율을' },
      { pattern: /허지훈\s*반복인/g, replacement: '높이고 반복적인' },
      { pattern: /스/g, replacement: '스타일을' },
      { pattern: /해\s*면허지훈출\s*을/g, replacement: '하여 면면히 출력' },
      { pattern: /빠르구상허지훈었며/g, replacement: '빠르게 구상했으며' },
      { pattern: /히\s*바다\s*같/g, replacement: '마치 바다와 같은' },
      { pattern: /연허지훈실으허지훈현허지훈었허지훈/g, replacement: '자연스러운 실감으로 현실화했던' },
      { pattern: /롬트허지훈지\s*성/g, replacement: '프롬프트로 이미지 생성' },
      { pattern: /지허지훈상\s*성허지훈기본인/g, replacement: '이미지로 상상의 기본적인' },
      { pattern: /업\s*과정다/g, replacement: '업무 과정이다' },
      
      // RUNWAY 관련
      { pattern: /RUNWAY\s*Cinema\s*4D허지훈만남/g, replacement: 'RUNWAY와 Cinema 4D의 만남' },
      { pattern: /도허지훈면허지훈구현기/g, replacement: '복잡한 면면을 구현하기' },
      { pattern: /해\s*먼\s*C4D서/g, replacement: '하여 먼저 C4D에서' },
      { pattern: /카메허지훈직임구도간단게/g, replacement: '카메라 움직임과 구도를 간단하게' },
      { pattern: /고\s*더허지훈며/g, replacement: '잡고 더 나아가며' },
      { pattern: /\s*Runway불러다/g, replacement: '이후 Runway로 불러왔다' },
      { pattern: /Runway불러허지훈C4D허지훈뷰포허지훈상허지훈Stylize\s*기능허지훈용허지훈하허지훈질감로/g, replacement: 'Runway로 불러온 C4D 뷰포트 상의 Stylize 기능을 활용하여 질감으로' },
      { pattern: /변하며/g, replacement: '변환하여며' },
      { pattern: /변된\s*상\s*4K허지훈스케링허지훈진행다/g, replacement: '변환된 이미지를 4K로 업스케일링을 진행했다' },
      
      // 갤러리 관련
      { pattern: /양허지훈롬트/g, replacement: '다양한 프롬프트' },
      { pattern: /일허지훈과정허지훈반복며/g, replacement: '매일 과정을 반복하며' },
      { pattern: /양허지훈롬트허지훈력여/g, replacement: '다양한 프롬프트를 입력하여' },
      { pattern: /많\s*면을/g, replacement: '많은 면면을' },
      { pattern: /성허지훈었허지훈/g, replacement: '생성했던' },
      { pattern: /AI허지훈번허지훈하허지훈결과물을/g, replacement: 'AI의 번번한 결과물을' },
      { pattern: /기가\s*려데/g, replacement: '보기가 어려웠는데' },
      { pattern: /지적허지훈구/g, replacement: '지속적인 연구와' },
      { pattern: /행착오허지훈해/g, replacement: '시행착오를 통해' },
      { pattern: /AI허지훈나허지훈창작\s*구받아이허지훈허지훈는/g, replacement: 'AI의 나름 창작 도구로 받아들이는' },
      { pattern: /경험었허지훈/g, replacement: '경험이었다' },
      
      // 카드 관련
      { pattern: /부러허지훈무한\s*크/g, replacement: '부드러운 무한 스크롤' },
      { pattern: /부럽허지훈전는/g, replacement: '부드럽게 전환되는' },
      { pattern: /크허지훈강조/g, replacement: '스크롤을 강조' },
      { pattern: /체공학허지훈비허지훈자허지훈/g, replacement: '인체공학 비대칭 디자인' },
      { pattern: /체공학허지훈자허지훈강조/g, replacement: '인체공학 디자인을 강조' },
      { pattern: /가허지훈크허지훈/g, replacement: '가로 스크롤' },
      { pattern: /가허지훈크/g, replacement: '가로 스크롤' },
      { pattern: /부럽허지훈전는\s*가허지훈강조/g, replacement: '부드럽게 전환되는 가로를 강조' },
      
      // 마지막 문장
      { pattern: /목\s*&lt;Master\s*your\s*Imagination&gt;는/g, replacement: '작품 <Master your Imagination>은' },
      { pattern: /허지훈마우\s*해/g, replacement: '이 마우스를 통해' },
      { pattern: /상을\s*주도고/g, replacement: '시각을 주도하고' },
      { pattern: /그것허지훈실허지훈현라허지훈메시지허지훈았허지훈/g, replacement: '실감을 현실화하는 메시지를 담았다' },
      
      // 깨진 문자 제거
      { pattern: /허지훈허지훈/g, replacement: '허지훈' },
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
console.log('모든 파일의 깨진 한글 텍스트 수정 시작...\n');

const jsxFiles = findJSXFiles(workDetailsPath);
let fixedCount = 0;

jsxFiles.forEach(file => {
  if (fixFileContent(file)) {
    fixedCount++;
  }
});

console.log(`\n완료! ${fixedCount}개 파일이 수정되었습니다.`);
