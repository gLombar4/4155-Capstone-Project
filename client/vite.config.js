import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '../', '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: 'https://api.igdb.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/v4'),
          headers: {
            'Client-ID': env.TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${env.TWITCH_ACCESS_TOKEN}`,
          },
        },
      },
    },
  }
})
