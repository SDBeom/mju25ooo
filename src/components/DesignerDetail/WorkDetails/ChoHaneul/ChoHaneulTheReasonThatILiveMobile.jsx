import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/ChoHaneulTheReasonThatILive/ChoHaneulTheReasonThatILiveMobile.css';

// 이미지 임포트
import choHaneulWork2_01 from '../../../../assets/조하늘/johaneul_videocontent_work2_01.webp';
import choHaneulWork2_02 from '../../../../assets/조하늘/johaneul_videocontent_work2_02.webp';
import choHaneulWork2_03 from '../../../../assets/조하늘/johaneul_videocontent_work2_03.webp';
import choHaneulWork2_04 from '../../../../assets/조하늘/johaneul_videocontent_work2_04.webp';
import choHaneulWork2_05 from '../../../../assets/조하늘/johaneul_videocontent_work2_05.webp';
import choHaneulWork2_06 from '../../../../assets/조하늘/johaneul_videocontent_work2_06.webp';
import choHaneulWork2_07 from '../../../../assets/조하늘/johaneul_videocontent_work2_07.webp';
import choHaneulWork2_08 from '../../../../assets/조하늘/johaneul_videocontent_work2_08.webp';

/**
 * 조하늘 - The Reason that I Live (작품2) Mobile 버전
 * Figma 디자인 기반 구현 (375px)
 */
const ChoHaneulTheReasonThatILiveMobile = ({ work, designer, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--cho-haneul-the-reason-that-i-live-mobile">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--cho-haneul-mobile">
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--cho-haneul-mobile">
          <img
            src={choHaneulWork2_01}
            alt={work.title || 'The Reason that I Live'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, choHaneulWork2_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
        <div className="work-detail__hero-content work-detail__hero-content--cho-haneul-mobile">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--cho-haneul-mobile">
              {work.title || 'The Reason that I Live'}
            </h2>
            <p className="work-detail__lead work-detail__lead--cho-haneul-mobile">
              {work.summary || '히키코모리의 삶를 살아가던 코모리가 친구의 위로와 응원을 통해 다시 세상으로 한걸음 내딛는 이야기'}
            </p>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--cho-haneul-mobile">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--cho-haneul-mobile`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Text Section 1 */}
      <section className="work-detail__section work-detail__text-section work-detail__text-section--cho-haneul-mobile">
        <div className="work-detail__text-headline">
          <p className="work-detail__eyebrow-text">Animation</p>
          <h3 className="work-detail__subtitle">The Reason that I Live (삶의 이유)</h3>
        </div>
        <div className="work-detail__text-content">
          <p>어두운 방 안, 멈춰있는 시간 속의 코모리. 구르미의 따뜻한 손길이 닿는 순간, 멈춰 있던 시간은 다시 흐르기 시작한다. 사라져가던 마음에서, 다시 피어나는 소망으로. "You are the reason that I live"</p>
          <p>&nbsp;</p>
          <p>현대 사회에서 우리는 끊임없이 연결되어 있지만, 역설적으로 동시에 점점 더 외로워지고 있다. 관계 속에서 위로받지 못한 감정은 서서히 마음을 닫게 만들고, 결국 자신을 잃게 만든다.</p>
          <p>&nbsp;</p>
          <p>&lt;The Reason that I Live&gt; 는 '진정한 위로'는 무엇인가에 대한 질문을 던진다. 누군가의 손길, 한마디의 말, 작은 관심이 멈춰 있던 마음을 다시 움직이게 만들 수 있다는 믿음에서 시작된 작업이다.</p>
          <p>&nbsp;</p>
          <p>이 이야기가 누군가의 닫힌 마음에 작은 온기로 닿을 수 있기를 바란다.</p>
        </div>
      </section>

      {/* Text Row Section */}
      <ul className="work-detail__section work-detail__text-blocks work-detail__text-blocks--cho-haneul-mobile">
        <li className="work-detail__text-block">
          <h5 className="work-detail__text-block-title">Concept</h5>
          <p className="work-detail__text-block-content">개인적인 경험을 토대로, '삶의 이유는 무엇인가'라는 질문의 답을 애니메이션으로 담아내고자 했다</p>
        </li>
        <li className="work-detail__text-block">
          <h5 className="work-detail__text-block-title">Genre</h5>
          <p className="work-detail__text-block-content">2d Animation</p>
        </li>
        <li className="work-detail__text-block">
          <h5 className="work-detail__text-block-title">Tools</h5>
          <p className="work-detail__text-block-content">Adobe Illustrator · Adobe Premiere Pro · Adobe After Effects</p>
        </li>
      </ul>

      {/* Feature Cards Section */}
      <ul className="work-detail__section work-detail__cards work-detail__cards--cho-haneul-mobile">
        <li className="work-detail__card work-detail__card--cho-haneul-mobile-1">
          <div className="work-detail__card-image-wrapper">
            <img
              src={choHaneulWork2_02}
              alt="Character design"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, choHaneulWork2_02, work.id, 'card-1')}
              loading="lazy"
            />
          </div>
        </li>
        <li className="work-detail__card work-detail__card--cho-haneul-mobile-2">
          <div className="work-detail__card-image-wrapper">
            <img
              src={choHaneulWork2_03}
              alt="Komori 코모리"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, choHaneulWork2_03, work.id, 'card-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">Komori 코모리</h5>
            <p>우울하고 외로움을 많이 느끼고, 주변환경에 잘 휩쓸린다. 히키코모리의 삶을 살고 있지만, 어떠한 사건을 계기로 변화하여 긍정적인 사고를 하려고 노력한다.</p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--cho-haneul-mobile-3">
          <div className="work-detail__card-image-wrapper">
            <img
              src={choHaneulWork2_04}
              alt="Cloudi 구르미"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, choHaneulWork2_04, work.id, 'card-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">Cloudi 구르미</h5>
            <p>따뜻한 마음을 지닌, 희망과 위로를 전하는 구름 같은 친구이다.<br />코모리의 소중한 친구로서, 불안 속에 있을 때 살며시 다가와 곁을 지키며 위로가 되어주었다.</p>
          </div>
        </li>
      </ul>

      {/* Style Frame Section 1 */}
      <section className="work-detail__section work-detail__feature work-detail__feature--cho-haneul-mobile">
        <div className="work-detail__feature-header">
          <h4 className="work-detail__feature-title">Style Frame</h4>
        </div>
        <div className="work-detail__feature-image-wrapper">
          <img
            src={choHaneulWork2_05}
            alt="Style Frame 1"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, choHaneulWork2_05, work.id, 'style-frame-1')}
            loading="lazy"
          />
        </div>
      </section>

      {/* Style Frame Section 2 */}
      <section className="work-detail__section work-detail__feature work-detail__feature--cho-haneul-mobile">
        <div className="work-detail__feature-image-wrapper">
          <img
            src={choHaneulWork2_06}
            alt="Style Frame 2"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, choHaneulWork2_06, work.id, 'style-frame-2')}
            loading="lazy"
          />
        </div>
      </section>

      {/* Style Frame Section 3 */}
      <section className="work-detail__section work-detail__feature work-detail__feature--cho-haneul-mobile">
        <div className="work-detail__feature-image-wrapper">
          <img
            src={choHaneulWork2_07}
            alt="Style Frame 3"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, choHaneulWork2_07, work.id, 'style-frame-3')}
            loading="lazy"
          />
        </div>
      </section>

      {/* Style Frame Section 4 */}
      <section className="work-detail__section work-detail__feature work-detail__feature--cho-haneul-mobile">
        <div className="work-detail__feature-image-wrapper">
          <img
            src={choHaneulWork2_08}
            alt="Style Frame 4"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, choHaneulWork2_08, work.id, 'style-frame-4')}
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
};

export default ChoHaneulTheReasonThatILiveMobile;
