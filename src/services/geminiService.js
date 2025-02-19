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
    const responseText = await response.text();
    console.log('Gemini API response:', responseText); // Log the response for debugging

    // Attempt to parse the response as JSON
    try {
      return JSON.parse(responseText.replace(/```json/g, '').replace(/```/g, ''));
    } catch (jsonError) {
      console.error('JSON parsing error:', jsonError);
      throw new Error('Failed to parse JSON response from Gemini API');
    }
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to process text');
  }
};