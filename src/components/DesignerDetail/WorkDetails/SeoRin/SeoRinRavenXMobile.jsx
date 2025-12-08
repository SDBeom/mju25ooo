import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/SeoRinRavenX/SeoRinRavenXMobile.css';

// 이미지 임포트
import seoRinWork1_01 from '../../../../assets/전서린/jeonseorin_gamecontent_work1_01.webp';
import seoRinWork1_02 from '../../../../assets/전서린/jeonseorin_gamecontent_work1_02.webp';
import seoRinWork1_03 from '../../../../assets/전서린/jeonseorin_gamecontent_work1_03.webp';
import seoRinWork1_04 from '../../../../assets/전서린/jeonseorin_gamecontent_work1_04.webp';
import seoRinWork1_05 from '../../../../assets/전서린/jeonseorin_gamecontent_work1_05.webp';
import seoRinWork1_06 from '../../../../assets/전서린/jeonseorin_gamecontent_work1_06.webp';
import seoRinWork1_07 from '../../../../assets/전서린/jeonseorin_gamecontent_work1_07.webp';
import seoRinWork1_08 from '../../../../assets/전서린/jeonseorin_gamecontent_work1_08.webp';
import seoRinWork1_09 from '../../../../assets/전서린/jeonseorin_gamecontent_work1_09.webp';
import seoRinWork1_10 from '../../../../assets/전서린/jeonseorin_gamecontent_work1_10.webp';
import seoRinWork1_11 from '../../../../assets/전서린/jeonseorin_gamecontent_work1_11.webp';
import seoRinWork1_12 from '../../../../assets/전서린/jeonseorin_gamecontent_work1_12.webp';
import seoRinWork1_13 from '../../../../assets/전서린/jeonseorin_gamecontent_work1_13.webp';
import seoRinWork1_14 from '../../../../assets/전서린/jeonseorin_gamecontent_work1_14.webp';
import seoRinWork1_15 from '../../../../assets/전서린/jeonseorin_gamecontent_work1_15.webp';
import seoRinWork1_16 from '../../../../assets/전서린/jeonseorin_gamecontent_work1_16.webp';
import seoRinWork1_17 from '../../../../assets/전서린/jeonseorin_gamecontent_work1_17.webp';
import seoRinWork1_18 from '../../../../assets/전서린/jeonseorin_gamecontent_work1_18.webp';
import seoRinWork1_19 from '../../../../assets/전서린/jeonseorin_gamecontent_work1_19.webp';
import seoRinWork1_20 from '../../../../assets/전서린/jeonseorin_gamecontent_work1_20.webp';
import seoRinWork1_21 from '../../../../assets/전서린/jeonseorin_gamecontent_work1_21.webp';

/**
 * 전서린 - RAVEN-X (작품1) Mobile 버전
 * Figma 디자인 기반 구현 (375px)
 */
const SeoRinRavenXMobile = ({ work, designer, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--seorin-ravenx-mobile">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--seorin-ravenx-mobile">
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--seorin-ravenx-mobile">
          <img
            src={seoRinWork1_01}
            alt="RAVEN-X"
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, seoRinWork1_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
        <div className="work-detail__hero-content work-detail__hero-content--seorin-ravenx-mobile">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--seorin-ravenx-mobile">
              RAVEN-X
            </h2>
            <p className="work-detail__lead work-detail__lead--seorin-ravenx-mobile">
              매끄러운 곡선 속 숨은 날카로운 실루엣, RAVEN-X는 까마귀 형상으로 디자인된 미래 전투기이다.
            </p>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--seorin-ravenx-mobile">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--seorin-ravenx-mobile`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Text Section (Hero 내부 포함) */}
        <section className="work-detail__section work-detail__text-section work-detail__text-section--seorin-ravenx-mobile">
          <div className="work-detail__text-headline">
            <p className="work-detail__eyebrow-text">BUILT TO PROTECT WHAT REMAINS OF MANKIND</p>
            <h3 className="work-detail__subtitle">DARK FLIGHT, RAVEN-X</h3>
          </div>
          <div className="work-detail__text-content">
            <p>{`첨단 기술과 고도로 발전한 RAVEN-X는 협력으로 인간을 보호하는 무인 비행체다. 강인한 외형에 교묘하게 계획된 구조로`}</p>
            <p>{`협력하면서 아름다운 곡선 실루엣으로 미래 전투기의 가능성을 직접으로 끼워 넣었다. `}</p>
            <p>&nbsp;</p>
            <p>{`RAVEN-X는 지구의 대기권은 물론 광활한 우주 공간까지 자유롭게 비행할 수 있도록 계획되었던 각 비행 모드에 따라 자동으로 최적화된 꼬리 구조로`}</p>
            <p>{`상황에 맞게 공기 저항을 최소화하여 극한의 가속력을 발휘한다. 또한 360도 전방향 가능한 진정한 스타일로 모든 방향 기동이 가능하다. `}</p>
            <p>RAVEN-X는 기계 구조의 성능과 모션 리얼리티를 연구한 작품으로 구조의 획득과 움직임의 자연스러움을 형상으로 구현한다.</p>
          </div>
        </section>
      </section>

      {/* Feature Section - RAVEN-X */}
      <section className="work-detail__section work-detail__feature work-detail__feature--seorin-ravenx-mobile">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--seorin-ravenx-mobile">
          <img
            src={seoRinWork1_02}
            alt="RAVEN-X"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, seoRinWork1_02, work.id, 'feature-1')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title">RAVEN-X</h4>
          <p>{`이 전투기는 순수한 형태로부터 제작 가능한 구조와 메커니즘을 고려하여 제작되었으며 진정한 전축의 분할 구조, `}</p>
          <p>{`꼬리의 각도, 전체의 전진 중심과 기계의 결합 관계를 기반으로 모델링되어 실제 동작 원리를 바탕으로 자연스러운 움직임을`}</p>
          <p>구현하고 있다.</p>
        </div>
      </section>

      {/* Feature Cards Section - Main body, Engine Part, Tail Structure */}
      <ul className="work-detail__section work-detail__cards work-detail__cards--seorin-ravenx-mobile">
        <li className="work-detail__card work-detail__card--seorin-ravenx-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={seoRinWork1_03}
              alt="Main body"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, seoRinWork1_03, work.id, 'card-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">Main body</h5>
            <p>{`RAVEN-X의 실루엣을 보여주는 뷰다. `}</p>
            <p>{`매끄럽게 이어지는 곡선과 새로운 형태가 `}</p>
            <p>공존한다.</p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--seorin-ravenx-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={seoRinWork1_04}
              alt="Engine Part"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, seoRinWork1_04, work.id, 'card-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">Engine Part</h5>
            <p>{`교묘한 구조로 인해 진정한 강력한 추진력과 `}</p>
            <p>기술의 성능을 보여준다.</p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--seorin-ravenx-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={seoRinWork1_05}
              alt="Tail Structure"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, seoRinWork1_05, work.id, 'card-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">Tail Structure</h5>
            <p>{`공기 저항을 줄이기 위해 계획된 꼬리 구조로 `}</p>
            <p>고속 비행 중에도 안정적인 밸런스를 유지한다.</p>
          </div>
        </li>
      </ul>

      {/* Feature Rows Section - Beauty Render, Wireframe Render */}
      <ul className="work-detail__section work-detail__feature-rows work-detail__feature-rows--seorin-ravenx-mobile">
        {/* Row 1 - Beauty Render */}
        <li className="work-detail__feature-row work-detail__feature-row--seorin-ravenx-mobile">
          <div className="work-detail__feature-row-image-wrapper work-detail__feature-row-image-wrapper--seorin-ravenx-mobile">
            <img
              src={seoRinWork1_06}
              alt="Beauty Render"
              className="work-detail__feature-row-image"
              onError={(e) => handleImageError(e, seoRinWork1_06, work.id, 'feature-row-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-content work-detail__feature-content--seorin-ravenx-mobile">
            <div className="work-detail__feature-text">
              <h4 className="work-detail__feature-title">Beauty Render</h4>
              <p>{`이 이미지는 Autodesk MAYA를 사용하여 스타일을 처리한 라이팅을 적용하여`}</p>
              <p>RAVEN-X의 최종 렌더다.</p>
            </div>
          </div>
        </li>
        {/* Row 2 - Wireframe Render */}
        <li className="work-detail__feature-row work-detail__feature-row--seorin-ravenx-mobile">
          <div className="work-detail__feature-row-image-wrapper work-detail__feature-row-image-wrapper--seorin-ravenx-mobile">
            <img
              src={seoRinWork1_07}
              alt="Wireframe Render"
              className="work-detail__feature-row-image"
              onError={(e) => handleImageError(e, seoRinWork1_07, work.id, 'feature-row-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-content work-detail__feature-content--seorin-ravenx-mobile">
            <div className="work-detail__feature-text">
              <h4 className="work-detail__feature-title">Wireframe Render</h4>
              <p>{`같은 컷을 기반으로 RAVEN-X의 모델 구조와 와이어를 `}</p>
              <p>{`인식할 수 있도록 보여주는 렌더 이미지다.`}</p>
            </div>
          </div>
        </li>
      </ul>

      {/* Gallery Section - Highlights */}
      <section className="work-detail__section work-detail__gallery work-detail__gallery--seorin-ravenx-mobile">
        <div className="work-detail__gallery-header">
          <h3 className="work-detail__gallery-title">Highlights</h3>
        </div>
        <div className="work-detail__gallery-grid">
          <div className="work-detail__gallery-column">
            <div className="work-detail__gallery-item">
              <img
                src={seoRinWork1_08}
                alt="Highlight 1"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, seoRinWork1_08, work.id, 'gallery-1')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={seoRinWork1_09}
                alt="Highlight 2"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, seoRinWork1_09, work.id, 'gallery-2')}
                loading="lazy"
              />
            </div>
          </div>
          <div className="work-detail__gallery-column">
            <div className="work-detail__gallery-item">
              <img
                src={seoRinWork1_10}
                alt="Highlight 3"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, seoRinWork1_10, work.id, 'gallery-3')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={seoRinWork1_11}
                alt="Highlight 4"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, seoRinWork1_11, work.id, 'gallery-4')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={seoRinWork1_12}
                alt="Highlight 5"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, seoRinWork1_12, work.id, 'gallery-5')}
                loading="lazy"
              />
            </div>
          </div>
          <div className="work-detail__gallery-column">
            <div className="work-detail__gallery-item">
              <img
                src={seoRinWork1_13}
                alt="Highlight 6"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, seoRinWork1_13, work.id, 'gallery-6')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={seoRinWork1_14}
                alt="Highlight 7"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, seoRinWork1_14, work.id, 'gallery-7')}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section - The moment RAVEN-X takes off */}
      <section className="work-detail__section work-detail__feature work-detail__feature--seorin-ravenx-mobile">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--seorin-ravenx-mobile">
          <img
            src={seoRinWork1_15}
            alt="The moment RAVEN-X takes off from the hangar"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, seoRinWork1_15, work.id, 'feature-2')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title">The moment RAVEN-X takes off from the hangar</h4>
          <p>어둠의 격납고를 벗어난 RAVEN-X가 빛을 받아 비상한다.</p>
        </div>
      </section>

      {/* Feature Cards Section - Beauty, Grey, Wireframe (with border) */}
      <ul className="work-detail__section work-detail__cards work-detail__cards--seorin-ravenx-mobile work-detail__cards--bordered">
        <li className="work-detail__card work-detail__card--seorin-ravenx-mobile work-detail__card--bordered">
          <div className="work-detail__card-image-wrapper">
            <img
              src={seoRinWork1_16}
              alt="Beauty"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, seoRinWork1_16, work.id, 'card-4')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">Beauty</h5>
            <p>{`성능의 스타일을 처리한 라이팅을 통해 이 작품의`}</p>
            <p>분위기와 질감을 표현한 뷰티 렌더 이미지다.</p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--seorin-ravenx-mobile work-detail__card--bordered">
          <div className="work-detail__card-image-wrapper">
            <img
              src={seoRinWork1_17}
              alt="Grey"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, seoRinWork1_17, work.id, 'card-5')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">Grey</h5>
            <p>{`스타일을 처리하여 외형과 형태의 구조에`}</p>
            <p>{`집중하여 모델링의 형태미를 보여주는 `}</p>
            <p>그레이 렌더 이미지다.</p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--seorin-ravenx-mobile work-detail__card--bordered">
          <div className="work-detail__card-image-wrapper">
            <img
              src={seoRinWork1_18}
              alt="Wireframe"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, seoRinWork1_18, work.id, 'card-6')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">Wireframe</h5>
            <p>모델링의 와이어 구조와 테두리를 인식할 수 있는 와이어프레임 렌더 이미지다.</p>
          </div>
        </li>
      </ul>

      {/* Feature Cards Section - Landing mode, Low-speed flight mode, High-speed flight mode (with border) */}
      <ul className="work-detail__section work-detail__cards work-detail__cards--seorin-ravenx-mobile work-detail__cards--bordered">
        <li className="work-detail__card work-detail__card--seorin-ravenx-mobile work-detail__card--bordered">
          <div className="work-detail__card-image-wrapper">
            <img
              src={seoRinWork1_19}
              alt="Landing mode"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, seoRinWork1_19, work.id, 'card-7')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">Landing mode</h5>
            <p>지상 착륙의 정확성을 보여주기 위해 착륙 바퀴가 펼쳐져 부드럽게 착륙하는 형태로 전환한다.</p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--seorin-ravenx-mobile work-detail__card--bordered">
          <div className="work-detail__card-image-wrapper">
            <img
              src={seoRinWork1_20}
              alt="Low-speed flight mode"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, seoRinWork1_20, work.id, 'card-8')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">Low-speed flight mode</h5>
            <p>저속 비행 시에 공기 흐름의 정확으로 이어지도록 계획된 형태로 변한다.</p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--seorin-ravenx-mobile work-detail__card--bordered">
          <div className="work-detail__card-image-wrapper">
            <img
              src={seoRinWork1_21}
              alt="High-speed flight mode"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, seoRinWork1_21, work.id, 'card-9')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">High-speed flight mode</h5>
            <p>고속 비행 시에 꼬리 구조가 접혀서</p>
            <p>{`상승하는 공기 저항을 최소화하여 속도`}</p>
            <p>극한의 가속을 하는 형태로 전환한다.</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SeoRinRavenXMobile;
