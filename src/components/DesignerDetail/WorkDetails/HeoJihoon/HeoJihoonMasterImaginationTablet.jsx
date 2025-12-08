import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import heoJiHoonMaster from '../../../../assets/허지훈/heojihoon_motiondesign_work1_01.webp';
import heoJiHoonWork1_02 from '../../../../assets/허지훈/heojihoon_motiondesign_work1_02.webp';
import heoJiHoonWork1_03 from '../../../../assets/허지훈/heojihoon_motiondesign_work1_03.webp';
import heoJiHoonWork1_04 from '../../../../assets/허지훈/heojihoon_motiondesign_work1_04.webp';
import heoJiHoonWork1_05 from '../../../../assets/허지훈/heojihoon_motiondesign_work1_05.webp';
import heoJiHoonWork1_06 from '../../../../assets/허지훈/heojihoon_motiondesign_work1_06.webp';
import heoJiHoonWork1_07 from '../../../../assets/허지훈/heojihoon_motiondesign_work1_07.webp';
import heoJiHoonWork1_08 from '../../../../assets/허지훈/heojihoon_motiondesign_work1_08.webp';
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
import '../../styles/works/HeoJihoonMasterImagination/HeoJihoonMasterImaginationTablet.css';

/**
 * 허지훈 - Master your Imagination (작품1) Tablet 버전
 * Figma 디자인 기반 구현 (800px)
 */
const HeoJihoonMasterImaginationTablet = ({ work, designer, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--heo-jihoon-master-imagination-tablet">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--master-imagination-tablet">
        <div className="work-detail__hero-content work-detail__hero-content--tablet">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--tablet">{work.title || 'Master your Imagination'}</h2>
            <p className="work-detail__lead work-detail__lead--tablet">{work.summary || 'MX Master 3S를 통해 당신의 상상을 현실로 이끌어내라는 메시지를 담은 시네마틱 브랜딩 영상.'}</p>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--tablet">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--tablet`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--tablet">
          <img 
            src={heoJiHoonMaster} 
            alt={work.title || 'Master your Imagination'} 
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, heoJiHoonMaster, work.id, 'hero')}
            loading="eager"
          />
        </div>
      </section>

      {/* Pull Quote Section */}
      <section className="work-detail__section work-detail__quote work-detail__quote--tablet">
        <figure className="work-detail__quote-figure">
          <p className="work-detail__quote-text">"상상은 머릿속에서 피어나지만,<br />창조는 손 끝에서 시작된다."</p>
        </figure>
      </section>

      {/* Text Section 1 */}
      <section className="work-detail__section work-detail__text-section work-detail__text-section--tablet">
        <div className="work-detail__text-headline">
          <p className="work-detail__eyebrow-text">상상을 현실로 이끄는 창작의 도구</p>
          <h3 className="work-detail__subtitle">마우스를 창작의 도구로서 바라보다</h3>
        </div>
        <div className="work-detail__text-content">
          <p>이 영상은 Logitech MX Master 3S를 주제로, '상상을 현실로 이끄는 창작의 도구'라는 메시지를 시각적으로 풀어낸 브랜딩 영상이다. 마우스가 단순한 사무용 기기를 넘어, 디자이너 등 창의적인 작업을 하는 이들에게 손의 연장으로 작용하며 상상을 현실로 구현해내는 창작의 도구가 된다는 생각에서 출발했다.</p>
        </div>
      </section>

      {/* Feature Section 1 */}
      <section className="work-detail__section work-detail__feature work-detail__feature--tablet">
        <div className="work-detail__feature-image-wrapper">
          <img 
            src={heoJiHoonWork1_02} 
            alt="제품의 본질에 집중"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, heoJiHoonWork1_02, work.id, 'feature-1')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title">제품의 본질에 집중</h4>
          <p>나는 마우스의 다양한 기능을 소개하기보다, 그것이 우리에게 어떤 의미를 지니는지 고민하고자 했다. 창의적인 작업을 하는 나와 같은 사람들에게 마우스는 무엇일까? 손의 연장으로서, 상상을 현실로 이끌어내는 창조의 시작점이다.</p>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="work-detail__section work-detail__cards work-detail__cards--tablet">
        <div className="work-detail__card">
          <div className="work-detail__card-image-wrapper">
            <img 
              src={heoJiHoonWork1_03} 
              alt="바위 실루엣"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, heoJiHoonWork1_03, work.id, 'card-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">바위 실루엣</h5>
            <p>마우스의 형태를 연상시키는 바위. 그 윤곽을 따라 상상의 세계가 폭발하듯 펼쳐진다.</p>
          </div>
        </div>
        <div className="work-detail__card">
          <div className="work-detail__card-image-wrapper">
            <img 
              src={heoJiHoonWork1_04} 
              alt="펼쳐지는 상상의 세계"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, heoJiHoonWork1_04, work.id, 'card-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">펼쳐지는 상상의 세계</h5>
            <p>이어지는 수많은 상상의 세계. 폭발하는 상상력과 함께 벅찬 감정이 밀려온다.</p>
          </div>
        </div>
        <div className="work-detail__card">
          <div className="work-detail__card-image-wrapper">
            <img 
              src={heoJiHoonWork1_05} 
              alt="창작의 도구, 마우스"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, heoJiHoonWork1_05, work.id, 'card-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">창작의 도구, 마우스</h5>
            <p>무한한 상상의 세계가 현실의 마우스로 모인다. 모든 상상을 현실로 이끄는 창작의 도구가 바로 마우스임을 전한다.</p>
          </div>
        </div>
      </section>

      {/* Feature Section 2 */}
      <section className="work-detail__section work-detail__feature work-detail__feature--tablet">
        <div className="work-detail__feature-image-wrapper">
          <img 
            src={heoJiHoonWork1_06} 
            alt="생성형 AI 활용"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, heoJiHoonWork1_06, work.id, 'feature-2')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title work-detail__feature-title--large">생성형 AI 활용</h4>
          <p>이번 작업에서는 생성형 AI를 실험적으로 활용하여 영상 제작의 효율성을 높였다. 반복적인 테스트를 통해 장면과 연출 등을 빠르게 구상할 수 있었으며, 특히 바다와 같은 자연을 사실적으로 표현할 수 있었다. 프롬프트로 이미지 생성, 이미지로 영상 생성이 기본적인 작업 과정이다.</p>
        </div>
      </section>

      {/* Feature Rows Section */}
      <section className="work-detail__section work-detail__feature-rows work-detail__feature-rows--tablet">
        <div className="work-detail__feature-row">
          <div className="work-detail__feature-row-content">
            <h4 className="work-detail__feature-row-title">RUNWAY와<br />Cinema 4D의 만남</h4>
            <p>의도한대로 장면을 구현하기 위해 먼저 C4D에서 카메라 움직임과 구도를 간단하게 잡고 렌더하였으며, 이를 Runway로 불러왔다.</p>
          </div>
          <div className="work-detail__feature-row-image-wrapper">
            <img 
              src={heoJiHoonWork1_07} 
              alt="RUNWAY와 Cinema 4D의 만남"
              className="work-detail__feature-row-image"
              onError={(e) => handleImageError(e, heoJiHoonWork1_07, work.id, 'row-1')}
              loading="lazy"
            />
          </div>
        </div>
        <div className="work-detail__feature-row">
          <div className="work-detail__feature-row-image-wrapper">
            <img 
              src={heoJiHoonWork1_08} 
              alt="Stylize + 4K Upscale"
              className="work-detail__feature-row-image"
              onError={(e) => handleImageError(e, heoJiHoonWork1_08, work.id, 'row-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-row-content">
            <h4 className="work-detail__feature-row-title">Stylize + 4K Upscale</h4>
            <p>Runway로 불러온 C4D의 뷰포트 영상을 Stylize 기능을 이용해 원하는 질감으로 변환하였으며, 변환된 영상은 4K로 업스케일링을 진행했다.</p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="work-detail__section work-detail__gallery work-detail__gallery--tablet">
        <div className="work-detail__gallery-header">
          <h3 className="work-detail__gallery-title">다양한 프롬프트</h3>
          <p className="work-detail__gallery-description">동일한 과정을 반복하며 다양한 프롬프트를 입력하여 수많은 장면들을 생성할 수 있었다. AI는 단번에 원하는 결과물을 얻기가 어려운데, 지속적인 연구와 시행착오를 통해 AI를 또 하나의 창작 도구로 받아들이게 된 의미있는 경험이었다.</p>
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
      <section className="work-detail__section work-detail__cards work-detail__cards--tablet work-detail__cards--final">
        <div className="work-detail__card">
          <div className="work-detail__card-image-wrapper">
            <img 
              src={heoJiHoonWork1_16} 
              alt="부드러운 무한 스크롤"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, heoJiHoonWork1_16, work.id, 'card-4')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">부드러운 무한 스크롤</h5>
            <p>부드럽게 회전하는 스크롤 휠 강조</p>
          </div>
        </div>
        <div className="work-detail__card">
          <div className="work-detail__card-image-wrapper">
            <img 
              src={heoJiHoonWork1_17} 
              alt="인체공학적 비대칭 디자인"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, heoJiHoonWork1_17, work.id, 'card-5')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">인체공학적 비대칭 디자인</h5>
            <p>인체공학적 디자인 강조</p>
          </div>
        </div>
        <div className="work-detail__card">
          <div className="work-detail__card-image-wrapper">
            <img 
              src={heoJiHoonWork1_18} 
              alt="가로 스크롤 휠"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, heoJiHoonWork1_18, work.id, 'card-6')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">가로 스크롤 휠</h5>
            <p>부드럽게 회전하는 가로 휠 강조</p>
          </div>
        </div>
      </section>

      {/* Final Feature Section */}
      <section className="work-detail__section work-detail__feature work-detail__feature--tablet work-detail__feature--final">
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
          <p>제목 &lt;Master your Imagination&gt;에는 이 마우스를 통해 상상력을 주도하고, 그것을 현실로 실현하라는 메시지를 담았다.</p>
        </div>
      </section>
    </div>
  );
};

export default HeoJihoonMasterImaginationTablet;
