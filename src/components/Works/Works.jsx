import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import designerDetailsData from '../../data/designerDetailsData.js';
import Modal from '../Modal/Modal';
import WorkDetailContent from '../DesignerDetail/WorkDetails/WorkDetailContent';
import { videoBadge, gameBadge, multimediaBadge, motionBadge } from '../../data/designerDetailsData';
import { splitText } from '../DraggableGrid/js/utils.js';
import gameLogo from '../../assets/branding_logo/Game.svg';
import motionLogo from '../../assets/branding_logo/Motion.svg';
import multimediaLogo from '../../assets/branding_logo/Multimedia.svg';
import videoLogo from '../../assets/branding_logo/Video.svg';
import symbolImage from '../../assets/Symbol.webp';
import './Works.css';
import '../DesignerDetail/DesignerShowcase.css';

const GALLERY_COLORS = ['#67C5FF', '#FF7700'];

// 카테고리 정의
const CATEGORIES = [
  {
    id: 'all', 
    label: 'ALL', 
    genre: null, 
    logo: null,
    description: null
  },
  {
    id: 'game', 
    label: 'GAME CONTENT DESIGN', 
    genre: '게임 콘텐츠 디자인',
    logo: gameLogo,
    description: '게임 디자인은 플레이어를 온전히 몰입시키는 정교한 세계관을 구축하는 일입니다. G의 색상은 외부의 모든 것을 차단하는 완전한 몰입을 상징합니다. G는 어둠 속에서 점처럼 흩어진 이야기와 인물들이 하나의 거대한 흐름으로 연결되며, 플레이어를 그 세계의 중심으로 이끄는 강력한 소용돌이로 형상화했습니다.'
  },
  {
    id: 'motion', 
    label: 'MOTION DESIGN', 
    genre: '모션 디자인',
    logo: motionLogo,
    description: '모션디자인에서 하나의 점은 결정적인 순간을 담은 키프레임입니다. 순수하고 밝은 바탕색은 이 모든 움직임이 그려지는 캔버스를 상징합니다. M은 이 깨끗한 캔버스 위에서 핵심 키프레임(점)들이 정교하게 연결되어, 방해 없이 오직 움직임의 본질만으로 하나의 완성된 리듬감을 만들어내는 과정을 보여줍니다.'
  },
  {
    id: 'multimedia', 
    label: 'MULTI MEDIA DESIGN', 
    genre: '멀티미디어 디자인',
    logo: multimediaLogo,
    description: '각각의 점은 고유한 특성을 지닌 하나의 매체를 상징합니다. 멀티미디어의 생동감 넘치는 오렌지 컬러는 이 매체들을 융합하는 폭발적인 창의적 에너지를 의미합니다. 멀티미디어는 이 뜨거운 에너지로 점들이 경계를 허물고 조화롭게 연결되어, 다채로운 매체들이 각 부분의 총합을 뛰어넘는 역동적인 가치를 만들어내는 과정을 보여줍니다.'
  },
  {
    id: 'video', 
    label: 'VIDEO CONTENT DESIGN', 
    genre: '영상 콘텐츠 디자인',
    logo: videoLogo,
    description: '하나의 점이 움직여 중력에 이끌려 바닥에 닿는 순간, 그 에너지는 새로운 방향으로의 도약을 이끌어냅니다. 비디오콘텐츠의 경쾌한 블루 컬러는 이 찰나의 순간에 폭발하는 생동감 넘치는 에너지 그 자체를 상징합니다. V는 이 푸른 에너지로 공이 튀어 오르며 만들어내는 \'새로운 도약\'의 역동적인 프레임을 형상화했습니다.'
  },
];

// designerDetailsData에서 모든 작품 추출
const extractWorksFromDesignerData = () => {
  const works = [];
  Object.values(designerDetailsData).forEach((designer) => {
    if (designer.works && Array.isArray(designer.works)) {
      designer.works.forEach((work) => {
        works.push({
          id: work.id,
          title: work.title,
          designer: designer.displayName,
          genre: work.genre,
          description: work.summary || work.description || '',
          thumbnail: work.thumbnail,
        });
      });
    }
  });
  return works;
};

const WORKS_LIST = extractWorksFromDesignerData();

export const normalizeTitle = (title = '') =>
  title
    .toLocaleLowerCase('ko')
    .normalize('NFKD')
    .replace(/[^\p{L}\p{N}]+/gu, '');

// 정렬 그룹 결정: 특수기호(1), 숫자(2), 영문(3), 한글(4)
const getSortGroup = (title) => {
  if (!title) return 4;
  const firstChar = title.trim()[0];
  if (/[0-9]/.test(firstChar)) return 2; // 숫자
  if (/[a-zA-Z]/.test(firstChar)) return 3; // 영문
  if (/[\uAC00-\uD7A3]/.test(firstChar)) return 4; // 한글
  return 1; // 특수기호 및 기타
};

export { WORKS_LIST };

// 한글 genre를 영어로 변환하는 함수
const getGenreInEnglish = (genre) => {
  const genreMap = {
    '게임 콘텐츠 디자인': 'GAME CONTENT DESIGN',
    '모션 디자인': 'MOTION DESIGN',
    '멀티미디어 디자인': 'MULTI MEDIA DESIGN',
    '영상 콘텐츠 디자인': 'VIDEO CONTENT DESIGN',
  };
  return genreMap[genre] || genre;
};

const Works = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [activeWorkIndex, setActiveWorkIndex] = useState(null);
  const categoryRefs = useRef([]);
  const categoryLabelRefs = useRef([]);
  const categorySplitTextsRef = useRef([]);
  const categoryDescriptionRefs = useRef([]);
  const categoryLogoRefs = useRef([]);
  const galleryRef = useRef(null);

  // 모바일 여부 체크
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 799);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // 카테고리별 작품 필터링
  const categoryFilteredWorks = useMemo(() => {
    if (selectedCategory === 'all') {
      return WORKS_LIST;
    }
    const category = CATEGORIES.find((cat) => cat.id === selectedCategory);
    if (!category) return WORKS_LIST;
    return WORKS_LIST.filter((work) => work.genre === category.genre);
  }, [selectedCategory]);

  // 검색어로 작품 필터링
  const filteredWorks = useMemo(() => {
    if (!searchQuery.trim()) {
      return categoryFilteredWorks;
    }
    
    const query = searchQuery.toLowerCase().trim();
    return categoryFilteredWorks.filter((work) => {
      const title = (work.title || '').toLowerCase();
      const designer = (work.designer || '').toLowerCase();
      const genre = (work.genre || '').toLowerCase();
      const description = (work.description || '').toLowerCase();
      
      return (
        title.includes(query) ||
        designer.includes(query) ||
        genre.includes(query) ||
        description.includes(query)
      );
    });
  }, [categoryFilteredWorks, searchQuery]);

  const sortedWorks = useMemo(
    () =>
      [...filteredWorks].sort((a, b) => {
        const groupA = getSortGroup(a.title);
        const groupB = getSortGroup(b.title);
        
        // 그룹이 다르면 그룹 순서로 정렬 (특수기호-숫자-영문-한글)
        if (groupA !== groupB) {
          return groupA - groupB;
        }
        
        // 같은 그룹 내에서는 제목으로 정렬
        if (groupA === 1) {
          // 특수기호 그룹: 기본 정렬
          return a.title.localeCompare(b.title, ['ko', 'en'], {
            sensitivity: 'base',
            ignorePunctuation: false
          });
        } else if (groupA === 2) {
          // 숫자 그룹: 숫자 우선 정렬
          return normalizeTitle(a.title).localeCompare(normalizeTitle(b.title), ['ko', 'en'], {
            numeric: true,
            sensitivity: 'base'
          });
        } else if (groupA === 3) {
          // 영문 그룹: 알파벳 순
          return a.title.localeCompare(b.title, 'en', {
            sensitivity: 'base',
            ignorePunctuation: true
          });
        } else {
          // 한글 그룹: 가나다 순
          return a.title.localeCompare(b.title, 'ko', {
            sensitivity: 'base',
            ignorePunctuation: true
          });
        }
      }),
    [filteredWorks]
  );

  const worksWithMedia = useMemo(
    () =>
      sortedWorks.map((work) => ({
          ...work,
        imageSrc: work.thumbnail || ''
      })),
    [sortedWorks]
  );

  const [modalState, setModalState] = useState({ active: false, index: 0 });
  const [selectedWork, setSelectedWork] = useState(null);
  const [selectedDesigner, setSelectedDesigner] = useState(null);
  const modalRef = useRef(null);
  const cursorRef = useRef(null);
  const labelRef = useRef(null);
  const categoryContainerRef = useRef(null);

  // Get badge image based on genre (DesignerShowcase와 동일한 로직)
  const getBadgeForGenre = (genre) => {
    if (!genre) return videoBadge; // Default to video badge
    
    if (genre === '영상 콘텐츠 디자인') {
      return videoBadge;
    } else if (genre === '게임 콘텐츠 디자인') {
      return gameBadge;
    } else if (genre === '멀티미디어 디자인') {
      return multimediaBadge;
    } else if (genre === '모션 디자인') {
      return motionBadge;
    }
    return videoBadge; // Default fallback
  };

  useEffect(() => {
    // 모바일 모드에서는 마우스 이벤트 비활성화
    if (isMobile) return undefined;

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
  }, [isMobile]);

  useEffect(() => {
    // 모바일 모드에서는 preview 컨테이너 숨기기
    if (isMobile) {
      const elements = [modalRef.current, cursorRef.current, labelRef.current].filter(Boolean);
      elements.forEach(el => {
        if (el) gsap.set(el, { display: 'none' });
      });
      return;
    }

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
  }, [modalState.active, isMobile]);

  const handleCardEnter = useCallback((event, backgroundColor, index) => {
    // 모바일 모드에서는 마우스 이벤트 비활성화
    if (isMobile) return;

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
  }, [worksWithMedia, isMobile]);

  const handleCardLeave = useCallback((event) => {
    // 모바일 모드에서는 마우스 이벤트 비활성화
    if (isMobile) return;

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
  }, [isMobile]);

  const handleCardClick = useCallback((work) => {
    if (!work?.designer || !work?.id) return;
    
    // 디자이너 정보 찾기
    const designer = Object.values(designerDetailsData).find(
      (d) => d.displayName === work.designer
    );
    
    if (!designer) return;
    
    // 작품 정보 찾기
    const foundWork = designer.works?.find((w) => w.id === work.id);
    
    if (!foundWork) return;
    
    setSelectedDesigner(designer);
    setSelectedWork(foundWork);
  }, []);

  const closeWorkModal = useCallback(() => {
    setSelectedWork(null);
    setSelectedDesigner(null);
    // 스크롤 복원은 Modal 컴포넌트의 removeModalOpenState가 처리합니다
  }, []);

  // WorkDetailContent에 필요한 props 생성
  const getWorkContentProps = useCallback((work, designer) => {
    const instagramUrl = work.instagram || designer?.instagram;
    const badgeSrc = getBadgeForGenre(work.genre);
    const badgeAlt = work.genre || 'Content Logo';
    const ctas = [];

    // 개인 SNS가 있으면 CTA 추가
    if (instagramUrl) {
      ctas.push({
        label: '개인 SNS',
        variant: 'secondary',
        onClick: () => {
          const cleaned = instagramUrl.startsWith('http')
            ? instagramUrl
            : `https://www.instagram.com/${instagramUrl.replace(/^@/, '')}/`;
          window.open(cleaned, '_blank', 'noopener,noreferrer');
        },
      });
    }

    return { work, designer, badgeSrc, badgeAlt, ctas };
  }, []);

  // 모바일 모드에서 스크롤 기반 활성 작품 감지
  useEffect(() => {
    const container = galleryRef.current;
    if (!container) return undefined;

    // 모바일 모드(799px 이하)에서만 적용
    if (!isMobile) return undefined;

    const items = Array.from(container.querySelectorAll('.works-gallery__item:not(.works-gallery__item--ghost)'));
    
    let scrollTimeout = null;
    
    const updateActiveItem = () => {
      // 화면 중앙 기준으로 활성화
      const viewportCenter = window.innerHeight / 2;
      const viewportHeight = window.innerHeight;
      
      // 모든 아이템의 위치 계산
      const itemVisibility = items.map((item, index) => {
        const rect = item.getBoundingClientRect();
        
        // 아이템의 위치 (뷰포트 기준)
        const itemTop = rect.top;
        const itemBottom = rect.bottom;
        const itemCenter = itemTop + (itemBottom - itemTop) / 2;
        
        // 뷰포트 내에 있는지 확인
        const isVisible = itemBottom > -100 && itemTop < viewportHeight + 100;
        
        // 화면 중앙으로부터의 거리 (절대값)
        const distanceFromCenter = Math.abs(itemCenter - viewportCenter);
        
        return { 
          item, 
          index, 
          isVisible, 
          distanceFromCenter,
          itemTop,
          itemCenter,
          itemBottom
        };
      });
      
      // 화면 중앙에 가장 가까운 아이템 찾기
      const visibleItems = itemVisibility.filter(item => item.isVisible);
      if (visibleItems.length === 0) {
        setActiveWorkIndex(null);
        return;
      }
      
      const bestItem = visibleItems.reduce((prev, current) => {
        return (prev.distanceFromCenter < current.distanceFromCenter) ? prev : current;
      });
      
      setActiveWorkIndex(bestItem.index);
      
      // 활성 아이템에 썸네일 배경 적용
      items.forEach((item, index) => {
        const work = worksWithMedia[index];
        const isActive = index === bestItem.index;
        
        if (isActive && work?.imageSrc) {
          // 썸네일 이미지를 배경으로 설정
          item.style.backgroundImage = `url(${work.imageSrc})`;
          item.style.backgroundSize = 'cover';
          item.style.backgroundPosition = 'center';
          item.style.backgroundRepeat = 'no-repeat';
          item.style.zIndex = '10';
          gsap.to(item, {
            top: '-10px',
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        } else {
          // 비활성 아이템은 기본 배경
          item.style.backgroundImage = 'none';
          item.style.backgroundColor = '#FFFFFF';
          item.style.zIndex = '1';
          gsap.to(item, {
            top: '0px',
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        }
      });
    };
    
    // 스크롤 이벤트 핸들러 (디바운싱)
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        requestAnimationFrame(updateActiveItem);
      }, 10);
    };
    
    // 초기 실행
    updateActiveItem();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateActiveItem, { passive: true });
    
    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateActiveItem);
    };
  }, [isMobile, worksWithMedia]);


  // 카테고리 클릭 핸들러
  const handleCategoryClick = useCallback((categoryId) => {
    setSelectedCategory(categoryId);
  }, []);

  // 카테고리 텍스트 애니메이션 초기화
  useEffect(() => {
    const labels = categoryLabelRefs.current.filter(Boolean);
    
    // 각 라벨에 splitText 적용 (label이 있는 경우만)
    if (labels.length > 0) {
      categorySplitTextsRef.current = labels.map((label) => {
        if (!label) return null;
        return splitText(label, 'chars');
      });
    } else {
      categorySplitTextsRef.current = [];
    }

    // 모든 카테고리의 로고와 description 초기화
    CATEGORIES.forEach((category, index) => {
      if (!category) return;
      
      const isActive = category.id === selectedCategory;
      
      // label이 있는 카테고리만 텍스트 애니메이션 처리
      const splitData = categorySplitTextsRef.current[index];
      if (splitData && splitData.chars) {
        // 'all' 카테고리는 애니메이션 적용 안 함 (항상 표시)
        if (category.id === 'all') {
          splitData.chars.forEach((char) => {
            gsap.set(char, { y: 0 });
          });
        } else {
          splitData.chars.forEach((char) => {
            // 활성화된 카테고리는 텍스트 숨김, 비활성화된 카테고리도 텍스트 숨김 (로고 표시를 위해)
            gsap.set(char, { 
              y: isActive ? '100%' : '100%'
            });
          });
        }
      }
      
      // 로고 초기 상태 설정 (비활성화 상태일 때만 표시)
      const logoEl = categoryLogoRefs.current[index];
      if (logoEl && category.logo) {
        gsap.set(logoEl, {
          opacity: isActive ? 0 : 1
        });
      }
      
      // description 초기 상태 설정
      const descriptionEl = categoryDescriptionRefs.current[index];
      if (descriptionEl) {
        gsap.set(descriptionEl, {
          opacity: isActive ? 1 : 0
        });
      }
    });
  }, [selectedCategory]);

  // 카테고리 선택 시 텍스트 애니메이션
  useEffect(() => {
    const labels = categoryLabelRefs.current.filter(Boolean);
    const splitTexts = categorySplitTextsRef.current;
    if (labels.length === 0 || splitTexts.length === 0) return;

    // 모든 진행 중인 애니메이션 kill
    splitTexts.forEach((splitData) => {
      if (!splitData || !splitData.chars) return;
      splitData.chars.forEach((char) => {
        gsap.killTweensOf(char);
      });
    });
    categoryDescriptionRefs.current.forEach((descEl) => {
      if (descEl) {
        gsap.killTweensOf(descEl);
      }
    });
    categoryLogoRefs.current.forEach((logoEl) => {
      if (logoEl) {
        gsap.killTweensOf(logoEl);
      }
    });

    // 이전 선택된 카테고리 찾기 (현재 활성화된 요소 - description이 보이는 상태)
    let previousActiveIndex = -1;
    splitTexts.forEach((splitData, index) => {
      if (!splitData || !splitData.chars) return;
      const category = CATEGORIES[index];
      if (!category || category.id === 'all') return;
      
      const descriptionEl = categoryDescriptionRefs.current[index];
      // description이 보이는 상태 (활성화된 상태)인 카테고리 찾기
      if (descriptionEl && gsap.getProperty(descriptionEl, 'opacity') > 0) {
        previousActiveIndex = index;
      }
    });

    // 1단계: 현재 활성화된 카테고리의 description 사라짐 → 로고 나타남 (즉시 반응)
    if (previousActiveIndex !== -1 && previousActiveIndex !== CATEGORIES.findIndex(cat => cat.id === selectedCategory)) {
      const prevDescriptionEl = categoryDescriptionRefs.current[previousActiveIndex];
      const prevLogoEl = categoryLogoRefs.current[previousActiveIndex];
      const prevCategory = CATEGORIES[previousActiveIndex];
      
      // description이 보이는 상태인 경우 먼저 사라지게 (즉시 시작)
      if (prevDescriptionEl && gsap.getProperty(prevDescriptionEl, 'opacity') > 0) {
        gsap.to(prevDescriptionEl, {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.inOut',
        });
      }
      
      // description 사라진 후 로고 나타나게
      if (prevLogoEl && prevCategory && prevCategory.logo) {
        gsap.to(prevLogoEl, {
          opacity: 1,
          duration: 0.4,
          delay: 0.4, // description 사라짐 후
          ease: 'power2.inOut',
        });
      }
    }

    // 2단계: 너비는 updateCategoryWidths에서 즉시 변경 (label 텍스트 사라짐 시작 후)
    // 3단계: 너비 변경 후 새로 활성화된 카테고리의 label 텍스트 사라지고 description 나타나기, 비활성화된 카테고리들의 description 사라지고 label 텍스트 나타나기
    // label 텍스트 사라짐이 시작되면 너비 변경도 시작 (delay 최소화)
    const textAnimationDelay = 0.2; // label 텍스트 사라짐 시작 후 약간의 delay
    
    labels.forEach((label, index) => {
      const splitData = splitTexts[index];
      if (!splitData || !splitData.chars) return;

      const category = CATEGORIES[index];
      if (!category) return;
      
      // 'all' 카테고리는 애니메이션 적용 안 함 (항상 표시)
      if (category.id === 'all') {
        splitData.chars.forEach((char) => {
          gsap.set(char, { y: 0 });
        });
        return;
      }

      const isActive = category.id === selectedCategory;

      if (isActive) {
        // 새로 활성화된 카테고리: 로고 사라짐 → description 나타남 (텍스트는 숨김 상태 유지)
        const descriptionEl = categoryDescriptionRefs.current[index];
        const logoEl = categoryLogoRefs.current[index];
        const firstCharY = gsap.getProperty(splitData.chars[0], 'y');
        
        // 로고가 보이는 상태인 경우 사라지게
        if (logoEl && category.logo && gsap.getProperty(logoEl, 'opacity') > 0) {
          // 1. 로고 먼저 사라지게 (즉시 시작)
          gsap.to(logoEl, {
            opacity: 0,
            duration: 0.4,
            delay: textAnimationDelay,
            ease: 'power2.inOut',
            onComplete: () => {
              gsap.set(logoEl, { opacity: 0 });
            }
          });
          
          // 2. 로고 사라진 후 description 나타나게
          if (descriptionEl) {
            gsap.to(descriptionEl, {
              opacity: 1,
              duration: 0.4,
              delay: textAnimationDelay + 0.4, // 로고 사라짐 후
              ease: 'power2.inOut',
              onComplete: () => {
                gsap.set(descriptionEl, { opacity: 1 });
              }
            });
          }
        } else {
          // 로고가 이미 숨겨진 상태라면 description만 나타나게
          if (descriptionEl) {
            gsap.to(descriptionEl, {
              opacity: 1,
              duration: 0.4,
              delay: textAnimationDelay,
              ease: 'power2.inOut',
              onComplete: () => {
                gsap.set(descriptionEl, { opacity: 1 });
              }
            });
          }
        }
        
        // 텍스트는 숨김 상태 유지
        splitData.chars.forEach((char) => {
          gsap.set(char, { y: '100%' });
        });
      } else {
        // 비활성화: description 사라짐 → 로고 표시 (텍스트는 숨김 상태 유지)
        // 'all' 카테고리는 예외 처리 (항상 텍스트 표시)
        if (category.id === 'all') {
          // 'all' 카테고리는 텍스트 표시, 로고 숨김
          splitData.chars.forEach((char) => {
            gsap.set(char, { y: 0 });
          });
          const logoEl = categoryLogoRefs.current[index];
          if (logoEl) {
            gsap.set(logoEl, { opacity: 0 });
          }
          const descriptionEl = categoryDescriptionRefs.current[index];
          if (descriptionEl) {
            gsap.set(descriptionEl, { opacity: 0 });
          }
          return;
        }
        
        const descriptionEl = categoryDescriptionRefs.current[index];
        const logoEl = categoryLogoRefs.current[index];
        
        // description이 보이는 상태인 경우
        if (descriptionEl && gsap.getProperty(descriptionEl, 'opacity') > 0) {
          // 1. description 먼저 사라지게 (즉시 시작)
          gsap.to(descriptionEl, {
            opacity: 0,
            duration: 0.4,
            delay: textAnimationDelay,
            ease: 'power2.inOut',
            onComplete: () => {
              // 애니메이션 완료 후 최종 상태 확실히 설정
              gsap.set(descriptionEl, { opacity: 0 });
            }
          });
          
          // 2. description 사라진 후 로고 나타나게 (텍스트는 숨김 상태 유지)
          if (logoEl && category.logo) {
            gsap.to(logoEl, {
              opacity: 1,
              duration: 0.4,
              delay: textAnimationDelay + 0.4, // description 사라짐 후
              ease: 'power2.inOut',
              onComplete: () => {
                gsap.set(logoEl, { opacity: 1 });
              }
            });
          }
          
          // 텍스트는 숨김 상태 유지
          splitData.chars.forEach((char) => {
            gsap.set(char, { y: '100%' });
          });
        } else {
          // description이 없는 경우 (이전 활성화된 카테고리가 아닌 경우)
          // 로고 표시 (텍스트는 숨김 상태 유지)
          if (logoEl && category.logo) {
            gsap.to(logoEl, {
              opacity: 1,
              duration: 0.4,
              delay: textAnimationDelay,
              ease: 'power2.inOut',
              onComplete: () => {
                gsap.set(logoEl, { opacity: 1 });
              }
            });
          }
          
          // 텍스트는 숨김 상태 유지
          splitData.chars.forEach((char) => {
            gsap.set(char, { y: '100%' });
          });
        }
      }
    });
  }, [selectedCategory]);

  // 카테고리 너비 계산 및 설정 함수 (애니메이션 없음)
  const updateCategoryWidths = useCallback(() => {
    if (!categoryContainerRef.current || categoryRefs.current.length === 0) return;

    const container = categoryContainerRef.current;
    const buttons = categoryRefs.current.filter(Boolean);
    
    // 버튼이 모두 렌더링되지 않았으면 리턴
    if (buttons.length !== CATEGORIES.length) return;
    
    const selectedIndex = CATEGORIES.findIndex((cat) => cat.id === selectedCategory);

    // 전체 너비 계산 (컨테이너의 실제 너비 사용)
    const containerWidth = container.offsetWidth || window.innerWidth;
    const padding = 0; // 패딩 없음
    const totalButtons = CATEGORIES.length;
    const borderWidth = 1; // 각 버튼의 border-right 너비
    const totalBorderWidth = totalButtons * borderWidth; // 모든 border 너비 합계
    const availableWidth = containerWidth - (padding * 2) - totalBorderWidth;
    const baseWidth = availableWidth / totalButtons;
    
    // 컨테이너 위치 조정 (부모 컨테이너의 왼쪽 가장자리에 맞춤)
    if (container) {
      const parentContainer = container.parentElement;
      if (parentContainer) {
        const parentRect = parentContainer.getBoundingClientRect();
        // 부모 컨테이너의 왼쪽 가장자리를 기준으로 위치 조정
        const leftOffset = -parentRect.left;
        // 오른쪽 끝도 정확히 맞추기 위해 right 값 계산
        const rightOffset = window.innerWidth - parentRect.right;
        
        gsap.set(container, {
          marginLeft: `${leftOffset}px`,
          marginRight: `${-rightOffset}px`,
          width: `${window.innerWidth}px`
        });
      }
    }

    if (selectedIndex === -1) {
      // 선택된 카테고리가 없으면 초기 너비로 설정 (애니메이션 없이)
      buttons.forEach((button) => {
        if (!button) return;
        gsap.set(button, { width: baseWidth });
      });
      return;
    }
    
    // 선택된 버튼의 확대 비율 (모바일에서는 더 작게)
    const isMobile = window.innerWidth <= 768;
    const selectedScale = isMobile ? 1.5 : 2.5; // 모바일: 1.5배, 데스크탑: 2.5배
    const selectedWidth = baseWidth * selectedScale;
    
    // 나머지 버튼들이 나눠가질 너비 계산
    // 전체 너비가 정확히 유지되도록: selectedWidth + unselectedWidth * 4 = availableWidth
    // unselectedWidth * 4 = availableWidth - selectedWidth
    // unselectedWidth = (availableWidth - selectedWidth) / 4
    const unselectedWidth = (availableWidth - selectedWidth) / (totalButtons - 1);

    // 너비 애니메이션 없이 즉시 설정
    buttons.forEach((button, index) => {
      if (!button) return;
      const isSelected = index === selectedIndex;
      gsap.set(button, { 
        width: isSelected ? selectedWidth : unselectedWidth 
      });
    });
  }, [selectedCategory]);

  // 카테고리 선택 변경 시 너비 즉시 변경 (빠른 반응)
  useEffect(() => {
    // 버튼이 모두 렌더링되었는지 확인
    const buttons = categoryRefs.current.filter(Boolean);
    if (buttons.length === CATEGORIES.length && categoryContainerRef.current) {
      // label 텍스트 사라짐이 시작되면 너비도 즉시 변경 (delay 최소화)
      const timer = setTimeout(() => {
        updateCategoryWidths();
      }, 200); // label 텍스트 사라짐 시작 후 약간의 delay
      
      return () => clearTimeout(timer);
    }
  }, [selectedCategory, updateCategoryWidths]);

  // 초기 너비 설정 및 리사이즈 핸들러
  useEffect(() => {
    if (!categoryContainerRef.current) return;
    
      const setInitialWidths = () => {
        const buttons = categoryRefs.current.filter(Boolean);
        if (buttons.length !== CATEGORIES.length) return; // 모든 버튼이 렌더링될 때까지 대기
        updateCategoryWidths(); // 초기 설정
      };
    
    // 즉시 실행
    setInitialWidths();
    
    // 약간의 지연 후에도 실행 (DOM 렌더링 완료 보장)
    const timer = setTimeout(setInitialWidths, 10);
    
    // 리사이즈 이벤트 리스너 추가 - 실시간 애니메이션
    let resizeTimer;
    let rafId;
    let isResizing = false;
    
    const handleResize = () => {
      // 리사이즈 시작 시 플래그 설정
      if (!isResizing) {
        isResizing = true;
      }
      
      clearTimeout(resizeTimer);
      cancelAnimationFrame(rafId);
      
      // 디바운싱: 리사이즈가 끝난 후 애니메이션 실행
      resizeTimer = setTimeout(() => {
        rafId = requestAnimationFrame(() => {
          // 버튼이 모두 렌더링되었는지 확인
          const buttons = categoryRefs.current.filter(Boolean);
          if (buttons.length === CATEGORIES.length && categoryContainerRef.current) {
            // 컨테이너 위치도 다시 계산
            const container = categoryContainerRef.current;
            if (container) {
              const parentContainer = container.parentElement;
              if (parentContainer) {
                const parentRect = parentContainer.getBoundingClientRect();
                const leftOffset = -parentRect.left;
                // 오른쪽 끝도 정확히 맞추기 위해 right 값 계산
                const rightOffset = window.innerWidth - parentRect.right;
                
                gsap.set(container, {
                  marginLeft: `${leftOffset}px`,
                  marginRight: `${-rightOffset}px`,
                  width: `${window.innerWidth}px`
                });
              }
            }
            updateCategoryWidths(); // 리사이즈 시 즉시 변경
          }
          isResizing = false;
        });
      }, 16); // 약 60fps로 제한
    };
    
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimer);
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, [updateCategoryWidths]);


  return (
    <>
      <div className="works-categories" ref={categoryContainerRef}>
        {CATEGORIES.map((category, index) => (
          <button
            key={category.id}
            ref={(el) => {
              categoryRefs.current[index] = el;
            }}
            type="button"
            className={`works-category ${selectedCategory === category.id ? 'works-category--active' : ''}`}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.logo && (
              <div 
                className="works-category__logo"
                ref={(el) => {
                  categoryLogoRefs.current[index] = el;
                }}
              >
                <img src={category.logo} alt={`${category.label} 로고`} className="works-category__logo-image" />
              </div>
            )}
            {category.id === 'all' && (
              <span 
                className="works-category__label"
                ref={(el) => {
                  categoryLabelRefs.current[index] = el;
                }}
              >
                {category.label}
              </span>
            )}
            {category.description && (
              <div 
                className="works-category__description"
                ref={(el) => {
                  categoryDescriptionRefs.current[index] = el;
                }}
              >
                <h3 className="works-category__description-title">{category.label}</h3>
              </div>
            )}
          </button>
        ))}
      </div>
      
      {/* Search Bar */}
      <div className="works-search">
        <div className="works-search__container">
          <input
            type="text"
            className="works-search__input"
            placeholder="작품 제목, 디자이너, 장르로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
    <div className="works-gallery" ref={galleryRef}>
      {!isMobile && (
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
      )}
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
                  <span className="works-gallery__genre">{getGenreInEnglish(work.genre)}</span>
                </span>
              </div>
              <p className="works-gallery__description">{work.description}</p>
            </button>
          );
        })}
        <div className="works-gallery__item works-gallery__item--ghost" aria-hidden="true" />
      </div>
      <div className="works-gallery__footer">
        <img src={symbolImage} alt="MJU MCD Symbol" className="works-gallery__footer-symbol" />
      </div>
    </div>
      {selectedWork && selectedDesigner && (
        <Modal
          isOpen={!!selectedWork}
          onClose={closeWorkModal}
          designerName={selectedDesigner?.displayName}
        >
          <WorkDetailContent {...getWorkContentProps(selectedWork, selectedDesigner)} />
        </Modal>
      )}
    </>
  );
};

export default Works;