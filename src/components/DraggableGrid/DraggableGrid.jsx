import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Flip } from 'gsap/Flip';
import { preloadImages, splitText } from './js/utils.js';
import { WORK_THUMBNAILS } from '../../data/workThumbsData.js';
import resolveThumbSrc from '../../utils/resolveThumbSrc.js';
import loveHero from '../../assets/김윤정/김윤정_Video_작품1_01.webp';
import loveScene02 from '../../assets/김윤정/김윤정_Video_작품1_02.webp';
import loveScene03 from '../../assets/김윤정/김윤정_Video_작품1_03.webp';
import loveScene04 from '../../assets/김윤정/김윤정_Video_작품1_04.webp';
import loveScene05 from '../../assets/김윤정/김윤정_Video_작품1_05.webp';
import loveScene06 from '../../assets/김윤정/김윤정_Video_작품1_06.webp';
import videoBadge from '../../assets/branding_logo/Video.webp';
import ModalHeroSection from '../ModalHeroSection/ModalHeroSection.jsx';
import './DraggableGrid.css';

const PRODUCTS = WORK_THUMBNAILS.map((image, index) => ({
  id: index + 1,
  img: resolveThumbSrc(image.file),
  ...image,
}));

const LOVE_AT_RUST_SIGHT_ID =
  WORK_THUMBNAILS.find((item) => item.title === 'Love at Rust Sight')?.id ?? null;

const LOVE_AT_RUST_SIGHT_MEDIA = {
  hero: loveHero,
  gallery: [loveScene02, loveScene03, loveScene04, loveScene05, loveScene06],
};

const LOVE_AT_RUST_SIGHT_FEATURES = [
  {
    id: 'feature-1',
    type: 'text-image',
    image: loveScene02,
    alt: 'Love at Rust Sight 장면 1',
    paragraphs: [
      '〈Love at Rust Sight〉는 로봇과 천사가 등장하는 이야기로, 가족에게 버림받은 청소로봇이 우연히 천사를 만난 후 자신을 가족으로 맞이해주길 바라며 죽으려 한다는 내용의 2D 애니메이션이다.',
      "함께했던 가족과 헤어지고 거리를 청소하는 미니봇. 미니봇은 자신을 가족으로 받아줄 '천사'를 찾아다닌다.",
    ],
  },
  {
    id: 'feature-2',
    type: 'media-caption',
    image: loveScene03,
    alt: 'Love at Rust Sight 장면 2',
    caption:
      '영상이 시작되는 초반부는 한색, 후반부로 진행될수록 난색으로 분위기를 전환시켜 희망적이고 따뜻한 전개를 표현하고자 했습니다.',
  },
  {
    id: 'feature-3',
    type: 'media',
    image: loveScene04,
    alt: 'Love at Rust Sight 장면 3',
  },
  {
    id: 'feature-4',
    type: 'media',
    image: loveScene05,
    alt: 'Love at Rust Sight 장면 4',
  },
  {
    id: 'feature-5',
    type: 'media',
    image: loveScene06,
    alt: 'Love at Rust Sight 장면 5',
  },
];

const KIM_YUNJUNG_INSTAGRAM =
  WORK_THUMBNAILS.find((item) => item.title === 'Love at Rust Sight')?.instagram ||
  'https://www.instagram.com/zlz_300/';

const LoveAtRustSightDetail = () => (
  <div className="work-detail">
    <ModalHeroSection
      eyebrowImageSrc={videoBadge}
      eyebrowImageAlt="Video Content 로고"
      eyebrowText="Video Content"
      title="Love at Rust Sight"
      lead="함께했던 가족과 헤어진 후 거리를 청소하는 미니봇. 미니봇은 자신을 가족으로 받아줄 ‘천사’를 찾아다닌다."
      mediaSrc={LOVE_AT_RUST_SIGHT_MEDIA.hero}
      mediaAlt="Love at Rust Sight 대표 장면"
      ctas={[
        { label: '디자이너의 다른 작품', variant: 'primary', onClick: undefined },
        {
          label: '개인 SNS',
          variant: 'secondary',
          onClick: () => window.open(KIM_YUNJUNG_INSTAGRAM, '_blank', 'noopener,noreferrer'),
        },
      ]}
    />
    {LOVE_AT_RUST_SIGHT_FEATURES.map((feature, index) => (
      <section
        key={feature.id}
        className={`work-detail__section work-detail__feature work-detail__feature--${index + 1} ${
          feature.type !== 'text-image' ? 'work-detail__feature--media-only' : ''
        }`}
      >
        <div className="work-detail__image-block">
          <img src={feature.image} alt={feature.alt} loading="lazy" />
        </div>
        {feature.type === 'text-image' && (
          <div className="work-detail__feature-text">
            {feature.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        )}
        {feature.type === 'media-caption' && feature.caption && (
          <p className="work-detail__feature-caption">{feature.caption}</p>
        )}
      </section>
    ))}
  </div>
);

const PRODUCT_COUNT = PRODUCTS.length;
const GRID_COLUMNS = 6;
const GRID_ROWS = Math.ceil(PRODUCT_COUNT / GRID_COLUMNS);

const productsData = PRODUCTS;
const detailsData = PRODUCTS.map((product) => ({
  id: product.id,
  title: product.title,
  description: product.description,
}));

const columns = Array.from({ length: GRID_COLUMNS }, (_, columnIndex) => {
  return Array.from({ length: GRID_ROWS }, (_, rowIndex) => {
    const productIndex = columnIndex * GRID_ROWS + rowIndex;
    return productsData[productIndex]?.id ?? null;
  }).filter(Boolean);
});

const DraggableGrid = () => {
  const [activeDetailId, setActiveDetailId] = useState(null);
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const detailsRef = useRef(null);
  const detailsThumbRef = useRef(null);
  const crossRef = useRef(null);
  const productRefs = useRef([]);
  const boundsRef = useRef({ minX: 0, maxX: 0, minY: 0, maxY: 0 });

  productRefs.current = [];

  useEffect(() => {
    document.body.classList.add('loading');
    gsap.registerPlugin(Draggable, Flip);

    const container = containerRef.current;
    const grid = gridRef.current;
    const products = productRefs.current.filter(Boolean);
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

    const getViewportSize = () => {
      const rect = container.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    };

    const getResponsivePadding = () => {
      const { width } = getViewportSize();
      if (width < 640) {
        return { paddingX: 60, paddingY: 40 };
      }
      if (width < 1200) {
        return { paddingX: 120, paddingY: 80 };
      }
      return { paddingX: 200, paddingY: 120 };
    };

    const clampToBounds = (x, y, bounds) => ({
      x: Math.max(bounds.minX, Math.min(bounds.maxX, x)),
      y: Math.max(bounds.minY, Math.min(bounds.maxY, y)),
    });

    const computeBounds = () => {
      const { width, height } = getViewportSize();
      const { paddingX, paddingY } = getResponsivePadding();
      const rawMinX = width - grid.offsetWidth - paddingX;
      const rawMinY = height - grid.offsetHeight - paddingY;

      return {
        minX: Math.min(rawMinX, paddingX),
        maxX: paddingX,
        minY: Math.min(rawMinY, paddingY),
        maxY: paddingY,
      };
    };

    const centerGrid = (providedBounds) => {
      const bounds = providedBounds || computeBounds();
      boundsRef.current = bounds;
      const { width, height } = getViewportSize();
      const centerX = (width - grid.offsetWidth) / 2;
      const centerY = (height - grid.offsetHeight) / 2;
      const clamped = clampToBounds(centerX, centerY, bounds);
      gsap.set(grid, { x: clamped.x, y: clamped.y });
    };

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
        onDragStart: () => {
          grid.classList.add('--is-dragging');
        },
        onDragEnd: () => {
          grid.classList.remove('--is-dragging');
        },
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
      if (!draggable || showDetailsActive) {
        return;
      }

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

      const targetX = event.clientX;
      const targetY = event.clientY;

      gsap.to(cross, {
        x: targetX,
        y: targetY,
        duration: 0.25,
        ease: 'power2.out',
      });
    };

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

      products.forEach((product) => {
        observer.observe(product);
      });
    };

    const flipProduct = (product) => {
      if (detailsThumb) {
        detailsThumb.innerHTML = '';
      }

      currentProduct = product;
      originalParent = product.parentNode;

      if (observer) {
        observer.unobserve(product);
      }

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

      if (detailsThumb) {
        detailsThumb.innerHTML = '';
      }

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

    const showDetails = (product) => {
      if (showDetailsActive) return;
      showDetailsActive = true;
      details.classList.add('--is-showing');
      container.classList.add('--is-details-showing');
      document.body.classList.add('cursor-cross');
      document.body.classList.add('cross-locked');
      document.body.classList.add('header-hidden');
      document.body.classList.add('details-open');

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
      const isLoveDetail = numericProductId === LOVE_AT_RUST_SIGHT_ID;
      const titleIndex = detailsData.findIndex((detail) => detail.id.toString() === productId);

      setActiveDetailId(numericProductId);

      if (isLoveDetail) {
        if (detailsThumb) {
          detailsThumb.innerHTML = '';
        }
        if (cross) {
          gsap.to(cross, {
            scale: 1,
            duration: 0.4,
            delay: 0.5,
            ease: 'power2.out',
          });
        }
      } else {
        flipProduct(product);
      }

      if (titleIndex >= 0 && !isLoveDetail) {
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
      document.body.classList.remove('cursor-cross');
      document.body.classList.remove('cross-locked');
      document.body.classList.remove('cursor-cross');
      document.body.classList.remove('header-hidden');
      document.body.classList.remove('details-open');

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

    const handleDetails = () => {
      titles = Array.from(details.querySelectorAll('.details__title p'));
      texts = Array.from(details.querySelectorAll('.details__body [data-text]'));

      splitTitlesData = titles.map((title) => splitText(title, 'lines, chars'));
      splitTextsData = texts.map(() => ({ lines: [] }));

      titles.forEach((title) => title.classList.remove('is-active'));
      texts.forEach((text) => text.classList.remove('is-active'));

      productClickHandlers = products.map((product) => {
        const handler = (event) => {
          event.stopPropagation();
          showDetails(product);
        };
        product.addEventListener('click', handler);
        return { product, handler };
      });

      containerClickHandler = () => {
        if (showDetailsActive) hideDetails();
      };
      container.addEventListener('click', containerClickHandler);

      crossClickHandler = (event) => {
        event.stopPropagation();
        if (showDetailsActive) hideDetails();
      };

      if (cross) {
        cross.addEventListener('click', crossClickHandler);
      }
    };

    const intro = () => {
      const initialBounds = computeBounds();
      centerGrid(initialBounds);

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
          document.body.classList.remove('loading');
        },
      });

      timeline.set(container, { scale: 0.5 });
      timeline.set(products, { scale: 0.5, opacity: 0 });
      timeline.to(products, {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
        stagger: { amount: 1.2, from: 'random' },
      });
      timeline.to(container, {
        scale: 1,
        duration: 1.2,
        ease: 'power3.inOut',
      }, 0);
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

      productClickHandlers.forEach(({ product, handler }) => {
        product.removeEventListener('click', handler);
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
      document.body.classList.remove('cursor-cross');
      document.body.classList.remove('header-hidden');
      document.body.classList.remove('details-open');
      document.body.classList.remove('header-hidden');
    };
  }, []);

  const isLoveAtRustSightActive = activeDetailId === LOVE_AT_RUST_SIGHT_ID;

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
                      const productIndex = productsData.findIndex((item) => item.id === productId);
                      if (productIndex >= 0) {
                        productRefs.current[productIndex] = el;
                      }
                    }}
                  >
                    <img
                      src={productsData.find((product) => product.id === productId)?.img}
                      alt={`Product ${productId}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={`details${isLoveAtRustSightActive ? ' details--love' : ''}`} ref={detailsRef}>
        <div className="details__title">
          {detailsData.map((detail) => (
            <p key={detail.id} data-title={detail.id} data-text>
              {detail.title}
            </p>
          ))}
        </div>
        <div className={`details__body${isLoveAtRustSightActive ? ' details__body--love' : ''}`}>
          <div className="details__thumb" ref={detailsThumbRef} />
          <div className={`details__content${isLoveAtRustSightActive ? ' details__content--love' : ''}`}>
            {isLoveAtRustSightActive ? (
              <LoveAtRustSightDetail />
            ) : (
              <>
                <div className="details__texts">
                  {detailsData.map((detail) => (
                    <p key={detail.id} data-desc={detail.id} data-text>
                      {detail.description}
                    </p>
                  ))}
                </div>
                <button type="button" className="details__cta-button">
                  작품 보러가기
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="cross" ref={crossRef}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18" stroke="#313131" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 6L18 18" stroke="#313131" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
};

export default DraggableGrid;