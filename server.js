import express, { json } from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from 'cors';

const app = express();
const port = 3000;

const API_KEY = 'API_KEY'; // Replace with your actual API key

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(cors());
app.use(json());

async function getFortune(cards) {
    const prompt = `Tell me a fortune based on these cards: ${cards.card1}, ${cards.card2}, ${cards.card3}`;
    const result = await model.generateContent(prompt);
    return result.response.text();
}

app.post('/get-fortune', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow CORS
    try {
        const fortune = await getFortune(req.body);
        res.json({ fortune });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching fortune' });
        console.log(error);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});