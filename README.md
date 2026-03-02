AI Generator

Стек технологий:

Frontend: React (Vite), Axios, CSS3.
Backend: Node.js, Express.
AI Models (Hugging Face SDK):
Текст: `meta-llama/Meta-Llama-3-8B-Instruct`.
Изображения: `black-forest-labs/FLUX.1-schnell`.

 Инструкция по локальному запуску:

1. Клонирование репозитория
bash
git clone [https://github.com/ВАШ_НИК/ai-fairytale-generator.git](https://github.com/ВАШ_НИК/ai-fairytale-generator.git)](https://github.com/lYnyel/AI-Fairytale-Generator)
cd ai-fairytale-generator

2. Настройка бэкенда
cd server
npm install
Создайте файл .env в папке server и добавьте ваш токен от Hugging Face:
HF_TOKEN=your_token_here
PORT=5000

3. Настройка фронтенда
cd client
npm install
npm run dev
