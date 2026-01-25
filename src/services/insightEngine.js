import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generateReport = async (data) => {
    const { user, repos, languageCount } = data;

    // Prepare data for the prompt (summarize to avoid token limits)
    const topRepos = repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count) // Sort by stars
        .slice(0, 30) // Take top 30
        .map(r => ({
            name: r.name,
            description: r.description,
            language: r.language,
            topics: r.topics,
            stars: r.stargazers_count,
            updated_at: r.updated_at,
            is_fork: r.fork
        }));

    const prompt = `
You are an expert Senior Technical Recruiter and Engineering Manager. Analyze the following GitHub profile data and generate a comprehensive, professional developer insight report.

**Target Audience:** Recruiters, Hiring Managers, and potential collaborators.
**Tone:** Professional, objective, evidence-based, and insightful.

**Input Data:**
- **User:** ${user.name || user.login} (${user.bio || 'No bio'})
- **Location:** ${user.location || 'Unknown'}
- **Public Repos:** ${user.public_repos}
- **Account Age:** Created at ${user.created_at}
- **Followers:** ${user.followers}
- **Language Distribution:** ${JSON.stringify(languageCount)}
- **Top repositories:** ${JSON.stringify(topRepos)}

**Report Structure (Markdown):**

# Developer Profile Summary
[A concise summary of their archetype (e.g., AI-Focused Full-Stack Developer), experience level (Junior/Intermediate/Senior), and core strengths. 2-3 sentences.]

## Tech Stack Breakdown
**Primary Languages**: [List with proficiency level inferred from usage]
**Frameworks & Libraries**: [List detected frameworks e.g., React, Django, etc.]
**Databases & Tools**: [Inferred from repos]

## Coding & Architecture Insights
**Quality Indicators**: [Analyze if they use testing, CI/CD, documentation, security practices based on repo descriptions and topics]
**Architectural Patterns**: [e.g., MVC, Microservices, Monolith - inferred from project structures if visible, or general approach]
**Dominant Domains**: [e.g. EdTech, FinTech, AI/ML, Web Tools]

## Notable Projects
[Select 2-3 most impressive projects. For each, explain WHY it is notable (complexity, stars, tech stack).]
- **[Project Name]**: [Description and analysis]

## Strengths & Weaknesses
**Strengths**:
- [Strength 1]
- [Strength 2]

**Areas for Improvement**:
- [Weakness 1]
- [Weakness 2]

## Role Fit Suggestions
**Best-Fit Roles**: [e.g. Frontend Engineer, ML Engineer]
**Environment**: [Startup vs Enterprise]

**Suggested Next Steps**
[Specific advice to improve their profile, e.g., "Add unit tests", "Contribute to open source"]

*Disclaimer: Analysis based on public GitHub metadata.*
`;

    try {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            console.error("VITE_GEMINI_API_KEY is missing/undefined");
            throw new Error("API Key is missing. Please check your .env file.");
        }
        console.log("Attempting to generate report with Gemini...");

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text;
    } catch (error) {
        console.error("Gemini API Error Full Details:", error);
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        if (error.response) {
            console.error("Error response:", await error.response.text());
        }
        return `# Error Generating Report\n\n**Error Details:** ${error.message}\n\nPlease check the console (F12) for more details.`;
    }
};
