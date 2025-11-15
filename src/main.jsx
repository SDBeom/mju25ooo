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
  } catch (error) {
    console.error('Failed to mount React app:', error);
    // 에러 발생 시 기본 메시지 표시
    rootElement.innerHTML = `
      <div style="color: white; padding: 2rem; text-align: center;">
        <h1>Application Error</h1>
        <p>Failed to load the application. Please refresh the page.</p>
        ${import.meta.env.DEV ? `<pre style="text-align: left; margin-top: 1rem;">${error.toString()}</pre>` : ''}
      </div>
    `;
  }
}
