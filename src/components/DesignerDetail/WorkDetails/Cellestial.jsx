import React from 'react';
import '../DesignerShowcase.css';

// 이미지 임포트 (나중에 실제 이미지로 교체)
const img01 = 'https://www.figma.com/api/mcp/asset/28c23a57-d335-4676-b48f-88ce175e8e95';
const img02 = 'https://www.figma.com/api/mcp/asset/a32bebf7-5745-4719-993e-6be2ed44ae9d';
const img03 = 'https://www.figma.com/api/mcp/asset/7b838f4e-543f-46f2-92be-0c1780ab1cc8';
const img04 = 'https://www.figma.com/api/mcp/asset/62cd7b02-4584-4961-ace0-60ad9a362105';
const img05 = 'https://www.figma.com/api/mcp/asset/649738be-91dd-4e53-89c1-02c061ac13d3';
const img06 = 'https://www.figma.com/api/mcp/asset/a58d07bc-6797-4521-a0b6-0983fb5fee2a';
const img07 = 'https://www.figma.com/api/mcp/asset/82f1a4ae-9412-4385-8934-c673c0fa3640';
const img08 = 'https://www.figma.com/api/mcp/asset/d2d91119-fa96-4569-b577-df21efad65a6';
const img09 = 'https://www.figma.com/api/mcp/asset/80833e72-dbbe-43ed-951e-4971e3c68012';

/**
 * 김지나 작품 2 (Cellestial) 전용 레이아웃 컴포넌트
 * Figma 디자인에 맞춘 구조 - 데스크탑 모드
 */
const Cellestial = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--cellestial">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero">
        <div className="work-detail__hero-content">
          <div className="work-detail__hero-text">
            <div className="work-detail__text-group">
              <div className="work-detail__eyebrow">
                {badgeSrc && <img src={badgeSrc} alt={badgeAlt || work.genre || designer.role || 'Content'} />}
                <span className="work-detail__eyebrow-text">{work.genre || designer.role || 'Content'}</span>
              </div>
              <h2 className="work-detail__title">{work.title || 'Cellestial'}</h2>
              <p className="work-detail__lead">
                세포(Cell)를 모티브로 한 캐릭터가 오염된 행성을 정화하고 과거 이곳에 무슨 일이 있었는지 파헤친다.
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

      {/* Feature 1: 로고 */}
      {work.gallery && work.gallery[0] && work.notes && work.notes[0] && (
        <section className="work-detail__section work-detail__feature work-detail__feature--alternating">
          <div className="work-detail__feature-text">
            <div>
              <h4 className="work-detail__feature-title">{work.notes[0].title || '로고'}</h4>
              <p>{work.notes[0].description || '세포(Cell)와 우주(Celestial)의 합성어.'}</p>
            </div>
          </div>
          <div className="work-detail__image-block">
            <img src={work.gallery[0].src || img02} alt={work.gallery[0].alt || '로고'} loading="lazy" />
          </div>
        </section>
      )}

      {/* Feature 2: 오염과 정화의 몽환적 재해석 */}
      {work.gallery && work.gallery[1] && work.notes && work.notes[1] && (
        <section className="work-detail__section work-detail__feature work-detail__feature--image-top">
          <div className="work-detail__image-block work-detail__image-block--feature">
            <img src={work.gallery[1].src || img03} alt={work.gallery[1].alt || '오염과 정화'} loading="lazy" />
          </div>
          <div className="work-detail__feature-text">
            <h4 className="work-detail__feature-title">{work.notes[1].title || '오염과 정화의 몽환적 재해석'}</h4>
            <p>
              투명한 막 안의 내용물이 상호작용을 해 에너지를 만든다.{' '}
              플레이어 캐릭터는 필드를 돌아다니며 자원을 얻고, 에너지를 만든 뒤 오염물을 정화하며 활동 범위를 넓힌다.
            </p>
          </div>
        </section>
      )}

      {/* Feature Cards 1: 캐릭터 1, 2, 3단계 */}
      {work.gallery && work.gallery.length >= 4 && work.notes && work.notes.length >= 4 && (
        <section className="work-detail__section work-detail__cards">
          <div className="work-detail__cards-grid work-detail__cards-grid--character">
            {/* 캐릭터 1단계 */}
            {work.gallery[2] && work.notes[2] && (
              <div className="work-detail__card work-detail__card--character">
                <div className="work-detail__card-image work-detail__card-image--character">
                  <img src={work.gallery[2].src || img04} alt={work.gallery[2].alt || '캐릭터 1단계'} loading="lazy" />
                </div>
                <div className="work-detail__card-text">
                  <h5 className="work-detail__card-title">{work.notes[2].title || '캐릭터 1단계'}</h5>
                </div>
              </div>
            )}

            {/* 캐릭터 2단계 */}
            {work.gallery[3] && work.notes[3] && (
              <div className="work-detail__card work-detail__card--character">
                <div className="work-detail__card-image work-detail__card-image--character">
                  <img src={work.gallery[3].src || img05} alt={work.gallery[3].alt || '캐릭터 2단계'} loading="lazy" />
                </div>
                <div className="work-detail__card-text">
                  <h5 className="work-detail__card-title">{work.notes[3].title || '캐릭터 2단계'}</h5>
                </div>
              </div>
            )}

            {/* 캐릭터 3단계 */}
            {work.gallery[4] && work.notes[4] && (
              <div className="work-detail__card work-detail__card--character">
                <div className="work-detail__card-image work-detail__card-image--character">
                  <img src={work.gallery[4].src || img06} alt={work.gallery[4].alt || '캐릭터 3단계'} loading="lazy" />
                </div>
                <div className="work-detail__card-text">
                  <h5 className="work-detail__card-title">{work.notes[4].title || '캐릭터 3단계'}</h5>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Feature Cards 2: 디테일 컷 & 몬스터 */}
      {work.gallery && work.gallery.length >= 7 && work.notes && work.notes.length >= 7 && (
        <section className="work-detail__section work-detail__cards work-detail__cards--cellestial-details">
          <div className="work-detail__detail-grid">
            {/* 왼쪽 컬럼 */}
            <div className="work-detail__detail-column">
              {/* 디테일 컷_1 */}
              {work.gallery[5] && work.notes[5] && (
                <div className="work-detail__detail-card">
                  <div className="work-detail__card-text">
                    <h5 className="work-detail__card-title">{work.notes[5].title || '디테일 컷_1'}</h5>
                    {work.notes[5].description && (
                      <p>{work.notes[5].description}</p>
                    )}
                  </div>
                  <div className="work-detail__card-image">
                    <img src={work.gallery[5].src || img07} alt={work.gallery[5].alt || '디테일 컷_1'} loading="lazy" />
                  </div>
                </div>
              )}

              {/* 디테일 컷_2 */}
              {work.gallery[6] && work.notes[6] && (
                <div className="work-detail__detail-card">
                  <div className="work-detail__card-text">
                    <h5 className="work-detail__card-title">{work.notes[6].title || '디테일 컷_2'}</h5>
                    {work.notes[6].description && (
                      <p>{work.notes[6].description}</p>
                    )}
                  </div>
                  <div className="work-detail__card-image">
                    <img src={work.gallery[6].src || img08} alt={work.gallery[6].alt || '디테일 컷_2'} loading="lazy" />
                  </div>
                </div>
              )}
            </div>

            {/* 오른쪽 컬럼 - 몬스터 */}
            {work.gallery[7] && work.notes[7] && (
              <div className="work-detail__detail-column">
                <div className="work-detail__detail-card">
                  <div className="work-detail__card-text">
                    <h5 className="work-detail__card-title">{work.notes[7].title || '몬스터'}</h5>
                    {work.notes[7].description && (
                      <p>{work.notes[7].description}</p>
                    )}
                  </div>
                  <div className="work-detail__card-image">
                    <img src={work.gallery[7].src || img09} alt={work.gallery[7].alt || '몬스터'} loading="lazy" />
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

export default Cellestial;

