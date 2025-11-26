import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/LeeUnLayered/LeeUnLayeredTablet.css';

// 이미지 임포트
import leeunWork1_01 from '../../../../assets/이운/이운_멀티미디어_작품1_01.webp';
import leeunWork1_02 from '../../../../assets/이운/이운_멀티미디어_작품1_02.webp';
import leeunWork1_03 from '../../../../assets/이운/이운_멀티미디어_작품1_03.webp';
import leeunWork1_04 from '../../../../assets/이운/이운_멀티미디어_작품1_04.webp';
import leeunWork1_05 from '../../../../assets/이운/이운_멀티미디어_작품1_05.webp';
import leeunWork1_07 from '../../../../assets/이운/이운_멀티미디어_작품1_07.webp';
import leeunWork1_08 from '../../../../assets/이운/이운_멀티미디어_작품1_08.webp';
import leeunWork1_09 from '../../../../assets/이운/이운_멀티미디어_작품1_09.webp';
import leeunWork1_10 from '../../../../assets/이운/이운_멀티미디어_작품1_10.webp';
import leeunWork1_11 from '../../../../assets/이운/이운_멀티미디어_작품1_11.webp';
import leeunWork1_12 from '../../../../assets/이운/이운_멀티미디어_작품1_12.webp';
import leeunWork1_13 from '../../../../assets/이운/이운_멀티미디어_작품1_13.webp';
import leeunWork1_14 from '../../../../assets/이운/이운_멀티미디어_작품1_14.webp';
import leeunWork1_15 from '../../../../assets/이운/이운_멀티미디어_작품1_15.webp';
import leeunWork1_16 from '../../../../assets/이운/이운_멀티미디어_작품1_16.webp';
import leeunWork1_17 from '../../../../assets/이운/이운_멀티미디어_작품1_17.webp';

/**
 * 이운 - Layered (작품1) Tablet 버전
 * Figma 디자인 기반 구현 (800px)
 */
const LeeUnLayeredTablet = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--leeun-layered-tablet">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--leeun-layered-tablet">
        <div className="work-detail__hero-content work-detail__hero-content--leeun-layered-tablet">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--leeun-layered-tablet">
              Layered
            </h2>
            <div className="work-detail__lead work-detail__lead--leeun-layered-tablet">
              <p className="mb-0">개인의 정체성을 형성하는 다층적인</p>
              <p className="mb-0">'겹쳐짐'에 집중한 컨셔 패션 브랜드</p>
              <p>브랜딩</p>
            </div>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--leeun-layered-tablet">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--leeun-layered-tablet`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--leeun-layered-tablet">
          <img
            src={leeunWork1_01}
            alt={work.title || 'Layered'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, leeunWork1_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
      </section>

      {/* Text Section */}
      <section className="work-detail__section work-detail__text-section work-detail__text-section--leeun-layered-tablet">
        <div className="work-detail__text-section-header">
          <p className="work-detail__text-section-label">컨셔 패션 브랜드</p>
          <h3 className="work-detail__text-section-title">Layered</h3>
        </div>
        <div className="work-detail__text-section-description">
          <p className="mb-0">겹쳐짐은 개인의 정체성을 형성하는 다층적인 요소들을 상징합니다. 인간의 정체성은 단일하지</p>
          <p className="mb-0">않으며, 경험, 환경, 관계 등 수많은 요소들이 겹치면서 완성됩니다. 'Layered'는 시간이 지나 입지</p>
          <p className="mb-0">못하게 되었지만 기억이 담긴 소중한 옷을 업사이클링하여 새로운 타일로 재탄생시키는</p>
          <p className="mb-0">브랜드입니다. 과거와 현재가 조화를 이루는 디자인을 통해, 우리는 단순한 리폼을 넘어 기억과 개성, 지속 가능성을 연결하는 패션을 제안합니다.</p>
          <p className="mb-0">&nbsp;</p>
          <p className="mb-0">또한, 'Layered'는 패트 패션을 지양하는 컨셔</p>
          <p className="mb-0">브랜드로서, 소유보다 활용 중심의 지속 가능한  지향합니다. 버려지는 옷이 아닌, 소중한</p>
          <p>기억이 담긴 옷을 새롭게 디자인함으로써 패션의 순환과 환경 보호를 실천합니다.</p>
        </div>
      </section>

      {/* Gallery Section - LOOK */}
      <section className="work-detail__section work-detail__gallery work-detail__gallery--leeun-layered-tablet">
        <div className="work-detail__gallery-header">
          <h3 className="work-detail__gallery-title">LOOK</h3>
        </div>
        <div className="work-detail__gallery-grid">
          <div className="work-detail__gallery-column work-detail__gallery-column--1">
            <div className="work-detail__gallery-item">
              <img
                src={leeunWork1_02}
                alt="LOOK Image 1"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, leeunWork1_02, work.id, 'gallery-1')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={leeunWork1_03}
                alt="LOOK Image 2"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, leeunWork1_03, work.id, 'gallery-2')}
                loading="lazy"
              />
            </div>
          </div>
          <div className="work-detail__gallery-column work-detail__gallery-column--2">
            <div className="work-detail__gallery-item">
              <img
                src={leeunWork1_04}
                alt="LOOK Image 3"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, leeunWork1_04, work.id, 'gallery-3')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={leeunWork1_05}
                alt="LOOK Image 4"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, leeunWork1_05, work.id, 'gallery-4')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item work-detail__gallery-item--empty">
              {/* 빈 아이템 */}
            </div>
          </div>
          <div className="work-detail__gallery-column work-detail__gallery-column--3">
            <div className="work-detail__gallery-item">
              <img
                src={leeunWork1_07}
                alt="LOOK Image 5"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, leeunWork1_07, work.id, 'gallery-5')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={leeunWork1_08}
                alt="LOOK Image 6"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, leeunWork1_08, work.id, 'gallery-6')}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Rows Section 1 - Self-Expression, Rich */}
      <ul className="work-detail__section work-detail__feature-rows work-detail__feature-rows--leeun-layered-tablet">
        <li className="work-detail__feature-row work-detail__feature-row--leeun-layered-tablet">
          <div className="work-detail__feature-image-wrapper">
            <img
              src={leeunWork1_09}
              alt="Self-Expression"
              className="work-detail__feature-image"
              onError={(e) => handleImageError(e, leeunWork1_09, work.id, 'feature-self-expression')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-content">
            <div className="work-detail__text-group">
              <h4 className="work-detail__feature-title">Self-Expression</h4>
              <div className="work-detail__feature-description">
                <p className="mb-0">옷은 단순히 몸을 가리는 도구가 아니라, 나를</p>
                <p className="mb-0">드러내는 가장 직접적인 언어입니다.</p>
                <p className="mb-0">Layered는 과거와 현재의 옷을 새롭게 잇는</p>
                <p className="mb-0">과정 속에서 나만의 이야기를 담습니다. 더이상 입을 수 없지만 소중한 기억이 깃든 옷을 리폼해 개인의 취향과 경험이 고란히 반영된</p>
                <p className="mb-0"> 완성합니다. 이 과정에서 옷은 단순한 패션 아이템을 넘어, 자기 표현의 매개체가</p>
                <p>됩니다.</p>
              </div>
            </div>
          </div>
        </li>
        <li className="work-detail__feature-row work-detail__feature-row--leeun-layered-tablet">
          <div className="work-detail__feature-image-wrapper">
            <img
              src={leeunWork1_10}
              alt="Rich"
              className="work-detail__feature-image"
              onError={(e) => handleImageError(e, leeunWork1_10, work.id, 'feature-rich')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-content">
            <div className="work-detail__text-group">
              <h4 className="work-detail__feature-title">Rich</h4>
              <div className="work-detail__feature-description">
                <p className="mb-0">오래 함께한 옷에는 이미 그 시간을 함께한</p>
                <p className="mb-0">기존의 기억이 며 있고, 그 옷을 새롭게 다듬고 변주하는 과정에서 또 다른 새로운 기억이</p>
                <p className="mb-0">차곡차곡 더해집니다. 이렇게 과거와 현재가</p>
                <p className="mb-0">겹쳐지며 형성된 흔적은 옷을 단순한 의복이</p>
                <p className="mb-0">아닌 정체성과 기억이 중첩된 서사적 매체로</p>
                <p className="mb-0">바꾸어 줍니다. Layered는 이 겹쳐진 기억과</p>
                <p>정체성을 통해 풍부하고 입체적인 아름다움을 완성합니다.</p>
              </div>
            </div>
          </div>
        </li>
      </ul>

      {/* Feature Rows Section 2 - Flexibility, Sustainability */}
      <ul className="work-detail__section work-detail__feature-rows work-detail__feature-rows--leeun-layered-tablet-2">
        <li className="work-detail__feature-row work-detail__feature-row--leeun-layered-tablet">
          <div className="work-detail__feature-image-wrapper">
            <img
              src={leeunWork1_11}
              alt="Flexibility"
              className="work-detail__feature-image"
              onError={(e) => handleImageError(e, leeunWork1_11, work.id, 'feature-flexibility')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-content">
            <div className="work-detail__text-group">
              <h4 className="work-detail__feature-title">Flexibility</h4>
              <div className="work-detail__feature-description">
                <p className="mb-0">Layered의 옷은 하나의 형태에 머무르지</p>
                <p className="mb-0">않습니다. 같은 옷이라도 타일링의 변주,</p>
                <p className="mb-0">시간이 더해지며 달라지는 해석에 따라 새로운 모습을 드러냅니다. 이는 끊임없이 흐르고</p>
                <p className="mb-0">변하는 자연, 구름의 층위와 닮아 있으며, 입는 사람의 개성과 순간의 감정에 따라 다양하게</p>
                <p className="mb-0">적응하는 옷으로 완성됩니다. Layered가</p>
                <p className="mb-0">추구하는 유연성은 곧 오래도록 입을 수 있는</p>
                <p>지속성이자, 자신만의  자유롭게 표현할 수 있는 가능성입니다.</p>
              </div>
            </div>
          </div>
        </li>
        <li className="work-detail__feature-row work-detail__feature-row--leeun-layered-tablet">
          <div className="work-detail__feature-image-wrapper">
            <img
              src={leeunWork1_12}
              alt="Sustainability"
              className="work-detail__feature-image"
              onError={(e) => handleImageError(e, leeunWork1_12, work.id, 'feature-sustainability')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-content">
            <div className="work-detail__text-group">
              <h4 className="work-detail__feature-title">Sustainability</h4>
              <div className="work-detail__feature-description">
                <p className="mb-0">빠르게 소비되고 잊혀지는 패트 패션과 달리, Layered는 옷이 가진 시간을 존중합니다.</p>
                <p className="mb-0">오래 입을 수 있도록 튼튼하게,  또 다른</p>
                <p className="mb-0">방식으로 다시 활용할 수 있도록 유연하게</p>
                <p className="mb-0">디자인합니다. 기존의 옷을 해체하고</p>
                <p className="mb-0">재구성하거나,  남겨진 원단을 새로운 옷으로</p>
                <p className="mb-0">이어붙이며, 옷이 가진 생명을 이어갑니다. Layered는 패트 패션을 지양하고 옷을</p>
                <p className="mb-0">오래 활용하는 방식을 추구합니다. 기존의 옷을 새롭게 해석해, 오래도록 이어지는 패션을</p>
                <p>지향합니다.</p>
              </div>
            </div>
          </div>
        </li>
      </ul>

      {/* Feature Cards Section - package, brand book, gift box */}
      <ul className="work-detail__section work-detail__cards work-detail__cards--leeun-layered-tablet">
        <li className="work-detail__card work-detail__card--leeun-layered-tablet">
          <div className="work-detail__card-image-wrapper">
            <img
              src={leeunWork1_13}
              alt="package"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, leeunWork1_13, work.id, 'card-package')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">package</h5>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--leeun-layered-tablet">
          <div className="work-detail__card-image-wrapper">
            <img
              src={leeunWork1_14}
              alt="brand book"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, leeunWork1_14, work.id, 'card-brand-book')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">brand book</h5>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--leeun-layered-tablet">
          <div className="work-detail__card-image-wrapper">
            <img
              src={leeunWork1_15}
              alt="gift box"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, leeunWork1_15, work.id, 'card-gift-box')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">gift box</h5>
          </div>
        </li>
      </ul>

      {/* Feature Bento Section - brand tag, Web */}
      <ul className="work-detail__section work-detail__bento work-detail__bento--leeun-layered-tablet">
        <li className="work-detail__bento-card work-detail__bento-card--leeun-layered-tablet">
          <div className="work-detail__bento-image-wrapper">
            <img
              src={leeunWork1_16}
              alt="brand tag"
              className="work-detail__bento-image"
              onError={(e) => handleImageError(e, leeunWork1_16, work.id, 'bento-brand-tag')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-text">
            <h5 className="work-detail__bento-title">brand tag</h5>
          </div>
        </li>
        <li className="work-detail__bento-card work-detail__bento-card--leeun-layered-tablet work-detail__bento-card--wide">
          <div className="work-detail__bento-image-wrapper">
            <img
              src={leeunWork1_17}
              alt="Web"
              className="work-detail__bento-image"
              onError={(e) => handleImageError(e, leeunWork1_17, work.id, 'bento-web')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-text">
            <h5 className="work-detail__bento-title">Web</h5>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default LeeUnLayeredTablet;
