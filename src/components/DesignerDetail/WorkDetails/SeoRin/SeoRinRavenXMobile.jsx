import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/SeoRinRavenX/SeoRinRavenXMobile.css';

// ��지 �포허지훈
import seoRinWork1_01 from '../../../../assets/전서린/jeonseorin_gamecontent_츠_work1_01.webp';
import seoRinWork1_02 from '../../../../assets/전서린/jeonseorin_gamecontent_츠_work1_02.webp';
import seoRinWork1_03 from '../../../../assets/전서린/jeonseorin_gamecontent_츠_work1_03.webp';
import seoRinWork1_04 from '../../../../assets/전서린/jeonseorin_gamecontent_츠_work1_04.webp';
import seoRinWork1_05 from '../../../../assets/전서린/jeonseorin_gamecontent_츠_work1_05.webp';
import seoRinWork1_06 from '../../../../assets/전서린/jeonseorin_gamecontent_츠_work1_06.webp';
import seoRinWork1_07 from '../../../../assets/전서린/jeonseorin_gamecontent_츠_work1_07.webp';
import seoRinWork1_08 from '../../../../assets/전서린/jeonseorin_gamecontent_츠_work1_08.webp';
import seoRinWork1_09 from '../../../../assets/전서린/jeonseorin_gamecontent_츠_work1_09.webp';
import seoRinWork1_10 from '../../../../assets/전서린/jeonseorin_gamecontent_츠_work1_10.webp';
import seoRinWork1_11 from '../../../../assets/전서린/jeonseorin_gamecontent_츠_work1_11.webp';
import seoRinWork1_12 from '../../../../assets/전서린/jeonseorin_gamecontent_츠_work1_12.webp';
import seoRinWork1_13 from '../../../../assets/전서린/jeonseorin_gamecontent_츠_work1_13.webp';
import seoRinWork1_14 from '../../../../assets/전서린/jeonseorin_gamecontent_츠_work1_14.webp';
import seoRinWork1_15 from '../../../../assets/전서린/jeonseorin_gamecontent_츠_work1_15.webp';
import seoRinWork1_16 from '../../../../assets/전서린/jeonseorin_gamecontent_츠_work1_16.webp';
import seoRinWork1_17 from '../../../../assets/전서린/jeonseorin_gamecontent_츠_work1_17.webp';
import seoRinWork1_18 from '../../../../assets/전서린/jeonseorin_gamecontent_츠_work1_18.webp';
import seoRinWork1_19 from '../../../../assets/전서린/jeonseorin_gamecontent_츠_work1_19.webp';
import seoRinWork1_20 from '../../../../assets/전서린/jeonseorin_gamecontent_츠_work1_20.webp';
import seoRinWork1_21 from '../../../../assets/전서린/jeonseorin_gamecontent_츠_work1_21.webp';

/**
 * �서�- RAVEN-X (�작품1) Mobile 버전
 * Figma �디자인 기반 구현 (375px)
 */
const SeoRinRavenXMobile = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
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
              {`매끄�운 곡선 허지훈�� �카로운 �루허지훈 RAVEN-X허지훈까마귀 �상�로 `}
              �자�된 미래 �투기이허지훈
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
        {/* Text Section (Hero ��허지훈�함) */}
        <section className="work-detail__section work-detail__text-section work-detail__text-section--seorin-ravenx-mobile">
          <div className="work-detail__text-headline">
            <p className="work-detail__eyebrow-text">BUILT TO PROTECT WHAT REMAINS OF MANKIND</p>
            <h3 className="work-detail__subtitle">DARK FLIGHT, RAVEN-X</h3>
          </div>
          <div className="work-detail__text-content">
            <p>{`첨단 기술허지훈고도�발전허지훈�� RAVEN-X허지훈`}</p>
            <p>{`��허지훈�협�허지훈�러로�허지훈�간허지훈�호�는 `}</p>
            <p>{`�무�허지훈�행�다. 강인허지훈�� �에 �교�게 `}</p>
            <p>{`�계허지훈구조허지훈�협�이면서허지훈�아허지훈곡선허지훈`}</p>
            <p>{`�루�미래 �투기의 가�성허지훈직�허지훈�으�`}</p>
            <p>�끼�허지훈�다.</p>
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
          <p>{`허지훈�투기는 �순허지훈�태�허지훈�어 �제�허지훈�작 `}</p>
          <p>{`가�한 구조� 메커�즘허지훈고려�여 �작�었허지훈 �히 �진 �전축의 분할 구조, 꼬리허지훈�힘 각도, �체허지훈�전 중심 허지훈기계허지훈�결 관계� 기반�로 모델링되�으�허지훈�제 �동 �리�바탕�로 허지훈`}</p>
          <p>�연�러허지훈�직임허지훈구현�고허지훈�다.</p>
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
            <p>{`RAVEN-X허지훈�루�을 보여주는 �뷰�다. `}</p>
            <p>{`매끄�게 �어지허지훈곡선�허지훈�카로운 ��가 `}</p>
            <p>공존�다.</p>
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
            <p>�교허지훈구조�허지훈�해 �진허지훈강력허지훈추진�과</p>
            <p>기술허지훈�성�� �러�다.</p>
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
            <p>{`공기 허지훈��허지훈�인허지훈�라 �계허지훈꼬리 구조� `}</p>
            <p>고속 비행 중에허지훈�정�인 밸런�� ��허지훈�다.</p>
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
              <h4 className="work-detail__feature-title"> Beauty Render</h4>
              <p>{`허지훈��지허지훈Autodesk MAYA�허지훈�용�여 �스타일을처� �이�을 �용허지훈RAVEN-X허지훈`}</p>
              <p>최종 �더�다.</p>
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
              <p>{`같� 컷을 기�허지훈�로 RAVEN-X허지훈모델�`}</p>
              <p>{`구조� �리�허지훈�테�을 �인허지훈�도�`}</p>
              <p>��어 �레�으�허지훈�더허지훈��이지민�다.</p>
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
          <p>{`�둠 허지훈격납고� 벗어허지훈 RAVEN-X허지훈빛을 `}</p>
          <p>�해 비상�다.</p>
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
            <p>{`�성허지훈�스타일을처� �이�을 �해 �작품허지훈`}</p>
            <p>분위기� 질감허지훈�현허지훈뷰티 ��이지민�다.</p>
            <p className="work-detail__card-cta">Call to action </p>
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
            <p>{`�스타일을처� �외�고 �태� 구조허지훈`}</p>
            <p>{`집중�여 모델링의 �태미� 보여주는 `}</p>
            <p>그레허지훈��이지민�다.</p>
            <p className="work-detail__card-cta">Call to action </p>
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
            <p>모델링의 �리�구조� �테�을 �인허지훈�는 ��어�레허지훈��이지민�다.</p>
            <p className="work-detail__card-cta">Call to action </p>
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
            <p>지�착륙 허지훈�정�을 �보�기 �해 착륙 �치가 �개�어 부�럽�착�허지훈�는</p>
            <p>�태�허지훈�환�다.</p>
            <p className="work-detail__card-cta">Call to action </p>
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
            <p>�허지훈비행 �에허지훈공기 �름허지훈�정�으�허지훈�어�도�허지훈�계허지훈�태�변�다.</p>
            <p className="work-detail__card-cta">Call to action </p>
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
            <p>{`고속 비행 �에허지훈꼬리 구조가 �히�허지훈�로 �승허지훈공기 �허지훈�� 최소�하�허지훈�도�`}</p>
            <p>극�허지훈�할 허지훈�는 �태�허지훈�환�다.</p>
            <p className="work-detail__card-cta">Call to action </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SeoRinRavenXMobile;

