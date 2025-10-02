import React from 'react';
import Hero from '../Hero/Hero';
import About from '../About/About';
import Works from '../Works/Works';
import './MainContent.css';

const MainContent = () => {
  return (
    <main className="main-content">
      <Hero />
      <About />
      <Works />
    </main>
  );
};

export default MainContent;
