import React from 'react';
import '../DesignerShowcase.css';

/**
 * 박해인 작품 (Chrome 4: Seasons) 전용 레이아웃 컴포넌트
 * Figma 디자인에 맞춘 구조 - 데스크탑 모드
 */
const ParkHaeinChrome4Seasons = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--parkhaein-chrome4">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero">
        <div className="work-detail__hero-content">
          <div className="work-detail__hero-text">
            <div className="work-detail__text-group">
              <div className="work-detail__eyebrow">
                {badgeSrc && <img src={badgeSrc} alt={badgeAlt || work.genre || designer.role || 'Content'} />}
                <span className="work-detail__eyebrow-text">{work.genre || designer.role || 'Content'}</span>
              </div>
              <h2 className="work-detail__title">{work.title || 'Chrome 4: Seasons'}</h2>
              <p className="work-detail__lead">
                {work.summary || 'Chrome 4: Seasons는 크롬하츠(Chrome Hearts)의 강렬한 아이덴티티를 디지털 휴먼을 매개로 재해석한 비주얼 브랜드 필름이다.'}
              </p>
            </div>
            <div className="work-detail__ctas">
              {ctas && Array.isArray(ctas) && ctas.length > 0 ? (
                ctas.map(({ label, onClick, variant = 'primary' }, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'}`}
                    onClick={onClick}
                  >
                    {label}
                  </button>
                ))
              ) : (
                <>
                  <button type="button" className="work-detail__cta work-detail__cta--primary">
                    디자이너의 다른 작품
                  </button>
                  <button type="button" className="work-detail__cta work-detail__cta--secondary">
                    개인 SNS
                  </button>
                </>
              )}
            </div>
          </div>
          {work.thumbnail && (
            <div className="work-detail__hero-media">
              <img src={work.thumbnail} alt={`${work.title || '작품'} 대표 장면`} loading="lazy" />
            </div>
          )}
        </div>
      </section>

      {/* Feature 3: 큰 이미지와 텍스트 */}
      {work.gallery && work.gallery[0] && work.notes && work.notes[0] && (
        <section className="work-detail__section work-detail__feature">
          <div className="work-detail__image-block work-detail__image-block--parkhaein-feature">
            <img src={work.gallery[0].src} alt={work.gallery[0].alt || 'Feature'} loading="lazy" />
          </div>
          <div className="work-detail__feature-text">
            <h4 className="work-detail__feature-title">{work.notes[0].title}</h4>
            {work.notes[0].description && (
              <div className="work-detail__feature-description">
                {work.notes[0].description.split('\n\n').map((paragraph, index, array) => {
                  const trimmed = paragraph.trim();
                  if (!trimmed) return null;
                  
                  return (
                    <React.Fragment key={index}>
                      <p>{trimmed}</p>
                      {index < array.length - 1 && <p>&nbsp;</p>}
                    </React.Fragment>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Feature Cards 1: 3개 포스터 카드 */}
      {work.gallery && work.gallery.length >= 4 && (
        <section className="work-detail__section work-detail__cards">
          <ul className="work-detail__cards-grid work-detail__cards-grid--parkhaein-posters">
            {/* Card 1: POSTER#01 */}
            {work.gallery[1] && work.notes && work.notes[1] && (
              <li className="work-detail__card work-detail__card--parkhaein">
                <div className="work-detail__card-image">
                  <img src={work.gallery[1].src} alt={work.gallery[1].alt || 'POSTER#01'} loading="lazy" />
                </div>
                <div className="work-detail__card-text">
                  <h5 className="work-detail__card-title">{work.notes[1].title || 'POSTER#01'}</h5>
                </div>
              </li>
            )}

            {/* Card 2: POSTER#02 */}
            {work.gallery[2] && work.notes && work.notes[2] && (
              <li className="work-detail__card work-detail__card--parkhaein">
                <div className="work-detail__card-image">
                  <img src={work.gallery[2].src} alt={work.gallery[2].alt || 'POSTER#02'} loading="lazy" />
                </div>
                <div className="work-detail__card-text">
                  <h5 className="work-detail__card-title">{work.notes[2].title || 'POSTER#02'}</h5>
                </div>
              </li>
            )}

            {/* Card 3: POSTER#03 */}
            {work.gallery[3] && work.notes && work.notes[3] && (
              <li className="work-detail__card work-detail__card--parkhaein">
                <div className="work-detail__card-image">
                  <img src={work.gallery[3].src} alt={work.gallery[3].alt || 'POSTER#03'} loading="lazy" />
                </div>
                <div className="work-detail__card-text">
                  <h5 className="work-detail__card-title">{work.notes[3].title || 'POSTER#03'}</h5>
                </div>
              </li>
            )}
          </ul>
        </section>
      )}

      {/* Feature Bento 1: 3개 계절 카드 */}
      {work.gallery && work.gallery.length >= 7 && (
        <section className="work-detail__section work-detail__feature-bento work-detail__section--parkhaein-bento">
          <ul className="work-detail__bento-grid work-detail__bento-grid--parkhaein-seasons">
            {/* Card 1: AUTUMN */}
            {work.gallery[4] && work.notes && work.notes[4] && (
              <li className="work-detail__bento-card work-detail__bento-card--parkhaein">
                <div className="work-detail__bento-image work-detail__bento-image--parkhaein-autumn">
                  <img src={work.gallery[4].src} alt={work.gallery[4].alt || 'AUTUMN'} loading="lazy" />
                </div>
                <div className="work-detail__bento-text">
                  <h5 className="work-detail__bento-title">{work.notes[4].title || 'AUTUMN'}</h5>
                  {work.notes[4].description && (
                    <p className="work-detail__bento-description">{work.notes[4].description}</p>
                  )}
                </div>
              </li>
            )}

            {/* Card 2: SPRING */}
            {work.gallery[5] && work.notes && work.notes[5] && (
              <li className="work-detail__bento-card work-detail__bento-card--parkhaein work-detail__bento-card--parkhaein-spring">
                <div className="work-detail__bento-image work-detail__bento-image--parkhaein-spring">
                  <img src={work.gallery[5].src} alt={work.gallery[5].alt || 'SPRING'} loading="lazy" />
                </div>
                <div className="work-detail__bento-text">
                  <h5 className="work-detail__bento-title">{work.notes[5].title || 'SPRING'}</h5>
                  {work.notes[5].description && (
                    <p className="work-detail__bento-description">{work.notes[5].description}</p>
                  )}
                </div>
              </li>
            )}

            {/* Card 3: WINTER */}
            {work.gallery[6] && work.notes && work.notes[6] && (
              <li className="work-detail__bento-card work-detail__bento-card--parkhaein work-detail__bento-card--parkhaein-winter">
                <div className="work-detail__bento-image work-detail__bento-image--parkhaein-winter">
                  <img src={work.gallery[6].src} alt={work.gallery[6].alt || 'WINTER'} loading="lazy" />
                </div>
                <div className="work-detail__bento-text">
                  <h5 className="work-detail__bento-title">{work.notes[6].title || 'WINTER'}</h5>
                  {work.notes[6].description && (
                    <p className="work-detail__bento-description">{work.notes[6].description}</p>
                  )}
                </div>
              </li>
            )}
          </ul>
        </section>
      )}

      {/* Feature Gallery 1: Another scene */}
      {work.gallery && work.gallery.length >= 12 && (
        <section className="work-detail__section work-detail__gallery">
          <div className="work-detail__gallery-header">
            <h3 className="work-detail__gallery-title">Another scene</h3>
            <p className="work-detail__gallery-subtitle">Detail Shots</p>
          </div>
          <div className="work-detail__gallery-grid work-detail__gallery-grid--parkhaein">
            {/* Column 1 */}
            <div className="work-detail__gallery-column">
              <div className="work-detail__gallery-item">
                <img src={work.gallery[7].src} alt={work.gallery[7].alt || 'Detail Shot 1'} loading="lazy" />
              </div>
            </div>
            {/* Column 2 */}
            <div className="work-detail__gallery-column">
              <div className="work-detail__gallery-item">
                <img src={work.gallery[8].src} alt={work.gallery[8].alt || 'Detail Shot 2'} loading="lazy" />
              </div>
              <div className="work-detail__gallery-item">
                <img src={work.gallery[9].src} alt={work.gallery[9].alt || 'Detail Shot 3'} loading="lazy" />
              </div>
            </div>
            {/* Column 3 */}
            <div className="work-detail__gallery-column">
              <div className="work-detail__gallery-item">
                <img src={work.gallery[10].src} alt={work.gallery[10].alt || 'Detail Shot 4'} loading="lazy" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Feature Card 1: Instagram Card */}
      {work.instagramImage && (
        <section className="work-detail__section work-detail__instagram-card">
          <article className="work-detail__instagram-card-inner">
            <div className="work-detail__instagram-card-image">
              <img src={work.instagramImage} alt="Instagram" loading="lazy" />
            </div>
            <div className="work-detail__instagram-card-body">
              <div className="work-detail__instagram-card-text">
                <h5 className="work-detail__instagram-card-title">@haein_524</h5>
                <p className="work-detail__instagram-card-subtitle">Work by Haein Park</p>
              </div>
              <p className="work-detail__instagram-card-content">
                You can find more of my works on Instagram →
              </p>
            </div>
          </article>
        </section>
      )}

      {/* Text 1: Footer Text */}
      {work.footerText && (
        <section className="work-detail__section work-detail__footer-text">
          <p className="work-detail__footer-text-content">{work.footerText}</p>
        </section>
      )}
    </div>
  );
};

export default ParkHaeinChrome4Seasons;

