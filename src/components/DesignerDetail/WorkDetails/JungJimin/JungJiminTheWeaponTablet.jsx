import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/JungJiminTheWeapon/JungJiminTheWeaponTablet.css';

// 이미지 임포트
import jungJiminWork2_01 from '../../../../assets/정지민/정지민_게임콘텐츠_작품2_The_weapon_Desktop_01.webp';
import jungJiminWork2_02 from '../../../../assets/정지민/정지민_게임콘텐츠_작품2_The_weapon_Desktop_02.webp';
import jungJiminWork2_03 from '../../../../assets/정지민/정지민_게임콘텐츠_작품2_The_weapon_Desktop_03.webp';
import jungJiminWork2_04 from '../../../../assets/정지민/정지민_게임콘텐츠_작품2_The_weapon_Desktop_04.webp';
import jungJiminWork2_05 from '../../../../assets/정지민/정지민_게임콘텐츠_작품2_The_weapon_Desktop_05.webp';
import jungJiminWork2_06 from '../../../../assets/정지민/정지민_게임콘텐츠_작품2_The_weapon_Desktop_06.webp';
import jungJiminWork2_07 from '../../../../assets/정지민/정지민_게임콘텐츠_작품2_The_weapon_Desktop_07.webp';
import jungJiminWork2_08 from '../../../../assets/정지민/정지민_게임콘텐츠_작품2_The_weapon_Desktop_08.webp';
import jungJiminWork2_09 from '../../../../assets/정지민/정지민_게임콘텐츠_작품2_The_weapon_Desktop_09.webp';
import jungJiminWork2_10 from '../../../../assets/정지민/정지민_게임콘텐츠_작품2_The_weapon_Desktop_10.webp';
import jungJiminWork2_11 from '../../../../assets/정지민/정지민_게임콘텐츠_작품2_The_weapon_Desktop_11.webp';

/**
 * ���- The Weapon (�작품2) Tablet 버전
 * Figma �디자인 기반 구현 (800px)
 */
const JungJiminTheWeaponTablet = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--jungjimin-the-weapon-tablet">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--jungjimin-weapon-tablet">
        <div className="work-detail__hero-content work-detail__hero-content--jungjimin-weapon-tablet">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--jungjimin-weapon-tablet">
              {work.title || 'The weapon'}
            </h2>
            <p className="work-detail__lead work-detail__lead--jungjimin-weapon-tablet">
              {work.summary || '무기 모델링'}
            </p>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--jungjimin-weapon-tablet">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--jungjimin-weapon-tablet`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--jungjimin-weapon-tablet">
          <img
            src={jungJiminWork2_01}
            alt={work.title || 'The weapon'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, jungJiminWork2_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
      </section>

      {/* Feature Section 1 - �� */}
      <section className="work-detail__section work-detail__feature work-detail__feature--jungjimin-weapon-tablet">
        <div className="work-detail__feature-content work-detail__feature-content--jungjimin-weapon-tablet">
          <div className="work-detail__feature-text">
            <h4 className="work-detail__feature-title">��</h4>
            <p>문양 강조</p>
          </div>
        </div>
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--jungjimin-weapon-tablet">
          <img
            src={jungJiminWork2_02}
            alt="��"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, jungJiminWork2_02, work.id, 'feature-1')}
            loading="lazy"
          />
        </div>
      </section>

      {/* Feature Rows Section */}
      <ul className="work-detail__section work-detail__feature-rows work-detail__feature-rows--jungjimin-weapon-tablet">
        {/* Row 1 - �머 */}
        <li className="work-detail__feature-row work-detail__feature-row--jungjimin-weapon-tablet">
          <div className="work-detail__feature-content work-detail__feature-content--jungjimin-weapon-tablet">
            <div className="work-detail__feature-text">
              <h4 className="work-detail__feature-title">�머</h4>
              <p>문양 강조</p>
            </div>
          </div>
          <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--jungjimin-weapon-tablet">
            <img
              src={jungJiminWork2_03}
              alt="�머"
              className="work-detail__feature-image"
              onError={(e) => handleImageError(e, jungJiminWork2_03, work.id, 'feature-row-1')}
              loading="lazy"
            />
          </div>
        </li>

        {/* Row 2 - �검 (reverse) */}
        <li className="work-detail__feature-row work-detail__feature-row--jungjimin-weapon-tablet work-detail__feature-row--reverse">
          <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--jungjimin-weapon-tablet">
            <img
              src={jungJiminWork2_04}
              alt="�검"
              className="work-detail__feature-image"
              onError={(e) => handleImageError(e, jungJiminWork2_04, work.id, 'feature-row-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-content work-detail__feature-content--jungjimin-weapon-tablet">
            <div className="work-detail__feature-text">
              <h4 className="work-detail__feature-title">�검</h4>
              <p>무기의 세부 디테일과 문양 강조</p>
            </div>
          </div>
        </li>
      </ul>

      {/* Feature Section 3 - �� */}
      <section className="work-detail__section work-detail__feature work-detail__feature--jungjimin-weapon-tablet work-detail__feature--image-top">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--jungjimin-weapon-tablet work-detail__feature-image-wrapper--large">
          <img
            src={jungJiminWork2_05}
            alt="��"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, jungJiminWork2_05, work.id, 'feature-3')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text work-detail__feature-text--below">
          <h4 className="work-detail__feature-title">��</h4>
          <p>�스타일을�강조</p>
        </div>
      </section>

      {/* Feature Cards Section */}
      <ul className="work-detail__section work-detail__cards work-detail__cards--jungjimin-weapon-tablet">
        <li className="work-detail__card work-detail__card--jungjimin-weapon-tablet">
          <div className="work-detail__card-image-wrapper">
            <img
              src={jungJiminWork2_06}
              alt="�머"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, jungJiminWork2_06, work.id, 'card-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">�머</h5>
            <p>�세</p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--jungjimin-weapon-tablet">
          <div className="work-detail__card-image-wrapper">
            <img
              src={jungJiminWork2_07}
              alt="��"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, jungJiminWork2_07, work.id, 'card-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">��</h5>
            <p>�세</p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--jungjimin-weapon-tablet">
          <div className="work-detail__card-image-wrapper">
            <img
              src={jungJiminWork2_08}
              alt="��"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, jungJiminWork2_08, work.id, 'card-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">��</h5>
            <p>�세</p>
          </div>
        </li>
      </ul>

      {/* Feature Bento Section */}
      <ul className="work-detail__section work-detail__bento work-detail__bento--jungjimin-weapon-tablet">
        <li className="work-detail__bento-card work-detail__bento-card--jungjimin-weapon-tablet-1">
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
        <li className="work-detail__bento-card work-detail__bento-card--jungjimin-weapon-tablet-2">
          <div className="work-detail__bento-card-image-wrapper">
            <img
              src={jungJiminWork2_10}
              alt="�머"
              className="work-detail__bento-card-image"
              onError={(e) => handleImageError(e, jungJiminWork2_10, work.id, 'bento-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-card-text">
            <h5 className="work-detail__bento-card-title">�머</h5>
          </div>
        </li>
        <li className="work-detail__bento-card work-detail__bento-card--jungjimin-weapon-tablet-3">
          <div className="work-detail__bento-card-image-wrapper">
            <img
              src={jungJiminWork2_11}
              alt="�머"
              className="work-detail__bento-card-image"
              onError={(e) => handleImageError(e, jungJiminWork2_11, work.id, 'bento-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-card-text">
            <h5 className="work-detail__bento-card-title">�머</h5>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default JungJiminTheWeaponTablet;
