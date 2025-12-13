import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/ShimSungbinLinked/ShimSungbinLinkedDesktop.css';

// 이미지 임포트
import shimSungbinWork1_01 from '../../../../assets/심성빈/simseongbin_videocontent_work1_01.webp';
import shimSungbinWork1_02 from '../../../../assets/심성빈/simseongbin_videocontent_work1_02.webp';
import shimSungbinWork1_03 from '../../../../assets/심성빈/simseongbin_videocontent_work1_03.webp';
import shimSungbinWork1_04 from '../../../../assets/심성빈/simseongbin_videocontent_work1_04.webp';
import shimSungbinWork1_05 from '../../../../assets/심성빈/simseongbin_videocontent_work1_05.webp';
import shimSungbinWork1_06 from '../../../../assets/심성빈/simseongbin_videocontent_work1_06.webp';
import shimSungbinWork1_07 from '../../../../assets/심성빈/simseongbin_videocontent_work1_07.webp';
import shimSungbinWork1_08 from '../../../../assets/심성빈/simseongbin_videocontent_work1_08.webp';
import shimSungbinWork1_09 from '../../../../assets/심성빈/simseongbin_videocontent_work1_09.webp';

/**
 * 심성빈 - Linked (작품1) Desktop 버전
 * Figma 디자인 기반 구현 (1280px)
 */
const ShimSungbinLinkedDesktop = ({ work, designer, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--shim-sungbin-linked-desktop">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--shim-sungbin-linked-desktop">
        <div className="work-detail__hero-content work-detail__hero-content--shim-sungbin-linked-desktop">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--shim-sungbin-linked-desktop">Linked</h2>
            <p className="work-detail__lead work-detail__lead--shim-sungbin-linked-desktop">
              {`Linked는 점과 선, 면을 활용하여 관계의 연결과 
단절, 사회의 순환적 흐름을 표현한 아트워크이다.`}
            </p>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--shim-sungbin-linked-desktop">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--shim-sungbin-linked-desktop`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--shim-sungbin-linked-desktop">
          <img
            src={shimSungbinWork1_01}
            alt={work.title || 'Linked'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, shimSungbinWork1_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
      </section>

      {/* YouTube Video Section */}
      <section className="work-detail__section work-detail__video-section work-detail__video-section--shim-sungbin-linked-desktop">
        <div className="work-detail__video-wrapper work-detail__video-wrapper--shim-sungbin-linked-desktop">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/Uq0P8C5JnUo?si=VE-TE9ZhYPDQGpji&controls=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="work-detail__video-iframe work-detail__video-iframe--shim-sungbin-linked-desktop"
          />
        </div>
      </section>

      {/* Feature Cards 1 Section */}
      <ul className="work-detail__section work-detail__cards work-detail__cards--shim-sungbin-linked-desktop">
        <li className="work-detail__card work-detail__card--shim-sungbin-linked-desktop">
          <div className="work-detail__card-image-wrapper">
            <img
              src={shimSungbinWork1_02}
              alt="Blue Orbs"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, shimSungbinWork1_02, work.id, 'card-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">Blue Orbs</h5>
            <p className="work-detail__card-description">
              {`사회를 구성하는 개개인을 의미한다. 
서로 유기적으로 연결되어 공동체를 이룬다.`}
            </p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--shim-sungbin-linked-desktop">
          <div className="work-detail__card-image-wrapper">
            <img
              src={shimSungbinWork1_03}
              alt="Red Orbs"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, shimSungbinWork1_03, work.id, 'card-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">Red Orbs</h5>
            <p className="work-detail__card-description">
              {`전쟁, 질병, 재앙 등 사회의 혼란을 의미한다.
공동체를 무너뜨리고 파괴하려 한다.`}
            </p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--shim-sungbin-linked-desktop">
          <div className="work-detail__card-image-wrapper">
            <img
              src={shimSungbinWork1_04}
              alt="Green Orbs"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, shimSungbinWork1_04, work.id, 'card-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">Green Orbs</h5>
            <p className="work-detail__card-description">
              {`무너진 공동체가 다시 회복하려는 탄력성을 
의미한다. 서로 조화롭게 연결되어 있다.`}
            </p>
          </div>
        </li>
      </ul>

      {/* Feature Bento Section */}
      <ul className="work-detail__section work-detail__bento work-detail__bento--shim-sungbin-linked-desktop">
        <li className="work-detail__bento-card work-detail__bento-card--shim-sungbin-linked-desktop">
          <div className="work-detail__bento-card-image-wrapper">
            <img
              src={shimSungbinWork1_05}
              alt="Connection"
              className="work-detail__bento-card-image"
              onError={(e) => handleImageError(e, shimSungbinWork1_05, work.id, 'bento-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-card-text">
            <h5 className="work-detail__bento-card-title">Connection</h5>
            <p className="work-detail__bento-card-description">각기 다른 구슬들은 서로 연결되어 거대한 공동체를 이룬다.</p>
          </div>
        </li>
        <li className="work-detail__bento-card work-detail__bento-card--shim-sungbin-linked-desktop">
          <div className="work-detail__bento-card-image-wrapper">
            <img
              src={shimSungbinWork1_06}
              alt="Destruction"
              className="work-detail__bento-card-image"
              onError={(e) => handleImageError(e, shimSungbinWork1_06, work.id, 'bento-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-card-text">
            <h5 className="work-detail__bento-card-title">Destruction</h5>
            <p className="work-detail__bento-card-description">강렬한 붉은 색을 지닌 구슬이 수면 위로 튀어오르며 공동체를 파괴한다.</p>
          </div>
        </li>
        <li className="work-detail__bento-card work-detail__bento-card--shim-sungbin-linked-desktop work-detail__bento-card--wide">
          <div className="work-detail__bento-card-image-wrapper">
            <img
              src={shimSungbinWork1_07}
              alt="Harmonize"
              className="work-detail__bento-card-image"
              onError={(e) => handleImageError(e, shimSungbinWork1_07, work.id, 'bento-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-card-text work-detail__bento-card-text--wide">
            <h5 className="work-detail__bento-card-title">Harmonize</h5>
            <p className="work-detail__bento-card-description">
              {`거대한 초록색 구슬이 지나가자 파괴된 구슬들은 다시 수면위로 떠오른다. 빛을 잃은 구슬들이 다시 모여 
다시 공동체를 회복해내고, 이전보다 더 큰 구조를 만들어낸다.`}
            </p>
          </div>
        </li>
      </ul>

      {/* Feature Cards 3 Section */}
      <ul className="work-detail__section work-detail__cards work-detail__cards--shim-sungbin-linked-desktop work-detail__cards--feature-3">
        <li className="work-detail__card work-detail__card--shim-sungbin-linked-desktop work-detail__card--feature-3">
          <article className="work-detail__card-article">
            <div className="work-detail__card-text">
              <h5 className="work-detail__card-title">Geometry Node (Droplets)</h5>
              <p className="work-detail__card-description">
                {`블렌더의 Geometry Node 기능을 사용하여 구체 위에 맺히는 
물방울들을 표현하였다.`}
              </p>
            </div>
            <div className="work-detail__card-image-wrapper work-detail__card-image-wrapper--feature-3">
              <img
                src={shimSungbinWork1_08}
                alt="Geometry Node (Droplets)"
                className="work-detail__card-image work-detail__card-image--feature-3"
                onError={(e) => handleImageError(e, shimSungbinWork1_08, work.id, 'card-feature-3-1')}
                loading="lazy"
              />
            </div>
          </article>
        </li>
        <li className="work-detail__card work-detail__card--shim-sungbin-linked-desktop work-detail__card--feature-3">
          <article className="work-detail__card-article">
            <div className="work-detail__card-text">
              <h5 className="work-detail__card-title">Geometry Node (Structure)</h5>
              <p className="work-detail__card-description">
                {`블렌더의 Geometry Node 기능을 사용하여 여러개의 구슬들이
모여 만들어낸 구조를 표현했다.`}
              </p>
            </div>
            <div className="work-detail__card-image-wrapper work-detail__card-image-wrapper--feature-3">
              <img
                src={shimSungbinWork1_09}
                alt="Geometry Node (Structure)"
                className="work-detail__card-image work-detail__card-image--feature-3"
                onError={(e) => handleImageError(e, shimSungbinWork1_09, work.id, 'card-feature-3-2')}
                loading="lazy"
              />
            </div>
          </article>
        </li>
      </ul>
    </div>
  );
};

export default ShimSungbinLinkedDesktop;

