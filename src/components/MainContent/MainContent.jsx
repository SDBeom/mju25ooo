import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './MainContent.css';

const MainContent = () => {
  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
};

export default MainContent;