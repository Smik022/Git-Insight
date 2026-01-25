import { useState } from 'react';
import SearchBar from './components/SearchBar';
import LoadingScreen from './components/LoadingScreen';
import {
  SummaryCard,
  TechStackCard,
  StrengthsCard,
  WeaknessesCard,
  CodingInsightsCard,
  ProjectsCard,
  RoleFitCard
} from './components/InsightCards';
import { fetchGitHubData } from './services/githubService';
import { generateReport } from './services/insightEngine';

function App() {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (username) => {
    setLoading(true);
    setError('');
    setReport(null);
    setUserData(null);
    try {
      const rawData = await fetchGitHubData(username);
      setUserData(rawData.user);

      const generatedReport = await generateReport(rawData);
      setReport(generatedReport);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '1400px', margin: '0 auto', minHeight: '100vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '60px', animation: 'fadeIn 1s ease' }}>
        <h1 style={{
          fontSize: '5rem',
          fontWeight: '900',
          letterSpacing: '-2px',
          background: 'linear-gradient(135deg, var(--color-primary), #fff, var(--color-secondary))',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '20px',
          animation: 'shine 5s linear infinite'
        }}>
          GIT INSIGHT
        </h1>
        <p style={{ fontSize: '1.3rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Discover the untold story behind the code. AI-powered developer profiling.
        </p>
      </header>

      {!loading && !report && (
        <div style={{ maxWidth: '600px', margin: '0 auto', animation: 'fadeInUp 0.6s ease' }}>
          <SearchBar onSearch={handleSearch} isLoading={loading} />
        </div>
      )}

      {loading && (
        <div style={{ marginTop: '50px' }}>
          <LoadingScreen />
        </div>
      )}

      {error && (
        <div style={{
          maxWidth: '600px',
          margin: '40px auto',
          padding: '20px',
          background: 'rgba(255, 50, 50, 0.1)',
          border: '1px solid rgba(255, 50, 50, 0.2)',
          color: '#ff6b6b',
          borderRadius: 'var(--radius-md)',
          textAlign: 'center',
          animation: 'shake 0.5s ease'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {report && userData && !loading && (
        <div style={{ animation: 'fadeInUp 0.8s ease' }}>

          {/* User Profile Header */}
          <div className="glass-panel header-panel" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '30px',
            padding: '30px',
            marginBottom: '30px',
            background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <img
              src={userData.avatar_url}
              alt={userData.login}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                border: '3px solid rgba(255,255,255,0.1)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
              }}
            />
            <div>
              <h2 style={{ fontSize: '2rem', margin: '0 0 5px 0', color: '#fff' }}>
                {userData.name || userData.login}
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', marginBottom: '10px' }}>
                {userData.bio || 'No bio available'}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', fontSize: '0.85rem', color: 'var(--color-primary)' }}>
                {userData.location && <span>📍 {userData.location}</span>}
                {userData.company && <span>💼 {userData.company}</span>}
                <a href={userData.html_url} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                  🔗 github.com/{userData.login}
                </a>
              </div>
            </div>

            <div className="stats-container" style={{ marginLeft: 'auto', textAlign: 'right' }}>
              <div style={{ marginBottom: '10px' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fff' }}>{userData.public_repos}</span>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Repositories</div>
              </div>
              <div>
                <span style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#fff' }}>{userData.followers}</span>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Followers</div>
              </div>
            </div>
          </div>

          {/* Grid Layout for Insights */}
          <div className="insight-grid">
            <SummaryCard data={report.summary} />
            <TechStackCard data={report.techStack} />
            <StrengthsCard data={report.strengths} />
            <WeaknessesCard data={report.weaknesses} />
            <CodingInsightsCard data={report.codingInsights} />
            <ProjectsCard data={report.notableProjects} />
            <RoleFitCard data={report.roleFit} />
          </div>

          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <button
              onClick={() => { setReport(null); setUserData(null); }}
              style={{
                background: 'transparent',
                border: '1px solid var(--color-primary)',
                color: 'var(--color-primary)',
                padding: '12px 30px',
                borderRadius: '30px',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => { e.target.style.background = 'var(--color-primary)'; e.target.style.color = '#fff'; }}
              onMouseOut={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--color-primary)'; }}
            >
              Analyze Another Profile
            </button>
          </div>

        </div>
      )}

      <style>{`
        .insight-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
            grid-template-areas: 
                "summary"
                "tech"
                "strengths"
                "weaknesses"
                "insights"
                "projects"
                "rolefit";
        }

        @media (min-width: 768px) {
            .insight-grid {
                grid-template-columns: repeat(2, 1fr);
                grid-template-areas: 
                    "summary summary"
                    "tech tech"
                    "strengths weaknesses"
                    "insights projects"
                    "rolefit rolefit";
            }
        }

        @media (min-width: 1024px) {
            .insight-grid {
                grid-template-columns: repeat(3, 1fr);
                grid-template-areas: 
                    "summary summary tech"
                    "strengths weaknesses insights"
                    "projects projects rolefit";
            }
        }

        @keyframes shine {
            0% { background-position: 0% center; }
            100% { background-position: 200% center; }
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
        }
        
        @media (max-width: 600px) {
           .header-panel { flex-direction: column; text-align: center; }
           .stats-container { margin-left: 0 !important; text-align: center !important; display: flex; gap: 20px; justify-content: center; width: 100%; margin-top: 20px; }
        }
      `}</style>
    </div>
  );
}

export default App;
