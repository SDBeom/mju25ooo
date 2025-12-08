import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/KimYunjungHelloUniverse/KimYunjungHelloUniverseDesktop.css';

// 이미지 임포트
import kimYunjungWork2_01 from '../../../../assets/김윤정/kimyunjung_video_work2_01.webp';
import kimYunjungWork2_02 from '../../../../assets/김윤정/kimyunjung_video_work2_02.webp';
import kimYunjungWork2_03 from '../../../../assets/김윤정/kimyunjung_video_work2_03.webp';
import kimYunjungWork2_04 from '../../../../assets/김윤정/kimyunjung_video_work2_04.webp';
import kimYunjungWork2_05 from '../../../../assets/김윤정/kimyunjung_video_work2_05.webp';
import kimYunjungWork2_06 from '../../../../assets/김윤정/kimyunjung_video_work2_06.webp';
import kimYunjungWork2_07 from '../../../../assets/김윤정/kimyunjung_video_work2_07.webp';
import kimYunjungWork2_08 from '../../../../assets/김윤정/kimyunjung_video_work2_08.webp';

/**
 * 김윤정 - 안녕 우주 Desktop 버전
 * Figma 디자인 기반 구현 (1280px)
 */
const KimYunjungHelloUniverseDesktop = ({ work, designer, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--kim-yunjung-hello-universe-desktop">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--kim-yunjung-hello-universe-desktop">
        <div className="work-detail__hero-content work-detail__hero-content--kim-yunjung-hello-universe-desktop">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--kim-yunjung-hello-universe-desktop">안녕 우주</h2>
            <p className="work-detail__lead work-detail__lead--kim-yunjung-hello-universe-desktop">
              주인공은 함께 우주비행사가 되기로했던 소꿉친구의 사고사 소식을 듣고 악몽을 꾸기 시작한다.
            </p>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--kim-yunjung-hello-universe-desktop">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--kim-yunjung-hello-universe-desktop`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--kim-yunjung-hello-universe-desktop">
          <img
            src={kimYunjungWork2_01}
            alt={work.title || '안녕 우주'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, kimYunjungWork2_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
      </section>

      {/* Feature Section - First Image with Description */}
      <section className="work-detail__section work-detail__feature work-detail__feature--kim-yunjung-hello-universe-desktop">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--kim-yunjung-hello-universe-desktop">
          <img
            src={kimYunjungWork2_02}
            alt="안녕 우주"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, kimYunjungWork2_02, work.id, 'feature-1')}
            loading="lazy"
          />
        </div>
        <p className="work-detail__feature-text work-detail__feature-text--kim-yunjung-hello-universe-desktop">
          &lt;안녕 우주&gt;는 주인공이 우주비행사라는 꿈을 꾸었던 소꿉친구의 사고사 소식을 듣게 된 이후 우주에 홀로 남겨진 악몽을 꾸기 시작하면서,{'\n'}그녀와의 지난 추억을 회상한다는 내용의 그림책이다.
        </p>
      </section>

      {/* Feature Bento Cards */}
      <ul className="work-detail__section work-detail__feature-bento work-detail__feature-bento--kim-yunjung-hello-universe-desktop">
        <li className="work-detail__feature-bento-card work-detail__feature-bento-card--1">
          <div className="work-detail__feature-bento-card-image-wrapper">
            <img
              src={kimYunjungWork2_03}
              alt="안녕 우주"
              className="work-detail__feature-bento-card-image"
              onError={(e) => handleImageError(e, kimYunjungWork2_03, work.id, 'bento-1')}
              loading="lazy"
            />
          </div>
          <p className="work-detail__feature-bento-card-text">
            혼자 마음의 짐을 끌어안은 사람들에게 그 짐을 떨쳐내지 못하더라도 어렵지 않게 안고 살아갈 수 있다는 메시지를 전하고 싶었다.
          </p>
        </li>
        <li className="work-detail__feature-bento-card work-detail__feature-bento-card--2">
          <div className="work-detail__feature-bento-card-image-wrapper">
            <img
              src={kimYunjungWork2_04}
              alt="안녕 우주"
              className="work-detail__feature-bento-card-image"
              onError={(e) => handleImageError(e, kimYunjungWork2_04, work.id, 'bento-2')}
              loading="lazy"
            />
          </div>
          <p className="work-detail__feature-bento-card-text">
            친구는 즐거움을 주는 존재이기도 하지만 이따금 마음에 상처를 주기도 하는 존재다.{'\n'}가족보다 가까운 것 같으면서도 한없이 멀어질 때도 있는 '감정'들을 직접 창작한 이야기와{'\n'}일러스트로 연출하고 싶었다.{'\n'}친구와의 추억을 회상하는 중간마다 우주를 소재로 등장인물 간의 감정들을 연출하고 했다.
          </p>
        </li>
        <li className="work-detail__feature-bento-card work-detail__feature-bento-card--3">
          <div className="work-detail__feature-bento-card-image-wrapper">
            <img
              src={kimYunjungWork2_05}
              alt="안녕 우주"
              className="work-detail__feature-bento-card-image"
              onError={(e) => handleImageError(e, kimYunjungWork2_05, work.id, 'bento-3')}
              loading="lazy"
            />
          </div>
          <p className="work-detail__feature-bento-card-text">
            단순 일러스트레이션이 아닌 스토리보드를 그린다고 생각하며 그렸다. 제작하면서 이야기 구성과 연출, 드로잉 스타일을 발전시키고 싶었고, 실체로 일러스트 제작에 쓰이는 텍스처의 중요성과 그 활용성에 대한 식견을 넓힐 수 있는 작업이었다.
          </p>
        </li>
      </ul>

      {/* Feature Section - Image Only */}
      <section className="work-detail__section work-detail__feature work-detail__feature--kim-yunjung-hello-universe-desktop work-detail__feature--image-only">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--kim-yunjung-hello-universe-desktop">
          <img
            src={kimYunjungWork2_06}
            alt="안녕 우주"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, kimYunjungWork2_06, work.id, 'feature-2')}
            loading="lazy"
          />
        </div>
      </section>

      {/* Feature Section - Image Only */}
      <section className="work-detail__section work-detail__feature work-detail__feature--kim-yunjung-hello-universe-desktop work-detail__feature--image-only">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--kim-yunjung-hello-universe-desktop">
          <img
            src={kimYunjungWork2_07}
            alt="안녕 우주"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, kimYunjungWork2_07, work.id, 'feature-3')}
            loading="lazy"
          />
        </div>
      </section>

      {/* Feature Section - Image Only */}
      <section className="work-detail__section work-detail__feature work-detail__feature--kim-yunjung-hello-universe-desktop work-detail__feature--image-only">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--kim-yunjung-hello-universe-desktop">
          <img
            src={kimYunjungWork2_08}
            alt="안녕 우주"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, kimYunjungWork2_08, work.id, 'feature-4')}
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
};

export default KimYunjungHelloUniverseDesktop;
