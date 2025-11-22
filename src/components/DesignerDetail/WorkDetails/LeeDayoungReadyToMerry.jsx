
import React from 'react';
import '../DesignerShowcase.css';

/**
 * 이다영 작품 1 (Ready to Merry) 전용 레이아웃 컴포넌트
 * Figma 디자인에 맞춘 구조
 */
const LeeDayoungReadyToMerry = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  // notes 배열에서 필요한 텍스트 추출
  const introNote = work.notes?.[0]; // "COUNTDOWN TO WISHFUL CHRISTMAS"
  const featureNote = work.notes?.[1]; // "Are you ready to Merry?"
  const textBlockNotes = work.notes?.slice(2, 5) || []; // 3개의 텍스트 블록 (재해석한 곡들, 다양한 형태의 포스터, 앨범 3D 패키징 영상)
  const goodsNotes = work.notes?.slice(5, 9) || []; // Postcard, Lyrics Paper, Sticker Pack, Acrylic Keyring
  const posterNotes = work.notes?.slice(9, 12) || []; // 3개의 포스터 (전단지형, 캘린더형, 앨범 사양)
  const videoNotes = work.notes?.slice(12, 15) || []; // 3개의 비디오 관련 노트 (앨범 굿즈 형태, 곡의 분위기, 앨범의 콘셉트)

  return (
    <div className="work-detail work-detail--leedayoung-ready-to-merry">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--leedayoung-ready-to-merry">
        <div className="work-detail__hero-content">
          <div className="work-detail__hero-text">
            <div className="work-detail__text-group">
              <div className="work-detail__eyebrow">
                {badgeSrc && <img src={badgeSrc} alt={badgeAlt || work.genre || designer.role || 'Content'} />}
                <span className="work-detail__eyebrow-text">{work.genre || designer.role || 'Content'}</span>
              </div>
              <h2 className="work-detail__title">{work.title || 'Ready to Merry'}</h2>
              {work.meta && (
                <p className="work-detail__meta">{work.meta}</p>
              )}
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
        <section className="work-detail__section work-detail__text-intro">
          <div className="work-detail__text-intro-header">
            <p className="work-detail__text-intro-label">Christmas Carol Archiving Album</p>
            <h3 className="work-detail__text-intro-title">COUNTDOWN TO WISHFUL CHRISTMAS</h3>
          </div>
          <div className="work-detail__text-intro-description">
            {introNote.description && introNote.description.split('\n').map((line, idx) => (
              <p key={idx}>{line}</p>
            ))}
          </div>
        </section>
      )}

      {/* Feature Section - Are you ready to Merry? */}
      {work.gallery && work.gallery[0] && featureNote && (
        <section className="work-detail__section work-detail__feature">
          <div className="work-detail__image-block work-detail__image-block--feature">
            <img src={work.gallery[0].src} alt={work.gallery[0].alt || featureNote.title} loading="lazy" />
          </div>
          <div className="work-detail__feature-text">
            <h4 className="work-detail__feature-title">{featureNote.title || 'Are you ready to Merry?'}</h4>
            {featureNote.description && (
              <p>{featureNote.description}</p>
            )}
          </div>
        </section>
      )}

      {/* Text Row Section */}
      {textBlockNotes.length >= 3 && (
        <section className="work-detail__section work-detail__text-blocks">
          <div className="work-detail__text-blocks-list">
            {textBlockNotes.map((note, index) => (
              <div key={index} className="work-detail__text-block">
                <h5 className="work-detail__text-block-title">{note.title || ''}</h5>
                {note.description && (
                  <p className="work-detail__text-block-content">{note.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Feature Rows Section - Goods (Part 1: Postcard, Lyrics Paper) */}
      {work.gallery && work.gallery.length >= 3 && goodsNotes.length >= 2 && (
        <section className="work-detail__section work-detail__feature-rows">
          <div className="work-detail__feature-rows-list">
            {/* Row 1: Postcard */}
            {work.gallery[1] && goodsNotes[0] && (
              <div className="work-detail__feature-row">
                <div className="work-detail__feature-text">
                  <div>
                    <h4 className="work-detail__feature-title">{goodsNotes[0].title || 'Postcard'}</h4>
                    {goodsNotes[0].description && (
                      <p>{goodsNotes[0].description}</p>
                    )}
                  </div>
                </div>
                <div className="work-detail__image-block">
                  <img src={work.gallery[1].src} alt={work.gallery[1].alt || goodsNotes[0].title} loading="lazy" />
                </div>
              </div>
            )}

            {/* Row 2: Lyrics Paper (reverse) */}
            {work.gallery[2] && goodsNotes[1] && (
              <div className="work-detail__feature-row work-detail__feature-row--reverse">
                <div className="work-detail__image-block">
                  <img src={work.gallery[2].src} alt={work.gallery[2].alt || goodsNotes[1].title} loading="lazy" />
                </div>
                <div className="work-detail__feature-text">
                  <div>
                    <h4 className="work-detail__feature-title">{goodsNotes[1].title || 'Lyrics Paper'}</h4>
                    {goodsNotes[1].description && (
                      <p>{goodsNotes[1].description}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Feature Rows Section - Goods (Part 2: Sticker Pack, Acrylic Keyring) */}
      {work.gallery && work.gallery.length >= 5 && goodsNotes.length >= 4 && (
        <section className="work-detail__section work-detail__feature-rows">
          <div className="work-detail__feature-rows-list">
            {/* Row 1: Sticker Pack */}
            {work.gallery[3] && goodsNotes[2] && (
              <div className="work-detail__feature-row">
                <div className="work-detail__feature-text">
                  <div>
                    <h4 className="work-detail__feature-title">{goodsNotes[2].title || 'Sticker Pack'}</h4>
                    {goodsNotes[2].description && (
                      <p>{goodsNotes[2].description}</p>
                    )}
                  </div>
                </div>
                <div className="work-detail__image-block">
                  <img src={work.gallery[3].src} alt={work.gallery[3].alt || goodsNotes[2].title} loading="lazy" />
                </div>
              </div>
            )}

            {/* Row 2: Acrylic Keyring (reverse) */}
            {work.gallery[4] && goodsNotes[3] && (
              <div className="work-detail__feature-row work-detail__feature-row--reverse">
                <div className="work-detail__image-block">
                  <img src={work.gallery[4].src} alt={work.gallery[4].alt || goodsNotes[3].title} loading="lazy" />
                </div>
                <div className="work-detail__feature-text">
                  <div>
                    <h4 className="work-detail__feature-title">{goodsNotes[3].title || 'Acrylic Keyring'}</h4>
                    {goodsNotes[3].description && (
                      <p>{goodsNotes[3].description}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Feature Cards Section - Posters */}
      {work.gallery && work.gallery.length >= 9 && posterNotes.length >= 3 && (
        <section className="work-detail__section work-detail__cards">
          <div className="work-detail__cards-grid">
            {[0, 1, 2].map((index) => {
              const galleryIndex = 5 + index;
              const cardImage = work.gallery[galleryIndex];
              const cardNote = posterNotes[index];
              
              if (!cardImage || !cardNote) return null;
              
              return (
                <div key={index} className="work-detail__card">
                  <div className="work-detail__card-image">
                    <img src={cardImage.src} alt={cardImage.alt || cardNote.title} loading="lazy" />
                  </div>
                  <div className="work-detail__card-text">
                    <h5 className="work-detail__card-title">{cardNote.title || ''}</h5>
                    {cardNote.description && (
                      <p className="work-detail__card-description">{cardNote.description}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Feature Cards Section - Video (05_Feature cards 3) */}
      {work.gallery && work.gallery.length >= 11 && videoNotes.length >= 3 && (
        <section className="work-detail__section work-detail__detail-grid">
          <div className="work-detail__detail-column">
            {/* Card 1: 앨범 굿즈 형태를 직관적으로 */}
            {work.gallery[8] && videoNotes[0] && (
              <div className="work-detail__detail-card work-detail__detail-card--center">
                <div className="work-detail__detail-card-text">
                  <h5>{videoNotes[0].title || work.gallery[8].alt || ''}</h5>
                  {videoNotes[0].description && (
                    <p>{videoNotes[0].description}</p>
                  )}
                </div>
                <div className="work-detail__detail-card-image">
                  <img src={work.gallery[8].src} alt={work.gallery[8].alt || videoNotes[0].title || ''} loading="lazy" />
                </div>
              </div>
            )}
            {/* Card 2: 곡의 분위기를 직접 느낄 수 있도록 */}
            {work.gallery[9] && videoNotes[1] && (
              <div className="work-detail__detail-card">
                <div className="work-detail__detail-card-text">
                  <h5>{videoNotes[1].title || work.gallery[9].alt || ''}</h5>
                  {videoNotes[1].description && (
                    <p>{videoNotes[1].description}</p>
                  )}
                </div>
                <div className="work-detail__detail-card-image">
                  <img src={work.gallery[9].src} alt={work.gallery[9].alt || videoNotes[1].title || ''} loading="lazy" />
                </div>
              </div>
            )}
          </div>
          <div className="work-detail__detail-column">
            {/* Card 3: 앨범의 콘셉트를 보다 명확하게 */}
            {work.gallery[10] && videoNotes[2] && (
              <div className="work-detail__detail-card work-detail__detail-card--large">
                <div className="work-detail__detail-card-text">
                  <h5>{videoNotes[2].title || work.gallery[10].alt || ''}</h5>
                  {videoNotes[2].description && (
                    <p>{videoNotes[2].description}</p>
                  )}
                </div>
                <div className="work-detail__detail-card-image">
                  <img src={work.gallery[10].src} alt={work.gallery[10].alt || videoNotes[2].title || ''} loading="lazy" />
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default LeeDayoungReadyToMerry;

