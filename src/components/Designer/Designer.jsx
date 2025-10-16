import React, { useState } from 'react';
import { useBreakpointContext } from '../../contexts/BreakpointContext';
import Header from '../Header/Header';
import './Designer.css';

// 디자이너 데이터 (가나다순으로 정렬)
const DESIGNERS = [
  { 
    id: 1, 
    name: '김윤정', 
    role: 'UI/UX Designer', 
    description: '사용자 중심의 직관적인 디자인을 추구합니다.',
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Principle'],
    projects: ['모바일 뱅킹 앱 리디자인', '전자상거래 플랫폼 UX 개선'],
    email: 'kimyunjung@mju.ac.kr'
  },
  { 
    id: 2, 
    name: '김재은', 
    role: 'Graphic Designer', 
    description: '브랜드 아이덴티티와 시각 커뮤니케이션에 특화되어 있습니다.',
    skills: ['Photoshop', 'Illustrator', 'InDesign', 'After Effects'],
    projects: ['브랜드 아이덴티티 개발', '프로모션 디자인'],
    email: 'kimjaeeun@mju.ac.kr'
  },
  { 
    id: 3, 
    name: '김지나', 
    role: 'Motion Designer', 
    description: '동적인 시각 요소로 스토리를 전달합니다.',
    skills: ['After Effects', 'Cinema 4D', 'Blender', 'Premiere Pro'],
    projects: ['브랜드 모션 그래픽', 'UI 애니메이션'],
    email: 'kimjina@mju.ac.kr'
  },
  { 
    id: 4, 
    name: '김채영', 
    role: 'Web Designer', 
    description: '반응형 웹 디자인과 사용자 경험에 집중합니다.',
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Figma'],
    projects: ['기업 웹사이트 리뉴얼', '포트폴리오 웹사이트'],
    email: 'kimchaeyoung@mju.ac.kr'
  },
  { 
    id: 5, 
    name: '도티안홍', 
    role: 'Creative Director', 
    description: '창의적 비전과 전략적 사고로 프로젝트를 이끕니다.',
    skills: ['Creative Strategy', 'Team Management', 'Project Planning'],
    projects: ['종합 브랜딩 캠페인', '크리에이티브 디렉션'],
    email: 'dotianhong@mju.ac.kr'
  },
  { 
    id: 6, 
    name: '박진아', 
    role: 'Brand Designer', 
    description: '브랜드의 가치를 시각적으로 구현하는 전문가입니다.',
    skills: ['Brand Strategy', 'Logo Design', 'Visual Identity'],
    projects: ['스타트업 브랜딩', '브랜드 가이드라인 제작'],
    email: 'parkjina@mju.ac.kr'
  },
  { 
    id: 7, 
    name: '박해인', 
    role: 'UI Designer', 
    description: '사용자 인터페이스의 아름다움과 기능성을 균형있게 구현합니다.',
    skills: ['UI Design', 'Prototyping', 'User Testing'],
    projects: ['앱 UI/UX 디자인', '디자인 시스템 구축'],
    email: 'parkhaein@mju.ac.kr'
  },
  { 
    id: 8, 
    name: '박희찬', 
    role: 'Visual Designer', 
    description: '시각적 언어로 복잡한 정보를 명확하게 전달합니다.',
    skills: ['Infographic Design', 'Data Visualization', 'Editorial Design'],
    projects: ['정보 그래픽 디자인', '연례 보고서 디자인'],
    email: 'parkheechang@mju.ac.kr'
  },
  { 
    id: 9, 
    name: '서동범', 
    role: 'Frontend Developer', 
    description: '디자인과 개발의 경계에서 혁신적인 솔루션을 만듭니다.',
    skills: ['React', 'Vue.js', 'TypeScript', 'Node.js'],
    projects: ['파트타임 웹 애플리케이션', '졸업전시 웹사이트 개발'],
    email: 'seodongbeom@mju.ac.kr'
  },
  { 
    id: 10, 
    name: '서원준', 
    role: 'Product Designer', 
    description: '제품의 전체적인 사용자 경험을 설계합니다.',
    skills: ['Product Strategy', 'User Research', 'Service Design'],
    projects: ['제품 UX 설계', '사용자 여정 맵핑'],
    email: 'seowonjun@mju.ac.kr'
  },
  { 
    id: 11, 
    name: '송다희', 
    role: 'Illustrator', 
    description: '감성적인 일러스트레이션으로 스토리를 그려냅니다.',
    skills: ['Digital Illustration', 'Character Design', 'Storyboarding'],
    projects: ['캐릭터 디자인', '일러스트레이션 책 제작'],
    email: 'songdahui@mju.ac.kr'
  },
  { 
    id: 12, 
    name: '심성빈', 
    role: 'Interaction Designer', 
    description: '사용자와 제품 간의 상호작용을 설계합니다.',
    skills: ['Interaction Design', 'Prototyping', 'User Testing'],
    projects: ['인터랙티브 설치물', 'AR/VR 인터페이스'],
    email: 'shimsungbin@mju.ac.kr'
  },
  { 
    id: 13, 
    name: '우수민', 
    role: 'Digital Designer', 
    description: '디지털 환경에서의 창의적 표현을 추구합니다.',
    skills: ['Digital Art', '3D Design', 'Web Design'],
    projects: ['디지털 아트 전시', '웹 인터랙션 디자인'],
    email: 'woosumyn@mju.ac.kr'
  },
  { 
    id: 14, 
    name: '이가비', 
    role: 'Communication Designer', 
    description: '효과적인 커뮤니케이션을 위한 시각적 메시지를 만듭니다.',
    skills: ['Communication Strategy', 'Campaign Design', 'Social Media'],
    projects: ['소셜 캠페인 디자인', '커뮤니케이션 전략 수립'],
    email: 'leegabi@mju.ac.kr'
  },
  { 
    id: 15, 
    name: '이다영', 
    role: 'Experience Designer', 
    description: '전체적인 사용자 경험을 통합적으로 설계합니다.',
    skills: ['UX Research', 'Journey Mapping', 'Service Design'],
    projects: ['종합 UX 설계', '서비스 경험 개선'],
    email: 'leedayoung@mju.ac.kr'
  },
  { 
    id: 16, 
    name: '이운', 
    role: 'Art Director', 
    description: '창의적 방향성을 제시하고 팀을 이끌어갑니다.',
    skills: ['Art Direction', 'Creative Strategy', 'Team Leadership'],
    projects: ['종합 크리에이티브 디렉션', '아트 디렉션'],
    email: 'leeun@mju.ac.kr'
  },
  { 
    id: 17, 
    name: '이준규', 
    role: 'Service Designer', 
    description: '서비스의 전체적인 경험을 설계하고 개선합니다.',
    skills: ['Service Design', 'Design Thinking', 'Co-creation'],
    projects: ['서비스 디자인 워크샵', '서비스 경험 개선'],
    email: 'leejunkyu@mju.ac.kr'
  },
  { 
    id: 18, 
    name: '이지민', 
    role: 'Content Designer', 
    description: '콘텐츠의 시각적 표현과 사용자 경험을 연결합니다.',
    skills: ['Content Strategy', 'Editorial Design', 'Visual Storytelling'],
    projects: ['콘텐츠 전략 수립', '에디토리얼 디자인'],
    email: 'leejimin@mju.ac.kr'
  },
  { 
    id: 19, 
    name: '전기태', 
    role: 'Design Strategist', 
    description: '디자인 전략을 통해 비즈니스 목표를 달성합니다.',
    skills: ['Design Strategy', 'Business Analysis', 'Design Management'],
    projects: ['디자인 전략 수립', '비즈니스 디자인'],
    email: 'jeongkita@mju.ac.kr'
  },
  { 
    id: 20, 
    name: '전서린', 
    role: 'Packaging Designer', 
    description: '제품의 첫인상을 결정하는 패키지 디자인에 특화되어 있습니다.',
    skills: ['Package Design', '3D Modeling', 'Brand Application'],
    projects: ['제품 패키지 디자인', '브랜드 패키지 시스템'],
    email: 'jeonseorin@mju.ac.kr'
  },
  { 
    id: 21, 
    name: '정지민', 
    role: 'Color Designer', 
    description: '색채의 심리학적 효과를 활용한 디자인을 만듭니다.',
    skills: ['Color Theory', 'Color Psychology', 'Brand Colors'],
    projects: ['브랜드 컬러 시스템', '색채 전략 수립'],
    email: 'jungjimin@mju.ac.kr'
  },
  { 
    id: 22, 
    name: '조하늘', 
    role: 'Typography Designer', 
    description: '타이포그래피를 통해 메시지의 강도를 조절합니다.',
    skills: ['Typography', 'Font Design', 'Lettering'],
    projects: ['타이포그래피 디자인', '폰트 디자인'],
    email: 'johaneul@mju.ac.kr'
  },
  { 
    id: 23, 
    name: '허지훈', 
    role: 'Design System Designer', 
    description: '일관성 있는 디자인 시스템을 구축하고 관리합니다.',
    skills: ['Design Systems', 'Component Library', 'Design Tokens'],
    projects: ['디자인 시스템 구축', '컴포넌트 라이브러리 개발'],
    email: 'heojihun@mju.ac.kr'
  },
  { 
    id: 24, 
    name: '안선민', 
    role: 'User Researcher', 
    description: '사용자 관점에서 디자인 문제를 해결합니다.',
    skills: ['User Research', 'Usability Testing', 'Data Analysis'],
    projects: ['사용자 리서치', '사용성 테스트'],
    email: 'anseonmin@mju.ac.kr'
  }
].sort((a, b) => a.name.localeCompare(b.name, 'ko', { sensitivity: 'base' }));

const Designer = () => {
  const { isMobile } = useBreakpointContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDesigners, setFilteredDesigners] = useState(DESIGNERS);

  const handleContactClick = (email) => {
    window.open(`mailto:${email}`, '_blank');
  };

  const handleBackToMain = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleDesignerClick = (designer, e) => {
    e.preventDefault();
    e.stopPropagation();
    const encodedName = encodeURIComponent(designer.name);
    window.history.pushState({}, '', `/designer/${encodedName}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredDesigners(DESIGNERS);
    } else {
      const filtered = DESIGNERS.filter(designer => 
        designer.name.toLowerCase().includes(term.toLowerCase()) ||
        designer.role.toLowerCase().includes(term.toLowerCase()) ||
        designer.skills.some(skill => skill.toLowerCase().includes(term.toLowerCase()))
      );
      setFilteredDesigners(filtered);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredDesigners(DESIGNERS);
  };

  return (
    <>
      <Header />
      <div className="designer-page">
        <div className="back-to-main">
          <button onClick={handleBackToMain} className="back-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{isMobile ? '메인' : '메인으로 돌아가기'}</span>
          </button>
        </div>
        <div className="designer-container">
          <section className="page-header">
            <h1 className="page-title">디자이너 소개</h1>
            <p className="page-subtitle">
              {isMobile ? '2025 MJU MCD' : '2025 명지대학교 졸업전시 영상 애니메이션 디자인 전공 졸업생들'}
            </p>
            <div className="designer-count">
              {isMobile ? '' : '총 '}
              <span className="count-number">{filteredDesigners.length}</span>
              {isMobile ? '명' : '명의 디자이너'}
              {searchTerm && <span className="search-result"> {isMobile ? '(검색)' : '(검색 결과)'}</span>}
            </div>
          </section>

          <section className="search-section">
            <div className="search-container">
              <div className="search-input-wrapper">
                <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <input
                  type="text"
                  placeholder={isMobile ? '검색...' : '디자이너 이름, 역할, 스킬로 검색하세요...'}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="search-input"
                />
                {searchTerm && (
                  <button onClick={clearSearch} className="clear-button">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </section>

          <section className="designers-grid">
            {filteredDesigners.length > 0 ? (
              filteredDesigners.map((designer) => (
              <div 
                key={designer.id} 
                className="designer-card"
                onClick={(e) => handleDesignerClick(designer, e)}
              >
                <div className="designer-avatar">
                  <div className="avatar-placeholder">
                    <span className="avatar-name">{designer.name}</span>
                  </div>
                </div>
                <div className="designer-info">
                  <h3 className="designer-name">{designer.name}</h3>
                  <p className="designer-role">{designer.role}</p>
                  <p className="designer-description">{designer.description}</p>
                </div>
                <div className="designer-actions">
                  <button className="contact-btn" onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleContactClick(designer.email);
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2"/>
                      <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    Contact
                  </button>
                </div>
              </div>
            ))
            ) : (
              <div className="no-results">
                <div className="no-results-content">
                  <svg className="no-results-icon" width="64" height="64" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                    <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <h3>{isMobile ? '결과 없음' : '검색 결과가 없습니다'}</h3>
                  <p>다른 키워드로 검색해보세요</p>
                  <button onClick={clearSearch} className="reset-search-btn">
                    {isMobile ? '초기화' : '검색 초기화'}
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default Designer;
