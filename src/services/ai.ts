import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateSummary(resumeData: any): Promise<string> {
  const model = "gemini-3-flash-preview";
  const prompt = `
    You are an expert resume writer. Create a professional, ATS-friendly professional summary (3-4 sentences) for a resume based on the following details.
    Focus on achievements and skills. Do not use personal pronouns like "I" or "My" excessively. Keep it impactful.

    Current Role: ${resumeData.experience[0]?.position} at ${resumeData.experience[0]?.company}
    Skills: ${resumeData.skills.join(", ")}
    Experience Highlights: ${resumeData.experience.map((e: any) => e.description).join("\n")}
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text || "";
  } catch (error) {
    console.error("Error generating summary:", error);
    throw error;
  }
}

export async function improveDescription(description: string, role: string): Promise<string> {
  const model = "gemini-3-flash-preview";
  const prompt = `
    You are an expert resume writer. Rewrite the following job description bullet points to be more impactful, result-oriented, and ATS-friendly.
    Use strong action verbs. Quantify results where possible (if numbers aren't provided, use placeholders like [X]%).
    Keep the format as bullet points.

    Role: ${role}
    Original Description:
    ${description}
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text || "";
  } catch (error) {
    console.error("Error improving description:", error);
    throw error;
  }
}

export async function suggestSkills(role: string, description: string): Promise<string[]> {
  const model = "gemini-3-flash-preview";
  const prompt = `
    Based on the following role and description, suggest a list of 10 relevant hard and soft skills for a resume.
    Return ONLY a JSON array of strings. No markdown formatting.

    Role: ${role}
    Description: ${description}
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    const text = response.text || "[]";
    return JSON.parse(text);
  } catch (error) {
    console.error("Error suggesting skills:", error);
    return [];
  }
}
