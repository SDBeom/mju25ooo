import React from 'react';
import { HERO_CONTENT, COLORS } from '../../shared/constants';
import { Container, Typography, Button } from '../DesignSystem';
import './Hero.css';

const Hero = () => {
  const handleCTAClick = () => {
    // Works 섹션으로 스크롤
    const worksSection = document.getElementById('works');
    if (worksSection) {
      worksSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="hero">
      <Container maxWidth="large" padding="large">
        <div className="hero-content">
          <div className="hero-text">
            <Typography 
              variant="h1" 
              color="primary" 
              weight="bold"
              className="hero-title"
            >
              {HERO_CONTENT.TITLE}
            </Typography>
            
            <Typography 
              variant="h3" 
              color="secondary" 
              weight="medium"
              className="hero-subtitle"
            >
              {HERO_CONTENT.SUBTITLE}
            </Typography>
            
            <Typography 
              variant="body1" 
              color="secondary" 
              className="hero-description"
            >
              {HERO_CONTENT.DESCRIPTION}
            </Typography>
            
            <div className="hero-cta">
              <Button
                variant="primary"
                size="large"
                onClick={handleCTAClick}
                className="hero-button"
              >
                {HERO_CONTENT.CTA_TEXT}
              </Button>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="hero-graphic">
              <div className="graphic-circle graphic-circle-1"></div>
              <div className="graphic-circle graphic-circle-2"></div>
              <div className="graphic-circle graphic-circle-3"></div>
              <div className="graphic-square"></div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;





