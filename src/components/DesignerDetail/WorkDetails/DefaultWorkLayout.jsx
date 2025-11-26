import React from 'react';
import '../DesignerShowcase.css';
import WorkDetailHero from './WorkDetailHero';

/**
 * 기본 작품 레이아웃 컴포넌트
 * 대부분의 작품이 사용하는 표준 레이아웃
 */
const DefaultWorkLayout = ({ work, designer, badgeSrc, badgeAlt, ctas, heroClassName = '' }) => {
  // work나 designer가 없으면 null 반환
  if (!work || !designer) {
    return null;
  }

  // layout에 따라 클래 추가
  const workDetailClass = work.layout 
    ? `work-detail work-detail--${work.layout}`
    : 'work-detail';

  // heroClassName이 없으면 work.layout에서 추출 시도
  const finalHeroClassName = heroClassName || (work.layout ? work.layout.replace('work-detail--', '') : '');

  return (
    <div className={workDetailClass}>
      {/* Hero Section - 모든 작품과 동일한 구조 */}
      <WorkDetailHero
        work={work}
        designer={designer}
        badgeSrc={badgeSrc}
        badgeAlt={badgeAlt}
        ctas={ctas}
        heroClassName={finalHeroClassName}
      />
      
      {work.gallery && Array.isArray(work.gallery) && work.gallery.length > 0 ? (
        <>
          {/* 첫 번째 섹션: 이미지 + 텍트 */}
          {work.gallery[0] && work.gallery[0].src && (
            <section className="work-detail__section work-detail__feature work-detail__feature--1">
              <div className="work-detail__image-block">
                <img src={work.gallery[0].src} alt={work.gallery[0].alt || ''} loading="lazy" />
              </div>
              <div className="work-detail__feature-text">
                {work.description && <p>{work.description}</p>}
                {work.notes && Array.isArray(work.notes) && work.notes.length > 0 && work.notes[0] && (
                  <>
                    {typeof work.notes[0] === 'string' ? (
                      <p>{work.notes[0]}</p>
                    ) : (
                      <>
                        {work.notes[0].title && <h4 className="work-detail__feature-title">{work.notes[0].title}</h4>}
                        {work.notes[0].description && <p>{work.notes[0].description}</p>}
                      </>
                    )}
                  </>
                )}
              </div>
            </section>
          )}

          {/* 나머지 갤러리 이미지들 - notes와 매칭 */}
          {work.gallery.slice(1).map((item, index) => {
            if (!item || !item.src) return null;
            
            const noteIndex = index + 1;
            const note = work.notes && Array.isArray(work.notes) && work.notes[noteIndex] ? work.notes[noteIndex] : null;
            const hasText = note || item.caption;
            
            return (
              <section
                key={item.src || item.alt || index}
                className={`work-detail__section work-detail__feature work-detail__feature--${index + 2} ${!hasText ? 'work-detail__feature--media-only' : ''}`}
              >
                <div className="work-detail__image-block">
                  <img src={item.src} alt={item.alt || ''} loading="lazy" />
                </div>
                {note && (
                  <div className="work-detail__feature-text">
                    {typeof note === 'string' ? (
                      <p>{note}</p>
                    ) : (
                      <>
                        {note.title && <h4 className="work-detail__feature-title">{note.title}</h4>}
                        {note.description && <p>{note.description}</p>}
                      </>
                    )}
                  </div>
                )}
                {!note && item.caption && (
                  <p className="work-detail__feature-caption">{item.caption}</p>
                )}
              </section>
            );
          })}
        </>
      ) : (
        /* 갤러리가 없는 경우: 텍트만 표시 */
        work.description && (
          <section className="work-detail__section work-detail__feature">
            <div className="work-detail__feature-text">
              <p>{work.description}</p>
              {work.notes && Array.isArray(work.notes) && work.notes.length > 0 && work.notes.map((note, idx) => (
                <p key={idx}>
                  {typeof note === 'string' ? note : note?.description || note?.title || ''}
                </p>
              ))}
            </div>
          </section>
        )
      )}
    </div>
  );
};

export default DefaultWorkLayout;

