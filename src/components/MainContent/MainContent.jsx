import React from 'react';
import './MainContent.css';

const MainContent = () => {
  return (
    <main className="main-content">
      <div className="main-visual">
        <div className="drag-indicator">
          <p>클릭 앤 드래그하여 탐색하세요</p>
          <div className="drag-hint">
            <span>← → ↑ ↓</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;