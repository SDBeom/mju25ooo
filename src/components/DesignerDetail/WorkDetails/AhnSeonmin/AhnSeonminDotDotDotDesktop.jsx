import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/AhnSeonminDotDotDot/AhnSeonminDotDotDotDesktop.css';

// 이미지 임포트
import ahnSeonminWork1_01 from '../../../../assets/안선민/안선민_브랜딩_작품1_01.webp';
import ahnSeonminWork1_02 from '../../../../assets/안선민/안선민_브랜딩_작품1_02.webp';
import ahnSeonminWork1_03 from '../../../../assets/안선민/안선민_브랜딩_작품1_03.webp';
import ahnSeonminWork1_04 from '../../../../assets/안선민/안선민_브랜딩_작품1_04.webp';
import ahnSeonminWork1_05 from '../../../../assets/안선민/안선민_브랜딩_작품1_05.webp';
import ahnSeonminWork1_06 from '../../../../assets/안선민/안선민_브랜딩_작품1_06.webp';
import ahnSeonminWork1_07 from '../../../../assets/안선민/안선민_브랜딩_작품1_07.webp';

/**
 * 안선민 - 점점점 (작품1) Desktop 버전
 * Figma 디자인 기반 구현 (1280px)
 */
const AhnSeonminDotDotDotDesktop = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--ahn-seonmin-dot-dot-dot-desktop">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--ahn-seonmin-dot-dot-dot-desktop">
        <div className="work-detail__hero-content work-detail__hero-content--ahn-seonmin-dot-dot-dot-desktop">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--ahn-seonmin-dot-dot-dot-desktop">점점점</h2>
            <div className="work-detail__lead work-detail__lead--ahn-seonmin-dot-dot-dot-desktop">
              <p>서로 다른 24개의 점이 만나 연결되고, 확장됩니다. 각자의 개성이 모여 하나의 흐름을 만들고, 그 안에서 새로운 세계가 공유됩니다. 지금, 점과 점 사이에서 펼쳐지는 변화의 순간을 영상으로 만나보세요!</p>
            </div>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--ahn-seonmin-dot-dot-dot-desktop">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--ahn-seonmin-dot-dot-dot-desktop`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--ahn-seonmin-dot-dot-dot-desktop">
          <img
            src={ahnSeonminWork1_01}
            alt={work.title || '점점점'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, ahnSeonminWork1_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
      </section>

      {/* Feature 1 Section */}
      <section className="work-detail__section work-detail__feature work-detail__feature--ahn-seonmin-dot-dot-dot-desktop">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--full">
          <img
            src={ahnSeonminWork1_02}
            alt="Feature image 1"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, ahnSeonminWork1_02, work.id, 'feature-1')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <p className="work-detail__feature-description">우리는 모두 각자의 점으로부터 시작합니다.</p>
        </div>
      </section>

      {/* Feature 2 Section - Feature Rows */}
      <ul className="work-detail__section work-detail__feature-rows work-detail__feature-rows--ahn-seonmin-dot-dot-dot-desktop">
        <li className="work-detail__feature-row work-detail__feature-row--ahn-seonmin-dot-dot-dot-desktop">
          <div className="work-detail__feature-row-content">
            <p className="work-detail__feature-row-text">보이지 않는 흐름 속에서 점들은 서로를 인식하고</p>
          </div>
          <div className="work-detail__feature-row-image-wrapper">
            <img
              src={ahnSeonminWork1_03}
              alt="Feature row image 1"
              className="work-detail__feature-row-image"
              onError={(e) => handleImageError(e, ahnSeonminWork1_03, work.id, 'feature-row-1')}
              loading="lazy"
            />
          </div>
        </li>
        <li className="work-detail__feature-row work-detail__feature-row--ahn-seonmin-dot-dot-dot-desktop">
          <div className="work-detail__feature-row-image-wrapper">
            <img
              src={ahnSeonminWork1_04}
              alt="Feature row image 2"
              className="work-detail__feature-row-image"
              onError={(e) => handleImageError(e, ahnSeonminWork1_04, work.id, 'feature-row-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-row-content">
            <p className="work-detail__feature-row-text">하나의 결을 만들어 갑니다.</p>
          </div>
        </li>
      </ul>

      {/* Feature Bento Section */}
      <ul className="work-detail__section work-detail__bento work-detail__bento--ahn-seonmin-dot-dot-dot-desktop">
        <li className="work-detail__bento-card work-detail__bento-card--ahn-seonmin-dot-dot-dot-desktop">
          <div className="work-detail__bento-card-image-wrapper">
            <img
              src={ahnSeonminWork1_05}
              alt="Bento card image 1"
              className="work-detail__bento-card-image"
              onError={(e) => handleImageError(e, ahnSeonminWork1_05, work.id, 'bento-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-card-text">
            <p className="work-detail__bento-card-description">점과 점 사이, 작은 간격 속에 관계가 자라납니다.</p>
          </div>
        </li>
        <li className="work-detail__bento-card work-detail__bento-card--ahn-seonmin-dot-dot-dot-desktop">
          <div className="work-detail__bento-card-image-wrapper">
            <img
              src={ahnSeonminWork1_06}
              alt="Bento card image 2"
              className="work-detail__bento-card-image"
              onError={(e) => handleImageError(e, ahnSeonminWork1_06, work.id, 'bento-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-card-text">
            <p className="work-detail__bento-card-description">다채로운 색들이 만나 새로운 질서를 만듭니다.</p>
          </div>
        </li>
        <li className="work-detail__bento-card work-detail__bento-card--ahn-seonmin-dot-dot-dot-desktop work-detail__bento-card--wide">
          <div className="work-detail__bento-card-image-wrapper">
            <img
              src={ahnSeonminWork1_07}
              alt="Bento card image 3"
              className="work-detail__bento-card-image"
              onError={(e) => handleImageError(e, ahnSeonminWork1_07, work.id, 'bento-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-card-text work-detail__bento-card-text--wide">
            <h5 className="work-detail__bento-card-title">서로 다른 리듬들이 이어지며 하나의 궤적을 완성합니다.</h5>
            <p className="work-detail__bento-card-description">
              서로 다른 점들이 만나 연결되고, 확장되는 순간.
              <br />
              '점점점'은 우리가 함께 만들어가는 성장의 흐름을 담습니다.
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default AhnSeonminDotDotDotDesktop;

