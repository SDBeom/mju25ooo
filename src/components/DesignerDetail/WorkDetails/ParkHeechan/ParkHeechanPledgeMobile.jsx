import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/ParkHeechanPledge/ParkHeechanPledgeMobile.css';

// 이미지 임포트
import parkHeechanWork1_01 from '../../../../assets/박희찬/박희찬_게임콘텐츠츠_작품1_01.webp';
import parkHeechanWork1_02 from '../../../../assets/박희찬/박희찬_게임콘텐츠츠_작품1_02.webp';
import parkHeechanWork1_03 from '../../../../assets/박희찬/박희찬_게임콘텐츠츠_작품1_03.webp';
import parkHeechanWork1_04 from '../../../../assets/박희찬/박희찬_게임콘텐츠츠_작품1_04.webp';
import parkHeechanWork1_05 from '../../../../assets/박희찬/박희찬_게임콘텐츠츠_작품1_05.webp';
import parkHeechanWork1_06 from '../../../../assets/박희찬/박희찬_게임콘텐츠츠_작품1_06.webp';
import parkHeechanWork1_07 from '../../../../assets/박희찬/박희찬_게임콘텐츠츠_작품1_07.webp';
import parkHeechanWork1_08 from '../../../../assets/박희찬/박희찬_게임콘텐츠츠_작품1_08.webp';
import parkHeechanWork1_10 from '../../../../assets/박희찬/박희찬_게임콘텐츠츠_작품1_10.webp';
import parkHeechanWork1_11 from '../../../../assets/박희찬/박희찬_게임콘텐츠츠_작품1_11.webp';
import parkHeechanWork1_12 from '../../../../assets/박희찬/박희찬_게임콘텐츠츠_작품1_12.webp';
import parkHeechanWork1_13 from '../../../../assets/박희찬/박희찬_게임콘텐츠츠_작품1_13.webp';
import parkHeechanWork1_14 from '../../../../assets/박희찬/박희찬_게임콘텐츠츠_작품1_14.webp';

/**
 * 박희찬 - PLEDGE Mobile 버전
 * Figma 디자인 기반 구현 (375px)
 */
const ParkHeechanPledgeMobile = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--park-heechan-pledge-mobile">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--park-heechan-pledge-mobile">
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--park-heechan-pledge-mobile">
          <img
            src={parkHeechanWork1_01}
            alt={work.title || 'PLEDGE'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, parkHeechanWork1_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
        <div className="work-detail__hero-content work-detail__hero-content--park-heechan-pledge-mobile">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--park-heechan-pledge-mobile">PLEDGE</h2>
            <div className="work-detail__lead work-detail__lead--park-heechan-pledge-mobile">
              <p>영원한 충성, 서약</p>
            </div>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--park-heechan-pledge-mobile">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--park-heechan-pledge-mobile`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Feature 3 */}
      <section className="work-detail__section work-detail__feature work-detail__feature--park-heechan-pledge-mobile">
        <div className="work-detail__feature-image-wrapper">
          <img
            src={parkHeechanWork1_02}
            alt="영원한 충성, 서약에 관한 이야기"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, parkHeechanWork1_02, work.id, 'feature')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title">
            <span>영원한 충성, 그리고 서약에 관한</span>
            <span>이야기</span>
          </h4>
          <div className="work-detail__feature-description">
            <p>
              몰려드는 적들을 향해 그는 마지막 총을 들었다.
              <br aria-hidden="true" />
              혼자 남은 그는 전혀 두렵지 않다.
            </p>
            <p>그 침묵 속에서 맹세는 불타오른다.</p>
          </div>
        </div>
      </section>

      {/* Feature Cards 1: Space Marine & Dreadnought */}
      <ul className="work-detail__section work-detail__feature-rows work-detail__feature-rows--park-heechan-pledge-mobile">
        <li className="work-detail__feature-row work-detail__feature-row--park-heechan-pledge-mobile">
          <div className="work-detail__feature-row-image-wrapper">
            <img
              src={parkHeechanWork1_03}
              alt="페이 마린"
              className="work-detail__feature-row-image"
              onError={(e) => handleImageError(e, parkHeechanWork1_03, work.id, 'feature-row-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-row-content">
            <div className="work-detail__feature-row-text">
              <h4 className="work-detail__feature-row-title">페이 마린</h4>
              <div className="work-detail__feature-row-description">
                <p>인류 제국의 강화인간이며 군사 집단에</p>
                <p>속해있다. 20가지가 넘는 수술을 통해 덩치, 감각과 근력 등 신체의  모든 부분이 강화가 되었다. 이러한 초인적인 신체능력을 토대로 강한 전투력을 가지고 있으며</p>
                <p>인류 제국의 최후의 보루이자 희망이다.</p>
              </div>
            </div>
          </div>
        </li>
        <li className="work-detail__feature-row work-detail__feature-row--park-heechan-pledge-mobile">
          <div className="work-detail__feature-row-image-wrapper">
            <img
              src={parkHeechanWork1_04}
              alt="드레드노트"
              className="work-detail__feature-row-image"
              onError={(e) => handleImageError(e, parkHeechanWork1_04, work.id, 'feature-row-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-row-content">
            <div className="work-detail__feature-row-text">
              <h4 className="work-detail__feature-row-title">드레드노트</h4>
              <div className="work-detail__feature-row-description">
                <p>초인적인 육체로도 버틸 수 없는 심각한 부상을 입은 페이  마린들 중 강인하고</p>
                <p>의지가 불타오르는 베테랑 마린들을 수술을 통해 병기화 된 관, 드레드노트에 안치한다.</p>
              </div>
            </div>
          </div>
        </li>
      </ul>

      {/* Feature Bento 1 */}
      <ul className="work-detail__section work-detail__bento work-detail__bento--park-heechan-pledge-mobile">
        <li className="work-detail__bento-card work-detail__bento-card--park-heechan-pledge-mobile">
          <div className="work-detail__bento-image-wrapper">
            <img
              src={parkHeechanWork1_05}
              alt="위협적인 적"
              className="work-detail__bento-image"
              onError={(e) => handleImageError(e, parkHeechanWork1_05, work.id, 'bento-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-text">
            <h5 className="work-detail__bento-title">위협적인 적</h5>
            <div className="work-detail__bento-description">
              <p>타이라니드 종족은 무한에 가까운 개체 수,</p>
              <p>시냅로 이어진 정신, 파괴본능 등으로 인해</p>
              <p>상대하기  까다로우며 휩쓸고 지나간 자리는</p>
              <p>그 어떤것도 남지 않는 무자비한 종족이다.</p>
            </div>
          </div>
        </li>
        <li className="work-detail__bento-card work-detail__bento-card--park-heechan-pledge-mobile">
          <div className="work-detail__bento-image-wrapper">
            <img
              src={parkHeechanWork1_06}
              alt="타이라니드 워리어"
              className="work-detail__bento-image"
              onError={(e) => handleImageError(e, parkHeechanWork1_06, work.id, 'bento-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-text">
            <h5 className="work-detail__bento-title">타이라니드 워리어</h5>
            <div className="work-detail__bento-description">
              <p>주변의 하위 타이라니드에게 하이브 마인드의</p>
              <p>명령을 전달해주는 시냅 크리쳐이자</p>
              <p>전투 크리쳐. 두꺼운 외골격과 훙폭성으로</p>
              <p>페이 마린들과의 상대에서도 밀리지 않고</p>
              <p>오히려 더 강한 모습도 보여준다.</p>
            </div>
          </div>
        </li>
        <li className="work-detail__bento-card work-detail__bento-card--park-heechan-pledge-mobile">
          <div className="work-detail__bento-image-wrapper">
            <img
              src={parkHeechanWork1_07}
              alt="카니펙"
              className="work-detail__bento-image"
              onError={(e) => handleImageError(e, parkHeechanWork1_07, work.id, 'bento-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-text">
            <h5 className="work-detail__bento-title">카니펙</h5>
            <div className="work-detail__bento-description">
              <p>거대한 덩치, 대부분의 화력을 막는 키틴질 외골격, 강한 근력 등 전차의 포지션에 위치한 괴수.</p>
              <p>강력한 대전차병기로 상대하라는 지침이</p>
              <p>있을정도로 위협수준이 높다.</p>
            </div>
          </div>
        </li>
      </ul>

      {/* Feature Gallery 1: 틸컷 */}
      <section className="work-detail__section work-detail__gallery work-detail__gallery--park-heechan-pledge-mobile">
        <div className="work-detail__gallery-header">
          <h3 className="work-detail__gallery-title">틸컷</h3>
        </div>
        <div className="work-detail__gallery-grid">
          <div className="work-detail__gallery-column work-detail__gallery-column--1">
            <div className="work-detail__gallery-item">
              <img
                src={parkHeechanWork1_08}
                alt="틸컷 1"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, parkHeechanWork1_08, work.id, 'gallery-1')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item work-detail__gallery-item--empty"></div>
          </div>
          <div className="work-detail__gallery-column work-detail__gallery-column--2">
            <div className="work-detail__gallery-item">
              <img
                src={parkHeechanWork1_10}
                alt="틸컷 2"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, parkHeechanWork1_10, work.id, 'gallery-2')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={parkHeechanWork1_11}
                alt="틸컷 3"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, parkHeechanWork1_11, work.id, 'gallery-3')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={parkHeechanWork1_12}
                alt="틸컷 4"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, parkHeechanWork1_12, work.id, 'gallery-4')}
                loading="lazy"
              />
            </div>
          </div>
          <div className="work-detail__gallery-column work-detail__gallery-column--3">
            <div className="work-detail__gallery-item">
              <img
                src={parkHeechanWork1_13}
                alt="틸컷 5"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, parkHeechanWork1_13, work.id, 'gallery-5')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={parkHeechanWork1_14}
                alt="틸컷 6"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, parkHeechanWork1_14, work.id, 'gallery-6')}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ParkHeechanPledgeMobile;


import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/ParkHeechanPledge/ParkHeechanPledgeMobile.css';

// 이미지 임포트
import parkHeechanWork1_01 from '../../../../assets/박희찬/박희찬_게임콘텐츠츠_작품1_01.webp';
import parkHeechanWork1_02 from '../../../../assets/박희찬/박희찬_게임콘텐츠츠_작품1_02.webp';
import parkHeechanWork1_03 from '../../../../assets/박희찬/박희찬_게임콘텐츠츠_작품1_03.webp';
import parkHeechanWork1_04 from '../../../../assets/박희찬/박희찬_게임콘텐츠츠_작품1_04.webp';
import parkHeechanWork1_05 from '../../../../assets/박희찬/박희찬_게임콘텐츠츠_작품1_05.webp';
import parkHeechanWork1_06 from '../../../../assets/박희찬/박희찬_게임콘텐츠츠_작품1_06.webp';
import parkHeechanWork1_07 from '../../../../assets/박희찬/박희찬_게임콘텐츠츠_작품1_07.webp';
import parkHeechanWork1_08 from '../../../../assets/박희찬/박희찬_게임콘텐츠츠_작품1_08.webp';
import parkHeechanWork1_10 from '../../../../assets/박희찬/박희찬_게임콘텐츠츠_작품1_10.webp';
import parkHeechanWork1_11 from '../../../../assets/박희찬/박희찬_게임콘텐츠츠_작품1_11.webp';
import parkHeechanWork1_12 from '../../../../assets/박희찬/박희찬_게임콘텐츠츠_작품1_12.webp';
import parkHeechanWork1_13 from '../../../../assets/박희찬/박희찬_게임콘텐츠츠_작품1_13.webp';
import parkHeechanWork1_14 from '../../../../assets/박희찬/박희찬_게임콘텐츠츠_작품1_14.webp';

/**
 * 박희찬 - PLEDGE Mobile 버전
 * Figma 디자인 기반 구현 (375px)
 */
const ParkHeechanPledgeMobile = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--park-heechan-pledge-mobile">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--park-heechan-pledge-mobile">
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--park-heechan-pledge-mobile">
          <img
            src={parkHeechanWork1_01}
            alt={work.title || 'PLEDGE'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, parkHeechanWork1_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
        <div className="work-detail__hero-content work-detail__hero-content--park-heechan-pledge-mobile">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--park-heechan-pledge-mobile">PLEDGE</h2>
            <div className="work-detail__lead work-detail__lead--park-heechan-pledge-mobile">
              <p>영원한 충성, 서약</p>
            </div>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--park-heechan-pledge-mobile">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--park-heechan-pledge-mobile`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Feature 3 */}
      <section className="work-detail__section work-detail__feature work-detail__feature--park-heechan-pledge-mobile">
        <div className="work-detail__feature-image-wrapper">
          <img
            src={parkHeechanWork1_02}
            alt="영원한 충성, 서약에 관한 이야기"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, parkHeechanWork1_02, work.id, 'feature')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title">
            <span>영원한 충성, 그리고 서약에 관한</span>
            <span>이야기</span>
          </h4>
          <div className="work-detail__feature-description">
            <p>
              몰려드는 적들을 향해 그는 마지막 총을 들었다.
              <br aria-hidden="true" />
              혼자 남은 그는 전혀 두렵지 않다.
            </p>
            <p>그 침묵 속에서 맹세는 불타오른다.</p>
          </div>
        </div>
      </section>

      {/* Feature Cards 1: Space Marine & Dreadnought */}
      <ul className="work-detail__section work-detail__feature-rows work-detail__feature-rows--park-heechan-pledge-mobile">
        <li className="work-detail__feature-row work-detail__feature-row--park-heechan-pledge-mobile">
          <div className="work-detail__feature-row-image-wrapper">
            <img
              src={parkHeechanWork1_03}
              alt="페이 마린"
              className="work-detail__feature-row-image"
              onError={(e) => handleImageError(e, parkHeechanWork1_03, work.id, 'feature-row-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-row-content">
            <div className="work-detail__feature-row-text">
              <h4 className="work-detail__feature-row-title">페이 마린</h4>
              <div className="work-detail__feature-row-description">
                <p>인류 제국의 강화인간이며 군사 집단에</p>
                <p>속해있다. 20가지가 넘는 수술을 통해 덩치, 감각과 근력 등 신체의  모든 부분이 강화가 되었다. 이러한 초인적인 신체능력을 토대로 강한 전투력을 가지고 있으며</p>
                <p>인류 제국의 최후의 보루이자 희망이다.</p>
              </div>
            </div>
          </div>
        </li>
        <li className="work-detail__feature-row work-detail__feature-row--park-heechan-pledge-mobile">
          <div className="work-detail__feature-row-image-wrapper">
            <img
              src={parkHeechanWork1_04}
              alt="드레드노트"
              className="work-detail__feature-row-image"
              onError={(e) => handleImageError(e, parkHeechanWork1_04, work.id, 'feature-row-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-row-content">
            <div className="work-detail__feature-row-text">
              <h4 className="work-detail__feature-row-title">드레드노트</h4>
              <div className="work-detail__feature-row-description">
                <p>초인적인 육체로도 버틸 수 없는 심각한 부상을 입은 페이  마린들 중 강인하고</p>
                <p>의지가 불타오르는 베테랑 마린들을 수술을 통해 병기화 된 관, 드레드노트에 안치한다.</p>
              </div>
            </div>
          </div>
        </li>
      </ul>

      {/* Feature Bento 1 */}
      <ul className="work-detail__section work-detail__bento work-detail__bento--park-heechan-pledge-mobile">
        <li className="work-detail__bento-card work-detail__bento-card--park-heechan-pledge-mobile">
          <div className="work-detail__bento-image-wrapper">
            <img
              src={parkHeechanWork1_05}
              alt="위협적인 적"
              className="work-detail__bento-image"
              onError={(e) => handleImageError(e, parkHeechanWork1_05, work.id, 'bento-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-text">
            <h5 className="work-detail__bento-title">위협적인 적</h5>
            <div className="work-detail__bento-description">
              <p>타이라니드 종족은 무한에 가까운 개체 수,</p>
              <p>시냅로 이어진 정신, 파괴본능 등으로 인해</p>
              <p>상대하기  까다로우며 휩쓸고 지나간 자리는</p>
              <p>그 어떤것도 남지 않는 무자비한 종족이다.</p>
            </div>
          </div>
        </li>
        <li className="work-detail__bento-card work-detail__bento-card--park-heechan-pledge-mobile">
          <div className="work-detail__bento-image-wrapper">
            <img
              src={parkHeechanWork1_06}
              alt="타이라니드 워리어"
              className="work-detail__bento-image"
              onError={(e) => handleImageError(e, parkHeechanWork1_06, work.id, 'bento-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-text">
            <h5 className="work-detail__bento-title">타이라니드 워리어</h5>
            <div className="work-detail__bento-description">
              <p>주변의 하위 타이라니드에게 하이브 마인드의</p>
              <p>명령을 전달해주는 시냅 크리쳐이자</p>
              <p>전투 크리쳐. 두꺼운 외골격과 훙폭성으로</p>
              <p>페이 마린들과의 상대에서도 밀리지 않고</p>
              <p>오히려 더 강한 모습도 보여준다.</p>
            </div>
          </div>
        </li>
        <li className="work-detail__bento-card work-detail__bento-card--park-heechan-pledge-mobile">
          <div className="work-detail__bento-image-wrapper">
            <img
              src={parkHeechanWork1_07}
              alt="카니펙"
              className="work-detail__bento-image"
              onError={(e) => handleImageError(e, parkHeechanWork1_07, work.id, 'bento-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-text">
            <h5 className="work-detail__bento-title">카니펙</h5>
            <div className="work-detail__bento-description">
              <p>거대한 덩치, 대부분의 화력을 막는 키틴질 외골격, 강한 근력 등 전차의 포지션에 위치한 괴수.</p>
              <p>강력한 대전차병기로 상대하라는 지침이</p>
              <p>있을정도로 위협수준이 높다.</p>
            </div>
          </div>
        </li>
      </ul>

      {/* Feature Gallery 1: 틸컷 */}
      <section className="work-detail__section work-detail__gallery work-detail__gallery--park-heechan-pledge-mobile">
        <div className="work-detail__gallery-header">
          <h3 className="work-detail__gallery-title">틸컷</h3>
        </div>
        <div className="work-detail__gallery-grid">
          <div className="work-detail__gallery-column work-detail__gallery-column--1">
            <div className="work-detail__gallery-item">
              <img
                src={parkHeechanWork1_08}
                alt="틸컷 1"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, parkHeechanWork1_08, work.id, 'gallery-1')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item work-detail__gallery-item--empty"></div>
          </div>
          <div className="work-detail__gallery-column work-detail__gallery-column--2">
            <div className="work-detail__gallery-item">
              <img
                src={parkHeechanWork1_10}
                alt="틸컷 2"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, parkHeechanWork1_10, work.id, 'gallery-2')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={parkHeechanWork1_11}
                alt="틸컷 3"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, parkHeechanWork1_11, work.id, 'gallery-3')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={parkHeechanWork1_12}
                alt="틸컷 4"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, parkHeechanWork1_12, work.id, 'gallery-4')}
                loading="lazy"
              />
            </div>
          </div>
          <div className="work-detail__gallery-column work-detail__gallery-column--3">
            <div className="work-detail__gallery-item">
              <img
                src={parkHeechanWork1_13}
                alt="틸컷 5"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, parkHeechanWork1_13, work.id, 'gallery-5')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__gallery-item">
              <img
                src={parkHeechanWork1_14}
                alt="틸컷 6"
                className="work-detail__gallery-image"
                onError={(e) => handleImageError(e, parkHeechanWork1_14, work.id, 'gallery-6')}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ParkHeechanPledgeMobile;

