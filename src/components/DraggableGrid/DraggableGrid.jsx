import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Flip } from 'gsap/Flip';
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
  const tooltipMoveXRef = useRef(null);
  const tooltipMoveYRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  productRefs.current = [];

  // 툴팁 애니메이션 처리
  useEffect(() => {
    if (!tooltipRef.current) return;

    if (tooltip.show) {
      const wasAlreadyShowing = tooltipMoveXRef.current !== null;
      
      // GSAP quickTo 초기화 (아직 없을 때만)
      if (!tooltipMoveXRef.current) {
        tooltipMoveXRef.current = gsap.quickTo(tooltipRef.current, 'left', { duration: 0.5, ease: 'power3' });
        tooltipMoveYRef.current = gsap.quickTo(tooltipRef.current, 'top', { duration: 0.5, ease: 'power3' });
      }
      
      // 초기 위치 설정
      tooltipMoveXRef.current(tooltip.x + 15);
      tooltipMoveYRef.current(tooltip.y + 15);
      
      // 나타나는 애니메이션 (처음 나타날 때만)
      if (!wasAlreadyShowing) {
        gsap.fromTo(tooltipRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.2, ease: 'power2.out' }
        );
      }
    } else {
      // 사라지는 애니메이션
      gsap.to(tooltipRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.15,
        ease: 'power2.in',
      });
      
      // 정리
      tooltipMoveXRef.current = null;
      tooltipMoveYRef.current = null;
    }
  }, [tooltip.show, tooltip.x, tooltip.y, tooltip.title, tooltip.designer]);
  
  // 툴팁 초기 위치 업데이트
  useEffect(() => {
    if (tooltip.show && tooltipMoveXRef.current && tooltipMoveYRef.current) {
      tooltipMoveXRef.current(tooltip.x + 15);
      tooltipMoveYRef.current(tooltip.y + 15);
    }
  }, [tooltip.x, tooltip.y, tooltip.show]);

  // 툴팁 마우스 이동 처리
  useEffect(() => {
    if (!tooltip.show || !tooltipMoveXRef.current || !tooltipMoveYRef.current) return;

    const handleMouseMove = (event) => {
      if (tooltipMoveXRef.current && tooltipMoveYRef.current) {
        tooltipMoveXRef.current(event.clientX + 15);
        tooltipMoveYRef.current(event.clientY + 15);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [tooltip.show]);
  
  // cleanup: 타이머 정리
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

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
    gsap.registerPlugin(Draggable, Flip);

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
      const rect = container.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    };

    const getResponsivePadding = () => {
      const { width } = getViewportSize();
      if (width < 640) return { paddingX: 60, paddingY: 40 };
      if (width < 1200) return { paddingX: 120, paddingY: 80 };
      return { paddingX: 200, paddingY: 120 };
    };

    const clampToBounds = (x, y, bounds) => ({
      x: Math.max(bounds.minX, Math.min(bounds.maxX, x)),
      y: Math.max(bounds.minY, Math.min(bounds.maxY, y)),
    });

    const computeBounds = () => {
      const { width, height } = getViewportSize();
      const { paddingY } = getResponsivePadding(); // paddingX not used, remove to fix lint
      const gridPadding = 40; // grid의 좌우 패딩
      const availableWidth = width - (gridPadding * 2);
      const rawMinX = 0; // grid가 padding으로 설정되어 있으므로 0부터 시작
      const rawMinY = height - grid.offsetHeight - paddingY;
      const centerX = 0; // grid가 padding으로 설정되어 있으므로 중앙 정렬은 x: 0
      const centerY = (height - grid.offsetHeight) / 2;
      
      // 그리드가 뷰포트보다 작으면 중앙 정렬 허용
      if (grid.offsetWidth < availableWidth && grid.offsetHeight < height) {
        return {
          minX: centerX,
          maxX: centerX,
          minY: centerY,
          maxY: centerY,
        };
      }

      // 그리드가 뷰포트보다 크면 bounds 설정
      return {
        minX: Math.min(rawMinX, availableWidth - grid.offsetWidth),
        maxX: 0,
        minY: Math.min(rawMinY, paddingY),
        maxY: paddingY,
      };
    };

    const centerGrid = () => {
      const gridHeight = grid.offsetHeight;
      const windowHeight = window.innerHeight;

      const centerY = (windowHeight - gridHeight) / 2;

      gsap.set(grid, {
        x: 0,
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

      const state = Flip.getState(product);
      detailsThumb.appendChild(product);

      Flip.from(state, {
        absolute: true,
        duration: 1.2,
        ease: 'power3.inOut',
        nested: true,
      });

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

      const state = Flip.getState(currentProduct);
      originalParent.appendChild(currentProduct);

      if (detailsThumb) detailsThumb.innerHTML = '';

      Flip.from(state, {
        duration: 1.2,
        delay: 0.3,
        ease: 'power3.inOut',
        nested: true,
        onComplete: () => {
          gsap.set(currentProduct, {
            position: '',
            top: '',
            left: '',
            width: '',
            height: '',
            zIndex: '',
          });

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

      gsap.to(container, {
        x: '-50vw',
        duration: 1.2,
        ease: 'power3.inOut',
      });

      gsap.to(details, {
        x: 0,
        duration: 1.2,
        ease: 'power3.inOut',
      });

      const productId = product.dataset.id;
      const numericProductId = Number(productId);
      const titleIndex = detailsData.findIndex((detail) => detail.id.toString() === productId);

      setActiveDetailId(numericProductId);

      flipProduct(product);

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
    };

    const hideDetails = () => {
      if (!showDetailsActive) return;
      showDetailsActive = false;
      container.classList.remove('--is-details-showing');
      container.style.height = '';
      
      // 상세창 영역 마우스 이벤트 제거
      details.removeEventListener('mouseenter', handleDetailsMouseEnter);
      details.removeEventListener('mouseleave', handleDetailsMouseLeave);
      
      // 그리드 드래그 및 스크롤 다시 활성화
      if (draggable) draggable.enable();
      if (wheelListenerTarget) {
        wheelListenerTarget.addEventListener('wheel', handleWheel, { passive: false });
      }
      
      document.body.classList.remove('cursor-cross', 'cross-locked', 'header-hidden', 'details-open');

      gsap.to(container, {
        x: 0,
        duration: 1.2,
        delay: 0.3,
        ease: 'power3.inOut',
        onComplete: () => {
          details.classList.remove('--is-showing');
        },
      });

      gsap.to(details, {
        x: '50vw',
        duration: 1.2,
        delay: 0.3,
        ease: 'power3.inOut',
      });

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

    const handleProductHover = (event, productId) => {
      const product = PRODUCTS.find((p) => p.id === productId);
      if (!product) return;

      // 제목 정규화 함수 (더 강력한 버전)
      const normalizeTitle = (title) => {
        if (!title) return '';
        return title
          .toLowerCase()
          .normalize('NFKD')
          .replace(/[^\p{L}\p{N}]+/gu, '')
          .trim();
      };
      
      // 특별한 제목 매칭 맵 (한글/영문 변형 처리)
      // workThumbsData 제목 -> designerDetailsData 제목 매핑
      const titleMapping = {
        '더고딕': ['thegothic', 'gothic'],
        '더웨폰': ['theweapon', 'weapon'],
        '돌로르사가': ['dolorsaga', 'dolor'],
        '피에르위그리미널가이드앱uxui': ['pierreygheliminalguideuxui', 'liminal', 'uxui', 'pierrehuygheliminal'],
        '2025animationreel': ['2025animationreel', 'animationreel', 'reel'],
        'pledge': ['pledge'],
      };
      
      // 직접 제목 매핑 (정확한 매칭)
      const directTitleMap = {
        '더 고딕': 'The Gothic',
        '더 웨폰': 'The Weapon',
        '돌로르사가': 'Dolor Saga',
        '피에르 위그: 리미널 가이드앱 UX/UI': 'Pierre Huyghe: Liminal 가이드앱 UXUI',
        '2025 Animation Reel': '2025 Animation reel',
        'PLEDGE': 'PLEDGE',
      };
      
      // 제목 매칭 헬퍼 함수
      const matchTitle = (title1, title2) => {
        const norm1 = normalizeTitle(title1);
        const norm2 = normalizeTitle(title2);
        
        // 정확히 일치
        if (norm1 === norm2) return true;
        
        // 특별한 매칭 맵 확인
        for (const [key, variations] of Object.entries(titleMapping)) {
          const hasKey1 = norm1.includes(key);
          const hasKey2 = norm2.includes(key);
          
          if (hasKey1 || hasKey2) {
            for (const variation of variations) {
              if (norm1.includes(variation) && norm2.includes(variation)) {
                return true;
              }
            }
            // 키 자체가 포함되어 있으면 매칭
            if (hasKey1 && hasKey2) {
              return true;
            }
          }
        }
        
        // 부분 매칭
        if (norm1.length > 3 && norm2.length > 3) {
          if (norm1.includes(norm2) || norm2.includes(norm1)) {
            return true;
          }
        }
        
        return false;
      };
      
      // 여러 방법으로 매칭 시도
      let work = null;
      
      // 1. 직접 제목 매핑 확인
      const mappedTitle = directTitleMap[product.title];
      if (mappedTitle) {
        work = WORKS_LIST.find((w) => w.title === mappedTitle);
      }
      
      // 2. 정확한 제목 매칭
      if (!work) {
        work = WORKS_LIST.find((w) => 
          normalizeTitle(w.title) === normalizeTitle(product.title)
        );
      }
      
      // 3. 개선된 제목 매칭 (특별한 케이스 포함)
      if (!work) {
        work = WORKS_LIST.find((w) => 
          matchTitle(w.title, product.title)
        );
      }
      
      // 4. 부분 매칭 (제목이 포함되어 있는지)
      if (!work) {
        const productNormalized = normalizeTitle(product.title);
        work = WORKS_LIST.find((w) => {
          const workNormalized = normalizeTitle(w.title);
          return workNormalized.includes(productNormalized) || 
                 productNormalized.includes(workNormalized);
        });
      }
      
      // 5. 파일명에서 추출한 제목과 매칭
      if (!work && product.file) {
        // 파일명에서 제목 추출 시도 (예: "썸네일_김윤정_안녕우주.webp" -> "안녕우주")
        // 마지막 언더스코어 이후의 부분 추출
        const lastUnderscoreIndex = product.file.lastIndexOf('_');
        if (lastUnderscoreIndex !== -1) {
          const extractedTitle = product.file
            .substring(lastUnderscoreIndex + 1)
            .replace(/\.webp$/i, '')
            .trim();
          
          work = WORKS_LIST.find((w) => 
            matchTitle(w.title, extractedTitle)
          );
        }
      }
      
      // 6. 디자이너 이름과 파일명으로 매칭 (최후의 수단)
      if (!work && product.file) {
        // 파일명에서 디자이너 이름 추출 (예: "썸네일_정지민_더고딕.webp" -> "정지민")
        const fileParts = product.file.split('_');
        if (fileParts.length >= 2) {
          const designerName = fileParts[1];
          const extractedTitle = fileParts.slice(2).join('_').replace(/\.webp$/i, '').trim();
          
          work = WORKS_LIST.find((w) => {
            const matchesDesigner = w.designer === designerName;
            const matchesTitle = matchTitle(w.title, extractedTitle) || 
                                normalizeTitle(w.title).includes(normalizeTitle(extractedTitle)) ||
                                normalizeTitle(extractedTitle).includes(normalizeTitle(w.title));
            return matchesDesigner && matchesTitle;
          });
        }
      }

      if (work) {
        // 제품 간 이동 시 툴팁 숨김 타이머 취소
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
          hoverTimeoutRef.current = null;
        }
        
        // 제품 간 이동 시 툴팁을 부드럽게 업데이트
        const isAlreadyShowing = tooltip.show;
        const isSameWork = tooltip.title === work.title && tooltip.designer === work.designer;
        
        // 같은 작품이면 위치만 업데이트
        if (isAlreadyShowing && isSameWork) {
          if (tooltipMoveXRef.current && tooltipMoveYRef.current) {
            tooltipMoveXRef.current(event.clientX + 15);
            tooltipMoveYRef.current(event.clientY + 15);
          }
          return;
        }
        
        setTooltip({
          show: true,
          title: work.title,
          designer: work.designer,
          x: event.clientX,
          y: event.clientY,
        });
        
        // 이미 표시 중이면 위치만 즉시 업데이트
        if (isAlreadyShowing && tooltipMoveXRef.current && tooltipMoveYRef.current) {
          tooltipMoveXRef.current(event.clientX + 15);
          tooltipMoveYRef.current(event.clientY + 15);
        }
      }
    };

    const handleProductHoverLeave = () => {
      // 제품 간 이동을 감지하기 위해 약간의 지연 추가
      hoverTimeoutRef.current = setTimeout(() => {
        setTooltip({ show: false, title: '', designer: '', x: 0, y: 0 });
      }, 50);
    };

    const handleDetails = () => {
      titles = Array.from(details.querySelectorAll('.details__title p'));
      texts = Array.from(details.querySelectorAll('.details__body [data-text]'));

      splitTitlesData = titles.map((title) => splitText(title, 'lines, chars'));
      splitTextsData = texts.map(() => ({ lines: [] }));

      titles.forEach((title) => title.classList.remove('is-active'));
      texts.forEach((text) => text.classList.remove('is-active'));

      // 제품 클릭 핸들러
      productClickHandlers = products.map((product) => {
        const handler = (event) => {
          event.stopPropagation();
          showDetails(product);
        };
        product.addEventListener('click', handler);
        
        // 호버 핸들러 추가
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
      
      centerGrid();

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

      timeline.set(container, { scale: 0.5 });
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
        <div
          ref={tooltipRef}
          className="product-tooltip"
        >
          <div className="product-tooltip__title">{tooltip.title}</div>
          <div className="product-tooltip__designer">{tooltip.designer}</div>
        </div>
      )}
    </div>
  );
};

export default DraggableGrid;