import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://api.coingecko.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api/v3'),
        onProxyReq: (proxyReq, req, res) => {
          proxyReq.setHeader('x-cg-demo-api-key', 'CG-YTYg8YnA5itJkJvRMZCVGFS9');
        }
      }
    }
  }
})
