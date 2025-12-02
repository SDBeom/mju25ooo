import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { preloadImages, splitText } from './js/utils.js';
import { WORK_THUMBNAILS } from '../../data/workThumbsData.js';
import resolveThumbSrc from '../../utils/resolveThumbSrc.js';
import { WORKS_LIST } from '../Works/worksConstants.js';
import './DraggableGrid.css';

const PRODUCTS = WORK_THUMBNAILS.map((image) => ({
  id: image.id,
  img: resolveThumbSrc(image.file, image.title),
  ...image,
}));

// 그리드 레이아웃 설정
const GRID_CONFIG = {
  DESKTOP: {
    COLUMNS: 5,
    ROWS: 8,
  },
  MOBILE: {
    COLUMNS: 4,
    ROWS: 10,
  },
};

const GRID_COLUMNS = GRID_CONFIG.DESKTOP.COLUMNS;
const GRID_ROWS = GRID_CONFIG.DESKTOP.ROWS;

// 반응형 브레이크포인트
const BREAKPOINTS = {
  MOBILE: 799,
  TABLET: 1279,
  DESKTOP: 1280,
};

const detailsData = PRODUCTS.map((product) => ({
  id: product.id,
  title: product.title,
  description: product.description,
}));

/**
 * 그리드 컬럼 생성 (DRY 원칙 적용)
 * @param {number} columns - 컬럼 수
 * @param {number} rows - 행 수
 * @returns {Array<Array<string|null>>} 그리드 구조
 */
const createGridColumns = (columns, rows) => {
  return Array.from({ length: columns }, (_, columnIndex) => {
    return Array.from({ length: rows }, (_, rowIndex) => {
      const productIndex = columnIndex * rows + rowIndex;
      return PRODUCTS[productIndex]?.id ?? null;
    }).filter(Boolean);
  });
};

// 모바일용 그리드 구조
const getMobileColumns = () => {
  return createGridColumns(
    GRID_CONFIG.MOBILE.COLUMNS,
    GRID_CONFIG.MOBILE.ROWS
  );
};

// 데스크탑용 그리드 구조
const getDesktopColumns = () => {
  return createGridColumns(GRID_COLUMNS, GRID_ROWS);
};

// 모드 감지 헬퍼 함수들
const getCurrentMode = () => {
  const width = window.innerWidth;
  if (width <= BREAKPOINTS.MOBILE) return 'mobile';
  if (width <= BREAKPOINTS.TABLET) return 'tablet';
  return 'desktop';
};

const DraggableGrid = () => {
  const [activeDetailId, setActiveDetailId] = useState(null);
  const [tooltip, setTooltip] = useState({ show: false, title: '', designer: '', x: 0, y: 0 });
  const [isMobileView, setIsMobileView] = useState(() => window.innerWidth <= 799);
  const [currentMode] = useState(() => getCurrentMode());
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const detailsRef = useRef(null);
  const detailsThumbRef = useRef(null);
  const crossRef = useRef(null);
  const productRefs = useRef([]);
  const tooltipRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const resizeTimeoutRef = useRef(null);

  productRefs.current = [];

  // 화면 크기 변경 시 모드 감지 및 페이지 리로드
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 799);
      
      const newMode = getCurrentMode();
      
      // 모드가 변경되었을 때만 페이지 리로드
      if (newMode !== currentMode) {
        // 디바운싱을 위해 약간의 지연 추가
        if (resizeTimeoutRef.current) {
          clearTimeout(resizeTimeoutRef.current);
        }
        
        resizeTimeoutRef.current = setTimeout(() => {
          // 모드 변경 확인 (사이즈 변경이 완료된 후)
          const finalMode = getCurrentMode();
          if (finalMode !== currentMode) {
            // 페이지 리로드하여 시작 애니메이션부터 다시 보여지게
            window.location.reload();
          }
        }, 300); // 300ms 디바운스
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [currentMode]);

  // 모바일/데스크탑에 따라 다른 columns 사용
  const displayColumns = isMobileView ? getMobileColumns() : getDesktopColumns();

  // 마우스 이동 시 툴팁 위치 업데이트
  useEffect(() => {
    if (!tooltip.show) return;

    const handleMouseMove = (event) => {
      if (tooltipRef.current) {
        tooltipRef.current.style.left = `${event.clientX + 15}px`;
        tooltipRef.current.style.top = `${event.clientY + 15}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [tooltip.show]);

  // 작품 상세 페이지로 이동
  const handleViewWork = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('handleViewWork called', { activeDetailId });
    
    if (!activeDetailId) {
      console.warn('No activeDetailId');
      return;
    }
    
    const activeProduct = PRODUCTS.find((p) => p.id === activeDetailId);
    if (!activeProduct) {
      console.warn('Product not found for id:', activeDetailId);
      return;
    }

    console.log('Active product:', activeProduct);

    const normalizeTitle = (title) => 
      title ? title.toLowerCase().normalize('NFKD').replace(/[^\p{L}\p{N}]+/gu, '') : '';
    
    let work = null;
    
    // 1. designer 필드가 있으면 직접 매칭
    if (activeProduct.designer && activeProduct.workTitle) {
      work = WORKS_LIST.find((w) => 
        w.designer === activeProduct.designer && 
        normalizeTitle(w.title) === normalizeTitle(activeProduct.workTitle)
      );
      console.log('Matched by designer + workTitle:', work);
    }
    
    // 2. designer 필드만 있으면 designer로 매칭
    if (!work && activeProduct.designer) {
      const designerWorks = WORKS_LIST.filter((w) => w.designer === activeProduct.designer);
      if (designerWorks.length === 1) {
        work = designerWorks[0];
        console.log('Matched by designer (single work):', work);
      } else if (designerWorks.length > 1) {
        // 여러 작품이 있으면 제목으로 매칭 시도
        work = designerWorks.find((w) => 
          normalizeTitle(w.title) === normalizeTitle(activeProduct.title) ||
          normalizeTitle(w.title) === normalizeTitle(activeProduct.workTitle || '')
        );
        console.log('Matched by designer + title:', work);
      }
    }
    
    // 3. 제목으로 매칭 (기존 방식)
    if (!work) {
      work = WORKS_LIST.find((w) => 
        normalizeTitle(w.title) === normalizeTitle(activeProduct.title)
      );
      console.log('Matched by title:', work);
    }

    if (!work) {
      console.warn('Work not found for product:', activeProduct);
      console.log('Available works:', WORKS_LIST.map(w => ({ title: w.title, designer: w.designer })));
      return;
    }

    if (!work?.designer) {
      console.warn('Work designer not found:', work);
      return;
    }

    console.log('Navigating to designer:', work.designer);

    // 상세창 닫기 및 상태 초기화
    const details = detailsRef.current;
    const container = containerRef.current;
    
    if (details && container) {
      // 클래스 제거
      details.classList.remove('--is-showing');
      container.classList.remove('--is-details-showing');
      
      // body 클래스 제거 (헤더 표시를 위해)
      document.body.classList.remove('cursor-cross', 'cross-locked', 'header-hidden', 'details-open');
      document.body.classList.remove('is-modal-open');
      document.documentElement.classList.remove('is-modal-open');
      const root = document.getElementById('root');
      if (root) {
        root.classList.remove('is-modal-open');
      }
      
      // 헤더 다시 표시
      const header = document.querySelector('.header');
      if (header) {
        gsap.set(header, {
          y: 0,
          opacity: 1,
        });
        header.style.pointerEvents = 'auto';
      }
    }
    
    // 상태 초기화
    setActiveDetailId(null);
    
    // 약간의 지연 후 네비게이션 (상세창 닫기 애니메이션 완료 대기)
    setTimeout(() => {
      const encoded = encodeURIComponent(work.designer);
      // 작품 ID를 쿼리 파라미터로 추가 (work.id가 우선, 없으면 activeProduct.id 사용)
      const workId = work.id || activeProduct.id;
      const targetPath = workId 
        ? `/designer/${encoded}?work=${encodeURIComponent(workId)}`
        : `/designer/${encoded}`;
      
      console.log('Navigating to work page:', { 
        targetPath, 
        workId, 
        designer: work.designer,
        workTitle: work.title,
        activeProductId: activeProduct.id
      });
      
      // window.__navigate를 사용하거나 기본 방식 사용
      if (window.__navigate) {
        window.__navigate(targetPath);
      } else {
        window.history.pushState({}, '', targetPath);
        window.dispatchEvent(new PopStateEvent('popstate'));
        window.dispatchEvent(new Event('locationchange'));
      }
    }, 100);
  };

  useEffect(() => {
    document.body.classList.add('loading');

    const container = containerRef.current;
    const grid = gridRef.current;
    const productDivs = [...grid.querySelectorAll('.product div')];
    const products = [...grid.querySelectorAll('.product')];
    const details = detailsRef.current;
    const detailsThumb = detailsThumbRef.current;
    const cross = crossRef.current;

    if (!container || !grid || !details || !detailsThumb || products.length === 0) {
      document.body.classList.remove('loading');
      return undefined;
    }

    // 상세창 초기 위치 설정 (화면 밖으로)
    const width = window.innerWidth;
    let initialDetailsX;
    if (width <= 799) {
      initialDetailsX = '100vw'; // 모바일
    } else if (width <= 1279) {
      initialDetailsX = '60vw'; // 태블릿
    } else {
      initialDetailsX = '50vw'; // 데스크탑
    }
    gsap.set(details, { 
      x: initialDetailsX, 
      opacity: 0, 
      display: 'none',
      pointerEvents: 'none'
    });
    
    // cross 버튼 초기 상태 설정
    if (cross) {
      const isMobileDevice = window.innerWidth <= 799;
      if (isMobileDevice) {
        // 모바일: 위치 고정 (CSS에서 right: 16px, top: 16px)
        gsap.set(cross, {
          scale: 0,
          opacity: 0,
          pointerEvents: 'none',
          x: 0,
          y: 0,
        });
      } else {
        // 데스크탑: 초기 위치 설정
        gsap.set(cross, {
          scale: 0,
          opacity: 0,
          pointerEvents: 'none',
        });
      }
    }

    let observer;
    let showDetailsActive = false;
    let isShowingDetails = false; // 연타 방지용 플래그
    let lockedGridY = null; // 상세창이 열려있을 때 그리드 Y 위치 고정값
    let currentProduct = null;
    let originalParent = null;
    let productClickHandlers = [];
    let containerClickHandler;
    let crossClickHandler;
    let onMouseMove;
    let titles = [];
    let texts = [];
    let splitTitlesData = [];
    let splitTextsData = [];

    // ========== 유틸리티 함수 ==========
    const getViewportSize = () => {
      // container의 실제 크기 사용
      // 높이는 헤더 높이를 고려한 뷰포트 높이 사용
      const rect = container.getBoundingClientRect();
      const gridHeight = grid.offsetHeight;
      
      // 헤더 높이 가져오기
      const headerHeight = window.innerWidth <= 799 ? 60 : window.innerWidth <= 1279 ? 68 : 100;
      // 뷰포트 높이에서 헤더 높이를 뺀 값 사용
      const viewportHeight = window.innerHeight - headerHeight;
      
      // container의 실제 높이, 뷰포트 높이, 그리드 높이 중 가장 큰 값 사용
      // 그리드가 container보다 크면 그리드 높이를 사용하여 잘림 방지
      const height = Math.max(rect.height, viewportHeight, gridHeight || 0);
      
      return { width: rect.width, height: height };
    };

    // getResponsiveDetailsWidth 함수는 더 이상 사용되지 않아 제거되었습니다.

    const getResponsiveDetailsX = (isOpen) => {
      const { width } = getViewportSize();
      if (width < 768) {
        return isOpen ? '0' : '100vw'; // 모바일
      }
      if (width < 1024) {
        return isOpen ? '0' : '60vw'; // 태블릿
      }
      return isOpen ? '0' : '50vw'; // 데스크탑
    };

    const getResponsiveContainerX = (isOpen) => {
      const { width } = getViewportSize();
      if (width < 768) {
        return isOpen ? '-100vw' : '0'; // 모바일
      }
      if (width < 1024) {
        return isOpen ? '-60vw' : '0'; // 태블릿
      }
      return isOpen ? '-50vw' : '0'; // 데스크탑
    };

    const centerGrid = () => {
      // 상세창이 열려있을 때는 그리드 위치를 전혀 변경하지 않음
      if (showDetailsActive && lockedGridY !== null) {
        // 상세창이 열려있으면 그리드 위치를 절대 변경하지 않음
        return;
      }
      
      const gridWidth = grid.offsetWidth;
      const gridHeight = grid.offsetHeight;
      
      // container의 높이가 그리드 높이 이상인지 확인하고 필요시 업데이트
      // 애니메이션 시작 시 그리드가 잘리지 않도록 보장
      if (gridHeight > 0) {
        const containerHeight = container.offsetHeight;
        if (containerHeight < gridHeight) {
          container.style.height = `${gridHeight}px`;
          // 관련 컨테이너들도 업데이트
          const draggableStage = container.closest('.draggable-stage');
          if (draggableStage) {
            draggableStage.style.height = `${gridHeight}px`;
          }
          const mainPage = document.querySelector('.main-page--grid');
          if (mainPage) {
            mainPage.style.height = `${gridHeight}px`;
          }
        }
      }
      
      const { width, height } = getViewportSize();
      
      // 모바일에서는 그리드가 상단에 고정되고 드래그 가능해야 함
      const isMobileDevice = isMobile();
      
      // container의 실제 크기를 기준으로 중앙 정렬
      // grid는 container 내부에 있고, position: absolute
      // grid의 x 위치는 container의 왼쪽 상단(0, 0)을 기준
      let centerX = (width - gridWidth) / 2;
      
      // 그리드가 container보다 크면 왼쪽부터 시작 (오른쪽 칼럼이 잘리지 않도록)
      if (gridWidth > width) {
        centerX = 0;
      } else {
        // 그리드가 container보다 작으면 중앙 정렬하되, 왼쪽이 음수가 되지 않도록
        centerX = Math.max(0, centerX);
        // 오른쪽이 잘리지 않도록 확인
        if (centerX + gridWidth > width) {
          centerX = width - gridWidth;
        }
      }
      
      let finalY = 0;
      let finalX = Math.max(0, Math.min(centerX, width - gridWidth));
      
      // 모바일이 아닐 때만 Y 위치 중앙 정렬 계산
      if (!isMobileDevice) {
        // Y 위치 계산
        // 세로 중앙 정렬
        // scale 0.5일 때도 그리드가 화면 안에 있도록 위치 계산
        // container가 scale 0.5일 때 container의 높이도 height * 0.5
        // grid의 높이도 gridHeight * 0.5
        // scale 0.5 기준으로 위치를 계산한 후, scale 1 기준으로 역산
        const scaledHeight = height * 0.5;
        const scaledGridHeight = gridHeight * 0.5;
        
        let centerY = (scaledHeight - scaledGridHeight) / 2;
        
        // 그리드가 container보다 크면 위아래가 잘리지 않도록 조정
        if (scaledGridHeight > scaledHeight) {
          // 그리드가 container보다 크면 상단에 맞춤 (하단이 잘리지 않도록)
          centerY = 0;
        } else {
          // 그리드가 container보다 작으면 중앙 정렬
          // 하지만 하단이 잘리지 않도록 확인
          const maxCenterY = scaledHeight - scaledGridHeight;
          if (centerY > maxCenterY) {
            centerY = maxCenterY;
          }
          // 상단도 확인
          if (centerY < 0) {
            centerY = 0;
          }
        }
        
        // scale 1 기준으로 위치를 역산
        // scale 0.5일 때 centerY가 되려면, scale 1일 때는 centerY * 2
        // transform-origin이 center center이므로, container의 중심점을 기준으로 scale됨
        // container의 중심점은 height / 2
        // scale 0.5일 때: grid의 중심점이 container의 중심점에 가까워짐
        // scale 1일 때: grid의 중심점이 원래 위치로 돌아감
        // 따라서 scale 1일 때의 위치는: centerY * 2
        const scale1Y = centerY * 2;
        
        // 상단 경계 확인
        finalY = Math.max(0, Math.min(scale1Y, height - gridHeight));
        // 하단 경계 확인 (그리드가 container 밖으로 나가지 않도록)
        const maxY = height - gridHeight;
        finalY = Math.min(finalY, maxY);
      } else {
        // 모바일: Y 위치는 항상 0 (상단 고정, 드래그 가능)
        finalY = 0;
      }
      
      gsap.set(grid, {
        x: finalX,
        y: finalY,
      });
    };

    // ========== 드래그 및 스크롤 관련 ==========
    const isMobile = () => {
      return window.innerWidth <= 799;
    };

    const isTablet = () => {
      return window.innerWidth >= 800 && window.innerWidth <= 1279;
    };

    const isDesktop = () => {
      return window.innerWidth >= 1280;
    };

    const setupGrid = () => {
      container.classList.add('--is-loaded');
      
      // 디바이스별 클래스 추가 (이미 있으면 추가하지 않음)
      if (isMobile()) {
        if (!container.classList.contains('--is-mobile')) {
          container.classList.add('--is-mobile');
        }
        if (!grid.classList.contains('--is-mobile')) {
          grid.classList.add('--is-mobile');
        }
      } else if (isTablet()) {
        if (!grid.classList.contains('--is-tablet')) {
          grid.classList.add('--is-tablet');
        }
      } else if (isDesktop()) {
        if (!grid.classList.contains('--is-desktop')) {
          grid.classList.add('--is-desktop');
        }
      }

      // 레이아웃이 완전히 계산되기를 기다린 후 centerGrid 호출
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          centerGrid();
        });
      });
    };

    const updateBounds = () => {
      // container 높이를 grid 높이에 맞춤 (헤더 높이 고려)
      const gridHeight = grid.offsetHeight;
      const headerHeight = window.innerWidth <= 799 ? 60 : window.innerWidth <= 1279 ? 68 : 100;
      const minHeight = window.innerHeight - headerHeight;
      
      if (gridHeight > 0) {
        // grid 높이와 최소 높이(헤더 높이 고려) 중 더 큰 값 사용
        const finalHeight = Math.max(gridHeight, minHeight);
        container.style.height = `${finalHeight}px`;
        container.style.minHeight = `${minHeight}px`;
        
        const draggableStage = container.closest('.draggable-stage');
        if (draggableStage) {
          draggableStage.style.height = `${finalHeight}px`;
          draggableStage.style.minHeight = `${minHeight}px`;
        }
        
        // main-window__container--grid도 헤더 높이 고려
        const mainWindowContainer = container.closest('.main-window__container--grid');
        if (mainWindowContainer) {
          mainWindowContainer.style.minHeight = `${minHeight}px`;
        }
        
        // main-page--grid의 높이도 grid에 맞춤 (헤더 높이는 포함하지 않음)
        const mainPage = document.querySelector('.main-page--grid');
        if (mainPage) {
          mainPage.style.height = `${finalHeight}px`;
          mainPage.style.minHeight = `${minHeight}px`;
        }
      }

      if (!showDetailsActive) {
        centerGrid();
      }
      // 상세창이 열려있을 때는 그리드 위치를 전혀 변경하지 않음
    };


    const handleCursor = (event) => {
      // 모바일에서는 X 버튼이 마우스를 따라오지 않도록
      const isMobileDevice = window.innerWidth <= 799;
      if (isMobileDevice || !cross) return;
      
      gsap.to(cross, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.25,
        ease: 'power2.out',
      });
    };

    // ========== 제품 관련 ==========
    const observeProducts = () => {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.target === currentProduct) return;

          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: 'power2.out',
            });
          } else {
            gsap.to(entry.target, {
              opacity: 0,
              scale: 0.5,
              duration: 0.5,
              ease: 'power2.in',
            });
          }
        });
      }, {
        root: null,
        threshold: 0.1,
      });

      productDivs.forEach((product) => observer.observe(product));
    };

    const flipProduct = (product) => {
      if (detailsThumb) detailsThumb.innerHTML = '';

      // product는 .product 요소이므로, 내부 div를 찾아야 함
      const productDiv = product.querySelector('div[data-id]') || product;
      currentProduct = productDiv;
      originalParent = productDiv.parentNode;

      if (observer) observer.unobserve(productDiv);

      // 그리드의 thumb 작아지기
      gsap.to(productDiv, {
        scale: 0,
        duration: 0.6,
        ease: 'power3.inOut',
      });

      // 상세창 thumb 생성 및 나타나기
      const productImg = product.querySelector('img');
      if (productImg && detailsThumb) {
        const thumbImg = document.createElement('img');
        thumbImg.src = productImg.src;
        thumbImg.alt = productImg.alt || '';
        thumbImg.style.width = '100%';
        thumbImg.style.height = '100%';
        thumbImg.style.objectFit = 'cover';
        thumbImg.style.borderRadius = 'inherit';
        
        detailsThumb.appendChild(thumbImg);
        
        // 상세창 thumb 나타나기
        gsap.fromTo(thumbImg,
          { scale: 0, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            duration: 0.6, 
            delay: 0.3,
            ease: 'power3.inOut' 
          }
        );
      }

      if (cross) {
        // cross 버튼 초기 상태 설정
        // 모바일에서는 위치가 다르므로 확인
        const isMobileDevice = window.innerWidth <= 799;
        if (isMobileDevice) {
          // 모바일: 상세창 왼쪽 상단에 고정 (CSS에서 left: 16px, top: 16px)
          gsap.set(cross, {
            opacity: 1,
            pointerEvents: 'auto',
            x: 0,
            y: 0,
            scale: 0,
          });
        } else {
          // 데스크탑: 마우스 위치로 설정
          gsap.set(cross, {
            opacity: 1,
            pointerEvents: 'auto',
            scale: 0,
          });
        }
        gsap.to(cross, {
          scale: 1,
          duration: 0.4,
          delay: 0.5,
          ease: 'power2.out',
        });
      }
    };

    const unFlipProduct = () => {
      if (!currentProduct || !originalParent) return;

      if (cross) {
        gsap.to(cross, {
          scale: 0,
          duration: 0.4,
          ease: 'power2.out',
        });
      }

      // 상세창 thumb 사라지기와 상세창 닫기를 거의 동시에 실행
      const thumbImg = detailsThumb?.querySelector('img');
      if (thumbImg) {
        gsap.to(thumbImg, {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'power3.inOut',
          onComplete: () => {
            if (detailsThumb) detailsThumb.innerHTML = '';
          },
        });
      }

      // 상세창 닫기 (thumb 사라지기와 거의 동시에)
      container.classList.remove('--is-details-showing');
      // container 높이를 grid 높이에 다시 맞춤 (헤더 높이 고려)
      const gridHeight = grid.offsetHeight;
      const headerHeight = window.innerWidth <= 799 ? 60 : window.innerWidth <= 1279 ? 68 : 100;
      const minHeight = window.innerHeight - headerHeight;
      
      if (gridHeight > 0) {
        // grid 높이와 최소 높이(헤더 높이 고려) 중 더 큰 값 사용
        const finalHeight = Math.max(gridHeight, minHeight);
        container.style.height = `${finalHeight}px`;
        container.style.minHeight = `${minHeight}px`;
        
        const draggableStage = container.closest('.draggable-stage');
        if (draggableStage) {
          draggableStage.style.height = `${finalHeight}px`;
          draggableStage.style.minHeight = `${minHeight}px`;
        }
        
        // main-window__container--grid도 헤더 높이 고려
        const mainWindowContainer = container.closest('.main-window__container--grid');
        if (mainWindowContainer) {
          mainWindowContainer.style.minHeight = `${minHeight}px`;
        }
        
        // main-page--grid의 높이도 grid에 맞춤 (헤더 높이는 포함하지 않음)
        const mainPage = document.querySelector('.main-page--grid');
        if (mainPage) {
          mainPage.style.height = `${finalHeight}px`;
          mainPage.style.minHeight = `${minHeight}px`;
        }
      } else {
        container.style.height = '';
        const mainPage = document.querySelector('.main-page--grid');
        if (mainPage) {
          mainPage.style.height = '';
          mainPage.style.minHeight = '';
        }
      }
      
      const containerX = getResponsiveContainerX(false);
      const detailsX = getResponsiveDetailsX(false);
      
      gsap.to(container, {
        x: containerX,
        duration: 1.2,
        ease: 'power3.inOut',
      });

      gsap.to(details, {
        x: detailsX,
        duration: 1.2,
        ease: 'power3.inOut',
        onComplete: () => {
          details.classList.remove('--is-showing');
          // 상세창 완전히 숨기기
          gsap.set(details, {
            opacity: 0,
            display: 'none',
            pointerEvents: 'none'
          });
        },
      });

      // 그리드의 thumb 커지기
      gsap.to(currentProduct, {
        scale: 1,
        duration: 0.4,
        delay: 0.1,
        ease: 'power3.inOut',
        onComplete: () => {
          if (observer && currentProduct) {
            observer.observe(currentProduct);
          }

          currentProduct = null;
          originalParent = null;
        },
      });
    };

    // ========== 상세창 관련 ==========
    const handleDetailsMouseEnter = () => {
      if (cross) {
        gsap.to(cross, { opacity: 0, duration: 0.2 });
      }
    };

    const handleDetailsMouseLeave = () => {
      if (cross) {
        gsap.to(cross, { opacity: 1, duration: 0.2 });
      }
    };

    const showDetails = (product) => {
      // 연타 방지 및 유효성 검사
      if (!product) {
        console.warn('showDetails: product is null or undefined');
        return;
      }
      if (showDetailsActive || isShowingDetails) {
        console.warn('showDetails: already showing details or in progress', { showDetailsActive, isShowingDetails });
        return;
      }
      if (!details || !container || !grid) {
        console.warn('showDetails: required elements not found', { details: !!details, container: !!container, grid: !!grid });
        return;
      }
      
      try {
        isShowingDetails = true;
        showDetailsActive = true;
      
      // 그리드 Y 위치를 미리 저장하고 고정 (container 높이 변경 전에 저장)
      const currentGridY = parseFloat(gsap.getProperty(grid, 'y')) || 0;
      // container의 padding-top을 제거했으므로 그리드 위치는 그대로 유지
      lockedGridY = currentGridY;
      
      // 상세창 초기 위치 설정
      const initialDetailsX = getResponsiveDetailsX(false);
      // 디바이스별 상단 패딩 (그리드 상단 패딩과 동일하게)
      const headerHeight = window.innerWidth <= 799 ? 60 : window.innerWidth <= 1279 ? 68 : 100;
      const topPadding = window.innerWidth <= 799 ? 40 : window.innerWidth <= 1279 ? headerHeight + 28 : headerHeight + 40;
      // 보이는 순간 상/하 패딩을 그리드 상단 패딩과 동일하게 설정
      // 상세창을 먼저 보이게 설정 (display와 opacity를 먼저 설정)
      details.style.display = 'flex';
      details.style.opacity = '1';
      details.style.pointerEvents = 'auto';
      details.style.visibility = 'visible';
      gsap.set(details, { 
        x: initialDetailsX, 
        opacity: 1, 
        display: 'flex', 
        paddingTop: topPadding, 
        paddingBottom: 100,
        pointerEvents: 'auto',
        visibility: 'visible'
      });
      
      details.classList.add('--is-showing');
      container.classList.add('--is-details-showing');
      
      // 그리드 높이에 맞춰 container 높이 설정
      // 상세창이 열릴 때 그리드 위치를 고정하여 올라가지 않도록 함
      // 푸터가 사라진 후 레이아웃이 변경되므로, 약간의 지연 후 높이 재계산
      const updateContainerHeight = () => {
        const gridHeight = grid.offsetHeight;
        // grid는 position: absolute이고 top: 0이므로, container의 padding-top과 grid의 padding이 겹침
        // container 높이를 grid의 offsetHeight와 정확히 일치시켜야 함
        // grid의 offsetHeight는 이미 패딩을 포함한 전체 높이이므로, container 높이도 동일하게 설정
        const containerHeight = gridHeight;
        container.style.height = `${containerHeight}px`;
      };
      
      // 즉시 높이 설정 및 그리드 위치 고정
      updateContainerHeight();
      const currentGridX = parseFloat(gsap.getProperty(grid, 'x')) || 0;
      gsap.set(grid, { 
        x: currentGridX,
        y: lockedGridY 
      });
      
      // 푸터가 사라진 후 레이아웃 재계산을 위해 한 번만 확인
      requestAnimationFrame(() => {
        if (showDetailsActive && lockedGridY !== null) {
          updateContainerHeight();
          gsap.set(grid, { 
            x: currentGridX,
            y: lockedGridY 
          });
        }
      });
      
      // isShowingDetails 플래그 해제 (초기화 완료 후)
      requestAnimationFrame(() => {
        isShowingDetails = false;
      });
      
      // 상세창이 열렸을 때는 그리드 조작 비활성화
      
      // 상세창 영역에 마우스 이벤트 추가 (모바일 제외)
      const isMobileDevice = window.innerWidth <= 799;
      
      // 헤더 요소 찾기 및 애니메이션
      const header = document.querySelector('.header');
      if (header) {
        // 헤더의 현재 transform을 확인하고 GSAP로 애니메이션
        gsap.fromTo(header, 
          {
            y: 0,
            opacity: 1
          },
          {
            y: -header.offsetHeight,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.inOut',
            onComplete: () => {
              header.style.pointerEvents = 'none';
            }
          }
        );
      }
      
      if (!isMobileDevice) {
        details.addEventListener('mouseenter', handleDetailsMouseEnter);
        details.addEventListener('mouseleave', handleDetailsMouseLeave);
        document.body.classList.add('cursor-cross', 'cross-locked', 'header-hidden', 'details-open');
        
        // 데스크탑에서 마우스 이동 이벤트 리스너 추가
        if (!onMouseMove) {
          onMouseMove = (event) => {
            if (showDetailsActive) {
              handleCursor(event);
            }
          };
          window.addEventListener('mousemove', onMouseMove);
        }
      } else {
        // 모바일에서는 cursor-cross 효과 없음
        document.body.classList.add('header-hidden', 'details-open');
      }

      const containerX = getResponsiveContainerX(true);
      const detailsX = getResponsiveDetailsX(true);

      // container만 왼쪽으로 이동 (그리드는 container 내부에 있어서 함께 이동)
      // 그리드 자체의 위치는 변경하지 않음
      gsap.to(container, {
        x: containerX,
        duration: 0.8,
        ease: 'power3.inOut',
        onUpdate: () => {
          // 애니메이션 중에도 그리드 위치 고정 유지
          gsap.set(grid, { 
            x: currentGridX,
            y: lockedGridY 
          });
        },
      });

      gsap.to(details, {
        x: detailsX,
        duration: 0.8,
        ease: 'power3.inOut',
        onStart: () => {
          // 애니메이션 시작 시에도 한 번 더 보장 (그리드 상단 패딩과 동일하게)
          gsap.set(details, { 
            paddingTop: topPadding, 
            paddingBottom: 100,
            display: 'flex',
            opacity: 1,
            pointerEvents: 'auto',
            visibility: 'visible'
          });
        },
        onComplete: () => {
          // 애니메이션 완료 후에도 확실히 보이도록 설정
          details.style.display = 'flex';
          details.style.opacity = '1';
          details.style.pointerEvents = 'auto';
          details.style.visibility = 'visible';
        }
      });

      // product는 .product 요소이므로, 내부 div에서 data-id를 가져와야 함
      const productDiv = product.querySelector('div[data-id]');
      const productId = productDiv ? productDiv.dataset.id : product.dataset.id;
      
      // product 유효성 검사
      if (!productId) {
        console.warn('Product ID not found', product, { productDiv, product });
        isShowingDetails = false;
        showDetailsActive = false;
        lockedGridY = null;
        return;
      }
      
      const numericProductId = Number(productId);
      
      // 유효하지 않은 productId인 경우
      if (isNaN(numericProductId) || numericProductId <= 0) {
        console.warn('Invalid product ID', productId, { product, productDiv });
        isShowingDetails = false;
        showDetailsActive = false;
        lockedGridY = null;
        return;
      }
      
      const titleIndex = detailsData.findIndex((detail) => detail.id.toString() === productId);
      
      // titleIndex가 -1이어도 상세창은 열 수 있도록 허용 (에러 방지)

      setActiveDetailId(numericProductId);

      flipProduct(product);

      // CTA 버튼 초기 상태 설정
      const ctaButton = details.querySelector('.details__cta-button');
      if (ctaButton) {
        gsap.set(ctaButton, { y: '100%', opacity: 0 });
        ctaButton.style.pointerEvents = 'none';
      }

      if (titleIndex >= 0) {
        titles.forEach((title) => title.classList.remove('is-active'));
        texts.forEach((text) => text.classList.remove('is-active'));

        const activeTitle = titles[titleIndex];
        const activeText = texts[titleIndex];

        if (activeTitle) {
          activeTitle.classList.add('is-active');
        }

        if (activeText) {
          activeText.classList.add('is-active');
        }

        const titleChars = splitTitlesData[titleIndex]?.chars || [];
        const textLines = splitTextsData[titleIndex]?.lines || [];

        if (titleChars.length > 0) {
          gsap.to(titleChars, {
            y: 0,
            duration: 1.1,
            delay: 0.4,
            ease: 'power3.inOut',
            stagger: 0.025,
          });
        }

        if (textLines.length > 0) {
          gsap.to(textLines, {
            y: 0,
            duration: 1.1,
            delay: 0.4,
            ease: 'power3.inOut',
            stagger: 0.05,
          });
        }
      }
      
      // CTA 버튼 애니메이션 (항상 실행)
      if (ctaButton) {
        // 즉시 pointer-events 활성화 (애니메이션과 관계없이 클릭 가능하도록)
        ctaButton.style.pointerEvents = 'auto';
        ctaButton.style.cursor = 'pointer';
        ctaButton.style.zIndex = '100';
        ctaButton.style.position = 'relative';
        
        gsap.to(ctaButton, {
          y: 0,
          opacity: 1,
          duration: 1.1,
          delay: 0.4,
          ease: 'power3.inOut',
          onComplete: () => {
            // 애니메이션 완료 후에도 확실히 활성화
            ctaButton.style.pointerEvents = 'auto';
            ctaButton.style.cursor = 'pointer';
            ctaButton.style.zIndex = '100';
            console.log('CTA button animation complete, pointer-events:', ctaButton.style.pointerEvents);
          },
        });
      }
      } catch (error) {
        // 에러 발생 시 상태 리셋
        console.error('Error in showDetails:', error, { product, productId: product?.querySelector('div[data-id]')?.dataset?.id });
        isShowingDetails = false;
        showDetailsActive = false;
        lockedGridY = null;
      }
    };

    const hideDetails = () => {
      if (!showDetailsActive) return;
      
      // 상태 초기화
      isShowingDetails = false;
      showDetailsActive = false;
      lockedGridY = null; // 그리드 Y 위치 고정 해제
      
      // 상세창 영역 마우스 이벤트 제거
      // 모바일에서는 마우스 이벤트 리스너가 없을 수 있음
      const isMobileDevice = window.innerWidth <= 799;
      if (!isMobileDevice) {
        details.removeEventListener('mouseenter', handleDetailsMouseEnter);
        details.removeEventListener('mouseleave', handleDetailsMouseLeave);
      }
      
      // 상세창이 닫혔을 때는 그리드 조작 활성화
      
      // 헤더 다시 표시 애니메이션
      const header = document.querySelector('.header');
      if (header) {
        gsap.to(header, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.inOut',
        });
      }
      
      // 모바일에서는 cursor-cross 클래스가 없을 수 있음
      if (!isMobileDevice) {
        document.body.classList.remove('cursor-cross', 'cross-locked', 'header-hidden', 'details-open');
      } else {
        document.body.classList.remove('header-hidden', 'details-open');
      }
      
      // is-modal-open 클래스 제거 (다른 모달 시스템과 호환을 위해)
      document.body.classList.remove('is-modal-open');
      document.documentElement.classList.remove('is-modal-open');
      const root = document.getElementById('root');
      if (root) {
        root.classList.remove('is-modal-open');
      }

      titles.forEach((title) => {
        const chars = title.querySelectorAll('.char');
        title.classList.remove('is-active');
        if (chars.length > 0) {
          gsap.to(chars, {
            y: '100%',
            duration: 0.6,
            ease: 'power3.inOut',
            stagger: { amount: 0.025, from: 'end' },
          });
        }
      });

      texts.forEach((text) => {
        const lines = text.querySelectorAll('.line');
        text.classList.remove('is-active');
        if (lines.length > 0) {
          gsap.to(lines, {
            y: '100%',
            duration: 0.6,
            ease: 'power3.inOut',
            stagger: 0.05,
          });
        }
      });

      // CTA 버튼 애니메이션
      const ctaButton = details.querySelector('.details__cta-button');
      if (ctaButton) {
        ctaButton.style.pointerEvents = 'none';
        gsap.to(ctaButton, {
          y: '100%',
          opacity: 0,
          duration: 0.6,
          ease: 'power3.inOut',
        });
      }

      unFlipProduct();
      if (!currentProduct && cross) {
        gsap.to(cross, {
          scale: 0,
          duration: 0.4,
          ease: 'power2.out',
        });
      }
      setActiveDetailId(null);
    };

    // 작품 호버 시 툴팁 표시
    const handleProductHover = (event, productId) => {
      const product = PRODUCTS.find((p) => p.id === productId);
      if (!product) return;

      // 제목 정규화
      const normalizeTitle = (title) => {
        if (!title) return '';
        return title.toLowerCase().normalize('NFKD').replace(/[^\p{L}\p{N}]+/gu, '').trim();
      };
      
      // 제목 매핑
      const titleMap = {
        '더 고딕': 'The Gothic',
        '더 웨폰': 'The Weapon',
        '돌로르사가': 'Dolor Saga',
        '피에르 위그: 리미널 가이드앱 UX/UI': 'Pierre Huyghe: Liminal 가이드앱 UXUI',
        '2025 Animation Reel': '2025 Animation reel',
        'PLEDGE': 'PLEDGE',
      };
      
      // 작품 정보 찾기
      let work = null;
      const mappedTitle = titleMap[product.title];
      if (mappedTitle) {
        work = WORKS_LIST.find((w) => w.title === mappedTitle);
      }
      if (!work) {
        work = WORKS_LIST.find((w) => normalizeTitle(w.title) === normalizeTitle(product.title));
      }
      
      // 표시할 정보
      let displayTitle = product.title;
      let displayDesigner = '';
      
      if (work) {
        displayTitle = work.title;
        displayDesigner = work.designer;
      } else if (product.file) {
        const fileParts = product.file.split('_');
        if (fileParts.length >= 2) {
          displayDesigner = fileParts[1];
        }
      }
      
      // 타이머 취소
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      
      // 툴팁 표시 및 초기 위치 설정
      setTooltip({
        show: true,
        title: displayTitle,
        designer: displayDesigner,
        x: event.clientX,
        y: event.clientY,
      });
      
      // 초기 위치 즉시 설정
      if (tooltipRef.current) {
        tooltipRef.current.style.left = `${event.clientX + 15}px`;
        tooltipRef.current.style.top = `${event.clientY + 15}px`;
      }
    };

    // 작품 호버 해제
    const handleProductHoverLeave = (event) => {
      // 다른 작품 요소로 이동하는 경우 타이머 설정하지 않음
      const relatedTarget = event.relatedTarget;
      if (relatedTarget && (
        relatedTarget.closest('.product') || 
        relatedTarget.closest('.product div')
      )) {
        return;
      }
      
      hoverTimeoutRef.current = setTimeout(() => {
        setTooltip({ show: false, title: '', designer: '', x: 0, y: 0 });
      }, 150);
    };

    const handleDetails = () => {
      titles = Array.from(details.querySelectorAll('.details__title p'));
      texts = Array.from(details.querySelectorAll('.details__body [data-text]'));
      const ctaButton = details.querySelector('.details__cta-button');

      splitTitlesData = titles.map((title) => splitText(title, 'lines, chars'));
      splitTextsData = texts.map(() => ({ lines: [] }));

      titles.forEach((title) => title.classList.remove('is-active'));
      texts.forEach((text) => text.classList.remove('is-active'));
      
      // CTA 버튼 초기 상태 설정
      if (ctaButton) {
        gsap.set(ctaButton, { y: '100%', opacity: 0 });
        ctaButton.style.pointerEvents = 'none';
      }

      // 제품 클릭 및 호버 핸들러
      const productDragStates = new Map();
      const isMobileDevice = isMobile();
      
      productClickHandlers = products.map((product) => {
        const productDiv = product.querySelector('div[data-id]');
        if (!productDiv) {
          console.warn('Product div not found for product:', product);
          return null;
        }
        
        const productId = productDiv.dataset.id;
        const numericProductId = Number(productId);
        let touchStartX = 0;
        let touchStartY = 0;
        let hasMoved = false;
        
        const handler = (event) => {
          try {
            // 모바일에서만 드래그 상태 확인
            const dragState = productDragStates.get(productId);
            if (isMobileDevice && dragState === true) {
              event.preventDefault();
              event.stopPropagation();
              return;
            }
            event.stopPropagation();
            showDetails(product);
          } catch (error) {
            console.error('Error in product click handler:', error, { product, productId });
          }
        };
        
        // 터치 시작 (모바일만)
        const touchStartHandler = (e) => {
          if (!isMobileDevice) return;
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
          hasMoved = false;
          productDragStates.set(productId, false);
        };
        
        // 터치 이동 (모바일만)
        const touchMoveHandler = (e) => {
          if (!isMobileDevice) return;
          if (!touchStartX || !touchStartY) return;
          const touchX = e.touches[0].clientX;
          const touchY = e.touches[0].clientY;
          const deltaX = Math.abs(touchX - touchStartX);
          const deltaY = Math.abs(touchY - touchStartY);
          
          // 15px 이상 이동하면 드래그로 간주
          if (deltaX > 15 || deltaY > 15) {
            hasMoved = true;
            productDragStates.set(productId, true);
          }
        };
        
        // 터치 종료 (모바일만)
        const touchEndHandler = (e) => {
          if (!isMobileDevice) return;
          // 드래그가 아니었다면 클릭 이벤트 발생
          if (!hasMoved && !productDragStates.get(productId)) {
            // 약간의 지연 후 클릭 이벤트 발생
            setTimeout(() => {
              if (!productDragStates.get(productId)) {
                handler(e);
              }
            }, 50);
          }
          
          setTimeout(() => {
            productDragStates.set(productId, false);
            touchStartX = 0;
            touchStartY = 0;
            hasMoved = false;
          }, 100);
        };
        
        // .product 요소에 클릭 이벤트 등록 (pointer-events가 작동하도록)
        product.addEventListener('click', handler);
        // 모바일에서만 터치 이벤트 리스너 추가
        if (isMobileDevice) {
          product.addEventListener('touchstart', touchStartHandler, { passive: true });
          product.addEventListener('touchmove', touchMoveHandler, { passive: true });
          product.addEventListener('touchend', touchEndHandler, { passive: true });
        }
        
        // 호버 핸들러 - .product 요소에 등록
        const hoverEnterHandler = (e) => handleProductHover(e, numericProductId);
        const hoverLeaveHandler = handleProductHoverLeave;
        
        product.addEventListener('mouseenter', hoverEnterHandler);
        product.addEventListener('mouseleave', hoverLeaveHandler);
        
        return { 
          product, 
          productElement: product,
          handler, 
          hoverEnterHandler, 
          hoverLeaveHandler,
          touchStartHandler: isMobileDevice ? touchStartHandler : null,
          touchMoveHandler: isMobileDevice ? touchMoveHandler : null,
          touchEndHandler: isMobileDevice ? touchEndHandler : null
        };
      }).filter(Boolean);

      // 컨테이너 클릭 핸들러
      containerClickHandler = () => {
        if (showDetailsActive) hideDetails();
      };
      container.addEventListener('click', containerClickHandler);

      // 닫기 버튼 클릭 핸들러
      crossClickHandler = (event) => {
        event.stopPropagation();
        if (showDetailsActive) hideDetails();
      };
      if (cross) {
        cross.addEventListener('click', crossClickHandler);
      }
    };

    // ========== 초기화 ==========
    const intro = () => {
      // 로딩 화면 제거 (애니메이션이 보이도록)
      document.body.classList.remove('loading');
      
      // 이전 상태 초기화 (다른 페이지에서 돌아올 때를 대비)
      // --is-loaded 클래스만 제거 (다른 클래스는 유지)
      if (container) {
        container.classList.remove('--is-loaded', '--is-details-showing');
        // 인라인 스타일은 유지하되, 레이아웃 재계산을 위해 강제 리플로우
        void container.offsetHeight;
      }
      
      // 페이지 전환 시 레이아웃 재계산이 완료될 때까지 대기
      // ABOUT 페이지에서 HOME으로 이동할 때 그리드가 잘리지 않도록 보장
      // 여러 프레임을 기다려서 이전 페이지의 레이아웃이 완전히 제거되도록 함
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // 추가로 약간의 지연을 두어 App.jsx의 레이아웃 재계산이 완료되도록 함
            setTimeout(() => {
              initializeGrid();
            }, 50);
          });
        });
      });
    };
    
    const initializeGrid = () => {
      
      // 디바이스별 클래스 추가 (이미 있으면 추가하지 않음)
      if (isMobile()) {
        // 모바일: 먼저 모바일 클래스 추가 (레이아웃 적용)
        if (!container.classList.contains('--is-mobile')) {
          container.classList.add('--is-mobile');
        }
        if (!grid.classList.contains('--is-mobile')) {
          grid.classList.add('--is-mobile');
        }
        
        // 클래스 추가 후 레이아웃이 적용되도록 강제 리플로우
        void container.offsetHeight;
        void grid.offsetHeight;
        
        // 모바일: 레이아웃이 적용될 때까지 기다린 후 그리드 중앙 배치
        // 여러 프레임을 기다려서 레이아웃이 완전히 계산되도록 함
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // 강제로 레이아웃 재계산 (offsetHeight 호출)
            void container.offsetHeight;
            void grid.offsetHeight;
            
            // container의 높이를 grid의 높이에 맞춤 (헤더 높이 고려)
            // grid가 absolute이므로 container의 높이를 동적으로 설정해야 함
            // grid.offsetHeight는 padding을 포함한 높이
            const gridHeight = grid.offsetHeight;
            const headerHeight = window.innerWidth <= 799 ? 60 : window.innerWidth <= 1279 ? 68 : 100;
            const minHeight = window.innerHeight - headerHeight;
            
            if (gridHeight > 0) {
              // grid 높이와 최소 높이(헤더 높이 고려) 중 더 큰 값 사용
              const finalHeight = Math.max(gridHeight, minHeight);
              container.style.height = `${finalHeight}px`;
              container.style.minHeight = `${minHeight}px`;
              
              // draggable-stage의 높이도 grid에 맞춤
              const draggableStage = container.closest('.draggable-stage');
              if (draggableStage) {
                draggableStage.style.height = `${finalHeight}px`;
                draggableStage.style.minHeight = `${minHeight}px`;
              }
              
              // main-window__container--grid도 헤더 높이 고려
              const mainWindowContainer = container.closest('.main-window__container--grid');
              if (mainWindowContainer) {
                mainWindowContainer.style.minHeight = `${minHeight}px`;
              }
              
              // main-page--grid의 높이도 grid에 맞춤 (헤더 높이는 포함하지 않음)
              const mainPage = document.querySelector('.main-page--grid');
              if (mainPage) {
                mainPage.style.height = `${finalHeight}px`;
                mainPage.style.minHeight = `${minHeight}px`;
              }
              
              // 높이 변경 후 강제로 레이아웃 재계산
              void container.offsetHeight;
              void grid.offsetHeight;
            } else {
              // grid 높이가 아직 계산되지 않았으면 기본 높이 유지
              const baseHeight = window.innerHeight - (window.innerWidth <= 799 ? 60 : window.innerWidth <= 1279 ? 68 : 100);
              container.style.height = `${baseHeight}px`;
              // 다시 한 번 시도
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  const retryGridHeight = grid.offsetHeight;
                  if (retryGridHeight > 0) {
                    const retryFinalHeight = Math.max(retryGridHeight, baseHeight);
                    container.style.height = `${retryFinalHeight}px`;
                    const draggableStage = container.closest('.draggable-stage');
                    if (draggableStage) {
                      draggableStage.style.height = `${retryFinalHeight}px`;
                    }
                    const mainPage = document.querySelector('.main-page--grid');
                    if (mainPage) {
                      mainPage.style.height = `${retryFinalHeight}px`;
                    }
                    void container.offsetHeight;
                    void grid.offsetHeight;
                  }
                });
              });
            }
            
            // container의 transform-origin을 상단 중앙으로 설정
            gsap.set(container, {
              transformOrigin: 'center top',
            });
            
            // container 높이가 그리드 높이 이상인지 확인하고 필요시 업데이트
            const currentContainerHeight = container.offsetHeight;
            const actualGridHeight = grid.offsetHeight;
            if (actualGridHeight > 0 && currentContainerHeight < actualGridHeight) {
              container.style.height = `${actualGridHeight}px`;
              // 관련 컨테이너들도 업데이트
              const draggableStage = container.closest('.draggable-stage');
              if (draggableStage) {
                draggableStage.style.height = `${actualGridHeight}px`;
              }
              const mainPage = document.querySelector('.main-page--grid');
              if (mainPage) {
                mainPage.style.height = `${actualGridHeight}px`;
              }
              // 업데이트 후 레이아웃 재계산
              void container.offsetHeight;
              void grid.offsetHeight;
            }
            
            // 그리드를 상단에 배치 (애니메이션 시작 전)
            // 한 번 더 requestAnimationFrame으로 레이아웃이 완전히 계산되도록 함
            requestAnimationFrame(() => {
              // 마지막으로 레이아웃 재계산
              void container.offsetHeight;
              void grid.offsetHeight;
              // 상단 정렬을 위해 그리드 Y 위치를 0으로 설정
              const gridWidth = grid.offsetWidth;
              const { width } = getViewportSize();
              let centerX = (width - gridWidth) / 2;
              if (gridWidth > width) {
                centerX = 0;
              } else {
                centerX = Math.max(0, Math.min(centerX, width - gridWidth));
              }
              gsap.set(grid, {
                x: centerX,
                y: 0,
              });
            });
          
          const timeline = gsap.timeline({
            onComplete: () => {
              setupGrid();
              updateBounds();
              observeProducts();
              handleDetails();
              window.addEventListener('resize', updateBounds);
              // 모바일에서는 마우스 이벤트 리스너 추가하지 않음
              const isMobileDevice = window.innerWidth <= 799;
              if (!isMobileDevice) {
                onMouseMove = (event) => {
                  if (showDetailsActive) {
                    handleCursor(event);
                  }
                };
                window.addEventListener('mousemove', onMouseMove);
              }
            },
          });

          // 초기 상태 설정 (상단에서 시작)
          timeline.set(container, { 
            scale: 0.5,
            transformOrigin: 'center top',
          });
          timeline.set(productDivs, {
            scale: 0.5,
            opacity: 0,
          });

          timeline.to(productDivs, {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            stagger: {
              amount: 1.2,
              from: 'random',
            },
          });

          timeline.to(container, {
            scale: 1,
            duration: 1.2,
            ease: 'power3.inOut',
          });
          });
        });
      } else {
        // 태블릿/데스크탑: 클래스 추가
        if (isTablet()) {
          grid.classList.add('--is-tablet');
        } else if (isDesktop()) {
          grid.classList.add('--is-desktop');
        }
        
        // 태블릿/데스크탑: 기존 애니메이션
        // 여러 프레임을 기다려서 레이아웃이 완전히 계산되도록 함
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // 강제로 레이아웃 재계산 (offsetHeight 호출)
            void container.offsetHeight;
            void grid.offsetHeight;
            
            // container의 높이를 grid의 높이에 맞춤 (헤더 높이 고려)
            const gridHeight = grid.offsetHeight;
            const headerHeight = window.innerWidth <= 799 ? 60 : window.innerWidth <= 1279 ? 68 : 100;
            const minHeight = window.innerHeight - headerHeight;
            
            if (gridHeight > 0) {
              // grid 높이와 최소 높이(헤더 높이 고려) 중 더 큰 값 사용
              const finalHeight = Math.max(gridHeight, minHeight);
              container.style.height = `${finalHeight}px`;
              container.style.minHeight = `${minHeight}px`;
              
              // draggable-stage의 높이도 grid에 맞춤
              const draggableStage = container.closest('.draggable-stage');
              if (draggableStage) {
                draggableStage.style.height = `${finalHeight}px`;
                draggableStage.style.minHeight = `${minHeight}px`;
              }
              
              // main-window__container--grid도 헤더 높이 고려
              const mainWindowContainer = container.closest('.main-window__container--grid');
              if (mainWindowContainer) {
                mainWindowContainer.style.minHeight = `${minHeight}px`;
              }
              
              // main-page--grid의 높이도 grid에 맞춤 (헤더 높이는 포함하지 않음)
              const mainPage = document.querySelector('.main-page--grid');
              if (mainPage) {
                mainPage.style.height = `${finalHeight}px`;
                mainPage.style.minHeight = `${minHeight}px`;
              }
              
              // 높이 변경 후 강제로 레이아웃 재계산
              void container.offsetHeight;
              void grid.offsetHeight;
            } else {
              // grid 높이가 아직 계산되지 않았으면 기본 높이 유지
              const baseHeight = window.innerHeight - (window.innerWidth <= 799 ? 60 : window.innerWidth <= 1279 ? 68 : 100);
              container.style.height = `${baseHeight}px`;
            }
            
            // container 높이가 그리드 높이 이상인지 확인하고 필요시 업데이트
            const currentContainerHeight = container.offsetHeight;
            const actualGridHeight = grid.offsetHeight;
            if (actualGridHeight > 0 && currentContainerHeight < actualGridHeight) {
              container.style.height = `${actualGridHeight}px`;
              // 관련 컨테이너들도 업데이트
              const draggableStage = container.closest('.draggable-stage');
              if (draggableStage) {
                draggableStage.style.height = `${actualGridHeight}px`;
              }
              const mainPage = document.querySelector('.main-page--grid');
              if (mainPage) {
                mainPage.style.height = `${actualGridHeight}px`;
              }
              // 업데이트 후 레이아웃 재계산
              void container.offsetHeight;
              void grid.offsetHeight;
            }
            
            // container의 transform-origin을 상단 중앙으로 설정
            gsap.set(container, {
              transformOrigin: 'center top',
            });
            
            // 그리드를 상단에 배치 (애니메이션 시작 전)
            // 한 번 더 requestAnimationFrame으로 레이아웃이 완전히 계산되도록 함
            requestAnimationFrame(() => {
              // 마지막으로 레이아웃 재계산
              void container.offsetHeight;
              void grid.offsetHeight;
              // 상단 정렬을 위해 그리드 Y 위치를 0으로 설정
              const gridWidth = grid.offsetWidth;
              const { width } = getViewportSize();
              let centerX = (width - gridWidth) / 2;
              if (gridWidth > width) {
                centerX = 0;
              } else {
                centerX = Math.max(0, Math.min(centerX, width - gridWidth));
              }
              gsap.set(grid, {
                x: centerX,
                y: 0,
              });
            });

            const timeline = gsap.timeline({
          onComplete: () => {
            setupGrid();
            updateBounds();
            observeProducts();
            handleDetails();
            window.addEventListener('resize', updateBounds);
            // 모바일에서는 마우스 이벤트 리스너 추가하지 않음
            const isMobileDevice = window.innerWidth <= 799;
            if (!isMobileDevice) {
              onMouseMove = (event) => {
                if (showDetailsActive) {
                  handleCursor(event);
                }
              };
              window.addEventListener('mousemove', onMouseMove);
            }
          },
        });

        // 초기 상태 설정 (상단에서 시작)
        timeline.set(container, { 
          scale: 0.5,
          transformOrigin: 'center top',
        });
        timeline.set(productDivs, {
          scale: 0.5,
          opacity: 0,
        });

        timeline.to(productDivs, {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: {
            amount: 1.2,
            from: 'random',
          },
        });

            timeline.to(container, {
              scale: 1,
              duration: 1.2,
              ease: 'power3.inOut',
            });
          });
        });
      }
    };

    // 페이지 전환 시 레이아웃 재계산 완료를 기다린 후 intro 실행
    // ABOUT 페이지에서 HOME으로 이동할 때 그리드가 잘리지 않도록 보장
    const startIntro = () => {
      // App.jsx의 레이아웃 재계산이 완료될 때까지 대기
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // 추가 지연으로 레이아웃 재계산 완료 보장
            setTimeout(() => {
              intro();
            }, 100);
          });
        });
      });
    };

    preloadImages('.grid img')
      .then(startIntro)
      .catch(() => {
        startIntro();
      });

    return () => {
      document.body.classList.remove('loading');

      window.removeEventListener('resize', updateBounds);

      // 디바이스별 클래스 제거
      if (container) {
        container.classList.remove('--is-mobile');
      }
      if (grid) {
        grid.classList.remove('--is-mobile', '--is-tablet', '--is-desktop');
      }

      if (observer) {
        observer.disconnect();
      }

      gsap.killTweensOf(grid);
      gsap.killTweensOf(container);
      if (cross) {
        gsap.killTweensOf(cross);
      }
      gsap.killTweensOf(productDivs);

      container.classList.remove('--is-details-showing');
      details.classList.remove('--is-showing');

      productClickHandlers.forEach(({ 
        product, 
        productElement,
        handler, 
        hoverEnterHandler, 
        hoverLeaveHandler,
        touchStartHandler,
        touchMoveHandler,
        touchEndHandler
      }) => {
        product.removeEventListener('click', handler);
        const targetElement = productElement || product;
        if (hoverEnterHandler) targetElement.removeEventListener('mouseenter', hoverEnterHandler);
        if (hoverLeaveHandler) targetElement.removeEventListener('mouseleave', hoverLeaveHandler);
        if (touchStartHandler) product.removeEventListener('touchstart', touchStartHandler);
        if (touchMoveHandler) product.removeEventListener('touchmove', touchMoveHandler);
        if (touchEndHandler) product.removeEventListener('touchend', touchEndHandler);
      });
      
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }

      if (containerClickHandler) {
        container.removeEventListener('click', containerClickHandler);
      }

      if (cross && crossClickHandler) {
        cross.removeEventListener('click', crossClickHandler);
      }

      if (onMouseMove) {
        window.removeEventListener('mousemove', onMouseMove);
      }
      
      // 상세창 마우스 이벤트 정리
      // 모바일에서는 마우스 이벤트 리스너가 없을 수 있음
      const isMobileDevice = window.innerWidth <= 799;
      if (details && !isMobileDevice) {
        details.removeEventListener('mouseenter', handleDetailsMouseEnter);
        details.removeEventListener('mouseleave', handleDetailsMouseLeave);
      }
      
      // 모바일에서는 cursor-cross 클래스가 없을 수 있음
      if (!isMobileDevice) {
        document.body.classList.remove('cursor-cross', 'header-hidden', 'details-open');
      } else {
        document.body.classList.remove('header-hidden', 'details-open');
      }
    };
  }, []);

  return (
    <div className="draggable-stage">
      <div className="container" ref={containerRef}>
        <div className="grid" ref={gridRef}>
          {displayColumns.map((column, columnIndex) => (
            <div className="column" key={`column-${columnIndex}`}>
              {column.map((productId) => (
                <div className="product" key={`product-${productId}`}>
                  <div
                    data-id={productId}
                    ref={(el) => {
                      if (!el) return;
                      const productIndex = PRODUCTS.findIndex((item) => item.id === productId);
                      if (productIndex >= 0) {
                        productRefs.current[productIndex] = el;
                      }
                    }}
                  >
                    <img
                      src={PRODUCTS.find((product) => product.id === productId)?.img}
                      alt={`Product ${productId}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="details" ref={detailsRef}>
        <div className="cross" ref={crossRef}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="#313131" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 6L18 18" stroke="#313131" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="details__title">
          {detailsData.map((detail) => (
            <p key={detail.id} data-title={detail.id} data-text>
              {detail.title}
            </p>
          ))}
        </div>
        <div className="details__body">
          <div className="details__thumb" ref={detailsThumbRef} />
          <div className="details__content">
            <div className="details__texts">
              {detailsData.map((detail) => (
                <p key={detail.id} data-desc={detail.id} data-text>
                  {detail.description}
                </p>
              ))}
            </div>
            <button 
              type="button" 
              className="details__cta-button" 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleViewWork(e);
              }}
            >
              작품 보러가기
            </button>
          </div>
        </div>
      </div>

      {tooltip.show && (
        <div ref={tooltipRef} className="product-tooltip">
          <div className="product-tooltip__title">{tooltip.title}</div>
          <div className="product-tooltip__designer">{tooltip.designer}</div>
        </div>
      )}
    </div>
  );
};

export default DraggableGrid;