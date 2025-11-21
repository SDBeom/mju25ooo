import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { WORK_THUMBNAILS } from '../../data/workThumbsData.js';
import resolveThumbSrc from '../../utils/resolveThumbSrc.js';
import { WORKS_LIST } from '../Works/Works.jsx';
import { preloadImages, splitText } from '../DraggableGrid/js/utils.js';
import './MainPage.css';

gsap.registerPlugin(Flip);

const GRID_COLUMNS = 5;
const GRID_ROWS = 8;

const MainPage = () => {
  const gridRef = useRef(null);
  const containerRef = useRef(null);
  const circleRefs = useRef([]);
  const detailsRef = useRef(null);
  const detailsThumbRef = useRef(null);
  const crossRef = useRef(null);
  const [hoveredWork, setHoveredWork] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeDetailId, setActiveDetailId] = useState(null);
  const showDetailsActiveRef = useRef(false);
  const currentProductRef = useRef(null);
  const originalParentRef = useRef(null);
  const observerRef = useRef(null);
  const titlesRef = useRef([]);
  const textsRef = useRef([]);
  const splitTitlesDataRef = useRef([]);
  const splitTextsDataRef = useRef([]);
  const detailsMouseEnterHandlerRef = useRef(null);
  const detailsMouseLeaveHandlerRef = useRef(null);

  // 5열 x 8행 = 40개 작품 사용
  const works = WORK_THUMBNAILS.slice(0, GRID_COLUMNS * GRID_ROWS).map((work) => ({
    ...work,
    img: resolveThumbSrc(work.file, work.title)
  }));

  const detailsData = works.map((work) => ({
    id: work.id,
    title: work.title,
    description: work.description,
  }));

  // 그리드 구조 생성 (5열 x 8행)
  const gridStructure = Array.from({ length: GRID_COLUMNS }, (_, columnIndex) => {
    return Array.from({ length: GRID_ROWS }, (_, rowIndex) => {
      const workIndex = columnIndex * GRID_ROWS + rowIndex;
      return works[workIndex] || null;
    }).filter(Boolean);
  });

  const handleWorkClick = (work, event) => {
    if (!work) return;
    event.stopPropagation();
    showDetails(work);
  };

  const handleViewWork = () => {
    if (!activeDetailId) return;
    
    const activeProduct = works.find((p) => p.id === activeDetailId);
    if (!activeProduct) return;

    const normalizeTitle = (title) => 
      title.toLowerCase().normalize('NFKD').replace(/[^\p{L}\p{N}]+/gu, '');
    
    const work = WORKS_LIST.find((w) => 
      normalizeTitle(w.title) === normalizeTitle(activeProduct.title)
    );

    if (work?.designer) {
      const encoded = encodeURIComponent(work.designer);
      if (window.__navigate) {
        window.__navigate(`/designer/${encoded}`);
      }
    }
  };

  // 그리드 중앙 정렬 및 컨테이너 크기 조정 함수
  const centerGrid = () => {
    if (!gridRef.current || !containerRef.current) return;
    
    const grid = gridRef.current;
    const container = containerRef.current;
    const gridWidth = grid.offsetWidth;
    const gridHeight = grid.offsetHeight;
    const viewportWidth = window.innerWidth;
    
    const centerX = (viewportWidth - gridWidth) / 2;
    
    // 그리드 위치 설정 (컨테이너 내부에서 상대 위치)
    gsap.set(grid, {
      x: 0,
      y: 40
    });
    
    // 컨테이너 크기를 그리드 크기에 맞춤
    container.style.width = `${gridWidth}px`;
    container.style.height = `${gridHeight + 80}px`; // 상하 패딩 포함
    container.style.marginLeft = `${Math.max(0, centerX)}px`;
  };

  // IntersectionObserver로 스크롤 시 원들 크기 조정
  const observeCircles = () => {
    const circles = circleRefs.current.filter(Boolean);
    if (circles.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // 현재 선택된 제품이면 무시
        if (entry.target === currentProductRef.current) return;

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

    circles.forEach((circle) => observer.observe(circle));

    observerRef.current = observer;
    return observer;
  };

  // 상세창 관련 함수들
  const getResponsiveDetailsX = (isOpen) => {
    const width = window.innerWidth;
    if (width < 768) {
      return isOpen ? '0' : '100vw';
    }
    if (width < 1024) {
      return isOpen ? '0' : '60vw';
    }
    return isOpen ? '0' : '50vw';
  };

  const getResponsiveGridX = (isOpen) => {
    if (!isOpen) {
      return null;
    }
    const width = window.innerWidth;
    const currentX = parseFloat(gsap.getProperty(gridRef.current, 'x')) || 0;
    if (width < 768) {
      return currentX - width;
    }
    if (width < 1024) {
      return currentX - (width * 0.6);
    }
    return currentX - (width * 0.5);
  };

  const flipProduct = (circleElement) => {
    if (!detailsThumbRef.current) return;

    detailsThumbRef.current.innerHTML = '';
    currentProductRef.current = circleElement;
    originalParentRef.current = circleElement.parentNode;

    if (observerRef.current) {
      observerRef.current.unobserve(circleElement);
    }

    // 그리드의 원 작아지기
    gsap.to(circleElement, {
      scale: 0,
      duration: 0.6,
      ease: 'power3.inOut',
    });

    // 상세창 thumb 생성 및 나타나기
    const productImg = circleElement.querySelector('img');
    if (productImg && detailsThumbRef.current) {
      const thumbImg = document.createElement('img');
      thumbImg.src = productImg.src;
      thumbImg.alt = productImg.alt || '';
      thumbImg.style.width = '100%';
      thumbImg.style.height = '100%';
      thumbImg.style.objectFit = 'cover';
      thumbImg.style.borderRadius = 'inherit';
      
      detailsThumbRef.current.appendChild(thumbImg);
      
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

    if (crossRef.current) {
      const isMobileDevice = window.innerWidth <= 799;
      if (isMobileDevice) {
      gsap.set(crossRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        scale: 0,
        x: 0,
        y: 0,
          visibility: 'visible'
        });
      } else {
        gsap.set(crossRef.current, {
          opacity: 1,
          pointerEvents: 'auto',
          scale: 0,
          visibility: 'visible'
      });
      }
      gsap.to(crossRef.current, {
        scale: 1,
        duration: 0.4,
        delay: 0.5,
        ease: 'power2.out',
      });
    }
  };

  const unFlipProduct = () => {
    if (!currentProductRef.current || !originalParentRef.current) return;

    if (crossRef.current) {
      gsap.to(crossRef.current, {
        scale: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    }

    const thumbImg = detailsThumbRef.current?.querySelector('img');
    if (thumbImg) {
      gsap.to(thumbImg, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power3.inOut',
        onComplete: () => {
          if (detailsThumbRef.current) detailsThumbRef.current.innerHTML = '';
        },
      });
    }

    gsap.to(currentProductRef.current, {
      scale: 1,
      duration: 0.4,
      delay: 0.1,
      ease: 'power3.inOut',
      onComplete: () => {
        if (observerRef.current && currentProductRef.current) {
          observerRef.current.observe(currentProductRef.current);
        }
        currentProductRef.current = null;
        originalParentRef.current = null;
      },
    });
  };

  const showDetails = (work) => {
    if (showDetailsActiveRef.current) return;
    showDetailsActiveRef.current = true;

    const details = detailsRef.current;
    const grid = gridRef.current;
    if (!details || !grid) return;

    const initialDetailsX = getResponsiveDetailsX(false);
    gsap.set(details, { 
      x: initialDetailsX, 
      opacity: 1, 
      display: 'flex', 
      paddingTop: 100, 
      paddingBottom: 100,
      pointerEvents: 'auto',
      visibility: 'visible'
    });
    
    details.classList.add('--is-showing');
    grid.classList.add('--is-details-showing');
    
    // 상세창 영역에 마우스 이벤트 추가
    detailsMouseEnterHandlerRef.current = () => {
      if (crossRef.current) {
        gsap.to(crossRef.current, { opacity: 0, duration: 0.2 });
      }
    };

    detailsMouseLeaveHandlerRef.current = () => {
      if (crossRef.current) {
        gsap.to(crossRef.current, { opacity: 1, duration: 0.2 });
      }
    };

    details.addEventListener('mouseenter', detailsMouseEnterHandlerRef.current);
    details.addEventListener('mouseleave', detailsMouseLeaveHandlerRef.current);
    
    document.body.classList.add('cursor-cross', 'cross-locked', 'header-hidden', 'details-open');

    const gridX = getResponsiveGridX(true);
    const detailsX = getResponsiveDetailsX(true);

    gsap.to(grid, {
      x: gridX,
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

    setActiveDetailId(work.id);

    // 클릭된 원 찾기
    const circleElement = circleRefs.current.find((circle) => {
      if (!circle) return false;
      const workId = circle.dataset.workId;
      return workId && Number(workId) === work.id;
    });

    if (circleElement) {
      flipProduct(circleElement);
    }

    // 텍스트 애니메이션
    const titleIndex = detailsData.findIndex((detail) => detail.id === work.id);
    if (titleIndex >= 0) {
      titlesRef.current.forEach((title) => title.classList.remove('is-active'));
      textsRef.current.forEach((text) => text.classList.remove('is-active'));

      const activeTitle = titlesRef.current[titleIndex];
      const activeText = textsRef.current[titleIndex];

      if (activeTitle) activeTitle.classList.add('is-active');
      if (activeText) activeText.classList.add('is-active');

      const titleChars = splitTitlesDataRef.current[titleIndex]?.chars || [];
      const textLines = splitTextsDataRef.current[titleIndex]?.lines || [];

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

    // CTA 버튼 애니메이션
    const ctaButton = details.querySelector('.details__cta-button');
    if (ctaButton) {
      gsap.set(ctaButton, { y: '100%', opacity: 0 });
      ctaButton.style.pointerEvents = 'none';
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
    if (!showDetailsActiveRef.current) return;
    showDetailsActiveRef.current = false;

    const details = detailsRef.current;
    const grid = gridRef.current;
    if (!details || !grid) return;

    // 상세창 영역 마우스 이벤트 제거
    if (detailsMouseEnterHandlerRef.current) {
      details.removeEventListener('mouseenter', detailsMouseEnterHandlerRef.current);
    }
    if (detailsMouseLeaveHandlerRef.current) {
      details.removeEventListener('mouseleave', detailsMouseLeaveHandlerRef.current);
    }

    grid.classList.remove('--is-details-showing');
    document.body.classList.remove('cursor-cross', 'cross-locked', 'header-hidden', 'details-open');

    const detailsX = getResponsiveDetailsX(false);
    
    // 그리드를 원래 위치로 복귀 (애니메이션)
    // centerGrid()는 그리드의 x를 0으로 설정하고 컨테이너의 marginLeft로 중앙 정렬
    // 따라서 그리드의 x를 0으로 애니메이션하면 됨
    gsap.to(grid, {
      x: 0,
      duration: 1.2,
      ease: 'power3.inOut',
      onComplete: () => {
        // 애니메이션 완료 후 컨테이너 위치 재조정
        centerGrid();
      },
    });

    gsap.to(details, {
      x: detailsX,
      duration: 1.2,
      ease: 'power3.inOut',
      onComplete: () => {
        details.classList.remove('--is-showing');
        gsap.set(details, {
          opacity: 0,
          display: 'none',
          pointerEvents: 'none',
          visibility: 'hidden'
        });
      },
    });

    // 텍스트 애니메이션
    titlesRef.current.forEach((title) => {
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

    textsRef.current.forEach((text) => {
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
    if (!currentProductRef.current && crossRef.current) {
      gsap.to(crossRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
        onComplete: () => {
          if (crossRef.current) {
            gsap.set(crossRef.current, {
              visibility: 'hidden',
              pointerEvents: 'none'
            });
          }
        }
      });
    }
    setActiveDetailId(null);
  };

  // 시작 애니메이션
  const intro = () => {
    if (!gridRef.current || !containerRef.current) return;

    const grid = gridRef.current;
    const container = containerRef.current;
    const circles = circleRefs.current.filter(Boolean);
    
    // 그리드 중앙 정렬 및 컨테이너 크기 조정
    centerGrid();

    const timeline = gsap.timeline();

    // 초기 상태 설정
    timeline.set(container, { scale: 0.5 });
    timeline.set(circles, {
      scale: 0.5,
      opacity: 0,
    });

    // 원들이 랜덤하게 나타나기
    timeline.to(circles, {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "power3.out",
      stagger: {
        amount: 1.2,
        from: "random"
      }
    });

    // 그리드 확대
    timeline.to(container, {
      scale: 1,
      duration: 1.2,
      ease: "power3.inOut",
      onComplete: () => {
        setIsLoaded(true);
        document.body.classList.remove('loading');
        // 애니메이션 완료 후 IntersectionObserver 시작
        observeCircles();
        // 상세창 텍스트 초기화
        setupDetails();
      }
    });
  };

  const setupDetails = () => {
    if (!detailsRef.current || !crossRef.current) return;

    const details = detailsRef.current;
    const cross = crossRef.current;
    const titles = Array.from(details.querySelectorAll('.details__title p'));
    const texts = Array.from(details.querySelectorAll('.details__body [data-text]'));

    titlesRef.current = titles;
    textsRef.current = texts;

    splitTitlesDataRef.current = titles.map((title) => splitText(title, 'lines, chars'));
    splitTextsDataRef.current = texts.map((text) => {
      const result = splitText(text, 'lines');
      return { lines: result.lines };
    });

    titles.forEach((title) => title.classList.remove('is-active'));
    texts.forEach((text) => text.classList.remove('is-active'));

    // 상세창 초기 위치 설정
    const initialDetailsX = getResponsiveDetailsX(false);
    gsap.set(details, { 
      x: initialDetailsX, 
      opacity: 0, 
      display: 'none',
      pointerEvents: 'none',
      visibility: 'hidden'
    });

    // cross 버튼 초기 상태 설정
    const isMobileDevice = window.innerWidth <= 799;
    if (isMobileDevice) {
      gsap.set(cross, {
        scale: 0,
        opacity: 0,
        pointerEvents: 'none',
        x: 0,
        y: 0,
        visibility: 'hidden'
      });
    } else {
      gsap.set(cross, {
        scale: 0,
        opacity: 0,
        pointerEvents: 'none',
        visibility: 'hidden'
      });
    }

    // 그리드 클릭 핸들러
      const handleGridClick = (e) => {
      if (showDetailsActiveRef.current && !details.contains(e.target) && !cross.contains(e.target)) {
          hideDetails();
        }
      };
    
    // 문서 전체 클릭 핸들러 (상세창 외부 클릭 시 닫기)
    const handleDocumentClick = (e) => {
      if (showDetailsActiveRef.current && 
          details && 
          !details.contains(e.target) && 
          cross && 
          !cross.contains(e.target) &&
          gridRef.current &&
          !gridRef.current.contains(e.target)) {
        hideDetails();
    }
    };

    // 닫기 버튼 클릭 핸들러
    const handleCrossClick = (e) => {
      e.stopPropagation();
      if (showDetailsActiveRef.current) hideDetails();
    };

    if (gridRef.current) {
      gridRef.current.addEventListener('click', handleGridClick);
    }
    document.addEventListener('click', handleDocumentClick);
    cross.addEventListener('click', handleCrossClick);

    // cleanup 함수 반환
    return () => {
      if (gridRef.current) {
        gridRef.current.removeEventListener('click', handleGridClick);
      }
      document.removeEventListener('click', handleDocumentClick);
      cross.removeEventListener('click', handleCrossClick);
    };
  };

  useEffect(() => {
    if (!gridRef.current) return;

    // 이미지 preload 후 애니메이션 시작
    preloadImages('.main-grid img')
      .then(() => {
        // DOM이 완전히 렌더링될 때까지 대기
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            intro();
          });
        });
      })
      .catch(() => {
        // 이미지 로드 실패해도 애니메이션 실행
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            intro();
          });
        });
      });
  }, []);

  // 리사이즈 핸들러
  useEffect(() => {
    if (!isLoaded) return;

    const handleResize = () => {
      centerGrid();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isLoaded]);

  return (
    <div className="main-page-container" ref={containerRef}>
      <div className="main-grid" ref={gridRef}>
        {gridStructure.map((column, columnIndex) => (
          <div className="main-grid-column" key={`column-${columnIndex}`}>
            {column.map((work, workIndex) => {
              const globalIndex = columnIndex * GRID_ROWS + workIndex;
              return (
                <div
                  key={work.id}
                  className="main-grid-circle"
                  ref={(el) => {
                    if (el) circleRefs.current[globalIndex] = el;
                  }}
                  data-work-id={work.id}
                  onMouseEnter={() => setHoveredWork(work.id)}
                  onMouseLeave={() => setHoveredWork(null)}
                  onClick={(e) => handleWorkClick(work, e)}
                >
                  <div className="main-circle-inner">
                    <img 
                      src={work.img} 
                      alt={work.title}
                      className="main-circle-image"
                    />
                  </div>
                  {hoveredWork === work.id && (
                    <div className="main-circle-tooltip">
                      <div className="main-tooltip-title">{work.title}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* 상세창과 닫기 버튼을 body에 직접 렌더링 (fixed 위치를 위해) */}
      {createPortal(
        <>
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
        </>,
        document.body
      )}
    </div>
  );
};

export default MainPage;

