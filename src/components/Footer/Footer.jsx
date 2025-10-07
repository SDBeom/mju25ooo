import React from 'react';
import { Container, Typography } from '../DesignSystem';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container maxWidth="large" padding="medium">
        <div className="footer-content">
          <div className="footer-left">
            <Typography 
              variant="body2" 
              color="muted"
              className="footer-text"
            >
              © {currentYear} 2025 MJU MCD. All rights reserved.
            </Typography>
          </div>
          
          <div className="footer-right">
            <Typography 
              variant="body2" 
              color="muted"
              className="footer-text"
            >
            </Typography>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;







