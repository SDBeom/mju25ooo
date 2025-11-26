import React from 'react';
import { handleImageError } from '../../../shared/imageUtils';

/**
 * 작품 상세 페이지의 Hero Section 공통 컴포넌트
 * 모든 작품 레이아웃에서 재사용
 */
const WorkDetailHero = ({ 
  work, 
  designer, 
  badgeSrc, 
  badgeAlt, 
  ctas,
  className = '',
  heroClassName = '', // 작품별 hero modifier 클래스 (예: 'park-haein-chrome-4-seasons-mobile')
  showMeta = false,
  heroImageSrc = null, // 직접 이미지 소스를 전달할 수 있음 (work.thumbnail 대신)
  heroImageAlt = null,
  heroImageWrapperClassName = '',
  contentClassName = '',
  textGroupClassName = '',
  titleClassName = '',
  leadClassName = '',
  ctasClassName = '',
  showEyebrow = true, // eyebrow 표시 여부
  renderCtas = null // 커스텀 CTA 렌더링 함수
}) => {
  if (!work) return null;

  // heroClassName이 있으면 자동으로 work-detail__hero-- 접두사 추가 (이미 있으면 그대로 사용)
  const heroModifierClass = heroClassName 
    ? (heroClassName.startsWith('work-detail__hero--') 
        ? heroClassName 
        : `work-detail__hero--${heroClassName}`)
    : '';

  const heroClass = [
    'work-detail__section',
    'work-detail__hero',
    heroModifierClass,
    className
  ].filter(Boolean).join(' ');

  const heroContentClass = contentClassName
    ? `work-detail__hero-content ${contentClassName}`
    : 'work-detail__hero-content';

  const textGroupClass = textGroupClassName
    ? `work-detail__text-group ${textGroupClassName}`
    : 'work-detail__text-group';

  const titleClass = titleClassName
    ? `work-detail__title ${titleClassName}`
    : 'work-detail__title';

  const leadClass = leadClassName
    ? `work-detail__lead ${leadClassName}`
    : 'work-detail__lead';

  const ctasClass = ctasClassName
    ? `work-detail__ctas ${ctasClassName}`
    : 'work-detail__ctas';

  // 이미지 소스 결정: heroImageSrc가 있으면 우선 사용, 없으면 work.thumbnail 사용
  const imageSrc = heroImageSrc || work.thumbnail;
  const imageAlt = heroImageAlt || `${work.title || '작품'} 대표 장면`;

  // CTA 렌더링: 커스텀 함수가 있으면 사용, 없으면 기본 렌더링
  const renderDefaultCtas = () => {
    if (ctas && Array.isArray(ctas) && ctas.length > 0) {
      return ctas.map(({ label, onClick, variant = 'primary' }, index) => (
        <button
          key={label || index}
          type="button"
          className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'}`}
          onClick={onClick}
        >
          {label}
        </button>
      ));
    }
    return null;
  };

  return (
    <section className={heroClass}>
      <div className={heroContentClass}>
        <div className="work-detail__hero-text">
          <div className={textGroupClass}>
            {showEyebrow && (
              <div className="work-detail__eyebrow">
                {badgeSrc && (
                  <img 
                    src={badgeSrc} 
                    alt={badgeAlt || work.genre || designer?.role || 'Content'} 
                  />
                )}
                <span className="work-detail__eyebrow-text">
                  {work.genre || designer?.role || 'Content'}
                </span>
              </div>
            )}
            <h2 className={titleClass}>{work.title || '제목 없음'}</h2>
            {showMeta && work.meta && (
              <p className="work-detail__meta">{work.meta}</p>
            )}
            {work.summary && (
              typeof work.summary === 'string' ? (
                <p className={leadClass}>{work.summary}</p>
              ) : (
                <div className={leadClass}>{work.summary}</div>
              )
            )}
          </div>
          <div className={ctasClass}>
            {renderCtas ? renderCtas() : renderDefaultCtas()}
          </div>
        </div>
        {imageSrc && (
          <div className={heroImageWrapperClassName ? `work-detail__hero-media ${heroImageWrapperClassName}` : 'work-detail__hero-media'}>
            <img 
              src={imageSrc} 
              alt={imageAlt} 
              className="work-detail__hero-image"
              onError={(e) => heroImageSrc && handleImageError(e, heroImageSrc, work.id, 'hero')}
              loading={heroImageSrc ? 'eager' : 'lazy'}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkDetailHero;

