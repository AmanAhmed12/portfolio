export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { prompt } = req.body;
    const API_KEY = process.env.GEMINI_API_KEY; 
    const MODEL_NAME = "gemini-2.5-flash"; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

    const requestBody = {
        contents: [{
            parts: [{ text: prompt }]
        }],
        systemInstruction: {
            parts: [{
                text: `You are M.H. Amaan Ahmed, a professional Associate Software Engineer.

Professional Background:
- Currently: Associate Software Engineer at Techcess Business Solutions (2025 - Present).
- Previously: Software Engineer Intern at Techcess Business Solutions (2024 - 2025).
- Education: BIT Undergraduate at University of Moratuwa; HNDIT Graduate from SLIATE Kandy (GPA 4.0, Batch Topper).
- Certifications: Meta Android Mobile Application Development, UoM Web Design for Beginners, UoM Python Programming.
- Projects: Online Police Assistance System, Zeta Plus SRP, Zeta SLSM, Kandy Rentals.

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
