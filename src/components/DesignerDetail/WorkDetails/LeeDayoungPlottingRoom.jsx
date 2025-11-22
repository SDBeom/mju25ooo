import React from 'react';
import './LeeDayoungPlottingRoom.css';
import '../DesignerShowcase.css';

// 이미지 임포트 (나중에 실제 이미지로 교체)
const img01 = 'https://www.figma.com/api/mcp/asset/b7e0b60c-ca7a-494f-8ef9-f7a61dcb6919';
const img02 = 'https://www.figma.com/api/mcp/asset/a8f90369-7e9f-4d86-9c4f-89a4177089cb';
const img03 = 'https://www.figma.com/api/mcp/asset/62290536-b2ca-444b-a240-e8bed73c4e2f';
const img04 = 'https://www.figma.com/api/mcp/asset/a04e28c6-6c4f-4e3b-afbc-0d6df5e67ea1';
const img05 = 'https://www.figma.com/api/mcp/asset/0fff2c13-b266-49bb-a2bb-3dc99cffdf4f';
const img06 = 'https://www.figma.com/api/mcp/asset/0184e3be-9e4d-4d54-8c36-c1f226a9f689';
const img07 = 'https://www.figma.com/api/mcp/asset/a1de8d86-37d0-445c-97e7-d3362146243d';
const img08 = 'https://www.figma.com/api/mcp/asset/75aaf277-57dc-477c-ae96-625340dc0c2c';
const img09 = 'https://www.figma.com/api/mcp/asset/71420d8f-91ee-493b-9133-e9dbeb14548f';

/**
 * 이다영 작품 2 (플롯팅룸) 전용 레이아웃 컴포넌트
 * Figma 디자인에 맞춘 구조 - 데스크탑 모드, 수치와 사이즈 그대로
 */
const LeeDayoungPlottingRoom = ({ work, designer, badgeSrc, badgeAlt, ctas }) => {
  if (!work || !designer) {
    return null;
  }

  return (
    <div className="work-detail work-detail--plotting-room">
      {/* Hero Section */}
      <section className="work-detail__section work-detail__hero work-detail__hero--plotting-room">
        <div className="work-detail__hero-content">
          <div className="work-detail__hero-text">
            <div className="work-detail__text-group">
              <div className="work-detail__eyebrow">
                {badgeSrc && <img src={badgeSrc} alt={badgeAlt || work.genre || designer.role || 'Content'} />}
                <span className="work-detail__eyebrow-text">{work.genre || designer.role || 'Content'}</span>
              </div>
              <h2 className="work-detail__title">{work.title || '플롯팅룸'}</h2>
              {work.meta && (
                <p className="work-detail__meta">{work.meta}</p>
              )}
              <p className="work-detail__lead">
                분야를 넘나드는 다양한 작가들이 매회 새로운 조합으로 모여 자신의 작품과 글쓰기 과정, 그리고 좋아하는 소재에 대해 깊이 이야기를 나누며, 한 회차의 마지막에는 즉석에서 새로운 이야기를 창작해 선보이는 가상의 토크 예능 &lt;플롯팅룸&gt;의 타이틀 시퀀스를 제작한 프로젝트이다.
              </p>
            </div>
            <div className="work-detail__ctas">
              {ctas && Array.isArray(ctas) && ctas.length > 0 ? (
                ctas.map(({ label, onClick, variant = 'primary' }, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`work-detail__cta work-detail__cta--${variant === 'secondary' ? 'secondary' : 'primary'}`}
                    onClick={onClick}
                  >
                    {label}
                  </button>
                ))
              ) : (
                <>
                  <button type="button" className="work-detail__cta work-detail__cta--primary">
                    디자이너의 다른 작품
                  </button>
                  <button type="button" className="work-detail__cta work-detail__cta--secondary">
                    개인 SNS
                  </button>
                </>
              )}
            </div>
          </div>
          {work.thumbnail && (
            <div className="work-detail__hero-media">
              <img src={work.thumbnail} alt={`${work.title || '작품'} 대표 장면`} loading="lazy" />
            </div>
          )}
        </div>
      </section>

      {/* Text Section 1 */}
      <section className="plotting-room__text-section">
        <div className="plotting-room__text-header">
          <p className="plotting-room__text-label">Title Sequence</p>
          <h3 className="plotting-room__text-title">PLOTTING ROOM</h3>
        </div>
        <div className="plotting-room__text-content">
          <p>&lsquo;플롯팅룸(Plotting Room)&rsquo;은 Plot-ting: 이야기를 짜는 / Float-ing: 이야기가 떠다니는 / Flirt-ing: 이야기로 사람을 매료시키는 방이라는 다층적 의미를</p>
          <p>담고 있다.</p>
          <p>&nbsp;</p>
          <p>이러한 제목의 의미와 프로그램의 콘셉트를 시각적으로 표현하기 위해, 다양한 시대와 방식으로 이야기를 만들어가는 작가들의 모습을 그리고, 그들이</p>
          <p>써 내려간 이야기들이 실사처럼 살아 움직이는 장면을 연출하였다. 작가들의 소통과 창작의 순간들이 모여 또 하나의 서사를 이루고, 그 서사로 방이 채워지는 과정을 통해 프로그램의 주제를 완성하고자 하였다.</p>
          <p>&nbsp;</p>
          <p>전반적인 장면은 2D로 구성하여 서정적인 분위기를 구현하였다. 평면적인 화면에서도 밀도가 느껴지도록 그레인 그라데이션, 양감, 텍스처링에 중점을</p>
          <p>두었다. 타이틀 레터링은 토크 예능의 경쾌함을 담되, 전체 시퀀스의 서정적인 톤과 조화를 이루며 프로그램의 개성을 시각적으로 드러내고자 하였다.</p>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="plotting-room__cards-section">
        <ul className="plotting-room__cards-list">
          <li className="plotting-room__card">
            <div className="plotting-room__card-image">
              <img src={work.gallery?.[0]?.src || img02} alt="SCENE #01" loading="lazy" />
            </div>
            <div className="plotting-room__card-text">
              <h5 className="plotting-room__card-title">SCENE #01</h5>
              <p className="plotting-room__card-description">원고지와 만년필, 손으로 글을 써내려가는 모습이 나타난다.</p>
            </div>
          </li>
          <li className="plotting-room__card">
            <div className="plotting-room__card-image">
              <img src={work.gallery?.[1]?.src || img03} alt="SCENE #02" loading="lazy" />
            </div>
            <div className="plotting-room__card-text">
              <h5 className="plotting-room__card-title">SCENE #02</h5>
              <p className="plotting-room__card-description">타자기로 글을 써내려가는 모습으로 변화한다.</p>
            </div>
          </li>
          <li className="plotting-room__card">
            <div className="plotting-room__card-image">
              <img src={work.gallery?.[2]?.src || img04} alt="SCENE #03" loading="lazy" />
            </div>
            <div className="plotting-room__card-text">
              <h5 className="plotting-room__card-title">SCENE #03</h5>
              <p className="plotting-room__card-description">노트북 키보드로 글을 써내려가는 모습이</p>
              <p className="plotting-room__card-description">보여진다.</p>
            </div>
          </li>
        </ul>
      </section>

      {/* Feature Rows Section 1 */}
      <section className="plotting-room__feature-section">
        <ul className="plotting-room__feature-list">
          <li className="plotting-room__feature-row">
            <div className="plotting-room__feature-content">
              <div className="plotting-room__feature-text">
                <h4 className="plotting-room__feature-title">작가들의 글이 스토리보드 속으로</h4>
                <p className="plotting-room__feature-description">자신의 방식대로 써내려간 글들이 스토리보드 속으로 하나 둘 자리잡으며 작가들이 글로 하여금 하나의 새로운 세상을 창조해내는 모습을 보여준다.</p>
              </div>
            </div>
            <div className="plotting-room__feature-image">
              <img src={work.gallery?.[3]?.src || img05} alt="작가들의 글이 스토리보드 속으로" loading="lazy" />
            </div>
          </li>
          <li className="plotting-room__feature-row">
            <div className="plotting-room__feature-image">
              <img src={work.gallery?.[4]?.src || img06} alt="스토리보드 속 인물들이 살아움직이는" loading="lazy" />
            </div>
            <div className="plotting-room__feature-content">
              <div className="plotting-room__feature-text">
                <h4 className="plotting-room__feature-title">스토리보드 속 인물들이 살아움직이는</h4>
                <p className="plotting-room__feature-description">스토리보드를 통해 생명력을 갖게된 인물들이 살아움직이며 청춘</p>
                <p className="plotting-room__feature-description">멜로드라마의 한 장면으로 보여진다.</p>
              </div>
            </div>
          </li>
        </ul>
      </section>

      {/* Feature Rows Section 2 */}
      <section className="plotting-room__feature-section">
        <ul className="plotting-room__feature-list">
          <li className="plotting-room__feature-row">
            <div className="plotting-room__feature-content">
              <div className="plotting-room__feature-text">
                <h4 className="plotting-room__feature-title">다양한 분야와</h4>
                <p className="plotting-room__feature-description">장면이 전환되며 추리 예능의 한 장면으로 변화하고,</p>
              </div>
            </div>
            <div className="plotting-room__feature-image">
              <img src={work.gallery?.[5]?.src || img07} alt="다양한 분야와" loading="lazy" />
            </div>
          </li>
          <li className="plotting-room__feature-row">
            <div className="plotting-room__feature-image">
              <img src={work.gallery?.[6]?.src || img08} alt="다양한 장르의 이야기로" loading="lazy" />
            </div>
            <div className="plotting-room__feature-content">
              <div className="plotting-room__feature-text">
                <h4 className="plotting-room__feature-title">다양한 장르의 이야기로</h4>
                <p className="plotting-room__feature-description">또 다시 판타지 영화의 한 장면로 변화하며 작가로부터 생명력을 얻게된</p>
                <p className="plotting-room__feature-description">다양한 분야와 장르의 이야기들이 보여진다.</p>
              </div>
            </div>
          </li>
        </ul>
      </section>

      {/* Final Feature Section */}
      <section className="plotting-room__final-section">
        <div className="plotting-room__final-image">
          <img src={work.gallery?.[7]?.src || img09} alt="작가들의 소통과 창작의 순간들이 모여" loading="lazy" />
        </div>
        <div className="plotting-room__final-text">
          <h4 className="plotting-room__final-title">작가들의 소통과 창작의 순간들이 모여</h4>
          <p className="plotting-room__final-description">이런 작가들이 한 방에 모여 이야기를 나누며 또 하나의 서사를 이루고, 그 서사들로 채워진 방은, 비로소 &lt;플롯팅룸&gt;이 된다.</p>
        </div>
      </section>
    </div>
  );
};

export default LeeDayoungPlottingRoom;

