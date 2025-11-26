import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/KimJinaCellestial/KimJinaCellestialDesktop.css';

// 이미지 임포트
import kimJinaWork2_01 from '../../../../assets/김지나/김지나_멀티미디어_작품2_01.webp';
import kimJinaWork2_02 from '../../../../assets/김지나/김지나_멀티미디어_작품2_02.webp';
import kimJinaWork2_03 from '../../../../assets/김지나/김지나_멀티미디어_작품2_03.webp';
import kimJinaWork2_04 from '../../../../assets/김지나/김지나_멀티미디어_작품2_04.webp';
import kimJinaWork2_05 from '../../../../assets/김지나/김지나_멀티미디어_작품2_05.webp';
import kimJinaWork2_06 from '../../../../assets/김지나/김지나_멀티미디어_작품2_06.webp';
import kimJinaWork2_07 from '../../../../assets/김지나/김지나_멀티미디어_작품2_07.webp';
import kimJinaWork2_08 from '../../../../assets/김지나/김지나_멀티미디어_작품2_08.webp';
import kimJinaWork2_09 from '../../../../assets/김지나/김지나_멀티미디어_작품2_09.webp';

/**
 * 김지나 - Cellestial Desktop 버전
 * Figma 디자인 기반 구현 (1280px)
 */
const KimJinaCellestialDesktop = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--kim-jina-cellestial-desktop">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--kim-jina-cellestial-desktop">
        <div className="work-detail__hero-content work-detail__hero-content--kim-jina-cellestial-desktop">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--kim-jina-cellestial-desktop">Cellestial</h2>
            <div className="work-detail__lead work-detail__lead--kim-jina-cellestial-desktop">
              <p>세포(Cell)를 모티브로 한 캐릭터가 오염된 행성을 정화하고 과거 이곳에 무슨 일이 있었는지 파헤친다.</p>
            </div>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--kim-jina-cellestial-desktop">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--kim-jina-cellestial-desktop`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--kim-jina-cellestial-desktop">
          <img
            src={kimJinaWork2_01}
            alt={work.title || 'Cellestial'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, kimJinaWork2_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
      </section>

      {/* Feature Row - Logo */}
      <section className="work-detail__section work-detail__feature-row work-detail__feature-row--kim-jina-cellestial-desktop">
        <div className="work-detail__feature-row-content">
          <h4 className="work-detail__feature-title">로고</h4>
          <div className="work-detail__feature-description">
            <p>세포(Cell)와 우주(Celestial)의 합성어.</p>
          </div>
        </div>
        <div className="work-detail__feature-row-image">
          <img
            src={kimJinaWork2_02}
            alt="로고"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, kimJinaWork2_02, work.id, 'feature-logo')}
            loading="lazy"
          />
        </div>
      </section>

      {/* Feature Section - Pollution and Purification */}
      <section className="work-detail__section work-detail__feature work-detail__feature--kim-jina-cellestial-desktop">
        <div className="work-detail__feature-image-wrapper">
          <img
            src={kimJinaWork2_03}
            alt="오염과 정화의 몽환적 재해석"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, kimJinaWork2_03, work.id, 'feature-pollution')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title">오염과 정화의 몽환적 재해석</h4>
          <div className="work-detail__feature-description">
            <p>투명한 막 안의 내용물이 상호작용을 해 에너지를 만든다.</p>
            <p>플레이어 캐릭터는 필드를 돌아다니며 자원을 얻고, 에너지를 만든 뒤 오염물을 정화하며 활동 범위를 넓힌다.</p>
          </div>
        </div>
      </section>

      {/* Feature Cards Section 1 - Character Stages */}
      <ul className="work-detail__section work-detail__feature-cards work-detail__feature-cards--kim-jina-cellestial-desktop">
        <li className="work-detail__feature-card">
          <div className="work-detail__feature-card-image-wrapper">
            <img
              src={kimJinaWork2_04}
              alt="캐릭터 1단계"
              className="work-detail__feature-card-image"
              onError={(e) => handleImageError(e, kimJinaWork2_04, work.id, 'card-character-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-card-text">
            <h5 className="work-detail__feature-card-title">캐릭터 1단계</h5>
          </div>
        </li>
        <li className="work-detail__feature-card">
          <div className="work-detail__feature-card-image-wrapper">
            <img
              src={kimJinaWork2_05}
              alt="캐릭터 2단계"
              className="work-detail__feature-card-image"
              onError={(e) => handleImageError(e, kimJinaWork2_05, work.id, 'card-character-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-card-text">
            <h5 className="work-detail__feature-card-title">캐릭터 2단계</h5>
          </div>
        </li>
        <li className="work-detail__feature-card">
          <div className="work-detail__feature-card-image-wrapper">
            <img
              src={kimJinaWork2_06}
              alt="캐릭터 3단계"
              className="work-detail__feature-card-image"
              onError={(e) => handleImageError(e, kimJinaWork2_06, work.id, 'card-character-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-card-text">
            <h5 className="work-detail__feature-card-title">캐릭터 3단계</h5>
          </div>
        </li>
      </ul>

      {/* Feature Cards Section 2 - Detail Cuts and Monster */}
      <ul className="work-detail__section work-detail__feature-cards-grid work-detail__feature-cards-grid--kim-jina-cellestial-desktop">
        <li className="work-detail__feature-cards-grid-item">
          <div className="work-detail__feature-cards-column">
            <div className="work-detail__feature-card-bg">
              <div className="work-detail__feature-card-text">
                <h5 className="work-detail__feature-card-title">디테일 컷_1</h5>
                <div className="work-detail__feature-card-description">
                  <p>오브젝트</p>
                </div>
              </div>
              <div className="work-detail__feature-card-image-wrapper">
                <img
                  src={kimJinaWork2_07}
                  alt="디테일 컷_1"
                  className="work-detail__feature-card-image"
                  onError={(e) => handleImageError(e, kimJinaWork2_07, work.id, 'card-detail-1')}
                  loading="lazy"
                />
              </div>
            </div>
            <div className="work-detail__feature-card-bg">
              <div className="work-detail__feature-card-text">
                <h5 className="work-detail__feature-card-title">디테일 컷_2</h5>
                <div className="work-detail__feature-card-description">
                  <p>캐릭터 3단계</p>
                </div>
              </div>
              <div className="work-detail__feature-card-image-wrapper">
                <img
                  src={kimJinaWork2_08}
                  alt="디테일 컷_2"
                  className="work-detail__feature-card-image"
                  onError={(e) => handleImageError(e, kimJinaWork2_08, work.id, 'card-detail-2')}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div className="work-detail__feature-card-bg work-detail__feature-card-bg--full">
            <div className="work-detail__feature-card-text">
              <h5 className="work-detail__feature-card-title">몬터</h5>
              <div className="work-detail__feature-card-description">
                <p>반투명한 몸체에 핵</p>
              </div>
            </div>
            <div className="work-detail__feature-card-image-wrapper">
              <img
                src={kimJinaWork2_09}
                alt="몬터"
                className="work-detail__feature-card-image"
                onError={(e) => handleImageError(e, kimJinaWork2_09, work.id, 'card-monster')}
                loading="lazy"
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default KimJinaCellestialDesktop;
