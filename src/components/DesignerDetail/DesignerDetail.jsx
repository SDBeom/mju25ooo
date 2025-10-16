import React, { useState, useEffect } from 'react';
import './DesignerDetail.css';

// 디자이너 데이터
const DESIGNERS = [
  { 
    id: 1, 
    name: '김윤정', 
    role: 'UI/UX Designer', 
    description: '사용자 중심의 직관적인 디자인을 추구합니다.',
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Principle'],
    projects: ['모바일 뱅킹 앱 리디자인', '전자상거래 플랫폼 UX 개선'],
    email: 'kimyunjung@mju.ac.kr',
    portfolio: 'https://portfolio.kimyunjung.com',
    instagram: 'https://instagram.com/kimyunjung_design'
  },
  { 
    id: 2, 
    name: '김재은', 
    role: 'Graphic Designer', 
    description: '브랜드 아이덴티티와 시각 커뮤니케이션에 특화되어 있습니다.',
    skills: ['Photoshop', 'Illustrator', 'InDesign', 'After Effects'],
    projects: ['브랜드 아이덴티티 개발', '프로모션 디자인'],
    email: 'kimjaeeun@mju.ac.kr',
    portfolio: 'https://portfolio.kimjaeeun.com',
    instagram: 'https://instagram.com/kimjaeeun_design'
  },
  { 
    id: 3, 
    name: '김지나', 
    role: 'Motion Designer', 
    description: '동적인 시각 요소로 스토리를 전달합니다.',
    skills: ['After Effects', 'Cinema 4D', 'Blender', 'Premiere Pro'],
    projects: ['브랜드 모션 그래픽', 'UI 애니메이션'],
    email: 'kimjina@mju.ac.kr',
    portfolio: 'https://portfolio.kimjina.com',
    instagram: 'https://instagram.com/kimjina_motion'
  },
  { 
    id: 4, 
    name: '김채영', 
    role: 'Web Designer', 
    description: '반응형 웹 디자인과 사용자 경험에 집중합니다.',
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Figma'],
    projects: ['기업 웹사이트 리뉴얼', '포트폴리오 웹사이트'],
    email: 'kimchaeyoung@mju.ac.kr',
    portfolio: 'https://portfolio.kimchaeyoung.com',
    instagram: 'https://instagram.com/kimchaeyoung_web'
  },
  { 
    id: 5, 
    name: '도티안홍', 
    role: 'Creative Director', 
    description: '창의적 비전과 전략적 사고로 프로젝트를 이끕니다.',
    skills: ['Creative Strategy', 'Team Management', 'Project Planning'],
    projects: ['종합 브랜딩 캠페인', '크리에이티브 디렉션'],
    email: 'dotianhong@mju.ac.kr',
    portfolio: 'https://portfolio.dotianhong.com',
    instagram: 'https://instagram.com/dotianhong_creative'
  }
];

const DesignerDetail = () => {
  const [designer, setDesigner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // URL에서 디자이너 이름 추출
    const fullPath = window.location.href;
    const pathWithoutQuery = fullPath.split('?')[0];
    const pathParts = pathWithoutQuery.replace(window.location.origin, '').split('/');
    const encodedName = pathParts[2];
    const designerName = encodedName ? decodeURIComponent(encodedName) : '';
    
    // 디자이너 찾기
    const foundDesigner = DESIGNERS.find(d => d.name === designerName);
    setDesigner(foundDesigner);
    setLoading(false);
  }, []);

  const handleBackToDesigners = () => {
    window.history.pushState({}, '', '/designer');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleContactClick = (email) => {
    window.open(`mailto:${email}`, '_blank');
  };

  const handlePortfolioClick = (url) => {
    window.open(url, '_blank');
  };

  const handleInstagramClick = (url) => {
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="designer-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!designer) {
    return (
      <div className="designer-detail-error">
        <h1>Designer Not Found</h1>
        <p>The designer you're looking for doesn't exist.</p>
        <button onClick={handleBackToDesigners} className="back-button">
          Back to Designers
        </button>
      </div>
    );
  }

  return (
    <div className="designer-detail">
      {/* 헤더 */}
      <header className="designer-detail-header">
        <button onClick={handleBackToDesigners} className="back-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Designers
        </button>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="designer-detail-main">
        <div className="designer-profile">
          {/* 프로필 이미지 */}
          <div className="designer-avatar">
            <div className="avatar-placeholder">
              <span className="avatar-initial">{designer.name.charAt(0)}</span>
            </div>
          </div>

          {/* 기본 정보 */}
          <div className="designer-info">
            <h1 className="designer-name">{designer.name}</h1>
            <h2 className="designer-role">{designer.role}</h2>
            <p className="designer-description">{designer.description}</p>
          </div>

          {/* 액션 버튼들 */}
          <div className="designer-actions">
            <button 
              onClick={() => handleContactClick(designer.email)} 
              className="action-button primary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2"/>
                <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Contact
            </button>
            
            <button 
              onClick={() => handlePortfolioClick(designer.portfolio)} 
              className="action-button secondary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Portfolio
            </button>
            
            <button 
              onClick={() => handleInstagramClick(designer.instagram)} 
              className="action-button secondary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="currentColor" strokeWidth="2"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Instagram
            </button>
          </div>
        </div>

        {/* 스킬 섹션 */}
        <section className="designer-skills">
          <h3>Skills</h3>
          <div className="skills-grid">
            {designer.skills.map((skill, index) => (
              <div key={index} className="skill-tag">
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* 프로젝트 섹션 */}
        <section className="designer-projects">
          <h3>Featured Projects</h3>
          <div className="projects-list">
            {designer.projects.map((project, index) => (
              <div key={index} className="project-item">
                <div className="project-number">{String(index + 1).padStart(2, '0')}</div>
                <div className="project-content">
                  <h4>{project}</h4>
                  <p>Detailed project description and process...</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default DesignerDetail;
