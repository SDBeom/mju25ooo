import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import heoJiHoonMaster from '../../../../assets/허지훈/heojihoon_motiondesign_work1_01.webp';
import heoJiHoonWork1_02 from '../../../../assets/허지훈/heojihoon_motiondesign_work1_02.webp';
import heoJiHoonWork1_03 from '../../../../assets/허지훈/heojihoon_motiondesign_work1_03.webp';
import heoJiHoonWork1_04 from '../../../../assets/허지훈/heojihoon_motiondesign_work1_04.webp';
import heoJiHoonWork1_05 from '../../../../assets/허지훈/heojihoon_motiondesign_work1_05.webp';
import heoJiHoonWork1_06 from '../../../../assets/허지훈/heojihoon_motiondesign_work1_06.webp';
import heoJiHoonWork1_07 from '../../../../assets/허지훈/heojihoon_motiondesign_work1_07.webp';
import heoJiHoonWork1_09 from '../../../../assets/허지훈/heojihoon_motiondesign_work1_09.webp';
import heoJiHoonWork1_10 from '../../../../assets/허지훈/heojihoon_motiondesign_work1_10.webp';
import heoJiHoonWork1_11 from '../../../../assets/허지훈/heojihoon_motiondesign_work1_11.webp';
import heoJiHoonWork1_12 from '../../../../assets/허지훈/heojihoon_motiondesign_work1_12.webp';
import heoJiHoonWork1_13 from '../../../../assets/허지훈/heojihoon_motiondesign_work1_13.webp';
import heoJiHoonWork1_14 from '../../../../assets/허지훈/heojihoon_motiondesign_work1_14.webp';
import heoJiHoonWork1_15 from '../../../../assets/허지훈/heojihoon_motiondesign_work1_15.webp';
import heoJiHoonWork1_16 from '../../../../assets/허지훈/heojihoon_motiondesign_work1_16.webp';
import heoJiHoonWork1_17 from '../../../../assets/허지훈/heojihoon_motiondesign_work1_17.webp';
import heoJiHoonWork1_18 from '../../../../assets/허지훈/heojihoon_motiondesign_work1_18.webp';
import heoJiHoonWork1_19 from '../../../../assets/허지훈/heojihoon_motiondesign_work1_19.webp';
import '../../styles/works/HeoJihoonMasterImagination/HeoJihoonMasterImaginationMobile.css';

/**
 * ��- Master your Imagination (�작품1) Mobile 버전
 * Figma 디자인 기반 구현 (375px)
 */
const HeoJihoonMasterImaginationMobile = ({ work, designer, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--heo-jihoon-master-imagination-mobile">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--master-imagination-mobile">
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--mobile">
          <img 
            src={heoJiHoonMaster} 
            alt={work.title || 'Master your Imagination'} 
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, heoJiHoonMaster, work.id, 'hero')}
            loading="eager"
          />
        </div>
        <div className="work-detail__hero-content work-detail__hero-content--mobile">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--mobile">{work.title || 'Master your Imagination'}</h2>
            <p className="work-detail__lead work-detail__lead--mobile">{work.summary || 'MX Master 3S를 통해 시각적 실감을 끌어내는 메시지를 담은 시네마틱 브랜딩.'}</p>
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
          <p className="work-detail__quote-text">"�상� 머릿속�에<br />�떠오르는���<br />창조의�에<br />�작�다."</p>
        </figure>
      </section>

      {/* Text Section 1 */}
      <section className="work-detail__section work-detail__text-section work-detail__text-section--mobile">
        <div className="work-detail__text-headline">
          <p className="work-detail__eyebrow-text">�상�실감��끌어어 창작�구</p>
          <h3 className="work-detail__subtitle">마우스�� 창작<br />�도구로서 바라보다</h3>
        </div>
        <div className="work-detail__text-content">
          <p>�상� Logitech MX Master 3S�주제� '�상�실감��끌어어 창작�구'�는 메시지를 담은��각�으���낸 브랜�상�다. 마우스�� �순�무기기��떠오르는, �디자인�너 창의�인 �업�는 �들�게 �의 �장�로 �용�며 �상�실감�구현�내 창작�구가 �다�각�서 출발�다.</p>
        </div>
      </section>

      {/* Feature Section 1 */}
      <section className="work-detail__section work-detail__feature work-detail__feature--mobile">
        <div className="work-detail__feature-image-wrapper">
          <img 
            src={heoJiHoonWork1_02} 
            alt="�작품의 본질에 집중"
              className="work-detail__feature-image"
            onError={(e) => handleImageError(e, heoJiHoonWork1_02, work.id, 'feature-1')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title">�작품의 본질에 집중</h4>
          <p>�는 마우스�의 �양기능�개�기보다, 그것�리�게 �떤 ���이지민�는지 고��고�다. 창의�인 �업�는 �� 같� �람�에�마우스�는 무엇�까 �의 �장�로 �상�실감��끌어�내창조의�작�이</p>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="work-detail__section work-detail__cards work-detail__cards--mobile">
        <div className="work-detail__card">
          <div className="work-detail__card-image-wrapper">
            <img 
              src={heoJiHoonWork1_03} 
alt="바위 �루"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, heoJiHoonWork1_03, work.id, 'card-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">바위 �루</h5>
            <p>마우스�의 �태��상�키바위. ��곽�라 �상�계가 ���듯 �펼쳐진다.</p>
          </div>
        </div>
        <div className="work-detail__card">
          <div className="work-detail__card-image-wrapper">
            <img 
              src={heoJiHoonWork1_04} 
              alt="�쳐지�상�계"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, heoJiHoonWork1_04, work.id, 'card-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">�쳐지�상�계</h5>
            <p>�떠오르는지�많� �상�계. ���는 �상�과 �께 벅찬 감정밀�온</p>
          </div>
        </div>
        <div className="work-detail__card">
          <div className="work-detail__card-image-wrapper">
            <img 
              src={heoJiHoonWork1_05} 
alt="창작�구, 마우스"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, heoJiHoonWork1_05, work.id, 'card-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">창작�구, 마우스</h5>
            <p>무한�상�계가 �실감이 마우스스타일을�로 모인 모든 �상�실감��끌어어 창작�구가 바로 마우스�임�한</p>
          </div>
        </div>
      </section>

      {/* Feature Section 2 */}
      <section className="work-detail__section work-detail__feature work-detail__feature--mobile">
        <div className="work-detail__feature-image-wrapper">
          <img 
            src={heoJiHoonWork1_06} 
            alt="�성AI �용"
              className="work-detail__feature-image"
            onError={(e) => handleImageError(e, heoJiHoonWork1_06, work.id, 'feature-2')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title work-detail__feature-title--large">�성AI �용</h4>
          <p>�번 �업�서�성AI��험�으��용�여 �상 �작�율�을 �� 반복�인 �스타일을�� �해 �면��출 �을 빠르�구상�었�며, �히 바다� 같� �연�실감�으��현�었 �롬�트���지 �성, ��지��상 �성기본�인 �업 과정�다.</p>
        </div>
      </section>

      {/* Feature Rows Section */}
      <section className="work-detail__section work-detail__feature-rows work-detail__feature-rows--mobile">
        <div className="work-detail__feature-row">
          <div className="work-detail__feature-row-image-wrapper">
            <img 
              src={heoJiHoonWork1_07} 
              alt="RUNWAY� Cinema 4D의 만남"
              className="work-detail__feature-row-image"
              onError={(e) => handleImageError(e, heoJiHoonWork1_07, work.id, 'row-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-row-content">
            <h4 className="work-detail__feature-row-title">RUNWAY� Cinema 4D의 만남</h4>
            <p>�도����면도구현�기 �해 먼� C4D�서 카메�직임�구도�간단�게 �고 �더���며, �� Runway�불러�다.</p>
          </div>
        </div>
        <div className="work-detail__feature-row">
          <div className="work-detail__feature-row-image-wrapper">
            <img 
              src={heoJiHoonMaster} 
              alt="Stylize + 4K Upscale"
              className="work-detail__feature-row-image"
              onError={(e) => handleImageError(e, heoJiHoonMaster, work.id, 'row-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-row-content">
            <h4 className="work-detail__feature-row-title">Stylize + 4K Upscale</h4>
            <p>Runway�불러C4DD 뷰포�상Stylize 기능�용�하 질감�로 변�하��며, 변�된 �상� 4K��스타일을케�링을 진행�다.</p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="work-detail__section work-detail__gallery work-detail__gallery--mobile">
        <div className="work-detail__gallery-header">
          <h3 className="work-detail__gallery-title">�양�롬�트</h3>
          <p className="work-detail__gallery-description">�일 과정 반복�며 �양�롬�트��력�여 �많� �면�을 �성�었 AI�번�하 결과물을 �기가 �려�데, 지�적�구� �행착오��해 AI��나 창작 �구�받아�이����는 경험�었</p>
        </div>
        <div className="work-detail__gallery-grid">
          <div className="work-detail__gallery-column">
            <div className="work-detail__gallery-item">
              <img 
                src={heoJiHoonWork1_09} 
                alt="Gallery 1"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, heoJiHoonWork1_09, work.id, 'gallery-1')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img 
                src={heoJiHoonWork1_10} 
                alt="Gallery 2"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, heoJiHoonWork1_10, work.id, 'gallery-2')}
                loading="lazy"
              />
            </div>
          </div>
          <div className="work-detail__gallery-column">
            <div className="work-detail__gallery-item">
              <img 
                src={heoJiHoonWork1_11} 
                alt="Gallery 3"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, heoJiHoonWork1_11, work.id, 'gallery-3')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img 
                src={heoJiHoonWork1_12} 
                alt="Gallery 4"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, heoJiHoonWork1_12, work.id, 'gallery-4')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img 
                src={heoJiHoonWork1_13} 
                alt="Gallery 5"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, heoJiHoonWork1_13, work.id, 'gallery-5')}
                loading="lazy"
              />
            </div>
          </div>
          <div className="work-detail__gallery-column">
            <div className="work-detail__gallery-item">
              <img 
                src={heoJiHoonWork1_14} 
                alt="Gallery 6"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, heoJiHoonWork1_14, work.id, 'gallery-6')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img 
                src={heoJiHoonWork1_15} 
                alt="Gallery 7"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, heoJiHoonWork1_15, work.id, 'gallery-7')}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section 2 */}
      <section className="work-detail__section work-detail__cards work-detail__cards--mobile work-detail__cards--final">
        <div className="work-detail__card">
          <div className="work-detail__card-image-wrapper">
            <img 
              src={heoJiHoonWork1_16} 
alt="부�러 무한 �크�"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, heoJiHoonWork1_16, work.id, 'card-4')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">부�러 무한 �크�</h5>
            <p>부�럽��전�는 �크�을 강조</p>
          </div>
        </div>
        <div className="work-detail__card">
          <div className="work-detail__card-image-wrapper">
            <img 
              src={heoJiHoonWork1_17} 
alt="�체공학 비���디자인"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, heoJiHoonWork1_17, work.id, 'card-5')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">�체공학 비���디자인</h5>
            <p>�체공학�디자인을 강조</p>
          </div>
        </div>
        <div className="work-detail__card">
          <div className="work-detail__card-image-wrapper">
            <img 
              src={heoJiHoonWork1_18} 
alt="가��크�"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, heoJiHoonWork1_18, work.id, 'card-6')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">가��크�</h5>
            <p>부�럽��전�는 가�을 강조</p>
          </div>
        </div>
      </section>

      {/* Final Feature Section */}
      <section className="work-detail__section work-detail__feature work-detail__feature--mobile work-detail__feature--final">
        <div className="work-detail__feature-image-wrapper">
          <img 
            src={heoJiHoonWork1_19} 
            alt="Master your Imagination"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, heoJiHoonWork1_19, work.id, 'feature-final')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title work-detail__feature-title--large">Master your Imagination</h4>
          <p>�목 &lt;Master your Imagination&gt;�는 이 마우스스타일을�� �해 �상�을 주도�고, 그것�실감��현�라 메시지를 담은��았</p>
        </div>
      </section>
    </div>
  );
};

export default HeoJihoonMasterImaginationMobile;

