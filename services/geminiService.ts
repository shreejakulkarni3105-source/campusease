
import { GoogleGenAI } from "@google/genai";

// Always use process.env.API_KEY directly when initializing the client.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartStudyRecommendation = async (building: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide one short, encouraging study tip for a college student studying in the ${building}. Keep it under 15 words.`,
    });
    // Property .text returns the string output.
    return response.text || "Keep up the great work!";
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Focus on one task at a time for maximum productivity.";
  }
};
