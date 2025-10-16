import React from 'react';

function Footer(props) {
  return (
    <footer style={{ 
      position: 'fixed', 
      bottom: 0, 
      left: 0, 
      right: 0, 
      background: 'rgba(42, 42, 42, 0.95)', 
      color: 'white', 
      padding: '20px', 
      textAlign: 'center',
      zIndex: 9999
    }}>
      <div>2025.11.12 - 11.17 | © 2025 MJU MCD</div>
    </footer>
  );
}

export default Footer;