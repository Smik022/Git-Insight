export default async function handler(req, res) {
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    const token = process.env.GITHUB_TOKEN;
    const headers = {
        'Accept': 'application/vnd.github.v3+json',
    };

    if (token) {
        headers['Authorization'] = `token ${token}`;
    }

    try {
        // 1. User Profile
        const userRes = await fetch(`https://api.github.com/users/${username}`, { headers });
        if (!userRes.ok) {
            const errorText = await userRes.text();
            return res.status(userRes.status).json({ error: 'GitHub API Error', details: errorText });
        }
        const user = await userRes.json();

        // 2. Repositories
        const reposRes = await fetch(`${user.repos_url}?per_page=100&sort=updated`, { headers });
        const repos = await reposRes.json();

        // 3. Social Accounts
        let socialAccounts = [];
        try {
            const socialRes = await fetch(`https://api.github.com/users/${username}/social_accounts`, { headers });
            if (socialRes.ok) socialAccounts = await socialRes.json();
        } catch (e) {
            console.warn('Failed to fetch social accounts', e);
        }

        // 4. Summarize Languages (to keep response size smaller)
        const languageMap = {};
        repos.forEach(repo => {
            if (repo.language) {
                languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
            }
        });

        return res.status(200).json({
            user,
            repos,
            socialAccounts,
            languageCount: languageMap
        });
    } catch (error) {
        console.error('Proxy Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
