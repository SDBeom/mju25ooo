import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import './shared/storage-guard'; // 저장소 접근 가드 초기화
// 개발 모드에서는 콘솔 필터 비활성화하여 모든 에러 확인 가능
if (import.meta.env.PROD) {
  import('./shared/console-filter'); // 프로덕션에서만 콘솔 오류 필터링
}

// React 앱 마운트 확인
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found!');
  document.body.innerHTML = `
    <div style="color: white; padding: 2rem; text-align: center; background: #2A2A2A; min-height: 100vh; display: flex; align-items: center; justify-content: center;">
      <div>
        <h1>Fatal Error</h1>
        <p>Root element not found. Please check the HTML structure.</p>
      </div>
    </div>
  `;
} else {
  try {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
    console.log('✅ React app mounted successfully');
  } catch (error) {
    console.error('❌ Failed to mount React app:', error);
    // 에러 발생 시 기본 메시지 표시
    rootElement.innerHTML = `
      <div style="color: white; padding: 2rem; text-align: center; background: #2A2A2A; min-height: 100vh; display: flex; align-items: center; justify-content: center; flex-direction: column;">
        <div>
          <h1 style="font-size: 2rem; margin-bottom: 1rem;">Application Error</h1>
          <p style="font-size: 1rem; margin-bottom: 1rem;">Failed to load the application. Please refresh the page.</p>
          ${import.meta.env.DEV ? `<pre style="text-align: left; margin-top: 1rem; padding: 1rem; background: #1a1a1a; border-radius: 4px; overflow: auto; max-width: 800px; max-height: 400px;">${error.toString()}\n\n${error.stack || ''}</pre>` : ''}
          <button onclick="window.location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: #FF6B35; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem;">
            Refresh Page
          </button>
        </div>
      </div>
    `;
  }
}
