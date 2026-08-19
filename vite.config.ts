import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

function apiDevPlugin(): Plugin {
  return {
    name: 'api-dev-middleware',
    configureServer(server) {
      server.middlewares.use('/api/gemini/extract-resume', async (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const { resumeText } = JSON.parse(body);
              const apiKey = process.env.GEMINI_API_KEY;

              if (apiKey) {
                const { GoogleGenAI } = await import('@google/genai');
                const ai = new GoogleGenAI({ apiKey });
                const prompt = `Extract structured technical candidate data from this resume. Output JSON matching schema with fields: fullName, email, summary, skills (array of {name, category, proficiency, level}), education, experience, projects.\n\nResume text:\n${resumeText}`;
                
                const response = await ai.models.generateContent({
                  model: 'gemini-2.5-flash',
                  contents: prompt,
                  config: { responseMimeType: 'application/json' }
                });

                res.setHeader('Content-Type', 'application/json');
                res.end(response.text || '{}');
                return;
              }
            } catch (e) {
              console.warn('Gemini dev server error, falling back:', e);
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({}));
          });
        } else {
          res.statusCode = 405;
          res.end();
        }
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiDevPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
