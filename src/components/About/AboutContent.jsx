import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { useScroll, useTransform, motion } from 'framer-motion';
import Lenis from 'lenis';
import dorokImage1 from '../../assets/도록/image 2141.webp';
import dorokImage2 from '../../assets/도록/image 2143.webp';
import posterFinal from '../../assets/poster_final.webp';
import goodsList from '../../assets/GOODS.png';
import symbolBlack from '../../assets/branding_logo/02_Symbol_Black.svg';
import logotype from '../../assets/branding_logo/03_Logotype.svg';
import motif01 from '../../assets/branding_logo/기획팀 도화지/motif01.svg';
import motif02 from '../../assets/branding_logo/기획팀 도화지/motif02.svg';
import motif03 from '../../assets/branding_logo/기획팀 도화지/motif03.svg';
import gameImage from '../../assets/branding_logo/Game.png';
import motionImage from '../../assets/branding_logo/Motion.png';
import multimediaImage from '../../assets/branding_logo/Multimedia.png';
import videoImage from '../../assets/branding_logo/Video.png';
import './AboutContent.css';

// 번들 해석 이슈를 피하기 위해 Public 절대 경로만 사용
const brandingVideo = '/branding_video.mp4';

const AboutContent = () => {
  const introContainer = useRef(null);
  const sectionContainer = useRef(null);

  const introScroll = useScroll({
    target: introContainer,
    offset: ['start start', 'end start']
  });
  const introY = useTransform(introScroll.scrollYProgress, [0, 1], ["0vh", "150vh"]);

  const sectionScroll = useScroll({
    target: sectionContainer,
    offset: ["start end", 'end start']
  });
  const sectionY = useTransform(sectionScroll.scrollYProgress, [0, 1], ["-10%", "10%"]);

  useEffect(() => {
    // Lenis 사용 시 body overflow 제어
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Safari 비디오 자동재생 보장
    const videos = document.querySelectorAll('video');
    videos.forEach((video) => {
      video.play().catch((error) => {
        console.warn('비디오 자동재생 실패:', error);
      });
    });

    return () => {
      lenis.destroy();
      // 원래 overflow 값 복원
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []);

  return (
    <main className="about-main">
      {/* Intro Section - Parallax Background */}
      <div ref={introContainer} className="about-intro">
        <motion.div style={{ y: introY }} className="about-intro-image">
          <video autoPlay muted loop playsInline controls={false} preload="auto" crossOrigin="anonymous">
            <source src={brandingVideo} type="video/mp4" />
          </video>
        </motion.div>
      </div>

      {/* Description Section */}
      <div className="about-description">
        <div className="about-description-images">
          <img src={dorokImage1} alt="도록 이미지 1" className="about-description-image" />
          <img src={dorokImage2} alt="도록 이미지 2" className="about-description-image" />
        </div>
      </div>

      {/* Goods List Section */}
      <div className="about-goods-list">
        <img 
          src={goodsList} 
          alt="굿즈 리스트" 
          className="about-goods-list-image"
          onError={(e) => {
            console.error('굿즈 리스트 이미지 로드 실패:', goodsList);
            e.target.style.display = 'none';
          }}
          onLoad={() => {
            console.log('굿즈 리스트 이미지 로드 성공:', goodsList);
          }}
        />
      </div>

      {/* Brand Story Section */}
      <div className="about-brand-story">
        <div className="about-brand-story-header">
          <h2 className="about-brand-story-title">BRAND STORY</h2>
          <h3 className="about-brand-story-subtitle">점에서 점으로 점점</h3>
        </div>
        
        <div className="about-brand-story-body">
          <div className="about-brand-story-poster">
            <img src={posterFinal} alt="포스터" className="about-brand-story-poster-image" />
          </div>
          
          <div className="about-brand-story-content">
          <div className="about-brand-story-item">
            <h4 className="about-brand-story-item-title">점(에서)</h4>
            <p className="about-brand-story-item-text">
              점은 조형의 가장 작은 단위이자, 위치만을 지닌 존재입니다. 방향도 면적도 없지만, 그 자체로 시작이자 끝이며 가장 단순하면서도 가장 선명한 흔적이 됩니다. 서로 다른 경험과 언어를 품은 24개의 점은 지금, 각자의 자리에 놓여 있습니다.
            </p>
          </div>

          <div className="about-brand-story-item">
            <h4 className="about-brand-story-item-title">점(으로)</h4>
            <p className="about-brand-story-item-text">
              이 점들은 정지된 단위로 머물지 않고, 다른 점을 향해 나아갑니다. 선을 만들고, 면을 그리고, 서사를 만들며 서로를 연결합니다. 어떤 점은 예리하고 긴장된 직선을 만들고, 어떤 점은 유영하듯 부드러운 곡선을 그립니다. 그렇게 연결된 점들은 하나의 장면, 하나의 의미, 하나의 세계를 형성해 나갑니다.
            </p>
          </div>

          <div className="about-brand-story-item">
            <h4 className="about-brand-story-item-title">점(점)</h4>
            <p className="about-brand-story-item-text">
              각자의 점에서 출발한 형상들은 이제 서로를 마주하고, 관객과 마주하며 점점 변화합니다. 점과 점 사이에서 흐르는 시선과 대화, 감정과 기억이 이 전시를 완성합니다. 불확실성과 가능성 사이에서 이 점들은 점점 성장하고 진화하며, 또 다른 점을 향한 새로운 움직임을 준비합니다.
            </p>
          </div>
          </div>

          <div className="about-branding-logo-main about-branding-logo-main--inline">
          <div className="about-branding-logo-symbol">
            <img src={symbolBlack} alt="Symbol" className="about-branding-logo-symbol-image" />
            <div className="about-branding-logo-symbol-description">
              <h3 className="about-branding-logo-symbol-title">작은 시작 → 더 큰 의미/세계</h3>
              <p className="about-branding-logo-symbol-text">
                크기가 다른 세 점이 맞닿아 연결되고, 작은 시작이 큰 세계로 확장되는 과정을 단순한 형태로 상징합니다.
              </p>
            </div>
          </div>
          
          <div className="about-branding-logo-logotype">
            <img src={logotype} alt="Logotype" className="about-branding-logo-logotype-image" />
            <p className="about-branding-logo-logotype-description">
              시작 → 연결 → 확장 이를 점의 밀도와 배열 변화로 표현합니다.
            </p>
          </div>
        </div>
        </div>
      </div>

      {/* Branding Logo Section */}
      <div className="about-branding-logo">
        <div className="about-branding-logo-motifs">
          <div className="about-branding-logo-motifs-list">
            <div className="about-branding-logo-motif-item">
              <img src={motif01} alt="Motif 01 - 브러쉬" className="about-branding-logo-motif-image" />
              <p className="about-branding-logo-motif-description">
                작은 점들이 모여 흐르고 움직이는 모습을 시각화한 요소입니다.
              </p>
            </div>
            <div className="about-branding-logo-motif-item">
              <img src={motif02} alt="Motif 02 - 패턴" className="about-branding-logo-motif-image" />
              <p className="about-branding-logo-motif-description">
                점들이 서로 이어지고 반복되면서 만들어내는 질서를 표현합니다.
              </p>
            </div>
            <div className="about-branding-logo-motif-item">
              <img src={motif03} alt="Motif 03 - 프레임" className="about-branding-logo-motif-image" />
              <p className="about-branding-logo-motif-description">
                점들이 모여 특정한 형태를 이루고, 그 안에 이야기를 담는 기능을 합니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Descriptions Section */}
      <div className="about-category-descriptions">
        <div className="about-category-descriptions-header">
          <h2 className="about-category-descriptions-title">CATEGORIES</h2>
        </div>
        
        <div className="about-category-descriptions-list">
          <div className="about-category-description-item">
            <div className="about-category-description-image-wrapper">
              <img src={gameImage} alt="GAME CONTENT DESIGN" className="about-category-description-image" />
            </div>
            <div className="about-category-description-content">
              <p className="about-category-description-text">
                게임 디자인은 플레이어를 온전히 몰입시키는 정교한 세계관을 구축하는 일입니다. G의 색상은 외부의 모든 것을 차단하는 완전한 몰입을 상징합니다. G는 어둠 속에서 점처럼 흩어진 이야기와 인물들이 하나의 거대한 흐름으로 연결되며, 플레이어를 그 세계의 중심으로 이끄는 강력한 소용돌이로 형상화했습니다.
              </p>
            </div>
          </div>

          <div className="about-category-description-item">
            <div className="about-category-description-image-wrapper">
              <img src={motionImage} alt="MOTION DESIGN" className="about-category-description-image" />
            </div>
            <div className="about-category-description-content">
              <p className="about-category-description-text">
                모션디자인에서 하나의 점은 결정적인 순간을 담은 키프레임입니다. 순수하고 밝은 바탕색은 이 모든 움직임이 그려지는 캔버스를 상징합니다. M은 이 깨끗한 캔버스 위에서 핵심 키프레임(점)들이 정교하게 연결되어, 방해 없이 오직 움직임의 본질만으로 하나의 완성된 리듬감을 만들어내는 과정을 보여줍니다.
              </p>
            </div>
          </div>

          <div className="about-category-description-item">
            <div className="about-category-description-image-wrapper">
              <img src={multimediaImage} alt="MULTI MEDIA DESIGN" className="about-category-description-image" />
            </div>
            <div className="about-category-description-content">
              <p className="about-category-description-text">
                각각의 점은 고유한 특성을 지닌 하나의 매체를 상징합니다. 멀티미디어의 생동감 넘치는 오렌지 컬러는 이 매체들을 융합하는 폭발적인 창의적 에너지를 의미합니다. 멀티미디어는 이 뜨거운 에너지로 점들이 경계를 허물고 조화롭게 연결되어, 다채로운 매체들이 각 부분의 총합을 뛰어넘는 역동적인 가치를 만들어내는 과정을 보여줍니다.
              </p>
            </div>
          </div>

          <div className="about-category-description-item">
            <div className="about-category-description-image-wrapper">
              <img src={videoImage} alt="VIDEO CONTENT DESIGN" className="about-category-description-image" />
            </div>
            <div className="about-category-description-content">
              <p className="about-category-description-text">
                하나의 점이 움직여 중력에 이끌려 바닥에 닿는 순간, 그 에너지는 새로운 방향으로의 도약을 이끌어냅니다. 비디오콘텐츠의 경쾌한 블루 컬러는 이 찰나의 순간에 폭발하는 생동감 넘치는 에너지 그 자체를 상징합니다. V는 이 푸른 에너지로 공이 튀어 오르며 만들어내는 '새로운 도약'의 역동적인 프레임을 형상화했습니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Exhibition Info Section */}
      <div className="about-exhibition-info">
        <div className="about-exhibition-circle"></div>
        <div className="about-exhibition-circle"></div>
        <div className="about-exhibition-circle"></div>
        <div className="about-exhibition-circle"></div>
        <div className="about-exhibition-circle"></div>
        <div className="about-exhibition-circle"></div>
        <div className="about-exhibition-circle"></div>
        <div className="about-exhibition-circle"></div>
        <div className="about-exhibition-circle"></div>
        <div className="about-exhibition-header">
          <p className="about-exhibition-university">MYONGJI UNIVERSITY</p>
          <p className="about-exhibition-department">MEDIA COMMUNICATION & ANIMATION DESIGN</p>
          <p className="about-exhibition-title">24TH GRADUATION EXHIBITION</p>
        </div>

        <div className="about-exhibition-details">
          <div className="about-exhibition-location">
            <p className="about-exhibition-label">마루아트센터 특별관</p>
            <p className="about-exhibition-address">서울 종로구 인사동길 35-4, 35-6, B1</p>
            <p className="about-exhibition-address-en">B1, 35-4, Insadong-gil, Jongno-gu, Seoul</p>
          </div>

          <div className="about-exhibition-date">
            <p className="about-exhibition-label">2025. 11. 12 - 11. 17</p>
          </div>
        </div>
      </div>

      {/* Committee Section */}
      <div className="about-committee">
        <div className="about-committee-section">
          <h4 className="about-committee-title">지도교수</h4>
          <p className="about-committee-names">김종환 유형준 임경훈 김형규</p>
        </div>

        <div className="about-committee-section">
          <h4 className="about-committee-title">위원회</h4>
          <div className="about-committee-list">
            <p><span className="about-committee-role">졸업전시 위원회 위원장</span> 김채영</p>
            <p><span className="about-committee-role">졸업전시 위원회 부위원장</span> 허지훈</p>
            <p><span className="about-committee-role">졸업전시 위원회 총무</span> 이지민</p>
          </div>
        </div>

        <div className="about-committee-section">
          <h4 className="about-committee-title">그래픽팀</h4>
          <p className="about-committee-names"><strong>이운</strong> <strong>이다영</strong> | 김윤정 김지나 박희찬 송다희</p>
        </div>

        <div className="about-committee-section">
          <h4 className="about-committee-title">컨텐츠팀</h4>
          <p className="about-committee-names"><strong>이가비</strong> <strong>전서린</strong> | 심성빈 정지민 조하늘</p>
        </div>

        <div className="about-committee-section">
          <h4 className="about-committee-title">디피팀</h4>
          <p className="about-committee-names"><strong>김재은</strong> <strong>전기태</strong> | 박진아 서원준 우수민</p>
        </div>

        <div className="about-committee-section">
          <h4 className="about-committee-title">제작팀</h4>
          <div className="about-committee-list">
            <p><span className="about-committee-role">편집디자인</span> 박해인</p>
            <p><span className="about-committee-role">웹사이트</span> 서동범</p>
            <p><span className="about-committee-role">메인영상</span> 안선민</p>
          </div>
        </div>
      </div>

      {/* Section with Text and Parallax */}
      <div
        ref={sectionContainer} 
        className="about-section"
      >
        <div className="about-section-content">
          <p className="about-section-text">
            학생들의 창의적인 작품을 만나보세요.
          </p>
          <div className="about-section-button-wrapper">
            <a href="/works" className="about-section-button">
              작품보러가기
            </a>
          </div>
        </div>
        <div className="about-section-background">
          <motion.div style={{ y: sectionY }} className="about-section-image">
            <video autoPlay muted loop playsInline controls={false} preload="auto" crossOrigin="anonymous">
              <source src={brandingVideo} type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default AboutContent;

