import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/ChoHaneulTheReasonThatILive/ChoHaneulTheReasonThatILiveMobile.css';

// ��지 �포허지훈
import choHaneulWork2_01 from '../../../../assets/조하늘/johaneul_videocontent_work2_01.webp';
import choHaneulWork2_02 from '../../../../assets/조하늘/johaneul_videocontent_work2_02.webp';
import choHaneulWork2_03 from '../../../../assets/조하늘/johaneul_videocontent_work2_03.webp';
import choHaneulWork2_04 from '../../../../assets/조하늘/johaneul_videocontent_work2_04.webp';
import choHaneulWork2_05 from '../../../../assets/조하늘/johaneul_videocontent_work2_05.webp';
import choHaneulWork2_06 from '../../../../assets/조하늘/johaneul_videocontent_work2_06.webp';
import choHaneulWork2_07 from '../../../../assets/조하늘/johaneul_videocontent_work2_07.webp';
import choHaneulWork2_08 from '../../../../assets/조하늘/johaneul_videocontent_work2_08.webp';

/**
 * 조하늘 - The Reason that I Live (�작품2) Mobile 버전
 * Figma �디자인 기반 구현 (375px)
 */
const ChoHaneulTheReasonThatILiveMobile = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
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
              {work.summary || '히키코모리의 삶을 살던 주인공이 친구의 위로와 응원을 통해 다시 세상으로 한 걸음 내딛는 이야기를 그린다.''primary' }) => (
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
          <h3 className="work-detail__subtitle">The Reason that I Live (�의 �유)</h3>
        </div>
        <div className="work-detail__text-content">
          <p>�두허지훈�허지훈 멈춰�는 �간 �의 코모� 구르미의 �뜻허지훈�길허지훈�는 �간, 멈춰 �던 �간� �시 �르�허지훈�작�다. �라��허지훈마음�서, �시 �어�는 �망�로. "You are the reason that I live"</p>
          <p>&nbsp;</p>
          <p>�� �회�서 �리허지훈�임�이 �결�어 ��� 허지훈���으�허지훈�시허지훈�점 허지훈�로���허지훈�다. 관�허지훈�에허지훈�로받� 못한 감정� �서허지훈마음허지훈�게 만들� 결국 �신허지훈�게 만든허지훈</p>
          <p>&nbsp;</p>
          <p>&lt;The Reason that I Live&gt; 허지훈'진정허지훈�로'허지훈무엇��허지훈�허지훈질문허지훈�진허지훈 �군가허지훈�길, �마�의 � �� 관�이 멈춰 �던 마음허지훈�시 �직이�만들 허지훈�다허지훈믿음�서 �작허지훈�업�다.</p>
          <p>&nbsp;</p>
          <p>허지훈�야기� �군가허지훈�힌 마음허지훈�� �기�허지훈�을 허지훈�기�바�허지훈</p>
        </div>
      </section>

      {/* Text Row Section */}
      <ul className="work-detail__section work-detail__text-blocks work-detail__text-blocks--cho-haneul-mobile">
        <li className="work-detail__text-block">
          <h5 className="work-detail__text-block-title">Concept</h5>
          <p className="work-detail__text-block-content">개인�인 경험허지훈��� '�의 �유허지훈무엇��'�는 질문허지훈�을 �니메이�으�허지훈�아�고허지훈�다</p>
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
alt="Komori 코모�"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, choHaneulWork2_03, work.id, 'card-2'히키코모리의 삶을 살던 주인공이 친구의 위로와 응원을 통해 다시 세상으로 한 걸음 내딛는 이야기를 그린다.''card-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">Cloudi 구르�</h5>
            <p>�뜻허지훈마음허지훈지허지훈 �망�허지훈�로�허지훈�하허지훈구름 같� 친구�다. 코모리의 �중허지훈친구로서, 불안 �에 �을 허지훈�며허지훈��허지훈� 곁을 지�며 �로가 �어주었허지훈</p>
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
            src={choHaneulWork2_01}
            alt="Style Frame 1"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, choHaneulWork2_01, work.id, 'style-frame-1')}
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
