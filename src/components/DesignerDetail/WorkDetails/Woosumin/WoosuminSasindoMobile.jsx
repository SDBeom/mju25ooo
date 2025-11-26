import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/WoosuminSasindo/WoosuminSasindoMobile.css';

// 이미지 임포트
import woosuminWork1_01 from '../../../../assets/우수민/우수민_멀티미디어_작품1_01.webp';
import woosuminWork1_02 from '../../../../assets/우수민/우수민_멀티미디어_작품1_02.webp';
import woosuminWork1_03 from '../../../../assets/우수민/우수민_멀티미디어_작품1_03.webp';
import woosuminWork1_04 from '../../../../assets/우수민/우수민_멀티미디어_작품1_04.webp';
import woosuminWork1_05 from '../../../../assets/우수민/우수민_멀티미디어_작품1_05.webp';
import woosuminWork1_06 from '../../../../assets/우수민/우수민_멀티미디어_작품1_06.webp';
import woosuminWork1_07 from '../../../../assets/우수민/우수민_멀티미디어_작품1_07.webp';
import woosuminWork1_08 from '../../../../assets/우수민/우수민_멀티미디어_작품1_08.webp';
import woosuminWork1_09 from '../../../../assets/우수민/우수민_멀티미디어_작품1_09.webp';
import woosuminWork1_10 from '../../../../assets/우수민/우수민_멀티미디어_작품1_10.webp';
import woosuminWork1_11 from '../../../../assets/우수민/우수민_멀티미디어_작품1_11.webp';
import woosuminWork1_12 from '../../../../assets/우수민/우수민_멀티미디어_작품1_12.webp';
import woosuminWork1_13 from '../../../../assets/우수민/우수민_멀티미디어_작품1_13.webp';

/**
 * 우수민 - 사신도 (작품1) Mobile 버전
 * Figma 디자인 기반 구현 (375px)
 */
const WoosuminSasindoMobile = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--woosumin-sasindo-mobile">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--woosumin-sasindo-mobile">
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--woosumin-sasindo-mobile">
          <img
            src={woosuminWork1_01}
            alt={work.title || '사신도'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, woosuminWork1_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
        <div className="work-detail__hero-content work-detail__hero-content--woosumin-sasindo-mobile">
          <div className="work-detail__text-group work-detail__text-group--center">
            <h2 className="work-detail__title work-detail__title--woosumin-sasindo-mobile">사신도</h2>
            <div className="work-detail__lead work-detail__lead--woosumin-sasindo-mobile">
              <p>고분벽화 속 사신도를 현대적으로 재해석해 동서남북을 수호하는 신수의 상징성을 인물과 결합한 작품이다. 전통적 요소를 현대 조형 언어로 조화롭게 풀어냈다.</p>
            </div>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--woosumin-sasindo-mobile">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--woosumin-sasindo-mobile`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Feature Cards Section 1 */}
      <section className="work-detail__section work-detail__feature work-detail__feature--woosumin-sasindo-mobile">
        <div className="work-detail__feature-image-wrapper">
          <img
            src={woosuminWork1_02}
            alt="사신도 역사 리플렛"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, woosuminWork1_02, work.id, 'feature-1')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-content">
          <div className="work-detail__text-group">
            <h4 className="work-detail__feature-title">사신도 역사 리플렛</h4>
            <div className="work-detail__feature-description">
              <p className="mb-0">표지에 청룡의 이미지를 담아 사신도 역사를 담은 리플렛을 제작,</p>
              <p>뒷면 QR을 통해 사신도 정보 확인 가능</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="work-detail__section work-detail__feature work-detail__feature--info work-detail__feature--woosumin-sasindo-mobile">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--info">
          <img
            src={woosuminWork1_03}
            alt="네 신수 정보"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, woosuminWork1_03, work.id, 'feature-2')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title">네 신수 정보</h4>
          <p className="work-detail__feature-description">역사적 사실을 기반하여 네 신수에 대한 정보를 담아, 그들의 상징과 특징, 역할 기재</p>
        </div>
      </section>

      {/* Feature Cards Section 2 */}
      <ul className="work-detail__section work-detail__cards work-detail__cards--woosumin-sasindo-mobile">
        <li className="work-detail__card work-detail__card--woosumin-sasindo-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={woosuminWork1_04}
              alt="백호 애니메이션 포터"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, woosuminWork1_04, work.id, 'card-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">백호 애니메이션 포터</h5>
            <p className="work-detail__card-description">서쪽, 백호 특유의 우아하고 신비로운 모습을 담아내고자 부드러운 외형의 캐릭터 디자인</p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--woosumin-sasindo-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={woosuminWork1_05}
              alt="주작 애니메이션 포터"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, woosuminWork1_05, work.id, 'card-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">주작 애니메이션 포터</h5>
            <p className="work-detail__card-description">남쪽, 불을 다룰 수 있는 사신으로 활력있고 장난러운 남자 아이 외형의 캐릭터 디자인</p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--woosumin-sasindo-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={woosuminWork1_06}
              alt="현무 애니메이션 포터"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, woosuminWork1_06, work.id, 'card-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">현무 애니메이션 포터</h5>
            <p className="work-detail__card-description">북쪽, 조용하고 느긋한 현무의 성격을 표현하고자 권위 있고 차분한 외형의 캐릭터 디자인</p>
          </div>
        </li>
      </ul>

      {/* Feature Gallery Section */}
      <section className="work-detail__section work-detail__gallery work-detail__gallery--woosumin-sasindo-mobile">
        <div className="work-detail__gallery-header">
          <h3 className="work-detail__gallery-title">일러트 포터</h3>
          <p className="work-detail__gallery-description">디자인한 청룡, 백호, 주작, 현무 캐릭터의 특징을 담아 반실사 일러트 포터 제작</p>
        </div>
        <div className="work-detail__gallery-grid">
          <div className="work-detail__gallery-column">
            <div className="work-detail__gallery-item">
              <img
                src={woosuminWork1_07}
                alt="Gallery image 1"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, woosuminWork1_07, work.id, 'gallery-1')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={woosuminWork1_08}
                alt="Gallery image 2"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, woosuminWork1_08, work.id, 'gallery-2')}
                loading="lazy"
              />
            </div>
          </div>
          <div className="work-detail__gallery-column">
            <div className="work-detail__gallery-item">
              <img
                src={woosuminWork1_09}
                alt="Gallery image 3"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, woosuminWork1_09, work.id, 'gallery-3')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={woosuminWork1_07}
                alt="Gallery image 4"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, woosuminWork1_07, work.id, 'gallery-4')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={woosuminWork1_11}
                alt="Gallery image 5"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, woosuminWork1_11, work.id, 'gallery-5')}
                loading="lazy"
              />
            </div>
          </div>
          <div className="work-detail__gallery-column">
            <div className="work-detail__gallery-item">
              <img
                src={woosuminWork1_08}
                alt="Gallery image 6"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, woosuminWork1_08, work.id, 'gallery-6')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={woosuminWork1_09}
                alt="Gallery image 7"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, woosuminWork1_09, work.id, 'gallery-7')}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Text Section */}
      <section className="work-detail__section work-detail__text work-detail__text--woosumin-sasindo-mobile">
        <div className="work-detail__text-header">
          <p className="work-detail__text-label">신화 이야기</p>
          <h3 className="work-detail__text-title">사신도에 관하여...</h3>
        </div>
        <p className="work-detail__text-content">
          사신도는 단순한 신화적 상물이 아닌, 자연의 원리와 인간의 삶, 죽음 이후의 세계를 통합적으로 표현한 시각 체계이다. 동서남북의 네 신수는 곧 인간의 생애와 우주의 순환을 상징하며, 고분벽화 속 사신도는 고대인이 죽음을 '끝'이 아닌 또 다른 세계로의 이동으로 인식했음을 알 수 있다.
        </p>
      </section>
    </div>
  );
};

export default WoosuminSasindoMobile;

