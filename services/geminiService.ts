import { GoogleGenAI } from "@google/genai";

// This service handles the AI logic for generating comic scripts, character descriptions, 
// and potentially prompting for image generation models.

const apiKey = process.env.API_KEY || ''; // In a real app, this would be strictly managed.

let ai: GoogleGenAI | null = null;

export const initializeGemini = () => {
  if (!apiKey) {
    console.warn("Gemini API Key not found. AI features will be simulated.");
    return;
  }
  ai = new GoogleGenAI({ apiKey });
};

export const generateStoryBoard = async (novelText: string) => {
  if (!ai) {
    // Simulate response for UI demo purposes if API key is missing
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          scenes: [
            { id: 1, description: "A dark alleyway, rain pouring.", dialogue: "Wait, who's there?" },
            { id: 2, description: "Close up on the protagonist's eyes.", dialogue: "(Inner monologue) I knew this day would come." }
          ]
        });
      }, 2000);
    });
  }

  try {
    const model = "gemini-2.5-flash"; // Efficient for text processing
    const response = await ai.models.generateContent({
      model,
      contents: `Convert the following novel segment into a comic storyboard JSON with scene descriptions and dialogue: ${novelText}`,
      config: {
        responseMimeType: "application/json"
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini generation error:", error);
    throw error;
  }
};
