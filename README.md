# FEKEPEP

Dark minimal web app with **Deep Crimson** theme — built with Node.js, Express, and vanilla HTML/CSS/JS.

## Features

- **FakeFF Solo** — Generate a fake FF profile image from a username
- **FakeFF Duo** — Generate a duo profile image from two usernames
- **Profile** — About the creator

## Quick Start (Local)

```bash
npm install
npm start
# → http://localhost:8080
```

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or just connect your GitHub repo to Vercel — it will auto-detect `vercel.json`.

## Project Structure

```
fekepep/
├── vercel.json            # Vercel routing config
├── server.js              # Express (local dev)
├── package.json
├── api/
│   ├── fakeff-solo.js     # Serverless: proxy FakeFF Solo API
│   └── fakeff-duo.js      # Serverless: proxy FakeFF Duo API
└── public/
    ├── index.html          # SPA frontend
    ├── style.css           # Dark crimson theme
    └── script.js           # Client-side logic
```

## Tech Stack

- **Backend:** Node.js + Express (local) / Vercel Serverless (production)
- **Frontend:** Vanilla HTML, CSS, JavaScript
- **No frameworks:** No React, Vue, Next.js, etc.
