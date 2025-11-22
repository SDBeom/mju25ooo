import React from 'react';
import '../DesignerShowcase.css';

/**
 * 이지민 작품 1 (Veneti) 전용 레이아웃 컴포넌트
 * Figma 디자인에 맞춘 구조
 */
const LeeJiminVeneti = ({ work, designer, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--leejimin-veneti">
      {/* Hero Section - 왼쪽 텍스트, 오른쪽 이미지 */}
      <section className="work-detail__section work-detail__hero">
        <div className="work-detail__hero-content">
          <div className="work-detail__hero-text">
            <div className="work-detail__text-group">
              <h2 className="work-detail__title">{work.title || 'Veneti'}</h2>
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

      {/* Story Section - Dream of freedom */}
      {work.notes && work.notes[0] && (
        <section className="work-detail__section work-detail__text-intro">
          <div className="work-detail__text-intro-header">
            <p className="work-detail__text-intro-label">
              The story of an octopus witch
            </p>
            <h3 className="work-detail__text-intro-title">
              {work.notes[0].title || 'Dream of freedom'}
            </h3>
          </div>
          <div className="work-detail__text-intro-description">
            {work.notes[0].description && work.notes[0].description.split('\n').map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </section>
      )}

      {/* Feature Section - Book cover */}
      {work.gallery && work.gallery[0] && work.notes && work.notes[1] && (
        <section className="work-detail__section work-detail__feature">
          <div className="work-detail__image-block">
            <img src={work.gallery[0].src} alt={work.gallery[0].alt || 'Book cover'} loading="lazy" />
          </div>
          <div className="work-detail__feature-text">
            <h4 className="work-detail__feature-title">{work.notes[1].title || 'Book cover'}</h4>
            <p>{work.notes[1].description || ''}</p>
          </div>
        </section>
      )}

      {/* Feature Cards - Poster, Postcard, Illustration */}
      {work.gallery && work.gallery.length >= 4 && work.notes && work.notes.length >= 5 && (
        <section className="work-detail__section work-detail__feature-list">
          {/* Poster */}
          {work.gallery[1] && work.notes[2] && (
            <div className="work-detail__feature-card">
              <div className="work-detail__card-image">
                <img src={work.gallery[1].src} alt={work.gallery[1].alt || 'Poster'} loading="lazy" />
              </div>
              <div className="work-detail__card-text">
                <h5>{work.notes[2].title || 'Poster'}</h5>
                {work.notes[2].description && work.notes[2].description.split('\n').map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            </div>
          )}

          {/* Postcard */}
          {work.gallery[2] && work.notes[3] && (
            <div className="work-detail__feature-card">
              <div className="work-detail__card-image">
                <img src={work.gallery[2].src} alt={work.gallery[2].alt || 'Postcard'} loading="lazy" />
              </div>
              <div className="work-detail__card-text">
                <h5>{work.notes[3].title || 'Postcard'}</h5>
                {work.notes[3].description && work.notes[3].description.split('\n').map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            </div>
          )}

          {/* Illustration */}
          {work.gallery[3] && work.notes[4] && (
            <div className="work-detail__feature-card">
              <div className="work-detail__card-image">
                <img src={work.gallery[3].src} alt={work.gallery[3].alt || 'Illustration'} loading="lazy" />
              </div>
              <div className="work-detail__card-text">
                <h5>{work.notes[4].title || 'Illustration'}</h5>
                {work.notes[4].description && work.notes[4].description.split('\n').map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Bento Grid Section */}
      {work.gallery && work.gallery.length >= 7 && work.notes && work.notes.length >= 8 && (
        <section className="work-detail__section work-detail__bento">
          <div className="work-detail__bento-grid">
            {/* Left Column */}
            <div className="work-detail__bento-column">
              {/* This outstanding object */}
              {work.gallery[4] && work.notes[5] && (
                <div className="work-detail__bento-card work-detail__bento-card--center">
                  <div className="work-detail__bento-card-image">
                    <img src={work.gallery[4].src} alt={work.gallery[4].alt || 'This outstanding object'} loading="lazy" />
                  </div>
                </div>
              )}

              {/* Skate Board */}
              {work.gallery[5] && work.notes[6] && (
                <div className="work-detail__bento-card">
                  <div className="work-detail__bento-card-text">
                    <h5>{work.notes[6].title || 'Skate Board'}</h5>
                    {work.notes[6].description && work.notes[6].description.split('\n').map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                  <div className="work-detail__bento-card-image">
                    <img src={work.gallery[5].src} alt={work.gallery[5].alt || 'Skate Board'} loading="lazy" />
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Character */}
            {work.gallery[6] && work.notes[7] && (
              <div className="work-detail__bento-card work-detail__bento-card--large">
                <div className="work-detail__bento-card-image">
                  <img src={work.gallery[6].src} alt={work.gallery[6].alt || 'Character'} loading="lazy" />
                </div>
                <div className="work-detail__bento-card-text">
                  <h5>{work.notes[7].title || 'Character'}</h5>
                  {work.notes[7].description && work.notes[7].description.split('\n').map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Gallery Section - Artbook */}
      {work.gallery && work.gallery.length >= 15 && work.notes && work.notes[8] && (
        <section className="work-detail__section work-detail__gallery">
          <div className="work-detail__gallery-header">
            <h3 className="work-detail__gallery-title">{work.notes[8].title || 'Artbook'}</h3>
            <p className="work-detail__gallery-description">{work.notes[8].description || ''}</p>
          </div>
          <div className="work-detail__gallery-grid">
            {/* Column 1 */}
            <div className="work-detail__gallery-column">
              {work.gallery[7] && (
                <div className="work-detail__gallery-item">
                  <img src={work.gallery[7].src} alt={work.gallery[7].alt || 'Artbook'} loading="lazy" />
                </div>
              )}
              {work.gallery[8] && (
                <div className="work-detail__gallery-item">
                  <img src={work.gallery[8].src} alt={work.gallery[8].alt || 'Artbook'} loading="lazy" />
                </div>
              )}
            </div>

            {/* Column 2 */}
            <div className="work-detail__gallery-column">
              {work.gallery[9] && (
                <div className="work-detail__gallery-item">
                  <img src={work.gallery[9].src} alt={work.gallery[9].alt || 'Artbook'} loading="lazy" />
                </div>
              )}
              {work.gallery[10] && (
                <div className="work-detail__gallery-item">
                  <img src={work.gallery[10].src} alt={work.gallery[10].alt || 'Artbook'} loading="lazy" />
                </div>
              )}
              {work.gallery[11] && (
                <div className="work-detail__gallery-item">
                  <img src={work.gallery[11].src} alt={work.gallery[11].alt || 'Artbook'} loading="lazy" />
                </div>
              )}
            </div>

            {/* Column 3 */}
            <div className="work-detail__gallery-column">
              {work.gallery[12] && (
                <div className="work-detail__gallery-item">
                  <img src={work.gallery[12].src} alt={work.gallery[12].alt || 'Artbook'} loading="lazy" />
                </div>
              )}
              {work.gallery[13] && (
                <div className="work-detail__gallery-item">
                  <img src={work.gallery[13].src} alt={work.gallery[13].alt || 'Artbook'} loading="lazy" />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Quote Section */}
      {work.gallery && work.gallery.length >= 15 && work.gallery[14] && (
        <section className="work-detail__section work-detail__quote">
          <div className="work-detail__quote-text">
            <h3>"이 캐릭터가 단순한 조형물이 아닌, 살아 숨 쉬는 존재로</h3>
            <h3>확장되는 그날을 꿈꾸며 이 여정을 이어갈 것입니다."</h3>
          </div>
          <div className="work-detail__quote-author">
            <div className="work-detail__quote-avatar">
              <img src={work.gallery[14].src} alt={designer.displayName || '이지민'} loading="lazy" />
            </div>
            <div className="work-detail__quote-author-info">
              <p className="work-detail__quote-author-name">{designer.displayName || '이지민'}</p>
              <p className="work-detail__quote-author-role">제 24회 영상애니메이션디자인전공 졸업생</p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default LeeJiminVeneti;

