import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'semi-theme': fileURLToPath(
        new URL(
          './node_modules/@douyinfe/semi-ui/dist/css/semi.min.css',
          import.meta.url,
        ),
      ),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        // 拆分第三方依赖，业务代码变更时静态资源可继续复用浏览器缓存
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('@douyinfe')) return 'semi';
          if (id.includes('lodash')) return 'lodash';
          if (
            id.includes('/react/') ||
            id.includes('/react-dom/') ||
            id.includes('/scheduler/')
          ) {
            return 'react';
          }
          return 'vendor';
        },
      },
    },
  },
});
