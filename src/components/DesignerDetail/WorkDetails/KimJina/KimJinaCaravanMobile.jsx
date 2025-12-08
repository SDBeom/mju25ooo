import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/KimJinaCaravan/KimJinaCaravanMobile.css';

// 이미지 임포트
import kimJinaWork1_01 from '../../../../assets/김지나/kimjina_multimedia_work1_01.webp';
import kimJinaWork1_02 from '../../../../assets/김지나/kimjina_multimedia_work1_02.webp';
import kimJinaWork1_03 from '../../../../assets/김지나/kimjina_Multimedia_work1_03.webp';
import kimJinaWork1_04 from '../../../../assets/김지나/kimjina_multimedia_work1_04.webp';
import kimJinaWork1_05 from '../../../../assets/김지나/kimjina_multimedia_work1_05.webp';
import kimJinaWork1_06 from '../../../../assets/김지나/kimjina_multimedia_work1_06.webp';

/**
 * 김지나 - Caravan Mobile 버전
 * Figma 디자인 기반 구현 (375px)
 */
const KimJinaCaravanMobile = ({ work, designer, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--kim-jina-caravan-mobile">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--kim-jina-caravan-mobile">
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--kim-jina-caravan-mobile">
          <img
            src={kimJinaWork1_01}
            alt={work.title || 'Caravan'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, kimJinaWork1_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
        <div className="work-detail__hero-content work-detail__hero-content--kim-jina-caravan-mobile">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--kim-jina-caravan-mobile">Caravan</h2>
            <div className="work-detail__lead work-detail__lead--kim-jina-caravan-mobile">
              <p>광활한 사막을 배경으로 한</p>
              <p>두 약탈자 부족의 이야기를 다룬다.</p>
            </div>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--kim-jina-caravan-mobile">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--kim-jina-caravan-mobile`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Feature Centered - Logo */}
      <section className="work-detail__section work-detail__feature-centered work-detail__feature-centered--kim-jina-caravan-mobile">
        <div className="work-detail__feature-image-wrapper">
          <img
            src={kimJinaWork1_02}
            alt="로고"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, kimJinaWork1_02, work.id, 'feature-logo')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title">로고</h4>
          <div className="work-detail__feature-description">
            <p>타이포와 모티브 동물의 로고</p>
          </div>
        </div>
      </section>

      {/* Feature List - Desert Camp & City Camp */}
      <ul className="work-detail__section work-detail__feature-list work-detail__feature-list--kim-jina-caravan-mobile">
        <li className="work-detail__feature-list-item">
          <div className="work-detail__feature-image-wrapper">
            <img
              src={kimJinaWork1_03}
              alt="사막 진영"
              className="work-detail__feature-image"
              onError={(e) => handleImageError(e, kimJinaWork1_03, work.id, 'feature-desert-camp')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-text">
            <h4 className="work-detail__feature-title">사막 진영</h4>
            <div className="work-detail__feature-description">
              <p>붉은색, 주황색, 갈색 메인 컬러.</p>
              <p>모티브 동물은 수리부엉이.</p>
            </div>
          </div>
        </li>
        <li className="work-detail__feature-list-item">
          <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--centered">
            <img
              src={kimJinaWork1_04}
              alt="도시 진영"
              className="work-detail__feature-image"
              onError={(e) => handleImageError(e, kimJinaWork1_04, work.id, 'feature-city-camp')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-text">
            <h4 className="work-detail__feature-title">도시 진영</h4>
            <div className="work-detail__feature-description">
              <p>흰색, 금색 메인 컬러.</p>
              <p>모티브 동물은 흰올빼미.</p>
            </div>
          </div>
        </li>
      </ul>

      {/* Feature Section - Main Story 1 */}
      <section className="work-detail__section work-detail__feature work-detail__feature--kim-jina-caravan-mobile">
        <div className="work-detail__feature-image-wrapper">
          <img
            src={kimJinaWork1_05}
            alt="메인 토리"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, kimJinaWork1_05, work.id, 'feature-main-story-1')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title">메인 토리</h4>
          <div className="work-detail__feature-description">
            <p>척박한 환경 속 극히 일부분에 해당하는 풍요로운 지대를 둘러싼 전쟁이 계속된다.</p>
            <p>어렸을 적 소녀의 부족에게 고향을 빼앗긴 소년은 이제는 발전된 도시가 세워진 옛 고향을 돌려받기 위해 사투를 이어 나간다.</p>
          </div>
        </div>
      </section>

      {/* Feature Section - Main Story 2 */}
      <section className="work-detail__section work-detail__feature work-detail__feature--kim-jina-caravan-mobile">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--offset">
          <img
            src={kimJinaWork1_06}
            alt="메인 토리 2"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, kimJinaWork1_06, work.id, 'feature-main-story-2')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <div className="work-detail__feature-description">
            <p>어렸을 적 소녀의 부족에게 고향을 빼앗긴 소년은 이제는 발전된 도시가 세워진 옛 고향을 돌려받기 위해 사투를 이어 나간다.</p>
          </div>
        </div>
      </section>

      {/* Text Row */}
      <ul className="work-detail__section work-detail__text-row work-detail__text-row--kim-jina-caravan-mobile">
        <li className="work-detail__text-block">
          <h5 className="work-detail__text-block-title">작업 양식</h5>
          <div className="work-detail__text-block-content">
            <p>아트북, 모션 포터</p>
            <p>1920*1080</p>
            <p>10 seconds each</p>
            <p>Clip Studio, Photoshop, After Effects</p>
          </div>
        </li>
        <li className="work-detail__text-block">
          <h5 className="work-detail__text-block-title">작업 목표</h5>
          <div className="work-detail__text-block-content">
            <p>두 공동체는 상반되는 분위기 속 각기 다른 구조를 갖고 있다. 하지만 사막이라는 동일한 환경에서 서로를 경계하며 장시간 많은 영향를 주고 받았다.</p>
            <p>이 내용을 토대로 두 부족의 공통점과 차이점이 어떤 식으로 드러날지 고민하고 서사를 읽어낼 수 있는 디자인을 지향하며 작업했다.</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default KimJinaCaravanMobile;
