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
        <div className="app-error">
          <h1>Application Error</h1>
          <p>Something went wrong. Please refresh the page.</p>
          {import.meta.env.DEV && (
            <details style={{ marginTop: '1rem', textAlign: 'left' }}>
              <summary>Error Details (Development Only)</summary>
              <pre style={{ fontSize: '0.8rem', color: '#ff6b6b' }}>
                {this.state.error && this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
