import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/KimJinaCaravan/KimJinaCaravanDesktop.css';

// 이미지 임포트
import kimJinaWork1_01 from '../../../../assets/김지나/kimjina_multimedia_work1_01.webp';
import kimJinaWork1_02 from '../../../../assets/김지나/kimjina_multimedia_work1_02.webp';
import kimJinaWork1_04 from '../../../../assets/김지나/kimjina_multimedia_work1_04.webp';
import kimJinaWork1_05 from '../../../../assets/김지나/kimjina_multimedia_work1_05.webp';
import kimJinaWork1_06 from '../../../../assets/김지나/kimjina_multimedia_work1_06.webp';

/**
 * 김지나 - Caravan Desktop 버전
 * Figma 디자인 기반 구현 (1280px)
 */
const KimJinaCaravanDesktop = ({ work, designer, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--kim-jina-caravan-desktop">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--kim-jina-caravan-desktop">
        <div className="work-detail__hero-content work-detail__hero-content--kim-jina-caravan-desktop">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--kim-jina-caravan-desktop">Caravan</h2>
            <p className="work-detail__lead work-detail__lead--kim-jina-caravan-desktop">
              광활한 사막을 배경으로 한{'\n'}두 약탈자 부족의 이야기를 다룬다.
            </p>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--kim-jina-caravan-desktop">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--kim-jina-caravan-desktop`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--kim-jina-caravan-desktop">
          <img
            src={kimJinaWork1_01}
            alt={work.title || 'Caravan'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, kimJinaWork1_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
      </section>

      {/* Feature Row - Logo */}
      <section className="work-detail__section work-detail__feature-row work-detail__feature-row--kim-jina-caravan-desktop">
        <div className="work-detail__feature-row-content">
          <h4 className="work-detail__feature-title">로고</h4>
          <p className="work-detail__feature-description">
            타이포와 모티브 동물의 로고
          </p>
        </div>
        <div className="work-detail__feature-row-image">
          <img
            src={kimJinaWork1_02}
            alt="로고"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, kimJinaWork1_02, work.id, 'feature-logo')}
            loading="lazy"
          />
        </div>
      </section>

      {/* Feature 2 - Desert Camp & City Camp */}
      <section className="work-detail__section work-detail__feature-rows work-detail__feature-rows--kim-jina-caravan-desktop">
        {/* Row 1 - Desert Camp */}
        <div className="work-detail__feature-row work-detail__feature-row--kim-jina-caravan-desktop">
          <div className="work-detail__feature-row-content">
            <h4 className="work-detail__feature-title">사막 진영</h4>
            <p className="work-detail__feature-description">
              붉은색, 주황색, 갈색 메인 컬러. 모티브 동물은 수리부엉이.
            </p>
          </div>
          <div className="work-detail__feature-row-image">
            <img
              src={kimJinaWork1_03}
              alt="사막 진영"
              className="work-detail__feature-image"
              onError={(e) => handleImageError(e, kimJinaWork1_03, work.id, 'feature-desert-camp')}
              loading="lazy"
            />
          </div>
        </div>
        {/* Row 2 - City Camp (Reverse) */}
        <div className="work-detail__feature-row work-detail__feature-row--kim-jina-caravan-desktop work-detail__feature-row--reverse">
          <div className="work-detail__feature-row-image">
            <img
              src={kimJinaWork1_04}
              alt="도시 진영"
              className="work-detail__feature-image"
              onError={(e) => handleImageError(e, kimJinaWork1_04, work.id, 'feature-city-camp')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-row-content">
            <h4 className="work-detail__feature-title">도시 진영</h4>
            <p className="work-detail__feature-description">
              흰색, 금색 메인 컬러. 모티브 동물은 흰올빼미.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Section - Main Story 1 */}
      <section className="work-detail__section work-detail__feature work-detail__feature--kim-jina-caravan-desktop">
        <div className="work-detail__feature-image-wrapper">
          <img
            src={kimJinaWork1_05}
            alt="메인 스토리"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, kimJinaWork1_05, work.id, 'feature-main-story-1')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title">메인 스토리</h4>
          <p className="work-detail__feature-description">
            척박한 환경 속 극히 일부분에 해당하는 풍요로운 지대를 둘러싼 전쟁이 계속된다.{'\n'}
          </p>
        </div>
      </section>

      {/* Feature Section - Main Story 2 */}
      <section className="work-detail__section work-detail__feature work-detail__feature--kim-jina-caravan-desktop">
        <div className="work-detail__feature-image-wrapper">
          <img
            src={kimJinaWork1_06}
            alt="메인 토리 2"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, kimJinaWork1_06, work.id, 'feature-main-story-2')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <p className="work-detail__feature-description">
            어렸을 적 소녀의 부족에게 고향을 빼앗긴 소년은 이제는 발전된 도시가 세워진 옛 고향을 돌려받기 위해 사투를 이어 나간다.
          </p>
        </div>
      </section>

      {/* Text Row */}
      <ul className="work-detail__section work-detail__text-row work-detail__text-row--kim-jina-caravan-desktop">
        <li className="work-detail__text-block">
          <h5 className="work-detail__text-block-title">작업 양식</h5>
          <p className="work-detail__text-block-content">
            아트북, 모션 포스터{'\n'}1920*1080{'\n'}10 seconds each{'\n'}Clip Studio, Photoshop, After Effects
          </p>
        </li>
        <li className="work-detail__text-block">
          <h5 className="work-detail__text-block-title">작업 목표</h5>
          <p className="work-detail__text-block-content">
            두 공동체는 상반되는 분위기 속 각기 다른 구조를 갖고 있다. 하지만 사막이라는{'\n'}동일한 환경에서 서로를 경계하며 장시간 많은 영향를 주고 받았다. 이 내용을 토대로 두{'\n'}부족의 공통점과 차이점이 어떤 식으로 드러날지 고민하고{'\n'}서사를 읽어낼 수 있는 디자인을 지향하며 작업했다.
          </p>
        </li>
      </ul>
    </div>
  );
};

export default KimJinaCaravanDesktop;
