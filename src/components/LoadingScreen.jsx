import { useState, useEffect } from 'react';

const LoadingScreen = () => {
    const [progress, setProgress] = useState(0);
    const [messageIndex, setMessageIndex] = useState(0);

    const messages = [
        "Connecting to GitHub...",
        "Fetching Repositories...",
        "Analyzing Code Patterns...",
        "Detecting Tech Stack...",
        "Evaluating Architecture...",
        "Compiling Insights..."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Non-linear progress for realism
                const increment = Math.random() * 15;
                return Math.min(prev + increment, 100);
            });
        }, 800);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const msgInterval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % messages.length);
        }, 1500);

        return () => clearInterval(msgInterval);
    }, []);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            textAlign: 'center',
            color: 'var(--color-text-main)',
            animation: 'fadeIn 0.5s ease'
        }}>
            <div className="loader-orbit" style={{ marginBottom: '30px' }}>
                <div className="orbit-c1"></div>
                <div className="orbit-c2"></div>
                <div className="orbit-c3"></div>
            </div>

            <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '15px',
                height: '1.8rem', // Fixed height to prevent jump
                background: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
            }}>
                {messages[messageIndex]}
            </h3>

            <div style={{
                width: '100%',
                maxWidth: '400px',
                height: '6px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '10px',
                overflow: 'hidden',
                position: 'relative'
            }}>
                <div style={{
                    width: `${progress}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))',
                    borderRadius: '10px',
                    transition: 'width 0.5s ease-out',
                    boxShadow: '0 0 10px var(--color-primary)'
                }} />
            </div>


            <style>{`
                @keyframes orbit {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .loader-orbit {
                    position: relative;
                    width: 60px;
                    height: 60px;
                }
                .orbit-c1, .orbit-c2, .orbit-c3 {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    border: 2px solid transparent;
                    border-top-color: var(--color-primary);
                }
                .orbit-c1 { animation: orbit 2s linear infinite; }
                .orbit-c2 { 
                    width: 70%; height: 70%; 
                    top: 15%; left: 15%;
                    border-top-color: var(--color-secondary);
                    animation: orbit 1.5s linear infinite reverse; 
                }
                .orbit-c3 { 
                    width: 40%; height: 40%; 
                    top: 30%; left: 30%;
                    border-top-color: #fff;
                    animation: orbit 1s linear infinite; 
                }
            `}</style>
        </div>
    );
};

export default LoadingScreen;
