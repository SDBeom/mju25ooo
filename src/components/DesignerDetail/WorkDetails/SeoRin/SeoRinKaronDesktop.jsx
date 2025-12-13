import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/SeoRinKaron/SeoRinKaronDesktop.css';

// 이미지 임포트
import seoRinWork2_01 from '../../../../assets/전서린/jeonseorin_gamedesign_work2_01.webp';
import seoRinWork2_02 from '../../../../assets/전서린/jeonseorin_gamedesign_work2_02.webp';
import seoRinWork2_03 from '../../../../assets/전서린/jeonseorin_gamedesign_work2_03.webp';
import seoRinWork2_04 from '../../../../assets/전서린/jeonseorin_gamedesign_work2_04.webp';
import seoRinWork2_05 from '../../../../assets/전서린/jeonseorin_gamedesign_work2_05.webp';
import seoRinWork2_06 from '../../../../assets/전서린/jeonseorin_gamedesign_work2_06.webp';
import seoRinWork2_07 from '../../../../assets/전서린/jeonseorin_gamedesign_work2_07.webp';

/**
 * 전서린 - KARON (작품2) Desktop 버전
 * Figma 디자인 기반 구현 (1280px)
 */
const SeoRinKaronDesktop = ({ work, designer, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--seorin-karon-desktop">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--seorin-karon-desktop">
        <div className="work-detail__hero-content work-detail__hero-content--seorin-karon-desktop">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--seorin-karon-desktop">
              KARON
            </h2>
            <p className="work-detail__lead work-detail__lead--seorin-karon-desktop">
              KARON은 기술과 권력이 충돌하는 미래 도시의 어둠 속에서 임무를 수행하는 특수 요원 캐릭터이다.
            </p>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--seorin-karon-desktop">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--seorin-karon-desktop`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--seorin-karon-desktop">
          <img
            src={seoRinWork2_01}
            alt="KARON"
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, seoRinWork2_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
      </section>

      {/* YouTube Video Section */}
      <section className="work-detail__section work-detail__video-section work-detail__video-section--seorin-karon-desktop">
        <div className="work-detail__video-wrapper work-detail__video-wrapper--seorin-karon-desktop">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/VIDEO_ID_HERE"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="work-detail__video-iframe work-detail__video-iframe--seorin-karon-desktop"
          />
        </div>
      </section>

      {/* Text Section */}
      <section className="work-detail__section work-detail__text-section work-detail__text-section--seorin-karon-desktop">
        <div className="work-detail__text-headline">
          <p className="work-detail__eyebrow-text">CARTOON CHARACTER, KARON</p>
          <h3 className="work-detail__subtitle">MODELING DEMO REEL</h3>
        </div>
        <div className="work-detail__text-content">
          <p>이 작품은 Autodesk MAYA와 Adobe Substance 3D Painter를 활용해 제작한 카툰 캐릭터 모델링 데모릴이다.

이 작품의 KARON의 강인한 성격과 내면의 균형을 시각적으로 표현하는 것을 목표로 했다. 카툰 스타일의 생동감과 현실적인 비례를 조화롭게 결합하여, 
사실적인 구조 속에 카툰 특유의 감각을 녹여낸 캐릭터로 완성하였다. 단순한 만화적 표현에 머무르지 않고, 실제 인체 구조를 기반으로 한 비례와 균형을 
유지하며 모델링한 작품이다.</p>
        </div>
      </section>

      {/* Feature Section - KARON's Personality */}
      <section className="work-detail__section work-detail__feature work-detail__feature--seorin-karon-desktop">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--seorin-karon-desktop">
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
          <p>검은 전투복을 입은 KARON은 언제나 자신감이 넘치며, 눈빛만으로 상대를 제압할 만큼 강한 카리스마를 지닌다. 외향적이고 에너지 넘치는 성격으로, 위험한 상황에서도 여유를 잃지 않는다. 그녀는 자존감이 높아 자신의 능력에 확신을 가지고 있으며, 실패조차 성장의 일부로 
받아들이는 인물이다.</p>
        </div>
      </section>

      {/* Feature Rows Section */}
      <ul className="work-detail__section work-detail__feature-rows work-detail__feature-rows--seorin-karon-desktop">
        {/* Row 1 - The Green Earring */}
        <li className="work-detail__feature-row work-detail__feature-row--seorin-karon-desktop">
          <div className="work-detail__feature-content work-detail__feature-content--seorin-karon-desktop">
            <div className="work-detail__feature-text">
              <h4 className="work-detail__feature-title">The Green Earring</h4>
              <p>KARON의 초록빛 귀걸이는 단순한 통신 장치를 넘어 어둠 속에서도 
자신을 잃지 않는 의지의 상징이다.</p>
            </div>
          </div>
          <div className="work-detail__feature-row-image-wrapper work-detail__feature-row-image-wrapper--seorin-karon-desktop">
            <img
              src={seoRinWork2_03}
              alt="The Green Earring"
              className="work-detail__feature-row-image"
              onError={(e) => handleImageError(e, seoRinWork2_03, work.id, 'feature-row-1')}
              loading="lazy"
            />
          </div>
        </li>

        {/* Row 2 - Cold-hearted Agent (reverse) */}
        <li className="work-detail__feature-row work-detail__feature-row--seorin-karon-desktop work-detail__feature-row--reverse">
          <div className="work-detail__feature-content work-detail__feature-content--seorin-karon-desktop">
            <div className="work-detail__feature-text">
              <h4 className="work-detail__feature-title">Cold-hearted Agent</h4>
              <p>그녀는 누구보다 냉철하게 상황을 판단하고, 임무를 위해 감정조차 
절제하는 냉정한 요원이다.</p>
            </div>
          </div>
          <div className="work-detail__feature-row-image-wrapper work-detail__feature-row-image-wrapper--seorin-karon-desktop">
            <img
              src={seoRinWork2_04}
              alt="Cold-hearted Agent"
              className="work-detail__feature-row-image"
              onError={(e) => handleImageError(e, seoRinWork2_04, work.id, 'feature-row-2')}
              loading="lazy"
            />
          </div>
        </li>
      </ul>

      {/* Marquee Section - Turntable Renders */}
      <section className="work-detail__section work-detail__marquee work-detail__marquee--seorin-karon-desktop">
        <h3 className="work-detail__marquee-text">Turntable Renders</h3>
      </section>

      {/* Feature Cards Section */}
      <ul className="work-detail__section work-detail__cards work-detail__cards--seorin-karon-desktop">
        <li className="work-detail__card work-detail__card--seorin-karon-desktop">
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
        <li className="work-detail__card work-detail__card--seorin-karon-desktop">
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
            <p>텍스처를 제외하고 형태와 구조에 집중하여 
모델링의 형태미를 보여주는 그레이 이미지이다.</p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--seorin-karon-desktop">
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
            <p>모델링의 폴리곤 구조와 디테일을 확인할 수 있는 와이어프레임 이미지이다.</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SeoRinKaronDesktop;
