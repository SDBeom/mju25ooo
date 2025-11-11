import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { WORK_THUMBNAILS } from '../../data/workThumbsData.js';
import resolveThumbSrc from '../../utils/resolveThumbSrc.js';
import './Works.css';

const GALLERY_COLORS = ['#67C5FF', '#FF7700'];

const WORKS_LIST = [
  {
    id: 'linked',
    title: 'Linked',
    designer: '심성빈',
    genre: '영상 콘텐츠 디자인',
    description: '≪Linked≫는 하나의 점에서 시작해 관계라는 선을 만들고, 그 연결이 구조와 공동체로 확장되는 과정을 구현한 FX 아트워크입니다. 서로 다른 존재들이 연결되어 만들어내는 공동체의 아름다움과 우리가 모두 관계 속에 연결된 존재임을 느낄 수 있습니다.'
  },
  {
    id: 'boom',
    title: 'BOOM',
    designer: '심성빈',
    genre: '영상 콘텐츠 디자인',
    description: '≪BOOM≫은 반복되는 일상과 과로에서 벗어나고자 하는 욕망을 폭발이라는 시각적 장치로 표현한 작품입니다. 리드미컬하게 파괴되는 장면을 통해 현대 사회가 개인에게 가하는 압박과, 그로부터의 해방이 주는 카타르시스를 동시에 경험할 수 있습니다.'
  },
  {
    id: 'go-fetch',
    title: 'Go Fetch!',
    designer: '김재은',
    genre: '영상 콘텐츠 디자인',
    description: "강아지 '누리'는 주인 '라온'과의 공놀이 순간을 가장 좋아합니다. 신비롭고 위험천만한 우주에서도 누리는 공을 물고 달리며 다시 만날 수 있다는 믿음을 품습니다. 공은 단순한 놀이 도구가 아니라 추억의 매개체이자 희망의 상징입니다."
  },
  {
    id: 'petrichor',
    title: 'PETRICHOR',
    designer: '김재은',
    genre: '영상 콘텐츠 디자인',
    description: '한때 푸르렀던 행성은 모래에 잠겼고, 생명의 흔적은 바람 속 먼지처럼 흩어졌습니다. 여행자는 모래 위에서 피어난 한 송이 꽃을 발견하고, 비 내린 뒤의 흙냄새를 뜻하는 페트리코르의 향기를 따라 유토피아를 향해 나아갑니다.'
  },
  {
    id: 'gothic-armor',
    title: '더 고딕',
    designer: '정지민',
    genre: '게임 콘텐츠 디자인',
    description: '고딕풍 갑옷과 문양을 실제 고증을 바탕으로 재구성하고, 낡았지만 아름다운 질감을 표현한 작품입니다. 전장을 누비던 흔적과 승리를 향한 의지를 고딕 양식의 디테일과 판타지 감성으로 담아냈습니다.'
  },
  {
    id: 'the-weapon',
    title: '더 웨폰',
    designer: '정지민',
    genre: '게임 콘텐츠 디자인',
    description: '고딕양식의 무기에 다양한 문양과 사용감을 더해 현실성을 높였습니다. 피가 튄 흔적과 섬세한 디테일을 통해 생생한 몰입감을 주며, 실제 사람이 사용할 수 있는 크기로 모델링되었습니다.'
  },
  {
    id: 'abyss-racing',
    title: 'Abyss Racing: 세이렌의 보물',
    designer: '이가비',
    genre: '게임 콘텐츠 디자인',
    description: "<카트라이더: 드리프트> 신규 캐릭터 세이렌의 등장! 다오와 배찌가 수중신전에서 레전드 컵을 되찾기 위해 펼치는 치열한 레이싱을 수중도시 테마로 구현했습니다."
  },
  {
    id: 'overcooked-cafe',
    title: 'Overcooked: 카페대소동',
    designer: '이가비',
    genre: '게임 콘텐츠 디자인',
    description: '한 번 망한 요리사들이 카페에서 다시 도전하며 벌어지는 좌충우돌 이야기를 담았습니다. 유쾌한 스토리와 생동감 넘치는 연출로 Overcooked 특유의 협동 플레이 감성을 살렸습니다.'
  },
  {
    id: 'dolor-saga',
    title: '돌로르사가 (Dolor Saga)',
    designer: '전기태',
    genre: '게임 콘텐츠 디자인',
    description: "돌로르(Dolor)는 라틴어로 '고통'을 의미합니다. 용족과 전사들의 처절한 전쟁을 다룬 설정집으로, 다양한 종족과 세계관이 촘촘히 엮여 작품의 깊이를 더합니다."
  },
  {
    id: 'war-orb',
    title: '워오브 (War Orb)',
    designer: '전기태',
    genre: '게임 콘텐츠 디자인',
    description: '빛나는 오브를 둘러싼 선과 악의 대립을 게임 영상으로 구성했습니다. 오브를 중심으로 선과 악의 가치가 뒤바뀌는 세계관 속에서, 선의 오브를 쫓는 네 가지 클래스를 Live 2D 애니메이션으로 소개합니다.'
  },
  {
    id: 'love-at-rust-sight',
    title: 'Love at rust sight',
    designer: '김윤정',
    genre: '영상 콘텐츠 디자인',
    description: "버림받은 로봇이 자신을 받아줄 '천사'를 찾아 떠나는 이야기입니다. 녹슨 감성과 따뜻한 서사가 어우러져 새로운 사랑을 갈망하는 로봇의 여정을 담담하게 그립니다."
  },
  {
    id: 'hello-universe',
    title: '안녕 우주',
    designer: '김윤정',
    genre: '영상 콘텐츠 디자인',
    description: '우주 비행사가 되기로 약속했던 친구와 헤어진 뒤 악몽에 시달리는 미아의 이야기입니다. 꿈과 현실이 교차하는 서사를 통해 이별과 그리움, 그리고 성장의 순간을 담았습니다.'
  },
  {
    id: 'sasin-do',
    title: '四神圖 (사신도)',
    designer: '우수민',
    genre: '멀티미디어 디자인',
    description: '고분벽화 속 사신도를 현대적 캐릭터로 재해석했습니다. 동서남북을 수호하는 네 신수의 상징성을 현대적 디자인 언어와 결합해 전통과 현대의 조화를 이루었습니다.'
  },
  {
    id: 'liminal-guide-app',
    title: '피에르 위그: <리미널 Liminal> 가이드앱 UX/UI',
    designer: '우수민',
    genre: '멀티미디어 디자인',
    description: '리움미술관 전시를 위한 가이드 앱으로, 전시 정보와 동선 안내, 관람객 참여형 인터랙션까지 아우르는 경험을 설계했습니다. 전통적 감상 방식을 넘어 새로운 전시 경험을 제안합니다.'
  },
  {
    id: 'chrome-4-seasons',
    title: 'Chrome 4: Seasons',
    designer: '박해인',
    genre: '모션 디자인',
    description: '메타휴먼과 크롬하츠 브랜드가 만나 사계절의 감각을 시각화했습니다. 봄·여름·가을·겨울의 흐름을 크롬의 강렬한 아이덴티티와 결합해, 감각과 상상이 확장되는 경험을 선사합니다.'
  },
  {
    id: 'le-labo-city-exclusive',
    title: 'LE LABO - City Exclusive',
    designer: '이지민',
    genre: '모션 디자인',
    description: 'LE LABO의 시티 익스클루시브 컬렉션 중 서울의 CITRON 28, 도쿄의 GAIAC 10, LA의 MUSC 25를 시각적으로 해석한 프로모션 영상입니다. 도시의 향과 이미지를 모션으로 풀어냈습니다.'
  },
  {
    id: 'veneti',
    title: 'Veneti (베네티)',
    designer: '이지민',
    genre: '멀티미디어 디자인',
    description: "월트 디즈니 애니메이션 <인어공주>의 문어 마녀 '우르슬라'를 재해석한 캐릭터 작품입니다. '마녀는 정말 절대악인가?'라는 질문에서 출발해 인간의 양면성을 탐구합니다."
  },
  {
    id: 'pledge',
    title: 'PLEDGE',
    designer: '박희찬',
    genre: '게임 콘텐츠 디자인',
    description: '워해머 40,000 세계관을 기반으로 한 1분 분량의 단편 시네마틱입니다. 치명상을 입은 스페이스 마린이 드레드노트로 다시 깨어나는 순간을 통해 영원한 충성의 무게와 전장의 긴장감을 표현했습니다.'
  },
  {
    id: 'animation-reel-2025',
    title: '2025 Animation Reel',
    designer: '박희찬',
    genre: '게임 콘텐츠 디자인',
    description: '게임 애니메이터 포트폴리오를 위한 쇼릴입니다. 인간형 캐릭터의 경쾌한 동작과 거대한 몬스터의 묵직한 움직임을 대비시켜 다양한 전투 모션과 무게감을 담았습니다.'
  },
  {
    id: 'cross-cooty',
    title: 'Cross Cooty',
    designer: '박진아',
    genre: '멀티미디어 디자인',
    description: "상상의 생물 'Cooty'가 살아가는 플로팅 아일랜드 세계를 웹 기반 3D로 구현했습니다. 각 섬은 서로 다른 생태계처럼 구성되어, 웹을 통해 다양한 Cooty를 탐험할 수 있습니다."
  },
  {
    id: 'remains',
    title: 'Remains',
    designer: '박진아',
    genre: '영상 콘텐츠 디자인',
    description: '흩어지고 사라지는 감정과 기억 속에서 집착을 내려놓았을 때 비로소 드러나는 본래의 모습을 담았습니다. 자연 속에서 번뇌가 서서히 벗겨지는 과정을 통해 평화의 순간을 포착합니다.'
  },
  {
    id: 'master-your-imagination',
    title: 'Master your Imagination',
    designer: '허지훈',
    genre: '모션 디자인',
    description: '“상상은 머릿속에서 피어나지만, 창조는 손에서 시작된다.” 로지텍 MX Master 3S를 통해 상상이 현실로 이어지는 순간을 감각적으로 보여줍니다.'
  },
  {
    id: 'eternal-vision',
    title: 'Eternal Vision',
    designer: '허지훈',
    genre: '모션 디자인',
    description: '현대자동차의 상징인 포니 쿠페와 이를 계승한 N74의 탄생을 감각적으로 담았습니다. 헤리티지가 미래의 비전으로 확장되는 여정을 시각적으로 풀어냈습니다.'
  },
  {
    id: 'believe-in-destiny',
    title: '운명을 믿으세요?',
    designer: '김채영',
    genre: '멀티미디어 디자인',
    description: "삶에서 선택과 운명에 대한 질문을 던지는 보드게임형 인터랙티브 작품입니다. 운명이라 여겼던 것들이 얼마나 자의적인지를 시각화하며 철학적인 메시지를 전달합니다."
  },
  {
    id: 'cyber-jesasang',
    title: '사이버 제사상',
    designer: '김채영',
    genre: '멀티미디어 디자인',
    description: '당신이 짊어진 감정의 짐을 풀어내는 디지털 제사상입니다. 한국적 색감과 조형 언어 속에서 감정이 파괴되는 순간의 카타르시스를 경험하게 합니다.'
  },
  {
    id: 'layered',
    title: 'Layered',
    designer: '이운',
    genre: '멀티미디어 디자인',
    description: '겹쳐짐은 개인의 정체성을 이루는 다층적 요소를 상징합니다. 기억이 담긴 옷을 업사이클링해 새로운 스타일로 재탄생시키며, 지속 가능한 패션과 환경 보호를 실천합니다.'
  },
  {
    id: '9e9e9e',
    title: '9e9e9e',
    designer: '이운',
    genre: '멀티미디어 디자인',
    description: "작은 소품이 일상에 다정한 마법을 더한다는 메시지를 담은 디자인 문구 & 액세서리 브랜드입니다. 반복되는 알파벳과 숫자를 리본 모티프로 재해석했습니다."
  },
  {
    id: 'ready-to-merry',
    title: 'Ready to Merry',
    designer: '이다영',
    genre: '멀티미디어 디자인',
    description: '한국의 크리스마스 캐롤을 카운트다운 형식으로 아카이빙한 앨범입니다. 작품을 보고 듣는 과정을 통해 크리스마스를 기다리는 설렘을 체험하게 합니다.'
  },
  {
    id: 'floating-room',
    title: '플롯팅룸',
    designer: '이다영',
    genre: '모션 디자인',
    description: "‘Plot-ting’, ‘Float-ing’, ‘Flirt-ing’의 의미를 담은 가상의 토크 예능 프로그램 타이틀 시퀀스입니다. 다양한 작가들이 이야기를 나누고 즉석에서 새로운 스토리를 창작합니다."
  },
  {
    id: 'see-tinh-isometric',
    title: '“SEE TINH” ISOMETRIC',
    designer: '도티안홍',
    genre: '영상 콘텐츠 디자인',
    description: '“See Tinh” 뮤직비디오에서 영감을 받아 제작된 아트토이와 3D 아이소메트릭 애니메이션입니다.'
  },
  {
    id: 'see-tinh-animated',
    title: '“SEE TINH” ANIMATED MUSIC VIDEO',
    designer: '도티안홍',
    genre: '영상 콘텐츠 디자인',
    description: 'See Tinh 뮤직비디오를 2D 애니메이션 뮤직비디오로 재해석해 활기찬 에너지를 담았습니다.'
  },
  {
    id: 'raven-x',
    title: 'RAVEN-X',
    designer: '전서린',
    genre: '게임 콘텐츠 디자인',
    description: '거대한 까마귀를 모티프로 한 고속 전투기를 디자인했습니다. 첨단 기술로 내부 위협과 테러로부터 인간을 수호하며 파괴적 힘을 상징합니다.'
  },
  {
    id: 'karon',
    title: 'Karon',
    designer: '전서린',
    genre: '게임 콘텐츠 디자인',
    description: '미래 도시의 음지에서 활동하는 특수 요원 카론을 그린 작품입니다. 초록빛 귀걸이는 통신 장치이자 정체성의 상징으로, 그림자처럼 도시를 누비는 은밀한 수호자를 표현했습니다.'
  },
  {
    id: 'cheongchunmong',
    title: '青春夢',
    designer: '조하늘',
    genre: '모션 디자인',
    description: '영상의 파편을 엮어내는 VJ 퍼포먼스를 통해 청춘의 순간을 몽환적으로 표현했습니다.'
  },
  {
    id: 'the-reason-that-i-live',
    title: 'The Reason that I Live',
    designer: '조하늘',
    genre: '영상 콘텐츠 디자인',
    description: '히키코모리의 삶을 살던 주인공이 친구의 위로와 응원을 통해 다시 세상으로 한 걸음 내딛는 이야기를 그렸습니다.'
  },
  {
    id: 'a-card-of-love',
    title: 'A card of love',
    designer: '송다희',
    genre: '영상 콘텐츠 디자인',
    description: '사랑을 표현하는 데 서툰 사람들을 위해 기획한 작품입니다. 20장의 카드에 감정과 질문을 담아 점술적인 방식으로 사랑을 탐구합니다.'
  },
  {
    id: 'peony',
    title: 'Peony',
    designer: '송다희',
    genre: '영상 콘텐츠 디자인',
    description: "‘물’과 ‘작약’, ‘물고기’의 상징을 통해 언어를 넘어 감각적으로 시를 경험하게 하고, 개인의 기억과 감정에 닿을 수 있도록 구성했습니다."
  },
  {
    id: 'astra',
    title: 'Astra',
    designer: '서원준',
    genre: '게임 콘텐츠 디자인',
    description: "세계관과 애정이 응축된 캐릭터 피규어입니다. 세부적인 디자인과 표정 하나하나에 담긴 감정을 정성스럽게 표현했습니다."
  },
  {
    id: 'arcane-jinx',
    title: 'Arcane Jinx',
    designer: '서원준',
    genre: '게임 콘텐츠 디자인',
    description: '불안정한 정신과 폭발적인 에너지를 동시에 가진 징크스를 정적인 형태로 포착했습니다. 파괴적이지만 섬세한 매력을 조형과 채색으로 드러냅니다.'
  },
  {
    id: 'hifive',
    title: 'HiFive',
    designer: '서동범',
    genre: '멀티미디어 디자인',
    description: '순간의 스파크, 손끝에서 전해지는 짜릿한 하이파이브! 계획되지 않은 만남이 새로운 발견이 되는 순간을 인터랙티브 브랜딩 경험으로 풀었습니다.'
  },
  {
    id: 'caravan',
    title: 'Caravan',
    designer: '김지나',
    genre: '게임 콘텐츠 디자인',
    description: '광활한 사막을 배경으로 두 약탈자 부족의 이야기를 다룹니다. 캐릭터의 외형에 삶의 방식과 세계관을 섬세하게 반영했습니다.'
  },
  {
    id: 'celestial',
    title: 'Cellestial',
    designer: '김지나',
    genre: '멀티미디어 디자인',
    description: '세포(Cell)를 모티브로 한 캐릭터가 오염된 행성을 정화하며 과거의 진실을 파헤칩니다. 오염과 정화를 몽환적으로 재해석했습니다.'
  },
  {
    id: 'main-video',
    title: '[점점점] 메인 영상',
    designer: '안선민',
    genre: 'main video',
    description: '점에서 점으로, 점점. 흩어져 있던 점들이 연결되어 색과 질서를 찾고 각자의 의미로 확장되는 과정을 시각적으로 풀어낸 메인 영상입니다.'
  }
];

const normalizeTitle = (title = '') =>
  title
    .toLocaleLowerCase('ko')
    .normalize('NFKD')
    .replace(/[^\p{L}\p{N}]+/gu, '');

const Works = () => {
  const sortedWorks = useMemo(
    () =>
      [...WORKS_LIST].sort((a, b) =>
        normalizeTitle(a.title).localeCompare(normalizeTitle(b.title), ['ko', 'en'], {
          numeric: true,
          sensitivity: 'base'
        })
      ),
    []
  );

  const mediaMap = useMemo(() => {
    const map = new Map();
    WORK_THUMBNAILS.forEach((item) => {
      map.set(normalizeTitle(item.title), resolveThumbSrc(item.file));
    });
    return map;
  }, []);

  const worksWithMedia = useMemo(
    () =>
      sortedWorks.map((work) => {
        const key = normalizeTitle(work.title);
        return {
          ...work,
          imageSrc: mediaMap.get(key) || ''
        };
      }),
    [sortedWorks, mediaMap]
  );

  const [modalState, setModalState] = useState({ active: false, index: 0 });
  const modalRef = useRef(null);
  const cursorRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const modalEl = modalRef.current;
    const cursorEl = cursorRef.current;
    const labelEl = labelRef.current;

    if (!modalEl || !cursorEl || !labelEl) {
      return undefined;
    }

    const xMoveModal = gsap.quickTo(modalEl, 'left', { duration: 0.5, ease: 'power3' });
    const yMoveModal = gsap.quickTo(modalEl, 'top', { duration: 0.5, ease: 'power3' });
    const xMoveCursor = gsap.quickTo(cursorEl, 'left', { duration: 0.4, ease: 'power3' });
    const yMoveCursor = gsap.quickTo(cursorEl, 'top', { duration: 0.4, ease: 'power3' });
    const xMoveLabel = gsap.quickTo(labelEl, 'left', { duration: 0.35, ease: 'power3' });
    const yMoveLabel = gsap.quickTo(labelEl, 'top', { duration: 0.35, ease: 'power3' });

    const handleMove = (event) => {
      const { clientX, clientY } = event;
      xMoveModal(clientX);
      yMoveModal(clientY);
      xMoveCursor(clientX);
      yMoveCursor(clientY);
      xMoveLabel(clientX);
      yMoveLabel(clientY);
    };

    window.addEventListener('mousemove', handleMove);

    return () => {
      window.removeEventListener('mousemove', handleMove);
    };
  }, []);

  useEffect(() => {
    const elements = [modalRef.current, cursorRef.current, labelRef.current].filter(Boolean);
    if (elements.length === 0) {
      return;
    }

    gsap.to(elements, {
      scale: modalState.active ? 1 : 0,
      autoAlpha: modalState.active ? 1 : 0,
      duration: modalState.active ? 0.35 : 0.25,
      ease: modalState.active ? 'power3.out' : 'power3.in'
    });
  }, [modalState.active]);

  const handleCardEnter = useCallback((event, backgroundColor, index) => {
    const card = event.currentTarget;
    if (!card) return;
    card.classList.remove('works-gallery__item--orange', 'works-gallery__item--blue');
    if (backgroundColor === '#FF7700') {
      card.classList.add('works-gallery__item--orange');
    } else {
      card.classList.add('works-gallery__item--blue');
    }
    card.style.zIndex = '10';
    gsap.to(card, {
      top: window.innerWidth <= 768 ? '-10px' : '-2vw',
      backgroundColor,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto'
    });
    const hasImage = Boolean(worksWithMedia[index]?.imageSrc);
    setModalState({ active: hasImage, index });
  }, [worksWithMedia]);

  const handleCardLeave = useCallback((event) => {
    const card = event.currentTarget;
    if (!card) return;
    card.classList.remove('works-gallery__item--orange', 'works-gallery__item--blue');
    gsap.to(card, {
      top: '0px',
      backgroundColor: '#FFFFFF',
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
      onComplete: () => {
        card.style.zIndex = '1';
      }
    });
    setModalState((prev) => (prev.active ? { ...prev, active: false } : prev));
  }, []);

  const handleCardClick = useCallback((work) => {
    if (!work?.designer) return;
    const encoded = encodeURIComponent(work.designer);
    window.history.pushState({}, '', `/designer/${encoded}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, []);

  return (
    <div className="works-gallery">
      <div className="works-gallery__overlay" aria-hidden="true">
        <div ref={modalRef} className="works-gallery__preview">
          <div
            className="works-gallery__preview-slider"
            style={{ transform: `translateY(-${modalState.index * 100}%)` }}
          >
            {worksWithMedia.map((work) => (
              <div key={`preview-${work.id}`} className="works-gallery__preview-item">
                {work.imageSrc ? (
                  <img src={work.imageSrc} alt={`${work.title} 썸네일`} loading="lazy" />
                ) : (
                  <div className="works-gallery__preview-placeholder" />
                )}
              </div>
            ))}
          </div>
        </div>
        <div ref={cursorRef} className="works-gallery__preview-cursor" />
        <div ref={labelRef} className="works-gallery__preview-label">
          View
        </div>
      </div>
      <div className="works-gallery__inner">
        {worksWithMedia.map((work, index) => {
          const color = GALLERY_COLORS[index % GALLERY_COLORS.length];
          return (
            <button
              key={work.id}
              type="button"
              className="works-gallery__item"
              onClick={() => handleCardClick(work)}
              onMouseEnter={(event) => handleCardEnter(event, color, index)}
              onMouseLeave={handleCardLeave}
              onFocus={(event) => handleCardEnter(event, color, index)}
              onBlur={handleCardLeave}
            >
              <div className="works-gallery__header">
                <span className="works-gallery__title">{work.title}</span>
                <span className="works-gallery__meta">
                  <span className="works-gallery__designer">{work.designer}</span>
                  <span className="works-gallery__genre">{work.genre}</span>
                </span>
              </div>
              <p className="works-gallery__description">{work.description}</p>
            </button>
          );
        })}
        <div className="works-gallery__item works-gallery__item--ghost" aria-hidden="true" />
      </div>
    </div>
  );
};

export default Works;