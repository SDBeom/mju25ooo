import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Flip } from 'gsap/Flip';
import { SplitText } from 'gsap/SplitText';
import './DraggableGrid.css';

// GSAP 플러그인 등록
gsap.registerPlugin(Draggable, Flip, SplitText);

const DraggableGrid = () => {
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const detailsRef = useRef(null);
  const detailsThumbRef = useRef(null);
  const crossRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !gridRef.current) return;

    const container = containerRef.current;
    const grid = gridRef.current;
    const details = detailsRef.current;
    const detailsThumb = detailsThumbRef.current;
    const cross = crossRef.current;
    const products = [...grid.querySelectorAll(".product div")];

    let SHOW_DETAILS = false;
    let currentProduct = null;
    let originalParent = null;
    let originalProduct = null; // 원본 제품을 추적하기 위한 변수
    let draggable = null;
    let observer = null;

    // 이미지 프리로드 함수
    const preloadImages = (selector = 'img') => {
      return new Promise((resolve) => {
        const images = document.querySelectorAll(selector);
        let loadedCount = 0;
        
        if (images.length === 0) {
          resolve();
          return;
        }

        const checkComplete = () => {
          loadedCount++;
          if (loadedCount === images.length) {
            resolve();
          }
        };

        images.forEach(img => {
          if (img.complete) {
            checkComplete();
          } else {
            img.addEventListener('load', checkComplete);
            img.addEventListener('error', checkComplete);
          }
        });
      });
    };

    // 그리드 중앙 정렬
    const centerGrid = () => {
      const gridWidth = grid.offsetWidth;
      const gridHeight = grid.offsetHeight;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const centerX = (windowWidth - gridWidth) / 2;
      const centerY = (windowHeight - gridHeight) / 2;

      gsap.set(grid, {
        x: centerX,
        y: centerY
      });
    };

    // 초기 애니메이션
    const intro = () => {
      centerGrid();

      const timeline = gsap.timeline();

      timeline.set(container, { scale: 0.5 });
      timeline.set(products, {
        scale: 0.5,
        opacity: 0,
      });

      timeline.to(products, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: {
          amount: 1.2,
          from: "random"
        }
      });
      timeline.to(container, {
        scale: 1,
        duration: 1.2,
        ease: "power3.inOut",
        onComplete: () => {
          setupDraggable();
          addEvents();
          observeProducts();
          const { titles, texts } = handleDetails();
          
          // hideDetails 함수에서 사용할 수 있도록 전역 변수로 저장
          window.detailsTitles = titles;
          window.detailsTexts = texts;
        }
      });
    };

    // 드래그 설정
    const setupDraggable = () => {
      container.classList.add("--is-loaded");

      draggable = Draggable.create(grid, {
        type: "x,y",
        bounds: {
          minX: -(grid.offsetWidth - window.innerWidth) - 200,
          maxX: 200,
          minY: -(grid.offsetHeight - window.innerHeight) - 100,
          maxY: 100
        },
        inertia: true,
        allowEventDefault: true,
        edgeResistance: 0.9,

        onDragStart: () => {
          grid.classList.add("--is-dragging");
        },

        onDragEnd: () => {
          grid.classList.remove("--is-dragging");
        }
      })[0];
    };

    // 이벤트 추가
    const addEvents = () => {
      window.addEventListener("wheel", (e) => {
        e.preventDefault();

        const deltaX = -e.deltaX * 7;
        const deltaY = -e.deltaY * 7;

        const currentX = gsap.getProperty(grid, "x");
        const currentY = gsap.getProperty(grid, "y");

        const newX = currentX + deltaX;
        const newY = currentY + deltaY;

        const bounds = draggable.vars.bounds;
        const clampedX = Math.max(bounds.minX, Math.min(bounds.maxX, newX));
        const clampedY = Math.max(bounds.minY, Math.min(bounds.maxY, newY));

        gsap.to(grid, {
          x: clampedX,
          y: clampedY,
          duration: 0.3,
          ease: "power3.out"
        });
      }, { passive: false });

      window.addEventListener("resize", () => {
        updateBounds();
      });

      window.addEventListener("mousemove", (e) => {
        if (SHOW_DETAILS) {
          handleCursor(e);
        }
      });
    };

    // 바운드 업데이트
    const updateBounds = () => {
      if (draggable) {
        draggable.vars.bounds = {
          minX: -(grid.offsetWidth - window.innerWidth) - 50,
          maxX: 50,
          minY: -(grid.offsetHeight - window.innerHeight) - 50,
          maxY: 50
        }
      }
    };

    // 제품 관찰
    const observeProducts = () => {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.target === currentProduct) return;

          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out"
            });
          } else {
            gsap.to(entry.target, {
              opacity: 0,
              scale: 0.5,
              duration: 0.5,
              ease: "power2.in"
            });
          }
        });
      }, {
        root: null,
        threshold: 0.1
      });

      products.forEach(product => {
        observer.observe(product);
      });
    };

    // 디테일 처리
    const handleDetails = () => {
      SHOW_DETAILS = false;

      const titles = details.querySelectorAll(".details__title p");
      const texts = details.querySelectorAll(".details__body [data-text]");

      new SplitText(titles, {
        type: "lines, chars",
        mask: "lines",
        charsClass: "char"
      });

      new SplitText(texts, {
        type: "lines",
        mask: "lines",
        linesClass: "line"
      });

      products.forEach(product => {
        product.addEventListener("click", (e) => {
          e.stopPropagation();
          showDetails(product);
        });
      });

      // grid 영역을 클릭했을 때만 hideDetails 호출
      grid.addEventListener("click", (e) => {
        // product를 클릭한 경우는 무시
        if (e.target.closest('.product')) return;
        
        if (SHOW_DETAILS) hideDetails();
      });

      // container 영역도 클릭 가능하도록 추가
      container.addEventListener("click", (e) => {
        console.log('Container clicked:', e.target);
        // details 영역이나 product를 클릭한 경우는 무시
        if (e.target.closest('.details') || e.target.closest('.product')) {
          console.log('Ignoring click on details or product');
          return;
        }
        
        console.log('Calling hideDetails');
        if (SHOW_DETAILS) hideDetails();
      });

      // hideDetails 함수에서 사용할 수 있도록 titles와 texts를 반환
      return { titles, texts };
    };

    // 디테일 표시
    const showDetails = (product) => {
      if (SHOW_DETAILS) return;
      SHOW_DETAILS = true;
      details.classList.add("--is-showing");
      container.classList.add("--is-details-showing");

      gsap.to(container, {
        x: "-50vw",
        duration: 1.2,
        ease: "power3.inOut",
      });

      gsap.to(details, {
        x: 0,
        duration: 1.2,
        ease: "power3.inOut",
      });

      flipProduct(product);

      const title = details.querySelector(`[data-title="${product.dataset.id}"]`);
      const text = details.querySelector(`[data-desc="${product.dataset.id}"]`);

      if (title) {
        gsap.to(title.querySelectorAll(".char"), {
          y: 0,
          duration: 1.1,
          delay: 0.4,
          ease: "power3.inOut",
          stagger: 0.025
        });
      }

      if (text) {
        gsap.to(text.querySelectorAll(".line"), {
          y: 0,
          duration: 1.1,
          delay: 0.4,
          ease: "power3.inOut",
          stagger: 0.05,
        });
      }
    };

    // 디테일 숨김
    const hideDetails = () => {
      console.log('hideDetails called');
      SHOW_DETAILS = false;

      container.classList.remove("--is-details-showing");

      gsap.to(container, {
        x: 0,
        duration: 1.2,
        delay: 0.3,
        ease: "power3.inOut",
        onComplete: () => {
          details.classList.remove("--is-showing");
        }
      });

      gsap.to(details, {
        x: "50vw",
        duration: 1.2,
        delay: 0.3,
        ease: "power3.inOut"
      });

      unFlipProduct();

      const titles = window.detailsTitles || details.querySelectorAll(".details__title p");
      const texts = window.detailsTexts || details.querySelectorAll(".details__body [data-text]");

      titles.forEach(title => {
        gsap.to(title.querySelectorAll(".char"), {
          y: "100%",
          duration: 0.6,
          ease: "power3.inOut",
          stagger: {
            amount: 0.025,
            from: "end"
          }
        });
      });

      texts.forEach(text => {
        gsap.to(text.querySelectorAll(".line"), {
          y: "100%",
          duration: 0.6,
          ease: "power3.inOut",
          stagger: 0.05,
        });
      });
    };

    // 제품 플립
    const flipProduct = (product) => {
      currentProduct = product;
      originalParent = product.parentNode;
      originalProduct = product; // 원본 제품 저장

      if (observer) {
        observer.unobserve(product);
      }

      // 1. 먼저 Flip.getState()로 시작 상태를 기록 (DOM 변경 전에!)
      const state = Flip.getState(product);

      // 2. 이제 detailsThumb에 이전 제품이 있다면 정리 (이미지 축적 방지)
      while (detailsThumb.firstChild) {
        detailsThumb.removeChild(detailsThumb.firstChild);
      }

      // 3. 새 제품을 detailsThumb에 추가
      detailsThumb.appendChild(product);

      Flip.from(state, {
        absolute: true,
        duration: 1.2,
        ease: "power3.inOut",
      });

      gsap.to(cross, {
        scale: 1,
        duration: 0.4,
        delay: 0.5,
        ease: "power2.out"
      });
    };

    // 제품 언플립 (역방향 Flip 애니메이션)
    const unFlipProduct = () => {
      if (!currentProduct || !originalParent || !originalProduct) return;

      const detailImage = detailsThumb.querySelector('div');
      if (!detailImage) return;

      // 1. 현재 상세 이미지의 상태를 기록 (역방향 애니메이션의 시작점)
      const state = Flip.getState(detailImage);

      // 2. 원본 위치로 제품을 이동
      originalParent.appendChild(currentProduct);

      // 3. 역방향 Flip 애니메이션 실행 (상세 -> 그리드)
      Flip.from(state, {
        absolute: true,
        duration: 1.2,
        delay: 0.3,
        ease: "power3.inOut",
        onComplete: () => {
          // 4. 애니메이션 완료 후 정리
          while (detailsThumb.firstChild) {
            detailsThumb.removeChild(detailsThumb.firstChild);
          }
          
          // 변수 초기화
          currentProduct = null;
          originalParent = null;
          originalProduct = null;
        }
      });

      gsap.to(cross, {
        scale: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    };

    // 커서 처리
    const handleCursor = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      gsap.to(cross, {
        x: x - cross.offsetWidth / 2,
        y: y - cross.offsetHeight / 2,
        duration: 0.4,
        ease: "power2.out"
      });
    };

    // 초기화
    const init = () => {
      intro();
    };

    // 이미지 프리로드 후 초기화
    preloadImages('.grid img').then(() => {
      init();
      document.body.classList.remove('loading');
    });

    // 클린업
    return () => {
      if (draggable) {
        draggable.kill();
      }
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <main>
      <div className="container" ref={containerRef}>
        <div className="grid" ref={gridRef}>
          <div className="column">
            <div className="product">
              <div data-id="3"><img src="/poster_final.png" alt="Product 3" /></div>
            </div>
            <div className="product">
              <div data-id="7"><img src="/poster_final.png" alt="Product 7" /></div>
            </div>
            <div className="product">
              <div data-id="1"><img src="/poster_final.png" alt="Product 1" /></div>
            </div>
            <div className="product">
              <div data-id="5"><img src="/poster_final.png" alt="Product 5" /></div>
            </div>
            <div className="product">
              <div data-id="2"><img src="/poster_final.png" alt="Product 2" /></div>
            </div>
          </div>
          <div className="column">
            <div className="product">
              <div data-id="4"><img src="/poster_final.png" alt="Product 4" /></div>
            </div>
            <div className="product">
              <div data-id="6"><img src="/poster_final.png" alt="Product 6" /></div>
            </div>
            <div className="product">
              <div data-id="3"><img src="/poster_final.png" alt="Product 3" /></div>
            </div>
            <div className="product">
              <div data-id="7"><img src="/poster_final.png" alt="Product 7" /></div>
            </div>
            <div className="product">
              <div data-id="1"><img src="/poster_final.png" alt="Product 1" /></div>
            </div>
          </div>
          <div className="column">
            <div className="product">
              <div data-id="5"><img src="/poster_final.png" alt="Product 5" /></div>
            </div>
            <div className="product">
              <div data-id="2"><img src="/poster_final.png" alt="Product 2" /></div>
            </div>
            <div className="product">
              <div data-id="4"><img src="/poster_final.png" alt="Product 4" /></div>
            </div>
            <div className="product">
              <div data-id="6"><img src="/poster_final.png" alt="Product 6" /></div>
            </div>
            <div className="product">
              <div data-id="1"><img src="/poster_final.png" alt="Product 1" /></div>
            </div>
          </div>
          <div className="column">
            <div className="product">
              <div data-id="3"><img src="/poster_final.png" alt="Product 3" /></div>
            </div>
            <div className="product">
              <div data-id="5"><img src="/poster_final.png" alt="Product 5" /></div>
            </div>
            <div className="product">
              <div data-id="1"><img src="/poster_final.png" alt="Product 1" /></div>
            </div>
            <div className="product">
              <div data-id="6"><img src="/poster_final.png" alt="Product 6" /></div>
            </div>
            <div className="product">
              <div data-id="2"><img src="/poster_final.png" alt="Product 2" /></div>
            </div>
          </div>
          <div className="column">
            <div className="product">
              <div data-id="4"><img src="/poster_final.png" alt="Product 4" /></div>
            </div>
            <div className="product">
              <div data-id="6"><img src="/poster_final.png" alt="Product 6" /></div>
            </div>
            <div className="product">
              <div data-id="3"><img src="/poster_final.png" alt="Product 3" /></div>
            </div>
            <div className="product">
              <div data-id="5"><img src="/poster_final.png" alt="Product 5" /></div>
            </div>
            <div className="product">
              <div data-id="1"><img src="/poster_final.png" alt="Product 1" /></div>
            </div>
          </div>
          <div className="column">
            <div className="product">
              <div data-id="5"><img src="/poster_final.png" alt="Product 5" /></div>
            </div>
            <div className="product">
              <div data-id="6"><img src="/poster_final.png" alt="Product 6" /></div>
            </div>
            <div className="product">
              <div data-id="2"><img src="/poster_final.png" alt="Product 2" /></div>
            </div>
            <div className="product">
              <div data-id="1"><img src="/poster_final.png" alt="Product 1" /></div>
            </div>
            <div className="product">
              <div data-id="4"><img src="/poster_final.png" alt="Product 4" /></div>
            </div>
          </div>
          <div className="column">
            <div className="product">
              <div data-id="3"><img src="/poster_final.png" alt="Product 3" /></div>
            </div>
            <div className="product">
              <div data-id="4"><img src="/poster_final.png" alt="Product 4" /></div>
            </div>
            <div className="product">
              <div data-id="1"><img src="/poster_final.png" alt="Product 1" /></div>
            </div>
            <div className="product">
              <div data-id="2"><img src="/poster_final.png" alt="Product 2" /></div>
            </div>
            <div className="product">
              <div data-id="6"><img src="/poster_final.png" alt="Product 6" /></div>
            </div>
          </div>
          <div className="column">
            <div className="product">
              <div data-id="5"><img src="/poster_final.png" alt="Product 5" /></div>
            </div>
            <div className="product">
              <div data-id="2"><img src="/poster_final.png" alt="Product 2" /></div>
            </div>
            <div className="product">
              <div data-id="4"><img src="/poster_final.png" alt="Product 4" /></div>
            </div>
            <div className="product">
              <div data-id="6"><img src="/poster_final.png" alt="Product 6" /></div>
            </div>
            <div className="product">
              <div data-id="1"><img src="/poster_final.png" alt="Product 1" /></div>
            </div>
          </div>
          <div className="column">
            <div className="product">
              <div data-id="3"><img src="/poster_final.png" alt="Product 3" /></div>
            </div>
            <div className="product">
              <div data-id="5"><img src="/poster_final.png" alt="Product 5" /></div>
            </div>
            <div className="product">
              <div data-id="1"><img src="/poster_final.png" alt="Product 1" /></div>
            </div>
            <div className="product">
              <div data-id="6"><img src="/poster_final.png" alt="Product 6" /></div>
            </div>
            <div className="product">
              <div data-id="2"><img src="/poster_final.png" alt="Product 2" /></div>
            </div>
          </div>
          <div className="column">
            <div className="product">
              <div data-id="4"><img src="/poster_final.png" alt="Product 4" /></div>
            </div>
            <div className="product">
              <div data-id="6"><img src="/poster_final.png" alt="Product 6" /></div>
            </div>
            <div className="product">
              <div data-id="3"><img src="/poster_final.png" alt="Product 3" /></div>
            </div>
            <div className="product">
              <div data-id="5"><img src="/poster_final.png" alt="Product 5" /></div>
            </div>
            <div className="product">
              <div data-id="1"><img src="/poster_final.png" alt="Product 1" /></div>
            </div>
          </div>
        </div>
      </div>

      <div className="details" ref={detailsRef}>
        <div className="details__title">
          <p data-title="1" data-text>Crimson Amphora</p>
          <p data-title="2" data-text>Rustic Urn</p>
          <p data-title="3" data-text>Golden Vessel</p>
          <p data-title="4" data-text>Sunlit Amphora</p>
          <p data-title="5" data-text>Midnight Reliquary</p>
          <p data-title="6" data-text>Amber Ewer</p>
          <p data-title="7" data-text>Sylvan Chalice</p>
        </div>
        <div className="details__body">
          <div className="details__thumb" ref={detailsThumbRef}></div>
          <div className="details__texts">
            <p data-desc="1" data-text>
              <span>$300,00</span>
              This bold red vase stands out with its vibrant hue, a perfect centerpiece to add passion and energy to any
              room. Its smooth surface and classic silhouette make it versatile, equally suited for modern interiors or
              traditional spaces, bringing warmth and a touch of drama wherever it is placed.
              <button>Add to cart</button>
            </p>
            <p data-desc="2" data-text>
              <span>$220,00</span>
              With its earthy tones and natural speckled finish, this rustic vase evokes the charm of handcrafted
              pottery. Its organic look and timeless shape give a sense of authenticity, making it an ideal piece to
              display dried flowers or simply as a decorative object that adds warmth and artisanal beauty to your home.
              <button>Add to cart</button>
            </p>
            <p data-desc="3" data-text>
              <span>$240,00</span>
              Bright and cheerful, the yellow vase radiates positivity. Its glossy surface reflects light beautifully,
              creating a lively focal point in any setting. Perfect for fresh blooms or displayed on its own, this vase
              captures the essence of sunshine and joy, effortlessly transforming spaces with a vibrant, uplifting touch
              of color.
              <button>Add to cart</button>
            </p>
            <p data-desc="4" data-text>
              <span>$300,00</span>
              Generous in size and striking in presence, the large yellow vase makes a bold decorative statement. Its
              smooth curves and sunny shade are perfect for standing on the floor or dressing up a wide console. Both
              functional and eye-catching, it brings vitality and a contemporary edge to your interior design.
              <button>Add to cart</button>
            </p>
            <p data-desc="5" data-text>
              <span>$390,00</span>
              Sleek and sophisticated, the black vase embodies timeless elegance. Its deep, rich tone makes it
              versatile, pairing effortlessly with minimalist or luxurious décors. Whether holding fresh greenery or
              standing alone as a sculptural accent, this piece exudes modern refinement and bold simplicity, creating
              contrast and balance within any interior style.
              <button>Add to cart</button>
            </p>
            <p data-desc="6" data-text>
              <span>$340,00</span>
              A playful mix of texture and color, the speckled yellow vase is both lively and unique. Its dotted surface
              creates movement and character, while the bright golden base ensures it remains eye-catching. Perfect for
              adding personality to your shelf or table, it combines artistic charm with a cheerful, inviting presence.
              <button>Add to cart</button>
            </p>
            <p data-desc="7" data-text>
              <span>$240,00</span>
              Crafted from natural wood, this vase celebrates organic beauty and timeless simplicity. The warm tones and
              smooth grain bring an earthy elegance to interiors. Perfect for dried arrangements or as a stand-alone
              piece, it highlights craftsmanship and natural textures, making it a versatile addition to rustic, modern,
              or eclectic décors.
              <button>Add to cart</button>
            </p>
          </div>
        </div>
      </div>

      <div className="cross" ref={crossRef}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18" stroke="#313131" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 6L18 18" stroke="#313131" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </main>
  );
};

export default DraggableGrid;
