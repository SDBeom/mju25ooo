import React from 'react';
import '../DesignerShowcase.css';

const GoFetch = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  return (
    <div className="work-detail work-detail--go-fetch">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--go-fetch">
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

      {/* Feature 1: First Gallery Image + Note (To The End, For You) */}
      {work.gallery && work.gallery[0] && work.notes && work.notes[0] && (
        <section className="work-detail__section work-detail__feature work-detail__feature--1">
          <div className="work-detail__image-block work-detail__image-block--1">
            <img src={work.gallery[0].src} alt={work.gallery[0].alt} loading="lazy" />
          </div>
          <div className="work-detail__feature-text">
            <h4 className="work-detail__feature-title">{work.notes[0].title}</h4>
            <p>{work.notes[0].description}</p>
          </div>
        </section>
      )}

      {/* Feature Cards 1: NURI, GAON, Spaceship RN-42 */}
      {work.gallery && work.gallery.length >= 4 && work.notes && work.notes.length >= 4 && (
        <section className="work-detail__section work-detail__cards work-detail__cards--gofetch-characters">
          {/* Card 1: NURI */}
          {work.gallery[1] && work.notes[1] && (
            <div className="work-detail__card work-detail__card--1">
              <div className="work-detail__card-image">
                <img src={work.gallery[1].src} alt={work.gallery[1].alt || ''} loading="lazy" />
              </div>
              <div className="work-detail__card-text">
                <h5 className="work-detail__card-title">{work.notes[1].title}</h5>
                <p>{work.notes[1].description}</p>
              </div>
            </div>
          )}
          {/* Card 2: GAON */}
          {work.gallery[2] && work.notes[2] && (
            <div className="work-detail__card work-detail__card--2">
              <div className="work-detail__card-image">
                <img src={work.gallery[2].src} alt={work.gallery[2].alt || ''} loading="lazy" />
              </div>
              <div className="work-detail__card-text">
                <h5 className="work-detail__card-title">{work.notes[2].title}</h5>
                <p>{work.notes[2].description}</p>
              </div>
            </div>
          )}
          {/* Card 3: Spaceship RN-42 */}
          {work.gallery[3] && work.notes[3] && (
            <div className="work-detail__card work-detail__card--3">
              <div className="work-detail__card-image">
                <img src={work.gallery[3].src} alt={work.gallery[3].alt || ''} loading="lazy" />
              </div>
              <div className="work-detail__card-text">
                <h5 className="work-detail__card-title">{work.notes[3].title}</h5>
                <p>{work.notes[3].description}</p>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Feature Gallery: Inciting Incident */}
      {work.gallery && work.gallery.length >= 12 && work.notes && work.notes[4] && (
        <section className="work-detail__section work-detail__feature-gallery work-detail__feature-gallery--inciting">
          <div className="work-detail__feature-gallery-header">
            <h3 className="work-detail__feature-gallery-title">{work.notes[4].title}</h3>
            <p className="work-detail__feature-gallery-description">{work.notes[4].description}</p>
          </div>
          <div className="work-detail__feature-gallery-grid">
            {/* Column 1 */}
            <div className="work-detail__feature-gallery-column">
              {work.gallery[4] && (
                <div className="work-detail__image-block">
                  <img src={work.gallery[4].src} alt={work.gallery[4].alt || ''} loading="lazy" />
                </div>
              )}
              {work.gallery[5] && (
                <div className="work-detail__image-block">
                  <img src={work.gallery[5].src} alt={work.gallery[5].alt || ''} loading="lazy" />
                </div>
              )}
            </div>
            {/* Column 2 */}
            <div className="work-detail__feature-gallery-column">
              {work.gallery[6] && (
                <div className="work-detail__image-block">
                  <img src={work.gallery[6].src} alt={work.gallery[6].alt || ''} loading="lazy" />
                </div>
              )}
              {work.gallery[7] && (
                <div className="work-detail__image-block">
                  <img src={work.gallery[7].src} alt={work.gallery[7].alt || ''} loading="lazy" />
                </div>
              )}
              {work.gallery[8] && (
                <div className="work-detail__image-block">
                  <img src={work.gallery[8].src} alt={work.gallery[8].alt || ''} loading="lazy" />
                </div>
              )}
            </div>
            {/* Column 3 */}
            <div className="work-detail__feature-gallery-column">
              {work.gallery[9] && (
                <div className="work-detail__image-block">
                  <img src={work.gallery[9].src} alt={work.gallery[9].alt || ''} loading="lazy" />
                </div>
              )}
              {work.gallery[10] && (
                <div className="work-detail__image-block">
                  <img src={work.gallery[10].src} alt={work.gallery[10].alt || ''} loading="lazy" />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Feature Cards 2: Farewell, Journey, Crisis */}
      {work.gallery && work.gallery.length >= 15 && work.notes && work.notes.length >= 8 && (
        <section className="work-detail__section work-detail__cards work-detail__cards--gofetch-scenes">
          {/* Card 1: Farewell */}
          {work.gallery[11] && work.notes[5] && (
            <div className="work-detail__card work-detail__card--1">
              <div className="work-detail__card-image">
                <img src={work.gallery[11].src} alt={work.gallery[11].alt || ''} loading="lazy" />
              </div>
              <div className="work-detail__card-text">
                <h5 className="work-detail__card-title">{work.notes[5].title}</h5>
                <p>{work.notes[5].description}</p>
              </div>
            </div>
          )}
          {/* Card 2: Journey */}
          {work.gallery[12] && work.notes[6] && (
            <div className="work-detail__card work-detail__card--2">
              <div className="work-detail__card-image">
                <img src={work.gallery[12].src} alt={work.gallery[12].alt || ''} loading="lazy" />
              </div>
              <div className="work-detail__card-text">
                <h5 className="work-detail__card-title">{work.notes[6].title}</h5>
                <p>{work.notes[6].description}</p>
              </div>
            </div>
          )}
          {/* Card 3: Crisis */}
          {work.gallery[13] && work.notes[7] && (
            <div className="work-detail__card work-detail__card--3">
              <div className="work-detail__card-image">
                <img src={work.gallery[13].src} alt={work.gallery[13].alt || ''} loading="lazy" />
              </div>
              <div className="work-detail__card-text">
                <h5 className="work-detail__card-title">{work.notes[7].title}</h5>
                <p>{work.notes[7].description}</p>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default GoFetch;

