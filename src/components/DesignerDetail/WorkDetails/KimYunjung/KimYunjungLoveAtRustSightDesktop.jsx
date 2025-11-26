import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/KimYunjungLoveAtRustSight/KimYunjungLoveAtRustSightDesktop.css';

// 이미지 임포트
import kimYunjungWork1_01 from '../../../../assets/김윤정/김윤정_Video_작품1_01.webp';
import kimYunjungWork1_03 from '../../../../assets/김윤정/김윤정_Video_작품1_03.webp';
import kimYunjungWork1_04 from '../../../../assets/김윤정/김윤정_Video_작품1_04.webp';
import kimYunjungWork1_05 from '../../../../assets/김윤정/김윤정_Video_작품1_05.webp';
import kimYunjungWork1_06 from '../../../../assets/김윤정/김윤정_Video_작품1_06.webp';
// Frame37 이미지가 없으면 작품1_02를 사용
import frame37 from '../../../../assets/김윤정/김윤정_Video_작품1_02.webp';

/**
 * 김윤정 - Love at Rust Sight Desktop 버전
 * Figma 디자인 기반 구현 (1280px)
 */
const KimYunjungLoveAtRustSightDesktop = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--kim-yunjung-love-at-rust-sight-desktop">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--kim-yunjung-love-at-rust-sight-desktop">
        <div className="work-detail__hero-content work-detail__hero-content--kim-yunjung-love-at-rust-sight-desktop">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--kim-yunjung-love-at-rust-sight-desktop">Love at Rust Sight</h2>
            <div className="work-detail__lead work-detail__lead--kim-yunjung-love-at-rust-sight-desktop">
              <p>함께했던 가족과 헤어지고 거리를 청소하는 미니봇. 미니봇은 자신을 가족으로 받아줄 '천사'를</p>
              <p>찾아다닌다.</p>
            </div>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--kim-yunjung-love-at-rust-sight-desktop">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--kim-yunjung-love-at-rust-sight-desktop`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--kim-yunjung-love-at-rust-sight-desktop">
          <img
            src={kimYunjungWork1_01}
            alt={work.title || 'Love at Rust Sight'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, kimYunjungWork1_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
      </section>

      {/* Feature Section - First Image with Description */}
      <section className="work-detail__section work-detail__feature work-detail__feature--kim-yunjung-love-at-rust-sight-desktop">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--kim-yunjung-love-at-rust-sight-desktop">
          <img
            src={frame37}
            alt="Love at Rust Sight"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, frame37, work.id, 'feature-1')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text work-detail__feature-text--kim-yunjung-love-at-rust-sight-desktop">
          <p>
            &lt;Love at Rust Sight&gt;는 로봇과 천사가 등장하는 이야기로, 가족에게 버림받은
          </p>
          <p>청소로봇이 우연히 천사를 만난 후 자신을 가족으로 맞이해주길 바라며 죽으려한다는 내용의 2D 애니메이션이다.</p>
          <p>&nbsp;</p>
          <p>함께했던 가족과 헤어지고 거리를 청소하는 미니봇. 미니봇은 자신을 가족으로 받아줄 '천사'를 찾아다닌다. </p>
        </div>
      </section>

      {/* Feature Section - Second Image with Description */}
      <section className="work-detail__section work-detail__feature work-detail__feature--kim-yunjung-love-at-rust-sight-desktop">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--kim-yunjung-love-at-rust-sight-desktop">
          <img
            src={kimYunjungWork1_03}
            alt="Love at Rust Sight"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, kimYunjungWork1_03, work.id, 'feature-2')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text work-detail__feature-text--kim-yunjung-love-at-rust-sight-desktop">
          <p>영상이 시작되는 초반부는 한색, 후반부로 진행될 수록 난색으로 분위기를 전환시켜 희망적이고 따뜻한 전개를 표현하고자 했다.</p>
        </div>
      </section>

      {/* Feature Section - Image Only */}
      <section className="work-detail__section work-detail__feature work-detail__feature--kim-yunjung-love-at-rust-sight-desktop work-detail__feature--image-only">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--kim-yunjung-love-at-rust-sight-desktop">
          <img
            src={kimYunjungWork1_04}
            alt="Love at Rust Sight"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, kimYunjungWork1_04, work.id, 'feature-3')}
            loading="lazy"
          />
        </div>
      </section>

      {/* Feature Section - Image Only (Centered) */}
      <section className="work-detail__section work-detail__feature work-detail__feature--kim-yunjung-love-at-rust-sight-desktop work-detail__feature--image-only work-detail__feature--centered">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--kim-yunjung-love-at-rust-sight-desktop">
          <img
            src={kimYunjungWork1_05}
            alt="Love at Rust Sight"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, kimYunjungWork1_05, work.id, 'feature-4')}
            loading="lazy"
          />
        </div>
      </section>

      {/* Feature Section - Image Only */}
      <section className="work-detail__section work-detail__feature work-detail__feature--kim-yunjung-love-at-rust-sight-desktop work-detail__feature--image-only">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--kim-yunjung-love-at-rust-sight-desktop">
          <img
            src={kimYunjungWork1_06}
            alt="Love at Rust Sight"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, kimYunjungWork1_06, work.id, 'feature-5')}
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
};

export default KimYunjungLoveAtRustSightDesktop;
