import React from 'react';
import './MainContent.css';

const MainContent = ({ position }) => {
  return (
    <main 
      className="main-content"
      style={{
        transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      {/* 메인 타이틀 섹션 */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-main">졸업전시 2025</span>
            <span className="title-sub">2025 명지대학교 졸업전시 영상 애니메이션 다지안 전공</span>
          </h1>
          
          <div className="hero-description">
            <p>창의적인 영상과 애니메이션 작품을 만나보세요</p>
            <p>졸업생들의 노력과 열정이 담긴 작품들을 소개합니다</p>
          </div>
          
          <div className="hero-actions">
            <button className="cta-button primary" onClick={() => {
              window.history.pushState({}, '', '/works');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}>
              <span>작품 둘러보기</span>
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button className="cta-button secondary" onClick={() => {
              window.history.pushState({}, '', '/designer');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}>
              <span>디자이너 소개</span>
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* 탐색 안내 */}
      <div className="exploration-hint">
        <div className="hint-content">
          <p>클릭 앤 드래그하여 탐색하세요</p>
          <div className="hint-arrows">
            <span>← → ↑ ↓</span>
          </div>
        </div>
      </div>

      {/* 배경 패턴 */}
      <div className="background-pattern">
        <div className="pattern-circle circle-1"></div>
        <div className="pattern-circle circle-2"></div>
        <div className="pattern-circle circle-3"></div>
        <div className="pattern-dots"></div>
      </div>
    </main>
  );
};

export default MainContent;