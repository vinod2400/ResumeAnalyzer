import express from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ❌ Comment this out in dev (no dist/index.html)
/// app.use(express.static(path.join(__dirname, 'dist')));

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Only PDF files are allowed!'), false);
  }
});

// ✅ AI Resume Analyzer via OpenRouter
async function analyzeResume(resumeText, jobDescription = '') {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('OpenRouter API key not configured');

  const prompt = `
You are an AI resume evaluator. Given the resume content and optional job description, return analysis in this strict JSON format:

{
  "score": [0-100],
  "strengths": ["", "", ""],
  "weaknesses": ["", "", ""],
  "suggestions": ["", "", "", "", ""],
  "atsOptimizedExperience": "...",
  "overallSummary": "..."
}

Resume:
${resumeText}

${jobDescription ? `Job Description:\n${jobDescription}` : ''}
`;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are an expert resume reviewer.' },
          { role: 'user', content: prompt }
        ]
      }),
    });

    const data = await response.json();
    const text = data.choices[0].message.content;

    const jsonMatch = text.match(/\{[\s\S]*?\}/);
    if (!jsonMatch) throw new Error('Invalid AI response');

    return JSON.parse(jsonMatch[0]);
  } catch (err) {
    console.error('🔥 OpenRouter Error:', err.message || err);
    throw new Error('Failed to analyze resume with AI');
  }
}

// 📤 Resume Analyzer Endpoint
app.post('/api/analyze-resume', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No resume uploaded' });

    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text;
    if (!resumeText.trim()) return res.status(400).json({ error: 'Resume text is empty' });

    const jobDescription = req.body.jobDescription || '';
    const analysis = await analyzeResume(resumeText, jobDescription);

    res.json({
      success: true,
      analysis,
      extractedText: resumeText.substring(0, 500) + '...',
    });
  } catch (error) {
    console.error('❌ Resume analysis error:', error);
    res.status(500).json({ error: error.message || 'Failed to analyze resume' });
  }
});

// ✅ Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'ResumeRadar API is live' });
});

// ✅ Test Route for AI
app.get('/api/test-openrouter', async (req, res) => {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: 'Say hello OpenRouter AI' }]
      })
    });

    const raw = await response.text();
    res.send(raw);
  } catch (err) {
    res.status(500).send('Test failed: ' + err.message);
  }
});

// ❌ Commented to avoid dist/index.html error in dev
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

app.listen(PORT, () => {
  console.log(`🚀 ResumeRadar running on port ${PORT}`);
  console.log(`📊 API: http://localhost:${PORT}/api`);
});
