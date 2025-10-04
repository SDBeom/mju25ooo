import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://mju25ooo.com/', // 개인 도메인으로 설정
  
  // 성능 최적화 설정
  build: {
    // 청크 크기 최적화
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // 청크 분할 최적화
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['./src/components/ComingSoon/GooeyBackgroundSVG.jsx', './src/components/ComingSoon/GooeyBackground.jsx']
        }
      }
    },
    // 압축 최적화
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // 프로덕션에서 console 제거
        drop_debugger: true
      }
    }
  },
  
  // 개발 서버 최적화
  server: {
    headers: {
      // 캐싱 헤더 설정
      'Cache-Control': 'public, max-age=31536000'
    }
  },
  
  // CSS 최적화
  css: {
    devSourcemap: false // 개발에서 소스맵 비활성화
  }
})
