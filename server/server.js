require('dotenv').config()
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Express app
const app = express();
const server = http.createServer(app);

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Initialize Google Generative AI
const API_KEY = process.env.API_KEY; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// Store chat history for each connection
const chatSessions = new Map();

// System message (not part of history)
const systemInstruction = "You are SafeHaven AI, a supportive assistant. Provide thoughtful guidance and practical advice without automatically sharing crisis hotlines or emergency numbers. Respond to specific questions with helpful information while maintaining a warm, conversational tone.";

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log('New client connected');
  
  // Create a unique session ID for this connection
  const sessionId = Date.now().toString();
  chatSessions.set(sessionId, []); // Initialize empty history
  
  ws.on('message', async (message) => {
    try {
      const parsedMessage = JSON.parse(message);
      
      if (parsedMessage.type === 'user_message') {
        const userMessage = parsedMessage.message;
        console.log(`Received message: ${userMessage}`);
        
        // Get chat history for this session
        const chatHistory = chatSessions.get(sessionId) || [];
        
        // Add user message to history
        chatHistory.push({
          role: "user",
          parts: [{ text: userMessage }]
        });
        
        // Create chat session with Gemini
        const chat = model.startChat({
          history: chatHistory,
          generationConfig: {
            maxOutputTokens: 1000,
            temperature: 0.7,
            topP: 0.8,
            topK: 40
          }
        });
        
        // Combine system instruction with user message for the first prompt
        const fullPrompt = chatHistory.length === 1 
          ? `${systemInstruction}\n\nUser: ${userMessage}`
          : userMessage;

        // Generate response from AI
        const result = await chat.sendMessage([
          { text: `Please respond to this query. Remember not to include crisis resources or helpline numbers in your response: ${fullPrompt}` }
        ]);
        
        const aiResponse = result.response.text();
        
        // Filter out any crisis resources
        const filteredResponse = filterCrisisResources(aiResponse);
        
        // Add AI response to history
        chatHistory.push({
          role: "model",
          parts: [{ text: filteredResponse }]
        });
        
        // Update session history
        chatSessions.set(sessionId, chatHistory);
        
        // Send AI response back to client
        ws.send(JSON.stringify({
          type: 'ai_response',
          message: filteredResponse
        }));
        
      }
    } catch (error) {
      console.error('Error processing message:', error);
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Sorry, there was an error processing your request.'
      }));
    }
  });
  
  ws.on('close', () => {
    console.log('Client disconnected');
    chatSessions.delete(sessionId);
  });
  
  // Send confirmation of connection
  ws.send(JSON.stringify({
    type: 'connection_status',
    message: 'Connected to AI Support Chat'
  }));
});

// Function to filter out crisis resources
function filterCrisisResources(text) {
  const crisisPatterns = [
    /crisis text line/i,
    /text home to \d+/i,
    /suicide prevention/i,
    /national suicide/i,
    /call 988/i,
    /text 988/i,
    /dial 988/i,
    /trevor project/i,
    /\d{3}[-\s]?\d{3}[-\s]?\d{4}/,
    /\d{3}[-\s]?\d{4}/
  ];
  
  const containsCrisisResources = crisisPatterns.some(pattern => pattern.test(text));
  if (containsCrisisResources) {
    const lines = text.split('\n');
    const filteredLines = lines.filter(line => !crisisPatterns.some(pattern => pattern.test(line)));
    return filteredLines.join('\n');
  }
  
  return text;
}

// Basic route for checking if server is running
app.get('/health', (req, res) => {
  res.status(200).send('Server is running');
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});