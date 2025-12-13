import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/SongDaheeACardOfLove/SongDaheeACardOfLoveMobile.css';

// 이미지 임포트
import songDaheeWork1_01 from '../../../../assets/송다희/songdahee_videocontent_work1_01.webp';
import songDaheeWork1_02 from '../../../../assets/송다희/songdahee_videocontent_work1_02.webp';
import songDaheeWork1_03 from '../../../../assets/송다희/songdahee_videocontent_work1_03.webp';
import songDaheeWork1_04 from '../../../../assets/송다희/songdahee_videocontent_work1_04.webp';
import songDaheeWork1_05 from '../../../../assets/송다희/songdahee_videocontent_work1_05.webp';
import songDaheeWork1_06 from '../../../../assets/송다희/songdahee_videocontent_work1_06.webp';
import songDaheeWork1_07 from '../../../../assets/송다희/songdahee_videocontent_work1_07.webp';
import songDaheeWork1_08 from '../../../../assets/송다희/songdahee_videocontent_work1_08.webp';
import songDaheeWork1_09 from '../../../../assets/송다희/songdahee_videocontent_work1_09.webp';
import songDaheeWork1_10 from '../../../../assets/송다희/songdahee_videocontent_work1_10.webp';
import songDaheeWork1_11 from '../../../../assets/송다희/songdahee_videocontent_work1_11.webp';

/**
 * 송다희 - A Card of Love (작품1) Mobile 버전
 * Figma 디자인 기반 구현 (375px)
 */
const SongDaheeACardOfLoveMobile = ({ work, designer, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--song-dahee-a-card-of-love-mobile">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--song-dahee-a-card-of-love-mobile">
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--song-dahee-a-card-of-love-mobile">
          <img
            src={songDaheeWork1_01}
            alt={work.title || 'A Card of Love'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, songDaheeWork1_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
        <div className="work-detail__hero-content work-detail__hero-content--song-dahee-a-card-of-love-mobile">
          <div className="work-detail__text-group work-detail__text-group--center">
            <h2 className="work-detail__title work-detail__title--song-dahee-a-card-of-love-mobile">A Card of Love</h2>
            <div className="work-detail__lead work-detail__lead--song-dahee-a-card-of-love-mobile">
              <p>A Card of Love는 사랑을 표현하는 데 서툰 이들을 위한 감정 탐구 프로젝트이자, 현대 사회 속 감정의 언어를 다시 배우기 위한 시도이다.</p>
            </div>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--song-dahee-a-card-of-love-mobile">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--song-dahee-a-card-of-love-mobile`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* YouTube Video Section */}
      <section className="work-detail__section work-detail__video-section work-detail__video-section--song-dahee-a-card-of-love-mobile">
        <div className="work-detail__video-wrapper work-detail__video-wrapper--song-dahee-a-card-of-love-mobile">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/EPNPNjmLvF4?si=71HO2J0wnDboO8-4&controls=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="work-detail__video-iframe work-detail__video-iframe--song-dahee-a-card-of-love-mobile"
          />
        </div>
      </section>

      {/* Feature Cards 1 Section */}
      <ul className="work-detail__section work-detail__cards work-detail__cards--song-dahee-a-card-of-love-mobile">
        <li className="work-detail__card work-detail__card--song-dahee-a-card-of-love-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={songDaheeWork1_02}
              alt="Bouncy"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, songDaheeWork1_02, work.id, 'card-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">Bouncy</h5>
            <div className="work-detail__card-description">
              <p>지금 당신의 마음은 부드럽고 예민하게 반응하고 있습니다. 불안해하지 말고, 그 유연함을 받아들이세요.</p>
            </div>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--song-dahee-a-card-of-love-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={songDaheeWork1_03}
              alt="Explode"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, songDaheeWork1_03, work.id, 'card-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">Explode</h5>
            <div className="work-detail__card-description">
              <p className="mb-0">오랫동안 눌렀던 감정이 폭발하려 합니다. </p>
              <p>화가 될 수도 있고, 열정이 될 수도 있습니다.</p>
            </div>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--song-dahee-a-card-of-love-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={songDaheeWork1_04}
              alt="Sweet"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, songDaheeWork1_04, work.id, 'card-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">Sweet</h5>
            <div className="work-detail__card-description">
              <p className="mb-0">사랑은 때때로 말없이 다정하게 다가옵니다.</p>
              <p>사과처럼 부드럽고, 달콤하게.</p>
            </div>
          </div>
        </li>
      </ul>

      {/* Feature Gallery Section */}
      <section className="work-detail__section work-detail__gallery work-detail__gallery--song-dahee-a-card-of-love-mobile">
        <div className="work-detail__gallery-header">
          <h3 className="work-detail__gallery-title">A Card of Love</h3>
          <p className="work-detail__gallery-description">쉽게 말하지 못한 사랑의 마음들이 머물다 가는 자리. 사랑의 언어를 다시 배우는 기록.</p>
        </div>
        <div className="work-detail__gallery-grid">
          <div className="work-detail__gallery-column work-detail__gallery-column--1">
            <div className="work-detail__gallery-item">
              <img
                src={songDaheeWork1_05}
                alt="Gallery image 1"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, songDaheeWork1_05, work.id, 'gallery-1')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={songDaheeWork1_06}
                alt="Gallery image 2"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, songDaheeWork1_06, work.id, 'gallery-2')}
                loading="lazy"
              />
            </div>
          </div>
          <div className="work-detail__gallery-column work-detail__gallery-column--2">
            <div className="work-detail__gallery-item">
              <img
                src={songDaheeWork1_07}
                alt="Gallery image 3"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, songDaheeWork1_07, work.id, 'gallery-3')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={songDaheeWork1_08}
                alt="Gallery image 4"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, songDaheeWork1_08, work.id, 'gallery-4')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={songDaheeWork1_09}
                alt="Gallery image 5"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, songDaheeWork1_09, work.id, 'gallery-5')}
                loading="lazy"
              />
            </div>
          </div>
          <div className="work-detail__gallery-column work-detail__gallery-column--3">
            <div className="work-detail__gallery-item">
              <img
                src={songDaheeWork1_10}
                alt="Gallery image 6"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, songDaheeWork1_10, work.id, 'gallery-6')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={songDaheeWork1_11}
                alt="Gallery image 7"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, songDaheeWork1_11, work.id, 'gallery-7')}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SongDaheeACardOfLoveMobile;

