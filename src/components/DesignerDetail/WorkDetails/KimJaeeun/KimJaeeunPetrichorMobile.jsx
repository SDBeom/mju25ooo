import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/KimJaeeunPetrichor/KimJaeeunPetrichorMobile.css';

// 이미지 임포트
import kimJaeeunWork2_01 from '../../../../assets/김재은/김재은_Video_작품2_01.webp';
import kimJaeeunWork2_02 from '../../../../assets/김재은/김재은_Video_작품2_02.webp';
import kimJaeeunWork2_03 from '../../../../assets/김재은/김재은_Video_작품2_03.webp';
import kimJaeeunWork2_04 from '../../../../assets/김재은/김재은_Video_작품2_04.webp';
import kimJaeeunWork2_05 from '../../../../assets/김재은/김재은_Video_작품2_05.webp';
import kimJaeeunWork2_06 from '../../../../assets/김재은/김재은_Video_작품2_06.webp';
import kimJaeeunWork2_07 from '../../../../assets/김재은/김재은_Video_작품2_07.webp';

/**
 * 김재은 - PETRICHOR Mobile 버전
 * Figma 디자인 기반 구현 (375px)
 */
const KimJaeeunPetrichorMobile = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--kim-jaeeun-petrichor-mobile">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--kim-jaeeun-petrichor-mobile">
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--kim-jaeeun-petrichor-mobile">
          <img
            src={kimJaeeunWork2_01}
            alt={work.title || 'PETRICHOR'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, kimJaeeunWork2_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
        <div className="work-detail__hero-content work-detail__hero-content--kim-jaeeun-petrichor-mobile">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--kim-jaeeun-petrichor-mobile">PETRICHOR</h2>
            <div className="work-detail__lead work-detail__lead--kim-jaeeun-petrichor-mobile">
              <p>황폐한 사막과 메마른 바람 속에서</p>
              <p>다시 피어나는 희망의 순간을 담은</p>
              <p>시시네마틱 숏 필름.</p>
            </div>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--kim-jaeeun-petrichor-mobile">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--kim-jaeeun-petrichor-mobile`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Feature List - The Discovery of Hope & The Beginning of the Journey */}
      <ul className="work-detail__section work-detail__feature-list work-detail__feature-list--kim-jaeeun-petrichor-mobile">
        <li className="work-detail__feature-list-item">
          <div className="work-detail__feature-image-wrapper">
            <img
              src={kimJaeeunWork2_02}
              alt="The Discovery of Hope"
              className="work-detail__feature-image"
              onError={(e) => handleImageError(e, kimJaeeunWork2_02, work.id, 'feature-discovery')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-text">
            <h4 className="work-detail__feature-title">The Discovery of Hope</h4>
            <div className="work-detail__feature-description">
              <p>여행자는 죽어가는 세계 속에서 희망을</p>
              <p>발견하게 된다.</p>
            </div>
          </div>
        </li>
        <li className="work-detail__feature-list-item">
          <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--offset">
            <img
              src={kimJaeeunWork2_03}
              alt="The Beginning of the Journey"
              className="work-detail__feature-image"
              onError={(e) => handleImageError(e, kimJaeeunWork2_03, work.id, 'feature-beginning')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-text">
            <h4 className="work-detail__feature-title">The Beginning of the Journey</h4>
            <div className="work-detail__feature-description">
              <p>희망만을 작품은 채 여행자는 기나긴 여행을</p>
              <p>떠나게 된다.</p>
            </div>
          </div>
        </li>
        <li className="work-detail__feature-bento-wrapper">
          {/* Feature Bento Cards */}
          <ul className="work-detail__feature-bento work-detail__feature-bento--kim-jaeeun-petrichor-mobile">
            <li className="work-detail__feature-bento-card">
              <div className="work-detail__feature-bento-image-wrapper">
                <img
                  src={kimJaeeunWork2_04}
                  alt="A Parched World"
                  className="work-detail__feature-bento-image"
                  onError={(e) => handleImageError(e, kimJaeeunWork2_04, work.id, 'bento-parched')}
                  loading="lazy"
                />
              </div>
              <div className="work-detail__feature-bento-text">
                <h5 className="work-detail__feature-bento-title">A Parched World</h5>
                <div className="work-detail__feature-bento-description">
                  <p>생명이 사라진 메마른 세상.</p>
                </div>
              </div>
            </li>
            <li className="work-detail__feature-bento-card">
              <div className="work-detail__feature-bento-image-wrapper">
                <img
                  src={kimJaeeunWork2_05}
                  alt="A Forsaken World"
                  className="work-detail__feature-bento-image"
                  onError={(e) => handleImageError(e, kimJaeeunWork2_05, work.id, 'bento-forsaken')}
                  loading="lazy"
                />
              </div>
              <div className="work-detail__feature-bento-text">
                <h5 className="work-detail__feature-bento-title">A Forsaken World</h5>
                <div className="work-detail__feature-bento-description">
                  <p>오래된, 망가지고 버려진 세상</p>
                </div>
              </div>
            </li>
            <li className="work-detail__feature-bento-card">
              <div className="work-detail__feature-bento-image-wrapper">
                <img
                  src={kimJaeeunWork2_06}
                  alt="A World Being Buried"
                  className="work-detail__feature-bento-image"
                  onError={(e) => handleImageError(e, kimJaeeunWork2_06, work.id, 'bento-buried')}
                  loading="lazy"
                />
              </div>
              <div className="work-detail__feature-bento-text">
                <h5 className="work-detail__feature-bento-title">A World Being Buried</h5>
                <div className="work-detail__feature-bento-description">
                  <p>묻히고 잊혀진 세상</p>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>

      {/* Feature Section - And Then, the Discovery */}
      <section className="work-detail__section work-detail__feature work-detail__feature--kim-jaeeun-petrichor-mobile">
        <div className="work-detail__feature-image-wrapper">
          <img
            src={kimJaeeunWork2_07}
            alt="And Then, the Discovery"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, kimJaeeunWork2_07, work.id, 'feature-discovery-final')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title">And Then, the Discovery</h4>
          <div className="work-detail__feature-description">
            <p>그리고 마침내 찾아낸 유토피아.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KimJaeeunPetrichorMobile;
