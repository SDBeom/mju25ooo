import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import './shared/storage-guard'; // 저장소 접근 가드 초기화
import './shared/console-filter'; // 콘솔 오류 필터링 초기화

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
