const functions = require('firebase-functions');
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Initialize Express app
const app = express();

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Set up Google Generative AI with API Key from environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Define the endpoint for generating itineraries
app.post('/api/get-itinerary', async (req, res) => {
  console.log('Received request:', req.body);
  try {
    const userPrompt = req.body.prompt;
    const permanentPrompt = `You are an intelligent travel assistant. Generate a customized detailed travel itinerary for the given destination in a JSON format. The itinerary should include:
    - detailed timings
    - place ratings
    - weather suggestions
    - key highlights for each day.
    - spending budget for each activity
    - extra comments and suggestions for each activity
    - commute time between activities.

    Structure the JSON response with:
    {
      "title": "Itinerary title",
      "sections": [
        {
          "time": "Morning (8:00 AM - 12:00 PM)",
          "activities": [
            {
              "activity": "Visit Red Fort", 
              "rating": "4.5/5", 
              "weather": "Sunny, 20°C", 
              "duration": "2 hours", 
              "budget": "₹500", 
              "comments": "Red Fort is a significant historical landmark. Make sure to hire a guide to understand its history better.",
              "commute_time": "15 mins from previous location"
            }
          ]
        }
      ]
    }`;
    const completePrompt = `${permanentPrompt} ${userPrompt}`;

    // Use Gemini API to generate content
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(completePrompt);

    let responseText = result.response.text();
    responseText = responseText.replace(/```json|```/g, '').trim();

    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      responseText = jsonMatch[0];
    }

    console.log('Cleaned LLM Response:', responseText);

    try {
      const jsonResponse = JSON.parse(responseText);
      res.status(200).json({ response: jsonResponse });
    } catch (error) {
      console.error('Error parsing JSON from LLM response:', error);
      res.status(500).json({ error: 'Failed to parse valid JSON from LLM response.' });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Something went wrong with the LLM request.' });
  }
});

// Export the Express app as an HTTPS function
exports.app = functions.https.onRequest(app);
