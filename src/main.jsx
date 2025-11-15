import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import './shared/storage-guard'; // 저장소 접근 가드 초기화
import './shared/console-filter'; // 콘솔 오류 필터링 초기화

// React 앱 마운트 확인
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found!');
} else {
  try {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    console.log('React app mounted successfully');
    
    // 프로덕션에서도 에러가 보이도록 설정
    if (import.meta.env.PROD) {
      window.__REACT_APP_LOADED__ = true;
    }
  } catch (error) {
    console.error('Failed to mount React app:', error);
    // 에러 발생 시 기본 메시지 표시 (프로덕션에서도 에러 표시)
    rootElement.innerHTML = `
      <div style="color: white; padding: 2rem; text-align: center; background: #2A2A2A; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <h1 style="font-size: 2rem; margin-bottom: 1rem;">Application Error</h1>
        <p style="font-size: 1rem; margin-bottom: 1rem;">Failed to load the application. Please refresh the page.</p>
        <pre style="text-align: left; background: #1a1a1a; padding: 1rem; border-radius: 4px; max-width: 800px; overflow: auto; font-size: 0.8rem; color: #ff6b6b; margin-top: 1rem;">${error.toString()}\n${error.stack || ''}</pre>
        <button onclick="window.location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #FF6B35; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem;">Refresh Page</button>
      </div>
    `;
  }
}
