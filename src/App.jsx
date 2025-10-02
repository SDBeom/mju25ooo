import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import Footer from './components/Footer/Footer';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Header />
      <MainContent />
      <Footer />
    </ErrorBoundary>
  );
}

export default App;
