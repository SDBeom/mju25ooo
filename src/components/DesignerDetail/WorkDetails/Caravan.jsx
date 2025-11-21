import React from 'react';
import '../DesignerShowcase.css';

const Caravan = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  return (
    <div className="work-detail work-detail--caravan">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--caravan">
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

      {/* Feature 1: 로고 */}
      {work.gallery && work.gallery[0] && work.notes && work.notes[0] && (
        <section className="work-detail__section work-detail__feature work-detail__feature--1">
          <div className="work-detail__image-block">
            <img src={work.gallery[0].src} alt={work.gallery[0].alt || ''} loading="lazy" />
          </div>
          <div className="work-detail__feature-text">
            <h4 className="work-detail__feature-title">{work.notes[0].title}</h4>
            <p>{work.notes[0].description}</p>
          </div>
        </section>
      )}

      {/* Feature 2: 사막 진영 & 도시 진영 */}
      {work.gallery && work.gallery.length >= 3 && work.notes && work.notes.length >= 3 && (
        <ul className="work-detail__section work-detail__feature-list">
          {/* Row 1: 사막 진영 */}
          {work.gallery[1] && work.notes[1] && (
            <li className="work-detail__feature-row work-detail__feature-row--1">
              <div className="work-detail__feature-image">
                <img src={work.gallery[1].src} alt={work.gallery[1].alt || ''} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                <h4 className="work-detail__feature-title">{work.notes[1].title}</h4>
                <p>{work.notes[1].description}</p>
              </div>
            </li>
          )}

          {/* Row 2: 도시 진영 */}
          {work.gallery[2] && work.notes[2] && (
            <li className="work-detail__feature-row work-detail__feature-row--2">
              <div className="work-detail__feature-image">
                <img src={work.gallery[2].src} alt={work.gallery[2].alt || ''} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                <h4 className="work-detail__feature-title">{work.notes[2].title}</h4>
                <p>{work.notes[2].description}</p>
              </div>
            </li>
          )}
        </ul>
      )}

      {/* Feature 3: 메인 스토리 */}
      {work.gallery && work.gallery[3] && work.notes && work.notes[3] && (
        <section className="work-detail__section work-detail__feature work-detail__feature--3">
          <div className="work-detail__image-block">
            <img src={work.gallery[3].src} alt={work.gallery[3].alt || ''} loading="lazy" />
          </div>
          <div className="work-detail__feature-text">
            <h4 className="work-detail__feature-title">{work.notes[3].title}</h4>
            <p>{work.notes[3].description}</p>
            {work.notes[4] && work.notes[4].description && (
              <p>{work.notes[4].description}</p>
            )}
          </div>
        </section>
      )}

      {/* Feature 4: 스토리 설명 (제목 없음, 이미지 + 텍스트만) */}
      {work.gallery && work.gallery[4] && work.notes && work.notes[4] && (
        <section className="work-detail__section work-detail__feature work-detail__feature--4">
          <div className="work-detail__image-block">
            <img src={work.gallery[4].src} alt={work.gallery[4].alt || ''} loading="lazy" />
          </div>
          <div className="work-detail__feature-text">
            <p>{work.notes[4].description}</p>
          </div>
        </section>
      )}

      {/* Text Row: 작업 양식 & 작업 목표 */}
      {work.notes && work.notes.length >= 7 && (
        <ul className="work-detail__section work-detail__text-blocks">
          {/* 작업 양식 */}
          {work.notes[5] && (
            <li className="work-detail__text-block">
              <h5 className="work-detail__text-block-title">{work.notes[5].title}</h5>
              <div className="work-detail__text-block-content">
                {work.notes[5].description.split('\n').map((line, idx) => (
                  <p key={idx} style={{ margin: 0 }}>{line}</p>
                ))}
              </div>
            </li>
          )}

          {/* 작업 목표 */}
          {work.notes[6] && (
            <li className="work-detail__text-block">
              <h5 className="work-detail__text-block-title">{work.notes[6].title}</h5>
              <div className="work-detail__text-block-content">
                <p style={{ margin: 0 }}>{work.notes[6].description}</p>
              </div>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Caravan;

