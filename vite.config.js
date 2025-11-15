import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import glsl from 'vite-plugin-glsl'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), glsl()],
  base: '/', // GitHub Pages용 상대 경로
  
  // 성능 최적화 설정
  build: {
    // 청크 크기 최적화
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // 청크 분할 최적화 - 더 세분화
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            return 'vendor';
          }
          if (id.includes('GooeyBackground')) {
            return 'animations';
          }
          if (id.includes('components')) {
            return 'components';
          }
        },
        // 파일명 최적화
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // 압축 최적화
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // 프로덕션에서도 console 유지 (디버깅용)
        drop_debugger: true,
        pure_funcs: [] // console 제거하지 않음
      },
      mangle: {
        safari10: true
      }
    },
    // 소스맵 최적화
    sourcemap: false,
    // 빌드 크기 최적화
    target: 'es2015'
  },
  
  // 개발 서버 최적화
  server: {
    port: 5173,
    strictPort: true,
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
