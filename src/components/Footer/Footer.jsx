import React from 'react';
import './Footer.css';

const Footer = React.forwardRef((props, ref) => {
  return (
    <footer className="footer" ref={ref}>
      <div className="footer-content">
        <div className="exhibition-info">
          <div className="exhibition-detail">
            2025.11.12 - 11.17 | 11:00 - 18:00<br />
            35-4, INSADONG-GIL, JONGNO-GU<br />
            © 2025 MJU MCD. All rights reserved.
          </div>
        </div>
        <div className="footer-logos">
          <div className="footer-logo mju-logo">MJU</div>
          <div className="footer-logo ooo-logo">OOO</div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;