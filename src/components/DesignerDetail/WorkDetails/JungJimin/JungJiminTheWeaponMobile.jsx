import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/JungJiminTheWeapon/JungJiminTheWeaponMobile.css';

// 이미지 임포트
import jungJiminWork2_01 from '../../../../assets/정지민/jungjimin_gamecontent_work2_The_weapon_Desktop_01.webp';
import jungJiminWork2_02 from '../../../../assets/정지민/jungjimin_gamecontent_work2_The_weapon_Desktop_02.webp';
import jungJiminWork2_03 from '../../../../assets/정지민/jungjimin_gamecontent_work2_The_weapon_Desktop_03.webp';
import jungJiminWork2_04 from '../../../../assets/정지민/jungjimin_gamecontent_work2_The_weapon_Desktop_04.webp';
import jungJiminWork2_05 from '../../../../assets/정지민/jungjimin_gamecontent_work2_The_weapon_Desktop_05.webp';
import jungJiminWork2_06 from '../../../../assets/정지민/jungjimin_gamecontent_work2_The_weapon_Desktop_06.webp';
import jungJiminWork2_07 from '../../../../assets/정지민/jungjimin_gamecontent_work2_The_weapon_Desktop_07.webp';
import jungJiminWork2_08 from '../../../../assets/정지민/jungjimin_gamecontent_work2_The_weapon_Desktop_08.webp';
import jungJiminWork2_09 from '../../../../assets/정지민/jungjimin_gamecontent_work2_The_weapon_Desktop_09.webp';
import jungJiminWork2_10 from '../../../../assets/정지민/jungjimin_gamecontent_work2_The_weapon_Desktop_10.webp';
import jungJiminWork2_11 from '../../../../assets/정지민/jungjimin_gamecontent_work2_The_weapon_Desktop_11.webp';

/**
 * 정지민 - The Weapon (작품2) Mobile 버전
 * Figma 디자인 기반 구현 (375px)
 */
const JungJiminTheWeaponMobile = ({ work, designer, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--jungjimin-the-weapon-mobile">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--jungjimin-weapon-mobile">
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--jungjimin-weapon-mobile">
          <img
            src={jungJiminWork2_01}
            alt={work.title || 'The weapon'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, jungJiminWork2_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
        <div className="work-detail__hero-content work-detail__hero-content--jungjimin-weapon-mobile">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--jungjimin-weapon-mobile">
              {work.title || 'The weapon'}
            </h2>
            <p className="work-detail__lead work-detail__lead--jungjimin-weapon-mobile">
              {work.summary || '무기 모델링'}
            </p>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--jungjimin-weapon-mobile">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--jungjimin-weapon-mobile`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Feature Section 1 - 무기 */}
      <section className="work-detail__section work-detail__feature work-detail__feature--jungjimin-weapon-mobile">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--jungjimin-weapon-mobile">
          <img
            src={jungJiminWork2_02}
            alt="무기"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, jungJiminWork2_02, work.id, 'feature-1')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text work-detail__feature-text--below">
          <h4 className="work-detail__feature-title">무기</h4>
        </div>
      </section>

      {/* Feature Rows Section */}
      <ul className="work-detail__section work-detail__feature-rows work-detail__feature-rows--jungjimin-weapon-mobile">
        {/* Row 1 - 도끼 */}
        <li className="work-detail__feature-row work-detail__feature-row--jungjimin-weapon-mobile">
          <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--jungjimin-weapon-mobile">
            <img
              src={jungJiminWork2_03}
              alt="도끼"
              className="work-detail__feature-image"
              onError={(e) => handleImageError(e, jungJiminWork2_03, work.id, 'feature-row-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-text work-detail__feature-text--below">
            <h4 className="work-detail__feature-title">도끼</h4>
            <p>문양 강조</p>
          </div>
        </li>

        {/* Row 2 - 검 */}
        <li className="work-detail__feature-row work-detail__feature-row--jungjimin-weapon-mobile">
          <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--jungjimin-weapon-mobile">
            <img
              src={jungJiminWork2_04}
              alt="검"
              className="work-detail__feature-image"
              onError={(e) => handleImageError(e, jungJiminWork2_04, work.id, 'feature-row-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-text work-detail__feature-text--below">
            <h4 className="work-detail__feature-title">검</h4>
            <p>무기의 세부 디테일과 문양 강조</p>
          </div>
        </li>
      </ul>

      {/* Feature Section 3 - 무기 */}
      <section className="work-detail__section work-detail__feature work-detail__feature--jungjimin-weapon-mobile work-detail__feature--image-top">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--jungjimin-weapon-mobile work-detail__feature-image-wrapper--small">
          <img
            src={jungJiminWork2_05}
            alt="무기"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, jungJiminWork2_05, work.id, 'feature-3')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text work-detail__feature-text--below">
          <h4 className="work-detail__feature-title">무기</h4>
          <p>스타일 강조</p>
        </div>
      </section>

      {/* Feature Cards Section */}
      <ul className="work-detail__section work-detail__cards work-detail__cards--jungjimin-weapon-mobile">
        <li className="work-detail__card work-detail__card--jungjimin-weapon-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={jungJiminWork2_06}
              alt="도끼"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, jungJiminWork2_06, work.id, 'card-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">도끼</h5>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--jungjimin-weapon-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={jungJiminWork2_07}
              alt="검"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, jungJiminWork2_07, work.id, 'card-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">검</h5>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--jungjimin-weapon-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={jungJiminWork2_08}
              alt="무기"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, jungJiminWork2_08, work.id, 'card-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">무기</h5>
          </div>
        </li>
      </ul>

      {/* Feature Bento Section */}
      <ul className="work-detail__section work-detail__bento work-detail__bento--jungjimin-weapon-mobile">
        <li className="work-detail__bento-card work-detail__bento-card--jungjimin-weapon-mobile">
          <div className="work-detail__bento-card-image-wrapper">
            <img
              src={jungJiminWork2_09}
              alt="문양"
              className="work-detail__bento-card-image"
              onError={(e) => handleImageError(e, jungJiminWork2_09, work.id, 'bento-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-card-text">
            <h5 className="work-detail__bento-card-title">문양</h5>
          </div>
        </li>
        <li className="work-detail__bento-card work-detail__bento-card--jungjimin-weapon-mobile">
          <div className="work-detail__bento-card-image-wrapper">
            <img
              src={jungJiminWork2_10}
              alt="도끼"
              className="work-detail__bento-card-image"
              onError={(e) => handleImageError(e, jungJiminWork2_10, work.id, 'bento-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-card-text">
            <h5 className="work-detail__bento-card-title">도끼</h5>
          </div>
        </li>
        <li className="work-detail__bento-card work-detail__bento-card--jungjimin-weapon-mobile">
          <div className="work-detail__bento-card-image-wrapper">
            <img
              src={jungJiminWork2_11}
              alt="도끼"
              className="work-detail__bento-card-image"
              onError={(e) => handleImageError(e, jungJiminWork2_11, work.id, 'bento-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-card-text">
            <h5 className="work-detail__bento-card-title">도끼</h5>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default JungJiminTheWeaponMobile;
