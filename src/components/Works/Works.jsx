import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import designerDetailsData from '../../data/designerDetailsData.js';
import DesignerShowcase from '../DesignerDetail/DesignerShowcase';
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

// 정렬 그룹 결정: 숫자(1), 영문(2), 한글(3)
const getSortGroup = (title) => {
  if (!title) return 3;
  const firstChar = title.trim()[0];
  if (/[0-9]/.test(firstChar)) return 1; // 숫자
  if (/[a-zA-Z]/.test(firstChar)) return 2; // 영문
  return 3; // 한글 및 기타
};

export { WORKS_LIST };

const Works = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categoryRefs = useRef([]);
  const categoryLabelRefs = useRef([]);
  const categorySplitTextsRef = useRef([]);
  const categoryDescriptionRefs = useRef([]);

  // 카테고리별 작품 필터링
  const filteredWorks = useMemo(() => {
    if (selectedCategory === 'all') {
      return WORKS_LIST;
    }
    const category = CATEGORIES.find((cat) => cat.id === selectedCategory);
    if (!category) return WORKS_LIST;
    return WORKS_LIST.filter((work) => work.genre === category.genre);
  }, [selectedCategory]);

  const sortedWorks = useMemo(
    () =>
      [...filteredWorks].sort((a, b) => {
        const groupA = getSortGroup(a.title);
        const groupB = getSortGroup(b.title);
        
        // 그룹이 다르면 그룹 순서로 정렬
        if (groupA !== groupB) {
          return groupA - groupB;
        }
        
        // 같은 그룹 내에서는 제목으로 정렬
        if (groupA === 1) {
          // 숫자 그룹: 숫자 우선 정렬
          return normalizeTitle(a.title).localeCompare(normalizeTitle(b.title), ['ko', 'en'], {
          numeric: true,
          sensitivity: 'base'
          });
        } else if (groupA === 2) {
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
  }, []);

  useEffect(() => {
    if (!selectedWork) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeWorkModal();
      }
    };

    const scrollY = window.scrollY;
    const html = document.documentElement;
    const root = document.getElementById('root');

    document.body.dataset.modalScrollY = String(scrollY);
    document.body.style.top = `-${scrollY}px`;

    document.body.classList.add('is-modal-open');
    html.classList.add('is-modal-open');
    root?.classList.add('is-modal-open');

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('visibilitychange', closeWorkModal);
    const handleMouseMove = (event) => {
      const modal = document.querySelector('.works-work-modal');
      if (!modal) return;
      const rect = modal.getBoundingClientRect();
      const isInside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      if (isInside) {
        document.body.classList.remove('kim-modal-cursor-cross');
      } else {
        document.body.classList.add('kim-modal-cursor-cross');
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', closeWorkModal);
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.classList.remove('kim-modal-cursor-cross');

      document.body.classList.remove('is-modal-open');
      html.classList.remove('is-modal-open');
      root?.classList.remove('is-modal-open');

      document.body.style.top = '';

      const previousScrollY = Number(document.body.dataset.modalScrollY || '0');
      window.scrollTo(0, previousScrollY);
      delete document.body.dataset.modalScrollY;
    };
  }, [selectedWork, closeWorkModal]);

  const handleWrapperClick = (event) => {
    if (!selectedWork) {
      return;
    }

    const modalSelector = '.works-work-modal';
    const modalElement = event.target.closest(modalSelector);

    if (modalElement) {
      event.stopPropagation();
      return;
    }

    closeWorkModal();
  };

  // 카테고리 클릭 핸들러
  const handleCategoryClick = useCallback((categoryId) => {
    setSelectedCategory(categoryId);
  }, []);

  // 카테고리 텍스트 애니메이션 초기화
  useEffect(() => {
    const labels = categoryLabelRefs.current.filter(Boolean);
    if (labels.length === 0) return;

    // 각 라벨에 splitText 적용
    categorySplitTextsRef.current = labels.map((label) => {
      if (!label) return null;
      return splitText(label, 'chars');
    });

    // 초기 상태: 선택된 카테고리는 텍스트 숨김, 선택 안 된 카테고리는 텍스트 표시
    // details__title과 동일하게 y 속성 사용
    // 'all' 카테고리는 애니메이션 없이 항상 표시
    categorySplitTextsRef.current.forEach((splitData, index) => {
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
      splitData.chars.forEach((char) => {
        // 활성화된 카테고리는 텍스트 숨김, 비활성화된 카테고리는 텍스트 표시
        gsap.set(char, { 
          y: isActive ? '100%' : 0
        });
      });
      
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

    // 이전 선택된 카테고리 찾기 (현재 활성화된 요소 - 텍스트가 숨겨진 상태)
    let previousActiveIndex = -1;
    splitTexts.forEach((splitData, index) => {
      if (!splitData || !splitData.chars) return;
      const category = CATEGORIES[index];
      if (!category || category.id === 'all') return;
      
      const firstCharY = gsap.getProperty(splitData.chars[0], 'y');
      // 텍스트가 숨겨진 상태 (활성화된 상태)인 카테고리 찾기
      if (firstCharY === '100%' || firstCharY === 100 || firstCharY === '100px') {
        previousActiveIndex = index;
      }
    });

    // 1단계: 현재 활성화된 카테고리의 description 사라짐 → label 텍스트 나타남 → 사라짐 (즉시 반응, 천천히 사라짐)
    if (previousActiveIndex !== -1 && previousActiveIndex !== CATEGORIES.findIndex(cat => cat.id === selectedCategory)) {
      const prevDescriptionEl = categoryDescriptionRefs.current[previousActiveIndex];
      const prevSplitData = splitTexts[previousActiveIndex];
      
      // description이 보이는 상태인 경우 먼저 사라지게 (즉시 시작)
      if (prevDescriptionEl && gsap.getProperty(prevDescriptionEl, 'opacity') > 0) {
        gsap.to(prevDescriptionEl, {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.inOut',
        });
      }
      
      // description 사라진 후 label 텍스트 나타나게 한 다음 사라지게 (천천히)
      if (prevSplitData && prevSplitData.chars) {
        // 먼저 텍스트를 나타나게 함
        gsap.set(prevSplitData.chars, { y: 0 });
        // 그 다음 사라지게 함 (천천히)
        gsap.to(prevSplitData.chars, {
          y: '100%',
          duration: 0.6,
          delay: 0.4, // description 사라짐 후
          ease: 'power3.inOut',
          stagger: 0.01,
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
        // 새로 활성화된 카테고리: label 텍스트 사라짐 → description 나타남 (즉시 반응, 천천히 사라짐)
        const firstCharY = gsap.getProperty(splitData.chars[0], 'y');
        const descriptionEl = categoryDescriptionRefs.current[index];
        
        // 텍스트가 보이는 상태인 경우에만 사라지게
        if (firstCharY === 0 || firstCharY === '0px' || firstCharY === '0') {
          // 1. label 텍스트 먼저 사라지게 (즉시 시작, 천천히)
          gsap.to(splitData.chars, {
            y: '100%',
            duration: 0.6,
            delay: textAnimationDelay,
            ease: 'power3.inOut',
            stagger: 0.01,
            onComplete: () => {
              // 애니메이션 완료 후 최종 상태 확실히 설정
              splitData.chars.forEach((char) => {
                gsap.set(char, { y: '100%' });
              });
            }
          });
          
          // 2. label 사라진 후 description 나타나게
          if (descriptionEl) {
            gsap.to(descriptionEl, {
              opacity: 1,
              duration: 0.4,
              delay: textAnimationDelay + 0.6, // label 사라짐 후
              ease: 'power2.inOut',
              onComplete: () => {
                // 애니메이션 완료 후 최종 상태 확실히 설정
                gsap.set(descriptionEl, { opacity: 1 });
              }
            });
          }
        } else {
          // 이미 숨겨진 상태라면 description만 나타나게
          if (descriptionEl) {
            gsap.set(descriptionEl, { opacity: 1 });
          }
        }
      } else {
        // 비활성화: description 사라짐 → label 텍스트 나타남
        const descriptionEl = categoryDescriptionRefs.current[index];
        const firstCharY = gsap.getProperty(splitData.chars[0], 'y');
        
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
          
          // 2. description 사라진 후 label 텍스트 나타나게
          if (firstCharY === '100%' || firstCharY === 100 || firstCharY === '100px') {
            gsap.to(splitData.chars, {
              y: 0,
              duration: 1.1,
              delay: textAnimationDelay + 0.4, // description 사라짐 후
              ease: 'power3.inOut',
              stagger: 0.025,
              onComplete: () => {
                // 애니메이션 완료 후 최종 상태 확실히 설정
                splitData.chars.forEach((char) => {
                  gsap.set(char, { y: 0 });
                });
              }
            });
          }
        } else {
          // description이 없는 경우 (이전 활성화된 카테고리가 아닌 경우)
          // 텍스트가 숨겨진 상태인 경우에만 나타나게
          if (firstCharY === '100%' || firstCharY === 100 || firstCharY === '100px') {
            gsap.to(splitData.chars, {
              y: 0,
              duration: 1.1,
              delay: textAnimationDelay,
              ease: 'power3.inOut',
              stagger: 0.025,
              onComplete: () => {
                // 애니메이션 완료 후 최종 상태 확실히 설정
                splitData.chars.forEach((char) => {
                  gsap.set(char, { y: 0 });
                });
              }
            });
          } else {
            // 이미 보이는 상태라면 확실히 보이게 설정
            splitData.chars.forEach((char) => {
              gsap.set(char, { y: 0 });
            });
          }
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

    // 전체 너비 계산 (100vw 기준, border 포함)
    const containerWidth = container.offsetWidth || window.innerWidth;
    const padding = 0; // 패딩 없음
    const totalButtons = CATEGORIES.length;
    const borderWidth = 1; // 각 버튼의 border-right 너비
    const totalBorderWidth = totalButtons * borderWidth; // 모든 border 너비 합계
    const availableWidth = containerWidth - (padding * 2) - totalBorderWidth;
    const baseWidth = availableWidth / totalButtons;

    if (selectedIndex === -1) {
      // 선택된 카테고리가 없으면 초기 너비로 설정 (애니메이션 없이)
      buttons.forEach((button) => {
        if (!button) return;
        gsap.set(button, { width: baseWidth });
      });
      return;
    }
    
    // 선택된 버튼의 확대 비율
    const selectedScale = 2.5; // 선택된 버튼은 2.5배 확대
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
              <div className="works-category__logo">
                <img src={category.logo} alt={`${category.label} 로고`} className="works-category__logo-image" />
              </div>
            )}
            <span 
              className="works-category__label"
              ref={(el) => {
                categoryLabelRefs.current[index] = el;
              }}
            >
              {category.label}
            </span>
            {category.description && (
              <div 
                className="works-category__description"
                ref={(el) => {
                  categoryDescriptionRefs.current[index] = el;
                }}
              >
                <h3 className="works-category__description-title">{category.label}</h3>
                <p className="works-category__description-text">{category.description}</p>
              </div>
            )}
          </button>
        ))}
      </div>
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
      <div className="works-gallery__footer">
        <img src={symbolImage} alt="MJU MCD Symbol" className="works-gallery__footer-symbol" />
      </div>
    </div>
      {selectedWork && selectedDesigner && createPortal(
        <div className="works-work-modal-overlay" role="dialog" aria-modal="true" onClick={closeWorkModal}>
          <div className="works-work-modal-wrapper" onClick={handleWrapperClick}>
            <div className="works-work-modal">
              <DesignerShowcase
                designer={selectedDesigner}
                onBack={closeWorkModal}
                initialWorkId={selectedWork.id}
                renderOnlyWork={true}
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Works;