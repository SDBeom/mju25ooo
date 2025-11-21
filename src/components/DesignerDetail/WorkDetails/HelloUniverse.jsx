import React from 'react';
import '../DesignerShowcase.css';

const HelloUniverse = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  return (
    <div className="work-detail work-detail--hello-universe">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--hello-universe">
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
      {work.gallery && work.gallery[0] && (
        <section className="work-detail__section work-detail__feature work-detail__feature--1">
          <div className="work-detail__image-block work-detail__image-block--1">
            <img src={work.gallery[0].src} alt={work.gallery[0].alt} loading="lazy" />
          </div>
          <div className="work-detail__feature-text">
            <p>{work.description}</p>
          </div>
        </section>
      )}

      {/* Bento Cards Section: 3 cards with images and notes */}
      {work.notes && work.notes.length >= 3 && work.gallery && work.gallery.length >= 5 && (
        <section className="work-detail__section work-detail__cards">
          <ul className="work-detail__cards-grid">
            {/* Card 1 */}
            {work.gallery[1] && work.notes[0] && (
              <li className="work-detail__card work-detail__card--1">
                <div className="work-detail__card-image">
                  <img src={work.gallery[1].src} alt={work.gallery[1].alt || ''} loading="lazy" />
                </div>
                <div className="work-detail__card-text">
                  <p>{work.notes[0]}</p>
                </div>
              </li>
            )}
            {/* Card 2 */}
            {work.gallery[3] && work.notes[1] && (
              <li className="work-detail__card work-detail__card--2">
                <div className="work-detail__card-image">
                  <img src={work.gallery[3].src} alt={work.gallery[3].alt || ''} loading="lazy" />
                </div>
                <div className="work-detail__card-text">
                  <p>{work.notes[1]}</p>
                </div>
              </li>
            )}
            {/* Card 3 */}
            {work.gallery[4] && work.notes[2] && (
              <li className="work-detail__card work-detail__card--3">
                <div className="work-detail__card-image">
                  <img src={work.gallery[4].src} alt={work.gallery[4].alt || ''} loading="lazy" />
                </div>
                <div className="work-detail__card-text">
                  <p>{work.notes[2]}</p>
                </div>
              </li>
            )}
          </ul>
        </section>
      )}

      {/* Feature 3: Page_021.png (Media Only) */}
      {work.gallery && work.gallery[5] && (
        <section className="work-detail__section work-detail__feature work-detail__feature--media-only work-detail__feature--3">
          <div className="work-detail__image-block work-detail__image-block--3">
            <img src={work.gallery[5].src} alt={work.gallery[5].alt} loading="lazy" />
          </div>
        </section>
      )}

      {/* Feature 4: Page_031.png (Media Only) */}
      {work.gallery && work.gallery[6] && (
        <section className="work-detail__section work-detail__feature work-detail__feature--media-only work-detail__feature--4">
          <div className="work-detail__image-block work-detail__image-block--4">
            <img src={work.gallery[6].src} alt={work.gallery[6].alt} loading="lazy" />
          </div>
        </section>
      )}

      {/* Feature 5: Page_036.png (Media Only) */}
      {work.gallery && work.gallery[7] && (
        <section className="work-detail__section work-detail__feature work-detail__feature--media-only work-detail__feature--5">
          <div className="work-detail__image-block work-detail__image-block--5">
            <img src={work.gallery[7].src} alt={work.gallery[7].alt} loading="lazy" />
          </div>
        </section>
      )}
    </div>
  );
};

export default HelloUniverse;

