import React from 'react';
import Header from '../Header/Header';
import Hero from '../Hero/Hero';
import About from '../About/About';
import Works from '../Works/Works';
import Footer from '../Footer/Footer';
import './MainContent.css';

const MainContent = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <Hero />
        <About />
        <Works />
      </main>
      <Footer />
    </>
  );
};

export default MainContent;
