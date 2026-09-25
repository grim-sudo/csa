import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// Dev-only: serve the /api/enquiry serverless handler through Vite's dev server
// so `npm run dev` behaves like production (where Vercel serves /api/*).
function devApi(env) {
  return {
    name: 'dev-api-enquiry',
    configureServer(server) {
      // Expose the Resend env vars to the handler (loadEnv reads .env.local).
      for (const key of ['RESEND_API_KEY', 'ENQUIRY_TO', 'RESEND_FROM']) {
        if (env[key]) process.env[key] = env[key]
      }
      server.middlewares.use('/api/enquiry', async (req, res) => {
        const { default: handler } = await server.ssrLoadModule('/api/enquiry.js')
        handler(req, res)
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), devApi(env)],
  }
})
