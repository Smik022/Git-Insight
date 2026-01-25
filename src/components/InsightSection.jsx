import React from 'react';

const InsightSection = ({ title, children, delay = 0 }) => {
    return (
        <div
            className="glass-panel"
            style={{
                padding: '24px',
                marginBottom: '20px',
                animation: `fadeInUp 0.6s ease forwards ${delay}s`,
                opacity: 0,
                transform: 'translateY(20px)'
            }}
        >
            <h3 style={{
                color: 'var(--color-primary)',
                marginBottom: '16px',
                fontSize: '1.4rem',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                paddingBottom: '12px'
            }}>
                {title}
            </h3>
            <div style={{ color: 'var(--color-text-muted)' }}>
                {children}
            </div>
            <style>{`
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    );
};

export default InsightSection;
