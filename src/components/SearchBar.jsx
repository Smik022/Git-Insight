import { useState } from 'react';

const extractUsername = (input) => {
    const trimmed = input.trim();
    try {
        const url = new URL(trimmed);
        if (url.hostname === 'github.com' || url.hostname === 'www.github.com') {
            const parts = url.pathname.split('/').filter(Boolean);
            if (parts.length >= 1) return parts[0];
        }
    } catch {
        // Not a URL, treat as username
    }
    return trimmed;
};

const SearchBar = ({ onSearch, isLoading }) => {
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const parsed = extractUsername(username);
        if (parsed) {
            onSearch(parsed);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '500px', margin: '0 auto 2rem' }}>
            <div style={{ position: 'relative', display: 'flex' }}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter GitHub Username or URL..."
                    disabled={isLoading}
                    style={{
                        width: '100%',
                        padding: '16px 24px',
                        fontSize: '1.2rem',
                        background: 'var(--color-bg-glass)',
                        border: 'var(--border-glass)',
                        borderRadius: 'var(--radius-lg)',
                        color: 'var(--color-text-main)',
                        outline: 'none',
                        backdropFilter: 'blur(12px)',
                        boxShadow: 'var(--shadow-glass)',
                        transition: 'all 0.3s ease'
                    }}
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                        position: 'absolute',
                        right: '8px',
                        top: '8px',
                        bottom: '8px',
                        padding: '0 24px',
                        background: 'var(--color-primary)',
                        color: '#fff',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: '600',
                        opacity: isLoading ? 0.7 : 1
                    }}
                >
                    {isLoading ? 'Scanning...' : 'Analyze'}
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
