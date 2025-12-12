import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/JeongitaeWarOrb/JeongitaeWarOrbMobile.css';

// 이미지 임포트
import jeongitaeWork2_01 from '../../../../assets/전기태/jeongitae_gamecontent_work2_01.webp';
import jeongitaeWork2_02 from '../../../../assets/전기태/jeongitae_gamecontent_work2_02.webp';
import jeongitaeWork2_03 from '../../../../assets/전기태/jeongitae_gamecontent_work2_03.webp';
import jeongitaeWork2_04 from '../../../../assets/전기태/jeongitae_gamecontent_work2_04.webp';
import jeongitaeWork2_05 from '../../../../assets/전기태/jeongitae_gamecontent_work2_05.webp';

/**
 * 전기태 - War Orb (작품2) Mobile 버전
 * Figma 디자인 기반 구현 (375px)
 */
const JeongitaeWarOrbMobile = ({ work, designer, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--jeongitae-warorb-mobile">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--jeongitae-warorb-mobile">
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--jeongitae-warorb-mobile">
          <img
            src={jeongitaeWork2_01}
            alt={work.title || 'War Orb'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, jeongitaeWork2_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
        <div className="work-detail__hero-content work-detail__hero-content--jeongitae-warorb-mobile">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--jeongitae-warorb-mobile">
              War Orb
            </h2>
            <div className="work-detail__lead work-detail__lead--jeongitae-warorb-mobile">
              <p>"세계의 신비로움과 그 창대함이 담긴 오브. 이 오브는 누가 바라보느냐에 따라 선의 정의가 될 수도, 악의 신념이 될 수도 있는 존재이다." 작품 워오브는 그 중 선의 오브를 쫓는 4가지의 클래스 소개하는 영상물이다.</p>
            </div>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--jeongitae-warorb-mobile">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--jeongitae-warorb-mobile`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Feature Section */}
      <section className="work-detail__section work-detail__feature work-detail__feature--jeongitae-warorb-mobile">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--jeongitae-warorb-mobile">
          <img
            src={jeongitaeWork2_02}
            alt="War Orb"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, jeongitaeWork2_02, work.id, 'feature-1')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title">모두의 염원이자 신비의 존재, 오브.</h4>
          <p>오브는 어느 날. 혹은 이 세계의 시작의 순간부터 존재했을지도 모르는 신비로운 존재이다. 이 오브는 그것을 취한 자들에게 원하는 힘을 하사한다.</p>
        </div>
      </section>

      {/* Feature Bento Section */}
      <ul className="work-detail__section work-detail__cards work-detail__cards--jeongitae-warorb-mobile work-detail__cards--bento">
        <li className="work-detail__card work-detail__card--jeongitae-warorb-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={jeongitaeWork2_03}
              alt="제 4클래스타일을"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, jeongitaeWork2_03, work.id, 'card-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">제 4클래스타일을</h5>
            <p>각자의 신념으로 선의 입장을 자처하며 오브를 쫓는 자들이 있다.</p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--jeongitae-warorb-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={jeongitaeWork2_04}
              alt="영광이 있으리."
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, jeongitaeWork2_04, work.id, 'card-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">"영광이 있으리."</h5>
            <p>그들은 각자의 갑옷과 무기, 혹은 마나 창고에 오브를 심어 힘을 발휘하는 존재들. 그들은 더욱 많은 오브를 취해 자신들의 선을 세상에 뿌리 심으려 한다.</p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--jeongitae-warorb-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={jeongitaeWork2_05}
              alt="라이브 2D 애니메이션"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, jeongitaeWork2_05, work.id, 'card-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">라이브 2D 애니메이션</h5>
            <p>Spine 2D 프로그램을 사용해 2.5D 라이브 2D 애니메이션 효과를 넣어 더욱 생동감 있는 움직임을 연출했다.</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default JeongitaeWarOrbMobile;

