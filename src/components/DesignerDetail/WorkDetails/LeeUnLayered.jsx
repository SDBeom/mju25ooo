import React from 'react';
import '../DesignerShowcase.css';

/**
 * 이운 작품 2 (Layered) 전용 레이아웃 컴포넌트
 * Figma 디자인에 맞춘 구조
 */
const LeeUnLayered = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  // notes 배열에서 필요한 텍스트 추출
  const introNote = work.notes?.[0]; // "Layered" 소개
  const featureNotes = work.notes?.slice(1, 5) || []; // Self-Expression, Rich, Flexibility, Sustainability
  const cardNotes = work.notes?.slice(5, 8) || []; // package, brand book, gift box
  const bentoNotes = work.notes?.slice(8, 10) || []; // brand tag, Web

  // Gallery 이미지 인덱스
  // LOOK gallery: gallery[0-6] (7개)
  // Feature rows: gallery[7-10] (4개)
  // Cards: gallery[11-13] (3개)
  // Bento: gallery[14-15] (2개)

  return (
    <div className="work-detail work-detail--leeun-layered">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--leeun-layered">
        <div className="work-detail__hero-content">
          <div className="work-detail__hero-text">
            <div className="work-detail__text-group">
              <div className="work-detail__eyebrow">
                {badgeSrc && <img src={badgeSrc} alt={badgeAlt || work.genre || designer.role || 'Content'} />}
                <span className="work-detail__eyebrow-text">{work.genre || designer.role || 'Content'}</span>
              </div>
              <h2 className="work-detail__title">{work.title || 'Layered'}</h2>
              <p className="work-detail__lead">{work.summary || ''}</p>
            </div>
            <div className="work-detail__ctas">
              {ctas && Array.isArray(ctas) && ctas.length > 0 ? (
                ctas.map(({ label, onClick, variant = 'primary' }) => (
                  <button
                    key={label}
                    type="button"
                    className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'}`}
                    onClick={onClick}
                  >
                    {label}
                  </button>
                ))
              ) : null}
            </div>
          </div>
          {work.thumbnail && (
            <div className="work-detail__hero-media">
              <img src={work.thumbnail} alt={`${work.title || '작품'} 대표 장면`} loading="lazy" />
            </div>
          )}
        </div>
      </section>

      {/* Text Intro Section */}
      {introNote && (
        <section className="work-detail__section work-detail__text-intro work-detail__section--leeun-1">
          <div className="work-detail__text-intro-header">
            <p className="work-detail__text-intro-label">컨셔스 패션 브랜드</p>
            <h3 className="work-detail__text-intro-title">{introNote.title || 'Layered'}</h3>
          </div>
          <div className="work-detail__text-intro-description">
            {introNote.description && introNote.description.split('\n').map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </section>
      )}

      {/* LOOK Gallery Section */}
      {work.gallery && work.gallery.length >= 7 && (
        <section className="work-detail__section work-detail__gallery-section work-detail__section--leeun-2">
          <div className="work-detail__gallery-header">
            <h3 className="work-detail__gallery-title">LOOK</h3>
          </div>
          <div className="work-detail__gallery-masonry">
            {/* Column 1 */}
            <div className="work-detail__gallery-column">
              {work.gallery[0] && (
                <div className="work-detail__gallery-item">
                  <img src={work.gallery[0].src} alt={work.gallery[0].alt || 'LOOK'} loading="lazy" />
                </div>
              )}
              {work.gallery[1] && (
                <div className="work-detail__gallery-item">
                  <img src={work.gallery[1].src} alt={work.gallery[1].alt || 'LOOK'} loading="lazy" />
                </div>
              )}
            </div>

            {/* Column 2 */}
            <div className="work-detail__gallery-column">
              {work.gallery[2] && (
                <div className="work-detail__gallery-item">
                  <img src={work.gallery[2].src} alt={work.gallery[2].alt || 'LOOK'} loading="lazy" />
                </div>
              )}
              {work.gallery[3] && (
                <div className="work-detail__gallery-item">
                  <img src={work.gallery[3].src} alt={work.gallery[3].alt || 'LOOK'} loading="lazy" />
                </div>
              )}
              {work.gallery[4] && (
                <div className="work-detail__gallery-item">
                  <img src={work.gallery[4].src} alt={work.gallery[4].alt || 'LOOK'} loading="lazy" />
                </div>
              )}
            </div>

            {/* Column 3 */}
            <div className="work-detail__gallery-column">
              {work.gallery[5] && (
                <div className="work-detail__gallery-item">
                  <img src={work.gallery[5].src} alt={work.gallery[5].alt || 'LOOK'} loading="lazy" />
                </div>
              )}
              {work.gallery[6] && (
                <div className="work-detail__gallery-item">
                  <img src={work.gallery[6].src} alt={work.gallery[6].alt || 'LOOK'} loading="lazy" />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Feature Rows Section */}
      {work.gallery && work.gallery.length >= 11 && featureNotes.length >= 4 && (
        <section className="work-detail__section work-detail__feature-rows work-detail__section--leeun-3">
          <div className="work-detail__feature-rows-list">
            {/* Row 1: Self-Expression */}
            {work.gallery[7] && featureNotes[0] && (
              <div className="work-detail__feature-row">
                <div className="work-detail__image-block">
                  <img src={work.gallery[7].src} alt={work.gallery[7].alt || featureNotes[0].title} loading="lazy" />
                </div>
                <div className="work-detail__feature-text">
                  <div>
                    <h4 className="work-detail__feature-title">{featureNotes[0].title || 'Self-Expression'}</h4>
                    {featureNotes[0].description && (
                      <p>{featureNotes[0].description}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Row 2: Rich (reverse) */}
            {work.gallery[8] && featureNotes[1] && (
              <div className="work-detail__feature-row work-detail__feature-row--reverse">
                <div className="work-detail__image-block">
                  <img src={work.gallery[8].src} alt={work.gallery[8].alt || featureNotes[1].title} loading="lazy" />
                </div>
                <div className="work-detail__feature-text">
                  <div>
                    <h4 className="work-detail__feature-title">{featureNotes[1].title || 'Rich'}</h4>
                    {featureNotes[1].description && (
                      <p>{featureNotes[1].description}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Row 3: Flexibility */}
            {work.gallery[9] && featureNotes[2] && (
              <div className="work-detail__feature-row">
                <div className="work-detail__image-block">
                  <img src={work.gallery[9].src} alt={work.gallery[9].alt || featureNotes[2].title} loading="lazy" />
                </div>
                <div className="work-detail__feature-text">
                  <div>
                    <h4 className="work-detail__feature-title">{featureNotes[2].title || 'Flexibility'}</h4>
                    {featureNotes[2].description && (
                      <p>{featureNotes[2].description}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Row 4: Sustainability (reverse) */}
            {work.gallery[10] && featureNotes[3] && (
              <div className="work-detail__feature-row work-detail__feature-row--reverse">
                <div className="work-detail__image-block">
                  <img src={work.gallery[10].src} alt={work.gallery[10].alt || featureNotes[3].title} loading="lazy" />
                </div>
                <div className="work-detail__feature-text">
                  <div>
                    <h4 className="work-detail__feature-title">{featureNotes[3].title || 'Sustainability'}</h4>
                    {featureNotes[3].description && (
                      <p>{featureNotes[3].description}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Feature Cards Section */}
      {work.gallery && work.gallery.length >= 14 && cardNotes.length >= 3 && (
        <section className="work-detail__section work-detail__cards work-detail__section--leeun-4">
          <div className="work-detail__section work-detail__cards-grid work-detail__cards-grid--leeun-4">
            {[0, 1, 2].map((index) => {
              const galleryIndex = 11 + index;
              const cardImage = work.gallery[galleryIndex];
              const cardNote = cardNotes[index];
              
              if (!cardImage || !cardNote) return null;
              
              return (
                <div key={index} className="work-detail__card">
                  <div className="work-detail__card-image">
                    <img src={cardImage.src} alt={cardImage.alt || cardNote.title} loading="lazy" />
                  </div>
                  <div className="work-detail__card-text">
                    <h5 className="work-detail__card-title">{cardNote.title || ''}</h5>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Bento Cards Section */}
      {work.gallery && work.gallery.length >= 16 && bentoNotes.length >= 2 && (
        <section className="work-detail__section work-detail__cards work-detail__section--leeun-5">
          <div className="work-detail__section work-detail__cards-grid work-detail__cards-grid--bento work-detail__cards-grid--leeun-5">
            {[0, 1].map((index) => {
              const galleryIndex = 14 + index;
              const bentoImage = work.gallery[galleryIndex];
              const bentoNote = bentoNotes[index];
              
              if (!bentoImage || !bentoNote) return null;
              
              return (
                <div 
                  key={index} 
                  className={`work-detail__card work-detail__card--bento-${index + 1}`}
                >
                  <div className="work-detail__card-image">
                    <img src={bentoImage.src} alt={bentoImage.alt || bentoNote.title} loading="lazy" />
                  </div>
                  <div className="work-detail__card-text">
                    <h5 className="work-detail__card-title">{bentoNote.title || ''}</h5>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

export default LeeUnLayered;

