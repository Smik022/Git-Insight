import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server' });
    }

    const { prompt } = req.body || {};

    // Debug logs for terminal
    console.log("[Proxy Debug] API Key exists:", !!apiKey);
    console.log("[Proxy Debug] Prompt length:", prompt?.length || 0);
    console.log("[Proxy Debug] Model:", "gemini-2.5-flash");

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return res.status(200).json({ result: text });
    } catch (error) {
        console.error('Gemini Proxy Error:', error);
        return res.status(500).json({
            error: 'Failed to generate content',
            details: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}
