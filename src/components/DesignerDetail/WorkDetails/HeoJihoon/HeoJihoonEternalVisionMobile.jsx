import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import heoJiHoonEternal from '../../../../assets/허지훈/허지훈_모션디자인_작품2_01.webp';
import heoJiHoonWork2_02 from '../../../../assets/허지훈/허지훈_모션디자인_작품2_02.webp';
import heoJiHoonWork2_03 from '../../../../assets/허지훈/허지훈_모션디자인_작품2_03.webp';
import heoJiHoonWork2_04 from '../../../../assets/허지훈/허지훈_모션디자인_작품2_04.webp';
import heoJiHoonWork2_05 from '../../../../assets/허지훈/허지훈_모션디자인_작품2_05.webp';
import heoJiHoonWork2_06 from '../../../../assets/허지훈/허지훈_모션디자인_작품2_06.webp';
import heoJiHoonWork2_07 from '../../../../assets/허지훈/허지훈_모션디자인_작품2_07.webp';
import heoJiHoonWork2_08 from '../../../../assets/허지훈/허지훈_모션디자인_작품2_08.webp';
import heoJiHoonWork2_09 from '../../../../assets/허지훈/허지훈_모션디자인_작품2_09.webp';
import heoJiHoonWork2_10 from '../../../../assets/허지훈/허지훈_모션디자인_작품2_10.webp';
import heoJiHoonWork2_11 from '../../../../assets/허지훈/허지훈_모션디자인_작품2_11.webp';
import heoJiHoonWork2_12 from '../../../../assets/허지훈/허지훈_모션디자인_작품2_12.webp';
import heoJiHoonWork2_13 from '../../../../assets/허지훈/허지훈_모션디자인_작품2_13.webp';
import heoJiHoonWork2_14 from '../../../../assets/허지훈/허지훈_모션디자인_작품2_14.webp';
import heoJiHoonWork2_15 from '../../../../assets/허지훈/허지훈_모션디자인_작품2_15.webp';
import heoJiHoonWork2_16 from '../../../../assets/허지훈/허지훈_모션디자인_작품2_16.webp';
import '../../styles/works/HeoJihoonEternalVision/HeoJihoonEternalVisionMobile.css';

/**
 * ��- Eternal Vision (�작품2) Mobile 버전
 * Figma 디자인 기반 구현
 */
const HeoJihoonEternalVisionMobile = ({ work, designer, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--heo-jihoon-eternal-vision-mobile">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--eternal-vision-mobile">
        <div className="work-detail__hero-image-wrapper">
          <img 
            src={heoJiHoonEternal} 
            alt={work.title || 'Eternal Vision'} 
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, heoJiHoonEternal, work.id, 'hero')}
            loading="eager"
          />
        </div>
        <div className="work-detail__hero-content work-detail__hero-content--mobile">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--mobile">{work.title || 'Eternal Vision'}</h2>
            <p className="work-detail__lead work-detail__lead--mobile">{work.summary || '���동차의 �징모델 \'�니 쿠페\'�산��� 계승\'N74\'�생감각�으��� �시네마틱 브랜�상.'}</p>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--mobile">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--mobile`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Pull Quote Section */}
      <section className="work-detail__section work-detail__quote work-detail__quote--mobile">
        <figure className="work-detail__quote-figure">
          <p className="work-detail__quote-text">�원 비전</p>
        </figure>
      </section>

      {/* Text Section 1 */}
      <section className="work-detail__section work-detail__text-section work-detail__text-section--mobile">
        <div className="work-detail__text-headline">
          <p className="work-detail__eyebrow-text">�니 쿠페�산</p>
          <h3 className="work-detail__subtitle">N Vision 74</h3>
        </div>
        <div className="work-detail__text-content">
          <p>�니가 지직선�디자인�떠오르는� 미래공간교차�며, 과거�징�로�태��살�나�간�았 �두미�공간벗떠오르는밝� �계�질주�는 �면� �리��가 미래 비전�로 �장�는 가�성�징�다.</p>
        </div>
      </section>

      {/* Feature Section 1 */}
      <section className="work-detail__section work-detail__feature work-detail__feature--mobile">
        <div className="work-detail__feature-image-wrapper">
          <img 
            src={heoJiHoonWork2_02} 
            alt="Cinematic Branding Film"
              className="work-detail__feature-image"
            onError={(e) => handleImageError(e, heoJiHoonWork2_02, work.id, 'feature-1')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title">Cinematic Branding Film</h4>
          <p>N Vision 74�펙직접�으��러�기보다, �니 쿠페�디자인�과 �신계승브랜철학집중�다. �상분위기� �출� �화 &lt;블레�드 �너 2049&gt;�서 �감받았</p>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="work-detail__section work-detail__cards work-detail__cards--mobile">
        <div className="work-detail__card">
          <div className="work-detail__card-image-wrapper">
            <img 
              src={heoJiHoonWork2_03} 
              alt="Card 1"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, heoJiHoonWork2_03, work.id, 'card-1')}
              loading="lazy"
            />
          </div>
        </div>
        <div className="work-detail__card">
          <div className="work-detail__card-image-wrapper">
            <img 
              src={heoJiHoonWork2_04} 
              alt="Card 2"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, heoJiHoonWork2_04, work.id, 'card-2')}
              loading="lazy"
            />
          </div>
        </div>
        <div className="work-detail__card">
          <div className="work-detail__card-image-wrapper">
            <img 
              src={heoJiHoonWork2_05} 
              alt="Card 3"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, heoJiHoonWork2_05, work.id, 'card-3')}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Feature Section 2 */}
      <section className="work-detail__section work-detail__feature work-detail__feature--mobile">
        <div className="work-detail__feature-image-wrapper">
          <img 
            src={heoJiHoonWork2_06} 
            alt="Feature 2"
              className="work-detail__feature-image"
            onError={(e) => handleImageError(e, heoJiHoonWork2_06, work.id, 'feature-2')}
            loading="lazy"
          />
        </div>
      </section>

      {/* Feature Rows Section */}
      <section className="work-detail__section work-detail__feature-rows work-detail__feature-rows--mobile">
        <div className="work-detail__feature-row">
          <div className="work-detail__feature-row-image-wrapper">
            <img 
              src={heoJiHoonWork2_07} 
              alt="�른 �늘��원"
              className="work-detail__feature-row-image"
              onError={(e) => handleImageError(e, heoJiHoonWork2_07, work.id, 'row-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-row-content">
            <h4 className="work-detail__feature-row-title">�른 �늘��원</h4>
            <p>극적�상 반전�해 �상분위기� �환�며, 감정�름�욱 극��하고디자인 �다. �히 차�블루 �의 �원배경�로 N74가 �유��� 질주�는 �면� �전까�긴장감과 �비되��방감과 ���을 �시�달�다.</p>
          </div>
        </div>
        <div className="work-detail__feature-row">
          <div className="work-detail__feature-row-image-wrapper">
            <img 
              src={heoJiHoonWork2_08} 
              alt="Cinema 4D Pyro"
              className="work-detail__feature-row-image"
              onError={(e) => handleImageError(e, heoJiHoonWork2_08, work.id, 'row-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-row-content">
            <h4 className="work-detail__feature-row-title">Cinema 4D Pyro</h4>
            <p>Pyro��용�여 바퀴에�날리는 �디자인��현�으� �늘�서 �리�� �보�으�추��다.</p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="work-detail__section work-detail__gallery work-detail__gallery--mobile">
        <div className="work-detail__gallery-grid">
          <div className="work-detail__gallery-column">
            <div className="work-detail__gallery-item">
              <img 
                src={heoJiHoonWork2_09} 
                alt="Gallery 1"
              className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, heoJiHoonWork2_09, work.id, 'gallery-1')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img 
                src={heoJiHoonWork2_10} 
                alt="Gallery 2"
              className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, heoJiHoonWork2_10, work.id, 'gallery-2')}
                loading="lazy"
              />
            </div>
          </div>
          <div className="work-detail__gallery-column">
            <div className="work-detail__gallery-item">
              <img 
                src={heoJiHoonWork2_11} 
                alt="Gallery 3"
              className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, heoJiHoonWork2_11, work.id, 'gallery-3')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img 
                src={heoJiHoonWork2_12} 
                alt="Gallery 4"
              className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, heoJiHoonWork2_12, work.id, 'gallery-4')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img 
                src={heoJiHoonWork2_13} 
                alt="Gallery 5"
              className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, heoJiHoonWork2_13, work.id, 'gallery-5')}
                loading="lazy"
              />
            </div>
          </div>
          <div className="work-detail__gallery-column">
            <div className="work-detail__gallery-item">
              <img 
                src={heoJiHoonWork2_14} 
                alt="Gallery 6"
              className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, heoJiHoonWork2_14, work.id, 'gallery-6')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img 
                src={heoJiHoonWork2_15} 
                alt="Gallery 7"
              className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, heoJiHoonWork2_15, work.id, 'gallery-7')}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final Feature Section */}
      <section className="work-detail__section work-detail__feature work-detail__feature--mobile work-detail__feature--final">
        <div className="work-detail__feature-image-wrapper">
          <img 
            src={heoJiHoonWork2_16} 
            alt="Eternal Vision"
              className="work-detail__feature-image"
            onError={(e) => handleImageError(e, heoJiHoonWork2_16, work.id, 'feature-final')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title work-detail__feature-title--large">Eternal Vision</h4>
          <p>�목 &lt;Eternal Vision&gt;�는 �의 비전�원빛나�바라�망�았</p>
        </div>
      </section>
    </div>
  );
};

export default HeoJihoonEternalVisionMobile;

