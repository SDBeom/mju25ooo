import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Designer.css';

const Designer = () => {
  const handleContactClick = (email) => {
    window.open(`mailto:${email}`, '_blank');
  };

  return (
    <>
      <Header />
      <div className="designer-page">
        <div className="designer-container">
          {/* 디자이너 소개 섹션 */}
          <section className="designer-intro">
            <div className="designer-profile">
              <div className="profile-image">
                <div className="profile-placeholder">
                  <div className="profile-graphic">
                    <div className="graphic-element graphic-1"></div>
                    <div className="graphic-element graphic-2"></div>
                    <div className="graphic-element graphic-3"></div>
                  </div>
                </div>
              </div>
              <div className="profile-info">
                <h1 className="designer-name">김 디자이너</h1>
                <p className="designer-title">UI/UX Designer & Creative Director</p>
                <p className="designer-description">
                  사용자 경험을 중심으로 한 디자인을 추구하며, 
                  기능성과 아름다움의 균형을 맞춘 솔루션을 제공합니다.
                  브랜드의 가치를 시각적으로 표현하고, 
                  사용자와 브랜드 사이의 연결고리를 만드는 것을 목표로 합니다.
                </p>
                <div className="designer-stats">
                  <div className="stat-item">
                    <span className="stat-number">5+</span>
                    <span className="stat-label">Years Experience</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">50+</span>
                    <span className="stat-label">Projects Completed</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">20+</span>
                    <span className="stat-label">Happy Clients</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 스킬 섹션 */}
          <section className="skills-section">
            <h2>Skills & Expertise</h2>
            <div className="skills-grid">
              <div className="skill-category">
                <h3>Design Tools</h3>
                <div className="skill-items">
                  <div className="skill-item">
                    <span className="skill-name">Figma</span>
                    <div className="skill-level">
                      <div className="skill-bar" style={{width: '95%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">Adobe Creative Suite</span>
                    <div className="skill-level">
                      <div className="skill-bar" style={{width: '90%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">Sketch</span>
                    <div className="skill-level">
                      <div className="skill-bar" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">Principle</span>
                    <div className="skill-level">
                      <div className="skill-bar" style={{width: '80%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="skill-category">
                <h3>Development</h3>
                <div className="skill-items">
                  <div className="skill-item">
                    <span className="skill-name">HTML/CSS</span>
                    <div className="skill-level">
                      <div className="skill-bar" style={{width: '90%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">JavaScript</span>
                    <div className="skill-level">
                      <div className="skill-bar" style={{width: '75%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">React</span>
                    <div className="skill-level">
                      <div className="skill-bar" style={{width: '70%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">Git</span>
                    <div className="skill-level">
                      <div className="skill-bar" style={{width: '85%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="skill-category">
                <h3>Design Process</h3>
                <div className="skill-items">
                  <div className="skill-item">
                    <span className="skill-name">User Research</span>
                    <div className="skill-level">
                      <div className="skill-bar" style={{width: '88%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">Wireframing</span>
                    <div className="skill-level">
                      <div className="skill-bar" style={{width: '92%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">Prototyping</span>
                    <div className="skill-level">
                      <div className="skill-bar" style={{width: '87%'}}></div>
                    </div>
                  </div>
                  <div className="skill-item">
                    <span className="skill-name">User Testing</span>
                    <div className="skill-level">
                      <div className="skill-bar" style={{width: '83%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 포트폴리오 섹션 */}
          <section className="portfolio-section">
            <h2>Featured Projects</h2>
            <div className="portfolio-grid">
              <div className="portfolio-item featured">
                <div className="portfolio-image">
                  <div className="portfolio-placeholder">
                    <div className="project-preview">
                      <div className="preview-element preview-1"></div>
                      <div className="preview-element preview-2"></div>
                      <div className="preview-element preview-3"></div>
                    </div>
                  </div>
                  <div className="portfolio-overlay">
                    <button className="view-project-btn">View Project</button>
                  </div>
                </div>
                <div className="portfolio-info">
                  <h3>E-commerce Platform Redesign</h3>
                  <p>사용자 경험을 개선한 전자상거래 플랫폼 리디자인 프로젝트</p>
                  <div className="portfolio-tags">
                    <span className="tag">UI Design</span>
                    <span className="tag">UX Research</span>
                    <span className="tag">Prototyping</span>
                  </div>
                </div>
              </div>
              
              <div className="portfolio-item">
                <div className="portfolio-image">
                  <div className="portfolio-placeholder">
                    <div className="project-preview">
                      <div className="preview-element preview-1"></div>
                      <div className="preview-element preview-2"></div>
                    </div>
                  </div>
                  <div className="portfolio-overlay">
                    <button className="view-project-btn">View Project</button>
                  </div>
                </div>
                <div className="portfolio-info">
                  <h3>Mobile Banking App</h3>
                  <p>안전하고 직관적인 모바일 뱅킹 애플리케이션 디자인</p>
                  <div className="portfolio-tags">
                    <span className="tag">Mobile Design</span>
                    <span className="tag">Fintech</span>
                    <span className="tag">Security</span>
                  </div>
                </div>
              </div>

              <div className="portfolio-item">
                <div className="portfolio-image">
                  <div className="portfolio-placeholder">
                    <div className="project-preview">
                      <div className="preview-element preview-1"></div>
                      <div className="preview-element preview-3"></div>
                    </div>
                  </div>
                  <div className="portfolio-overlay">
                    <button className="view-project-btn">View Project</button>
                  </div>
                </div>
                <div className="portfolio-info">
                  <h3>Brand Identity System</h3>
                  <p>테크 스타트업을 위한 완전한 브랜드 아이덴티티 시스템</p>
                  <div className="portfolio-tags">
                    <span className="tag">Branding</span>
                    <span className="tag">Logo Design</span>
                    <span className="tag">Visual Identity</span>
                  </div>
                </div>
              </div>

              <div className="portfolio-item">
                <div className="portfolio-image">
                  <div className="portfolio-placeholder">
                    <div className="project-preview">
                      <div className="preview-element preview-2"></div>
                      <div className="preview-element preview-3"></div>
                    </div>
                  </div>
                  <div className="portfolio-overlay">
                    <button className="view-project-btn">View Project</button>
                  </div>
                </div>
                <div className="portfolio-info">
                  <h3>Food Delivery App</h3>
                  <p>사용자 친화적인 음식 주문 및 배달 애플리케이션</p>
                  <div className="portfolio-tags">
                    <span className="tag">App Design</span>
                    <span className="tag">User Flow</span>
                    <span className="tag">Wireframing</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 연락처 섹션 */}
          <section className="contact-section">
            <h2>Let's Work Together</h2>
            <p>새로운 프로젝트나 협업 제안이 있으시면 언제든 연락주세요.</p>
            <div className="contact-methods">
              <button 
                className="contact-link"
                onClick={() => handleContactClick('designer@example.com')}
              >
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>designer@example.com</span>
              </button>
              
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 8C18.2091 8 20 9.79086 20 12V21H16V12C16 11.4696 15.7893 10.9609 15.4142 10.5858C15.0391 10.2107 14.5304 10 14 10C13.4696 10 12.9609 10.2107 12.5858 10.5858C12.2107 10.9609 12 11.4696 12 12V21H8V12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>LinkedIn</span>
              </a>
              
              <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="contact-link">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 16H12C13.1 16 14 15.1 14 14S13.1 12 12 12H8V16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 12H10C11.1 12 12 11.1 12 10S11.1 8 10 8H8V12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>Behance</span>
              </a>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Designer;
