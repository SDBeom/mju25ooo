import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/ChoHaneulYouthDream/ChoHaneulYouthDreamTablet.css';

// 이미지 임포트
import choHaneulWork1_01 from '../../../../assets/조하늘/johaneul_motiondesign_work1_01.webp';
import choHaneulWork1_02 from '../../../../assets/조하늘/johaneul_motiondesign_work1_02.webp';
import choHaneulWork1_03 from '../../../../assets/조하늘/johaneul_motiondesign_work1_03.webp';
import choHaneulWork1_04 from '../../../../assets/조하늘/johaneul_motiondesign_work1_04.webp';
import choHaneulWork1_05 from '../../../../assets/조하늘/johaneul_motiondesign_work1_05.webp';
import choHaneulWork1_06 from '../../../../assets/조하늘/johaneul_motiondesign_work1_06.webp';
import choHaneulWork1_07 from '../../../../assets/조하늘/johaneul_motiondesign_work1_07.webp';
import choHaneulWork1_08 from '../../../../assets/조하늘/johaneul_motiondesign_work1_08.webp';
import choHaneulWork1_09 from '../../../../assets/조하늘/johaneul_motiondesign_work1_09.webp';
import choHaneulWork1_10 from '../../../../assets/조하늘/johaneul_motiondesign_work1_10.webp';
import choHaneulWork1_11 from '../../../../assets/조하늘/johaneul_motiondesign_work1_11.webp';
import choHaneulWork1_12 from '../../../../assets/조하늘/johaneul_motiondesign_work1_12.webp';
import choHaneulWork1_13 from '../../../../assets/조하늘/johaneul_motiondesign_work1_13.webp';

/**
 * 조하늘 - 청춘몽(작품1) Tablet 버전
 * Figma 디자인 기반 구현 (800px)
 */
const ChoHaneulYouthDreamTablet = ({ work, designer, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--cho-haneul-youth-dream-tablet">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--cho-haneul-youth-dream-tablet">
        <div className="work-detail__hero-content work-detail__hero-content--cho-haneul-youth-dream-tablet">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--cho-haneul-youth-dream-tablet">
              青春夢
            </h2>
            <div className="work-detail__lead work-detail__lead--cho-haneul-youth-dream-tablet">
              <p>'청춘'이라는 시간 속에서 느껴지는 감정들을, 음악에 맞춰 비주얼을 실시간으로 믹싱하여 시각적으로 표현한 VJ 퍼포먼스</p>
            </div>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--cho-haneul-youth-dream-tablet">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--cho-haneul-youth-dream-tablet`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--cho-haneul-youth-dream-tablet">
          <img
            src={choHaneulWork1_01}
            alt={work.title || '청춘몽'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, choHaneulWork1_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
      </section>

      {/* Text Section 1 */}
      <section className="work-detail__section work-detail__text-section work-detail__text-section--cho-haneul-youth-dream-tablet">
        <div className="work-detail__text-headline">
          <p className="work-detail__eyebrow-text">Live Visual Performance</p>
          <h3 className="work-detail__subtitle">青春夢 (청춘몽)</h3>
        </div>
        <div className="work-detail__text-content">
          <p>
            {`청춘몽(靑春夢)은 현실과 이상, 불안과 희망이 공존하는 '청춘'이라는 시간 속에서 느껴지는 감정들을, 음악에 맞춰 비주얼을 실시간으로 믹싱하여 시각적으로 표현한 VJ 퍼포먼스이다.
청춘을 주제로 음악을 선곡해 믹싱한 뒤, 생성형 AI를 활용해 청춘의 정서에 어울리는 비주얼을 생성하고 가공하였다. 이렇게 제작한 시각 요소들을 Resolume Arena와 MIDI 패드 컨트롤러를 활용해 맵핑하고, 실시간으로 믹싱하여, 복합적인 청춘의 감정을 시각적으로 경험할 수 있는 라이브 퍼포먼스로 구현했다.

"Cheongchunmong (靑春夢)" is a VJ performance that visualizes the emotions of youth—where reality and ideals, anxiety and hope coexist—through real-time visual mixing synchronized with music. Music inspired by the theme of youth was selected and mixed, while Generative AI was used to create and refine visuals that embody the emotional tone of youth.
These visual elements were mapped and mixed in real time using Resolume Arena and a MIDI pad controller, resulting in a live performance that allows the audience to experience the complex emotions of youth visually and immersively way.`}
          </p>
        </div>
      </section>

      {/* Text Blocks Section */}
      <ul className="work-detail__section work-detail__text-blocks work-detail__text-blocks--cho-haneul-youth-dream-tablet">
        <li className="work-detail__text-block">
          <h5 className="work-detail__text-block-title">Concept</h5>
          <p className="work-detail__text-block-content">청춘의 순간들을 음악과 비주얼을 통해 표현하고자 했다</p>
        </li>
        <li className="work-detail__text-block">
          <h5 className="work-detail__text-block-title">Genre</h5>
          <p className="work-detail__text-block-content">Media Art · VJ Performance</p>
        </li>
        <li className="work-detail__text-block">
          <h5 className="work-detail__text-block-title">Tools</h5>
          <p className="work-detail__text-block-content">Midjourney · Adobe Premiere Pro · Adobe After Effects · Resolume Arena</p>
        </li>
      </ul>

      {/* Feature Cards Section */}
      <ul className="work-detail__section work-detail__cards work-detail__cards--cho-haneul-youth-dream-tablet">
        <li className="work-detail__card work-detail__card--cho-haneul-youth-dream-tablet-1">
          <div className="work-detail__card-image-wrapper">
            <img
              src={choHaneulWork1_02}
              alt="Music"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, choHaneulWork1_02, work.id, 'card-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">Music</h5>
            <p>
              {`청춘의 시간 속에서 느껴지는 감정들을 바탕으로 음악을 선곡하고 믹싱했다.
Selected and mixed music based on the emotions felt within the time of youth.`}
            </p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--cho-haneul-youth-dream-tablet-2">
          <div className="work-detail__card-image-wrapper">
            <img
              src={choHaneulWork1_03}
              alt="Generative AI"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, choHaneulWork1_03, work.id, 'card-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">Generative AI</h5>
            <p>
              {`불안과 희망의 감정들을 바탕으로 생성형 AI를 활용해 비주얼을 제작하고 가공했다.
Created and refined visuals using Generative AI based on the emotions of anxiety and hope.`}
            </p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--cho-haneul-youth-dream-tablet-3">
          <div className="work-detail__card-image-wrapper">
            <img
              src={choHaneulWork1_04}
              alt="Visual performance"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, choHaneulWork1_04, work.id, 'card-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">Visual performance</h5>
            <p>
              {`제작된 비주얼을 Resolume Arena와 MIDI 컨트롤러에 맵핑하여 실시간으로 믹싱했다.
Mapped the visuals to Resolume Arena and mixed them in real time using a MIDI controller.`}
            </p>
          </div>
        </li>
      </ul>

      {/* Feature Section - Resolume Arena */}
      <section className="work-detail__section work-detail__feature work-detail__feature--cho-haneul-youth-dream-tablet">
        <div className="work-detail__feature-header">
          <h4 className="work-detail__feature-title">Resolume Arena</h4>
        </div>
        <div className="work-detail__feature-image-wrapper">
          <img
            src={choHaneulWork1_05}
            alt="Resolume Arena"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, choHaneulWork1_05, work.id, 'resolume-arena')}
            loading="lazy"
          />
        </div>
      </section>

      {/* Feature Section - MIDI Controller */}
      <section className="work-detail__section work-detail__feature work-detail__feature--cho-haneul-youth-dream-tablet">
        <div className="work-detail__feature-header">
          <h4 className="work-detail__feature-title">MIDI Controller</h4>
        </div>
        <div className="work-detail__feature-image-wrapper">
          <img
            src={choHaneulWork1_06}
            alt="MIDI Controller"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, choHaneulWork1_06, work.id, 'midi-controller')}
            loading="lazy"
          />
        </div>
      </section>

      {/* Gallery Section */}
      <section className="work-detail__section work-detail__gallery work-detail__gallery--cho-haneul-youth-dream-tablet">
        <div className="work-detail__gallery-header">
          <h3 className="work-detail__gallery-title">Visual Highlights</h3>
        </div>
        <div className="work-detail__gallery-grid">
          <div className="work-detail__gallery-column">
            <div className="work-detail__gallery-item">
              <img
                src={choHaneulWork1_07}
                alt="Visual Highlight 1"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, choHaneulWork1_07, work.id, 'gallery-1-1')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={choHaneulWork1_08}
                alt="Visual Highlight 2"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, choHaneulWork1_08, work.id, 'gallery-1-2')}
                loading="lazy"
              />
            </div>
          </div>
          <div className="work-detail__gallery-column">
            <div className="work-detail__gallery-item">
              <img
                src={choHaneulWork1_09}
                alt="Visual Highlight 3"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, choHaneulWork1_09, work.id, 'gallery-2-1')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={choHaneulWork1_10}
                alt="Visual Highlight 4"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, choHaneulWork1_10, work.id, 'gallery-2-2')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={choHaneulWork1_11}
                alt="Visual Highlight 5"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, choHaneulWork1_11, work.id, 'gallery-2-3')}
                loading="lazy"
              />
            </div>
          </div>
          <div className="work-detail__gallery-column">
            <div className="work-detail__gallery-item">
              <img
                src={choHaneulWork1_12}
                alt="Visual Highlight 6"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, choHaneulWork1_12, work.id, 'gallery-3-1')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={choHaneulWork1_13}
                alt="Visual Highlight 7"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, choHaneulWork1_13, work.id, 'gallery-3-2')}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="work-detail__section work-detail__marquee work-detail__marquee--cho-haneul-youth-dream-tablet">
        <p className="work-detail__marquee-text">
          Youth moves through uncertainty, always reaching for tomorrow.
        </p>
      </section>
    </div>
  );
};

export default ChoHaneulYouthDreamTablet;
