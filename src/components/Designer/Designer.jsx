import React, { useCallback, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Designer.css';

// 디자이너 데이터 (가나다순으로 정렬)
const DESIGNERS = [
  {
    id: 1,
    name: '김윤정',
    role: 'UI/UX Designer',
    description: '사용자 중심의 직관적인 디자인을 추구합니다.',
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Principle'],
    projects: ['모바일 뱅킹 앱 리디자인', '전자상거래 플랫폼 UX 개선'],
    email: 'gilj08@naver.com',
    instagram: '@zlz_300'
  },
  {
    id: 2,
    name: '김재은',
    role: 'Graphic Designer',
    description: '브랜드 아이덴티티와 시각 커뮤니케이션에 특화되어 있습니다.',
    skills: ['Photoshop', 'Illustrator', 'InDesign', 'After Effects'],
    projects: ['브랜드 아이덴티티 개발', '프로모션 디자인'],
    email: 'kamjachips531@gmail.com',
    instagram: '@kamja_chips'
  },
  {
    id: 3,
    name: '김지나',
    role: 'Motion Designer',
    description: '동적인 시각 요소로 스토리를 전달합니다.',
    skills: ['After Effects', 'Cinema 4D', 'Blender', 'Premiere Pro'],
    projects: ['브랜드 모션 그래픽', 'UI 애니메이션'],
    email: 'orchid010321@gmail.com',
    instagram: '@0rch1d_321'
  },
  {
    id: 4,
    name: '김채영',
    role: 'Web Designer',
    description: '반응형 웹 디자인과 사용자 경험에 집중합니다.',
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Figma'],
    projects: ['기업 웹사이트 리뉴얼', '포트폴리오 웹사이트'],
    email: 'zer0chaek@gmail.com',
    instagram: '@y0un9.kr'
  },
  {
    id: 5,
    name: '도티안홍',
    role: 'Creative Director',
    description: '창의적 비전과 전략적 사고로 프로젝트를 이끕니다.',
    skills: ['Creative Strategy', 'Team Management', 'Project Planning'],
    projects: ['종합 브랜딩 캠페인', '크리에이티브 디렉션'],
    email: 'anhhong.tiran@gmail.com',
    instagram: ''
  },
  {
    id: 6,
    name: '박진아',
    role: 'Brand Designer',
    description: '브랜드의 가치를 시각적으로 구현하는 전문가입니다.',
    skills: ['Brand Strategy', 'Logo Design', 'Visual Identity'],
    projects: ['스타트업 브랜딩', '브랜드 가이드라인 제작'],
    email: 'wlsdk5379@naver.com',
    instagram: '@87.3c'
  },
  {
    id: 7,
    name: '박해인',
    role: 'UI Designer',
    description: '사용자 인터페이스의 아름다움과 기능성을 균형있게 구현합니다.',
    skills: ['UI Design', 'Prototyping', 'User Testing'],
    projects: ['앱 UI/UX 디자인', '디자인 시스템 구축'],
    email: 'parkheain524@gmail.com',
    instagram: '@haein_524'
  },
  {
    id: 8,
    name: '박희찬',
    role: 'Visual Designer',
    description: '시각적 언어로 복잡한 정보를 명확하게 전달합니다.',
    skills: ['Infographic Design', 'Data Visualization', 'Editorial Design'],
    projects: ['정보 그래픽 디자인', '연례 보고서 디자인'],
    email: 'qkrgmlcks0928@gmail.com',
    instagram: '@parkhc000928'
  },
  {
    id: 9,
    name: '서동범',
    role: 'Frontend Developer',
    description: '디자인과 개발의 경계에서 혁신적인 솔루션을 만듭니다.',
    skills: ['React', 'Vue.js', 'TypeScript', 'Node.js'],
    projects: ['파트타임 웹 애플리케이션', '졸업전시 웹사이트 개발'],
    email: 'sdb8321@naver.com',
    instagram: '@dong_b99'
  },
  {
    id: 11,
    name: '송다희',
    role: 'Illustrator',
    description: '감성적인 일러스트레이션으로 스토리를 그려냅니다.',
    skills: ['Digital Illustration', 'Character Design', 'Storyboarding'],
    projects: ['캐릭터 디자인', '일러스트레이션 책 제작'],
    email: 'a.long.way.bright@gmail.com',
    instagram: '@noteforsoda'
  },
  {
    id: 12,
    name: '심성빈',
    role: 'Interaction Designer',
    description: '사용자와 제품 간의 상호작용을 설계합니다.',
    skills: ['Interaction Design', 'Prototyping', 'User Testing'],
    projects: ['인터랙티브 설치물', 'AR/VR 인터페이스'],
    email: 'sixplag1103@gmail.com',
    instagram: '@s_beenoo_'
  },
  {
    id: 13,
    name: '우수민',
    role: 'Digital Designer',
    description: '디지털 환경에서의 창의적 표현을 추구합니다.',
    skills: ['Digital Art', '3D Design', 'Web Design'],
    projects: ['디지털 아트 전시', '웹 인터랙션 디자인'],
    email: '7872sumin@naver.com',
    instagram: '@breath_427'
  },
  {
    id: 14,
    name: '이가비',
    role: 'Communication Designer',
    description: '효과적인 커뮤니케이션을 위한 시각적 메시지를 만듭니다.',
    skills: ['Communication Strategy', 'Campaign Design', 'Social Media'],
    projects: ['소셜 캠페인 디자인', '커뮤니케이션 전략 수립'],
    email: 'gabi4649@naver.com',
    instagram: '@s.iren_n'
  },
  {
    id: 15,
    name: '이다영',
    role: 'Experience Designer',
    description: '전체적인 사용자 경험을 통합적으로 설계합니다.',
    skills: ['UX Research', 'Journey Mapping', 'Service Design'],
    projects: ['종합 UX 설계', '서비스 경험 개선'],
    email: 'dyoiii37@gmail.com',
    instagram: '@dyoiiii_'
  },
  {
    id: 16,
    name: '이운',
    role: 'Art Director',
    description: '창의적 방향성을 제시하고 팀을 이끌어갑니다.',
    skills: ['Art Direction', 'Creative Strategy', 'Team Leadership'],
    projects: ['종합 크리에이티브 디렉션', '아트 디렉션'],
    email: 'c_loud39@naver.com',
    instagram: '@leewoonii'
  },
  {
    id: 18,
    name: '이지민',
    role: 'Content Designer',
    description: '콘텐츠의 시각적 표현과 사용자 경험을 연결합니다.',
    skills: ['Content Strategy', 'Editorial Design', 'Visual Storytelling'],
    projects: ['콘텐츠 전략 수립', '에디토리얼 디자인'],
    email: 'jimin12024@gmail.com',
    instagram: '@ming.guming'
  },
  {
    id: 19,
    name: '전기태',
    role: 'Design Strategist',
    description: '디자인 전략을 통해 비즈니스 목표를 달성합니다.',
    skills: ['Design Strategy', 'Business Analysis', 'Design Management'],
    projects: ['디자인 전략 수립', '비즈니스 디자인'],
    email: 'wjsrlxo0522@naver.com',
    instagram: '@electric_tae00'
  },
  {
    id: 20,
    name: '전서린',
    role: 'Packaging Designer',
    description: '제품의 첫인상을 결정하는 패키지 디자인에 특화되어 있습니다.',
    skills: ['Package Design', '3D Modeling', 'Brand Application'],
    projects: ['제품 패키지 디자인', '브랜드 패키지 시스템'],
    email: 'suhlynj@gmail.com',
    instagram: '@lynshuu'
  },
  {
    id: 21,
    name: '정지민',
    role: 'Color Designer',
    description: '색채의 심리학적 효과를 활용한 디자인을 만듭니다.',
    skills: ['Color Theory', 'Color Psychology', 'Brand Colors'],
    projects: ['브랜드 컬러 시스템', '색채 전략 수립'],
    email: 'aho011214@naver.com',
    instagram: '@dalk_gal_bee'
  },
  {
    id: 22,
    name: '조하늘',
    role: 'Typography Designer',
    description: '타이포그래피를 통해 메시지의 강도를 조절합니다.',
    skills: ['Typography', 'Font Design', 'Lettering'],
    projects: ['타이포그래피 디자인', '폰트 디자인'],
    email: 'neul5820@gmail.com',
    instagram: '@heavencho_'
  },
  {
    id: 23,
    name: '허지훈',
    role: 'Design System Designer',
    description: '일관성 있는 디자인 시스템을 구축하고 관리합니다.',
    skills: ['Design Systems', 'Component Library', 'Design Tokens'],
    projects: ['디자인 시스템 구축', '컴포넌트 라이브러리 개발'],
    email: 'joshua7233@naver.com',
    instagram: '@z.h0o0n'
  },
  {
    id: 24,
    name: '안선민',
    role: 'User Researcher',
    description: '사용자 관점에서 디자인 문제를 해결합니다.',
    skills: ['User Research', 'Usability Testing', 'Data Analysis'],
    projects: ['사용자 리서치', '사용성 테스트'],
    email: 'richasn@mju.ac.kr',
    instagram: '@love_the_sun33'
  }
].sort((a, b) => a.name.localeCompare(b.name, 'ko', { sensitivity: 'base' }));

const GALLERY_COLORS = ['#67C5FF', '#FF7700'];

const Designer = () => {
  const galleryRef = useRef(null);

  useEffect(() => {
    const container = galleryRef.current;
    if (!container) {
      return undefined;
    }

    const updateGhostHeight = () => {
      const referenceItem = container.querySelector('.designer-gallery__item:not(.designer-gallery__item--ghost)');
      if (!referenceItem) {
        container.style.removeProperty('--designer-card-height');
        return;
      }
      const height = referenceItem.getBoundingClientRect().height;
      container.style.setProperty('--designer-card-height', `${height}px`);
    };

    updateGhostHeight();

    let resizeObserver;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(updateGhostHeight);
      const target = container.querySelector('.designer-gallery__item:not(.designer-gallery__item--ghost)');
      if (target) {
        resizeObserver.observe(target);
      }
    }

    window.addEventListener('resize', updateGhostHeight);

    return () => {
      window.removeEventListener('resize', updateGhostHeight);
      resizeObserver?.disconnect();
    };
  }, []);

  const handleCardEnter = useCallback((event, backgroundColor) => {
    const card = event.currentTarget;
    if (!card) return;

    card.classList.remove('designer-gallery__item--orange', 'designer-gallery__item--blue');
    if (backgroundColor === '#FF7700') {
      card.classList.add('designer-gallery__item--orange');
    } else {
      card.classList.add('designer-gallery__item--blue');
    }

    card.style.zIndex = '10';
    gsap.to(card, {
      top: window.innerWidth <= 768 ? '-10px' : '-2vw',
      backgroundColor,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  }, []);

  const handleCardLeave = useCallback((event) => {
    const card = event.currentTarget;
    if (!card) return;

    card.classList.remove('designer-gallery__item--orange', 'designer-gallery__item--blue');

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
  }, []);

  const handleCardClick = useCallback((designerName) => {
    if (!designerName) return;
    const encoded = encodeURIComponent(designerName);
    window.history.pushState({}, '', `/designer/${encoded}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, []);

  // 모바일 모드에서 스크롤 기반 호버 효과 적용
  useEffect(() => {
    const container = galleryRef.current;
    if (!container) return undefined;

    // 모바일 모드(799px 이하)에서만 적용
    const isMobile = window.innerWidth <= 799;
    if (!isMobile) return undefined;

    const items = Array.from(container.querySelectorAll('.designer-gallery__item:not(.designer-gallery__item--ghost)'));
    
    // 현재 활성화된 아이템 추적
    let activeItem = null;
    let scrollTimeout = null;
    let isInitialLoad = true;
    
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
        
        // 뷰포트 내에 있는지 확인 (더 넓은 범위)
        const isVisible = itemBottom > -100 && itemTop < viewportHeight + 100;
        
        // 화면 중앙으로부터의 거리 (절대값)
        const distanceFromCenter = Math.abs(itemCenter - viewportCenter);
        
        // 디자이너 이름 가져오기
        const designerName = item.querySelector('.designer-gallery__text')?.textContent || '';
        
        return { 
          item, 
          index, 
          isVisible, 
          distanceFromCenter,
          itemTop,
          itemCenter,
          itemBottom,
          designerName
        };
      });
      
      // 김윤정 아이템 찾기 (인덱스 0)
      const yunjungItem = itemVisibility.find(item => item.designerName === '김윤정' || item.index === 0);
      // 김재은 아이템 찾기 (인덱스 1)
      const jaeunItem = itemVisibility.find(item => item.designerName === '김재은' || item.index === 1);
      // 김지나 아이템 찾기 (인덱스 2)
      const jinaItem = itemVisibility.find(item => item.designerName === '김지나' || item.index === 2);
      
      // 스크롤 위치 확인
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const isAtTop = scrollTop < 50; // 스크롤이 맨 위에 있을 때 (50px 이내)
      
      // 김지나 영역 내에서 세분화된 반응 영역 설정
      let bestItem = null;
      
      // 초기 로드 시에만 김윤정 활성화 (스크롤이 맨 위에 있을 때는 제외)
      if (isInitialLoad && yunjungItem && yunjungItem.isVisible) {
        bestItem = yunjungItem;
        isInitialLoad = false;
      } else if (jinaItem && jinaItem.isVisible) {
        // 김지나 아이템의 영역 범위
        const jinaZoneTop = jinaItem.itemTop;
        const jinaZoneBottom = jinaItem.itemBottom;
        const jinaZoneHeight = jinaZoneBottom - jinaZoneTop;
        
        // 김지나 영역을 3등분: 김윤정 20%, 김재은 33%, 김지나 47% (김윤정을 제일 적게 하고 김지나에게 줌)
        const jinaSubZone1Top = jinaZoneTop; // 김윤정 영역 (김지나 영역의 상단 20%)
        const jinaSubZone1Bottom = jinaZoneTop + jinaZoneHeight * 0.20;
        const jinaSubZone2Top = jinaZoneTop + jinaZoneHeight * 0.20; // 김재은 영역 (김지나 영역의 20% ~ 53%)
        const jinaSubZone2Bottom = jinaZoneTop + jinaZoneHeight * 0.53;
        const jinaSubZone3Top = jinaZoneTop + jinaZoneHeight * 0.53; // 김지나 영역 (김지나 영역의 하단 47%)
        const jinaSubZone3Bottom = jinaZoneBottom;
        
        // 화면 중앙이 김지나 영역 내에 있는지 확인
        const isInJinaZone = viewportCenter >= jinaZoneTop && viewportCenter <= jinaZoneBottom;
        
        // 디버깅 로그
        console.log('김지나 영역:', {
          jinaZoneTop,
          jinaZoneBottom,
          viewportCenter,
          isInJinaZone,
          jinaSubZone2Top,
          jinaSubZone2Bottom,
          isInJaeunZone: viewportCenter >= jinaSubZone2Top && viewportCenter < jinaSubZone2Bottom,
          jaeunItem: jaeunItem ? { isVisible: jaeunItem.isVisible, designerName: jaeunItem.designerName } : null
        });
        
        if (isInJinaZone) {
          // 화면 중앙이 김지나 영역의 어느 부분에 있는지 확인
          if (viewportCenter >= jinaSubZone2Top && viewportCenter < jinaSubZone2Bottom) {
            // 김재은 활성화 (인덱스 1) - 중간 33%
            if (jaeunItem && jaeunItem.isVisible) {
              bestItem = jaeunItem;
            } else {
              bestItem = itemVisibility.find(item => item.index === 1);
            }
            console.log('김재은 활성화 시도:', bestItem);
          } else if (viewportCenter >= jinaSubZone1Top && viewportCenter < jinaSubZone1Bottom) {
            // 김윤정 활성화 (인덱스 0) - 상단 20%
            if (yunjungItem && yunjungItem.isVisible) {
              bestItem = yunjungItem;
            } else {
              bestItem = itemVisibility.find(item => item.index === 0);
            }
          } else if (viewportCenter >= jinaSubZone3Top && viewportCenter <= jinaSubZone3Bottom) {
            // 김지나 활성화 (인덱스 2) - 하단 47%
            bestItem = jinaItem;
          }
        }
      }
      
      // 스크롤이 맨 위에 있고 초기 로드가 아니면 김윤정 활성화
      if (!bestItem && isAtTop && !isInitialLoad && yunjungItem && yunjungItem.isVisible) {
        bestItem = yunjungItem;
      }
      
      // 김지나 영역 밖이면 기존 로직 사용 (화면 중앙에 가장 가까운 아이템)
      // 단, 각 아이템이 조금씩 양보하도록 활성화 범위를 조정
      if (!bestItem) {
        const eligibleItems = itemVisibility.filter(({ isVisible }) => isVisible);
        
        if (eligibleItems.length === 0) {
          if (activeItem) {
            handleCardLeave({ currentTarget: activeItem });
            activeItem = null;
          }
          return;
        }
        
        // 각 아이템의 활성화 범위를 조금씩 줄여서 더 균등하게 활성화되도록 조정
        // 각 아이템의 중심점 기준으로 일정 범위 내에 화면 중앙이 있으면 활성화
        // 범위를 조금씩 줄여서 다른 아이템들도 활성화될 수 있도록 함
        const activationRange = viewportHeight * 0.15; // 각 아이템의 활성화 범위 (화면 높이의 15%)
        
        const itemsInRange = eligibleItems.filter(({ distanceFromCenter }) => {
          return distanceFromCenter <= activationRange;
        });
        
        if (itemsInRange.length > 0) {
          // 활성화 범위 내에 있는 아이템 중에서 가장 가까운 것 선택
          bestItem = itemsInRange
            .sort((a, b) => {
              // 화면 중앙으로부터의 거리로 정렬
              const distanceDiff = Math.abs(a.distanceFromCenter - b.distanceFromCenter);
              if (distanceDiff < 20) {
                // 거리가 비슷하면 위에 있는 것(인덱스가 작은 것) 우선
                return a.index - b.index;
              }
              // 화면 중앙에 가까운 것 우선
              return a.distanceFromCenter - b.distanceFromCenter;
            })[0];
        } else {
          // 활성화 범위 내에 아이템이 없으면 기존 로직 사용
          bestItem = eligibleItems
            .sort((a, b) => {
              const distanceDiff = Math.abs(a.distanceFromCenter - b.distanceFromCenter);
              if (distanceDiff < 20) {
                return a.index - b.index;
              }
              return a.distanceFromCenter - b.distanceFromCenter;
            })[0];
        }
      }
      
      // 디버깅: 활성화되는 아이템 확인
      if (bestItem) {
        console.log('활성화되는 아이템:', bestItem.designerName, '인덱스:', bestItem.index, '거리:', bestItem.distanceFromCenter);
      }
      
      // 이전 활성 아이템과 다르면 업데이트
      if (bestItem && bestItem.item !== activeItem) {
        // 이전 활성 아이템 효과 제거
        if (activeItem) {
          handleCardLeave({ currentTarget: activeItem });
        }
        
        // 새로운 활성 아이템 효과 적용
        activeItem = bestItem.item;
        // color를 아이템의 인덱스로부터 계산
        const itemIndex = items.indexOf(activeItem);
        const color = GALLERY_COLORS[itemIndex % GALLERY_COLORS.length];
        handleCardEnter({ currentTarget: activeItem }, color);
      } else if (!bestItem && activeItem) {
        // 뷰포트에 보이는 아이템이 없으면 모든 효과 제거
        handleCardLeave({ currentTarget: activeItem });
        activeItem = null;
      }
    };
    
    // requestAnimationFrame을 사용하여 더 부드럽고 빠른 업데이트
    let rafId = null;
    const handleScrollRAF = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(() => {
        updateActiveItem();
      });
    };
    
    // requestAnimationFrame을 사용한 스크롤 핸들러
    window.addEventListener('scroll', handleScrollRAF, { passive: true });
    window.addEventListener('resize', handleScrollRAF, { passive: true });
    
    // 초기 로드 시 스크롤을 맨 위로 이동
    window.scrollTo(0, 0);
    
    // 초기 실행 (레이아웃이 완전히 계산된 후)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        updateActiveItem();
      });
    });

    return () => {
      window.removeEventListener('scroll', handleScrollRAF);
      window.removeEventListener('resize', handleScrollRAF);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      // 정리 시 활성 아이템 효과 제거
      if (activeItem) {
        handleCardLeave({ currentTarget: activeItem });
      }
    };
  }, [handleCardEnter, handleCardLeave]);

  return (
    <div className="designer-gallery">
      <div className="designer-gallery__inner" ref={galleryRef}>
        <h1 className="designer-gallery__title">Designer</h1>
        {DESIGNERS.map((designer, index) => {
          const color = GALLERY_COLORS[index % GALLERY_COLORS.length];
          const instagramHandle =
            typeof designer.instagram === 'string' && designer.instagram.trim() !== '(없음)'
              ? designer.instagram.trim()
              : '';
          const hasEmail = Boolean(designer.email);
          const hasInstagram = Boolean(instagramHandle);
          return (
            <div
              key={designer.id}
              className="designer-gallery__item"
              onClick={() => handleCardClick(designer.name)}
              onMouseEnter={(event) => handleCardEnter(event, color)}
              onMouseLeave={handleCardLeave}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  handleCardClick(designer.name);
                }
              }}
            >
              <span className="designer-gallery__text">{designer.name}</span>
              {(hasEmail || hasInstagram) && (
                <span className="designer-gallery__meta">
                  <button
                    type="button"
                    className="designer-gallery__meta-button"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      if (hasEmail) {
                        window.open(`mailto:${designer.email}`, '_blank');
                      }
                    }}
                    disabled={!hasEmail}
                  >
                    {hasEmail ? designer.email : '—'}
                  </button>
                  <button
                    type="button"
                    className="designer-gallery__meta-button designer-gallery__meta-button--instagram"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      if (hasInstagram) {
                        const handle = instagramHandle.replace(/^@/, '');
                        window.open(`https://www.instagram.com/${handle}/`, '_blank');
                      }
                    }}
                    disabled={!hasInstagram}
                  >
                    {hasInstagram ? instagramHandle : '—'}
                  </button>
                </span>
              )}
            </div>
          );
        })}
        <div className="designer-gallery__item designer-gallery__item--ghost" aria-hidden="true" />
      </div>
    </div>
  );
};

export default Designer;


