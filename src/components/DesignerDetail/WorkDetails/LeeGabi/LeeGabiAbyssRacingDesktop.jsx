import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/LeeGabiAbyssRacing/LeeGabiAbyssRacingDesktop.css';

// 이미지 임포트
import leegabiWork2_01 from '../../../../assets/이가비/leegabi_gamecontent_work2_01.webp';
import leegabiWork2_02 from '../../../../assets/이가비/leegabi_gamecontent_work2_02.webp';
import leegabiWork2_03 from '../../../../assets/이가비/leegabi_gamecontent_work2_03.webp';
import leegabiWork2_04 from '../../../../assets/이가비/leegabi_gamecontent_work2_04.webp';
import leegabiWork2_05 from '../../../../assets/이가비/leegabi_gamecontent_work2_05.webp';
import leegabiWork2_06 from '../../../../assets/이가비/leegabi_gamecontent_work2_06.webp';
import leegabiWork2_07 from '../../../../assets/이가비/leegabi_gamecontent_work2_07.webp';
import leegabiWork2_08 from '../../../../assets/이가비/leegabi_gamecontent_work2_08.webp';
import leegabiWork2_09 from '../../../../assets/이가비/leegabi_gamecontent_work2_09.webp';
import leegabiWork2_10 from '../../../../assets/이가비/leegabi_gamecontent_work2_10.webp';
import leegabiWork2_11 from '../../../../assets/이가비/leegabi_gamecontent_work2_11.webp';

/**
 * 이가비 - Abyss Racing: 세이렌의 보물 (작품2) Desktop 버전
 * Figma 디자인 기반 구현 (1280px)
 */
const LeeGabiAbyssRacingDesktop = ({ work, designer, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--leegabi-abyss-racing-desktop">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--leegabi-abyss-racing-desktop">
        <div className="work-detail__hero-content work-detail__hero-content--leegabi-abyss-racing-desktop">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--leegabi-abyss-racing-desktop">
              {`Abyss Racing
: 세이렌의 보물`}
            </h2>
            <p className="work-detail__lead work-detail__lead--leegabi-abyss-racing-desktop">
              {`<카트라이더:드리프트> 신규캐릭터 세이렌의 등장!
수중도시에서 '레전드 컵'을 되찾기 위한 치열한 레이싱 대결이 펼쳐진다.`}
            </p>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--leegabi-abyss-racing-desktop">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--leegabi-abyss-racing-desktop`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--leegabi-abyss-racing-desktop">
          <img
            src={leegabiWork2_01}
            alt={work.title || 'Abyss Racing: 세이렌의 보물'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, leegabiWork2_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
      </section>

      {/* Feature Section 1 */}
      <section className="work-detail__section work-detail__feature work-detail__feature--leegabi-abyss-racing-desktop">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--leegabi-abyss-racing-desktop">
          <img
            src={leegabiWork2_02}
            alt="Abyss Racing: 세이렌의 보물"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, leegabiWork2_02, work.id, 'feature-1')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title">Abyss Racing: 세이렌의 보물</h4>
          <p className="work-detail__feature-description">&lt;카트라이더:드리프트&gt; 가상 신규 캐릭터 '세이렌'을 소개하는 트레일러 영상</p>
        </div>
      </section>

      {/* Feature Section 2 */}
      <section className="work-detail__section work-detail__feature work-detail__feature--leegabi-abyss-racing-desktop">
        <div className="work-detail__feature-image-wrapper work-detail__feature-image-wrapper--leegabi-abyss-racing-desktop">
          <img
            src={leegabiWork2_03}
            alt="수중신전으로"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, leegabiWork2_03, work.id, 'feature-2')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title">수중신전으로</h4>
          <p className="work-detail__feature-description">잃어버린 '레전드 컵'이 수중신전에 있다는 소문이 돌고있다. 하지만 그곳엔 세이렌이 자리를 지키고 있다.</p>
        </div>
      </section>

      {/* Feature Rows Section */}
      <ul className="work-detail__section work-detail__feature-rows work-detail__feature-rows--leegabi-abyss-racing-desktop">
        <li className="work-detail__feature-row work-detail__feature-row--leegabi-abyss-racing-desktop">
          <div className="work-detail__feature-content">
            <div className="work-detail__text-group">
              <h4 className="work-detail__feature-title">잃어버린 '레전드 컵'을 찾기 위한 여정</h4>
              <p className="work-detail__feature-description">소문을 따라 그녀가 있는 수중도시로 향한다.</p>
            </div>
          </div>
          <div className="work-detail__feature-image-wrapper">
            <img
              src={leegabiWork2_04}
              alt="잃어버린 '레전드 컵'을 찾기 위한 여정"
              className="work-detail__feature-image"
              onError={(e) => handleImageError(e, leegabiWork2_04, work.id, 'feature-row-1')}
              loading="lazy"
            />
          </div>
        </li>
        <li className="work-detail__feature-row work-detail__feature-row--reverse work-detail__feature-row--leegabi-abyss-racing-desktop">
          <div className="work-detail__feature-content">
            <div className="work-detail__text-group">
              <h4 className="work-detail__feature-title">세이렌의 보물</h4>
              <p className="work-detail__feature-description">반짝이는 물건을 좋아하는 세이렌. 레전드 컵이 요즘 그녀의 보물이 된 듯하다.</p>
            </div>
          </div>
          <div className="work-detail__feature-image-wrapper">
            <img
              src={leegabiWork2_05}
              alt="세이렌의 보물"
              className="work-detail__feature-image"
              onError={(e) => handleImageError(e, leegabiWork2_05, work.id, 'feature-row-2')}
              loading="lazy"
            />
          </div>
        </li>
      </ul>

      {/* Feature Cards Section */}
      <ul className="work-detail__section work-detail__cards work-detail__cards--leegabi-abyss-racing-desktop">
        <li className="work-detail__card work-detail__card--leegabi-abyss-racing-desktop">
          <div className="work-detail__card-image-wrapper">
            <img
              src={leegabiWork2_06}
              alt="레전드 컵을 되찾다."
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, leegabiWork2_06, work.id, 'card-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">레전드 컵을 되찾다.</h5>
            <p className="work-detail__card-description">세이렌의 눈을 피해 레전드 컵을 다시 손에 넣은 다오.</p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--leegabi-abyss-racing-desktop">
          <div className="work-detail__card-image-wrapper">
            <img
              src={leegabiWork2_07}
              alt="세이렌의 분노"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, leegabiWork2_07, work.id, 'card-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">세이렌의 분노</h5>
            <p className="work-detail__card-description">본인의 보물을 가져간 다오와 배찌를 쫓는다.</p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--leegabi-abyss-racing-desktop">
          <div className="work-detail__card-image-wrapper">
            <img
              src={leegabiWork2_08}
              alt="물폭탄 발동!"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, leegabiWork2_08, work.id, 'card-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">물폭탄 발동!</h5>
            <p className="work-detail__card-description">세이렌의 공격이 시작된다.</p>
          </div>
        </li>
      </ul>

      {/* Feature Bento Section */}
      <ul className="work-detail__section work-detail__bento work-detail__bento--leegabi-abyss-racing-desktop">
        <li className="work-detail__bento-row">
          <div className="work-detail__bento-card work-detail__bento-card--leegabi-abyss-racing-desktop">
            <div className="work-detail__bento-image-wrapper">
              <img
                src={leegabiWork2_09}
                alt="분노의 시작"
                className="work-detail__bento-image"
                onError={(e) => handleImageError(e, leegabiWork2_09, work.id, 'bento-1')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__bento-text">
              <h5 className="work-detail__bento-title">분노의 시작</h5>
              <p className="work-detail__bento-description">다오와 배찌가 레전드 컵을 가져가는 장면을 목격한다.</p>
            </div>
          </div>
          <div className="work-detail__bento-card work-detail__bento-card--leegabi-abyss-racing-desktop">
            <div className="work-detail__bento-image-wrapper">
              <img
                src={leegabiWork2_10}
                alt="세이렌의 등장"
                className="work-detail__bento-image"
                onError={(e) => handleImageError(e, leegabiWork2_10, work.id, 'bento-2')}
                loading="lazy"
              />
            </div>
            <div className="work-detail__bento-text">
              <h5 className="work-detail__bento-title">세이렌의 등장</h5>
              <p className="work-detail__bento-description">신규 캐릭터 세이렌의 첫 등장.</p>
            </div>
          </div>
        </li>
        <li className="work-detail__bento-card work-detail__bento-card--large work-detail__bento-card--leegabi-abyss-racing-desktop">
          <div className="work-detail__bento-image-wrapper">
            <img
              src={leegabiWork2_11}
              alt="마지막 질주"
              className="work-detail__bento-image"
              onError={(e) => handleImageError(e, leegabiWork2_11, work.id, 'bento-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__bento-text">
            <h5 className="work-detail__bento-title">마지막 질주</h5>
            <p className="work-detail__bento-description">세이렌에게 잡히기 전에 빠르게 돌악가는 포탈을 타야한다. 그들은 무사히 수중신전에서 빠져나갈 수 있을까?</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default LeeGabiAbyssRacingDesktop;

