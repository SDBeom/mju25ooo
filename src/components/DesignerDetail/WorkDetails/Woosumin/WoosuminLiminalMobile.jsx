import React from 'react';
import WorkDetailHero from '../WorkDetailHero';
import '../../DesignerShowcase.css';
import '../../styles/works/WoosuminLiminal/WoosuminLiminalMobile.css';

const DEFAULT_FOOTER_TEXT = '새로운 감각의 리미널 가이드에 지속적으로';

const WoosuminLiminalMobile = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  const gallery = Array.isArray(work.gallery) ? work.gallery : [];
  const notes = Array.isArray(work.notes) ? work.notes : [];

  const getGalleryItem = (index) => gallery[index];
  const getNote = (index) => notes[index];

  const renderParagraphs = (text, keyPrefix = 'line') => {
    if (!text) return null;
    return text.split(/\n+/).map((line, idx) => (
      <p key={`${keyPrefix}-${idx}`}>{line.trim()}</p>
    ));
  };

  const renderCtas = () => {
    if (Array.isArray(ctas) && ctas.length > 0) {
      return ctas.map(({ label, onClick, variant = 'primary' }) => (
        <button
          key={label}
          type="button"
          className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'}`}
          onClick={onClick}
        >
          {label}
        </button>
      ));
    }

    return (
      <>
        <button type="button" className="work-detail__cta work-detail__cta--primary">
          디자이너의 다른 작품
        </button>
        <button type="button" className="work-detail__cta work-detail__cta--secondary">
          개인 SNS
        </button>
      </>
    );
  };

  const featureNote = getNote(0);
  const featureImage = getGalleryItem(0);
  const pullQuoteNote = getNote(1);

  const featureCards = [
    { galleryIndex: 1, noteIndex: 2 },
    { galleryIndex: 2, noteIndex: 3 },
    { galleryIndex: 3, noteIndex: 4 },
  ];

  const techCards = [
    { galleryIndex: 4, noteIndex: 5 },
    { galleryIndex: 5, noteIndex: 6 },
    { galleryIndex: 6, noteIndex: 7 },
  ];

  const testimonialCards = Array.from({ length: 7 }).map((_, idx) => ({
    galleryIndex: idx + 7,
    noteIndex: idx + 8,
  }));

  return (
    <div className="work-detail work-detail--woosumin-liminal-mobile">
      {/* Hero */}
      <WorkDetailHero
        work={work}
        designer={designer}
        badgeSrc={badgeSrc}
        badgeAlt={badgeAlt}
        ctas={ctas}
        heroClassName="woosumin-liminal-mobile"
        renderCtas={renderCtas}
        showEyebrow={true}
      />

      {/* Feature Row */}
      {featureImage && featureNote && (
        <section className="work-detail__section work-detail__feature work-detail__feature--alternating">
          <div className="work-detail__image-block">
            <img src={featureImage.src} alt={featureImage.alt || featureNote.title || ''} loading="lazy" />
          </div>
          <div className="work-detail__feature-text">
            {featureNote.title && (
              <h4 className="work-detail__feature-title">{featureNote.title}</h4>
            )}
            {renderParagraphs(featureNote.description, 'feature-note')}
          </div>
        </section>
      )}

      {/* Pull Quote */}
      {pullQuoteNote && (
        <section className="work-detail__section work-detail__pull-quote">
          <div className="work-detail__pull-quote-content">
            {pullQuoteNote.title && (
              <p className="work-detail__pull-quote-title">{pullQuoteNote.title}</p>
            )}
            {pullQuoteNote.description && (
              <p className="work-detail__pull-quote-description">
                {pullQuoteNote.description}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Feature Cards */}
      <section className="work-detail__section">
        <ul className="work-detail__cards-grid">
          {featureCards.map(({ galleryIndex, noteIndex }) => {
            const note = getNote(noteIndex);
            const image = getGalleryItem(galleryIndex);
            if (!note || !image) return null;

            return (
              <li className="work-detail__card" key={`feature-card-${noteIndex}`}>
                <div className="work-detail__card-image">
                  <img
                    src={image.src}
                    alt={image.alt || note.title || `feature-card-${noteIndex}`}
                    loading="lazy"
                  />
                </div>
                <div className="work-detail__card-text">
                  {note.title && (
                    <h5 className="work-detail__card-title">{note.title}</h5>
                  )}
                  {note.description && <p>{note.description}</p>}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Tech Cards */}
      <section className="work-detail__section">
        <ul className="work-detail__cards-grid work-detail__cards-grid--tech">
          {techCards.map(({ galleryIndex, noteIndex }) => {
            const note = getNote(noteIndex);
            const image = getGalleryItem(galleryIndex);
            if (!note || !image) return null;

            return (
              <li className="work-detail__card--tech" key={`tech-card-${noteIndex}`}>
                <article className="work-detail__card--tech-inner">
                  <div className="work-detail__card-text">
                    {note.title && (
                      <h5 className="work-detail__card-title">{note.title}</h5>
                    )}
                    {note.description && <p>{note.description}</p>}
                  </div>
                  <div className="work-detail__card-image--tech">
                    <img
                      src={image.src}
                      alt={image.alt || note.title || `tech-card-${noteIndex}`}
                      loading="lazy"
                    />
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Additional Features */}
      <section className="work-detail__section work-detail__testimonial-wall">
        <div className="work-detail__testimonial-header">
          <h3 className="work-detail__testimonial-title">리미널 가이드의 다양한 기능</h3>
          <p className="work-detail__testimonial-description">
            더욱 깊이 있는 경험을 위한 다양한 콘텐츠
          </p>
        </div>
        <ul className="work-detail__testimonial-grid">
          {testimonialCards.map(({ galleryIndex, noteIndex }) => {
            const note = getNote(noteIndex);
            const image = getGalleryItem(galleryIndex);
            if (!note || !image) return null;

            return (
              <li className="work-detail__testimonial-card" key={`testimonial-${noteIndex}`}>
                <div className="work-detail__testimonial-author">
                  <div className="work-detail__testimonial-avatar">
                    <img
                      src={image.src}
                      alt={image.alt || note.title || '추천 기능 이미지'}
                      loading="lazy"
                    />
                  </div>
                  <div className="work-detail__testimonial-author-info">
                    {note.title && (
                      <p className="work-detail__testimonial-author-name">{note.title}</p>
                    )}
                    {note.subtitle && (
                      <p className="work-detail__testimonial-author-role">{note.subtitle}</p>
                    )}
                  </div>
                </div>
                {note.description && (
                  <p className="work-detail__testimonial-content">{note.description}</p>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {/* Footer Text */}
      <section className="work-detail__section work-detail__liminal-footer">
        <p>{work.footerText || DEFAULT_FOOTER_TEXT}</p>
      </section>
    </div>
  );
};

export default WoosuminLiminalMobile;
