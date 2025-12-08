import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/SeoRinKaron/SeoRinKaronMobile.css';

// 이미지 임포트
import seoRinWork2_01 from '../../../../assets/전서린/jeonseorin_gamedesign_work2_01.webp';
import seoRinWork2_02 from '../../../../assets/전서린/jeonseorin_gamedesign_work2_02.webp';
import seoRinWork2_03 from '../../../../assets/전서린/jeonseorin_gamedesign_work2_03.webp';
import seoRinWork2_04 from '../../../../assets/전서린/jeonseorin_gamedesign_work2_04.webp';
import seoRinWork2_05 from '../../../../assets/전서린/jeonseorin_gamedesign_work2_05.webp';
import seoRinWork2_06 from '../../../../assets/전서린/jeonseorin_gamedesign_work2_06.webp';
import seoRinWork2_07 from '../../../../assets/전서린/jeonseorin_gamedesign_work2_07.webp';

/**
 * 전서린 - KARON (작품2) Mobile 버전
 * Figma 디자인 기반 구현 (375px)
 */
const SeoRinKaronMobile = ({ work, designer, ctas }) => {
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
              {`KARON은 기술과 권력의 충돌이 일어나는 `}
              {`미래 시대 속에서 어둠 속에 임무를 수행하는 `}
              수수께끼 캐릭터이다.
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
          <p>{`이 작품은 Autodesk MAYA와 Adobe Substance 3D Painter를 활용하여 제작한 `}</p>
          <p>카툰 캐릭터 모델링 데모릴이다.</p>
          <p>&nbsp;</p>
          <p>이 작품 KARON은 강인한 성격과 아름다운 균형을 시각적으로 표현하는 것을 목표로 했다.</p>
          <p>{`카툰 스타일의 동감과 사실적인 비율의 `}</p>
          <p>{`조화를 결합하여, 사실적인 구조 위에 카툰 `}</p>
          <p>{`스타일의 감각을 더하여 캐릭터로 성형했다. `}</p>
          <p>{`순수한 만화의 표현에 머무르지 않고, `}</p>
          <p>{`실제 인체 구조를 기반으로 하여 비현실적인 균형`}</p>
          <p>을 더하며 모델링한 작품이다.</p>
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
          <p>{`검은 전투복을 입은 KARON은 자신감이 넘치는 빛만으로도 상대를 압도할 만큼 강한 `}</p>
          <p>{`카리스마를 지녔다. 향상적인 에너지와 치명적인 `}</p>
          <p>{`성격으로, 위험한 상황에서도 유연하게 대처하는 그녀의 자신감은 높아 자신의 능력과 자신을 `}</p>
          <p>{`가진 그녀는 패배조차 장식으로 `}</p>
          <p>받아들이는 인물이다.</p>
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
              <p>{`KARON의 초록색 귀걸이는 순수한 신념 `}</p>
              <p>을 상징하며, 어둠 속에서도 자신의 신념을 지키는 상징이다.</p>
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
              <p>{`그녀는 누구보다 냉철하게 상황을 판단하고, 임무에 집중하여 감정조차 제어하는 정원이다.`}</p>
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
            <p>생성형 스타일 처리를 통해 작품의 분위기와 질감을 표현한 뷰티 렌더이다.</p>
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
            <p>{`스타일 처리를 제외하고 형태와 구조에 집중하여 모델링의 형태미를 보여주는 그레이 `}</p>
            <p>렌더이다.</p>
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
            <p>모델링의 리깅 구조와 와이어를 인식할 수 있는 와이어프레임 렌더이다.</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SeoRinKaronMobile;
