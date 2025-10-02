import React from 'react';
import './App.css';
import ComingSoon from './components/ComingSoon/ComingSoon';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <ComingSoon />
    </ErrorBoundary>
  );
}

export default App;
