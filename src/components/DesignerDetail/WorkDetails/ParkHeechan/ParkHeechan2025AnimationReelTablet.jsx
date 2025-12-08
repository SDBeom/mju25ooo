import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/ParkHeechan2025AnimationReel/ParkHeechan2025AnimationReelTablet.css';

// 이미지 임포트
import parkHeechanWork2_01 from '../../../../assets/박희찬/parkheechan_gamecontent_work2_01.webp';
import parkHeechanWork2_02 from '../../../../assets/박희찬/parkheechan_gamecontent_work2_02.webp';
import parkHeechanWork2_03 from '../../../../assets/박희찬/parkheechan_gamecontent_work2_03.webp';
import parkHeechanWork2_04 from '../../../../assets/박희찬/parkheechan_gamecontent_work2_04.webp';
import parkHeechanWork2_05 from '../../../../assets/박희찬/parkheechan_gamecontent_work2_05.webp';
import parkHeechanWork2_06 from '../../../../assets/박희찬/parkheechan_gamecontent_work2_06.webp';

/**
 * 박희찬 - 2025 Animation reel Tablet 버전
 * Figma 디자인 기반 구현 (800px)
 */
const ParkHeechan2025AnimationReelTablet = ({ work, designer, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--park-heechan-2025-animation-reel-tablet">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--park-heechan-2025-animation-reel-tablet">
        <div className="work-detail__hero-content work-detail__hero-content--park-heechan-2025-animation-reel-tablet">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--park-heechan-2025-animation-reel-tablet">
              {`2025 
Animation reel`}
            </h2>
            <p className="work-detail__lead work-detail__lead--park-heechan-2025-animation-reel-tablet">
              게임 애니메이션 포트폴리오 프로젝트
            </p>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--park-heechan-2025-animation-reel-tablet">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--park-heechan-2025-animation-reel-tablet`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--park-heechan-2025-animation-reel-tablet">
          <img
            src={parkHeechanWork2_01}
            alt={work.title || '2025 Animation reel'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, parkHeechanWork2_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
      </section>

      {/* Feature 2: 3D Animation & Goal */}
      <ul className="work-detail__section work-detail__feature-rows work-detail__feature-rows--park-heechan-2025-animation-reel-tablet">
        <li className="work-detail__feature-row work-detail__feature-row--park-heechan-2025-animation-reel-tablet">
          <div className="work-detail__feature-row-content">
            <div className="work-detail__feature-row-text">
              <h4 className="work-detail__feature-row-title">3D 애니메이션</h4>
              <p className="work-detail__feature-row-description">3D 캐릭터들의 동작을 직접 만들어 살아 숨쉬게 만드는 과정</p>
            </div>
          </div>
          <div className="work-detail__feature-row-image-wrapper">
            <img
              src={parkHeechanWork2_02}
              alt="3D 애니메이션"
              className="work-detail__feature-row-image"
              onError={(e) => handleImageError(e, parkHeechanWork2_02, work.id, 'feature-row-1')}
              loading="lazy"
            />
          </div>
        </li>
        <li className="work-detail__feature-row work-detail__feature-row--park-heechan-2025-animation-reel-tablet work-detail__feature-row--reverse">
          <div className="work-detail__feature-row-content">
            <div className="work-detail__feature-row-text">
              <h4 className="work-detail__feature-row-title">목표</h4>
              <p className="work-detail__feature-row-description">
                {`캐릭터의 특징을 파악하고 어울리는 동작을 구상, 애니메이팅 하는
능력을 향상하고 최종적으로 취업에 필요한 포트폴리오를 제작하는 것을
목표로 설정하였다.`}
              </p>
            </div>
          </div>
          <div className="work-detail__feature-row-image-wrapper">
            <img
              src={parkHeechanWork2_03}
              alt="목표"
              className="work-detail__feature-row-image"
              onError={(e) => handleImageError(e, parkHeechanWork2_03, work.id, 'feature-row-2')}
              loading="lazy"
            />
          </div>
        </li>
      </ul>

      {/* Feature Cards 1 */}
      <ul className="work-detail__section work-detail__cards work-detail__cards--park-heechan-2025-animation-reel-tablet">
        <li className="work-detail__card work-detail__card--park-heechan-2025-animation-reel-tablet">
          <div className="work-detail__card-image-wrapper">
            <img
              src={parkHeechanWork2_04}
              alt="자연러움"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, parkHeechanWork2_04, work.id, 'card-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">자연스러움</h5>
            <p className="work-detail__card-description">보기에 어색함이 없는 자연스러운 모션</p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--park-heechan-2025-animation-reel-tablet">
          <div className="work-detail__card-image-wrapper">
            <img
              src={parkHeechanWork2_05}
              alt="무게감"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, parkHeechanWork2_05, work.id, 'card-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">무게감</h5>
            <p className="work-detail__card-description">각 캐릭터마다 가지고 있는 고유의 무게감을 표현</p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--park-heechan-2025-animation-reel-tablet">
          <div className="work-detail__card-image-wrapper">
            <img
              src={parkHeechanWork2_06}
              alt="속도감"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, parkHeechanWork2_06, work.id, 'card-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">속도감</h5>
            <p className="work-detail__card-description">무게감을 유지한 채 속도감을 살릴 수 있는 방법</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ParkHeechan2025AnimationReelTablet;

