import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/ShimSungbinBoom/ShimSungbinBoomMobile.css';

// 이미지 임포트
import shimSungbinWork2_01 from '../../../../assets/심성빈/심성빈_영상_작품2_01.webp';
import shimSungbinWork2_02 from '../../../../assets/심성빈/심성빈_영상_작품2_02.webp';
import shimSungbinWork2_03 from '../../../../assets/심성빈/심성빈_영상_작품2_03.webp';
import shimSungbinWork2_04 from '../../../../assets/심성빈/심성빈_영상_작품2_04.webp';
import shimSungbinWork2_05 from '../../../../assets/심성빈/심성빈_영상_작품2_05.webp';
import shimSungbinWork2_06 from '../../../../assets/심성빈/심성빈_영상_작품2_06.webp';
import shimSungbinWork2_07 from '../../../../assets/심성빈/심성빈_영상_작품2_07.webp';
import shimSungbinWork2_08 from '../../../../assets/심성빈/심성빈_영상_작품2_08.webp';
import shimSungbinWork2_09 from '../../../../assets/심성빈/심성빈_영상_작품2_09.webp';

/**
 * 심성빈 - BOOM (작품2) Mobile 버전
 * Figma 디자인 기반 구현 (375px)
 */
const ShimSungbinBoomMobile = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--shim-sungbin-boom-mobile">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--shim-sungbin-boom-mobile">
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--shim-sungbin-boom-mobile">
          <img
            src={shimSungbinWork2_01}
            alt={work.title || 'BOOM'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, shimSungbinWork2_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
        <div className="work-detail__hero-content work-detail__hero-content--shim-sungbin-boom-mobile">
          <div className="work-detail__text-group work-detail__text-group--center">
            <h2 className="work-detail__title work-detail__title--shim-sungbin-boom-mobile">BOOM</h2>
            <div className="work-detail__lead work-detail__lead--shim-sungbin-boom-mobile">
              <p className="mb-0">BOOM은 현대인들이 </p>
              <p className="mb-0">트레와 반복적인 일상에서 </p>
              <p className="mb-0">탈출하고자 하는 욕망을 </p>
              <p>폭발이라는 현상을 매개로 표현한 아트워크이다.</p>
            </div>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--shim-sungbin-boom-mobile">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--shim-sungbin-boom-mobile`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Feature Cards 1 Section */}
      <ul className="work-detail__section work-detail__cards work-detail__cards--shim-sungbin-boom-mobile">
        <li className="work-detail__card work-detail__card--shim-sungbin-boom-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={shimSungbinWork2_02}
              alt="Mannequin"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, shimSungbinWork2_02, work.id, 'card-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">Mannequin</h5>
            <p className="work-detail__card-description">과로와 트레에 억압받는 현대인이다. 시간이 흐름에 따라 인내심에 한계가 온다.</p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--shim-sungbin-boom-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={shimSungbinWork2_03}
              alt="Office"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, shimSungbinWork2_03, work.id, 'card-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">Office</h5>
            <div className="work-detail__card-description">
              <p className="mb-0">우리가 자주 접하는 사무실이다. 억압되고 </p>
              <p>자유가 없는 삭막한 공간이다.</p>
            </div>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--shim-sungbin-boom-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={shimSungbinWork2_04}
              alt="Laptop"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, shimSungbinWork2_04, work.id, 'card-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">Laptop</h5>
            <div className="work-detail__card-description">
              <p className="mb-0">영상의 모든 폭발이 결국 하나의 </p>
              <p className="mb-0">망상이였음을 보여주는 장치. </p>
              <p>현실은 달라지는 것이 없음을 은유하였다.</p>
            </div>
          </div>
        </li>
      </ul>

      {/* Feature Bento Section */}
      <ul className="work-detail__section work-detail__bento work-detail__bento--shim-sungbin-boom-mobile">
        <li className="work-detail__bento-card work-detail__bento-card--shim-sungbin-boom-mobile">
          <div className="work-detail__bento-card-image-wrapper">
            <img
              src={shimSungbinWork2_05}
              alt="Calm before the storm"
              className="work-detail__bento-card-image"
              onError={(e) => handleImageError(e, shimSungbinWork2_05, work.id, 'bento-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-card-text">
            <h5 className="work-detail__bento-card-title">Calm before the storm</h5>
            <div className="work-detail__bento-card-description">
              <p className="mb-0">폭발 전, 주인공의 트레가 극에 달하며 </p>
              <p>긴장감이 점점 고조된다.</p>
            </div>
          </div>
        </li>
        <li className="work-detail__bento-card work-detail__bento-card--shim-sungbin-boom-mobile">
          <div className="work-detail__bento-card-image-wrapper">
            <img
              src={shimSungbinWork2_06}
              alt="Climax of the explosion"
              className="work-detail__bento-card-image"
              onError={(e) => handleImageError(e, shimSungbinWork2_06, work.id, 'bento-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-card-text">
            <h5 className="work-detail__bento-card-title">Climax of the explosion</h5>
            <div className="work-detail__bento-card-description">
              <p className="mb-0">폭발이 연속적으로 일어나며 사무실, 계단실, </p>
              <p>회의실 등 건물의 모든곳을 덮친다.</p>
            </div>
          </div>
        </li>
        <li className="work-detail__bento-card work-detail__bento-card--shim-sungbin-boom-mobile work-detail__bento-card--wide">
          <div className="work-detail__bento-card-image-wrapper">
            <img
              src={shimSungbinWork2_07}
              alt="Plot twist"
              className="work-detail__bento-card-image"
              onError={(e) => handleImageError(e, shimSungbinWork2_07, work.id, 'bento-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-card-text work-detail__bento-card-text--wide">
            <h5 className="work-detail__bento-card-title">Plot twist</h5>
            <div className="work-detail__bento-card-description">
              <p className="mb-0">방금까지 본 모든 폭발이 전부 망상이였음을</p>
              <p>노트북을 통해 알 수 있다. 현실은 여전히 바뀌지 않았음을 시사한다.</p>
            </div>
          </div>
        </li>
      </ul>

      {/* Feature Cards 3 Section */}
      <ul className="work-detail__section work-detail__cards work-detail__cards--shim-sungbin-boom-mobile work-detail__cards--feature-3">
        <li className="work-detail__card work-detail__card--shim-sungbin-boom-mobile work-detail__card--feature-3">
          <article className="work-detail__card-article">
            <div className="work-detail__card-text">
              <h5 className="work-detail__card-title">Fluid Simulation</h5>
              <div className="work-detail__card-description">
                <p className="mb-0">블렌더의 Fluid Simulation 기능을 사용하여 폭발 장면의 불꽃, 화염, </p>
                <p>연기 등을 구현하였다.</p>
              </div>
            </div>
            <div className="work-detail__card-image-wrapper work-detail__card-image-wrapper--feature-3">
              <img
                src={shimSungbinWork2_08}
                alt="Fluid Simulation"
                className="work-detail__card-image work-detail__card-image--feature-3"
                onError={(e) => handleImageError(e, shimSungbinWork2_08, work.id, 'card-feature-3-1')}
                loading="lazy"
              />
            </div>
          </article>
        </li>
        <li className="work-detail__card work-detail__card--shim-sungbin-boom-mobile work-detail__card--feature-3">
          <article className="work-detail__card-article">
            <div className="work-detail__card-text">
              <h5 className="work-detail__card-title">Particle Simulation</h5>
              <div className="work-detail__card-description">
                <p className="mb-0">블렌더의 Particle Simulation </p>
                <p className="mb-0">기능을 사용하여 폭발 잔해들과 </p>
                <p>깨진 벽 등을 표현하였다.</p>
              </div>
            </div>
            <div className="work-detail__card-image-wrapper work-detail__card-image-wrapper--feature-3">
              <img
                src={shimSungbinWork2_09}
                alt="Particle Simulation"
                className="work-detail__card-image work-detail__card-image--feature-3"
                onError={(e) => handleImageError(e, shimSungbinWork2_09, work.id, 'card-feature-3-2')}
                loading="lazy"
              />
            </div>
          </article>
        </li>
      </ul>
    </div>
  );
};

export default ShimSungbinBoomMobile;

