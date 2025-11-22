import React from 'react';
import '../DesignerShowcase.css';

/**
 * 이운 작품 1 (9e9e9e) 전용 레이아웃 컴포넌트
 * Figma 디자인에 맞춘 구조 (모바일 모드 포함)
 */
const LeeUn9e9e9e = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  // notes 배열에서 필요한 텍스트 추출
  const featureNote = work.notes?.find(note => note.title === '9e9e9e');
  const coreValueNotes = work.notes?.filter(note => 
    ['Cute', 'Unconstrained', 'Joyful', 'Positive'].includes(note.title)
  );

  return (
    <div className="work-detail work-detail--leeun-9e9e9e">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--leeun-9e9e9e">
        <div className="work-detail__hero-content">
          <div className="work-detail__hero-text">
            <div className="work-detail__text-group">
              <div className="work-detail__eyebrow">
                {badgeSrc && <img src={badgeSrc} alt={badgeAlt || work.genre || designer.role || 'Content'} />}
                <span className="work-detail__eyebrow-text">{work.genre || designer.role || 'Content'}</span>
              </div>
              <h2 className="work-detail__title">{work.title || '9e9e9e'}</h2>
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

      {/* Feature Section - 이미지와 텍스트 */}
      {work.gallery && work.gallery[0] && featureNote && (
        <section className="work-detail__section work-detail__feature">
          <div className="work-detail__image-block work-detail__image-block--feature">
            <img src={work.gallery[0].src} alt={work.gallery[0].alt || '9e9e9e'} loading="lazy" />
          </div>
          <div className="work-detail__feature-text">
            <h4 className="work-detail__feature-title">{featureNote.title || '9e9e9e'}</h4>
            {featureNote.description && (
              <p>{featureNote.description}</p>
            )}
          </div>
        </section>
      )}

      {/* Core Value Section */}
      {coreValueNotes && coreValueNotes.length > 0 && (
        <section className="work-detail__section work-detail__testimonial-wall">
          <div className="work-detail__testimonial-header">
            <h3 className="work-detail__testimonial-title">Core Value</h3>
          </div>
          <section className="work-detail__section work-detail__testimonial-grid">
            {coreValueNotes.map((note, index) => {
              const galleryIndex = index + 1;
              const cardImage = work.gallery && work.gallery[galleryIndex];
              
              return (
                <div key={note.title || index} className="work-detail__testimonial-card">
                  <div className="work-detail__testimonial-author">
                    {cardImage && (
                      <div className="work-detail__testimonial-avatar">
                        <img src={cardImage.src} alt={cardImage.alt || note.title} loading="lazy" />
                      </div>
                    )}
                    <div className="work-detail__testimonial-author-info">
                      <p className="work-detail__testimonial-author-name">{note.title || ''}</p>
                      {note.subtitle && (
                        <p className="work-detail__testimonial-author-role">{note.subtitle}</p>
                      )}
                    </div>
                  </div>
                  {note.description && (
                    <div className="work-detail__testimonial-content">
                      <p>{note.description}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        </section>
      )}

      {/* Gallery Section - 9e9e9e Items */}
      {work.gallery && work.gallery.length >= 12 && (
        <section className="work-detail__section work-detail__gallery-section">
          <div className="work-detail__gallery-header">
            <h3 className="work-detail__gallery-title">9e9e9e Items</h3>
          </div>
          <div className="work-detail__gallery-masonry">
            {/* Column 1 */}
            <div className="work-detail__gallery-column">
              {work.gallery[5] && (
                <div className="work-detail__gallery-item">
                  <img src={work.gallery[5].src} alt={work.gallery[5].alt || '9e9e9e Items'} loading="lazy" />
                </div>
              )}
              {work.gallery[6] && (
                <div className="work-detail__gallery-item">
                  <img src={work.gallery[6].src} alt={work.gallery[6].alt || '9e9e9e Items'} loading="lazy" />
                </div>
              )}
            </div>

            {/* Column 2 */}
            <div className="work-detail__gallery-column">
              {work.gallery[7] && (
                <div className="work-detail__gallery-item">
                  <img src={work.gallery[7].src} alt={work.gallery[7].alt || '9e9e9e Items'} loading="lazy" />
                </div>
              )}
              {work.gallery[8] && (
                <div className="work-detail__gallery-item">
                  <img src={work.gallery[8].src} alt={work.gallery[8].alt || '9e9e9e Items'} loading="lazy" />
                </div>
              )}
              {work.gallery[9] && (
                <div className="work-detail__gallery-item">
                  <img src={work.gallery[9].src} alt={work.gallery[9].alt || '9e9e9e Items'} loading="lazy" />
                </div>
              )}
            </div>

            {/* Column 3 */}
            <div className="work-detail__gallery-column">
              {work.gallery[10] && (
                <div className="work-detail__gallery-item">
                  <img src={work.gallery[10].src} alt={work.gallery[10].alt || '9e9e9e Items'} loading="lazy" />
                </div>
              )}
              {work.gallery[11] && (
                <div className="work-detail__gallery-item">
                  <img src={work.gallery[11].src} alt={work.gallery[11].alt || '9e9e9e Items'} loading="lazy" />
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default LeeUn9e9e9e;

