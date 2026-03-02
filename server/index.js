import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { HfInference } from "@huggingface/inference";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const hf = new HfInference(process.env.HF_TOKEN);

const MODELS = {
  text: "meta-llama/Meta-Llama-3-8B-Instruct",
  image: "black-forest-labs/FLUX.1-schnell",
};

app.use(cors());
app.use(express.json());

async function generateStory(prompt) {
  const response = await hf.chatCompletion({
    model: MODELS.text,
    messages: [
      {
        role: "system",
        content: "Ты сказочник. Пиши на русском, кратко (5 предложений).",
      },
      { role: "user", content: `Напиши сказку про: ${prompt}` },
    ],
    max_tokens: 500,
  });
  return response.choices[0].message.content.trim();
}

async function generateImage(prompt) {
  const blob = await hf.textToImage({
    model: MODELS.image,
    inputs: `Professional fairytale digital art: ${prompt}. Cute style, high detail, vibrant colors`,
    parameters: {
      wait_for_model: true,
    },
  });

  const buffer = Buffer.from(await blob.arrayBuffer());
  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}
app.post("/api/generate", async (req, res) => {
  const { prompt } = req.body;
  console.log(`[${new Date().toLocaleTimeString()}] Запрос: ${prompt}`);

  const [storyResult, imageResult] = await Promise.allSettled([
    generateStory(prompt),
    generateImage(prompt),
  ]);

  const response = {
    story:
      storyResult.status === "fulfilled"
        ? storyResult.value
        : "Сказка временно недоступна.",
    image:
      imageResult.status === "fulfilled"
        ? imageResult.value
        : "https://via.placeholder.com/512?text=Image+Error",
  };

  res.json(response);
});

app.listen(PORT, () => {
  console.log(`
     Порт: ${PORT}
     Модель текста: ${MODELS.text}
     Модель фото: ${MODELS.image}
    `);
});
