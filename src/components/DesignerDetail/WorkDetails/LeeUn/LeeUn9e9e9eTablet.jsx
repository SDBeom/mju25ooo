import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/LeeUn9e9e9e/LeeUn9e9e9eTablet.css';

// 이미지 임포트
import leeunWork2_01 from '../../../../assets/이운/leeun_multimedia_work2_01.webp';
import leeunWork2_02 from '../../../../assets/이운/leeun_multimedia_work2_02.webp';
import leeunWork2_03 from '../../../../assets/이운/leeun_multimedia_work2_03.webp';
import leeunWork2_04 from '../../../../assets/이운/leeun_multimedia_work2_04.webp';
import leeunWork2_05 from '../../../../assets/이운/leeun_multimedia_work2_05.webp';
import leeunWork2_06 from '../../../../assets/이운/leeun_multimedia_work2_06.webp';
import leeunWork2_07 from '../../../../assets/이운/leeun_multimedia_work2_07.webp';
import leeunWork2_08 from '../../../../assets/이운/leeun_multimedia_work2_08.webp';
import leeunWork2_09 from '../../../../assets/이운/leeun_multimedia_work2_09.webp';
import leeunWork2_10 from '../../../../assets/이운/leeun_multimedia_work2_10.webp';
import leeunWork2_11 from '../../../../assets/이운/leeun_multimedia_work2_11.webp';
import leeunWork2_12 from '../../../../assets/이운/leeun_multimedia_work2_12.webp';
import leeunWork2_13 from '../../../../assets/이운/leeun_multimedia_work2_13.webp';

/**
 * 이운 - 9e9e9e (작품2) Tablet 버전
 * Figma 디자인 기반 구현 (800px)
 */
const LeeUn9e9e9eTablet = ({ work, designer, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--leeun-9e9e9e-tablet">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--leeun-9e9e9e-tablet">
        <div className="work-detail__hero-content work-detail__hero-content--leeun-9e9e9e-tablet">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--leeun-9e9e9e-tablet">
              9e9e9e
            </h2>
            <p className="work-detail__lead work-detail__lead--leeun-9e9e9e-tablet">
              리본과 마법소녀의 모티프로, 일상에 다정한 귀여움을 묶어주는 디자인 문구 & 액세서리 브랜드 브랜딩
            </p>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--leeun-9e9e9e-tablet">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--leeun-9e9e9e-tablet`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--leeun-9e9e9e-tablet">
          <img
            src={leeunWork2_01}
            alt={work.title || '9e9e9e'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, leeunWork2_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
      </section>

      {/* Feature Section */}
      <section className="work-detail__section work-detail__feature work-detail__feature--leeun-9e9e9e-tablet">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--leeun-9e9e9e-tablet">
          <img
            src={leeunWork2_02}
            alt="9e9e9e"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, leeunWork2_02, work.id, 'feature-1')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title">9e9e9e</h4>
          <p className="work-detail__feature-description">
            {`'9e9e9e'는 디자인 문구 & 액세서리 브랜드로, 어떤 모습이든, 어떤 상황이든, 어디에 있든 누구나 귀여워질 수 있다는 긍정적인 메세지를 전합니다.
반복되는 알파벳과 숫자로 이루어진 브랜드 이름은 리본의 형태를 닮아, 일상 속에서 자연스럽게 묶이는 귀여움의 상징이 됩니다.

'9e9e9e'는 리본과 마법소녀의 이미지를 모티프로 작은 소품이 평범한 하루에 다정한 마법으로 스며들길 바랍니다.`}
          </p>
        </div>
      </section>

      {/* Core Value Section */}
      <section className="work-detail__section work-detail__core-value work-detail__core-value--leeun-9e9e9e-tablet">
        <div className="work-detail__core-value-header">
          <h3 className="work-detail__core-value-title">Core Value</h3>
        </div>
        <ul className="work-detail__core-value-grid">
          <li className="work-detail__core-value-column work-detail__core-value-column--1">
            <div className="work-detail__core-value-card">
              <div className="work-detail__core-value-card-content">
                <div className="work-detail__core-value-author">
                  <div className="work-detail__core-value-avatar">
                    <img
                      src={leeunWork2_03}
                      alt="Cute"
                      className="work-detail__core-value-avatar-image"
                      onError={(e) => handleImageError(e, leeunWork2_03, work.id, 'core-value-1')}
                      loading="lazy"
                    />
                  </div>
                  <div className="work-detail__core-value-author-info">
                    <p className="work-detail__core-value-author-name">Cute</p>
                    <p className="work-detail__core-value-author-subtitle">귀여운</p>
                  </div>
                </div>
                <p className="work-detail__core-value-text">
                  누구나 즐길 수 있는 가장 보편적인
감정으로 접근성이 좋도록 함
                </p>
              </div>
            </div>
          </li>
          <li className="work-detail__core-value-column work-detail__core-value-column--2">
            <div className="work-detail__core-value-card">
              <div className="work-detail__core-value-card-content">
                <div className="work-detail__core-value-author">
                  <div className="work-detail__core-value-avatar">
                    <img
                      src={leeunWork2_04}
                      alt="Unconstrained"
                      className="work-detail__core-value-avatar-image"
                      onError={(e) => handleImageError(e, leeunWork2_04, work.id, 'core-value-2')}
                      loading="lazy"
                    />
                  </div>
                  <div className="work-detail__core-value-author-info">
                    <p className="work-detail__core-value-author-name">Unconstrained</p>
                    <p className="work-detail__core-value-author-subtitle">제한 받지 않는, 자유로운</p>
                  </div>
                </div>
                <p className="work-detail__core-value-text">
                  어떤 상황에서도 자신을 표현할 수
있는 자유
                </p>
              </div>
            </div>
            <div className="work-detail__core-value-card">
              <div className="work-detail__core-value-card-content">
                <div className="work-detail__core-value-author">
                  <div className="work-detail__core-value-avatar">
                    <img
                      src={leeunWork2_05}
                      alt="Joyful"
                      className="work-detail__core-value-avatar-image"
                      onError={(e) => handleImageError(e, leeunWork2_05, work.id, 'core-value-3')}
                      loading="lazy"
                    />
                  </div>
                  <div className="work-detail__core-value-author-info">
                    <p className="work-detail__core-value-author-name">Joyful</p>
                    <p className="work-detail__core-value-author-subtitle">유쾌함</p>
                  </div>
                </div>
                <p className="work-detail__core-value-text">
                  일상속의 예상치 못한 무겁고 심각한
순간들을 가볍고 유쾌하게 넘어가는 
태도
                </p>
              </div>
            </div>
          </li>
          <li className="work-detail__core-value-column work-detail__core-value-column--3">
            <div className="work-detail__core-value-card">
              <div className="work-detail__core-value-card-content">
                <div className="work-detail__core-value-author">
                  <div className="work-detail__core-value-avatar">
                    <img
                      src={leeunWork2_06}
                      alt="Positive"
                      className="work-detail__core-value-avatar-image"
                      onError={(e) => handleImageError(e, leeunWork2_06, work.id, 'core-value-4')}
                      loading="lazy"
                    />
                  </div>
                  <div className="work-detail__core-value-author-info">
                    <p className="work-detail__core-value-author-name">Positive</p>
                    <p className="work-detail__core-value-author-subtitle">긍정적인</p>
                  </div>
                </div>
                <p className="work-detail__core-value-text">
                  브랜드 자체의 긍정적인 사고와 그것을
전파하려는 태도
                </p>
              </div>
            </div>
          </li>
        </ul>
      </section>

      {/* Gallery Section - 9e9e9e Items */}
      <section className="work-detail__section work-detail__gallery work-detail__gallery--leeun-9e9e9e-tablet">
        <div className="work-detail__gallery-header">
          <h3 className="work-detail__gallery-title">9e9e9e Items</h3>
        </div>
        <div className="work-detail__gallery-grid">
          <div className="work-detail__gallery-column work-detail__gallery-column--1">
            <div className="work-detail__gallery-item">
              <img
                src={leeunWork2_07}
                alt="9e9e9e Items 1"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, leeunWork2_07, work.id, 'gallery-1')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={leeunWork2_08}
                alt="9e9e9e Items 2"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, leeunWork2_08, work.id, 'gallery-2')}
                loading="lazy"
              />
            </div>
          </div>
          <div className="work-detail__gallery-column work-detail__gallery-column--2">
            <div className="work-detail__gallery-item">
              <img
                src={leeunWork2_09}
                alt="9e9e9e Items 3"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, leeunWork2_09, work.id, 'gallery-3')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={leeunWork2_10}
                alt="9e9e9e Items 4"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, leeunWork2_10, work.id, 'gallery-4')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={leeunWork2_11}
                alt="9e9e9e Items 5"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, leeunWork2_11, work.id, 'gallery-5')}
                loading="lazy"
              />
            </div>
          </div>
          <div className="work-detail__gallery-column work-detail__gallery-column--3">
            <div className="work-detail__gallery-item">
              <img
                src={leeunWork2_12}
                alt="9e9e9e Items 6"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, leeunWork2_12, work.id, 'gallery-6')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={leeunWork2_13}
                alt="9e9e9e Items 7"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, leeunWork2_13, work.id, 'gallery-7')}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeeUn9e9e9eTablet;
