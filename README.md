﻿# calmedica-backend

## Getting Started

First, run the development server:

You will need to have Ollama installed and launched on your device.

### Install Ollama

To install Ollama, follow these steps:

1. Visit the [Ollama website](https://ollama.com) and download the installer for your operating system.
2. Run the installer and follow the on-screen instructions to complete the installation.
3. Once installed, launch Ollama to ensure it is running correctly.

### Configure Environment Variables

Please create a `.env` file in the root of the project with the following contents:

```plaintext
PORT=3000
MONGODB_URI=
JWT_SECRET=My_ultra_Secret_token
SESSION_SECRET=My_ultra_Secret_token/ymhW8E/V0p
ENV=dev
ALLOWED_ORIGINS=YOUR_FRONT_URL
RESEND_API_KEY=YOUR_RESEND_KEY
```

This `.env` file will configure the environment variables needed for your project. Make sure to replace the placeholders with your actual values.


## Start the server
```
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Tasks

- [popokola](https://github.com/popokola) Charles Parames
- [x] Benchmark Ollama models (GPT-3, Mistral, etc.)
- [x] Optimization of the prompts

- [WhaleAid](https://github.com/WhaleAid) Walid Khalqallah
- [x] Setup Next.js frontend
- [x] Implementation of decisional tree

- [JustGritt](https://github.com/JustGritt) Alexis TAN
- [x] Benchmark Langchain usage
- [x] POC Python

- [Ricardogn224](https://github.com/Ricardogn224) Ricardo Hernandez
- [x] Convertion of python code to javascript
- [x] Optimization of the code

- [alexdieudonne](https://github.com/alexdieudonne) Alex Dieudonne
- [x] Benchmark Non-Ollama models (Claude, Gemini, etc.)
- [x] Implementation of database
