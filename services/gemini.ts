
import { GoogleGenAI } from "@google/genai";
import { Category, EventItem, GroundingSource } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
    // Determine model based on grounding requirements
    // Maps grounding: gemini-2.5-flash
    // Search grounding: gemini-3-flash-preview
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

// Added transcribeAudio fix for the missing export error in AudioSearch.tsx
export async function transcribeAudio(base64Audio: string, mimeType: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Audio,
              mimeType: mimeType,
            },
          },
          {
            text: "Transcribe the following audio precisely. If the audio is in German, output German text. If it is in English, output English text. Return only the transcription text.",
          },
        ],
      },
    });
    return response.text || "";
  } catch (error) {
    console.error("Transcription Error:", error);
    return "";
  }
}
