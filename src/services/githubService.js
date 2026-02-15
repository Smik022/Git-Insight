export const fetchGitHubData = async (username) => {
    try {
        const response = await fetch(`/api/github?username=${username}`);

        if (!response.ok) {
            const error = await response.json();
            if (response.status === 404) throw new Error('User not found');
            throw new Error(error.details || 'Failed to fetch GitHub data via proxy');
        }

        return await response.json();
    } catch (error) {
        console.error('GitHub Proxy Error:', error);
        throw error;
    }
};
