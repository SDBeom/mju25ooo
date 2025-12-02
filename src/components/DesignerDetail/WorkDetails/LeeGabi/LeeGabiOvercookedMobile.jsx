import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/LeeGabiOvercooked/LeeGabiOvercookedMobile.css';

// 이미지 임포트
import leegabiWork1_01 from '../../../../assets/이가비/leegabi_gamecontent_츠_work1_01.webp';
import leegabiWork1_02 from '../../../../assets/이가비/leegabi_gamecontent_츠_work1_02.webp';
import leegabiWork1_03 from '../../../../assets/이가비/leegabi_gamecontent_츠_work1_03.webp';
import leegabiWork1_04 from '../../../../assets/이가비/leegabi_gamecontent_츠_work1_04.webp';
import leegabiWork1_05 from '../../../../assets/이가비/leegabi_gamecontent_츠_work1_05.webp';
import leegabiWork1_06 from '../../../../assets/이가비/leegabi_gamecontent_츠_work1_06.webp';
import leegabiWork1_07 from '../../../../assets/이가비/leegabi_gamecontent_츠_work1_07.webp';
import leegabiWork1_08 from '../../../../assets/이가비/leegabi_gamecontent_츠_work1_08.webp';
import leegabiWork1_09 from '../../../../assets/이가비/leegabi_gamecontent_츠_work1_09.webp';
import leegabiWork1_11 from '../../../../assets/이가비/leegabi_gamecontent_츠_work1_11.webp';
import leegabiWork1_12 from '../../../../assets/이가비/leegabi_gamecontent_츠_work1_12.webp';

/**
 * 이가비 - OVERCOOKED: 카페 대소동 (작품1) Mobile 버전
 * Figma 디자인 기반 구현 (375px)
 */
const LeeGabiOvercookedMobile = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--leegabi-overcooked-mobile">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--leegabi-overcooked-mobile">
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--leegabi-overcooked-mobile">
          <img
            src={leegabiWork1_01}
            alt={work.title || 'OVERCOOKED: 카페 대소동'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, leegabiWork1_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
        <div className="work-detail__hero-content work-detail__hero-content--leegabi-overcooked-mobile">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--leegabi-overcooked-mobile">
              <span className="block mb-0">OVERCOOKED</span>
              <span className="block">: 카페 대소동</span>
            </h2>
            <div className="work-detail__lead work-detail__lead--leegabi-overcooked-mobile">
              <p className="mb-0">이전 식당을 운영하다 폭싹 망해버린 요리사들.</p>
              <p className="mb-0">이번엔 카페다! 양파왕의 제안으로 카페에서 일하며 벌어지는</p>
              <p>재미난 이야기.</p>
            </div>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--leegabi-overcooked-mobile">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--leegabi-overcooked-mobile`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Feature Bento Section */}
      <ul className="work-detail__section work-detail__bento work-detail__bento--leegabi-overcooked-mobile">
        <li className="work-detail__bento-card work-detail__bento-card--leegabi-overcooked-mobile">
          <div className="work-detail__bento-image-wrapper">
            <img
              src={leegabiWork1_02}
              alt="양파왕의 고민"
              className="work-detail__bento-image"
              onError={(e) => handleImageError(e, leegabiWork1_02, work.id, 'bento-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-text">
            <h5 className="work-detail__bento-title">양파왕의 고민</h5>
            <p className="work-detail__bento-description">망해버린 가게를 걱정하는 양파왕</p>
          </div>
        </li>
        <li className="work-detail__bento-card work-detail__bento-card--leegabi-overcooked-mobile">
          <div className="work-detail__bento-image-wrapper">
            <img
              src={leegabiWork1_03}
              alt="양파왕의 제안"
              className="work-detail__bento-image"
              onError={(e) => handleImageError(e, leegabiWork1_03, work.id, 'bento-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-text">
            <h5 className="work-detail__bento-title">양파왕의 제안</h5>
            <p className="work-detail__bento-description">식당이 아닌 다른 방법을 제안한다.</p>
          </div>
        </li>
        <li className="work-detail__bento-card work-detail__bento-card--leegabi-overcooked-mobile">
          <div className="work-detail__bento-image-wrapper">
            <img
              src={leegabiWork1_08}
              alt="카페 운영 시작!"
              className="work-detail__bento-image"
              onError={(e) => handleImageError(e, leegabiWork1_08, work.id, 'bento-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-text">
            <h5 className="work-detail__bento-title">카페 운영 시작!</h5>
            <p className="work-detail__bento-description">호기롭게 시작된 카페운영, 하지만 넘처나는 주문에 당황하는 요리사들</p>
          </div>
        </li>
      </ul>

      {/* Feature Gallery Section */}
      <section className="work-detail__section work-detail__gallery work-detail__gallery--leegabi-overcooked-mobile">
        <div className="work-detail__gallery-header">
          <h3 className="work-detail__gallery-title">
            <span className="block mb-0">얼렁뚱땅</span>
            <span className="block">카페운영</span>
          </h3>
          <p className="work-detail__gallery-description">
            <span className="block mb-0">순조롭지만 않은 카페 운영. 협동력을</span>
            <span className="block">발휘해 하나씩 음식을 만들어나간다.</span>
          </p>
        </div>
        <div className="work-detail__gallery-grid">
          <div className="work-detail__gallery-column">
            <div className="work-detail__gallery-item">
              <img
                src={leegabiWork1_05}
                alt="Gallery image 1"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, leegabiWork1_05, work.id, 'gallery-1')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={leegabiWork1_06}
                alt="Gallery image 2"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, leegabiWork1_06, work.id, 'gallery-2')}
                loading="lazy"
              />
            </div>
          </div>
          <div className="work-detail__gallery-column">
            <div className="work-detail__gallery-item">
              <img
                src={leegabiWork1_04}
                alt="Gallery image 3"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, leegabiWork1_04, work.id, 'gallery-3')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item work-detail__gallery-item--empty"></div>
            <div className="work-detail__gallery-item">
              <img
                src={leegabiWork1_09}
                alt="Gallery image 4"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, leegabiWork1_09, work.id, 'gallery-4')}
                loading="lazy"
              />
            </div>
          </div>
          <div className="work-detail__gallery-column">
            <div className="work-detail__gallery-item">
              <img
                src={leegabiWork1_08}
                alt="Gallery image 5"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, leegabiWork1_08, work.id, 'gallery-5')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={leegabiWork1_11}
                alt="Gallery image 6"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, leegabiWork1_11, work.id, 'gallery-6')}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="work-detail__section work-detail__feature work-detail__feature--leegabi-overcooked-mobile">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--leegabi-overcooked-mobile">
          <img
            src={leegabiWork1_12}
            alt="MISSION CLEAR!"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, leegabiWork1_12, work.id, 'feature')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title">MISSION CLEAR!</h4>
          <p className="work-detail__feature-description">
            <span className="block mb-0">많은 주문을 해치운 요리사들,</span>
            <span className="block">그 점수는!</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default LeeGabiOvercookedMobile;

