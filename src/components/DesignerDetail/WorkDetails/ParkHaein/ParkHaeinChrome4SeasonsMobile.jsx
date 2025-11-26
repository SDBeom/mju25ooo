import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/ParkHaeinChrome4Seasons/ParkHaeinChrome4SeasonsMobile.css';

// 이미지 임포트
import parkHaeinWork1_01 from '../../../../assets/박해인/박해인_모션디자인_작품1_01.webp';
import parkHaeinWork1_02 from '../../../../assets/박해인/박해인_모션디자인_작품1_02.webp';
import parkHaeinWork1_03 from '../../../../assets/박해인/박해인_모션디자인_작품1_03.webp';
import parkHaeinWork1_04 from '../../../../assets/박해인/박해인_모션디자인_작품1_04.webp';
import parkHaeinWork1_05 from '../../../../assets/박해인/박해인_모션디자인_작품1_05.webp';
import parkHaeinWork1_06 from '../../../../assets/박해인/박해인_모션디자인_작품1_06.webp';
import parkHaeinWork1_07 from '../../../../assets/박해인/박해인_모션디자인_작품1_07.webp';
import parkHaeinWork1_08 from '../../../../assets/박해인/박해인_모션디자인_작품1_08.webp';
import parkHaeinWork1_09 from '../../../../assets/박해인/박해인_모션디자인_작품1_09.webp';
import parkHaeinWork1_10 from '../../../../assets/박해인/박해인_모션디자인_작품1_10.webp';
import parkHaeinWork1_11 from '../../../../assets/박해인/박해인_모션디자인_작품1_11.webp';
import parkHaeinWork1_12 from '../../../../assets/박해인/박해인_모션디자인_작품1_12.webp';
import parkHaeinWork1_13 from '../../../../assets/박해인/박해인_모션디자인_작품1_13.webp';

/**
 * 박해인 - Chrome 4: Seasons Mobile 버전
 * Figma 디자인 기반 구현 (375px)
 */
const ParkHaeinChrome4SeasonsMobile = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--park-haein-chrome-4-seasons-mobile">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--park-haein-chrome-4-seasons-mobile">
        <div className="work-detail__hero-content work-detail__hero-content--park-haein-chrome-4-seasons-mobile">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--park-haein-chrome-4-seasons-mobile">
              {work.title || 'Chrome 4: Seasons'}
            </h2>
            <div className="work-detail__lead work-detail__lead--park-haein-chrome-4-seasons-mobile">
              {work.summary && (
                typeof work.summary === 'string' ? (
                  <p>{work.summary}</p>
                ) : (
                  <div>{work.summary}</div>
                )
              )}
            </div>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--park-haein-chrome-4-seasons-mobile">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--park-haein-chrome-4-seasons-mobile`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--park-haein-chrome-4-seasons-mobile">
          <div className="work-detail__hero-image-container">
            <div className="work-detail__hero-image-inner">
              <img
                src={parkHaeinWork1_01}
                alt={work.title || 'Chrome 4: Seasons'}
                className="work-detail__hero-image"
                onError={(e) => handleImageError(e, parkHaeinWork1_01, work.id, 'hero')}
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature 3 */}
      <section className="work-detail__section work-detail__feature work-detail__feature--park-haein-chrome-4-seasons-mobile">
        <div className="work-detail__feature-image-wrapper">
          <img
            src={parkHaeinWork1_02}
            alt="Spring to winter, every moment shines differently."
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, parkHaeinWork1_02, work.id, 'feature')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title">Spring to winter, every moment shines differently.</h4>
          <div className="work-detail__feature-description">
            <p>봄의 싱그러움, 여름의 열기, 가을의 깊이, 겨울의 고요함이 크롬의 강렬한 아이덴티티와 어우러진다. 관람자는 복잡하게 해석하지 않아도 계절의 흐름과 변화 속에서 화면을 따라가며 새로운 디테일과 재미를 발견할 수 있다. 디지털과 현실, 인간성과 브랜드가 만나는 지점에서 시각적 경험이 확장되며, 보는 이의 감각과 상을 자유롭게 자극한다.</p>
            <p>&nbsp;</p>
            <p>The freshness of spring, the heat of summer, the depth of autumn, and the stillness of winter intertwine with the bold identity of Chrome. Viewers can follow the flow and transformation of the seasons without complex interpretation, discovering new details and pleasures within each scene. At the intersection of digital and reality, humanity and brand, the visual experience expands—freely stimulating the viewer's senses and imagination.</p>
          </div>
        </div>
      </section>

      {/* Feature Cards 1: POSTER */}
      <ul className="work-detail__section work-detail__feature-cards work-detail__feature-cards--park-haein-chrome-4-seasons-mobile">
        <li className="work-detail__feature-card work-detail__feature-card--park-haein-chrome-4-seasons-mobile">
          <div className="work-detail__feature-card-image-wrapper">
            <img
              src={parkHaeinWork1_03}
              alt="POSTER#01"
              className="work-detail__feature-card-image"
              onError={(e) => handleImageError(e, parkHaeinWork1_03, work.id, 'feature-card-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-card-text">
            <h5 className="work-detail__feature-card-title">POSTER#01</h5>
          </div>
        </li>
        <li className="work-detail__feature-card work-detail__feature-card--park-haein-chrome-4-seasons-mobile">
          <div className="work-detail__feature-card-image-wrapper">
            <img
              src={parkHaeinWork1_04}
              alt="POSTER#02"
              className="work-detail__feature-card-image"
              onError={(e) => handleImageError(e, parkHaeinWork1_04, work.id, 'feature-card-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-card-text">
            <h5 className="work-detail__feature-card-title">POSTER#02</h5>
          </div>
        </li>
        <li className="work-detail__feature-card work-detail__feature-card--park-haein-chrome-4-seasons-mobile">
          <div className="work-detail__feature-card-image-wrapper">
            <img
              src={parkHaeinWork1_05}
              alt="POSTER#03"
              className="work-detail__feature-card-image"
              onError={(e) => handleImageError(e, parkHaeinWork1_05, work.id, 'feature-card-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-card-text">
            <h5 className="work-detail__feature-card-title">POSTER#03</h5>
          </div>
        </li>
      </ul>

      {/* Feature Bento 1: Seasons */}
      <ul className="work-detail__section work-detail__bento work-detail__bento--park-haein-chrome-4-seasons-mobile">
        <li className="work-detail__bento-card work-detail__bento-card--park-haein-chrome-4-seasons-mobile">
          <div className="work-detail__bento-image-wrapper">
            <img
              src={parkHaeinWork1_06}
              alt="AUTUMN"
              className="work-detail__bento-image"
              onError={(e) => handleImageError(e, parkHaeinWork1_06, work.id, 'bento-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-text">
            <h5 className="work-detail__bento-title">AUTUMN</h5>
            <div className="work-detail__bento-description">
              <p>#Maturity #Transformation #Brown #Green</p>
            </div>
          </div>
        </li>
        <li className="work-detail__bento-card work-detail__bento-card--park-haein-chrome-4-seasons-mobile">
          <div className="work-detail__bento-image-wrapper">
            <img
              src={parkHaeinWork1_07}
              alt="SPRING"
              className="work-detail__bento-image"
              onError={(e) => handleImageError(e, parkHaeinWork1_07, work.id, 'bento-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-text">
            <h5 className="work-detail__bento-title">SPRING</h5>
            <div className="work-detail__bento-description">
              <p>#Life  #Growth #Pink #Green #Brightness</p>
            </div>
          </div>
        </li>
        <li className="work-detail__bento-card work-detail__bento-card--park-haein-chrome-4-seasons-mobile">
          <div className="work-detail__bento-image-wrapper">
            <img
              src={parkHaeinWork1_08}
              alt="WINTER"
              className="work-detail__bento-image"
              onError={(e) => handleImageError(e, parkHaeinWork1_08, work.id, 'bento-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-text">
            <h5 className="work-detail__bento-title">WINTER</h5>
            <div className="work-detail__bento-description">
              <p>#Stillness #Serenity #White #Blue</p>
            </div>
          </div>
        </li>
      </ul>

      {/* Feature Gallery 1: Another scene */}
      <section className="work-detail__section work-detail__gallery work-detail__gallery--park-haein-chrome-4-seasons-mobile">
        <div className="work-detail__gallery-header">
          <h3 className="work-detail__gallery-title">Another scene</h3>
          <div className="work-detail__gallery-subtitle">
            <p>Detail Shots</p>
          </div>
        </div>
        <div className="work-detail__gallery-grid">
          <div className="work-detail__gallery-column work-detail__gallery-column--1">
            <div className="work-detail__gallery-item">
              <img
                src={parkHaeinWork1_09}
                alt="Detail Shot 1"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, parkHaeinWork1_09, work.id, 'gallery-1')}
                loading="lazy"
              />
            </div>
          </div>
          <div className="work-detail__gallery-column work-detail__gallery-column--2">
            <div className="work-detail__gallery-item">
              <img
                src={parkHaeinWork1_10}
                alt="Detail Shot 2"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, parkHaeinWork1_10, work.id, 'gallery-2')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={parkHaeinWork1_11}
                alt="Detail Shot 3"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, parkHaeinWork1_11, work.id, 'gallery-3')}
                loading="lazy"
              />
            </div>
          </div>
          <div className="work-detail__gallery-column work-detail__gallery-column--3">
            <div className="work-detail__gallery-item">
              <img
                src={parkHaeinWork1_12}
                alt="Detail Shot 4"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, parkHaeinWork1_12, work.id, 'gallery-4')}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Card 1: Instagram */}
      <section className="work-detail__section work-detail__instagram-card work-detail__instagram-card--park-haein-chrome-4-seasons-mobile">
        <article className="work-detail__instagram-card-inner">
          <div className="work-detail__instagram-card-image-wrapper">
            <img
              src={parkHaeinWork1_13}
              alt="@haein_524"
              className="work-detail__instagram-card-image"
              onError={(e) => handleImageError(e, parkHaeinWork1_13, work.id, 'instagram')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__instagram-card-body">
            <div className="work-detail__instagram-card-text">
              <h5 className="work-detail__instagram-card-title">@haein_524</h5>
              <div className="work-detail__instagram-card-subtitle">
                <p>Work by Haein Park</p>
              </div>
            </div>
            <div className="work-detail__instagram-card-description">
              <p>You can find more of my works on Instagram →</p>
            </div>
          </div>
        </article>
      </section>

      {/* Text 1 */}
      <section className="work-detail__section work-detail__text-section work-detail__text-section--park-haein-chrome-4-seasons-mobile">
        <div className="work-detail__text-content">
          <p>This project is a personal work created for non-commercial purposes, inspired by Chrome Hearts.</p>
        </div>
      </section>
    </div>
  );
};

export default ParkHaeinChrome4SeasonsMobile;
