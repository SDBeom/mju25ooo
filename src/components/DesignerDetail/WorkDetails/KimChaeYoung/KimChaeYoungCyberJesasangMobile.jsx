import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/KimChaeYoungCyberJesasang/KimChaeYoungCyberJesasangMobile.css';

// 이미지 임포트
import kimChaeYoungWork2_01 from '../../../../assets/김채영/김채영_멀티미디어_작품2_01.webp';
import kimChaeYoungWork2_02 from '../../../../assets/김채영/김채영_멀티미디어_작품2_02.webp';
import kimChaeYoungWork2_03 from '../../../../assets/김채영/김채영_멀티미디어_작품2_03.webp';
import kimChaeYoungWork2_04 from '../../../../assets/김채영/김채영_멀티미디어_작품2_04.webp';
import kimChaeYoungWork2_05 from '../../../../assets/김채영/김채영_멀티미디어_작품2_05.webp';
import kimChaeYoungWork2_06 from '../../../../assets/김채영/김채영_멀티미디어_작품2_06.webp';
import kimChaeYoungWork2_07 from '../../../../assets/김채영/김채영_멀티미디어_작품2_07.webp';
import kimChaeYoungWork2_08 from '../../../../assets/김채영/김채영_멀티미디어_작품2_08.webp';
import kimChaeYoungWork2_09 from '../../../../assets/김채영/김채영_멀티미디어_작품2_09.webp';
import kimChaeYoungWork2_10 from '../../../../assets/김채영/김채영_멀티미디어_작품2_10.webp';

/**
 * 김채영 - 사이버 제사상 Mobile 버전
 * Figma 디자인 기반 구현 (375px)
 */
const KimChaeYoungCyberJesasangMobile = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--kim-chae-young-cyber-jesasang-mobile">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--kim-chae-young-cyber-jesasang-mobile">
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--kim-chae-young-cyber-jesasang-mobile">
          <img
            src={kimChaeYoungWork2_01}
            alt={work.title || '사이버 제사상'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, kimChaeYoungWork2_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
        <div className="work-detail__hero-content work-detail__hero-content--kim-chae-young-cyber-jesasang-mobile">
          <div className="work-detail__text-group work-detail__text-group--kim-chae-young-cyber-jesasang-mobile">
            <h2 className="work-detail__title work-detail__title--kim-chae-young-cyber-jesasang-mobile">사이버 제사상</h2>
            <div className="work-detail__lead work-detail__lead--kim-chae-young-cyber-jesasang-mobile">
              <p>없애고 싶은 감정을 디지털 제물로 시각화해 떠나보내는 1인 참여형 인터랙션 작품</p>
            </div>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--kim-chae-young-cyber-jesasang-mobile">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--kim-chae-young-cyber-jesasang-mobile`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Text Section */}
      <section className="work-detail__section work-detail__text-section work-detail__text-section--kim-chae-young-cyber-jesasang-mobile">
        <div className="work-detail__text-section-headline">
          <h3 className="work-detail__text-section-title">사이버 제사상</h3>
        </div>
        <div className="work-detail__text-section-content">
          <p>사이버 제사상'은 부정적인 감정을 디지털 공간에서 시각적으로 정리하고 떠나보내는 1인 참여형 인터랙션 작업이다. 참여자는 자신의 감정을 선택하고, 그것을 추상화된 '제물' 형태로 변환해 제사상에 올린다. 이후 감정은 소멸 애니메이션을 통해 사라지며, 참여자는 감정을 다시 마주하는 대신 시각적 잔재만을 남긴다. 프로젝트는 한국의 제사 의례를 차용하되, 그 의미를 감정의 정화 행위로 전환한다. 이를 통해 감정의 무게를 직접 다루지 않고도 '감정을 떠나보내는 행위'를 시각적 경험으로 치환한다. '사이버 제사상'은 감정이 개인의 내부에서 디지털 공간으로 이행되는 과정을 다루며, 현대인의 심리적 정화 방식을 새로운 조형 언어로 탐구한다.</p>
        </div>
      </section>

      {/* Feature Section - Main Scene */}
      <section className="work-detail__section work-detail__feature work-detail__feature--kim-chae-young-cyber-jesasang-mobile">
        <div className="work-detail__feature-image-wrapper">
          <img
            src={kimChaeYoungWork2_02}
            alt="Main Scene"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, kimChaeYoungWork2_02, work.id, 'feature-main-scene')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title">Main Scene</h4>
          <div className="work-detail__feature-description">
            <p>투명한 금속성 제사상이 중앙에 놓여 있고, 그 위에는 다섯 개의 추상적 형태의 '감정 제물'이 진열되어 있다. 제사상은 전통 제례 형식을 기반으로 하지만, 재질과 조명은 디지털 환경을 연상시키며 비물질적이다. 또한 &lt;사이버 제사상&gt;은 보이지 않는 내면의 감정을 만질 수 있는 형태의 디지털 '제물'로 변환한다. 사용자가 마주한 다섯 가지 부정적 감정은 각각 고유한 시각적 상징으로 재탄생되며, 이는 사용자의 마음을 대변하는 제물이 된다.</p>
          </div>
        </div>
      </section>

      {/* Feature Section - Anger */}
      <section className="work-detail__section work-detail__feature-centered work-detail__feature-centered--kim-chae-young-cyber-jesasang-mobile">
        <div className="work-detail__feature-image-wrapper">
          <img
            src={kimChaeYoungWork2_03}
            alt="분노 (Anger)"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, kimChaeYoungWork2_03, work.id, 'feature-anger')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title">분노 (Anger)</h4>
          <div className="work-detail__feature-description">
            <p>억눌려 있던 에너지가 한순간에 폭발하며 사방으로 날카롭게 흩어지는 파편의 형태로 시각화된다. 붉은색과 푸른색의 강렬한 대비는 통제되지 않는 격렬한 감정 상태를 나타낸다.</p>
          </div>
        </div>
      </section>

      {/* Feature List - Sadness & Regret */}
      <ul className="work-detail__section work-detail__feature-list work-detail__feature-list--kim-chae-young-cyber-jesasang-mobile">
        <li className="work-detail__feature-list-item">
          <div className="work-detail__feature-image-wrapper">
            <img
              src={kimChaeYoungWork2_04}
              alt="슬픔 (Sadness)"
              className="work-detail__feature-image"
              onError={(e) => handleImageError(e, kimChaeYoungWork2_04, work.id, 'feature-sadness')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-text">
            <h4 className="work-detail__feature-title">슬픔 (Sadness)</h4>
            <div className="work-detail__feature-description">
              <p>무거운 무게감에 짓눌려 바닥으로 천천히 흘러내리며, 끝내 고여버리는 끈적한 점액질의 형상으로 구현된다. 어둡고 깊은 보라색과 차가운 하늘색은 가라앉는 슬픔의 깊이를 표현한다.</p>
            </div>
          </div>
        </li>
        <li className="work-detail__feature-list-item">
          <div className="work-detail__feature-image-wrapper">
            <img
              src={kimChaeYoungWork2_05}
              alt="후회 (Regret)"
              className="work-detail__feature-image"
              onError={(e) => handleImageError(e, kimChaeYoungWork2_05, work.id, 'feature-regret')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-text">
            <h4 className="work-detail__feature-title">후회 (Regret)</h4>
            <div className="work-detail__feature-description">
              <p>과거의 특정 순간에 얽매여 끊임없이 맴도는 생각을 뾰족한 구체가 엉킨 궤도를 맴도는 모습으로 표현한다. 복잡하게 얽힌 선과 고리들은 벗어나기 힘든 후회의 굴레를 상징한다.</p>
            </div>
          </div>
        </li>
      </ul>

      {/* Feature List - Anxiety & Disgust */}
      <ul className="work-detail__section work-detail__feature-list work-detail__feature-list--kim-chae-young-cyber-jesasang-mobile">
        <li className="work-detail__feature-list-item">
          <div className="work-detail__feature-image-wrapper">
            <img
              src={kimChaeYoungWork2_06}
              alt="불안 (Anxiety)"
              className="work-detail__feature-image"
              onError={(e) => handleImageError(e, kimChaeYoungWork2_06, work.id, 'feature-anxiety')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-text">
            <h4 className="work-detail__feature-title">불안 (Anxiety)</h4>
            <div className="work-detail__feature-description">
              <p>미래에 대한 불확실함과 위협을 느껴 외부를 향해 날카로운 가시를 곤두세운 유기체의 형태로 구체화된다. 신경질적인 가시와 움츠러든 본체는 방어적인 불안의 상태를 보여준다.</p>
            </div>
          </div>
        </li>
        <li className="work-detail__feature-list-item">
          <div className="work-detail__feature-image-wrapper">
            <img
              src={kimChaeYoungWork2_07}
              alt="혐오 (Disgust)"
              className="work-detail__feature-image"
              onError={(e) => handleImageError(e, kimChaeYoungWork2_07, work.id, 'feature-disgust')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-text">
            <h4 className="work-detail__feature-title">혐오 (Disgust)</h4>
            <div className="work-detail__feature-description">
              <p>불쾌하고 불규칙한 감정들이 복잡하게 뒤엉켜, 본래의 형태를 알아볼 수 없는 덩어리로 나타난다. 선명하지만 조화롭지 못한 여러 색상이 뒤섞여 거부감과 혼란러움을 드러낸다.</p>
            </div>
          </div>
        </li>
      </ul>

      {/* Feature Cards Section */}
      <ul className="work-detail__section work-detail__feature-cards work-detail__feature-cards--kim-chae-young-cyber-jesasang-mobile">
        <li className="work-detail__feature-card">
          <article className="work-detail__feature-card-article">
            <div className="work-detail__feature-card-image-wrapper">
              <img
                src={kimChaeYoungWork2_08}
                alt="이름 입력 페이지"
                className="work-detail__feature-card-image"
                onError={(e) => handleImageError(e, kimChaeYoungWork2_08, work.id, 'card-1')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__feature-card-body">
              <h5 className="work-detail__feature-card-title">이름 입력 페이지 (의례 시작)</h5>
              <div className="work-detail__feature-card-description">
                <p>사용자에게 자신의 '이름'을 입력하도록 요청한다. 배경에는 이 경험에서 다루게 될 감정의 형태들이 붉은색 실루엣으로 나열되어 있다. 사용자가 이름을 입력하고 '확인' 버튼을 누르면 다음 단계로 넘어간다.</p>
              </div>
            </div>
          </article>
        </li>
        <li className="work-detail__feature-card">
          <article className="work-detail__feature-card-article">
            <div className="work-detail__feature-card-image-wrapper">
              <img
                src={kimChaeYoungWork2_09}
                alt="제문 작성 페이지"
                className="work-detail__feature-card-image"
                onError={(e) => handleImageError(e, kimChaeYoungWork2_09, work.id, 'card-2')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__feature-card-body">
              <h5 className="work-detail__feature-card-title">제문 작성 페이지</h5>
              <div className="work-detail__feature-card-description">
                <p>사용자가 떠나보내기로 선택한 특정 감정을 위한 제문을 작성하는 단계이다. 선택된 감정의 시각적 이미지가 배경에 나타나며, 사용자는 입력창에 해당 감정을 떠나보내는 '작별의 제문'을 기록한다. '떠나보내기' 버튼을 누르면, 이 기록은 '기억의 제단'으로 전송된다.</p>
              </div>
            </div>
          </article>
        </li>
        <li className="work-detail__feature-card">
          <article className="work-detail__feature-card-article">
            <div className="work-detail__feature-card-image-wrapper">
              <img
                src={kimChaeYoungWork2_10}
                alt="기억의 제단"
                className="work-detail__feature-card-image"
                onError={(e) => handleImageError(e, kimChaeYoungWork2_10, work.id, 'card-3')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__feature-card-body">
              <h5 className="work-detail__feature-card-title">기억의 제단 (아카이브)</h5>
              <div className="work-detail__feature-card-description">
                <p>'기억의 제단'은 모든 참여자의 감정 기록이 누적되는 아카이브 공간이다. 앞서 사용자들이 '떠나보낸' 감정들은 붉은색 잔상의 형태로 이곳에 남는다. 각 잔상 위에는 해당 의례를 진행한 참여자 이름 | 감정의 종류 | 작성한 제문이 텍트로 표시된다. 이 공간에서 사용자는 다른 사람들의 기록을 둘러볼 수 있다.</p>
              </div>
            </div>
          </article>
        </li>
      </ul>
    </div>
  );
};

export default KimChaeYoungCyberJesasangMobile;

