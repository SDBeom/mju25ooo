import React from 'react';
import '../DesignerShowcase.css';

// 이미지 임포트 (나중에 실제 이미지로 교체)
const img01 = 'https://www.figma.com/api/mcp/asset/648e7284-e15f-4ae6-9858-3bb738bde2b7';
const img02 = 'https://www.figma.com/api/mcp/asset/fac0fbb0-2d59-406e-9c25-37f9114b523a';
const img03 = 'https://www.figma.com/api/mcp/asset/00b4aa22-5744-4a44-8078-0941c46e0343';
const img04 = 'https://www.figma.com/api/mcp/asset/353d576b-39e7-4fd6-835f-f4cb6de0c7eb';
const img05 = 'https://www.figma.com/api/mcp/asset/3f6a185b-a6e8-4370-81ff-79f1c43c5003';
const img06 = 'https://www.figma.com/api/mcp/asset/7714bfbe-0b8f-4744-ae94-5f3cfe7199a3';
const img07 = 'https://www.figma.com/api/mcp/asset/cc70c5bc-10d1-47f4-b281-133bf2026a84';
const img08 = 'https://www.figma.com/api/mcp/asset/847f15d1-809d-48cf-b7e2-a97ce56160cf';

/**
 * 서동범 작품 (HiFive) 전용 레이아웃 컴포넌트
 * Figma 디자인에 맞춘 구조 - 데스크탑 모드
 */
const HiFive = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--hifive">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero">
        <div className="work-detail__hero-content">
          <div className="work-detail__hero-text">
            <div className="work-detail__text-group">
              <div className="work-detail__eyebrow">
                {badgeSrc && <img src={badgeSrc} alt={badgeAlt || work.genre || designer.role || 'Content'} />}
                <span className="work-detail__eyebrow-text">{work.genre || designer.role || 'Content'}</span>
              </div>
              <h2 className="work-detail__title">{work.title || 'HiFive'}</h2>
              <p className="work-detail__lead">
                HiFive는 프로필이나 관계의 부담 없이, 같은 현장에 모인 사람들이 커서(cursor)가 되어 순간의 분위기(vibe)를 공유하는 실시간 소셜 미디어입니다.
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

      {/* Feature Bento 1: Background */}
      {work.gallery && work.gallery[1] && work.notes && work.notes[0] && (
        <section className="work-detail__section work-detail__feature-bento">
          <ul className="work-detail__bento-grid work-detail__bento-grid--hifive">
            <li className="work-detail__bento-card work-detail__bento-card--hifive-background">
              <div className="work-detail__feature-bento-text">
                <h3 className="work-detail__feature-bento-title">{work.notes[0].title || 'Background'}</h3>
                {work.notes[0].description && (
                  <p>{work.notes[0].description}</p>
                )}
              </div>
              <div className="work-detail__feature-bento-image work-detail__feature-bento-image--hifive">
                <img src={work.gallery[1].src || img02} alt={work.gallery[1].alt || 'Background'} loading="lazy" />
                {/* 채팅 버블 오버레이 */}
                <div className="work-detail__chat-bubbles">
                  <div className="work-detail__chat-bubble work-detail__chat-bubble--1">
                    사람 만나는 거 자체가 그냥 다 귀찮다...
                  </div>
                  <div className="work-detail__chat-bubble work-detail__chat-bubble--2">
                    지금 당장 재밌는 건 하고 싶은데... 굳이 약속까지 잡고 싶진 않아.
                  </div>
                  <div className="work-detail__chat-bubble work-detail__chat-bubble--3">
                    지금 이 순간 자체를, 나랑 비슷한 상황에 놓인 사람과 공유하고 싶어.
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </section>
      )}

      {/* Pull Quote 1 */}
      {work.notes && work.notes[1] && (
        <section className="work-detail__section work-detail__pull-quote">
          <figure className="work-detail__pull-quote-figure">
            {work.notes[1].description && (
              <p className="work-detail__pull-quote-text">
                {work.notes[1].description}
              </p>
            )}
            {work.notes[1].subtitle && (
              <p className="work-detail__pull-quote-subtitle">
                {work.notes[1].subtitle}
              </p>
            )}
            {work.notes[1].content && (
              <p className="work-detail__pull-quote-content">
                {work.notes[1].content}
              </p>
            )}
          </figure>
        </section>
      )}

      {/* Feature 1: 큰 이미지 (앱 화면) */}
      {work.gallery && work.gallery[2] && (
        <section className="work-detail__section work-detail__feature work-detail__feature--media-only">
          <div className="work-detail__image-block work-detail__image-block--hifive-feature">
            <img src={work.gallery[2].src || img03} alt={work.gallery[2].alt || 'HiFive Feature'} loading="lazy" />
          </div>
        </section>
      )}

      {/* Feature Cards 2: 3개 카드 */}
      {work.gallery && work.gallery.length >= 6 && work.notes && work.notes.length >= 5 && (
        <section className="work-detail__section work-detail__cards">
          <div className="work-detail__cards-grid work-detail__cards-grid--hifive">
            {/* 카드 1: 월드맵과 플레이그라운드 기능 - 4번 이미지 */}
            {work.gallery[3] && work.notes[2] && (
              <div className="work-detail__card work-detail__card--hifive">
                <div className="work-detail__card-image">
                  <img src={work.gallery[3].src || img05} alt={work.gallery[3].alt || '월드맵과 플레이그라운드 기능'} loading="lazy" />
                </div>
                <div className="work-detail__card-text">
                  <ol className="work-detail__card-title-list">
                    <li>1. {work.notes[2].title || '월드맵과 플레이그라운드 기능'}</li>
                  </ol>
                  {work.notes[2].description && (
                    <p>{work.notes[2].description}</p>
                  )}
                </div>
              </div>
            )}

            {/* 카드 2: 휘발성 세션 기능 - 5번 이미지 */}
            {work.gallery[4] && work.notes[3] && (
              <div className="work-detail__card work-detail__card--hifive">
                <div className="work-detail__card-image">
                  <img src={work.gallery[4].src || img06} alt={work.gallery[4].alt || '휘발성 세션 기능'} loading="lazy" />
                </div>
                <div className="work-detail__card-text">
                  <ol className="work-detail__card-title-list">
                    <li>2. {work.notes[3].title || '휘발성 세션 기능'}</li>
                  </ol>
                  {work.notes[3].description && (
                    <p>{work.notes[3].description}</p>
                  )}
                </div>
              </div>
            )}

            {/* 카드 3: 커서 중심 UI - 6번 이미지 */}
            {work.gallery[5] && work.notes[4] && (
              <div className="work-detail__card work-detail__card--hifive">
                <div className="work-detail__card-image">
                  <img src={work.gallery[5].src || img07} alt={work.gallery[5].alt || '커서 중심 UI'} loading="lazy" />
                </div>
                <div className="work-detail__card-text">
                  <ol className="work-detail__card-title-list">
                    <li>3. {work.notes[4].title || '커서 중심 UI'}</li>
                  </ol>
                  {work.notes[4].description && (
                    <p>{work.notes[4].description}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default HiFive;

