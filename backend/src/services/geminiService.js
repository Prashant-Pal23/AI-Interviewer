import ai from "../config/gemini.js";

const parseGeminiResponse = (response) => {
    return JSON.parse(
        response.text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim()
    );
};

export const analyzeResumeATS = async (resumeText, jobDescription) => {

    const prompt = `
        You are an ATS Resume Analyzer.

        Compare the following resume with the job description.

        Return ONLY valid JSON.

        {
            "score": number,
            "strengths": [],
            "weaknesses": [],
            "missingSkills": [],
            "suggestions": []
        }

        Resume: ${resumeText}

        Job Description: ${jobDescription}
    `;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
    });

    return parseGeminiResponse(response);
    
}

