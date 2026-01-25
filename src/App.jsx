import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SearchBar from './components/SearchBar';
import { fetchGitHubData } from './services/githubService';
import { generateReport } from './services/insightEngine';

function App() {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (username) => {
    setLoading(true);
    setError('');
    setReport(null);
    try {
      const rawData = await fetchGitHubData(username);
      const generatedReport = await generateReport(rawData);
      setReport(generatedReport);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{
          fontSize: '4rem',
          background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '10px'
        }}>
          GIT INSIGHT
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>
          AI-Powered Developer Assessment Engine
        </p>
      </header>

      <SearchBar onSearch={handleSearch} isLoading={loading} />

      {error && (
        <div style={{
          padding: '20px',
          background: 'rgba(255, 50, 50, 0.1)',
          border: '1px solid rgba(255, 50, 50, 0.2)',
          color: '#ff6b6b',
          borderRadius: 'var(--radius-md)',
          textAlign: 'center',
          marginTop: '20px'
        }}>
          {error}
        </div>
      )}

      {report && (
        <div className="glass-panel" style={{ marginTop: '40px', padding: '40px', lineHeight: '1.6' }}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ ...props }) => <h1 style={{ color: 'var(--color-primary)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginTop: '0' }} {...props} />,
              h2: ({ ...props }) => <h2 style={{ color: 'var(--color-text-main)', marginTop: '30px', marginBottom: '15px' }} {...props} />,
              strong: ({ ...props }) => <strong style={{ color: 'var(--color-secondary)' }} {...props} />,
              ul: ({ ...props }) => <ul style={{ paddingLeft: '20px', color: 'var(--color-text-muted)' }} {...props} />,
              li: ({ ...props }) => <li style={{ marginBottom: '8px' }} {...props} />,
              p: ({ ...props }) => <p style={{ marginBottom: '16px', color: 'var(--color-text-muted)' }} {...props} />,
            }}
          >
            {report}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default App;
