import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Flip } from 'gsap/Flip';
import { preloadImages, splitText } from './js/utils.js';
import './DraggableGrid.css';

const productsData = [
    { id: 1, img: '/img/1.webp' },
    { id: 2, img: '/img/2.webp' },
    { id: 3, img: '/img/3.webp' },
    { id: 4, img: '/img/4.webp' },
    { id: 5, img: '/img/5.webp' },
    { id: 6, img: '/img/6.webp' },
    { id: 7, img: '/img/7.webp' },
    { id: 8, img: '/img/8.webp' },
    { id: 9, img: '/img/9.webp' },
    { id: 10, img: '/img/10.webp' },
    { id: 11, img: '/img/11.webp' },
];

const detailsData = [
    { id: 1, title: 'Crimson Amphora', price: '$300,00', description: 'This bold red vase stands out with its vibrant hue, a perfect centerpiece to add passion and energy to any room. Its smooth surface and classic silhouette make it versatile, equally suited for modern interiors or traditional spaces, bringing warmth and a touch of drama wherever it is placed.' },
    { id: 2, title: 'Rustic Urn', price: '$220,00', description: 'With its earthy tones and natural speckled finish, this rustic vase evokes the charm of handcrafted pottery. Its organic look and timeless shape give a sense of authenticity, making it an ideal piece to display dried flowers or simply as a decorative object that adds warmth and artisanal beauty to your home.' },
    { id: 3, title: 'Golden Vessel', price: '$240,00', description: 'Bright and cheerful, the yellow vase radiates positivity. Its glossy surface reflects light beautifully, creating a lively focal point in any setting. Perfect for fresh blooms or displayed on its own, this vase captures the essence of sunshine and joy, effortlessly transforming spaces with a vibrant, uplifting touch of color.' },
    { id: 4, title: 'Sunlit Amphora', price: '$300,00', description: 'Generous in size and striking in presence, the large yellow vase makes a bold decorative statement. Its smooth curves and sunny shade are perfect for standing on the floor or dressing up a wide console. Both functional and eye-catching, it brings vitality and a contemporary edge to your interior design.' },
    { id: 5, title: 'Midnight Reliquary', price: '$390,00', description: 'Sleek and sophisticated, the black vase embodies timeless elegance. Its deep, rich tone makes it versatile, pairing effortlessly with minimalist or luxurious décors. Whether holding fresh greenery or standing alone as a sculptural accent, this piece exudes modern refinement and bold simplicity, creating contrast and balance within any interior style.' },
    { id: 6, title: 'Amber Ewer', price: '$340,00', description: 'A playful mix of texture and color, the speckled yellow vase is both lively and unique. Its dotted surface creates movement and character, while the bright golden base ensures it remains eye-catching. Perfect for adding personality to your shelf or table, it combines artistic charm with a cheerful, inviting presence.' },
    { id: 7, title: 'Sylvan Chalice', price: '$240,00', description: 'Crafted from natural wood, this vase celebrates organic beauty and timeless simplicity. The warm tones and smooth grain bring an earthy elegance to interiors. Perfect for dried arrangements or as a stand-alone piece, it highlights craftsmanship and natural textures, making it a versatile addition to rustic, modern, or eclectic décors.' },
];

const DraggableGrid = () => {
    const containerRef = useRef(null);
    const gridRef = useRef(null);
    const detailsRef = useRef(null);
    const detailsThumbRef = useRef(null);
    const crossRef = useRef(null);
    const productRefs = useRef([]);

    useEffect(() => {
        document.body.classList.add('loading');
        gsap.registerPlugin(Draggable, Flip);

        const container = containerRef.current;
        const grid = gridRef.current;
        const products = productRefs.current.filter(el => el);
        const details = detailsRef.current;
        const detailsThumb = detailsThumbRef.current;
        const cross = crossRef.current;
        let draggable;
        let observer;
        let isDragging = false;
        let SHOW_DETAILS = false;
        let currentProduct = null;
        let originalParent = null;
        let splitTitlesData = [];
        let splitTextsData = [];
        let repulsionEnabled = true;

        const centerGrid = () => {
            const gridWidth = grid.offsetWidth;
            const gridHeight = grid.offsetHeight;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const centerX = (windowWidth - gridWidth) / 2;
            const centerY = (windowHeight - gridHeight) / 2;
            gsap.set(grid, { x: centerX, y: centerY });
        };

        const setupDraggable = () => {
            container.classList.add('--is-loaded');
            
            // 반응형에 따라 bounds 계산
            const isMobile = window.innerWidth < 800;
            const isTablet = window.innerWidth >= 800 && window.innerWidth < 1280;
            const paddingX = isMobile ? 50 : isTablet ? 100 : 200;
            const paddingY = isMobile ? 50 : isTablet ? 75 : 100;
            
            draggable = Draggable.create(grid, {
                type: 'x,y',
                bounds: {
                    minX: -(grid.offsetWidth - window.innerWidth) - paddingX,
                    maxX: paddingX,
                    minY: -(grid.offsetHeight - window.innerHeight) - paddingY,
                    maxY: paddingY
                },
                inertia: true,
                allowEventDefault: true,
                edgeResistance: 0.9,
                onDragStart: () => {
                    isDragging = true;
                    grid.classList.add('--is-dragging');
                },
                onDragEnd: () => {
                    isDragging = false;
                    grid.classList.remove('--is-dragging');
                }
            })[0];
        };

        const wheelHandler = (e) => {
            e.preventDefault();
            // 반응형에 따라 휠 감도 조정
            const isMobile = window.innerWidth < 800;
            const isTablet = window.innerWidth >= 800 && window.innerWidth < 1280;
            const multiplier = isMobile ? 5 : isTablet ? 6 : 7;
            
            const deltaX = -e.deltaX * multiplier;
            const deltaY = -e.deltaY * multiplier;
            const currentX = gsap.getProperty(grid, 'x');
            const currentY = gsap.getProperty(grid, 'y');
            const newX = currentX + deltaX;
            const newY = currentY + deltaY;
            const bounds = draggable.vars.bounds;
            const clampedX = Math.max(bounds.minX, Math.min(bounds.maxX, newX));
            const clampedY = Math.max(bounds.minY, Math.min(bounds.maxY, newY));
            
            gsap.to(grid, {
                x: clampedX,
                y: clampedY,
                duration: 0.3,
                ease: 'power3.out'
            });
        };

        const resizeHandler = () => {
                if (draggable) {
                // 반응형에 따라 bounds 재계산
                const isMobile = window.innerWidth < 800;
                const isTablet = window.innerWidth >= 800 && window.innerWidth < 1280;
                const paddingX = isMobile ? 50 : isTablet ? 100 : 200;
                const paddingY = isMobile ? 50 : isTablet ? 75 : 100;
                
                    draggable.vars.bounds = {
                    minX: -(grid.offsetWidth - window.innerWidth) - paddingX,
                    maxX: paddingX,
                    minY: -(grid.offsetHeight - window.innerHeight) - paddingY,
                    maxY: paddingY
                };
            }
        };

        const mousemoveHandler = (e) => {
            if (isDragging || !repulsionEnabled) return;

            if (SHOW_DETAILS) {
                handleCursor(e);
            } else {
                const { clientX, clientY } = e;
                const gridRect = grid.getBoundingClientRect();

                products.forEach(product => {
                    const productCenterX = gridRect.left + product.offsetLeft + product.offsetWidth / 2;
                    const productCenterY = gridRect.top + product.offsetTop + product.offsetHeight / 2;

                    const dx = productCenterX - clientX;
                    const dy = productCenterY - clientY;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    const maxDistance = 150;
                    const force = Math.max(0, (maxDistance - distance) / maxDistance);

                    if (distance < 1) return;

                    const moveX = (dx / distance) * force * 30;
                    const moveY = (dy / distance) * force * 30;
                    const rotation = force * 5;

                    product.quickToX(moveX);
                    product.quickToY(moveY);
                    product.quickToRot(rotation * (dx > 0 ? 1 : -1));
                });
            }
        };

        const addEvents = () => {
            window.addEventListener('wheel', wheelHandler, { passive: false });
            window.addEventListener('resize', resizeHandler);
            window.addEventListener('mousemove', mousemoveHandler);
            container.addEventListener('mouseleave', () => {
                products.forEach(product => {
                    product.quickToX(0);
                    product.quickToY(0);
                    product.quickToRot(0);
                });
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
                            ease: 'power2.out'
                        });
                    } else {
                        gsap.to(entry.target, {
                            opacity: 0,
                            scale: 0.5,
                            duration: 0.5,
                            ease: 'power2.in'
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

        const handleCursor = (e) => {
            if (!cross) return;
                    const x = e.clientX;
                    const y = e.clientY;

                    gsap.to(cross, {
                        x: x - cross.offsetWidth / 2,
                        y: y - cross.offsetHeight / 2,
                        duration: 0.4,
                        ease: 'power2.out'
            });
        };
        
        const intro = () => {
            centerGrid();
            const timeline = gsap.timeline({
                onComplete: () => {
                    setupDraggable();
                    addEvents();
                    observeProducts();
                    handleDetails();
                    document.body.classList.remove('loading');
                    products.forEach(product => {
                        product.quickToX = gsap.quickTo(product, "x", { duration: 0.6, ease: "power3" });
                        product.quickToY = gsap.quickTo(product, "y", { duration: 0.6, ease: "power3" });
                        product.quickToRot = gsap.quickTo(product, "rotation", { duration: 0.6, ease: "power3" });
                    });
                }
            });
            timeline.set(container, { scale: 0.5 });
            timeline.set(products, { scale: 0.5, opacity: 0 });
            timeline.to(products, {
                scale: 1,
                opacity: 1,
                duration: 0.6,
                ease: 'power3.out',
                stagger: { amount: 1.2, from: 'random' }
            });
            timeline.to(container, {
                scale: 1,
                duration: 1.2,
                ease: 'power3.inOut'
            }, 0);
        };

        const handleDetails = () => {
            const titles = Array.from(details.querySelectorAll('.details__title p'));
            const texts = Array.from(details.querySelectorAll('.details__body [data-text]'));
            
            // Split text for animation
            titles.forEach(title => {
                const splitData = splitText(title, 'lines, chars');
                splitTitlesData.push(splitData);
            });
            
            texts.forEach(text => {
                const splitData = splitText(text, 'lines');
                splitTextsData.push(splitData);
            });

            products.forEach(product => {
                product.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showDetails(product);
                });
            });

            container.addEventListener('click', (e) => {
                if (SHOW_DETAILS) hideDetails();
            });

            // Close on cross click
            if (cross) {
                cross.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (SHOW_DETAILS) hideDetails();
                });
            }
        };

        const showDetails = (product) => {
            repulsionEnabled = false;
            products.forEach(p => {
                gsap.killTweensOf(p, "x,y,rotation");
                p.quickToX(0);
                p.quickToY(0);
                p.quickToRot(0);
            });

            if (SHOW_DETAILS) {
                // 이미 열려있는 경우, 먼저 이전 제품을 정리
                if (currentProduct && originalParent) {
                    // 이전 제품을 원래 위치로 되돌리기
                    originalParent.appendChild(currentProduct);
                    gsap.set(currentProduct, {
                        position: "",
                        top: "",
                        left: "",
                        width: "",
                        height: "",
                        zIndex: "",
                    });
                    if (observer && currentProduct) {
                        observer.observe(currentProduct);
                    }
                }
                // detailsThumb 비우기
                if (detailsThumb) {
                    detailsThumb.innerHTML = '';
                }
            }
            
            // 모든 타이틀과 텍스트 먼저 숨기기
            splitTitlesData.forEach((splitData, index) => {
                if (splitData.chars && splitData.chars.length > 0) {
                    gsap.set(splitData.chars, { y: '100%', opacity: 0 });
                }
                // 타이틀 요소 자체도 숨기기
                const titleElement = details.querySelector(`[data-title="${detailsData[index].id}"]`);
                if (titleElement) {
                    gsap.set(titleElement, { opacity: 0, visibility: 'hidden' });
                }
            });
            
            splitTextsData.forEach((splitData, index) => {
                const lines = splitData.lines || splitData.words;
                if (lines && lines.length > 0) {
                    gsap.set(lines, { y: '100%', opacity: 0 });
                }
                // 텍스트 요소 자체도 숨기기
                const textElement = details.querySelector(`[data-desc="${detailsData[index].id}"]`);
                if (textElement) {
                    gsap.set(textElement, { opacity: 0, visibility: 'hidden' });
                }
            });
            
            SHOW_DETAILS = true;
            details.classList.add('--is-showing');
            container.classList.add('--is-details-showing');

            // 반응형에 따라 이동 거리 조정
            const isMobile = window.innerWidth < 800;
            const isTablet = window.innerWidth >= 800 && window.innerWidth < 1280;
            const containerMoveX = isMobile ? '-90%' : isTablet ? '-60vw' : '-50vw';
            const detailsMoveX = isMobile ? '90%' : isTablet ? '60vw' : '50vw';
            
            gsap.to(container, { x: containerMoveX, duration: 1.2, ease: 'power3.inOut' });
            gsap.to(details, { x: 0, duration: 1.2, ease: 'power3.inOut' });

            flipProduct(product);

            const productId = product.dataset.id;
            const titleIndex = detailsData.findIndex(d => d.id.toString() === productId);
            
            // 해당 제품의 타이틀 표시
            if (titleIndex >= 0 && splitTitlesData[titleIndex]) {
                const titleElement = details.querySelector(`[data-title="${productId}"]`);
                if (titleElement) {
                    gsap.set(titleElement, { opacity: 1, visibility: 'visible' });
                }
                
                const chars = splitTitlesData[titleIndex].chars;
                if (chars && chars.length > 0) {
                    gsap.set(chars, { opacity: 1 });
                    gsap.to(chars, {
                        y: 0,
                        duration: 1.1,
                        delay: 0.4,
                        ease: 'power3.inOut',
                        stagger: 0.025
                    });
                }
            }
            
            // 해당 제품의 텍스트 표시
            if (titleIndex >= 0 && splitTextsData[titleIndex]) {
                const textElement = details.querySelector(`[data-desc="${productId}"]`);
                if (textElement) {
                    gsap.set(textElement, { opacity: 1, visibility: 'visible' });
                }
                
                const lines = splitTextsData[titleIndex].lines || splitTextsData[titleIndex].words;
                if (lines && lines.length > 0) {
                    gsap.set(lines, { opacity: 1 });
                    gsap.to(lines, {
                        y: 0,
                        duration: 1.1,
                        delay: 0.4,
                        ease: 'power3.inOut',
                        stagger: 0.05
                    });
                }
            }
        };

        const hideDetails = () => {
            repulsionEnabled = false;
            SHOW_DETAILS = false;
            container.classList.remove('--is-details-showing');

            // 반응형에 따라 이동 거리 조정
            const isMobile = window.innerWidth < 800;
            const isTablet = window.innerWidth >= 800 && window.innerWidth < 1280;
            const detailsMoveX = isMobile ? '90%' : isTablet ? '60vw' : '50vw';
            
            gsap.to(container, { x: 0, duration: 1.2, delay: .3, ease: 'power3.inOut', onComplete: () => {
                details.classList.remove('--is-showing');
                repulsionEnabled = true;
            }});
            gsap.to(details, { x: detailsMoveX, duration: 1.2, delay: .3, ease: 'power3.inOut' });

            unFlipProduct();

            // Reset text animations - 모든 타이틀과 텍스트 숨기기
            splitTitlesData.forEach((splitData, index) => {
                if (splitData.chars && splitData.chars.length > 0) {
                    gsap.to(splitData.chars, {
                        y: '100%',
                        opacity: 0,
                        duration: 0.6,
                        ease: 'power3.inOut',
                        stagger: { amount: 0.025, from: 'end' },
                        onComplete: () => {
                            const titleElement = details.querySelector(`[data-title="${detailsData[index].id}"]`);
                            if (titleElement) {
                                gsap.set(titleElement, { opacity: 0, visibility: 'hidden' });
                            }
                        }
                    });
                } else {
                    const titleElement = details.querySelector(`[data-title="${detailsData[index].id}"]`);
                    if (titleElement) {
                        gsap.set(titleElement, { opacity: 0, visibility: 'hidden' });
                    }
                }
            });
            
            splitTextsData.forEach((splitData, index) => {
                const lines = splitData.lines || splitData.words;
                if (lines && lines.length > 0) {
                    gsap.to(lines, {
                        y: '100%',
                        opacity: 0,
                        duration: 0.6,
                        ease: 'power3.inOut',
                        stagger: 0.05,
                        onComplete: () => {
                            const textElement = details.querySelector(`[data-desc="${detailsData[index].id}"]`);
                            if (textElement) {
                                gsap.set(textElement, { opacity: 0, visibility: 'hidden' });
                            }
                        }
                    });
                } else {
                    const textElement = details.querySelector(`[data-desc="${detailsData[index].id}"]`);
                    if (textElement) {
                        gsap.set(textElement, { opacity: 0, visibility: 'hidden' });
                    }
                }
            });
        };

        const flipProduct = (product) => {
            // 이전 제품이 있으면 먼저 정리
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
                nested: true
            });
            
            if (cross) {
                gsap.to(cross, {
                    scale: 1,
                    duration: 0.4,
                    delay: 0.5,
                    ease: 'power2.out'
                });
            }
        };

        const unFlipProduct = () => {
            if (!currentProduct || !originalParent) {
                if (detailsThumb) {
                    detailsThumb.innerHTML = '';
                }
                return;
            }

            if (cross) {
                gsap.to(cross, {
                    scale: 0,
                    duration: 0.4,
                    ease: "power2.out"
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
                ease: "power3.inOut",
                nested: true,
                onComplete: () => {
                    gsap.set(currentProduct, {
                        position: "",
                        top: "",
                        left: "",
                        width: "",
                        height: "",
                        zIndex: "",
                    });

                    if (observer && currentProduct) {
                        observer.observe(currentProduct);
                    }
                    
                    currentProduct = null;
                    originalParent = null;
                },
            });
        };

        // Preload images then initialize
        preloadImages('.grid img').then(() => {
            intro();
        }).catch(() => {
            // If preloading fails, still initialize
        intro();
        });

        return () => {
            document.body.classList.remove('loading');
            if (draggable) draggable.kill();
            if (observer) observer.disconnect();
            gsap.killTweensOf(grid);
            gsap.killTweensOf(container);
            if (cross) gsap.killTweensOf(cross);
            gsap.killTweensOf(products);
            // Remove event listeners
            window.removeEventListener('wheel', wheelHandler);
            window.removeEventListener('resize', resizeHandler);
            window.removeEventListener('mousemove', mousemoveHandler);
        }

    }, []);

    const columns = [
        [productsData[2], productsData[6], productsData[0], productsData[4], productsData[1]],
        [productsData[3], productsData[5], productsData[2], productsData[6], productsData[0]],
        [productsData[4], productsData[1], productsData[3], productsData[5], productsData[0]],
        [productsData[2], productsData[4], productsData[0], productsData[5], productsData[1]],
        [productsData[3], productsData[5], productsData[2], productsData[4], productsData[0]],
        [productsData[4], productsData[5], productsData[1], productsData[0], productsData[3]],
    ];

    return (
        <main>
            <div className="container" ref={containerRef}>
                <div className="grid" ref={gridRef}>
                    {columns.map((col, i) => (
                        <div className="column" key={i}>
                            {col.map((product, j) => (
                                <div className="product" key={`${i}-${j}`}>
                                    <div data-id={product.id} ref={el => productRefs.current[i * col.length + j] = el}>
                                        <img src={product.img} alt={`Product ${product.id}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className="details" ref={detailsRef}>
                <div className="details__title">
                    {detailsData.map(d => <p key={d.id} data-title={d.id} data-text>{d.title}</p>)}
                </div>
                <div className="details__body">
                    <div className="details__thumb" ref={detailsThumbRef}></div>
                    <div className="details__texts">
                        {detailsData.map(d => (
                            <p key={d.id} data-desc={d.id} data-text>
                                <span>{d.price}</span>
                                {d.description}
                                <button>Add to cart</button>
                            </p>
                        ))}
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