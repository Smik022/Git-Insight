

const Card = ({ title, children, color = 'var(--color-primary)', gridArea, delay = 0 }) => (
    <div className="glass-panel" style={{
        gridArea,
        padding: '25px',
        borderTop: `3px solid ${color}`,
        animation: `fadeInUp 0.6s ease forwards ${delay}s`,
        opacity: 0,
        transform: 'translateY(20px)',
        display: 'flex',
        flexDirection: 'column'
    }}>
        <h3 style={{
            color,
            marginTop: 0,
            marginBottom: '20px',
            fontSize: '1.2rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            paddingBottom: '10px'
        }}>
            {title}
        </h3>
        <div style={{ flex: 1 }}>{children}</div>
    </div>
);

export const SummaryCard = ({ data }) => (
    <Card title="Executive Summary" gridArea="summary">
        <h2 style={{ fontSize: '2rem', margin: '0 0 10px 0', color: '#fff' }}>{data.archetype}</h2>
        <div style={{
            display: 'inline-block',
            padding: '5px 15px',
            borderRadius: '20px',
            border: '1px solid var(--color-primary)',
            background: 'hsla(var(--hue-primary), 90%, 60%, 0.1)',
            color: 'var(--color-primary)',
            fontSize: '0.85rem',
            fontWeight: '600',
            marginBottom: '15px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
        }}>
            {data.level}
        </div>
        <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
            {Array.isArray(data.overview) ? data.overview.map((item, i) => (
                <li key={i} style={{ marginBottom: '8px' }}>{item}</li>
            )) : <li style={{ marginBottom: '8px' }}>{data.overview}</li>}
        </ul>
    </Card>
);

export const TechStackCard = ({ data }) => (
    <Card title="Tech Stack" gridArea="tech">
        <div style={{ marginBottom: '20px' }}>
            <strong style={{ color: '#fff', display: 'block', marginBottom: '8px', fontSize: '0.9rem', opacity: 0.8 }}>Languages</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {data.languages.map((lang, i) => (
                    <span key={i} style={{
                        background: 'hsla(var(--hue-primary), 90%, 60%, 0.05)',
                        border: '1px solid hsla(var(--hue-primary), 90%, 60%, 0.3)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                        color: 'var(--color-primary)',
                        fontWeight: '500'
                    }}>{lang}</span>
                ))}
            </div>
        </div>
        <div style={{ marginBottom: '20px' }}>
            <strong style={{ color: '#fff', display: 'block', marginBottom: '8px', fontSize: '0.9rem', opacity: 0.8 }}>Frameworks</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {data.frameworks.map((fw, i) => (
                    <span key={i} style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                        color: '#eee'
                    }}>{fw}</span>
                ))}
            </div>
        </div>
        <div>
            <strong style={{ color: '#fff', display: 'block', marginBottom: '8px', fontSize: '0.9rem', opacity: 0.8 }}>Tools</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {data.tools.map((t, i) => (
                    <span key={i} style={{
                        background: 'rgba(255,255,255,0.02)',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.85rem',
                        color: '#aaa',
                        border: '1px solid rgba(255,255,255,0.05)'
                    }}>{t}</span>
                ))}
            </div>
        </div>
    </Card>
);

export const StrengthsCard = ({ data }) => (
    <Card title="Core Strengths" color="#00C853" gridArea="strengths" delay={0.2}>
        <ul style={{ paddingLeft: '20px', margin: 0 }}>
            {data.map((s, i) => (
                <li key={i} style={{ marginBottom: '10px', color: '#eee' }}>{s}</li>
            ))}
        </ul>
    </Card>
);

export const WeaknessesCard = ({ data }) => (
    <Card title="Areas for Improvement" color="#FF3D00" gridArea="weaknesses" delay={0.3}>
        <ul style={{ paddingLeft: '20px', margin: 0 }}>
            {data.map((w, i) => (
                <li key={i} style={{ marginBottom: '10px', color: '#eee' }}>{w}</li>
            ))}
        </ul>
    </Card>
);

export const CodingInsightsCard = ({ data }) => (
    <Card title="Engineering Insights" gridArea="insights" delay={0.4}>
        <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: 'var(--color-secondary)', display: 'block', marginBottom: '8px' }}>Quality Indicators</strong>
            <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.9rem', color: '#ccc' }}>
                {data.quality.map((item, i) => <li key={i} style={{ marginBottom: '4px' }}>{item}</li>)}
            </ul>
        </div>
        <div style={{ marginBottom: '15px' }}>
            <strong style={{ color: 'var(--color-secondary)', display: 'block', marginBottom: '8px' }}>Architectural Patterns</strong>
            <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.9rem', color: '#ccc' }}>
                {data.patterns.map((item, i) => <li key={i} style={{ marginBottom: '4px' }}>{item}</li>)}
            </ul>
        </div>
        <div>
            <strong style={{ color: 'var(--color-secondary)', display: 'block', marginBottom: '8px' }}>Dominant Domains</strong>
            <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.9rem', color: '#ccc' }}>
                {data.domains.map((item, i) => <li key={i} style={{ marginBottom: '4px' }}>{item}</li>)}
            </ul>
        </div>
    </Card>
);

export const ProjectsCard = ({ data }) => (
    <Card title="Notable Projects" gridArea="projects" delay={0.5}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {data.map((p, i) => (
                <div key={i} style={{
                    background: 'rgba(255,255,255,0.03)',
                    padding: '15px',
                    borderRadius: '8px',
                    borderLeft: '3px solid var(--color-primary)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <strong style={{ fontSize: '1.1rem', color: '#fff' }}>{p.name}</strong>
                    </div>
                    <p style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: '#ccc' }}>{p.why}</p>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                        Tech: {p.tech}
                    </div>
                </div>
            ))}
        </div>
    </Card>
);

export const RoleFitCard = ({ data }) => (
    <Card title="Role Fit & Next Steps" gridArea="rolefit" delay={0.6}>
        <div style={{ marginBottom: '20px' }}>
            <strong style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>Best Fit Roles</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {data.roles.map((role, i) => (
                    <span key={i} style={{
                        background: 'hsla(var(--hue-primary), 90%, 60%, 0.05)',
                        border: '1px solid var(--color-primary)',
                        color: 'var(--color-primary)',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: '500'
                    }}>{role}</span>
                ))}
            </div>
        </div>
        <div>
            <strong style={{ color: '#fff', display: 'block', marginBottom: '8px' }}>Suggested Next Steps</strong>
            <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.9rem', color: '#ccc' }}>
                {data.nextSteps && data.nextSteps.map((step, i) => (
                    <li key={i} style={{ marginBottom: '5px' }}>{step}</li>
                ))}
            </ul>
        </div>
    </Card>
);
