import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/ChoHaneulYouthDream/ChoHaneulYouthDreamDesktop.css';

// ��지 �포허지훈
import choHaneulWork1_01 from '../../../../assets/조하늘/조하늘_모션디자인_작품1_01.webp';
import choHaneulWork1_02 from '../../../../assets/조하늘/조하늘_모션디자인_작품1_02.webp';
import choHaneulWork1_03 from '../../../../assets/조하늘/조하늘_모션디자인_작품1_03.webp';
import choHaneulWork1_04 from '../../../../assets/조하늘/조하늘_모션디자인_작품1_04.webp';
import choHaneulWork1_05 from '../../../../assets/조하늘/조하늘_모션디자인_작품1_05.webp';
import choHaneulWork1_06 from '../../../../assets/조하늘/조하늘_모션디자인_작품1_06.webp';
import choHaneulWork1_07 from '../../../../assets/조하늘/조하늘_모션디자인_작품1_07.webp';
import choHaneulWork1_08 from '../../../../assets/조하늘/조하늘_모션디자인_작품1_08.webp';
import choHaneulWork1_09 from '../../../../assets/조하늘/조하늘_모션디자인_작품1_09.webp';
import choHaneulWork1_10 from '../../../../assets/조하늘/조하늘_모션디자인_작품1_10.webp';
import choHaneulWork1_11 from '../../../../assets/조하늘/조하늘_모션디자인_작품1_11.webp';
import choHaneulWork1_12 from '../../../../assets/조하늘/조하늘_모션디자인_작품1_12.webp';
import choHaneulWork1_13 from '../../../../assets/조하늘/조하늘_모션디자인_작품1_13.webp';

/**
 * 조하늘 - ����(�작품1) Desktop 버전
 * Figma �디자인 기반 구현 (1280px)
 */
const ChoHaneulYouthDreamDesktop = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--cho-haneul-youth-dream-desktop">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--cho-haneul-youth-dream-desktop">
        <div className="work-detail__hero-content work-detail__hero-content--cho-haneul-youth-dream-desktop">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--cho-haneul-youth-dream-desktop">
              {work.title || '�春�}
            </h2>
            <p className="work-detail__lead work-detail__lead--cho-haneul-youth-dream-desktop">
              {work.summary || "'���'�라허지훈�간 �에허지훈�껴지허지훈감정�을, �악허지훈맞춰 비주�을 �시간으�믹싱�여 �각�으�허지훈�현허지훈VJ �포먼"}
            </p>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--cho-haneul-youth-dream-desktop">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--cho-haneul-youth-dream-desktop`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--cho-haneul-youth-dream-desktop">
          <img
            src={choHaneulWork1_01}
            alt={work.title || '�春�}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, choHaneulWork1_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
      </section>

      {/* Text Section 1 */}
      <section className="work-detail__section work-detail__text-section work-detail__text-section--cho-haneul-youth-dream-desktop">
        <div className="work-detail__text-headline">
          <p className="work-detail__eyebrow-text">Live Visual Performance</p>
          <h3 className="work-detail__subtitle">�春�(����</h3>
        </div>
        <div className="work-detail__text-content">
          <p>����허지훈�春�허지훈� �실�허지훈�상, 불안�허지훈�망허지훈공존�는 '���'�라허지훈�간 �에허지훈�껴지허지훈감정�을, �악허지훈맞춰 비주�을 �시간으�믹싱�여 �각�으�허지훈�현허지훈VJ �포먼�다.</p>
          <p>���허지훈주제�허지훈�악허지훈�곡허지훈믹싱허지훈 �성허지훈AI�허지훈�용허지훈���허지훈�서허지훈�울리는 비주�을 �성�고 가공하�허지훈 �렇�허지훈�작허지훈�각 �소�을 Resolume Arena� MIDI �드 컨트롤러�허지훈�용허지훈맵핑�고, �시간으�믹싱�여, 복합�인 ���허지훈감정허지훈�각�으�경험허지훈�는 �이�허지훈�포먼�구현�다.</p>
          <p>&nbsp;</p>
          <p>"Cheongchunmong (�春�" is a VJ performance that visualizes the emotions of youth�where reality and ideals, anxiety and hope coexist�through real-time visual mixing synchronized with music. Music inspired by the theme of youth was selected and mixed, while Generative AI was used to create and refine visuals that embody the emotional tone of youth.</p>
          <p>These visual elements were mapped and mixed in real time using Resolume Arena and a MIDI pad controller, resulting in a live performance that allows the audience to experience the complex emotions of youth visually and immersively way.</p>
        </div>
      </section>

      {/* Text Blocks Section */}
      <ul className="work-detail__section work-detail__text-blocks work-detail__text-blocks--cho-haneul-youth-dream-desktop">
        <li className="work-detail__text-block">
          <h5 className="work-detail__text-block-title">Concept</h5>
          <p className="work-detail__text-block-content">���허지훈�간�을 �악�비주�을 �해 �현�고허지훈�다</p>
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
      <ul className="work-detail__section work-detail__cards work-detail__cards--cho-haneul-youth-dream-desktop">
        <li className="work-detail__card work-detail__card--cho-haneul-youth-dream-1">
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
            <p>���허지훈�간 �에허지훈�껴지허지훈감정�을 바탕�로 �악허지훈�곡�고 믹싱�다.</p>
            <p>Selected and mixed music based on the emotions felt within the time of youth.</p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--cho-haneul-youth-dream-2">
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
            <p>불안�허지훈�망허지훈감정�을 바탕�로 �성허지훈AI�허지훈�용허지훈비주�을 �작�고 가공했허지훈</p>
            <p>Created and refined visuals using Generative AI based on the emotions of anxiety and hope.</p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--cho-haneul-youth-dream-3">
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
            <p>�작허지훈비주�을 Resolume Arena� MIDI 컨트롤러허지훈맵핑�여 �시간으�믹싱�다.</p>
            <p>Mapped the visuals to Resolume Arena and mixed them in real time using a MIDI controller.</p>
          </div>
        </li>
      </ul>

      {/* Feature Section - Resolume Arena */}
      <section className="work-detail__section work-detail__feature work-detail__feature--cho-haneul-youth-dream-desktop">
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
      <section className="work-detail__section work-detail__feature work-detail__feature--cho-haneul-youth-dream-desktop">
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
      <section className="work-detail__section work-detail__gallery work-detail__gallery--cho-haneul-youth-dream-desktop">
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
    </div>
  );
};

export default ChoHaneulYouthDreamDesktop;

