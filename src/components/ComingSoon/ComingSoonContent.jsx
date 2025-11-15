import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { useScroll, useTransform, motion } from 'framer-motion';
import Lenis from 'lenis';
import dorokImage1 from '../../assets/도록/image 2141.png';
import dorokImage2 from '../../assets/도록/image 2143.png';
import './ComingSoonContent.css';

// 비디오 파일은 public 폴더에 있으므로 절대 경로 사용
const brandingVideo = '/branding_video.mp4';

// 비디오 로드 에러 핸들링
const handleVideoError = (e) => {
  console.warn('비디오 파일을 로드할 수 없습니다:', brandingVideo);
  // 비디오가 없어도 페이지는 계속 표시됨
  e.target.style.display = 'none';
};

const ComingSoonContent = () => {
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
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <main className="about-main">
      {/* Intro Section - Parallax Background */}
      <div ref={introContainer} className="about-intro">
        <motion.div style={{ y: introY }} className="about-intro-image">
          <video autoPlay muted loop playsInline onError={handleVideoError}>
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

      {/* Brand Story Section */}
      <div className="about-brand-story">
        <h2 className="about-brand-story-title">BRAND STORY</h2>
        <h3 className="about-brand-story-subtitle">점에서 점으로 점점</h3>
        
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
      </div>

      {/* Exhibition Info Section */}
      <div className="about-exhibition-info">
        <div className="about-exhibition-header">
          <p className="about-exhibition-university">MYONGJI UNIVERSITY</p>
          <p className="about-exhibition-department">MEDIA COMMUNICATION & ANIMATION DESIGN</p>
          <p className="about-exhibition-title">24TH GRADUATION EXHIBITION</p>
        </div>

        <div className="about-exhibition-details">
          <div className="about-exhibition-location">
            <p className="about-exhibition-label">* 마루아트센터 특별관</p>
            <p className="about-exhibition-address">서울 종로구 인사동길 35-4, 35-6, B1</p>
            <p className="about-exhibition-address-en">B1, 35-4, Insadong-gil, Jongno-gu, Seoul</p>
          </div>

          <div className="about-exhibition-date">
            <p className="about-exhibition-label">* 2025. 11. 12 - 11. 17</p>
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
          <p className="about-committee-names">이윤 / 이다영 김윤정 김지나 박희찬 송다희</p>
        </div>

        <div className="about-committee-section">
          <h4 className="about-committee-title">컨텐츠팀</h4>
          <p className="about-committee-names">이가비 / 전서린 심성빈 정지민 조하늘</p>
        </div>

        <div className="about-committee-section">
          <h4 className="about-committee-title">디피팀</h4>
          <p className="about-committee-names">김재은 / 전기태 박진아 서원준 우수민</p>
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
            학생들의 창의적인 영상과 애니메이션 작품을 만나보세요.
          </p>
          <p className="about-section-title">점에서 점으로 점점</p>
        </div>
        <div className="about-section-background">
          <motion.div style={{ y: sectionY }} className="about-section-image">
            <video autoPlay muted loop playsInline onError={handleVideoError}>
              <source src={brandingVideo} type="video/mp4" />
            </video>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ComingSoonContent;
