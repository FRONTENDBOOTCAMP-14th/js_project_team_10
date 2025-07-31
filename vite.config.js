import { defineConfig } from "vite";
import { resolve } from 'path';
import { glob } from 'glob';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// components 폴더 내의 모든 HTML 파일을 찾아서 빌드에 포함




export default defineConfig({
  root: './', // 프로젝트 루트 설정
  publicDir: 'public', // 정적 에셋 디렉토리
  server: {
    port: 4444,
    open: true,
  },
  css: {
    preprocessorOptions: {
      css: {
        // CSS @import 경로를 해석하는 방식을 조정
        additionalData: `@import "${resolve(__dirname, 'src/style/common/_normalize.css')}";`
      }
    },
    // CSS 모듈 사용 시 클래스 이름을 해시하지 않음
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
        build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'src',
          dest: '.'
        }
      ]
    })
  ],
  
    
  
});
