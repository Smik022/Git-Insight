import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

function geminiApiPlugin() {
  let env;
  return {
    name: 'gemini-api',
    configResolved(config) {
      env = config.env;
    },
    configureServer(server) {
      server.middlewares.use('/api/gemini', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        const chunks = [];
        for await (const chunk of req) chunks.push(chunk);
        const body = JSON.parse(Buffer.concat(chunks).toString());
        const { prompt } = body;

        const apiKey = env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
        if (!apiKey) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'GEMINI_API_KEY is not configured' }));
          return;
        }

        if (!prompt) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'Prompt is required' }));
          return;
        }

        try {
          const { GoogleGenerativeAI } = await import('@google/generative-ai');
          const genAI = new GoogleGenerativeAI(apiKey);
          const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite' });
          const result = await model.generateContent(prompt);
          const text = result.response.text();
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ result: text }));
        } catch (error) {
          console.error('Gemini Proxy Error:', error);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Failed to generate content', details: error.message }));
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), geminiApiPlugin()],
  envPrefix: 'VITE_',
}))
