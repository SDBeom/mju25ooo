import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/ParkJinaCrossCooty/ParkJinaCrossCootyTablet.css';

// 이미지 임포트
import parkJinaWork1_01 from '../../../../assets/박진아/parkjina_multimedia_work1_01.webp';
import parkJinaWork1_02 from '../../../../assets/박진아/parkjina_multimedia_work1_02.webp';
import parkJinaWork1_03 from '../../../../assets/박진아/parkjina_multimedia_work1_03.webp';
import parkJinaWork1_04 from '../../../../assets/박진아/parkjina_multimedia_work1_04.webp';
import parkJinaWork1_05 from '../../../../assets/박진아/parkjina_multimedia_work1_05.webp';
import parkJinaWork1_06 from '../../../../assets/박진아/parkjina_multimedia_work1_06.webp';
import parkJinaWork1_07 from '../../../../assets/박진아/parkjina_multimedia_work1_07.webp';
import parkJinaWork1_08 from '../../../../assets/박진아/parkjina_multimedia_work1_08.webp';
import parkJinaWork1_09 from '../../../../assets/박진아/parkjina_multimedia_work1_09.webp';
import parkJinaWork1_10 from '../../../../assets/박진아/parkjina_multimedia_work1_10.webp';
import parkJinaWork1_11 from '../../../../assets/박진아/parkjina_multimedia_work1_11.webp';
import parkJinaWork1_12 from '../../../../assets/박진아/parkjina_multimedia_work1_12.webp';
import parkJinaWork1_13 from '../../../../assets/박진아/parkjina_multimedia_work1_13.webp';
import parkJinaWork1_14 from '../../../../assets/박진아/parkjina_multimedia_work1_14.webp';
import parkJinaWork1_15 from '../../../../assets/박진아/parkjina_multimedia_work1_15.webp';

/**
 * 박진아 - Cross Cooty Tablet 버전
 * Figma 디자인 기반 구현 (800px)
 */
const ParkJinaCrossCootyTablet = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--park-jina-cross-cooty-tablet">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--park-jina-cross-cooty-tablet">
        <div className="work-detail__hero-content work-detail__hero-content--park-jina-cross-cooty-tablet">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--park-jina-cross-cooty-tablet">Cross Cooty</h2>
            <div className="work-detail__lead work-detail__lead--park-jina-cross-cooty-tablet">
              <p>"Share a moment, share a Cooty!"</p>
            </div>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--park-jina-cross-cooty-tablet">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--park-jina-cross-cooty-tablet`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--park-jina-cross-cooty-tablet">
          <img
            src={parkJinaWork1_01}
            alt={work.title || 'Cross Cooty'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, parkJinaWork1_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
      </section>

      {/* Text Section: Cooty Universe */}
      <section className="work-detail__section work-detail__text-section work-detail__text-section--park-jina-cross-cooty-tablet">
        <div className="work-detail__text-headline">
          <h3 className="work-detail__subtitle work-detail__subtitle--park-jina-cross-cooty-tablet">Cooty Universe</h3>
        </div>
        <div className="work-detail__text-content work-detail__text-content--park-jina-cross-cooty-tablet">
          <p>Cross Cooty는 각기 다른 개성과 생명력을 지닌 섬과 존재들이 함께 이루는</p>
          <p>감각적인 생태계 브랜드 세계관이다.</p>
          <p>&nbsp;</p>
          <p>구름 위에 떠 있는 수많은 섬에는 'Cooty'라 불리는 생명체들이 살아가며,</p>
          <p>각 섬은 고유한 색감과 질감,</p>
          <p>그리고 독특한 생물종으로 구성된 하나의 작은 세계를 이룬다.</p>
          <p>&nbsp;</p>
          <p>'Cooty'는 사물이나 식물 등에서 영감을 받아 태어난 개성 있는 존재로,</p>
          <p>자신이 속한 섬의 에너지와 성격을 이어받아 독자적인 형태로 성장한다.</p>
          <p>&nbsp;</p>
          <p>Cooty Universe는 이러한 생명체와 공간들이 유기적으로 연결되며,</p>
          <p>현실과 상의 경계를 확장해 나가는 브랜드 세계이다.</p>
        </div>
      </section>

      {/* Feature Bento: Logo Design */}
      <ul className="work-detail__section work-detail__bento work-detail__bento--park-jina-cross-cooty-tablet">
        <li className="work-detail__bento-card work-detail__bento-card--park-jina-cross-cooty-tablet">
          <div className="work-detail__bento-image-wrapper">
            <img
              src={parkJinaWork1_02}
              alt="Logo Design"
              className="work-detail__bento-image"
              onError={(e) => handleImageError(e, parkJinaWork1_02, work.id, 'bento-logo')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-text">
            <h5 className="work-detail__bento-title">Logo Desgin</h5>
            <div className="work-detail__bento-description">
              <p>'Cross Cooty' 로고는 걸어가는 캐릭터와 글자 디자인이 하나로 이어지는 구조로, 쿠티들의 유쾌한 움직임과 생명력을 시각화했다.</p>
              <p>&nbsp;</p>
              <p>'Cooty'의 'oo'는 캐릭터의 눈처럼 표현되어, 로고 속에서도 생명체의 개성이 드러나며</p>
              <p>단어 자체가 살아 움직이는 듯한 인상을 의도했다.</p>
              <p>&nbsp;</p>
              <p>부드러운 곡선과 따뜻한 컬러 조합은 브랜드의 친근하고 감각적인 세계관을 완성한다.</p>
            </div>
          </div>
        </li>
      </ul>

      {/* Feature Cards: COTONA, MOSSROOT, iCORA */}
      <ul className="work-detail__section work-detail__feature-cards work-detail__feature-cards--park-jina-cross-cooty-tablet">
        <li className="work-detail__feature-card work-detail__feature-card--park-jina-cross-cooty-tablet">
          <div className="work-detail__feature-card-image-wrapper">
            <img
              src={parkJinaWork1_03}
              alt="COTONA"
              className="work-detail__feature-card-image"
              onError={(e) => handleImageError(e, parkJinaWork1_03, work.id, 'feature-card-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-card-text">
            <h5 className="work-detail__feature-card-title">COTONA</h5>
            <div className="work-detail__feature-card-description">
              <p>Soft & Dreamy</p>
            </div>
          </div>
        </li>
        <li className="work-detail__feature-card work-detail__feature-card--park-jina-cross-cooty-tablet">
          <div className="work-detail__feature-card-image-wrapper">
            <img
              src={parkJinaWork1_04}
              alt="MOSSROOT"
              className="work-detail__feature-card-image"
              onError={(e) => handleImageError(e, parkJinaWork1_04, work.id, 'feature-card-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-card-text">
            <h5 className="work-detail__feature-card-title">MOSSROOT</h5>
            <div className="work-detail__feature-card-description">
              <p>Calm & Alive</p>
            </div>
          </div>
        </li>
        <li className="work-detail__feature-card work-detail__feature-card--park-jina-cross-cooty-tablet">
          <div className="work-detail__feature-card-image-wrapper">
            <img
              src={parkJinaWork1_05}
              alt="iCORA"
              className="work-detail__feature-card-image"
              onError={(e) => handleImageError(e, parkJinaWork1_05, work.id, 'feature-card-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-card-text">
            <h5 className="work-detail__feature-card-title">iCORA</h5>
            <div className="work-detail__feature-card-description">
              <p>Clear & Pure</p>
            </div>
          </div>
        </li>
      </ul>

      {/* Feature Rows: Cotton, Moss, Ice */}
      <ul className="work-detail__section work-detail__feature-rows work-detail__feature-rows--park-jina-cross-cooty-tablet">
        <li className="work-detail__feature-row work-detail__feature-row--park-jina-cross-cooty-tablet">
          <div className="work-detail__feature-row-content">
            <h4 className="work-detail__feature-row-title">Cotton</h4>
            <div className="work-detail__feature-row-description">
              <p>구름 사이를 떠도는 파텔빛 섬.</p>
              <p>빛과 색이 어우러져 꿈처럼 머무는 곳.</p>
            </div>
          </div>
          <div className="work-detail__feature-row-image-wrapper">
            <img
              src={parkJinaWork1_06}
              alt="Cotton"
              className="work-detail__feature-row-image"
              onError={(e) => handleImageError(e, parkJinaWork1_06, work.id, 'feature-row-1')}
              loading="lazy"
            />
          </div>
        </li>
        <li className="work-detail__feature-row work-detail__feature-row--park-jina-cross-cooty-tablet">
          <div className="work-detail__feature-row-image-wrapper">
            <img
              src={parkJinaWork1_07}
              alt="Moss"
              className="work-detail__feature-row-image"
              onError={(e) => handleImageError(e, parkJinaWork1_07, work.id, 'feature-row-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-row-content">
            <h4 className="work-detail__feature-row-title">Moss</h4>
            <div className="work-detail__feature-row-description">
              <p>부드러운 초록빛으로 덮인 떠있는 섬.</p>
              <p>이끼와 작은 생명들이 조용히 자라나는 곳.</p>
            </div>
          </div>
        </li>
        <li className="work-detail__feature-row work-detail__feature-row--park-jina-cross-cooty-tablet">
          <div className="work-detail__feature-row-content">
            <h4 className="work-detail__feature-row-title">Ice</h4>
            <div className="work-detail__feature-row-description">
              <p>얼음과 수정으로 이루어진 차가운 섬.</p>
              <p>차가운 공기 속에서 생명이 반짝이는 곳.</p>
            </div>
          </div>
          <div className="work-detail__feature-row-image-wrapper">
            <img
              src={parkJinaWork1_08}
              alt="Ice"
              className="work-detail__feature-row-image"
              onError={(e) => handleImageError(e, parkJinaWork1_08, work.id, 'feature-row-3')}
              loading="lazy"
            />
          </div>
        </li>
      </ul>

      {/* Feature Cards: LUFU, MOSSO, WiVi */}
      <ul className="work-detail__section work-detail__feature-cards work-detail__feature-cards-character work-detail__feature-cards-character--park-jina-cross-cooty-tablet">
        <li className="work-detail__feature-card-character work-detail__feature-card-character--park-jina-cross-cooty-tablet">
          <div className="work-detail__feature-card-character-content">
            <h5 className="work-detail__feature-card-character-title">LUFU</h5>
            <div className="work-detail__feature-card-character-description">
              <p>솜사탕같은 몸으로 하늘을 날 수 있다.</p>
              <p>주변환경과 비슷하게 몸과 날개의 색상을 바꿀 수 있다.</p>
            </div>
          </div>
          <div className="work-detail__feature-card-character-image-wrapper">
            <img
              src={parkJinaWork1_09}
              alt="LUFU"
              className="work-detail__feature-card-character-image"
              onError={(e) => handleImageError(e, parkJinaWork1_09, work.id, 'character-1')}
              loading="lazy"
            />
          </div>
        </li>
        <li className="work-detail__feature-card-character work-detail__feature-card-character--park-jina-cross-cooty-tablet">
          <div className="work-detail__feature-card-character-content">
            <h5 className="work-detail__feature-card-character-title">MOSSO</h5>
            <div className="work-detail__feature-card-character-description">
              <p>기분이 좋은 Mosso는 머리 위에 달린 꽃을 활짝 피운다.</p>
            </div>
          </div>
          <div className="work-detail__feature-card-character-image-wrapper">
            <img
              src={parkJinaWork1_10}
              alt="MOSSO"
              className="work-detail__feature-card-character-image"
              onError={(e) => handleImageError(e, parkJinaWork1_10, work.id, 'character-2')}
              loading="lazy"
            />
          </div>
        </li>
        <li className="work-detail__feature-card-character work-detail__feature-card-character--park-jina-cross-cooty-tablet">
          <div className="work-detail__feature-card-character-content">
            <h5 className="work-detail__feature-card-character-title">WiVi</h5>
            <div className="work-detail__feature-card-character-description">
              <p>하얀 털을 가진 쿠티.</p>
              <p>호기심과 장난기가 많다.</p>
            </div>
          </div>
          <div className="work-detail__feature-card-character-image-wrapper">
            <img
              src={parkJinaWork1_11}
              alt="WiVi"
              className="work-detail__feature-card-character-image"
              onError={(e) => handleImageError(e, parkJinaWork1_11, work.id, 'character-3')}
              loading="lazy"
            />
          </div>
        </li>
      </ul>

      {/* Marquee (empty) */}
      <section className="work-detail__section work-detail__marquee work-detail__marquee--park-jina-cross-cooty-tablet">
        {/* Empty marquee section */}
      </section>

      {/* Feature Bento: Full Width Image */}
      <ul className="work-detail__section work-detail__bento work-detail__bento--park-jina-cross-cooty-tablet">
        <li className="work-detail__bento-card work-detail__bento-card-full work-detail__bento-card-full--park-jina-cross-cooty-tablet">
          <div className="work-detail__bento-image-wrapper">
            <img
              src={parkJinaWork1_12}
              alt="Cross Cooty"
              className="work-detail__bento-image"
              onError={(e) => handleImageError(e, parkJinaWork1_12, work.id, 'bento-full')}
              loading="lazy"
            />
          </div>
        </li>
      </ul>

      {/* Feature Cards: Liggght!!!, miC00rowave, OO/O */}
      <ul className="work-detail__section work-detail__feature-cards work-detail__feature-cards--park-jina-cross-cooty-tablet">
        <li className="work-detail__feature-card work-detail__feature-card--park-jina-cross-cooty-tablet">
          <div className="work-detail__feature-card-image-wrapper">
            <img
              src={parkJinaWork1_13}
              alt="Liggght!!!"
              className="work-detail__feature-card-image"
              onError={(e) => handleImageError(e, parkJinaWork1_13, work.id, 'feature-card-4')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-card-text">
            <h5 className="work-detail__feature-card-title">Liggght!!!</h5>
          </div>
        </li>
        <li className="work-detail__feature-card work-detail__feature-card--park-jina-cross-cooty-tablet">
          <div className="work-detail__feature-card-image-wrapper">
            <img
              src={parkJinaWork1_14}
              alt="miC00rowave"
              className="work-detail__feature-card-image"
              onError={(e) => handleImageError(e, parkJinaWork1_14, work.id, 'feature-card-5')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-card-text">
            <h5 className="work-detail__feature-card-title">miC00rowave</h5>
          </div>
        </li>
        <li className="work-detail__feature-card work-detail__feature-card--park-jina-cross-cooty-tablet">
          <div className="work-detail__feature-card-image-wrapper">
            <img
              src={parkJinaWork1_15}
              alt="OO/O"
              className="work-detail__feature-card-image"
              onError={(e) => handleImageError(e, parkJinaWork1_15, work.id, 'feature-card-6')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-card-text">
            <h5 className="work-detail__feature-card-title">OO/O</h5>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ParkJinaCrossCootyTablet;

