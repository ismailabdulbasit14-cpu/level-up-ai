# Level Up AI

A mobile-friendly personal growth dashboard built around this path:

**Mathematics → Data Analyst → Data Science → AI**

## Features
- 12-week skill roadmap
- Daily missions and XP
- Portfolio project targets
- Local progress saved in the browser
- AI career/study coach powered by the OpenAI Responses API
- Designed to be simple enough to use from a phone

## Run locally

1. Install Node.js.
2. Open this folder in a terminal.
3. Run:
   `npm install`
4. Copy `.env.example` to `.env`.
5. Put your OpenAI API key in `.env`:
   `OPENAI_API_KEY=...`
6. Run:
   `npm start`
7. Open `http://localhost:3000`

**Important:** Never put your OpenAI API key inside `public/app.js` or any browser code. Keep it on the server in an environment variable.

## Deploying

This project can be deployed to a Node-compatible hosting service. Set the `OPENAI_API_KEY` environment variable in the hosting provider instead of uploading the `.env` file.
