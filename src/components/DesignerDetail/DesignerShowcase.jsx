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

    // parkheechan-pledge 레이아웃 (박희찬 작품 1)
    const useParkheechanPledgeLayout = work.layout === 'parkheechan-pledge' || work.id === 'parkheechan-pledge';
    
    if (useParkheechanPledgeLayout && work.gallery && work.notes && Array.isArray(work.notes)) {
      const featureImage = work.gallery[0]; // 영원한 충성, 서약에 관한 이야기
      const spaceMarineImage = work.gallery[1]; // 스페이스 마린
      const dreadnoughtImage = work.gallery[2]; // 드레드노트
      const bentoCards = work.gallery.slice(3, 6); // 위협적인 적, 타이라니드 워리어, 카니펙스
      const galleryImages = work.gallery.slice(6); // 스틸컷들

      return (
        <div className="work-detail work-detail--parkheechan-pledge">
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

          {/* Feature: 영원한 충성, 서약에 관한 이야기 */}
          {featureImage && work.notes[0] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block work-detail__image-block--feature">
                <img src={featureImage.src} alt={featureImage.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                {work.notes[0].title && <h3 className="work-detail__feature-title">{work.notes[0].title}</h3>}
                {work.notes[0].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[0].description}</p>}
              </div>
            </section>
          )}

          {/* Feature Rows: 스페이스 마린, 드레드노트 */}
          {spaceMarineImage && dreadnoughtImage && work.notes[1] && work.notes[2] && (
            <section className="work-detail__section work-detail__feature-rows">
              <ul className="work-detail__feature-rows-list">
                <li className="work-detail__feature-row">
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[1].title && <h3 className="work-detail__feature-title">{work.notes[1].title}</h3>}
                      {work.notes[1].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[1].description}</p>}
                    </div>
                  </div>
                  <div className="work-detail__image-block">
                    <img src={spaceMarineImage.src} alt={spaceMarineImage.alt} loading="lazy" />
                  </div>
                </li>
                <li className="work-detail__feature-row work-detail__feature-row--reverse">
                  <div className="work-detail__image-block">
                    <img src={dreadnoughtImage.src} alt={dreadnoughtImage.alt} loading="lazy" />
                  </div>
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[2].title && <h3 className="work-detail__feature-title">{work.notes[2].title}</h3>}
                      {work.notes[2].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[2].description}</p>}
                    </div>
                  </div>
                </li>
              </ul>
            </section>
          )}

          {/* Feature Bento: 위협적인 적, 타이라니드 워리어, 카니펙스 */}
          {bentoCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid work-detail__cards-grid--bento">
                {bentoCards.map((card, index) => {
                  const note = work.notes[index + 3];
                  return (
                    <li key={card.src} className={`work-detail__card work-detail__card--bento-${index + 1}`}>
                      <div className="work-detail__card-image">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                      {note && (
                        <div className="work-detail__card-text">
                          {note.title && <h5 className="work-detail__card-title">{note.title}</h5>}
                          {note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Gallery: 스틸컷 */}
          {galleryImages.length > 0 && (
            <section className="work-detail__section work-detail__gallery-section">
              <div className="work-detail__gallery-header">
                <h3 className="work-detail__gallery-title">스틸컷</h3>
              </div>
              <div className="work-detail__gallery-masonry">
                <div className="work-detail__gallery-column">
                  <div className="work-detail__gallery-item">
                    <img src={galleryImages[0].src} alt={galleryImages[0].alt} loading="lazy" />
                  </div>
                </div>
                <div className="work-detail__gallery-column">
                  {galleryImages.slice(1, 4).map((item) => (
                    <div key={item.src} className="work-detail__gallery-item">
                      <img src={item.src} alt={item.alt} loading="lazy" />
                    </div>
                  ))}
                </div>
                <div className="work-detail__gallery-column">
                  {galleryImages.slice(4).map((item) => (
                    <div key={item.src} className="work-detail__gallery-item">
                      <img src={item.src} alt={item.alt} loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      );
    }

    // songdahee-card-of-love 레이아웃 (송다희 작품 1)
    const useSongdaheeCardOfLoveLayout = work.layout === 'songdahee-card-of-love' || work.id === 'songdahee-card-of-love';
    
    if (useSongdaheeCardOfLoveLayout && work.gallery && work.notes && Array.isArray(work.notes)) {
      const emotionCards = work.gallery.slice(0, 3); // Bouncy, Explode, Sweet
      const galleryImages = work.gallery.slice(3); // Gallery images

      return (
        <div className="work-detail work-detail--songdahee-card-of-love">
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

          {/* Cards Grid: Bouncy, Explode, Sweet */}
          {emotionCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid">
                {emotionCards.map((card, index) => {
                  const note = work.notes[index];
                  return (
                    <li key={card.src} className="work-detail__card">
                      <div className="work-detail__card-image">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                      {note && (
                        <div className="work-detail__card-text">
                          {note.title && <h5 className="work-detail__card-title">{note.title}</h5>}
                          {note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Gallery: A Card of Love */}
          {galleryImages.length > 0 && (
            <section className="work-detail__section work-detail__gallery-section">
              <div className="work-detail__gallery-header">
                <h3 className="work-detail__gallery-title">A Card of Love</h3>
                <p className="work-detail__gallery-description">쉽게 말하지 못한 사랑의 마음들이 머물다 가는 자리. 사랑의 언어를 다시 배우는 기록.</p>
              </div>
              <div className="work-detail__gallery-masonry">
                <div className="work-detail__gallery-column">
                  <div className="work-detail__gallery-item">
                    <img src={galleryImages[0].src} alt={galleryImages[0].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__gallery-item">
                    <img src={galleryImages[1].src} alt={galleryImages[1].alt} loading="lazy" />
                  </div>
                </div>
                <div className="work-detail__gallery-column">
                  {galleryImages.slice(2, 5).map((item) => (
                    <div key={item.src} className="work-detail__gallery-item">
                      <img src={item.src} alt={item.alt} loading="lazy" />
                    </div>
                  ))}
                </div>
                <div className="work-detail__gallery-column">
                  {galleryImages.slice(5).map((item) => (
                    <div key={item.src} className="work-detail__gallery-item">
                      <img src={item.src} alt={item.alt} loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      );
    }

    // songdahee-peony 레이아웃 (송다희 작품 2)
    const useSongdaheePeonyLayout = work.layout === 'songdahee-peony' || work.id === 'songdahee-peony';
    
    if (useSongdaheePeonyLayout && work.gallery && work.notes && Array.isArray(work.notes)) {
      const feature1Image = work.gallery[0]; // 어떤 마음에 대하여
      const feature2Image = work.gallery[1]; // 내 마음의 수몰 지구
      const poemCards = work.gallery.slice(2); // 어떤 마음에 대하여, 초록 물고기, 슬픔은 다할 수 없어

      return (
        <div className="work-detail work-detail--songdahee-peony">
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

          {/* Feature Rows: 어떤 마음에 대하여, 내 마음의 수몰 지구 */}
          {feature1Image && feature2Image && work.notes[0] && work.notes[1] && (
            <section className="work-detail__section work-detail__feature-rows">
              <ul className="work-detail__feature-rows-list">
                <li className="work-detail__feature-row">
                  <div className="work-detail__image-block">
                    <img src={feature1Image.src} alt={feature1Image.alt} loading="lazy" />
                  </div>
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[0].title && <h3 className="work-detail__feature-title">{work.notes[0].title}</h3>}
                      {work.notes[0].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[0].description}</p>}
                    </div>
                  </div>
                </li>
                <li className="work-detail__feature-row work-detail__feature-row--reverse">
                  <div className="work-detail__image-block">
                    <img src={feature2Image.src} alt={feature2Image.alt} loading="lazy" />
                  </div>
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[1].title && <h3 className="work-detail__feature-title">{work.notes[1].title}</h3>}
                      {work.notes[1].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[1].description}</p>}
                    </div>
                  </div>
                </li>
              </ul>
            </section>
          )}

          {/* Cards Grid: 어떤 마음에 대하여, 초록 물고기, 슬픔은 다할 수 없어 */}
          {poemCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid work-detail__cards-grid--poem">
                {poemCards.map((card, index) => {
                  const note = work.notes[index + 2];
                  return (
                    <li key={card.src} className="work-detail__card work-detail__card--poem">
                      <div className="work-detail__card-image">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                      {note && (
                        <div className="work-detail__card-text">
                          {note.title && <h5 className="work-detail__card-title">{note.title}</h5>}
                          {note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>
      );
    }

    // simseongbin-linked 레이아웃 (심성빈 작품 1)
    const useSimseongbinLinkedLayout = work.layout === 'simseongbin-linked' || work.id === 'simseongbin-linked';
    
    if (useSimseongbinLinkedLayout && work.gallery && work.notes && Array.isArray(work.notes)) {
      const orbCards = work.gallery.slice(0, 3); // Blue Orbs, Red Orbs, Green Orbs
      const bentoCards = work.gallery.slice(3, 6); // Connection, Destruction, Harmonize
      const techCards = work.gallery.slice(6); // Geometry Node cards

      return (
        <div className="work-detail work-detail--simseongbin-linked">
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

          {/* Cards Grid: Blue Orbs, Red Orbs, Green Orbs */}
          {orbCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid">
                {orbCards.map((card, index) => {
                  const note = work.notes[index];
                  return (
                    <li key={card.src} className="work-detail__card">
                      <div className="work-detail__card-image">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                      {note && (
                        <div className="work-detail__card-text">
                          {note.title && <h5 className="work-detail__card-title">{note.title}</h5>}
                          {note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Feature Bento: Connection, Destruction, Harmonize */}
          {bentoCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid work-detail__cards-grid--bento">
                {bentoCards.map((card, index) => {
                  const note = work.notes[index + 3];
                  return (
                    <li key={card.src} className={`work-detail__card work-detail__card--bento-${index + 1}`}>
                      <div className="work-detail__card-image">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                      {note && (
                        <div className="work-detail__card-text">
                          {note.title && <h5 className="work-detail__card-title">{note.title}</h5>}
                          {note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Feature Cards: Geometry Node */}
          {techCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid work-detail__cards-grid--tech">
                {techCards.map((card, index) => {
                  const note = work.notes[index + 6];
                  return (
                    <li key={card.src} className="work-detail__card work-detail__card--tech">
                      <div className="work-detail__card-text">
                        {note && (
                          <>
                            {note.title && <h5 className="work-detail__card-title">{note.title}</h5>}
                            {note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>}
                          </>
                        )}
                      </div>
                      <div className="work-detail__card-image work-detail__card-image--tech">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>
      );
    }

    // simseongbin-boom 레이아웃 (심성빈 작품 2)
    const useSimseongbinBoomLayout = work.layout === 'simseongbin-boom' || work.id === 'simseongbin-boom';
    
    if (useSimseongbinBoomLayout && work.gallery && work.notes && Array.isArray(work.notes)) {
      const sceneCards = work.gallery.slice(0, 3); // Mannequin, Office, Laptop
      const bentoCards = work.gallery.slice(3, 6); // Calm before the storm, Climax of the explosion, Plot twist
      const techCards = work.gallery.slice(6); // Fluid Simulation, Particle Simulation

      return (
        <div className="work-detail work-detail--simseongbin-boom">
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

          {/* Cards Grid: Mannequin, Office, Laptop */}
          {sceneCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid">
                {sceneCards.map((card, index) => {
                  const note = work.notes[index];
                  return (
                    <li key={card.src} className="work-detail__card">
                      <div className="work-detail__card-image">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                      {note && (
                        <div className="work-detail__card-text">
                          {note.title && <h5 className="work-detail__card-title">{note.title}</h5>}
                          {note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Feature Bento: Calm before the storm, Climax of the explosion, Plot twist */}
          {bentoCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid work-detail__cards-grid--bento">
                {bentoCards.map((card, index) => {
                  const note = work.notes[index + 3];
                  return (
                    <li key={card.src} className={`work-detail__card work-detail__card--bento-${index + 1}`}>
                      <div className="work-detail__card-image">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                      {note && (
                        <div className="work-detail__card-text">
                          {note.title && <h5 className="work-detail__card-title">{note.title}</h5>}
                          {note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Feature Cards: Fluid Simulation, Particle Simulation */}
          {techCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid work-detail__cards-grid--tech">
                {techCards.map((card, index) => {
                  const note = work.notes[index + 6];
                  return (
                    <li key={card.src} className="work-detail__card work-detail__card--tech">
                      <div className="work-detail__card-text">
                        {note && (
                          <>
                            {note.title && <h5 className="work-detail__card-title">{note.title}</h5>}
                            {note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>}
                          </>
                        )}
                      </div>
                      <div className="work-detail__card-image work-detail__card-image--tech">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>
      );
    }

    // anseonmin-dots 레이아웃 (안선민 작품 1)
    const useAnseonminDotsLayout = work.layout === 'anseonmin-dots' || work.id === 'anseonmin-dots';
    
    if (useAnseonminDotsLayout && work.gallery && work.notes && Array.isArray(work.notes)) {
      const featureImage = work.gallery[0]; // 우리는 모두 각자의 점으로부터 시작합니다
      const feature1Image = work.gallery[1]; // 보이지 않는 흐름 속에서
      const feature2Image = work.gallery[2]; // 하나의 결을 만들어 갑니다
      const bentoCards = work.gallery.slice(3); // 점과 점 사이, 다채로운 색들, 서로 다른 리듬들

      return (
        <div className="work-detail work-detail--anseonmin-dots">
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

          {/* Feature: 우리는 모두 각자의 점으로부터 시작합니다 */}
          {featureImage && work.notes[0] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block work-detail__image-block--feature">
                <img src={featureImage.src} alt={featureImage.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                {work.notes[0].title && <h3 className="work-detail__feature-title">{work.notes[0].title}</h3>}
              </div>
            </section>
          )}

          {/* Feature Rows: 보이지 않는 흐름 속에서, 하나의 결을 만들어 갑니다 */}
          {feature1Image && feature2Image && work.notes[1] && work.notes[2] && (
            <section className="work-detail__section work-detail__feature-rows">
              <ul className="work-detail__feature-rows-list">
                <li className="work-detail__feature-row">
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[1].title && <h3 className="work-detail__feature-title">{work.notes[1].title}</h3>}
                    </div>
                  </div>
                  <div className="work-detail__image-block">
                    <img src={feature1Image.src} alt={feature1Image.alt} loading="lazy" />
                  </div>
                </li>
                <li className="work-detail__feature-row work-detail__feature-row--reverse">
                  <div className="work-detail__image-block">
                    <img src={feature2Image.src} alt={feature2Image.alt} loading="lazy" />
                  </div>
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[2].title && <h3 className="work-detail__feature-title">{work.notes[2].title}</h3>}
                    </div>
                  </div>
                </li>
              </ul>
            </section>
          )}

          {/* Feature Bento: 점과 점 사이, 다채로운 색들, 서로 다른 리듬들 */}
          {bentoCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid work-detail__cards-grid--bento">
                {bentoCards.map((card, index) => {
                  const note = work.notes[index + 3];
                  return (
                    <li key={card.src} className={`work-detail__card work-detail__card--bento-${index + 1}`}>
                      <div className="work-detail__card-image">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                      {note && (
                        <div className="work-detail__card-text">
                          {note.title && <h5 className="work-detail__card-title">{note.title}</h5>}
                          {note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>
      );
    }

    // woosumin-sasindo 레이아웃 (우수민 작품 1)
    const useWoosuminSasindoLayout = work.layout === 'woosumin-sasindo' || work.id === 'woosumin-sasindo';
    
    if (useWoosuminSasindoLayout && work.gallery && work.notes && Array.isArray(work.notes)) {
      const leafletImage = work.gallery[0]; // 사신도 역사 리플렛
      const infoImage = work.gallery[1]; // 네 신수 정보
      const posterCards = work.gallery.slice(2, 5); // 백호, 주작, 현무
      const galleryImages = work.gallery.slice(5); // 일러스트 포스터

      return (
        <div className="work-detail work-detail--woosumin-sasindo">
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

          {/* Feature Alternating: 사신도 역사 리플렛 */}
          {leafletImage && work.notes[0] && (
            <section className="work-detail__section work-detail__feature work-detail__feature--alternating">
              <div className="work-detail__image-block">
                <img src={leafletImage.src} alt={leafletImage.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                <div>
                  {work.notes[0].title && <h3 className="work-detail__feature-title">{work.notes[0].title}</h3>}
                  {work.notes[0].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[0].description}</p>}
                </div>
              </div>
            </section>
          )}

          {/* Feature: 네 신수 정보 */}
          {infoImage && work.notes[1] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block work-detail__image-block--feature">
                <img src={infoImage.src} alt={infoImage.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                {work.notes[1].title && <h3 className="work-detail__feature-title">{work.notes[1].title}</h3>}
                {work.notes[1].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[1].description}</p>}
              </div>
            </section>
          )}

          {/* Cards Grid: 백호, 주작, 현무 */}
          {posterCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid">
                {posterCards.map((card, index) => {
                  const note = work.notes[index + 2];
                  return (
                    <li key={card.src} className="work-detail__card">
                      <div className="work-detail__card-image">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                      {note && (
                        <div className="work-detail__card-text">
                          {note.title && <h5 className="work-detail__card-title">{note.title}</h5>}
                          {note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Gallery: 일러스트 포스터 */}
          {galleryImages.length > 0 && (
            <section className="work-detail__section work-detail__gallery-section">
              <div className="work-detail__gallery-header">
                <h3 className="work-detail__gallery-title">일러스트 포스터</h3>
                <p className="work-detail__gallery-description">디자인한 청룡, 백호, 주작, 현무 캐릭터의 특징을 담아 반실사 일러스트 포스터 제작</p>
              </div>
              <div className="work-detail__gallery-masonry">
                <div className="work-detail__gallery-column">
                  <div className="work-detail__gallery-item">
                    <img src={galleryImages[0].src} alt={galleryImages[0].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__gallery-item">
                    <img src={galleryImages[1].src} alt={galleryImages[1].alt} loading="lazy" />
                  </div>
                </div>
                <div className="work-detail__gallery-column">
                  {galleryImages.slice(2, 5).map((item) => (
                    <div key={item.src} className="work-detail__gallery-item">
                      <img src={item.src} alt={item.alt} loading="lazy" />
                    </div>
                  ))}
                </div>
                <div className="work-detail__gallery-column">
                  {galleryImages.slice(5).map((item) => (
                    <div key={item.src} className="work-detail__gallery-item">
                      <img src={item.src} alt={item.alt} loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Text Section: 사신도에 관하여... */}
          {work.footerText && (
            <section className="work-detail__section work-detail__text-section">
              <div className="work-detail__text-section-label">신화 이야기</div>
              <h3 className="work-detail__text-section-title">사신도에 관하여...</h3>
              <p className="work-detail__text-section-content">{work.footerText}</p>
            </section>
          )}
        </div>
      );
    }

    // woosumin-liminal 레이아웃 (우수민 작품 2)
    const useWoosuminLiminalLayout = work.layout === 'woosumin-liminal' || work.id === 'woosumin-liminal';
    
    if (useWoosuminLiminalLayout && work.gallery && work.notes && Array.isArray(work.notes)) {
      const introImage = work.gallery[0]; // 그냥 보는 것만으로
      const startCards = work.gallery.slice(1, 4); // 리미널 가이드 시작, 간편한 티켓 등록, 전시장 맵
      const interactiveCards = work.gallery.slice(4, 7); // AI 채팅, Liminal 생명체, 감정 변화
      const featureCards = work.gallery.slice(7); // 전시 소개, 위그 타임랩스, 작품 정보, 큐레이터 아티클, AR 카메라, 위그 인터뷰, 뉴스 기사

      return (
        <div className="work-detail work-detail--woosumin-liminal">
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

          {/* Feature Alternating: 그냥 보는 것만으로 */}
          {introImage && work.notes[0] && (
            <section className="work-detail__section work-detail__feature work-detail__feature--alternating">
              <div className="work-detail__image-block">
                <img src={introImage.src} alt={introImage.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                <div>
                  {work.notes[0].title && <h3 className="work-detail__feature-title">{work.notes[0].title}</h3>}
                  {work.notes[0].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[0].description}</p>}
                </div>
              </div>
            </section>
          )}

          {/* Pull Quote */}
          {work.notes[1] && (
            <section className="work-detail__section work-detail__pull-quote">
              <div className="work-detail__pull-quote-content">
                <h3 className="work-detail__pull-quote-title">{work.notes[1].title}</h3>
                <p className="work-detail__pull-quote-description">{work.notes[1].description}</p>
              </div>
            </section>
          )}

          {/* Cards Grid: 리미널 가이드 시작, 간편한 티켓 등록, 전시장 맵 */}
          {startCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid">
                {startCards.map((card, index) => {
                  const note = work.notes[index + 2];
                  return (
                    <li key={card.src} className="work-detail__card">
                      <div className="work-detail__card-image">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                      {note && (
                        <div className="work-detail__card-text">
                          {note.title && <h5 className="work-detail__card-title">{note.title}</h5>}
                          {note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Cards Grid: AI 채팅, Liminal 생명체, 감정 변화 */}
          {interactiveCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid work-detail__cards-grid--tech">
                {interactiveCards.map((card, index) => {
                  const note = work.notes[index + 5];
                  return (
                    <li key={card.src} className="work-detail__card work-detail__card--tech">
                      <div className="work-detail__card-text">
                        {note && (
                          <>
                            {note.title && <h5 className="work-detail__card-title">{note.title}</h5>}
                            {note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>}
                          </>
                        )}
                      </div>
                      <div className="work-detail__card-image work-detail__card-image--tech">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Testimonial Wall: 리미널 가이드의 또 다른 기능들 */}
          {featureCards.length > 0 && (
            <section className="work-detail__section work-detail__testimonial-wall">
              <div className="work-detail__testimonial-header">
                <h3 className="work-detail__testimonial-title">리미널 가이드의 또 다른 기능들</h3>
                <p className="work-detail__testimonial-description">전시의 깊이 있는 경험을 위한 다양한 콘텐츠</p>
              </div>
              <ul className="work-detail__testimonial-grid">
                {featureCards.map((card, index) => {
                  const note = work.notes[index + 8];
                  return (
                    <li key={card.src} className="work-detail__testimonial-card">
                      <div className="work-detail__testimonial-author">
                        <div className="work-detail__testimonial-avatar">
                          <img src={card.src} alt={card.alt} loading="lazy" />
                        </div>
                        <div className="work-detail__testimonial-author-info">
                          {note && (
                            <>
                              {note.title && <div className="work-detail__testimonial-author-name">{note.title}</div>}
                              {note.subtitle && <div className="work-detail__testimonial-author-role">{note.subtitle}</div>}
                            </>
                          )}
                        </div>
                      </div>
                      {note && note.description && (
                        <p className="work-detail__testimonial-content">{note.description}</p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>
      );
    }

    // leegabi-overcooked 레이아웃 (이가비 작품 1)
    const useLeegabiOvercookedLayout = work.layout === 'leegabi-overcooked' || work.id === 'leegabi-overcooked';
    
    if (useLeegabiOvercookedLayout && work.gallery && work.notes && Array.isArray(work.notes)) {
      const bentoCards = work.gallery.slice(0, 3); // 양파왕의 고민, 양파왕의 제안, 카페 운영 시작
      const galleryImages = work.gallery.slice(3, 10); // 얼렁뚱땅 카페운영
      const finalImage = work.gallery[10]; // MISSION CLEAR!

      return (
        <div className="work-detail work-detail--leegabi-overcooked">
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

          {/* Feature Bento: 양파왕의 고민, 양파왕의 제안, 카페 운영 시작 */}
          {bentoCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid work-detail__cards-grid--bento">
                {bentoCards.map((card, index) => {
                  const note = work.notes[index];
                  return (
                    <li key={card.src} className={`work-detail__card work-detail__card--bento-${index + 1}`}>
                      <div className="work-detail__card-image">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                      {note && (
                        <div className="work-detail__card-text">
                          {note.title && <h5 className="work-detail__card-title">{note.title}</h5>}
                          {note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Gallery: 얼렁뚱땅 카페운영 */}
          {galleryImages.length > 0 && (
            <section className="work-detail__section work-detail__gallery-section">
              <div className="work-detail__gallery-header">
                <h3 className="work-detail__gallery-title">얼렁뚱땅 카페운영</h3>
                <p className="work-detail__gallery-description">순조롭지만 않은 카페운영. 협동력을 발휘해 하나씩 음식을 만들어나간다.</p>
              </div>
              <div className="work-detail__gallery-masonry">
                <div className="work-detail__gallery-column">
                  <div className="work-detail__gallery-item">
                    <img src={galleryImages[0].src} alt={galleryImages[0].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__gallery-item">
                    <img src={galleryImages[1].src} alt={galleryImages[1].alt} loading="lazy" />
                  </div>
                </div>
                <div className="work-detail__gallery-column">
                  {galleryImages.slice(2, 5).map((item) => (
                    <div key={item.src} className="work-detail__gallery-item">
                      <img src={item.src} alt={item.alt} loading="lazy" />
                    </div>
                  ))}
                </div>
                <div className="work-detail__gallery-column">
                  {galleryImages.slice(5).map((item) => (
                    <div key={item.src} className="work-detail__gallery-item">
                      <img src={item.src} alt={item.alt} loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Feature: MISSION CLEAR! */}
          {finalImage && work.footerText && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block work-detail__image-block--feature">
                <img src={finalImage.src} alt={finalImage.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                <h3 className="work-detail__feature-title">MISSION CLEAR!</h3>
                <p style={{ whiteSpace: 'pre-wrap' }}>{work.footerText}</p>
              </div>
            </section>
          )}
        </div>
      );
    }

    // leegabi-abyss-racing 레이아웃 (이가비 작품 2)
    const useLeegabiAbyssRacingLayout = work.layout === 'leegabi-abyss-racing' || work.id === 'leegabi-abyss-racing';
    
    if (useLeegabiAbyssRacingLayout && work.gallery && work.notes && Array.isArray(work.notes)) {
      const introImage = work.gallery[0]; // Abyss Racing: 세이렌의 보물
      const templeImage = work.gallery[1]; // 수중신전으로
      const journeyImage = work.gallery[2]; // 잃어버린 레전드 컵을 찾기 위한 여정
      const treasureImage = work.gallery[3]; // 세이렌의 보물
      const actionCards = work.gallery.slice(4, 7); // 레전드 컵을 되찾다, 세이렌의 분노, 물폭탄 발동
      const bentoCards = work.gallery.slice(7); // 분노의 시작, 세이렌의 등장, 마지막 질주

      return (
        <div className="work-detail work-detail--leegabi-abyss-racing">
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

          {/* Feature: Abyss Racing: 세이렌의 보물 */}
          {introImage && work.notes[0] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block work-detail__image-block--feature">
                <img src={introImage.src} alt={introImage.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                {work.notes[0].title && <h3 className="work-detail__feature-title">{work.notes[0].title}</h3>}
                {work.notes[0].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[0].description}</p>}
              </div>
            </section>
          )}

          {/* Feature: 수중신전으로 */}
          {templeImage && work.notes[1] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block work-detail__image-block--feature">
                <img src={templeImage.src} alt={templeImage.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                {work.notes[1].title && <h3 className="work-detail__feature-title">{work.notes[1].title}</h3>}
                {work.notes[1].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[1].description}</p>}
              </div>
            </section>
          )}

          {/* Feature Rows: 잃어버린 레전드 컵을 찾기 위한 여정, 세이렌의 보물 */}
          {journeyImage && treasureImage && work.notes[2] && work.notes[3] && (
            <section className="work-detail__section work-detail__feature-rows">
              <ul className="work-detail__feature-rows-list">
                <li className="work-detail__feature-row">
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[2].title && <h3 className="work-detail__feature-title">{work.notes[2].title}</h3>}
                      {work.notes[2].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[2].description}</p>}
                    </div>
                  </div>
                  <div className="work-detail__image-block">
                    <img src={journeyImage.src} alt={journeyImage.alt} loading="lazy" />
                  </div>
                </li>
                <li className="work-detail__feature-row work-detail__feature-row--reverse">
                  <div className="work-detail__image-block">
                    <img src={treasureImage.src} alt={treasureImage.alt} loading="lazy" />
                  </div>
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[3].title && <h3 className="work-detail__feature-title">{work.notes[3].title}</h3>}
                      {work.notes[3].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[3].description}</p>}
                    </div>
                  </div>
                </li>
              </ul>
            </section>
          )}

          {/* Cards Grid: 레전드 컵을 되찾다, 세이렌의 분노, 물폭탄 발동 */}
          {actionCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid">
                {actionCards.map((card, index) => {
                  const note = work.notes[index + 4];
                  return (
                    <li key={card.src} className="work-detail__card">
                      <div className="work-detail__card-image">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                      {note && (
                        <div className="work-detail__card-text">
                          {note.title && <h5 className="work-detail__card-title">{note.title}</h5>}
                          {note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Feature Bento: 분노의 시작, 세이렌의 등장, 마지막 질주 */}
          {bentoCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid work-detail__cards-grid--bento">
                {bentoCards.map((card, index) => {
                  const note = work.notes[index + 7];
                  return (
                    <li key={card.src} className={`work-detail__card work-detail__card--bento-${index + 1}`}>
                      <div className="work-detail__card-image">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                      {note && (
                        <div className="work-detail__card-text">
                          {note.title && <h5 className="work-detail__card-title">{note.title}</h5>}
                          {note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>
      );
    }

    // leedayoung-ready-to-merry 레이아웃 (이다영 작품 1)
    const useLeedayoungReadyToMerryLayout = work.layout === 'leedayoung-ready-to-merry' || work.id === 'leedayoung-ready-to-merry';
    
    if (useLeedayoungReadyToMerryLayout && work.gallery && work.notes && Array.isArray(work.notes)) {
      const introImage = work.gallery[0]; // Ready to Merry
      const featureImage = work.gallery[1]; // Are you ready to Merry?
      const textBlocks = work.notes.slice(2, 5); // 재해석한 곡들의 분위기를 담은 굿즈, 다양한 형태의 포스터, 앨범 3D 패키징 영상
      const featureRows1 = [work.gallery[2], work.gallery[3]]; // Postcard, Lyrics Paper
      const featureRows2 = [work.gallery[4], work.gallery[5]]; // Sticker Pack, Acrylic Keyring
      const posterCards = work.gallery.slice(6, 9); // 전단지형 포스터, 캘린더형 포스터, 앨범 사양 포스터
      const detailCards = work.gallery.slice(9); // 앨범 굿즈 형태를 직관적으로, 곡의 분위기를 직접 느낄 수 있도록, 앨범의 콘셉트를 보다 명확하게

      return (
        <div className="work-detail work-detail--leedayoung-ready-to-merry">
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

          {/* Text Intro: COUNTDOWN TO WISHFUL CHRISTMAS */}
          {work.notes[0] && (
            <section className="work-detail__section work-detail__text-intro">
              <div className="work-detail__text-intro-label">Christmas Carol Archiving Album</div>
              <h3 className="work-detail__text-intro-title">{work.notes[0].title}</h3>
              <p className="work-detail__text-intro-description" style={{ whiteSpace: 'pre-wrap' }}>{work.notes[0].description}</p>
            </section>
          )}

          {/* Feature: Are you ready to Merry? */}
          {featureImage && work.notes[1] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block work-detail__image-block--feature">
                <img src={featureImage.src} alt={featureImage.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                {work.notes[1].title && <h3 className="work-detail__feature-title">{work.notes[1].title}</h3>}
                {work.notes[1].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[1].description}</p>}
              </div>
            </section>
          )}

          {/* Text Blocks: 재해석한 곡들의 분위기를 담은 굿즈, 다양한 형태의 포스터, 앨범 3D 패키징 영상 */}
          {textBlocks.length > 0 && (
            <section className="work-detail__section work-detail__text-blocks">
              <ul className="work-detail__text-blocks-list">
                {textBlocks.map((note, index) => (
                  <li key={index} className="work-detail__text-block">
                    <h5 className="work-detail__text-block-title">{note.title}</h5>
                    <p className="work-detail__text-block-content" style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Feature Rows: Postcard, Lyrics Paper */}
          {featureRows1.length > 0 && (
            <section className="work-detail__section work-detail__feature-rows">
              <ul className="work-detail__feature-rows-list">
                <li className="work-detail__feature-row">
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[5] && work.notes[5].title && <h3 className="work-detail__feature-title">{work.notes[5].title}</h3>}
                      {work.notes[5] && work.notes[5].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[5].description}</p>}
                    </div>
                  </div>
                  <div className="work-detail__image-block">
                    <img src={featureRows1[0].src} alt={featureRows1[0].alt} loading="lazy" />
                  </div>
                </li>
                <li className="work-detail__feature-row work-detail__feature-row--reverse">
                  <div className="work-detail__image-block">
                    <img src={featureRows1[1].src} alt={featureRows1[1].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[6] && work.notes[6].title && <h3 className="work-detail__feature-title">{work.notes[6].title}</h3>}
                      {work.notes[6] && work.notes[6].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[6].description}</p>}
                    </div>
                  </div>
                </li>
              </ul>
            </section>
          )}

          {/* Feature Rows: Sticker Pack, Acrylic Keyring */}
          {featureRows2.length > 0 && (
            <section className="work-detail__section work-detail__feature-rows">
              <ul className="work-detail__feature-rows-list">
                <li className="work-detail__feature-row">
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[7] && work.notes[7].title && <h3 className="work-detail__feature-title">{work.notes[7].title}</h3>}
                      {work.notes[7] && work.notes[7].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[7].description}</p>}
                    </div>
                  </div>
                  <div className="work-detail__image-block">
                    <img src={featureRows2[0].src} alt={featureRows2[0].alt} loading="lazy" />
                  </div>
                </li>
                <li className="work-detail__feature-row work-detail__feature-row--reverse">
                  <div className="work-detail__image-block">
                    <img src={featureRows2[1].src} alt={featureRows2[1].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[8] && work.notes[8].title && <h3 className="work-detail__feature-title">{work.notes[8].title}</h3>}
                      {work.notes[8] && work.notes[8].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[8].description}</p>}
                    </div>
                  </div>
                </li>
              </ul>
            </section>
          )}

          {/* Cards Grid: 전단지형 포스터, 캘린더형 포스터, 앨범 사양 포스터 */}
          {posterCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid">
                {posterCards.map((card, index) => {
                  const note = work.notes[index + 9];
                  return (
                    <li key={card.src} className="work-detail__card">
                      <div className="work-detail__card-image">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                      {note && (
                        <div className="work-detail__card-text">
                          {note.title && <h5 className="work-detail__card-title">{note.title}</h5>}
                          {note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Detail Grid: 앨범 굿즈 형태를 직관적으로, 곡의 분위기를 직접 느낄 수 있도록, 앨범의 콘셉트를 보다 명확하게 */}
          {detailCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__detail-grid">
                <li className="work-detail__detail-column">
                  <div className="work-detail__detail-card work-detail__detail-card--center">
                    <div className="work-detail__detail-card-text">
                      {work.notes[12] && work.notes[12].title && <h4>{work.notes[12].title}</h4>}
                      {work.notes[12] && work.notes[12].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[12].description}</p>}
                    </div>
                    <div className="work-detail__detail-card-image">
                      <img src={detailCards[0].src} alt={detailCards[0].alt} loading="lazy" />
                    </div>
                  </div>
                  <div className="work-detail__detail-card">
                    <div className="work-detail__detail-card-text">
                      {work.notes[13] && work.notes[13].title && <h4>{work.notes[13].title}</h4>}
                      {work.notes[13] && work.notes[13].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[13].description}</p>}
                    </div>
                    <div className="work-detail__detail-card-image">
                      <img src={detailCards[1].src} alt={detailCards[1].alt} loading="lazy" />
                    </div>
                  </div>
                </li>
                <li className="work-detail__detail-column">
                  <div className="work-detail__detail-card work-detail__detail-card--large">
                    <div className="work-detail__detail-card-text">
                      {work.notes[14] && work.notes[14].title && <h4>{work.notes[14].title}</h4>}
                      {work.notes[14] && work.notes[14].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[14].description}</p>}
                    </div>
                    <div className="work-detail__detail-card-image">
                      <img src={detailCards[2].src} alt={detailCards[2].alt} loading="lazy" />
                    </div>
                  </div>
                </li>
              </ul>
            </section>
          )}
        </div>
      );
    }

    // leedayoung-plotting-room 레이아웃 (이다영 작품 2)
    const useLeedayoungPlottingRoomLayout = work.layout === 'leedayoung-plotting-room' || work.id === 'leedayoung-plotting-room';
    
    if (useLeedayoungPlottingRoomLayout && work.gallery && work.notes && Array.isArray(work.notes)) {
      const sceneCards = work.gallery.slice(0, 3); // SCENE #01, #02, #03
      const featureRows1 = [work.gallery[3], work.gallery[4]]; // 작가들의 글이 스토리보드 속으로, 스토리보드 속 인물들이 살아움직이는
      const featureRows2 = [work.gallery[5], work.gallery[6]]; // 다양한 분야와, 다양한 장르의 이야기로
      const finalFeature = work.gallery[7]; // 작가들의 소통과 창작의 순간들이 모여

      return (
        <div className="work-detail work-detail--leedayoung-plotting-room">
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

          {/* Text Intro: PLOTTING ROOM */}
          {work.notes[0] && (
            <section className="work-detail__section work-detail__text-intro">
              <div className="work-detail__text-intro-label">Title Sequence</div>
              <h3 className="work-detail__text-intro-title">{work.notes[0].title}</h3>
              <p className="work-detail__text-intro-description" style={{ whiteSpace: 'pre-wrap' }}>{work.notes[0].description}</p>
            </section>
          )}

          {/* Cards Grid: SCENE #01, #02, #03 */}
          {sceneCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid">
                {sceneCards.map((card, index) => {
                  const note = work.notes[index + 1];
                  return (
                    <li key={card.src} className="work-detail__card">
                      <div className="work-detail__card-image">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                      {note && (
                        <div className="work-detail__card-text">
                          {note.title && <h5 className="work-detail__card-title">{note.title}</h5>}
                          {note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Feature Rows: 작가들의 글이 스토리보드 속으로, 스토리보드 속 인물들이 살아움직이는 */}
          {featureRows1.length > 0 && (
            <section className="work-detail__section work-detail__feature-rows">
              <ul className="work-detail__feature-rows-list">
                <li className="work-detail__feature-row">
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[4] && work.notes[4].title && <h3 className="work-detail__feature-title">{work.notes[4].title}</h3>}
                      {work.notes[4] && work.notes[4].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[4].description}</p>}
                    </div>
                  </div>
                  <div className="work-detail__image-block">
                    <img src={featureRows1[0].src} alt={featureRows1[0].alt} loading="lazy" />
                  </div>
                </li>
                <li className="work-detail__feature-row work-detail__feature-row--reverse">
                  <div className="work-detail__image-block">
                    <img src={featureRows1[1].src} alt={featureRows1[1].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[5] && work.notes[5].title && <h3 className="work-detail__feature-title">{work.notes[5].title}</h3>}
                      {work.notes[5] && work.notes[5].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[5].description}</p>}
                    </div>
                  </div>
                </li>
              </ul>
            </section>
          )}

          {/* Feature Rows: 다양한 분야와, 다양한 장르의 이야기로 */}
          {featureRows2.length > 0 && (
            <section className="work-detail__section work-detail__feature-rows">
              <ul className="work-detail__feature-rows-list">
                <li className="work-detail__feature-row">
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[6] && work.notes[6].title && <h3 className="work-detail__feature-title">{work.notes[6].title}</h3>}
                      {work.notes[6] && work.notes[6].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[6].description}</p>}
                    </div>
                  </div>
                  <div className="work-detail__image-block">
                    <img src={featureRows2[0].src} alt={featureRows2[0].alt} loading="lazy" />
                  </div>
                </li>
                <li className="work-detail__feature-row work-detail__feature-row--reverse">
                  <div className="work-detail__image-block">
                    <img src={featureRows2[1].src} alt={featureRows2[1].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[7] && work.notes[7].title && <h3 className="work-detail__feature-title">{work.notes[7].title}</h3>}
                      {work.notes[7] && work.notes[7].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[7].description}</p>}
                    </div>
                  </div>
                </li>
              </ul>
            </section>
          )}

          {/* Feature: 작가들의 소통과 창작의 순간들이 모여 */}
          {finalFeature && work.notes[8] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block work-detail__image-block--feature">
                <img src={finalFeature.src} alt={finalFeature.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                {work.notes[8].title && <h3 className="work-detail__feature-title">{work.notes[8].title}</h3>}
                {work.notes[8].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[8].description}</p>}
              </div>
            </section>
          )}
        </div>
      );
    }

    // leeun-9e9e9e 레이아웃 (이운 작품 1)
    const useLeeun9e9e9eLayout = work.layout === 'leeun-9e9e9e' || work.id === 'leeun-9e9e9e';
    
    if (useLeeun9e9e9eLayout && work.gallery && work.notes && Array.isArray(work.notes)) {
      const featureImage = work.gallery[0]; // 9e9e9e
      const coreValueCards = work.gallery.slice(1); // Cute, Unconstrained, Joyful, Positive

      return (
        <div className="work-detail work-detail--leeun-9e9e9e">
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

          {/* Feature: 9e9e9e */}
          {featureImage && work.notes[0] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block work-detail__image-block--feature">
                <img src={featureImage.src} alt={featureImage.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                {work.notes[0].title && <h3 className="work-detail__feature-title">{work.notes[0].title}</h3>}
                {work.notes[0].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[0].description}</p>}
              </div>
            </section>
          )}

          {/* Core Value: Testimonial Cards */}
          {coreValueCards.length > 0 && (
            <section className="work-detail__section work-detail__testimonial-wall">
              <div className="work-detail__testimonial-header">
                <h3 className="work-detail__testimonial-title">Core Value</h3>
              </div>
              <ul className="work-detail__testimonial-grid">
                {coreValueCards.map((card, index) => {
                  const note = work.notes[index + 1];
                  return (
                    <li key={card.src} className="work-detail__testimonial-card">
                      <div className="work-detail__testimonial-author">
                        <div className="work-detail__testimonial-avatar">
                          <img src={card.src} alt={card.alt} loading="lazy" />
                        </div>
                        <div className="work-detail__testimonial-author-info">
                          {note && note.title && <div className="work-detail__testimonial-author-name">{note.title}</div>}
                          {note && note.subtitle && <div className="work-detail__testimonial-author-role">{note.subtitle}</div>}
                        </div>
                      </div>
                      {note && note.description && (
                        <div className="work-detail__testimonial-content" style={{ whiteSpace: 'pre-wrap' }}>{note.description}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>
      );
    }

    // leeun-layered 레이아웃 (이운 작품 2)
    const useLeeunLayeredLayout = work.layout === 'leeun-layered' || work.id === 'leeun-layered';
    
    if (useLeeunLayeredLayout && work.gallery && work.notes && Array.isArray(work.notes)) {
      const lookGallery = work.gallery.slice(0, 6); // LOOK gallery
      const featureRows1 = [work.gallery[6], work.gallery[7]]; // Self-Expression, Rich
      const featureRows2 = [work.gallery[8], work.gallery[9]]; // Flexibility, Sustainability
      const brandingCards = work.gallery.slice(10, 13); // package, brand book, gift box
      const bentoCards = work.gallery.slice(13); // brand tag, Web

      return (
        <div className="work-detail work-detail--leeun-layered">
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

          {/* Text Intro: Layered */}
          {work.notes[0] && (
            <section className="work-detail__section work-detail__text-intro">
              <div className="work-detail__text-intro-label">컨셔스 패션 브랜드</div>
              <h3 className="work-detail__text-intro-title">{work.notes[0].title}</h3>
              <p className="work-detail__text-intro-description" style={{ whiteSpace: 'pre-wrap' }}>{work.notes[0].description}</p>
            </section>
          )}

          {/* Gallery: LOOK */}
          {lookGallery.length > 0 && (
            <section className="work-detail__section work-detail__gallery-section">
              <div className="work-detail__gallery-header">
                <h3 className="work-detail__gallery-title">LOOK</h3>
              </div>
              <div className="work-detail__gallery-masonry">
                <div className="work-detail__gallery-column">
                  <div className="work-detail__gallery-item">
                    <img src={lookGallery[0].src} alt={lookGallery[0].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__gallery-item">
                    <img src={lookGallery[1].src} alt={lookGallery[1].alt} loading="lazy" />
                  </div>
                </div>
                <div className="work-detail__gallery-column">
                  <div className="work-detail__gallery-item">
                    <img src={lookGallery[2].src} alt={lookGallery[2].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__gallery-item">
                    <img src={lookGallery[3].src} alt={lookGallery[3].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__gallery-item">
                    <img src={lookGallery[4].src} alt={lookGallery[4].alt} loading="lazy" />
                  </div>
                </div>
                <div className="work-detail__gallery-column">
                  <div className="work-detail__gallery-item">
                    <img src={lookGallery[5].src} alt={lookGallery[5].alt} loading="lazy" />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Feature Rows: Self-Expression, Rich */}
          {featureRows1.length > 0 && (
            <section className="work-detail__section work-detail__feature-rows">
              <ul className="work-detail__feature-rows-list">
                <li className="work-detail__feature-row">
                  <div className="work-detail__image-block">
                    <img src={featureRows1[0].src} alt={featureRows1[0].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[1] && work.notes[1].title && <h3 className="work-detail__feature-title">{work.notes[1].title}</h3>}
                      {work.notes[1] && work.notes[1].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[1].description}</p>}
                    </div>
                  </div>
                </li>
                <li className="work-detail__feature-row work-detail__feature-row--reverse">
                  <div className="work-detail__image-block">
                    <img src={featureRows1[1].src} alt={featureRows1[1].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[2] && work.notes[2].title && <h3 className="work-detail__feature-title">{work.notes[2].title}</h3>}
                      {work.notes[2] && work.notes[2].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[2].description}</p>}
                    </div>
                  </div>
                </li>
              </ul>
            </section>
          )}

          {/* Feature Rows: Flexibility, Sustainability */}
          {featureRows2.length > 0 && (
            <section className="work-detail__section work-detail__feature-rows">
              <ul className="work-detail__feature-rows-list">
                <li className="work-detail__feature-row">
                  <div className="work-detail__image-block">
                    <img src={featureRows2[0].src} alt={featureRows2[0].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[3] && work.notes[3].title && <h3 className="work-detail__feature-title">{work.notes[3].title}</h3>}
                      {work.notes[3] && work.notes[3].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[3].description}</p>}
                    </div>
                  </div>
                </li>
                <li className="work-detail__feature-row work-detail__feature-row--reverse">
                  <div className="work-detail__image-block">
                    <img src={featureRows2[1].src} alt={featureRows2[1].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[4] && work.notes[4].title && <h3 className="work-detail__feature-title">{work.notes[4].title}</h3>}
                      {work.notes[4] && work.notes[4].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[4].description}</p>}
                    </div>
                  </div>
                </li>
              </ul>
            </section>
          )}

          {/* Cards Grid: package, brand book, gift box */}
          {brandingCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid">
                {brandingCards.map((card, index) => {
                  const note = work.notes[index + 5];
                  return (
                    <li key={card.src} className="work-detail__card">
                      <div className="work-detail__card-image">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                      {note && note.title && (
                        <div className="work-detail__card-text">
                          <h5 className="work-detail__card-title">{note.title}</h5>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Bento Grid: brand tag, Web */}
          {bentoCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid work-detail__cards-grid--bento">
                {bentoCards.map((card, index) => {
                  const note = work.notes[index + 8];
                  return (
                    <li key={card.src} className={`work-detail__card work-detail__card--bento-${index + 1}`}>
                      <div className="work-detail__card-image">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                      {note && note.title && (
                        <div className="work-detail__card-text">
                          <h5 className="work-detail__card-title">{note.title}</h5>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>
      );
    }

    // leejimin-veneti 레이아웃 (이지민 작품 1)
    const useLeejiminVenetiLayout = work.layout === 'leejimin-veneti' || work.id === 'leejimin-veneti-character';
    
    if (useLeejiminVenetiLayout && work.gallery && work.notes && Array.isArray(work.notes)) {
      const bookCoverImage = work.gallery[0]; // Book cover
      const cards = work.gallery.slice(1, 4); // Poster, Postcard, Illustration
      const bentoImages = work.gallery.slice(4, 7); // This outstanding object, Skate Board, Character
      const artbookGallery = work.gallery.slice(7, 15); // Artbook (8 images)
      const profileImage = work.gallery[15]; // 프로필 이미지

      return (
        <div className="work-detail work-detail--leejimin-veneti">
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

          {/* Text Intro: Dream of freedom */}
          {work.notes[0] && (
            <section className="work-detail__section work-detail__text-intro">
              <div className="work-detail__text-intro-label">The story of an octopus witch</div>
              <h3 className="work-detail__text-intro-title">{work.notes[0].title}</h3>
              <p className="work-detail__text-intro-description" style={{ whiteSpace: 'pre-wrap' }}>{work.notes[0].description}</p>
            </section>
          )}

          {/* Feature: Book cover */}
          {bookCoverImage && work.notes[1] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block work-detail__image-block--feature">
                <img src={bookCoverImage.src} alt={bookCoverImage.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                {work.notes[1].title && <h3 className="work-detail__feature-title">{work.notes[1].title}</h3>}
                {work.notes[1].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[1].description}</p>}
              </div>
            </section>
          )}

          {/* Cards Grid: Poster, Postcard, Illustration */}
          {cards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid">
                {cards.map((card, index) => {
                  const note = work.notes[index + 2];
                  return (
                    <li key={card.src} className="work-detail__card">
                      <div className="work-detail__card-image">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                      {note && (
                        <div className="work-detail__card-text">
                          {note.title && <h5 className="work-detail__card-title">{note.title}</h5>}
                          {note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Bento Grid: This outstanding object, Skate Board, Character */}
          {bentoImages.length > 0 && (
            <section className="work-detail__section work-detail__bento">
              <ul className="work-detail__bento-grid">
                <li className="work-detail__bento-column">
                  <div className="work-detail__bento-card work-detail__bento-card--center">
                    <div className="work-detail__bento-card-image">
                      <img src={bentoImages[0].src} alt={bentoImages[0].alt} loading="lazy" />
                    </div>
                    <div className="work-detail__bento-card-text">
                      {work.notes[5] && work.notes[5].title && <h5>{work.notes[5].title}</h5>}
                      {work.notes[5] && work.notes[5].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[5].description}</p>}
                    </div>
                  </div>
                  <div className="work-detail__bento-card">
                    <div className="work-detail__bento-card-text">
                      {work.notes[6] && work.notes[6].title && <h5>{work.notes[6].title}</h5>}
                      {work.notes[6] && work.notes[6].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[6].description}</p>}
                    </div>
                    <div className="work-detail__bento-card-image">
                      <img src={bentoImages[1].src} alt={bentoImages[1].alt} loading="lazy" />
                    </div>
                  </div>
                </li>
                <li className="work-detail__bento-column">
                  <div className="work-detail__bento-card work-detail__bento-card--large">
                    <div className="work-detail__bento-card-image">
                      <img src={bentoImages[2].src} alt={bentoImages[2].alt} loading="lazy" />
                    </div>
                    <div className="work-detail__bento-card-text">
                      {work.notes[7] && work.notes[7].title && <h5>{work.notes[7].title}</h5>}
                      {work.notes[7] && work.notes[7].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[7].description}</p>}
                    </div>
                  </div>
                </li>
              </ul>
            </section>
          )}

          {/* Gallery: Artbook */}
          {artbookGallery.length > 0 && (
            <section className="work-detail__section work-detail__gallery">
              <div className="work-detail__gallery-header">
                <h3 className="work-detail__gallery-title">{work.notes[8] && work.notes[8].title}</h3>
                {work.notes[8] && work.notes[8].description && (
                  <p className="work-detail__gallery-description">{work.notes[8].description}</p>
                )}
              </div>
              <div className="work-detail__gallery-grid">
                <div className="work-detail__gallery-column">
                  <div className="work-detail__gallery-item">
                    <img src={artbookGallery[0].src} alt={artbookGallery[0].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__gallery-item">
                    <img src={artbookGallery[1].src} alt={artbookGallery[1].alt} loading="lazy" />
                  </div>
                </div>
                <div className="work-detail__gallery-column">
                  <div className="work-detail__gallery-item">
                    <img src={artbookGallery[2].src} alt={artbookGallery[2].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__gallery-item">
                    <img src={artbookGallery[3].src} alt={artbookGallery[3].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__gallery-item">
                    <img src={artbookGallery[4].src} alt={artbookGallery[4].alt} loading="lazy" />
                  </div>
                </div>
                <div className="work-detail__gallery-column">
                  <div className="work-detail__gallery-item">
                    <img src={artbookGallery[5].src} alt={artbookGallery[5].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__gallery-item">
                    <img src={artbookGallery[6].src} alt={artbookGallery[6].alt} loading="lazy" />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Quote */}
          {profileImage && (
            <section className="work-detail__section work-detail__quote">
              <blockquote className="work-detail__quote-text">
                "이 캐릭터가 단순한 조형물이 아닌, 살아 숨 쉬는 존재로 확장되는 그날을 꿈꾸며 이 여정을 이어갈 것입니다."
              </blockquote>
              <div className="work-detail__quote-author">
                <div className="work-detail__quote-avatar">
                  <img src={profileImage.src} alt={profileImage.alt} loading="lazy" />
                </div>
                <div className="work-detail__quote-author-info">
                  <div className="work-detail__quote-author-name">이지민</div>
                  <div className="work-detail__quote-author-role">제 24회 영상애니메이션디자인전공 졸업생</div>
                </div>
              </div>
            </section>
          )}
        </div>
      );
    }

    // leejimin-lelabo 레이아웃 (이지민 작품 2)
    const useLeejiminLelaboLayout = work.layout === 'leejimin-lelabo' || work.id === 'leejimin-veneti-perfume';
    
    if (useLeejiminLelaboLayout && work.gallery && work.notes && Array.isArray(work.notes)) {
      const featureRows = [
        { image: work.gallery[0], note: work.notes[1] }, // Fresh
        { image: work.gallery[1], note: work.notes[2] }, // Woody
        { image: work.gallery[2], note: work.notes[3] }, // Sunset
      ];
      const cityExclusivesImage = work.gallery[3]; // City Exclusives
      const perfumeCards = work.gallery.slice(4, 7); // CITRON 28, GAIAC 10, MUSC 25
      const photoGallery = work.gallery.slice(7, 14); // Photo shoot (7 images)

      return (
        <div className="work-detail work-detail--leejimin-lelabo">
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

          {/* Text Intro: Imagine a city */}
          {work.notes[0] && (
            <section className="work-detail__section work-detail__text-intro">
              <div className="work-detail__text-intro-label">Promotional videos</div>
              <h3 className="work-detail__text-intro-title">{work.notes[0].title}</h3>
              <p className="work-detail__text-intro-description" style={{ whiteSpace: 'pre-wrap' }}>{work.notes[0].description}</p>
            </section>
          )}

          {/* Feature Rows: Fresh, Woody, Sunset */}
          {featureRows.length > 0 && (
            <section className="work-detail__section work-detail__feature-rows">
              <ul className="work-detail__feature-rows-list">
                {featureRows.map((row, index) => (
                  <li key={row.image.src} className={`work-detail__feature-row ${index === 1 ? 'work-detail__feature-row--reverse' : ''}`}>
                    {index === 1 ? (
                      <>
                        <div className="work-detail__feature-text">
                          <div>
                            {row.note && row.note.title && <h3 className="work-detail__feature-title">{row.note.title}</h3>}
                            {row.note && row.note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{row.note.description}</p>}
                          </div>
                        </div>
                        <div className="work-detail__image-block">
                          <img src={row.image.src} alt={row.image.alt} loading="lazy" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="work-detail__image-block">
                          <img src={row.image.src} alt={row.image.alt} loading="lazy" />
                        </div>
                        <div className="work-detail__feature-text">
                          <div>
                            {row.note && row.note.title && <h3 className="work-detail__feature-title">{row.note.title}</h3>}
                            {row.note && row.note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{row.note.description}</p>}
                          </div>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Feature: City Exclusives */}
          {cityExclusivesImage && work.notes[4] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block work-detail__image-block--feature">
                <img src={cityExclusivesImage.src} alt={cityExclusivesImage.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                {work.notes[4].title && <h3 className="work-detail__feature-title">{work.notes[4].title}</h3>}
                {work.notes[4].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[4].description}</p>}
              </div>
            </section>
          )}

          {/* Cards Grid: CITRON 28, GAIAC 10, MUSC 25 */}
          {perfumeCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid">
                {perfumeCards.map((card, index) => {
                  const note = work.notes[index + 5];
                  return (
                    <li key={card.src} className="work-detail__card">
                      <div className="work-detail__card-image">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                      {note && (
                        <div className="work-detail__card-text">
                          {note.title && <h5 className="work-detail__card-title">{note.title}</h5>}
                          {note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Gallery: Photo shoot */}
          {photoGallery.length > 0 && (
            <section className="work-detail__section work-detail__gallery">
              <div className="work-detail__gallery-header">
                <h3 className="work-detail__gallery-title">{work.notes[8] && work.notes[8].title}</h3>
                {work.notes[8] && work.notes[8].description && (
                  <p className="work-detail__gallery-description">{work.notes[8].description}</p>
                )}
              </div>
              <div className="work-detail__gallery-grid">
                <div className="work-detail__gallery-column">
                  <div className="work-detail__gallery-item">
                    <img src={photoGallery[0].src} alt={photoGallery[0].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__gallery-item">
                    <img src={photoGallery[1].src} alt={photoGallery[1].alt} loading="lazy" />
                  </div>
                </div>
                <div className="work-detail__gallery-column">
                  <div className="work-detail__gallery-item">
                    <img src={photoGallery[2].src} alt={photoGallery[2].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__gallery-item">
                    <img src={photoGallery[3].src} alt={photoGallery[3].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__gallery-item">
                    <img src={photoGallery[4].src} alt={photoGallery[4].alt} loading="lazy" />
                  </div>
                </div>
                <div className="work-detail__gallery-column">
                  <div className="work-detail__gallery-item">
                    <img src={photoGallery[5].src} alt={photoGallery[5].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__gallery-item">
                    <img src={photoGallery[6].src} alt={photoGallery[6].alt} loading="lazy" />
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      );
    }

    // jeongitae-dolor-saga 레이아웃 (전기태 작품 1)
    const useJeongitaeDolorSagaLayout = work.layout === 'jeongitae-dolor-saga' || work.id === 'jeongitae-dolor-saga';
    
    if (useJeongitaeDolorSagaLayout && work.gallery && work.notes && Array.isArray(work.notes)) {
      const featureImage = work.gallery[0]; // 용은 그 존재 자체로 영엄하고도 파괴적이다
      const bentoCards = work.gallery.slice(1, 4); // 인류 대항군 종족 제 3종족, 전투, 압도적인 절망
      const featureRowImage = work.gallery[4]; // 약자의 발버둥

      return (
        <div className="work-detail work-detail--jeongitae-dolor-saga">
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

          {/* Feature: 용은 그 존재 자체로 영엄하고도 파괴적이다 */}
          {featureImage && work.notes[0] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block work-detail__image-block--feature">
                <img src={featureImage.src} alt={featureImage.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                {work.notes[0].title && <h3 className="work-detail__feature-title">{work.notes[0].title}</h3>}
                {work.notes[0].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[0].description}</p>}
              </div>
            </section>
          )}

          {/* Bento Grid: 인류 대항군 종족 제 3종족, 전투, 압도적인 절망 */}
          {bentoCards.length > 0 && (
            <section className="work-detail__section work-detail__bento">
              <ul className="work-detail__bento-grid work-detail__bento-grid--jeongitae">
                {bentoCards.map((card, index) => {
                  const note = work.notes[index + 1];
                  return (
                    <li key={card.src} className={`work-detail__bento-card work-detail__bento-card--jeongitae-${index + 1}`}>
                      <div className="work-detail__bento-card-image">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                      {note && (
                        <div className="work-detail__bento-card-text">
                          {note.title && <h5>{note.title}</h5>}
                          {note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Feature Row: 약자의 발버둥 */}
          {featureRowImage && work.notes[4] && (
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
                    <img src={featureRowImage.src} alt={featureRowImage.alt} loading="lazy" />
                  </div>
                </li>
              </ul>
            </section>
          )}
        </div>
      );
    }

    // jeongitae-war-orb 레이아웃 (전기태 작품 2)
    const useJeongitaeWarOrbLayout = work.layout === 'jeongitae-war-orb' || work.id === 'jeongitae-war-orb';
    
    if (useJeongitaeWarOrbLayout && work.gallery && work.notes && Array.isArray(work.notes)) {
      const featureImage = work.gallery[0]; // 모두의 염원이자 신비의 존재, 오브
      const bentoCards = work.gallery.slice(1); // 제 4클래스, 영광이 있으리, 라이브 2D 애니메이션

      return (
        <div className="work-detail work-detail--jeongitae-war-orb">
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

          {/* Feature: 모두의 염원이자 신비의 존재, 오브 */}
          {featureImage && work.notes[0] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block work-detail__image-block--feature">
                <img src={featureImage.src} alt={featureImage.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                {work.notes[0].title && <h3 className="work-detail__feature-title">{work.notes[0].title}</h3>}
                {work.notes[0].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[0].description}</p>}
              </div>
            </section>
          )}

          {/* Bento Grid: 제 4클래스, 영광이 있으리, 라이브 2D 애니메이션 */}
          {bentoCards.length > 0 && (
            <section className="work-detail__section work-detail__bento">
              <ul className="work-detail__bento-grid work-detail__bento-grid--jeongitae">
                {bentoCards.map((card, index) => {
                  const note = work.notes[index + 1];
                  return (
                    <li key={card.src} className={`work-detail__bento-card work-detail__bento-card--jeongitae-${index + 1}`}>
                      <div className="work-detail__bento-card-image">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                      {note && (
                        <div className="work-detail__bento-card-text">
                          {note.title && <h5>{note.title}</h5>}
                          {note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>
      );
    }

    // jeonseorin-raven-x 레이아웃 (전서린 작품 1)
    const useJeonseorinRavenXLayout = work.layout === 'jeonseorin-raven-x' || work.id === 'jeonseorin-raven-x';
    
    if (useJeonseorinRavenXLayout && work.gallery && work.notes && Array.isArray(work.notes)) {
      const textIntroNote = work.notes[0]; // DARK FLIGHT, RAVEN-X
      const featureImage = work.gallery[0]; // RAVEN-X
      const detailCards = work.gallery.slice(1, 4); // Main body, Engine Part, Tail Structure
      const renderRows = [
        { image: work.gallery[4], note: work.notes[5] }, // Beauty Render
        { image: work.gallery[5], note: work.notes[6] }, // Wireframe Render
      ];
      const highlightsGallery = work.gallery.slice(6, 13); // Highlights (7 images)
      const takeoffImage = work.gallery[13]; // The moment RAVEN-X takes off
      const turntableCards = work.gallery.slice(14, 17); // Beauty, Grey, Wireframe
      const flightModeCards = work.gallery.slice(17); // Landing mode, Low-speed, High-speed

      return (
        <div className="work-detail work-detail--jeonseorin-raven-x">
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

          {/* Text Intro: DARK FLIGHT, RAVEN-X */}
          {textIntroNote && (
            <section className="work-detail__section work-detail__text-intro">
              <div className="work-detail__text-intro-label">BUILT TO PROTECT WHAT REMAINS OF MANKIND</div>
              <h3 className="work-detail__text-intro-title">{textIntroNote.title}</h3>
              <p className="work-detail__text-intro-description" style={{ whiteSpace: 'pre-wrap' }}>{textIntroNote.description}</p>
            </section>
          )}

          {/* Feature: RAVEN-X */}
          {featureImage && work.notes[1] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block work-detail__image-block--feature">
                <img src={featureImage.src} alt={featureImage.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                {work.notes[1].title && <h3 className="work-detail__feature-title">{work.notes[1].title}</h3>}
                {work.notes[1].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[1].description}</p>}
              </div>
            </section>
          )}

          {/* Cards Grid: Main body, Engine Part, Tail Structure */}
          {detailCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid">
                {detailCards.map((card, index) => {
                  const note = work.notes[index + 2];
                  return (
                    <li key={card.src} className="work-detail__card">
                      <div className="work-detail__card-image">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                      {note && (
                        <div className="work-detail__card-text">
                          {note.title && <h5 className="work-detail__card-title">{note.title}</h5>}
                          {note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Feature Rows: Beauty Render, Wireframe Render */}
          {renderRows.length > 0 && (
            <section className="work-detail__section work-detail__feature-rows">
              <ul className="work-detail__feature-rows-list">
                {renderRows.map((row, index) => (
                  <li key={row.image.src} className={`work-detail__feature-row ${index === 1 ? 'work-detail__feature-row--reverse' : ''}`}>
                    {index === 1 ? (
                      <>
                        <div className="work-detail__image-block">
                          <img src={row.image.src} alt={row.image.alt} loading="lazy" />
                        </div>
                        <div className="work-detail__feature-text">
                          <div>
                            {row.note && row.note.title && <h3 className="work-detail__feature-title">{row.note.title}</h3>}
                            {row.note && row.note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{row.note.description}</p>}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="work-detail__feature-text">
                          <div>
                            {row.note && row.note.title && <h3 className="work-detail__feature-title">{row.note.title}</h3>}
                            {row.note && row.note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{row.note.description}</p>}
                          </div>
                        </div>
                        <div className="work-detail__image-block">
                          <img src={row.image.src} alt={row.image.alt} loading="lazy" />
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Gallery: Highlights */}
          {highlightsGallery.length > 0 && (
            <section className="work-detail__section work-detail__gallery">
              <div className="work-detail__gallery-header">
                <h3 className="work-detail__gallery-title">{work.notes[7] && work.notes[7].title}</h3>
              </div>
              <div className="work-detail__gallery-grid">
                <div className="work-detail__gallery-column">
                  <div className="work-detail__gallery-item">
                    <img src={highlightsGallery[0].src} alt={highlightsGallery[0].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__gallery-item">
                    <img src={highlightsGallery[1].src} alt={highlightsGallery[1].alt} loading="lazy" />
                  </div>
                </div>
                <div className="work-detail__gallery-column">
                  <div className="work-detail__gallery-item">
                    <img src={highlightsGallery[2].src} alt={highlightsGallery[2].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__gallery-item">
                    <img src={highlightsGallery[3].src} alt={highlightsGallery[3].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__gallery-item">
                    <img src={highlightsGallery[4].src} alt={highlightsGallery[4].alt} loading="lazy" />
                  </div>
                </div>
                <div className="work-detail__gallery-column">
                  <div className="work-detail__gallery-item">
                    <img src={highlightsGallery[5].src} alt={highlightsGallery[5].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__gallery-item">
                    <img src={highlightsGallery[6].src} alt={highlightsGallery[6].alt} loading="lazy" />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Feature: The moment RAVEN-X takes off */}
          {takeoffImage && work.notes[8] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block work-detail__image-block--feature">
                <img src={takeoffImage.src} alt={takeoffImage.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                {work.notes[8].title && <h3 className="work-detail__feature-title">{work.notes[8].title}</h3>}
                {work.notes[8].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[8].description}</p>}
              </div>
            </section>
          )}

          {/* Cards Grid: Beauty, Grey, Wireframe */}
          {turntableCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid work-detail__cards-grid--turntable">
                {turntableCards.map((card, index) => {
                  const note = work.notes[index + 9];
                  return (
                    <li key={card.src} className="work-detail__card work-detail__card--turntable">
                      <div className="work-detail__card-image">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                      {note && (
                        <div className="work-detail__card-text">
                          {note.title && <h5 className="work-detail__card-title">{note.title}</h5>}
                          {note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Cards Grid: Landing mode, Low-speed, High-speed */}
          {flightModeCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid work-detail__cards-grid--turntable">
                {flightModeCards.map((card, index) => {
                  const note = work.notes[index + 12];
                  return (
                    <li key={card.src} className="work-detail__card work-detail__card--turntable">
                      <div className="work-detail__card-image">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                      {note && (
                        <div className="work-detail__card-text">
                          {note.title && <h5 className="work-detail__card-title">{note.title}</h5>}
                          {note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>
      );
    }

    // jeonseorin-karon 레이아웃 (전서린 작품 2)
    const useJeonseorinKaronLayout = work.layout === 'jeonseorin-karon' || work.id === 'jeonseorin-karon';
    
    if (useJeonseorinKaronLayout && work.gallery && work.notes && Array.isArray(work.notes)) {
      const textIntroNote = work.notes[0]; // MODELING DEMO REEL
      const personalityImage = work.gallery[0]; // KARON's Personality
      const featureRows = [
        { image: work.gallery[1], note: work.notes[2] }, // The Green Earring
        { image: work.gallery[2], note: work.notes[3] }, // Cold-hearted Agent
      ];
      const turntableCards = work.gallery.slice(3); // Beauty, Grey, Wireframe

      return (
        <div className="work-detail work-detail--jeonseorin-karon">
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

          {/* Text Intro: MODELING DEMO REEL */}
          {textIntroNote && (
            <section className="work-detail__section work-detail__text-intro">
              <div className="work-detail__text-intro-label">CARTOON CHARACTER, KARON</div>
              <h3 className="work-detail__text-intro-title">{textIntroNote.title}</h3>
              <p className="work-detail__text-intro-description" style={{ whiteSpace: 'pre-wrap' }}>{textIntroNote.description}</p>
            </section>
          )}

          {/* Feature: KARON's Personality */}
          {personalityImage && work.notes[1] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block work-detail__image-block--feature">
                <img src={personalityImage.src} alt={personalityImage.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                {work.notes[1].title && <h3 className="work-detail__feature-title">{work.notes[1].title}</h3>}
                {work.notes[1].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[1].description}</p>}
              </div>
            </section>
          )}

          {/* Feature Rows: The Green Earring, Cold-hearted Agent */}
          {featureRows.length > 0 && (
            <section className="work-detail__section work-detail__feature-rows">
              <ul className="work-detail__feature-rows-list">
                {featureRows.map((row, index) => (
                  <li key={row.image.src} className={`work-detail__feature-row ${index === 1 ? 'work-detail__feature-row--reverse' : ''}`}>
                    {index === 1 ? (
                      <>
                        <div className="work-detail__image-block">
                          <img src={row.image.src} alt={row.image.alt} loading="lazy" />
                        </div>
                        <div className="work-detail__feature-text">
                          <div>
                            {row.note && row.note.title && <h3 className="work-detail__feature-title">{row.note.title}</h3>}
                            {row.note && row.note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{row.note.description}</p>}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="work-detail__feature-text">
                          <div>
                            {row.note && row.note.title && <h3 className="work-detail__feature-title">{row.note.title}</h3>}
                            {row.note && row.note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{row.note.description}</p>}
                          </div>
                        </div>
                        <div className="work-detail__image-block">
                          <img src={row.image.src} alt={row.image.alt} loading="lazy" />
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Cards Grid: Beauty, Grey, Wireframe */}
          {turntableCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid">
                {turntableCards.map((card, index) => {
                  const note = work.notes[index + 4];
                  return (
                    <li key={card.src} className="work-detail__card">
                      <div className="work-detail__card-image">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                      {note && (
                        <div className="work-detail__card-text">
                          {note.title && <h5 className="work-detail__card-title">{note.title}</h5>}
                          {note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>
      );
    }

    // jungjimin-the-gothic 레이아웃 (정지민 작품 1)
    const useJungjiminTheGothicLayout = work.layout === 'jungjimin-the-gothic' || work.id === 'jungjimin-the-gothic';
    
    if (useJungjiminTheGothicLayout && work.gallery && work.notes && Array.isArray(work.notes)) {
      const scene1Image = work.gallery[0]; // 씬1
      const sceneRows = [
        { image: work.gallery[1], note: work.notes[1] }, // 씬2
        { image: work.gallery[2], note: work.notes[2] }, // 씬3
      ];
      const scene3FeatureImage = work.gallery[3]; // 씬3 (숲 속 연출)
      const detailCards = work.gallery.slice(4, 7); // 상세샷 (갑옷, 투구, 하체)
      const bentoImages = work.gallery.slice(7); // 문양, 벨트, 하체 갑옷

      return (
        <div className="work-detail work-detail--jungjimin-the-gothic">
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

          {/* Feature Row: 씬1 */}
          {scene1Image && work.notes[0] && (
            <section className="work-detail__section work-detail__feature-rows">
              <ul className="work-detail__feature-rows-list">
                <li className="work-detail__feature-row">
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[0].title && <h3 className="work-detail__feature-title">{work.notes[0].title}</h3>}
                      {work.notes[0].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[0].description}</p>}
                    </div>
                  </div>
                  <div className="work-detail__image-block">
                    <img src={scene1Image.src} alt={scene1Image.alt} loading="lazy" />
                  </div>
                </li>
              </ul>
            </section>
          )}

          {/* Feature Rows: 씬2, 씬3 */}
          {sceneRows.length > 0 && (
            <section className="work-detail__section work-detail__feature-rows">
              <ul className="work-detail__feature-rows-list">
                {sceneRows.map((row, index) => (
                  <li key={row.image.src} className={`work-detail__feature-row ${index === 1 ? 'work-detail__feature-row--reverse' : ''}`}>
                    {index === 1 ? (
                      <>
                        <div className="work-detail__image-block">
                          <img src={row.image.src} alt={row.image.alt} loading="lazy" />
                        </div>
                        <div className="work-detail__feature-text">
                          <div>
                            {row.note && row.note.title && <h3 className="work-detail__feature-title">{row.note.title}</h3>}
                            {row.note && row.note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{row.note.description}</p>}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="work-detail__feature-text">
                          <div>
                            {row.note && row.note.title && <h3 className="work-detail__feature-title">{row.note.title}</h3>}
                            {row.note && row.note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{row.note.description}</p>}
                          </div>
                        </div>
                        <div className="work-detail__image-block">
                          <img src={row.image.src} alt={row.image.alt} loading="lazy" />
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Feature: 씬3 (숲 속 연출) */}
          {scene3FeatureImage && work.notes[3] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block work-detail__image-block--feature">
                <img src={scene3FeatureImage.src} alt={scene3FeatureImage.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                {work.notes[3].title && <h3 className="work-detail__feature-title">{work.notes[3].title}</h3>}
                {work.notes[3].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[3].description}</p>}
              </div>
            </section>
          )}

          {/* Cards Grid: 상세샷 (갑옷, 투구, 하체) */}
          {detailCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid">
                {detailCards.map((card, index) => {
                  const note = work.notes[index + 4];
                  return (
                    <li key={card.src} className="work-detail__card">
                      <div className="work-detail__card-image">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                      {note && (
                        <div className="work-detail__card-text">
                          {note.title && <h5 className="work-detail__card-title">{note.title}</h5>}
                          {note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Bento Grid: 문양, 벨트, 하체 갑옷 */}
          {bentoImages.length > 0 && (
            <section className="work-detail__section work-detail__bento">
              <ul className="work-detail__bento-grid work-detail__bento-grid--jungjimin">
                <li className="work-detail__bento-column">
                  <div className="work-detail__bento-card work-detail__bento-card--center">
                    <div className="work-detail__bento-card-text">
                      {work.notes[7] && work.notes[7].title && <h5>{work.notes[7].title}</h5>}
                      {work.notes[7] && work.notes[7].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[7].description}</p>}
                    </div>
                    <div className="work-detail__bento-card-image">
                      <img src={bentoImages[0].src} alt={bentoImages[0].alt} loading="lazy" />
                    </div>
                  </div>
                  <div className="work-detail__bento-card">
                    <div className="work-detail__bento-card-text">
                      {work.notes[8] && work.notes[8].title && <h5>{work.notes[8].title}</h5>}
                      {work.notes[8] && work.notes[8].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[8].description}</p>}
                    </div>
                    <div className="work-detail__bento-card-image">
                      <img src={bentoImages[1].src} alt={bentoImages[1].alt} loading="lazy" />
                    </div>
                  </div>
                </li>
                <li className="work-detail__bento-column">
                  <div className="work-detail__bento-card work-detail__bento-card--large">
                    <div className="work-detail__bento-card-text">
                      {work.notes[9] && work.notes[9].title && <h5>{work.notes[9].title}</h5>}
                      {work.notes[9] && work.notes[9].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[9].description}</p>}
                    </div>
                    <div className="work-detail__bento-card-image">
                      <img src={bentoImages[2].src} alt={bentoImages[2].alt} loading="lazy" />
                    </div>
                  </div>
                </li>
              </ul>
            </section>
          )}
        </div>
      );
    }

    // jungjimin-the-weapon 레이아웃 (정지민 작품 2)
    const useJungjiminTheWeaponLayout = work.layout === 'jungjimin-the-weapon' || work.id === 'jungjimin-the-weapon';
    
    if (useJungjiminTheWeaponLayout && work.gallery && work.notes && Array.isArray(work.notes)) {
      const longswordImage = work.gallery[0]; // 장검
      const weaponRows = [
        { image: work.gallery[1], note: work.notes[1] }, // 해머
        { image: work.gallery[2], note: work.notes[2] }, // 대검
      ];
      const daggerImage = work.gallery[3]; // 단검
      const detailCards = work.gallery.slice(4, 7); // 상세샷 (대검/단검, 장검, 해머)
      const bentoImages = work.gallery.slice(7); // 문양, 해머, 장검

      return (
        <div className="work-detail work-detail--jungjimin-the-weapon">
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

          {/* Feature Row: 장검 */}
          {longswordImage && work.notes[0] && (
            <section className="work-detail__section work-detail__feature-rows">
              <ul className="work-detail__feature-rows-list">
                <li className="work-detail__feature-row">
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[0].title && <h3 className="work-detail__feature-title">{work.notes[0].title}</h3>}
                      {work.notes[0].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[0].description}</p>}
                    </div>
                  </div>
                  <div className="work-detail__image-block">
                    <img src={longswordImage.src} alt={longswordImage.alt} loading="lazy" />
                  </div>
                </li>
              </ul>
            </section>
          )}

          {/* Feature Rows: 해머, 대검 */}
          {weaponRows.length > 0 && (
            <section className="work-detail__section work-detail__feature-rows">
              <ul className="work-detail__feature-rows-list">
                {weaponRows.map((row, index) => (
                  <li key={row.image.src} className={`work-detail__feature-row ${index === 1 ? 'work-detail__feature-row--reverse' : ''}`}>
                    {index === 1 ? (
                      <>
                        <div className="work-detail__image-block">
                          <img src={row.image.src} alt={row.image.alt} loading="lazy" />
                        </div>
                        <div className="work-detail__feature-text">
                          <div>
                            {row.note && row.note.title && <h3 className="work-detail__feature-title">{row.note.title}</h3>}
                            {row.note && row.note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{row.note.description}</p>}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="work-detail__feature-text">
                          <div>
                            {row.note && row.note.title && <h3 className="work-detail__feature-title">{row.note.title}</h3>}
                            {row.note && row.note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{row.note.description}</p>}
                          </div>
                        </div>
                        <div className="work-detail__image-block">
                          <img src={row.image.src} alt={row.image.alt} loading="lazy" />
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Feature: 단검 */}
          {daggerImage && work.notes[3] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block work-detail__image-block--feature">
                <img src={daggerImage.src} alt={daggerImage.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                {work.notes[3].title && <h3 className="work-detail__feature-title">{work.notes[3].title}</h3>}
                {work.notes[3].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[3].description}</p>}
              </div>
            </section>
          )}

          {/* Cards Grid: 상세샷 (대검/단검, 장검, 해머) */}
          {detailCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid">
                {detailCards.map((card, index) => {
                  const note = work.notes[index + 4];
                  return (
                    <li key={card.src} className="work-detail__card">
                      <div className="work-detail__card-image">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                      {note && (
                        <div className="work-detail__card-text">
                          {note.title && <h5 className="work-detail__card-title">{note.title}</h5>}
                          {note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Bento Grid: 문양, 해머, 장검 */}
          {bentoImages.length > 0 && (
            <section className="work-detail__section work-detail__bento">
              <ul className="work-detail__bento-grid work-detail__bento-grid--jungjimin">
                <li className="work-detail__bento-column">
                  <div className="work-detail__bento-card work-detail__bento-card--center">
                    <div className="work-detail__bento-card-text">
                      {work.notes[7] && work.notes[7].title && <h5>{work.notes[7].title}</h5>}
                      {work.notes[7] && work.notes[7].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[7].description}</p>}
                    </div>
                    <div className="work-detail__bento-card-image">
                      <img src={bentoImages[0].src} alt={bentoImages[0].alt} loading="lazy" />
                    </div>
                  </div>
                  <div className="work-detail__bento-card">
                    <div className="work-detail__bento-card-text">
                      {work.notes[8] && work.notes[8].title && <h5>{work.notes[8].title}</h5>}
                      {work.notes[8] && work.notes[8].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[8].description}</p>}
                    </div>
                    <div className="work-detail__bento-card-image">
                      <img src={bentoImages[1].src} alt={bentoImages[1].alt} loading="lazy" />
                    </div>
                  </div>
                </li>
                <li className="work-detail__bento-column">
                  <div className="work-detail__bento-card work-detail__bento-card--large">
                    <div className="work-detail__bento-card-text">
                      {work.notes[9] && work.notes[9].title && <h5>{work.notes[9].title}</h5>}
                      {work.notes[9] && work.notes[9].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[9].description}</p>}
                    </div>
                    <div className="work-detail__bento-card-image">
                      <img src={bentoImages[2].src} alt={bentoImages[2].alt} loading="lazy" />
                    </div>
                  </div>
                </li>
              </ul>
            </section>
          )}
        </div>
      );
    }

    // johaneul-youth-dream 레이아웃 (조하늘 작품 1)
    const useJohaneulYouthDreamLayout = work.layout === 'johaneul-youth-dream' || work.id === 'johaneul-youth-dream';
    
    if (useJohaneulYouthDreamLayout && work.gallery && work.notes && Array.isArray(work.notes)) {
      const cardsImages = work.gallery.slice(0, 3); // Music, Generative AI, Visual performance
      const resolumeImage = work.gallery[3]; // Resolume Arena
      const midiImage = work.gallery[4]; // MIDI Controller
      const galleryImages = work.gallery.slice(5); // Visual Highlights

      return (
        <div className="work-detail work-detail--johaneul-youth-dream">
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

          {/* Text Intro */}
          {work.notes[0] && (
            <section className="work-detail__section work-detail__text-intro">
              <div className="work-detail__text-intro-label">Live Visual Performance</div>
              <h3 className="work-detail__text-intro-title">{work.notes[0].title}</h3>
              {work.notes[0].description && (
                <p className="work-detail__text-intro-description" style={{ whiteSpace: 'pre-wrap' }}>
                  {work.notes[0].description}
                </p>
              )}
            </section>
          )}

          {/* Text Blocks: Concept, Genre, Tools */}
          {work.notes[1] && work.notes[2] && work.notes[3] && (
            <section className="work-detail__section work-detail__text-blocks">
              <ul className="work-detail__text-blocks-list">
                <li className="work-detail__text-block">
                  <h5>{work.notes[1].title}</h5>
                  <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[1].description}</p>
                </li>
                <li className="work-detail__text-block">
                  <h5>{work.notes[2].title}</h5>
                  <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[2].description}</p>
                </li>
                <li className="work-detail__text-block">
                  <h5>{work.notes[3].title}</h5>
                  <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[3].description}</p>
                </li>
              </ul>
            </section>
          )}

          {/* Cards Grid: Music, Generative AI, Visual performance */}
          {cardsImages.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid">
                {cardsImages.map((card, index) => {
                  const note = work.notes[index + 4];
                  return (
                    <li key={card.src} className="work-detail__card">
                      <div className="work-detail__card-image">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                      {note && (
                        <div className="work-detail__card-text">
                          {note.title && <h5 className="work-detail__card-title">{note.title}</h5>}
                          {note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Feature: Resolume Arena */}
          {resolumeImage && work.notes[7] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__feature-text">
                {work.notes[7].title && <h3 className="work-detail__feature-title">{work.notes[7].title}</h3>}
              </div>
              <div className="work-detail__image-block work-detail__image-block--feature">
                <img src={resolumeImage.src} alt={resolumeImage.alt} loading="lazy" />
              </div>
            </section>
          )}

          {/* Feature: MIDI Controller */}
          {midiImage && work.notes[8] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__feature-text">
                {work.notes[8].title && <h3 className="work-detail__feature-title">{work.notes[8].title}</h3>}
              </div>
              <div className="work-detail__image-block work-detail__image-block--feature">
                <img src={midiImage.src} alt={midiImage.alt} loading="lazy" />
              </div>
            </section>
          )}

          {/* Gallery: Visual Highlights */}
          {galleryImages.length > 0 && work.notes[9] && (
            <section className="work-detail__section work-detail__gallery">
              <div className="work-detail__gallery-header">
                <h3 className="work-detail__gallery-title">{work.notes[9].title}</h3>
              </div>
              <div className="work-detail__gallery-grid work-detail__gallery-grid--masonry">
                <div className="work-detail__gallery-column">
                  <div className="work-detail__gallery-item">
                    <img src={galleryImages[0].src} alt={galleryImages[0].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__gallery-item">
                    <img src={galleryImages[1].src} alt={galleryImages[1].alt} loading="lazy" />
                  </div>
                </div>
                <div className="work-detail__gallery-column">
                  <div className="work-detail__gallery-item">
                    <img src={galleryImages[2].src} alt={galleryImages[2].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__gallery-item">
                    <img src={galleryImages[3].src} alt={galleryImages[3].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__gallery-item">
                    <img src={galleryImages[4].src} alt={galleryImages[4].alt} loading="lazy" />
                  </div>
                </div>
                <div className="work-detail__gallery-column">
                  <div className="work-detail__gallery-item">
                    <img src={galleryImages[5].src} alt={galleryImages[5].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__gallery-item">
                    <img src={galleryImages[6].src} alt={galleryImages[6].alt} loading="lazy" />
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      );
    }

    // johaneul-the-reason 레이아웃 (조하늘 작품 2)
    const useJohaneulTheReasonLayout = work.layout === 'johaneul-the-reason' || work.id === 'johaneul-the-reason';
    
    if (useJohaneulTheReasonLayout && work.gallery && work.notes && Array.isArray(work.notes)) {
      const characterImages = work.gallery.slice(0, 3); // 캐릭터 시트, Komori, Cloudi
      const styleFrames = work.gallery.slice(3); // Style Frame들

      return (
        <div className="work-detail work-detail--johaneul-the-reason">
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

          {/* Text Intro */}
          {work.notes[0] && (
            <section className="work-detail__section work-detail__text-intro">
              <div className="work-detail__text-intro-label">Animation</div>
              <h3 className="work-detail__text-intro-title">{work.notes[0].title}</h3>
              {work.notes[0].description && (
                <p className="work-detail__text-intro-description" style={{ whiteSpace: 'pre-wrap' }}>
                  {work.notes[0].description}
                </p>
              )}
            </section>
          )}

          {/* Text Blocks: Concept, Genre, Tools */}
          {work.notes[1] && work.notes[2] && work.notes[3] && (
            <section className="work-detail__section work-detail__text-blocks">
              <ul className="work-detail__text-blocks-list">
                <li className="work-detail__text-block">
                  <h5>{work.notes[1].title}</h5>
                  <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[1].description}</p>
                </li>
                <li className="work-detail__text-block">
                  <h5>{work.notes[2].title}</h5>
                  <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[2].description}</p>
                </li>
                <li className="work-detail__text-block">
                  <h5>{work.notes[3].title}</h5>
                  <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[3].description}</p>
                </li>
              </ul>
            </section>
          )}

          {/* Bento Grid: 캐릭터 시트 */}
          {characterImages.length > 0 && (
            <section className="work-detail__section work-detail__bento">
              <ul className="work-detail__bento-grid work-detail__bento-grid--johaneul">
                <li className="work-detail__bento-card">
                  <div className="work-detail__bento-card-image">
                    <img src={characterImages[0].src} alt={characterImages[0].alt} loading="lazy" />
                  </div>
                </li>
                <li className="work-detail__bento-card">
                  <div className="work-detail__bento-card-image">
                    <img src={characterImages[1].src} alt={characterImages[1].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__bento-card-text">
                    {work.notes[4] && work.notes[4].title && <h5>{work.notes[4].title}</h5>}
                    {work.notes[4] && work.notes[4].description && (
                      <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[4].description}</p>
                    )}
                  </div>
                </li>
                <li className="work-detail__bento-card">
                  <div className="work-detail__bento-card-image">
                    <img src={characterImages[2].src} alt={characterImages[2].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__bento-card-text">
                    {work.notes[5] && work.notes[5].title && <h5>{work.notes[5].title}</h5>}
                    {work.notes[5] && work.notes[5].description && (
                      <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[5].description}</p>
                    )}
                  </div>
                </li>
              </ul>
            </section>
          )}

          {/* Features: Style Frames */}
          {styleFrames.length > 0 && work.notes[6] && (
            <>
              <section className="work-detail__section work-detail__feature">
                <div className="work-detail__feature-text">
                  {work.notes[6].title && <h3 className="work-detail__feature-title">{work.notes[6].title}</h3>}
                </div>
                <div className="work-detail__image-block work-detail__image-block--feature">
                  <img src={styleFrames[0].src} alt={styleFrames[0].alt} loading="lazy" />
                </div>
              </section>
              {styleFrames.slice(1).map((frame, index) => (
                <section key={frame.src} className="work-detail__section work-detail__feature">
                  <div className="work-detail__image-block work-detail__image-block--feature">
                    <img src={frame.src} alt={frame.alt} loading="lazy" />
                  </div>
                </section>
              ))}
            </>
          )}
        </div>
      );
    }

    // heo-jihoon-master-imagination 레이아웃 (허지훈 작품 1)
    const useHeoJihoonMasterImaginationLayout = work.layout === 'heo-jihoon-master-imagination' || work.id === 'heo-jihoon-master-imagination';
    
    if (useHeoJihoonMasterImaginationLayout && work.gallery && work.notes && Array.isArray(work.notes)) {
      const quoteNote = work.notes[0]; // Quote
      const textIntroNote = work.notes[1]; // 마우스를 창작의 도구로서 바라보다
      const cardsImages = work.gallery.slice(0, 3); // 바위 실루엣, 펼쳐지는 상상의 세계, 창작의 도구 마우스
      const aiFeatureImage = work.gallery[3]; // 생성형 AI 활용
      const featureRows = [
        { image: work.gallery[4], note: work.notes[6] }, // RUNWAY와 Cinema 4D의 만남
        { image: work.gallery[5], note: work.notes[7] }, // Stylize + 4K Upscale
      ];
      const galleryImages = work.gallery.slice(6, 13); // 다양한 프롬프트
      const detailCards = work.gallery.slice(13, 16); // 부드러운 무한 스크롤, 인체공학적 비대칭 디자인, 가로 스크롤 휠
      const finalFeatureImage = work.gallery[16]; // Master your Imagination

      return (
        <div className="work-detail work-detail--heo-jihoon-master-imagination">
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

          {/* Quote */}
          {quoteNote && (
            <section className="work-detail__section work-detail__quote">
              <h3 className="work-detail__quote-text" style={{ whiteSpace: 'pre-wrap' }}>
                {quoteNote.description}
              </h3>
            </section>
          )}

          {/* Text Intro */}
          {textIntroNote && (
            <section className="work-detail__section work-detail__text-intro">
              <div className="work-detail__text-intro-label">상상을 현실로 이끄는 창작의 도구</div>
              <h3 className="work-detail__text-intro-title">{textIntroNote.title}</h3>
              {textIntroNote.description && (
                <p className="work-detail__text-intro-description" style={{ whiteSpace: 'pre-wrap' }}>
                  {textIntroNote.description}
                </p>
              )}
            </section>
          )}

          {/* Cards Grid: 바위 실루엣, 펼쳐지는 상상의 세계, 창작의 도구 마우스 */}
          {cardsImages.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid">
                {cardsImages.map((card, index) => {
                  const note = work.notes[index + 2];
                  return (
                    <li key={card.src} className="work-detail__card">
                      <div className="work-detail__card-image">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                      {note && (
                        <div className="work-detail__card-text">
                          {note.title && <h5 className="work-detail__card-title">{note.title}</h5>}
                          {note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Feature: 생성형 AI 활용 */}
          {aiFeatureImage && work.notes[5] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block work-detail__image-block--feature">
                <img src={aiFeatureImage.src} alt={aiFeatureImage.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                {work.notes[5].title && <h3 className="work-detail__feature-title">{work.notes[5].title}</h3>}
                {work.notes[5].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[5].description}</p>}
              </div>
            </section>
          )}

          {/* Feature Rows: RUNWAY와 Cinema 4D의 만남, Stylize + 4K Upscale */}
          {featureRows.length > 0 && (
            <section className="work-detail__section work-detail__feature-rows">
              <ul className="work-detail__feature-rows-list">
                {featureRows.map((row, index) => (
                  <li key={row.image.src} className={`work-detail__feature-row ${index === 1 ? 'work-detail__feature-row--reverse' : ''}`}>
                    {index === 1 ? (
                      <>
                        <div className="work-detail__image-block">
                          <img src={row.image.src} alt={row.image.alt} loading="lazy" />
                        </div>
                        <div className="work-detail__feature-text">
                          <div>
                            {row.note && row.note.title && <h3 className="work-detail__feature-title">{row.note.title}</h3>}
                            {row.note && row.note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{row.note.description}</p>}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="work-detail__feature-text">
                          <div>
                            {row.note && row.note.title && <h3 className="work-detail__feature-title">{row.note.title}</h3>}
                            {row.note && row.note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{row.note.description}</p>}
                          </div>
                        </div>
                        <div className="work-detail__image-block">
                          <img src={row.image.src} alt={row.image.alt} loading="lazy" />
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Gallery: 다양한 프롬프트 */}
          {galleryImages.length > 0 && work.notes[8] && (
            <section className="work-detail__section work-detail__gallery">
              <div className="work-detail__gallery-header">
                <h3 className="work-detail__gallery-title">{work.notes[8].title}</h3>
                {work.notes[8].description && (
                  <p className="work-detail__gallery-description" style={{ whiteSpace: 'pre-wrap' }}>
                    {work.notes[8].description}
                  </p>
                )}
              </div>
              <div className="work-detail__gallery-grid work-detail__gallery-grid--masonry">
                <div className="work-detail__gallery-column">
                  <div className="work-detail__gallery-item">
                    <img src={galleryImages[0].src} alt={galleryImages[0].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__gallery-item">
                    <img src={galleryImages[1].src} alt={galleryImages[1].alt} loading="lazy" />
                  </div>
                </div>
                <div className="work-detail__gallery-column">
                  <div className="work-detail__gallery-item">
                    <img src={galleryImages[2].src} alt={galleryImages[2].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__gallery-item">
                    <img src={galleryImages[3].src} alt={galleryImages[3].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__gallery-item">
                    <img src={galleryImages[4].src} alt={galleryImages[4].alt} loading="lazy" />
                  </div>
                </div>
                <div className="work-detail__gallery-column">
                  <div className="work-detail__gallery-item">
                    <img src={galleryImages[5].src} alt={galleryImages[5].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__gallery-item">
                    <img src={galleryImages[6].src} alt={galleryImages[6].alt} loading="lazy" />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Cards Grid: 부드러운 무한 스크롤, 인체공학적 비대칭 디자인, 가로 스크롤 휠 */}
          {detailCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid">
                {detailCards.map((card, index) => {
                  const note = work.notes[index + 9];
                  return (
                    <li key={card.src} className="work-detail__card">
                      <div className="work-detail__card-image">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                      {note && (
                        <div className="work-detail__card-text">
                          {note.title && <h5 className="work-detail__card-title">{note.title}</h5>}
                          {note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Feature: Master your Imagination */}
          {finalFeatureImage && work.notes[12] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block work-detail__image-block--feature">
                <img src={finalFeatureImage.src} alt={finalFeatureImage.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                {work.notes[12].title && <h3 className="work-detail__feature-title">{work.notes[12].title}</h3>}
                {work.notes[12].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[12].description}</p>}
              </div>
            </section>
          )}
        </div>
      );
    }

    // heo-jihoon-eternal-vision 레이아웃 (허지훈 작품 2)
    const useHeoJihoonEternalVisionLayout = work.layout === 'heo-jihoon-eternal-vision' || work.id === 'heo-jihoon-eternal-vision';
    
    if (useHeoJihoonEternalVisionLayout && work.gallery && work.notes && Array.isArray(work.notes)) {
      const quoteNote = work.notes[0]; // Quote
      const textIntroNote = work.notes[1]; // N Vision 74
      const cinematicImage = work.gallery[0]; // Cinematic Branding Film
      const cardsImages = work.gallery.slice(1, 4); // Card 1, 2, 3
      const featureImage = work.gallery[4]; // Feature
      const featureRows = [
        { image: work.gallery[5], note: work.notes[3] }, // 푸른 하늘과 설원
        { image: work.gallery[6], note: work.notes[4] }, // Cinema 4D Pyro
      ];
      const galleryImages = work.gallery.slice(7, 14); // Gallery
      const finalFeatureImage = work.gallery[14]; // Eternal Vision

      return (
        <div className="work-detail work-detail--heo-jihoon-eternal-vision">
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

          {/* Quote */}
          {quoteNote && (
            <section className="work-detail__section work-detail__quote">
              <h3 className="work-detail__quote-text" style={{ whiteSpace: 'pre-wrap' }}>
                {quoteNote.description}
              </h3>
            </section>
          )}

          {/* Text Intro */}
          {textIntroNote && (
            <section className="work-detail__section work-detail__text-intro">
              <div className="work-detail__text-intro-label">포니 쿠페의 유산</div>
              <h3 className="work-detail__text-intro-title">{textIntroNote.title}</h3>
              {textIntroNote.description && (
                <p className="work-detail__text-intro-description" style={{ whiteSpace: 'pre-wrap' }}>
                  {textIntroNote.description}
                </p>
              )}
            </section>
          )}

          {/* Feature: Cinematic Branding Film */}
          {cinematicImage && work.notes[2] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block work-detail__image-block--feature">
                <img src={cinematicImage.src} alt={cinematicImage.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                {work.notes[2].title && <h3 className="work-detail__feature-title">{work.notes[2].title}</h3>}
                {work.notes[2].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[2].description}</p>}
              </div>
            </section>
          )}

          {/* Cards Grid: Card 1, 2, 3 */}
          {cardsImages.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid">
                {cardsImages.map((card, index) => (
                  <li key={card.src} className="work-detail__card">
                    <div className="work-detail__card-image">
                      <img src={card.src} alt={card.alt} loading="lazy" />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Feature: 이미지만 */}
          {featureImage && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block work-detail__image-block--feature">
                <img src={featureImage.src} alt={featureImage.alt} loading="lazy" />
              </div>
            </section>
          )}

          {/* Feature Rows: 푸른 하늘과 설원, Cinema 4D Pyro */}
          {featureRows.length > 0 && (
            <section className="work-detail__section work-detail__feature-rows">
              <ul className="work-detail__feature-rows-list">
                {featureRows.map((row, index) => (
                  <li key={row.image.src} className={`work-detail__feature-row ${index === 1 ? 'work-detail__feature-row--reverse' : ''}`}>
                    {index === 1 ? (
                      <>
                        <div className="work-detail__image-block">
                          <img src={row.image.src} alt={row.image.alt} loading="lazy" />
                        </div>
                        <div className="work-detail__feature-text">
                          <div>
                            {row.note && row.note.title && <h3 className="work-detail__feature-title">{row.note.title}</h3>}
                            {row.note && row.note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{row.note.description}</p>}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="work-detail__feature-text">
                          <div>
                            {row.note && row.note.title && <h3 className="work-detail__feature-title">{row.note.title}</h3>}
                            {row.note && row.note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{row.note.description}</p>}
                          </div>
                        </div>
                        <div className="work-detail__image-block">
                          <img src={row.image.src} alt={row.image.alt} loading="lazy" />
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Gallery */}
          {galleryImages.length > 0 && (
            <section className="work-detail__section work-detail__gallery">
              <div className="work-detail__gallery-grid work-detail__gallery-grid--masonry">
                <div className="work-detail__gallery-column">
                  <div className="work-detail__gallery-item">
                    <img src={galleryImages[0].src} alt={galleryImages[0].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__gallery-item">
                    <img src={galleryImages[1].src} alt={galleryImages[1].alt} loading="lazy" />
                  </div>
                </div>
                <div className="work-detail__gallery-column">
                  <div className="work-detail__gallery-item">
                    <img src={galleryImages[2].src} alt={galleryImages[2].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__gallery-item">
                    <img src={galleryImages[3].src} alt={galleryImages[3].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__gallery-item">
                    <img src={galleryImages[4].src} alt={galleryImages[4].alt} loading="lazy" />
                  </div>
                </div>
                <div className="work-detail__gallery-column">
                  <div className="work-detail__gallery-item">
                    <img src={galleryImages[5].src} alt={galleryImages[5].alt} loading="lazy" />
                  </div>
                  <div className="work-detail__gallery-item">
                    <img src={galleryImages[6].src} alt={galleryImages[6].alt} loading="lazy" />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Feature: Eternal Vision */}
          {finalFeatureImage && work.notes[5] && (
            <section className="work-detail__section work-detail__feature">
              <div className="work-detail__image-block work-detail__image-block--feature">
                <img src={finalFeatureImage.src} alt={finalFeatureImage.alt} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                {work.notes[5].title && <h3 className="work-detail__feature-title">{work.notes[5].title}</h3>}
                {work.notes[5].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[5].description}</p>}
              </div>
            </section>
          )}
        </div>
      );
    }

    // parkheechan-animation-reel 레이아웃 (박희찬 작품 2)
    const useParkheechanAnimationReelLayout = work.layout === 'parkheechan-animation-reel' || work.id === 'parkheechan-animation-reel';
    
    if (useParkheechanAnimationReelLayout && work.gallery && work.notes && Array.isArray(work.notes)) {
      const animationImage = work.gallery[0]; // 3D 애니메이션
      const goalImage = work.gallery[1]; // 목표
      const conceptCards = work.gallery.slice(2); // 자연스러움, 무게감, 속도감

      return (
        <div className="work-detail work-detail--parkheechan-animation-reel">
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

          {/* Feature Rows: 3D 애니메이션, 목표 */}
          {animationImage && goalImage && work.notes[0] && work.notes[1] && (
            <section className="work-detail__section work-detail__feature-rows">
              <ul className="work-detail__feature-rows-list">
                <li className="work-detail__feature-row">
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[0].title && <h3 className="work-detail__feature-title">{work.notes[0].title}</h3>}
                      {work.notes[0].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[0].description}</p>}
                    </div>
                  </div>
                  <div className="work-detail__image-block">
                    <img src={animationImage.src} alt={animationImage.alt} loading="lazy" />
                  </div>
                </li>
                <li className="work-detail__feature-row work-detail__feature-row--reverse">
                  <div className="work-detail__image-block">
                    <img src={goalImage.src} alt={goalImage.alt} loading="lazy" />
                  </div>
                  <div className="work-detail__feature-text">
                    <div>
                      {work.notes[1].title && <h3 className="work-detail__feature-title">{work.notes[1].title}</h3>}
                      {work.notes[1].description && <p style={{ whiteSpace: 'pre-wrap' }}>{work.notes[1].description}</p>}
                    </div>
                  </div>
                </li>
              </ul>
            </section>
          )}

          {/* Cards Grid: 자연스러움, 무게감, 속도감 */}
          {conceptCards.length > 0 && (
            <section className="work-detail__section work-detail__cards">
              <ul className="work-detail__cards-grid">
                {conceptCards.map((card, index) => {
                  const note = work.notes[index + 2];
                  return (
                    <li key={card.src} className="work-detail__card">
                      <div className="work-detail__card-image">
                        <img src={card.src} alt={card.alt} loading="lazy" />
                      </div>
                      {note && (
                        <div className="work-detail__card-text">
                          {note.title && <h5 className="work-detail__card-title">{note.title}</h5>}
                          {note.description && <p style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
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
