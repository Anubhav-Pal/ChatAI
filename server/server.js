import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

const genAI = new GoogleGenerativeAI(process.env.GEMINIAPI_URL_KEY);

app.post('/', async (req, res) => {

    const prompt = req.body.prompt;
    try {
        async function run() {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();  
            return text;
        }

        const generatedText = await run();
        // console.log("this is what you got: ", generatedText);

        res.status(200).send({
            bot: generatedText,
        });

    } catch (error) {
        console.error("Server Error - ", error)
        res.status(500).send(error || 'Something went wrong');
    }
})

app.listen(3000, () => console.log('AI server started on http://localhost:3000'))