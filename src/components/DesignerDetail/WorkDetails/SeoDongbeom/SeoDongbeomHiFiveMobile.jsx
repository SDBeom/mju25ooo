import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/SeoDongbeomHiFive/SeoDongbeomHiFiveMobile.css';

// 이미지 임포트
import seoDongbeomWork1_01 from '../../../../assets/서동범/서동범_멀티미디어_작품1_01.webp';
import seoDongbeomWork1_02 from '../../../../assets/서동범/서동범_멀티미디어_작품1_02.webp';
import seoDongbeomWork1_03 from '../../../../assets/서동범/서동범_멀티미디어_작품1_03.webp';
import seoDongbeomWork1_04 from '../../../../assets/서동범/서동범_멀티미디어_작품1_04.webp';
import seoDongbeomWork1_05 from '../../../../assets/서동범/서동범_멀티미디어_작품1_05.webp';
import seoDongbeomWork1_06 from '../../../../assets/서동범/서동범_멀티미디어_작품1_06.webp';

/**
 * 서동범 - HiFive Mobile 버전
 * Figma 디자인 기반 구현 (375px)
 */
const SeoDongbeomHiFiveMobile = ({ work, designer, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--seo-dongbeom-hifive-mobile">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--seo-dongbeom-hifive-mobile">
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--seo-dongbeom-hifive-mobile">
          <img
            src={seoDongbeomWork1_01}
            alt={work.title || 'HiFive'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, seoDongbeomWork1_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
        <div className="work-detail__hero-content work-detail__hero-content--seo-dongbeom-hifive-mobile">
          <div className="work-detail__text-group work-detail__text-group--center">
            <h2 className="work-detail__title work-detail__title--seo-dongbeom-hifive-mobile">HiFive</h2>
            <div className="work-detail__lead work-detail__lead--seo-dongbeom-hifive-mobile">
              <p>HiFive는 프로필이나 관계의 부담 없이, 같은 현장에 모인 사람들이 커서(cursor)가 되어 순간의 분위기(vibe)를 공유하는 실시간 소셜 미디어입니다.</p>
            </div>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--seo-dongbeom-hifive-mobile">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--seo-dongbeom-hifive-mobile`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Feature Bento 1: Background */}
      <ul className="work-detail__section work-detail__bento work-detail__bento--seo-dongbeom-hifive-mobile">
        <li className="work-detail__bento-card work-detail__bento-card--seo-dongbeom-hifive-mobile">
          <div className="work-detail__bento-text">
            <h5 className="work-detail__bento-title">Background</h5>
            <div className="work-detail__bento-description">
              <p>우리는 관계를 맺기 위해 너무 많은 과정을 거칩니다. 새로운 사람과 소통하려면 앱에서 프로필을 교환하고, 약속 일정을 잡아야 했습니다. 혹은 공통점도 모르는 상대에게 먼저 말을 거는 부담을 감수해야 했습니다.</p>
            </div>
          </div>
          <div className="work-detail__bento-image-wrapper">
            <img
              src={seoDongbeomWork1_02}
              alt="Background"
              className="work-detail__bento-image work-detail__bento-image--background"
              onError={(e) => handleImageError(e, seoDongbeomWork1_02, work.id, 'bento-background')}
              loading="lazy"
            />
          </div>
        </li>
      </ul>

      {/* Pull Quote 1 */}
      <section className="work-detail__section work-detail__quote work-detail__quote--seo-dongbeom-hifive-mobile">
        <figure className="work-detail__quote-figure">
          <p className="work-detail__quote-text">"지속적인 관계가 아닌,순간의 현장감을 극대화하는 소셜 미디어."</p>
          <p className="work-detail__quote-subtitle">우리는 왜 군중 속에서 단절을 느낄까</p>
          <p className="work-detail__quote-content">사람들은 '순간의 접촉(contact)'은 무시하고, '지속적인 관계(connection)'만 관리하도록 강요받는다. 관계의 피로감이 만연한 지금, 사용자가 즉시 교감하게 만드는 인터페이스가 필요하다.</p>
        </figure>
      </section>

      {/* Feature 1: App Screen */}
      <section className="work-detail__section work-detail__feature work-detail__feature--seo-dongbeom-hifive-mobile">
        <div className="work-detail__feature-image-wrapper">
          <img
            src={seoDongbeomWork1_03}
            alt="HiFive App Screen"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, seoDongbeomWork1_03, work.id, 'feature')}
                loading="lazy"
              />
        </div>
      </section>

      {/* Marquee 1 - Empty section */}
      <section className="work-detail__section work-detail__marquee work-detail__marquee--seo-dongbeom-hifive-mobile">
        {/* Marquee content will be added here if needed */}
      </section>

      {/* Feature Cards 2 */}
      <ul className="work-detail__section work-detail__cards work-detail__cards--seo-dongbeom-hifive-mobile">
        <li className="work-detail__card work-detail__card--seo-dongbeom-hifive-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={seoDongbeomWork1_04}
              alt="월드맵과 플레이그라운드 기능"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, seoDongbeomWork1_04, work.id, 'card-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">
              <ol className="work-detail__card-title-list">
                <li>월드맵과 플레이그라운드 기능</li>
              </ol>
            </h5>
            <div className="work-detail__card-description">
              <p>하이파이브는 이 모든 과정을 생략합니다. 사용자는 월드맵에서 지금 가장 뜨거운 현장을 발견하고, 같은 현장을 경험한다는 단 하나의 공통분모만으로 즉시 플레이그라운드에 입장합니다.</p>
            </div>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--seo-dongbeom-hifive-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={seoDongbeomWork1_05}
              alt="휘발성 세션 기능"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, seoDongbeomWork1_05, work.id, 'card-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">
              <ol className="work-detail__card-title-list">
                <li>휘발성 세션 기능</li>
              </ol>
            </h5>
            <div className="work-detail__card-description">
              <p>하이파이브의 연결은 관계가 아닌 순간입니다. 사용자가 설정된 현장을 벗어나면, 플레이그라운드와의 연결은 하이파이브처럼 그 즉시, 그리고 자동으로 종료됩니다.</p>
            </div>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--seo-dongbeom-hifive-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={seoDongbeomWork1_06}
              alt="커서 중심 UI"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, seoDongbeomWork1_06, work.id, 'card-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">
              <ol className="work-detail__card-title-list">
                <li>커서 중심 UI</li>
              </ol>
            </h5>
            <div className="work-detail__card-description">
              <p>하이파이브는 에너지를 즉시 배출할 수 있는 도구를 제공합니다. 커서를 탭하여가벼운 커서챗을 날리고, Radial UI로 제스처를 보내며, 현장의 분위기를 함께 만들어갑니다.</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SeoDongbeomHiFiveMobile;
