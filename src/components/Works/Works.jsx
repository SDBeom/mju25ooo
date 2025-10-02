import React from 'react';
import { WORKS_CONTENT, COLORS } from '../../shared/constants';
import { Container, Typography, Button } from '../DesignSystem';
import './Works.css';

const Works = () => {
  const handleProjectClick = (projectId) => {
    // TODO: Implement project detail view
    console.log('Project clicked:', projectId);
  };

  const handleViewAllClick = () => {
    // TODO: Implement view all projects
    console.log('View all projects clicked');
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
              onClick={() => handleProjectClick(project.id)}
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



