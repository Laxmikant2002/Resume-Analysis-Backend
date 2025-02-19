const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.extractData = async (rawText) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `Extract structured data from resume text. Follow this JSON format: 
    {
      "name": "...",
      "email": "...",
      "education": { ... },
      "experience": { ... },
      "skills": [],
      "summary": "..."
    }. Text: ${rawText}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text().replace(/```json/g, '').replace(/```/g, ''));
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to process text');
  }
};