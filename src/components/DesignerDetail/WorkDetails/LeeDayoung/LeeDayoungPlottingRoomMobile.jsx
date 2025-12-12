import React from 'react';
import { handleImageError } from '../../../../shared/imageUtils';
import '../../styles/works/LeeDayoungPlottingRoom/LeeDayoungPlottingRoomMobile.css';

// 이미지 임포트
import leedayoungWork2_01 from '../../../../assets/이다영/leedayoung_motiondesign_work2_01.webp';
import leedayoungWork2_02 from '../../../../assets/이다영/leedayoung_motiondesign_work2_02.webp';
import leedayoungWork2_03 from '../../../../assets/이다영/leedayoung_motiondesign_work2_03.webp';
import leedayoungWork2_04 from '../../../../assets/이다영/leedayoung_motiondesign_work2_04.webp';
import leedayoungWork2_05 from '../../../../assets/이다영/leedayoung_motiondesign_work2_05.webp';
import leedayoungWork2_06 from '../../../../assets/이다영/leedayoung_motiondesign_work2_06.webp';
import leedayoungWork2_07 from '../../../../assets/이다영/leedayoung_motiondesign_work2_07.webp';
import leedayoungWork2_08 from '../../../../assets/이다영/leedayoung_motiondesign_work2_08.webp';
import leedayoungWork2_09 from '../../../../assets/이다영/leedayoung_motiondesign_work2_09.webp';

/**
 * 이다영 - 플롯팅룸 (작품2) Mobile 버전
 * Figma 디자인 기반 구현 (375px)
 */
const LeeDayoungPlottingRoomMobile = ({ work, designer, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--leedayoung-plottingroom-mobile">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--leedayoung-plottingroom-mobile">
        <div className="work-detail__hero-image-wrapper work-detail__hero-image-wrapper--leedayoung-plottingroom-mobile">
          <img
            src={leedayoungWork2_01}
            alt={work.title || '플롯팅룸'}
            className="work-detail__hero-image"
            onError={(e) => handleImageError(e, leedayoungWork2_01, work.id, 'hero')}
            loading="eager"
          />
        </div>
        <div className="work-detail__hero-content work-detail__hero-content--leedayoung-plottingroom-mobile">
          <div className="work-detail__text-group">
            <h2 className="work-detail__title work-detail__title--leedayoung-plottingroom-mobile">
              플롯팅룸
            </h2>
            <div className="work-detail__lead work-detail__lead--leedayoung-plottingroom-mobile">
              <p className="mb-0">분야를 넘나드는 다양한 작가들이 매회</p>
              <p className="mb-0">새로운 조합으로 모여 자신의 작품과 글쓰기 과정, 그리고 좋아하는 소재에 대해 깊이</p>
              <p className="mb-0">이야기를 나누며, 한 회차의 마지막에는</p>
              <p className="mb-0">즉석에서 새로운 이야기를 창작해 선보이는 가상의 토크 예능 &lt;플롯팅룸&gt;의</p>
              <p>타이틀 시퀀스 제작한 프로젝트이다.</p>
            </div>
          </div>
          {ctas && Array.isArray(ctas) && ctas.length > 0 && (
            <div className="work-detail__ctas work-detail__ctas--leedayoung-plottingroom-mobile">
              {ctas.map(({ label, onClick, variant = 'primary' }) => (
                <button
                  key={label}
                  type="button"
                  className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'} work-detail__cta--leedayoung-plottingroom-mobile`}
                  onClick={onClick}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Text Section */}
      <section className="work-detail__section work-detail__text-section work-detail__text-section--leedayoung-plottingroom-mobile">
        <div className="work-detail__text-section-header">
          <p className="work-detail__text-section-label">Title Sequence</p>
          <h3 className="work-detail__text-section-title">PLOTTING ROOM</h3>
        </div>
        <div className="work-detail__text-section-description">
          <p className="mb-0">'플롯팅룸(Plotting Room)'은 Plot-ting: 이야기를 짜는 / Float-ing: 이야기가 떠다니는 /</p>
          <p className="mb-0">Flirt-ing: 이야기로 사람을 매료시키는 방이라는 다층적 의미를 담고 있다.</p>
          <p className="mb-0">&nbsp;</p>
          <p className="mb-0">이러한 제목의 의미와 프로그램의 콘셉트를</p>
          <p className="mb-0">시각적으로 표현하기 위해, 다양한 시대와</p>
          <p className="mb-0">방식으로 이야기를 만들어가는 작가들의 모습을 그리고, 그들이 써 내려간 이야기들이 실사처럼</p>
          <p className="mb-0">살아 움직이는 장면을 연출하였다. 작가들의</p>
          <p className="mb-0">소통과 창작의 순간들이 모여 또 하나의 서사를</p>
          <p className="mb-0">이루고, 그 서사로 방이 채워지는 과정을 통해</p>
          <p className="mb-0">프로그램의 주제를 완성하고자 하였다.</p>
          <p className="mb-0"> </p>
          <p className="mb-0">전반적인 장면은 2D로 구성하여 서정적인</p>
          <p className="mb-0">분위기를 구현하였다. 평면적인 화면에서도</p>
          <p className="mb-0">밀도가 느껴지도록 그레인 그라데이션, 양감,</p>
          <p className="mb-0">텍처링에 중점을 두었다. 타이틀 레터링은 토크 예능의 경쾌함을 담되, 전체 시퀀의 서정적인</p>
          <p className="mb-0">톤과 조화를 이루며 프로그램의 개성을</p>
          <p>시각적으로 드러내고자 하였다.</p>
        </div>
      </section>

      {/* Marquee Section - Empty */}
      <section className="work-detail__section work-detail__marquee work-detail__marquee--leedayoung-plottingroom-mobile">
        {/* 비어있는 섹션 */}
      </section>

      {/* Feature Cards Section - SCENE #01, #02, #03 */}
      <ul className="work-detail__section work-detail__cards work-detail__cards--leedayoung-plottingroom-mobile">
        <li className="work-detail__card work-detail__card--leedayoung-plottingroom-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={leedayoungWork2_02}
              alt="SCENE #01"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, leedayoungWork2_02, work.id, 'card-scene-01')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">SCENE #01</h5>
            <p className="work-detail__card-description">원고지와 만년필, 손으로 글을 써내려가는 모습이 나타난다.</p>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--leedayoung-plottingroom-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={leedayoungWork2_03}
              alt="SCENE #02"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, leedayoungWork2_03, work.id, 'card-scene-02')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">SCENE #02</h5>
            <div className="work-detail__card-description">
              <p className="mb-0">타자기로 글을 써내려가는 모습으로</p>
              <p>변화한다.</p>
            </div>
          </div>
        </li>
        <li className="work-detail__card work-detail__card--leedayoung-plottingroom-mobile">
          <div className="work-detail__card-image-wrapper">
            <img
              src={leedayoungWork2_04}
              alt="SCENE #03"
              className="work-detail__card-image"
              onError={(e) => handleImageError(e, leedayoungWork2_04, work.id, 'card-scene-03')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__card-text">
            <h5 className="work-detail__card-title">SCENE #03</h5>
            <div className="work-detail__card-description">
              <p className="mb-0">노트북 키보드로 글을 써내려가는 모습이</p>
              <p>보여진다.</p>
            </div>
          </div>
        </li>
      </ul>

      {/* Feature Rows Section 1 */}
      <ul className="work-detail__section work-detail__feature-rows work-detail__feature-rows--leedayoung-plottingroom-mobile-1">
        <li className="work-detail__feature-row work-detail__feature-row--leedayoung-plottingroom-mobile">
          <div className="work-detail__feature-image-wrapper">
            <img
              src={leedayoungWork2_05}
              alt="작가들의 글이 토리보드 속으로"
              className="work-detail__feature-image"
              onError={(e) => handleImageError(e, leedayoungWork2_05, work.id, 'feature-1')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-content">
            <div className="work-detail__text-group">
              <h4 className="work-detail__feature-title">작가들의 글이 토리보드 속으로</h4>
              <div className="work-detail__feature-description">
                <p>자신의 방식대로 써내려간 글들이 토리보드 속으로 하나 둘 자리잡으며 작가들이 글로 하여금 하나의 새로운 세상을 창조해내는 모습을 보여준다.</p>
              </div>
            </div>
          </div>
        </li>
        <li className="work-detail__feature-row work-detail__feature-row--leedayoung-plottingroom-mobile">
          <div className="work-detail__feature-image-wrapper">
            <img
              src={leedayoungWork2_06}
              alt="토리보드 속 인물들이 살아움직이는"
              className="work-detail__feature-image"
              onError={(e) => handleImageError(e, leedayoungWork2_06, work.id, 'feature-2')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-content">
            <div className="work-detail__text-group">
              <h4 className="work-detail__feature-title">토리보드 속 인물들이 살아 움직이는</h4>
              <div className="work-detail__feature-description">
                <p>토리보드를 통해 생명력을 갖게된 인물들이 살아움직이며 청춘 멜로드라마의 한 장면으로 보여진다.</p>
              </div>
            </div>
          </div>
        </li>
      </ul>

      {/* Feature Rows Section 2 */}
      <ul className="work-detail__section work-detail__feature-rows work-detail__feature-rows--leedayoung-plottingroom-mobile-2">
        <li className="work-detail__feature-row work-detail__feature-row--leedayoung-plottingroom-mobile">
          <div className="work-detail__feature-image-wrapper">
            <img
              src={leedayoungWork2_07}
              alt="다양한 분야와"
              className="work-detail__feature-image"
              onError={(e) => handleImageError(e, leedayoungWork2_07, work.id, 'feature-3')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-content">
            <div className="work-detail__text-group">
              <h4 className="work-detail__feature-title">다양한 분야와</h4>
              <div className="work-detail__feature-description">
                <p>장면이 전환되며 추리 예능의 한 장면으로 변화하고,</p>
              </div>
            </div>
          </div>
        </li>
        <li className="work-detail__feature-row work-detail__feature-row--leedayoung-plottingroom-mobile">
          <div className="work-detail__feature-image-wrapper">
            <img
              src={leedayoungWork2_08}
              alt="다양한 장르의 이야기로"
              className="work-detail__feature-image"
              onError={(e) => handleImageError(e, leedayoungWork2_08, work.id, 'feature-4')}
              loading="lazy"
            />
          </div>
          <div className="work-detail__feature-content">
            <div className="work-detail__text-group">
              <h4 className="work-detail__feature-title">다양한 장르의 이야기로</h4>
              <p className="work-detail__feature-description">또 다시 판타지 영화의 한 장면로 변화하며 작가로부터 생명력을 얻게된 다양한 분야와 장르의 이야기들이 보여진다.</p>
            </div>
          </div>
        </li>
      </ul>

      {/* Final Feature Section */}
      <section className="work-detail__section work-detail__feature work-detail__feature--leedayoung-plottingroom-mobile">
        <div className="work-detail__feature-image-wrapper">
          <img
            src={leedayoungWork2_09}
            alt="작가들의 소통과 창작의 순간들이 모여"
            className="work-detail__feature-image"
            onError={(e) => handleImageError(e, leedayoungWork2_09, work.id, 'feature-final')}
            loading="lazy"
          />
        </div>
        <div className="work-detail__feature-text">
          <h4 className="work-detail__feature-title">작가들의 소통과 창작의 순간들이 모여</h4>
          <div className="work-detail__feature-description">
            <p>이런 작가들이 한 방에 모여 이야기를 나누며 또 하나의 서사를 이루고, 그 서사들로 채워진 방은, 비로소 &lt;플롯팅룸&gt;이 된다.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeeDayoungPlottingRoomMobile;
