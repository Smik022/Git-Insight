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
      "overview": ["string (2-3 key points as bullet points)"] 
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
        console.log("Attempting to generate JSON report via proxy...");

        const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Proxy Error Response:", errorText);
            try {
                const errorJson = JSON.parse(errorText);
                throw new Error(errorJson.details || errorJson.error || 'Failed to generate report via proxy');
            } catch (e) {
                throw new Error(`Proxy Error (${response.status}): ${errorText.substring(0, 100)}...`);
            }
        }

        const data = await response.json();
        const text = data.result;

        // Clean up markdown code blocks if present
        const jsonString = text.replace(/```json\n?|\n?```/g, "").trim();

        try {
            return JSON.parse(jsonString);
        } catch {
            console.error("Failed to parse JSON response:", text);
            throw new Error("Failed to parse analysis results. Please try again.");
        }
    } catch (error) {
        console.error("Insight Engine Error:", error);
        throw error;
    }
};
