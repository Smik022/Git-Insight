import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generateReport = async (data) => {
    const { user, repos, languageCount } = data;

    // Prepare data for the prompt
    const topRepos = repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 30)
        .map(r => ({
            name: r.name,
            description: r.description,
            language: r.language,
            topics: r.topics,
            stars: r.stargazers_count,
            updated_at: r.updated_at,
            fork: r.fork
        }));

    const prompt = `
You are an expert Senior Technical Recruiter and Engineering Manager. Analyze the following GitHub profile data and generate a structured JSON report.

**Target Audience:** Recruiters, Hiring Managers.
**Tone:** Professional, objective, evidence-based.

**Input Data:**
- **User:** ${user.name || user.login} (${user.bio || 'No bio'})
- **Location:** ${user.location || 'Unknown'}
- **Public Repos:** ${user.public_repos}
- **Account Age:** Created at ${user.created_at}
- **Followers:** ${user.followers}
- **Language Distribution:** ${JSON.stringify(languageCount)}
- **Top repositories:** ${JSON.stringify(topRepos)}

**Output Format:**
Return ONLY a valid JSON object with the following schema. Do NOT include any markdown formatting (like \`\`\`json).

{
  "summary": { 
      "archetype": "string (e.g., AI-Focused Full-Stack Developer)", 
      "level": "string (e.g., Senior)", 
      "overview": "string (2-3 sentences)" 
  },
  "techStack": { 
      "languages": ["string (e.g., Python (High))"], 
      "frameworks": ["string"], 
      "tools": ["string"] 
  },
  "codingInsights": { 
      "quality": ["string"], 
      "patterns": ["string"], 
      "domains": ["string"] 
  },
  "notableProjects": [ 
      { "name": "string", "why": "string", "tech": "string" } 
  ],
  "strengths": ["string"],
  "weaknesses": ["string"],
  "roleFit": { 
      "roles": ["string"], 
      "environment": "string" 
  },
  "nextSteps": ["string"]
}
`;

    try {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            console.error("VITE_GEMINI_API_KEY is missing/undefined");
            throw new Error("API Key is missing. Please check your .env file.");
        }
        console.log("Attempting to generate JSON report with Gemini...");

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown code blocks if present
        const jsonString = text.replace(/```json\n?|\n?```/g, "").trim();

        try {
            return JSON.parse(jsonString);
        } catch {
            console.error("Failed to parse JSON response:", text);
            throw new Error("Failed to parse analysis results. Please try again.");
        }
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
};
