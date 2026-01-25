import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import InsightSection from './components/InsightSection';
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
      const generatedReport = generateReport(rawData);
      setReport(generatedReport);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
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
        <div style={{ marginTop: '40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {/* Archetype Badge */}
            <div className="glass-panel" style={{
              padding: '20px',
              textAlign: 'center',
              gridColumn: '1 / -1',
              background: 'linear-gradient(135deg, rgba(var(--hue-primary), 0.1) 0%, rgba(var(--hue-secondary), 0.1) 100%)'
            }}>
              <h2 style={{ fontSize: '2rem', color: 'var(--color-text-main)' }}>{report.archetype}</h2>
              <span style={{
                display: 'inline-block',
                padding: '4px 12px',
                background: 'var(--color-primary)',
                color: '#fff',
                borderRadius: '20px',
                fontSize: '0.9rem',
                marginTop: '8px'
              }}>
                {report.experienceLevel}
              </span>
            </div>

            {report.sections.map((section, idx) => (
              <InsightSection key={idx} title={section.title} delay={idx * 0.1}>
                {section.title === ' Notable Projects' ? (
                  <ul style={{ listStyle: 'none' }}>
                    {section.content.map(repo => (
                      <li key={repo.name} style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <a href={repo.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontSize: '1.1rem', fontWeight: 'bold' }}>
                          {repo.name}
                        </a>
                        <p style={{ fontSize: '0.9rem', margin: '4px 0' }}>{repo.description || 'No description provided.'}</p>
                        <div style={{ display: 'flex', gap: '10px', fontSize: '0.8rem' }}>
                          <span>⭐ {repo.stars}</span>
                          <span>{repo.language}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : section.title === 'Tech Stack & Tooling' ? (
                  <div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                      {section.content.languages.map(lang => (
                        <span key={lang} style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                          {lang}
                        </span>
                      ))}
                    </div>
                    {section.content.details.map((detail, i) => (
                      <p key={i} style={{ fontSize: '0.9rem', color: 'var(--color-secondary)' }}>• {detail}</p>
                    ))}
                  </div>
                ) : (
                  <p>{section.content.summary}</p>
                )}
              </InsightSection>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
