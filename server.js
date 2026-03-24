// server.js
import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(express.json());

// Initialize Gemini safely on the server
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Create a single chat session instance for the server (or manage per user session)
const chat = ai.chats.create({
  model: 'gemini-3.1-pro-preview',
  config: {
    systemInstruction: "You are a helpful, professional legal assistant chatbot for M&ABM Consultancy and Law Firm. You answer questions about the firm's services, team, and provide general guidance. Do not provide official legal advice. Be concise and polite.",
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await chat.sendMessage({ message });
    res.json({ text: response.text });

  } catch (error) {
    console.error('Server AI Error:', error);
    res.status(500).json({ error: 'Failed to process AI request' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Secure AI Proxy Server running on port ${PORT}`);
});
