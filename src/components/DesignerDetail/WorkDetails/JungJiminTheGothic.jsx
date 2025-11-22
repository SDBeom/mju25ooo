import React from 'react';
import '../DesignerShowcase.css';

// 이미지 임포트 (나중에 실제 이미지로 교체)
const img01 = 'https://www.figma.com/api/mcp/asset/b74da37f-6884-41ba-840a-18b2f41a8aad';
const img02 = 'https://www.figma.com/api/mcp/asset/0d29cfb6-cfae-45f8-858f-d42970911016';
const img03 = 'https://www.figma.com/api/mcp/asset/47bf4244-242c-41d7-a862-6e263bd96506';
const img04 = 'https://www.figma.com/api/mcp/asset/2359c43f-57f0-44e7-9bd5-8306ca6cdd4c';
const img05 = 'https://www.figma.com/api/mcp/asset/2359c43f-57f0-44e7-9bd5-8306ca6cdd4c';
const img06 = 'https://www.figma.com/api/mcp/asset/39889406-88da-4d28-b5d7-0c3e7cb2df0f';
const img07 = 'https://www.figma.com/api/mcp/asset/dfb145f7-1ae7-4ac3-87e2-701038b6f76a';
const img08 = 'https://www.figma.com/api/mcp/asset/bd46061a-0f28-4b6d-8d22-e46c2a0eecbe';
const img09 = 'https://www.figma.com/api/mcp/asset/8339ba1f-966b-4793-95bc-e73c4b3ce6b7';
const img10 = 'https://www.figma.com/api/mcp/asset/a80fac82-60fb-4d88-95a7-d40cae0ace0c';
const img11 = 'https://www.figma.com/api/mcp/asset/ba49dece-50f2-481d-8315-b3c615d30dba';

/**
 * 정지민 작품 1 (The Gothic) 전용 레이아웃 컴포넌트
 * Figma 디자인에 맞춘 구조 - 데스크탑 모드
 */
const JungJiminTheGothic = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--jungjimin-the-gothic">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero">
        <div className="work-detail__hero-content">
          <div className="work-detail__hero-text">
            <div className="work-detail__text-group">
              <div className="work-detail__eyebrow">
                {badgeSrc && <img src={badgeSrc} alt={badgeAlt || work.genre || designer.role || 'Content'} />}
                <span className="work-detail__eyebrow-text">{work.genre || designer.role || 'Content'}</span>
              </div>
              <h2 className="work-detail__title">{work.title || 'The gothic'}</h2>
              <p className="work-detail__lead">갑옷, 캐릭터 모델링</p>
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

      {/* Feature 1: 씬1 */}
      {work.gallery && work.gallery[0] && work.notes && work.notes[0] && (
        <section className="work-detail__section work-detail__feature work-detail__feature--jungjimin-scene1">
          <div className="work-detail__feature-content">
            <div className="work-detail__feature-text">
              <div>
                <h4 className="work-detail__feature-title">{work.notes[0].title || '씬1'}</h4>
                <p>{work.notes[0].description || '어두운 분위기 강조'}</p>
              </div>
            </div>
          </div>
          <div className="work-detail__image-block">
            <img src={work.gallery[0].src || img02} alt={work.gallery[0].alt || '씬1'} loading="lazy" />
          </div>
        </section>
      )}

      {/* Feature Rows: 씬2, 씬3 */}
      {work.gallery && work.gallery.length >= 3 && work.notes && work.notes.length >= 3 && (
        <section className="work-detail__section work-detail__feature-rows">
          <ul className="work-detail__feature-rows-list">
            {/* Row 1: 씬2 */}
            {work.gallery[1] && work.notes[1] && (
              <li className="work-detail__feature-row work-detail__feature-row--jungjimin-scene2">
                <div className="work-detail__feature-content">
                  <div className="work-detail__feature-text">
                    <div>
                      <h4 className="work-detail__feature-title">{work.notes[1].title || '씬2'}</h4>
                      <p>{work.notes[1].description || '라이트 강조'}</p>
                    </div>
                  </div>
                </div>
                <div className="work-detail__image-block">
                  <img src={work.gallery[1].src || img03} alt={work.gallery[1].alt || '씬2'} loading="lazy" />
                </div>
              </li>
            )}

            {/* Row 2: 씬3 (reverse) */}
            {work.gallery[2] && work.notes[2] && (
              <li className="work-detail__feature-row work-detail__feature-row--jungjimin-scene3">
                <div className="work-detail__image-block">
                  <img src={work.gallery[2].src || img04} alt={work.gallery[2].alt || '씬3'} loading="lazy" />
                </div>
                <div className="work-detail__feature-content">
                  <div className="work-detail__feature-text">
                    <div>
                      <h4 className="work-detail__feature-title">{work.notes[2].title || '씬3'}</h4>
                      <p>{work.notes[2].description || '구도 강조'}</p>
                    </div>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </section>
      )}

      {/* Feature 3: 씬3 큰 이미지 */}
      {work.gallery && work.gallery[3] && work.notes && work.notes[3] && (
        <section className="work-detail__section work-detail__feature work-detail__feature--image-top">
          <div className="work-detail__image-block work-detail__image-block--feature">
            <img src={work.gallery[3].src || img05} alt={work.gallery[3].alt || '씬3'} loading="lazy" />
          </div>
          <div className="work-detail__feature-text">
            <h4 className="work-detail__feature-title">{work.notes[3].title || '씬3'}</h4>
            <p>{work.notes[3].description || '숲 속 연출'}</p>
          </div>
        </section>
      )}

      {/* Feature Cards 1: 상세샷 3개 */}
      {work.gallery && work.gallery.length >= 7 && work.notes && work.notes.length >= 7 && (
        <section className="work-detail__section work-detail__cards">
          <div className="work-detail__cards-grid">
            {/* 상세샷 갑옷 */}
            {work.gallery[4] && work.notes[4] && (
              <div className="work-detail__card">
                <div className="work-detail__card-image">
                  <img src={work.gallery[4].src || img06} alt={work.gallery[4].alt || '상세샷 갑옷'} loading="lazy" />
                </div>
                <div className="work-detail__card-text">
                  <h5 className="work-detail__card-title">{work.notes[4].title || '상세샷'}</h5>
                  {work.notes[4].description && (
                    <p>{work.notes[4].description}</p>
                  )}
                </div>
              </div>
            )}

            {/* 상세샷 투구 */}
            {work.gallery[5] && work.notes[5] && (
              <div className="work-detail__card">
                <div className="work-detail__card-image">
                  <img src={work.gallery[5].src || img07} alt={work.gallery[5].alt || '상세샷 투구'} loading="lazy" />
                </div>
                <div className="work-detail__card-text">
                  <h5 className="work-detail__card-title">{work.notes[5].title || '상세샷'}</h5>
                  {work.notes[5].description && (
                    <p>{work.notes[5].description}</p>
                  )}
                </div>
              </div>
            )}

            {/* 상세샷 하체 */}
            {work.gallery[6] && work.notes[6] && (
              <div className="work-detail__card">
                <div className="work-detail__card-image">
                  <img src={work.gallery[6].src || img08} alt={work.gallery[6].alt || '상세샷 하체'} loading="lazy" />
                </div>
                <div className="work-detail__card-text">
                  <h5 className="work-detail__card-title">{work.notes[6].title || '상세샷'}</h5>
                  {work.notes[6].description && (
                    <p>{work.notes[6].description}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Feature Cards 2: 디테일 그리드 (문양, 벨트, 하체 갑옷) */}
      {work.gallery && work.gallery.length >= 10 && work.notes && work.notes.length >= 10 && (
        <section className="work-detail__section work-detail__bento">
          <div className="work-detail__bento-grid work-detail__bento-grid--jungjimin">
            {/* 왼쪽 컬럼 */}
            <div className="work-detail__bento-column">
              {/* 문양 */}
              {work.gallery[7] && work.notes[7] && (
                <div className="work-detail__bento-card work-detail__bento-card--center">
                  <div className="work-detail__bento-card-text">
                    <h5 className="work-detail__bento-card-title">{work.notes[7].title || '문양'}</h5>
                    {work.notes[7].description && (
                      <p>{work.notes[7].description}</p>
                    )}
                  </div>
                  <div className="work-detail__bento-card-image">
                    <img src={work.gallery[7].src || img09} alt={work.gallery[7].alt || '문양'} loading="lazy" />
                  </div>
                </div>
              )}

              {/* 벨트 */}
              {work.gallery[8] && work.notes[8] && (
                <div className="work-detail__bento-card">
                  <div className="work-detail__bento-card-text">
                    <h5 className="work-detail__bento-card-title">{work.notes[8].title || '벨트'}</h5>
                    {work.notes[8].description && (
                      <p>{work.notes[8].description}</p>
                    )}
                  </div>
                  <div className="work-detail__bento-card-image">
                    <img src={work.gallery[8].src || img10} alt={work.gallery[8].alt || '벨트'} loading="lazy" />
                  </div>
                </div>
              )}
            </div>

            {/* 오른쪽 컬럼 - 하체 갑옷 */}
            {work.gallery[9] && work.notes[9] && (
              <div className="work-detail__bento-column">
                <div className="work-detail__bento-card work-detail__bento-card--large">
                  <div className="work-detail__bento-card-text">
                    <h5 className="work-detail__bento-card-title">{work.notes[9].title || '하체 갑옷'}</h5>
                    {work.notes[9].description && (
                      <p>{work.notes[9].description}</p>
                    )}
                  </div>
                  <div className="work-detail__bento-card-image">
                    <img src={work.gallery[9].src || img11} alt={work.gallery[9].alt || '하체 갑옷'} loading="lazy" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default JungJiminTheGothic;

