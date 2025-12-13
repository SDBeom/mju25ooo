import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/JungJiminTheGothic/JungJiminTheGothicTablet.css';

// 이미지 임포트
import jungJiminWork1_01 from '../../../../assets/정지민/jungjimin_gamecontent_work1_The_gothic_Desktop_01.webp';
import jungJiminWork1_02 from '../../../../assets/정지민/jungjimin_gamecontent_work1_The_gothic_Desktop_02.webp';
import jungJiminWork1_03 from '../../../../assets/정지민/jungjimin_gamecontent_work1_The_gothic_Desktop_03.webp';
import jungJiminWork1_04 from '../../../../assets/정지민/jungjimin_gamecontent_work1_The_gothic_Desktop_04.webp';
import jungJiminWork1_05 from '../../../../assets/정지민/jungjimin_gamecontent_work1_The_gothic_Desktop_05.webp';
import jungJiminWork1_06 from '../../../../assets/정지민/jungjimin_gamecontent_work1_The_gothic_Desktop_06.webp';
import jungJiminWork1_07 from '../../../../assets/정지민/jungjimin_gamecontent_work1_The_gothic_Desktop_07.webp';
import jungJiminWork1_08 from '../../../../assets/정지민/jungjimin_gamecontent_work1_The_gothic_Desktop_08.webp';
import jungJiminWork1_09 from '../../../../assets/정지민/jungjimin_gamecontent_work1_The_gothic_Desktop_09.webp';
import jungJiminWork1_10 from '../../../../assets/정지민/jungjimin_gamecontent_work1_The_gothic_Desktop_10.webp';
import jungJiminWork1_11 from '../../../../assets/정지민/jungjimin_gamecontent_work1_The_gothic_Desktop_11.webp';

/**
 * 정지민 - The Gothic (작품1) Tablet 버전
 * Figma 디자인 기반 구현 (800px)
 */
const JungJiminTheGothicTablet = ({ work, designer, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--jungjimin-the-gothic-tablet">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--jungjimin-gothic-tablet">
        <div className="work-detail__hero-content work-detail__hero-content--jungjimin-gothic-tablet">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--jungjimin-gothic-tablet">
              The gothic
            </h2>
            <div className="work-detail__lead work-detail__lead--jungjimin-gothic-tablet">
              <p>갑옷, 캐릭터 모델링</p>
            </div>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--jungjimin-gothic-tablet">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--jungjimin-gothic-tablet`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--jungjimin-gothic-tablet">
          <img
            src={jungJiminWork1_01}
            alt={work.title || 'The gothic'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, jungJiminWork1_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
      </section>

      {/* YouTube Video Section */}
      <section className="work-detail__section work-detail__video-section work-detail__video-section--jungjimin-gothic-tablet">
        <div className="work-detail__video-wrapper work-detail__video-wrapper--jungjimin-gothic-tablet">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/sBCUp1o6Kk8?si=sN2rvoxgIoBJzhkN&controls=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="work-detail__video-iframe work-detail__video-iframe--jungjimin-gothic-tablet"
          />
        </div>
      </section>

      {/* Feature cards 1 - 씬1 */}
      <section className="work-detail__section work-detail__feature-card work-detail__feature-card--jungjimin-gothic-tablet">
        <div className="work-detail__feature-card-content work-detail__feature-card-content--jungjimin-gothic-tablet">
          <div className="work-detail__text-group">
            <h4 className="work-detail__feature-card-title">씬1</h4>
            <p className="work-detail__feature-card-description">어두운 분위기 강조</p>
          </div>
        </div>
        <div className="work-detail__feature-card-image-wrapper work-detail__feature-card-image-wrapper--jungjimin-gothic-tablet">
          <img
            src={jungJiminWork1_02}
            alt="씬1"
            className="work-detail__feature-card-image"
            onError={(e) => handleImageError(e, jungJiminWork1_02, work.id, 'scene1')}
            loading="lazy"
          />
        </div>
      </section>

      {/* Feature cards 1 - 씬2 */}
      <section className="work-detail__section work-detail__feature-card work-detail__feature-card--jungjimin-gothic-tablet">
        <div className="work-detail__feature-card-content work-detail__feature-card-content--jungjimin-gothic-tablet">
          <div className="work-detail__text-group">
            <h4 className="work-detail__feature-card-title">씬2</h4>
            <p className="work-detail__feature-card-description">라이트 강조</p>
          </div>
        </div>
        <div className="work-detail__feature-card-image-wrapper work-detail__feature-card-image-wrapper--jungjimin-gothic-tablet">
          <img
            src={jungJiminWork1_03}
            alt="씬2"
            className="work-detail__feature-card-image"
            onError={(e) => handleImageError(e, jungJiminWork1_03, work.id, 'scene2')}
            loading="lazy"
          />
        </div>
      </section>

      {/* Feature cards 1 - 씬3 (reverse) */}
      <section className="work-detail__section work-detail__feature-card work-detail__feature-card--jungjimin-gothic-tablet work-detail__feature-card--reverse">
        <div className="work-detail__feature-card-image-wrapper work-detail__feature-card-image-wrapper--jungjimin-gothic-tablet">
          <img
            src={jungJiminWork1_04}
            alt="씬3"
            className="work-detail__feature-card-image"
            onError={(e) => handleImageError(e, jungJiminWork1_04, work.id, 'scene3')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-card-content work-detail__feature-card-content--jungjimin-gothic-tablet">
          <div className="work-detail__text-group">
            <h4 className="work-detail__feature-card-title">씬3</h4>
            <p className="work-detail__feature-card-description">구도 강조</p>
          </div>
        </div>
      </section>

      {/* Feature 3 - 렌더샷 */}
      <section className="work-detail__section work-detail__feature work-detail__feature--jungjimin-gothic-tablet work-detail__feature--image-top">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--jungjimin-gothic-tablet work-detail__feature-image-wrapper--large">
          <img
            src={jungJiminWork1_05}
            alt="렌더샷"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, jungJiminWork1_05, work.id, 'rendershot')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text work-detail__feature-text--below">
          <h4 className="work-detail__feature-title">렌더샷</h4>
          <p>전체적 분위기</p>
        </div>
      </section>

      {/* Feature Cards Section */}
      <ul className="work-detail__section work-detail__cards work-detail__cards--jungjimin-gothic-tablet">
        <li className="work-detail__card work-detail__card--jungjimin-gothic-tablet">
          <div className="work-detail__card-image-wrapper">
            <img
              src={jungJiminWork1_06}
              alt="갑옷"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, jungJiminWork1_06, work.id, 'card-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">갑옷</h5>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--jungjimin-gothic-tablet">
          <div className="work-detail__card-image-wrapper">
            <img
              src={jungJiminWork1_07}
              alt="투구"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, jungJiminWork1_07, work.id, 'card-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">투구</h5>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--jungjimin-gothic-tablet">
          <div className="work-detail__card-image-wrapper">
            <img
              src={jungJiminWork1_08}
              alt="하체"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, jungJiminWork1_08, work.id, 'card-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">하체</h5>
          </div>
        </li>
      </ul>

      {/* Feature Bento Section */}
      <ul className="work-detail__section work-detail__bento work-detail__bento--jungjimin-gothic-tablet">
        <li className="work-detail__bento-card work-detail__bento-card--jungjimin-gothic-tablet-1">
          <div className="work-detail__bento-card-image-wrapper">
            <img
              src={jungJiminWork1_09}
              alt="갑옷"
              className="work-detail__bento-card-image"
              onError={(e) => handleImageError(e, jungJiminWork1_09, work.id, 'bento-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-card-text">
            <h5 className="work-detail__bento-card-title">갑옷</h5>
          </div>
        </li>
        <li className="work-detail__bento-card work-detail__bento-card--jungjimin-gothic-tablet-2">
          <div className="work-detail__bento-card-image-wrapper">
            <img
              src={jungJiminWork1_10}
              alt="문양"
              className="work-detail__bento-card-image"
              onError={(e) => handleImageError(e, jungJiminWork1_10, work.id, 'bento-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-card-text">
            <h5 className="work-detail__bento-card-title">문양</h5>
          </div>
        </li>
        <li className="work-detail__bento-card work-detail__bento-card--jungjimin-gothic-tablet-3">
          <div className="work-detail__bento-card-image-wrapper">
            <img
              src={jungJiminWork1_11}
              alt="벨트"
              className="work-detail__bento-card-image"
              onError={(e) => handleImageError(e, jungJiminWork1_11, work.id, 'bento-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-card-text">
            <h5 className="work-detail__bento-card-title">벨트</h5>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default JungJiminTheGothicTablet;
