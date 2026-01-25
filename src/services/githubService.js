const GITHUB_API_BASE = 'https://api.github.com';

const getHeaders = () => {
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    const headers = {
        'Accept': 'application/vnd.github.v3+json',
    };
    if (token) {
        headers['Authorization'] = `token ${token}`;
    }
    return headers;
};

export const fetchGitHubData = async (username) => {
    try {
        const headers = getHeaders();

        // 1. User Profile
        const userRes = await fetch(`${GITHUB_API_BASE}/users/${username}`, { headers });
        if (!userRes.ok) {
            if (userRes.status === 404) throw new Error('User not found');
            throw new Error('Failed to fetch user profile');
        }
        const user = await userRes.json();

        // 2. Repositories (up to 100 recent ones)
        const reposRes = await fetch(`${user.repos_url}?per_page=100&sort=updated`, { headers });
        const repos = await reposRes.json();

        // 3. Events (for activity calculations - recent 30 events)
        // Note: Events API might be restricted/limited.
        let events = [];
        try {
            const eventsRes = await fetch(`${user.url}/events/public?per_page=30`, { headers });
            if (eventsRes.ok) events = await eventsRes.json();
        } catch (e) {
            console.warn('Failed to fetch events', e);
        }

        // 4. Detailed Language Stats (Aggregate from repos)
        // This can be expensive (1 request per repo). We'll approximate from the top 10 non-fork repos.

        const languageMap = {};

        // We can use the 'language' field from repos for a quick summary, 
        // or fetch /languages for detailed byte counts. 
        // For speed/rate limits, we'll stick to repo.language and repo.topics first,
        // possibly fetch languages for just the top 3 repos if needed.

        repos.forEach(repo => {
            if (repo.language) {
                languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
            }
        });

        return {
            user,
            repos,
            events,
            languageCount: languageMap
        };
    } catch (error) {
        console.error('GitHub API Error:', error);
        throw error;
    }
};
