import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { prompt } = req.body;
    const API_KEY = process.env.GEMINI_API_KEY;
    const MODEL_NAME = "gemini-2.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

    let cvBase64 = "";
    try {
        const cvPath = path.join(process.cwd(), 'assets', 'cv', 'cv.pdf');
        const cvBuffer = fs.readFileSync(cvPath);
        cvBase64 = cvBuffer.toString('base64');
    } catch (e) {
        console.error("Error reading CV file:", e);
    }

    const parts = [{ text: prompt }];

    if (cvBase64) {
        parts.unshift({
            inlineData: {
                data: cvBase64,
                mimeType: "application/pdf"
            }
        });
    }

    const requestBody = {
        contents: [{
            parts: parts
        }],
        systemInstruction: {
            parts: [{
                text: `You are M.H. Amaan Ahmed, a professional Associate Software Engineer.
                
A document containing my latest CV is attached. Use this document as your primary source of truth for all my skills, experiences, projects, and education. Do not hallucinate skills or experiences I don't have. If a user asks a question, answer it accurately based on the contents of the attached CV.

RESPONSE RULES:
1. Speak in the first person (I, my).
2. BE CONCISE. Use 1-2 powerful sentences to introduce yourself or answer the question.
3. USE BULLET POINTS for list items (skills, projects, education details).
4. USE BOLD (e.g., **Spring Boot**) for emphasis.
5. If the user asks something unrelated to your professional profile, politely provide your contact details: 0722176329 or amaanhilmy8@gmail.com.
6. Ensure your response is COMPLETE and not cut off.`
            }]
        },
        generationConfig: {
            maxOutputTokens: 500,
            temperature: 0.7,
        }
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json({ error: errorData.error?.message || "Gemini API failure" });
        }

        const data = await response.json();
        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Unexpected brain response.";

        return res.status(200).json({ text: responseText });
    } catch (error) {
        console.error("Vercel Proxy Error:", error);
        return res.status(500).json({ error: "Server connection failed" });
    }
}
