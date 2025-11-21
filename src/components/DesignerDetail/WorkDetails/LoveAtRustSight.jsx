import React from 'react';
import '../DesignerShowcase.css';

const LoveAtRustSight = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  return (
    <div className="work-detail work-detail--love-at-rust-sight">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--love-at-rust-sight">
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

      {/* Feature 1: First Gallery Image + Description */}
      {work.gallery[0] && (
        <section className="work-detail__section work-detail__feature work-detail__feature--1">
          <div className="work-detail__image-block work-detail__image-block--1">
            <img src={work.gallery[0].src} alt={work.gallery[0].alt} loading="lazy" />
          </div>
          <div className="work-detail__feature-text">
            <p>{work.description}</p>
          </div>
        </section>
      )}

      {/* Feature 2: Second Gallery Image + Caption */}
      {work.gallery[1] && (
        <section className="work-detail__section work-detail__feature work-detail__feature--2">
          <div className="work-detail__image-block work-detail__image-block--2">
            <img src={work.gallery[1].src} alt={work.gallery[1].alt} loading="lazy" />
          </div>
          {work.gallery[1].caption && (
            <div className="work-detail__feature-text">
              <p>{work.gallery[1].caption}</p>
            </div>
          )}
        </section>
      )}

      {/* Feature 3: Third Gallery Image (Media Only) */}
      {work.gallery[2] && (
        <section className="work-detail__section work-detail__feature work-detail__feature--media-only work-detail__feature--3">
          <div className="work-detail__image-block work-detail__image-block--3">
            <img src={work.gallery[2].src} alt={work.gallery[2].alt} loading="lazy" />
          </div>
        </section>
      )}

      {/* Feature 4: Fourth Gallery Image (Media Only, Centered) */}
      {work.gallery[3] && (
        <section className="work-detail__section work-detail__feature work-detail__feature--media-only work-detail__feature--4">
          <div className="work-detail__image-block work-detail__image-block--4">
            <img src={work.gallery[3].src} alt={work.gallery[3].alt} loading="lazy" />
          </div>
        </section>
      )}

      {/* Feature 5: Fifth Gallery Image (Media Only) */}
      {work.gallery[4] && (
        <section className="work-detail__section work-detail__feature work-detail__feature--media-only work-detail__feature--5">
          <div className="work-detail__image-block work-detail__image-block--5">
            <img src={work.gallery[4].src} alt={work.gallery[4].alt} loading="lazy" />
          </div>
        </section>
      )}
    </div>
  );
};

export default LoveAtRustSight;

