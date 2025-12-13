import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/ParkJinaRemain/ParkJinaRemainTablet.css';

// 이미지 임포트
import parkJinaWork2_01 from '../../../../assets/박진아/parkjina_multimedia_work2_01.webp';
import parkJinaWork2_02 from '../../../../assets/박진아/parkjina_multimedia_work2_02.webp';
import parkJinaWork2_03 from '../../../../assets/박진아/parkjina_multimedia_work2_03.webp';
import parkJinaWork2_04 from '../../../../assets/박진아/parkjina_multimedia_work2_04.webp';
import parkJinaWork2_05 from '../../../../assets/박진아/parkjina_multimedia_work2_05.webp';
import parkJinaWork2_06 from '../../../../assets/박진아/parkjina_multimedia_work2_06.webp';
import parkJinaWork2_07 from '../../../../assets/박진아/parkjina_multimedia_work2_07.webp';
import parkJinaWork2_08 from '../../../../assets/박진아/parkjina_multimedia_work2_08.webp';
import parkJinaWork2_09 from '../../../../assets/박진아/parkjina_multimedia_work2_09.webp';
import parkJinaWork2_10 from '../../../../assets/박진아/parkjina_multimedia_work2_10.webp';
import parkJinaWork2_11 from '../../../../assets/박진아/parkjina_multimedia_work2_11.webp';
import parkJinaWork2_12 from '../../../../assets/박진아/parkjina_multimedia_work2_12.webp';

/**
 * 박진아 - REMAIN Tablet 버전
 * Figma 디자인 기반 구현 (800px)
 */
const ParkJinaRemainTablet = ({ work, designer, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--park-jina-remain-tablet">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--park-jina-remain-tablet">
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--park-jina-remain-tablet">
          <img
            src={parkJinaWork2_01}
            alt={work.title || 'REMAIN'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, parkJinaWork2_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
        <div className="work-detail__hero-content work-detail__hero-content--park-jina-remain-tablet">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--park-jina-remain-tablet">REMAIN</h2>
            <p className="work-detail__lead work-detail__lead--park-jina-remain-tablet">
              {`Even Without holding on, 
I still REMAIN`}
            </p>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--park-jina-remain-tablet">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--park-jina-remain-tablet`}
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
      <section className="work-detail__section work-detail__video-section work-detail__video-section--park-jina-remain-tablet">
        <div className="work-detail__video-wrapper work-detail__video-wrapper--park-jina-remain-tablet">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/n6diUdkPPbo?si=q0XeonwRtaOC6zqZ&controls=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="work-detail__video-iframe work-detail__video-iframe--park-jina-remain-tablet"
          />
        </div>
      </section>

      {/* Feature 3 */}
      <section className="work-detail__section work-detail__feature work-detail__feature--park-jina-remain-tablet">
        <div className="work-detail__feature-image-wrapper">
          <img
            src={parkJinaWork2_02}
            alt="Remain."
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, parkJinaWork2_02, work.id, 'feature')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title">Remain.</h4>
          <p className="work-detail__feature-description">
            {`세상 모든 것은 올 때가 오면 오고,
갈 때가 되면 간다.

계절이 바뀌고, 낮이 밤으로 이어지며, 바람이 불고 구름이 흘러가듯, 

만물은 인연 따라 왔다가 인연이 다하면 떠난다. 
우주는 끊임없이 변하므로 매달릴 것도 없고, 
세상 모든 것은 내 것이 아니므로 
집착할 일도 없다.

그 흐름 속에는 '나'조차 예외가 아니다.

모든 것이 순리대로 왔다가,
간다는 사실을 아는 순간우리는 비로소 '놓는 법'을 배운다.
언제 떠날지 모름을 이해하기에, 과도하게 집착하지도 않고, 떠나감을 두려워하지도 않는다.

변화와 소멸조차 
하나의 자연스러운 순환으로 받아들이며, 
그 속에서 고요한 평화를 마주한다.

"나"라는 이름도, 형체도, 감정도 모두 이 흐름 속에서 흘러간다.

멈춤은 없고, 
소유도 없다. 

그저 모든 것은 이 끝없는 흐름 속에, 
조용히 남아있을 뿐이다.`}
          </p>
        </div>
      </section>

      {/* Feature Cards 1: I., Flow., Remain. */}
      <ul className="work-detail__section work-detail__feature-cards work-detail__feature-cards--park-jina-remain-tablet">
        <li className="work-detail__feature-card work-detail__feature-card--park-jina-remain-tablet">
          <div className="work-detail__feature-card-image-wrapper">
            <img
              src={parkJinaWork2_03}
              alt="I."
              className="work-detail__feature-card-image"
              onError={(e) => handleImageError(e, parkJinaWork2_03, work.id, 'feature-card-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-card-text">
            <h5 className="work-detail__feature-card-title">I.</h5>
            <p className="work-detail__feature-card-description">스스로를 이름과 형태로 믿다.</p>
          </div>
        </li>
        <li className="work-detail__feature-card work-detail__feature-card--park-jina-remain-tablet">
          <div className="work-detail__feature-card-image-wrapper">
            <img
              src={parkJinaWork2_04}
              alt="Flow."
              className="work-detail__feature-card-image"
              onError={(e) => handleImageError(e, parkJinaWork2_04, work.id, 'feature-card-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-card-text">
            <h5 className="work-detail__feature-card-title">Flow.</h5>
            <p className="work-detail__feature-card-description">
              {`붙잡던 것들이 흩어지고,
흘러감을 받아들인다.`}
            </p>
          </div>
        </li>
        <li className="work-detail__feature-card work-detail__feature-card--park-jina-remain-tablet">
          <div className="work-detail__feature-card-image-wrapper">
            <img
              src={parkJinaWork2_05}
              alt="Remain."
              className="work-detail__feature-card-image"
              onError={(e) => handleImageError(e, parkJinaWork2_05, work.id, 'feature-card-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-card-text">
            <h5 className="work-detail__feature-card-title">Remain.</h5>
            <p className="work-detail__feature-card-description">
              {`모든 것이 사라져도,
존재의 잔향은 남는다.`}
            </p>
          </div>
        </li>
      </ul>

      {/* Feature Rows: Success and Failure., Love and Loss. */}
      <ul className="work-detail__section work-detail__feature-rows work-detail__feature-rows--park-jina-remain-tablet">
        <li className="work-detail__feature-row work-detail__feature-row--park-jina-remain-tablet">
          <div className="work-detail__feature-row-content">
            <h4 className="work-detail__feature-row-title">Success and Faliure.</h4>
            <p className="work-detail__feature-row-description">
              {`성취로 존재의 가치를 증명하려 할수록, 마음은 그 결과에 묶인다. 목표가 사라지거나 실패가 찾아올 때, 

무너지는 것은 결과가 아니라 
존재 자신이다.`}
            </p>
          </div>
          <div className="work-detail__feature-row-image-wrapper">
            <img
              src={parkJinaWork2_06}
              alt="Success and Failure."
              className="work-detail__feature-row-image"
              onError={(e) => handleImageError(e, parkJinaWork2_06, work.id, 'feature-row-1')}
              loading="lazy"
            />
          </div>
        </li>
        <li className="work-detail__feature-row work-detail__feature-row--park-jina-remain-tablet">
          <div className="work-detail__feature-row-image-wrapper">
            <img
              src={parkJinaWork2_07}
              alt="Love and Loss."
              className="work-detail__feature-row-image"
              onError={(e) => handleImageError(e, parkJinaWork2_07, work.id, 'feature-row-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-row-content">
            <h4 className="work-detail__feature-row-title">Love and Loss.</h4>
            <p className="work-detail__feature-row-description">
              {`마음이 머무는 대상을 잃을 때, 
함께 흔들리는 것은 결국 나의 중심이다.`}
            </p>
          </div>
        </li>
      </ul>

      {/* Feature Bento 1: Ego and Change. */}
      <ul className="work-detail__section work-detail__bento work-detail__bento--park-jina-remain-tablet">
        <li className="work-detail__bento-card work-detail__bento-card--park-jina-remain-tablet">
          <div className="work-detail__bento-image-wrapper">
            <img
              src={parkJinaWork2_08}
              alt="Ego and Change."
              className="work-detail__bento-image"
              onError={(e) => handleImageError(e, parkJinaWork2_08, work.id, 'bento-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-text">
            <h5 className="work-detail__bento-title">Ego and Change.</h5>
            <p className="work-detail__bento-description">
              {`자신을 일정한 모습으로 붙잡아두려 할수록, 세상의 흐름과 어긋나게 된다. 
변화를 두려워하는 마음은 
결국 스스로를 갇히게 만들고, 
흐름을 거부한 자리에서 
나'는 가장 쉽게 무너진다.`}
            </p>
          </div>
        </li>
      </ul>

      {/* Marquee 1 (empty) */}
      <section className="work-detail__section work-detail__marquee work-detail__marquee--park-jina-remain-tablet">
        {/* Empty marquee section */}
      </section>

      {/* Feature Bento 2: Forest. */}
      <ul className="work-detail__section work-detail__bento work-detail__bento--park-jina-remain-tablet">
        <li className="work-detail__bento-card work-detail__bento-card--park-jina-remain-tablet">
          <div className="work-detail__bento-image-wrapper">
            <img
              src={parkJinaWork2_09}
              alt="Forest."
              className="work-detail__bento-image"
              onError={(e) => handleImageError(e, parkJinaWork2_09, work.id, 'bento-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-text">
            <h5 className="work-detail__bento-title">Forest.</h5>
            <p className="work-detail__bento-description">
              {`모든 생명이 연결되어 있음을 느끼는 곳. 그 속에서 '나'라는 존재를 묻기 시작한다.`}
            </p>
          </div>
        </li>
      </ul>

      {/* Feature Bento 3: Mountain. */}
      <ul className="work-detail__section work-detail__bento work-detail__bento--park-jina-remain-tablet">
        <li className="work-detail__bento-card work-detail__bento-card--park-jina-remain-tablet">
          <div className="work-detail__bento-image-wrapper">
            <img
              src={parkJinaWork2_10}
              alt="Mountain."
              className="work-detail__bento-image"
              onError={(e) => handleImageError(e, parkJinaWork2_10, work.id, 'bento-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-text">
            <h5 className="work-detail__bento-title">Mountain.</h5>
            <p className="work-detail__bento-description">
              {`산은 한계와 가능성이 맞닿은 곳. 오르는 길 위에서 끝없이 흔들리며, 
그 흔들림 속에서 성장한다.`}
            </p>
          </div>
        </li>
      </ul>

      {/* Feature Bento 4: Desert. */}
      <ul className="work-detail__section work-detail__bento work-detail__bento--park-jina-remain-tablet">
        <li className="work-detail__bento-card work-detail__bento-card--park-jina-remain-tablet">
          <div className="work-detail__bento-image-wrapper">
            <img
              src={parkJinaWork2_11}
              alt="Desert."
              className="work-detail__bento-image"
              onError={(e) => handleImageError(e, parkJinaWork2_11, work.id, 'bento-4')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-text">
            <h5 className="work-detail__bento-title">Desert.</h5>
            <p className="work-detail__bento-description">
              {`고난과 시련을 지나, 깨달음을 향해 나아가는 길. 아무것도 없는 듯한 그 공간에서,
인간은 비로소 자신과 마주한다.`}
            </p>
          </div>
        </li>
      </ul>

      {/* Feature Bento 5: Winter. */}
      <ul className="work-detail__section work-detail__bento work-detail__bento--park-jina-remain-tablet">
        <li className="work-detail__bento-card work-detail__bento-card--park-jina-remain-tablet">
          <div className="work-detail__bento-image-wrapper">
            <img
              src={parkJinaWork2_12}
              alt="Winter."
              className="work-detail__bento-image"
              onError={(e) => handleImageError(e, parkJinaWork2_12, work.id, 'bento-5')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-text">
            <h5 className="work-detail__bento-title">Winter.</h5>
            <p className="work-detail__bento-description">모든 것이 멈춘 듯 고요하지만, 새 생명이 움트기 전의 순수한 침묵.</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ParkJinaRemainTablet;

