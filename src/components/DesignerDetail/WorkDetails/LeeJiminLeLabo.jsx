import React from 'react';
import '../DesignerShowcase.css';

/**
 * 이지민 작품 2 (LE LABO-CITY EXCLUSIVE) 전용 레이아웃 컴포넌트
 * Figma 디자인에 맞춘 구조
 */
const LeeJiminLeLabo = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--leejimin-lelabo">
      {/* Hero Section - 왼쪽 텍스트, 오른쪽 이미지 */}
      <section className="work-detail__section work-detail__hero">
        <div className="work-detail__hero-content">
          <div className="work-detail__hero-text">
            <div className="work-detail__text-group">
              <h2 className="work-detail__title">{work.title || 'LE LABO-CITY EXCLUSIVE'}</h2>
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

      {/* Story Section - Imagine a city */}
      {work.notes && work.notes[0] && (
        <section className="work-detail__section work-detail__text-intro">
          <div className="work-detail__text-intro-header">
            <p className="work-detail__text-intro-label">
              Promotional videos
            </p>
            <h3 className="work-detail__text-intro-title">
              {work.notes[0].title || 'Imagine a city'}
            </h3>
          </div>
          <div className="work-detail__text-intro-description">
            {work.notes[0].description && (
              <p>{work.notes[0].description}</p>
            )}
          </div>
        </section>
      )}

      {/* Feature Sections - Fresh, Woody, Sunset */}
      {work.gallery && work.gallery.length >= 3 && work.notes && work.notes.length >= 4 && (
        <ul className="work-detail__section work-detail__feature-rows">
          <div className="work-detail__feature-rows-list">
            {/* Fresh (이미지 왼쪽, 텍스트 오른쪽) */}
            {work.gallery[0] && work.notes[1] && (
              <li className="work-detail__feature-row">
                <div className="work-detail__image-block">
                  <img src={work.gallery[0].src} alt={work.gallery[0].alt || 'Fresh'} loading="lazy" />
                </div>
                <div className="work-detail__feature-text">
                  <div>
                    <h4 className="work-detail__feature-title">{work.notes[1].title || 'Fresh'}</h4>
                    {work.notes[1].description && (
                      <p>{work.notes[1].description}</p>
                    )}
                  </div>
                </div>
              </li>
            )}

            {/* Woody (텍스트 왼쪽, 이미지 오른쪽) */}
            {work.gallery[1] && work.notes[2] && (
              <li className="work-detail__feature-row work-detail__feature-row--reverse">
                <div className="work-detail__feature-text">
                  <div>
                    <h4 className="work-detail__feature-title">{work.notes[2].title || 'Woody'}</h4>
                    {work.notes[2].description && (
                      <p>{work.notes[2].description}</p>
                    )}
                  </div>
                </div>
                <div className="work-detail__image-block">
                  <img src={work.gallery[1].src} alt={work.gallery[1].alt || 'Woody'} loading="lazy" />
                </div>
              </li>
            )}

            {/* Sunset (이미지 왼쪽, 텍스트 오른쪽) */}
            {work.gallery[2] && work.notes[3] && (
              <li className="work-detail__feature-row">
                <div className="work-detail__image-block">
                  <img src={work.gallery[2].src} alt={work.gallery[2].alt || 'Sunset'} loading="lazy" />
                </div>
                <div className="work-detail__feature-text">
                  <div>
                    <h4 className="work-detail__feature-title">{work.notes[3].title || 'Sunset'}</h4>
                    {work.notes[3].description && (
                      <p>{work.notes[3].description}</p>
                    )}
                  </div>
                </div>
              </li>
            )}
          </div>
        </ul>
      )}

      {/* Feature Section - City Exclusives */}
      {work.gallery && work.gallery[3] && work.notes && work.notes[4] && (
        <section className="work-detail__section work-detail__feature">
          <div className="work-detail__image-block">
            <img src={work.gallery[3].src} alt={work.gallery[3].alt || 'City Exclusives'} loading="lazy" />
          </div>
          <div className="work-detail__feature-text">
            <h4 className="work-detail__feature-title">{work.notes[4].title || 'City Exclusives'}</h4>
            {work.notes[4].description && (
              <p>{work.notes[4].description}</p>
            )}
          </div>
        </section>
      )}

      {/* Feature Cards - CITRON 28, GAIAC 10, MUSC 25 */}
      {work.gallery && work.gallery.length >= 6 && work.notes && work.notes.length >= 7 && (
        <ul className="work-detail__section work-detail__feature-list">
          {/* CITRON 28 */}
          {work.gallery[4] && work.notes[5] && (
            <li className="work-detail__feature-card">
              <div className="work-detail__card-image">
                <img src={work.gallery[4].src} alt={work.gallery[4].alt || 'CITRON 28'} loading="lazy" />
              </div>
              <div className="work-detail__card-text">
                <h5>{work.notes[5].title || 'CITRON 28'}</h5>
                {work.notes[5].description && (
                  <p>{work.notes[5].description}</p>
                )}
              </div>
            </li>
          )}

          {/* GAIAC 10 */}
          {work.gallery[5] && work.notes[6] && (
            <li className="work-detail__feature-card">
              <div className="work-detail__card-image">
                <img src={work.gallery[5].src} alt={work.gallery[5].alt || 'GAIAC 10'} loading="lazy" />
              </div>
              <div className="work-detail__card-text">
                <h5>{work.notes[6].title || 'GAIAC 10'}</h5>
                {work.notes[6].description && (
                  <p>{work.notes[6].description}</p>
                )}
              </div>
            </li>
          )}

          {/* MUSC 25 */}
          {work.gallery[6] && work.notes[7] && (
            <li className="work-detail__feature-card">
              <div className="work-detail__card-image">
                <img src={work.gallery[6].src} alt={work.gallery[6].alt || 'MUSC 25'} loading="lazy" />
              </div>
              <div className="work-detail__card-text">
                <h5>{work.notes[7].title || 'MUSC 25'}</h5>
                {work.notes[7].description && (
                  <p>{work.notes[7].description}</p>
                )}
              </div>
            </li>
          )}
        </ul>
      )}

      {/* Gallery Section - Photo shoot */}
      {work.gallery && work.gallery.length >= 14 && work.notes && work.notes[8] && (
        <section className="work-detail__section work-detail__gallery">
          <div className="work-detail__gallery-header">
            <h3 className="work-detail__gallery-title">{work.notes[8].title || 'Photo shoot'}</h3>
            {work.notes[8].description && (
              <p className="work-detail__gallery-description">{work.notes[8].description}</p>
            )}
          </div>
          <div className="work-detail__gallery-grid">
            {/* Column 1 */}
            <div className="work-detail__gallery-column">
              {work.gallery[7] && (
                <div className="work-detail__gallery-item">
                  <img src={work.gallery[7].src} alt={work.gallery[7].alt || 'Photo shoot'} loading="lazy" />
                </div>
              )}
              {work.gallery[8] && (
                <div className="work-detail__gallery-item">
                  <img src={work.gallery[8].src} alt={work.gallery[8].alt || 'Photo shoot'} loading="lazy" />
                </div>
              )}
            </div>

            {/* Column 2 */}
            <div className="work-detail__gallery-column">
              {work.gallery[9] && (
                <div className="work-detail__gallery-item">
                  <img src={work.gallery[9].src} alt={work.gallery[9].alt || 'Photo shoot'} loading="lazy" />
                </div>
              )}
              {work.gallery[10] && (
                <div className="work-detail__gallery-item">
                  <img src={work.gallery[10].src} alt={work.gallery[10].alt || 'Photo shoot'} loading="lazy" />
                </div>
              )}
              {work.gallery[11] && (
                <div className="work-detail__gallery-item">
                  <img src={work.gallery[11].src} alt={work.gallery[11].alt || 'Photo shoot'} loading="lazy" />
                </div>
              )}
            </div>

            {/* Column 3 */}
            <div className="work-detail__gallery-column">
              {work.gallery[12] && (
                <div className="work-detail__gallery-item">
                  <img src={work.gallery[12].src} alt={work.gallery[12].alt || 'Photo shoot'} loading="lazy" />
                </div>
              )}
              {work.gallery[13] && (
                <div className="work-detail__gallery-item">
                  <img src={work.gallery[13].src} alt={work.gallery[13].alt || 'Photo shoot'} loading="lazy" />
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default LeeJiminLeLabo;

