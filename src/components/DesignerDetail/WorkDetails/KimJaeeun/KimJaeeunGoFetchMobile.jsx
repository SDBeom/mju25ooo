import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/KimJaeeunGoFetch/KimJaeeunGoFetchMobile.css';

// 이미지 임포트
import kimJaeeunWork1_01 from '../../../../assets/김재은/kimjaeeun_video_work1_01.webp';
import kimJaeeunWork1_02 from '../../../../assets/김재은/kimjaeeun_video_work1_02.webp';
import kimJaeeunWork1_03 from '../../../../assets/김재은/kimjaeeun_video_work1_03.webp';
import kimJaeeunWork1_04 from '../../../../assets/김재은/kimjaeeun_video_work1_04.webp';
import kimJaeeunWork1_05 from '../../../../assets/김재은/kimjaeeun_video_work1_05.webp';
import kimJaeeunWork1_06 from '../../../../assets/김재은/kimjaeeun_video_work1_06.webp';
import kimJaeeunWork1_07 from '../../../../assets/김재은/kimjaeeun_video_work1_07.webp';
import kimJaeeunWork1_08 from '../../../../assets/김재은/kimjaeeun_video_work1_08.webp';
import kimJaeeunWork1_09 from '../../../../assets/김재은/kimjaeeun_video_work1_09.webp';
import kimJaeeunWork1_10 from '../../../../assets/김재은/kimjaeeun_video_work1_10.webp';
import kimJaeeunWork1_11 from '../../../../assets/김재은/kimjaeeun_video_work1_11.webp';
import kimJaeeunWork1_12 from '../../../../assets/김재은/kimjaeeun_video_work1_12.webp';
import kimJaeeunWork1_13 from '../../../../assets/김재은/kimjaeeun_video_work1_13.webp';
import kimJaeeunWork1_14 from '../../../../assets/김재은/kimjaeeun_video_work1_14.webp';
import kimJaeeunWork1_15 from '../../../../assets/김재은/kimjaeeun_video_work1_15.webp';

/**
 * 김재은 - Go Fetch! Mobile 버전
 * Figma 디자인 기반 구현 (375px)
 */
const KimJaeeunGoFetchMobile = ({ work, designer, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--kim-jaeeun-go-fetch-mobile">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--kim-jaeeun-go-fetch-mobile">
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--kim-jaeeun-go-fetch-mobile">
          <img
            src={kimJaeeunWork1_01}
            alt={work.title || 'Go Fetch!'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, kimJaeeunWork1_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
        <div className="work-detail__hero-content work-detail__hero-content--kim-jaeeun-go-fetch-mobile">
          <div className="work-detail__text-group work-detail__text-group--kim-jaeeun-go-fetch-mobile">
            <h2 className="work-detail__title work-detail__title--kim-jaeeun-go-fetch-mobile">Go Fetch!</h2>
            <div className="work-detail__lead work-detail__lead--kim-jaeeun-go-fetch-mobile">
              <p>신비롭고 위험천만한 우주에서</p>
              <p>용감한 강아지 '누리'의 여정을 담은</p>
              <p>2D·3D 단편애니메이션.</p>
            </div>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--kim-jaeeun-go-fetch-mobile">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--kim-jaeeun-go-fetch-mobile`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Feature Section - To The End, For You */}
      <section className="work-detail__section work-detail__feature work-detail__feature--kim-jaeeun-go-fetch-mobile">
        <div className="work-detail__feature-image-wrapper">
          <img
            src={kimJaeeunWork1_02}
            alt="To The End, For You"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, kimJaeeunWork1_02, work.id, 'feature-to-the-end')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title">To The End, For You</h4>
          <div className="work-detail__feature-description">
            <p>
              주인과의 공놀이가 그리운 강아지 '누리'는 끝없이 우주를 떠도며, 그리운 주인을 찾기 위한 여정을 계속한다.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Cards - Characters */}
      <ul className="work-detail__section work-detail__feature-cards work-detail__feature-cards--kim-jaeeun-go-fetch-mobile">
        <li className="work-detail__feature-card">
          <div className="work-detail__feature-card-image-wrapper">
            <img
              src={kimJaeeunWork1_03}
              alt="NURI"
              className="work-detail__feature-card-image"
              onError={(e) => handleImageError(e, kimJaeeunWork1_03, work.id, 'card-nuri')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-card-text">
            <h5 className="work-detail__feature-card-title">NURI</h5>
            <div className="work-detail__feature-card-description">
              <p>
                작품의 주인공.
                <br aria-hidden="true" />
                공을 쫓다가 주인과 이별한다.
              </p>
            </div>
          </div>
        </li>
        <li className="work-detail__feature-card">
          <div className="work-detail__feature-card-image-wrapper">
            <img
              src={kimJaeeunWork1_04}
              alt="GAON"
              className="work-detail__feature-card-image"
              onError={(e) => handleImageError(e, kimJaeeunWork1_04, work.id, 'card-gaon')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-card-text">
            <h5 className="work-detail__feature-card-title">GAON</h5>
            <div className="work-detail__feature-card-description">
              <p>
                누리의 주인, 가온.
                <br aria-hidden="true" />
                고장 난 우주선을 수리하다가 누리와
                <br aria-hidden="true" />
                이별한다.
              </p>
            </div>
          </div>
        </li>
        <li className="work-detail__feature-card">
          <div className="work-detail__feature-card-image-wrapper">
            <img
              src={kimJaeeunWork1_05}
              alt="Spaceship RN-42"
              className="work-detail__feature-card-image"
              onError={(e) => handleImageError(e, kimJaeeunWork1_05, work.id, 'card-spaceship')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-card-text">
            <h5 className="work-detail__feature-card-title">Spaceship RN-42</h5>
            <div className="work-detail__feature-card-description">
              <p>
                고장 난 우주선.
                <br aria-hidden="true" />
                누리와 가온을 이별시키게 한 주범이다.
              </p>
            </div>
          </div>
        </li>
      </ul>

      {/* Feature Gallery - Inciting Incident */}
      <section className="work-detail__section work-detail__feature-gallery work-detail__feature-gallery--kim-jaeeun-go-fetch-mobile">
        <div className="work-detail__feature-gallery-header">
          <h3 className="work-detail__feature-gallery-title">Inciting Incident</h3>
          <div className="work-detail__feature-gallery-description">
            <p>누리와 가온이 이별하게 된 계기.</p>
          </div>
        </div>
        <div className="work-detail__feature-gallery-grid work-detail__feature-gallery-grid--kim-jaeeun-go-fetch-mobile">
          <div className="work-detail__feature-gallery-column">
            <div className="work-detail__feature-gallery-image-wrapper">
              <img
                src={kimJaeeunWork1_06}
                alt="Inciting Incident 1"
                className="work-detail__feature-gallery-image"
                onError={(e) => handleImageError(e, kimJaeeunWork1_06, work.id, 'gallery-1')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__feature-gallery-image-wrapper">
              <img
                src={kimJaeeunWork1_07}
                alt="Inciting Incident 2"
                className="work-detail__feature-gallery-image"
                onError={(e) => handleImageError(e, kimJaeeunWork1_07, work.id, 'gallery-2')}
                loading="lazy"
              />
            </div>
          </div>
          <div className="work-detail__feature-gallery-column">
            <div className="work-detail__feature-gallery-image-wrapper">
              <img
                src={kimJaeeunWork1_08}
                alt="Inciting Incident 3"
                className="work-detail__feature-gallery-image"
                onError={(e) => handleImageError(e, kimJaeeunWork1_08, work.id, 'gallery-3')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__feature-gallery-image-wrapper">
              <img
                src={kimJaeeunWork1_09}
                alt="Inciting Incident 4"
                className="work-detail__feature-gallery-image"
                onError={(e) => handleImageError(e, kimJaeeunWork1_09, work.id, 'gallery-4')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__feature-gallery-image-wrapper">
              <img
                src={kimJaeeunWork1_10}
                alt="Inciting Incident 5"
                className="work-detail__feature-gallery-image"
                onError={(e) => handleImageError(e, kimJaeeunWork1_10, work.id, 'gallery-5')}
                loading="lazy"
              />
            </div>
          </div>
          <div className="work-detail__feature-gallery-column">
            <div className="work-detail__feature-gallery-image-wrapper">
              <img
                src={kimJaeeunWork1_11}
                alt="Inciting Incident 6"
                className="work-detail__feature-gallery-image"
                onError={(e) => handleImageError(e, kimJaeeunWork1_11, work.id, 'gallery-6')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__feature-gallery-image-wrapper">
              <img
                src={kimJaeeunWork1_12}
                alt="Inciting Incident 7"
                className="work-detail__feature-gallery-image"
                onError={(e) => handleImageError(e, kimJaeeunWork1_12, work.id, 'gallery-7')}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Story Cards - Farewell, Journey, Crisis */}
      <ul className="work-detail__section work-detail__feature-story-cards work-detail__feature-story-cards--kim-jaeeun-go-fetch-mobile">
        <li className="work-detail__feature-story-card">
          <div className="work-detail__feature-story-card-image-wrapper">
            <img
              src={kimJaeeunWork1_13}
              alt="Farewell"
              className="work-detail__feature-story-card-image"
              onError={(e) => handleImageError(e, kimJaeeunWork1_13, work.id, 'story-farewell')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-story-card-body">
            <h5 className="work-detail__feature-story-card-title">Farewell</h5>
            <div className="work-detail__feature-story-card-description">
              <p>
                막막하고 두려운 이별, 공포 속에서 홀로
                <br aria-hidden="true" />
                남겨진 누리.
              </p>
            </div>
          </div>
        </li>
        <li className="work-detail__feature-story-card">
          <div className="work-detail__feature-story-card-image-wrapper">
            <img
              src={kimJaeeunWork1_14}
              alt="Journey"
              className="work-detail__feature-story-card-image"
              onError={(e) => handleImageError(e, kimJaeeunWork1_14, work.id, 'story-journey')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-story-card-body">
            <h5 className="work-detail__feature-story-card-title">Journey</h5>
            <div className="work-detail__feature-story-card-description">
              <p>알 수 없는 신비롭고 광활한 우주 속, 용감한 강아지 '누리'의 용기 있는 여정</p>
            </div>
          </div>
        </li>
        <li className="work-detail__feature-story-card">
          <div className="work-detail__feature-story-card-image-wrapper">
            <img
              src={kimJaeeunWork1_15}
              alt="Crisis"
              className="work-detail__feature-story-card-image"
              onError={(e) => handleImageError(e, kimJaeeunWork1_15, work.id, 'story-crisis')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-story-card-body">
            <h5 className="work-detail__feature-story-card-title">Crisis</h5>
            <div className="work-detail__feature-story-card-description">
              <p>
                여정 속에서 맞닥뜨린 위기,
                <br aria-hidden="true" />
                누리는 이 난관을 극복할 수 있을까
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default KimJaeeunGoFetchMobile;
