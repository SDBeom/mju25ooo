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
      </section>

      {/* Text Section */}
      <section className="work-detail__section work-detail__text-section work-detail__text-section--seorin-ravenx-mobile">
        <div className="work-detail__text-headline">
          <p className="work-detail__eyebrow-text">BUILT TO PROTECT WHAT REMAINS OF MANKIND</p>
          <h3 className="work-detail__subtitle">DARK FLIGHT, RAVEN-X</h3>
        </div>
        <div className="work-detail__text-content">
          <p>첨단 기술이 고도로 발전한 시대 RAVEN-X는 내부의 위협과 테러로부터 인간을 수호하는 임무를 수행한다. 강인한 외관 속에 정교하게 설계된 구조는 위협적이면서도 우아한 곡선을 이루며 미래 전투기의 가능성을 직관적으로 느끼게 한다.</p>
        </div>
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
          <p>이 전투기는 단순한 형태를 넘어 실제로 동작 가능한 구조와 메커니즘을 고려하여 제작되었다. 특히 엔진 회전축의 분할 구조, 꼬리의 접힘 각도, 동체의 회전 중심 등 기계적 연결 관계를 기반으로 모델링되었으며 실제 작동 원리를 바탕으로 한 자연스러운 움직임을 구현하고자 했다.</p>
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
            <p>RAVEN-X의 실루엣을 보여주는 탑뷰이다. 매끄럽게 이어지는 곡선과 날카로운 엣지가 공존한다.</p>
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
            <p>정교한 구조를 통해 엔진의 강력한 추진력과 기술적 완성도를 드러낸다.</p>
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
            <p>공기 역학적 라인을 따라 설계된 꼬리 구조로, 고속 비행 중에도 안정적인 밸런스를 유지한다.</p>
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
              <p>이 이미지는 Autodesk MAYA를 사용하여 텍스처와 라이팅을 적용한 RAVEN-X의 최종 렌더이다.</p>
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
              <p>같은 컷을 기준으로 RAVEN-X의 모델링 구조와 폴리곤 디테일을 확인할 수 있도록 와이어 프레임으로 렌더한 이미지이다.</p>
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
          <p>어둠 속 격납고를 벗어나, RAVEN-X는 빛을 향해 비상한다.</p>
        </div>
      </section>

      {/* Marquee Section - Turntable Renders */}
      <section className="work-detail__section work-detail__marquee work-detail__marquee--seorin-ravenx-mobile">
        <h3 className="work-detail__marquee-text">Turntable Renders</h3>
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
            <p>완성된 텍스처와 라이팅을 통해 작품의 분위기와 질감을 표현한 뷰티 이미지이다.</p>
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
            <p>텍스처를 제외하고 형태와 구조에 집중하여 모델링의 형태미를 보여주는 그레이 이미지이다.</p>
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
            <p>모델링의 폴리곤 구조와 디테일을 확인할 수 있는 와이어프레임 이미지이다.</p>
          </div>
        </li>
      </ul>

      {/* Marquee Section - RAVEN-X Flight Modes */}
      <section className="work-detail__section work-detail__marquee work-detail__marquee--seorin-ravenx-mobile">
        <h3 className="work-detail__marquee-text">RAVEN-X Flight Modes</h3>
      </section>

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
            <p>지면 착륙 시 안정성을 확보하기 위해 착륙 장치가 전개되어 부드럽게 착지할 수 있는 형태로 전환된다.</p>
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
            <p>저속 비행 시에는 공기 흐름을 안정적으로 제어하도록 설계된 형태로 변한다.</p>
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
            <p>고속 비행 시에는 꼬리 구조가 접히며 위로 상승해 공기 저항을 최소화하고 속도를 극대화할 수 있는 형태로 전환된다.</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SeoRinRavenXMobile;
