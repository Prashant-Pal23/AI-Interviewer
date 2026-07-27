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

export const generateInterviewQuestions = async ({ jobRole, topic, difficulty, interviewType, totalQuestions, resumeText }) => {
    const prompt = `
        You are an expert interviewer.

        Generate exactly ${totalQuestions} ${difficulty} level ${interviewType} interview questions.

        Job Role: ${jobRole}
        Topic: ${topic}
        Resume: ${resumeText || "Not Provided"}

        Generate exactly ${totalQuestions} interview questions.

        Requirements:
        - Questions should match the job role.
        - Difficulty should be ${difficulty}.
        - Interview type should be ${interviewType}.
        - Use the resume whenever relevant.
        - Avoid duplicate questions.
        - Concepts should contain 1-3 relevant technical concepts.

        Return ONLY a valid JSON array.

        Do not include markdown.
        Do not include explanation.
        Do not wrap the JSON inside triple backticks.

        [
        {
            "order":1,
            "question":"",
            "concepts":[""],
            "difficulty":"${difficulty}"
        }
        ]
    `;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
    });

    return parseGeminiResponse(response);
};


export const evaluateAnswer = async ({ question, answer }) => {
    const prompt = `
        You are an interview evaluator.
        Score must be between 0 and 10.

        Evaluation Criteria:
        - Technical correctness
        - Completeness
        - Clarity
        - Relevance

        Question: ${question}
        Candidate Answer: ${answer}

        Return ONLY JSON.

        {
        "score":8,
        "feedback":"...",
        "aiExpectedAnswer":"..."
        }
    `;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
    });

    return parseGeminiResponse(response);
};

export const generateInterviewReport = async ({ questions }) => {
    const prompt = `
        You are an interview evaluator.
        OverallScore must be between 0 and 100.

        Below is the complete interview.

        ${JSON.stringify(questions)}

        Generate the final report.

        Return ONLY JSON.

        {
        "overallScore":85,
        "overallFeedback":"",
        "strengths":[""],
        "weaknesses":[""],
        "suggestions":[""]
        }
    `;

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
    });

    return parseGeminiResponse(response);

}