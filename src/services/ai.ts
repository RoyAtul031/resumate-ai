import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
console.log('[AI] API key present:', !!apiKey, '| Length:', apiKey?.length);
const ai = new GoogleGenAI({ apiKey });

export async function generateSummary(resumeData: any): Promise<string> {
  const model = "gemini-2.5-flash";
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
  const model = "gemini-2.5-flash";
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
  const model = "gemini-2.5-flash";
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

export async function tailorResumeToJob(userDetails: string, jobCriteria: string, existingResume?: string): Promise<string> {
  const model = "gemini-2.5-flash";
  const prompt = `
    You are an expert resume writer and career coach. Create a fully tailored, ATS-optimized resume in plain text format.

    ${existingResume ? `Existing Resume to improve:\n${existingResume}\n` : ''}
    User Details:\n${userDetails}

    Company Job Criteria / Requirements:\n${jobCriteria}

    Instructions:
    - Rewrite or create the resume so it directly addresses every key requirement in the job criteria.
    - Use strong action verbs and quantify achievements.
    - Highlight skills and experience that match the criteria.
    - Output structured plain text with clear sections: SUMMARY, SKILLS, EXPERIENCE, EDUCATION, PROJECTS, CERTIFICATIONS.
    - Keep it concise, professional, and ATS-friendly.
  `;
  try {
    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text || "";
  } catch (error) {
    console.error("Error tailoring resume:", error);
    throw error;
  }
}

export async function generateCoverLetter(userDetails: string, jobCriteria: string, companyCoverLetterFormat?: string): Promise<string> {
  const model = "gemini-2.5-flash";
  const prompt = `
    You are a professional cover letter writer. Write a compelling, personalized cover letter.

    Applicant Details:\n${userDetails}

    Job Criteria / Requirements:\n${jobCriteria}

    ${companyCoverLetterFormat ? `Company Cover Letter Format / Preferences:\n${companyCoverLetterFormat}\n` : ''}

    Instructions:
    - Open with a strong hook that shows genuine interest.
    - Map the applicant's top 3-4 experiences to the job requirements.
    - Show cultural fit and enthusiasm.
    - Close with a confident call-to-action.
    - Keep it to 3-4 paragraphs, professional tone.
    - Format with Date, Salutation, Body, and Sign-off.
  `;
  try {
    const response = await ai.models.generateContent({ model, contents: prompt });
    return response.text || "";
  } catch (error) {
    console.error("Error generating cover letter:", error);
    throw error;
  }
}
