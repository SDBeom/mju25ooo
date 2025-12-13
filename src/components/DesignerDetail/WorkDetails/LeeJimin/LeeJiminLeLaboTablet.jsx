import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/LeeJiminLeLabo/LeeJiminLeLaboTablet.css';

// 이미지 임포트 - Desktop과 동일한 이미지 사용
import leejiminWork2_01 from '../../../../assets/이지민/leejimin_motiondesign_work2_01.webp';
import leejiminWork2_02 from '../../../../assets/이지민/leejimin_motiondesign_work2_02.webp';
import leejiminWork2_03 from '../../../../assets/이지민/leejimin_motiondesign_work2_03.webp';
import leejiminWork2_04 from '../../../../assets/이지민/leejimin_motiondesign_work2_04.webp';
import leejiminWork2_05 from '../../../../assets/이지민/leejimin_motiondesign_work2_05.webp';
import leejiminWork2_06 from '../../../../assets/이지민/leejimin_motiondesign_work2_06.webp';
import leejiminWork2_07 from '../../../../assets/이지민/leejimin_motiondesign_work2_07.webp';
import leejiminWork2_08 from '../../../../assets/이지민/leejimin_motiondesign_work2_08.webp';
import leejiminWork2_09 from '../../../../assets/이지민/leejimin_motiondesign_work2_09.webp';
import leejiminWork2_10 from '../../../../assets/이지민/leejimin_motiondesign_work2_10.webp';
import leejiminWork2_11 from '../../../../assets/이지민/leejimin_motiondesign_work2_11.webp';
import leejiminWork2_12 from '../../../../assets/이지민/leejimin_motiondesign_work2_12.webp';
import leejiminWork2_13 from '../../../../assets/이지민/leejimin_motiondesign_work2_13.webp';
import leejiminWork2_14 from '../../../../assets/이지민/leejimin_motiondesign_work2_14.webp';
import leejiminWork2_15 from '../../../../assets/이지민/leejimin_motiondesign_work2_15.webp';

/**
 * 이지민 - LE LABO-CITY EXCLUSIVE (작품2) Tablet 버전
 * Figma 디자인 기반 구현 (800px)
 */
const LeeJiminLeLaboTablet = ({ work, designer, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--leejimin-lelabo-tablet">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--leejimin-lelabo-tablet">
        <div className="work-detail__hero-content work-detail__hero-content--leejimin-lelabo-tablet">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--leejimin-lelabo-tablet">
              LE LABO-CITY EXCLUSIVE
            </h2>
            <p className="work-detail__lead work-detail__lead--leejimin-lelabo-tablet">
              니치 향수 브랜드 'LE LABO'의 City Exclusive 향수 중 CITRON, GAIAC, MUSC 세 가지 향수를 주제로 한 프로모션 영상이다.
            </p>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--leejimin-lelabo-tablet">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--leejimin-lelabo-tablet`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--leejimin-lelabo-tablet">
          <img
            src={leejiminWork2_01}
            alt={work.title || 'LE LABO-CITY EXCLUSIVE'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, leejiminWork2_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
      </section>

      {/* YouTube Video Section */}
      <section className="work-detail__section work-detail__video-section work-detail__video-section--leejimin-lelabo-tablet">
        <div className="work-detail__video-wrapper work-detail__video-wrapper--leejimin-lelabo-tablet">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/xyBSk00G_D0?si=GqMFDBMKO4kgFfxO&controls=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="work-detail__video-iframe work-detail__video-iframe--leejimin-lelabo-tablet"
          />
        </div>
      </section>

      {/* Text Section - Imagine a city */}
      <section className="work-detail__section work-detail__text-section work-detail__text-section--leejimin-lelabo-tablet">
        <div className="work-detail__text-section-header">
          <p className="work-detail__text-section-label">Promotional videos</p>
          <h3 className="work-detail__text-section-title">Imagine a city</h3>
        </div>
        <div className="work-detail__text-content">
          <p>이 프로젝트는 단순히 제품을 소개하는 영상을 넘어서, "향이 인간의 감정에 어떻게 닿는가"라는 질문에서 출발한 프로젝트이다.
향은 눈에 보이지 않지만, 공기 속에 기억을 남긴다. 그래서 이번 작업에서는 향이 지닌 기억의 잔상과 도시가 품은 감정의 결을 시각적으로 구현하는 데 집중하였다. 각 도시를 대표하는 메인 컬러를 중심으로, 그곳의 기온, 빛의 방향, 공기의 밀도, 사람들의 움직임 등 향으로는 포착할 수 없는 요소들을 영상으로 표현하고자 했다.</p>
        </div>
      </section>

      {/* Feature Cards Section - Fresh */}
      <section className="work-detail__section work-detail__feature-cards work-detail__feature-cards--leejimin-lelabo-tablet">
        <div className="work-detail__feature-cards-image-wrapper">
          <img
            src={leejiminWork2_02}
            alt="Fresh"
            className="work-detail__feature-cards-image"
            onError={(e) => handleImageError(e, leejiminWork2_02, work.id, 'feature-cards-1')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-cards-content">
          <div className="work-detail__feature-cards-text">
            <h4 className="work-detail__feature-cards-title">Fresh</h4>
            <p>CITRON28은 서울의 아침에서 느껴지는 시원함을 표현하고자
전체적으로 화사하면서도 따스한 느낌의 색감을 사용했다.</p>
          </div>
        </div>
      </section>

      {/* Feature Rows Section */}
      <ul className="work-detail__section work-detail__feature-rows work-detail__feature-rows--leejimin-lelabo-tablet">
        <li className="work-detail__feature-row">
          <div className="work-detail__feature-row-content">
            <div className="work-detail__feature-row-text">
              <h4 className="work-detail__feature-row-title">Woody</h4>
              <p>GAIAC10은 도시에서도 느껴지는 풀내음을 표현하고자 싱그러우면서도 습한 느낌의 색감을 사용하였다.</p>
            </div>
          </div>
          <div className="work-detail__feature-row-image-wrapper">
            <img
              src={leejiminWork2_03}
              alt="Woody"
              className="work-detail__feature-row-image"
              onError={(e) => handleImageError(e, leejiminWork2_03, work.id, 'feature-row-1')}
              loading="lazy"
            />
          </div>
        </li>
        <li className="work-detail__feature-row">
          <div className="work-detail__feature-row-image-wrapper">
            <img
              src={leejiminWork2_04}
              alt="Sunset"
              className="work-detail__feature-row-image"
              onError={(e) => handleImageError(e, leejiminWork2_04, work.id, 'feature-row-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-row-content">
            <div className="work-detail__feature-row-text">
              <h4 className="work-detail__feature-row-title">Sunset</h4>
              <p>MUSC25는 아침과 저녁이 주는 서로 다른 느낌의 긴 여운을 시각적으로 표현하고자 영상의 초반부에는 따스한 색감을, 후반부에는 짙고 어두운
색감을 사용했다.</p>
            </div>
          </div>
        </li>
      </ul>

      {/* Feature Section - City Exclusives */}
      <section className="work-detail__section work-detail__feature work-detail__feature--leejimin-lelabo-tablet">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--leejimin-lelabo-tablet">
          <img
            src={leejiminWork2_05}
            alt="City Exclusives"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, leejiminWork2_05, work.id, 'feature-1')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title">City Exclusives</h4>
          <p>마지막 컷을 통해 LE LABO 향수임을 명확히 드러내고, City Exclusive Collection과 주요 향료 정보를 함께 제시했다. 이를 통해 시청자가 향수의 향과 그에 어울리는 도시의 이미지를 자연스럽게 떠올릴 수 있도록 연출했다.</p>
        </div>
      </section>

      {/* Feature Cards Section - 3 Cards */}
      <ul className="work-detail__section work-detail__cards work-detail__cards--leejimin-lelabo-tablet">
        <li className="work-detail__card work-detail__card--leejimin-lelabo-tablet">
          <div className="work-detail__card-image-wrapper">
            <img
              src={leejiminWork2_06}
              alt="CITRON 28"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, leejiminWork2_06, work.id, 'card-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">CITRON 28</h5>
            <p>서울에서 영감 받아 제작된 시티 익스클루시브의 비교적 최신 컬렉션.</p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--leejimin-lelabo-tablet">
          <div className="work-detail__card-image-wrapper">
            <img
              src={leejiminWork2_07}
              alt="GAIAC 10"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, leejiminWork2_07, work.id, 'card-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">GAIAC 10</h5>
            <p>도쿄에서 영감 받아 제작된 시티 익스클루시브의 오래된 컬렉션 중 하나.</p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--leejimin-lelabo-tablet">
          <div className="work-detail__card-image-wrapper">
            <img
              src={leejiminWork2_08}
              alt="MUSC 25"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, leejiminWork2_08, work.id, 'card-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">MUSC 25</h5>
            <p>로스엔젤레스에서 영감 받아 제작된 시티 익스클루시브의 오래된 컬렉션 중 하나.</p>
          </div>
        </li>
      </ul>

      {/* Gallery Section - Photo shoot */}
      <section className="work-detail__section work-detail__gallery work-detail__gallery--leejimin-lelabo-tablet">
        <div className="work-detail__gallery-header">
          <h3 className="work-detail__gallery-title">Photo shoot</h3>
          <p className="work-detail__gallery-description">직접 촬영한 사진을 활용해 도시의 이미지를 더욱 생생하게 전달하고자 했다.</p>
        </div>
        <div className="work-detail__gallery-grid">
          <div className="work-detail__gallery-column work-detail__gallery-column--1">
            <div className="work-detail__gallery-item">
              <img
                src={leejiminWork2_09}
                alt="Photo shoot 1"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, leejiminWork2_09, work.id, 'gallery-1')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={leejiminWork2_10}
                alt="Photo shoot 2"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, leejiminWork2_10, work.id, 'gallery-2')}
                loading="lazy"
              />
            </div>
          </div>
          <div className="work-detail__gallery-column work-detail__gallery-column--2">
            <div className="work-detail__gallery-item">
              <img
                src={leejiminWork2_11}
                alt="Photo shoot 3"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, leejiminWork2_11, work.id, 'gallery-3')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={leejiminWork2_12}
                alt="Photo shoot 4"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, leejiminWork2_12, work.id, 'gallery-4')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={leejiminWork2_13}
                alt="Photo shoot 5"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, leejiminWork2_13, work.id, 'gallery-5')}
                loading="lazy"
              />
            </div>
          </div>
          <div className="work-detail__gallery-column work-detail__gallery-column--3">
            <div className="work-detail__gallery-item">
              <img
                src={leejiminWork2_14}
                alt="Photo shoot 6"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, leejiminWork2_14, work.id, 'gallery-6')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={leejiminWork2_15}
                alt="Photo shoot 7"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, leejiminWork2_15, work.id, 'gallery-7')}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeeJiminLeLaboTablet;
