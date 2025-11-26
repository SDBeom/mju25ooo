import React from 'react';
import { handleImageError } from '../../../shared/imageUtils';
import { useBreakpoint } from '../../../hooks/useBreakpoint';
import '../styles/works/UnifiedWorkLayout/UnifiedWorkLayoutDesktop.css';
import '../styles/works/UnifiedWorkLayout/UnifiedWorkLayoutTablet.css';
import '../styles/works/UnifiedWorkLayout/UnifiedWorkLayoutMobile.css';

/**
 * 통일된 작품 상세 레이아웃 컴포넌트
 * 모든 작품이 동일한 레이아웃 구조를 사용하되, 내용만 다르게 표시
 * 
 * 레이아웃 구조:
 * 1. Hero Section (텍스트 왼쪽, 이미지 오른쪽)
 * 2. Bento Section (텍스트 + 이미지)
 * 3. Quote Section
 * 4. Feature Section (이미지만)
 * 5. Cards Section (3개의 카드, 각각 이미지 + 텍스트)
 */
const UnifiedWorkLayout = ({ 
  work, 
  designer, 
  ctas,
  device = null, // 'desktop', 'tablet', 'mobile' 또는 null (자동 감지)
  // 각 섹션별 데이터
  heroImage,
  bentoData = [], // [{ title, description, image }]
  quoteData = null, // { text, subtitle, content }
  featureImage = null,
  cardsData = [] // [{ title, description, image }]
}) => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  
  if (!work || !designer) {
    return null;
  }

  // device가 지정되지 않으면 자동 감지
  let currentDevice = device;
  if (!currentDevice) {
    if (isMobile) currentDevice = 'mobile';
    else if (isTablet) currentDevice = 'tablet';
    else currentDevice = 'desktop';
  }

  const deviceClass = `work-detail--unified-${currentDevice}`;
  const heroClass = `work-detail__hero--unified-${currentDevice}`;
  const bentoClass = `work-detail__bento--unified-${currentDevice}`;
  const quoteClass = `work-detail__quote--unified-${currentDevice}`;
  const featureClass = `work-detail__feature--unified-${currentDevice}`;
  const cardsClass = `work-detail__cards--unified-${currentDevice}`;

  return (
    <div className={`work-detail ${deviceClass}`}>
      {/* Hero Section */}
      <section className={`work-detail__section work-detail__hero ${heroClass}`}>
        <div className={`work-detail__hero-content work-detail__hero-content--unified-${currentDevice}`}>
          <div className="work-detail__text-group">
            <h2 className={`work-detail__title work-detail__title--unified-${currentDevice}`}>
              {work.title || '작품 제목'}
            </h2>
            <div className={`work-detail__lead work-detail__lead--unified-${currentDevice}`}>
              {work.summary && (
                typeof work.summary === 'string' ? (
                  <p>{work.summary}</p>
                ) : (
                  <div>{work.summary}</div>
                )
              )}
            </div>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className={`work-detail__ctas work-detail__ctas--unified-${currentDevice}`}>
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--unified-${currentDevice}`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        {heroImage && (
          <div className={`work-detail__hero-image-wrapper work-detail__hero-image-wrapper--unified-${currentDevice}`}>
            <div className="work-detail__hero-image-container">
              <div className="work-detail__hero-image-inner">
                <img
                  src={heroImage}
                  alt={work.title || 'Hero Image'}
                  className="work-detail__hero-image"
                  onError={(e) => handleImageError(e, heroImage, work.id, 'hero')}
                  loading="eager"
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Bento Section */}
      {bentoData && bentoData.length > 0 && (
        <ul className={`work-detail__section work-detail__bento ${bentoClass}`}>
          {bentoData.map((bento, index) => (
            <li key={index} className={`work-detail__bento-card work-detail__bento-card--unified-${currentDevice}`}>
              {bento.title || bento.description ? (
                <div className="work-detail__bento-text">
                  {bento.title && (
                    <h5 className="work-detail__bento-title">{bento.title}</h5>
                  )}
                  {bento.description && (
                    <div className="work-detail__bento-description">
                      {typeof bento.description === 'string' ? (
                        <p>{bento.description}</p>
                      ) : (
                        <div>{bento.description}</div>
                      )}
                    </div>
                  )}
                </div>
              ) : null}
              {bento.image && (
                <div className="work-detail__bento-image-wrapper">
                  <img
                    src={bento.image}
                    alt={bento.title || `Bento ${index + 1}`}
                    className="work-detail__bento-image"
                    onError={(e) => handleImageError(e, bento.image, work.id, `bento-${index}`)}
                    loading="lazy"
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Quote Section */}
      {quoteData && (
        <section className={`work-detail__section work-detail__quote ${quoteClass}`}>
          <figure className="work-detail__quote-figure">
            {quoteData.text && (
              <p className="work-detail__quote-text">{quoteData.text}</p>
            )}
            {quoteData.subtitle && (
              <p className="work-detail__quote-subtitle">{quoteData.subtitle}</p>
            )}
            {quoteData.content && (
              <p className="work-detail__quote-content">{quoteData.content}</p>
            )}
          </figure>
        </section>
      )}

      {/* Feature Section */}
      {featureImage && (
        <section className={`work-detail__section work-detail__feature ${featureClass}`}>
          <div className="work-detail__feature-image-wrapper">
            <img
              src={featureImage}
              alt={work.title || 'Feature Image'}
              className="work-detail__feature-image"
              onError={(e) => handleImageError(e, featureImage, work.id, 'feature')}
              loading="lazy"
            />
          </div>
        </section>
      )}

      {/* Cards Section */}
      {cardsData && cardsData.length > 0 && (
        <ul className={`work-detail__section work-detail__cards ${cardsClass}`}>
          {cardsData.map((card, index) => (
            <li key={index} className={`work-detail__card work-detail__card--unified-${currentDevice}`}>
              {card.image && (
                <div className="work-detail__card-image-wrapper">
                  <img
                    src={card.image}
                    alt={card.title || `Card ${index + 1}`}
                    className="work-detail__card-image"
                    onError={(e) => handleImageError(e, card.image, work.id, `card-${index}`)}
                    loading="lazy"
                  />
                </div>
              )}
              {(card.title || card.description) && (
                <div className="work-detail__card-text">
                  {card.title && (
                    <h5 className="work-detail__card-title">
                      <ol className="work-detail__card-title-list">
                        <li>{card.title}</li>
                      </ol>
                    </h5>
                  )}
                  {card.description && (
                    <div className="work-detail__card-description">
                      {typeof card.description === 'string' ? (
                        <p>{card.description}</p>
                      ) : (
                        <div>{card.description}</div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UnifiedWorkLayout;

