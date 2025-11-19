import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { preloadImages, splitText } from './js/utils.js';
import { WORK_THUMBNAILS } from '../../data/workThumbsData.js';
import resolveThumbSrc from '../../utils/resolveThumbSrc.js';
import { WORKS_LIST } from '../Works/Works.jsx';
import './DraggableGrid.css';

const PRODUCTS = WORK_THUMBNAILS.map((image) => ({
  id: image.id,
  img: resolveThumbSrc(image.file, image.title),
  ...image,
}));

const GRID_COLUMNS = 5;
const GRID_ROWS = 8;

const detailsData = PRODUCTS.map((product) => ({
  id: product.id,
  title: product.title,
  description: product.description,
}));

// 모바일용 그리드 구조 (4열 x 10행)
const getMobileColumns = () => {
  const MOBILE_COLUMNS = 4;
  const MOBILE_ROWS = 10;
  return Array.from({ length: MOBILE_COLUMNS }, (_, columnIndex) => {
    return Array.from({ length: MOBILE_ROWS }, (_, rowIndex) => {
      const productIndex = columnIndex * MOBILE_ROWS + rowIndex;
      return PRODUCTS[productIndex]?.id ?? null;
    }).filter(Boolean);
  });
};

// 데스크탑용 그리드 구조 (5열 x 8행)
const getDesktopColumns = () => {
  return Array.from({ length: GRID_COLUMNS }, (_, columnIndex) => {
    return Array.from({ length: GRID_ROWS }, (_, rowIndex) => {
      const productIndex = columnIndex * GRID_ROWS + rowIndex;
      return PRODUCTS[productIndex]?.id ?? null;
    }).filter(Boolean);
  });
};

const DraggableGrid = () => {
  const [activeDetailId, setActiveDetailId] = useState(null);
  const [tooltip, setTooltip] = useState({ show: false, title: '', designer: '', x: 0, y: 0 });
  const [isMobileView, setIsMobileView] = useState(() => window.innerWidth <= 799);
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const detailsRef = useRef(null);
  const detailsThumbRef = useRef(null);
  const crossRef = useRef(null);
  const productRefs = useRef([]);
  const tooltipRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  productRefs.current = [];

  // 모바일 여부 확인
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 799);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
  const handleViewWork = () => {
    if (!activeDetailId) return;
    
    const activeProduct = PRODUCTS.find((p) => p.id === activeDetailId);
    if (!activeProduct) return;

      const normalizeTitle = (title) => 
        title.toLowerCase().normalize('NFKD').replace(/[^\p{L}\p{N}]+/gu, '');
    
    const work = WORKS_LIST.find((w) => 
      normalizeTitle(w.title) === normalizeTitle(activeProduct.title)
    );

    if (work?.designer) {
      const encoded = encodeURIComponent(work.designer);
      window.history.pushState({}, '', `/designer/${encoded}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
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
      const gridWidth = grid.offsetWidth;
      
      // 헤더 높이 가져오기
      const headerHeight = window.innerWidth <= 799 ? 60 : window.innerWidth <= 1279 ? 68 : 100;
      // 뷰포트 높이에서 헤더 높이를 뺀 값 사용
      const viewportHeight = window.innerHeight - headerHeight;
      
      // container의 실제 높이와 뷰포트 높이 중 더 큰 값 사용 (그리드가 더 클 수 있음)
      const height = Math.max(rect.height, viewportHeight);
      
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
      const gridWidth = grid.offsetWidth;
      const gridHeight = grid.offsetHeight;
      const { width, height } = getViewportSize();
      
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
      
      // 그리드가 container 밖으로 나가지 않도록 최종 확인
      // 왼쪽 경계 확인
      const finalX = Math.max(0, Math.min(centerX, width - gridWidth));
      // 상단 경계 확인
      const finalY = Math.max(0, Math.min(scale1Y, height - gridHeight));
      // 하단 경계 확인 (그리드가 container 밖으로 나가지 않도록)
      const maxY = height - gridHeight;
      const clampedY = Math.min(finalY, maxY);
      
      gsap.set(grid, {
        x: finalX,
        y: Math.max(0, clampedY),
      });
    };

    // ========== 드래그 및 스크롤 관련 ==========
    const isMobile = () => {
      return window.innerWidth <= 799;
    };

    const setupGrid = () => {
      container.classList.add('--is-loaded');
      
      // 모바일 클래스 추가
      if (isMobile()) {
        container.classList.add('--is-mobile');
        grid.classList.add('--is-mobile');
      }

      centerGrid();
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
      if (showDetailsActive) return;
      showDetailsActive = true;
      
      // 상세창 초기 위치 설정
      const initialDetailsX = getResponsiveDetailsX(false);
      // 보이는 순간 상/하 패딩을 100px로 강제 고정 (스타일 우선순위 무관하게 보장)
      gsap.set(details, { 
        x: initialDetailsX, 
        opacity: 1, 
        display: 'flex', 
        paddingTop: 100, 
        paddingBottom: 100,
        pointerEvents: 'auto'
      });
      
      details.classList.add('--is-showing');
      container.classList.add('--is-details-showing');
      
      // 그리드 높이에 맞춰 container 높이 설정
      const gridHeight = grid.offsetHeight;
      const gridY = parseFloat(gsap.getProperty(grid, 'y')) || 0;
      const containerHeight = Math.max(100, gridHeight + Math.abs(gridY) + 100);
      container.style.height = `${containerHeight}px`;
      
      // 상세창이 열렸을 때는 그리드 조작 비활성화
      
      // 상세창 영역에 마우스 이벤트 추가 (모바일 제외)
      const isMobileDevice = window.innerWidth <= 799;
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

      gsap.to(container, {
        x: containerX,
        duration: 1.2,
        ease: 'power3.inOut',
      });

      gsap.to(details, {
        x: detailsX,
        duration: 1.2,
        ease: 'power3.inOut',
        onStart: () => {
          // 애니메이션 시작 시에도 한 번 더 보장
          gsap.set(details, { paddingTop: 100, paddingBottom: 100 });
        },
      });

      // product는 .product 요소이므로, 내부 div에서 data-id를 가져와야 함
      const productDiv = product.querySelector('div[data-id]');
      const productId = productDiv ? productDiv.dataset.id : product.dataset.id;
      const numericProductId = Number(productId);
      const titleIndex = detailsData.findIndex((detail) => detail.id.toString() === productId);

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
        gsap.to(ctaButton, {
          y: 0,
          opacity: 1,
          duration: 1.1,
          delay: 0.4,
          ease: 'power3.inOut',
          onComplete: () => {
            ctaButton.style.pointerEvents = 'auto';
          },
        });
      }
    };

    const hideDetails = () => {
      if (!showDetailsActive) return;
      showDetailsActive = false;
      
      // 상세창 영역 마우스 이벤트 제거
      // 모바일에서는 마우스 이벤트 리스너가 없을 수 있음
      const isMobileDevice = window.innerWidth <= 799;
      if (!isMobileDevice) {
        details.removeEventListener('mouseenter', handleDetailsMouseEnter);
        details.removeEventListener('mouseleave', handleDetailsMouseLeave);
      }
      
      // 상세창이 닫혔을 때는 그리드 조작 활성화
      
      // 모바일에서는 cursor-cross 클래스가 없을 수 있음
      if (!isMobileDevice) {
        document.body.classList.remove('cursor-cross', 'cross-locked', 'header-hidden', 'details-open');
      } else {
        document.body.classList.remove('header-hidden', 'details-open');
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
        if (!productDiv) return null;
        
        const productId = productDiv.dataset.id;
        const numericProductId = Number(productId);
        let touchStartX = 0;
        let touchStartY = 0;
        let hasMoved = false;
        
        const handler = (event) => {
          // 모바일에서만 드래그 상태 확인
          const dragState = productDragStates.get(productId);
          if (isMobileDevice && dragState === true) {
            event.preventDefault();
            event.stopPropagation();
            return;
          }
          event.stopPropagation();
          showDetails(product);
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
      
      // 모바일과 데스크탑 애니메이션 분기
      if (isMobile()) {
        // 모바일: 먼저 모바일 클래스 추가 (레이아웃 적용)
        container.classList.add('--is-mobile');
        grid.classList.add('--is-mobile');
        
        // 모바일: 레이아웃이 적용될 때까지 기다린 후 그리드 중앙 배치
        // 여러 프레임을 기다려서 레이아웃이 완전히 계산되도록 함
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
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
            } else {
              // grid 높이가 아직 계산되지 않았으면 기본 높이 유지
              const baseHeight = window.innerHeight - (window.innerWidth <= 799 ? 60 : window.innerWidth <= 1279 ? 68 : 100);
              container.style.height = `${baseHeight}px`;
            }
            
            // container의 transform-origin을 중앙으로 설정
            gsap.set(container, {
              transformOrigin: 'center center',
            });
            
            // 그리드를 중앙에 배치 (애니메이션 시작 전)
            centerGrid();
          
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

          // 초기 상태 설정 (중앙에서 시작)
          timeline.set(container, { 
            scale: 0.5,
            transformOrigin: 'center center',
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
        // 데스크탑: 기존 애니메이션
        // 여러 프레임을 기다려서 레이아웃이 완전히 계산되도록 함
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
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
            } else {
              // grid 높이가 아직 계산되지 않았으면 기본 높이 유지
              const baseHeight = window.innerHeight - (window.innerWidth <= 799 ? 60 : window.innerWidth <= 1279 ? 68 : 100);
              container.style.height = `${baseHeight}px`;
            }
            
            // 그리드를 중앙에 배치 (애니메이션 시작 전)
            centerGrid();
            
            // container의 transform-origin을 중앙으로 설정
            gsap.set(container, {
              transformOrigin: 'center center',
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

        // 초기 상태 설정 (중앙에서 시작)
        timeline.set(container, { 
          scale: 0.5,
          transformOrigin: 'center center',
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

    preloadImages('.grid img')
      .then(intro)
      .catch(() => {
        intro();
      });

    return () => {
      document.body.classList.remove('loading');

      window.removeEventListener('resize', updateBounds);

      // 모바일 클래스 제거
      if (container) {
        container.classList.remove('--is-mobile');
      }
      if (grid) {
        grid.classList.remove('--is-mobile');
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
            <button type="button" className="details__cta-button" onClick={handleViewWork}>
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