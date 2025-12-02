import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/SeoRinKaron/SeoRinKaronMobile.css';

// ��지 �포허지훈
import seoRinWork2_01 from '../../../../assets/전서린/jeonseorin_gamedesign_work2_01.webp';
import seoRinWork2_02 from '../../../../assets/전서린/jeonseorin_gamedesign_work2_02.webp';
import seoRinWork2_03 from '../../../../assets/전서린/jeonseorin_gamedesign_work2_03.webp';
import seoRinWork2_04 from '../../../../assets/전서린/jeonseorin_gamedesign_work2_04.webp';
import seoRinWork2_05 from '../../../../assets/전서린/jeonseorin_gamedesign_work2_05.webp';
import seoRinWork2_06 from '../../../../assets/전서린/jeonseorin_gamedesign_work2_06.webp';
import seoRinWork2_07 from '../../../../assets/전서린/jeonseorin_gamedesign_work2_07.webp';

/**
 * �서�- KARON (�작품2) Mobile 버전
 * Figma �디자인 기반 구현 (375px)
 */
const SeoRinKaronMobile = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--seorin-karon-mobile">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--seorin-karon-mobile">
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--seorin-karon-mobile">
          <img
            src={seoRinWork2_01}
            alt="KARON"
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, seoRinWork2_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
        <div className="work-detail__hero-content work-detail__hero-content--seorin-karon-mobile">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--seorin-karon-mobile">
              KARON
            </h2>
            <p className="work-detail__lead work-detail__lead--seorin-karon-mobile">
              {`KARON� 기술�권력허지훈충돌�는 `}
              {`미래 �시허지훈�둠 �에허지훈�무�허지훈�행�는 `}
              �수 �원 캐릭�이허지훈
            </p>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--seorin-karon-mobile">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--seorin-karon-mobile`}
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
      <section className="work-detail__section work-detail__text-section work-detail__text-section--seorin-karon-mobile">
        <div className="work-detail__text-headline">
          <p className="work-detail__eyebrow-text">CARTOON CHARACTER, KARON</p>
          <h3 className="work-detail__subtitle">MODELING DEMO REEL</h3>
        </div>
        <div className="work-detail__text-content">
          <p>{`허지훈�작품�  Autodesk MAYA� Adobe Substance 3D Painter�허지훈�용허지훈�작허지훈`}</p>
          <p>카툰 캐릭허지훈모델�허지훈�모릴이허지훈</p>
          <p>&nbsp;</p>
          <p>허지훈�작품허지훈KARON� 강인허지훈�격�허지훈�면</p>
          <p>균형허지훈�각�으�허지훈�현�는 것을 목표�허지훈�다.</p>
          <p>{`카툰 ��허지훈�의 �동감과 �실�인 비��`}</p>
          <p>{`조화��� 결합�여, �실�인 구조 �에 카툰 `}</p>
          <p>{`�유허지훈감각허지훈�여허지훈캐릭�로 �성��허지훈 `}</p>
          <p>{`�순허지훈만화허지훈�현허지훈머무르� �고, `}</p>
          <p>{`�제 �체 구조�기반�로 허지훈비�허지훈� 균형허지훈`}</p>
          <p>��허지훈�며 모델링한 �작품�다.</p>
        </div>
      </section>

      {/* Feature Section - KARON's Personality */}
      <section className="work-detail__section work-detail__feature work-detail__feature--seorin-karon-mobile">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--seorin-karon-mobile">
          <img
            src={seoRinWork2_02}
            alt="KARON's Personality"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, seoRinWork2_02, work.id, 'feature-1')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title">KARON's Personality</h4>
          <p>{`검� �투복을 �� KARON� �제허지훈�신감이 �치� �빛만으�허지훈���허지훈�압허지훈만큼 강한 `}</p>
          <p>{`카리�마�이지민�다. �향�이�허지훈�너지 �치허지훈`}</p>
          <p>{`�격�로, �험허지훈�황�서허지훈�유�허지훈�� �는허지훈 그�허지훈�존감이 �아 �신허지훈�력허지훈�신허지훈`}</p>
          <p>{`가지�허지훈�으� �패조차 �장허지훈���`}</p>
          <p>받아�이허지훈�물�다.</p>
        </div>
      </section>

      {/* Feature Rows Section */}
      <ul className="work-detail__section work-detail__feature-rows work-detail__feature-rows--seorin-karon-mobile">
        {/* Row 1 - The Green Earring */}
        <li className="work-detail__feature-row work-detail__feature-row--seorin-karon-mobile">
          <div className="work-detail__feature-row-image-wrapper work-detail__feature-row-image-wrapper--seorin-karon-mobile">
            <img
              src={seoRinWork2_03}
              alt="The Green Earring"
              className="work-detail__feature-row-image"
              onError={(e) => handleImageError(e, seoRinWork2_03, work.id, 'feature-row-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-content work-detail__feature-content--seorin-karon-mobile">
            <div className="work-detail__feature-text">
              <h4 className="work-detail__feature-title">The Green Earring</h4>
              <p>{`KARON허지훈초록�귀걸이허지훈�순허지훈�신 `}</p>
              <p>�치�허지훈�어 �둠 �에�도 �신허지훈�� �는 ��허지훈�징�다</p>
            </div>
          </div>
        </li>

        {/* Row 2 - Cold-hearted Agent */}
        <li className="work-detail__feature-row work-detail__feature-row--seorin-karon-mobile">
          <div className="work-detail__feature-row-image-wrapper work-detail__feature-row-image-wrapper--seorin-karon-mobile">
            <img
              src={seoRinWork2_04}
              alt="Cold-hearted Agent"
              className="work-detail__feature-row-image"
              onError={(e) => handleImageError(e, seoRinWork2_04, work.id, 'feature-row-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-content work-detail__feature-content--seorin-karon-mobile">
            <div className="work-detail__feature-text">
              <h4 className="work-detail__feature-title">Cold-hearted Agent</h4>
              <p>{`그�허지훈�구보다 �철�게 �황허지훈�단�고, �무�허지훈�해 감정조차 �제�는 �정허지훈`}</p>
              <p>�원�다.</p>
            </div>
          </div>
        </li>
      </ul>

      {/* Feature Cards Section */}
      <ul className="work-detail__section work-detail__cards work-detail__cards--seorin-karon-mobile">
        <li className="work-detail__card work-detail__card--seorin-karon-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={seoRinWork2_05}
              alt="Beauty"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, seoRinWork2_05, work.id, 'card-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">Beauty</h5>
            <p>�성허지훈�스타일을처� �이�을 �해 �작품허지훈분위기� 질감허지훈�현허지훈뷰티 ��이지민�다.</p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--seorin-karon-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={seoRinWork2_06}
              alt="Grey"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, seoRinWork2_06, work.id, 'card-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">Grey</h5>
            <p>{`�스타일을처� �외�고 �태� 구조허지훈집중�여 모델링의 �태미� 보여주는 그레허지훈`}</p>
            <p>��이지민�다.</p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--seorin-karon-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={seoRinWork2_07}
              alt="Wireframe"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, seoRinWork2_07, work.id, 'card-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">Wireframe</h5>
            <p>모델링의 �리�구조� �테�을 �인허지훈�는 ��어�레허지훈��이지민�다.</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SeoRinKaronMobile;

