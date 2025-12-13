import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/SongDaheePeony/SongDaheePeonyMobile.css';

// 이미지 임포트
import songDaheeWork2_01 from '../../../../assets/송다희/songdahee_videocontent_work2_01.webp';
import songDaheeWork2_02 from '../../../../assets/송다희/songdahee_videocontent_work2_02.webp';
import songDaheeWork2_03 from '../../../../assets/송다희/songdahee_videocontent_work2_03.webp';
import songDaheeWork2_04 from '../../../../assets/송다희/songdahee_videocontent_work2_04.webp';
import songDaheeWork2_05 from '../../../../assets/송다희/songdahee_videocontent_work2_05.webp';
import songDaheeWork2_06 from '../../../../assets/송다희/songdahee_videocontent_work2_06.webp';

/**
 * 송다희 - Peony (작품2) Mobile 버전
 * Figma 디자인 기반 구현 (375px)
 */
const SongDaheePeonyMobile = ({ work, designer, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--song-dahee-peony-mobile">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--song-dahee-peony-mobile">
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--song-dahee-peony-mobile">
          <img
            src={songDaheeWork2_01}
            alt={work.title || 'Peony'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, songDaheeWork2_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
        <div className="work-detail__hero-content work-detail__hero-content--song-dahee-peony-mobile">
          <div className="work-detail__text-group work-detail__text-group--center">
            <h2 className="work-detail__title work-detail__title--song-dahee-peony-mobile">Peony</h2>
            <div className="work-detail__lead work-detail__lead--song-dahee-peony-mobile">
              <p>'Peony'는 시집의 추상적이고 감각적인 문장을<br />영상의 호흡으로 번역한다.<br />본 전시는 이승희 시인의 '작약은 물속에서 더 <br />환한데'라는 시집을 모티프 삼아 제작되었다.</p>
            </div>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--song-dahee-peony-mobile">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--song-dahee-peony-mobile`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* YouTube Video Section */}
      <section className="work-detail__section work-detail__video-section work-detail__video-section--song-dahee-peony-mobile">
        <div className="work-detail__video-wrapper work-detail__video-wrapper--song-dahee-peony-mobile">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/tz4dj3WfDKw?si=844__2Sl3KsSMLCD&controls=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="work-detail__video-iframe work-detail__video-iframe--song-dahee-peony-mobile"
          />
        </div>
      </section>

      {/* Feature Rows Section */}
      <ul className="work-detail__section work-detail__feature-rows work-detail__feature-rows--song-dahee-peony-mobile">
        <li className="work-detail__feature-row work-detail__feature-row--song-dahee-peony-mobile">
          <div className="work-detail__feature-row-image-wrapper">
            <img
              src={songDaheeWork2_02}
              alt="어떤 마음에 대하여"
              className="work-detail__feature-row-image"
              onError={(e) => handleImageError(e, songDaheeWork2_02, work.id, 'feature-row-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-row-content">
            <div>
              <h4 className="work-detail__feature-row-title">어떤 마음에 대하여</h4>
              <div className="work-detail__feature-row-description">
                <p>물속에<br />연꽃은 연꽃이 아니고 모란은 모란이 아니고<br />복숭아는 복숭아가 아니어서</p>
              </div>
            </div>
          </div>
        </li>
        <li className="work-detail__feature-row work-detail__feature-row--song-dahee-peony-mobile">
          <div className="work-detail__feature-row-image-wrapper">
            <img
              src={songDaheeWork2_03}
              alt="내 마음의 수몰 지구"
              className="work-detail__feature-row-image"
              onError={(e) => handleImageError(e, songDaheeWork2_03, work.id, 'feature-row-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-row-content">
            <div>
              <h4 className="work-detail__feature-row-title">내 마음의 수몰 지구</h4>
              <div className="work-detail__feature-row-description">
                <p>불을 켜두어야 합니다.<br />수국이 잘 자라도록 도와줘야 합니다.</p>
              </div>
            </div>
          </div>
        </li>
        <li className="work-detail__feature-row work-detail__feature-row--song-dahee-peony-mobile work-detail__feature-row--cards">
          <ul className="work-detail__cards work-detail__cards--song-dahee-peony-mobile">
            <li className="work-detail__card work-detail__card--song-dahee-peony-mobile">
              <article className="work-detail__card-article">
                <div className="work-detail__card-image-wrapper">
                  <img
                    src={songDaheeWork2_04}
                    alt="어떤 마음에 대하여"
                    className="work-detail__card-image"
                    onError={(e) => handleImageError(e, songDaheeWork2_04, work.id, 'card-1')}
                    loading="lazy"
                  />
                </div>
                <div className="work-detail__card-body">
                  <h5 className="work-detail__card-title">어떤 마음에 대하여</h5>
                  <div className="work-detail__card-description">
                    <p>내가 여기에 있는 것<br />그리고 거기서부터 걸어와야 하는 것<br />그리고 나를 지나가야 하는 것</p>
                  </div>
                </div>
              </article>
            </li>
            <li className="work-detail__card work-detail__card--song-dahee-peony-mobile">
              <article className="work-detail__card-article">
                <div className="work-detail__card-image-wrapper">
                  <img
                    src={songDaheeWork2_05}
                    alt="초록 물고기"
                    className="work-detail__card-image"
                    onError={(e) => handleImageError(e, songDaheeWork2_05, work.id, 'card-2')}
                    loading="lazy"
                  />
                </div>
                <div className="work-detail__card-body">
                  <h5 className="work-detail__card-title">초록 물고기</h5>
                  <div className="work-detail__card-description">
                    <p>연못가 버드나무에선 바람이 불 때마다 <br />몇 마리의 물고기가 툭툭 놓여났다.<br />공중을 물들이며 스르르 잠기는 물고기</p>
                  </div>
                </div>
              </article>
            </li>
            <li className="work-detail__card work-detail__card--song-dahee-peony-mobile">
              <article className="work-detail__card-article">
                <div className="work-detail__card-image-wrapper">
                  <img
                    src={songDaheeWork2_06}
                    alt="슬픔은 다할 수 없어"
                    className="work-detail__card-image"
                    onError={(e) => handleImageError(e, songDaheeWork2_06, work.id, 'card-3')}
                    loading="lazy"
                  />
                </div>
                <div className="work-detail__card-body">
                  <h5 className="work-detail__card-title">슬픔은 다할 수 없어</h5>
                  <div className="work-detail__card-description">
                    <p>그가 물가에 두고 간 신발<br />반짝 빛나는 마음 같아<br />나도 나란히 신발을 벗어둔다.<br />정말 슬픔을 다할 수 있을까.</p>
                  </div>
                </div>
              </article>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default SongDaheePeonyMobile;

