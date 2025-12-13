import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/KimYunjungLoveAtRustSight/KimYunjungLoveAtRustSightTablet.css';

// 이미지 임포트
import kimYunjungWork1_07 from '../../../../assets/김윤정/kimyunjung_video_work1_01.webp'; // 임시로 01 사용
import frame37 from '../../../../assets/김윤정/kimyunjung_video_work1_02.webp'; // Frame37
import frame38 from '../../../../assets/김윤정/kimyunjung_video_work1_03.webp'; // Frame38 (임시로 03 사용)
import kimYunjungWork1_10 from '../../../../assets/김윤정/kimyunjung_video_work1_04.webp'; // 임시로 04 사용
import kimYunjungWork1_11 from '../../../../assets/김윤정/kimyunjung_video_work1_05.webp'; // 임시로 05 사용
import kimYunjungWork1_12 from '../../../../assets/김윤정/kimyunjung_video_work1_06.webp'; // 임시로 06 사용

/**
 * 김윤정 - Love at Rust Sight Tablet 버전
 * Figma 디자인 기반 구현 (800px)
 */
const KimYunjungLoveAtRustSightTablet = ({ work, designer, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--kim-yunjung-love-at-rust-sight-tablet">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--kim-yunjung-love-at-rust-sight-tablet">
        <div className="work-detail__hero-content work-detail__hero-content--kim-yunjung-love-at-rust-sight-tablet">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--kim-yunjung-love-at-rust-sight-tablet">Love at Rust Sight</h2>
            <p className="work-detail__lead work-detail__lead--kim-yunjung-love-at-rust-sight-tablet">
              {`함께했던 가족과 헤어지고 거리를 청소하는 미니봇. 미니봇은 자신을 가족으로 받아줄 '천사'를
찾아다닌다.`}
            </p>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--kim-yunjung-love-at-rust-sight-tablet">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--kim-yunjung-love-at-rust-sight-tablet`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--kim-yunjung-love-at-rust-sight-tablet">
          <img
            src={kimYunjungWork1_07}
            alt={work.title || 'Love at Rust Sight'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, kimYunjungWork1_07, work.id, 'hero')}
            loading="eager"
          />
        </div>
      </section>

      {/* YouTube Video Section */}
      <section className="work-detail__section work-detail__video-section work-detail__video-section--kim-yunjung-love-at-rust-sight-tablet">
        <div className="work-detail__video-wrapper work-detail__video-wrapper--kim-yunjung-love-at-rust-sight-tablet">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/ZwtYn7zx1h0?si=BwMUNlUZjpMR_X24&controls=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="work-detail__video-iframe work-detail__video-iframe--kim-yunjung-love-at-rust-sight-tablet"
          />
        </div>
      </section>

      {/* Feature Section - First Image with Description */}
      <section className="work-detail__section work-detail__feature work-detail__feature--kim-yunjung-love-at-rust-sight-tablet">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--kim-yunjung-love-at-rust-sight-tablet">
          <img
            src={frame37}
            alt="Love at Rust Sight"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, frame37, work.id, 'feature-1')}
            loading="lazy"
          />
        </div>
        <p className="work-detail__feature-text work-detail__feature-text--kim-yunjung-love-at-rust-sight-tablet">
          {`<Love at Rust Sight>는 로봇과 천사가 등장하는 이야기로, 가족에게 버림받은
청소로봇이 우연히 천사를 만난 후 자신을 가족으로 맞이해주길 바라며 죽으려한다는 내용의 2D 애니메이션이다.

함께했던 가족과 헤어지고 거리를 청소하는 미니봇. 미니봇은 자신을 가족으로 받아줄 '천사'를 찾아다닌다.`}
        </p>
      </section>

      {/* Feature Section - Second Image with Description */}
      <section className="work-detail__section work-detail__feature work-detail__feature--kim-yunjung-love-at-rust-sight-tablet">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--kim-yunjung-love-at-rust-sight-tablet">
          <img
            src={frame38}
            alt="Love at Rust Sight"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, frame38, work.id, 'feature-2')}
            loading="lazy"
          />
        </div>
        <p className="work-detail__feature-text work-detail__feature-text--kim-yunjung-love-at-rust-sight-tablet">
          영상이 시작되는 초반부는 한색, 후반부로 진행될 수록 난색으로 분위기를 전환시켜 희망적이고 따뜻한 전개를 표현하고자 했다.
        </p>
      </section>

      {/* Feature Section - Image Only */}
      <section className="work-detail__section work-detail__feature work-detail__feature--kim-yunjung-love-at-rust-sight-tablet work-detail__feature--image-only">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--kim-yunjung-love-at-rust-sight-tablet">
          <img
            src={kimYunjungWork1_10}
            alt="Love at Rust Sight"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, kimYunjungWork1_10, work.id, 'feature-3')}
            loading="lazy"
          />
        </div>
      </section>

      {/* Feature Section - Image Only (Centered) */}
      <section className="work-detail__section work-detail__feature work-detail__feature--kim-yunjung-love-at-rust-sight-tablet work-detail__feature--image-only work-detail__feature--centered">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--kim-yunjung-love-at-rust-sight-tablet">
          <img
            src={kimYunjungWork1_11}
            alt="Love at Rust Sight"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, kimYunjungWork1_11, work.id, 'feature-4')}
            loading="lazy"
          />
        </div>
      </section>

      {/* Feature Section - Image Only */}
      <section className="work-detail__section work-detail__feature work-detail__feature--kim-yunjung-love-at-rust-sight-tablet work-detail__feature--image-only">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--kim-yunjung-love-at-rust-sight-tablet">
          <img
            src={kimYunjungWork1_12}
            alt="Love at Rust Sight"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, kimYunjungWork1_12, work.id, 'feature-5')}
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
};

export default KimYunjungLoveAtRustSightTablet;
