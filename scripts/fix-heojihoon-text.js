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
    
    // 허지훈 파일 전용 텍스트 수정
    const replacements = [
      // 주석 부분
      { pattern: /\*\s*\?{2,4}허지훈\s*-\s*/g, replacement: '* 허지훈 - ' },
      { pattern: /\*\s*허지훈\s*-\s*Master your Imagination\s*\(\?품1\)/g, replacement: '* 허지훈 - Master your Imagination (작품1)' },
      { pattern: /\*\s*허지훈\s*-\s*Eternal Vision\s*\(\?품2\)/g, replacement: '* 허지훈 - Eternal Vision (작품2)' },
      { pattern: /Figma\s*\?자허지훈기반/g, replacement: 'Figma 디자인 기반' },
      { pattern: /Figma\s*\?자\?기반/g, replacement: 'Figma 디자인 기반' },
      
      // 일반 텍스트
      { pattern: /MX Master 3S허지훈해\s*\?신허지훈상허지훈실허지훈끌\?내\?는\s*메시지허지훈\?\s*\?네마틱\s*브랜허지훈상/g, replacement: 'MX Master 3S를 통해 시각적 실감을 끌어내는 메시지를 담은 시네마틱 브랜딩' },
      { pattern: /\?신허지훈상허지훈실허지훈끌\?내\?는/g, replacement: '시각적 실감을 끌어내는' },
      { pattern: /\?네마틱/g, replacement: '시네마틱' },
      { pattern: /브랜허지훈상/g, replacement: '브랜딩' },
      { pattern: /브랜허지훈상\?/g, replacement: '브랜딩' },
      
      // 인용구
      { pattern: /"\?상\?\s*머릿\?에허지훈어\?\?\?<br\s*\/>\s*창조허지훈\?에허지훈작\?다\."/g, replacement: '"상상의 머릿속에 떠오르는<br />창조의 작업이다."' },
      { pattern: /\?상\?\s*머릿\?에/g, replacement: '상상의 머릿속에' },
      { pattern: /창조허지훈\?에/g, replacement: '창조의' },
      { pattern: /\?작\?다/g, replacement: '작업이다' },
      
      // 제목 및 텍스트
      { pattern: /\?상허지훈실허지훈끄허지훈창작허지훈구/g, replacement: '시각적 실감을 끌어내는 창작 도구' },
      { pattern: /마우\??\s*창작허지훈구로서/g, replacement: '마우스를 창작 도구로서' },
      { pattern: /허지훈상\?/g, replacement: '이 작품은' },
      { pattern: /Logitech\s*MX\s*Master\s*3S\?주제\?/g, replacement: 'Logitech MX Master 3S를 주제로' },
      { pattern: /'?상허지훈실허지훈끄허지훈창작허지훈구'/g, replacement: "'시각적 실감을 끌어내는 창작 도구'" },
      { pattern: /\?는\s*메시지허지훈각\?으허지훈\?낸/g, replacement: '는 메시지를 담아내어' },
      { pattern: /마우\??\s*\?순허지훈무허지훈기기허지훈어/g, replacement: '마우스를 단순한 무선 기기로만' },
      { pattern: /\?자\?너\s*허지훈창의\?인/g, replacement: '디자이너의 창의적인' },
      { pattern: /\?업허지훈는\s*\?들\?게/g, replacement: '업무를 하는 사람들에게' },
      { pattern: /\?의\s*\?장\?로\s*\?용\?며/g, replacement: '의 장비로 사용하며' },
      { pattern: /\?상허지훈실\?구현\?내허지훈창작허지훈구가/g, replacement: '시각적 실감을 구현해내는 창작 도구가' },
      { pattern: /\?다허지훈각\?서\s*출발\?다/g, replacement: '다르게 각인되어 출발했다' },
      
      // 카드 제목 및 설명
      { pattern: /\?품허지훈본질허지훈집중/g, replacement: '작품의 본질에 집중' },
      { pattern: /\?는\s*마우\?의/g, replacement: '이번 마우스의' },
      { pattern: /\?양허지훈기능허지훈개\?기보다/g, replacement: '다양한 기능을 개선하기보다' },
      { pattern: /\?리\?게\s*\?떤/g, replacement: '진리로 어떤' },
      { pattern: /\?\?이지민는지/g, replacement: '것인지' },
      { pattern: /고허지훈고허지훈다/g, replacement: '고민하고 생각했다' },
      { pattern: /창의\?인\s*\?업허지훈는/g, replacement: '창의적인 업무를 하는' },
      { pattern: /\?람\?에\?마우\?는/g, replacement: '사람들에게 마우스는' },
      { pattern: /\?의\s*\?장\?로허지훈/g, replacement: '의 장비로' },
      { pattern: /\?상허지훈실허지훈끌\?내허지훈창조허지훈작\?이허지훈/g, replacement: '시각적 실감을 끌어내는 창조적 작업이' },
      
      // 바위 관련
      { pattern: /바위\s*\?루/g, replacement: '바위 형태' },
      { pattern: /마우\?의\s*\?태허지훈상\?키허지훈바위/g, replacement: '마우스의 형태를 상징하는 바위' },
      { pattern: /허지훈곽허지훈라/g, replacement: '테두리로' },
      { pattern: /\?상허지훈계가\s*허지훈\?듯/g, replacement: '시각적 세계가 펼쳐지듯' },
      { pattern: /\?쳐진다/g, replacement: '펼쳐진다' },
      
      // 창작 도구 관련
      { pattern: /창작허지훈구,\s*마우허지훈/g, replacement: '창작 도구, 마우스' },
      { pattern: /\?쳐지허지훈상허지훈계/g, replacement: '펼쳐지는 시각적 세계' },
      { pattern: /\?어지허지훈많\?/g, replacement: '넓어지는' },
      { pattern: /\?상\?과\s*\?께/g, replacement: '상상과 함께' },
      { pattern: /벅찬\s*감정허지훈밀\?온허지훈/g, replacement: '벅찬 감정이 밀려온다' },
      { pattern: /무한허지훈상허지훈계가/g, replacement: '무한한 시각적 세계가' },
      { pattern: /\?실허지훈마우\?로/g, replacement: '실제 마우스로' },
      { pattern: /모인허지훈\s*모든/g, replacement: '모인 모든' },
      { pattern: /\?상허지훈실허지훈끄허지훈창작허지훈구가\s*바로\s*마우\?임허지훈한허지훈/g, replacement: '시각적 실감을 끌어내는 창작 도구가 바로 마우스임을 한' },
      
      // AI 관련
      { pattern: /\?성허지훈AI\s*\?용/g, replacement: '생성형 AI 활용' },
      { pattern: /\?번\s*\?업\?서허지훈성허지훈AI허지훈험\?으허지훈용\?여/g, replacement: '이번 작업에서 생성형 AI를 실험적으로 활용하여' },
      { pattern: /\?상\s*\?작허지훈율\?을/g, replacement: '시각 작업의 효율을' },
      { pattern: /\?허지훈\s*반복\?인/g, replacement: '높이고 반복적인' },
      { pattern: /\?스\?\?/g, replacement: '스타일을' },
      { pattern: /\?해\s*\?면허지훈출/g, replacement: '하여 면면히 출력' },
      { pattern: /빠르\?구상허지훈\?었\?며/g, replacement: '빠르게 구상했으며' },
      { pattern: /\?히\s*바다\?\s*같\?/g, replacement: '마치 바다와 같은' },
      { pattern: /\?연허지훈실\?으허지훈현허지훈\?었허지훈/g, replacement: '자연스러운 실감으로 현실화했던' },
      { pattern: /\?롬\?트허지훈\?지\s*\?성/g, replacement: '프롬프트로 이미지 생성' },
      { pattern: /\?\?지허지훈상\s*\?성허지훈기본\?인/g, replacement: '이미지로 상상의 기본적인' },
      { pattern: /\?업\s*과정\?다/g, replacement: '업무 과정이다' },
      
      // RUNWAY 관련
      { pattern: /RUNWAY\?\s*Cinema\s*4D허지훈만남/g, replacement: 'RUNWAY와 Cinema 4D의 만남' },
      { pattern: /\?도\?\?허지훈면허지훈구현\?기/g, replacement: '복잡한 면면을 구현하기' },
      { pattern: /\?해\s*먼\?\s*C4D\?서/g, replacement: '하여 먼저 C4D에서' },
      { pattern: /카메허지훈직임\?구도\?간단\?게/g, replacement: '카메라 움직임과 구도를 간단하게' },
      { pattern: /\?고\s*\?더\?허지훈며/g, replacement: '잡고 더 나아가며' },
      { pattern: /\?\?\s*Runway\?불러\?다/g, replacement: '이후 Runway로 불러왔다' },
      { pattern: /Runway\?불러허지훈C4D허지훈뷰포허지훈상허지훈Stylize\s*기능허지훈용허지훈하허지훈질감\?로/g, replacement: 'Runway로 불러온 C4D 뷰포트 상의 Stylize 기능을 활용하여 질감으로' },
      { pattern: /변\?하\?\?며/g, replacement: '변환하여며' },
      { pattern: /변\?된\s*\?상\?\s*4K허지훈스케\?링허지훈진행\?다/g, replacement: '변환된 이미지를 4K로 업스케일링을 진행했다' },
      
      // 갤러리 관련
      { pattern: /\?양허지훈롬\?트/g, replacement: '다양한 프롬프트' },
      { pattern: /\?일허지훈과정허지훈반복\?며/g, replacement: '매일 과정을 반복하며' },
      { pattern: /\?양허지훈롬\?트허지훈력\?여/g, replacement: '다양한 프롬프트를 입력하여' },
      { pattern: /\?많\?\s*\?면\?을/g, replacement: '많은 면면을' },
      { pattern: /\?성허지훈\?었허지훈/g, replacement: '생성했던' },
      { pattern: /AI허지훈번허지훈하허지훈결과물을/g, replacement: 'AI의 번번한 결과물을' },
      { pattern: /\?기가\s*\?려\?데/g, replacement: '보기가 어려웠는데' },
      { pattern: /지\?적허지훈구\?/g, replacement: '지속적인 연구와' },
      { pattern: /\?행착오허지훈해/g, replacement: '시행착오를 통해' },
      { pattern: /AI허지훈나허지훈창작/g, replacement: 'AI의 나름 창작' },
      { pattern: /\?구\?받아\?이허지훈허지훈는/g, replacement: '도구로 받아들이는' },
      { pattern: /경험\?었허지훈/g, replacement: '경험이었다' },
      
      // 카드 관련
      { pattern: /부\?러허지훈무한\s*\?크\?/g, replacement: '부드러운 무한 스크롤' },
      { pattern: /부\?럽허지훈전\?는/g, replacement: '부드럽게 전환되는' },
      { pattern: /\?크허지훈강조/g, replacement: '스크롤을 강조' },
      { pattern: /\?체공학허지훈비\?허지훈자허지훈/g, replacement: '인체공학 비대칭 디자인' },
      { pattern: /\?체공학허지훈자허지훈강조/g, replacement: '인체공학 디자인을 강조' },
      { pattern: /가허지훈크허지훈/g, replacement: '가로 스크롤' },
      { pattern: /부\?럽허지훈전\?는\s*가허지훈강조/g, replacement: '부드럽게 전환되는 가로를 강조' },
      
      // 마지막 문장
      { pattern: /\?목\s*&lt;Master\s*your\s*Imagination&gt;\?는/g, replacement: '작품 <Master your Imagination>은' },
      { pattern: /허지훈마우\??\s*\?해/g, replacement: '이 마우스를 통해' },
      { pattern: /\?상\?을\s*주도\?고/g, replacement: '시각을 주도하고' },
      { pattern: /\?실허지훈현\?라허지훈메시지허지훈았허지훈/g, replacement: '실감을 현실화하는 메시지를 담았다' },
      
      // Eternal Vision 관련
      { pattern: /\?허지훈동차의/g, replacement: '현대 자동차의' },
      { pattern: /\?징허지훈모델/g, replacement: '상징적인 모델' },
      { pattern: /'?니\s*쿠페'허지훈산허지훈\?/g, replacement: "'포니 쿠페'를 상징하는" },
      { pattern: /계승허지훈'N74'허지훈생허지훈감각\?으허지훈\?/g, replacement: "계승한 'N74'의 생생한 감각으로" },
      { pattern: /\?원허지훈비전/g, replacement: '영원한 비전' },
      { pattern: /\?니\s*쿠페허지훈산/g, replacement: '포니 쿠페를 상징' },
      { pattern: /\?니가\s*지허지훈직선허지훈자허지훈어\?/g, replacement: '포니가 지닌 직선의 디자인으로' },
      { pattern: /미래허지훈공간허지훈교차\?며/g, replacement: '미래의 공간이 교차하며' },
      { pattern: /과거허지훈징허지훈로허지훈태허지훈살\?나허지훈간허지훈았허지훈/g, replacement: '과거의 상징을 로 형태로 살아나 시간을 가졌던' },
      { pattern: /\?두허지훈미허지훈공간허지훈벗어허지훈밝\?/g, replacement: '어두운 미래의 공간을 벗어나 밝은' },
      { pattern: /\?계\?질주\?는/g, replacement: '세계로 질주하는' },
      { pattern: /\?면\?\s*\?리\?\?가/g, replacement: '면면이 진리로' },
      { pattern: /미래허지훈비전\?로/g, replacement: '미래의 비전으로' },
      { pattern: /\?장\?는\s*가\?성허지훈징\?다/g, replacement: '장착하는 가능성을 상징한다' },
      { pattern: /N\s*Vision\s*74허지훈펙허지훈직접\?으허지훈러\?기보다/g, replacement: 'N Vision 74의 컨셉을 직접적으로 다루기보다' },
      { pattern: /\?니\s*쿠페허지훈자\?과/g, replacement: '포니 쿠페의 디자인과' },
      { pattern: /\?신허지훈계승허지훈브랜허지훈철학허지훈집중\?다/g, replacement: '새로운 계승의 브랜드 철학에 집중했다' },
      { pattern: /\?상허지훈분위기\?\s*\?출\?/g, replacement: '시각적 분위기를 출발' },
      { pattern: /\?화\s*&lt;블레\?드\s*\?너\s*2049&gt;\?서/g, replacement: '영화 <블레이드 러너 2049>에서' },
      { pattern: /\?감허지훈받았허지훈/g, replacement: '영감을 받았다' },
      { pattern: /\?른\s*\?늘허지훈원/g, replacement: '푸른 하늘의 원' },
      { pattern: /극적허지훈상\s*반전허지훈해/g, replacement: '극적인 시각 반전을 통해' },
      { pattern: /\?상허지훈분위기\?\s*\?환\?며/g, replacement: '시각적 분위기를 전환하며' },
      { pattern: /감정허지훈름허지훈욱\s*극허지훈하고자/g, replacement: '감정의 흐름을 더욱 극대화하고자' },
      { pattern: /\?히\s*차허지훈블루\s*\?의/g, replacement: '마치 차가운 블루의' },
      { pattern: /\?원허지훈배경\?로/g, replacement: '원의 배경으로' },
      { pattern: /\?유\?\s*질주\?는/g, replacement: '유유히 질주하는' },
      { pattern: /\?면\?\s*\?전까허지훈긴장감과/g, replacement: '면면이 전까지의 긴장감과' },
      { pattern: /\?비되허지훈방감과\s*허지훈\?을/g, replacement: '대비되는 안방감과 여유를' },
      { pattern: /\?시허지훈달\?다/g, replacement: '시각적으로 달성했다' },
      { pattern: /Pyro허지훈용\?여/g, replacement: 'Pyro를 활용하여' },
      { pattern: /바퀴에허지훈날리는/g, replacement: '바퀴에서 날리는' },
      { pattern: /허지훈자허지훈현\?으\?/g, replacement: '이 자체를 현실화하여' },
      { pattern: /\?늘\?서\s*\?리허지훈\?/g, replacement: '하늘에서 떨어지는' },
      { pattern: /\?보\?으\?추허지훈다/g, replacement: '보이는 것을 추적했다' },
      { pattern: /\?목\s*&lt;Eternal\s*Vision&gt;\?는/g, replacement: '작품 <Eternal Vision>은' },
      { pattern: /\?의\s*비전허지훈원허지훈빛나\?바라허지훈망허지훈았허지훈/g, replacement: '영원한 비전의 원을 빛나게 바라보는 희망을 담았다' },
    ];
    
    replacements.forEach(({ pattern, replacement }) => {
      if (content.match(pattern)) {
        content = content.replace(pattern, replacement);
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
console.log('허지훈 파일 텍스트 수정 시작...\n');

const jsxFiles = findJSXFiles(workDetailsPath);
let fixedCount = 0;

jsxFiles.forEach(file => {
  if (fixFileContent(file)) {
    fixedCount++;
  }
});

console.log(`\n완료! ${fixedCount}개 파일이 수정되었습니다.`);

