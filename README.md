# FEKEPEP

Dark minimal web app with **Deep Crimson** theme — built with Node.js, Express, and vanilla HTML/CSS/JS.

## Features

- **FakeFF Solo** — Generate a fake FF profile image from a username
- **FakeFF Duo** — Generate a duo profile image from two usernames
- **Profile** — About the creator

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the server
npm start

# 3. Open in browser
# → http://localhost:8080
```

## Project Structure

```
fekepep/
├── server.js          # Express backend + API proxy
├── package.json
├── README.md
└── public/
    ├── index.html     # Single-page app (hash routing)
    ├── style.css      # Dark minimal + crimson theme
    └── script.js      # Client-side logic
```

## Tech Stack

- **Backend:** Node.js + Express
- **Frontend:** Vanilla HTML, CSS, JavaScript
- **No frameworks:** No React, Vue, Next.js, etc.

## Port

Default: `8080` (configurable via `PORT` environment variable)

```bash
PORT=3000 npm start
```
