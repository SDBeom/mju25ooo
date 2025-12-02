import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/DoTienHongSeeTinhAnimatedMv/DoTienHongSeeTinhAnimatedMvDesktop.css';

// 이미지 임포트
import doTienHongWork2_01 from '../../../../assets/도티안홍/dotianhong_videocontent_work2_01.webp';
import doTienHongWork2_02 from '../../../../assets/도티안홍/dotianhong_videocontent_work2_02.webp';
import doTienHongWork2_03 from '../../../../assets/도티안홍/dotianhong_videocontent_work2_03.webp';
import doTienHongWork2_04 from '../../../../assets/도티안홍/dotianhong_videocontent_work2_04.webp';
import doTienHongWork2_05 from '../../../../assets/도티안홍/dotianhong_videocontent_work2_05.webp';

/**
 * 도티안홍 - "SEE TINH" ANIMATED MV Desktop 버전
 * Figma 디자인 기반 구현 (1280px)
 */
const DoTienHongSeeTinhAnimatedMvDesktop = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--do-tien-hong-see-tinh-animated-mv-desktop">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--do-tien-hong-see-tinh-animated-mv-desktop">
        <div className="work-detail__hero-content work-detail__hero-content--do-tien-hong-see-tinh-animated-mv-desktop">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--do-tien-hong-see-tinh-animated-mv-desktop">"SEE TINH" ANIMATED MV</h2>
            <div className="work-detail__lead work-detail__lead--do-tien-hong-see-tinh-animated-mv-desktop">
              <p>졸업 후에 2D 3D 디자이너로 진로를 정하고 싶어 2D 애니 뮤직비디오를 주제로 졸업 프로젝트를 만든다. 2022년에 베트남뿐만 아니라 한국에서도 매우 인기 있었던 노래 "See Tinh" 에서 영감을 받아 노래를 오마주 하기로 했다.</p>
            </div>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--do-tien-hong-see-tinh-animated-mv-desktop">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--do-tien-hong-see-tinh-animated-mv-desktop`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--do-tien-hong-see-tinh-animated-mv-desktop">
          <img
            src={doTienHongWork2_01}
            alt={work.title || '"SEE TINH" ANIMATED MV'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, doTienHongWork2_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
      </section>

      {/* Marquee (empty) */}
      <section className="work-detail__section work-detail__marquee work-detail__marquee--do-tien-hong-see-tinh-animated-mv-desktop">
        {/* Empty marquee section */}
      </section>

      {/* Feature Section 1 */}
      <section className="work-detail__section work-detail__feature work-detail__feature--do-tien-hong-see-tinh-animated-mv-desktop">
        <div className="work-detail__feature-image-wrapper">
          <img
            src={doTienHongWork2_02}
            alt="Feature 1"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, doTienHongWork2_02, work.id, 'feature-1')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <div className="work-detail__feature-description">
            <p>베트남 강 서부를 배경으로 이미지를 디자인한다. 베트남 전통을 대표하는 주요 물체는 연꽃, 황새, 산강이다.</p>
            <p>주요 색상은 파란색 분홍색, 녹색은 See Tinh 뮤직비디오의 주요 색상과 유사한다.</p>
          </div>
        </div>
      </section>

      {/* Feature Section 2 */}
      <section className="work-detail__section work-detail__feature work-detail__feature--do-tien-hong-see-tinh-animated-mv-desktop">
        <div className="work-detail__feature-image-wrapper">
          <img
            src={doTienHongWork2_03}
            alt="Feature 2"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, doTienHongWork2_03, work.id, 'feature-2')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <div className="work-detail__feature-description">
            <p>캐릭터 디자인은 영화 인어공주에서 일반적인 아이디어를 얻었다.</p>
          </div>
        </div>
      </section>

      {/* Feature Section 3 (Image only) */}
      <section className="work-detail__section work-detail__feature work-detail__feature-image-only work-detail__feature-image-only--do-tien-hong-see-tinh-animated-mv-desktop">
        <div className="work-detail__feature-image-wrapper">
          <img
            src={doTienHongWork2_04}
            alt="Feature 3"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, doTienHongWork2_04, work.id, 'feature-3')}
            loading="lazy"
          />
        </div>
      </section>

      {/* Feature Section 4 (Centered) */}
      <section className="work-detail__section work-detail__feature work-detail__feature-centered work-detail__feature-centered--do-tien-hong-see-tinh-animated-mv-desktop">
        <div className="work-detail__feature-image-wrapper">
          <img
            src={doTienHongWork2_05}
            alt="Feature 4"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, doTienHongWork2_05, work.id, 'feature-4')}
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
};

export default DoTienHongSeeTinhAnimatedMvDesktop;

