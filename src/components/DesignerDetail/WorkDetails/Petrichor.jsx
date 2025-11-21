import React from 'react';
import '../DesignerShowcase.css';

const Petrichor = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  return (
    <div className="work-detail work-detail--petrichor">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--petrichor">
        <div className="work-detail__hero-content">
          <div className="work-detail__hero-text">
            <div className="work-detail__text-group">
              <div className="work-detail__eyebrow">
                {badgeSrc && <img src={badgeSrc} alt={badgeAlt || work.genre || designer.role || 'Content'} />}
                <span className="work-detail__eyebrow-text">{work.genre || designer.role || 'Content'}</span>
              </div>
              <h2 className="work-detail__title">{work.title}</h2>
              <p className="work-detail__lead">{work.summary}</p>
            </div>
            <div className="work-detail__ctas">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'}`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          {work.thumbnail && (
            <div className="work-detail__hero-media">
              <img src={work.thumbnail} alt={`${work.title} 대표 장면`} loading="lazy" />
            </div>
          )}
        </div>
      </section>

      {/* Feature 2 Section: Rows + Bento Cards */}
      {work.gallery && work.gallery.length >= 5 && work.notes && work.notes.length >= 5 && (
        <section className="work-detail__section work-detail__feature-list">
          {/* Row 1: The Discovery of Hope */}
          {work.gallery[0] && work.notes[0] && (
            <section className="work-detail__feature-row work-detail__feature-row--1">
              <div className="work-detail__feature-image">
                <img src={work.gallery[0].src} alt={work.gallery[0].alt || ''} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                <h4 className="work-detail__feature-title">{work.notes[0].title}</h4>
                <p>{work.notes[0].description}</p>
              </div>
            </section>
          )}

          {/* Row 2: The Beginning of the Journey */}
          {work.gallery[1] && work.notes[1] && (
            <section className="work-detail__feature-row work-detail__feature-row--2">
              <div className="work-detail__feature-image">
                <img src={work.gallery[1].src} alt={work.gallery[1].alt || ''} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                <h4 className="work-detail__feature-title">{work.notes[1].title}</h4>
                <p>{work.notes[1].description}</p>
              </div>
            </section>
          )}

          {/* Bento Cards */}
          <section className="relative shrink-0 w-full">
            <section className="work-detail__cards--bento">
              {/* Card 1: A Parched World */}
              {work.gallery[2] && work.notes[2] && (
                <div className="work-detail__card--bento work-detail__card--1">
                  <div className="work-detail__card-image">
                    <img src={work.gallery[2].src} alt={work.gallery[2].alt || ''} loading="lazy" />
                  </div>
                  <div className="work-detail__card-text">
                    <h5 className="work-detail__card-title">{work.notes[2].title}</h5>
                    <p>{work.notes[2].description}</p>
                  </div>
                </div>
              )}

              {/* Card 2: A Forsaken World */}
              {work.gallery[3] && work.notes[3] && (
                <div className="work-detail__card--bento work-detail__card--2">
                  <div className="work-detail__card-image">
                    <img src={work.gallery[3].src} alt={work.gallery[3].alt || ''} loading="lazy" />
                  </div>
                  <div className="work-detail__card-text">
                    <h5 className="work-detail__card-title">{work.notes[3].title}</h5>
                    <p>{work.notes[3].description}</p>
                  </div>
                </div>
              )}

              {/* Card 3: A World Being Buried */}
              {work.gallery[4] && work.notes[4] && (
                <div className="work-detail__card--bento work-detail__card--3">
                  <div className="work-detail__card-image">
                    <img src={work.gallery[4].src} alt={work.gallery[4].alt || ''} loading="lazy" />
                  </div>
                  <div className="work-detail__card-text">
                    <h5 className="work-detail__card-title">{work.notes[4].title}</h5>
                    <p>{work.notes[4].description}</p>
                  </div>
                </div>
              )}
            </section>
          </section>
        </section>
      )}

      {/* Feature 3: Final Section - And Then, the Discovery */}
      {work.gallery && work.gallery[5] && work.notes && work.notes[5] && (
        <section className="work-detail__section work-detail__feature--final">
          <div className="work-detail__feature-image--large">
            <img src={work.gallery[5].src} alt={work.gallery[5].alt || ''} loading="lazy" />
          </div>
          <div className="work-detail__feature-text">
            <h4 className="work-detail__feature-title">{work.notes[5].title}</h4>
            <p>{work.notes[5].description}</p>
          </div>
        </section>
      )}
    </div>
  );
};

export default Petrichor;
