import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ModalHeroSection from '../ModalHeroSection/ModalHeroSection';
import { videoBadge, gameBadge, multimediaBadge, motionBadge } from '../../data/designerDetailsData';
import './DesignerShowcase.css';

const DesignerShowcase = ({ designer, onBack }) => {
  // Get badge image based on genre
  const getBadgeForGenre = (genre) => {
    if (!genre) return videoBadge; // Default to video badge
    
    if (genre === '영상 콘텐츠 디자인') {
      return videoBadge;
    } else if (genre === '게임 콘텐츠 디자인') {
      return gameBadge;
    } else if (genre === '멀티미디어 디자인') {
      return multimediaBadge;
    } else if (genre === '모션 디자인') {
      return motionBadge;
    }
    return videoBadge; // Default fallback
  };
  const [selectedWork, setSelectedWork] = useState(null);

  // 컴포넌트 마운트 시 스크롤을 맨 위로 이동하고 모달 관련 스타일 초기화
  useEffect(() => {
    // 스크롤을 맨 위로 이동
    window.scrollTo(0, 0);
    
    // 모달 관련 스타일 초기화 (이전 페이지에서 모달이 열려있었을 경우 대비)
    document.body.style.top = '';
    document.body.classList.remove('is-modal-open');
    document.documentElement.classList.remove('is-modal-open');
    const root = document.getElementById('root');
    if (root) {
      root.classList.remove('is-modal-open');
    }
    delete document.body.dataset.modalScrollY;
  }, []);

  const openWorkModal = (work) => {
    setSelectedWork(work);
  };

  const closeWorkModal = () => {
    setSelectedWork(null);
  };

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
      const modal = document.querySelector('.kim-love-modal');
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
  }, [selectedWork]);

  const handleWrapperClick = (event) => {
    if (!selectedWork) {
      return;
    }

    const modalSelector = '.kim-love-modal';
    const modalElement = event.target.closest(modalSelector);

    if (modalElement) {
      event.stopPropagation();
      return;
    }

    closeWorkModal();
  };

  const renderWorkContent = (work) => {
    const instagramUrl = work.instagram || designer?.instagram;
    const badgeSrc = getBadgeForGenre(work.genre);
    const badgeAlt = work.genre || 'Content Logo';
    const ctas = [
      {
        label: '디자이너의 다른 작품',
        variant: 'primary',
        onClick: () => {
          closeWorkModal();
          setTimeout(() => {
            const gallery = document.querySelector(`[aria-label="${designer.displayName} 대표 작품"]`);
            gallery?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 200);
        },
      },
    ];

    // 개인 SNS는 '디자이너의 다른 작품' 바로 다음에 추가
    if (instagramUrl) {
      ctas.push({
        label: '개인 SNS',
        variant: 'secondary',
        onClick: () => {
          const cleaned = instagramUrl.startsWith('http')
            ? instagramUrl
            : `https://www.instagram.com/${instagramUrl.replace(/^@/, '')}/`;
          window.open(cleaned, '_blank', 'noopener,noreferrer');
        },
      });
    }

    // caravan 레이아웃이 필요한 경우 (김지나 작품 1)
    const useCaravanLayout = work.layout === 'caravan' || work.id === 'kimjina-caravan';
    
    if (useCaravanLayout && work.gallery && work.notes && Array.isArray(work.notes) && work.notes[0] && typeof work.notes[0] === 'object') {
      const logoImage = work.gallery[0]; // 로고
      const desertImage = work.gallery[1]; // 사막 진영
      const cityImage = work.gallery[2]; // 도시 진영
      const mainStoryImage = work.gallery[3]; // 메인 스토리
      const storyDescImage = work.gallery[4]; // 스토리 설명

      return (
        <div className="work-detail work-detail--caravan">
          <ModalHeroSection
            eyebrowImageSrc={badgeSrc}
            eyebrowImageAlt={badgeAlt}
            eyebrowText={work.genre || designer.role || 'Content'}
            title={work.title}
            lead={work.summary}
            mediaSrc={work.thumbnail}
            mediaAlt={`${work.title} 대표 장면`}
            ctas={ctas}
          />

          {/* Feature 1: 로고 (텍스트 + 이미지) */}
          {logoImage && work.notes[0] && (
            <section className="work-detail__section work-detail__feature work-detail__feature--alternating">
              <div className="work-detail__feature-text">
                <div>
                  {work.notes[0].title && <h3 className="work-detail__feature-title">{work.notes[0].title}</h3>}
                  {work.notes[0].description && <p>{work.notes[0].description}</p>}
                </div>
              </div>
              <div className="work-detail__image-block">
                <img src={logoImage.src} alt={logoImage.alt} loading="lazy" />
              </div>
            </section>
          )}

          {/* Feature 2: 사막 진영 & 도시 진영 */}
          {desertImage && cityImage && work.notes[1] && work.notes[2] && (
            <section className="work-detail__section work-detail__feature-rows">
              <ul className="work-detail__feature-rows-list">
                {/* 사막 진영 (텍스트 + 이미지) */}
                <li className="work-detail__feature-row">
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[1].title && <h3 className="work-detail__feature-title">{work.notes[1].title}</h3>}
                      {work.notes[1].description && <p>{work.notes[1].description}</p>}
                    </div>
                  </div>
                  <div className="work-detail__image-block work-detail__image-block--center">
                    <img src={desertImage.src} alt={desertImage.alt} loading="lazy" />
                  </div>
                </li>
                {/* 도시 진영 (이미지 + 텍스트, 역순) */}
                <li className="work-detail__feature-row work-detail__feature-row--reverse">
                  <div className="work-detail__image-block">
                    <img src={cityImage.src} alt={cityImage.alt} loading="lazy" />
                  </div>
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[2].title && <h3 className="work-detail__feature-title">{work.notes[2].title}</h3>}
                      {work.notes[2].description && <p>{work.notes[2].description}</p>}
                    </div>
                  </div>
                </li>
              </ul>
            </section>
          )}

          {/* Feature 3: 메인 스토리 (이미지 + 텍스트) */}
          {mainStoryImage && work.notes[3] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block work-detail__image-block--feature work-detail__image-block--feature-left">
                <div style={{ position: 'absolute', left: 0, top: 0, width: '1152px', height: '648px', borderRadius: '16px', overflow: 'hidden' }}>
                  <img src={mainStoryImage.src} alt={mainStoryImage.alt} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
              <div className="work-detail__feature-text">
                {work.notes[3].title && <h3 className="work-detail__feature-title">{work.notes[3].title}</h3>}
                {work.notes[3].description && <p>{work.notes[3].description}</p>}
              </div>
            </section>
          )}

          {/* Feature 4: 스토리 설명 (이미지 + 텍스트) */}
          {storyDescImage && work.notes[4] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block work-detail__image-block--feature work-detail__image-block--feature-center">
                <div style={{ position: 'absolute', left: 0, top: 0, width: '1152px', height: '648px', borderRadius: '16px', overflow: 'hidden' }}>
                  <img src={storyDescImage.src} alt={storyDescImage.alt} loading="lazy" style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, transform: 'translateX(-50%)', aspectRatio: '1152 / 648', objectFit: 'cover', borderRadius: '16px' }} />
                </div>
              </div>
              <div className="work-detail__feature-text">
                {work.notes[4].description && <p>{work.notes[4].description}</p>}
              </div>
            </section>
          )}

          {/* 작업 양식 및 작업 목표 텍스트 블록 */}
          {work.notes && work.notes.length > 5 && (
            <section className="work-detail__section work-detail__text-blocks">
              <ul className="work-detail__text-blocks-list">
                <li className="work-detail__text-block">
                  {work.notes[5] && work.notes[5].title && (
                    <h5 className="work-detail__text-block-title">{work.notes[5].title}</h5>
                  )}
                  {work.notes[5] && work.notes[5].description && (
                    <div className="work-detail__text-block-content">{work.notes[5].description}</div>
                  )}
                </li>
                <li className="work-detail__text-block">
                  {work.notes[6] && work.notes[6].title && (
                    <h5 className="work-detail__text-block-title">{work.notes[6].title}</h5>
                  )}
                  {work.notes[6] && work.notes[6].description && (
                    <div className="work-detail__text-block-content">{work.notes[6].description}</div>
                  )}
                </li>
              </ul>
            </section>
          )}
        </div>
      );
    }

    // cellestial 레이아웃이 필요한 경우 (김지나 작품 2)
    const useCellestialLayout = work.layout === 'cellestial' || work.id === 'kimjina-cellestial';
    
    if (useCellestialLayout && work.gallery && work.notes && Array.isArray(work.notes) && work.notes[0] && typeof work.notes[0] === 'object') {
      const logoImage = work.gallery[0]; // 로고
      const pollutionImage = work.gallery[1]; // 오염과 정화
      const characterCards = work.gallery.slice(2, 5); // 캐릭터 1, 2, 3단계
      const detailCards = work.gallery.slice(5, 8); // 디테일 컷들

      return (
        <div className="work-detail work-detail--cellestial">
          <ModalHeroSection
            eyebrowImageSrc={badgeSrc}
            eyebrowImageAlt={badgeAlt}
            eyebrowText={work.genre || designer.role || 'Content'}
            title={work.title}
            lead={work.summary}
            mediaSrc={work.thumbnail}
            mediaAlt={`${work.title} 대표 장면`}
            ctas={ctas}
          />

          {/* Feature 1: 로고 (텍스트 + 이미지) */}
          {logoImage && work.notes[0] && (
            <section className="work-detail__section work-detail__feature work-detail__feature--alternating">
              <div className="work-detail__feature-text">
                <div>
                  {work.notes[0].title && <h3 className="work-detail__feature-title">{work.notes[0].title}</h3>}
                  {work.notes[0].description && <p>{work.notes[0].description}</p>}
                </div>
              </div>
              <div className="work-detail__image-block">
                <img src={logoImage.src} alt={logoImage.alt} loading="lazy" />
              </div>
            </section>
          )}

          {/* Feature 2: 오염과 정화 (이미지 + 텍스트) */}
          {pollutionImage && work.notes[1] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block work-detail__image-block--feature">
                <img src={pollutionImage.src} alt={pollutionImage.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                {work.notes[1].title && <h3 className="work-detail__feature-title">{work.notes[1].title}</h3>}
                {work.notes[1].description && <p>{work.notes[1].description}</p>}
              </div>
            </section>
          )}

          {/* 캐릭터 카드 3개: 1단계, 2단계, 3단계 */}
          {characterCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid work-detail__cards-grid--character">
                {characterCards.map((card, index) => (
                  <li
                    key={card.src}
                    className={`work-detail__card work-detail__card--character work-detail__card--${index + 1}`}
                  >
                    <div className="work-detail__card-image work-detail__card-image--character">
                      <img src={card.src} alt={card.alt} loading="lazy" />
                    </div>
                    {work.notes && work.notes[index + 2] && (
                      <div className="work-detail__card-text">
                        {work.notes[index + 2].title && <h4 className="work-detail__card-title">{work.notes[index + 2].title}</h4>}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 디테일 카드 그리드: 디테일 컷_1, 디테일 컷_2, 몬스터 */}
          {detailCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <div className="work-detail__detail-grid">
                <div className="work-detail__detail-column">
                  {detailCards.slice(0, 2).map((card, index) => (
                    <div key={card.src} className={`work-detail__detail-card ${index === 0 ? 'work-detail__detail-card--center' : ''}`}>
                      <div className="work-detail__detail-card-text">
                        {work.notes && work.notes[index + 5] && (
                          <>
                            {work.notes[index + 5].title && <h4 className="work-detail__card-title">{work.notes[index + 5].title}</h4>}
                            {work.notes[index + 5].description && <p>{work.notes[index + 5].description}</p>}
                          </>
                        )}
                      </div>
                      <div className="work-detail__detail-card-image">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="work-detail__detail-card work-detail__detail-card--large">
                  <div className="work-detail__detail-card-text">
                    {work.notes && work.notes[7] && (
                      <>
                        {work.notes[7].title && <h4 className="work-detail__card-title">{work.notes[7].title}</h4>}
                        {work.notes[7].description && <p>{work.notes[7].description}</p>}
                      </>
                    )}
                  </div>
                  <div className="work-detail__detail-card-image">
                    <img src={detailCards[2].src} alt={detailCards[2].alt} loading="lazy" />
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      );
    }

    // petrichor 레이아웃이 필요한 경우 (김재은 작품 2)
    const usePetrichorLayout = work.layout === 'petrichor' || work.id === 'kimjaeeun-petrichor';
    
    if (usePetrichorLayout && work.gallery && work.notes && Array.isArray(work.notes) && work.notes[0] && typeof work.notes[0] === 'object') {
      const feature1Image = work.gallery[0]; // The Discovery of Hope
      const feature2Image = work.gallery[1]; // The Beginning of the Journey
      const worldCards = work.gallery.slice(2, 5); // A Parched World, A Forsaken World, A World Being Buried
      const finalFeatureImage = work.gallery[5]; // And Then, the Discovery

      return (
        <div className="work-detail work-detail--petrichor">
          <ModalHeroSection
            eyebrowImageSrc={badgeSrc}
            eyebrowImageAlt={badgeAlt}
            eyebrowText={work.genre || designer.role || 'Content'}
            title={work.title}
            lead={work.summary}
            mediaSrc={work.thumbnail}
            mediaAlt={`${work.title} 대표 장면`}
            ctas={ctas}
          />

          {/* Feature 섹션 1: The Discovery of Hope (텍스트 + 이미지) */}
          {feature1Image && work.notes[0] && (
            <section className="work-detail__section work-detail__feature work-detail__feature--alternating">
              <div className="work-detail__feature-text">
                {work.notes[0].title && <h3 className="work-detail__feature-title">{work.notes[0].title}</h3>}
                {work.notes[0].description && <p>{work.notes[0].description}</p>}
              </div>
              <div className="work-detail__image-block">
                <img src={feature1Image.src} alt={feature1Image.alt} loading="lazy" />
              </div>
            </section>
          )}

          {/* Feature 섹션 2: The Beginning of the Journey (이미지 + 텍스트) */}
          {feature2Image && work.notes[1] && (
            <section className="work-detail__section work-detail__feature work-detail__feature--alternating work-detail__feature--reverse">
              <div className="work-detail__image-block">
                <img src={feature2Image.src} alt={feature2Image.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                {work.notes[1].title && <h3 className="work-detail__feature-title">{work.notes[1].title}</h3>}
                {work.notes[1].description && <p>{work.notes[1].description}</p>}
              </div>
            </section>
          )}

          {/* 세계 카드 3개 */}
          {worldCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid">
                {worldCards.map((card, index) => (
                  <li
                    key={card.src}
                    className={`work-detail__card work-detail__card--${index + 1}`}
                  >
                    <div className="work-detail__card-image">
                      <img src={card.src} alt={card.alt} loading="lazy" />
                    </div>
                    {work.notes && work.notes[index + 2] && (
                      <div className="work-detail__card-text">
                        {work.notes[index + 2].title && <h4 className="work-detail__card-title">{work.notes[index + 2].title}</h4>}
                        {work.notes[index + 2].description && <p>{work.notes[index + 2].description}</p>}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 최종 Feature 섹션: And Then, the Discovery */}
          {finalFeatureImage && work.notes[5] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block">
                <img src={finalFeatureImage.src} alt={finalFeatureImage.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                {work.notes[5].title && <h3 className="work-detail__feature-title">{work.notes[5].title}</h3>}
                {work.notes[5].description && <p>{work.notes[5].description}</p>}
              </div>
            </section>
          )}
        </div>
      );
    }

    // gofetch 레이아웃이 필요한 경우 (김재은 작품 1)
    const useGofetchLayout = work.layout === 'gofetch' || work.id === 'kimjaeeun-go-fetch';
    
    if (useGofetchLayout && work.gallery && work.notes && Array.isArray(work.notes) && work.notes[0] && typeof work.notes[0] === 'object') {
      const featureImage = work.gallery[0]; // To The End, For You 이미지 (작품1_02)
      const characterCards = work.gallery.slice(1, 4); // NURI, GAON, Spaceship (작품1_03, 04, 05)
      const galleryImages = work.gallery.slice(4, 11); // Inciting Incident images (작품1_06~12, 7개)
      const storyCards = work.gallery.slice(11, 14); // Farewell, Journey, Crisis (작품1_13, 14, 15)

      // 갤러리 이미지를 3열로 분배 (Column 1: 2개, Column 2: 3개, Column 3: 2개)
      const galleryColumn1 = [galleryImages[0], galleryImages[1]]; // 411px, 360px
      const galleryColumn2 = [galleryImages[2], galleryImages[3], galleryImages[4]]; // 251px, 300px, 251px
      const galleryColumn3 = [galleryImages[5], galleryImages[6]]; // 300px, 411px

      return (
        <div className="work-detail work-detail--gofetch">
          <ModalHeroSection
            eyebrowImageSrc={badgeSrc}
            eyebrowImageAlt={badgeAlt}
            eyebrowText={work.genre || designer.role || 'Content'}
            title={work.title}
            lead={work.summary}
            mediaSrc={work.thumbnail}
            mediaAlt={`${work.title} 대표 장면`}
            ctas={ctas}
          />

          {/* Feature 섹션: To The End, For You (이미지 위, 텍스트 아래) */}
          {featureImage && work.notes[0] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block work-detail__image-block--feature">
                <img src={featureImage.src} alt={featureImage.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                {work.notes[0].title && <h3 className="work-detail__feature-title">{work.notes[0].title}</h3>}
                {work.notes[0].description && <p>{work.notes[0].description}</p>}
              </div>
            </section>
          )}

          {/* 캐릭터 카드 3개: NURI, GAON, Spaceship */}
          {characterCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid work-detail__cards-grid--character">
                {characterCards.map((card, index) => (
                  <li
                    key={card.src}
                    className={`work-detail__card work-detail__card--character work-detail__card--${index + 1}`}
                  >
                    <div className="work-detail__card-image work-detail__card-image--character">
                      <img src={card.src} alt={card.alt} loading="lazy" />
                    </div>
                    {work.notes && work.notes[index + 1] && (
                      <div className="work-detail__card-text">
                        {work.notes[index + 1].title && <h4 className="work-detail__card-title">{work.notes[index + 1].title}</h4>}
                        {work.notes[index + 1].description && <p>{work.notes[index + 1].description}</p>}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 갤러리 섹션: Inciting Incident (3열 masonry 스타일) */}
          {work.notes[4] && (
            <section className="work-detail__section work-detail__gallery-section">
              <div className="work-detail__gallery-header">
                {work.notes[4].title && <h3 className="work-detail__gallery-title">{work.notes[4].title}</h3>}
                {work.notes[4].description && <p className="work-detail__gallery-description">{work.notes[4].description}</p>}
              </div>
              <div className="work-detail__gallery-masonry">
                <div className="work-detail__gallery-column">
                  {galleryColumn1.map((item, index) => (
                    <div key={item.src} className="work-detail__gallery-item">
                      <img src={item.src} alt={item.alt} loading="lazy" />
                    </div>
                  ))}
                </div>
                <div className="work-detail__gallery-column">
                  {galleryColumn2.map((item, index) => (
                    <div key={item.src} className="work-detail__gallery-item">
                      <img src={item.src} alt={item.alt} loading="lazy" />
                    </div>
                  ))}
                </div>
                <div className="work-detail__gallery-column">
                  {galleryColumn3.map((item, index) => (
                    <div key={item.src} className="work-detail__gallery-item">
                      <img src={item.src} alt={item.alt} loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* 스토리 카드 3개: Farewell, Journey, Crisis (border 있는 카드) */}
          {storyCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid work-detail__cards-grid--story">
                {storyCards.map((card, index) => (
                  <li
                    key={card.src}
                    className={`work-detail__card work-detail__card--story work-detail__card--${index + 1}`}
                  >
                    <div className="work-detail__card-image work-detail__card-image--story">
                      <img src={card.src} alt={card.alt} loading="lazy" />
                    </div>
                    {work.notes && work.notes[index + 5] && (
                      <div className="work-detail__card-text work-detail__card-text--story">
                        {work.notes[index + 5].title && <h4 className="work-detail__card-title">{work.notes[index + 5].title}</h4>}
                        {work.notes[index + 5].description && <p>{work.notes[index + 5].description}</p>}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      );
    }

    // fate-boardgame 레이아웃이 필요한 경우 (김채영 작품 1)
    const useFateBoardgameLayout = work.layout === 'fate-boardgame' || work.id === 'kimchaeyoung-fate-boardgame';
    
    if (useFateBoardgameLayout && work.gallery && work.notes && Array.isArray(work.notes) && work.notes[0] && typeof work.notes[0] === 'object') {
      const overviewImage = work.gallery[0]; // 프로젝트 개요 이미지
      const cards1 = work.gallery.slice(1, 4); // 이타, 안정, 인내
      const cards2 = work.gallery.slice(4, 7); // 이기, 모험, 쾌락
      const questionCard = work.gallery[7]; // 질문카드
      const trapCard = work.gallery[8]; // 함정카드
      const fateSheet = work.gallery[9]; // 운명시트
      const board = work.gallery[10]; // 보드판

      return (
        <div className="work-detail work-detail--fate-boardgame">
          <ModalHeroSection
            eyebrowImageSrc={badgeSrc}
            eyebrowImageAlt={badgeAlt}
            eyebrowText={work.genre || designer.role || 'Content'}
            title={work.title}
            lead={work.summary}
            mediaSrc={work.thumbnail}
            mediaAlt={`${work.title} 대표 장면`}
            ctas={ctas}
          />

          {/* Feature: 프로젝트 개요 */}
          {overviewImage && work.notes[0] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block work-detail__image-block--feature">
                <img src={overviewImage.src} alt={overviewImage.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                {work.notes[0].title && <h3 className="work-detail__feature-title">{work.notes[0].title}</h3>}
                {work.notes[0].description && <p>{work.notes[0].description}</p>}
              </div>
            </section>
          )}

          {/* Cards Grid 1: 이타, 안정, 인내 */}
          {cards1.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid">
                {cards1.map((card, index) => (
                  <li key={card.src} className="work-detail__card">
                    <div className="work-detail__card-image">
                      <img src={card.src} alt={card.alt} loading="lazy" />
                    </div>
                    {work.notes && work.notes[index + 1] && (
                      <div className="work-detail__card-text">
                        {work.notes[index + 1].title && <h5 className="work-detail__card-title">{work.notes[index + 1].title}</h5>}
                        {work.notes[index + 1].description && <p>{work.notes[index + 1].description}</p>}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Cards Grid 2: 이기, 모험, 쾌락 */}
          {cards2.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid">
                {cards2.map((card, index) => (
                  <li key={card.src} className="work-detail__card">
                    <div className="work-detail__card-image">
                      <img src={card.src} alt={card.alt} loading="lazy" />
                    </div>
                    {work.notes && work.notes[index + 4] && (
                      <div className="work-detail__card-text">
                        {work.notes[index + 4].title && <h5 className="work-detail__card-title">{work.notes[index + 4].title}</h5>}
                        {work.notes[index + 4].description && <p>{work.notes[index + 4].description}</p>}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Feature Alternating: 질문카드 */}
          {questionCard && work.notes[7] && (
            <section className="work-detail__section work-detail__feature work-detail__feature--alternating">
              <div className="work-detail__image-block">
                <img src={questionCard.src} alt={questionCard.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                <div>
                  {work.notes[7].title && <h3 className="work-detail__feature-title">{work.notes[7].title}</h3>}
                  {work.notes[7].description && <p>{work.notes[7].description}</p>}
                </div>
              </div>
            </section>
          )}

          {/* Feature Alternating: 함정카드 */}
          {trapCard && work.notes[8] && (
            <section className="work-detail__section work-detail__feature work-detail__feature--alternating">
              <div className="work-detail__image-block">
                <img src={trapCard.src} alt={trapCard.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                <div>
                  {work.notes[8].title && <h3 className="work-detail__feature-title">{work.notes[8].title}</h3>}
                  {work.notes[8].description && <p>{work.notes[8].description}</p>}
                </div>
              </div>
            </section>
          )}

          {/* Feature Alternating: 운명시트 */}
          {fateSheet && work.notes[9] && (
            <section className="work-detail__section work-detail__feature work-detail__feature--alternating">
              <div className="work-detail__image-block">
                <img src={fateSheet.src} alt={fateSheet.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                <div>
                  {work.notes[9].title && <h3 className="work-detail__feature-title">{work.notes[9].title}</h3>}
                  {work.notes[9].description && <p>{work.notes[9].description}</p>}
                </div>
              </div>
            </section>
          )}

          {/* Feature Alternating: 보드판 */}
          {board && work.notes[10] && (
            <section className="work-detail__section work-detail__feature work-detail__feature--alternating">
              <div className="work-detail__image-block">
                <img src={board.src} alt={board.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                <div>
                  {work.notes[10].title && <h3 className="work-detail__feature-title">{work.notes[10].title}</h3>}
                  {work.notes[10].description && <p>{work.notes[10].description}</p>}
                </div>
              </div>
            </section>
          )}
        </div>
      );
    }

    // cyber-jesasang 레이아웃이 필요한 경우 (김채영 작품 2)
    const useCyberJesasangLayout = work.layout === 'cyber-jesasang' || work.id === 'kimchaeyoung-cyber-jesasang';
    
    if (useCyberJesasangLayout && work.gallery && work.notes && Array.isArray(work.notes) && work.notes[0] && typeof work.notes[0] === 'object') {
      const mainSceneImage = work.gallery[0]; // Main Scene
      const angerImage = work.gallery[1]; // 분노
      const sadnessImage = work.gallery[2]; // 슬픔
      const regretImage = work.gallery[3]; // 후회
      const anxietyImage = work.gallery[4]; // 불안
      const disgustImage = work.gallery[5]; // 혐오
      const nameInputCard = work.gallery[6]; // 이름 입력
      const eulogyCard = work.gallery[7]; // 제문 작성
      const archiveCard = work.gallery[8]; // 기억의 제단

      return (
        <div className="work-detail work-detail--cyber-jesasang">
          <ModalHeroSection
            eyebrowImageSrc={badgeSrc}
            eyebrowImageAlt={badgeAlt}
            eyebrowText={work.genre || designer.role || 'Content'}
            title={work.title}
            lead={work.summary}
            mediaSrc={work.thumbnail}
            mediaAlt={`${work.title} 대표 장면`}
            ctas={ctas}
          />

          {/* Text Section: 사이버 제사상 소개 */}
          {work.notes[0] && (
            <section className="work-detail__section work-detail__text-intro">
              <h3 className="work-detail__text-intro-title">{work.notes[0].title}</h3>
              <p className="work-detail__text-intro-description">{work.notes[0].description}</p>
            </section>
          )}

          {/* Feature: Main Scene */}
          {mainSceneImage && work.notes[1] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block work-detail__image-block--feature">
                <img src={mainSceneImage.src} alt={mainSceneImage.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                {work.notes[1].title && <h3 className="work-detail__feature-title">{work.notes[1].title}</h3>}
                {work.notes[1].description && <p>{work.notes[1].description}</p>}
              </div>
            </section>
          )}

          {/* Feature Alternating: 분노 */}
          {angerImage && work.notes[2] && (
            <section className="work-detail__section work-detail__feature work-detail__feature--alternating">
              <div className="work-detail__image-block">
                <img src={angerImage.src} alt={angerImage.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                <div>
                  {work.notes[2].title && <h3 className="work-detail__feature-title">{work.notes[2].title}</h3>}
                  {work.notes[2].description && <p>{work.notes[2].description}</p>}
                </div>
              </div>
            </section>
          )}

          {/* Feature Rows: 슬픔, 후회 */}
          {sadnessImage && regretImage && work.notes[3] && work.notes[4] && (
            <section className="work-detail__section work-detail__feature-rows">
              <ul className="work-detail__feature-rows-list">
                {/* 슬픔 (텍스트 + 이미지) */}
                <li className="work-detail__feature-row">
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[3].title && <h3 className="work-detail__feature-title">{work.notes[3].title}</h3>}
                      {work.notes[3].description && <p>{work.notes[3].description}</p>}
                    </div>
                  </div>
                  <div className="work-detail__image-block">
                    <img src={sadnessImage.src} alt={sadnessImage.alt} loading="lazy" />
                  </div>
                </li>
                {/* 후회 (이미지 + 텍스트, 역순) */}
                <li className="work-detail__feature-row work-detail__feature-row--reverse">
                  <div className="work-detail__image-block">
                    <img src={regretImage.src} alt={regretImage.alt} loading="lazy" />
                  </div>
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[4].title && <h3 className="work-detail__feature-title">{work.notes[4].title}</h3>}
                      {work.notes[4].description && <p>{work.notes[4].description}</p>}
                    </div>
                  </div>
                </li>
              </ul>
            </section>
          )}

          {/* Feature Rows: 불안, 혐오 */}
          {anxietyImage && disgustImage && work.notes[5] && work.notes[6] && (
            <section className="work-detail__section work-detail__feature-rows">
              <ul className="work-detail__feature-rows-list">
                {/* 불안 (텍스트 + 이미지) */}
                <li className="work-detail__feature-row">
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[5].title && <h3 className="work-detail__feature-title">{work.notes[5].title}</h3>}
                      {work.notes[5].description && <p>{work.notes[5].description}</p>}
                    </div>
                  </div>
                  <div className="work-detail__image-block">
                    <img src={anxietyImage.src} alt={anxietyImage.alt} loading="lazy" />
                  </div>
                </li>
                {/* 혐오 (이미지 + 텍스트, 역순) */}
                <li className="work-detail__feature-row work-detail__feature-row--reverse">
                  <div className="work-detail__image-block">
                    <img src={disgustImage.src} alt={disgustImage.alt} loading="lazy" />
                  </div>
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[6].title && <h3 className="work-detail__feature-title">{work.notes[6].title}</h3>}
                      {work.notes[6].description && <p>{work.notes[6].description}</p>}
                    </div>
                  </div>
                </li>
              </ul>
            </section>
          )}

          {/* Cards Grid: 이름 입력, 제문 작성, 기억의 제단 */}
          {nameInputCard && eulogyCard && archiveCard && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid">
                {[
                  { card: nameInputCard, note: work.notes[7] },
                  { card: eulogyCard, note: work.notes[8] },
                  { card: archiveCard, note: work.notes[9] },
                ].map(({ card, note }, index) => (
                  <li key={card.src} className="work-detail__card">
                    <div className="work-detail__card-image">
                      <img src={card.src} alt={card.alt} loading="lazy" />
                    </div>
                    {note && (
                      <div className="work-detail__card-text">
                        {note.title && <h5 className="work-detail__card-title">{note.title}</h5>}
                        {note.description && <p>{note.description}</p>}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      );
    }

    // dotianhong-isometric 레이아웃이 필요한 경우 (도티안홍 작품 1)
    const useDotianhongIsometricLayout = work.layout === 'dotianhong-isometric' || work.id === 'dotianhong-see-tinh-isometric';
    
    if (useDotianhongIsometricLayout && work.gallery && work.notes && Array.isArray(work.notes)) {
      return (
        <div className="work-detail work-detail--dotianhong-isometric">
          <ModalHeroSection
            eyebrowImageSrc={badgeSrc}
            eyebrowImageAlt={badgeAlt}
            eyebrowText={work.genre || designer.role || 'Content'}
            title={work.title}
            lead={work.summary}
            mediaSrc={work.thumbnail}
            mediaAlt={`${work.title} 대표 장면`}
            ctas={ctas}
          />

          {/* Feature sections */}
          {work.gallery.map((image, index) => {
            const note = work.notes[index];
            return (
              <section key={image.src} className="work-detail__section work-detail__feature">
                <div className="work-detail__image-block work-detail__image-block--feature">
                  <img src={image.src} alt={image.alt} loading="lazy" />
                </div>
                {note && note.description && (
                  <div className="work-detail__feature-text">
                    {note.title && <h3 className="work-detail__feature-title">{note.title}</h3>}
                    <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      );
    }

    // dotianhong-animated 레이아웃이 필요한 경우 (도티안홍 작품 2)
    const useDotianhongAnimatedLayout = work.layout === 'dotianhong-animated' || work.id === 'dotianhong-see-tinh-animated';
    
    if (useDotianhongAnimatedLayout && work.gallery && work.notes && Array.isArray(work.notes)) {
      return (
        <div className="work-detail work-detail--dotianhong-animated">
          <ModalHeroSection
            eyebrowImageSrc={badgeSrc}
            eyebrowImageAlt={badgeAlt}
            eyebrowText={work.genre || designer.role || 'Content'}
            title={work.title}
            lead={work.summary}
            mediaSrc={work.thumbnail}
            mediaAlt={`${work.title} 대표 장면`}
            ctas={ctas}
          />

          {/* Feature sections */}
          {work.gallery.map((image, index) => {
            const note = work.notes[index];
            return (
              <section key={image.src} className="work-detail__section work-detail__feature">
                <div className="work-detail__image-block work-detail__image-block--feature">
                  <img src={image.src} alt={image.alt} loading="lazy" />
                </div>
                {note && note.description && (
                  <div className="work-detail__feature-text">
                    {note.title && <h3 className="work-detail__feature-title">{note.title}</h3>}
                    <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      );
    }

    // parkjina-cross-cooty 레이아웃이 필요한 경우 (박진아 작품 1)
    const useParkjinaCrossCootyLayout = work.layout === 'parkjina-cross-cooty' || work.id === 'parkjina-cross-cooty';
    
    if (useParkjinaCrossCootyLayout && work.gallery && work.notes && Array.isArray(work.notes)) {
      return (
        <div className="work-detail work-detail--parkjina-cross-cooty">
          <ModalHeroSection
            eyebrowImageSrc={badgeSrc}
            eyebrowImageAlt={badgeAlt}
            eyebrowText={work.genre || designer.role || 'Content'}
            title={work.title}
            lead={work.summary}
            mediaSrc={work.thumbnail}
            mediaAlt={`${work.title} 대표 장면`}
            ctas={ctas}
          />

          {/* Text Section: Cooty Universe */}
          {work.notes[0] && (
            <section className="work-detail__section work-detail__text-intro">
              <h3 className="work-detail__text-intro-title">{work.notes[0].title}</h3>
              <p className="work-detail__text-intro-description" style={{ whiteSpace: 'pre-wrap' }}>{work.notes[0].description}</p>
            </section>
          )}

          {/* Logo Design */}
          {work.gallery[0] && work.notes[1] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block work-detail__image-block--feature">
                <img src={work.gallery[0].src} alt={work.gallery[0].alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                {work.notes[1].title && <h3 className="work-detail__feature-title">{work.notes[1].title}</h3>}
                {work.notes[1].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[1].description}</p>}
              </div>
            </section>
          )}

          {/* Cards Grid 1: COTONA, MOSSROOT, iCORA */}
          {work.gallery.slice(1, 4).length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid">
                {work.gallery.slice(1, 4).map((card, index) => (
                  <li key={card.src} className="work-detail__card">
                    <div className="work-detail__card-image">
                      <img src={card.src} alt={card.alt} loading="lazy" />
                    </div>
                    {work.notes[index + 2] && (
                      <div className="work-detail__card-text">
                        {work.notes[index + 2].title && <h5 className="work-detail__card-title">{work.notes[index + 2].title}</h5>}
                        {work.notes[index + 2].description && <p>{work.notes[index + 2].description}</p>}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Feature Rows: Cotton, Moss */}
          {work.gallery[4] && work.gallery[5] && work.notes[5] && work.notes[6] && (
            <section className="work-detail__section work-detail__feature-rows">
              <ul className="work-detail__feature-rows-list">
                <li className="work-detail__feature-row">
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[5].title && <h3 className="work-detail__feature-title">{work.notes[5].title}</h3>}
                      {work.notes[5].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[5].description}</p>}
                    </div>
                  </div>
                  <div className="work-detail__image-block">
                    <img src={work.gallery[4].src} alt={work.gallery[4].alt} loading="lazy" />
                  </div>
                </li>
                <li className="work-detail__feature-row work-detail__feature-row--reverse">
                  <div className="work-detail__image-block">
                    <img src={work.gallery[5].src} alt={work.gallery[5].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[6].title && <h3 className="work-detail__feature-title">{work.notes[6].title}</h3>}
                      {work.notes[6].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[6].description}</p>}
                    </div>
                  </div>
                </li>
              </ul>
            </section>
          )}

          {/* Feature Alternating: Ice */}
          {work.gallery[6] && work.notes[7] && (
            <section className="work-detail__section work-detail__feature work-detail__feature--alternating">
              <div className="work-detail__feature-text">
                <div>
                  {work.notes[7].title && <h3 className="work-detail__feature-title">{work.notes[7].title}</h3>}
                  {work.notes[7].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[7].description}</p>}
                </div>
              </div>
              <div className="work-detail__image-block">
                <img src={work.gallery[6].src} alt={work.gallery[6].alt} loading="lazy" />
              </div>
            </section>
          )}

          {/* Cards Grid 2: LUFU, MOSSO, WiVi (특별한 스타일) */}
          {work.gallery.slice(7, 10).length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid work-detail__cards-grid--character">
                {work.gallery.slice(7, 10).map((card, index) => (
                  <li key={card.src} className="work-detail__card work-detail__card--character">
                    <div className="work-detail__card-text">
                      {work.notes[index + 8] && (
                        <>
                          {work.notes[index + 8].title && <h5 className="work-detail__card-title">{work.notes[index + 8].title}</h5>}
                          {work.notes[index + 8].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[index + 8].description}</p>}
                        </>
                      )}
                    </div>
                    <div className="work-detail__card-image work-detail__card-image--character">
                      <img src={card.src} alt={card.alt} loading="lazy" />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 큰 이미지 */}
          {work.gallery[10] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block work-detail__image-block--feature">
                <img src={work.gallery[10].src} alt={work.gallery[10].alt} loading="lazy" />
              </div>
            </section>
          )}

          {/* Cards Grid 3: Liggght!!!, miC00rowave, OO/O */}
          {work.gallery.slice(11, 14).length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid">
                {work.gallery.slice(11, 14).map((card, index) => (
                  <li key={card.src} className="work-detail__card">
                    <div className="work-detail__card-image">
                      <img src={card.src} alt={card.alt} loading="lazy" />
                    </div>
                    {work.notes[index + 11] && work.notes[index + 11].title && (
                      <div className="work-detail__card-text">
                        <h5 className="work-detail__card-title">{work.notes[index + 11].title}</h5>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      );
    }

    // parkjina-remains 레이아웃이 필요한 경우 (박진아 작품 2)
    const useParkjinaRemainsLayout = work.layout === 'parkjina-remains' || work.id === 'parkjina-remains';
    
    if (useParkjinaRemainsLayout && work.gallery && work.notes && Array.isArray(work.notes)) {
      return (
        <div className="work-detail work-detail--parkjina-remains">
          {/* Hero with image on left */}
          <section className="work-detail__section work-detail__hero work-detail__hero--reverse">
            <div className="work-detail__hero-media">
              <img src={work.thumbnail} alt={`${work.title} 대표 장면`} loading="lazy" />
            </div>
            <div className="work-detail__hero-text">
              <div className="work-detail__eyebrow">
                <img src={badgeSrc} alt={badgeAlt} />
                <span>{work.genre || designer.role || 'Content'}</span>
              </div>
              <h1 className="work-detail__title">{work.title}</h1>
              <p className="work-detail__lead">{work.summary}</p>
              <div className="work-detail__ctas">
                {ctas.map((cta, index) => (
                  <a
                    key={index}
                    href={cta.href}
                    className={`work-detail__cta ${cta.variant === 'primary' ? 'work-detail__cta--primary' : 'work-detail__cta--secondary'}`}
                    onClick={cta.onClick}
                  >
                    {cta.label}
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Feature: Remain. */}
          {work.gallery[0] && work.notes[0] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block work-detail__image-block--feature">
                <img src={work.gallery[0].src} alt={work.gallery[0].alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                {work.notes[0].title && <h3 className="work-detail__feature-title">{work.notes[0].title}</h3>}
                {work.notes[0].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[0].description}</p>}
              </div>
            </section>
          )}

          {/* Cards Grid: I., Flow., Remain. */}
          {work.gallery.slice(1, 4).length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid">
                {work.gallery.slice(1, 4).map((card, index) => (
                  <li key={card.src} className="work-detail__card">
                    <div className="work-detail__card-image">
                      <img src={card.src} alt={card.alt} loading="lazy" />
                    </div>
                    {work.notes[index + 1] && (
                      <div className="work-detail__card-text">
                        {work.notes[index + 1].title && <h5 className="work-detail__card-title">{work.notes[index + 1].title}</h5>}
                        {work.notes[index + 1].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[index + 1].description}</p>}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Feature Rows: Success and Failure., Love and Loss. */}
          {work.gallery[4] && work.gallery[5] && work.notes[4] && work.notes[5] && (
            <section className="work-detail__section work-detail__feature-rows">
              <ul className="work-detail__feature-rows-list">
                <li className="work-detail__feature-row">
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[4].title && <h3 className="work-detail__feature-title">{work.notes[4].title}</h3>}
                      {work.notes[4].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[4].description}</p>}
                    </div>
                  </div>
                  <div className="work-detail__image-block">
                    <img src={work.gallery[4].src} alt={work.gallery[4].alt} loading="lazy" />
                  </div>
                </li>
                <li className="work-detail__feature-row work-detail__feature-row--reverse">
                  <div className="work-detail__image-block">
                    <img src={work.gallery[5].src} alt={work.gallery[5].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[5].title && <h3 className="work-detail__feature-title">{work.notes[5].title}</h3>}
                      {work.notes[5].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[5].description}</p>}
                    </div>
                  </div>
                </li>
              </ul>
            </section>
          )}

          {/* Feature Bento: Ego and Change., Forest., Mountain., Desert., Winter. */}
          {work.gallery.slice(6, 11).length > 0 && (
            <section className="work-detail__section work-detail__feature">
              {work.gallery.slice(6, 11).map((image, index) => {
                const note = work.notes[index + 6];
                return (
                  <div key={image.src} style={{ marginBottom: index < 4 ? '48px' : '0' }}>
                    <div className="work-detail__image-block work-detail__image-block--feature">
                      <img src={image.src} alt={image.alt} loading="lazy" />
                    </div>
                    {note && (
                      <div className="work-detail__feature-text">
                        {note.title && <h3 className="work-detail__feature-title">{note.title}</h3>}
                        {note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>}
                      </div>
                    )}
                  </div>
                );
              })}
            </section>
          )}
        </div>
      );
    }

    // parkhaein-chrome4 레이아웃이 필요한 경우 (박해인 작품 1)
    const useParkhaeinChrome4Layout = work.layout === 'parkhaein-chrome4' || work.id === 'parkhaein-chrome4';
    
    if (useParkhaeinChrome4Layout && work.gallery && work.notes && Array.isArray(work.notes)) {
      const posterCards = work.gallery.slice(1, 4); // POSTER#01, #02, #03
      const seasonCards = work.gallery.slice(4, 7); // AUTUMN, SPRING, WINTER
      const detailShots = work.gallery.slice(7, 12); // Detail shots

      return (
        <div className="work-detail work-detail--parkhaein-chrome4">
          <ModalHeroSection
            eyebrowImageSrc={badgeSrc}
            eyebrowImageAlt={badgeAlt}
            eyebrowText={work.genre || designer.role || 'Content'}
            title={work.title}
            lead={work.summary}
            mediaSrc={work.thumbnail}
            mediaAlt={`${work.title} 대표 장면`}
            ctas={ctas}
          />

          {/* Feature: Spring to winter */}
          {work.gallery[0] && work.notes[0] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block work-detail__image-block--feature">
                <img src={work.gallery[0].src} alt={work.gallery[0].alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                {work.notes[0].title && <h3 className="work-detail__feature-title">{work.notes[0].title}</h3>}
                {work.notes[0].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[0].description}</p>}
              </div>
            </section>
          )}

          {/* Cards Grid: POSTER#01, #02, #03 */}
          {posterCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid">
                {posterCards.map((card, index) => (
                  <li key={card.src} className="work-detail__card">
                    <div className="work-detail__card-image">
                      <img src={card.src} alt={card.alt} loading="lazy" />
                    </div>
                    {work.notes[index + 1] && work.notes[index + 1].title && (
                      <div className="work-detail__card-text">
                        <h5 className="work-detail__card-title">{work.notes[index + 1].title}</h5>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Feature Bento: AUTUMN, SPRING, WINTER */}
          {seasonCards.length > 0 && (
            <section className="work-detail__section work-detail__feature">
              <ul className="work-detail__bento-grid">
                {seasonCards.map((card, index) => (
                  <li key={card.src} className={`work-detail__bento-item ${index === 1 ? 'work-detail__bento-item--medium' : index === 2 ? 'work-detail__bento-item--large' : ''}`}>
                    <div className="work-detail__image-block work-detail__image-block--feature">
                      <img src={card.src} alt={card.alt} loading="lazy" />
                    </div>
                    {work.notes[index + 4] && (
                      <div className="work-detail__feature-text">
                        {work.notes[index + 4].title && <h3 className="work-detail__feature-title">{work.notes[index + 4].title}</h3>}
                        {work.notes[index + 4].description && <p>{work.notes[index + 4].description}</p>}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Gallery: Another scene - Detail Shots */}
          {detailShots.length > 0 && (
            <section className="work-detail__section work-detail__gallery-section">
              <div className="work-detail__gallery-header">
                <h3 className="work-detail__gallery-title">Another scene</h3>
                <p className="work-detail__gallery-description">Detail Shots</p>
              </div>
              <div className="work-detail__gallery-masonry">
                <div className="work-detail__gallery-column">
                  <div className="work-detail__gallery-item">
                    <img src={detailShots[0].src} alt={detailShots[0].alt} loading="lazy" />
                  </div>
                </div>
                <div className="work-detail__gallery-column">
                  <div className="work-detail__gallery-item">
                    <img src={detailShots[1].src} alt={detailShots[1].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__gallery-item">
                    <img src={detailShots[2].src} alt={detailShots[2].alt} loading="lazy" />
                  </div>
                </div>
                <div className="work-detail__gallery-column">
                  <div className="work-detail__gallery-item">
                    <img src={detailShots[3].src} alt={detailShots[3].alt} loading="lazy" />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Instagram Card */}
          {work.instagramImage && designer?.instagram && (
            <section className="work-detail__section work-detail__instagram-card">
              <article className="work-detail__instagram-card-inner">
                <div className="work-detail__instagram-card-image">
                  <img src={work.instagramImage} alt="Instagram profile" loading="lazy" />
                </div>
                <div className="work-detail__instagram-card-text">
                  <h5 className="work-detail__instagram-card-title">{designer.instagram.replace('https://www.instagram.com/', '@')}</h5>
                  <p className="work-detail__instagram-card-subtitle">Work by {designer.displayName}</p>
                  <p className="work-detail__instagram-card-link">You can find more of my works on Instagram →</p>
                </div>
              </article>
            </section>
          )}

          {/* Footer Text */}
          {work.footerText && (
            <section className="work-detail__section work-detail__footer-text">
              <p>{work.footerText}</p>
            </section>
          )}
        </div>
      );
    }

    // cards 레이아웃이 필요한 경우 (김윤정 작품 2 등)
    const useCardsLayout = work.layout === 'cards' || work.id === 'kimyunjung-hello-universe';
    
    if (useCardsLayout && work.gallery && work.gallery.length > 4) {
      const insightCards = work.gallery.slice(1, 4);
      const galleryImages = work.gallery.slice(4);

      return (
        <div className="kim-love-modal kim-work2-modal">
          <ModalHeroSection
            eyebrowImageSrc={badgeSrc}
            eyebrowImageAlt={badgeAlt}
            eyebrowText={work.genre || designer.role || 'Content'}
            title={work.title}
            lead={work.summary}
            mediaSrc={work.thumbnail}
            mediaAlt={`${work.title} 대표 장면`}
            ctas={ctas}
          />

          {work.gallery[0] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block">
                <img src={work.gallery[0].src} alt={work.gallery[0].alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                {work.description && <p>{work.description}</p>}
              </div>
            </section>
          )}

          {insightCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid">
                {insightCards.map((card, index) => (
                  <li
                    key={card.src}
                    className={`work-detail__card work-detail__card--${index + 1}`}
                  >
                    <div className="work-detail__card-image">
                      <img src={card.src} alt={card.alt} loading="lazy" />
                    </div>
                    {work.notes && work.notes[index] && (
                      <div className="work-detail__card-text">
                        <p>{work.notes[index]}</p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {galleryImages.map((item, index) => (
            <section
              key={item.src}
              className={`work-detail__section work-detail__feature work-detail__feature--media-only work-detail__feature--gallery-${index + 1}`}
            >
              <div className="work-detail__image-block">
                <img src={item.src} alt={item.alt} loading="lazy" />
              </div>
            </section>
          ))}
        </div>
      );
    }

    // 기본 레이아웃: 모든 작품이 동일한 구조 사용
    return (
      <div className="work-detail">
        <ModalHeroSection
          eyebrowImageSrc={badgeSrc}
          eyebrowImageAlt={badgeAlt}
          eyebrowText={work.genre || designer.role || 'Content'}
          title={work.title}
          lead={work.summary}
          mediaSrc={work.thumbnail}
          mediaAlt={`${work.title} 대표 장면`}
          ctas={ctas}
        />
        
        {work.gallery && work.gallery.length > 0 ? (
          <>
            {/* 첫 번째 섹션: 이미지 + 텍스트 */}
            <section className="work-detail__section work-detail__feature work-detail__feature--1">
              <div className="work-detail__image-block">
                <img src={work.gallery[0].src} alt={work.gallery[0].alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                {work.description && <p>{work.description}</p>}
                {work.notes && work.notes.length > 0 && (
                  <p>{work.notes[0]}</p>
                )}
              </div>
            </section>

            {/* 두 번째 이미지: caption이 있으면 표시 */}
            {work.gallery[1] && (
              <section className="work-detail__section work-detail__feature work-detail__feature--2 work-detail__feature--media-only">
                <div className="work-detail__image-block">
                  <img src={work.gallery[1].src} alt={work.gallery[1].alt} loading="lazy" />
                </div>
                {work.gallery[1].caption && (
                  <p className="work-detail__feature-caption">{work.gallery[1].caption}</p>
                )}
              </section>
            )}

            {/* 나머지 갤러리 이미지들 */}
            {work.gallery.slice(2).map((item, index) => (
              <section
                key={item.src}
                className={`work-detail__section work-detail__feature work-detail__feature--${index + 3} work-detail__feature--media-only`}
              >
                <div className="work-detail__image-block">
                  <img src={item.src} alt={item.alt} loading="lazy" />
                </div>
                {item.caption && (
                  <p className="work-detail__feature-caption">{item.caption}</p>
                )}
              </section>
            ))}
          </>
        ) : (
          /* 갤러리가 없는 경우: 텍스트만 표시 */
          work.description && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__feature-text">
                <p>{work.description}</p>
                {work.notes && work.notes.map((note, idx) => (
                  <p key={idx}>{note}</p>
                ))}
              </div>
            </section>
          )
        )}
      </div>
    );
  };

  return (
    <div className="kim-detail">
      <div className="kim-detail__inner">
        <button type="button" className="kim-detail__back" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M19 12H5M12 19l-7-7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>디자이너 목록으로 돌아가기</span>
        </button>

        <header className="kim-simple-header">
          <h1 className="kim-simple-title">{designer.displayName}</h1>
        </header>

        <section className="kim-simple-gallery" aria-label={`${designer.displayName} 대표 작품`}>
          {designer.works.map((work) => (
            <article key={work.id} className="kim-work-card">
              <button
                type="button"
                className="kim-work-card__thumb"
                onClick={() => openWorkModal(work)}
                aria-label={`${work.title} 상세 보기`}
              >
                <img src={work.thumbnail} alt={work.title} loading="lazy" />
              </button>
              <div className="kim-work-card__body">
                <h2 className="kim-work-card__title">{work.title}</h2>
                <p className="kim-work-card__summary">{work.summary}</p>
                <button
                  type="button"
                  className="kim-work-card__cta"
                  onClick={() => openWorkModal(work)}
                >
                  상세 보기
                </button>
              </div>
            </article>
          ))}
        </section>
      </div>

      {selectedWork &&
        createPortal(
          <div className="kim-modal-overlay" role="dialog" aria-modal="true" onClick={closeWorkModal}>
            <div className="kim-modal-wrapper" onClick={handleWrapperClick}>
              <div className="kim-modal__topbar">
                <span className="kim-modal__topbar-name">{designer.displayName}</span>
              </div>
              <div className="kim-love-modal">
                {renderWorkContent(selectedWork)}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default DesignerShowcase;
