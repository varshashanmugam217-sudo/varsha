import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy load Gemini AI client
let genAIClient: any = null;
async function getGemini() {
  if (!genAIClient && process.env.GEMINI_API_KEY) {
    const { GoogleGenAI } = await import('@google/genai');
    genAIClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return genAIClient;
}

// API Routes
app.post('/api/gemini/extract-resume', async (req, res) => {
  try {
    const { resumeText } = req.body;
    const ai = await getGemini();
    if (!ai) {
      return res.status(200).json({});
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Extract technical resume information into structured JSON with fields: fullName, email, summary, skills (array of {name, category, proficiency: number 0-100, level: 'Beginner'|'Intermediate'|'Advanced'|'Expert'}), education, experience, projects.\n\nResume:\n${resumeText}`,
      config: { responseMimeType: 'application/json' }
    });

    res.setHeader('Content-Type', 'application/json');
    res.send(response.text || '{}');
  } catch (error: any) {
    console.error('Server extraction error:', error);
    res.status(200).json({});
  }
});

app.post('/api/gemini/explain-gap', async (req, res) => {
  try {
    const { roleTitle, userSkills, requiredSkills, baseScore } = req.body;
    const ai = await getGemini();
    if (!ai) {
      return res.status(200).json({});
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Provide a 2-sentence crisp explanation of why candidate has readiness score ${baseScore}% for ${roleTitle}, and 3 bullet insights. Output JSON { "explanation": string, "insights": string[] }.\nUser skills: ${JSON.stringify(userSkills)}\nRequired: ${JSON.stringify(requiredSkills)}`,
      config: { responseMimeType: 'application/json' }
    });

    res.setHeader('Content-Type', 'application/json');
    res.send(response.text || '{}');
  } catch (error: any) {
    res.status(200).json({});
  }
});

app.post('/api/gemini/parse-custom-job', async (req, res) => {
  try {
    const { title, description } = req.body;
    const ai = await getGemini();
    if (!ai) {
      return res.status(200).json({});
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Extract job requirements from title "${title}" and description:\n${description}\nOutput JSON with fields: title, category, description, averageSalary, experienceLevel, marketDemand, keyResponsibilities (array), recommendedCertifications (array), requiredSkills (array of { name, category, importance: 'critical'|'important'|'nice_to_have', minimumProficiency: number 50-95, description: string })`,
      config: { responseMimeType: 'application/json' }
    });

    res.setHeader('Content-Type', 'application/json');
    res.send(response.text || '{}');
  } catch (error: any) {
    res.status(200).json({});
  }
});

app.post('/api/gemini/evaluate-interview', async (req, res) => {
  try {
    const { question, userAnswer } = req.body;
    const ai = await getGemini();
    if (!ai) {
      return res.status(200).json({});
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Evaluate this candidate's interview answer to the question: "${question}".\nCandidate answer: "${userAnswer}"\nProvide JSON output: { score: number 0-100, verdict: 'Strong'|'Satisfactory'|'Needs Improvement', feedback: string, keyStrengths: string[], improvementTips: string[] }`,
      config: { responseMimeType: 'application/json' }
    });

    res.setHeader('Content-Type', 'application/json');
    res.send(response.text || '{}');
  } catch (error: any) {
    res.status(200).json({});
  }
});

// Serve static frontend in production
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`CareerGap AI server running on port ${PORT}`);
});
