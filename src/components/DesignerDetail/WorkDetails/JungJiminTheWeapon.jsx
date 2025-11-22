import React from 'react';
import '../DesignerShowcase.css';

// 이미지 임포트 (나중에 실제 이미지로 교체)
const img01 = 'https://www.figma.com/api/mcp/asset/cc9a15d7-1abb-4dfd-943d-fdf4c9487d5d';
const img02 = 'https://www.figma.com/api/mcp/asset/939e5bc8-8265-4ff8-9871-6f45f46f3d22';
const img03 = 'https://www.figma.com/api/mcp/asset/6b3cba22-36ae-41f4-a08a-2699689637ff';
const img04 = 'https://www.figma.com/api/mcp/asset/ed143776-e71a-43ea-8716-8d4151b9b5b9';
const img05 = 'https://www.figma.com/api/mcp/asset/4c7c14cf-9103-41ce-b304-88ec81849d06';
const img06 = 'https://www.figma.com/api/mcp/asset/3c3ac594-1578-4dad-935d-1632990c227c';
const img07 = 'https://www.figma.com/api/mcp/asset/cbba8aaf-f367-4039-9b49-f2523b158de6';
const img08 = 'https://www.figma.com/api/mcp/asset/df059ce0-a0f7-4145-8fe6-b8a1e4d1d6da';
const img09 = 'https://www.figma.com/api/mcp/asset/08cbbac0-11ff-4b3e-bfea-4568c8c25441';
const img10 = 'https://www.figma.com/api/mcp/asset/42311dd7-ba1d-49bf-a43f-4dbde51c3f48';
const img11 = 'https://www.figma.com/api/mcp/asset/e1b567e7-3184-41ce-83b2-b534563b5e7c';

/**
 * 정지민 작품 2 (The Weapon) 전용 레이아웃 컴포넌트
 * Figma 디자인에 맞춘 구조 - 데스크탑 모드
 */
const JungJiminTheWeapon = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--jungjimin-the-weapon">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero">
        <div className="work-detail__hero-content">
          <div className="work-detail__hero-text">
            <div className="work-detail__text-group">
              <div className="work-detail__eyebrow">
                {badgeSrc && <img src={badgeSrc} alt={badgeAlt || work.genre || designer.role || 'Content'} />}
                <span className="work-detail__eyebrow-text">{work.genre || designer.role || 'Content'}</span>
              </div>
              <h2 className="work-detail__title">{work.title || 'The weapon'}</h2>
              <p className="work-detail__lead">무기 모델링</p>
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

      {/* Feature 1: 장검 */}
      {work.gallery && work.gallery[0] && work.notes && work.notes[0] && (
        <section className="work-detail__section work-detail__feature work-detail__feature--jungjimin-weapon1">
          <div className="work-detail__feature-content">
            <div className="work-detail__feature-text">
              <div>
                <h4 className="work-detail__feature-title">{work.notes[0].title || '장검'}</h4>
                <p>{work.notes[0].description || '문양 강조'}</p>
              </div>
            </div>
          </div>
          <div className="work-detail__image-block">
            <img src={work.gallery[0].src || img02} alt={work.gallery[0].alt || '장검'} loading="lazy" />
          </div>
        </section>
      )}

      {/* Feature Rows: 해머, 대검 */}
      {work.gallery && work.gallery.length >= 3 && work.notes && work.notes.length >= 3 && (
        <section className="work-detail__section work-detail__feature-rows">
          <ul className="work-detail__feature-rows-list">
            {/* Row 1: 해머 */}
            {work.gallery[1] && work.notes[1] && (
              <li className="work-detail__feature-row work-detail__feature-row--jungjimin-weapon2">
                <div className="work-detail__feature-content">
                  <div className="work-detail__feature-text">
                    <div>
                      <h4 className="work-detail__feature-title">{work.notes[1].title || '해머'}</h4>
                      <p>{work.notes[1].description || '문양 강조'}</p>
                    </div>
                  </div>
                </div>
                <div className="work-detail__image-block">
                  <img src={work.gallery[1].src || img03} alt={work.gallery[1].alt || '해머'} loading="lazy" />
                </div>
              </li>
            )}

            {/* Row 2: 대검 (reverse) */}
            {work.gallery[2] && work.notes[2] && (
              <li className="work-detail__feature-row work-detail__feature-row--jungjimin-weapon3">
                <div className="work-detail__image-block">
                  <img src={work.gallery[2].src || img04} alt={work.gallery[2].alt || '대검'} loading="lazy" />
                </div>
                <div className="work-detail__feature-content">
                  <div className="work-detail__feature-text">
                    <div>
                      <h4 className="work-detail__feature-title">{work.notes[2].title || '대검'}</h4>
                      <p>{work.notes[2].description || '라이트 강조'}</p>
                    </div>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </section>
      )}

      {/* Feature 3: 단검 큰 이미지 */}
      {work.gallery && work.gallery[3] && work.notes && work.notes[3] && (
        <section className="work-detail__section work-detail__feature work-detail__feature--image-top">
          <div className="work-detail__image-block work-detail__image-block--feature">
            <img src={work.gallery[3].src || img05} alt={work.gallery[3].alt || '단검'} loading="lazy" />
          </div>
          <div className="work-detail__feature-text">
            <h4 className="work-detail__feature-title">{work.notes[3].title || '단검'}</h4>
            <p>{work.notes[3].description || '텍스쳐 강조'}</p>
          </div>
        </section>
      )}

      {/* Feature Cards 1: 상세샷 3개 */}
      {work.gallery && work.gallery.length >= 7 && work.notes && work.notes.length >= 7 && (
        <section className="work-detail__section work-detail__cards">
          <div className="work-detail__cards-grid">
            {/* 해머 */}
            {work.gallery[4] && work.notes[4] && (
              <div className="work-detail__card">
                <div className="work-detail__card-image">
                  <img src={work.gallery[4].src || img06} alt={work.gallery[4].alt || '해머'} loading="lazy" />
                </div>
                <div className="work-detail__card-text">
                  <h5 className="work-detail__card-title">{work.notes[4].title || '해머'}</h5>
                </div>
              </div>
            )}

            {/* 장검 */}
            {work.gallery[5] && work.notes[5] && (
              <div className="work-detail__card">
                <div className="work-detail__card-image">
                  <img src={work.gallery[5].src || img07} alt={work.gallery[5].alt || '장검'} loading="lazy" />
                </div>
                <div className="work-detail__card-text">
                  <h5 className="work-detail__card-title">{work.notes[5].title || '장검'}</h5>
                </div>
              </div>
            )}

            {/* 장검 */}
            {work.gallery[6] && work.notes[6] && (
              <div className="work-detail__card">
                <div className="work-detail__card-image">
                  <img src={work.gallery[6].src || img08} alt={work.gallery[6].alt || '장검'} loading="lazy" />
                </div>
                <div className="work-detail__card-text">
                  <h5 className="work-detail__card-title">{work.notes[6].title || '장검'}</h5>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Feature Bento: 문양, 해머, 해머 */}
      {work.gallery && work.gallery.length >= 10 && work.notes && work.notes.length >= 10 && (
        <section className="work-detail__section work-detail__bento work-detail__bento--weapon">
          <ul className="work-detail__bento-grid work-detail__bento-grid--weapon">
            {/* 문양 */}
            {work.gallery[7] && work.notes[7] && (
              <li className="work-detail__bento-card work-detail__bento-card--weapon-1">
                <div className="work-detail__bento-card-image">
                  <img src={work.gallery[7].src || img09} alt={work.gallery[7].alt || '문양'} loading="lazy" />
                </div>
                <div className="work-detail__bento-card-text">
                  <h5 className="work-detail__bento-card-title">{work.notes[7].title || '문양'}</h5>
                </div>
              </li>
            )}

            {/* 해머 */}
            {work.gallery[8] && work.notes[8] && (
              <li className="work-detail__bento-card work-detail__bento-card--weapon-2">
                <div className="work-detail__bento-card-image">
                  <img src={work.gallery[8].src || img10} alt={work.gallery[8].alt || '해머'} loading="lazy" />
                </div>
                <div className="work-detail__bento-card-text">
                  <h5 className="work-detail__bento-card-title">{work.notes[8].title || '해머'}</h5>
                </div>
              </li>
            )}

            {/* 해머 */}
            {work.gallery[9] && work.notes[9] && (
              <li className="work-detail__bento-card work-detail__bento-card--weapon-3">
                <div className="work-detail__bento-card-image">
                  <img src={work.gallery[9].src || img11} alt={work.gallery[9].alt || '해머'} loading="lazy" />
                </div>
                <div className="work-detail__bento-card-text">
                  <h5 className="work-detail__bento-card-title">{work.notes[9].title || '해머'}</h5>
                </div>
              </li>
            )}
          </ul>
        </section>
      )}
    </div>
  );
};

export default JungJiminTheWeapon;

