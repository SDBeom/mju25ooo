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
        // 청크 분할 최적화 - React를 항상 먼저 로드하도록 보장
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // React와 React-DOM을 같은 청크에 포함하여 단일 인스턴스 보장
            if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
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
        drop_console: false, // 프로덕션에서도 에러 디버깅을 위해 console 유지
        drop_debugger: true,
        pure_funcs: ['console.info', 'console.debug'] // info와 debug만 제거, error와 warn은 유지
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
    strictPort: false, // 포트가 사용 중이면 자동으로 다른 포트 사용
    host: '0.0.0.0', // 모든 네트워크 인터페이스에서 접근 허용
    open: true, // 자동으로 브라우저 열기
    hmr: {
      // HMR 타임아웃 증가
      timeout: 30000
    },
    // 개발 서버에서는 캐싱 비활성화 (변경사항 즉시 반영)
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    },
    // 대용량 파일 처리 최적화
    fs: {
      // 상위 디렉토리 접근 제한 (보안 및 성능)
      strict: true,
      // 허용할 디렉토리
      allow: ['..']
    },
    // 워처 최적화 (대용량 파일 스캔 방지)
    watch: {
      // node_modules 제외
      ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**'],
      // 폴링 간격 증가 (성능 향상)
      usePolling: false
    }
  },
  
  // 미리보기 서버 설정
  preview: {
    port: 5173,
    strictPort: false, // 포트가 사용 중이면 자동으로 다른 포트 사용
    host: '0.0.0.0', // 모든 네트워크 인터페이스에서 접근 허용
    open: false // 자동으로 브라우저 열지 않음
  },
  
  // 개발 모드 최적화
  optimizeDeps: {
    // 사전 번들링할 의존성
    include: ['react', 'react-dom', 'framer-motion', 'gsap'],
    // 제외할 의존성
    exclude: [],
    // 강제 사전 번들링 (성능 향상)
    force: false,
    // esbuild 옵션
    esbuildOptions: {
      target: 'es2020'
    }
  },
  
  // CSS 최적화
  css: {
    devSourcemap: false // 개발에서 소스맵 비활성화
  }
})
