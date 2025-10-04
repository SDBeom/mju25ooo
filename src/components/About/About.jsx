import React from 'react';
import { ABOUT_CONTENT, COLORS } from '../../shared/constants';
import { Container, Typography, Button } from '../DesignSystem';
import './About.css';

const About = () => {
  const handleContactClick = () => {
    // 이메일로 연락하거나 디자이너 페이지로 이동
    window.open('mailto:designer@example.com', '_blank');
  };

  return (
    <section className="about" id="about">
      <Container maxWidth="large" padding="large">
        <div className="about-content">
          <div className="about-text">
            <Typography 
              variant="h2" 
              color="primary" 
              weight="bold"
              className="about-title"
            >
              {ABOUT_CONTENT.TITLE}
            </Typography>
            
            <Typography 
              variant="body1" 
              color="secondary" 
              className="about-description"
            >
              {ABOUT_CONTENT.DESCRIPTION}
            </Typography>
            
            <div className="about-skills">
              <Typography 
                variant="h4" 
                color="primary" 
                weight="semibold"
                className="skills-title"
              >
                Skills & Expertise
              </Typography>
              
              <div className="skills-grid">
                {ABOUT_CONTENT.SKILLS.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="skill-icon">
                      <div className="skill-dot"></div>
                    </div>
                    <Typography 
                      variant="body2" 
                      color="secondary"
                      className="skill-text"
                    >
                      {skill}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="about-cta">
              <Button
                variant="outline"
                size="medium"
                onClick={handleContactClick}
                className="about-button"
              >
                Get In Touch
              </Button>
            </div>
          </div>
          
          <div className="about-visual">
            <div className="about-image">
              <div className="image-placeholder">
                <div className="placeholder-content">
                  <div className="placeholder-icon">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26 15 3.41 18.13 3.41 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <Typography 
                    variant="body2" 
                    color="muted"
                    className="placeholder-text"
                  >
                    Designer Photo
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default About;







