import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
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

const columns = Array.from({ length: GRID_COLUMNS }, (_, columnIndex) => {
  return Array.from({ length: GRID_ROWS }, (_, rowIndex) => {
    const productIndex = columnIndex * GRID_ROWS + rowIndex;
    return PRODUCTS[productIndex]?.id ?? null;
  }).filter(Boolean);
});

const DraggableGrid = () => {
  const [activeDetailId, setActiveDetailId] = useState(null);
  const [tooltip, setTooltip] = useState({ show: false, title: '', designer: '', x: 0, y: 0 });
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const detailsRef = useRef(null);
  const detailsThumbRef = useRef(null);
  const crossRef = useRef(null);
  const productRefs = useRef([]);
  const boundsRef = useRef({ minX: 0, maxX: 0, minY: 0, maxY: 0 });
  const tooltipRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  productRefs.current = [];

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
    gsap.registerPlugin(Draggable);

    const container = containerRef.current;
    const grid = gridRef.current;
    const products = [...grid.querySelectorAll('.product div')];
    const details = detailsRef.current;
    const detailsThumb = detailsThumbRef.current;
    const cross = crossRef.current;

    if (!container || !grid || !details || !detailsThumb || products.length === 0) {
      document.body.classList.remove('loading');
      return undefined;
    }

    let draggable;
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
    let wheelListenerTarget = null;

    // ========== 유틸리티 함수 ==========
    const getViewportSize = () => {
      // container의 실제 크기 사용
      const rect = container.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    };

    // Removed unused getResponsivePadding function as per lint error
      const { width } = getViewportSize();
      if (width < 768) return '100vw'; // 모바일: 전체 화면
      if (width < 1024) return '60vw'; // 태블릿: 60%
      return '50vw'; // 데스크탑: 50%
    };

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

    const clampToBounds = (x, y, bounds) => ({
      x: Math.max(bounds.minX, Math.min(bounds.maxX, x)),
      y: Math.max(bounds.minY, Math.min(bounds.maxY, y)),
    });

    const computeBounds = () => {
      // container의 실제 크기 사용
      const { width, height } = getViewportSize();
      
      // grid의 실제 크기
      const gridWidth = grid.offsetWidth;
      const gridHeight = grid.offsetHeight;
      
      // 작은 여유 영역 (그리드가 더 작을 때만 사용)
      const extraX = 120;
      const extraY = 80;
      
      // 가로가 컨테이너보다 큰 경우: 가장자리에 정확히 맞춰 끝까지 이동 가능
      let minX;
      let maxX;
      if (gridWidth > width) {
        minX = width - gridWidth; // 음수, 가장 오른쪽 끝
        maxX = 0;                 // 좌측 끝
      } else {
        // 컨테이너보다 작으면 중앙 기준 약간의 여유만 제공
        const centerX = (width - gridWidth) / 2;
        minX = centerX - extraX;
        maxX = centerX + extraX;
      }
      
      // 세로가 컨테이너보다 큰 경우: 위/아래 끝까지 이동 가능
      let minY;
      let maxY;
      if (gridHeight > height) {
        minY = height - gridHeight; // 음수, 하단 끝
        maxY = 0;                   // 상단 끝
      } else {
        const centerY = (height - gridHeight) / 2;
        minY = centerY - extraY;
        maxY = centerY + extraY;
      }
      
      return { minX, maxX, minY, maxY };
    };

    const centerGrid = () => {
      const gridWidth = grid.offsetWidth;
      const gridHeight = grid.offsetHeight;
      const { width, height } = getViewportSize();
      
      // container의 실제 크기를 기준으로 중앙 정렬
      // grid는 container 내부에 있고, position: absolute
      // grid의 x 위치는 container의 왼쪽 상단(0, 0)을 기준
      let centerX = (width - gridWidth) / 2;
      
      // 그리드가 container보다 크면 오른쪽 칼럼이 잘리지 않도록 조정
      if (gridWidth > width) {
        // 오른쪽 끝이 잘리지 않는 최소 위치
        const minCenterX = 0;
        centerX = Math.max(centerX, minCenterX);
      }
      
      const centerY = (height - gridHeight) / 2;
      
      gsap.set(grid, {
        x: centerX,
        y: centerY,
      });
    };

    // ========== 드래그 및 스크롤 관련 ==========
    const setupDraggable = () => {
      container.classList.add('--is-loaded');
      const bounds = computeBounds();
      boundsRef.current = bounds;

      draggable = Draggable.create(grid, {
        type: 'x,y',
        bounds,
        inertia: true,
        allowEventDefault: true,
        edgeResistance: 0.9,
        onDragStart: () => grid.classList.add('--is-dragging'),
        onDragEnd: () => grid.classList.remove('--is-dragging'),
      })[0];

      centerGrid(bounds);
    };

    const updateBounds = () => {
      if (!draggable) return;
      const newBounds = computeBounds();
      boundsRef.current = newBounds;
      draggable.vars.bounds = newBounds;
      
      if (typeof draggable.applyBounds === 'function') {
        draggable.applyBounds(newBounds);
      }

      const currentX = parseFloat(gsap.getProperty(grid, 'x')) || 0;
      const currentY = parseFloat(gsap.getProperty(grid, 'y')) || 0;
      const clamped = clampToBounds(currentX, currentY, newBounds);

      if (clamped.x !== currentX || clamped.y !== currentY) {
        gsap.set(grid, { x: clamped.x, y: clamped.y });
      }

      if (!showDetailsActive) {
        centerGrid(newBounds);
      }
    };

    const handleWheel = (event) => {
      if (!draggable || showDetailsActive) return;

      const multiplier = event.deltaMode === 1 ? 30 : 7;
      const deltaX = -event.deltaX * multiplier;
      const deltaY = -event.deltaY * multiplier;
      const currentX = parseFloat(gsap.getProperty(grid, 'x')) || 0;
      const currentY = parseFloat(gsap.getProperty(grid, 'y')) || 0;
      const nextX = currentX + deltaX;
      const nextY = currentY + deltaY;
      const bounds = boundsRef.current;
      const clamped = clampToBounds(nextX, nextY, bounds);
      const didMove = clamped.x !== currentX || clamped.y !== currentY;

      if (didMove) {
        event.preventDefault();
        gsap.to(grid, {
          x: clamped.x,
          y: clamped.y,
          duration: 0.3,
          ease: 'power3.out',
        });
      }
    };

    const handleCursor = (event) => {
      if (!cross) return;
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

      products.forEach((product) => observer.observe(product));
    };

    const flipProduct = (product) => {
      if (detailsThumb) detailsThumb.innerHTML = '';

      currentProduct = product;
      originalParent = product.parentNode;

      if (observer) observer.unobserve(product);

      // 그리드의 thumb 작아지기
      gsap.to(product, {
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
      container.style.height = '';
      
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
      gsap.set(details, { x: initialDetailsX, opacity: 1, display: 'flex', paddingTop: 100, paddingBottom: 100 });
      
      details.classList.add('--is-showing');
      container.classList.add('--is-details-showing');
      
      // 그리드 높이에 맞춰 container 높이 설정
      const gridHeight = grid.offsetHeight;
      const gridY = parseFloat(gsap.getProperty(grid, 'y')) || 0;
      const containerHeight = Math.max(100, gridHeight + Math.abs(gridY) + 100);
      container.style.height = `${containerHeight}px`;
      
      // 그리드 드래그 및 스크롤 비활성화
      if (draggable) draggable.disable();
      if (wheelListenerTarget) {
        wheelListenerTarget.removeEventListener('wheel', handleWheel);
      }
      
      // 상세창 영역에 마우스 이벤트 추가
      details.addEventListener('mouseenter', handleDetailsMouseEnter);
      details.addEventListener('mouseleave', handleDetailsMouseLeave);
      
      document.body.classList.add('cursor-cross', 'cross-locked', 'header-hidden', 'details-open');

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

      const productId = product.dataset.id;
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
      details.removeEventListener('mouseenter', handleDetailsMouseEnter);
      details.removeEventListener('mouseleave', handleDetailsMouseLeave);
      
      // 그리드 드래그 및 스크롤 다시 활성화
      if (draggable) draggable.enable();
      if (wheelListenerTarget) {
        wheelListenerTarget.addEventListener('wheel', handleWheel, { passive: false });
      }
      
      document.body.classList.remove('cursor-cross', 'cross-locked', 'header-hidden', 'details-open');

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
      productClickHandlers = products.map((product) => {
        const handler = (event) => {
          event.stopPropagation();
          showDetails(product);
        };
        product.addEventListener('click', handler);
        
        // 호버 핸들러
        const productId = Number(product.dataset.id);
        const hoverEnterHandler = (e) => handleProductHover(e, productId);
        const hoverLeaveHandler = handleProductHoverLeave;
        
        product.addEventListener('mouseenter', hoverEnterHandler);
        product.addEventListener('mouseleave', hoverLeaveHandler);
        
        return { product, handler, hoverEnterHandler, hoverLeaveHandler };
      });

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
      
      // 그리드를 중앙에 배치 (애니메이션 시작 전)
      centerGrid();
      
      // container의 transform-origin을 중앙으로 설정
      gsap.set(container, {
        transformOrigin: 'center center',
      });

      const timeline = gsap.timeline({
        onComplete: () => {
          setupDraggable();
          updateBounds();
          observeProducts();
          handleDetails();
          wheelListenerTarget = container;
          wheelListenerTarget.addEventListener('wheel', handleWheel, { passive: false });
          window.addEventListener('resize', updateBounds);
          onMouseMove = (event) => {
            if (showDetailsActive) {
              handleCursor(event);
            }
          };
          window.addEventListener('mousemove', onMouseMove);
        },
      });

      // 초기 상태 설정 (중앙에서 시작)
      timeline.set(container, { 
        scale: 0.5,
        transformOrigin: 'center center',
      });
      timeline.set(products, {
        scale: 0.5,
        opacity: 0,
      });

      timeline.to(products, {
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
    };

    preloadImages('.grid img')
      .then(intro)
      .catch(() => {
        intro();
      });

    return () => {
      document.body.classList.remove('loading');

      if (wheelListenerTarget) {
        wheelListenerTarget.removeEventListener('wheel', handleWheel);
      }
      window.removeEventListener('resize', updateBounds);

      if (draggable) {
        draggable.kill();
      }

      if (observer) {
        observer.disconnect();
      }

      gsap.killTweensOf(grid);
      gsap.killTweensOf(container);
      if (cross) {
        gsap.killTweensOf(cross);
      }
      gsap.killTweensOf(products);

      container.classList.remove('--is-details-showing');
      details.classList.remove('--is-showing');

      productClickHandlers.forEach(({ product, handler, hoverEnterHandler, hoverLeaveHandler }) => {
        product.removeEventListener('click', handler);
        if (hoverEnterHandler) product.removeEventListener('mouseenter', hoverEnterHandler);
        if (hoverLeaveHandler) product.removeEventListener('mouseleave', hoverLeaveHandler);
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
      if (details) {
        details.removeEventListener('mouseenter', handleDetailsMouseEnter);
        details.removeEventListener('mouseleave', handleDetailsMouseLeave);
      }
      
      document.body.classList.remove('cursor-cross', 'header-hidden', 'details-open');
    };
  }, []);

  return (
    <div className="draggable-stage">
      <div className="container" ref={containerRef}>
        <div className="grid" ref={gridRef}>
          {columns.map((column, columnIndex) => (
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

      <div className="cross" ref={crossRef}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18" stroke="#313131" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 6L18 18" stroke="#313131" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
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