
import { GoogleGenAI, Type } from "@google/genai";
import { Category, EventItem, GroundingSource } from "../types";

// Initialize the Google GenAI client using the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Fetches events from the Gemini API based on category and location.
 */
export async function fetchEvents(
  category: Category, 
  location: string, 
  lang: 'de' | 'en'
): Promise<{ text: string; sources: GroundingSource[] }> {
  
  const prompt = lang === 'de' 
    ? `Suche nach aktuellen ${category} Events in oder um ${location}, Deutschland. 
       Gib eine strukturierte Liste mit Titeln, Daten und kurzen Beschreibungen aus. 
       Wenn es Restaurants sind, nenne Empfehlungen.`
    : `Search for current ${category} events in or around ${location}, Germany. 
       Provide a structured list with titles, dates, and short descriptions. 
       If it's dining, provide restaurant recommendations.`;

  try {
    // Maps grounding is only supported in Gemini 2.5 series models.
    const modelToUse = category === Category.Dining ? "gemini-2.5-flash" : "gemini-3-flash-preview";
    const tools = category === Category.Dining 
      ? [{ googleMaps: {} }] 
      : [{ googleSearch: {} }];

    const response = await ai.models.generateContent({
      model: modelToUse,
      contents: prompt,
      config: {
        tools: tools,
        ...(category === Category.Dining && {
          toolConfig: {
            retrievalConfig: {
              latLng: { latitude: 51.1657, longitude: 10.4515 } 
            }
          }
        })
      },
    });

    const text = response.text || "";
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    const sources: GroundingSource[] = chunks.map((chunk: any) => {
      if (chunk.maps) {
        return { title: chunk.maps.title, uri: chunk.maps.uri };
      }
      if (chunk.web) {
        return { title: chunk.web.title, uri: chunk.web.uri };
      }
      return null;
    }).filter(Boolean) as GroundingSource[];

    return { text, sources };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { 
      text: lang === 'de' ? "Fehler beim Laden der Events." : "Error loading events.", 
      sources: [] 
    };
  }
}

/**
 * Classifies a search query into a category and location.
 */
export async function parseSearchQuery(query: string): Promise<{ category: Category; location: string | null }> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Classify the search intent: "${query}". Return the most likely category (Festivent, Sports, Dining, Career) and extract any German city name mentioned.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING, description: "One of: Festivent, Sports, Dining, Career" },
            location: { type: Type.STRING, description: "The German city name extracted, or null if none found" }
          },
          required: ["category", "location"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return {
      category: (Object.values(Category).includes(result.category as Category) ? result.category : Category.Festivent) as Category,
      location: result.location || null
    };
  } catch (error) {
    console.error("Classification Error:", error);
    return { category: Category.Festivent, location: null };
  }
}

/**
 * Transcribes audio provided as a base64 encoded string using Gemini 3 Flash.
 */
export async function transcribeAudio(base64Audio: string, mimeType: string): Promise<string | null> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Audio,
            },
          },
          { text: "Transcribe the following audio precisely. Only return the transcript without any preamble." },
        ],
      },
    });
    return response.text?.trim() || null;
  } catch (error) {
    console.error("Transcription Error:", error);
    return null;
  }
}
