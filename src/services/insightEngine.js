/**
 * Heuristics to analyze GitHub data and generate insights.
 */

// Helper to determine experience level
const determineExperience = (user, repos) => {
    const accountAgeYears = (new Date() - new Date(user.created_at)) / (1000 * 60 * 60 * 24 * 365);
    const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);

    if (accountAgeYears > 5 && totalStars > 50) return 'Advanced';
    if (accountAgeYears > 2 || totalStars > 10) return 'Intermediate';
    return 'Beginner';
};

// Helper to guess archetype
const determineArchetype = (repos, languages) => {
    const langKeys = Object.keys(languages);
    const totalRepos = repos.length;

    const hasLang = (lang) => langKeys.includes(lang);

    if (hasLang('Jupyter Notebook') || hasLang('Python') && (hasLang('R') || hasLang('C++'))) {
        return 'Data Scientist / ML Engineer';
    }
    if (hasLang('JavaScript') || hasLang('TypeScript') || hasLang('HTML') || hasLang('CSS')) {
        if (hasLang('Python') || hasLang('Go') || hasLang('Java')) return 'Full-Stack Developer';
        return 'Frontend Specialist';
    }
    if (hasLang('Go') || hasLang('Rust') || hasLang('C++') || hasLang('Java')) {
        return 'Backend / Systems Engineer';
    }
    if (hasLang('Swift') || hasLang('Kotlin') || hasLang('Dart')) {
        return 'Mobile Developer';
    }
    return 'Generalist Developer';
};

export const generateReport = (data) => {
    const { user, repos, languageCount } = data;

    const experienceLevel = determineExperience(user, repos);
    const archetype = determineArchetype(repos, languageCount);

    // 1. Archetype & Experience
    const section1 = {
        title: 'Developer Archetype & Experience',
        content: {
            type: archetype,
            level: experienceLevel,
            summary: `${user.name || user.login} shows strong signals of being a ${experienceLevel} ${archetype}. Active since ${new Date(user.created_at).getFullYear()} with ${user.public_repos} public repositories.`
        }
    };

    // 2. Tech Stack
    const sortedLangs = Object.entries(languageCount)
        .sort(([, a], [, b]) => b - a)
        .map(([lang]) => lang);

    const section2 = {
        title: 'Tech Stack & Tooling',
        content: {
            languages: sortedLangs.slice(0, 5),
            details: repos.some(r => r.topics?.includes('react')) ? ['React Ecosystem detected'] : []
        }
    };

    // 3. Project Analysis - Simple heuristic for "Notable"
    const notableRepos = repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 3)
        .map(r => ({
            name: r.name,
            description: r.description,
            stars: r.stargazers_count,
            url: r.html_url,
            language: r.language
        }));

    const section3 = {
        title: ' Notable Projects',
        content: notableRepos
    };

    return {
        archetype,
        experienceLevel,
        sections: [section1, section2, section3]
    };
};
