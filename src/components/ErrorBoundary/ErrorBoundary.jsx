import React from 'react';
import { logErrorBoundaryError } from '../../shared/errorHandler';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    logErrorBoundaryError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="app-error" style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '2rem',
          color: '#FFFFFF',
          backgroundColor: '#2A2A2A',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Application Error</h1>
          <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>Something went wrong. Please refresh the page.</p>
          {import.meta.env.DEV && (
            <details style={{ marginTop: '1rem', textAlign: 'left', maxWidth: '800px' }}>
              <summary style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>Error Details (Development Only)</summary>
              <pre style={{ 
                fontSize: '0.8rem', 
                color: '#ff6b6b',
                backgroundColor: '#1a1a1a',
                padding: '1rem',
                borderRadius: '4px',
                overflow: 'auto',
                maxHeight: '400px'
              }}>
                {this.state.error && this.state.error.toString()}
                {this.state.error && this.state.error.stack && (
                  <div style={{ marginTop: '1rem', fontSize: '0.7rem', color: '#999' }}>
                    {this.state.error.stack}
                  </div>
                )}
              </pre>
            </details>
          )}
          <button 
            onClick={() => window.location.reload()} 
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#FF6B35',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
