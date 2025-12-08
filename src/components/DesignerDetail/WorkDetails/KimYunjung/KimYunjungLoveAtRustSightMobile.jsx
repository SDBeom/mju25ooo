import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/KimYunjungLoveAtRustSight/KimYunjungLoveAtRustSightMobile.css';

// 이미지 임포트
import kimYunjungWork1_13 from '../../../../assets/김윤정/kimyunjung_video_work1_01.webp'; // 임시로 01 사용
import frame37 from '../../../../assets/김윤정/kimyunjung_video_work1_02.webp'; // Frame37
import kimYunjungWork1_15 from '../../../../assets/김윤정/kimyunjung_video_work1_03.webp'; // 임시로 03 사용
import kimYunjungWork1_16 from '../../../../assets/김윤정/kimyunjung_video_work1_04.webp'; // 임시로 04 사용
import kimYunjungWork1_17 from '../../../../assets/김윤정/kimyunjung_video_work1_05.webp'; // 임시로 05 사용
import kimYunjungWork1_18 from '../../../../assets/김윤정/kimyunjung_video_work1_06.webp'; // 임시로 06 사용

/**
 * 김윤정 - Love at Rust Sight Mobile 버전
 * Figma 디자인 기반 구현 (375px)
 */
const KimYunjungLoveAtRustSightMobile = ({ work, designer, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--kim-yunjung-love-at-rust-sight-mobile">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--kim-yunjung-love-at-rust-sight-mobile">
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--kim-yunjung-love-at-rust-sight-mobile">
          <img
            src={kimYunjungWork1_13}
            alt={work.title || 'Love at Rust Sight'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, kimYunjungWork1_13, work.id, 'hero')}
            loading="eager"
          />
        </div>
        <div className="work-detail__hero-content work-detail__hero-content--kim-yunjung-love-at-rust-sight-mobile">
          <div className="work-detail__text-group work-detail__text-group--kim-yunjung-love-at-rust-sight-mobile">
            <h2 className="work-detail__title work-detail__title--kim-yunjung-love-at-rust-sight-mobile">Love at Rust Sight</h2>
            <div className="work-detail__lead work-detail__lead--kim-yunjung-love-at-rust-sight-mobile">
              <p>함께했던 가족과 헤어지고 거리를 청소하는 미니봇. 미니봇은 자신을 가족으로 받아줄 '천사'를 찾아다닌다.</p>
            </div>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--kim-yunjung-love-at-rust-sight-mobile">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--kim-yunjung-love-at-rust-sight-mobile`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Feature Section - First Image with Description */}
      <section className="work-detail__section work-detail__feature work-detail__feature--kim-yunjung-love-at-rust-sight-mobile">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--kim-yunjung-love-at-rust-sight-mobile">
          <img
            src={frame37}
            alt="Love at Rust Sight"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, frame37, work.id, 'feature-1')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text work-detail__feature-text--kim-yunjung-love-at-rust-sight-mobile">
          <p>
            &lt;Love at Rust Sight&gt;는 로봇과
          </p>
          <p>천사가 등장하는 이야기로, 가족에게</p>
          <p>버림받은 청소로봇이 우연히 천사를</p>
          <p>만난 후 자신을 가족으로 맞이해주길</p>
          <p>바라며 죽으려한다는 내용의 2D</p>
          <p>애니메이션이다.</p>
          <p>&nbsp;</p>
          <p>함께했던 가족과 헤어지고 거리를</p>
          <p>청소하는 미니봇. 미니봇은 자신을</p>
          <p>가족으로 받아줄 '천사'를 찾아다닌다.</p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
        </div>
      </section>

      {/* Feature Section - Second Image with Description */}
      <section className="work-detail__section work-detail__feature work-detail__feature--kim-yunjung-love-at-rust-sight-mobile">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--kim-yunjung-love-at-rust-sight-mobile">
          <img
            src={kimYunjungWork1_15}
            alt="Love at Rust Sight"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, kimYunjungWork1_15, work.id, 'feature-2')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text work-detail__feature-text--kim-yunjung-love-at-rust-sight-mobile">
          <p>영상이 시작되는 초반부는 한색, 후반부로</p>
          <p>진행될 수록 난색으로 분위기를 전환시켜</p>
          <p>희망적이고 따뜻한 전개를 표현하고자 했다.</p>
        </div>
      </section>

      {/* Feature Section - Image Only */}
      <section className="work-detail__section work-detail__feature work-detail__feature--kim-yunjung-love-at-rust-sight-mobile work-detail__feature--image-only">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--kim-yunjung-love-at-rust-sight-mobile">
          <img
            src={kimYunjungWork1_16}
            alt="Love at Rust Sight"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, kimYunjungWork1_16, work.id, 'feature-3')}
            loading="lazy"
          />
        </div>
      </section>

      {/* Feature Section - Image Only */}
      <section className="work-detail__section work-detail__feature work-detail__feature--kim-yunjung-love-at-rust-sight-mobile work-detail__feature--image-only">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--kim-yunjung-love-at-rust-sight-mobile">
          <img
            src={kimYunjungWork1_17}
            alt="Love at Rust Sight"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, kimYunjungWork1_17, work.id, 'feature-4')}
            loading="lazy"
          />
        </div>
      </section>

      {/* Feature Section - Image Only */}
      <section className="work-detail__section work-detail__feature work-detail__feature--kim-yunjung-love-at-rust-sight-mobile work-detail__feature--image-only">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--kim-yunjung-love-at-rust-sight-mobile">
          <img
            src={kimYunjungWork1_18}
            alt="Love at Rust Sight"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, kimYunjungWork1_18, work.id, 'feature-5')}
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
};

export default KimYunjungLoveAtRustSightMobile;
