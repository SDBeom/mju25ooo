import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/JeongitaeDolorSaga/JeongitaeDolorSagaMobile.css';

// 이미지 임포트
import jeongitaeWork1_01 from '../../../../assets/전기태/jeongitae_gamecontent_work1_01.webp';
import jeongitaeWork1_02 from '../../../../assets/전기태/jeongitae_gamecontent_work1_02.webp';
import jeongitaeWork1_03 from '../../../../assets/전기태/jeongitae_gamecontent_work1_03.webp';
import jeongitaeWork1_04 from '../../../../assets/전기태/jeongitae_gamecontent_work1_04.webp';
import jeongitaeWork1_05 from '../../../../assets/전기태/jeongitae_gamecontent_work1_05.webp';
import jeongitaeWork1_06 from '../../../../assets/전기태/jeongitae_gamecontent_work1_06.webp';

/**
 * 전기태 - Dolor Saga (작품1) Mobile 버전
 * Figma 디자인 기반 구현 (375px)
 */
const JeongitaeDolorSagaMobile = ({ work, designer, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--jeongitae-dolor-saga-mobile">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--jeongitae-dolor-saga-mobile">
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--jeongitae-dolor-saga-mobile">
          <img
            src={jeongitaeWork1_01}
            alt={work.title || 'Dolor Saga'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, jeongitaeWork1_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
        <div className="work-detail__hero-content work-detail__hero-content--jeongitae-dolor-saga-mobile">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--jeongitae-dolor-saga-mobile">
              Dolor Saga
            </h2>
            <div className="work-detail__lead work-detail__lead--jeongitae-dolor-saga-mobile">
              <p className="mb-0">돌로르사가.</p>
              <p className="mb-0">세상의 최고위 종족. 용에 대항하는 인류</p>
              <p>대항군의 스타일을토리를 담은 아트북.</p>
            </div>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--jeongitae-dolor-saga-mobile">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--jeongitae-dolor-saga-mobile`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Feature Section */}
      <section className="work-detail__section work-detail__feature work-detail__feature--jeongitae-dolor-saga-mobile">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--jeongitae-dolor-saga-mobile">
          <img
            src={jeongitaeWork1_02}
            alt="Dolor Saga"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, jeongitaeWork1_02, work.id, 'feature-1')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title">"용은 그 존재 자체로 영엄하고도 파괴적이다.</h4>
          <p className="mb-0">돌로르사가 속 등장하는 용은 자신들의 발 아래</p>
          <p className="mb-0">땅을 지배하기 위해 파괴를 일삼는 종족으로</p>
          <p className="mb-0">묘사된다. 그들의 힘은 일반적인 존재인</p>
          <p>인간, 엘프, 드워프보다 훨씬 월등하다.</p>
        </div>
      </section>

      {/* Feature Bento Section */}
      <ul className="work-detail__section work-detail__cards work-detail__cards--jeongitae-dolor-saga-mobile work-detail__cards--bento">
        <li className="work-detail__card work-detail__card--jeongitae-dolor-saga-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={jeongitaeWork1_03}
              alt="인류 대항군 종족 제 3종족"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, jeongitaeWork1_03, work.id, 'card-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">인류 대항군 종족 제 3종족</h5>
            <p className="mb-0">인류 대항군으로 용에게 대적하는 종족은</p>
            <p>인간, 엘프, 드워프로 총 3 종족이다.</p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--jeongitae-dolor-saga-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={jeongitaeWork1_04}
              alt="전투"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, jeongitaeWork1_04, work.id, 'card-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">전투</h5>
            <p>이들은 자신의 목숨을 바쳐 자신들의 고향과 가족, 사랑하는 이들이 살아가는 이 세상을 지키기위해 싸운다.</p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--jeongitae-dolor-saga-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={jeongitaeWork1_05}
              alt="압도적인 절망"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, jeongitaeWork1_05, work.id, 'card-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">압도적인 절망</h5>
            <p className="mb-0">인류 대항군이 약 1,000명 정도 전투에 참여한다고 가정했을 때다. 대략 대항군 900명의 희생으로 1마리의 용을 사냥하는 것이 평균적인 결과값이다.</p>
            <p>인류는 처절하게 싸우지만 그들의 목숨을 비웃듯 용들의 브레스타일을는 멈추지 않는다.</p>
          </div>
        </li>
      </ul>

      {/* Feature Cards Section */}
      <section className="work-detail__section work-detail__feature-cards work-detail__feature-cards--jeongitae-dolor-saga-mobile">
        <div className="work-detail__feature-cards-image-wrapper">
          <img
            src={jeongitaeWork1_06}
            alt="약자의 발버둥"
            className="work-detail__feature-cards-image"
            onError={(e) => handleImageError(e, jeongitaeWork1_06, work.id, 'feature-cards')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-cards-content">
          <div className="work-detail__feature-cards-text">
            <h4 className="work-detail__feature-cards-title">약자의 발버둥</h4>
            <p className="mb-0">인류는 수많은 전멸에도 굴복하지 않고 계속해서 나아간다. 시간이 쌓이면서 인류 대항군 내에서도 단신으로 용을 죽이는 존재들이</p>
            <p className="mb-0">등장한다. 이로써 이들의 처절한 대항은</p>
            <p>계속된다.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JeongitaeDolorSagaMobile;

