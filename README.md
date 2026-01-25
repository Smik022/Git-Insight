# 🔍 Git Insight

**Git Insight** is an AI-powered developer assessment engine designed to provide deep technical insights into any GitHub user. By analyzing public repository metadata, commit history, and language patterns via the **Gemini API**, it generates a professional, card-based diagnostic report designed for recruiters and engineering managers.

![Git Insight Dashboard](https://img.shields.io/badge/Gemini-Powered-blue?style=for-the-badge&logo=google-gemini)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite)

---

## ✨ Features

- **🚀 Smart Dashboard**: Responsive masonry-style layout that packs insights efficiently without empty spaces.
- **🧠 AI Analysis**: Uses the latest Gemini 1.5 Flash model to analyze:
    - **Executive Summary**: A high-level bulleted archetype and level assessment.
    - **Core Strengths**: Identifying what the developer excels at.
    - **Tech Stack**: Granular breakdown of languages, frameworks, and tools.
    - **Engineering Insights**: Architectural patterns and code quality indicators.
    - **Areas for Improvement**: Constructive feedback and "next steps".
- **🎨 Premium UI**: Modern glassmorphism design with a professional Deep Blue & Amber color palette.
- **⏳ Real-time Loading**: Interactive loading screen with descriptive status updates.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vanilla CSS (Glassmorphism), Vite
- **AI Engine**: Google Gemini API (`@google/generative-ai`)
- **Data Source**: GitHub REST API
- **Layout**: CSS Columns (Masonry effect)

---

## ⚙️ Setup & Installation

### 1. Prerequisites
- Node.js (Latest LTS version recommended)
- A GitHub Personal Access Token (for higher rate limits)
- A Google Gemini API Key from [AI Studio](https://aistudio.google.com/)

### 2. Clone the Repository
```bash
git clone https://github.com/yourusername/Git-Insight.git
cd Git-Insight
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the root directory and add your keys:
```env
VITE_GITHUB_TOKEN=your_github_token_here
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 5. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to see the app.

---

## 🧩 Important Components

- **`insightEngine.js`**: Orchestrates the data flow between GitHub and Gemini.
- **`InsightCards.jsx`**: Modular, styled components for each report section.
- **`githubService.js`**: Handles authenticated requests to the GitHub API.
- **`LoadingScreen.jsx`**: A immersive transition experience during analysis.

---

## 📝 License
This project is for educational and portfolio purposes. Feel free to use and modify it!

