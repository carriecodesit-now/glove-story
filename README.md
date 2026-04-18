# 🧤 Glove Story

### A Goalkeeper Stats Tracker

**Live App:** [glove-story.vercel.app](https://glove-story.vercel.app)

---

## About

Glove Story is a web app built specifically for goalkeepers to track their performance across games and seasons. Whether you're logging stats after a match or tracking a game in real time, Glove Story keeps all your data in one place — no login required.

---

## Features

- 🔴 **Live Game Tracker** — Track saves, Goals Against, and key events as the game happens
- 📝 **Add Game Manually** — Log stats after a match is complete
- 📁 **Game Archives** — Browse your full game history
- 📊 **Season / Tournament Stats** — View aggregated stats across a season or tournament

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React (Vite) | Frontend framework & build tool |
| Tailwind CSS | Styling |
| Firebase Firestore | Database (cloud storage) |
| React Router | Page navigation |
| JavaScript ES6+ | Core language |

---

## Getting Started

To run this project locally:

```bash
# Clone the repository
git clone https://github.com/carriecodesit-now/glove-story.git

# Navigate into the project
cd glove-story

# Install dependencies
npm install

# Create a .env file with your Firebase config (see .env.example)

# Start the development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root of the project with the following keys:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## Developer

Built by **Carrie** — [github.com/carriecodesit-now](https://github.com/carriecodesit-now)