import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import heoJiHoonWork2_01 from '../../../../assets/허지훈/heojihoon_motiondesign_work2_01.webp';
import heoJiHoonWork2_02 from '../../../../assets/허지훈/heojihoon_motiondesign_work2_02.webp';
import heoJiHoonWork2_03 from '../../../../assets/허지훈/heojihoon_motiondesign_work2_03.webp';
import heoJiHoonWork2_04 from '../../../../assets/허지훈/heojihoon_motiondesign_work2_04.webp';
import heoJiHoonWork2_05 from '../../../../assets/허지훈/heojihoon_motiondesign_work2_05.webp';
import heoJiHoonWork2_06 from '../../../../assets/허지훈/heojihoon_motiondesign_work2_06.webp';
import heoJiHoonWork2_07 from '../../../../assets/허지훈/heojihoon_motiondesign_work2_07.webp';
import heoJiHoonWork2_08 from '../../../../assets/허지훈/heojihoon_motiondesign_work2_08.webp';
import heoJiHoonWork2_09 from '../../../../assets/허지훈/heojihoon_motiondesign_work2_09.webp';
import heoJiHoonWork2_10 from '../../../../assets/허지훈/heojihoon_motiondesign_work2_10.webp';
import heoJiHoonWork2_11 from '../../../../assets/허지훈/heojihoon_motiondesign_work2_11.webp';
import heoJiHoonWork2_12 from '../../../../assets/허지훈/heojihoon_motiondesign_work2_12.webp';
import heoJiHoonWork2_13 from '../../../../assets/허지훈/heojihoon_motiondesign_work2_13.webp';
import heoJiHoonWork2_14 from '../../../../assets/허지훈/heojihoon_motiondesign_work2_14.webp';
import heoJiHoonWork2_15 from '../../../../assets/허지훈/heojihoon_motiondesign_work2_15.webp';
import heoJiHoonWork2_16 from '../../../../assets/허지훈/heojihoon_motiondesign_work2_16.webp';
import '../../styles/works/HeoJihoonEternalVision/HeoJihoonEternalVisionDesktop.css';

/**
 * 허지훈 - Eternal Vision (작품2) Desktop 버전
 * Figma 디자인 기반 구현 (1280px)
 */
const HeoJihoonEternalVisionDesktop = ({ work, designer, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--heo-jihoon-eternal-vision-desktop">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--eternal-vision-desktop">
        <div className="work-detail__hero-content work-detail__hero-content--desktop">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--desktop">{work.title || 'Eternal Vision'}</h2>
            <p className="work-detail__lead work-detail__lead--desktop">{work.summary || '현대자동차의 상징적 모델 \'포니 쿠페\'의 유산과 이를 계승한 \'N74\'의 탄생을 감각적으로 담은 시네마틱 브랜딩 영상.'}</p>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--desktop">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--desktop`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--desktop">
          <img 
            src={heoJiHoonWork2_01} 
            alt={work.title || 'Eternal Vision'} 
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, heoJiHoonWork2_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
      </section>

      {/* Pull Quote Section */}
      <section className="work-detail__section work-detail__quote work-detail__quote--desktop">
        <figure className="work-detail__quote-figure">
          <p className="work-detail__quote-text">영원한 비전</p>
        </figure>
      </section>

      {/* Text Section 1 */}
      <section className="work-detail__section work-detail__text-section work-detail__text-section--desktop">
        <div className="work-detail__text-headline">
          <p className="work-detail__eyebrow-text">포니 쿠페의 유산</p>
          <h3 className="work-detail__subtitle">N Vision 74</h3>
        </div>
        <div className="work-detail__text-content">
          <p>포니가 지닌 직선적 디자인 언어와 미래적 공간이 교차하며, 과거의 상징이 새로운 형태로 되살아나는 순간을 담았다. 어두운 미지의 공간을 벗어나 밝은 세계로 질주하는 장면은 헤리티지가 미래의 비전으로 확장되는 가능성을 상징한다.</p>
        </div>
      </section>

      {/* Feature Section 1 */}
      <section className="work-detail__section work-detail__feature work-detail__feature--desktop">
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
          <p>N Vision 74의 스펙을 직접적으로 드러내기보다, 포니 쿠페의 디자인과 정신을 계승한 브랜드 철학에 집중했다. 영상의 분위기와 연출은 영화 &lt;블레이드 러너 2049&gt;에서 영감을 받았다.</p>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="work-detail__section work-detail__cards work-detail__cards--desktop">
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
      <section className="work-detail__section work-detail__feature work-detail__feature--desktop">
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
      <section className="work-detail__section work-detail__feature-rows work-detail__feature-rows--desktop">
        <div className="work-detail__feature-row">
          <div className="work-detail__feature-row-content">
            <h4 className="work-detail__feature-row-title">푸른 하늘과 설원</h4>
            <p>극적인 색상 반전을 통해 영상의 분위기를 전환하며, 감정의 흐름을 더욱 극대화하고자 했다. 특히 차가운 블루 톤의 설원을 배경으로 N74가 자유롭게 질주하는 장면은 이전까지의 긴장감과 대비되며 해방감과 역동성을 동시에 전달한다.</p>
          </div>
          <div className="work-detail__feature-row-image-wrapper">
            <img 
              src={heoJiHoonWork2_07} 
              alt="푸른 하늘의 원"
              className="work-detail__feature-row-image"
              onError={(e) => handleImageError(e, heoJiHoonWork2_07, work.id, 'row-1')}
              loading="lazy"
            />
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
            <p>Pyro를 이용하여 바퀴에서 흩날리는 눈 입자를 표현했으며, 하늘에서 내리는 눈은 후보정으로 추가했다.</p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="work-detail__section work-detail__gallery work-detail__gallery--desktop">
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
      <section className="work-detail__section work-detail__feature work-detail__feature--desktop work-detail__feature--final">
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
          <p>제목 &lt;Eternal Vision&gt;에는 나의 비전이 영원히 빛나길 바라는 소망을 담았다.</p>
        </div>
      </section>
    </div>
  );
};

export default HeoJihoonEternalVisionDesktop;
