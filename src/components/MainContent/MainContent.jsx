import React from 'react';
import './MainContent.css';

const MainContent = ({ position, isDragging }) => {
  return (
    <main 
      className={`main-content ${isDragging ? 'dragging' : ''}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
    >
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