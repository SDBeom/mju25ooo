import React from 'react';
import { WORKS_CONTENT, COLORS } from '../../shared/constants';
import { Container, Typography, Button } from '../DesignSystem';
import './Works.css';

const Works = () => {

  const handleProjectClick = () => {
    // 디자이너 페이지로 이동하여 더 많은 프로젝트 확인
    window.history.pushState({}, '', '/designer');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleViewAllClick = () => {
    // 디자이너 페이지로 이동
    window.history.pushState({}, '', '/designer');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <section className="works" id="works">
      <Container maxWidth="large" padding="large">
        <div className="works-header">
          <Typography 
            variant="h2" 
            color="primary" 
            weight="bold"
            className="works-title"
          >
            {WORKS_CONTENT.TITLE}
          </Typography>
          
          <Typography 
            variant="body1" 
            color="secondary" 
            className="works-description"
          >
            {WORKS_CONTENT.DESCRIPTION}
          </Typography>
        </div>
        
        <div className="works-grid">
          {WORKS_CONTENT.PROJECTS.map((project) => (
            <div 
              key={project.id} 
              className="project-card"
              onClick={handleProjectClick}
            >
              <div className="project-image">
                <div className="image-placeholder">
                  <div className="placeholder-content">
                    <div className="placeholder-icon">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2"/>
                        <polyline points="21,15 16,10 5,21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <Typography 
                      variant="caption" 
                      color="muted"
                      className="placeholder-text"
                    >
                      {project.title}
                    </Typography>
                  </div>
                </div>
              </div>
              
              <div className="project-content">
                <Typography 
                  variant="h5" 
                  color="primary" 
                  weight="semibold"
                  className="project-title"
                >
                  {project.title}
                </Typography>
                
                <Typography 
                  variant="body2" 
                  color="secondary" 
                  className="project-description"
                >
                  {project.description}
                </Typography>
                
                <div className="project-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="works-cta">
          <Button
            variant="secondary"
            size="large"
            onClick={handleViewAllClick}
            className="works-button"
          >
            View All Projects
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default Works;





