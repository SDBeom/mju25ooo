import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/DoTienHongSeeTinhIsometic/DoTienHongSeeTinhIsometicTablet.css';

// 이미지 임포트
import doTienHongWork1_01 from '../../../../assets/도티안홍/dotianhong_videocontent_work1_01.webp';
import doTienHongWork1_02 from '../../../../assets/도티안홍/dotianhong_videocontent_work1_02.webp';
import doTienHongWork1_03 from '../../../../assets/도티안홍/dotianhong_videocontent_work1_03.webp';
import doTienHongWork1_04 from '../../../../assets/도티안홍/dotianhong_videocontent_work1_04.webp';
import doTienHongWork1_05 from '../../../../assets/도티안홍/dotianhong_videocontent_work1_05.webp';
import doTienHongWork1_06 from '../../../../assets/도티안홍/dotianhong_videocontent_work1_06.webp';

/**
 * 도티안홍 - "SEE TINH" ISOMETIC Tablet 버전
 * Figma 디자인 기반 구현 (800px)
 */
const DoTienHongSeeTinhIsometicTablet = ({ work, designer, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--do-tien-hong-see-tinh-isometic-tablet">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--do-tien-hong-see-tinh-isometic-tablet">
        <div className="work-detail__hero-content work-detail__hero-content--do-tien-hong-see-tinh-isometic-tablet">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--do-tien-hong-see-tinh-isometic-tablet">"SEE TINH" ISOMETIC</h2>
            <p className="work-detail__lead work-detail__lead--do-tien-hong-see-tinh-isometic-tablet">
              성장하는 3D 캐릭터 시장을 겨냥해 음악과 엔터테인먼트 요소를 결합했습니다. 2D·3D 디자이너로서의 비전을 담아, 히트곡 'See Tinh'을 모티브로 경쾌한 3D 아이소메트릭 애니메이션을 제작했습니다.
            </p>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--do-tien-hong-see-tinh-isometic-tablet">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--do-tien-hong-see-tinh-isometic-tablet`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--do-tien-hong-see-tinh-isometic-tablet">
          <img
            src={doTienHongWork1_01}
            alt={work.title || '"SEE TINH" ISOMETIC'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, doTienHongWork1_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
      </section>

      {/* Marquee */}
      <section className="work-detail__section work-detail__marquee work-detail__marquee--do-tien-hong-see-tinh-isometic-tablet">
        <h3 className="work-detail__marquee-text">INTERIOR AND CHARACTER DESIGN</h3>
      </section>

      {/* Feature Section 1 */}
      <section className="work-detail__section work-detail__feature work-detail__feature--do-tien-hong-see-tinh-isometic-tablet">
        <div className="work-detail__feature-image-wrapper">
          <img
            src={doTienHongWork1_02}
            alt="Feature 1"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, doTienHongWork1_02, work.id, 'feature-1')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <p className="work-detail__feature-description">
            {`See Tinh 노래의 배경에 맞게 노란색과 녹색 톤의 아이소메틱 방을 만들기 위해 각 물체를 모델링한다.
노래의 뮤직비디오 속 실제 캐릭터의 패턴에 따라 캐릭터를 디자인한다.
그런 다음 아이소메틱 애니메이션을 만들기 위해 움직임을 만든다.`}
          </p>
        </div>
      </section>

      {/* Feature Section 2 */}
      <section className="work-detail__section work-detail__feature work-detail__feature--do-tien-hong-see-tinh-isometic-tablet">
        <div className="work-detail__feature-image-wrapper">
          <img
            src={doTienHongWork1_03}
            alt="Feature 2"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, doTienHongWork1_03, work.id, 'feature-2')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <p className="work-detail__feature-description">모델링 후 다양한 각도로 카메라를 제작한다.</p>
        </div>
      </section>

      {/* Feature Section 3 (Image only) */}
      <section className="work-detail__section work-detail__feature work-detail__feature-image-only work-detail__feature-image-only--do-tien-hong-see-tinh-isometic-tablet">
        <div className="work-detail__feature-image-wrapper">
          <img
            src={doTienHongWork1_04}
            alt="Feature 3"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, doTienHongWork1_04, work.id, 'feature-3')}
            loading="lazy"
          />
        </div>
      </section>

      {/* Feature Section 4 (Centered) */}
      <section className="work-detail__section work-detail__feature work-detail__feature-centered work-detail__feature-centered--do-tien-hong-see-tinh-isometic-tablet">
        <div className="work-detail__feature-image-wrapper">
          <img
            src={doTienHongWork1_05}
            alt="Feature 4"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, doTienHongWork1_05, work.id, 'feature-4')}
            loading="lazy"
          />
        </div>
      </section>

      {/* Feature Section 5 (Centered) */}
      <section className="work-detail__section work-detail__feature work-detail__feature-centered work-detail__feature-centered--do-tien-hong-see-tinh-isometic-tablet">
        <div className="work-detail__feature-image-wrapper">
          <img
            src={doTienHongWork1_06}
            alt="Feature 5"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, doTienHongWork1_06, work.id, 'feature-5')}
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
};

export default DoTienHongSeeTinhIsometicTablet;

